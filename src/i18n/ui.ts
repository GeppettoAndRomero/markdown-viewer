/**
 * Interactive-island strings, per locale. Separate from page-level content
 * (`en.ts` / `ja.ts` …): this is the text the Preact islands render.
 *
 * IMPORTANT: islands receive `locale` as a PROP (present during SSR) and never
 * read it from `document`. SSR and client render the same string, so there is no
 * hydration mismatch.
 *
 * Interpolated strings carry `{name}` templates; the island does `.replace('{name}', x)`.
 */
export const ui = {
  en: {
    // MarkdownViewer — open / dropzone
    uploadHeading: 'Open a file',
    uploadSubtitle: 'Choose a .md or .markdown file. It is read on your device.',
    dropClick: 'Click to choose a file',
    dropOr: 'or drop it anywhere on the page',
    dropSupported: 'Supported: .md, .markdown',

    // MarkdownViewer — rendered document
    contentLabel: 'Rendered document',
    loadAnother: 'Open another file',

    // MarkdownViewer — error states
    errWrongType: '{name} is not a supported file. Choose a .md or .markdown file.',
    errEmpty: 'The file {name} is empty — there is nothing to show.',
    errUnreadable: 'The file {name} could not be read. Please try again.',
    errParse: 'The file {name} could not be rendered as Markdown.',
    errConversionFailed: 'This file could not be opened.',

    // GlobalDropZone
    dzProcessing: 'Opening {count} file(s)…',
    dzPleaseWait: 'Please wait',
    dzDropTitle: 'Drop a file to view',
    dzDropSub: '.md and .markdown files can be viewed',

    // InstallPrompt
    installHeading: 'Install app',
    installBody: 'Add to your home screen for quick access.',
    install: 'Install',
    later: 'Later',

    // ThemeToggle
    themeToLight: 'Switch to light mode',
    themeToDark: 'Switch to dark mode',
    themeLabel: 'Theme',

    // shared
    required: 'Required',
    close: 'Close',
  },
  ja: {
    // MarkdownViewer — open / dropzone
    uploadHeading: 'ファイルを開く',
    uploadSubtitle: '.md または .markdown ファイルを選んでください。ファイルは端末内で読み込まれます。',
    dropClick: 'クリックしてファイルを選択',
    dropOr: 'またはページ上にドロップ',
    dropSupported: '対応形式: .md, .markdown',

    // MarkdownViewer — rendered document
    contentLabel: '表示中のドキュメント',
    loadAnother: '別のファイルを開く',

    // MarkdownViewer — error states
    errWrongType: '{name} は対応していない形式です。.md または .markdown ファイルを選んでください。',
    errEmpty: 'ファイル {name} は空です。表示する内容がありません。',
    errUnreadable: 'ファイル {name} を読み込めませんでした。もう一度お試しください。',
    errParse: 'ファイル {name} を Markdown として表示できませんでした。',
    errConversionFailed: 'このファイルを開けませんでした。',

    // GlobalDropZone
    dzProcessing: '{count} 件のファイルを開いています…',
    dzPleaseWait: 'お待ちください',
    dzDropTitle: 'ドロップで表示',
    dzDropSub: '.md・.markdown ファイルを表示できます',

    // InstallPrompt
    installHeading: 'アプリを追加',
    installBody: 'ホーム画面に追加すると、すぐに開けます。',
    install: '追加',
    later: 'あとで',

    // ThemeToggle
    themeToLight: 'ライトモードに切り替え',
    themeToDark: 'ダークモードに切り替え',
    themeLabel: 'テーマ',

    // shared
    required: '必須',
    close: '閉じる',
  },
  zh: {
    // MarkdownViewer — open / dropzone
    uploadHeading: '打开文件',
    uploadSubtitle: '选择一个 .md 或 .markdown 文件。文件在你的设备上读取。',
    dropClick: '点击选择文件',
    dropOr: '或把文件拖到页面任意位置',
    dropSupported: '支持格式：.md、.markdown',

    // MarkdownViewer — rendered document
    contentLabel: '渲染后的文档',
    loadAnother: '打开其他文件',

    // MarkdownViewer — error states
    errWrongType: '{name} 不是受支持的文件。请选择 .md 或 .markdown 文件。',
    errEmpty: '文件 {name} 为空，没有可显示的内容。',
    errUnreadable: '无法读取文件 {name}。请重试。',
    errParse: '无法将文件 {name} 渲染为 Markdown。',
    errConversionFailed: '无法打开此文件。',

    // GlobalDropZone
    dzProcessing: '正在打开 {count} 个文件…',
    dzPleaseWait: '请稍候',
    dzDropTitle: '拖放即可查看',
    dzDropSub: '可以查看 .md、.markdown 文件',

    // InstallPrompt
    installHeading: '安装应用',
    installBody: '添加到主屏幕，方便随时打开。',
    install: '安装',
    later: '以后再说',

    // ThemeToggle
    themeToLight: '切换到浅色模式',
    themeToDark: '切换到深色模式',
    themeLabel: '主题',

    // shared
    required: '必填',
    close: '关闭',
  },
  de: {
    // MarkdownViewer — open / dropzone
    uploadHeading: 'Datei öffnen',
    uploadSubtitle: 'Wähle eine .md- oder .markdown-Datei. Sie wird auf deinem Gerät gelesen.',
    dropClick: 'Zum Auswählen klicken',
    dropOr: 'oder Datei irgendwo auf die Seite ziehen',
    dropSupported: 'Unterstützt: .md, .markdown',

    // MarkdownViewer — rendered document
    contentLabel: 'Dargestelltes Dokument',
    loadAnother: 'Andere Datei öffnen',

    // MarkdownViewer — error states
    errWrongType: '{name} ist kein unterstütztes Format. Wähle eine .md- oder .markdown-Datei.',
    errEmpty: 'Die Datei {name} ist leer – es gibt nichts anzuzeigen.',
    errUnreadable: 'Die Datei {name} konnte nicht gelesen werden. Bitte versuche es erneut.',
    errParse: 'Die Datei {name} konnte nicht als Markdown dargestellt werden.',
    errConversionFailed: 'Diese Datei konnte nicht geöffnet werden.',

    // GlobalDropZone
    dzProcessing: '{count} Datei(en) werden geöffnet …',
    dzPleaseWait: 'Bitte warten',
    dzDropTitle: 'Datei zum Ansehen ablegen',
    dzDropSub: '.md- und .markdown-Dateien können angezeigt werden',

    // InstallPrompt
    installHeading: 'App installieren',
    installBody: 'Zum Startbildschirm hinzufügen, um es direkt zu öffnen.',
    install: 'Installieren',
    later: 'Später',

    // ThemeToggle
    themeToLight: 'Zum hellen Modus wechseln',
    themeToDark: 'Zum dunklen Modus wechseln',
    themeLabel: 'Design',

    // shared
    required: 'Erforderlich',
    close: 'Schließen',
  },
  es: {
    // MarkdownViewer — open / dropzone
    uploadHeading: 'Abrir un archivo',
    uploadSubtitle: 'Elige un archivo .md o .markdown. Se lee en tu dispositivo.',
    dropClick: 'Haz clic para elegir un archivo',
    dropOr: 'o suéltalo en cualquier parte de la página',
    dropSupported: 'Compatible: .md, .markdown',

    // MarkdownViewer — rendered document
    contentLabel: 'Documento renderizado',
    loadAnother: 'Abrir otro archivo',

    // MarkdownViewer — error states
    errWrongType: '{name} no es un archivo compatible. Elige un archivo .md o .markdown.',
    errEmpty: 'El archivo {name} está vacío: no hay nada que mostrar.',
    errUnreadable: 'No se pudo leer el archivo {name}. Inténtalo de nuevo.',
    errParse: 'No se pudo renderizar el archivo {name} como Markdown.',
    errConversionFailed: 'No se pudo abrir este archivo.',

    // GlobalDropZone
    dzProcessing: 'Abriendo {count} archivo(s)…',
    dzPleaseWait: 'Espera un momento',
    dzDropTitle: 'Suelta un archivo para verlo',
    dzDropSub: 'Se pueden ver archivos .md y .markdown',

    // InstallPrompt
    installHeading: 'Instalar la app',
    installBody: 'Añádela a tu pantalla de inicio para tenerla siempre a mano.',
    install: 'Instalar',
    later: 'Más tarde',

    // ThemeToggle
    themeToLight: 'Cambiar al modo claro',
    themeToDark: 'Cambiar al modo oscuro',
    themeLabel: 'Tema',

    // shared
    required: 'Obligatorio',
    close: 'Cerrar',
  },
} as const;

export type UiStrings = (typeof ui)['en'];
