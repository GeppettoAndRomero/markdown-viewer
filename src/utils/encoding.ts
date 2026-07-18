/**
 * Character-encoding detection for the Markdown viewer.
 *
 * Ported from the same pattern already shipped in csv-viewer's `csvParse.ts`: try a
 * strict UTF-8 decode first, and fall back to Shift_JIS only if that fails. Both
 * decoders are the browser-native `TextDecoder` (no library, no user-facing "choose
 * encoding" control) — this covers the common case of legacy Japanese `.md` files
 * saved as Shift_JIS from an editor that defaults to it, without adding UI surface
 * for the rare cases that aren't UTF-8 or Shift_JIS.
 */

/** Character encodings the viewer can decode. Both are TextDecoder-native. */
export type Encoding = 'utf-8' | 'shift-jis';

/**
 * Decode bytes as strict UTF-8, falling back to Shift_JIS.
 *
 * A file that is valid UTF-8 decodes as UTF-8; otherwise the strict (`fatal`)
 * decode throws and we treat it as Shift_JIS. Both decoders are built into the
 * browser.
 */
export function detectEncoding(bytes: Uint8Array): Encoding {
  try {
    new TextDecoder('utf-8', { fatal: true }).decode(bytes);
    return 'utf-8';
  } catch {
    return 'shift-jis';
  }
}

/**
 * Decode bytes with the given encoding. UTF-8 strips a leading BOM (TextDecoder
 * does this for 'utf-8'). Shift_JIS is decoded leniently (unmappable bytes become
 * U+FFFD) so the viewer never hard-fails on a stray byte.
 */
export function decodeBytes(bytes: Uint8Array, encoding: Encoding): string {
  return new TextDecoder(encoding).decode(bytes);
}
