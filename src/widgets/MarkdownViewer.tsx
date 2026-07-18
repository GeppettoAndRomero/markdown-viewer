/**
 * MarkdownViewer — the tool's only non-frozen widget.
 *
 * Opens a single `.md`/`.markdown` file chosen from the picker or dropped anywhere
 * on the page (via the frozen GlobalDropZone's `filesDropped` CustomEvent<File[]>),
 * parses + sanitizes it with `markdownEngine` (markdown-it with `html:false`, then
 * DOMPurify — two independent XSS defense layers), and renders the result. Only one
 * file is shown at a time — no multi-file "bookshelf", no tabs (out of scope for
 * this MVP, see issue #62). Everything runs in the browser; the file is never sent
 * anywhere.
 *
 * The island receives `locale` as a prop (present during SSR) and reads all strings
 * from the i18n table, so SSR and client render identically.
 */

import { useState, useEffect, useCallback } from 'preact/hooks';
import { AppCard } from './AppCard';
import { AppButton } from './AppButton';
import { ui } from '@/i18n/ui';
import { validateFile } from '@/utils/fileValidation';
import { parseMarkdownFile } from '@/utils/markdownEngine';
import { resolveErrorMessage } from '@/utils/appError';

type ErrorCode = 'wrongType' | 'other';

interface MarkdownViewerProps {
  locale?: string;
}

export function MarkdownViewer({ locale = 'en' }: MarkdownViewerProps) {
  const t = (ui as any)[locale] ?? ui.en;

  const [fileName, setFileName] = useState<string | null>(null);
  const [html, setHtml] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [errorCode, setErrorCode] = useState<ErrorCode | null>(null);
  const [errorText, setErrorText] = useState<string>('');

  const finish = useCallback(() => {
    window.dispatchEvent(new CustomEvent('filesProcessed'));
  }, []);

  const reset = useCallback(() => {
    setFileName(null);
    setHtml(null);
    setErrorCode(null);
    setErrorText('');
    const input = document.getElementById('markdown-file-input') as HTMLInputElement | null;
    if (input) input.value = '';
  }, []);

  const handleFile = useCallback(
    async (file: File) => {
      const validation = validateFile(file);
      if (!validation.valid) {
        setHtml(null);
        setErrorCode('wrongType');
        setErrorText(t.errWrongType.replace('{name}', file.name));
        return;
      }
      setBusy(true);
      setErrorCode(null);
      try {
        const parsed = await parseMarkdownFile(file);
        setHtml(parsed.html);
        setFileName(file.name);
      } catch (error) {
        setHtml(null);
        setErrorCode('other');
        setErrorText(resolveErrorMessage(error, t));
      } finally {
        setBusy(false);
      }
    },
    [t]
  );

  const handleFiles = useCallback(
    async (files: File[]) => {
      // A viewer shows one document; take the first if several are dropped.
      if (files.length > 0) await handleFile(files[0]);
      finish();
    },
    [handleFile, finish]
  );

  useEffect(() => {
    (globalThis as Record<string, unknown>).__toolReady = true;
  }, []);

  useEffect(() => {
    const handler = (e: Event) => void handleFiles((e as CustomEvent<File[]>).detail ?? []);
    window.addEventListener('filesDropped', handler);
    return () => window.removeEventListener('filesDropped', handler);
  }, [handleFiles]);

  const onPick = (e: Event) => {
    const input = e.currentTarget as HTMLInputElement;
    const files = Array.from(input.files ?? []);
    void handleFiles(files);
    input.value = '';
  };

  return (
    <div>
      <AppCard>
        <div style="margin-bottom: var(--space-4);">
          <h2 style="margin: 0 0 var(--space-1) 0; font-size: var(--fs-4); font-weight: 600;">
            {t.uploadHeading}
          </h2>
          <p style="margin: 0; font-size: var(--fs-2); color: var(--color-subtle);">
            {t.uploadSubtitle}
          </p>
        </div>

        <button
          type="button"
          class="md-dropzone"
          onClick={() => document.getElementById('markdown-file-input')?.click()}
        >
          <span class="md-dropzone__icon" aria-hidden="true">
            📝
          </span>
          <span class="md-dropzone__title">{t.dropClick}</span>
          <span class="md-dropzone__hint">{t.dropOr}</span>
          <span class="md-dropzone__hint">{t.dropSupported}</span>
        </button>
        <input
          id="markdown-file-input"
          type="file"
          accept=".md,.markdown,text/markdown"
          onChange={onPick}
          style="display: none;"
        />
      </AppCard>

      {busy && <p style="color: var(--color-subtle); margin-top: var(--space-3);">…</p>}

      {errorCode && (
        <div class="md-error" role="alert" data-testid="error">
          <span class="md-error__icon" aria-hidden="true">
            ⚠
          </span>
          <span data-testid="error-message">{errorText}</span>
        </div>
      )}

      {html !== null && (
        <AppCard className="mt-6">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: var(--space-3); margin-bottom: var(--space-4);">
            <span
              title={fileName ?? ''}
              data-testid="file-name"
              style="font-size: var(--fs-1); color: var(--color-subtle); overflow-wrap: anywhere;"
            >
              {fileName}
            </span>
            <AppButton variant="secondary" onClick={reset}>
              {t.loadAnother}
            </AppButton>
          </div>

          <div
            class="md-content"
            data-testid="markdown-content"
            role="article"
            aria-label={t.contentLabel}
            // html is sanitized by markdownEngine (markdown-it html:false + DOMPurify)
            // before it ever reaches this component — see src/utils/markdownEngine.ts.
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </AppCard>
      )}
    </div>
  );
}
