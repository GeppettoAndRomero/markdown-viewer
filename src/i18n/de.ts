import type { ToolContent } from './types';

// Deutsch. Keine Wort-für-Wort-Übersetzung, sondern Transkreation auf Basis der
// Begriffe, die deutsche Markdown-Viewer/README-Vorschau-Tools tatsächlich verwenden.
// Keine Werbefloskeln (einfach / schnell / perfekt) — Datenschutz wird strukturell
// begründet, nicht versprochen (BRAND-OPERATING-MODEL / I18N-SEO-GUIDELINE). Die
// zweistufige Absicherung (html:false + DOMPurify) wird konkret benannt, nicht nur
// pauschal als "sicher" behauptet. Register: informelles „du".

export const de: ToolContent = {
  htmlLang: 'de',

  meta: {
    title: 'Markdown Viewer — .md-Dateien im Browser öffnen, ohne Upload | runlocally',
    description:
      'Öffne eine lokale .md- oder .markdown-Datei im Browser und lies sie als bereinigtes, gerendertes HTML. Die Datei wird auf deinem Gerät gelesen und nicht hochgeladen. GFM-Tabellen und Codeblöcke werden unterstützt. Open Source, funktioniert offline.',
    ogTitle: 'Markdown Viewer — .md-Dateien im Browser öffnen, ohne Upload',
    ogDescription:
      'Eine .md- oder .markdown-Datei gerendert und bereinigt anzeigen — komplett im Browser. Nichts wird hochgeladen. Open Source, offline nutzbar.',
  },

  hero: {
    h1: 'Markdown (.md) Viewer',
    tagline:
      'Öffne eine lokale .md- oder .markdown-Datei und lies sie als gerendertes HTML, direkt im Browser. Nichts wird hochgeladen.',
  },

  intro: {
    h2: 'MD-Datei (.md) im Browser öffnen',
    paras: [
      'Eine .md-Datei ist Klartext mit Markdown-Formatierung — eine README, eine Notiz, aus einem anderen Tool exportierte Dokumentation. Dieses Tool öffnet sie und zeigt das gerenderte Ergebnis: Überschriften, Listen, Links, Tabellen und Codeblöcke, so formatiert wie es ein Markdown-fähiger Editor oder ein Git-Hoster anzeigen würde. Die Datei wird auf deinem Gerät gelesen; sie wird nirgendwohin gesendet.',
      'Das Parsing übernimmt markdown-it, konfiguriert so, dass rohes HTML aus der Quelle niemals unverändert an die Seite weitergereicht wird. Das gerenderte Ergebnis wird danach noch einmal unabhängig mit DOMPurify bereinigt, bevor es angezeigt wird — zwei getrennte Schutzschichten gegen eine Datei, die versucht, Skript-Code in deinem Browser auszuführen.',
      'GFM-Tabellen und Codeblöcke in Backticks werden unterstützt. Das ist ein Viewer für eine einzelne Datei: Es wird immer nur ein Dokument angezeigt, ohne Tabs, Front-Matter-Anzeige, Inhaltsverzeichnis oder Theme-Umschalter.',
    ],
  },

  privacy: {
    h2: 'Warum deine Datei auf dem Gerät bleibt',
    lead: 'Datenschutz ist hier strukturell, kein Versprechen — es gibt keinen Upload-Schritt, weil es keinen Server gibt, an den etwas gesendet werden könnte:',
    points: [
      'Lesen, Parsen und Rendern laufen vollständig in deinem Browser.',
      'Das gerenderte HTML wird vor der Anzeige bereinigt, unabhängig davon, wie es entstanden ist.',
      'Die Seite wird als statische Dateien ausgeliefert und sendet keine Anfrage mit deinen Daten.',
      'Der Quellcode ist offen und kann von allen eingesehen werden (MIT).',
      'Die Seite funktioniert offline – was nur möglich ist, weil nichts das Gerät verlässt.',
    ],
    note: 'Wenn du es selbst prüfen willst, öffne beim Öffnen einer Datei das Netzwerk-Panel deines Browsers – keine Anfrage trägt ihren Inhalt.',
    sourceLinkText: 'Quellcode ansehen.',
  },

  howto: {
    h2: 'So funktioniert es',
    steps: [
      {
        h3: 'Datei öffnen',
        p: 'Klicke, um eine .md- oder .markdown-Datei auszuwählen, oder ziehe sie irgendwo auf die Seite. Die Datei wird lokal gelesen.',
      },
      {
        h3: 'Das gerenderte Dokument lesen',
        p: 'Überschriften, Listen, Links, Tabellen und Codeblöcke erscheinen sofort, formatiert und bereinigt.',
      },
      {
        h3: 'Andere Datei öffnen',
        p: 'Mit „Andere Datei öffnen" schließt du das aktuelle Dokument und wählst eine andere Datei aus.',
      },
    ],
  },

  faqHeading: 'Häufige Fragen',
  faq: [
    {
      q: 'Wird meine Datei irgendwohin hochgeladen?',
      a: 'Nein. Lesen, Parsen und Rendern laufen vollständig in deinem Browser. Es gibt keine Serverkomponente, also gibt es für den Inhalt keinen Weg vom Gerät. Der Quellcode ist offen und du kannst das im Netzwerk-Panel deines Browsers nachprüfen.',
    },
    {
      q: 'Ist es sicher, eine Markdown-Datei von jemand anderem zu öffnen?',
      a: 'Der Parser ist so konfiguriert, dass rohes HTML deaktiviert ist — HTML aus der Quelle wird als Text angezeigt, nicht als Markup ausgeführt. Das gerenderte Ergebnis wird danach noch einmal unabhängig mit DOMPurify bereinigt, bevor es angezeigt wird. Links werden nur mit den Schemata http, https und mailto akzeptiert; andere Schemata werden abgelehnt.',
    },
    {
      q: 'Werden Tabellen und Codeblöcke unterstützt?',
      a: 'Ja. GitHub-typische Markdown-Tabellen und Codeblöcke in Backticks (```) werden ohne zusätzliche Einstellung gerendert.',
    },
    {
      q: 'Werden Front Matter oder ein Inhaltsverzeichnis angezeigt?',
      a: 'In dieser Version nicht. Das ist ein einfacher Viewer für ein einzelnes Dokument — ohne Front-Matter-Anzeige, Inhaltsverzeichnis, Tabs für mehrere Dateien oder Theme-Umschalter.',
    },
    {
      q: 'Kann ich die Datei bearbeiten?',
      a: 'Nein. Das ist ein reiner Lese-Viewer für eine lokale Markdown-Datei; er bearbeitet nichts und schreibt keine Änderungen in die Datei zurück.',
    },
    {
      q: 'Werden Dateien mit anderer Zeichenkodierung als UTF-8 unterstützt?',
      a: 'Ja. Die Datei wird zuerst als UTF-8 dekodiert; schlägt das fehl, als Shift_JIS — die beiden Kodierungen, in denen eine typische Markdown-Datei üblicherweise gespeichert ist. Es gibt keine manuelle Auswahl der Kodierung.',
    },
    {
      q: 'Funktioniert es offline?',
      a: 'Ja. Das Tool ist eine PWA. Nach dem ersten Besuch wird es zwischengespeichert, sodass es ohne Netzwerkverbindung geöffnet werden kann. Du kannst es auch zum Startbildschirm hinzufügen.',
    },
  ],

  footer: {
    openSourceLabel: 'Open Source (MIT)',
    partOf: 'Teil von',
    brandTail: '— kleine Tools, die lokal auf deinem Gerät laufen.',
    colophon:
      'Erstellt und gepflegt von Geppetto. Ein Teil des Codes entsteht mit KI-Unterstützung; Prüfung und Entscheidungen liegen beim Maintainer.',
    securityText: 'Sicherheit',
  },
};
