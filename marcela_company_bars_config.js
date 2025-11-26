const COMPANY_BARS_CONFIG_MARCELA = {
  roleId: "marcela",
  avatarKey: "marcela",
  scenarios: {
    s1: {
      scenarioTag: "Szenario 1: Wettbewerbsfähiges KI-Ökosystem",
      title: "Willkommen 2030 – Marcela Paz in der Werbeagentur",
      intro: "Bis zum Jahr 2030 hat sich in deinem Unternehmen in Sachen KI Folgendes getan:",
      hints: [
        "Eigene Textbausteine wachsen",
        "Zielgruppenwissen wird laufend gesammelt und aufgeräumt",
        "Texte klingen oft gleich gut",
        "Das Team übt regelmäßig mit echten Beispielen",
        "Einige Werkzeuge könnten wir wechseln, ein paar bleiben wichtig",
        "Papierkram spürbar, aber okay"
      ],
      targets: { eigenanteil:70, datenreife:75, zuverlaessigkeit:70, schulung:80, unabhaengigkeit:65, buerokratie:55 }
    },
    s2: {
      scenarioTag: "Szenario 2: Zaungast der KI-Revolution",
      title: "Willkommen 2030 – Marcela Paz in der Werbeagentur",
      intro: "Bis zum Jahr 2030 hat sich in deinem Unternehmen in Sachen KI Folgendes getan:",
      hints: [
        "Texte kommen meist aus zugekauften Tools",
        "Infos über Zielgruppen sind verstreut, manches alt",
        "Qualität schwankt, wir bessern oft nach",
        "Es gab kurze Einführungen statt Training",
        "Stark an einzelne Anbieter gebunden",
        "Viele Freigaben und Formulare bremsen"
      ],
      targets: { eigenanteil:25, datenreife:45, zuverlaessigkeit:50, schulung:40, unabhaengigkeit:30, buerokratie:70 }
    },
    s3: {
      scenarioTag: "Szenario 3: Starke Nischen-KI",
      title: "Willkommen 2030 – Marcela Patz in der Werbeagentur",
      intro: "Bis zum Jahr 2030 hat sich in deinem Unternehmen in Sachen KI Folgendes getan:",
      hints: [
        "Mit Kunden eigene Branchen-Tonarten entwickelt",
        "Sehr gutes Wissen über Zielgruppen aus vielen Projekten",
        "Treffer sitzen verlässlich, Reklamationen selten",
        "Regelmäßige Praxisübungen mit gemeinsamen Mustern",
        "Mehrere Werkzeuge möglich, Wechsel machbar",
        "Abläufe schlank, wenig Zusatzarbeit"
      ],
      targets: { eigenanteil:85, datenreife:85, zuverlaessigkeit:85, schulung:75, unabhaengigkeit:75, buerokratie:50 }
    }
  }
};

if (typeof window !== "undefined"){ window.COMPANY_BARS_CONFIG_MARCELA = COMPANY_BARS_CONFIG_MARCELA; }
if (typeof module !== "undefined"){ module.exports = { COMPANY_BARS_CONFIG: COMPANY_BARS_CONFIG_MARCELA }; }
