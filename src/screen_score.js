// Screen Score (Auswertung)
(function () {
  const SCORE_ID = 'screen-score';
  const CLAIMS = [
 
  { min: 0, max: 3,
    title: "Erkundungstour gestartet",
    text: "Du hast kurz reingeschnuppert. Wo verändert Technik Aufgaben – und wo bleibt der Mensch gefragt? Aber da geht noch was..." },

  { min: 4, max: 7,
    title: "Aufwärmphase – Radar geht an",
    text: "Du siehst: Arbeit verschiebt sich. Bei Folgen für Alltag & Qualifizierung fehlen noch klare Bilder." },

  { min: 8, max: 12,
    title: "Co-Pilot einsatzbereit",
    text: "Die Grundlogik sitzt: Routine wird einfacher, Entscheidungen brauchen weiter Menschen. Mit 2–3 Beispielen kannst du das schon erklären – weiter so!" },

  { min: 13, max: 16,
    title: "Navigator 2030",
    text: "Du beschreibst sauber, wie Tätigkeiten sich ändern und welche Skills wichtiger werden. Sehr stimmig." },

  { min: 17, max: 19,
    title: "Zukunftsprofi KI – Landung punktgenau",
    text: "Du bringst Rollenbild, Aufgabenwandel und Lernpfade überzeugend zusammen – kritisch, begründet, anschaulich. Strong finish! 🎉" }
]


  function getRange(total) {
    return CLAIMS.find(c => total >= c.min && total <= c.max) || CLAIMS[CLAIMS.length - 1];
  }

  function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  function animateProgress(total, max, onDone) {
    const fill = document.getElementById('score-progress-fill');
    const label = document.getElementById('score-progress-text');
    const bar = document.querySelector('.score-progress');
    if (!fill || !label || !bar) return;
    const percent = Math.max(0, Math.min(100, (total / max) * 100));
    bar.setAttribute('aria-valuenow', total);
    let current = 0;
    const target = percent;
    const steps = 40;
    const inc = target / steps;
    const countInc = total / steps;
    let countVal = 0;

    const interval = setInterval(() => {
      current = Math.min(target, current + inc);
      countVal = Math.min(total, countVal + countInc);
      fill.style.width = `${current}%`;
      label.textContent = `${Math.round(countVal)} / ${max}`;
      if (current >= target) {
        label.textContent = `${total} / ${max}`;
        clearInterval(interval);
        if (typeof onDone === 'function') onDone();
      }
    }, 20);
  }

  function applyScores(data) {
    const { scores, max } = data;
    setText('score-values', `${scores.values ?? '–'} von ${max.values} richtig`);
    setText('score-quiz', `${scores.quiz ?? '–'} von ${max.quiz} richtig`);
    setText('score-tasks', `${scores.tasks ?? '–'} von ${max.tasks} richtig`);

    setText('score-values-sub', 'Gefühl für das Unternehmen 2030 – ' + (scores.values >= max.values * 0.7 ? '✔' : '↺'));
    setText('score-quiz-sub', 'Auswirkungen – ' + (scores.quiz >= max.quiz * 0.7 ? '✔' : '↺'));
    setText('score-tasks-sub', 'Human-Lead / Co-Pilot / Auto-Run – ' + (scores.tasks >= max.tasks * 0.7 ? '✔' : '↺'));

    const total = (scores.values || 0) + (scores.quiz || 0) + (scores.tasks || 0);
    setText('score-total-label', `Deine Gesamtpunkte: ${total} von ${max.total} Punkten`);
    const claimBox = document.getElementById('score-claim');
    const claimTitle = document.getElementById('score-claim-title');
    if (claimBox) claimBox.classList.remove('reveal');
    if (claimTitle) claimTitle.classList.remove('reveal');

    animateProgress(total, max.total, () => {
      setTimeout(() => {
        if (claimBox) claimBox.classList.add('reveal');
        if (claimTitle) claimTitle.classList.add('reveal');
      }, 150);
    });

    const range = getRange(total);
    setText('score-claim-title', range.title);
    setText('score-claim-text', range.text);

    return total;
  }

  function showScoreScreen(state) {
    const root = document.getElementById(SCORE_ID);
    if (!root) return;

    const data = {
      roleId: (state && state.roleId) || 5,
      scores: {
        values: state?.scores?.values ?? 0,
        quiz: state?.scores?.quiz ?? 0,
        tasks: state?.scores?.tasks ?? 0
      },
      max: { values: 6, quiz: 3, tasks: 10, total: 19 }
    };

    document.querySelectorAll('section, div[id$="-screen"]').forEach(el => {
      if (el.id === 'game-layout' || el.id === 'ui-area') return;
      el.classList.add('hidden');
      if ('hidden' in el) el.hidden = true;
    });

    root.classList.remove('hidden');
    root.hidden = false;
    window.scrollTo(0, 0);

    applyScores(data);

    // avatar next to heading
    const header = root.querySelector('.score-header');
    if (header) {
      let avatarEl = header.querySelector('.score-avatar');
      if (!avatarEl) {
        avatarEl = document.createElement('div');
        avatarEl.className = 'score-avatar';
        header.insertBefore(avatarEl, header.firstChild);
      }
      const avatarUrl = (window.gameAvatars && window.gameAvatars[data.roleId]) || {
        1: 'assets/avatar_max.png',
        2: 'assets/avatar_toni.png',
        3: 'assets/avatar_ahmed.png',
        4: 'assets/avatar_maria.png',
        5: 'assets/avatar_marcela.png'
      }[data.roleId];
      if (avatarUrl) {
        avatarEl.style.backgroundImage = `url('${avatarUrl}')`;
      }
    }

    const backBtn = document.getElementById('score-back');
    const nextBtn = document.getElementById('score-next');
    if (backBtn) {
      backBtn.onclick = () => {
        const s7 = document.getElementById('screen7-tasks');
        if (s7) {
          root.classList.add('hidden');
          root.hidden = true;
          s7.classList.remove('hidden');
          s7.hidden = false;
          window.scrollTo(0, 0);
        }
      };
    }
    if (nextBtn) {
      nextBtn.onclick = () => {
        if (typeof window.showEndscreen === 'function') {
          window.showEndscreen(data.roleId);
        }
      };
    }
  }

  window.showScoreScreen = showScoreScreen;
})();
