import type { ToolContent } from './types';

export const en: ToolContent = {
  htmlLang: 'en',

  meta: {
    title: 'Markdown Viewer — Open .md Files in Your Browser, No Upload | runlocally',
    description:
      'Open a local .md or .markdown file in your browser and read it as rendered, sanitized HTML. The file is read on your device and never uploaded. GFM tables and fenced code blocks are supported. Open source, works offline.',
    ogTitle: 'Markdown Viewer — Open .md Files in Your Browser, No Upload',
    ogDescription:
      'Read a .md or .markdown file — rendered and sanitized — entirely in your browser. Nothing is uploaded. Open source, works offline.',
  },

  hero: {
    h1: 'Markdown (.md) Viewer',
    tagline:
      'Open a local .md or .markdown file and read it as rendered HTML, right in your browser. Nothing is uploaded.',
  },

  intro: {
    h2: 'Read a Markdown file in your browser',
    paras: [
      'A .md file is plain text with Markdown formatting — a README, a note, documentation exported from another tool. This tool opens it and shows the rendered result: headings, lists, links, tables and code blocks, formatted the way a Markdown-aware editor or Git host would show it. The file is read on your device; it is never sent anywhere.',
      'Parsing is done with markdown-it, configured to never pass raw HTML from the source through to the page. The rendered output is then sanitized again, independently, with DOMPurify before it is shown — two separate defenses against a file being used to run script in your browser.',
      'GFM tables and fenced code blocks are supported. This is a single-file viewer: it shows one document at a time, with no tabs, front-matter panel, table of contents, or theme switcher.',
    ],
  },

  privacy: {
    h2: 'Why your file stays on your device',
    lead: 'Privacy here is structural, not a promise — there is no upload step because there is no server to send it to:',
    points: [
      'The file is read, parsed and rendered entirely in your browser.',
      'The rendered HTML is sanitized before it is shown, independently of how it was produced.',
      'The page is served as static files and makes no request that carries your data.',
      'The source is open and anyone can read it (MIT).',
      'It works offline, which is only possible because nothing leaves the device.',
    ],
    note: "If you want to check for yourself, open your browser's Network panel while you open a file — no request carries its contents.",
    sourceLinkText: 'Read the source.',
  },

  howto: {
    h2: 'How to use it',
    steps: [
      {
        h3: 'Open a file',
        p: 'Click to choose a .md or .markdown file, or drop it anywhere on the page. The file is read locally.',
      },
      {
        h3: 'Read the rendered document',
        p: 'Headings, lists, links, tables and code blocks appear immediately, formatted and sanitized.',
      },
      {
        h3: 'Open another file',
        p: 'Use "Open another file" to close the current document and pick a different one.',
      },
    ],
  },

  faqHeading: 'FAQ',
  faq: [
    {
      q: 'Is my file uploaded anywhere?',
      a: "No. The file is read, parsed and rendered entirely in your browser. There is no server component, so its contents have no path off your device. The source is open and you can confirm this in your browser's Network panel.",
    },
    {
      q: 'Is it safe to open a Markdown file from someone else?',
      a: 'The parser is configured with raw HTML disabled, so any HTML written in the source is shown as text, not executed as markup. The rendered output is then independently sanitized again with DOMPurify before it is displayed. Links use only the http, https and mailto schemes — other schemes are rejected.',
    },
    {
      q: 'Does it support tables and code blocks?',
      a: 'Yes. GitHub-flavored Markdown tables and fenced code blocks (```) are rendered without any extra setup.',
    },
    {
      q: 'Does it show front-matter or a table of contents?',
      a: 'Not in this version. This is a straightforward single-document viewer — no front-matter panel, table of contents, multi-file tabs, or theme switcher.',
    },
    {
      q: 'Can I edit the file?',
      a: 'No. This is a read-only viewer for a local Markdown file; it does not edit or save changes back to the file.',
    },
    {
      q: 'Does it handle Japanese or other non-UTF-8 files?',
      a: 'Yes. The file is decoded as UTF-8, and if that fails, as Shift_JIS — the two encodings a typical Markdown file is saved in. There is no manual encoding selector.',
    },
    {
      q: 'Does it work offline?',
      a: 'Yes. It is a PWA. After the first visit it is cached, so it opens without a network connection. You can also install it to your home screen.',
    },
  ],

  footer: {
    openSourceLabel: 'Open source (MIT)',
    partOf: 'part of',
    brandTail: '— small tools that run locally on your device.',
    colophon:
      "Built and maintained by Geppetto. Some code is written with AI assistance; all review and decisions are the maintainer's.",
    securityText: 'Security',
  },

  related: {
    h2: 'Related tools',
    blogLinkText: 'Read the technical notes',
  },
};
