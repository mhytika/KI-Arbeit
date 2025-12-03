
import os

file_path = r"c:/Users/tobia/OneDrive/Coding/06 NEU Versuch/styles.css"
new_css = """
#role-next-button:hover {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

/* Role Intro Screen (Screen 3) - NUCLEAR FIX v6 */
#role-intro {
    display: flex !important;
    flex-direction: column !important;
    width: 100% !important;
    height: 100% !important;
    max-width: 1000px !important;
    margin: 0 auto !important;
    padding: 1rem !important;
    overflow-y: auto !important;
}

/* Header: Row Layout forced */
#role-intro .role-intro-header {
    display: flex !important;
    flex-direction: row !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 1.5rem !important;
    margin-bottom: 1rem !important;
    padding-bottom: 1rem !important;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
    text-align: left !important;
}

/* Avatar: Fixed size */
#role-intro .role-intro-avatar {
    width: 60px !important;
    height: 60px !important;
    border-radius: 50% !important;
    background-size: cover !important;
    background-position: center !important;
    background-repeat: no-repeat !important;
    flex-shrink: 0 !important;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3) !important;
    border: 2px solid rgba(255, 255, 255, 0.1) !important;
}

#role-intro .role-intro-title h2 {
    font-size: 2rem !important;
    margin: 0 0 0.2rem 0 !important;
    color: var(--text-primary) !important;
}

#role-intro .role-intro-title span {
    font-size: 1.1rem !important;
    color: rgb(var(--role-color)) !important;
    font-weight: 600 !important;
}

#role-intro .role-intro-content {
    flex: 1 !important;
    display: flex !important;
    flex-direction: column !important;
    gap: 1rem !important;
}

#role-intro .intro-summary {
    font-size: 1rem !important;
    line-height: 1.5 !important;
    color: var(--text-primary) !important;
    background: rgba(255, 255, 255, 0.05) !important;
    padding: 1rem !important;
    border-radius: 12px !important;
    border-left: 4px solid rgb(var(--role-color)) !important;
}

#role-intro .intro-sections {
    display: grid !important;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)) !important;
    gap: 1rem !important;
}

#role-intro .intro-section {
    background: var(--bg-card) !important;
    padding: 1rem !important;
    border-radius: 12px !important;
    border: 1px solid rgba(255, 255, 255, 0.05) !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
}

#role-intro .intro-section h3 {
    font-size: 1.1rem !important;
    margin: 0 0 0.8rem 0 !important;
    color: rgb(var(--role-color)) !important;
    display: flex !important;
    align-items: center !important;
    gap: 0.8rem !important;
    justify-content: center !important;
}

#role-intro .section-icon {
    width: 32px !important;
    height: 32px !important;
    background: rgba(255, 255, 255, 0.1) !important;
    border-radius: 8px !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    font-size: 1.2rem !important;
}

#role-intro .intro-section ul {
    margin: 0 !important;
    padding: 0 !important;
    color: var(--text-secondary) !important;
    line-height: 1.5 !important;
    list-style-position: inside !important;
    text-align: left !important;
}

#role-intro .intro-section li {
    margin-bottom: 0.5rem !important;
}

#role-intro .role-intro-footer {
    margin-top: 0.5rem !important;
    padding-top: 0.5rem !important;
    border-top: 1px solid rgba(255, 255, 255, 0.1) !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    gap: 1rem !important;
}

#role-intro .intro-hint {
    color: var(--text-secondary) !important;
    text-align: center !important;
    max-width: 600px !important;
}

#role-intro .footer-buttons {
    display: flex !important;
    gap: 1rem !important;
    width: 100% !important;
    justify-content: center !important;
}

#role-intro .footer-buttons button {
    flex: 1 !important;
    max-width: 250px !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    padding: 0.8rem 2rem !important;
    font-size: 1rem !important;
    border-radius: 12px !important;
    color: var(--text-primary) !important;
    cursor: pointer !important;
    transition: all 0.3s ease !important;
    min-width: 160px !important;
    gap: 0.5rem !important;
}

#role-intro::-webkit-scrollbar {
    width: 8px;
}

#role-intro::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
}

#role-intro::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
}

#role-intro::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.3);
}
"""

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Keep lines 0 to 1238 (inclusive, so up to index 1238, which is line 1239)
# Actually, line 1238 in 1-based index is index 1237.
# We want to keep up to the closing brace of #role-next-button which is line 1237.
# Line 1238 is empty or whitespace?
# Let's check the content of line 1237.
# Step 927: 1237:     }
# So we keep up to index 1238 (which includes line 1238).

clean_lines = lines[:1238]
content = "".join(clean_lines) + "\n" + new_css

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Successfully repaired styles.css")
