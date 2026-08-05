import type { ToolContent } from './types';

// Español. Transcreación basada en el vocabulario que usan los visores de
// Markdown/README en español, no traducción literal. Sin palabras publicitarias
// (fácil / rápido / perfecto…); la privacidad se explica de forma estructural, no
// como promesa (BRAND-OPERATING-MODEL / I18N-SEO-GUIDELINE). La doble defensa
// (html:false + DOMPurify) se nombra de forma concreta, no como una afirmación
// genérica de "seguro". Español pan-regional, registro «tú». htmlLang 'es'.

export const es: ToolContent = {
  htmlLang: 'es',

  meta: {
    title: 'Markdown Viewer — abre archivos .md en tu navegador, sin subir nada | runlocally',
    description:
      'Abre un archivo .md o .markdown local en tu navegador y léelo como HTML renderizado y depurado. El archivo se lee en tu dispositivo y no se sube a ningún sitio. Compatible con tablas GFM y bloques de código. Código abierto, funciona sin conexión.',
    ogTitle: 'Markdown Viewer — abre archivos .md en tu navegador, sin subir nada',
    ogDescription:
      'Lee un archivo .md o .markdown renderizado y depurado, por completo en tu navegador. No se sube nada. Código abierto, funciona sin conexión.',
  },

  hero: {
    h1: 'Markdown (.md) Viewer',
    tagline:
      'Abre un archivo .md o .markdown local y léelo como HTML renderizado, directamente en tu navegador. No se sube nada.',
  },

  intro: {
    h2: 'Leer un archivo Markdown en tu navegador',
    paras: [
      'Un archivo .md es texto plano con formato Markdown: un README, una nota, documentación exportada de otra herramienta. Esta herramienta lo abre y muestra el resultado renderizado —títulos, listas, enlaces, tablas y bloques de código— formateado como lo mostraría un editor compatible con Markdown o un servicio de alojamiento de Git. El archivo se lee en tu dispositivo; no se envía a ningún sitio.',
      'El análisis lo hace markdown-it, configurado para no dejar pasar nunca el HTML sin procesar del origen tal cual a la página. El HTML resultante se depura de nuevo, de forma independiente, con DOMPurify antes de mostrarse: dos defensas separadas frente a un archivo que intente ejecutar código en tu navegador.',
      'Son compatibles las tablas GFM y los bloques de código delimitados con acentos graves. Es un visor de un solo archivo: muestra un documento a la vez, sin pestañas, panel de front matter, tabla de contenidos ni cambio de tema.',
    ],
  },

  privacy: {
    h2: 'Por qué tu archivo no sale de tu dispositivo',
    lead: 'Aquí la privacidad es estructural, no una promesa. No hay un paso de subida porque no hay ningún servidor al que enviar nada:',
    points: [
      'La lectura, el análisis y el renderizado se ejecutan por completo en tu navegador.',
      'El HTML renderizado se depura antes de mostrarse, independientemente de cómo se haya generado.',
      'La página se sirve como archivos estáticos y no envía ninguna petición con tus datos.',
      'El código es abierto y cualquiera puede leerlo (MIT).',
      'Funciona sin conexión, algo que solo es posible porque nada sale del dispositivo.',
    ],
    note: 'Si quieres comprobarlo tú mismo, abre el panel de Red de tu navegador mientras abres un archivo: ninguna petición lleva su contenido.',
    sourceLinkText: 'Leer el código fuente.',
  },

  howto: {
    h2: 'Cómo se usa',
    steps: [
      {
        h3: 'Abre un archivo',
        p: 'Haz clic para elegir un archivo .md o .markdown, o suéltalo en cualquier parte de la página. El archivo se lee en local.',
      },
      {
        h3: 'Lee el documento renderizado',
        p: 'Los títulos, listas, enlaces, tablas y bloques de código aparecen de inmediato, formateados y depurados.',
      },
      {
        h3: 'Abre otro archivo',
        p: 'Usa «Abrir otro archivo» para cerrar el documento actual y elegir uno distinto.',
      },
    ],
  },

  faqHeading: 'Preguntas frecuentes',
  faq: [
    {
      q: '¿Se sube mi archivo a algún sitio?',
      a: 'No. La lectura, el análisis y el renderizado se ejecutan por completo en tu navegador. No hay ningún componente de servidor, así que su contenido no tiene forma de salir del dispositivo. El código es abierto y puedes confirmarlo en el panel de Red de tu navegador.',
    },
    {
      q: '¿Es seguro abrir un archivo Markdown que me ha dado otra persona?',
      a: 'El analizador está configurado con el HTML sin procesar desactivado, así que cualquier HTML escrito en el origen se muestra como texto, no se ejecuta como marcado. El resultado renderizado se vuelve a depurar de forma independiente con DOMPurify antes de mostrarse. Los enlaces solo admiten los esquemas http, https y mailto; el resto se rechaza.',
    },
    {
      q: '¿Es compatible con tablas y bloques de código?',
      a: 'Sí. Las tablas de Markdown al estilo GitHub y los bloques de código delimitados con acentos graves (```) se renderizan sin configuración adicional.',
    },
    {
      q: '¿Muestra el front matter o una tabla de contenidos?',
      a: 'En esta versión no. Es un visor sencillo de un solo documento, sin panel de front matter, tabla de contenidos, pestañas para varios archivos ni cambio de tema.',
    },
    {
      q: '¿Puedo editar el archivo?',
      a: 'No. Es un visor de solo lectura para un archivo Markdown local; no edita el archivo ni guarda cambios en él.',
    },
    {
      q: '¿Admite archivos en japonés u otras codificaciones distintas de UTF-8?',
      a: 'Sí. El archivo se decodifica primero como UTF-8 y, si eso falla, como Shift_JIS: las dos codificaciones habituales en las que suele guardarse un archivo Markdown. No hay un selector manual de codificación.',
    },
    {
      q: '¿Funciona sin conexión?',
      a: 'Sí. Es una PWA. Tras la primera visita queda guardada en la caché, de modo que se puede abrir sin conexión a la red. También puedes instalarla en tu pantalla de inicio.',
    },
  ],

  footer: {
    openSourceLabel: 'Código abierto (MIT)',
    partOf: 'parte de',
    brandTail: '— pequeñas herramientas que funcionan localmente en tu dispositivo.',
    colophon:
      'Creado y mantenido por Geppetto. Parte del código se escribe con ayuda de IA; la revisión y las decisiones son del responsable del proyecto.',
    securityText: 'Seguridad',
  },
};
