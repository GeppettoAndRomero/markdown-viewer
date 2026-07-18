# XSS attempt

<script>window.__xssFired = true;</script>

<img src="x" onerror="window.__xssFired = true">

<svg onload="window.__xssFired = true"></svg>

[click me](javascript:window.__xssFired = true)

<iframe src="https://example.invalid/pwn"></iframe>

<style>body { background: url(http://example.invalid/style-track.png); }</style>

Legitimate paragraph that should remain visible.
