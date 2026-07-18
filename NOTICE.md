# Third-party notices

The source code in this repository is licensed under the [MIT License](./LICENSE).
This tool has no third-party components under a copyleft license. Two runtime
dependencies carry their own permissive license and are recorded here.

## markdown-it — MIT

- **Package:** [`markdown-it`](https://github.com/markdown-it/markdown-it) — copyright
  Vitaly Puzrin, Alex Kocharin.
- **License:** MIT.
- **What it does here:** parses Markdown source to HTML in the browser, configured
  with `html: false` (raw HTML in the source is escaped, never passed through) and a
  `validateLink` override that only allows the `http:`, `https:` and `mailto:` link
  schemes.
- **Modifications:** none. Used unmodified as an npm dependency, configured at the
  call site (`src/utils/markdownEngine.ts`) via its public options/hook API — no
  changes to its own source.

## DOMPurify — used under the Apache License 2.0

- **Package:** [`DOMPurify`](https://github.com/cure53/DOMPurify) — copyright Cure53
  and other contributors.
- **License:** dual-licensed (Apache License 2.0 OR Mozilla Public License 2.0); this
  project uses it under the **Apache License 2.0**, reproduced in full in
  `node_modules/dompurify/LICENSE` and at
  <https://www.apache.org/licenses/LICENSE-2.0>.
- **What it does here:** sanitizes markdown-it's rendered HTML before it is shown —
  a second, independent defense layer on top of markdown-it's own `html: false` and
  link-scheme validation (see `src/utils/markdownEngine.ts`).
- **Modifications:** none. Used unmodified as an npm dependency, configured at the
  call site via its public hook/config API — no changes to its own source.

Other dependencies — Astro, Preact, and @astrojs/preact — are distributed under the
MIT License.
