import { describe, it, expect } from 'vitest';
import { detectEncoding, decodeBytes } from '@/utils/encoding';

const utf8 = (s: string) => new TextEncoder().encode(s);

// Shift_JIS bytes for 「日本」 (0x93 0xFA 0x96 0x7B). 0x93 is not a valid UTF-8
// lead byte, so a strict UTF-8 decode of these bytes fails.
const SJIS_NIHON = new Uint8Array([0x93, 0xfa, 0x96, 0x7b]);

describe('detectEncoding', () => {
  it('detects valid UTF-8', () => {
    expect(detectEncoding(utf8('# 見出し\n\n本文です。\n'))).toBe('utf-8');
  });

  it('detects plain ASCII as UTF-8', () => {
    expect(detectEncoding(utf8('# Title\n\nSome *text*.\n'))).toBe('utf-8');
  });

  it('detects a UTF-8 BOM as UTF-8', () => {
    const bom = new Uint8Array([0xef, 0xbb, 0xbf]);
    const bytes = new Uint8Array([...bom, ...utf8('# Title\n')]);
    expect(detectEncoding(bytes)).toBe('utf-8');
  });

  it('falls back to Shift_JIS on invalid UTF-8', () => {
    expect(detectEncoding(SJIS_NIHON)).toBe('shift-jis');
  });
});

describe('decodeBytes', () => {
  it('round-trips UTF-8', () => {
    expect(decodeBytes(utf8('héllo, 世界'), 'utf-8')).toBe('héllo, 世界');
  });

  it('strips a UTF-8 BOM', () => {
    const bom = new Uint8Array([0xef, 0xbb, 0xbf]);
    const bytes = new Uint8Array([...bom, ...utf8('# Title')]);
    expect(decodeBytes(bytes, 'utf-8')).toBe('# Title');
  });

  it('decodes Shift_JIS bytes to the right characters', () => {
    expect(decodeBytes(SJIS_NIHON, 'shift-jis')).toBe('日本');
  });
});
