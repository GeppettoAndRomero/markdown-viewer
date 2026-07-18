/**
 * Parse a `.md`/`.markdown` file into sanitized, render-ready HTML, in the browser.
 *
 * Two independent layers of XSS defense, as required for this tool (issue #62):
 *
 * 1. markdown-it (MIT) parses Markdown to HTML with `html: false`, so any raw HTML
 *    written in the source (e.g. a literal `<script>` tag) is escaped as text, never
 *    passed through as markup. `validateLink` is overridden to only allow the
 *    `http:`, `https:` and `mailto:` schemes on links and images markdown-it itself
 *    generates from `[text](url)` / `![alt](url)` syntax — `javascript:`, `data:`,
 *    `vbscript:` and any other scheme are rejected. GFM tables and fenced code
 *    blocks need no extra plugin: markdown-it's default preset (used here) already
 *    includes the `table` rule and CommonMark fenced code blocks.
 *
 * 2. That HTML output is then run through DOMPurify (Apache-2.0) as a second,
 *    independent sanitization pass. This is defense in depth, not redundant: layer 1
 *    blocks one path (raw HTML / bad-scheme links in the *source*); DOMPurify
 *    sanitizes the actual *rendered output* regardless of how it was produced, so a
 *    future markdown-it option/plugin change that re-enabled HTML passthrough would
 *    still be caught here.
 *
 * Character-encoding detection (UTF-8 with a Shift_JIS fallback) is handled by
 * `./encoding.ts`, the same lightweight pattern already shipped in csv-viewer.
 */

import type MarkdownIt from 'markdown-it';
import { AppError } from './appError';
import { detectEncoding, decodeBytes, type Encoding } from './encoding';

// Both markdown-it and DOMPurify are only needed once a file is actually opened,
// so they are dynamically imported (their own build chunk — see astro.config.mjs —
// off the tool's initial page-load path) rather than imported at module scope.
// Only the type of markdown-it's default export is imported above; that import is
// erased at compile time and adds nothing to the bundle.
async function loadMarkdownIt() {
  return (await import('markdown-it')).default;
}
async function loadDOMPurify() {
  return (await import('dompurify')).default;
}

const ALLOWED_LINK_SCHEMES = new Set(['http:', 'https:', 'mailto:']);
const SCHEME_RE = /^[a-z][a-z0-9+.-]*:/i;

/**
 * markdown-it's `validateLink` hook: return false to drop a link/image URL rather
 * than render it. A URL with no scheme (a relative link or a same-page fragment)
 * is always allowed; a URL with an explicit scheme must be in the allow-list.
 */
function isSchemeAllowed(url: string): boolean {
  const trimmed = url.trim();
  if (!SCHEME_RE.test(trimmed)) return true;
  try {
    return ALLOWED_LINK_SCHEMES.has(new URL(trimmed).protocol);
  } catch {
    return false;
  }
}

let parser: MarkdownIt | null = null;

async function getParser(): Promise<MarkdownIt> {
  if (!parser) {
    const MarkdownItCtor = await loadMarkdownIt();
    parser = new MarkdownItCtor({ html: false });
    parser.validateLink = isSchemeAllowed;
  }
  return parser;
}

/**
 * Sanitize markdown-it's HTML output with DOMPurify (layer 2). `style`/`script`
 * and form-related tags/attributes are explicitly forbidden even though DOMPurify's
 * default config already strips script-capable markup, matching the same
 * belt-and-suspenders `FORBID_TAGS`/`FORBID_ATTR` pattern used by eml-viewer.
 * External links get `target="_blank" rel="noopener noreferrer"` so following a
 * link out of a viewed document behaves like a normal browser link, not a
 * same-tab navigation away from the tool.
 */
export async function sanitizeHtml(rawHtml: string): Promise<string> {
  const DOMPurify = await loadDOMPurify();

  const anchorHook = (node: Element) => {
    if (node.tagName === 'A' && node.hasAttribute('href')) {
      node.setAttribute('target', '_blank');
      node.setAttribute('rel', 'noopener noreferrer');
    }
  };

  DOMPurify.addHook('afterSanitizeAttributes', anchorHook);
  try {
    return DOMPurify.sanitize(rawHtml, {
      FORBID_TAGS: ['style', 'script', 'iframe', 'object', 'embed', 'form'],
      FORBID_ATTR: ['action', 'formaction'],
    });
  } finally {
    DOMPurify.removeHook('afterSanitizeAttributes');
  }
}

/** Render Markdown source to sanitized HTML (both defense layers). */
export async function renderMarkdown(source: string): Promise<string> {
  const md = await getParser();
  const rawHtml = md.render(source);
  return sanitizeHtml(rawHtml);
}

export interface ParsedMarkdown {
  /** Sanitized HTML, safe to render directly (e.g. via `dangerouslySetInnerHTML`). */
  html: string;
  /** Which encoding the source bytes were decoded as. */
  encoding: Encoding;
}

/**
 * Parse a dropped/picked `.md` file end-to-end: read bytes, decode (UTF-8 with a
 * Shift_JIS fallback), render, sanitize. Throws {@link AppError} on any failure —
 * never a raw/English message (the UI resolves the code to a localized string).
 *
 * Not unit-tested (see the vitest coverage-ignore markers below): jsdom's
 * `File`/`Blob` do not implement `arrayBuffer()`, a known jsdom gap, so this
 * File-consuming path is exercised end-to-end by the Playwright e2e suite instead
 * (real browser, real File API) — the same split eml-viewer uses for its own
 * `parseEmlFile`. `renderMarkdown`/`sanitizeHtml` above, which only take strings,
 * are fully unit-tested.
 */
/* v8 ignore start */
export async function parseMarkdownFile(file: File): Promise<ParsedMarkdown> {
  let buffer: ArrayBuffer;
  try {
    buffer = await file.arrayBuffer();
  } catch {
    throw new AppError('errUnreadable', { name: file.name });
  }

  const bytes = new Uint8Array(buffer);
  if (bytes.length === 0) {
    throw new AppError('errEmpty', { name: file.name });
  }

  const encoding = detectEncoding(bytes);
  const source = decodeBytes(bytes, encoding);
  if (source.trim() === '') {
    throw new AppError('errEmpty', { name: file.name });
  }

  let html: string;
  try {
    html = await renderMarkdown(source);
  } catch {
    throw new AppError('errParse', { name: file.name });
  }

  return { html, encoding };
}
/* v8 ignore stop */
