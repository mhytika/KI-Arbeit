/*  KI & Arbeitswelt – Szenario-Game (9. Klasse) – p5.js
    Version: Multi-Rollen (5 Berufe) + 3 Szenarien
    Wichtige Punkte:
    - Saubere Layout-Helfer (Absatz-/Bullet-Umbruch, linksbündig)
    - Start → Beruf wählen → Job-Intro → Szenario auswählen → Firma 2030 → Tätigkeit → Quiz → Deutschland → Eigene Lage → End-Szenario
    - 5 Avatare: Facharbeiter, Personalberaterin, Pflege, Verwaltung, Werbetexterin
    - Überall Zurück-Buttons, ESC = Zurück, ENTER = Weiter (wo sinnvoll)
    - Keine Text-Überlappungen (eigene Größen/Zeilenabstände)
*/

////////////////////
// Layout & State //
////////////////////

let state = "start"; // start | rolepick | roleintro | pick | company | role | quiz | macro | self | ending | glossary | maria_quiz | ahmed_quiz | marcela_quiz | toni_quiz | max_quiz
let backStack = [];

const CANVAS_W = 1100;
const CANVAS_H = 700;
const SIDEBAR_W = 310;
const HEADER_H  = 60;
const SIDE_PADDING = 40;
const CARDS_EXTRA_TOP_PAD = 4;

const COL_BG = "#16171b";
const COL_PANEL = "#1e1f25";
const COL_TEXT = "#e9edf1";
const COL_BAR = "#7fb77e";
const COL_BAR_NEG = "#b85a5a";
const COL_OK = "#27ae60";
const COL_FAIL = "#e74c3c";
const COL_FRAME = "#263238";
const GUTTER = 16;
const RADIUS = 14;
const ROW_H = 118;
const BTN_H = 44;

const CAPTION_SPACING = 18;
const CARD_RADIUS = 14;
const GAP_Y = 22;
const COL_CARD_BG = "#20222a";
const COL_CARD_BORDER = "#2b2f36";
const COL_TEXT_WEAK = "#b6bdc7";
const SHOW_SCORE = false;

// Header sizing / layout
const SAFE_TOP = 18;
const H1_SIZE_BASE = 30;
const H1_SIZE_MIN = 28;
const SCENARIO_SIZE = 15;
const INTRO_SIZE = 14;
const HINTS_SIZE_BASE = 16;
const HINTS_SIZE_MIN = 15;
const HINTS_LEADING_EXTRA = 6;
const COL_HINTS = "#7FE3A2";
const GAP_AFTER_H1 = 6;
const GAP_AFTER_SCENARIO = 6;
const GAP_AFTER_INTRO = 10;
const GAP_AFTER_HINTS = 22;
const HEADER_MAX_HEIGHT = 240;
const ESTIMATE_SIZE = 18;
const GAP_AFTER_ESTIMATE = 18;
const START_Y_OFFSET_AFTER_HEADER = 14;
const HEAD_AVATAR_SIZE = 36;
const HEAD_AVATAR_OFFSET_X = 12;

// Grid / bottom bar sizing
const BOTTOM_BAR_H = 86;
const SAFE_BOTTOM_PAD = 12;
const COLS = 2;
const GUTTER_X = 24;
const CARD_H_BASE = 110;
const CARD_H_MIN = 100;
const GRID_V_GAP = 16;
const GRID_V_GAP_MIN = 12;

const COMPANY_STEP = 10;
const COMPANY_TOLERANCE = 10;

const COMPANY_CATEGORIES = [
  {label:"KI-Eigenanteil", desc:"Wie viel entwickelt die Firma selbst?", negative:false},
  {label:"Daten-Reife", desc:"Qualität/Verfügbarkeit passender Daten.", negative:false},
  {label:"Zuverlässigkeit", desc:"Wie stabil/verlässlich sind die KI-Ergebnisse?", negative:false},
  {label:"Schulungskultur", desc:"Wie oft und wie gut wird trainiert?", negative:false},
  {label:"Unabhängigkeit", desc:"Wie frei ist man von einzelnen Anbietern?", negative:false},
  {label:"Bürokratie-Last", desc:"Wie viel Papierkram/Compliance bremst.", negative:true}
];

const COMPANY_TARGETS = {
  S1:[70,75,70,80,65,55],
  S2:[25,45,50,40,30,70],
  S3:[85,85,85,75,75,50]
};

const ROLE_ID_MAP = {
  1:"max",
  2:"toni",
  3:"ahmed",
  4:"maria",
  5:"marcela"
};

const SCENARIO_KEY_MAP = {
  1:"s1",
  2:"s2",
  3:"s3"
};

const ROLE_KEY_TO_SEL = {
  max:1, toni:2, ahmed:3, maria:4, marcela:5
};
const SCENARIO_KEY_TO_SEL = {
  s1:1, s2:2, s3:3
};

const MARCELA_COMPANY_BARS_CONFIG_FALLBACK = {
  S1: {
    header: {
      title: "Willkommen 2030 – Marcela Paz in der Werbeagentur",
      scenario: "Szenario 1: Wettbewerbsfähiges KI-Ökosystem",
      intro: "Bis zum Jahr 2030 hat sich in deinem Unternehmen in Sachen KI Folgendes getan:",
      hints: [
        "Eigene Textbausteine wachsen",
        "Zielgruppenwissen wird laufend gesammelt und aufgeräumt",
        "Texte klingen oft gleich gut",
        "Das Team übt regelmäßig mit echten Beispielen",
        "Einige Werkzeuge könnten wir wechseln, ein paar bleiben wichtig",
        "Papierkram spürbar, aber okay"
      ]
    },
    targets: [70,75,70,80,65,55]
  },
  S2: {
    header: {
      title: "Willkommen 2030 – Marcela Paz in der Werbeagentur",
      scenario: "Szenario 2: Zaungast der KI-Revolution",
      intro: "Bis zum Jahr 2030 hat sich in deinem Unternehmen in Sachen KI Folgendes getan:",
      hints: [
        "Texte kommen meist aus zugekauften Tools",
        "Infos über Zielgruppen sind verstreut, manches alt",
        "Qualität schwankt, wir bessern oft nach",
        "Es gab kurze Einführungen statt Training",
        "Stark an einzelne Anbieter gebunden",
        "Viele Freigaben und Formulare bremsen"
      ]
    },
    targets: [25,45,50,40,30,70]
  },
  S3: {
    header: {
      title: "Willkommen 2030 – Marcela Patz in der Werbeagentur",
      scenario: "Szenario 3: Starke Nischen-KI",
      intro: "Bis zum Jahr 2030 hat sich in deinem Unternehmen in Sachen KI Folgendes getan:",
      hints: [
        "Wir haben mit Kundinnen und Kunden eigene Branchen-Tonarten entwickelt",
        "Sehr gutes Wissen über Zielgruppen aus vielen Projekten",
        "Treffer sitzen verlässlich, Reklamationen sind selten",
        "Regelmäßige Praxisübungen mit gemeinsamen Mustern",
        "Mehrere Werkzeuge möglich, Wechsel wäre machbar",
        "Abläufe schlank, wenig Zusatzarbeit"
      ]
    },
    targets: [85,85,85,75,75,50]
  }
};

let buttons = [];
let backBtn = null;

let roleSel = 0; // 1..5
let scenarioSel = 0; // 1..3
let areas = [];
let openedArea = null;
let wobble = 0;

let metrics;      // Zielwerte
let uiMetrics;    // sichtbare animierte Werte
let quiz = null;
let selfEval = null;
let transitionTimer = 0;
let companyBars = [];
let companyBarsActiveIndex = 0;
let companyBarsLocked = false;
let companyBarsScore = 0;
let companyBarsNextEnabled = false;
let companyBarsBtnNext = null;
let companyBarsBtnCheck = null;
let companyBarsPressInfo = null;
let companyBarsHeader = null;
let companyBarsStartY = SAFE_TOP;
let companyBarsAvatarKey = "marcela";
let maxQuizScene = null;
let maxQuizScenarioKey = null;
let maxQuizBtnCheck = null;
let maxQuizBtnNext = null;
let mariaQuizScene = null;
let mariaQuizScenarioKey = null;
let mariaQuizBtnCheck = null;
let mariaQuizBtnNext = null;
let ahmedQuizScene = null;
let ahmedQuizScenarioKey = null;
let ahmedQuizBtnCheck = null;
let ahmedQuizBtnNext = null;
let marcelaQuizScene = null;
let marcelaQuizScenarioKey = null;
let marcelaQuizBtnCheck = null;
let marcelaQuizBtnNext = null;
let toniQuizScene = null;
let toniQuizScenarioKey = null;
let toniQuizBtnCheck = null;
let toniQuizBtnNext = null;

function setup(){
  const cnv = createCanvas(CANVAS_W, CANVAS_H);
  if (typeof pixelDensity === "function") pixelDensity(1); // keep canvas coords predictable
  if (cnv && cnv.canvas){
    cnv.canvas.style.zIndex = "0";
    if (!window._p5Instance) window._p5Instance = {};
    window._p5Instance.canvas = cnv.canvas;
  }
  textFont('Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif');
  initMetrics({fit:50, rules:50, speed:50, wealth:50, comp:50});
  buildStart();
}

function draw(){
  background(18,19,23);
  drawTopBar();
  if (["company","role","quiz","macro","self","ending","maria_quiz","ahmed_quiz","marcela_quiz","toni_quiz","max_quiz"].includes(state)) drawSidebar();

  const x0 = ["company","role","quiz","macro","self","ending","maria_quiz","ahmed_quiz","marcela_quiz","toni_quiz","max_quiz"].includes(state) ? SIDEBAR_W+24 : 24;
  const y0 = HEADER_H + 12;

  switch(state){
    case "start":    drawStart(x0,y0); break;
    case "rolepick": drawRolePick(x0,y0); break;
    case "roleintro":drawRoleIntro(x0,y0); break;
    case "pick":     drawPick(x0,y0); break;
    case "companybars": drawCompanyBarsScene(); break;
    case "transition": drawTransition(); break;
    case "company":  drawCompany(x0,y0); break;
    case "role":     drawRole(x0,y0); break;
    case "quiz":     drawQuiz(x0,y0); break;
    case "macro":    drawMacro(x0,y0); break;
    case "self":     drawSelf(x0,y0); break;
    case "ending":   drawEnding(x0,y0); break;
    case "glossary": drawGlossary(); break;
    case "max_quiz": drawMaxQuizScene(); break;
    case "maria_quiz": drawMariaQuizScene(); break;
    case "ahmed_quiz": drawAhmedQuizScene(); break;
    case "marcela_quiz": drawMarcelaQuizScene(); break;
    case "toni_quiz": drawToniQuizScene(); break;
  }

  if (openedArea!==null) drawAreaModal(areas[openedArea]); // Modal obenauf
  drawButtons();
  tweenUiMetrics();
}

function drawMariaQuizScene(){
  if (mariaQuizScene && typeof mariaQuizScene.draw==="function"){
    mariaQuizScene.draw();
  }
}
function drawMaxQuizScene(){
  if (maxQuizScene && typeof maxQuizScene.draw==="function"){
    maxQuizScene.draw();
  }
}
function drawAhmedQuizScene(){
  if (ahmedQuizScene && typeof ahmedQuizScene.draw==="function"){
    ahmedQuizScene.draw();
  }
}
function drawMarcelaQuizScene(){
  if (marcelaQuizScene && typeof marcelaQuizScene.draw==="function"){
    marcelaQuizScene.draw();
  }
}
function drawToniQuizScene(){
  if (toniQuizScene && typeof toniQuizScene.draw==="function"){
    toniQuizScene.draw();
  }
}

function buildMaxQuizButtons(){
  clearButtons();
  const btnW = 150, btnH = 44;
  const y = height - 70;
  addBtn(40, y, btnW, btnH, "Zurück", ()=>{
    if (maxQuizScene && maxQuizScene.prevPage && maxQuizScene.prevPage()){
      updateMaxQuizButtons();
    } else {
      back();
    }
  });
  maxQuizBtnCheck = addBtn(width/2 - btnW/2, y, btnW, btnH, "Prüfen", ()=>{
    if (!maxQuizScene || (maxQuizScene.canCheck && !maxQuizScene.canCheck())) return;
    if (typeof maxQuizScene.check==="function") maxQuizScene.check();
    updateMaxQuizButtons();
  });
  maxQuizBtnNext = addBtn(width - btnW - 40, y, btnW, btnH, "Weiter ▶", ()=>{
    if (!maxQuizScene || (maxQuizScene.canNext && !maxQuizScene.canNext())) return;
    let finished = true;
    if (typeof maxQuizScene.nextPageOrFinish==="function"){
      finished = maxQuizScene.nextPageOrFinish();
    }
    if (finished){
      go("company");
      buildCompanyButtons();
    } else {
      updateMaxQuizButtons();
    }
  });
  updateMaxQuizButtons();
}

function updateMaxQuizButtons(){
  if (!maxQuizScene) return;
  const canCheck = maxQuizScene.canCheck ? maxQuizScene.canCheck() : (maxQuizScene.allAnswered ? maxQuizScene.allAnswered() : false);
  const canNext = maxQuizScene.canNext ? maxQuizScene.canNext() : (maxQuizScene.isChecked || false);
  if (maxQuizBtnCheck) maxQuizBtnCheck.setDisabled(!canCheck);
  if (maxQuizBtnNext){
    maxQuizBtnNext.setDisabled(!canNext);
    const lastPage = maxQuizScene.pageSizes ? (maxQuizScene.pageIndex >= (maxQuizScene.pageSizes.length-1)) : true;
    maxQuizBtnNext.label = lastPage ? "Weiter ▶" : "Nächste Frage ▶";
  }
}

function buildMariaQuizButtons(){
  clearButtons();
  const btnW = 150, btnH = 44;
  const y = height - 70;
  addBtn(40, y, btnW, btnH, "Zurück", ()=>{
    if (mariaQuizScene && mariaQuizScene.prevPage && mariaQuizScene.prevPage()){
      updateMariaQuizButtons();
    } else {
      back();
    }
  });
  mariaQuizBtnCheck = addBtn(width/2 - btnW/2, y, btnW, btnH, "Prüfen", ()=>{
    if (!mariaQuizScene || (mariaQuizScene.canCheck && !mariaQuizScene.canCheck())) return;
    if (typeof mariaQuizScene.check==="function") mariaQuizScene.check();
    updateMariaQuizButtons();
  });
  mariaQuizBtnNext = addBtn(width - btnW - 40, y, btnW, btnH, "Weiter ▶", ()=>{
    if (!mariaQuizScene || (mariaQuizScene.canNext && !mariaQuizScene.canNext())) return;
    let finished = true;
    if (typeof mariaQuizScene.nextPageOrFinish==="function"){
      finished = mariaQuizScene.nextPageOrFinish();
    }
    if (finished){
      go("company");
      buildCompanyButtons();
    } else {
      updateMariaQuizButtons();
    }
  });
  updateMariaQuizButtons();
}

function updateMariaQuizButtons(){
  if (!mariaQuizScene) return;
  const canCheck = mariaQuizScene.canCheck ? mariaQuizScene.canCheck() : (mariaQuizScene.allAnswered ? mariaQuizScene.allAnswered() : false);
  const canNext = mariaQuizScene.canNext ? mariaQuizScene.canNext() : (mariaQuizScene.isChecked || false);
  if (mariaQuizBtnCheck) mariaQuizBtnCheck.setDisabled(!canCheck);
  if (mariaQuizBtnNext){
    mariaQuizBtnNext.setDisabled(!canNext);
    const lastPage = mariaQuizScene.pageSizes ? (mariaQuizScene.pageIndex >= (mariaQuizScene.pageSizes.length-1)) : true;
    mariaQuizBtnNext.label = lastPage ? "Weiter ▶" : "Nächste Frage ▶";
  }
}

function buildAhmedQuizButtons(){
  clearButtons();
  const btnW = 150, btnH = 44;
  const y = height - 70;
  addBtn(40, y, btnW, btnH, "Zur\u00fcck", ()=>{
    if (ahmedQuizScene && ahmedQuizScene.prevPage && ahmedQuizScene.prevPage()){
      updateAhmedQuizButtons();
    } else {
      back();
    }
  });
  ahmedQuizBtnCheck = addBtn(width/2 - btnW/2, y, btnW, btnH, "Pr\u00fcfen", ()=>{
    if (!ahmedQuizScene || (ahmedQuizScene.canCheck && !ahmedQuizScene.canCheck())) return;
    if (typeof ahmedQuizScene.check==="function") ahmedQuizScene.check();
    updateAhmedQuizButtons();
  });
  ahmedQuizBtnNext = addBtn(width - btnW - 40, y, btnW, btnH, "Weiter \u27a1", ()=>{
    if (!ahmedQuizScene || (ahmedQuizScene.canNext && !ahmedQuizScene.canNext())) return;
    let finished = true;
    if (typeof ahmedQuizScene.nextPageOrFinish==="function"){
      finished = ahmedQuizScene.nextPageOrFinish();
    }
    if (finished){
      go("company");
      buildCompanyButtons();
    } else {
      updateAhmedQuizButtons();
    }
  });
  updateAhmedQuizButtons();
}

function updateAhmedQuizButtons(){
  if (!ahmedQuizScene) return;
  const canCheck = ahmedQuizScene.canCheck ? ahmedQuizScene.canCheck() : (ahmedQuizScene.allAnswered ? ahmedQuizScene.allAnswered() : false);
  const canNext = ahmedQuizScene.canNext ? ahmedQuizScene.canNext() : (ahmedQuizScene.isChecked || false);
  if (ahmedQuizBtnCheck) ahmedQuizBtnCheck.setDisabled(!canCheck);
  if (ahmedQuizBtnNext){
    ahmedQuizBtnNext.setDisabled(!canNext);
    const lastPage = ahmedQuizScene.pageSizes ? (ahmedQuizScene.pageIndex >= (ahmedQuizScene.pageSizes.length-1)) : true;
    ahmedQuizBtnNext.label = lastPage ? "Weiter \u27a1" : "N\u00e4chste Frage \u27a1";
  }
}

function buildMarcelaQuizButtons(){
  clearButtons();
  const btnW = 150, btnH = 44;
  const y = height - 70;
  addBtn(40, y, btnW, btnH, "Zur\u00fcck", ()=>{
    if (marcelaQuizScene && marcelaQuizScene.prevPage && marcelaQuizScene.prevPage()){
      updateMarcelaQuizButtons();
    } else {
      back();
    }
  });
  marcelaQuizBtnCheck = addBtn(width/2 - btnW/2, y, btnW, btnH, "Pr\u00fcfen", ()=>{
    if (!marcelaQuizScene || (marcelaQuizScene.canCheck && !marcelaQuizScene.canCheck())) return;
    if (typeof marcelaQuizScene.check==="function") marcelaQuizScene.check();
    updateMarcelaQuizButtons();
  });
  marcelaQuizBtnNext = addBtn(width - btnW - 40, y, btnW, btnH, "Weiter \u27a1", ()=>{
    if (!marcelaQuizScene || (marcelaQuizScene.canNext && !marcelaQuizScene.canNext())) return;
    let finished = true;
    if (typeof marcelaQuizScene.nextPageOrFinish==="function"){
      finished = marcelaQuizScene.nextPageOrFinish();
    }
    if (finished){
      go("company");
      buildCompanyButtons();
    } else {
      updateMarcelaQuizButtons();
    }
  });
  updateMarcelaQuizButtons();
}

function updateMarcelaQuizButtons(){
  if (!marcelaQuizScene) return;
  const canCheck = marcelaQuizScene.canCheck ? marcelaQuizScene.canCheck() : (marcelaQuizScene.allAnswered ? marcelaQuizScene.allAnswered() : false);
  const canNext = marcelaQuizScene.canNext ? marcelaQuizScene.canNext() : (marcelaQuizScene.isChecked || false);
  if (marcelaQuizBtnCheck) marcelaQuizBtnCheck.setDisabled(!canCheck);
  if (marcelaQuizBtnNext){
    marcelaQuizBtnNext.setDisabled(!canNext);
    const lastPage = marcelaQuizScene.pageSizes ? (marcelaQuizScene.pageIndex >= (marcelaQuizScene.pageSizes.length-1)) : true;
    marcelaQuizBtnNext.label = lastPage ? "Weiter \u27a1" : "N\u00e4chste Frage \u27a1";
  }
}

function buildToniQuizButtons(){
  clearButtons();
  const btnW = 150, btnH = 44;
  const y = height - 70;
  addBtn(40, y, btnW, btnH, "Zur\u00fcck", ()=>{
    if (toniQuizScene && toniQuizScene.prevPage && toniQuizScene.prevPage()){
      updateToniQuizButtons();
    } else {
      back();
    }
  });
  toniQuizBtnCheck = addBtn(width/2 - btnW/2, y, btnW, btnH, "Pr\u00fcfen", ()=>{
    if (!toniQuizScene || (toniQuizScene.canCheck && !toniQuizScene.canCheck())) return;
    if (typeof toniQuizScene.check==="function") toniQuizScene.check();
    updateToniQuizButtons();
  });
  toniQuizBtnNext = addBtn(width - btnW - 40, y, btnW, btnH, "Weiter \u27a1", ()=>{
    if (!toniQuizScene || (toniQuizScene.canNext && !toniQuizScene.canNext())) return;
    let finished = true;
    if (typeof toniQuizScene.nextPageOrFinish==="function"){
      finished = toniQuizScene.nextPageOrFinish();
    }
    if (finished){
      go("company");
      buildCompanyButtons();
    } else {
      updateToniQuizButtons();
    }
  });
  updateToniQuizButtons();
}

function updateToniQuizButtons(){
  if (!toniQuizScene) return;
  const canCheck = toniQuizScene.canCheck ? toniQuizScene.canCheck() : (toniQuizScene.allAnswered ? toniQuizScene.allAnswered() : false);
  const canNext = toniQuizScene.canNext ? toniQuizScene.canNext() : (toniQuizScene.isChecked || false);
  if (toniQuizBtnCheck) toniQuizBtnCheck.setDisabled(!canCheck);
  if (toniQuizBtnNext){
    toniQuizBtnNext.setDisabled(!canNext);
    const lastPage = toniQuizScene.pageSizes ? (toniQuizScene.pageIndex >= (toniQuizScene.pageSizes.length-1)) : true;
    toniQuizBtnNext.label = lastPage ? "Weiter \u27a1" : "N\u00e4chste Frage \u27a1";
  }
}

//////////////////////
// Text-Helpers     //
//////////////////////

function wrapLines(str, w, size){
  textSize(size);
  const words = (str+"").split(" ");
  const lines = [];
  let line = "";
  for (let i=0;i<words.length;i++){
    const test = (line ? line+" " : "") + words[i];
    if (textWidth(test) <= w) line = test;
    else { if (line) lines.push(line); line = words[i]; }
  }
  if (line) lines.push(line);
  return lines;
}

function drawParagraph(s, x, y, w, size=14, leading=20, colorVal=210){
  fill(colorVal); textSize(size); textLeading(leading); textAlign(LEFT,TOP);
  const lines = wrapLines(s, w, size);
  text(lines.join("\n"), x, y);
  return y + lines.length * leading;
}

function drawBullets(list, x, y, w, size=14, leading=20, colorVal=210){
  textSize(size); textLeading(leading); textAlign(LEFT,TOP);
  const indent = 16;
  for (const item of list){
    const lines = wrapLines(item, w - indent, size);
    fill(colorVal);
    text("• " + lines[0], x, y);
    y += leading;
    for (let i=1;i<lines.length;i++){
      text(lines[i], x + indent, y);
      y += leading;
    }
  }
  return y;
}

//////////////////////
// Navigation & UI  //
//////////////////////

class Btn{
  constructor(x,y,w,h,label,cb){ this.x=x; this.y=y; this.w=w; this.h=h; this.label=label; this.cb=cb; this.disabled=false; }
  draw(){
    const hover = this.contains(mouseX,mouseY) && !this.disabled;
    push();
    stroke(255,255,255, hover?90:50); strokeWeight(2);
    fill(this.disabled? color(70) : (hover? color(58,134,255) : color(42,46,60)));
    rect(this.x,this.y,this.w,this.h,12);
    noStroke(); fill(this.disabled? color(190): color(255)); textAlign(CENTER,CENTER); textSize(16);
    text(this.label, this.x+this.w/2, this.y+this.h/2);
    pop();
  }
  contains(mx,my){ return mx>=this.x && mx<=this.x+this.w && my>=this.y && my<=this.y+this.h; }
  click(){ if (!this.disabled) this.cb && this.cb(); }
  setDisabled(flag){ this.disabled = flag; }
}
function addBtn(x,y,w,h,txt,cb){ const btn = new Btn(x,y,w,h,txt,cb); buttons.push(btn); return btn; }
function clearButtons(){ buttons.length=0; }
function drawButtons(){ buttons.forEach(b=>b.draw()); }
function mxInRect(mx,my,x,y,w,h){ return mx>=x && mx<=x+w && my>=y && my<=y+h; }

function go(to){
  if (to==="company") {
    if (state!=="glossary") backStack.push(state);
    state = "transition";
    transitionTimer = millis();
    clearButtons();
    setTimeout(()=>{
      startCompanyBarsForCurrentScenario();
      state = "companybars";
      rebuildButtonsForState();
    }, 900);
    return;
  }
  if (state!=="glossary") backStack.push(state);
  state = to;
  clearButtons();
}

function createP5Context(){
  const ctx = {
    background,
    image,
    textSize,
    textAlign,
    textLeading,
    textAscent,
    textDescent,
    text,
    textWidth,
    fill,
    rect,
    circle,
    noStroke,
    stroke,
    strokeWeight,
    textStyle,
    push,
    pop,
    loadImage,
    color
  };
  ctx.BOLD = typeof BOLD!=="undefined"? BOLD : undefined;
  ctx.NORMAL = typeof NORMAL!=="undefined"? NORMAL : undefined;
  Object.defineProperty(ctx, "width", {get: ()=> width});
  Object.defineProperty(ctx, "height",{get: ()=> height});
  Object.defineProperty(ctx, "mouseX",{get: ()=> mouseX});
  Object.defineProperty(ctx, "mouseY",{get: ()=> mouseY});
  return ctx;
}

function startMariaQuizScene(){
  const scKey = SCENARIO_KEY_MAP[scenarioSel] || "s1";
  if (!window.MARIA_QUIZ_CONFIG || !window.MARIA_QUIZ_CONFIG[scKey]){
    go("quiz"); buildQuizButtons(); return;
  }
  mariaQuizScenarioKey = scKey;
  const ctx = createP5Context();
  const nav = (action)=>{
    if (action==="back"){
      back();
      return;
    }
    if (action==="next"){
      state="company";
      buildCompanyButtons();
      return;
    }
  };
  if (state!=="glossary") backStack.push(state);
  mariaQuizScene = globalThis.createMariaQuizScene(ctx, scKey, nav);
  state = "maria_quiz";
  buildMariaQuizButtons();
}

function startMaxQuizScene(){
  const scKey = SCENARIO_KEY_MAP[scenarioSel] || "s1";
  if (!window.MAX_QUIZ_CONFIG || !window.MAX_QUIZ_CONFIG[scKey]){
    go("quiz"); buildQuizButtons(); return;
  }
  maxQuizScenarioKey = scKey;
  const ctx = createP5Context();
  const nav = (action)=>{
    if (action==="back"){
      back();
      return;
    }
    if (action==="next"){
      state="company";
      buildCompanyButtons();
      return;
    }
  };
  if (state!=="glossary") backStack.push(state);
  maxQuizScene = globalThis.createMaxQuizScene(ctx, scKey, nav);
  state = "max_quiz";
  buildMaxQuizButtons();
}

function startAhmedQuizScene(){
  const scKey = SCENARIO_KEY_MAP[scenarioSel] || "s1";
  if (!window.AHMED_QUIZ_CONFIG || !window.AHMED_QUIZ_CONFIG[scKey]){
    go("quiz"); buildQuizButtons(); return;
  }
  ahmedQuizScenarioKey = scKey;
  const ctx = createP5Context();
  const nav = (action)=>{
    if (action==="back"){
      back();
      return;
    }
    if (action==="next"){
      state="company";
      buildCompanyButtons();
      return;
    }
  };
  if (state!=="glossary") backStack.push(state);
  ahmedQuizScene = globalThis.createAhmedQuizScene(ctx, scKey, nav);
  state = "ahmed_quiz";
  buildAhmedQuizButtons();
}

function startMarcelaQuizScene(){
  const scKey = SCENARIO_KEY_MAP[scenarioSel] || "s1";
  if (!window.MARCELA_QUIZ_CONFIG || !window.MARCELA_QUIZ_CONFIG[scKey]){
    go("quiz"); buildQuizButtons(); return;
  }
  marcelaQuizScenarioKey = scKey;
  const ctx = createP5Context();
  const nav = (action)=>{
    if (action==="back"){
      back();
      return;
    }
    if (action==="next"){
      state="company";
      buildCompanyButtons();
      return;
    }
  };
  if (state!=="glossary") backStack.push(state);
  marcelaQuizScene = globalThis.createMarcelaQuizScene(ctx, scKey, nav);
  state = "marcela_quiz";
  buildMarcelaQuizButtons();
}

function startToniQuizScene(){
  const scKey = SCENARIO_KEY_MAP[scenarioSel] || "s1";
  if (!window.TONI_QUIZ_CONFIG || !window.TONI_QUIZ_CONFIG[scKey]){
    go("quiz"); buildQuizButtons(); return;
  }
  toniQuizScenarioKey = scKey;
  const ctx = createP5Context();
  const nav = (action)=>{
    if (action==="back"){
      back();
      return;
    }
    if (action==="next"){
      state="company";
      buildCompanyButtons();
      return;
    }
  };
  if (state!=="glossary") backStack.push(state);
  toniQuizScene = globalThis.createToniQuizScene(ctx, scKey, nav);
  state = "toni_quiz";
  buildToniQuizButtons();
}

function startCompanyBarsForCurrentScenario(){
  const storedRole = getStoredRoleId() || getRoleIdFromSel();
  const storedSc = getStoredScenarioKey() || getScenarioKeyFromSel();
  if (ROLE_KEY_TO_SEL[storedRole]) roleSel = ROLE_KEY_TO_SEL[storedRole];
  if (SCENARIO_KEY_TO_SEL[storedSc]) scenarioSel = SCENARIO_KEY_TO_SEL[storedSc];
  const cfg = (typeof getBarsConfig==="function") ? getBarsConfig(storedRole, storedSc) : null;
  if (cfg && cfg.scenario && cfg.scenario.targets){
    initCompanyBarsFromConfig(cfg);
  } else if (roleSel===5){
    if (scenarioSel===1) return initCompanyBars_Marcela_S1();
    if (scenarioSel===2) return initCompanyBars_Marcela_S2();
    return initCompanyBars_Marcela_S3();
  } else {
    initCompanyBarsScene();
  }
}
function back(){
  if (openedArea!==null){ openedArea=null; clearButtons(); rebuildButtonsForState(); return; }
  const prev = backStack.pop();
  if (prev){ state = prev; clearButtons(); rebuildButtonsForState(); }
}

function rebuildButtonsForState(){
  switch(state){
    case "start":    buildStart(); break;
    case "rolepick": buildRolePickButtons(); break;
    case "roleintro":buildRoleIntroButtons(); break;
    case "pick":     buildPickButtons(); break;
    case "companybars": buildCompanyBarsButtons(); break;
    case "company":  buildCompanyButtons(); break;
    case "role":     buildRoleButtons(); break;
    case "quiz":     buildQuizButtons(); break;
    case "max_quiz": buildMaxQuizButtons(); break;
    case "maria_quiz": buildMariaQuizButtons(); break;
    case "ahmed_quiz": buildAhmedQuizButtons(); break;
    case "marcela_quiz": buildMarcelaQuizButtons(); break;
    case "toni_quiz": buildToniQuizButtons(); break;
    case "macro":    buildMacroButtons(); break;
    case "self":     buildSelfButtons(); break;
    case "ending":   buildEndingButtons(); break;
  }
}

function keyPressed(){
  if (state==="companybars"){
    if (keyCode===ENTER){ companyBarsCheck(); return false; }
    if (keyCode===TAB){
      const dir = keyIsDown(SHIFT)? -1 : 1;
      companyBarsActiveIndex = (companyBarsActiveIndex + dir + companyBars.length) % companyBars.length;
      return false;
    }
    if (!companyBarsLocked){
      const bar = companyBars[companyBarsActiveIndex];
      if (keyCode===RIGHT_ARROW){ bar.bumpGuess(+COMPANY_STEP); return false; }
      if (keyCode===LEFT_ARROW){ bar.bumpGuess(-COMPANY_STEP); return false; }
    }
    return false;
  }
  if (state==="max_quiz" && maxQuizScene && typeof maxQuizScene.handleKey==="function"){
    const handled = maxQuizScene.handleKey(keyCode, key);
    if (handled){ updateMaxQuizButtons(); return false; }
  }
  if (state==="maria_quiz" && mariaQuizScene && typeof mariaQuizScene.handleKey==="function"){
    const handled = mariaQuizScene.handleKey(keyCode, key);
    if (handled){ updateMariaQuizButtons(); return false; }
  }
  if (state==="marcela_quiz" && marcelaQuizScene && typeof marcelaQuizScene.handleKey==="function"){
    const handled = marcelaQuizScene.handleKey(keyCode, key);
    if (handled){ updateMarcelaQuizButtons(); return false; }
  }
  if (state==="ahmed_quiz" && ahmedQuizScene && typeof ahmedQuizScene.handleKey==="function"){
    const handled = ahmedQuizScene.handleKey(keyCode, key);
    if (handled){ updateAhmedQuizButtons(); return false; }
  }
  if (state==="toni_quiz" && toniQuizScene && typeof toniQuizScene.handleKey==="function"){
    const handled = toniQuizScene.handleKey(keyCode, key);
    if (handled){ updateToniQuizButtons(); return false; }
  }
  if (state==="quiz"){
    if (key==='1') pickAnswer(0);
    if (key==='2') pickAnswer(1);
    if (key==='3') pickAnswer(2);
  } else if (state==="pick"){
    if (key==='1') scenarioSel=1;
    if (key==='2') scenarioSel=2;
    if (key==='3') scenarioSel=3;
  }
  if (keyCode===ENTER){
    if (state==="start"){ go("rolepick"); buildRolePickButtons(); }
    else if (state==="rolepick" && roleSel){ go("roleintro"); buildRoleIntroButtons(); }
    else if (state==="roleintro"){ go("pick"); buildPickButtons(); }
    else if (state==="pick" && scenarioSel){ initScenario(scenarioSel); go("company"); buildCompanyButtons(); }
    else if (state==="role"){
      if (roleSel===ROLE_KEY_TO_SEL.maria || ROLE_ID_MAP[roleSel]==="maria"){ go("macro"); buildMacroButtons(); }
      else { go("quiz"); buildQuizButtons(); }
    }
    else if (state==="max_quiz"){
      if (maxQuizScene){
        if (maxQuizScene.canCheck && maxQuizScene.canCheck()){
          maxQuizScene.check();
          updateMaxQuizButtons();
        } else if (maxQuizScene.canNext && maxQuizScene.canNext()){
          const finished = maxQuizScene.nextPageOrFinish ? maxQuizScene.nextPageOrFinish() : true;
          if (finished){ go("company"); buildCompanyButtons(); }
          else { updateMaxQuizButtons(); }
        }
      }
    }
    else if (state==="maria_quiz"){
      if (mariaQuizScene){
        if (mariaQuizScene.canCheck && mariaQuizScene.canCheck()){
          mariaQuizScene.check();
          updateMariaQuizButtons();
        } else if (mariaQuizScene.canNext && mariaQuizScene.canNext()){
          const finished = mariaQuizScene.nextPageOrFinish ? mariaQuizScene.nextPageOrFinish() : true;
          if (finished){ go("company"); buildCompanyButtons(); }
          else { updateMariaQuizButtons(); }
        }
      }
    }
    else if (state==="ahmed_quiz"){
      if (ahmedQuizScene){
        if (ahmedQuizScene.canCheck && ahmedQuizScene.canCheck()){
          ahmedQuizScene.check();
          updateAhmedQuizButtons();
        } else if (ahmedQuizScene.canNext && ahmedQuizScene.canNext()){
          const finished = ahmedQuizScene.nextPageOrFinish ? ahmedQuizScene.nextPageOrFinish() : true;
          if (finished){ go("company"); buildCompanyButtons(); }
          else { updateAhmedQuizButtons(); }
        }
      }
    }
    else if (state==="marcela_quiz"){
      if (marcelaQuizScene){
        if (marcelaQuizScene.canCheck && marcelaQuizScene.canCheck()){
          marcelaQuizScene.check();
          updateMarcelaQuizButtons();
        } else if (marcelaQuizScene.canNext && marcelaQuizScene.canNext()){
          const finished = marcelaQuizScene.nextPageOrFinish ? marcelaQuizScene.nextPageOrFinish() : true;
          if (finished){ go("company"); buildCompanyButtons(); }
          else { updateMarcelaQuizButtons(); }
        }
      }
    }
    else if (state==="toni_quiz"){
      if (toniQuizScene){
        if (toniQuizScene.canCheck && toniQuizScene.canCheck()){
          toniQuizScene.check();
          updateToniQuizButtons();
        } else if (toniQuizScene.canNext && toniQuizScene.canNext()){
          const finished = toniQuizScene.nextPageOrFinish ? toniQuizScene.nextPageOrFinish() : true;
          if (finished){ go("company"); buildCompanyButtons(); }
          else { updateToniQuizButtons(); }
        }
      }
    }
    else if (state==="marcela_quiz"){
      if (marcelaQuizScene){
        if (marcelaQuizScene.canCheck && marcelaQuizScene.canCheck()){
          marcelaQuizScene.check();
          updateMarcelaQuizButtons();
        } else if (marcelaQuizScene.canNext && marcelaQuizScene.canNext()){
          const finished = marcelaQuizScene.nextPageOrFinish ? marcelaQuizScene.nextPageOrFinish() : true;
          if (finished){ go("company"); buildCompanyButtons(); }
          else { updateMarcelaQuizButtons(); }
        }
      }
    }
    else if (state==="macro"){ go("self"); buildSelfButtons(); }
    else if (state==="self"){ go("ending"); buildEndingButtons(); }
  }
  if (keyCode===ESCAPE){ back(); }
}

function mousePressed(){
  if (backBtn && backBtn.contains(mouseX,mouseY)) { backBtn.click(); return; }
  for (const b of buttons) if (b.contains(mouseX,mouseY)) { b.click(); return; }

  if (openedArea!==null) return;

  if (state==="max_quiz" && maxQuizScene && typeof maxQuizScene.handleClick==="function"){
    const hit = maxQuizScene.handleClick(mouseX, mouseY);
    if (hit!==undefined) updateMaxQuizButtons();
    return;
  }
  if (state==="maria_quiz" && mariaQuizScene && typeof mariaQuizScene.handleClick==="function"){
    const hit = mariaQuizScene.handleClick(mouseX, mouseY);
    if (hit!==undefined) updateMariaQuizButtons();
    return;
  }
  if (state==="ahmed_quiz" && ahmedQuizScene && typeof ahmedQuizScene.handleClick==="function"){
    const hit = ahmedQuizScene.handleClick(mouseX, mouseY);
    if (hit!==undefined) updateAhmedQuizButtons();
    return;
  }
  if (state==="marcela_quiz" && marcelaQuizScene && typeof marcelaQuizScene.handleClick==="function"){
    const hit = marcelaQuizScene.handleClick(mouseX, mouseY);
    if (hit!==undefined) updateMarcelaQuizButtons();
    return;
  }
  if (state==="toni_quiz" && toniQuizScene && typeof toniQuizScene.handleClick==="function"){
    const hit = toniQuizScene.handleClick(mouseX, mouseY);
    if (hit!==undefined) updateToniQuizButtons();
    return;
  }
  if (state==="ahmed_quiz" && ahmedQuizScene && typeof ahmedQuizScene.handleClick==="function"){
    const hit = ahmedQuizScene.handleClick(mouseX, mouseY);
    if (hit!==undefined) updateAhmedQuizButtons();
    return;
  }

  if (state==="companybars"){
    handleCompanyBarsMouseDown(mouseX, mouseY);
    return;
  }

  if (state==="rolepick"){
    const cards = getRoleCards();
    for (const c of cards){
      if (mxInRect(mouseX,mouseY,c.x,c.y,c.w,c.h)){
        roleSel=c.id;
        go("roleintro");
        buildRoleIntroButtons();
        return;
      }
    }
  }

  if (state==="pick"){
    const cards = getScenarioCards(24, HEADER_H+12+40);
    for (const c of cards){
      if (mxInRect(mouseX,mouseY,c.x,c.y,c.w,c.h)){ scenarioSel=c.id; return; }
    }
  }

  if (state==="company"){
    for (let i=0;i<areas.length;i++){
      const a = areas[i];
      if (mxInRect(mouseX,mouseY,a.x,a.y,a.w,a.h)){ openAreaModal(i); return; }
    }
  }
}

function mouseReleased(){
  if (state==="companybars"){
    handleCompanyBarsMouseUp(mouseX, mouseY);
    return;
  }
}

///////////////////////
// Topbar & Sidebar  //
///////////////////////

function drawTopBar(){
  push();
  noStroke(); fill(26,27,33); rect(0,0,width,HEADER_H);

  // Zurück
  backBtn = null;
  if (state!=="start"){
    backBtn = new Btn(10,10,30,30,"←", back);
    backBtn.draw = function(){
      const hover=this.contains(mouseX,mouseY);
      push(); noStroke(); fill(hover? color(58,134,255): color(42,46,60));
      rect(this.x,this.y,this.w,this.h,8);
      fill(255); textAlign(CENTER,CENTER); textSize(18); text("←", this.x+this.w/2, this.y+this.h/2); pop();
    };
    backBtn.draw();
  }

  // Titel
  noStroke(); fill(235); textAlign(CENTER,CENTER); textSize(17);
  text("KI & Arbeitswelt – Szenario-Game (9. Klasse)", width/2, HEADER_H/2);

  // Mini-Avatar Bereich
  if (roleSel){
    const pillH = 42;
    const pillMaxW = 140;
    const pillMargin = 20;
    const pillW = min(pillMaxW, width - pillMargin*2);
    const pillX = width - pillMargin - pillW;
    const pillY = 8;
    push();
    fill(43,45,58); stroke(70,80,110); strokeWeight(1.5); rect(pillX, pillY, pillW, pillH, 12);
    noStroke();
    const avatarSize = 34;
    drawRoleAvatar(roleSel, pillX+8, pillY-6, avatarSize);
    if (roleProfiles && roleProfiles[roleSel]){
      const label = roleProfiles[roleSel].name.split(" – ")[0];
      const textX = pillX + avatarSize + 14;
      fill(225); textAlign(LEFT,TOP); textSize(11);
      text(label, textX, pillY+9, pillW - (textX - pillX) - 10, 20);
      fill(170); textSize(9);
      text("dein Avatar", textX, pillY+23);
    }
    pop();
  }

  pop();
}

function drawSidebar(){
  const x=10, y=HEADER_H+10, w=SIDEBAR_W-20;
  push();
  noStroke(); fill(36,39,50); rect(x,y,w,height-y-20,12);
  fill(240); textSize(16); textAlign(LEFT,TOP); text("Deine Werte", x+12, y+10);
  let yy=y+40;
  drawMetric("Job-Fit",     uiMetrics.fit,   x+12, yy); yy+=42;
  drawMetric("Regeln & Sicherheit", uiMetrics.rules, x+12, yy); yy+=42;
  drawMetric("Tempo/Produktivität", uiMetrics.speed, x+12, yy); yy+=42;
  drawMetric("Wohlstand",   uiMetrics.wealth,x+12, yy); yy+=42;
  drawMetric("Wettbewerbsfähigkeit", uiMetrics.comp, x+12, yy);
  pop();
}

function drawMetric(label, val, x, y){
  push();
  fill(200); textSize(12); text(label, x, y);
  const w=SIDEBAR_W-44, h=18;
  noFill(); stroke(120); rect(x, y+12, w, h, 8);
  noStroke();
  const c = lerpColor(color(230,90,90), color(80,200,120), constrain(val,0,100)/100);
  fill(c); rect(x+2, y+14, (w-4)*constrain(val,0,100)/100, h-4, 6);
  fill(240); textAlign(RIGHT,TOP); text(nf(val,2,0), x+w, y);
  pop();
}

function tweenUiMetrics(){
  const k=0.12;
  for (const kf of ["fit","rules","speed","wealth","comp"]){
    uiMetrics[kf] += (metrics[kf]-uiMetrics[kf]) * k;
  }
}
function initMetrics(m){ metrics = {...m}; uiMetrics = {...m}; }
function applyDelta(d){
  for (const k of ["fit","rules","speed","wealth","comp"]){
    if (d[k]!==undefined) metrics[k] = constrain(metrics[k] + d[k], 0, 100);
  }
}

//////////////////////
// Avatare          //
//////////////////////

function drawRoleAvatar(role,x,y,size){
  // Grundkörper
  push(); translate(x,y); wobble += 0.03; const bob=sin(wobble)*2;
  noStroke(); fill(0,0,0,60); ellipse(size/2, size+size*0.65, size*0.9, size*0.18);
  const bodyColors = [color(40,100,240), color(140,80,220), color(20,160,120), color(90,120,200), color(240,120,50)];
  fill(bodyColors[role-1]); rect(size*0.3, size*0.55+bob, size*0.4, size*0.38, 10);
  rect(size*0.36, size*0.93+bob, size*0.08, size*0.18, 6); rect(size*0.56, size*0.93+bob, size*0.08, size*0.18, 6);
  fill(250,220,195); ellipse(size*0.5, size*0.42+bob, size*0.42, size*0.42);
  // Kopfputz / Tools je Rolle
  if (role===1){ // Helm
    fill(255,190,50); arc(size*0.5, size*0.35+bob, size*0.5, size*0.36, PI, TWO_PI, OPEN); rect(size*0.35, size*0.35+bob, size*0.3, size*0.07, 6);
  } else if (role===2){ // Klemmbrett
    fill(220); rect(size*0.66, size*0.62+bob, size*0.18, size*0.22, 4);
    fill(160); rect(size*0.66, size*0.60+bob, size*0.18, size*0.04, 4);
  } else if (role===3){ // Pflege: Herz
    fill(230,60,90); beginShape();
    vertex(size*0.5, size*0.30+bob);
    bezierVertex(size*0.62,size*0.18+bob, size*0.78,size*0.32+bob, size*0.5,size*0.50+bob);
    bezierVertex(size*0.22,size*0.32+bob, size*0.38,size*0.18+bob, size*0.5,size*0.30+bob);
    endShape(CLOSE);
  } else if (role===4){ // Verwaltung: Akte/Dok
    fill(240,210,120); rect(size*0.32, size*0.65+bob, size*0.22, size*0.16, 4);
    fill(210); rect(size*0.50, size*0.60+bob, size*0.26, size*0.20, 6);
  } else if (role===5){ // Werbetexterin: Stift
    fill(240,200,80); rect(size*0.66, size*0.60+bob, size*0.06, size*0.28, 3);
    fill(90); triangle(size*0.66, size*0.88+bob, size*0.72, size*0.88+bob, size*0.69, size*0.96+bob);
  }
  // Gesicht
  fill(0); ellipse(size*0.44, size*0.40+bob, 6,6); ellipse(size*0.56, size*0.40+bob, 6,6);
  noFill(); stroke(0); strokeWeight(2); arc(size*0.5, size*0.46+bob, 22,16, 0, PI);
  pop();
}

//////////////////////
// START / ROLEPICK //
//////////////////////

function buildStart(){
  clearButtons();
  addBtn(width/2-140, height-140, 280, 56, "Start ▶", ()=>{ go("rolepick"); buildRolePickButtons(); });
}

function drawStart(x0,y0){
  push();
  const cardW = width - 2*x0;
  const cardH = height - HEADER_H - 140;
  const cardX = x0;
  const cardY = y0 + 12;
  noStroke(); fill(40,42,56); rect(cardX, cardY, cardW, cardH, 28);

  let yy = cardY + 40;
  fill(255); textAlign(CENTER,TOP); textSize(46);
  text("Wie verändert KI deinen Job bis 2030?", cardX + cardW/2, yy);
  yy += 70;

  const innerX = cardX + 80;
  const innerW = cardW - 160;
  yy = drawParagraph("Triff Entscheidungen in echten **Szenarien**: Wähle zuerst einen Beruf – dann siehst du, was sich bis 2030 in deiner Firma und in Deutschland ändern könnte.", innerX, yy, innerW, 18, 26, 215) + 10;

  const badges = ["5 Berufe ausprobieren", "3 Zukunfts-Szenarien erleben", "Quiz & Werte-Tracking"];
  const badgeW = 200, badgeH = 46, badgeGap = 18;
  const totalBadgesW = badges.length*badgeW + (badges.length-1)*badgeGap;
  let bx = cardX + cardW/2 - totalBadgesW/2;
  badges.forEach(txt=>{
    push();
    fill(30,32,44); stroke(70,85,140,120); rect(bx, yy, badgeW, badgeH, 14);
    noStroke(); fill(225); textAlign(CENTER,CENTER); textSize(14);
    text(txt, bx + badgeW/2, yy + badgeH/2);
    pop();
    bx += badgeW + badgeGap;
  });
  yy += badgeH + 30;

  drawRoleAvatar(roleSel || 1, cardX + cardW/2 - 60, yy, 120);
  yy += 150;

  fill(190); textSize(16); textAlign(CENTER,TOP);
  text("Klicke auf Start oder drücke ENTER.", cardX + cardW/2, yy);
  fill(150); textSize(11);
  text("Ein Spiel gestaltet nach den Szenarien von Nikolas Hubel, Robert Peters, Mona Hille, Kerstin Goluchowicz / Denkfabrik digitale Arbeitsgesellschaft",
       cardX + cardW/2, cardY + cardH - 36);
  pop();
}

function buildRolePickButtons(){
  clearButtons();
  addBtn(width/2-90, height-76, 180, 48, "Weiter ▶", ()=>{
    if (roleSel){ go("roleintro"); buildRoleIntroButtons(); }
  });
}

function getRoleCards(){
  const x0 = 24, y0 = HEADER_H + 12 + 60;
  const gap = 18;
  const usable = width - x0*2;
  const W = (usable - gap*4)/5;
  const H = 230;
  const xs = Array.from({length:5}, (_,i)=> x0 + i*(W+gap));
  const roles = [
    {id:1, title:"Facharbeiter\n(Industrie)", color:color(40,100,240)},
    {id:2, title:"Personalberaterin\n(Dienstleistung)", color:color(140,80,220)},
    {id:3, title:"Pflegefachkraft\n(Soziales)", color:color(20,160,120)},
    {id:4, title:"Sachbearbeiterin\n(Verwaltung)", color:color(90,120,200)},
    {id:5, title:"Werbetexterin\n(Medien)", color:color(240,120,50)},
  ];
  return roles.map((r,i)=>({id:r.id, x:xs[i], y:y0, w:W, h:H, meta:r}));
}

function drawRolePick(x0,y0){
  push();
  fill(240); textSize(26); textAlign(LEFT,TOP);
  text("Wähle einen Beruf", x0, y0);
  const cards = getRoleCards();
  cards.forEach(c=>{
    push();
    const isSel = roleSel===c.id;
    stroke(isSel? color(58,134,255): color(110)); strokeWeight(isSel?3:2);
    fill(36,39,50); rect(c.x,c.y,c.w,c.h,14);
    // Avatar
    drawRoleAvatar(c.id, c.x+36, c.y+18, 128);
    // Titel
    noStroke(); fill(240); textSize(14); textAlign(CENTER,TOP);
    text(c.meta.title, c.x+c.w/2, c.y+c.h-60);
    pop();
  });
  pop();
}

//////////////////////////
// ROLE INTRO (Kerntät.)//
//////////////////////////

const roleProfiles = {
  1: {
    name:"Max Sander – Facharbeiter, Industrie / verarbeitendes Gewerbe",
    summary:"Max (47) ist ein erfahrener Facharbeiter in der Produktion eines mittelständischen deutschen Maschinenbauunternehmens.",
    sections:[
      {
        title:"Qualifikation & Erfahrung",
        bullets:[
          "Abgeschlossene Ausbildung zum Industriemechaniker.",
          "Über 20 Jahre Berufserfahrung plus regelmäßige interne Schulungen.",
          "Zusatzkenntnisse in CNC-Einrichten, Qualitätsmanagement und Arbeitssicherheit."
        ]
      },
      {
        title:"Berufliches Umfeld / Branche",
        bullets:[
          "Mittelständischer Maschinenbauer für Spezialmaschinen (Export).",
          "Fertigungshalle mit festen Taktzeiten und Schichtbetrieb.",
          "Teamgröße 6–10 Personen, enge Zusammenarbeit mit QS & Instandhaltung."
        ]
      },
      {
        title:"Kerntätigkeiten (heute)",
        bullets:[
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
    name:"Toni Botelli – Personalberaterin, unternehmensnahe Dienstleistungen",
    summary:"Toni (29) arbeitet in einer kleinen Personalberatungs-Agentur und vermittelt passende Bewerberinnen an Unternehmen.",
    sections:[
      {
        title:"Qualifikation & Erfahrung",
        bullets:[
          "Bachelor Psychologie und berufsbegleitender Master Personalberatung.",
          "Mehrjährige Erfahrung im Recruiting.",
          "Geschult in Interviewtechnik, Eignungsdiagnostik, Arbeitsrecht/DSGVO.",
          "Sicherer Umgang mit Bewerbungssoftware und Video-Tools."
        ]
      },
      {
        title:"Berufliches Umfeld / Branche",
        bullets:[
          "Unternehmensnahe Dienstleistungen: Personalberatung & Headhunting.",
          "Kundschaft vor allem mittelständische Firmen, teils größere Unternehmen.",
          "Hybrid: Büro & Remote, viele Telefon- und Videogespräche.",
          "Enge Zusammenarbeit mit Personal- und Fachabteilungen der Kund*innen."
        ]
      },
      {
        title:"Kerntätigkeiten (heute)",
        bullets:[
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
    name:"Ahmed Al-Hassan – Altenpflegefachkraft, soziale Berufe",
    summary:"Ahmed (35) arbeitet in einem städtischen Pflegeheim in Hamburg und betreut ältere Bewohnerinnen im Alltag.",
    sections:[
      {
        title:"Qualifikation & Erfahrung",
        bullets:[
          "Ausbildung Pflegefachmann, Abschluss vor 5 Jahren.",
          "Fortbildungen in Demenz, Hygiene, Mobilisation und Erste Hilfe.",
          "Sicher in digitaler Dokumentation, Vitalzeichenmessung und Medikamentengabe nach Anordnung.",
          "Ziel: Weiterbildung zum Pflegedienstleiter in den nächsten Jahren."
        ]
      },
      {
        title:"Berufliches Umfeld / Branche",
        bullets:[
          "Städtisches Pflegeheim mit Wohnbereichen und festen Pflegeteams.",
          "Schichtdienst (Früh/Spät/Nacht) inklusive Wochenenden und Feiertagen.",
          "Zusammenarbeit mit Ärzt*innen, Therapeut*innen und Angehörigen.",
          "Klare Regeln: Hygienestandards, Datenschutz, Prüfungen durch den Medizinischen Dienst."
        ]
      },
      {
        title:"Kerntätigkeiten (heute)",
        bullets:[
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
    name:"Maria Schmidt – Sachbearbeiterin, öffentliche Verwaltung",
    summary:"Maria (46) arbeitet seit 17 Jahren in der Heilbronner Stadtverwaltung (Denkmalschutz & Grünflächen). Nach einem Unfall nutzt sie einen rollstuhlgerechten Arbeitsplatz und digitale Tools.",
    sections:[
      {
        title:"Qualifikation & Erfahrung",
        bullets:[
          "Abschluss Verwaltungswissenschaften; langjährige Kommunalverwaltungserfahrung.",
          "Fortbildungen in Kommunal-/Verwaltungsrecht, Datenschutz (DSGVO), E-Akte, Barrierefreiheit.",
          "Sicher in Bescheidtechnik (Begründung, Rechtsbehelfsbelehrung) und Fristenmanagement.",
          "Routiniert in Bürgerkommunikation (Telefon, Schriftverkehr, Termine) und Homeoffice-Orga."
        ]
      },
      {
        title:"Berufliches Umfeld / Branche",
        bullets:[
          "Stadtverwaltung Heilbronn, Schnittstellen zu Bauaufsicht, Rechtsamt, Kämmerei, Umwelt-/Denkmalbehörden.",
          "Kontakt zu Bürger*innen, Eigentümer*innen, Architekturbüros, Pflegefirmen.",
          "Arbeitsform: Büro & digital (E-Akte), teils Außentermine/Begehungen, Teamarbeit mit klaren Zuständigkeiten."
        ]
      },
      {
        title:"Kerntätigkeiten (heute)",
        bullets:[
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
    name:"Marcela Paz – Werbetexterin, Medien & Kreativschaffende",
    summary:"Marcela (30) schreibt und konzipiert Werbetexte in einer Agentur – von Social-Posts bis Kampagnenideen.",
    sections:[
      {
        title:"Qualifikation & Erfahrung",
        bullets:[
          "Studium Kommunikationsdesign; Praxis über Praktika und Junior-Stelle in der Agentur.",
          "Sicher im Text-Handwerk und mit Basiswissen zu Urheber- und Nutzungsrechten.",
          "Erfahrung in Präsentationen sowie Teamarbeit mit Design- und Video-Teams."
        ]
      },
      {
        title:"Berufliches Umfeld / Branche",
        bullets:[
          "Werbe-/Content-Agentur mit Projekten für Mittelstand und Start-ups.",
          "Hybrid: Büro & Homeoffice; enge Abstimmung mit Grafik, Social und Media.",
          "Kanäle: Social Media, Websites/Landingpages, Print, Video/Radio, Newsletter.",
          "Arbeitsweise: Briefing → Entwurf → Feedback → Finale, inklusive Pitchs und Deadlines."
        ]
      },
      {
        title:"Kerntätigkeiten (heute)",
        bullets:[
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

function drawRoleIntro(x0,y0){
  const rp = roleProfiles[roleSel];
  push();
  fill(240); textSize(24); textAlign(LEFT,TOP);
  text("Dein Job – Kerntätigkeiten", x0, y0);
  // Avatar + Name
  drawRoleAvatar(roleSel, x0, y0+46, 120);
  fill(240); textSize(18);
  text(rp.name, x0+140, y0+56);

  let contentX = x0+140;
  let ww = width - contentX - 60;
  let yy = y0+84;

  if (rp.summary){
    yy = drawParagraph(rp.summary, contentX, yy, ww, 15, 22, 210) + 10;
  } else {
    drawParagraph("Das machst du heute in deinem Beruf – kurz & klar:", contentX, yy, ww, 15, 20, 210);
    yy = drawBullets(rp.core || [], contentX, yy+30, ww, 15, 22, 210);
  }

  if (rp.sections){
    yy += 10;
    rp.sections.forEach(sec=>{
      const iconCenterX = contentX + 16;
      const textStart = contentX + 48;
      drawRoleSectionIcon(sec.title, iconCenterX, yy+14);
      fill(215); textSize(15); textAlign(LEFT,TOP); textStyle(BOLD);
      text(sec.title, textStart, yy);
      textStyle(NORMAL);
      yy += 22;
      yy = drawBullets(sec.bullets, textStart, yy, ww - (textStart-contentX), 14, 22, 210) + 12;
    });
  } else if (rp.core){
    yy = drawBullets(rp.core, contentX, yy, ww, 15, 22, 210);
  }

  // Hinweis
  yy = max(yy+10, y0+250);
  drawParagraph("Als Nächstes wählst du ein **Szenario** für Deutschland 2030. Danach siehst du die Änderungen in deiner Firma.", x0, yy, 680, 15, 22, 200);

  pop();
}

function drawRoleSectionIcon(title, cx, cy){
  push();
  translate(cx, cy);
  fill(33,35,48); stroke(70,80,140,160); strokeWeight(1.4); circle(0,0,32);
  noStroke();
  const lower = (title||"").toLowerCase();
  if (lower.includes("qualifikation")){
    fill(255,220,120); rect(-6,-8,12,16,3);
    fill(180,60,60); triangle(0,-12,6,-2,-6,-2);
  } else if (lower.includes("umfeld") || lower.includes("branche")){
    fill(110,160,255); rect(-10,0,20,10,2);
    fill(70,110,210); rect(-14,-10,28,9,2);
    fill(230); rect(-6,-4,12,6,1);
  } else if (lower.includes("kerntätigkeiten") || lower.includes("tätigkeiten")){
    fill(120,200,150); rect(-11,-4,22,8,3);
    fill(250); rect(-3,-12,6,16,2);
    fill(90,150,110); rect(-14,4,28,4,2);
  } else {
    fill(180,190,210); ellipse(0,0,16,16);
  }
  pop();
}

function buildRoleIntroButtons(){
  clearButtons();
  addBtn(24, height-64, 120, 40, "Zurück", ()=> back());
  addBtn(width-210, height-64, 190, 40, "Szenario wählen ▶", ()=>{ go("pick"); buildPickButtons(); });
}

/////////////////////////////
// Szenarien (allgemein)   //
/////////////////////////////

function buildPickButtons(){
  clearButtons();
  addBtn(24, height-64, 120, 40, "Zurück", ()=> back());
  addBtn(width-190, height-64, 170, 44, "Weiter ▶", ()=>{
    if (scenarioSel){ initScenario(scenarioSel); go("company"); buildCompanyButtons(); }
  });
}

function drawPick(x0,y0){
  push();
  fill(232); textSize(26); textAlign(CENTER,TOP);
  text("KI‑Szenarien für Deutschland 2030", width/2, y0);
  const msg = "Der Standort Deutschland und auch deine berufliche Tätigkeit wird sich je nach Szenario ändern.\nEntscheide dich für eines der genannten Szenarien.";
  const msgW = width - 2*(x0+120);
  const msgBlocks = msg.split("\n");
  fill(210); textSize(16); textAlign(CENTER,TOP);
  let msgY = y0+40;
  const msgLeading = 20;
  msgBlocks.forEach(block=>{
    const trimmed = block.trim();
    if (!trimmed){
      msgY += msgLeading;
      return;
    }
    const lines = wrapLines(trimmed, msgW, 16);
    lines.forEach(line=>{
      text(line, width/2, msgY);
      msgY += msgLeading;
    });
  });
  textAlign(LEFT,TOP);
  const cards = getScenarioCards(x0, msgY + 30);
  cards.forEach(c=> drawScenarioCard(c, scenarioSel===c.id));
  pop();
}

function getScenarioCards(x,y){
  const gap = 22;
  const usable = width - 2*x;
  const w = (usable - 2*gap)/3;
  const h=470;
  const xs=[x, x+w+gap, x+2*(w+gap)], yy=y+20;
  return [
    {id:1, x:xs[0], y:yy, w, h, data:scenarioDesc[1]},
    {id:2, x:xs[1], y:yy, w, h, data:scenarioDesc[2]},
    {id:3, x:xs[2], y:yy, w, h, data:scenarioDesc[3]},
  ];
}

function drawSectionTitle(txt, x, y){ fill(210); textSize(14); textAlign(LEFT,TOP); text(txt, x, y); }

function drawScenarioCard(c, isSel){
  push();
  stroke(isSel? color(58,134,255): color(110)); strokeWeight(isSel?3:2);
  fill(36,39,50); rect(c.x,c.y,c.w,c.h,14);
  noStroke(); fill(250); textAlign(LEFT,TOP); textSize(16); textLeading(20);
  text(c.data.title.replace("Starke Nischen-KI", "Starke Nischen-KI\n"), c.x+14, c.y+12, c.w-28, 60);

  let yy = c.y+58;
  if (c.data.lead){
    fill(210); textSize(14);
    yy = drawParagraph(c.data.lead, c.x+14, yy, c.w-28, 14, 20, 205) + 6;
  }

  yy = drawScenarioSection("Annahmen – was passiert", c.data.happens, c.x+18, yy, c.w-36, "good") + 8;
  yy = drawScenarioSection("Passiert weniger/nicht", c.data.not, c.x+18, yy, c.w-36, "bad");

  if (isSel){ fill(58,134,255); textAlign(RIGHT,BOTTOM); text("Ausgewählt", c.x+c.w-12, c.y+c.h-10); }
  pop();
}

function drawTransition(){
  background(18,19,23, 250);
  const duration = 900;
  const elapsed = constrain(millis() - transitionTimer, 0, duration);
  const t = elapsed / duration;
  const easing = 1 - pow(1 - t, 3);
  const size = lerp(60, 220, easing);
  const alpha = 255 * (1 - t);
  push();
  textAlign(CENTER,CENTER);
  textStyle(BOLD);
  fill(200,30,30, alpha);
  textSize(size);
  text("2030", width/2, height/2);
  pop();
  textStyle(NORMAL);
}

const scenarioDesc = {
  1: {
    title: "1) Wettbewerbsfähiges KI-Ökosystem",
    lead: "Deutschland/EU bauen eigene KI auf, mit klaren Regeln und viel Schulung.",
    happens: [
      "Eigene Modelle und Datenräume hier in Europa.",
      "Sinnvolle Regeln → Qualität & Vertrauen.",
      "Weiterbildungen für viele Beschäftigte.",
      "KI wird regelmäßig geprüft und verbessert."
    ],
    not: [
      "Abhängigkeit von wenigen Auslands-Anbietern.",
      "Undurchsichtige Entscheidungen ohne Kontrolle.",
      "Chaos bei Technik-Standards."
    ]
  },
  2: {
    title: "2) Zaungast der KI-Revolution",
    lead: "Firmen kaufen KI von großen Anbietern; wenig eigene Entwicklung, viel Papierkram.",
    happens: [
      "Zukauf fertiger Basismodelle.",
      "Viele Vorgaben → viel Dokumentation.",
      "Externe Spezialist*innen übernehmen viel."
    ],
    not: [
      "Eigene KI-Forschung und Start-ups.",
      "Schulung für alle Beschäftigten.",
      "Gleichbleibende Qualität – Ergebnisse schwanken öfter.",
      "Neue digitale Geschäftsmodelle."
    ]
  },
  3: {
    title: "3) Starke Nischen-KI (die „Hidden Champions“)",
    lead: "Deutsche Betriebe setzen auf spezialisierte KI für ihre Branche – mit guten, passenden Daten.",
    happens: [
      "Branchen-KI (z. B. für Maschinenbau, Pharma).",
      "Zusammenarbeit mit Forschung; klare Schnittstellen.",
      "Nachvollziehbare KI-Entscheidungen: man sieht, warum etwas vorgeschlagen wird.",
      "Hohe Qualität → guter Ruf im In- und Ausland."
    ],
    not: [
      "Undurchsichtige KI („man weiß nicht, wie sie entscheidet“).",
      "Durcheinander bei Programmen/Anbindungen.",
      "„Hauptsache schnell“ – Qualität zählt mehr als Tempo."
    ]
  }
};

function initCompanyBarsScene(scenarioKey){
  const key = scenarioKey || (scenarioSel===1? "S1" : scenarioSel===2? "S2" : "S3");
  renderCompanyBarsScene(getDefaultCompanyHeader(), COMPANY_TARGETS[key]);
}

function initCompanyBars_Marcela_S1(){
  const cfg = getMarcelaCompanyBarsConfig("S1");
  renderCompanyBarsScene(cfg.header, cfg.targets);
}
function initCompanyBars_Marcela_S2(){
  const cfg = getMarcelaCompanyBarsConfig("S2");
  renderCompanyBarsScene(cfg.header, cfg.targets);
}
function initCompanyBars_Marcela_S3(){
  const cfg = getMarcelaCompanyBarsConfig("S3");
  renderCompanyBarsScene(cfg.header, cfg.targets);
}

function renderCompanyBarsScene(headerConfig, targets){
  const headerFallback = getDefaultCompanyHeader();
  companyBarsHeader = headerConfig || headerFallback;
  const targetValues = (targets && targets.length===COMPANY_CATEGORIES.length)? targets : COMPANY_TARGETS.S1;
  companyBars = COMPANY_CATEGORIES.map((cat,idx)=> new BarControl({
    label: cat.label,
    desc: cat.desc,
    isNegative: cat.negative,
    target: targetValues[idx]
  }));
  companyBarsActiveIndex = 0;
  companyBarsLocked = false;
  companyBarsScore = 0;
  companyBarsNextEnabled = false;
  companyBarsStartY = SAFE_TOP;
  clearButtons();
  buildCompanyBarsButtons();
}

function getMarcelaCompanyBarsConfig(key){
  const src = (typeof MARCELA_COMPANY_BARS_CONFIG !== "undefined")? MARCELA_COMPANY_BARS_CONFIG : MARCELA_COMPANY_BARS_CONFIG_FALLBACK;
  return src[key];
}

function getDefaultCompanyHeader(){
  return {
    title: "Willkommen 2030 – Deine Firma",
    scenario: "Rate die sechs Balken. Klick = +10 (0–100).",
    intro: "",
    hints: []
  };
}

function getRoleIdFromSel(){
  return ROLE_ID_MAP[roleSel] || "marcela";
}
function getScenarioKeyFromSel(){
  return SCENARIO_KEY_MAP[scenarioSel] || "s3";
}
function getStoredRoleId(){
  try { return sessionStorage.getItem("roleId") || null; } catch(e){ return null; }
}
function getStoredScenarioKey(){
  try { return sessionStorage.getItem("scenarioKey") || null; } catch(e){ return null; }
}
function persistSelectionToSession(){
  const roleId = getRoleIdFromSel();
  const scKey = getScenarioKeyFromSel();
  try {
    sessionStorage.setItem("roleId", roleId);
    sessionStorage.setItem("scenarioKey", scKey);
  } catch(e){}
}

function initCompanyBarsFromConfig(cfg){
  if (!cfg || !cfg.scenario) return initCompanyBarsScene();
  companyBarsAvatarKey = cfg.avatarKey || "marcela";
  if (ROLE_KEY_TO_SEL[companyBarsAvatarKey]) roleSel = ROLE_KEY_TO_SEL[companyBarsAvatarKey];
  const header = {
    title: cfg.scenario.title || getDefaultCompanyHeader().title,
    scenario: cfg.scenario.scenarioTag || "",
    intro: cfg.scenario.intro || "",
    hints: cfg.scenario.hints || []
  };
  const targetsArr = targetsFromObject(cfg.scenario.targets);
  renderCompanyBarsScene(header, targetsArr);
}

function targetsFromObject(obj){
  if (!obj) return COMPANY_TARGETS.S1;
  return [
    obj.eigenanteil ?? obj.eigen ?? obj.a ?? 10,
    obj.datenreife ?? obj.b ?? 10,
    obj.zuverlaessigkeit ?? obj.c ?? 10,
    obj.schulung ?? obj.d ?? 10,
    obj.unabhaengigkeit ?? obj.e ?? 10,
    obj.buerokratie ?? obj.f ?? 10
  ];
}

function layoutCompanyBars(cardH=CARD_H_BASE, gapY=GRID_V_GAP, startYVal=null){
  if (!companyBars.length) return;
  const startY = (startYVal || companyBarsStartY || SAFE_TOP) + CARDS_EXTRA_TOP_PAD;
  const columnWidth = (width - 2*SIDE_PADDING - GUTTER_X) / COLS;
  const barHeight = Math.max(16, 24 - (cardH < CARD_H_BASE ? 1 : 0));
  companyBars.forEach((bar, idx)=>{
    const col = idx % COLS;
    const row = Math.floor(idx / COLS);
    const x = SIDE_PADDING + col*(columnWidth + GUTTER_X);
    const y = startY + row*(cardH + gapY);
    bar.setRect(x, y, columnWidth, cardH, barHeight);
  });
}

function buildCompanyBarsButtons(){
  clearButtons();
  const btnY = height - (BOTTOM_BAR_H/2) - (BTN_H/2);
  addBtn(40, btnY, 140, BTN_H, "Zurück", ()=> back());
  companyBarsBtnCheck = addBtn(width/2-90, btnY, 180, BTN_H, "Prüfen", ()=> companyBarsCheck());
  companyBarsBtnNext = addBtn(width-190, btnY, 170, BTN_H, "Weiter ▶", ()=>{
    if (!companyBarsNextEnabled) return;
    if (ROLE_ID_MAP[roleSel]==="max"){
      startMaxQuizScene();
    } else if (ROLE_ID_MAP[roleSel]==="maria"){
      startMariaQuizScene();
    } else if (ROLE_ID_MAP[roleSel]==="ahmed"){
      startAhmedQuizScene();
    } else if (ROLE_ID_MAP[roleSel]==="marcela"){
      startMarcelaQuizScene();
    } else if (ROLE_ID_MAP[roleSel]==="toni"){
      startToniQuizScene();
    } else {
      state = "company";
      buildCompanyButtons();
    }
  });
  updateCheckButtonState();
  if (companyBarsBtnNext) companyBarsBtnNext.setDisabled(!companyBarsNextEnabled);
}

function drawBottomBar(){
  push();
  noStroke();
  fill(20,21,25,230);
  rect(0, height-BOTTOM_BAR_H, width, BOTTOM_BAR_H);
  pop();
}

function drawHeaderClamped(headerCfg, baseH1=H1_SIZE_BASE, baseHints=HINTS_SIZE_BASE){
  let h1Size = baseH1;
  let hintsSize = baseHints;
  let measurement = null;
  while (true){
    measurement = renderHeaderMeasured(headerCfg, h1Size, hintsSize, false);
    if (measurement.height <= HEADER_MAX_HEIGHT || (h1Size<=H1_SIZE_MIN && hintsSize<=HINTS_SIZE_MIN)){
      break;
    }
    if (h1Size > H1_SIZE_MIN) h1Size--;
    else if (hintsSize > HINTS_SIZE_MIN) hintsSize--;
    else break;
  }
  measurement = renderHeaderMeasured(headerCfg, h1Size, hintsSize, true);
  return {
    startY: SAFE_TOP + measurement.height + START_Y_OFFSET_AFTER_HEADER,
    h1Size,
    hintsSize,
    headerHeight: measurement.height
  };
}

function renderHeaderMeasured(headerCfg, h1Size, hintsSize, draw){
  const header = headerCfg || getDefaultCompanyHeader();
  const x = SIDE_PADDING;
  let y = SAFE_TOP;
  let heightAcc = 0;
  push();
  textAlign(CENTER,TOP);

  textStyle(BOLD); textSize(h1Size);
  const titleX = width/2;
  if (draw){ fill(COL_TEXT); text(header.title, titleX, y); }
  const h1Height = textAscent();
  // Avatar rechts im Titel
  if (draw && roleSel===5){
    const avaX = width - SIDE_PADDING - HEAD_AVATAR_SIZE - HEAD_AVATAR_OFFSET_X;
    const avaY = y - 4;
    drawRoleAvatar(roleSel, avaX, avaY, HEAD_AVATAR_SIZE);
  }
  y += h1Height + GAP_AFTER_H1;

  textStyle(NORMAL); textSize(SCENARIO_SIZE); fill(COL_TEXT);
  if (header.scenario){
    if (draw) text(header.scenario, titleX, y);
    y += textAscent() + GAP_AFTER_SCENARIO;
  }

  textAlign(CENTER,TOP);
  textSize(INTRO_SIZE+1); fill(COL_TEXT); textStyle(BOLD);
  if (header.intro){
    if (draw) text(header.intro, width/2, y);
    y += textAscent() + GAP_AFTER_INTRO;
  }

  textAlign(LEFT,TOP);
  textStyle(NORMAL);
  if (header.hints && header.hints.length){
    const hintH = drawHintsWrapped(header.hints, x, y, width - 2*SIDE_PADDING, hintsSize, draw);
    y += hintH + GAP_AFTER_HINTS;
  }

  textAlign(CENTER,TOP); textStyle(BOLD); textSize(ESTIMATE_SIZE); fill(COL_TEXT);
  if (draw) text("Schätze die Werte für dein Unternehmen:", width/2, y);
  y += ESTIMATE_SIZE + GAP_AFTER_ESTIMATE;

  pop();
  heightAcc = y - SAFE_TOP;
  return {height: heightAcc};
}

function drawHintsWrapped(hints, x, y, maxWidth, fontSize=HINTS_SIZE_BASE, draw=true){
  if (!hints || !hints.length) return 0;
  const bullet = " \u2022 ";
  const joined = hints.join(bullet);
  textStyle(NORMAL); textSize(fontSize); textLeading(fontSize + HINTS_LEADING_EXTRA);
  const words = joined.split(" ");
  const lines = [""];
  for (const word of words){
    const cand = lines[lines.length-1] ? lines[lines.length-1] + " " + word : word;
    if (textWidth(cand) <= maxWidth){
      lines[lines.length-1] = cand;
    } else {
      lines.push(word);
      if (lines.length > 2) break;
    }
  }
  let finalLines = lines.slice(0,2);
  if (lines.length > 2){
    let second = finalLines[1] || "";
    const ellipsis = " \u2026";
    while (textWidth(second + ellipsis) > maxWidth && second.length){
      second = second.slice(0,-1).trim();
    }
    finalLines[1] = (second? second + ellipsis : "\u2026");
  } else if (finalLines.length === 2 && textWidth(finalLines[1]) > maxWidth){
    let second = finalLines[1];
    const ellipsis = " \u2026";
    while (textWidth(second + ellipsis) > maxWidth && second.length){
      second = second.slice(0,-1).trim();
    }
    finalLines[1] = (second? second + ellipsis : "\u2026");
  }
  const leading = fontSize + HINTS_LEADING_EXTRA;
  if (draw){
    fill(COL_HINTS); textAlign(CENTER,TOP);
    let yy = y;
    const textX = width/2;
    for (const line of finalLines){
      text(line.trim(), textX, yy);
      yy += leading;
      if (yy - y >= leading*2) break;
    }
  }
  return finalLines.length * leading;
}

function drawCompanyBarsScene(){
  background(COL_BG);
  const header = companyBarsHeader || getDefaultCompanyHeader();
  let headerRes = drawHeaderClamped(header, H1_SIZE_BASE, HINTS_SIZE_BASE);

  let cardH = CARD_H_BASE;
  let vGap = GRID_V_GAP;
  let h1Size = headerRes.h1Size;
  const hintsBase = headerRes.hintsSize; // stabil, nicht schrumpfen
  const adjustLayout = ()=>{
    const availH = height - headerRes.startY - (BOTTOM_BAR_H + SAFE_BOTTOM_PAD);
    let needH = 3*cardH + 2*vGap;
    while (needH > availH && (vGap>GRID_V_GAP_MIN || cardH>CARD_H_MIN)){
      if (vGap>GRID_V_GAP_MIN) vGap--;
      else if (cardH>CARD_H_MIN) cardH--;
      needH = 3*cardH + 2*vGap;
    }
    return {needH, availH};
  };

  let {needH, availH} = adjustLayout();
  while (needH > availH && h1Size > H1_SIZE_MIN){
    h1Size--;
    headerRes = drawHeaderClamped(header, h1Size, hintsBase);
    cardH = CARD_H_BASE;
    vGap = GRID_V_GAP;
    ({needH, availH} = adjustLayout());
  }
  if (needH > availH){
    vGap = GRID_V_GAP_MIN;
    cardH = Math.max(CARD_H_MIN, Math.floor((availH - 2*vGap)/3));
    if (cardH < CARD_H_MIN) cardH = CARD_H_MIN;
  }

  companyBarsStartY = headerRes.startY;
  layoutCompanyBars(cardH, vGap, headerRes.startY);
  let pointer=false;

  companyBars.forEach((bar,idx)=>{
    const active = (idx===companyBarsActiveIndex);
    bar.updateAnimation();
    bar.draw(active);
    if (!companyBarsLocked && bar.contains(mouseX,mouseY)) pointer=true;
  });

  drawBottomBar();
  updateCheckButtonState();

  cursor(pointer? 'pointer' : 'default');

  if (companyBarsLocked && !companyBarsNextEnabled){
    const done = companyBars.every(bar=> bar.isAtTarget());
    if (done){
      companyBarsNextEnabled = true;
      if (companyBarsBtnNext) companyBarsBtnNext.setDisabled(false);
    }
  }
}

function windowResized(){
  resizeCanvas(CANVAS_W, CANVAS_H);
  if (state==="companybars"){
    companyBarsStartY = SAFE_TOP;
    layoutCompanyBars();
  } else if (state==="max_quiz"){
    buildMaxQuizButtons();
  } else if (state==="maria_quiz"){
    buildMariaQuizButtons();
  } else if (state==="ahmed_quiz"){
    buildAhmedQuizButtons();
  } else if (state==="marcela_quiz"){
    buildMarcelaQuizButtons();
  } else if (state==="toni_quiz"){
    buildToniQuizButtons();
  }
}

function handleCompanyBarsMouseDown(mx,my){
  if (companyBarsLocked) return;
  for (let i=0;i<companyBars.length;i++){
    const bar = companyBars[i];
    if (bar.contains(mx,my)){
      companyBarsPressInfo = {index:i, start:millis(), x:mx, y:my, shift:keyIsDown(SHIFT)};
      return;
    }
  }
  companyBarsPressInfo = null;
}

function handleCompanyBarsMouseUp(mx,my){
  if (!companyBarsPressInfo || companyBarsLocked) { companyBarsPressInfo=null; return; }
  const info = companyBarsPressInfo;
  companyBarsPressInfo=null;
  const bar = companyBars[info.index];
  if (!bar) return;
  companyBarsActiveIndex = info.index;
  if (info.shift){
    bar.bumpGuess(-COMPANY_STEP);
    return;
  }
  const duration = millis() - info.start;
  if (duration > 350){
    bar.bumpGuess(-COMPANY_STEP);
    return;
  }
  if (bar.contains(mx,my)){
    bar.handlePrimaryClick(mx,my);
  }
  updateCheckButtonState();
}

function companyBarsCheck(){
  if (companyBarsLocked) return;
  const allTouched = companyBars.every(b=> b.touched);
  if (!allTouched) return;
  companyBarsLocked = true;
  companyBarsScore = 0;
  if (companyBarsBtnCheck) companyBarsBtnCheck.setDisabled(true);
  companyBars.forEach(bar=>{
    const ok = bar.evaluate(COMPANY_TOLERANCE);
    if (ok) companyBarsScore++;
  });
}

class BarControl{
  constructor({label,desc,isNegative,target}){
    this.label=label;
    this.desc=desc||"";
    this.isNegative=!!isNegative;
    this.target=target;
    this.guess=10;
    this.currentValue=10;
    this.status="idle";
    this.touched=false;
    this.rect={x:0,y:0,w:0,h:ROW_H};
    this.feedback=null;
    this.anim=null;
    this.barRect={x:0,y:0,w:0,h:20};
    this.captionY=0;
    this.labelLines=[];
    this.descLines=[];
    this.descOffsetX=0;
    this.labelWidth=0;
  }
  setRect(x,y,w,h,barH){
    this.rect={x,y,w,h};
    this.customBarH = barH || null;
    this.padY = 18;
    this.computeLayout();
  }
  computeLayout(){
    const pad=this.padY || 18;
    const innerW = this.rect.w - pad*2;
    textSize(17); textStyle(BOLD);
    const labelStr = `${this.label}`;
    const rawWidth = textWidth(labelStr);
    const minGap = 12;
    this.labelWidth = min(rawWidth, innerW*0.6);
    this.labelText = labelStr;
    const gap = 14;
    this.descOffsetX = this.labelWidth + gap + minGap;
    const firstLineRoom = max(innerW - this.descOffsetX, innerW*0.35);
    textStyle(NORMAL); textSize(13);
    this.descLines = this.wrapDescriptionLines(firstLineRoom, innerW);
    const extraDescHeight = this.descLines.length>1 ? (this.descLines.length-1)*18 : 0;
    const labelHeight = 22;
    const baseBarY = this.rect.y + pad + labelHeight + extraDescHeight + 12;
    const barHeight = this.customBarH || 24;
    const footerReserve = 36;
    const maxBarY = this.rect.y + this.rect.h - footerReserve - barHeight;
    const barY = Math.max(this.rect.y + pad + labelHeight, Math.min(baseBarY, maxBarY));
    this.barRect = {x:this.rect.x+pad, y:barY, w:innerW, h:barHeight};
    this.captionY = this.rect.y + this.rect.h - footerReserve + 6;
  }

  wrapDescriptionLines(firstWidth, fullWidth){
    const lines=[];
    const words=this.desc.split(" ");
    let current="";
    let limit=firstWidth;
    if (firstWidth<=0) limit=fullWidth;
    words.forEach(word=>{
      const test = current ? current+" "+word : word;
      if (textWidth(test) <= limit){
        current=test;
      } else {
        if (current) lines.push(current);
        current = word;
        limit = fullWidth;
      }
    });
    if (current) lines.push(current);
    if (!lines.length) return [];
    return lines;
  }
  contains(px,py){
    const r=this.rect;
    return px>=r.x && px<=r.x+r.w && py>=r.y && py<=r.y+r.h;
  }
  handlePrimaryClick(mx,my){
    const bar = this.barRect;
    const barHitPadding = 10;
    if (my>=bar.y - barHitPadding && my<=bar.y+bar.h + barHitPadding){
      const val = this.valueFromX(mx);
      this.setGuess(val);
    } else {
      const mid = this.rect.x + this.rect.w/2;
      this.bumpGuess(mx>=mid? COMPANY_STEP : -COMPANY_STEP);
    }
  }
  valueFromX(mx){
    const bar=this.barRect;
    const clamped = constrain(mx, bar.x, bar.x+bar.w);
    const pct = (clamped - bar.x)/bar.w;
    return Math.round((pct*100)/COMPANY_STEP)*COMPANY_STEP;
  }
  setGuess(val){
    if (companyBarsLocked) return;
    let snapped = Math.round(constrain(val,0,100)/COMPANY_STEP)*COMPANY_STEP;
    snapped = constrain(snapped,0,100);
    this.guess = snapped;
    this.currentValue = snapped;
    this.touched = true;
    updateCheckButtonState();
  }
  bumpGuess(delta){
    if (companyBarsLocked) return;
    let val = this.guess + delta;
    if (val>100) val=0;
    if (val<0) val=100;
    this.setGuess(val);
  }
  evaluate(tolerance){
    const diff = abs(this.guess - this.target);
    const ok = diff <= tolerance;
    this.feedback = {guess:this.guess, target:this.target, ok};
    this.status = ok? "animatingOk":"animatingFail";
    this.startAnimation(this.guess, this.target);
    return ok;
  }
  startAnimation(from,to){
    this.anim = {from,to,start:millis(),duration:750};
  }
  updateAnimation(){
    if (!this.anim) return;
    const elapsed = millis()-this.anim.start;
    const t = constrain(elapsed/this.anim.duration,0,1);
    const eased = 1 - pow(1-t,2);
    this.currentValue = lerp(this.anim.from, this.anim.to, eased);
    if (t>=1){
      this.anim=null;
      this.currentValue=this.target;
      this.guess = this.target;
      this.status = this.feedback.ok? "doneOk":"doneFail";
    }
  }
  isAtTarget(){ return this.status==="doneOk" || this.status==="doneFail"; }
  draw(isActive){
    const r=this.rect;
    const baseColor = this.isNegative? COL_BAR_NEG : COL_BAR;
    let borderColor = COL_CARD_BORDER;
    if (this.status.includes("Ok")) borderColor = COL_OK;
    if (this.status.includes("Fail")) borderColor = COL_FAIL;
    if (isActive && !this.status.startsWith("animating")) borderColor = color(130,160,255);
    push();
    fill(COL_CARD_BG); stroke(borderColor); strokeWeight(2);
    rect(r.x, r.y, r.w, r.h, CARD_RADIUS);
    stroke(255,255,255,20);
    line(r.x+2, r.y+2, r.x+r.w-2, r.y+2);
    noStroke();

    let y = r.y + 16;
    const labelX = r.x+16;
    fill(COL_TEXT); textAlign(LEFT,TOP); textSize(17); textStyle(BOLD);
    text(this.labelText, labelX, y);
    textStyle(NORMAL); textSize(13); fill(COL_TEXT_WEAK);
    if (this.descLines.length){
      const firstDescX = labelX + this.descOffsetX;
      text(this.descLines[0], firstDescX, y+2);
      let yy = y + 20;
      for (let i=1;i<this.descLines.length;i++){
        text(this.descLines[i], labelX, yy);
        yy += 18;
      }
      y = yy;
    } else {
      y += 22;
    }
    y += 6;

    const bar = this.barRect;
    fill('#111216'); rect(bar.x, bar.y, bar.w, bar.h, bar.h/2);
    stroke(255,255,255,15); strokeWeight(1);
    for (let i=1;i<10;i++){
      const sx = bar.x + bar.w/10 * i;
      line(sx, bar.y, sx, bar.y+bar.h);
    }
    noStroke();
    const fillW = bar.w * (this.currentValue/100);
    if (fillW>0){
      fill(baseColor);
      rect(bar.x, bar.y, fillW, bar.h, bar.h/2);
      fill(255,255,255,25);
      rect(bar.x + fillW - min(18,fillW), bar.y, min(18,fillW), bar.h, bar.h/2);
    }
    fill(COL_TEXT); textAlign(RIGHT,TOP); textSize(14);
    text(`${Math.round(this.currentValue)}`, bar.x+bar.w, bar.y - 18);

    if (this.feedback){
      const tipText = `Dein Tipp: ${this.feedback.guess} | Richtig: ${this.feedback.target}`;
      fill(COL_TEXT_WEAK); textAlign(LEFT,TOP); textSize(13);
      const lineH = 18;
      const capYMin = this.barRect.y + this.barRect.h + 6;
      const capYMax = r.y + r.h - lineH - 6;
      const capY = capYMin <= capYMax ? Math.min(Math.max(capYMin, this.captionY), capYMax) : capYMin;
      text(tipText, r.x+16, capY);
      const icon = this.feedback.ok? "✓" : "✗";
      fill(this.feedback.ok? COL_OK : COL_FAIL); textAlign(RIGHT,TOP); textSize(18);
      text(icon, r.x+r.w-16, r.y+10);
    }
    pop();
  }
}

function drawScenarioSection(label, items, x, y, w, type){
  const iconColor = type==="good"? color(120,200,140): color(230,110,110);
  const iconChar = type==="good"? "✓" : "✗";
  const iconBg = type==="good"? color(35,60,45): color(60,30,30);

  push();
  fill(iconBg); noStroke(); ellipse(x+10, y+10, 20,20);
  fill(iconColor); textAlign(CENTER,CENTER); textSize(12); text(iconChar, x+10, y+10);
  pop();

  fill(210); textAlign(LEFT,TOP); textSize(14); textStyle(BOLD);
  text(label, x+28, y);
  textStyle(NORMAL);
  y += 24;

  const indent = 28;
  const textWidthAvail = w - indent;
  for (const item of items){
    const lines = wrapLines(item, textWidthAvail, 14);
    fill(iconColor); textAlign(LEFT,TOP); textSize(13);
    text(iconChar, x+4, y+2);
    fill(210); textSize(13);
    text(lines[0], x+indent, y);
    let yy = y + 20;
    for (let i=1;i<lines.length;i++){
      text(lines[i], x+indent, yy);
      yy += 20;
    }
    y = yy;
  }
  return y;
}

/////////////////////////
// COMPANY (2030)      //
/////////////////////////

function initScenario(id){
  scenarioSel=id;
  persistSelectionToSession();
  initMetrics(getBaseMetrics(roleSel, id));
  areas = getAreasForRoleScenario(roleSel, id);
}

function drawCompany(x0,y0){
  const sc = firmFlashback[roleSel][scenarioSel];
  push();
  fill(240); textSize(22); textAlign(LEFT,TOP);
  text("Willkommen im Jahr 2030 – Deine Firma", x0, y0);
  drawParagraph("Rückblick 2025–2030: Das hat deine Organisation gemacht – kurz & klar:", x0, y0+32, 560, 15, 20, 210);
  let yy = y0+58;
  yy = drawBullets(sc, x0, yy, 560, 14, 20, 200);

  pop();

  areas.forEach(a=>{
    push();
    stroke(120); fill(36,39,50); rect(a.x,a.y,a.w,a.h,14);
    noStroke(); fill(240); textSize(16); textAlign(LEFT,TOP);
    text(a.title, a.x+12, a.y+12);
    drawParagraph(a.teaser, a.x+12, a.y+38, a.w-24, 14, 20, 200);
    if (a.viewed){ fill(58,134,255); textSize(12); text("gesehen", a.x+a.w-64, a.y+a.h-18); }
    pop();
  });
}

function buildCompanyButtons(){
  clearButtons();
  addBtn(SIDEBAR_W+28, height-64, 140, 40, "Zurück", ()=> back());
  addBtn(width-200, height-64, 180, 40, "Weiter ▶", ()=>{ go("role"); buildRoleButtons(); });
}

function modalRect(){ const w=780,h=420, x=width/2-w/2, y=height/2-h/2; return {x,y,w,h}; }

function openAreaModal(i){
  openedArea = i;
  clearButtons();
  const r = modalRect();
  addBtn(r.x+r.w-230, r.y+r.h-56, 100, 40, "Zurück", ()=>{
    openedArea=null; clearButtons(); buildCompanyButtons();
  });
  addBtn(r.x+r.w-120, r.y+r.h-56, 100, 40, "OK", ()=>{
    const a = areas[openedArea];
    if (!a.viewed){ a.viewed=true; applyDelta(a.delta); }
    openedArea=null; clearButtons(); buildCompanyButtons();
  });
}

function drawAreaModal(a){
  const r = modalRect();
  push();
  noStroke(); fill(0,0,0,150); rect(0,0,width,height);
  fill(36,39,50); stroke(120); rect(r.x,r.y,r.w,r.h,16);
  noStroke(); fill(240); textSize(20); textAlign(LEFT,TOP); text(a.title, r.x+16, r.y+14);
  let yy = r.y+48;
  yy = drawBullets(a.points, r.x+16, yy, r.w-32, 15, 22, 210) + 8;
  yy = drawParagraph("Auswirkung: "+a.impact, r.x+16, yy, r.w-32, 15, 22, 190);
  pop();
}

// Basiswerte pro Rolle & Szenario (Startwerte für Balken)
function getBaseMetrics(role, sc){
  const m = {
    1: { // Max
      1:{fit:60,rules:70,speed:65,wealth:60,comp:65},
      2:{fit:50,rules:56,speed:55,wealth:52,comp:50},
      3:{fit:70,rules:75,speed:70,wealth:66,comp:75}
    },
    2: { // Toni
      1:{fit:62,rules:68,speed:64,wealth:60,comp:62},
      2:{fit:54,rules:60,speed:56,wealth:56,comp:50},
      3:{fit:70,rules:72,speed:68,wealth:64,comp:70}
    },
    3: { // Ahmed
      1:{fit:62,rules:70,speed:60,wealth:56,comp:58},
      2:{fit:55,rules:55,speed:57,wealth:54,comp:52},
      3:{fit:72,rules:74,speed:68,wealth:60,comp:64}
    },
    4: { // Maria
      1:{fit:60,rules:72,speed:62,wealth:58,comp:62},
      2:{fit:58,rules:66,speed:54,wealth:56,comp:50},
      3:{fit:70,rules:76,speed:70,wealth:62,comp:68}
    },
    5: { // Marcela
      1:{fit:64,rules:68,speed:66,wealth:62,comp:66},
      2:{fit:56,rules:60,speed:60,wealth:58,comp:52},
      3:{fit:72,rules:72,speed:70,wealth:66,comp:72}
    }
  };
  return m[role][sc];
}

// Rückblick 2025–2030 pro Rolle & Szenario (kurz & klar)
const firmFlashback = {
  1: { // Max
    1:["Eigene KI-Teams aufgebaut.","Kamera+KI-Qualitätsprüfung eingeführt.","Vorlagen für Datenschutz/Fairness.","Standards & Schnittstellen verbessert."],
    2:["KI zugekauft; wenig Einblick.","Mehr Stichproben nach Updates.","Doku stark gewachsen; Schulung knapp.","Abhängigkeit vom Anbieter."],
    3:["Saubere eigene Daten; Standards.","Praxis-Workshops etabliert.","Rollouts schneller geworden.","Neue Services (Beratung/Training)."]
  },
  2: { // Toni
    1:["Eigene Matching-Tools mit hohen Ethik-Standards.","Team breit in KI geschult.","Monitoring/QA für KI eingeführt.","Mehr Kundennachfrage → Effizienzdruck."],
    2:["Nutzung externer Tools (Lizenzen).","Kurzworkshops der Anbieter.","Compliance-Team stärkt Regeln.","Qualität schwankt – manuelle Checks."],
    3:["Fokus: Chemie/Pharma Recruiting.","‚KI-Cockpit‘ mit Erklärungen eingeführt.","Fein-Training der Modelle im Haus.","Implementierung bei Kund*innen als neues Feld."]
  },
  3: { // Ahmed
    1:["Assistenzsysteme für Vitalwerte & Doku.","Teilnahme an Reallaboren.","Regelmäßige Schulungen & Ethik.","Integration hakt manchmal – Praxislösungen."],
    2:["Externe Anbieter, Servicehotline wichtig.","Einführung mit wenig Training.","Teils wieder Handschrift-Doku.","Individuelle Pflegepläne per KI."],
    3:["Spezielle Pflege-Modelle mit Forschung.","Feedback-Schleifen mit Pflegeteams.","Automatisierte Doku + Homeoffice-Überwachung.","Work-Life-Balance spürbar besser."]
  },
  4: { // Maria
    1:["Eigene Verwaltungs-Modelle aufgebaut.","Tandem-Verbund (Solar-Genehmigungen).","Barrierefreie Tools; Bugs einkalkuliert.","Reflexion & Prozessanpassung im Team."],
    2:["Interne Automatisierung stoppt wegen Datenschutz.","Online-Dienste ohne KI.","Maria wechselt in Non-Profit (Inklusion).","Start: datenschutzkonforme KI-Strategie."],
    3:["Bund/Länder/Kommunen entwickeln spezialisiert.","Viele Prozessdaten beschleunigen Entwicklung.","Ethik & Selbstregulierung verbindlich.","Mehr Remote-Arbeit & Neueinstellungen."]
  },
  5: { // Marcela
    1:["Eigene, ethische Text-Modelle entwickelt.","Regelmäßige Schulungen für Teams.","QA-Prozesse & Feedback-Schleifen.","Hybrid-Arbeit & moderne Tools (VR/AR)."],
    2:["Einkauf von GPT-X & MarketInsights AI.","Einführungsworkshops der Anbieter.","Starke Kontrolle der Ergebnisse nötig.","Workload steigt wegen Iterationen."],
    3:["Spezial-Modelle (Auto/Pharma/Maschinenbau).","Kooperationen mit Forschung & Datenräumen.","Nahtlose Schnittstellen zu Kundensystemen.","Neue Services (Energie/Umwelt) gestartet."]
  }
};

// Bereiche/Kacheln je Rolle & Szenario (5 Stück + Deltas)
function getAreasForRoleScenario(role, sc){
  const baseX = SIDEBAR_W+24, baseY = HEADER_H + 210;
  const W = (width - baseX - 48)/3, H = 140;
  const cells = [
    {x: baseX,           y: baseY,           w: W, h: H},
    {x: baseX + W + 24,  y: baseY,           w: W, h: H},
    {x: baseX + 2*(W+24),y: baseY,           w: W, h: H},
    {x: baseX,           y: baseY + H + 24,  w: W, h: H},
    {x: baseX + W + 24,  y: baseY + H + 24,  w: W, h: H},
  ];
  const src = areaContent[role][sc];
  return src.map((a,i)=> ({...a, ...cells[i], viewed:false}));
}

const areaContent = {
  1: { // Max
    1: [
      { title:"Qualität & Prüfung", teaser:"Kameras+KI prüfen Teile – du checkst Auffälligkeiten.",
        points:["Mehr automatische Prüfungen.","Du prüfst auffällige Fälle nach.","Mehr Bildschirm, weniger Handarbeit."],
        impact:"Tempo ↑, Qualität stabil, Vertrauen hoch.", delta:{fit:+3, rules:+1, speed:+3, wealth:+1, comp:+2} },
      { title:"Weiterbildung", teaser:"Viele, kurze Team-Trainings.",
        points:["Kurse zu KI-Grundlagen & Kameras.","Grenzen der KI erkennen.","Sicherer Umgang mit Technik."],
        impact:"Job-Fit ↑, Fehler ↓.", delta:{fit:+5} },
      { title:"Regeln & Doku", teaser:"Vorlagen + klare Leitplanken.",
        points:["Einfache Berichte zu Datenschutz/Fairness.","Erklärbar, warum ok/nicht ok.","Kontrollen planbar."],
        impact:"Regeln ↑, Vertrauen ↑.", delta:{rules:+4} },
      { title:"Team & Rollen", teaser:"Kurze Abstimmungen, klare Zuständigkeiten.",
        points:["Wer prüft? Wer verbessert?","Wissen teilen im Team.","Rollenklarheit senkt Stress."],
        impact:"Job-Fit ↑, Tempo stabil.", delta:{fit:+2, speed:+1} },
      { title:"Maschinen & Daten", teaser:"Eigene Daten + Standards.",
        points:["Seltene Fehler simulieren.","Schnittstellen genormt.","Weniger Bastellösungen."],
        impact:"Tempo ↑, Wettbewerb ↑.", delta:{speed:+2, comp:+3} }
    ],
    2: [
      { title:"Qualität & Prüfung", teaser:"Zugekaufte KI – öfter nachprüfen.",
        points:["Mehr Stichproben nötig.","Fehlalarme nach Updates möglich.","Beispiele an Anbieter schicken."],
        impact:"Tempo ↔/↓, Qualität schwankt.", delta:{rules:+1, speed:-2} },
      { title:"Weiterbildung", teaser:"Wenig Kurse – du fragst aktiv nach.",
        points:["Peer-Lernen wirkt viel.","Kleine Trainings reduzieren Fehler.","Unsicherheit sinkt durch Übung."],
        impact:"Job-Fit ↑, Abhängigkeit ↓.", delta:{fit:+4} },
      { title:"Regeln & Doku", teaser:"Papierkram hoch – aber wichtig.",
        points:["Checklisten geben Überblick.","Nicht dokumentiert = nicht passiert.","Saubere Arbeit spart Ärger."],
        impact:"Regeln ↑, Tempo leicht ↓.", delta:{rules:+3, speed:-1} },
      { title:"Team & Rollen", teaser:"Klar sagen, wer was prüft.",
        points:["Schicht-Meetings kurz notieren.","Fehlerbilder sammeln.","Support-Kontaktliste bereithalten."],
        impact:"Job-Fit ↑, Tempo ↔.", delta:{fit:+2} },
      { title:"Maschinen & Daten", teaser:"Black-Box – wenig Einblick.",
        points:["Gute Beispiele sammeln.","Workarounds nur regelkonform.","Langfristig: mehr eigenes Wissen."],
        impact:"Wettbewerb ↔/↓, Abhängigkeit hoch.", delta:{comp:-1} }
    ],
    3: [
      { title:"Qualität & Prüfung", teaser:"Sehr zuverlässig – Menschen prüfen mit.",
        points:["Feedback-Schleifen regelmäßig.","Händische Prüfung selten nötig.","Fehler werden schnell behoben."],
        impact:"Tempo ↑, Qualität ↑.", delta:{speed:+2, fit:+1} },
      { title:"Weiterbildung", teaser:"Workshops – praxisnah.",
        points:["Üben an echten Teilen.","Was kann KI, was nicht?","Sicherheit im Umgang."],
        impact:"Job-Fit ↑↑.", delta:{fit:+5} },
      { title:"Regeln & Doku", teaser:"Klare Leitlinien sind Vorteil.",
        points:["Transparenz als Verkaufsargument.","Doku schlank, aber stark.","Audit stressfrei."],
        impact:"Regeln ↑, Wettbewerb ↑.", delta:{rules:+3, comp:+1} },
      { title:"Team & Rollen", teaser:"Brückenbauer zwischen Werk & KI-Team.",
        points:["Praxiswissen fließt in Modelle.","Rollen klar, Zusammenarbeit eng.","Schulungen extern möglich."],
        impact:"Job-Fit ↑, Wohlstand ↑.", delta:{fit:+2, wealth:+2} },
      { title:"Maschinen & Daten", teaser:"Eigene, saubere Daten + Standards.",
        points:["Rollouts auf andere Standorte.","Wenig Schnittstellen-Chaos.","Neue Aufträge (Dienstleistung)."],
        impact:"Wettbewerb ↑, Wohlstand ↑.", delta:{comp:+3, wealth:+2} }
    ]
  },

  2: { // Toni – Personalberatung
    1: [
      { title:"Matching-Tools", teaser:"Eigene KI hilft beim Matching (Skills + Kultur).",
        points:["Profile ↔ Anforderungen automatisch abgleichen.","Interviews & Gutachten mit Gen-KI vorbereiten.","Ergebnisse immer plausi-checken."],
        impact:"Tempo ↑, Job-Fit ↑.", delta:{speed:+3, fit:+2} },
      { title:"Qualität & Monitoring", teaser:"KI wird überwacht.",
        points:["Monitoring-Dashboards nutzen.","Auffälligkeiten dokumentieren.","Mit Data-Team nachschärfen."],
        impact:"Regeln ↑.", delta:{rules:+3} },
      { title:"Weiterbildung", teaser:"Alle kennen Basics.",
        points:["Kurztrainings im Team.","Bias/ Fairness verstehen.","Best-Practice teilen."],
        impact:"Job-Fit ↑.", delta:{fit:+3} },
      { title:"Kund*innen & Markt", teaser:"Wettbewerb zieht an.",
        points:["Schnellere Abgabe gefordert.","Differenzierung über Ethik+Qualität.","Stressspitzen managen."],
        impact:"Wettbewerb ↑, Tempo ↑.", delta:{comp:+2, speed:+1} },
      { title:"Datenschutz", teaser:"Interne Tools mit hohem Standard.",
        points:["Nur nötige Daten nutzen.","Transparenz erklären.","Einwilligungen sauber verwalten."],
        impact:"Regeln ↑, Vertrauen ↑.", delta:{rules:+2} },
    ],
    2: [
      { title:"Externe Tools", teaser:"Lizenzen & Abhängigkeit.",
        points:["Tool-Updates im Blick behalten.","Fehler korrigieren & Feedback geben.","Alternativen evaluieren."],
        impact:"Wettbewerb ↔/↓.", delta:{comp:-1} },
      { title:"Sorgfalt & Kontrolle", teaser:"Qualität schwankt.",
        points:["Mehr manuelle Checks.","Zweitmeinung einholen.","Protokolle führen."],
        impact:"Regeln ↑.", delta:{rules:+2} },
      { title:"Weiterbildung light", teaser:"Workshops der Anbieter.",
        points:["Kernfunktionen sicher beherrschen.","Eigenes Glossar pflegen.","Grenzen der Tools kennen."],
        impact:"Job-Fit ↑.", delta:{fit:+2} },
      { title:"Workload", teaser:"Iterationen nehmen zu.",
        points:["Zeitpuffer einplanen.","Vorlagen für häufige Fälle.","Team-Rotation gegen Stress."],
        impact:"Tempo ↔, Job-Fit ↔.", delta:{} },
      { title:"Kund*innen", teaser:"Erwartungen steuern.",
        points:["Ergebnisse erklären (keine Magie).","Ethische Risiken benennen.","Datenschutz zusichern."],
        impact:"Regeln ↑.", delta:{rules:+1} }
    ],
    3: [
      { title:"Branchen-Fokus", teaser:"Chemie/Pharma – tiefe Expertise.",
        points:["‚KI-Cockpit‘ erklärt Entscheidungen.","Fein-Training der Modelle.","Schnittstellen zu Kundensystemen."],
        impact:"Tempo ↑, Wettbewerb ↑.", delta:{speed:+2, comp:+3} },
      { title:"Rolle im Team", teaser:"Letztentscheidung & Qualität.",
        points:["Grenzen der KI kennen.","Edge-Cases prüfen.","Feedback zurückspielen."],
        impact:"Job-Fit ↑.", delta:{fit:+3} },
      { title:"Implementierung", teaser:"Beim Rollout beraten.",
        points:["Onboarding für HR-Teams.","Checklisten & Ethik-Guides.","Erfolg messen."],
        impact:"Wohlstand ↑.", delta:{wealth:+2} },
      { title:"Datenschutz top", teaser:"Datenräume, hohe Standards.",
        points:["Transparenz berichten.","Zugriffe minimal halten.","Audit-fähig bleiben."],
        impact:"Regeln ↑.", delta:{rules:+2} },
      { title:"Markt", teaser:"Gute Reputation.",
        points:["Empfehlungen wachsen.","Internationale Nachfrage.","Neue Services möglich."],
        impact:"Wettbewerb ↑.", delta:{comp:+2} }
    ]
  },

  3: { // Ahmed – Pflege
    1: [
      { title:"Assistenzsysteme", teaser:"Vitalwerte/Doku automatisiert.",
        points:["Alarme überwachen.","Medipläne sicher abgleichen.","Mehr Zeit am Menschen."],
        impact:"Tempo ↑, Job-Fit ↑.", delta:{speed:+2, fit:+3} },
      { title:"Weiterbildung", teaser:"Regelmäßig üben.",
        points:["Workshops zu Tools & Ethik.","Praxisfälle nachstellen.","Sicherer Umgang mit Daten."],
        impact:"Regeln ↑, Job-Fit ↑.", delta:{rules:+2, fit:+2} },
      { title:"Integration", teaser:"Hakt manchmal.",
        points:["Workarounds im Team teilen.","Fehler melden & priorisieren.","Alt-Systeme nach und nach ablösen."],
        impact:"Wettbewerb ↑ leicht.", delta:{comp:+1} },
      { title:"Dokumentation", teaser:"Vorlagen & Auto-Felder.",
        points:["Nur prüfen & ergänzen.","Klare Verantwortung.","Zeit sparen ohne Lücken."],
        impact:"Tempo ↑.", delta:{speed:+1} },
      { title:"Ethik & Würde", teaser:"Immer im Blick.",
        points:["KI hilft – entscheidet nicht allein.","Angehörige informieren.","Transparenz schaffen."],
        impact:"Regeln ↑.", delta:{rules:+1} }
    ],
    2: [
      { title:"Externe Anbieter", teaser:"Hotline statt In-House-Team.",
        points:["Störungen melden, lokal überbrücken.","Dokumentation notfalls manuell.","Fehlerbilder sammeln."],
        impact:"Tempo ↔, Wettbewerb ↔/↓.", delta:{comp:-1} },
      { title:"Individuelle Pläne", teaser:"KI-Vorschläge helfen.",
        points:["Sinn prüfen, anpassen.","Besonderheiten ergänzen.","Team-Absprachen sichern."],
        impact:"Job-Fit ↑.", delta:{fit:+2} },
      { title:"Weiterbildung privat", teaser:"Eigeninitiative zahlt sich aus.",
        points:["Online-Kurse nutzen.","Wissen teilen → Rolle wachsen.","Führung wird aufmerksam."],
        impact:"Job-Fit ↑.", delta:{fit:+2} },
      { title:"Datenschutz", teaser:"Unsicherheiten klären.",
        points:["Nur nötige Daten eingeben.","Zugriffe dokumentieren.","Rückfragen an Datenschutz."],
        impact:"Regeln ↑.", delta:{rules:+1} },
      { title:"Dokumentation", teaser:"Mehr Aufwand.",
        points:["Zeitfenster einplanen.","Checklisten nutzen.","Priorität Bewohner*innen."],
        impact:"Tempo ↔/↓.", delta:{speed:-1} }
    ],
    3: [
      { title:"Spezial-Modelle", teaser:"Sehr zuverlässig.",
        points:["Frühwarnungen ernst nehmen.","Personalisierte Pläne automatisch.","Händische Prüfung selten."],
        impact:"Tempo ↑, Qualität ↑.", delta:{speed:+3, fit:+2} },
      { title:"Homeoffice-Doku", teaser:"Überwachung aus der Ferne.",
        points:["Schichten fair verteilen.","Schnittstellen kennen.","Zeitgewinn für Betreuung."],
        impact:"Work-Life ↑, Wohlstand ↑.", delta:{wealth:+2} },
      { title:"Feedback-Team", teaser:"Pflege + KI-Expert*innen.",
        points:["Regelmäßige Schleifen.","Grenzfälle einspeisen.","Standard verbessern."],
        impact:"Regeln ↑, Wettbewerb ↑.", delta:{rules:+2, comp:+2} },
      { title:"Weiterbildung", teaser:"Laufend und bezahlt.",
        points:["Ethik/ Recht/ Praxis.","Trainings mit realen Fällen.","Sicherer Umgang mit Tech."],
        impact:"Job-Fit ↑.", delta:{fit:+3} },
      { title:"Gesellschaft", teaser:"Wertschätzung steigt.",
        points:["Besseres Image des Berufs.","Mehr Bewerbungen.","Stabile Teams."],
        impact:"Wettbewerb ↑.", delta:{comp:+1} }
    ]
  },

  4: { // Maria – Verwaltung
    1: [
      { title:"Eigene Modelle", teaser:"Anträge schneller & barrierefrei.",
        points:["Spezial: Solar-Genehmigungen.","Bugs melden, Workarounds kennen.","Transparente Entscheidungen."],
        impact:"Tempo ↑, Regeln ↑.", delta:{speed:+2, rules:+3, fit:+2} },
      { title:"Zusammenarbeit", teaser:"Tandem-Verbund.",
        points:["Austausch zwischen Ämtern.","Praxisbedarf definiert die Features.","Bürger*innen-Nutzen im Blick."],
        impact:"Wettbewerb ↑.", delta:{comp:+2} },
      { title:"Weiterbildung", teaser:"Praxisübungen regelmäßig.",
        points:["Barrierefreiheit & Datenschutz.","Neue Workflows trainieren.","Stress sinkt durch Klarheit."],
        impact:"Job-Fit ↑.", delta:{fit:+2} },
      { title:"Service", teaser:"Bessere Auskunft, weniger Wartezeit.",
        points:["Stand der Anträge sichtbar.","Standardtexte mit KI.","Sonderfälle manuell."],
        impact:"Wohlstand ↑ leicht.", delta:{wealth:+1} },
      { title:"Dokumentation", teaser:"Nachvollziehbar & fair.",
        points:["Checklisten & Vorlagen.","Entscheidungen kurz begründen.","Audit-fähig."],
        impact:"Regeln ↑.", delta:{rules:+1} }
    ],
    2: [
      { title:"Status quo", teaser:"Interne Automatisierung stoppt.",
        points:["Online-Dienste ohne KI.","Wichtige Daten ungenutzt.","Tempo bleibt niedrig."],
        impact:"Wettbewerb ↓.", delta:{comp:-2} },
      { title:"Wechsel", teaser:"Neue Rolle im Non-Profit.",
        points:["Inklusion + Digitalisierung.","KI datenschutzkonform denken.","Netzwerke aufbauen."],
        impact:"Job-Fit ↑, Wohlstand ↔/↓.", delta:{fit:+3, wealth:-1} },
      { title:"Regeln", teaser:"Datenschutz richtig erklären.",
        points:["Zwecke klar beschreiben.","Einwilligungen sauber.","Transparenz als Stärke."],
        impact:"Regeln ↑.", delta:{rules:+2} },
      { title:"Prozesse", teaser:"Einfach anfangen.",
        points:["Papier in digitale Schritte brechen.","Lessons Learned dokumentieren.","Schulungen für Teams."],
        impact:"Tempo ↔/↑ leicht.", delta:{speed:+1} },
      { title:"Bürgernähe", teaser:"Hilfe wird besser.",
        points:["Barrierearme Angebote.","Sprechzeiten planen.","Feedback einholen."],
        impact:"Wettbewerb ↔.", delta:{} }
    ],
    3: [
      { title:"Spezialisierte Modelle", teaser:"Verwaltung automatisiert viel.",
        points:["Ebene-spezifische Tools.","Prozessdaten beschleunigen.","Ethik & Selbstregulierung."],
        impact:"Tempo ↑, Regeln ↑.", delta:{speed:+3, rules:+3} },
      { title:"Team & Klima", teaser:"Besseres Miteinander.",
        points:["Fragen werden ernst genommen.","Wissenstransfer mit KI-Teams.","Neueinstellungen entlasten."],
        impact:"Job-Fit ↑.", delta:{fit:+3} },
      { title:"Remote-Arbeit", teaser:"Planbare Sprechzeiten.",
        points:["Online + analog kombinieren.","Barrieren sinken.","Zufriedenheit steigt."],
        impact:"Wohlstand ↑.", delta:{wealth:+2} },
      { title:"Bürger*innen-Service", teaser:"Schneller & transparenter.",
        points:["Status live sichtbar.","Standardtexte unterstützend.","Sonderfälle hochwertig."],
        impact:"Wettbewerb ↑.", delta:{comp:+2} },
      { title:"Dokumentation", teaser:"Stark & schlank.",
        points:["Vorlagen, klare Begründungen.","Audit-fähig.","Weniger Fehler."],
        impact:"Regeln ↑.", delta:{rules:+1} }
    ]
  },

  5: { // Marcela – Werbetexterin
    1: [
      { title:"Eigene Text-Modelle", teaser:"Stile & Tonalitäten steuerbar.",
        points:["Stichworte rein → Vorschläge raus.","Qualität mit Regeln prüfen.","Kreativ bleiben, KI hilft."],
        impact:"Tempo ↑, Wettbewerb ↑.", delta:{speed:+3, comp:+2, fit:+2} },
      { title:"Daten & Analyse", teaser:"Zielgruppen besser verstehen.",
        points:["Demografie & Verhalten auswerten.","Personalisierte Botschaften.","Erfolg messen."],
        impact:"Wohlstand ↑.", delta:{wealth:+2} },
      { title:"Weiterbildung", teaser:"Regelmäßige Übungen.",
        points:["Ethik & Urheberrecht.","Prompt-Techniken üben.","Team-Reviews."],
        impact:"Regeln ↑, Job-Fit ↑.", delta:{rules:+2, fit:+1} },
      { title:"QA & Feedback", teaser:"Automatisierte Schleifen.",
        points:["Punktuelle Fehler abfangen.","Style-Guides bewahren.","Freigaben dokumentieren."],
        impact:"Regeln ↑.", delta:{rules:+1} },
      { title:"Arbeitsform", teaser:"Hybrid, modern.",
        points:["VR/AR-Formate testen.","Sprints planen.","Fokuszeiten schützen."],
        impact:"Tempo ↑.", delta:{speed:+1} }
    ],
    2: [
      { title:"Einkaufstools", teaser:"GPT-X & MarketInsights AI.",
        points:["Schnell startklar, aber Lizenzen.","Iterationen einplanen.","Updates beachten."],
        impact:"Tempo ↑, Wettbewerb ↔/↓.", delta:{speed:+2, comp:-1} },
      { title:"Qualität prüfen", teaser:"Ergebnisse schwanken.",
        points:["Mehrfach prüfen & vergleichen.","Haus-Style beachten.","Fehler-Liste pflegen."],
        impact:"Regeln ↑.", delta:{rules:+1} },
      { title:"Workload", teaser:"Mehr Aufgaben parallel.",
        points:["Checklisten & Vorlagen nutzen.","Zeitblöcke für Fokus.","Team-Handover klar."],
        impact:"Job-Fit ↔/↑ leicht.", delta:{fit:+1} },
      { title:"Datenquellen", teaser:"Kundendaten sicher nutzen.",
        points:["Freigaben klären.","Nur nötige Daten ziehen.","Transparenz beim Einsatz."],
        impact:"Regeln ↑.", delta:{rules:+1} },
      { title:"Kund*innen", teaser:"Erwartungen managen.",
        points:["Erklärbar statt Magie.","Messbare Ziele.","Ethische Risiken nennen."],
        impact:"Wettbewerb ↔.", delta:{} }
    ],
    3: [
      { title:"Spezialisierung", teaser:"Auto/Pharma/Maschinenbau.",
        points:["Modelle auf Branchendaten.","Extrem zuverlässige Qualität.","Schnittstellen nahtlos."],
        impact:"Wettbewerb ↑, Tempo ↑.", delta:{comp:+3, speed:+3} },
      { title:"Rolle", teaser:"Kreativ + System-Verständnis.",
        points:["Prompt-Engineering pro Kunde.","Edge-Cases testen.","Wissen teilen."],
        impact:"Job-Fit ↑.", delta:{fit:+3} },
      { title:"Neue Dienste", teaser:"Energie & Umwelt.",
        points:["Text + Beratung kombinieren.","Ethische Leitlinien zeigen.","Transparenz als USP."],
        impact:"Wohlstand ↑.", delta:{wealth:+3} },
      { title:"Weiterbildung", teaser:"Ethik/Urheberrecht/Transparenz.",
        points:["Standards einhalten.","Freigaben dokumentieren.","Kund*innen schulen."],
        impact:"Regeln ↑.", delta:{rules:+2} },
      { title:"Teamkultur", teaser:"Interdisziplinär & motiviert.",
        points:["Respekt & Pioniergeist.","Retrospektiven halten.","Erfolge feiern."],
        impact:"Job-Fit ↑.", delta:{fit:+2} }
    ]
  }
};

/////////////////////////
// ROLE (Vorschläge)   //
/////////////////////////

const roleSuggestions = {
  1: { // Max
    1:{ do:["KI-Prüfungen überwachen, Auffälligkeiten melden.","Vorlagen für faire/klare Doku nutzen.","Kurztrainings im Team leiten."],
        skills:["Kamera & KI grob verstehen.","Checkliste: Fehlerprüfung.","Ruhig & klar kommunizieren."] },
    2:{ do:["Stichproben erhöhen, wenn Qualität schwankt.","Beispiele sammeln & an Anbieter geben.","Kleine Schulungen einfordern."],
        skills:["Fehlerbilder erkennen.","Daten-Doku sauber führen.","Wissen im Team teilen."] },
    3:{ do:["Regelmäßig Feedback ans KI-Team geben.","Kolleg*innen praxisnah schulen.","Rollouts unterstützen."],
        skills:["Workshop-Basics: zeigen & üben.","Standards grob verstehen.","Englisch für Kunden."] }
  },
  2: { // Toni
    1:{ do:["‚KI-Cockpit‘ nutzen, Entscheidungen erklären.","Matching-Regeln mit Team schärfen.","Monitoring-Hinweise schnell bearbeiten."],
        skills:["Bias/Fairness Basics.","Prompt-Vorlagen für Gutachten.","Datenschutz praktisch."] },
    2:{ do:["Eigencheck vor Abgabe.","Grenzen der Tools offen sagen.","Kund*innen realistische Erwartungen geben."],
        skills:["Qualitätskriterien definieren.","Checklisten pflegen.","Kurzschulungen moderieren."] },
    3:{ do:["Fein-Training vorbereiten.","Implementierung beim Kunden begleiten.","Wissen in Guides gießen."],
        skills:["Branchensprache lernen.","Explainability kurz erklären.","Onboarding planen."] }
  },
  3: { // Ahmed
    1:{ do:["Alarme sicher handhaben.","Zeitersparnis in Betreuung stecken.","Fehler/Integration melden."],
        skills:["Tool-Bedienung sicher.","Ethik im Alltag.","Datenschutz in der Pflege."] },
    2:{ do:["Bei Störungen ruhig bleiben.","Manuelle Doku ordentlich.","Eigenständig weiterbilden."],
        skills:["Checklisten nutzen.","Kurzfeedback ans Team.","Rechtliche Basics."] },
    3:{ do:["Homeoffice-Doku fair teilen.","Feedback-Runden ernst nehmen.","Neue Kolleg*innen anlernen."],
        skills:["Schulungsabläufe.","Technik+Pflege verbinden.","Kommunikation mit Angehörigen."] }
  },
  4: { // Maria
    1:{ do:["Solar-Workflows testen & verbessern.","Barrierefreie Texte prüfen.","Bugs strukturiert melden."],
        skills:["Ethik/Transparenz in Verwaltung.","Barrierefreiheit praktisch.","Datenminimierung."] },
    2:{ do:["NPO-Prozesse digitalisieren.","KI-Strategie mit Datenschutz denken.","Inklusion sichtbar machen."],
        skills:["DSGVO-Checklisten.","Change-Kommunikation.","Schulung on the job."] },
    3:{ do:["Neue Kolleg*innen onboarden.","Sprechzeiten planen (online/analog).","Qualitätsstandards pflegen."],
        skills:["Tool-Bedienung tief.","Prozesskarten zeichnen.","Team-Feedback moderieren."] }
  },
  5: { // Marcela
    1:{ do:["KI-Vorschläge kreativ finetunen.","Zielgruppen-Daten richtig lesen.","QA-Regeln einhalten."],
        skills:["Prompt-Techniken.","Style-Guide schärfen.","Ethik & Urheberrecht."] },
    2:{ do:["Mehrfach prüfen, Iterationen planen.","Realistische Zusagen machen.","Lessons-Learned sammeln."],
        skills:["Vergleichs-Checkliste.","Zeitmanagement.","Kundenbriefing strukturieren."] },
    3:{ do:["Branchen-Prompts vorbereiten.","Neue Services testen.","Team-Wissen dokumentieren."],
        skills:["Explainability kurz.","Datenräume verstehen.","Kundenschnittstellen."] }
  }
};

function drawRole(x0,y0){
  const sug = roleSuggestions[roleSel][scenarioSel];
  push();
  fill(240); textSize(22); textAlign(LEFT,TOP);
  text("Deine Tätigkeit – was ist jetzt anders?", x0, y0);
  drawParagraph("Schau dir die Vorschläge an. Danach folgt ein Mini-Quiz.", x0, y0+32, 680, 15, 20, 210);
  drawPanel(x0, y0+64, 360, 196, "Was du jetzt tust", sug.do);
  drawPanel(x0+380, y0+64, 360, 196, "Wie du dich fit hältst", sug.skills);
  pop();
}

function buildRoleButtons(){
  clearButtons();
  addBtn(SIDEBAR_W+28, height-64, 120, 40, "Zurück", ()=> back());
  addBtn(width-220, height-64, 190, 40, "Zum Quiz ▶", ()=>{
    if (roleSel===ROLE_KEY_TO_SEL.maria || ROLE_ID_MAP[roleSel]==="maria"){ go("macro"); buildMacroButtons(); }
    else { go("quiz"); buildQuizButtons(); }
  });
}

function drawPanel(x,y,w,h,title,lines){
  push(); stroke(120); fill(36,39,50); rect(x,y,w,h,14);
  noStroke(); fill(240); textSize(18); textAlign(LEFT,TOP); text(title, x+12, y+10);
  drawBullets(lines, x+12, y+44, w-24, 14, 22, 210);
  pop();
}

/////////////////////////
// QUIZ                //
/////////////////////////

const quizDecks = {
  1: { // Max
    1: [
      { q:"Warum helfen Team-Trainings in der Fertigung?", a:["Alle verstehen die Systeme besser.","Sie kosten keine Zeit.","Dann braucht man nie Regeln."], correct:0, why:"Verständnis = sichere Anwendung.", delta:{fit:+2} },
      { q:"Warum fair dokumentieren?",    a:["Nachvollziehbar & vertrauenswürdig.","Nur weil es hübsch ist.","Damit niemand nachfragt."], correct:0, why:"Transparenz ist wichtig.", delta:{rules:+2} },
      { q:"Warum weiter überwachen?",     a:["Schnell ≠ fehlerfrei.","Weil Maschinen müde sind.","Weil das Gesetz immer Stop sagt."], correct:0, why:"Fehler früh finden.", delta:{speed:+1} }
    ],
    2: [
      { q:"Hauptrisiko beim Kauf externer KI?", a:["Abhängigkeit vom Anbieter.","Zu viele eigene Ideen.","Zu wenig Papierkram."], correct:0, why:"Ihr hängt an fremden Updates.", delta:{fit:+1} },
      { q:"Bei Qualitätsproblemen…",   a:["Mehr Stichproben.","Ignorieren.","Zufall entscheiden lassen."], correct:0, why:"Fehler früher finden.", delta:{rules:+1} },
      { q:"Warum Schulungen fordern?", a:["Job-Fit steigt.","Nur fürs Zertifikat.","Weil es trendy ist."], correct:0, why:"Sicherer Umgang.", delta:{fit:+2} }
    ],
    3: [
      { q:"Typisch im Hidden-Champion-Szenario?", a:["Spezielle KI + Menschen prüfen mit.","Nur Black-Box kaufen.","Regeln egal."], correct:0, why:"So bleibt Qualität hoch.", delta:{rules:+1} },
      { q:"Standards sind gut…",a:["…weil übertragbar.","…nur schöner.","…macht Kaffee."], correct:0, why:"Rollouts schneller.", delta:{speed:+1, comp:+1} },
      { q:"Workshops helfen, weil…", a:["…Praxis lernen.","…PowerPoint sammeln.","…jemand es sagt."], correct:0, why:"Üben senkt Fehler.", delta:{fit:+2} }
    ]
  },

  2: { // Toni
    1: [
      { q:"Was ist das ‚KI-Cockpit‘?", a:["Anzeige, wie eine Empfehlung zustande kam.","Ein Raum mit vielen PCs.","Ein Turbo-Button."], correct:0, why:"Erklärbarkeit schafft Vertrauen.", delta:{rules:+2} },
      { q:"Wozu Monitoring?", a:["Auffälligkeiten früh sehen.","Weil es modern ist.","Damit man weniger spricht."], correct:0, why:"Qualität sichern.", delta:{fit:+1} },
      { q:"Warum Ethik-Guides?", a:["Fair & nachvollziehbar bleiben.","Nur fürs Marketing.","Sonst wäre es langweilig."], correct:0, why:"Gute Standards helfen allen.", delta:{rules:+1} }
    ],
    2: [
      { q:"Problem bei Lizenzen?", a:["Abhängigkeit & Kosten.","Zu kleine Buttons.","Zu viele Farben."], correct:0, why:"Freiheit sinkt, daher prüfen.", delta:{comp:-0} },
      { q:"Wie mit schwankender Qualität umgehen?", a:["Eigencheck + Protokoll.","Blind vertrauen.","Zeit sparen und abgeben."], correct:0, why:"Verlässlichkeit zeigen.", delta:{rules:+1} },
      { q:"Warum Erwartungen steuern?", a:["Ergebnisse erklären, kein Zauber.","Weil man muss.","Damit es länger dauert."], correct:0, why:"Transparenz schützt alle.", delta:{fit:+1} }
    ],
    3: [
      { q:"Was bringt Spezialisierung?", a:["Bessere Qualität & schnellere Rollouts.","Nur neue Logos.","Weniger Lernen."], correct:0, why:"Tiefe Daten → verlässlich.", delta:{comp:+1} },
      { q:"Rolle der Letztentscheidung?", a:["Mensch prüft & verantwortet.","KI entscheidet immer.","Zufall wählt."], correct:0, why:"Verantwortung bleibt klar.", delta:{rules:+1} },
      { q:"Warum Implementierung mitbetreuen?", a:["Erfolg bei Kund*innen sichern.","Weil Reisen Spaß macht.","Man hat sonst nichts zu tun."], correct:0, why:"Wert entsteht in der Nutzung.", delta:{fit:+1} }
    ]
  },

  3: { // Ahmed
    1: [
      { q:"Warum helfen Assistenzsysteme?", a:["Mehr Zeit für Menschen.","Sie ersetzen Pflegekräfte.","Sie sind nett anzusehen."], correct:0, why:"Routine wird leichter.", delta:{speed:+1} },
      { q:"Wichtig beim Alarm?", a:["Ruhig prüfen & handeln.","Ignorieren.","Immer Angehörige anrufen."], correct:0, why:"Sicherheit zuerst.", delta:{rules:+1} },
      { q:"Warum Weiterbildung?", a:["Sicher & würdevoll pflegen.","Nur für Zertifikate.","Weil Chef es sagt."], correct:0, why:"Kompetenz schützt.", delta:{fit:+2} }
    ],
    2: [
      { q:"Hotline hängt – was tun?", a:["Manuelle Doku + melden.","Nichts tun.","Alles löschen."], correct:0, why:"Versorgung geht vor.", delta:{rules:+1} },
      { q:"Wieso Eigenlernen?", a:["Karrierechance & Sicherheit.","Weil langweilig.","Unnötig."], correct:0, why:"Wissen hilft allen.", delta:{fit:+1} },
      { q:"Datenschutz heißt…", a:["Nur nötige Daten & sauberer Zugriff.","Gar keine Daten.","Alles öffentlich."], correct:0, why:"Respekt & Recht.", delta:{rules:+1} }
    ],
    3: [
      { q:"Homeoffice-Doku bringt…", a:["Bessere Work-Life-Balance.","Mehr Papier.","Weniger Sicherheit."], correct:0, why:"Zeitgewinn richtig nutzen.", delta:{wealth:+1} },
      { q:"Feedback-Runden wofür?", a:["Systeme verbessern.","Smalltalk.","Urlaub planen."], correct:0, why:"Qualität ↑.", delta:{fit:+1} },
      { q:"Frühwarnung der KI…", a:["…immer ernst nehmen.","…ignorieren.","…posten."], correct:0, why:"Sicherheit ↑.", delta:{rules:+1} }
    ]
  },

  4: { // Maria
    1: [
      { q:"Warum eigene Verwaltungs-Modelle?", a:["Schneller & barrierefrei.","Nur modisch.","Teurer = besser."], correct:0, why:"Nutzen für Bürger*innen.", delta:{speed:+1} },
      { q:"Wozu transparente Begründungen?", a:["Nachvollziehbar & fair.","Weil schöner.","Überflüssig."], correct:0, why:"Rechtsstaat!", delta:{rules:+2} },
      { q:"Bugs – was tun?", a:["Melden & workarounden.","Ignorieren.","Alles stoppen."], correct:0, why:"Pragmatisch sein.", delta:{fit:+1} }
    ],
    2: [
      { q:"Warum wechselt Maria?", a:["KI sinnvoll & inklusiv nutzen.","Mehr Urlaub.","Weil es Trend ist."], correct:0, why:"Sinn & Wirkung.", delta:{fit:+1} },
      { q:"DSGVO praktisch heißt…", a:["Zweck, Einwilligung, Transparenz.","Alles speichern.","Nie Daten nutzen."], correct:0, why:"Richtig + nützlich.", delta:{rules:+2} },
      { q:"Kleiner Start in NPO?", a:["Schritt für Schritt digitalisieren.","Mega-Projekt sofort.","Nichts ändern."], correct:0, why:"Erfolgsaussicht ↑.", delta:{speed:+1} }
    ],
    3: [
      { q:"Warum mehr Einstellungen?", a:["Job attraktiver.","Nur Statistik.","Weil KI ersetzt."], correct:0, why:"Bessere Bedingungen.", delta:{comp:+1} },
      { q:"Sprechzeiten planen heißt…", a:["Online & analog sinnvoll mischen.","Nur digital.","Nur Papier."], correct:0, why:"Bürgernähe ↑.", delta:{fit:+1} },
      { q:"Dokumentation soll…", a:["…stark & schlank sein.","…super lang sein.","…nicht existieren."], correct:0, why:"Qualität sichern.", delta:{rules:+1} }
    ]
  },

  5: { // Marcela
    1: [
      { q:"Warum eigene Text-Modelle?", a:["Qualität steuerbar.","Nur teuer.","Nutzlos."], correct:0, why:"Stil & Ton passen.", delta:{comp:+1} },
      { q:"Datenanalyse bringt…", a:["Bessere Personalisierung.","Längere Meetings.","Mehr PDFs."], correct:0, why:"Wirksamkeit ↑.", delta:{speed:+1} },
      { q:"Ethik wichtig, weil…", a:["Vertrauen & Recht.","Nur Marketing.","Zeitverschwendung."], correct:0, why:"Langfristig klug.", delta:{rules:+2} }
    ],
    2: [
      { q:"Was tun bei schwankender Qualität?", a:["Mehrfach prüfen.","Blind posten.","Alles ablehnen."], correct:0, why:"Verlässlichkeit.", delta:{rules:+1} },
      { q:"Lizenz-Tools bedeuten…", a:["Kosten & Abhängigkeit.","Freiheit pur.","Keine Updates."], correct:0, why:"Planung nötig.", delta:{} },
      { q:"Warum Style-Guide?", a:["Einheitliche Marke.","Nur Deko.","Mehr Text."], correct:0, why:"Qualität ↑.", delta:{fit:+1} }
    ],
    3: [
      { q:"Spezialisierung bringt…", a:["Wettbewerbsvorteil.","Nur Einengung.","Mehr Chaos."], correct:0, why:"Tiefe schlägt Breite.", delta:{comp:+1} },
      { q:"Neue Dienste testen heißt…", a:["Messbar starten.","Alles auf einmal.","Kein Feedback."], correct:0, why:"Lernen schnell.", delta:{fit:+1} },
      { q:"Explainability hilft…", a:["Kund*innen verstehen Entscheidungen.","Bei Farben wählen.","Gar nicht."], correct:0, why:"Transparenz ↑.", delta:{rules:+1} }
    ]
  }
};

function drawQuiz(x0,y0){
  const item = quiz.items[quiz.i];
  push(); fill(240); textAlign(LEFT,TOP); textSize(22);
  text("Quiz – Frage "+(quiz.i+1)+" / "+quiz.items.length, x0, y0);
  drawParagraph(item.q, x0, y0+38, width - (SIDEBAR_W+60), 18, 22, 220);
  let ay = y0+96;
  for (let i=0;i<item.a.length;i++){
    drawParagraph((i+1)+") "+item.a[i], x0+20, ay, width - (SIDEBAR_W+80), 15, 22, 200);
    ay += 30;
  }
  if (quiz.feedback) drawToast(quiz.feedback + "  (Punkte: " + quiz.score + ")");
  pop();
}

function buildQuizButtons(){
  quiz = {items: JSON.parse(JSON.stringify(quizDecks[roleSel][scenarioSel])), i:0, score:0, feedback:null};
  clearButtons();
  addBtn(SIDEBAR_W+28, height-110, 120, 36, "Zurück", ()=> back());
  const bx = SIDEBAR_W + 28, by = height - 64, bw = 150, bh = 38, gap = 20;
  addBtn(bx,              by, bw, bh, "Antwort 1", ()=> pickAnswer(0));
  addBtn(bx + bw + gap,   by, bw, bh, "Antwort 2", ()=> pickAnswer(1));
  addBtn(bx + 2*(bw+gap), by, bw, bh, "Antwort 3", ()=> pickAnswer(2));
}

function pickAnswer(idx){
  const item = quiz.items[quiz.i];
  const ok = (idx===item.correct);
  if (ok){ quiz.score++; applyDelta(item.delta||{}); }
  quiz.feedback = (ok? "Richtig! " : "Nicht ganz. ") + item.why;
  setTimeout(()=>{
    quiz.i++; quiz.feedback=null;
    if (quiz.i>=quiz.items.length){ go("macro"); buildMacroButtons(); }
  }, 1100);
}

function drawToast(msg){
  push(); const tw=600, th=64; translate(width/2-tw/2, HEADER_H+220);
  noStroke(); fill(20,160); rect(0,0,tw,th,10);
  fill(255); textAlign(CENTER,CENTER); textSize(14);
  text(msg, tw/2, th/2, tw-20, th-10); pop();
}

/////////////////////////
// MACRO (Deutschland) //
/////////////////////////

const macroBullets = {
  1: {
    intro: "So ist jetzt der Zustand in Deutschland in deinem Szenario: Viel eigene KI, gute Regeln und Training. Firmen sind schneller UND fairer. Das stärkt Qualität, Export und viele Jobs.",
    work:  ["Mehr sichere Jobs durch Qualifikation.","Neue Aufgaben an der Mensch-KI-Schnittstelle."],
    firms: ["Schneller & fairer → gute Qualität.","Weniger Fehlerkosten, mehr Vertrauen."],
    state: ["Klare Regeln + Kontrolle.","Datenschutz & Fairness werden ernst genommen."],
    trade: ["Gute Wettbewerbsfähigkeit.","Mehr Export von Maschinen & Know-how."],
    inno:  ["Mehr Forschung & Open-Source.","Regionale Innovations-Cluster."]
  },
  2: {
    intro: "Zustand in Deutschland: Viel Einkauf von KI aus dem Ausland, starke Bürokratie, wenig eigenes Know-how. Das macht viele Firmen langsamer und abhängiger.",
    work:  ["Jobs unsicherer, wenn Qualität schwankt.","Weiterbildung entscheidet über Chancen."],
    firms: ["Abhängigkeit von Anbietern.","Tempo ↔, Qualität schwankt."],
    state: ["Viel Bürokratie bindet Zeit.","Regeln wichtig, aber schwer umzusetzen."],
    trade: ["Wettbewerb ↔/↓ bei Abhängigkeit.","Mehr Import von KI als Export."],
    inno:  ["Weniger eigene Entwicklung.","Start-ups haben es schwer."]
  },
  3: {
    intro: "Zustand in Deutschland: Viele spezialisierte KI-Lösungen, saubere Daten, klare Standards. Das stärkt Wettbewerbsfähigkeit und schafft neue Dienste.",
    work:  ["Gute Jobs in spezialisierten Teams.","Karrierechancen durch Schulung/Service."],
    firms: ["Zuverlässig & skalierbar.","Neue Dienstleistungsfelder."],
    state: ["Regeln als Standortvorteil.","Standards erleichtern Kontrolle."],
    trade: ["Starke Wettbewerbsfähigkeit.","Export von Produkten + Diensten."],
    inno:  ["Viele Hidden Champions.","Kooperationen mit Forschung."]
  }
};

function drawMacro(x0,y0){
  const m = macroBullets[scenarioSel];
  push(); fill(240); textAlign(LEFT,TOP); textSize(22);
  text("Deutschland gesamtwirtschaftlich", x0, y0);
  drawParagraph(m.intro, x0, y0+32, width - (SIDEBAR_W+60), 15, 22, 210);

  const cols = [
    {t:"Arbeit", list:m.work},
    {t:"Unternehmen", list:m.firms},
    {t:"Staat & Regeln", list:m.state},
    {t:"Wettbewerb & Export", list:m.trade},
    {t:"Innovation", list:m.inno},
  ];
  const w=320,h=130, xs=[x0, x0+340, x0+680], ys=[y0+140, y0+140+h+24];
  let idx=0;
  for (let r=0;r<2;r++){
    for (let c=0;c<(r===0?3:2);c++){
      const X=xs[c], Y=ys[r];
      if (idx>=cols.length) break;
      drawMacroCard(X,Y,w,h,cols[idx++]);
    }
  }
  pop();
}

function drawMacroCard(x,y,w,h,card){
  push(); stroke(120); fill(36,39,50); rect(x,y,w,h,14);
  noStroke(); fill(240); textSize(16); textAlign(LEFT,TOP); text(card.t, x+12, y+10);
  drawBullets(card.list, x+12, y+40, w-24, 14, 22, 210);
  pop();
}

function buildMacroButtons(){
  clearButtons();
  addBtn(SIDEBAR_W+28, height-64, 120, 40, "Zurück", ()=> back());
  addBtn(width-240, height-64, 210, 44, "Wie geht es MIR? ▶", ()=>{ go("self"); buildSelfButtons(); });
}

/////////////////////////
// SELF (eigene Lage)  //
/////////////////////////

function drawSelf(x0,y0){
  const risk = calcUnemploymentRisk(metrics);
  const riskTxt = riskLabel(risk);

  push(); fill(240); textAlign(LEFT,TOP); textSize(22);
  text("Deine Lage in diesem Szenario", x0, y0);
  drawParagraph("Die Balken links zeigen deine Situation. Triff jetzt 3 kleine Entscheidungen – sie ändern die Werte sichtbar.", x0, y0+32, width - (SIDEBAR_W+60), 15, 22, 210);

  drawPanel(x0, y0+96, 680, 96, "Deine Einschätzung", [
    "Wie optimistisch bist du? (ändert leicht den Wohlstandswert)"
  ]);

  fill(200); textSize(15);
  text("Aktuelle Einschätzung: Arbeitslosigkeitsrisiko "+riskTxt+" ("+risk+"/100).", x0, y0+210);
  pop();
}

function buildSelfButtons(){
  clearButtons();
  addBtn(SIDEBAR_W+28,  HEADER_H+164, 150, 36, "optimistisch", ()=>{ selfEval="optimistisch"; applyDelta({wealth:+4}); });
  addBtn(SIDEBAR_W+188, HEADER_H+164, 150, 36, "realistisch",  ()=>{ selfEval="realistisch"; });
  addBtn(SIDEBAR_W+348, HEADER_H+164, 150, 36, "pessimistisch",()=>{ selfEval="pessimistisch"; applyDelta({wealth:-4}); });

  addBtn(SIDEBAR_W+28,  height-120, 220, 40, "Kurs: Basics zu KI-Tools", ()=> applyDelta({fit:+5}));
  addBtn(SIDEBAR_W+268, height-120, 220, 40, "Checkliste verbessern",  ()=> applyDelta({rules:+3, speed:+1}));
  addBtn(SIDEBAR_W+508, height-120, 220, 40, "Team-Austausch 1×/Woche", ()=> applyDelta({fit:+2, comp:+2}));

  addBtn(SIDEBAR_W+28, height-64, 120, 40, "Zurück", ()=> back());
  addBtn(width-220, height-64, 190, 40, "End-Szenario ▶", ()=>{ go("ending"); buildEndingButtons(); });
}

function calcUnemploymentRisk(m){
  const base = 100 - (m.fit*0.5 + m.comp*0.3 + m.rules*0.2);
  return Math.max(0, Math.min(100, Math.round(base)));
}
function riskLabel(r){ if (r<=25) return "niedrig"; if (r<=50) return "mittel"; if (r<=75) return "erhöht"; return "hoch"; }

/////////////////////////
// ENDING              //
/////////////////////////

const endingTexts = {
  1: { // Max
    1:"Max prüft KI-Ergebnisse, meldet Auffälligkeiten, nutzt Vorlagen. Er ist geschult und hilft Kolleg*innen. Firma ist schnell UND fair – gut für Standort und Löhne.",
    2:"Max nutzt zugekaufte Systeme. Qualität schwankt, er kontrolliert öfter nach. Schulungen fehlen, Doku frisst Zeit. Firma kommt voran, aber langsamer – Abhängigkeit bleibt.",
    3:"Max arbeitet im Team: KI prüft zuverlässig, Menschen verbessern regelmäßig. Er schult andere, hilft bei Rollouts – die Firma wächst in Produkte und Dienste hinein."
  },
  2: { // Toni
    1:"Toni matcht mit eigenen, fairen Tools. Monitoring & Training sitzen, aber Wettbewerb macht Tempo. Sie bleibt gefragt – Qualität überzeugt.",
    2:"Toni nutzt starke Basismodelle, prüft viel nach und steuert Erwartungen. Arbeit ist dichter – mit Sorgfalt bleibt der Ruf stabil.",
    3:"Toni ist Expertin für Spezial-Recruiting. Mit KI-Cockpit & Implementierung schafft sie messbaren Nutzen – Nachfrage wächst, Karriere auch."
  },
  3: { // Ahmed
    1:"Ahmed nutzt Assistenzsysteme sinnvoll. Er gewinnt Zeit für Menschen, bleibt geschult und sicher – Pflegequalität steigt.",
    2:"Ahmed profitiert von KI-Vorschlägen, kämpft aber mit Support & Doku. Eigenlernen bringt ihn voran – er steigt auf.",
    3:"Ahmeds Heim arbeitet mit Spezial-Modellen. Doku aus dem Homeoffice, starke Teams, hohe Qualität – spürbar bessere Balance."
  },
  4: { // Maria
    1:"Maria gestaltet moderne Verwaltung mit. Eigene Modelle, barrierefrei, transparent – Bürger*innen profitieren.",
    2:"Maria wechselt in den Non-Profit und nutzt ihr Wissen für Inklusion. Schrittweise Digitalisierung schafft echten Nutzen.",
    3:"Maria erlebt Aufbruch: Automatisiert, bürgernah, flexibel – mehr Kolleg*innen, bessere Services."
  },
  5: { // Marcela
    1:"Marcela kombiniert Kreativität mit eigenen Modellen. Personalisierte Kampagnen, klare Ethik – starke Erfolge.",
    2:"Marcela arbeitet mit Lizenz-Tools; Qualitätsschwankungen fängt sie ab. Mehr Arbeit, aber solide Ergebnisse.",
    3:"Marcela wird Spezialistin für Industriekunden. Sehr verlässliche Tools, neue Services – Karriere & Wohlstand steigen."
  }
};

function drawEnding(x0,y0){
  const sc = endingTexts[roleSel][scenarioSel];
  const risk = calcUnemploymentRisk(metrics);
  push();
  fill(240); textAlign(LEFT,TOP); textSize(22);
  text("End-Szenario: Jahr 2030", x0, y0);
  drawParagraph(sc, x0, y0+36, width - (SIDEBAR_W+60), 16, 22, 220);
  fill(200); textSize(15);
  text("Geschätztes Arbeitslosigkeitsrisiko: "+riskLabel(risk)+" ("+risk+"/100).", x0, y0+170);
  pop();
}

function buildEndingButtons(){
  clearButtons();
  addBtn(SIDEBAR_W+28, height-64, 220, 40, "Nochmal (anderer Beruf)", ()=>{ backStack=[]; roleSel=0; scenarioSel=0; go("rolepick"); buildRolePickButtons(); });
  addBtn(width-200, height-64, 170, 40, "Zum Start", ()=>{ backStack=[]; roleSel=0; scenarioSel=0; go("start"); buildStart(); });
}

/////////////////////////
// Glossar             //
/////////////////////////

const glossary = [
  {t:"KI (Künstliche Intelligenz)", d:"Computer lernt aus Beispielen, erkennt Muster, macht Vorschläge."},
  {t:"GKI", d:"Generative KI: erstellt Inhalte (Texte, Bilder, Code, …)."},
  {t:"Daten", d:"Fotos, Texte, Messwerte – damit lernt KI."},
  {t:"Bias (Verzerrung)", d:"Unfaire Ergebnisse, z. B. durch schiefe Daten."},
  {t:"Mensch-im-Loop", d:"Menschen prüfen KI-Ergebnisse und verbessern das System."},
  {t:"Standards & Schnittstellen", d:"Gemeinsame Formate, damit Systeme zusammenspielen."},
  {t:"Transparenz", d:"Nachvollziehbar, wie Ergebnisse entstehen."}
];

function drawGlossary(){
  push();
  noStroke(); fill(0,0,0,140); rect(0,0,width,height);
  const w=820, h=460;
  const rx = width/2 - w/2;
  const ry = height/2 - h/2;
  fill(36,39,50); stroke(120); rect(rx,ry,w,h,16);
  noStroke(); fill(240); textSize(22); textAlign(LEFT,TOP);
  text("Glossar – einfach erklärt", rx+16, ry+14);
  const items = glossary.map(g=> g.t + ": " + g.d);
  drawBullets(items, rx+16, ry+54, w-32, 15, 22, 210);
  pop();
}


function updateCheckButtonState(){
  const allTouched = companyBars.every(b=> b.touched);
  if (companyBarsBtnCheck){
    companyBarsBtnCheck.setDisabled(companyBarsLocked || !allTouched);
  }
}


