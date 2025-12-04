/**
 * Main Game Logic
 * Handles initialization, orientation checks, and basic state management.
 */

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const orientationWarning = document.getElementById('orientation-warning');
    const gameShell = document.getElementById('game-shell');
    const startButton = document.getElementById('start-button');
    const backButton = document.getElementById('back-to-start');

    /**
     * Checks the window dimensions to determine orientation.
     * On mobile (< 900px), we ALLOW portrait mode.
     * On larger screens, we still recommend landscape.
     */
    function updateOrientationState() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const isMobile = width < 900;

        // On mobile: Always show game, no orientation warning
        if (isMobile) {
            orientationWarning.classList.add('hidden');
            gameShell.classList.remove('hidden');
            return;
        }

        // On desktop/tablet in portrait: Show warning
        if (width < height) {
            orientationWarning.classList.remove('hidden');
            gameShell.classList.add('hidden');
        } else {
            orientationWarning.classList.add('hidden');
            gameShell.classList.remove('hidden');
        }
    }

    /**
     * Handles the start button click.
     * Transitions to the Role Selection screen.
     */
    function handleGameStart() {
        const startScreen = document.getElementById('start-screen');
        const roleSelection = document.getElementById('role-selection');

        if (startScreen && roleSelection) {
            // Fade out start screen
            startScreen.style.opacity = '0';
            startScreen.style.transition = 'opacity 0.5s ease';

            setTimeout(() => {
                startScreen.classList.add('hidden');
                roleSelection.classList.remove('hidden');
                // Trigger reflow or just let CSS animation handle fade-in
            }, 500);
        }
    }

    // Role Profiles Data
    // Role Profiles Data (Loaded from gameData.js)

    // Scenario Data
    // Scenario Data (Loaded from gameData.js)

    let selectedRole = null;
    let selectedScenario = null;
    window.gameState = window.gameState || { scores: { values: 0, quiz: 0, tasks: 0 }, roleId: null };

    window.resetGameState = function () {
        selectedRole = null;
        selectedScenario = null;
        window.gameState = { scores: { values: 0, quiz: 0, tasks: 0 }, roleId: null };
    };

    // --- Helper Functions ---

    function getAvatarPath(roleId) {
        const avatarMap = {
            1: 'assets/avatar_max.png',
            2: 'assets/avatar_toni.png',
            3: 'assets/avatar_ahmed.png',
            4: 'assets/avatar_maria.png',
            5: 'assets/avatar_marcela.png'
        };
        return avatarMap[roleId] || '';
    }

    function getRoleColor(roleId) {
        const colorMap = {
            1: '40, 100, 240',
            2: '140, 80, 220',
            3: '20, 160, 120',
            4: '90, 120, 200',
            5: '240, 120, 50'
        };
        return colorMap[roleId] || '0, 0, 0';
    }

    function getQuizRoleTitle(roleId) {
        const roleNames = {
            1: "Max Sander, Facharbeiter in der Industrie",
            2: "Toni Botelli in der Personalberatung",
            3: "Ahmed Al-Hassan im Pflegeheim",
            4: "Maria Schmidt in der Stadtverwaltung",
            5: "Marcela Paz in der Werbeagentur"
        };
        return roleNames[roleId] || roleProfiles[roleId]?.name || "";
    }

    function getScenarioTitle(scenarioId) {
        const scenarioNames = {
            1: "Szenario 1: Wettbewerbsfähiges KI-Ökosystem",
            2: "Szenario 2: Zaungast der KI-Revolution",
            3: "Szenario 3: Starke Nischen-KI"
        };
        return scenarioNames[scenarioId] || "";
    }

    /**
     * Handles Role Selection
     */
    function handleRoleSelect(roleId) {
        selectedRole = roleId;
        window.gameState.roleId = roleId;

        // Visual feedback
        const cards = document.querySelectorAll('.role-card');
        cards.forEach(card => {
            if (card.dataset.role === roleId) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });

        // Show Next Button
        const footer = document.getElementById('role-selection-footer');
        if (footer) {
            footer.classList.remove('hidden');
        }
    }

    /**
     * Shows the Role Intro Screen
     */
    function showRoleIntro() {
        if (!selectedRole) return;

        const roleData = roleProfiles[selectedRole];
        const roleSelection = document.getElementById('role-selection');
        const roleIntro = document.getElementById('role-intro');

        // Populate Content
        document.getElementById('intro-role-name').textContent = roleData.name;
        document.getElementById('intro-role-sector').textContent = roleData.sector;
        document.getElementById('intro-summary').textContent = roleData.summary;

        // Dynamic Avatar
        const avatarDiv = document.querySelector('.role-intro-avatar');
        avatarDiv.style.backgroundImage = `url('${getAvatarPath(selectedRole)}')`;

        // Dynamic Color
        roleIntro.style.setProperty('--role-color', getRoleColor(selectedRole));

        // Populate Sections
        const sectionsContainer = document.getElementById('intro-sections');
        sectionsContainer.innerHTML = ''; // Clear previous

        roleData.sections.forEach(section => {
            const secDiv = document.createElement('div');
            secDiv.className = 'intro-section';

            const ul = document.createElement('ul');
            section.bullets.forEach(bullet => {
                const li = document.createElement('li');
                li.textContent = bullet;
                ul.appendChild(li);
            });

            secDiv.innerHTML = `
                <h3><span class="section-icon">${section.icon}</span> ${section.title}</h3>
            `;
            secDiv.appendChild(ul);
            sectionsContainer.appendChild(secDiv);
        });

        // Transition
        roleSelection.classList.add('hidden');
        roleIntro.classList.remove('hidden');
    }


    /**
     * Shows the Scenario Selection Screen (Screen 4)
     */
    function showScenarioSelection() {
        const roleIntro = document.getElementById('role-intro');
        const scenarioSelection = document.getElementById('scenario-selection');

        if (roleIntro && scenarioSelection) {
            roleIntro.classList.add('hidden');
            scenarioSelection.classList.remove('hidden');

            // Populate Avatar
            const avatarDiv = document.querySelector('.scenario-avatar');
            if (avatarDiv && selectedRole) {
                avatarDiv.style.backgroundImage = `url('${getAvatarPath(selectedRole)}')`;
            }
        }
    }

    // Scenario Selection Logic
    const scenarioCards = document.querySelectorAll('.scenario-card');
    const scenarioNextButton = document.getElementById('scenario-next-button');

    scenarioCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove active class from all
            scenarioCards.forEach(c => c.classList.remove('active'));

            // Add active class to clicked
            card.classList.add('active');
            selectedScenario = card.dataset.scenario;

            // Enable Next Button
            if (scenarioNextButton) {
                scenarioNextButton.disabled = false;
                scenarioNextButton.style.opacity = '1';
                scenarioNextButton.style.cursor = 'pointer';
            }
        });
    });

    /**
     * Renders the interactive sliders
     */
    function renderSliders(targets) {
        const container = document.getElementById('gl-sliders');
        if (!container) return; // Guard clause
        container.innerHTML = '';

        const sliderConfig = [
            { id: 'ki', label: 'KI-Eigenanteil', desc: 'Wie viel entwickelt die Firma selbst?' },
            { id: 'data', label: 'Daten-Reife', desc: 'Qualität/Verfügbarkeit passender Daten.' },
            { id: 'reliability', label: 'Zuverlässigkeit', desc: 'Wie stabil/verlässlich sind die KI-Ergebnisse?' },
            { id: 'training', label: 'Schulungskultur', desc: 'Wie oft und wie gut wird trainiert?' },
            { id: 'independence', label: 'Unabhängigkeit', desc: 'Wie frei ist man von einzelnen Anbietern?' },
            { id: 'bureaucracy', label: 'Bürokratie-Last', desc: 'Wie viel Papierkram/Compliance bremst.' }
        ];

        sliderConfig.forEach(config => {
            const card = document.createElement('div');
            card.className = 'slider-card';
            const isNegative = config.id === 'bureaucracy';
            if (isNegative) {
                card.classList.add('slider-negative');
            }
            card.dataset.id = config.id;
            card.dataset.target = targets[config.id];

            card.innerHTML = `
                <div class="slider-header">
                    <div class="slider-title">${config.label}</div>
                    <div class="slider-desc">${config.desc}</div>
                    <div class="slider-value-display">10</div>
                </div>
                <div class="slider-container">
                    <div class="slider-fill" style="width: 10%;"></div>
                    <div class="target-marker" style="left: ${targets[config.id]}%;"></div>
                    <div class="slider-endcap"></div>
                    <input type="range" min="0" max="100" value="10" class="game-slider">
                </div>
                <div class="result-text"></div>
                <div class="feedback-icon check">✓</div>
                <div class="feedback-icon cross">✕</div>
            `;

            container.appendChild(card);

            // Add Event Listener
            const input = card.querySelector('input');
            const fill = card.querySelector('.slider-fill');
            const display = card.querySelector('.slider-value-display');
            const endcap = card.querySelector('.slider-endcap');

            const updateSliderVisuals = (val) => {
                fill.style.width = val + '%';
                if (endcap) {
                    endcap.style.left = val + '%';
                }
                display.textContent = val;
            };

            // Initialize visuals
            updateSliderVisuals(input.value);

            input.addEventListener('input', (e) => {
                const val = e.target.value;
                updateSliderVisuals(val);
                card.dataset.userValue = val;
                checkAllSlidersMoved();
            });
        });

        // Reset Buttons
        const checkBtn = document.getElementById('gl-check-button');
        const nextBtn = document.getElementById('gl-next-button');
        if (checkBtn) {
            checkBtn.disabled = true;
            checkBtn.classList.remove('hidden');
        }
        if (nextBtn) {
            nextBtn.classList.add('hidden');
        }
    }

    function checkAllSlidersMoved() {
        // Check if all cards have dataset.userValue
        const cards = document.querySelectorAll('.slider-card');
        let count = 0;
        cards.forEach(c => {
            if (c.dataset.userValue) count++;
        });

        if (count === 6) {
            const checkBtn = document.getElementById('gl-check-button');
            if (checkBtn) checkBtn.disabled = false;
        }
    }

    /**
     * Checks the user's estimates against targets
     */
    function checkResults() {
        const cards = document.querySelectorAll('.slider-card');
        let correctCount = 0;

        cards.forEach(card => {
            const userVal = parseInt(card.dataset.userValue);
            const targetVal = parseInt(card.dataset.target);
            const diff = Math.abs(userVal - targetVal);

            const isCorrect = diff <= 15; // Tolerance

            if (isCorrect) {
                card.classList.add('correct');
                correctCount += 1;
            } else {
                card.classList.add('incorrect');
            }

            card.classList.add('checked');

            // Show Target Marker
            const marker = card.querySelector('.target-marker');
            marker.style.display = 'block';

            // Update Text
            const resultText = card.querySelector('.result-text');
            resultText.textContent = `Dein Tipp: ${userVal} | Richtig: ${targetVal}`;

            // Disable Input
            card.querySelector('input').disabled = true;
        });

        // Switch Buttons
        document.getElementById('gl-check-button').classList.add('hidden');
        document.getElementById('gl-next-button').classList.remove('hidden');

        // Save score for values (max 6)
        if (window.gameState && window.gameState.scores) {
            window.gameState.scores.values = correctCount;
        }
    }






    // Game Loop Next Button -> Quiz
    const glNextBtn = document.getElementById('gl-next-button');
    if (glNextBtn) {
        glNextBtn.addEventListener('click', showQuiz);
    }


    // Event Listeners
    window.addEventListener('resize', updateOrientationState);
    window.addEventListener('orientationchange', updateOrientationState);

    // Start Button
    if (startButton) {
        startButton.addEventListener('click', handleGameStart);
    }

    // Back Button (Role Selection -> Start)
    if (backButton) {
        backButton.addEventListener('click', () => {
            const startScreen = document.getElementById('start-screen');
            const roleSelection = document.getElementById('role-selection');
            const footer = document.getElementById('role-selection-footer');

            if (startScreen && roleSelection) {
                roleSelection.classList.add('hidden');
                startScreen.classList.remove('hidden');
                // Reset selection
                selectedRole = null;
                document.querySelectorAll('.role-card').forEach(c => c.classList.remove('active'));
                if (footer) footer.classList.add('hidden');
            }
        });
    }

    // Role Next Button (Selection -> Intro)
    const roleNextButton = document.getElementById('role-next-button');
    if (roleNextButton) {
        roleNextButton.addEventListener('click', showRoleIntro);
    }

    // Back Button (Intro -> Selection)
    const backToRolesBtn = document.getElementById('back-to-roles');
    if (backToRolesBtn) {
        backToRolesBtn.addEventListener('click', () => {
            const roleSelection = document.getElementById('role-selection');
            const roleIntro = document.getElementById('role-intro');

            roleIntro.classList.add('hidden');
            roleSelection.classList.remove('hidden');
        });
    }

    // Next Button (Intro -> Scenario Selection)
    const toScenarioBtn = document.getElementById('to-scenario');
    if (toScenarioBtn) {
        toScenarioBtn.addEventListener('click', showScenarioSelection);
    }

    // Back Button (Scenario -> Intro)
    const backToIntroBtn = document.getElementById('back-to-intro');
    if (backToIntroBtn) {
        backToIntroBtn.addEventListener('click', () => {
            document.getElementById('scenario-selection').classList.add('hidden');
            document.getElementById('role-intro').classList.remove('hidden');
        });
    }

    // Scenario Next Button (Scenario -> Game Loop)
    if (scenarioNextButton) {
        scenarioNextButton.addEventListener('click', () => {
            if (selectedScenario) {
                showGameLoop();
            } else {
                alert("Bitte wähle zuerst ein Szenario aus.");
            }
        });
    }

    /**
     * Shows the Game Loop Screen (Screen 5)
     */
    function showGameLoop() {
        if (!selectedRole || !selectedScenario) {
            console.error("Missing Role or Scenario");
            return;
        }

        const scenarioSelection = document.getElementById('scenario-selection');
        const gameLoop = document.getElementById('game-loop');
        const overlay = document.getElementById('transition-overlay');

        // 1. Transition Effect
        if (overlay) {
            overlay.classList.add('active');
        }

        setTimeout(() => {
            try {
                // Switch Screens behind overlay
                scenarioSelection.classList.add('hidden');
                gameLoop.classList.remove('hidden');

                // Populate Data
                if (!scenarioData[selectedRole] || !scenarioData[selectedRole][selectedScenario]) {
                    console.error("Missing scenario data for role/scenario", selectedRole, selectedScenario);
                    throw new Error("Missing Data");
                }

                const data = scenarioData[selectedRole][selectedScenario];
                document.getElementById('gl-scenario-title').textContent = data.title;

                // Set Scenario Subtitle
                const subtitleEl = document.getElementById('gl-scenario-subtitle');
                if (subtitleEl) {
                    subtitleEl.textContent = getScenarioTitle(selectedScenario);
                }

                const introEl = document.getElementById('gl-intro-text');
                if (introEl) {
                    introEl.innerHTML = `${data.intro}<div class="gl-callout">Schätze die Werte für dein Unternehmen:</div>`;
                }

                // Populate Avatar in Header
                const glAvatar = document.getElementById('gl-avatar');
                if (glAvatar) {
                    glAvatar.style.backgroundImage = `url('${getAvatarPath(selectedRole)}')`;
                    glAvatar.style.backgroundSize = '108%'; // Ensure crop fix
                    glAvatar.style.backgroundPosition = 'center';
                }

                // Render Sliders
                renderSliders(data.targets);
            } catch (e) {
                console.error("Error in Game Loop transition:", e);
                alert("Ein Fehler ist aufgetreten. Bitte lade die Seite neu.");
            } finally {
                // Hide Overlay faster
                setTimeout(() => {
                    if (overlay) {
                        overlay.classList.remove('active');
                    }
                }, 800); // Shorter wait
            }

        }, 600); // Shorter wait for fade in
    }

    // Game Loop Buttons
    const glCheckBtn = document.getElementById('gl-check-button');
    if (glCheckBtn) {
        glCheckBtn.addEventListener('click', checkResults);
    }

    const glBackBtn = document.getElementById('gl-back-button');
    if (glBackBtn) {
        glBackBtn.addEventListener('click', () => {
            document.getElementById('game-loop').classList.add('hidden');
            document.getElementById('scenario-selection').classList.remove('hidden');
        });
    }

    // Enter key handler
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const startScreen = document.getElementById('start-screen');
            if (startScreen && !startScreen.classList.contains('hidden') && !gameShell.classList.contains('hidden')) {
                handleGameStart();
            }
        }
    });

    // Role Cards
    const roleCards = document.querySelectorAll('.role-card');
    roleCards.forEach(card => {
        card.addEventListener('click', () => {
            const roleId = card.dataset.role;
            handleRoleSelect(roleId);
        });
    });

    // Quiz Data
    // Quiz Data (Loaded from gameData.js)

    // Fill other roles with generic questions if needed, or copy structure. 
    // For this task, I'll ensure at least the structure exists to prevent crashes.
    // In a real app, we'd have all questions. I'll add a helper to get questions safely.

    function getQuizQuestions(role, scenario) {
        if (quizData[role] && quizData[role][scenario]) {
            return quizData[role][scenario];
        }
        return [];
    }

    let currentQuestionIndex = 0;
    let currentQuestions = [];
    let selectedOption = null;
    let quizAnswered = [];
    let quizSelections = [];
    let quizWasCorrect = [];
    let quizFeedbacks = [];

    function showQuiz() {
        const gameLoop = document.getElementById('game-loop');
        const quizScreen = document.getElementById('quiz-screen');

        gameLoop.classList.add('hidden');
        quizScreen.classList.remove('hidden');

        // Setup Header
        document.getElementById('quiz-role-title').textContent = getQuizRoleTitle(selectedRole);
        document.getElementById('quiz-scenario-title').textContent = getScenarioTitle(selectedScenario);

        // Set Avatar
        const quizAvatar = document.getElementById('quiz-avatar');
        if (quizAvatar) {
            quizAvatar.style.backgroundImage = `url('${getAvatarPath(selectedRole)}')`;
            quizAvatar.style.backgroundSize = '108%';
            quizAvatar.style.backgroundPosition = 'center';
        }

        // Load Questions
        currentQuestions = getQuizQuestions(selectedRole, selectedScenario);
        currentQuestionIndex = 0;
        quizAnswered = Array(currentQuestions.length).fill(false);
        quizSelections = Array(currentQuestions.length).fill(null);
        quizWasCorrect = Array(currentQuestions.length).fill(false);
        quizFeedbacks = Array(currentQuestions.length).fill('');
        renderQuestion();
    }

    function renderQuestion() {
        const questionData = currentQuestions[currentQuestionIndex];
        const scored = quizAnswered[currentQuestionIndex];
        const wasCorrect = quizWasCorrect[currentQuestionIndex];
        const selectedKey = quizSelections[currentQuestionIndex];

        document.getElementById('quiz-question-text').textContent = `${currentQuestionIndex + 1}) ${questionData.question}`;

        const questionContainer = document.querySelector('.quiz-question-container');
        if (questionContainer) {
            questionContainer.classList.remove('correct-state', 'incorrect-state');
            if (scored) {
                questionContainer.classList.add(wasCorrect ? 'correct-state' : 'incorrect-state');
            }
        }

        const optionsContainer = document.getElementById('quiz-options-container');
        optionsContainer.innerHTML = '';
        selectedOption = null;

        Object.entries(questionData.options).forEach(([key, text]) => {
            const btn = document.createElement('div');
            btn.className = 'quiz-option';
            btn.dataset.key = key;
            btn.textContent = `${key}) ${text}`; // Add A) B) C) prefix

            if (scored) {
                btn.classList.add('disabled');
                if (key === questionData.correctAnswer) {
                    btn.classList.add(wasCorrect ? 'correct' : 'correct-highlight');
                } else if (selectedKey === key && !wasCorrect) {
                    btn.classList.add('incorrect');
                }
            } else {
                btn.addEventListener('click', () => selectOption(key, btn));
            }

            optionsContainer.appendChild(btn);
        });

        const checkBtn = document.getElementById('quiz-check-btn');
        const nextBtn = document.getElementById('quiz-next-btn');
        const feedbackEl = document.getElementById('quiz-feedback');

        if (feedbackEl) {
            if (scored) {
                feedbackEl.textContent = quizFeedbacks[currentQuestionIndex] || '';
                feedbackEl.className = `quiz-feedback ${wasCorrect ? 'correct-text' : 'incorrect-text'}`;
                feedbackEl.classList.remove('hidden');
            } else {
                feedbackEl.classList.add('hidden');
            }
        }

        if (checkBtn) checkBtn.classList.toggle('hidden', scored);
        if (nextBtn) nextBtn.classList.toggle('hidden', !scored);

        // Update Button Text
        if (currentQuestionIndex === currentQuestions.length - 1) {
            nextBtn.innerHTML = 'Weiter ▶';
        } else {
            nextBtn.innerHTML = 'Nächste Frage ▶';
        }
    }

    function selectOption(key, btnElement) {
        if (document.getElementById('quiz-check-btn').classList.contains('hidden')) return; // Already checked

        selectedOption = key;
        document.querySelectorAll('.quiz-option').forEach(b => b.classList.remove('selected'));
        btnElement.classList.add('selected');
    }

    function checkQuizAnswer() {
        if (!selectedOption) {
            alert("Bitte wähle eine Antwort aus.");
            return;
        }

        const questionData = currentQuestions[currentQuestionIndex];
        const isCorrect = selectedOption === questionData.correctAnswer;
        const feedbackEl = document.getElementById('quiz-feedback');
        const questionContainer = document.querySelector('.quiz-question-container');

        // Update Container State
        if (questionContainer) {
            questionContainer.classList.remove('correct-state', 'incorrect-state');
            questionContainer.classList.add(isCorrect ? 'correct-state' : 'incorrect-state');
        }

        // Update UI
        document.querySelectorAll('.quiz-option').forEach(btn => {
            btn.classList.remove('selected'); // Remove selection style to show result clearly

            if (btn.dataset.key === questionData.correctAnswer) {
                if (isCorrect) {
                    btn.classList.add('correct');
                } else {
                    btn.classList.add('correct-highlight'); // Highlight correct answer if user was wrong
                }
            } else if (btn.dataset.key === selectedOption && !isCorrect) {
                btn.classList.add('incorrect');
            }
        });

        quizAnswered[currentQuestionIndex] = true;
        quizSelections[currentQuestionIndex] = selectedOption;
        quizWasCorrect[currentQuestionIndex] = isCorrect;
        quizFeedbacks[currentQuestionIndex] = questionData.explanation;

        feedbackEl.textContent = questionData.explanation;
        feedbackEl.className = `quiz-feedback ${isCorrect ? 'correct-text' : 'incorrect-text'}`; // Add color class
        feedbackEl.classList.remove('hidden');

        const checkBtnEl = document.getElementById('quiz-check-btn');
        const nextBtnEl = document.getElementById('quiz-next-btn');
        if (checkBtnEl) checkBtnEl.classList.add('hidden');
        if (nextBtnEl) nextBtnEl.classList.remove('hidden');

        // Score counting (only once per question)
        if (isCorrect && window.gameState && window.gameState.scores && quizAnswered[currentQuestionIndex] === false) {
            window.gameState.scores.quiz = (window.gameState.scores.quiz || 0) + 1;
        }
    }

    const FEATURE_SCREEN7_TASKSORT = true;

    function nextQuestion() {
        if (currentQuestionIndex < currentQuestions.length - 1) {
            currentQuestionIndex++;
            renderQuestion();
        } else {
            if (FEATURE_SCREEN7_TASKSORT && typeof window.gotoScreen7TasksForRole === 'function') {
                window.gotoScreen7TasksForRole(selectedRole);
            } else {
                showTaetigkeitenScreen();
            }
        }
    }

    function showTaetigkeitenScreen() {
        const quizScreen = document.getElementById('quiz-screen');
        const taetigkeitenScreen = document.getElementById('taetigkeiten-screen');

        quizScreen.classList.add('hidden');
        taetigkeitenScreen.classList.remove('hidden');

        // Setup Header (reuse logic from showQuiz or similar)
        document.getElementById('taetigkeiten-role-title').textContent = getQuizRoleTitle(selectedRole);

        // Set Avatar
        const taetigkeitenAvatar = document.getElementById('taetigkeiten-avatar');
        if (taetigkeitenAvatar) {
            taetigkeitenAvatar.style.backgroundImage = `url('${getAvatarPath(selectedRole)}')`;
            taetigkeitenAvatar.style.backgroundSize = '108%';
            taetigkeitenAvatar.style.backgroundPosition = 'center';
        }
    }

    // Quiz Event Listeners
    const quizCheckBtn = document.getElementById('quiz-check-btn');
    if (quizCheckBtn) {
        quizCheckBtn.addEventListener('click', checkQuizAnswer);
    }

    const quizNextBtn = document.getElementById('quiz-next-btn');
    if (quizNextBtn) {
        quizNextBtn.addEventListener('click', nextQuestion);
    }

    const quizBackBtn = document.getElementById('quiz-back-btn');
    if (quizBackBtn) {
        quizBackBtn.addEventListener('click', () => {
            if (currentQuestionIndex > 0) {
                currentQuestionIndex -= 1;
                renderQuestion();
            } else {
                document.getElementById('quiz-screen').classList.add('hidden');
                document.getElementById('game-loop').classList.remove('hidden');
            }
        });
    }

    // Taetigkeiten Screen Event Listeners
    const taetigkeitenBackBtn = document.getElementById('taetigkeiten-back-btn');
    if (taetigkeitenBackBtn) {
        taetigkeitenBackBtn.addEventListener('click', () => {
            document.getElementById('taetigkeiten-screen').classList.add('hidden');
            document.getElementById('quiz-screen').classList.remove('hidden');
        });
    }

    const taetigkeitenCheckBtn = document.getElementById('taetigkeiten-check-btn');
    if (taetigkeitenCheckBtn) {
        taetigkeitenCheckBtn.addEventListener('click', () => {
            alert("Prüfen Funktion noch nicht implementiert.");
            // Placeholder: Show next button
            document.getElementById('taetigkeiten-check-btn').classList.add('hidden');
            document.getElementById('taetigkeiten-next-btn').classList.remove('hidden');
        });
    }

    const taetigkeitenNextBtn = document.getElementById('taetigkeiten-next-btn');
    if (taetigkeitenNextBtn) {
        taetigkeitenNextBtn.addEventListener('click', () => {
            alert("Weiter zum nächsten Screen (noch nicht implementiert).");
        });
    }



    // Initial check
    updateOrientationState();
});

// Helper: goto Screen 7 (Tasks Sort) for a given role
window.gotoScreen7TasksForRole = function (roleId) {
    const quiz = document.getElementById("quiz-screen");
    if (quiz) quiz.classList.add("hidden");

    const oldT = document.getElementById("taetigkeiten-screen");
    if (oldT) oldT.classList.add("hidden");

    const s7 = document.getElementById("screen7-tasks");
    if (s7) s7.classList.remove("hidden");

    if (typeof window.renderScreen7ForRole === "function") {
        window.renderScreen7ForRole(roleId);
    }
};

