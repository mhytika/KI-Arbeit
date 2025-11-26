const COMPANY_BARS_CONFIG_MAX = {
  roleId: "max",
  avatarKey: "max",
  scenarios: {
    s1: {
      scenarioTag: "Szenario 1: Wettbewerbsfähiges KI-Ökosystem",
      title: "Willkommen 2030 – Max Sander in der Fertigung (Maschinenbau)",
      intro: "Bis zum Jahr 2030 hat sich in deinem Unternehmen in Sachen KI Folgendes getan:",
      hints: [
        "Eigene Prüf-Modelle",
        "Mess- und Fehlerdaten sauber gesammelt",
        "Testläufe automatisch, Ergebnisse werden gegengecheckt",
        "Regelmäßige Schulungen im Team",
        "Weniger abhängig von einzelnen Anbietern (mehr Eigenlösung)",
        "Mehr Nachweise und Protokolle für Qualität & Sicherheit"
      ],
      targets: { eigenanteil: 75, datenreife: 80, zuverlaessigkeit: 70, schulung: 75, unabhaengigkeit: 60, buerokratie: 60 }
    },
    s2: {
      scenarioTag: "Szenario 2: Zaungast der KI-Revolution",
      title: "Willkommen 2030 – Max Sander in der Fertigung (Maschinenbau)",
      intro: "Bis zum Jahr 2030 hat sich in deinem Unternehmen in Sachen KI Folgendes getan:",
      hints: [
        "Gekaufte Prüf-Tools; wenig eigenes Know-how",
        "Produkt- und Sensordaten nur teils nutzbar",
        "Treffer schwanken → mehr Nachkontrollen",
        "Kurz-Einweisungen statt Training",
        "Stark an den Anbieter gebunden",
        "Viel Dokumentation und Freigaben bremsen"
      ],
      targets: { eigenanteil: 20, datenreife: 40, zuverlaessigkeit: 45, schulung: 35, unabhaengigkeit: 25, buerokratie: 75 }
    },
    s3: {
      scenarioTag: "Szenario 3: Starke Nischen-KI",
      title: "Willkommen 2030 – Max Sander in der Fertigung (Maschinenbau)",
      intro: "Bis zum Jahr 2030 hat sich in deinem Unternehmen in Sachen KI Folgendes getan:",
      hints: [
        "Spezial-Modelle für unsere Linie mit Partnern entwickelt",
        "Sensor- und Qualitätsdaten sehr gut aufbereitet",
        "Sehr verlässliche Treffer, wenig Ausschuss",
        "Fortlaufende Praxis-Trainings & Austausch mit Expertenteam",
        "Standard-Schnittstellen",
        "Nachweise schlank, aber vorhanden"
      ],
      targets: { eigenanteil: 85, datenreife: 90, zuverlaessigkeit: 88, schulung: 80, unabhaengigkeit: 80, buerokratie: 52 }
    }
  }
};

if (typeof window !== "undefined"){ window.COMPANY_BARS_CONFIG_MAX = COMPANY_BARS_CONFIG_MAX; }
if (typeof module !== "undefined"){ module.exports = { COMPANY_BARS_CONFIG: COMPANY_BARS_CONFIG_MAX }; }
