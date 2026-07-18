# Security Policy

`markdown-viewer` runs entirely in your browser. There is no server component and no
account system, so the files you open are never uploaded. Most classic web
vulnerabilities (server-side injection, auth bypass, data exfiltration via a
backend) do not apply.

A `.md` file is untrusted content: its Markdown source could be crafted to attempt
XSS against this page. We take that seriously — the file is parsed with
markdown-it configured with `html: false` (raw HTML in the source is escaped, never
passed through) and a `validateLink` override that only allows the `http:`,
`https:` and `mailto:` link schemes, and the rendered HTML is then independently
sanitized again with DOMPurify before it is shown. We also care about supply-chain
issues in dependencies, a service worker caching bug, or anything that could cause
a file to leave your device.

## Reporting a vulnerability

Please report suspected vulnerabilities privately, not in a public issue:

- Email: **security@runlocally.app**
- Or use GitHub's private vulnerability reporting (Security → Report a vulnerability).

Include what you found, steps to reproduce, and the impact you expect. We aim to
acknowledge within a few days. Please give us a reasonable window to ship a fix
before public disclosure.

## Scope

In scope:

- This repository's source and the deployed site.
- The Markdown parsing and HTML-sanitization pipeline, the service worker, and the
  PWA manifest.
- Anything that could execute script from an opened file, fetch a resource
  referenced in a file, or send file data off the device.

Out of scope:

- Findings that require a compromised device or a malicious browser extension.
- Missing hardening headers that have no concrete exploit.

Thank you for helping keep users safe.
