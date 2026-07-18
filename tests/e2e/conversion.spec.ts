import { test, expect, type Page } from '@playwright/test';
import {
  waitReady,
  openMarkdown,
  openSampleMarkdown,
  dropFile,
  PLAIN_B64,
  TABLES_CODE_B64,
  XSS_B64,
  JAPANESE_SHIFTJIS_B64,
  BOM_UTF8_B64,
} from './_helpers';

/** Every request the page issues, for asserting nothing fires for a given host. */
function trackRequests(page: Page): string[] {
  const urls: string[] = [];
  page.on('request', (req) => urls.push(req.url()));
  return urls;
}

test.describe('Markdown Viewer', () => {
  test('renders a document, with no upload', async ({ page }) => {
    const requests = trackRequests(page);
    await page.goto('/markdown-viewer/');
    await waitReady(page);
    await openSampleMarkdown(page);

    const content = page.getByTestId('markdown-content');
    await expect(content.locator('h1')).toHaveText('Sample Document');
    await expect(content).toContainText('This is a plain paragraph');
    await expect(content.locator('a', { hasText: 'runlocally' })).toHaveAttribute(
      'href',
      'https://runlocally.app'
    );
    await expect(page.getByTestId('file-name')).toHaveText('plain.md');

    const external = requests.filter(
      (u) => !u.startsWith('http://localhost:4321') && !u.startsWith('data:') && !u.startsWith('blob:')
    );
    expect(external, `unexpected cross-origin requests: ${external.join(', ')}`).toHaveLength(0);
  });

  test('renders a GFM table and a fenced code block', async ({ page }) => {
    await page.goto('/markdown-viewer/');
    await waitReady(page);
    await openMarkdown(page, TABLES_CODE_B64, 'tables-code.md');

    const content = page.getByTestId('markdown-content');
    await expect(content.locator('table')).toBeVisible();
    await expect(content.locator('th').first()).toHaveText('Name');
    await expect(content.locator('td', { hasText: 'Ada' })).toBeVisible();
    await expect(content.locator('pre code')).toContainText('const answer = 42;');
  });

  test('shows a localized error for an unsupported file type', async ({ page }) => {
    await page.goto('/markdown-viewer/');
    await waitReady(page);
    await dropFile(page, { b64: btoa('not markdown'), name: 'photo.png', type: 'image/png' });

    const err = page.getByTestId('error');
    await expect(err).toBeVisible();
    await expect(err).toContainText('photo.png');
    await expect(page.getByTestId('markdown-content')).toHaveCount(0);
  });

  test('shows an error for an empty file', async ({ page }) => {
    await page.goto('/markdown-viewer/');
    await waitReady(page);
    await dropFile(page, { b64: '', name: 'empty.md' });

    await expect(page.getByTestId('error')).toBeVisible();
    await expect(page.getByTestId('error')).toContainText('empty.md');
  });

  test('opens another file after closing the current one', async ({ page }) => {
    await page.goto('/markdown-viewer/');
    await waitReady(page);
    await openSampleMarkdown(page);
    await page.getByRole('button', { name: 'Open another file' }).click();
    await expect(page.getByTestId('markdown-content')).toHaveCount(0);
  });

  test.describe('encoding detection', () => {
    test('decodes a Shift_JIS file correctly — not mojibake', async ({ page }) => {
      await page.goto('/markdown-viewer/');
      await waitReady(page);
      await openMarkdown(page, JAPANESE_SHIFTJIS_B64, 'japanese-shiftjis.md');

      const content = page.getByTestId('markdown-content');
      await expect(content.locator('h1')).toHaveText('日本語のテスト');
      await expect(content).toContainText('文字化けしていないことを確認してください。');

      const text = await content.innerText();
      expect(text).not.toContain('�'); // U+FFFD REPLACEMENT CHARACTER
    });

    test('strips a leading UTF-8 BOM instead of showing a stray character', async ({ page }) => {
      await page.goto('/markdown-viewer/');
      await waitReady(page);
      await openMarkdown(page, BOM_UTF8_B64, 'bom-utf8.md');

      const content = page.getByTestId('markdown-content');
      await expect(content.locator('h1')).toHaveText('BOM 付き UTF-8');
      const heading = await content.locator('h1').innerText();
      expect(heading.charCodeAt(0)).not.toBe(0xfeff);
    });
  });

  test('produces zero console errors across the full fixture set', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    page.on('pageerror', (err) => errors.push(String(err)));

    await page.goto('/markdown-viewer/');
    await waitReady(page);
    for (const [b64, name] of [
      [PLAIN_B64, 'plain.md'],
      [TABLES_CODE_B64, 'tables-code.md'],
      [JAPANESE_SHIFTJIS_B64, 'japanese-shiftjis.md'],
      [BOM_UTF8_B64, 'bom-utf8.md'],
      [XSS_B64, 'xss.md'],
    ] as const) {
      await openMarkdown(page, b64, name);
      await page.getByRole('button', { name: 'Open another file' }).click();
    }

    expect(errors, `console/page errors: ${errors.join('\n')}`).toHaveLength(0);
  });

  test.describe('malicious Markdown (XSS attempt) is neutralized', () => {
    test('markdown-it html:false + DOMPurify strip dangerous markup and nothing executes', async ({
      page,
    }) => {
      await page.goto('/markdown-viewer/');
      await page.evaluate(() => {
        (window as Record<string, unknown>).__xssFired = false;
      });
      await waitReady(page);
      await openMarkdown(page, XSS_B64, 'xss.md');

      const content = page.getByTestId('markdown-content');
      // The legitimate content survives sanitization…
      await expect(content).toContainText('Legitimate paragraph that should remain visible.');
      // …but every dangerous construct does not render as live markup.
      await expect(content.locator('script')).toHaveCount(0);
      await expect(content.locator('iframe')).toHaveCount(0);
      await expect(content.locator('style')).toHaveCount(0);
      await expect(content.locator('[onerror]')).toHaveCount(0);
      await expect(content.locator('[onload]')).toHaveCount(0);
      await expect(content.locator('a[href^="javascript:"]')).toHaveCount(0);

      // Give any script a moment to have run, then confirm nothing executed.
      await page.waitForTimeout(300);
      const fired = await page.evaluate(() => (window as Record<string, unknown>).__xssFired);
      expect(fired).toBe(false);
    });
  });
});
