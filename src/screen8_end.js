// Screen 8 renderer + routing
(function () {
  const S8_ID = "screen8-end";

  function getAvatarForRole(roleId) {
    // reuse known avatar paths; fallback none
    const map = {
      1: "assets/avatar_max.png",
      2: "assets/avatar_toni.png",
      3: "assets/avatar_ahmed.png",
      4: "assets/avatar_maria.png",
      5: "assets/avatar_marcela.png"
    };
    if (window.gameAvatars && window.gameAvatars[roleId]) return window.gameAvatars[roleId];
    return map[roleId] || null;
  }

  function clearNode(n) { while (n.firstChild) n.removeChild(n.firstChild); }

  function liList(items) {
    const ul = document.createElement('ul');
    ul.className = 's8-list';
    items.forEach(t => {
      const li = document.createElement('li');
      li.textContent = t;
      ul.appendChild(li);
    });
    return ul;
  }

  function ensureMarkup(root) {
    if (!root.querySelector('.s8-header')) {
      root.innerHTML = `
        <div class="s8-header">
          <div class="s8-header-top">
            <div class="s8-avatar" aria-hidden="true"></div>
            <div class="s8-title">Rolle</div>
          </div>
          <div class="s8-finale">Spielende! – Danke für deine Teilnahme</div>
          <p class="s8-intro">Intro</p>
        </div>
        <div class="s8-grid">
          <div class="s8-block s8-block-qual">
            <div class="s8-block-title">Wie sich die Qualifizierung ändern muss:</div>
            <div class="s8-list-wrap"></div>
          </div>
          <div class="s8-block s8-block-tasks">
            <div class="s8-block-title">Wie sich die Tätigkeiten ändern werden:</div>
            <div class="s8-list-wrap"></div>
          </div>
        </div>
        <div class="s8-question">Und welche Erkenntnisse nimmst du für dich mit?</div>
        <div class="s8-footer">
          <button id="s8-back" class="btn-secondary">← Zurück</button>
          <button id="s8-restart" class="btn-primary">Neues Spiel</button>
        </div>
      `;
    }
  }

  function showEndscreen(roleId) {
    const dataSource = window.screen8EndData || (typeof screen8EndData !== 'undefined' ? screen8EndData : null);
    const rid = parseInt(roleId, 10);
    const data = dataSource && (dataSource[rid] || dataSource[5]);
    if (!dataSource || !data) return;

    const root = document.getElementById(S8_ID);
    if (!root) return;

    ensureMarkup(root);

    document.querySelectorAll('section, div[id$="-screen"]').forEach(el => {
      // do not hide the main layout shell
      if (el.id === 'game-layout' || el.id === 'ui-area') return;
      el.classList.add('hidden');
      if ('hidden' in el) el.hidden = true;
    });
    const shell = document.getElementById('game-layout');
    if (shell) shell.classList.remove('hidden');
    const ui = document.getElementById('ui-area');
    if (ui) ui.classList.remove('hidden');
    root.classList.remove('hidden');
    root.hidden = false;
    window.scrollTo(0, 0);

    const avatarEl = root.querySelector('.s8-avatar');
    const titleEl = root.querySelector('.s8-title');
    const introEl = root.querySelector('.s8-intro');

    const qualH = root.querySelector('.s8-block-qual .s8-block-title');
    const qualListWrap = root.querySelector('.s8-block-qual .s8-list-wrap');
    const taskH = root.querySelector('.s8-block-tasks .s8-block-title');
    const taskListWrap = root.querySelector('.s8-block-tasks .s8-list-wrap');

    if (titleEl) titleEl.textContent = data.title;
    if (introEl) introEl.textContent = data.intro;
    if (qualH) qualH.textContent = data.qualifizierungHeading;
    if (taskH) taskH.textContent = data.taetigkeitenHeading;

    if (qualListWrap) { clearNode(qualListWrap); qualListWrap.appendChild(liList(data.qualifizierung)); }
    if (taskListWrap) { clearNode(taskListWrap); taskListWrap.appendChild(liList(data.taetigkeiten)); }

    const avatarUrl = getAvatarForRole(rid);
    if (avatarUrl && avatarEl) {
      avatarEl.style.backgroundImage = `url('${avatarUrl}')`;
      avatarEl.setAttribute('aria-hidden', 'false');
    } else if (avatarEl) {
      avatarEl.style.backgroundImage = 'none';
    }

    const backBtn = root.querySelector('#s8-back');
    const restartBtn = root.querySelector('#s8-restart');

    if (backBtn) {
      backBtn.onclick = () => {
        const score = document.getElementById('screen-score');
        if (score) {
          root.classList.add('hidden');
          root.hidden = true;
          score.classList.remove('hidden');
          score.hidden = false;
          window.scrollTo(0, 0);
        } else {
          const s7 = document.getElementById('screen7-tasks') || document.getElementById('taetigkeiten-screen');
          if (s7) {
            root.classList.add('hidden');
            root.hidden = true;
            s7.classList.remove('hidden');
            s7.hidden = false;
            window.scrollTo(0, 0);
          }
        }
      };
    }

    if (restartBtn) {
      restartBtn.onclick = () => {
        const start = document.getElementById('start-screen') || document.getElementById('home-screen');
        // Hide all screens except shell
        document.querySelectorAll('section, div[id$="-screen"]').forEach(el => {
          if (el.id === 'game-layout' || el.id === 'ui-area') return;
          el.classList.add('hidden');
          if ('hidden' in el) el.hidden = true;
        });
        if (start) {
          start.classList.remove('hidden');
          start.hidden = false;
        }
        window.scrollTo(0, 0);
        if (window.resetGameState) window.resetGameState();
      };
    }
  }

  window.showEndscreen = showEndscreen;
})();
