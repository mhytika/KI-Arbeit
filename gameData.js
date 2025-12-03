/**
 * Game Data
 * Contains static data for Roles, Scenarios, and Quiz Questions.
 */

// Role Profiles Data
const roleProfiles = {
    1: {
        name: "Max Sander",
        sector: "Facharbeiter, Industrie / verarbeitendes Gewerbe",
        summary: "Max (47) ist ein erfahrener Facharbeiter in der Produktion eines mittelständischen deutschen Maschinenbauunternehmens.",
        sections: [
            {
                title: "Qualifikation & Erfahrung",
                icon: "🎓",
                bullets: [
                    "Abgeschlossene Ausbildung zum Industriemechaniker.",
                    "Über 20 Jahre Berufserfahrung plus regelmäßige interne Schulungen.",
                    "Zusatzkenntnisse in CNC-Einrichten, Qualitätsmanagement und Arbeitssicherheit."
                ]
            },
            {
                title: "Berufliches Umfeld / Branche",
                icon: "🏭",
                bullets: [
                    "Mittelständischer Maschinenbauer für Spezialmaschinen (Export).",
                    "Fertigungshalle mit festen Taktzeiten und Schichtbetrieb.",
                    "Teamgröße 6–10 Personen, enge Zusammenarbeit mit QS & Instandhaltung."
                ]
            },
            {
                title: "Kerntätigkeiten (heute)",
                icon: "🔧",
                bullets: [
                    "CNC-Maschinen einrichten, bedienen und für neue Aufträge umrüsten.",
                    "Wartung & kleinere Reparaturen, Störungen schnell beheben.",
                    "Qualitätsprüfung per Sicht-/Maßkontrolle (Schieblehre, Messuhr).",
                    "Materialfluss sichern: Teile bereitstellen, Aufträge erfassen.",
                    "Messwerte und Arbeitsgänge dokumentieren."
                ]
            }
        ]
    },
    2: {
        name: "Toni Botelli",
        sector: "Personalberaterin, unternehmensnahe Dienstleistungen",
        summary: "Toni (29) arbeitet in einer kleinen Personalberatungs-Agentur und vermittelt passende Bewerberinnen an Unternehmen.",
        sections: [
            {
                title: "Qualifikation & Erfahrung",
                icon: "🎓",
                bullets: [
                    "Bachelor Psychologie und berufsbegleitender Master Personalberatung.",
                    "Mehrjährige Erfahrung im Recruiting.",
                    "Geschult in Interviewtechnik, Eignungsdiagnostik, Arbeitsrecht/DSGVO.",
                    "Sicherer Umgang mit Bewerbungssoftware und Video-Tools."
                ]
            },
            {
                title: "Berufliches Umfeld / Branche",
                icon: "🤝",
                bullets: [
                    "Unternehmensnahe Dienstleistungen: Personalberatung & Headhunting.",
                    "Kundschaft vor allem mittelständische Firmen, teils größere Unternehmen.",
                    "Hybrid: Büro & Remote, viele Telefon- und Videogespräche.",
                    "Enge Zusammenarbeit mit Personal- und Fachabteilungen der Kund*innen."
                ]
            },
            {
                title: "Kerntätigkeiten (heute)",
                icon: "📋",
                bullets: [
                    "Anforderungsprofile aufnehmen und Stellenanzeigen formulieren.",
                    "Gezielte Kandidat*innensuche in Netzwerken und Datenbanken.",
                    "Bewerbungsgespräche führen, Eignung prüfen und Ergebnisse dokumentieren.",
                    "Vorstellungen beim Kunden koordinieren, Feedback einholen und Prozesse steuern.",
                    "Matching & Vermittlung bis zur Vertragsunterschrift."
                ]
            }
        ]
    },
    3: {
        name: "Ahmed Al-Hassan",
        sector: "Altenpflegefachkraft, soziale Berufe",
        summary: "Ahmed (35) arbeitet in einem städtischen Pflegeheim in Hamburg und betreut ältere Bewohnerinnen im Alltag.",
        sections: [
            {
                title: "Qualifikation & Erfahrung",
                icon: "🎓",
                bullets: [
                    "Ausbildung Pflegefachmann, Abschluss vor 5 Jahren.",
                    "Fortbildungen in Demenz, Hygiene, Mobilisation und Erste Hilfe.",
                    "Sicher in digitaler Dokumentation, Vitalzeichenmessung und Medikamentengabe nach Anordnung.",
                    "Ziel: Weiterbildung zum Pflegedienstleiter in den nächsten Jahren."
                ]
            },
            {
                title: "Berufliches Umfeld / Branche",
                icon: "🏥",
                bullets: [
                    "Städtisches Pflegeheim mit Wohnbereichen und festen Pflegeteams.",
                    "Schichtdienst (Früh/Spät/Nacht) inklusive Wochenenden und Feiertagen.",
                    "Zusammenarbeit mit Ärzt*innen, Therapeut*innen und Angehörigen.",
                    "Klare Regeln: Hygienestandards, Datenschutz, Prüfungen durch den Medizinischen Dienst."
                ]
            },
            {
                title: "Kerntätigkeiten (heute)",
                icon: "🩺",
                bullets: [
                    "Grundpflege: Waschen, Anziehen, Essen reichen, Mobilisieren.",
                    "Behandlungspflege nach Anleitung: Medikamente geben, Vitalwerte kontrollieren, Wunden versorgen.",
                    "Beobachten & Dokumentieren von Zuständen/Veränderungen in der Pflegesoftware.",
                    "Gespräche führen, Beschäftigungsangebote begleiten (z. B. Gedächtnistraining, Spaziergänge).",
                    "Teamarbeit & Übergaben im Schichtdienst, Notfälle einschätzen und melden."
                ]
            }
        ]
    },
    4: {
        name: "Maria Schmidt",
        sector: "Sachbearbeiterin, öffentliche Verwaltung",
        summary: "Maria (46) arbeitet seit 17 Jahren in der Heilbronner Stadtverwaltung (Denkmalschutz & Grünflächen). Nach einem Unfall nutzt sie einen rollstuhlgerechten Arbeitsplatz und digitale Tools.",
        sections: [
            {
                title: "Qualifikation & Erfahrung",
                icon: "🎓",
                bullets: [
                    "Abschluss Verwaltungswissenschaften; langjährige Kommunalverwaltungserfahrung.",
                    "Fortbildungen in Kommunal-/Verwaltungsrecht, Datenschutz (DSGVO), E-Akte, Barrierefreiheit.",
                    "Sicher in Bescheidtechnik (Begründung, Rechtsbehelfsbelehrung) und Fristenmanagement.",
                    "Routiniert in Bürgerkommunikation (Telefon, Schriftverkehr, Termine) und Homeoffice-Orga."
                ]
            },
            {
                title: "Berufliches Umfeld / Branche",
                icon: "🏛️",
                bullets: [
                    "Stadtverwaltung Heilbronn, Schnittstellen zu Bauaufsicht, Rechtsamt, Kämmerei, Umwelt-/Denkmalbehörden.",
                    "Kontakt zu Bürger*innen, Eigentümer*innen, Architekturbüros, Pflegefirmen.",
                    "Arbeitsform: Büro & digital (E-Akte), teils Außentermine/Begehungen, Teamarbeit mit klaren Zuständigkeiten."
                ]
            },
            {
                title: "Kerntätigkeiten (heute)",
                icon: "📁",
                bullets: [
                    "Anträge prüfen (Maßnahmen an Denkmälern, Baumfällungen/Neupflanzungen); Unterlagen auf Vollständigkeit und Rechtslage checken.",
                    "Bescheide erstellen (Zulassung/Auflagen), Verträge/Verwaltungsvereinbarungen vorbereiten, Widersprüche zuarbeiten.",
                    "Dokumentation in der E-Akte, Fristen überwachen, Gremienvorlagen & Kurzberichte verfassen.",
                    "Bürgerberatung: Auskünfte geben, Termine koordinieren, Konflikte moderieren.",
                    "Koordination mit Außendienst/Partnern, Begehungen organisieren, Barrierefreiheit in Abläufen berücksichtigen."
                ]
            }
        ]
    },
    5: {
        name: "Marcela Paz",
        sector: "Werbetexterin, Medien & Kreativschaffende",
        summary: "Marcela (30) schreibt und konzipiert Werbetexte in einer Agentur – von Social-Posts bis Kampagnenideen.",
        sections: [
            {
                title: "Qualifikation & Erfahrung",
                icon: "🎓",
                bullets: [
                    "Studium Kommunikationsdesign; Praxis über Praktika und Junior-Stelle in der Agentur.",
                    "Sicher im Text-Handwerk und mit Basiswissen zu Urheber- und Nutzungsrechten.",
                    "Erfahrung in Präsentationen sowie Teamarbeit mit Design- und Video-Teams."
                ]
            },
            {
                title: "Berufliches Umfeld / Branche",
                icon: "💡",
                bullets: [
                    "Werbe-/Content-Agentur mit Projekten für Mittelstand und Start-ups.",
                    "Hybrid: Büro & Homeoffice; enge Abstimmung mit Grafik, Social und Media.",
                    "Kanäle: Social Media, Websites/Landingpages, Print, Video/Radio, Newsletter.",
                    "Arbeitsweise: Briefing → Entwurf → Feedback → Finale, inklusive Pitchs und Deadlines."
                ]
            },
            {
                title: "Kerntätigkeiten (heute)",
                icon: "✍️",
                bullets: [
                    "Briefing klären: Ziel, Zielgruppe, Ton, Botschaft.",
                    "Ideen entwickeln & Konzepte schreiben (Storyline, Claim, Key-Message).",
                    "Texte erstellen: Social-Posts/Ads, Headlines, Web-Copy, Skripte für kurze Videos.",
                    "Mit Design/Redaktion abstimmen und überarbeiten; Lektorat für Fehler & Stil.",
                    "Veröffentlichen & prüfen: einfache Metriken lesen (Reichweite, Klicks, Reaktionen).",
                    "Dokumentieren: Versionen, Freigaben und Kundenfeedback festhalten."
                ]
            }
        ]
    }
};

// Scenario Data
const scenarioData = {
    1: { // Role Max
        1: { // Scenario 1
            title: "Willkommen 2030 – Max Sander, Facharbeiter Industrie",
            intro: "<div class='gl-intro-title'>Bis zum Jahr 2030 hat sich in deinem Unternehmen in Sachen KI Folgendes getan:</div><div class='gl-intro-body'>Eigene Prüf-Modelle für Bildkontrolle aufgebaut • Mess- und Fehlerdaten sauber gesammelt • Testläufe laufen automatisch, Ergebnisse werden gegengecheckt • Regelmäßige Schulungen im Team (Schichtübergreifend) • Weniger abhängig von einzelnen Anbietern (mehr Eigenlösung/Open-Source) • Mehr Nachweise und Protokolle für Qualität & Sicherheit</div>",
            targets: {
                ki: 75,
                data: 80,
                reliability: 70,
                training: 75,
                independence: 60,
                bureaucracy: 60
            }
        },
        2: { // Scenario 2
            title: "Willkommen 2030 – Max Sander, Facharbeiter Industrie",
            intro: "<div class='gl-intro-title'>Bis zum Jahr 2030 hat sich in deinem Unternehmen in Sachen KI Folgendes getan:</div><div class='gl-intro-body'>Gekaufte Prüf-Tools; wenig eigenes Know-how • Produkt- und Sensordaten nur teils nutzbar • Treffer schwanken → mehr Nachkontrollen • Kurz-Einweisungen statt Training • Stark an den Anbieter gebunden • Viel Dokumentation und Freigaben bremsen</div>",
            targets: {
                ki: 20,
                data: 40,
                reliability: 45,
                training: 35,
                independence: 25,
                bureaucracy: 75
            }
        },
        3: { // Scenario 3
            title: "Willkommen 2030 – Max Sander, Facharbeiter Industrie",
            intro: "<div class='gl-intro-title'>Bis zum Jahr 2030 hat sich in deinem Unternehmen in Sachen KI Folgendes getan:</div><div class='gl-intro-body'>Spezial-Modelle für unsere Linie mit Partnern entwickelt • Sensor- und Qualitätsdaten sehr gut aufbereitet • Sehr verlässliche Treffer, wenig Ausschuss • Fortlaufende Praxis-Trainings & Austausch mit Expertenteam • Standard-Schnittstellen • Nachweise schlank, aber vorhanden</div>",
            targets: {
                ki: 85,
                data: 90,
                reliability: 88,
                training: 80,
                independence: 80,
                bureaucracy: 52
            }
        }
    },
    2: { // Role Toni Botelli
        1: { // Scenario 1
            title: "Willkommen 2030 – Toni Botelli in der Personalberatung",
            intro: "<div class='gl-intro-title'>Bis zum Jahr 2030 hat sich in deinem Unternehmen in Sachen KI Folgendes getan:</div><div class='gl-intro-body'>Eigenes Matching-Tool mitentwickelt • Kandidaten- und Stelleninfos klar strukturiert • Empfehlungen meist stabil; Zweitblick bleibt Standard • Regelmäßige Trainings • Teilweise eigene Lösungen, teils Zukauf – ausgewogen • Qualitätsprüfungen und Freigaben kosten etwas Zeit</div>",
            targets: {
                ki: 65,
                data: 70,
                reliability: 70,
                training: 75,
                independence: 60,
                bureaucracy: 58
            }
        },
        2: { // Scenario 2
            title: "Willkommen 2030 – Toni Botelli in der Personalberatung",
            intro: "<div class='gl-intro-title'>Bis zum Jahr 2030 hat sich in deinem Unternehmen in Sachen KI Folgendes getan:</div><div class='gl-intro-body'>Standard-Tools von Großanbietern • Profile & Anforderungen oft lückenhaft • Trefferqualität schwankt; viel Nacharbeit • Kurze Einführungen, selten Übung • Deutliche Abhängigkeit vom Tool-Anbieter • Viele Einwilligungen & rechtliche Prüfungen verlangsamen</div>",
            targets: {
                ki: 25,
                data: 45,
                reliability: 50,
                training: 40,
                independence: 30,
                bureaucracy: 75
            }
        },
        3: { // Scenario 3
            title: "Willkommen 2030 – Toni Botelli in der Personalberatung",
            intro: "<div class='gl-intro-title'>Bis zum Jahr 2030 hat sich in deinem Unternehmen in Sachen KI Folgendes getan:</div><div class='gl-intro-body'>Branchen-Matching für Chemie/Pharma gemeinsam mit Kundschaft aufgebaut • Daten zu Skills & Projekten sehr vollständig • Vorschläge sehr treffsicher, gut nachvollziehbar • Fortlaufende Lernpfade & Feedbackrunden • Kooperationen mit mehreren Partnern • Prozesse klar geregelt, wenig Zusatzaufwand</div>",
            targets: {
                ki: 80,
                data: 85,
                reliability: 85,
                training: 78,
                independence: 75,
                bureaucracy: 50
            }
        }
    },
    3: { // Role Ahmed Al-Hassan
        1: { // Scenario 1
            title: "Willkommen 2030 – Ahmed Al-Hassan im Pflegeheim",
            intro: "<div class='gl-intro-title'>Bis zum Jahr 2030 hat sich in deinem Unternehmen in Sachen KI Folgendes getan:</div><div class='gl-intro-body'>Assistenzsysteme unterstützen Doku, Vitalwerte, Medipläne • Bewohner-Daten besser erfasst • Vorschläge meist hilfreich, Pflegekraft prüft nach • Regelmäßige Schulungen im Haus • Teilweise abhängig von großen Systemen • Viel Dokumentation wegen Gesundheit & Schutz</div>",
            targets: {
                ki: 40,
                data: 70,
                reliability: 65,
                training: 70,
                independence: 45,
                bureaucracy: 68
            }
        },
        2: { // Scenario 2
            title: "Willkommen 2030 – Ahmed Al-Hassan im Pflegeheim",
            intro: "<div class='gl-intro-title'>Bis zum Jahr 2030 hat sich in deinem Unternehmen in Sachen KI Folgendes getan:</div><div class='gl-intro-body'>Zukauf-Tools; wenig Einfluss • Bewohner-Infos teils verstreut • Ergebnisse uneinheitlich; öfter Rückkehr zu Handarbeit • Einweisungen kurz, Wissen ungleich verteilt • Starke Anbieterbindung; Hotline statt Teamhilfe • Sehr viel Papierkram & Freigaben</div>",
            targets: {
                ki: 15,
                data: 40,
                reliability: 45,
                training: 35,
                independence: 20,
                bureaucracy: 78
            }
        },
        3: { // Scenario 3
            title: "Willkommen 2030 – Ahmed Al-Hassan im Pflegeheim",
            intro: "<div class='gl-intro-title'>Bis zum Jahr 2030 hat sich in deinem Unternehmen in Sachen KI Folgendes getan:</div><div class='gl-intro-body'>Pflege-Modelle branchenspezifisch mitentwickelt • Verlaufs- und Gesundheitsdaten sehr gut gepflegt • Doku & Warnungen sehr verlässlich • Gezielte Fortbildungen und Austausch mit Expert*innen • Weniger an einzelne Anbieter gebunden • Pflichtdoku bleibt, Abläufe aber schlanker</div>",
            targets: {
                ki: 70,
                data: 85,
                reliability: 90,
                training: 80,
                independence: 70,
                bureaucracy: 55
            }
        }
    },
    4: { // Role Maria Schmidt
        1: { // Scenario 1
            title: "Willkommen 2030 – Maria Schmidt in der Stadtverwaltung",
            intro: "<div class='gl-intro-title'>Bis zum Jahr 2030 hat sich in deinem Unternehmen in Sachen KI Folgendes getan:</div><div class='gl-intro-body'>Eigene Helfer-Tools für Anträge & Bescheide entstanden • Akten- und Fachdaten werden sauberer erfasst • Vorschläge meist solide, Mitarbeitende prüfen • Regelmäßige Schulungen zu neuen Verfahren • Etwas weniger Abhängigkeit von Standard-Anbietern • Nachweise/Transparenz bleiben aufwendig</div>",
            targets: {
                ki: 60,
                data: 70,
                reliability: 65,
                training: 75,
                independence: 60,
                bureaucracy: 65
            }
        },
        2: { // Scenario 2
            title: "Willkommen 2030 – Maria Schmidt in der Stadtverwaltung",
            intro: "<div class='gl-intro-title'>Bis zum Jahr 2030 hat sich in deinem Unternehmen in Sachen KI Folgendes getan:</div><div class='gl-intro-body'>Online-Dienste ohne echte KI-Hilfe • Daten über Fälle/Verläufe nur begrenzt nutzbar • Qualität schwankt, vieles wird manuell erledigt • Kaum Trainings zu neuen Arbeitsweisen • Abhängigkeit von externen Plattformen • Hoher Aufwand durch Vorgaben, Freigaben und Formulare</div>",
            targets: {
                ki: 5,
                data: 35,
                reliability: 40,
                training: 30,
                independence: 40,
                bureaucracy: 80
            }
        },
        3: { // Scenario 3
            title: "Willkommen 2030 – Maria Schmidt in der Stadtverwaltung",
            intro: "<div class='gl-intro-title'>Bis zum Jahr 2030 hat sich in deinem Unternehmen in Sachen KI Folgendes getan:</div><div class='gl-intro-body'>Fach-Modelle für Denkmalschutz/Grünflächen eingeführt • E-Akte & Ortsdaten sehr gut verknüpft • Entscheidungshilfen verlässlich und nachvollziehbar • Regelmäßige Praxisübungen & Updates • Zusammenarbeit über Schnittstellen → keine Abhängigkeit von nur einem Anbieter • Verfahren klar dokumentiert, weniger Zusatzschritte</div>",
            targets: {
                ki: 80,
                data: 85,
                reliability: 85,
                training: 80,
                independence: 75,
                bureaucracy: 52
            }
        }
    },
    5: { // Role Marcela Paz
        1: { // Scenario 1
            title: "Willkommen 2030 – Marcela Paz in der Werbeagentur",
            intro: "<div class='gl-intro-title'>Bis zum Jahr 2030 hat sich in deinem Unternehmen in Sachen KI Folgendes getan:</div><div class='gl-intro-body'>Eigene Textbausteine wachsen • Zielgruppenwissen wird laufend gesammelt und aufgeräumt • Texte klingen oft gleich gut • Das Team übt regelmäßig mit echten Beispielen • Einige Werkzeuge könnten wir wechseln, ein paar bleiben wichtig • Papierkram spürbar, aber okay</div>",
            targets: {
                ki: 70,
                data: 75,
                reliability: 70,
                training: 80,
                independence: 65,
                bureaucracy: 55
            }
        },
        2: { // Scenario 2
            title: "Willkommen 2030 – Marcela Paz in der Werbeagentur",
            intro: "<div class='gl-intro-title'>Bis zum Jahr 2030 hat sich in deinem Unternehmen in Sachen KI Folgendes getan:</div><div class='gl-intro-body'>Texte kommen meist aus zugekauften Tools • Infos über Zielgruppen sind verstreut, manches alt • Qualität schwankt, wir bessern oft nach • Es gab kurze Einführungen statt Training • Stark an einzelne Anbieter gebunden • Viele Freigaben und Formulare bremsen</div>",
            targets: {
                ki: 25,
                data: 45,
                reliability: 50,
                training: 40,
                independence: 30,
                bureaucracy: 70
            }
        },
        3: { // Scenario 3
            title: "Willkommen 2030 – Marcela Paz in der Werbeagentur",
            intro: "<div class='gl-intro-title'>Bis zum Jahr 2030 hat sich in deinem Unternehmen in Sachen KI Folgendes getan:</div><div class='gl-intro-body'>Mit Kunden eigene Branchen-Tonarten entwickelt • Sehr gutes Wissen über Zielgruppen aus vielen Projekten • Treffer sitzen verlässlich, Reklamationen selten • Regelmäßige Praxisübungen mit gemeinsamen Mustern • Mehrere Werkzeuge möglich, Wechsel machbar • Abläufe schlank, wenig Zusatzarbeit</div>",
            targets: {
                ki: 85,
                data: 85,
                reliability: 85,
                training: 75,
                independence: 75,
                bureaucracy: 50
            }
        }
    }
};

// Quiz Data
const quizData = {
    1: { // Max Sander
        1: [ // Scenario 1
            {
                question: "Was verbessert die Fehlererkennung der KI bei Max’ Arbeit am deutlichsten?",
                options: {
                    A: "Erhöhte Bandgeschwindigkeit, damit mehr Teile pro Stunde geprüft werden.",
                    B: "Aus realen Fehlern Beispielbilder ableiten, daraus Trainingsmaterial erzeugen und in automatischen Testläufen prüfen.",
                    C: "Nur Kameras/Beleuchtung müssen aufgerüstet werden, ohne die Prüflogik oder Datenbasis zu ändern."
                },
                correctAnswer: "B",
                explanation: "Richtig: B. Trainingsmaterial + Testläufe zielen direkt auf die Bildprüfung; Tempo/Hardware allein lösen das Grundproblem nicht."
            },
            {
                question: "Worin hat sich Max’ Arbeitsschwerpunkt spürbar verschoben?",
                options: {
                    A: "Mehr Rüst- und Umrüstarbeit an der Produktionslinie, ansonsten alles wie früher.",
                    B: "Mehr Bildschirm-Überwachung und Nachweise dokumentieren; weniger reine Sichtprüfungen.",
                    C: "Regelmäßige Außentermine bei Kund*innen, um Reklamationen vor Ort zu bearbeiten."
                },
                correctAnswer: "B",
                explanation: "Richtig: B. Monitoring & Doku nehmen zu, klassische Sichtprüfung rückt zurück."
            },
            {
                question: "Wie geht Max sinnvoll mit „KI ist schnell, aber nicht immer richtig“ um?",
                options: {
                    A: "Alarmgrenzen großzügig hochsetzen, damit die Linie seltener stoppt.",
                    B: "Bei Unsicherheiten komplett auf Handprüfung umstellen, bis alles geklärt ist.",
                    C: "Regelmäßig Stichproben gegentesten, Abweichungen protokollieren und an das Team zurückspiegeln."
                },
                correctAnswer: "C",
                explanation: "Richtig: C. Gegencheck + Doku halten Qualität und helfen beim Nachjustieren."
            }
        ],
        2: [ // Scenario 2
            {
                question: "Warum fühlt sich Max abhängiger als früher?",
                options: {
                    A: "Das System wurde zugekauft, arbeitet nicht immer stabil und erklärt seine Entscheidungen kaum.",
                    B: "Neue Schichtpläne lassen weniger Zeit für Prüfungen, dadurch wirkt alles unsicherer.",
                    C: "Mehr Produktvarianten führen zu Unübersichtlichkeit, obwohl das System perfekt erklärt ist."
                },
                correctAnswer: "A",
                explanation: "Richtig: A. Zukauf + schwankende Treffer + wenig Einblick erzeugen Abhängigkeit."
            },
            {
                question: "Was ist in dieser Lage der beste Weg, die Qualität der Teile zu sichern?",
                options: {
                    A: "Reklamationen intern „schnell beheben“ ohne Dokumentation, damit der Takt bleibt.",
                    B: "Stichproben ausweiten, Grenzfälle festhalten und mit konkreten Beispielen an Hersteller/IT zurückgeben.",
                    C: "Alles dauerhaft manuell prüfen, um Fehler sicher zu vermeiden."
                },
                correctAnswer: "B",
                explanation: "Richtig: B. Systematisch prüfen + belegbar zurückmelden bringt echte Verbesserungen."
            },
            {
                question: "Was sollte Max einfordern, um weniger vom Anbieter abhängig zu sein?",
                options: {
                    A: "Eine jährliche Kurzschulung mit Folien und Handout.",
                    B: "Gezielte Praxis-Trainings mit Zeitfenstern im Schichtplan und Einblick in die Begründungen der KI-Treffer.",
                    C: "Einen erweiterten Servicevertrag, damit die Hotline schneller erreichbar ist."
                },
                correctAnswer: "B",
                explanation: "Richtig: B. Hands-on-Training + Einsicht in Entscheidungsgründe → souveräner Umgang statt Hotline-Abhängigkeit."
            }
        ],
        3: [ // Scenario 3
            {
                question: "Woran merkt man, dass die Bildprüfung reifer ist als früher?",
                options: {
                    A: "Ausschuss sinkt deutlich; manuelle Sichtprüfungen sind selten, weil Modelle mit passenden Produktionsdaten stabil laufen.",
                    B: "Zusätzliche Prüfstationen werden eingebaut, obwohl die Datenlage und Modelle unverändert bleiben.",
                    C: "Grenzwerte werden gelockert, damit weniger Fehler gemeldet werden."
                },
                correctAnswer: "A",
                explanation: "Richtig: A. Bessere Daten + spezialisierte Modelle → stabile Erkennung ohne Standards zu senken."
            },
            {
                question: "Welche neue Rolle passt 2030 am besten zu Max?",
                options: {
                    A: "Wechsel in die Auftragsplanung/Disposition, fernab der Qualitätsprüfung.",
                    B: "Praxistests und Einführung der KI-Prüfung an weiteren Produktionslinien; Kolleg*innen schulen; Rückmeldungen ans Entwicklerteam.",
                    C: "Übertragung von Checklisten aus der Anlage in Tabellen – vor allem Schreibarbeit."
                },
                correctAnswer: "B",
                explanation: "Richtig: B. Erfahrungswissen in Rollout & Schulung bringt den größten Nutzen."
            },
            {
                question: "Welche Routine bleibt trotz starker Automatisierung wichtig?",
                options: {
                    A: "100 % Handprüfung jeder Charge, um ganz sicherzugehen.",
                    B: "Nur noch auf das OK/Fehler-Signal der Anlage verlassen, Gegenkontrollen entfallen.",
                    C: "Gezielte Gegenkontrollen und klare Dokumentation, wenn etwas auffällt."
                },
                correctAnswer: "C",
                explanation: "Richtig: C. Punktuelle Checks + saubere Doku sichern die Qualität dauerhaft."
            }
        ]
    },
    2: { // Toni Botelli
        1: [ // Scenario 1
            {
                question: "Wobei hilft die hausinterne KI Toni im Alltag am meisten?",
                options: {
                    A: "Sie erstellt eine Vorschlagsliste, sortiert Profile nach Anforderungen inkl. erster Hinweise zu Soft Skills und liefert Entwürfe für Gesprächsleitfäden.",
                    B: "Sie verschickt automatisch Zusagen an Bewerbende – ganz ohne Rücksprache.",
                    C: "Sie ersetzt das Anforderungsprofil; die Fachabteilung muss nichts mehr definieren."
                },
                correctAnswer: "A",
                explanation: "Richtig: A. Vorarbeit + Leitfäden; Entscheidung & Feinschliff bleiben bei Toni."
            },
            {
                question: "Warum richtet Toni regelmäßige Prüfungen zu den KI-Vorschlägen ein?",
                options: {
                    A: "Um die Trefferquote und Fehlzuordnungen zu beobachten und gemeinsam nachzujustieren.",
                    B: "Um die Anzahl der Bewerbenden klein zu halten.",
                    C: "Um Abstimmungen mit der Fachabteilung zu vermeiden."
                },
                correctAnswer: "A",
                explanation: "Richtig: A. Qualität sichern, nicht ausbremsen oder umgehen."
            },
            {
                question: "Was ändert sich spürbar in Tonis Arbeitstag?",
                options: {
                    A: "Mehr Fälle in kürzerer Zeit; Toni ordnet ein, priorisiert und begründet Empfehlungen für die Unternehmen.",
                    B: "Fast nichts; es bleibt wie 2025.",
                    C: "Toni macht nur noch Tool-Pflege, Gespräche fallen weg."
                },
                correctAnswer: "A",
                explanation: "Richtig: A. Effizienz ↑ ⇒ Taktung ↑; kommunikative Arbeit bleibt zentral."
            }
        ],
        2: [ // Scenario 2
            {
                question: "Warum bleiben Gespräche mit Bewerbenden und Fachabteilungen wichtig?",
                options: {
                    A: "Weil KI Lebensläufe grundsätzlich nicht lesen kann.",
                    B: "Weil Profile/Anforderungen oft Lücken haben – Toni klärt Motivation, Team-Fit und offene Punkte nach.",
                    C: "Weil mündliche Gespräche gesetzlich Pflicht sind."
                },
                correctAnswer: "B",
                explanation: "Richtig: B. Unvollständige Daten ⇒ Toni ergänzt durch Dialog."
            },
            {
                question: "Wie nutzt Toni externe Tools sinnvoll, ohne sich darauf zu verlassen?",
                options: {
                    A: "Vorschläge eins-zu-eins übernehmen, um Zeit zu sparen.",
                    B: "Vorsortieren lassen (Stichworte, Qualifikationen), dann eigene Prüfung von Inhalt, Kultur-Passung, Motivation.",
                    C: "Unempathische Tools eher ignorieren, um neutral zu bleiben."
                },
                correctAnswer: "B",
                explanation: "Richtig: B. Maschine vorsortiert; Qualität durch Tonis Prüfung."
            },
            {
                question: "Welche Abhängigkeit ist in Sachen KI realistisch – und wie geht Toni damit um?",
                options: {
                    A: "Lizenzen/Anbieter setzen Rahmen; Toni achtet zusätzlich auf Datenschutz & faire Verfahren.",
                    B: "Anbieter erledigen alles korrekt, eigene Checks sind überflüssig.",
                    C: "Ein Wechsel des Systems ist jederzeit ohne Aufwand möglich."
                },
                correctAnswer: "A",
                explanation: "Richtig: A. Rahmenbedingungen akzeptieren, trotzdem eigenständig prüfen."
            }
        ],
        3: [ // Scenario 3
            {
                question: "Warum sind Tonis Vorschläge für Chemie/Pharma besonders treffsicher?",
                options: {
                    A: "Ein Einheits-Tool für alle Branchen spart Pflege und trifft deshalb besser.",
                    B: "Spezialisierte Modelle mit branchenbezogenen Datensätzen und klar beschriebenen Stellenprofilen liefern nachvollziehbare Treffer.",
                    C: "Man nutzt möglichst wenige Daten, damit nichts „stört“."
                },
                correctAnswer: "B",
                explanation: "Richtig: B. Domänentiefe + gute Daten → Qualität & Erklärbarkeit."
            },
            {
                question: "Wie verschiebt sich Tonis Rolle in diesem Setting?",
                options: {
                    A: "Vor allem Formulare verwalten; die Auswahl läuft alleine maschinell.",
                    B: "Schwerpunkt nur Neukundensuche; das System entscheidet über Besetzungen.",
                    C: "Toni entscheidet final, erklärt die KI-Vorschläge in einer Übersichtsseite und arbeitet am Feintuning bzw. an Einführungen in Unternehmen mit."
                },
                correctAnswer: "C",
                explanation: "Richtig: C. Entscheidung, Erklärung, Mitwirkung an Umsetzung."
            },
            {
                question: "Wie werden Daten zwischen Unternehmen und Beratung sinnvoll geteilt?",
                options: {
                    A: "Per E-Mail-Listen im Anhang – das ist schnell genug.",
                    B: "Über abgestimmte, sichere Datenräume mit klarer Zustimmung; so entsteht Vertrauen auf beiden Seiten.",
                    C: "Über Web-Suchen, das reicht aus."
                },
                correctAnswer: "B",
                explanation: "Richtig: B. Geregelte, einwilligungsbasierte Datennutzung = Basis für Akzeptanz & Qualität."
            }
        ]
    },
    3: { // Ahmed Al-Hassan
        1: [ // Scenario 1
            {
                question: "Wobei unterstützt die KI Ahmed im Alltag am deutlichsten?",
                options: {
                    A: "Bei Schichtplanung und Gehaltsabrechnung.",
                    B: "Bei Routine: Medikamente verwalten, Vitalwerte prüfen, dokumentieren; zudem Vorschläge für Pflegepläne.",
                    C: "Bei ärztlichen Diagnosen."
                },
                correctAnswer: "B",
                explanation: "Richtig: B. Genau diese Routinen werden digital erleichtert; Entscheidungen mit Verantwortung bleiben beim Fachpersonal."
            },
            {
                question: "Warum braucht Ahmed kontinuierliches Lernen in diesem Zeitraum?",
                options: {
                    A: "Die Arbeitsabläufe bleiben unverändert, nur die Geräte werden neuer.",
                    B: "Es gibt einmalig eine Einführung, danach ist wenig Nachsteuern nötig.",
                    C: "Es kommen regelmäßig neue digitale Pflege-Werkzeuge; Abläufe werden angepasst und Probleme beim Zusammenspiel mit bestehender Technik müssen gelöst werden."
                },
                correctAnswer: "C",
                explanation: "Richtig: C. Neue Tools + Einbindung in vorhandene Systeme → lernen, anpassen, mitdenken."
            },
            {
                question: "Was bleibt trotz Fortschritt eine reale Aufgabe für Ahmeds Team?",
                options: {
                    A: "Schutzfunktionen sinnvoll einsetzen und Ergebnisse aufmerksam gegenprüfen, damit Fehler nicht übersehen werden.",
                    B: "Digitale Systeme eher meiden, um Risiken zu vermeiden.",
                    C: "Pflegekräfte zum großen Teil durch Technik ersetzen."
                },
                correctAnswer: "A",
                explanation: "Richtig: A. Ethische Sicherungen + wachsame Qualitätskontrolle bleiben wichtig."
            }
        ],
        2: [ // Scenario 2
            {
                question: "Warum greift das Team zeitweise wieder zu Stift und Papier?",
                options: {
                    A: "Weil digitale Dokumentation rechtlich verboten ist.",
                    B: "Weil zugekaufte Systeme bei Störungen über die Anbieter-Hotline laufen und Lösungen dauern können – der Alltag muss trotzdem weitergehen.",
                    C: "Weil digitale Geräte im Haus fehlen."
                },
                correctAnswer: "B",
                explanation: "Richtig: B. Abhängigkeit von externen Diensten → Wartezeiten; Papier sichert die Versorgung in der Zwischenzeit."
            },
            {
                question: "Welcher Nutzen bleibt für Ahmeds Pflegearbeit spürbar – trotz Abhängigkeiten?",
                options: {
                    A: "Persönliche Gespräche entfallen, weil alles automatisch läuft.",
                    B: "Standardaufgaben werden schneller erledigt; es bleibt mehr Zeit für direkten Kontakt zu Bewohner*innen.",
                    C: "Es gibt keinen Unterschied zum Zustand ohne digitale Unterstützung."
                },
                correctAnswer: "B",
                explanation: "Richtig: B. Entlastung bei Routine, nicht Ersatz der Beziehungspflege."
            },
            {
                question: "Welche Lücke bremst die Qualität des digitalen Arbeitens besonders?",
                options: {
                    A: "Zu viele umfassende Trainings, die wenig nützen.",
                    B: "Kaum systematische Schulungen und wenig Zugriff auf eigene Arbeitsdaten, weil die Lösungen extern betrieben werden.",
                    C: "Vor allem fehlt es an modernen Geräten."
                },
                correctAnswer: "B",
                explanation: "Richtig: B. Ohne Übung + ohne Datenzugriff bleibt Potenzial liegen."
            }
        ],
        3: [ // Scenario 3
            {
                question: "Welche zusätzliche Rolle übernimmt Ahmed in diesem Szenario?",
                options: {
                    A: "Er arbeitet fast nur noch im Büro.",
                    B: "Er verbessert zusammen mit Fachleuten die Pflege-Tools, prüft Ergebnisse und gibt sein Wissen im Team weiter.",
                    C: "Er betreut nur noch die Technikräume, ohne Bewohnerkontakt."
                },
                correctAnswer: "B",
                explanation: "Richtig: B. Praxiswissen fließt in die Weiterentwicklung ein; Wissenstransfer stärkt das Team."
            },
            {
                question: "Wie verändert sich die Dokumentation konkret?",
                options: {
                    A: "Sie fällt weg; Nachweise sind nicht mehr nötig.",
                    B: "Sie bleibt weitgehend manuell, KI liefert nur Textbausteine.",
                    C: "Sie läuft sehr zuverlässig automatisch; Teile der Überwachung kann das Team auch von zu Hause aus übernehmen."
                },
                correctAnswer: "C",
                explanation: "Richtig: C. Hohe Verlässlichkeit + Remote-Aufsicht entlasten spürbar."
            },
            {
                question: "Welche Effekte auf Team und Arbeitsalltag sind typisch?",
                options: {
                    A: "Mehr Zeit für Bewohner*innen, flexible Dienste (teils von zu Hause), zusätzliche Gesundheitsübungen für Beschäftigte.",
                    B: "Dauernde Mehrarbeit und sinkende Zufriedenheit.",
                    C: "Weniger Personal durch vollständige Automatisierung."
                },
                correctAnswer: "A",
                explanation: "Richtig: A. Qualität der Pflege und Arbeitsbedingungen verbessern sich gemeinsam."
            }
        ]
    },
    4: { // Maria Schmidt
        1: [ // Scenario 1
            {
                question: "Wozu wird KI in Marias Verwaltung vor allem genutzt?",
                options: {
                    A: "Bürgerdienste vereinfachen, Verfahren beschleunigen, klare Leitlinien beachten.",
                    B: "Servicezeiten kürzen, um Personalkosten zu senken.",
                    C: "Rechtsprüfungen komplett durch Automaten ersetzen."
                },
                correctAnswer: "A",
                explanation: "Richtig: A. Besserer Service im Rahmen von Regeln, nicht „Vollautomatik“."
            },
            {
                question: "Wie arbeiten Ämter in diesem Szenario zusammen, um neue Lösungen einzuführen?",
                options: {
                    A: "Jede Abteilung entwickelt allein, ohne Austausch.",
                    B: "In regionalen/kommunalen Verbünden mit Fachstellen wird gemeinsam abgestimmt.",
                    C: "Externe Anbieter entscheiden allein, Verwaltung prüft nicht mehr."
                },
                correctAnswer: "B",
                explanation: "Richtig: B. Kooperation & Abstimmung sind zentral – nicht Insellösungen oder Fremdsteuerung."
            },
            {
                question: "Was bleibt 2025–2030 realistisch eine Hürde bei der Einführung neuer Systeme?",
                options: {
                    A: "Fehler gibt es praktisch nicht mehr.",
                    B: "Papierakten sind verboten, deshalb läuft alles perfekt digital.",
                    C: "Die Einführung verläuft nicht überall gleich schnell; gelegentliche Fehler, Teams passen Abläufe an."
                },
                correctAnswer: "C",
                explanation: "Richtig: C. Heterogene Einführung + Kinderkrankheiten sind normal."
            }
        ],
        2: [ // Scenario 2
            {
                question: "Warum bleibt die interne Automatisierung begrenzt?",
                options: {
                    A: "Beschäftigte lehnen digitale Tools grundsätzlich ab.",
                    B: "Strenge Datenschutzvorgaben und Verträge großer Anbieter passen oft nicht → wenig interne Automatisierung.",
                    C: "Es gibt nicht genug IT-Fachkräfte in Deutschland."
                },
                correctAnswer: "B",
                explanation: "Richtig: B. Rechtsrahmen & Abhängigkeiten bremsen den Ausbau."
            },
            {
                question: "Was ist für Fachleute in Verwaltungen ein sinnvoller Weg, Digitalisierung in diesem Szenario voranzubringen?",
                options: {
                    A: "Bürgerdaten ohne Einwilligung auswerten, damit es schneller geht.",
                    B: "In Organisationen/Teams arbeiten, die rechtssichere, barrierearme Digitalisierung aufbauen und Wissen teilen.",
                    C: "Zur Sicherheit wieder ganz auf Papier umstellen."
                },
                correctAnswer: "B",
                explanation: "Richtig: B. Kompetenzaufbau + rechtssichere Umsetzung statt Datenwildwuchs oder Rückschritt."
            },
            {
                question: "Welche Datenstrategie ist in diesem Szenario sinnvoll?",
                options: {
                    A: "Social-Media-Profile der Bürger ohne Einverständnis auswerten.",
                    B: "Datensätze anderer Städte kopieren und lokal einspielen.",
                    C: "Standardisierte, anonymisierte Prozessdaten rechtssicher sammeln, um später eigene Lösungen zu ermöglichen."
                },
                correctAnswer: "C",
                explanation: "Richtig: C. Vorausschauend & rechtskonform Datenbasis aufbauen."
            }
        ],
        3: [ // Scenario 3
            {
                question: "Was treibt die Verbesserungen in Marias Verwaltung am stärksten?",
                options: {
                    A: "Ein einziges Standardtool ohne lokale Anpassung.",
                    B: "Fachmodelle je Aufgabenbereich + gut gepflegte Prozessdaten + Zusammenarbeit über Zuständigkeiten hinweg.",
                    C: "Verzicht auf Datenhaltung; nur manuelle Eingaben."
                },
                correctAnswer: "B",
                explanation: "Richtig: B. Domänentiefe + Datenqualität + Kooperation sind der Hebel."
            },
            {
                question: "Wie verschiebt sich Marias Rolle?",
                options: {
                    A: "Nur noch Formularfreigaben, inhaltliche Prüfung entfällt.",
                    B: "Routine wird digital unterstützt; Fokus auf schwierige Fälle, Beratung, gute Begründungen.",
                    C: "Vor allem Tipparbeit zum „Anlernen“, kaum Bürgerkontakt."
                },
                correctAnswer: "B",
                explanation: "Richtig: B. Automatisierung schafft Raum für wertigeren Sachverstand."
            },
            {
                question: "Welche Teameffekte sind plausibel?",
                options: {
                    A: "Auslagerung an Callcenter ersetzt Fachkenntnis.",
                    B: "Mehr Einstellungen, besseres Klima, flexible Sprechzeiten (teils Homeoffice) → bürgernäher.",
                    C: "Mehr Überstunden statt neues Personal."
                },
                correctAnswer: "B",
                explanation: "Richtig: B. Verbesserte Bedingungen und Service – nicht Auslagerung oder Dauer-Mehrarbeit."
            }
        ]
    },
    5: { // Marcela Paz
        1: [ // Scenario 1
            {
                question: "Wie nutzt Marcela KI im täglichen Schreibprozess am sinnvollsten?",
                options: {
                    A: "KI liefert meist sendefertige Texte; menschliche Prüfung erfolgt nur stichprobenartig, um Zeit zu sparen.",
                    B: "KI liefert Entwürfe und Zielgruppen-Hinweise; Marcela steuert Ton & Idee und prüft nach.",
                    C: "KI dient höchstens als Rechtschreibhilfe; Konzept und Formulierungen entstehen komplett ohne KI."
                },
                correctAnswer: "B",
                explanation: "Richtig: B. Entwurf + Datenhilfe durch KI, kreative Führung und Qualitätsblick bei Marcela."
            },
            {
                question: "Warum braucht es trotz guter Tools weiterhin Qualitätskontrollen?",
                options: {
                    A: "Hauptgrund sind formale Freigaben; inhaltliche Fehler treten praktisch nicht mehr auf.",
                    B: "Kund*innen akzeptieren keine KI-Entwürfe, deshalb muss alles komplett neu geschrieben werden.",
                    C: "Weil es trotz Fortschritt punktuell Fehler geben kann und das Team Ergebnisse prüft."
                },
                correctAnswer: "C",
                explanation: "Richtig: C. Verlässlicher, aber nicht fehlerfrei → Review bleibt Pflicht."
            },
            {
                question: "Welche Arbeitsumgebung passt am besten zu diesem Szenario?",
                options: {
                    A: "Hybrid mit modernen Tools, regelmäßige Schulungen und Übung.",
                    B: "Überwiegend Präsenz ohne digitale Unterstützung; KI wird nur für Ablage genutzt.",
                    C: "Fast ausschließlich Remote ohne feste Teamabstimmungen, damit alles schneller geht."
                },
                correctAnswer: "A",
                explanation: "Richtig: A. Technik + Training + Zusammenarbeit prägen den Alltag."
            }
        ],
        2: [ // Scenario 2
            {
                question: "Was ist die größte Herausforderung für Marcela bei der Textarbeit?",
                options: {
                    A: "Die KI-Entwürfe sind fachlich fast immer passend; Mehraufwand entsteht vor allem durch Layout und Formatierung.",
                    B: "Briefings werden weitgehend überflüssig; das spart Konzeptarbeit.",
                    C: "Treffer der Tools schwanken; Marcela braucht mehrere Schleifen und steht unter Kostendruck durch Lizenzen."
                },
                correctAnswer: "C",
                explanation: "Richtig: C. Qualität variiert → mehr Iterationen; Lizenzen erhöhen Tempo-Druck."
            },
            {
                question: "Wie geht Marcela mit den genutzten KI-Werkzeugen praktisch um?",
                options: {
                    A: "Nach einem kurzen Onboarding laufen Texte ohne Eingriff; sie muss nur noch exportieren.",
                    B: "Sie nutzt Basismodelle, prüft deren Vorschläge genau und überarbeitet kreativ.",
                    C: "Die Tool-Vorgaben lassen kaum Änderungen zu; deshalb übernimmt sie KI-Texte weitgehend unverändert."
                },
                correctAnswer: "B",
                explanation: "Richtig: B. Externe Modelle helfen, doch Kontrolle und Feinschliff bleiben bei Marcela."
            },
            {
                question: "Welche Kund*innen passen hier besonders zur Agentur?",
                options: {
                    A: "Vor allem Mittelständler, die Zugang zu moderner KI über die Agentur suchen.",
                    B: "Überwiegend Großkonzerne mit eigenen Entwicklungsabteilungen, die keine Agenturtools benötigen.",
                    C: "Vor allem Kleinstvereine mit Minimalbudgets; KI ersetzt daher fast jede Kreativleistung."
                },
                correctAnswer: "A",
                explanation: "Richtig: A. Die Agentur bringt fortgeschrittene Tools in den Mittelstand."
            }
        ],
        3: [ // Scenario 3
            {
                question: "Was macht die Werbekampagnen in diesem Szenario besonders treffsicher?",
                options: {
                    A: "Ein einheitliches Universal-Tool für alle Branchen reduziert Pflegeaufwand und sorgt so für Qualität.",
                    B: "Spezialisierte Modelle mit hochwertigen Fachdaten und Rückmeldungen von Expert*innen.",
                    C: "Bewusste Datensparsamkeit: möglichst wenige Daten, damit keine Fehleinflüsse entstehen."
                },
                correctAnswer: "B",
                explanation: "Richtig: B. Domänentiefe + gute Daten + Fachfeedback erhöhen Trefferqualität."
            },
            {
                question: "Wie verändert sich Marcelas Rolle im Team?",
                options: {
                    A: "Ihre Aufgaben verlagern sich hauptsächlich auf Freigaben; konzeptionelle Arbeit entfällt weitgehend.",
                    B: "Der Schwerpunkt liegt nun vor allem auf juristischen Prüfungen; Konzept und Ton werden delegiert.",
                    C: "Mehr Konzeptarbeit und Beratung; Zusammenarbeit in gemischten Teams, neue Felder (z. B. Erneuerbare)."
                },
                correctAnswer: "C",
                explanation: "Richtig: C. Weniger Routine, mehr konzeptionelle und beratende Anteile."
            },
            {
                question: "Welche technische Grundlage erleichtert die Arbeit mit Kundensystemen?",
                options: {
                    A: "Klare, abgestimmte Schnittstellen – dadurch lassen sich Lösungen gut einbinden.",
                    B: "Jeder Kunde erhält eine Sonderlösung ohne Anschlussfähigkeit; das maximiert Individualität.",
                    C: "Austausch erfolgt unstrukturiert per Datei-Uploads im Chat; Integration ist nachrangig."
                },
                correctAnswer: "A",
                explanation: "Richtig: A. Gute Anschlussfähigkeit spart Zeit und stärkt die Zusammenarbeit."
            }
        ]
    }
};
