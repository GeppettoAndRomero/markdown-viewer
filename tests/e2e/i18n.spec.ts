import { test, expect } from '@playwright/test';
import { waitReady, openSampleMarkdown } from './_helpers';

// Content routing is engine-independent; one browser is enough.
test.describe('i18n', () => {
  test.beforeEach(({}, testInfo) => {
    test.skip(testInfo.project.name !== 'chromium', 'content routing (one engine)');
  });

  for (const loc of [
    { path: '/markdown-viewer/', lang: 'en' },
    { path: '/markdown-viewer/ja/', lang: 'ja' },
  ]) {
    test(`opens a file on the ${loc.lang} route (#5)`, async ({ page }) => {
      await page.goto(loc.path);
      await waitReady(page);
      await openSampleMarkdown(page);
      await expect(page.getByTestId('markdown-content')).toContainText('Sample Document');
    });
  }

  test('serves every locale with the correct <html lang>', async ({ page }) => {
    const expected: Array<[string, string]> = [
      ['/markdown-viewer/', 'en'],
      ['/markdown-viewer/ja/', 'ja'],
      ['/markdown-viewer/zh/', 'zh-Hans'],
      ['/markdown-viewer/de/', 'de'],
      ['/markdown-viewer/es/', 'es'],
    ];
    for (const [path, lang] of expected) {
      await page.goto(path);
      expect(await page.getAttribute('html', 'lang'), `lang on ${path}`).toBe(lang);
    }
  });
});
