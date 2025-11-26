# KI & Arbeitswelt – Szenario-Game

Dieses kleine p5.js-Projekt enthält das komplette Szenario-Game für den Unterricht „KI & Arbeitswelt“.

## Struktur

- `index.html` lädt p5.js aus dem CDN und bindet das Sketch.
- `styles.css` kümmert sich lediglich um die Canvas-Einbettung und den dunklen Hintergrund des Viewports.
- `sketch.js` enthält das komplette Spiel: States, Buttons, Quiz, Glossar usw.

## Starten

Da keine Build-Tools notwendig sind, reicht es, `index.html` in einem lokalen Webserver zu öffnen (z. B. VS Code „Live Server“, `python -m http.server`, `npx serve` o. Ä.). Danach läuft das Spiel komplett im Browser.

## Steuerung

- Maus/Tap für Buttons und Karten.
- `ENTER` springt vorwärts, `ESC` geht einen Schritt zurück.
- Im Quiz können Antworten 1–3 auch per Zahlentaste ausgewählt werden.
