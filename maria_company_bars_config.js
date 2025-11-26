const COMPANY_BARS_CONFIG_MARIA = {
  roleId: "maria",
  avatarKey: "maria",
  scenarios: {
    s1: {
      scenarioTag: "Szenario 1: Wettbewerbsfähiges KI-Ökosystem",
      title: "Willkommen 2030 – Maria Schmidt in der Stadtverwaltung (Heilbronn)",
      intro: "Bis zum Jahr 2030 hat sich in deinem Unternehmen in Sachen KI Folgendes getan:",
      hints: [
        "Eigene Helfer-Tools für Anträge & Bescheide entstanden",
        "Akten- und Fachdaten werden sauberer erfasst",
        "Vorschläge meist solide, Mitarbeitende prüfen",
        "Regelmäßige Schulungen zu neuen Verfahren",
        "Etwas weniger Abhängigkeit von Standard-Anbietern",
        "Nachweise/Transparenz bleiben aufwendig"
      ],
      targets: { eigenanteil: 60, datenreife: 70, zuverlaessigkeit: 65, schulung: 75, unabhaengigkeit: 60, buerokratie: 65 }
    },
    s2: {
      scenarioTag: "Szenario 2: Zaungast der KI-Revolution",
      title: "Willkommen 2030 – Maria Schmidt in der Stadtverwaltung (Heilbronn)",
      intro: "Bis zum Jahr 2030 hat sich in deinem Unternehmen in Sachen KI Folgendes getan:",
      hints: [
        "Online-Dienste ohne echte KI-Hilfe",
        "Daten über Fälle/Verläufe nur begrenzt nutzbar",
        "Qualität schwankt, vieles wird manuell erledigt",
        "Kaum Trainings zu neuen Arbeitsweisen",
        "Abhängigkeit von externen Plattformen",
        "Hoher Aufwand durch Vorgaben, Freigaben und Formulare"
      ],
      targets: { eigenanteil: 5, datenreife: 35, zuverlaessigkeit: 40, schulung: 30, unabhaengigkeit: 40, buerokratie: 80 }
    },
    s3: {
      scenarioTag: "Szenario 3: Starke Nischen-KI",
      title: "Willkommen 2030 – Maria Schmidt in der Stadtverwaltung (Heilbronn)",
      intro: "Bis zum Jahr 2030 hat sich in deinem Unternehmen in Sachen KI Folgendes getan:",
      hints: [
        "Spezielle KI-Helfer für Denkmalschutz und Grünflächen",
        "E-Akte und Ortsdaten arbeiten gut zusammen",
        "Entscheidungshilfen sind zuverlässig und verständlich erklärt",
        "Feste Übungstage und kurze Updates",
        "Programme arbeiten gut zusammen – keine Ein-Anbieter-Abhängigkeit",
        "Abläufe klar beschrieben, weniger Zusatzformulare"
      ],
      targets: { eigenanteil: 80, datenreife: 85, zuverlaessigkeit: 85, schulung: 80, unabhaengigkeit: 75, buerokratie: 52 }
    }
  }
};

if (typeof window !== "undefined"){ window.COMPANY_BARS_CONFIG_MARIA = COMPANY_BARS_CONFIG_MARIA; }
if (typeof module !== "undefined"){ module.exports = { COMPANY_BARS_CONFIG: COMPANY_BARS_CONFIG_MARIA }; }
