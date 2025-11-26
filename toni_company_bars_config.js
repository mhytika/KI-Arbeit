const COMPANY_BARS_CONFIG_TONI = {
  roleId: "toni",
  avatarKey: "toni",
  scenarios: {
    s1: {
      scenarioTag: "Szenario 1: Wettbewerbsfähiges KI-Ökosystem",
      title: "Willkommen 2030 – Toni Botelli in der Personalberatung",
      intro: "Bis zum Jahr 2030 hat sich in deinem Unternehmen in Sachen KI Folgendes getan:",
      hints: [
        "Eigenes Matching-Tool mitentwickelt",
        "Kandidaten- und Stelleninfos klar strukturiert",
        "Empfehlungen meist stabil; Zweitblick bleibt Standard",
        "Regelmäßige Trainings",
        "Teilweise eigene Lösungen, teils Zukauf – ausgewogen",
        "Qualitätsprüfungen und Freigaben kosten etwas Zeit"
      ],
      targets: { eigenanteil: 65, datenreife: 70, zuverlaessigkeit: 70, schulung: 75, unabhaengigkeit: 60, buerokratie: 58 }
    },
    s2: {
      scenarioTag: "Szenario 2: Zaungast der KI-Revolution",
      title: "Willkommen 2030 – Toni Botelli in der Personalberatung",
      intro: "Bis zum Jahr 2030 hat sich in deinem Unternehmen in Sachen KI Folgendes getan:",
      hints: [
        "Standard-Tools von Großanbietern",
        "Profile & Anforderungen oft lückenhaft",
        "Trefferqualität schwankt; viel Nacharbeit",
        "Kurze Einführungen, selten Übung",
        "Deutliche Abhängigkeit vom Tool-Anbieter",
        "Viele Einwilligungen & rechtliche Prüfungen verlangsamen"
      ],
      targets: { eigenanteil: 25, datenreife: 45, zuverlaessigkeit: 50, schulung: 40, unabhaengigkeit: 30, buerokratie: 75 }
    },
    s3: {
      scenarioTag: "Szenario 3: Starke Nischen-KI",
      title: "Willkommen 2030 – Toni Botelli in der Personalberatung",
      intro: "Bis zum Jahr 2030 hat sich in deinem Unternehmen in Sachen KI Folgendes getan:",
      hints: [
        "Für Chemie/Pharma gemeinsames Such-System mit Firmen",
        "Infos zu Fähigkeiten & Projekten sind vollständig",
        "Vorschläge passen sehr gut und werden begründet",
        "Regelmäßiges Üben mit echten Beispielen",
        "Zusammenarbeit mit mehreren Partnern",
        "Klare, kurze Prozessschritte"
      ],
      targets: { eigenanteil: 80, datenreife: 85, zuverlaessigkeit: 85, schulung: 78, unabhaengigkeit: 75, buerokratie: 50 }
    }
  }
};

if (typeof window !== "undefined"){ window.COMPANY_BARS_CONFIG_TONI = COMPANY_BARS_CONFIG_TONI; }
if (typeof module !== "undefined"){ module.exports = { COMPANY_BARS_CONFIG: COMPANY_BARS_CONFIG_TONI }; }
