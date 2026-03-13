/**
 * Practice Lab — Interactive Exercise Engine
 *
 * Powers the Practice Lab module for the Programming for Economics Research
 * course. Supports five exercise types:
 *   - read    : Read & Interpret (MCQ)
 *   - bug     : Spot the Bug (MCQ)
 *   - reorder : Reorder Code (drag-and-drop / click-to-swap)
 *   - fill    : Fill the Gap (text inputs inside code)
 *   - match   : Cross-Language Match (pair matching)
 *
 * Exercise data comes from practice-data.js which defines
 * window.PRACTICE_EXERCISES.
 */
(function () {
  'use strict';

  // ─── State ────────────────────────────────────────────────────────
  var state = {
    topic: null,
    level: null,
    exercises: [],
    currentIndex: 0,
    answers: [],
    score: 0,
    // For match type: track wrong attempts per exercise
    matchWrongAttempts: {},
    // For match type: track currently selected left item
    matchSelectedLeft: null,
    // For reorder type: track click-to-swap selection
    reorderSelectedIndex: null,
    // ─── Gamification state ───────────────────────────────────────
    streak: 0,
    maxStreak: 0,
    totalPoints: 0,
    pointsPerExercise: [],
    timedMode: false,
    timerInterval: null,
    timerRemaining: 0,
    exerciseTimes: []
  };

  // ─── Constants ────────────────────────────────────────────────────
  var MAX_EXERCISES = 8;
  var OPTION_LETTERS = ['A', 'B', 'C', 'D'];
  var TIMER_DURATION = 90; // seconds per exercise in timed mode

  var TYPE_BADGES = {
    read:    { className: 'badge-read',    text: 'Read & Interpret' },
    bug:     { className: 'badge-bug',     text: 'Spot the Bug' },
    reorder: { className: 'badge-reorder', text: 'Reorder Code' },
    fill:    { className: 'badge-fill',    text: 'Fill the Gap' },
    match:   { className: 'badge-match',   text: 'Cross-Language Match' }
  };

  // Points per exercise type
  var POINTS_MAP = {
    read:    10,
    bug:     15,
    reorder: 20,
    fill:    20,
    match:   25
  };

  // ─── Helpers ──────────────────────────────────────────────────────

  /**
   * Fisher-Yates shuffle. Returns a new array; does not mutate the original.
   */
  function shuffleArray(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i];
      a[i] = a[j];
      a[j] = tmp;
    }
    return a;
  }

  /**
   * Escape HTML special characters to prevent XSS when displaying code.
   */
  function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  /**
   * Wrap each line of code in a numbered span for display.
   * Returns an HTML string with line-number markup.
   */
  function addLineNumbers(code) {
    var lines = code.split('\n');
    return lines.map(function (line, i) {
      return '<span class="line-number">' + (i + 1) + '</span>' +
             '<span class="line-content">' + escapeHtml(line) + '</span>';
    }).join('\n');
  }

  /**
   * Shortcut: create an element with a class name.
   */
  function ce(tag, className) {
    var el = document.createElement(tag);
    if (className) el.className = className;
    return el;
  }

  // ─── Gamification: Inject CSS Styles ────────────────────────────

  function injectGameStyles() {
    var style = document.createElement('style');
    style.textContent =
      '.streak-display {' +
      '  text-align: center;' +
      '  font-family: var(--font-heading);' +
      '  font-size: 1rem;' +
      '  font-weight: 700;' +
      '  color: var(--color-accent);' +
      '  min-height: 1.8rem;' +
      '  margin-bottom: 0.5rem;' +
      '  transition: all 0.3s ease;' +
      '}' +
      '.streak-display.fire { color: #ef4444; transform: scale(1.1); }' +
      '.streak-display.unstoppable { color: #f59e0b; transform: scale(1.2); }' +

      '.floating-score {' +
      '  position: fixed;' +
      '  font-family: var(--font-heading);' +
      '  font-weight: 700;' +
      '  font-size: 1.5rem;' +
      '  color: #10b981;' +
      '  pointer-events: none;' +
      '  z-index: 10000;' +
      '  animation: floatUp 1s ease-out forwards;' +
      '}' +
      '@keyframes floatUp {' +
      '  0% { opacity: 1; transform: translateY(0) scale(1); }' +
      '  100% { opacity: 0; transform: translateY(-60px) scale(1.3); }' +
      '}' +

      '.card-correct-flash {' +
      '  animation: correctFlash 0.5s ease;' +
      '}' +
      '@keyframes correctFlash {' +
      '  0%, 100% { box-shadow: 0 2px 8px rgba(0,0,0,0.04); }' +
      '  50% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.3); }' +
      '}' +

      '.card-incorrect-shake {' +
      '  animation: incorrectShake 0.4s ease;' +
      '}' +
      '@keyframes incorrectShake {' +
      '  0%, 100% { transform: translateX(0); }' +
      '  20% { transform: translateX(-6px); }' +
      '  40% { transform: translateX(6px); }' +
      '  60% { transform: translateX(-4px); }' +
      '  80% { transform: translateX(4px); }' +
      '}' +

      '.exercise-card.slide-out-left {' +
      '  animation: slideOutLeft 0.25s ease forwards;' +
      '}' +
      '.exercise-card.slide-in-right {' +
      '  animation: slideInRight 0.25s ease forwards;' +
      '}' +
      '.exercise-card.slide-out-right {' +
      '  animation: slideOutRight 0.25s ease forwards;' +
      '}' +
      '.exercise-card.slide-in-left {' +
      '  animation: slideInLeft 0.25s ease forwards;' +
      '}' +
      '@keyframes slideOutLeft {' +
      '  to { opacity: 0; transform: translateX(-30px); }' +
      '}' +
      '@keyframes slideInRight {' +
      '  from { opacity: 0; transform: translateX(30px); }' +
      '  to { opacity: 1; transform: translateX(0); }' +
      '}' +
      '@keyframes slideOutRight {' +
      '  to { opacity: 0; transform: translateX(30px); }' +
      '}' +
      '@keyframes slideInLeft {' +
      '  from { opacity: 0; transform: translateX(-30px); }' +
      '  to { opacity: 1; transform: translateX(0); }' +
      '}' +

      '.timer-bar-container {' +
      '  width: 100%;' +
      '  height: 3px;' +
      '  background: rgba(0,0,0,0.06);' +
      '  border-radius: 2px;' +
      '  margin-bottom: 1rem;' +
      '  overflow: hidden;' +
      '}' +
      '.timer-bar {' +
      '  height: 100%;' +
      '  background: linear-gradient(90deg, #10b981, #f59e0b, #ef4444);' +
      '  border-radius: 2px;' +
      '  transition: width 1s linear;' +
      '}' +

      '.timer-toggle {' +
      '  display: inline-flex;' +
      '  align-items: center;' +
      '  gap: 0.3rem;' +
      '  padding: 0.25rem 0.6rem;' +
      '  font-size: 0.78rem;' +
      '  font-weight: 600;' +
      '  border: 1px solid rgba(0,0,0,0.12);' +
      '  border-radius: 6px;' +
      '  background: transparent;' +
      '  cursor: pointer;' +
      '  color: var(--color-text-light);' +
      '  transition: all 0.2s ease;' +
      '  margin-left: 0.5rem;' +
      '}' +
      '.timer-toggle:hover { background: rgba(0,0,0,0.04); }' +
      '.timer-toggle.active {' +
      '  background: #fef3c7;' +
      '  border-color: #f59e0b;' +
      '  color: #b45309;' +
      '}' +
      '.timer-text {' +
      '  font-size: 0.85rem;' +
      '  font-weight: 700;' +
      '  font-variant-numeric: tabular-nums;' +
      '  color: var(--color-text-light);' +
      '  margin-left: 0.4rem;' +
      '}' +
      '.timer-text.warning { color: #f59e0b; }' +
      '.timer-text.danger { color: #ef4444; }' +

      '.pairs-counter {' +
      '  text-align: center;' +
      '  font-size: 0.9rem;' +
      '  color: var(--color-text-light);' +
      '  margin-bottom: 0.75rem;' +
      '  font-weight: 600;' +
      '}' +

      '.match-item.flip-match {' +
      '  animation: flipMatch 0.4s ease;' +
      '}' +
      '@keyframes flipMatch {' +
      '  0% { transform: rotateY(0deg); }' +
      '  50% { transform: rotateY(90deg); }' +
      '  100% { transform: rotateY(0deg); }' +
      '}' +

      '.star-rating {' +
      '  font-size: 2rem;' +
      '  margin: 1rem 0;' +
      '  letter-spacing: 0.3rem;' +
      '  text-align: center;' +
      '}' +
      '.star-rating .star {' +
      '  display: inline-block;' +
      '  opacity: 0;' +
      '  transform: scale(0);' +
      '  animation: starPop 0.4s ease forwards;' +
      '}' +
      '.star-rating .star:nth-child(2) { animation-delay: 0.2s; }' +
      '.star-rating .star:nth-child(3) { animation-delay: 0.4s; }' +
      '@keyframes starPop {' +
      '  0% { opacity: 0; transform: scale(0) rotate(-20deg); }' +
      '  60% { transform: scale(1.3) rotate(5deg); }' +
      '  100% { opacity: 1; transform: scale(1) rotate(0); }' +
      '}' +

      '.points-display {' +
      '  font-family: var(--font-heading);' +
      '  font-size: 0.9rem;' +
      '  font-weight: 600;' +
      '  color: var(--color-text-light);' +
      '  text-align: center;' +
      '  margin-top: 0.25rem;' +
      '}' +

      '.celebration {' +
      '  position: fixed;' +
      '  top: 0; left: 0;' +
      '  pointer-events: none;' +
      '  z-index: 10001;' +
      '}' +

      '.streak-milestone-pulse {' +
      '  animation: milestonePulse 0.5s ease;' +
      '}' +
      '@keyframes milestonePulse {' +
      '  0% { transform: scale(1); }' +
      '  50% { transform: scale(1.35); }' +
      '  100% { transform: scale(1); }' +
      '}' +

      '.results-points-total {' +
      '  font-family: var(--font-heading);' +
      '  font-size: 1.3rem;' +
      '  font-weight: 700;' +
      '  color: var(--color-accent);' +
      '  text-align: center;' +
      '  margin: 0.5rem 0 1rem;' +
      '}' +

      '.reorder-item.snap-correct {' +
      '  animation: snapCorrect 0.35s ease;' +
      '}' +
      '@keyframes snapCorrect {' +
      '  0% { transform: scale(1); }' +
      '  40% { transform: scale(1.04); background: rgba(16,185,129,0.12); }' +
      '  100% { transform: scale(1); }' +
      '}';

    document.head.appendChild(style);
  }

  // ─── Gamification: Streak Management ─────────────────────────────

  function incrementStreak() {
    state.streak++;
    if (state.streak > state.maxStreak) state.maxStreak = state.streak;
    updateStreakDisplay();
  }

  function resetStreak() {
    state.streak = 0;
    updateStreakDisplay();
  }

  function getStreakMultiplier() {
    if (state.streak >= 5) return 2;
    if (state.streak >= 3) return 1.5;
    return 1;
  }

  function updateStreakDisplay() {
    var el = document.getElementById('streak-display');
    if (!el) return;

    el.className = 'streak-display';

    if (state.streak === 0) {
      el.textContent = '';
      return;
    }

    if (state.streak >= 5) {
      el.textContent = '\uD83D\uDD25 ' + state.streak + ' streak! Unstoppable!';
      el.classList.add('unstoppable');
      // Milestone pulse
      el.classList.add('streak-milestone-pulse');
      setTimeout(function () { el.classList.remove('streak-milestone-pulse'); }, 500);
    } else if (state.streak >= 3) {
      el.textContent = '\uD83D\uDD25 ' + state.streak + ' streak! On Fire!';
      el.classList.add('fire');
      el.classList.add('streak-milestone-pulse');
      setTimeout(function () { el.classList.remove('streak-milestone-pulse'); }, 500);
    } else {
      el.textContent = '\uD83D\uDD25 ' + state.streak + ' streak!';
    }
  }

  // ─── Gamification: Points ────────────────────────────────────────

  function awardPoints(exerciseType, triggerElement) {
    var base = POINTS_MAP[exerciseType] || 10;
    var mult = getStreakMultiplier();
    var pts = Math.round(base * mult);
    state.totalPoints += pts;
    state.pointsPerExercise.push(pts);
    updatePointsDisplay();
    if (triggerElement) showFloatingScore(pts, triggerElement);
    return pts;
  }

  function updatePointsDisplay() {
    var el = document.getElementById('points-display');
    if (el) el.textContent = '\u2B50 ' + state.totalPoints + ' pts' +
      (getStreakMultiplier() > 1 ? ' (x' + getStreakMultiplier() + ')' : '');
  }

  function showFloatingScore(points, element) {
    var float = document.createElement('div');
    float.className = 'floating-score';
    float.textContent = '+' + points;
    var rect = element.getBoundingClientRect();
    float.style.left = (rect.left + rect.width / 2 - 20) + 'px';
    float.style.top = (rect.top - 10) + 'px';
    document.body.appendChild(float);
    setTimeout(function () { float.remove(); }, 1000);
  }

  // ─── Gamification: Visual Feedback ──────────────────────────────

  function flashCardCorrect() {
    var card = document.getElementById('exercise-card');
    if (!card) return;
    card.classList.remove('card-correct-flash');
    // Force reflow
    void card.offsetWidth;
    card.classList.add('card-correct-flash');
    setTimeout(function () { card.classList.remove('card-correct-flash'); }, 500);
  }

  function shakeCardIncorrect() {
    var card = document.getElementById('exercise-card');
    if (!card) return;
    card.classList.remove('card-incorrect-shake');
    void card.offsetWidth;
    card.classList.add('card-incorrect-shake');
    setTimeout(function () { card.classList.remove('card-incorrect-shake'); }, 400);
  }

  // ─── Gamification: Confetti ─────────────────────────────────────

  function launchConfetti(intensity) {
    // intensity: 'small' (correct answer), 'medium' (>80%), 'golden' (100%)
    var canvas = document.createElement('canvas');
    canvas.className = 'celebration';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    var ctx = canvas.getContext('2d');

    var particleCount = intensity === 'small' ? 18 : intensity === 'medium' ? 35 : 50;
    var colors;
    if (intensity === 'golden') {
      colors = ['#fbbf24', '#f59e0b', '#d97706', '#fde68a', '#fffbeb'];
    } else {
      colors = ['#10b981', '#3b82f6', '#8b5cf6', '#ef4444', '#f59e0b', '#ec4899'];
    }

    var particles = [];
    for (var i = 0; i < particleCount; i++) {
      particles.push({
        x: canvas.width * (0.2 + Math.random() * 0.6),
        y: canvas.height * 0.5,
        vx: (Math.random() - 0.5) * 8,
        vy: -(Math.random() * 6 + 3),
        size: Math.random() * 6 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        life: 1,
        decay: 0.01 + Math.random() * 0.015
      });
    }

    var animId;
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      var alive = false;
      particles.forEach(function (p) {
        if (p.life <= 0) return;
        alive = true;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15; // gravity
        p.rotation += p.rotationSpeed;
        p.life -= p.decay;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation * Math.PI / 180);
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      });
      if (alive) {
        animId = requestAnimationFrame(animate);
      } else {
        canvas.remove();
      }
    }
    animId = requestAnimationFrame(animate);

    // Safety cleanup after 3s
    setTimeout(function () {
      cancelAnimationFrame(animId);
      if (canvas.parentNode) canvas.remove();
    }, 3000);
  }

  // ─── Gamification: Timer ─────────────────────────────────────────

  function startTimer() {
    if (!state.timedMode) return;
    clearTimer();
    state.timerRemaining = TIMER_DURATION;

    var barContainer = document.getElementById('timer-bar-container');
    var bar = document.getElementById('timer-bar');
    var timerText = document.getElementById('timer-text');

    if (barContainer) barContainer.style.display = '';
    if (bar) bar.style.width = '100%';
    if (timerText) {
      timerText.style.display = '';
      timerText.textContent = formatTime(TIMER_DURATION);
      timerText.className = 'timer-text';
    }

    var startTimestamp = Date.now();
    state.timerInterval = setInterval(function () {
      var elapsed = (Date.now() - startTimestamp) / 1000;
      state.timerRemaining = Math.max(0, TIMER_DURATION - elapsed);
      var pct = (state.timerRemaining / TIMER_DURATION) * 100;

      if (bar) bar.style.width = pct + '%';
      if (timerText) {
        timerText.textContent = formatTime(Math.ceil(state.timerRemaining));
        timerText.className = 'timer-text';
        if (state.timerRemaining <= 10) timerText.classList.add('danger');
        else if (state.timerRemaining <= 30) timerText.classList.add('warning');
      }

      if (state.timerRemaining <= 0) {
        clearTimer();
        autoSkipCurrent();
      }
    }, 250);
  }

  function clearTimer() {
    if (state.timerInterval) {
      clearInterval(state.timerInterval);
      state.timerInterval = null;
    }
  }

  function formatTime(s) {
    var m = Math.floor(s / 60);
    var sec = s % 60;
    return (m > 0 ? m + ':' : '') + (sec < 10 && m > 0 ? '0' : '') + sec + (m === 0 ? 's' : '');
  }

  function autoSkipCurrent() {
    var ans = state.answers[state.currentIndex];
    if (!ans.answered) {
      ans.skipped = true;
      ans.answered = true;
      ans.correct = null;
      resetStreak();
    }
    if (state.currentIndex < state.exercises.length - 1) {
      navigateToExercise(state.currentIndex + 1, 'forward');
    } else {
      showResults();
    }
  }

  function recordExerciseTime() {
    if (!state.timedMode) return;
    var elapsed = TIMER_DURATION - state.timerRemaining;
    state.exerciseTimes.push(elapsed);
  }

  // ─── Gamification: Transition Animations ────────────────────────

  var _transitionDirection = 'forward';

  function navigateToExercise(newIndex, direction) {
    _transitionDirection = direction || 'forward';
    var card = document.getElementById('exercise-card');
    if (!card) {
      state.currentIndex = newIndex;
      renderExercise(newIndex);
      return;
    }

    var outClass = direction === 'forward' ? 'slide-out-left' : 'slide-out-right';
    card.classList.add(outClass);

    setTimeout(function () {
      card.classList.remove(outClass);
      state.currentIndex = newIndex;
      renderExercise(newIndex);
      var inClass = direction === 'forward' ? 'slide-in-right' : 'slide-in-left';
      card.classList.add(inClass);
      setTimeout(function () { card.classList.remove(inClass); }, 260);
    }, 250);
  }

  // ─── Gamification: Match pairs counter ──────────────────────────

  function updatePairsCounter(matchedCount, totalPairs) {
    var el = document.getElementById('pairs-counter');
    if (el) el.textContent = 'Pairs found: ' + matchedCount + ' / ' + totalPairs;
  }

  // ─── Initialization ───────────────────────────────────────────────

  document.addEventListener('DOMContentLoaded', function () {
    injectGameStyles();
    setupTopicCards();
    setupLevelButtons();
    setupStartButton();
    setupNavigation();
  });

  /**
   * Topic card selection — clicking a card toggles its `.selected` state
   * and deselects all other cards.
   */
  function setupTopicCards() {
    var container = document.querySelector('.topic-grid');
    if (!container) return;

    container.addEventListener('click', function (e) {
      var card = e.target.closest('.topic-card');
      if (!card) return;

      var wasSelected = card.classList.contains('selected');

      // Deselect all
      container.querySelectorAll('.topic-card').forEach(function (c) {
        c.classList.remove('selected');
      });

      // Toggle
      if (!wasSelected) {
        card.classList.add('selected');
        state.topic = card.dataset.topic;
      } else {
        state.topic = null;
      }

      updateStartButton();
    });
  }

  /**
   * Level button selection — clicking a level button toggles its `.selected`
   * state and deselects siblings.
   */
  function setupLevelButtons() {
    var container = document.querySelector('.level-buttons');
    if (!container) return;

    container.addEventListener('click', function (e) {
      var btn = e.target.closest('.level-btn');
      if (!btn) return;

      var wasSelected = btn.classList.contains('selected');

      container.querySelectorAll('.level-btn').forEach(function (b) {
        b.classList.remove('selected');
      });

      if (!wasSelected) {
        btn.classList.add('selected');
        state.level = btn.dataset.level;
      } else {
        state.level = null;
      }

      updateStartButton();
    });
  }

  /**
   * Enable/disable the start button based on whether topic + level
   * are both selected.
   */
  function updateStartButton() {
    var btn = document.getElementById('start-btn');
    if (!btn) return;

    if (state.topic && state.level) {
      btn.classList.add('ready');
    } else {
      btn.classList.remove('ready');
    }
  }

  /**
   * Start button — begins the exercise session.
   */
  function setupStartButton() {
    var btn = document.getElementById('start-btn');
    if (!btn) return;

    btn.addEventListener('click', function () {
      if (!btn.classList.contains('ready')) return;
      startSession();
    });
  }

  /**
   * Wire up the navigation buttons in the exercise arena.
   */
  function setupNavigation() {
    var prevBtn = document.getElementById('prev-btn');
    var nextBtn = document.getElementById('next-btn');
    var skipBtn = document.getElementById('skip-btn');
    var backBtn = document.getElementById('back-btn');

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        if (state.currentIndex > 0) {
          recordExerciseTime();
          navigateToExercise(state.currentIndex - 1, 'backward');
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        recordExerciseTime();
        if (state.currentIndex < state.exercises.length - 1) {
          navigateToExercise(state.currentIndex + 1, 'forward');
        } else {
          showResults();
        }
      });
    }

    if (skipBtn) {
      skipBtn.addEventListener('click', function () {
        var ans = state.answers[state.currentIndex];
        if (!ans.answered) {
          ans.skipped = true;
          ans.answered = true;
          ans.correct = null;
          resetStreak();
        }
        recordExerciseTime();
        if (state.currentIndex < state.exercises.length - 1) {
          navigateToExercise(state.currentIndex + 1, 'forward');
        } else {
          showResults();
        }
      });
    }

    if (backBtn) {
      backBtn.addEventListener('click', function () {
        var unanswered = state.answers.some(function (a) { return !a.answered; });
        if (unanswered) {
          if (!confirm('You have unanswered exercises. Leave this session?')) return;
        }
        clearTimer();
        resetToConfig();
      });
    }
  }

  // ─── Session Lifecycle ────────────────────────────────────────────

  /**
   * Start a new exercise session with the selected topic and level.
   */
  function startSession() {
    if (!window.PRACTICE_EXERCISES) {
      console.error('[Practice Lab] PRACTICE_EXERCISES not found. Is practice-data.js loaded?');
      return;
    }

    var topicData = window.PRACTICE_EXERCISES[state.topic];
    if (!topicData) {
      console.error('[Practice Lab] No exercises for topic:', state.topic);
      return;
    }

    var levelData = topicData[state.level];
    if (!levelData || levelData.length === 0) {
      console.error('[Practice Lab] No exercises for level:', state.level);
      return;
    }

    // Shuffle and pick up to MAX_EXERCISES
    var shuffled = shuffleArray(levelData);
    state.exercises = shuffled.slice(0, MAX_EXERCISES);
    state.currentIndex = 0;
    state.score = 0;
    state.matchWrongAttempts = {};
    state.matchSelectedLeft = null;
    state.reorderSelectedIndex = null;

    // Reset gamification state
    state.streak = 0;
    state.maxStreak = 0;
    state.totalPoints = 0;
    state.pointsPerExercise = [];
    state.exerciseTimes = [];
    clearTimer();

    // Initialize answer tracking
    state.answers = state.exercises.map(function () {
      return {
        answered: false,
        correct: null,
        skipped: false,
        userAnswer: null
      };
    });

    // Switch views
    var config = document.getElementById('practice-config');
    var arena = document.getElementById('exercise-arena');
    if (config) config.style.display = 'none';
    if (arena) arena.style.display = 'block';

    // Inject gamification UI elements into the arena
    injectGameUI();

    renderExercise(0);
  }

  /**
   * Inject gamification elements (streak, points, timer) into the exercise arena.
   */
  function injectGameUI() {
    var arena = document.getElementById('exercise-arena');
    if (!arena) return;

    // Remove any previously injected elements (for retry)
    var oldStreak = document.getElementById('streak-display');
    if (oldStreak) oldStreak.remove();
    var oldPoints = document.getElementById('points-display');
    if (oldPoints) oldPoints.remove();
    var oldTimerBar = document.getElementById('timer-bar-container');
    if (oldTimerBar) oldTimerBar.remove();
    var oldTimerRow = document.getElementById('timer-row');
    if (oldTimerRow) oldTimerRow.remove();

    // Find the progress container to insert after it
    var progressContainer = arena.querySelector('.progress-container');
    var exerciseCard = document.getElementById('exercise-card');
    var insertBefore = exerciseCard || null;

    // Streak display
    var streakEl = document.createElement('div');
    streakEl.id = 'streak-display';
    streakEl.className = 'streak-display';
    if (progressContainer && progressContainer.nextSibling) {
      progressContainer.parentNode.insertBefore(streakEl, progressContainer.nextSibling);
    } else if (insertBefore) {
      insertBefore.parentNode.insertBefore(streakEl, insertBefore);
    } else {
      arena.appendChild(streakEl);
    }

    // Points display
    var pointsEl = document.createElement('div');
    pointsEl.id = 'points-display';
    pointsEl.className = 'points-display';
    streakEl.parentNode.insertBefore(pointsEl, streakEl.nextSibling);

    // Timer bar (hidden by default)
    var timerBarContainer = document.createElement('div');
    timerBarContainer.id = 'timer-bar-container';
    timerBarContainer.className = 'timer-bar-container';
    timerBarContainer.style.display = 'none';
    var timerBar = document.createElement('div');
    timerBar.id = 'timer-bar';
    timerBar.className = 'timer-bar';
    timerBar.style.width = '100%';
    timerBarContainer.appendChild(timerBar);
    pointsEl.parentNode.insertBefore(timerBarContainer, pointsEl.nextSibling);

    // Timer toggle and text — insert near the progress text
    var progressText = document.getElementById('progress-text');
    if (progressText) {
      // Container row for timer toggle and countdown
      var timerRow = document.createElement('span');
      timerRow.id = 'timer-row';
      timerRow.style.cssText = 'display:inline-flex; align-items:center; margin-left:0.5rem;';

      var timerToggle = document.createElement('button');
      timerToggle.id = 'timer-toggle';
      timerToggle.className = 'timer-toggle';
      timerToggle.innerHTML = '\u23F1 Timer';
      timerToggle.addEventListener('click', function () {
        state.timedMode = !state.timedMode;
        timerToggle.classList.toggle('active', state.timedMode);
        if (state.timedMode) {
          startTimer();
        } else {
          clearTimer();
          timerBarContainer.style.display = 'none';
          var tt = document.getElementById('timer-text');
          if (tt) tt.style.display = 'none';
        }
      });
      timerRow.appendChild(timerToggle);

      var timerText = document.createElement('span');
      timerText.id = 'timer-text';
      timerText.className = 'timer-text';
      timerText.style.display = 'none';
      timerRow.appendChild(timerText);

      progressText.parentNode.insertBefore(timerRow, progressText.nextSibling);
    }

    updatePointsDisplay();
    updateStreakDisplay();
  }

  /**
   * Return to the configuration view (topic/level selection).
   */
  function resetToConfig() {
    var config = document.getElementById('practice-config');
    var arena = document.getElementById('exercise-arena');
    var results = document.getElementById('results-panel');

    if (config) config.style.display = '';
    if (arena) arena.style.display = 'none';
    if (results) results.style.display = 'none';

    // Clear selections
    document.querySelectorAll('.topic-card.selected').forEach(function (c) {
      c.classList.remove('selected');
    });
    document.querySelectorAll('.level-btn.selected').forEach(function (b) {
      b.classList.remove('selected');
    });

    state.topic = null;
    state.level = null;
    state.exercises = [];
    state.answers = [];
    state.timedMode = false;
    clearTimer();
    updateStartButton();
  }

  // ─── Progress Bar ─────────────────────────────────────────────────

  /**
   * Update the progress bar and progress text.
   */
  function updateProgress() {
    var bar = document.getElementById('progress-fill');
    var text = document.getElementById('progress-text');
    var total = state.exercises.length;
    var current = state.currentIndex + 1;
    var pct = (current / total) * 100;

    if (bar) bar.style.width = pct + '%';
    if (text) text.textContent = 'Exercise ' + current + ' of ' + total;

    // Update prev/next button states
    var prevBtn = document.getElementById('prev-btn');
    var nextBtn = document.getElementById('next-btn');
    if (prevBtn) prevBtn.disabled = (state.currentIndex === 0);
    if (nextBtn) {
      nextBtn.textContent = (state.currentIndex === state.exercises.length - 1) ? 'Finish' : 'Next';
    }
  }

  // ─── Exercise Rendering (dispatch) ────────────────────────────────

  /**
   * Render the exercise at the given index, dispatching to the
   * type-specific renderer.
   */
  function renderExercise(index) {
    state.currentIndex = index;
    state.matchSelectedLeft = null;
    state.reorderSelectedIndex = null;
    updateProgress();

    var exercise = state.exercises[index];
    var container = document.getElementById('exercise-card');
    if (!container) return;

    container.innerHTML = '';

    switch (exercise.type) {
      case 'read':
        renderRead(container, exercise, index);
        break;
      case 'bug':
        renderBug(container, exercise, index);
        break;
      case 'reorder':
        renderReorder(container, exercise, index);
        break;
      case 'fill':
        renderFill(container, exercise, index);
        break;
      case 'match':
        renderMatch(container, exercise, index);
        break;
      default:
        container.innerHTML = '<p class="error">Unknown exercise type: ' +
          escapeHtml(exercise.type) + '</p>';
    }

    // Start timer for this exercise if timed mode is on
    if (state.timedMode) startTimer();
  }

  // ─── Type Badge ───────────────────────────────────────────────────

  /**
   * Create and return a type badge element for the given exercise type.
   */
  function createTypeBadge(type) {
    var info = TYPE_BADGES[type] || { className: '', text: type };
    var badge = ce('span', 'exercise-type-badge ' + info.className);
    badge.textContent = info.text;
    return badge;
  }

  // ─── Language Badge ───────────────────────────────────────────────

  /**
   * Create a language badge to display on a code block.
   */
  function createLangBadge(lang) {
    var badge = ce('span', 'lang-badge lang-' + lang);
    badge.textContent = lang.charAt(0).toUpperCase() + lang.slice(1);
    return badge;
  }

  // ─── Explanation Box ──────────────────────────────────────────────

  /**
   * Create and return an explanation box element.
   */
  function createExplanation(text) {
    var box = ce('div', 'explanation-box visible');
    var heading = ce('h4', '');
    heading.textContent = 'Explanation';
    var content = ce('p', '');
    content.textContent = text;
    box.appendChild(heading);
    box.appendChild(content);
    return box;
  }

  // ─── Code Block ───────────────────────────────────────────────────

  /**
   * Create a code block with line numbers and a language badge.
   */
  function createCodeBlock(code, lang) {
    var wrapper = ce('div', 'code-block-wrapper');
    if (lang) wrapper.appendChild(createLangBadge(lang));

    var pre = ce('pre', 'exercise-code');
    var codeEl = ce('code', '');
    codeEl.innerHTML = addLineNumbers(code);
    pre.appendChild(codeEl);
    wrapper.appendChild(pre);
    return wrapper;
  }

  // ─── READ type ────────────────────────────────────────────────────

  /**
   * Render a "Read & Interpret" exercise (multiple choice).
   */
  function renderRead(container, exercise, index) {
    var ans = state.answers[index];

    // Badge
    container.appendChild(createTypeBadge('read'));

    // Title
    var title = ce('h3', 'exercise-title');
    title.textContent = exercise.title;
    container.appendChild(title);

    // Prompt
    var prompt = ce('p', 'exercise-prompt');
    prompt.textContent = exercise.prompt;
    container.appendChild(prompt);

    // Code block
    if (exercise.code) {
      container.appendChild(createCodeBlock(exercise.code, exercise.lang));
    }

    // Options
    var optionsDiv = ce('div', 'options-list');
    exercise.options.forEach(function (optText, i) {
      var btn = ce('button', 'option-btn');
      btn.innerHTML = '<span class="option-letter">' + OPTION_LETTERS[i] + '</span>' +
                      '<span class="option-text">' + escapeHtml(optText) + '</span>';
      btn.dataset.index = i;

      // If already answered, restore state
      if (ans.answered) {
        btn.disabled = true;
        if (i === exercise.correct) {
          btn.classList.add('correct');
        } else if (ans.userAnswer === i) {
          btn.classList.add('incorrect');
        }
      }

      btn.addEventListener('click', function () {
        handleMCQAnswer(optionsDiv, exercise, index, i);
      });

      optionsDiv.appendChild(btn);
    });

    container.appendChild(optionsDiv);

    // Show explanation if already answered
    if (ans.answered && exercise.explanation) {
      container.appendChild(createExplanation(exercise.explanation));
    }
  }

  // ─── BUG type ─────────────────────────────────────────────────────

  /**
   * Render a "Spot the Bug" exercise (multiple choice, same structure as read).
   */
  function renderBug(container, exercise, index) {
    var ans = state.answers[index];

    container.appendChild(createTypeBadge('bug'));

    var title = ce('h3', 'exercise-title');
    title.textContent = exercise.title;
    container.appendChild(title);

    var prompt = ce('p', 'exercise-prompt');
    prompt.textContent = exercise.prompt;
    container.appendChild(prompt);

    if (exercise.code) {
      container.appendChild(createCodeBlock(exercise.code, exercise.lang));
    }

    var optionsDiv = ce('div', 'options-list');
    exercise.options.forEach(function (optText, i) {
      var btn = ce('button', 'option-btn');
      btn.innerHTML = '<span class="option-letter">' + OPTION_LETTERS[i] + '</span>' +
                      '<span class="option-text">' + escapeHtml(optText) + '</span>';
      btn.dataset.index = i;

      if (ans.answered) {
        btn.disabled = true;
        if (i === exercise.correct) {
          btn.classList.add('correct');
        } else if (ans.userAnswer === i) {
          btn.classList.add('incorrect');
        }
      }

      btn.addEventListener('click', function () {
        handleMCQAnswer(optionsDiv, exercise, index, i);
      });

      optionsDiv.appendChild(btn);
    });

    container.appendChild(optionsDiv);

    if (ans.answered && exercise.explanation) {
      container.appendChild(createExplanation(exercise.explanation));
    }
  }

  /**
   * Handle a multiple-choice answer click (for read and bug types).
   */
  function handleMCQAnswer(optionsDiv, exercise, index, chosen) {
    var ans = state.answers[index];
    if (ans.answered) return;

    ans.answered = true;
    ans.userAnswer = chosen;
    ans.correct = (chosen === exercise.correct);

    // Disable all buttons, mark correct/incorrect
    var buttons = optionsDiv.querySelectorAll('.option-btn');
    buttons.forEach(function (btn) {
      btn.disabled = true;
      var btnIdx = parseInt(btn.dataset.index, 10);
      if (btnIdx === exercise.correct) {
        btn.classList.add('correct');
      } else if (btnIdx === chosen) {
        btn.classList.add('incorrect');
      }
    });

    // Gamification feedback
    var clickedBtn = optionsDiv.querySelector('.option-btn[data-index="' + chosen + '"]');
    if (ans.correct) {
      incrementStreak();
      awardPoints(exercise.type, clickedBtn);
      flashCardCorrect();
      launchConfetti('small');
      recordExerciseTime();
    } else {
      resetStreak();
      shakeCardIncorrect();
      recordExerciseTime();
    }

    // Show explanation
    if (exercise.explanation) {
      var container = document.getElementById('exercise-card');
      if (container) container.appendChild(createExplanation(exercise.explanation));
    }
  }

  // ─── REORDER type ─────────────────────────────────────────────────

  /**
   * Render a "Reorder Code" exercise with drag-and-drop and click-to-swap.
   */
  function renderReorder(container, exercise, index) {
    var ans = state.answers[index];

    container.appendChild(createTypeBadge('reorder'));

    var title = ce('h3', 'exercise-title');
    title.textContent = exercise.title;
    container.appendChild(title);

    var prompt = ce('p', 'exercise-prompt');
    prompt.textContent = exercise.prompt;
    container.appendChild(prompt);

    // Build the sortable list
    var list = ce('div', 'reorder-list');
    list.id = 'reorder-list';

    // Determine current order: either saved or original
    var currentOrder;
    if (ans.userAnswer) {
      currentOrder = ans.userAnswer.slice();
    } else {
      // Initial order is just the indices as given (lines are already shuffled)
      currentOrder = exercise.lines.map(function (_, i) { return i; });
    }

    currentOrder.forEach(function (lineIdx, pos) {
      var item = ce('div', 'reorder-item');
      item.draggable = !ans.answered;
      item.dataset.lineIndex = lineIdx;
      item.dataset.pos = pos;

      var handle = ce('span', 'drag-handle');
      handle.textContent = '\u22EE\u22EE'; // dots
      item.appendChild(handle);

      var codeSpan = ce('code', 'reorder-code');
      codeSpan.textContent = exercise.lines[lineIdx];
      item.appendChild(codeSpan);

      // Mark correct/incorrect if already checked
      if (ans.answered && !ans.skipped) {
        var correctLineIdx = exercise.correctOrder[pos];
        if (lineIdx === correctLineIdx) {
          item.classList.add('correct');
        } else {
          item.classList.add('incorrect');
        }
      }

      list.appendChild(item);
    });

    container.appendChild(list);

    // Set up drag-and-drop if not yet answered
    if (!ans.answered) {
      setupReorderDragDrop(list);
      setupReorderClickSwap(list);
      setupReorderTouchDragDrop(list);

      var checkBtn = ce('button', 'check-btn');
      checkBtn.textContent = 'Check Order';
      checkBtn.addEventListener('click', function () {
        checkReorderAnswer(list, exercise, index);
      });
      container.appendChild(checkBtn);
    }

    // Show explanation if already answered
    if (ans.answered && exercise.explanation) {
      container.appendChild(createExplanation(exercise.explanation));
    }
  }

  /**
   * Set up HTML5 drag-and-drop on the reorder list.
   */
  function setupReorderDragDrop(list) {
    var draggedItem = null;

    list.addEventListener('dragstart', function (e) {
      var item = e.target.closest('.reorder-item');
      if (!item) return;
      draggedItem = item;
      item.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
      // Need to set data for Firefox
      e.dataTransfer.setData('text/plain', '');
    });

    list.addEventListener('dragover', function (e) {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      var target = e.target.closest('.reorder-item');
      if (!target || target === draggedItem) return;

      var items = Array.from(list.querySelectorAll('.reorder-item'));
      var draggedIdx = items.indexOf(draggedItem);
      var targetIdx = items.indexOf(target);

      if (draggedIdx < targetIdx) {
        list.insertBefore(draggedItem, target.nextSibling);
      } else {
        list.insertBefore(draggedItem, target);
      }
    });

    list.addEventListener('dragend', function () {
      if (draggedItem) {
        draggedItem.classList.remove('dragging');
        draggedItem = null;
      }
    });
  }

  /**
   * Set up touch-based drag-and-drop for mobile on the reorder list.
   */
  function setupReorderTouchDragDrop(list) {
    var touchedItem = null;
    var touchClone = null;
    var touchStartY = 0;
    var touchOffsetY = 0;

    list.addEventListener('touchstart', function (e) {
      var item = e.target.closest('.reorder-item');
      if (!item) return;
      // Prevent click-to-swap from firing simultaneously
      var touch = e.touches[0];
      touchedItem = item;
      touchStartY = touch.clientY;
      var rect = item.getBoundingClientRect();
      touchOffsetY = touch.clientY - rect.top;

      // Create a clone for visual feedback
      touchClone = item.cloneNode(true);
      touchClone.style.cssText = 'position:fixed; left:' + rect.left + 'px; top:' + rect.top +
        'px; width:' + rect.width + 'px; opacity:0.85; z-index:9999; pointer-events:none; ' +
        'box-shadow:0 4px 16px rgba(0,0,0,0.15); transition:none;';
      document.body.appendChild(touchClone);
      item.style.opacity = '0.3';
    }, { passive: true });

    list.addEventListener('touchmove', function (e) {
      if (!touchedItem || !touchClone) return;
      e.preventDefault();
      var touch = e.touches[0];
      var rect = touchedItem.getBoundingClientRect();
      touchClone.style.top = (touch.clientY - touchOffsetY) + 'px';

      // Determine which item we're over
      var items = Array.from(list.querySelectorAll('.reorder-item'));
      for (var i = 0; i < items.length; i++) {
        var r = items[i].getBoundingClientRect();
        if (touch.clientY > r.top && touch.clientY < r.bottom && items[i] !== touchedItem) {
          var touchedIdx = items.indexOf(touchedItem);
          var targetIdx = i;
          if (touchedIdx < targetIdx) {
            list.insertBefore(touchedItem, items[i].nextSibling);
          } else {
            list.insertBefore(touchedItem, items[i]);
          }
          break;
        }
      }
    }, { passive: false });

    list.addEventListener('touchend', function () {
      if (touchedItem) {
        touchedItem.style.opacity = '';
        touchedItem = null;
      }
      if (touchClone) {
        touchClone.remove();
        touchClone = null;
      }
    });
  }

  /**
   * Set up click-to-swap for mobile users on the reorder list.
   * Click one item to select it (highlighted), click another to swap.
   */
  function setupReorderClickSwap(list) {
    list.addEventListener('click', function (e) {
      var item = e.target.closest('.reorder-item');
      if (!item) return;

      var items = Array.from(list.querySelectorAll('.reorder-item'));
      var clickedIdx = items.indexOf(item);

      if (state.reorderSelectedIndex === null) {
        // First selection
        state.reorderSelectedIndex = clickedIdx;
        item.classList.add('swap-selected');
      } else if (state.reorderSelectedIndex === clickedIdx) {
        // Deselect
        item.classList.remove('swap-selected');
        state.reorderSelectedIndex = null;
      } else {
        // Swap the two items
        var firstIdx = state.reorderSelectedIndex;
        var firstItem = items[firstIdx];
        firstItem.classList.remove('swap-selected');

        // Perform DOM swap
        if (firstIdx < clickedIdx) {
          list.insertBefore(item, firstItem);
          list.insertBefore(firstItem, items[clickedIdx + 1] || null);
        } else {
          list.insertBefore(firstItem, item);
          list.insertBefore(item, items[firstIdx + 1] || null);
        }

        state.reorderSelectedIndex = null;
      }
    });
  }

  /**
   * Check the reorder answer. Compare current DOM order to correctOrder.
   */
  function checkReorderAnswer(list, exercise, index) {
    var ans = state.answers[index];
    if (ans.answered) return;

    var items = list.querySelectorAll('.reorder-item');
    var currentOrder = [];
    var allCorrect = true;

    items.forEach(function (item, pos) {
      var lineIdx = parseInt(item.dataset.lineIndex, 10);
      currentOrder.push(lineIdx);
      var correctLineIdx = exercise.correctOrder[pos];

      if (lineIdx === correctLineIdx) {
        item.classList.add('correct');
        // Snap animation for correctly placed items
        item.classList.add('snap-correct');
      } else {
        item.classList.add('incorrect');
        allCorrect = false;
      }

      // Disable dragging
      item.draggable = false;
      item.classList.remove('swap-selected');
    });

    ans.answered = true;
    ans.correct = allCorrect;
    ans.userAnswer = currentOrder;

    // Gamification feedback
    var checkBtn = list.parentNode.querySelector('.check-btn');
    if (allCorrect) {
      incrementStreak();
      awardPoints(exercise.type, checkBtn || list);
      flashCardCorrect();
      launchConfetti('small');
    } else {
      resetStreak();
      shakeCardIncorrect();
    }
    recordExerciseTime();

    // Remove the check button
    if (checkBtn) checkBtn.remove();

    // Show explanation
    if (exercise.explanation) {
      var container = document.getElementById('exercise-card');
      if (container) container.appendChild(createExplanation(exercise.explanation));
    }
  }

  // ─── FILL type ────────────────────────────────────────────────────

  /**
   * Render a "Fill the Gap" exercise with inline text inputs.
   */
  function renderFill(container, exercise, index) {
    var ans = state.answers[index];

    container.appendChild(createTypeBadge('fill'));

    var title = ce('h3', 'exercise-title');
    title.textContent = exercise.title;
    container.appendChild(title);

    var prompt = ce('p', 'exercise-prompt');
    prompt.textContent = exercise.prompt;
    container.appendChild(prompt);

    // Language badge
    if (exercise.lang) {
      container.appendChild(createLangBadge(exercise.lang));
    }

    // Build the code template with input gaps
    var codeDiv = ce('div', 'fill-gap-code');
    var template = exercise.codeTemplate;

    // Replace ___GAPX___ patterns with input elements
    // We build HTML by splitting on the gap pattern
    var gapPattern = /___(\w+)___/g;
    var parts = [];
    var lastIndex = 0;
    var match;

    while ((match = gapPattern.exec(template)) !== null) {
      // Text before the gap
      if (match.index > lastIndex) {
        parts.push({ type: 'text', value: template.substring(lastIndex, match.index) });
      }
      parts.push({ type: 'gap', key: match[1] });
      lastIndex = gapPattern.lastIndex;
    }
    // Remaining text
    if (lastIndex < template.length) {
      parts.push({ type: 'text', value: template.substring(lastIndex) });
    }

    // Build the HTML
    var html = '';
    parts.forEach(function (part) {
      if (part.type === 'text') {
        html += escapeHtml(part.value);
      } else {
        var gapKey = part.key;
        var savedValue = '';
        var extraClass = '';
        var disabled = '';

        if (ans.answered && ans.userAnswer) {
          savedValue = escapeHtml(ans.userAnswer[gapKey] || '');
          var gapInfo = exercise.gaps[gapKey];
          if (gapInfo) {
            var isCorrect = checkGapValue(ans.userAnswer[gapKey], gapInfo.accept);
            extraClass = isCorrect ? ' correct' : ' incorrect';
          }
          disabled = ' disabled';
        }

        html += '<input type="text" class="gap-input' + extraClass + '" ' +
                'data-gap="' + escapeHtml(gapKey) + '" ' +
                'placeholder="..." ' +
                'value="' + savedValue + '"' +
                disabled +
                ' autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">';
      }
    });

    codeDiv.innerHTML = html;
    container.appendChild(codeDiv);

    // Check button (if not yet answered)
    if (!ans.answered) {
      var checkBtn = ce('button', 'check-btn');
      checkBtn.textContent = 'Check Answers';
      checkBtn.addEventListener('click', function () {
        checkFillAnswer(container, exercise, index);
      });
      container.appendChild(checkBtn);
    }

    // Show explanation if already answered
    if (ans.answered && exercise.explanation) {
      container.appendChild(createExplanation(exercise.explanation));
    }
  }

  /**
   * Check whether a user's gap value matches any of the accepted answers.
   * Comparison is case-insensitive and trimmed.
   */
  function checkGapValue(value, acceptList) {
    if (!value) return false;
    var v = value.trim().toLowerCase();
    return acceptList.some(function (a) {
      return a.trim().toLowerCase() === v;
    });
  }

  /**
   * Check all fill-the-gap inputs and record the answer.
   */
  function checkFillAnswer(container, exercise, index) {
    var ans = state.answers[index];
    if (ans.answered) return;

    var inputs = container.querySelectorAll('.gap-input');
    var allCorrect = true;
    var userAnswer = {};

    inputs.forEach(function (input) {
      var gapKey = input.dataset.gap;
      var gapInfo = exercise.gaps[gapKey];
      userAnswer[gapKey] = input.value;

      if (gapInfo) {
        var isCorrect = checkGapValue(input.value, gapInfo.accept);
        input.classList.add(isCorrect ? 'correct' : 'incorrect');
        input.disabled = true;
        if (!isCorrect) allCorrect = false;
      }
    });

    ans.answered = true;
    ans.correct = allCorrect;
    ans.userAnswer = userAnswer;

    // Gamification feedback
    var checkBtn = container.querySelector('.check-btn');
    if (allCorrect) {
      incrementStreak();
      awardPoints(exercise.type, checkBtn || container);
      flashCardCorrect();
      launchConfetti('small');
    } else {
      resetStreak();
      shakeCardIncorrect();
    }
    recordExerciseTime();

    // Remove check button
    if (checkBtn) checkBtn.remove();

    // Show explanation
    if (exercise.explanation) {
      container.appendChild(createExplanation(exercise.explanation));
    }
  }

  // ─── MATCH type ───────────────────────────────────────────────────

  /**
   * Render a "Cross-Language Match" exercise with two columns.
   */
  function renderMatch(container, exercise, index) {
    var ans = state.answers[index];

    container.appendChild(createTypeBadge('match'));

    var title = ce('h3', 'exercise-title');
    title.textContent = exercise.title;
    container.appendChild(title);

    var prompt = ce('p', 'exercise-prompt');
    prompt.textContent = exercise.prompt;
    container.appendChild(prompt);

    // Initialize match tracking for this exercise
    if (!state.matchWrongAttempts[index]) {
      state.matchWrongAttempts[index] = 0;
    }

    // Pairs counter
    var matchedPairsInit = (ans.userAnswer && ans.userAnswer.matched) || [];
    var pairsCounter = ce('div', 'pairs-counter');
    pairsCounter.id = 'pairs-counter';
    pairsCounter.textContent = 'Pairs found: ' + matchedPairsInit.length + ' / ' + exercise.pairs.length;
    container.appendChild(pairsCounter);

    // Build two columns
    var matchArea = ce('div', 'match-columns');

    var leftCol = ce('div', 'match-column match-left');
    var rightCol = ce('div', 'match-column match-right');

    // Determine right-side order: shuffle if not yet saved
    var rightOrder;
    if (ans.userAnswer && ans.userAnswer.rightOrder) {
      rightOrder = ans.userAnswer.rightOrder;
    } else {
      rightOrder = shuffleArray(exercise.pairs.map(function (_, i) { return i; }));
      // Save for consistency on re-render
      if (!ans.userAnswer) ans.userAnswer = {};
      ans.userAnswer.rightOrder = rightOrder;
    }

    // Track which pairs are already matched
    var matchedPairs = (ans.userAnswer && ans.userAnswer.matched) || [];
    if (ans.userAnswer) ans.userAnswer.matched = matchedPairs;

    // Build left items
    exercise.pairs.forEach(function (pair, i) {
      var item = ce('div', 'match-item match-item-left');
      item.dataset.pairIndex = i;

      var langBadge = ce('span', 'match-lang');
      langBadge.textContent = pair.leftLang;
      item.appendChild(langBadge);

      var codeSpan = ce('code', 'match-code');
      codeSpan.textContent = pair.left;
      item.appendChild(codeSpan);

      if (matchedPairs.indexOf(i) !== -1) {
        item.classList.add('matched');
      }

      if (!ans.answered) {
        item.addEventListener('click', function () {
          handleMatchLeftClick(item, leftCol, index);
        });
      }

      leftCol.appendChild(item);
    });

    // Build right items (shuffled order)
    rightOrder.forEach(function (pairIdx) {
      var pair = exercise.pairs[pairIdx];
      var item = ce('div', 'match-item match-item-right');
      item.dataset.pairIndex = pairIdx;

      var langBadge = ce('span', 'match-lang');
      langBadge.textContent = pair.rightLang;
      item.appendChild(langBadge);

      var codeSpan = ce('code', 'match-code');
      codeSpan.textContent = pair.right;
      item.appendChild(codeSpan);

      if (matchedPairs.indexOf(pairIdx) !== -1) {
        item.classList.add('matched');
      }

      if (!ans.answered) {
        item.addEventListener('click', function () {
          handleMatchRightClick(item, exercise, index, container);
        });
      }

      rightCol.appendChild(item);
    });

    matchArea.appendChild(leftCol);
    matchArea.appendChild(rightCol);
    container.appendChild(matchArea);

    // Show explanation if complete
    if (ans.answered && exercise.explanation) {
      container.appendChild(createExplanation(exercise.explanation));
    }
  }

  /**
   * Handle click on a left match item: select it, deselect others.
   */
  function handleMatchLeftClick(item, leftCol, index) {
    var ans = state.answers[index];
    if (ans.answered) return;

    // If already matched, ignore
    if (item.classList.contains('matched')) return;

    // Deselect others
    leftCol.querySelectorAll('.match-item-left').forEach(function (el) {
      el.classList.remove('selected');
    });

    item.classList.add('selected');
    state.matchSelectedLeft = parseInt(item.dataset.pairIndex, 10);
  }

  /**
   * Handle click on a right match item: attempt to match with selected left.
   */
  function handleMatchRightClick(item, exercise, index, container) {
    var ans = state.answers[index];
    if (ans.answered) return;

    // If already matched, ignore
    if (item.classList.contains('matched')) return;

    // Must have a left item selected
    if (state.matchSelectedLeft === null) return;

    var leftIdx = state.matchSelectedLeft;
    var rightIdx = parseInt(item.dataset.pairIndex, 10);

    if (leftIdx === rightIdx) {
      // Correct match!
      ans.userAnswer.matched.push(leftIdx);

      // Find and mark the left item
      var leftItem = container.querySelector('.match-item-left[data-pair-index="' + leftIdx + '"]');
      if (leftItem) {
        leftItem.classList.remove('selected');
        leftItem.classList.add('matched');
        // Flip animation
        leftItem.classList.add('flip-match');
        setTimeout(function () { leftItem.classList.remove('flip-match'); }, 400);
      }
      item.classList.add('matched');
      item.classList.add('flip-match');
      setTimeout(function () { item.classList.remove('flip-match'); }, 400);

      state.matchSelectedLeft = null;

      // Update pairs counter
      updatePairsCounter(ans.userAnswer.matched.length, exercise.pairs.length);

      // Check if all matched
      if (ans.userAnswer.matched.length === exercise.pairs.length) {
        ans.answered = true;
        ans.correct = (state.matchWrongAttempts[index] === 0);

        // Gamification feedback
        if (ans.correct) {
          incrementStreak();
          awardPoints(exercise.type, container);
          flashCardCorrect();
        } else {
          // Still award some points for completing, but no streak
          resetStreak();
        }
        launchConfetti('small');
        recordExerciseTime();

        if (exercise.explanation) {
          // Small delay so the match animation can finish
          setTimeout(function () {
            var content = document.getElementById('exercise-card');
            if (content) content.appendChild(createExplanation(exercise.explanation));
          }, 400);
        }
      }
    } else {
      // Wrong match
      state.matchWrongAttempts[index]++;
      item.classList.add('wrong');

      // Remove the wrong class after animation
      setTimeout(function () {
        item.classList.remove('wrong');
      }, 600);
    }
  }

  // ─── Results ──────────────────────────────────────────────────────

  /**
   * Calculate final score and show the results screen.
   */
  function showResults() {
    clearTimer();

    var arena = document.getElementById('exercise-arena');
    var results = document.getElementById('results-panel');
    if (arena) arena.style.display = 'none';
    if (results) results.style.display = 'block';

    // Calculate stats
    var correct = 0;
    var incorrect = 0;
    var skipped = 0;

    state.answers.forEach(function (a) {
      if (a.skipped || !a.answered) {
        skipped++;
      } else if (a.correct === true) {
        correct++;
      } else {
        incorrect++;
      }
    });

    var total = state.exercises.length;
    var pct = total > 0 ? Math.round((correct / total) * 100) : 0;

    // Title
    var titleEl = document.getElementById('results-title');
    if (titleEl) {
      if (pct === 100) {
        titleEl.textContent = 'Perfect Score!';
      } else if (pct > 70) {
        titleEl.textContent = 'Great Job!';
      } else {
        titleEl.textContent = 'Keep Practicing!';
      }
    }

    // Subtitle
    var subtitleEl = document.getElementById('results-subtitle');
    if (subtitleEl) subtitleEl.textContent = 'You answered ' + correct + ' out of ' + total + ' correctly';

    // Score percentage text — animate count-up
    var scorePct = document.getElementById('score-text');
    if (scorePct) {
      animateCountUp(scorePct, 0, pct, 800, '%');
    }

    // Counts — animate count-up
    var correctCount = document.getElementById('correct-count');
    var incorrectCount = document.getElementById('incorrect-count');
    var skippedCount = document.getElementById('skipped-count');

    if (correctCount) animateCountUp(correctCount, 0, correct, 600, '');
    if (incorrectCount) animateCountUp(incorrectCount, 0, incorrect, 600, '');
    if (skippedCount) animateCountUp(skippedCount, 0, skipped, 600, '');

    // Animate the SVG ring
    animateScoreRing(pct);

    // Inject star rating
    injectStarRating(results, pct);

    // Inject total points
    injectPointsSummary(results, pct);

    // Inject average time if timed mode was used
    injectTimeSummary(results);

    // Confetti celebrations for session results
    setTimeout(function () {
      if (pct === 100) {
        launchConfetti('golden');
      } else if (pct > 80) {
        launchConfetti('medium');
      }
    }, 500);

    // Wire up result actions
    var retryBtn = document.getElementById('retry-btn');
    var newTopicBtn = document.getElementById('new-topic-btn');

    if (retryBtn) {
      // Remove old listeners by cloning
      var newRetry = retryBtn.cloneNode(true);
      retryBtn.parentNode.replaceChild(newRetry, retryBtn);
      newRetry.addEventListener('click', function () {
        cleanupResultsExtras();
        results.style.display = 'none';
        startSession();
      });
    }

    if (newTopicBtn) {
      var newNew = newTopicBtn.cloneNode(true);
      newTopicBtn.parentNode.replaceChild(newNew, newTopicBtn);
      newNew.addEventListener('click', function () {
        cleanupResultsExtras();
        resetToConfig();
      });
    }
  }

  /**
   * Animate a number counting up in an element.
   */
  function animateCountUp(el, from, to, duration, suffix) {
    var startTime = null;
    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.round(from + (to - from) * eased);
      el.textContent = current + (suffix || '');
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /**
   * Inject star rating into results panel.
   */
  function injectStarRating(results, pct) {
    // Remove old star rating if present
    var old = results.querySelector('.star-rating');
    if (old) old.remove();

    var starCount;
    if (pct > 90) starCount = 3;
    else if (pct > 70) starCount = 2;
    else if (pct > 50) starCount = 1;
    else starCount = 0;

    var starDiv = ce('div', 'star-rating');
    for (var i = 0; i < 3; i++) {
      var star = ce('span', 'star');
      star.textContent = i < starCount ? '\u2605' : '\u2606';
      starDiv.appendChild(star);
    }

    // Insert after the score-text or subtitle
    var scoreText = results.querySelector('#score-text');
    var insertAfter = scoreText ? scoreText.parentNode : null;
    if (insertAfter && insertAfter.parentNode) {
      insertAfter.parentNode.insertBefore(starDiv, insertAfter.nextSibling);
    } else {
      // Fallback: prepend to results
      results.insertBefore(starDiv, results.firstChild);
    }
  }

  /**
   * Inject total points summary into results.
   */
  function injectPointsSummary(results, pct) {
    var old = results.querySelector('.results-points-total');
    if (old) old.remove();

    var pointsDiv = ce('div', 'results-points-total');
    var streakInfo = state.maxStreak > 0 ? '  |  Best streak: ' + state.maxStreak : '';

    // Animate points count-up
    pointsDiv.textContent = '0 points' + streakInfo;
    animateCountUp(pointsDiv, 0, state.totalPoints, 800, ' points' + streakInfo);

    // Append after star rating or after score text
    var starRating = results.querySelector('.star-rating');
    var target = starRating || results.querySelector('#score-text');
    if (target && target.parentNode) {
      target.parentNode.insertBefore(pointsDiv, target.nextSibling);
    } else {
      results.appendChild(pointsDiv);
    }

    // Special perfect score message
    if (pct === 100) {
      var perfectMsg = ce('p', '');
      perfectMsg.style.cssText = 'text-align:center; font-weight:600; color:#f59e0b; margin:0.5rem 0;';
      perfectMsg.textContent = '\uD83C\uDFC6 Flawless victory! You are a coding master!';
      perfectMsg.className = 'results-perfect-msg';
      pointsDiv.parentNode.insertBefore(perfectMsg, pointsDiv.nextSibling);
    }
  }

  /**
   * Inject average time per exercise into results if timed mode was used.
   */
  function injectTimeSummary(results) {
    var old = results.querySelector('.results-time-summary');
    if (old) old.remove();

    if (!state.timedMode || state.exerciseTimes.length === 0) return;

    var sum = state.exerciseTimes.reduce(function (a, b) { return a + b; }, 0);
    var avg = Math.round(sum / state.exerciseTimes.length);

    var timeDiv = ce('div', 'results-time-summary');
    timeDiv.style.cssText = 'text-align:center; font-size:0.9rem; color:var(--color-text-light); margin:0.5rem 0;';
    timeDiv.textContent = '\u23F1 Average time: ' + avg + 's per exercise';

    var pointsTotal = results.querySelector('.results-points-total');
    if (pointsTotal && pointsTotal.parentNode) {
      pointsTotal.parentNode.insertBefore(timeDiv, pointsTotal.nextSibling);
    } else {
      results.appendChild(timeDiv);
    }
  }

  /**
   * Remove dynamically injected results extras before starting a new session.
   */
  function cleanupResultsExtras() {
    var selectors = ['.star-rating', '.results-points-total', '.results-time-summary', '.results-perfect-msg'];
    selectors.forEach(function (sel) {
      var el = document.querySelector(sel);
      if (el) el.remove();
    });
  }

  /**
   * Animate the SVG score ring from 0 to the given percentage.
   * Expects an SVG circle with id="score-ring" whose stroke-dasharray
   * is set to the circumference (e.g. 2 * PI * r).
   */
  function animateScoreRing(pct) {
    var ring = document.getElementById('score-ring');
    if (!ring) return;

    // Read the circumference from stroke-dasharray
    var circumference = parseFloat(ring.getAttribute('stroke-dasharray'));
    if (!circumference || isNaN(circumference)) {
      // Try to calculate from the r attribute
      var r = parseFloat(ring.getAttribute('r'));
      if (!r || isNaN(r)) return;
      circumference = 2 * Math.PI * r;
      ring.setAttribute('stroke-dasharray', circumference);
    }

    // Start fully hidden
    var offset = circumference;
    ring.style.strokeDashoffset = offset;

    // Target offset
    var targetOffset = circumference - (pct / 100) * circumference;

    // Animate over ~800ms
    var startTime = null;
    var duration = 800;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var elapsed = timestamp - startTime;
      var progress = Math.min(elapsed / duration, 1);

      // Ease-out
      var eased = 1 - Math.pow(1 - progress, 3);
      ring.style.strokeDashoffset = offset - (offset - targetOffset) * eased;

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

})();
