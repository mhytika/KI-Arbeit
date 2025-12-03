/**
 * Screen 7 Logic: Tasks Sort (supports all roles via data registry).
 * Handles rendering, drag & drop, and validation flow.
 */

const S7_STATE = {
    PLACING: 'placing',
    CHECKED: 'checked',
    AUTOFIXED: 'autofixed'
};

let s7_draggedCard = null;
let s7State = S7_STATE.PLACING;
let s7Snapshot = null;
let s7CurrentData = window.screen7Data || {};
let s7SolutionMap = {};
let s7ScoreRecorded = false;

function s7_getAvatarForRole(roleId) {
    const map = {
        1: 'assets/avatar_max.png',
        2: 'assets/avatar_toni.png',
        3: 'assets/avatar_ahmed.png',
        4: 'assets/avatar_maria.png',
        5: 'assets/avatar_marcela.png'
    };
    return map[roleId] || 'assets/avatar_marcela.png';
}

window.renderScreen7Tasks = function renderScreen7Tasks(data) {
    initScreen7Tasks(data);
};

window.renderScreen7ForRole = function renderScreen7ForRole(roleId) {
    const data = (typeof window.getScreen7DataForRole === 'function')
        ? window.getScreen7DataForRole(roleId)
        : (window.SCREEN7_DATA_BY_ROLE && window.SCREEN7_DATA_BY_ROLE[roleId]) || window.screen7Data;

    const s7 = document.getElementById('screen7-tasks');
    if (s7) {
        s7.classList.remove('hidden');
        s7.hidden = false;
    }
    window.renderScreen7Tasks(data);
};

function initScreen7Tasks(data) {
    s7CurrentData = data || window.screen7Data || {};
    s7SolutionMap = buildSolutionLookup(s7CurrentData.solution);
    s7State = S7_STATE.PLACING;
    s7Snapshot = null;
    s7ScoreRecorded = false;
    renderScreen7();
}

function colorizeIntro(introText) {
    return (introText || '')
        .replace(/\(Human-Lead\)/g, '<span class="intro-pill intro-pill--human">(Human-Lead)</span>')
        .replace(/\(KI-Assistenz\)/g, '<span class="intro-pill intro-pill--assist">(KI-Assistenz)</span>')
        .replace(/\(Auto-Run\)/g, '<span class="intro-pill intro-pill--auto">(Auto-Run)</span>');
}

function renderScreen7() {
    const container = document.getElementById('screen7-tasks');
    if (!container) return;

    container.innerHTML = '';

    const header = document.createElement('div');
    header.className = 's7-header';
    header.innerHTML = `
        <div class="s7-header-content">
            <div class="s7-avatar" style="background-image: url('${s7_getAvatarForRole(s7CurrentData.roleId)}');"></div>
            <div class="s7-title">${s7CurrentData.title || ''}</div>
        </div>
        <div class="s7-intro">${s7CurrentData.intro || ''}</div>
        <div class="s7-instruction">${s7CurrentData.instruction || ''}</div>
    `;
    container.appendChild(header);

    const introEl = header.querySelector('.s7-intro') || document.querySelector('#screen7-tasks .s7-intro');
    if (introEl) {
        introEl.innerHTML = colorizeIntro(s7CurrentData.intro || '');
    }

    const bucketsContainer = document.createElement('div');
    bucketsContainer.className = 's7-buckets-container';

    (s7CurrentData.buckets || []).forEach(bucket => {
        const bucketEl = document.createElement('div');
        bucketEl.className = 's7-bucket';
        bucketEl.dataset.id = bucket.id;
        bucketEl.style.borderColor = bucket.color;

        bucketEl.innerHTML = `
            <div class="s7-bucket-header">
                <span class="s7-bucket-label" style="color: ${bucket.color}">${bucket.label}</span>
                <span class="s7-bucket-sublabel">${bucket.subLabel}</span>
            </div>
            <div class="s7-bucket-content" data-bucket-id="${bucket.id}"></div>
            <div class="s7-why-claim" style="color: ${bucket.color}">${bucket.why}</div>
        `;

        bucketEl.addEventListener('dragover', s7_handleDragOver);
        bucketEl.addEventListener('dragleave', s7_handleDragLeave);
        bucketEl.addEventListener('drop', s7_handleDrop);

        bucketEl.addEventListener('click', () => {
            if (window.innerWidth < 900 && s7_draggedCard && s7State === S7_STATE.PLACING) {
                s7_moveCardToBucket(s7_draggedCard, bucket.id);
                s7_draggedCard.classList.remove('dragging');
                s7_draggedCard = null;
                s7_updateCheckButton();
            }
        });

        bucketsContainer.appendChild(bucketEl);
    });
    container.appendChild(bucketsContainer);

    const poolContainer = document.createElement('div');
    poolContainer.className = 's7-card-pool';
    poolContainer.id = 's7-pool';

    poolContainer.addEventListener('dragover', s7_handleDragOver);
    poolContainer.addEventListener('drop', s7_handleDrop);

    (s7CurrentData.cards || []).forEach(card => {
        const cardEl = document.createElement('div');
        cardEl.className = 's7-card';
        cardEl.draggable = true;
        cardEl.dataset.id = card.id;
        cardEl.textContent = card.text;

        cardEl.addEventListener('dragstart', s7_handleDragStart);
        cardEl.addEventListener('dragend', s7_handleDragEnd);

        cardEl.addEventListener('click', (e) => {
            if (window.innerWidth < 900 && s7State === S7_STATE.PLACING) {
                e.stopPropagation();
                if (s7_draggedCard === cardEl) {
                    cardEl.classList.remove('dragging');
                    s7_draggedCard = null;
                } else {
                    if (s7_draggedCard) s7_draggedCard.classList.remove('dragging');
                    s7_draggedCard = cardEl;
                    cardEl.classList.add('dragging');
                }
            }
        });

        cardEl.tabIndex = 0;
        cardEl.addEventListener('keydown', s7_handleCardKeydown);

        poolContainer.appendChild(cardEl);
    });
    container.appendChild(poolContainer);

    const footer = document.createElement('div');
    footer.className = 's7-actions';
    footer.innerHTML = `
        <button id="s7-btn-back" class="btn-secondary">Zur&uuml;ck zum Quiz</button>
        <button id="s7-btn-check" class="btn-primary" disabled>Pr&uuml;fen</button>
        <button id="s7-btn-autofix" class="btn-primary hidden">Richtig zuordnen</button>
        <button id="s7-btn-revert" class="btn-secondary hidden">Zur&uuml;ck zum eigenen Tipp</button>
        <button id="s7-btn-next" class="btn-primary hidden">Weiter &#9654;</button>
    `;
    container.appendChild(footer);

    document.getElementById('s7-btn-back').addEventListener('click', s7_backToQuiz);
    document.getElementById('s7-btn-check').addEventListener('click', s7_checkTaetigkeiten);
    document.getElementById('s7-btn-autofix').addEventListener('click', s7_autoFixWrongAssignments);
    document.getElementById('s7-btn-revert').addEventListener('click', s7_revertToChecked);
    document.getElementById('s7-btn-next').addEventListener('click', s7_finishScreen);

    s7_draggedCard = null;
    s7State = S7_STATE.PLACING;
    s7Snapshot = null;
    s7_setCardsDraggable(true);
    toggleButtonsForState();
    s7_updateCheckButton();
}

// --- Drag & Drop Handlers ---

function s7_handleDragStart(e) {
    if (s7State !== S7_STATE.PLACING) {
        e.preventDefault();
        return;
    }
    s7_draggedCard = e.target;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', e.target.dataset.id);
    setTimeout(() => e.target.classList.add('dragging'), 0);
}

function s7_handleDragEnd(e) {
    e.target.classList.remove('dragging');
    document.querySelectorAll('.s7-bucket').forEach(b => b.classList.remove('drag-over'));
}

function s7_handleDragOver(e) {
    if (s7State !== S7_STATE.PLACING) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    const bucket = e.target.closest('.s7-bucket');
    if (bucket) {
        bucket.classList.add('drag-over');
    }
}

function s7_handleDragLeave(e) {
    const bucket = e.target.closest('.s7-bucket');
    if (bucket) {
        bucket.classList.remove('drag-over');
    }
}

function s7_handleDrop(e) {
    if (s7State !== S7_STATE.PLACING) return;
    e.preventDefault();
    const bucket = e.target.closest('.s7-bucket');
    const pool = e.target.closest('.s7-card-pool');

    if (bucket && s7_draggedCard) {
        bucket.classList.remove('drag-over');
        const contentArea = bucket.querySelector('.s7-bucket-content');
        contentArea.appendChild(s7_draggedCard);
    } else if (pool && s7_draggedCard) {
        pool.appendChild(s7_draggedCard);
    }

    s7_updateCheckButton();
}

function s7_moveCardToBucket(card, bucketId) {
    if (s7State !== S7_STATE.PLACING) return;
    const bucket = document.querySelector(`.s7-bucket[data-id="${bucketId}"] .s7-bucket-content`);
    if (bucket) {
        bucket.appendChild(card);
    }
}

// --- Keyboard Support ---

function s7_handleCardKeydown(e) {
    if (s7State !== S7_STATE.PLACING) return;

    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (s7_draggedCard === e.target) {
            e.target.classList.remove('dragging');
            s7_draggedCard = null;
        } else {
            if (s7_draggedCard) s7_draggedCard.classList.remove('dragging');
            s7_draggedCard = e.target;
            e.target.classList.add('dragging');
        }
    }
}

document.addEventListener('keydown', (e) => {
    if (!s7_draggedCard || s7State !== S7_STATE.PLACING) return;

    if (e.key === '1') s7_moveCardToBucket(s7_draggedCard, 'human');
    if (e.key === '2') s7_moveCardToBucket(s7_draggedCard, 'assist');
    if (e.key === '3') s7_moveCardToBucket(s7_draggedCard, 'auto');

    if (['1', '2', '3'].includes(e.key)) {
        s7_draggedCard.classList.remove('dragging');
        s7_draggedCard.focus();
        s7_draggedCard = null;
        s7_updateCheckButton();
    }
});

// --- Logic ---

function s7_updateCheckButton() {
    const pool = document.getElementById('s7-pool');
    const btn = document.getElementById('s7-btn-check');
    if (!btn || !pool || s7State !== S7_STATE.PLACING) return;
    btn.disabled = pool.children.length !== 0;
}

function s7_checkTaetigkeiten() {
    if (!areAllCardsPlaced()) return;

    s7Snapshot = snapshotUserAssignments();
    applyCheckedFeedback();
    showWhyClaims();
    s7_setCardsDraggable(false);

    s7State = S7_STATE.CHECKED;
    toggleButtonsForState();
}

function applyCheckedFeedback() {
    const cards = document.querySelectorAll('#screen7-tasks .s7-card');
    let correctCount = 0;
    cards.forEach(card => {
        const userCol = getUserColumn(card);
        const correctCol = getCorrectColumn(card.dataset.id);
        removeCardFeedbackClasses(card);

        if (userCol === correctCol) {
            card.classList.add('s7-card--correct');
            correctCount += 1;
        } else {
            card.classList.add('s7-card--wrong');
            if (correctCol === 'human') card.classList.add('s7-card--hint-human');
            if (correctCol === 'assist') card.classList.add('s7-card--hint-assist');
            if (correctCol === 'auto') card.classList.add('s7-card--hint-auto');
        }
    });

    if (!s7ScoreRecorded && window.gameState && window.gameState.scores) {
        window.gameState.scores.tasks = correctCount;
        s7ScoreRecorded = true;
    }
}

function showWhyClaims() {
    document.querySelectorAll('#screen7-tasks .s7-why-claim').forEach(el => {
        el.style.display = 'block';
    });
}

function s7_autoFixWrongAssignments() {
    if (s7State !== S7_STATE.CHECKED) return;

    const cards = document.querySelectorAll('#screen7-tasks .s7-card');
    cards.forEach(card => {
        const userCol = getUserColumn(card);
        const correctCol = getCorrectColumn(card.dataset.id);
        if (userCol !== correctCol) {
            const target = getColumnNode(correctCol);
            if (target) {
                animateMoveCardTo(card, target);
            }
            removeCardFeedbackClasses(card);
            card.classList.add('s7-card--correct');
        }
    });

    s7State = S7_STATE.AUTOFIXED;
    toggleButtonsForState();
}

function s7_revertToChecked() {
    if (!s7Snapshot) return;

    restoreUserAssignments(s7Snapshot);
    applyCheckedFeedback();
    showWhyClaims();
    s7_setCardsDraggable(false);

    s7State = S7_STATE.CHECKED;
    toggleButtonsForState();
}

function animateMoveCardTo(card, targetColumn) {
    const startRect = card.getBoundingClientRect();
    targetColumn.appendChild(card);
    const endRect = card.getBoundingClientRect();

    const deltaX = startRect.left - endRect.left;
    const deltaY = startRect.top - endRect.top;

    card.style.transition = 'none';
    card.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

    requestAnimationFrame(() => {
        card.style.transition = 'transform 0.3s ease';
        card.style.transform = '';
        card.addEventListener('transitionend', () => {
            card.style.transition = '';
        }, { once: true });
    });
}

function snapshotUserAssignments() {
    const snapshot = new Map();
    document.querySelectorAll('#screen7-tasks .s7-card').forEach(card => {
        const col = getUserColumn(card) || 'pool';
        snapshot.set(card.dataset.id, col);
    });
    return snapshot;
}

function restoreUserAssignments(snapshot) {
    snapshot.forEach((columnId, cardId) => {
        const card = document.querySelector(`#screen7-tasks .s7-card[data-id="${cardId}"]`);
        const target = getColumnNode(columnId);
        if (card && target) {
            target.appendChild(card);
        }
    });
}

function getUserColumn(card) {
    const parentContent = card.closest('.s7-bucket-content');
    if (parentContent) return parentContent.dataset.bucketId;
    const pool = card.closest('.s7-card-pool');
    if (pool) return 'pool';
    return null;
}

function getCorrectColumn(cardId) {
    return s7SolutionMap[cardId];
}

function getColumnNode(columnId) {
    if (columnId === 'pool') return document.getElementById('s7-pool');
    return document.querySelector(`.s7-bucket[data-id="${columnId}"] .s7-bucket-content`);
}

function removeCardFeedbackClasses(card) {
    card.classList.remove(
        's7-card--correct',
        's7-card--wrong',
        's7-card--hint-human',
        's7-card--hint-assist',
        's7-card--hint-auto'
    );
}

function areAllCardsPlaced() {
    const pool = document.getElementById('s7-pool');
    return pool ? pool.children.length === 0 : false;
}

function s7_setCardsDraggable(enabled) {
    document.querySelectorAll('#screen7-tasks .s7-card').forEach(card => {
        card.draggable = enabled;
    });
}

function toggleButtonsForState() {
    const checkBtn = document.getElementById('s7-btn-check');
    const autoBtn = document.getElementById('s7-btn-autofix');
    const revertBtn = document.getElementById('s7-btn-revert');
    const nextBtn = document.getElementById('s7-btn-next');

    if (!checkBtn || !autoBtn || !revertBtn || !nextBtn) return;

    checkBtn.classList.add('hidden');
    autoBtn.classList.add('hidden');
    revertBtn.classList.add('hidden');
    nextBtn.classList.add('hidden');

    if (s7State === S7_STATE.PLACING) {
        checkBtn.classList.remove('hidden');
        s7_updateCheckButton();
    } else if (s7State === S7_STATE.CHECKED) {
        autoBtn.classList.remove('hidden');
    } else if (s7State === S7_STATE.AUTOFIXED) {
        revertBtn.classList.remove('hidden');
        nextBtn.classList.remove('hidden');
    }
}

function s7_resetScreen() {
    renderScreen7();
}

function s7_finishScreen() {
    const roleId = (s7CurrentData && s7CurrentData.roleId) || window.currentRoleId || (window.gameState && window.gameState.roleId) || 5;
    if (typeof window.showScoreScreen === 'function') {
        window.showScoreScreen(window.gameState);
    } else if (typeof window.showEndscreen === 'function') {
        window.showEndscreen(roleId);
    } else {
        location.reload();
    }
}

function s7_backToQuiz() {
    const quizScreen = document.getElementById('quiz-screen');
    const s7Screen = document.getElementById('screen7-tasks');
    if (quizScreen && s7Screen) {
        s7Screen.classList.add('hidden');
        s7Screen.hidden = true;
        quizScreen.classList.remove('hidden');
        quizScreen.hidden = false;
    }
}

window.showScreen7TasksSort = function (roleId) {
    const quizScreen = document.getElementById('quiz-screen');
    const s7Screen = document.getElementById('screen7-tasks');

    if (quizScreen) quizScreen.classList.add('hidden');
    if (s7Screen) {
        s7Screen.hidden = false;
        s7Screen.classList.remove('hidden');
        const data = (typeof window.getScreen7DataForRole === 'function')
            ? window.getScreen7DataForRole(roleId)
            : (window.SCREEN7_DATA_BY_ROLE && window.SCREEN7_DATA_BY_ROLE[roleId]) || window.screen7Data;
        initScreen7Tasks(data);
    }
};

function buildSolutionLookup(solution) {
    const lookup = {};
    Object.entries(solution || {}).forEach(([bucketId, ids]) => {
        ids.forEach(id => {
            lookup[id] = bucketId;
        });
    });
    return lookup;
}
