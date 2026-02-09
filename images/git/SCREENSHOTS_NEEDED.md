# Git Module Screenshots Needed

This document lists all screenshots required for Module 9 (Git & GitHub). Each screenshot has a filename, description, and capture instructions.

## GitHub Repository Creation Screenshots

### 1. `github-new-repo-button.png`
**What to capture:** GitHub interface showing the + icon in the top navigation bar, with the dropdown open showing "New repository" option.
**How to get it:**
1. Log into GitHub
2. Click the + icon in the top-right corner
3. Screenshot the dropdown before clicking "New repository"

### 2. `github-repo-visibility.png`
**What to capture:** The visibility section of the new repository form, showing Public and Private radio buttons with their descriptions.
**How to get it:**
1. Go to github.com/new
2. Scroll to the visibility section
3. Capture just the Public/Private radio buttons and descriptions

### 3. `github-repo-init-options.png`
**What to capture:** The initialization options at the bottom of the new repo form: README checkbox, .gitignore dropdown (with Python selected), and License dropdown (with MIT License selected).
**How to get it:**
1. Go to github.com/new
2. Scroll to the bottom section
3. Check "Add a README file"
4. Select "Python" from .gitignore dropdown
5. Select "MIT License" from license dropdown
6. Screenshot this section

### 4. `github-create-repo-button.png`
**What to capture:** The green "Create repository" button at the very bottom of the form.
**How to get it:**
1. At github.com/new
2. Crop to show just the "Create repository" button

### 5. `github-new-repo-page.png`
**What to capture:** The ENTIRE new repository form, showing all options filled in as recommended.
**How to get it:**
1. Go to github.com/new
2. Fill in: a sample name like "my-research-project", a description, Private selected, all init options checked
3. Take a full-page screenshot

## VS Code Cloning Screenshots

### 6. `vscode-source-control-icon.png`
**What to capture:** VS Code sidebar with the Source Control icon highlighted/circled.
**How to get it:**
1. Open VS Code without a folder open
2. Screenshot the left sidebar
3. Highlight or circle the Source Control icon (branch-like icon)

### 7. `vscode-clone-repository-button.png`
**What to capture:** VS Code Source Control panel (when no repo is open) showing the "Clone Repository" button.
**How to get it:**
1. Open VS Code with no folder
2. Click Source Control icon
3. Screenshot showing the "Clone Repository" button

### 8. `github-code-button-url.png`
**What to capture:** A GitHub repository page with the green "Code" button clicked, showing the dropdown with the HTTPS URL and copy button.
**How to get it:**
1. Go to any GitHub repository
2. Click the green "Code" button
3. Make sure "HTTPS" tab is selected
4. Screenshot the dropdown

### 9. `vscode-clone-url-input.png`
**What to capture:** VS Code command palette showing the input field where you paste the repository URL.
**How to get it:**
1. In VS Code, click "Clone Repository"
2. Screenshot the input field at the top

### 10. `vscode-clone-folder-select.png`
**What to capture:** The file browser dialog that appears when choosing where to save the cloned repo.
**How to get it:**
1. In VS Code cloning flow, after entering URL
2. Screenshot the folder selection dialog

### 11. `vscode-open-cloned-repo.png`
**What to capture:** The VS Code notification/dialog asking "Would you like to open the cloned repository?" with the Open button.
**How to get it:**
1. Complete a clone operation
2. Screenshot the notification before clicking

## VS Code Git Integration Screenshots

### 12. `vscode-git-integration-overview.png`
**What to capture:** VS Code with a Git repo open, showing multiple Git features at once:
- Source Control panel with some staged and unstaged files
- File explorer showing M (modified) and U (untracked) indicators
- Status bar showing current branch name
- Editor showing gutter indicators (green/blue bars for changed lines)
**How to get it:**
1. Open a Git repo in VS Code
2. Make changes to a file and create a new file
3. Stage one file but not the other
4. Arrange windows to show all features
5. Add annotations/callouts if possible

### 13. `vscode-source-control-panel-detail.png`
**What to capture:** A detailed view of the Source Control panel showing:
- "Staged Changes" section with files
- "Changes" section with files
- The commit message text box
- The checkmark (commit) button
**How to get it:**
1. Have a repo with both staged and unstaged changes
2. Screenshot just the Source Control panel

### 14. `vscode-staging-files.png`
**What to capture:** VS Code Source Control panel showing a file being staged - ideally showing the hover state with the + button visible next to a file.
**How to get it:**
1. Have unstaged changes
2. Hover over a file to show the + button
3. Screenshot showing the + button

---

## Screenshot Guidelines

- **Resolution:** Use high resolution (Retina/2x if available)
- **Format:** PNG for all screenshots
- **Size:** Aim for ~800-1200px width when displayed
- **Annotations:** Add red boxes, arrows, or numbered callouts to highlight key UI elements when helpful
- **Privacy:** Use a test repository with generic names, no personal info
- **Consistency:** Use the same VS Code theme throughout (preferably default dark or light theme)
- **Cropping:** Crop to show only relevant UI elements, remove unnecessary chrome

## Tools for Screenshots

- macOS: Cmd+Shift+4 (selection) or Cmd+Shift+5 (options)
- Windows: Win+Shift+S (Snip & Sketch)
- Browser extension: "Full Page Screen Capture" for full-page GitHub screenshots
- Annotation: Preview (macOS), Snagit, or any image editor

## After Adding Screenshots

After adding all screenshots, test the module by opening `modules/09-github.html` in a browser to verify:
1. All images load correctly
2. Images are appropriately sized
3. Captions match the screenshots
4. Screenshots effectively illustrate the steps described in the text
