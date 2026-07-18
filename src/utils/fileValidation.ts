/**
 * File-type validation for the Markdown viewer.
 *
 * Accepts `.md` / `.markdown` files only. Validation returns a stable machine
 * `code` (not a message) so the UI can render the localized string for the current
 * locale — errors are surfaced through the island i18n table.
 */

/** Machine code the UI maps to a localized error string. */
export type ValidationCode = 'wrongType';

export interface ValidationResult {
  valid: boolean;
  code?: ValidationCode;
}

export const ALLOWED_EXTENSIONS = ['.md', '.markdown'] as const;

// Browsers commonly report an empty type for .md files, or 'text/plain' when the
// OS has no association for it; extension is authoritative and a non-empty MIME
// only needs to be one of these when the extension itself is missing/unrecognized.
const ALLOWED_MIME_TYPES = ['text/markdown', 'text/x-markdown', 'text/plain'];

/** Lower-cased extension including the dot, or '' when the name has none. */
export function getExtension(fileName: string): string {
  const dot = fileName.lastIndexOf('.');
  return dot >= 0 ? fileName.slice(dot).toLowerCase() : '';
}

export function validateFileExtension(fileName: string): ValidationResult {
  return (ALLOWED_EXTENSIONS as readonly string[]).includes(getExtension(fileName))
    ? { valid: true }
    : { valid: false, code: 'wrongType' };
}

/**
 * A file is accepted when its extension is allowed. When the extension is not
 * allowed we still accept it if the browser reported a Markdown/plain-text MIME
 * type (covers files with no/odd extension).
 */
export function validateFile(file: File): ValidationResult {
  if (validateFileExtension(file.name).valid) return { valid: true };
  if (file.type && ALLOWED_MIME_TYPES.includes(file.type.toLowerCase())) return { valid: true };
  return { valid: false, code: 'wrongType' };
}
