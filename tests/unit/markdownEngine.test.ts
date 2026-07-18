// @vitest-environment jsdom
//
// DOMPurify needs a real `window` (jsdom provides one; the Node-environment default
// for this project's other unit tests does not), so this file opts into jsdom via
// the docblock above rather than changing the project-wide default.
//
// `parseMarkdownFile` itself (the `File.arrayBuffer()` + encoding-detection layer)
// is intentionally NOT unit-tested here: jsdom's `File`/`Blob` do not implement
// `arrayBuffer()` (a known jsdom gap), so that path is exercised end-to-end by the
// Playwright e2e suite instead (real browser, real File API) — the same split
// eml-viewer uses for its own File-consuming `parseEmlFile`. `renderMarkdown` and
// `sanitizeHtml`, which only take strings, are fully covered here.
import { describe, it, expect } from 'vitest';
import { renderMarkdown, sanitizeHtml } from '@/utils/markdownEngine';

describe('renderMarkdown — basic formatting', () => {
  it('renders headings, emphasis and paragraphs', async () => {
    const html = await renderMarkdown('# Title\n\nSome *emphasis* and **strong** text.');
    expect(html).toContain('<h1>Title</h1>');
    expect(html).toContain('<em>emphasis</em>');
    expect(html).toContain('<strong>strong</strong>');
  });

  it('renders a fenced code block', async () => {
    const html = await renderMarkdown('```js\nconst x = 1;\n```');
    expect(html).toContain('<pre>');
    expect(html).toContain('<code');
    expect(html).toContain('const x = 1;');
  });

  it('renders a GFM table', async () => {
    const source = ['| A | B |', '| --- | --- |', '| 1 | 2 |'].join('\n');
    const html = await renderMarkdown(source);
    expect(html).toContain('<table>');
    expect(html).toContain('<th>A</th>');
    expect(html).toContain('<td>1</td>');
  });

  it('renders an unordered and ordered list', async () => {
    const html = await renderMarkdown('- one\n- two\n\n1. first\n2. second');
    expect(html).toContain('<ul>');
    expect(html).toContain('<ol>');
    expect(html).toContain('<li>one</li>');
  });
});

describe('renderMarkdown — html:false blocks raw HTML from the source', () => {
  it('escapes a literal <script> tag as text instead of rendering it as an element', async () => {
    const html = await renderMarkdown('before\n\n<script>window.__xssFired = true;</script>\n\nafter');
    expect(html).not.toMatch(/<script[\s>]/i);
    expect(html).toContain('&lt;script&gt;');
  });

  it('escapes an inline HTML event handler attribute as text', async () => {
    const html = await renderMarkdown('<img src=x onerror="window.__xssFired = true">');
    expect(html).not.toMatch(/<img[\s>]/i);
    expect(html).toContain('&lt;img');
  });
});

describe('renderMarkdown — validateLink scheme allow-list', () => {
  it('allows http/https/mailto links', async () => {
    const html = await renderMarkdown(
      '[a](http://example.com) [b](https://example.com) [c](mailto:x@example.com)'
    );
    expect(html).toMatch(/<a href="http:\/\/example\.com"[^>]*>a<\/a>/);
    expect(html).toMatch(/<a href="https:\/\/example\.com"[^>]*>b<\/a>/);
    expect(html).toMatch(/<a href="mailto:x@example\.com"[^>]*>c<\/a>/);
  });

  it('allows a scheme-less relative link', async () => {
    const html = await renderMarkdown('[doc](./other.md)');
    expect(html).toMatch(/<a href="\.\/other\.md"[^>]*>doc<\/a>/);
  });

  it('rejects a javascript: link — no anchor is rendered, href never appears', async () => {
    const html = await renderMarkdown('[bad](javascript:window.__xssFired=1)');
    // The link parse backs off entirely (no token), so the source is shown as
    // literal, HTML-escaped text — inert, but the important assertion is that no
    // `href` attribute (the only way this scheme could ever be dereferenced) exists.
    expect(html).not.toContain('<a ');
    expect(html).not.toMatch(/href="javascript:/i);
  });

  it('rejects a data: link', async () => {
    const html = await renderMarkdown('[bad](data:text/html,<script>1</script>)');
    expect(html).not.toContain('<a ');
  });

  it('rejects a javascript: image source', async () => {
    const html = await renderMarkdown('![bad](javascript:window.__xssFired=1)');
    expect(html).not.toContain('<img');
  });

  it('allows a normal http image source', async () => {
    const html = await renderMarkdown('![alt](https://example.com/pic.png)');
    expect(html).toContain('<img src="https://example.com/pic.png"');
  });
});

describe('renderMarkdown — external links open safely', () => {
  it('adds target=_blank and rel=noopener to rendered links', async () => {
    const html = await renderMarkdown('[a](https://example.com)');
    expect(html).toMatch(/target="_blank"/);
    expect(html).toMatch(/rel="noopener noreferrer"/);
  });
});

describe('sanitizeHtml — DOMPurify defense layer (independent of markdown-it)', () => {
  it('strips a script tag from raw HTML', async () => {
    const out = await sanitizeHtml('<p>hi</p><script>window.__xssFired = true;</script>');
    expect(out).not.toMatch(/<script/i);
    expect(out).toContain('<p>hi</p>');
  });

  it('strips an onerror event-handler attribute', async () => {
    const out = await sanitizeHtml('<img src="x" onerror="window.__xssFired = true">');
    expect(out).not.toMatch(/onerror/i);
  });

  it('strips a style tag and an iframe', async () => {
    const out = await sanitizeHtml('<style>body{background:url(http://evil.example/x)}</style><iframe src="http://evil.example"></iframe>');
    expect(out).not.toMatch(/<style/i);
    expect(out).not.toMatch(/<iframe/i);
  });

  it('preserves benign markup unchanged in structure', async () => {
    const out = await sanitizeHtml('<h1>Title</h1><p>Body <a href="https://example.com">link</a></p>');
    expect(out).toContain('<h1>Title</h1>');
    expect(out).toContain('<p>Body');
  });
});

describe('renderMarkdown — full XSS-attempt document, both defense layers together', () => {
  it('neutralizes a mixed battery of vectors end to end', async () => {
    const xss = [
      '# Legit heading',
      '',
      '<script>window.__xssFired = true;</script>',
      '',
      '<img src=x onerror="window.__xssFired = true">',
      '',
      '[click me](javascript:window.__xssFired=1)',
      '',
      'Safe paragraph.',
    ].join('\n');
    const html = await renderMarkdown(xss);
    // No live script element and no live img element (the event handler only ever
    // appears as inert, HTML-escaped text, never as an executable attribute).
    expect(html).not.toMatch(/<script[\s>]/i);
    expect(html).not.toMatch(/<img[\s>]/i);
    expect(html).not.toContain('<a ');
    expect(html).not.toMatch(/href="javascript:/i);
    expect(html).toContain('Legit heading');
    expect(html).toContain('Safe paragraph');
  });
});
