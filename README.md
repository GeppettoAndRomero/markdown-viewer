# markdown-viewer

Open a local `.md`/`.markdown` file in your browser and read it as rendered,
sanitized HTML — entirely on your device. Files are never uploaded. Open source,
works offline (PWA).

Part of [runlocally](https://runlocally.app) — small tools that run locally on your device.

## How it works

[`markdown-it`](https://github.com/markdown-it/markdown-it) parses the Markdown
source to HTML in the browser, configured with `html: false` (raw HTML written in
the source is escaped, never passed through as markup) and a `validateLink`
override that only allows the `http:`, `https:` and `mailto:` link schemes —
`javascript:`, `data:` and other schemes are rejected. GFM tables and fenced code
blocks are supported out of the box (markdown-it's default preset).

That HTML output is then run through [DOMPurify](https://github.com/cure53/DOMPurify)
as a second, independent sanitization pass — defense in depth: even if a future
config change re-enabled HTML passthrough in the parser, DOMPurify still sanitizes
the actual rendered output before it is shown.

Character encoding is detected automatically: the file is decoded as strict UTF-8
first, falling back to Shift_JIS if that fails (the same lightweight pattern already
shipped in csv-viewer). There is no user-facing "choose encoding" control.

The whole pipeline runs client-side; there is no server component, so a file has no
path off the device.

## Features

- Open a single `.md`/`.markdown` file (drag-and-drop or file picker)
- Sanitized rendering with two independent XSS defense layers
- GFM tables and fenced code blocks
- Automatic UTF-8 / Shift_JIS encoding detection
- Works offline (PWA), installable

## Out of scope for this version

Front-matter/metadata display, multi-file or tabbed viewing, a table of contents,
theme switching, and ZIP extraction are not implemented. This tool only displays
Markdown; editing a rendered table is handled by a separate tool.

## Develop

```bash
npm install
npm run dev      # dev server
npm run build    # type-check + production build to dist/
```

Stack: Astro + Preact + TypeScript. Parsing and sanitization run on the main thread
(no Worker needed — Markdown parsing is lightweight).

## Browser support

Works in current Chrome, Edge, Firefox and Safari. Relies on the browser's native
`TextDecoder` supporting Shift_JIS, which all evergreen browsers implement.

## License

[MIT](./LICENSE). Built and maintained by Geppetto. Some code is written with AI
assistance; all review and decisions are the maintainer's.
