const COMPANY_BARS_CONFIG_AHMED = {
  roleId: "ahmed",
  avatarKey: "ahmed",
  scenarios: {
    s1: {
      scenarioTag: "Szenario 1: Wettbewerbsfähiges KI-Ökosystem",
      title: "Willkommen 2030 – Ahmed Al-Hassan im Pflegeheim (Hamburg)",
      intro: "Bis zum Jahr 2030 hat sich in deinem Unternehmen in Sachen KI Folgendes getan:",
      hints: [
        "Assistenzsysteme unterstützen Doku, Vitalwerte, Medipläne",
        "Bewohner-Daten besser erfasst",
        "Vorschläge meist hilfreich, Pflegekraft prüft nach",
        "Regelmäßige Schulungen im Haus",
        "Teilweise abhängig von großen Systemen",
        "Viel Dokumentation wegen Gesundheit & Schutz"
      ],
      targets: { eigenanteil: 40, datenreife: 70, zuverlaessigkeit: 65, schulung: 70, unabhaengigkeit: 45, buerokratie: 68 }
    },
    s2: {
      scenarioTag: "Szenario 2: Zaungast der KI-Revolution",
      title: "Willkommen 2030 – Ahmed Al-Hassan im Pflegeheim (Hamburg)",
      intro: "Bis zum Jahr 2030 hat sich in deinem Unternehmen in Sachen KI Folgendes getan:",
      hints: [
        "Zukauf-Tools; wenig Einfluss",
        "Bewohner-Infos teils verstreut",
        "Ergebnisse uneinheitlich; öfter Rückkehr zu Handarbeit",
        "Einweisungen kurz, Wissen ungleich verteilt",
        "Starke Anbieterbindung; Hotline statt Teamhilfe",
        "Sehr viel Papierkram & Freigaben"
      ],
      targets: { eigenanteil: 15, datenreife: 40, zuverlaessigkeit: 45, schulung: 35, unabhaengigkeit: 20, buerokratie: 78 }
    },
    s3: {
      scenarioTag: "Szenario 3: Starke Nischen-KI",
      title: "Willkommen 2030 – Ahmed Al-Hassan im Pflegeheim (Hamburg)",
      intro: "Bis zum Jahr 2030 hat sich in deinem Unternehmen in Sachen KI Folgendes getan:",
      hints: [
        "Pflege-Modelle branchenspezifisch mitentwickelt",
        "Verlaufs- und Gesundheitsdaten sehr gut gepflegt",
        "Doku & Warnungen sehr verlässlich",
        "Gezielte Fortbildungen und Austausch mit Expert*innen",
        "Weniger an einzelne Anbieter gebunden",
        "Pflichtdoku bleibt, Abläufe aber schlanker"
      ],
      targets: { eigenanteil: 70, datenreife: 85, zuverlaessigkeit: 90, schulung: 80, unabhaengigkeit: 70, buerokratie: 55 }
    }
  }
};

if (typeof window !== "undefined"){ window.COMPANY_BARS_CONFIG_AHMED = COMPANY_BARS_CONFIG_AHMED; }
if (typeof module !== "undefined"){ module.exports = { COMPANY_BARS_CONFIG: COMPANY_BARS_CONFIG_AHMED }; }
