
import os

file_path = r"c:/Users/tobia/OneDrive/Coding/06 NEU Versuch/main.js"

# The new content to append (showScenarioSelection + Event Listeners)
new_js_logic = """
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
            const avatarMap = {
                1: 'assets/avatar_max.png',
                2: 'assets/avatar_toni.png',
                3: 'assets/avatar_ahmed.png',
                4: 'assets/avatar_maria.png',
                5: 'assets/avatar_marcela.png'
            };
            
            const avatarDiv = document.querySelector('.scenario-avatar');
            if (avatarDiv && selectedRole) {
                avatarDiv.style.backgroundImage = `url('${avatarMap[selectedRole]}')`;
            }
        }
    }

    // Scenario Selection Logic
    let selectedScenario = null;
    const scenarioCards = document.querySelectorAll('.scenario-card');
    const scenarioNextBtn = document.getElementById('start-game');

    scenarioCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove active class from all
            scenarioCards.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked
            card.classList.add('active');
            selectedScenario = card.dataset.scenario;
            
            // Enable Next Button (optional visual cue)
            if (scenarioNextBtn) {
                scenarioNextBtn.style.opacity = '1';
                scenarioNextBtn.style.cursor = 'pointer';
            }
        });
    });

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

    // Start Game Button (Scenario -> Game)
    if (scenarioNextBtn) {
        scenarioNextBtn.addEventListener('click', () => {
            if (selectedScenario) {
                alert(`Spiel startet mit Rolle ${selectedRole} und Szenario ${selectedScenario}`);
                // TODO: Implement Game Start Logic
            } else {
                alert("Bitte wähle zuerst ein Szenario aus.");
            }
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

    // Initial check
    updateOrientationState();
});
"""

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Truncate at line 334 (index 333)
# Line 334 in 1-based index is index 333
# We want to keep lines 0 to 333 (inclusive of 333? No, 334 starts the Event Listeners comment)
# Line 333 is empty or closing brace of showRoleIntro?
# Let's check the content again.
# Line 332:     }
# Line 333: 
# Line 334:     // Event Listeners

clean_lines = lines[:333] 
content = "".join(clean_lines) + new_js_logic

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Successfully repaired main.js (v2)")
