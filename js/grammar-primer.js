/**
 * Code Grammar Primer — Interactive Flashcard Exercises
 *
 * Helps students understand code composition through card-based learning.
 * Two modes:
 *   BUILD — Given descriptions, construct the code (forward)
 *   READ  — Given code, identify what each piece does (reverse)
 *
 * Each code token becomes a flippable card showing either its grammatical
 * role (what it IS) or the actual code (what you WRITE). Students must
 * think before flipping — the brief pause builds retrieval practice.
 */
(function () {
  'use strict';

  // ─── Initialization ───────────────────────────────────────────

  function init() {
    document.querySelectorAll('.grammar-primer').forEach(initPrimer);
  }

  function initPrimer(container) {
    var scriptEl = container.querySelector('script[type="application/json"]');
    if (!scriptEl) return;

    var data;
    try {
      data = JSON.parse(scriptEl.textContent);
    } catch (e) {
      console.error('[Code Grammar] Invalid JSON:', e);
      return;
    }

    var state = {
      mode: 'build',
      exerciseIndex: 0,
      revealed: new Set(),
      lang: localStorage.getItem('preferredLang') || 'python',
      exercises: data.exercises || [],
      container: container,
      scriptEl: scriptEl
    };

    render(state);
  }

  // ─── Main Render ──────────────────────────────────────────────

  function render(state) {
    var container = state.container;
    var scriptEl = state.scriptEl;
    var exercises = state.exercises;
    var idx = state.exerciseIndex;
    var mode = state.mode;
    var lang = state.lang;
    var revealed = state.revealed;

    // Preserve JSON data element
    container.innerHTML = '';
    container.appendChild(scriptEl);

    if (exercises.length === 0) return;

    var ex = exercises[idx];
    // Resolve language: try current, fall back to python, then first available
    var tokens = ex.languages[lang]
      || ex.languages['python']
      || ex.languages[Object.keys(ex.languages)[0]]
      || [];
    if (tokens.length === 0) return;

    // ── Header ──────────────────────────────────────────────
    var header = ce('div', 'gp-header');

    var titleRow = ce('div', 'gp-title-row');
    var title = ce('div', 'gp-title');
    title.textContent = 'Code Grammar';
    titleRow.appendChild(title);

    // Mode toggle
    var toggle = ce('div', 'gp-mode-toggle');
    var modes = [
      { key: 'build', label: 'Build', tip: 'See descriptions, figure out the code' },
      { key: 'read',  label: 'Read',  tip: 'See code, figure out what each piece does' }
    ];
    modes.forEach(function (m) {
      var btn = ce('button', 'gp-mode-btn' + (mode === m.key ? ' active' : ''));
      btn.textContent = m.label;
      btn.title = m.tip;
      btn.addEventListener('click', function () {
        state.mode = m.key;
        state.revealed = new Set();
        render(state);
      });
      toggle.appendChild(btn);
    });
    titleRow.appendChild(toggle);
    header.appendChild(titleRow);

    // Exercise navigation (dots + arrows)
    if (exercises.length > 1) {
      var nav = ce('div', 'gp-nav');

      var prevBtn = ce('button', 'gp-nav-btn');
      prevBtn.innerHTML = '&#8592;';
      prevBtn.disabled = idx === 0;
      prevBtn.addEventListener('click', function () {
        state.exerciseIndex--;
        state.revealed = new Set();
        render(state);
      });

      var dots = ce('div', 'gp-dots');
      exercises.forEach(function (_, i) {
        var dot = ce('button', 'gp-dot' + (i === idx ? ' active' : ''));
        dot.addEventListener('click', function () {
          state.exerciseIndex = i;
          state.revealed = new Set();
          render(state);
        });
        dots.appendChild(dot);
      });

      var nextBtn = ce('button', 'gp-nav-btn');
      nextBtn.innerHTML = '&#8594;';
      nextBtn.disabled = idx === exercises.length - 1;
      nextBtn.addEventListener('click', function () {
        state.exerciseIndex++;
        state.revealed = new Set();
        render(state);
      });

      nav.appendChild(prevBtn);
      nav.appendChild(dots);
      nav.appendChild(nextBtn);
      header.appendChild(nav);
    }

    container.appendChild(header);

    // ── Language tabs ────────────────────────────────────────
    var langBar = ce('div', 'gp-lang-bar');
    var langNames = { python: 'Python', stata: 'Stata', r: 'R' };
    ['python', 'stata', 'r'].forEach(function (l) {
      if (!ex.languages[l]) return;
      var btn = ce('button', 'gp-lang-btn' + (lang === l ? ' active' : ''));
      btn.textContent = langNames[l] || l;
      btn.addEventListener('click', function () {
        state.lang = l;
        state.revealed = new Set();
        render(state);
      });
      langBar.appendChild(btn);
    });
    container.appendChild(langBar);

    // ── Instruction ─────────────────────────────────────────
    var instruction = ce('div', 'gp-instruction');
    var modeLabel = mode === 'build'
      ? '<span class="gp-mode-label">Build this:</span> '
      : '<span class="gp-mode-label">Read this:</span> ';
    instruction.innerHTML = modeLabel + ex.instruction;
    container.appendChild(instruction);

    // ── Pattern hint (build mode only) ──────────────────────
    if (mode === 'build' && ex.pattern) {
      var pattern = ce('div', 'gp-pattern');
      pattern.innerHTML = 'Pattern: <code>' + escapeHtml(ex.pattern) + '</code>';
      container.appendChild(pattern);
    }

    // ── Card grid ───────────────────────────────────────────
    var grid = ce('div', 'gp-grid');

    tokens.forEach(function (token, i) {
      var isRevealed = revealed.has(i);
      var card = ce('div', 'gp-card' + (isRevealed ? ' flipped' : ''));
      card.setAttribute('data-color', token.color || 'text');

      var inner = ce('div', 'gp-card-inner');

      // Front face (what you see before clicking)
      var front = ce('div', 'gp-card-front');
      if (mode === 'build') {
        // Build: front shows role + description
        var roleEl = ce('div', 'gp-role');
        roleEl.textContent = token.role;
        front.appendChild(roleEl);
        if (token.tip) {
          var tipEl = ce('div', 'gp-tip');
          tipEl.textContent = token.tip;
          front.appendChild(tipEl);
        }
      } else {
        // Read: front shows the code token
        var codeEl = ce('code', 'gp-code');
        codeEl.textContent = token.code;
        front.appendChild(codeEl);
      }

      // Back face (what you see after flipping)
      var back = ce('div', 'gp-card-back');
      if (mode === 'build') {
        // Build: back reveals the code
        var codeBack = ce('code', 'gp-code');
        codeBack.textContent = token.code;
        back.appendChild(codeBack);
        var roleSmall = ce('div', 'gp-role-small');
        roleSmall.textContent = token.role;
        back.appendChild(roleSmall);
      } else {
        // Read: back reveals the description
        var roleBack = ce('div', 'gp-role');
        roleBack.textContent = token.role;
        back.appendChild(roleBack);
        if (token.tip) {
          var tipBack = ce('div', 'gp-tip');
          tipBack.textContent = token.tip;
          back.appendChild(tipBack);
        }
      }

      inner.appendChild(front);
      inner.appendChild(back);
      card.appendChild(inner);

      // Click to flip
      if (!isRevealed) {
        card.addEventListener('click', function handler() {
          card.removeEventListener('click', handler);
          state.revealed.add(i);
          card.classList.add('flipped');

          // Update progress bar
          updateProgress(state, tokens.length);

          // Check if all cards are revealed
          if (state.revealed.size === tokens.length) {
            setTimeout(function () {
              showCompletion(state, ex, tokens);
            }, 500);
          }
        });
      }

      grid.appendChild(card);
    });

    container.appendChild(grid);

    // ── Progress bar ────────────────────────────────────────
    var progressWrap = ce('div', 'gp-progress');
    var bar = ce('div', 'gp-progress-bar');
    var fill = ce('div', 'gp-progress-fill');
    fill.style.width = (revealed.size / tokens.length * 100) + '%';
    bar.appendChild(fill);
    progressWrap.appendChild(bar);

    var countEl = ce('span', 'gp-progress-count');
    countEl.textContent = revealed.size + ' / ' + tokens.length;
    progressWrap.appendChild(countEl);

    container.appendChild(progressWrap);

    // ── Controls ────────────────────────────────────────────
    var controls = ce('div', 'gp-controls');

    var revealBtn = ce('button', 'gp-btn gp-btn-reveal');
    revealBtn.textContent = 'Reveal All';
    revealBtn.addEventListener('click', function () {
      tokens.forEach(function (_, i) { state.revealed.add(i); });
      render(state);
      setTimeout(function () {
        showCompletion(state, ex, tokens);
      }, 300);
    });

    var resetBtn = ce('button', 'gp-btn gp-btn-reset');
    resetBtn.textContent = 'Reset';
    resetBtn.addEventListener('click', function () {
      state.revealed = new Set();
      render(state);
    });

    controls.appendChild(revealBtn);
    controls.appendChild(resetBtn);
    container.appendChild(controls);

    // Show completion if all already revealed (e.g. after Reveal All re-render)
    if (revealed.size === tokens.length) {
      setTimeout(function () {
        showCompletion(state, ex, tokens);
      }, 100);
    }
  }

  // ─── Progress Update (without full re-render) ─────────────────

  function updateProgress(state, total) {
    var fill = state.container.querySelector('.gp-progress-fill');
    var count = state.container.querySelector('.gp-progress-count');
    if (fill) fill.style.width = (state.revealed.size / total * 100) + '%';
    if (count) count.textContent = state.revealed.size + ' / ' + total;
  }

  // ─── Completion panel ─────────────────────────────────────────

  function showCompletion(state, ex, tokens) {
    if (state.container.querySelector('.gp-complete')) return;

    var complete = ce('div', 'gp-complete');

    var assembled = ce('div', 'gp-assembled');

    var label = ce('div', 'gp-assembled-label');
    label.textContent = state.mode === 'build'
      ? 'You built it:'
      : 'Full breakdown:';
    assembled.appendChild(label);

    var pre = ce('pre', 'gp-assembled-code');
    var code = ce('code', '');
    code.textContent = tokens.map(function (t) { return t.code; }).join('');
    pre.appendChild(code);
    assembled.appendChild(pre);

    // Structure note — the "big picture" explanation
    if (ex.structureNote) {
      var note = ce('div', 'gp-structure-note');
      note.innerHTML = ex.structureNote;
      assembled.appendChild(note);
    }

    complete.appendChild(assembled);
    state.container.appendChild(complete);

    // Animate in
    requestAnimationFrame(function () {
      complete.classList.add('visible');
    });
  }

  // ─── Utilities ────────────────────────────────────────────────

  function ce(tag, className) {
    var el = document.createElement(tag);
    if (className) el.className = className;
    return el;
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // ─── Bootstrap ────────────────────────────────────────────────

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
