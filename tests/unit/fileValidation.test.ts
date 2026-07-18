import { describe, it, expect } from 'vitest';
import { getExtension, validateFileExtension, validateFile } from '@/utils/fileValidation';

const f = (name: string, type = ''): File => ({ name, type } as unknown as File);

describe('getExtension', () => {
  it('lower-cases and keeps the dot', () => {
    expect(getExtension('README.MD')).toBe('.md');
  });

  it('returns an empty string when there is no extension', () => {
    expect(getExtension('README')).toBe('');
  });
});

describe('validateFileExtension', () => {
  it('accepts .md regardless of case', () => {
    expect(validateFileExtension('notes.MD').valid).toBe(true);
  });

  it('accepts .markdown', () => {
    expect(validateFileExtension('notes.markdown').valid).toBe(true);
  });

  it('rejects an unrelated extension', () => {
    const result = validateFileExtension('photo.png');
    expect(result.valid).toBe(false);
    expect(result.code).toBe('wrongType');
  });
});

describe('validateFile', () => {
  it('accepts a file with the .md extension', () => {
    expect(validateFile(f('README.md', '')).valid).toBe(true);
  });

  it('accepts a file with the .markdown extension', () => {
    expect(validateFile(f('notes.markdown', '')).valid).toBe(true);
  });

  it('accepts a file with no/odd extension but a text/markdown mime type', () => {
    expect(validateFile(f('notes', 'text/markdown')).valid).toBe(true);
  });

  it('accepts a file with no/odd extension but a text/plain mime type', () => {
    expect(validateFile(f('notes', 'text/plain')).valid).toBe(true);
  });

  it('rejects a file that is neither .md/.markdown nor a markdown/plain-text mime type', () => {
    const result = validateFile(f('photo.png', 'image/png'));
    expect(result.valid).toBe(false);
    expect(result.code).toBe('wrongType');
  });
});
