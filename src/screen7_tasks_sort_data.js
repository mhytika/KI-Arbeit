/**
 * Screen 7 Data Registry – Tasks Sort für alle Rollen
 * ACHTUNG: Nur Screen 7, keine anderen Screens anfassen.
 * Falls roleIds im Projekt abweichen, Mapping unten anpassen.
 */

(function () {
    // Farbcodierung zentral halten (wie in CSS)
    const COLORS = {
        human: "#E7B75F",
        assist: "#37C6E6",
        auto: "#9E7CFF",
    };

    // ---------- 5: Marcela Paz (bereits vorhanden; inhalt unverändert) ----------
    const ROLE_5_MARCELA = {
        roleId: 5,
        title: "Elisa Cruz – Werbetexterin, Medien & Kreativschaffende",
        intro:
            "Im Jahr 2030 verändern sich Elisas Tätigkeiten: Einige Entscheidungen bleiben klar kreativ-menschlich (Human-Lead), bei anderen helfen schlaue Werkzeuge (KI-Assistenz), und manches läuft im Hintergrund automatisch (Auto-Run).",
        instruction: "Ordne die Tätigkeiten den passenden Bereichen zu:",
        buckets: [
            { id: "human", label: "Human-Lead", subLabel: "Mensch führt", color: COLORS.human, why: "Kernidee, Ton und finale Botschaft sind kreative Leitentscheide." },
            { id: "assist", label: "KI-Assistenz", subLabel: "Co-Pilot", color: COLORS.assist, why: "Vorschläge, Sortierung, Feinschliff – Entscheidung bleibt beim Team." },
            { id: "auto", label: "Auto-Run", subLabel: "Weitgehend automatisiert", color: COLORS.auto, why: "Routine-Checks, Umformate, Kennzahlen & Ablage lassen sich gut automatisieren." },
        ],
        cards: [
            { id: "c_report", text: "Basisreport (Reichweite/ Klicks/ Reaktionen) erstellen." },
            { id: "c_assets", text: "Bild-/Video-Dateien mit Stichworten ablegen." },
            { id: "c_briefing", text: "Kundenbriefing in Ziel, Zielgruppe und Ton übersetzen." },
            { id: "c_keymsg", text: "Key-Message auswählen und freigeben." },
            { id: "c_abtest", text: "Headlines/ Posts in Varianten (A/B) fein anpassen." },
            { id: "c_calendar", text: "Redaktionsplan gegen Termine/ Feiertage ausbalancieren." },
            { id: "c_proof", text: "Rechtschreibung & Grundstil prüfen." },
            { id: "c_formats", text: "Formatvarianten (Banner, Post, Newsletter-Kasten) erzeugen." },
            { id: "c_keywords", text: "Themen- und Keyword-Pool ordnen." },
            { id: "c_ideas", text: "Erste Textideen sichten und sortieren." },
        ],
        solution: {
            human: ["c_briefing", "c_keymsg"],
            assist: ["c_keywords", "c_ideas", "c_abtest", "c_calendar"],
            auto: ["c_proof", "c_formats", "c_report", "c_assets"],
        },
    };

    // ---------- 2: Toni Botelli (Personalberatung) ----------
    const ROLE_2_TONI = {
        roleId: 2,
        title: "Lisa Bogner – Personalberaterin",
        intro:
            "Im Jahr 2030 verändern sich Lisas Tätigkeiten: Einige Entscheidungen bleiben klar kreativ-menschlich (Human-Lead), bei anderen helfen schlaue Werkzeuge (KI-Assistenz), und manches läuft im Hintergrund automatisch (Auto-Run).",
        instruction: "Ordne die Tätigkeiten den passenden Bereichen zu:",
        buckets: [
            { id: "human", label: "Human-Lead", subLabel: "Mensch führt", color: COLORS.human, why: "Gesprächsführung, Bewertung und Vertrauen sind menschlich." },
            { id: "assist", label: "KI-Assistenz", subLabel: "Co-Pilot", color: COLORS.assist, why: "Struktur, Formulier-Vorschläge, Priorisierung – finale Aussage bleibt bei Lisa." },
            { id: "auto", label: "Auto-Run", subLabel: "Weitgehend automatisiert", color: COLORS.auto, why: "Regeln, Kalender, Vorlagen und Datenformate sind gut automatisierbar." },
        ],
        cards: [
            { id: "c_roleclarify", text: "Rolle und Anforderungen mit der Fachabteilung klären." },
            { id: "c_refs", text: "Referenzen telefonisch einordnen." },
            { id: "c_guide", text: "Fragenleitfaden für Gespräche anpassen." },
            { id: "c_feedback", text: "Zwischenfeedback an die Kundenseite formulieren." },
            { id: "c_files", text: "Unterlagen ablegen." },
            { id: "c_short", text: "Kurzprofile (2–3 Sätze) verdichten." },
            { id: "c_filter", text: "Kandidatenliste nach Muss-/ Kann-Kriterien vorsortieren." },
            { id: "c_schedule", text: "Termine mit Kandidaten und Kundenseite koordinieren." },
            { id: "c_normalize", text: "Lebenslaufdaten in ein einheitliches Schema bringen." },
            { id: "c_motivation", text: "Motivation & Team-Passung im Gespräch einschätzen." },
        ],
        solution: {
            human: ["c_roleclarify", "c_motivation", "c_refs"],
            assist: ["c_guide", "c_short", "c_feedback"],
            auto: ["c_filter", "c_schedule", "c_normalize", "c_files"],
        },
    };

    // ---------- 3: Ahmed Al-Hassan (Pflege) ----------
    const ROLE_3_AHMED = {
        roleId: 3,
        title: "Ali Saad – Altenpflegefachkraft",
        intro:
            "Im Jahr 2030 verändern sich Alis Tätigkeiten: Einige Entscheidungen bleiben klar menschlich-empathisch (Human-Lead), bei anderen helfen schlaue Werkzeuge (KI-Assistenz), und manches läuft im Hintergrund automatisch (Auto-Run).",
        instruction: "Ordne die Tätigkeiten den passenden Bereichen zu:",
        buckets: [
            { id: "human", label: "Human-Lead", subLabel: "Mensch führt", color: COLORS.human, why: "Verantwortung, Einfühlung, Situationsurteil – hier führt die Fachkraft." },
            { id: "assist", label: "KI-Assistenz", subLabel: "Co-Pilot", color: COLORS.assist, why: "Vorschläge/Struktur helfen; Entscheidung & Priorität bleiben bei Ali." },
            { id: "auto", label: "Auto-Run", subLabel: "Weitgehend automatisiert", color: COLORS.auto, why: "Wiederkehrende Erfassung/Bestände lassen sich gut automatisieren." },
        ],
        cards: [
            { id: "c_activities", text: "Tagesaktivitäten (Bewegung, Übung) passend auswählen." },
            { id: "c_routine", text: "Routinedaten (Mahlzeiten, Trinkmenge) ins System übertragen." },
            { id: "c_vitals", text: "Auffällige Vitalwerte bewerten und Maßnahmen einleiten." },
            { id: "c_family", text: "Angehörige informieren und beraten." },
            { id: "c_goals", text: "Pflegeziele für die Woche besprechen." },
            { id: "c_meds", text: "Medikamentenplan mit dem Tagesablauf abgleichen." },
            { id: "c_wounds", text: "Wundverlauf dokumentieren und nächste Schritte festlegen." },
            { id: "c_mergeDoc", text: "Basis-Dokumentation aus Notizen zusammenführen." },
            { id: "c_handover", text: "Übergabe vorbereiten: Hauptpunkte ordnen." },
            { id: "c_stock", text: "Lagerbestand prüfen und Nachbestellung anstoßen." },
        ],
        solution: {
            human: ["c_vitals", "c_family", "c_goals"],
            assist: ["c_meds", "c_wounds", "c_activities", "c_handover"],
            auto: ["c_routine", "c_mergeDoc", "c_stock"],
        },
    };

    // ---------- 4: Maria Schmidt (Stadtverwaltung) ----------
    const ROLE_4_MARIA = {
        roleId: 4,
        title: "Marie Meier – Stadtverwaltung",
        intro:
            "Im Jahr 2030 verändern sich Maries Tätigkeiten: Einige Entscheidungen bleiben klar kreativ-menschlich (Human-Lead), bei anderen helfen schlaue Werkzeuge (KI-Assistenz), und manches läuft im Hintergrund automatisch (Auto-Run).",
        instruction: "Ordne die Tätigkeiten den passenden Bereichen zu:",
        buckets: [
            { id: "human", label: "Human-Lead", subLabel: "Mensch führt", color: COLORS.human, why: "Abwägung, Sprache, Vermittlung – das ist eindeutige Sachbearbeitung." },
            { id: "assist", label: "KI-Assistenz", subLabel: "Co-Pilot", color: COLORS.assist, why: "Hinweise, Struktur, Vorgaben – Entscheidung & Formulierung bleiben bei Marie." },
            { id: "auto", label: "Auto-Run", subLabel: "Weitgehend automatisiert", color: COLORS.auto, why: "Wiederkehrende Einfüge-, Zuordnungs- und Kalenderaufgaben sind gut automatisierbar." },
        ],
        cards: [
            { id: "c_check", text: "Antrag auf Vollständigkeit und Plausibilität prüfen." },
            { id: "c_index", text: "E-Akte: Index/ Schlagworte pflegen." },
            { id: "c_deadlines", text: "Fristenlisten durchsehen und priorisieren." },
            { id: "c_reason", text: "Begründung für einen kniffligen Bescheid formulieren." },
            { id: "c_blocks", text: "Standardbausteine in einen Entwurf einfügen." },
            { id: "c_maps", text: "Karten-/ Luftbildausschnitte dem Vorgang zuordnen." },
            { id: "c_meetings", text: "Termine mit Beteiligten vorschlagen und einplanen." },
            { id: "c_committee", text: "Vorlage fürs Gremium gliedern und Zahlen/Anhänge ziehen." },
            { id: "c_site", text: "Ergebnisse vom Ortstermin bewerten und abwägen." },
            { id: "c_conflict", text: "Konfliktgespräch mit Eigentümer/ Anwohner moderieren." },
        ],
        solution: {
            human: ["c_reason", "c_site", "c_conflict"],
            assist: ["c_check", "c_deadlines", "c_committee"],
            auto: ["c_blocks", "c_maps", "c_meetings", "c_index"],
        },
    };

    // ---------- 1: Max Sander (Industrie) ----------
    const ROLE_1_MAX = {
        roleId: 1,
        title: "Tom Fischer – Facharbeiter, Industrie & verarbeitendes Gewerbe",
        intro:
            "Im Jahr 2030 verändern sich Toms Tätigkeiten: Einige Entscheidungen bleiben klar handwerklich-menschlich (Human-Lead), bei anderen helfen schlaue Werkzeuge (KI-Assistenz), und manches läuft im Hintergrund automatisch (Auto-Run).",
        instruction: "Ordne die Tätigkeiten den passenden Bereichen zu:",
        buckets: [
            { id: "human", label: "Human-Lead", subLabel: "Mensch führt", color: COLORS.human, why: "Sicherheit, Verantwortung, Erfahrungsurteil – hier führt der Mensch." },
            { id: "assist", label: "KI-Assistenz", subLabel: "Co-Pilot", color: COLORS.assist, why: "Vorschläge/ Vorlagen helfen – Entscheidung & Feintuning bleiben menschlich." },
            { id: "auto", label: "Auto-Run", subLabel: "Weitgehend automatisiert", color: COLORS.auto, why: "Einfachere Prüfungen, Datenübernahmen und Testläufe sind gut automatisierbar." },
        ],
        cards: [
            { id: "c_deviations", text: "Abweichungen in Messreihen sichten & nächste Prüfschritte festlegen." },
            { id: "c_shift", text: "Schichtübergabeplan mit Prioritäten & Restzeiten prüfen & anpassen." },
            { id: "c_testrun", text: "Standard-Testlauf starten und Ergebnisse archivieren." },
            { id: "c_series", text: "Serienprüfung einfacher Merkmale und Protokolle gegenlesen." },
            { id: "c_setup", text: "Vorbereitung: Werkzeuge wählen, Maschine einrichten, Nullpunkte setzen." },
            { id: "c_measure", text: "Messwerte von Sensorstationen übernehmen und dem Auftrag zuordnen." },
            { id: "c_firstpart", text: "Erstteil begutachten und Freigabe für den Serienlauf erteilen." },
            { id: "c_feeds", text: "Vorgeschlagene Schnitt-/ Vorschubwerte abgleichen und fein nachstellen." },
            { id: "c_qreport", text: "Qualitätsbericht aus Textbausteinen vervollständigen." },
            { id: "c_noise", text: "Ungewöhnliche Geräusche beurteilen & ggf. Halt auslösen." },
        ],
        solution: {
            human: ["c_setup", "c_firstpart", "c_noise"],
            assist: ["c_feeds", "c_deviations", "c_qreport", "c_shift"],
            auto: ["c_series", "c_measure", "c_testrun"],
        },
    };

    // Registry (falls andere IDs: hier anpassen)
    window.SCREEN7_DATA_BY_ROLE = {
        1: ROLE_1_MAX,
        2: ROLE_2_TONI,
        3: ROLE_3_AHMED,
        4: ROLE_4_MARIA,
        5: ROLE_5_MARCELA,
    };

    // Helper: Daten per roleId holen (Fallback Marcela)
    window.getScreen7DataForRole = function (roleId) {
        const byId = window.SCREEN7_DATA_BY_ROLE || {};
        return byId[roleId] || byId[5];
    };

    // Backward-compat: alter globaler Name, falls irgendwo noch erwartet
    window.screen7Data = ROLE_5_MARCELA;
})();
