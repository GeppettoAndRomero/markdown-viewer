# Test fixtures

All files here are self-authored for this repository's tests (no third-party
content, no personal data) and are released under the same license as the rest of
this repository (MIT / CC0 for the purpose of test fixtures).

- `plain.md` — a small, well-formed document used as the smoke-test fixture
  (headings, a list, a link).
- `tables-code.md` — exercises GFM table rendering and a fenced code block.
- `xss.md` — a battery of XSS-attempt vectors (raw `<script>`, an `onerror`
  handler, an `onload` handler, a `javascript:` link, an `<iframe>`, and a
  `<style>` block with a remote `url()`) used to verify markdown-it's `html:false`
  and the DOMPurify sanitization pass both hold, and that nothing in it executes.
- `japanese-shiftjis.md` — the same short Japanese document as
  `bom-utf8.md`'s body, saved as raw Shift_JIS bytes (not UTF-8), to exercise the
  encoding-detection fallback. Regenerate with:
  ```python
  text = "# 日本語のテスト\n\nこれは Shift_JIS で保存された Markdown ファイルです。\n文字化けしていないことを確認してください。\n"
  open("japanese-shiftjis.md", "wb").write(text.encode("shift_jis"))
  ```
- `bom-utf8.md` — a UTF-8 file with a leading byte-order mark (`EF BB BF`), to
  confirm the BOM is stripped rather than shown as a stray character. Regenerate
  with:
  ```python
  text = "# BOM 付き UTF-8\n\nこのファイルは UTF-8 BOM 付きで保存されています。\n"
  open("bom-utf8.md", "wb").write(b"\xef\xbb\xbf" + text.encode("utf-8"))
  ```
