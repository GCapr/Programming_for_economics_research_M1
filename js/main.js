/**
 * ProTools ER1 Course
 * Interactive JavaScript functionality
 */

document.addEventListener('DOMContentLoaded', function() {
  // Code tab switching
  initCodeTabs();

  // Mobile menu toggle
  initMobileMenu();

  // Smooth scroll for anchor links
  initSmoothScroll();

  // Active navigation highlighting
  initActiveNav();

  // Copy code functionality
  initCopyCode();

  // Read Like a Novel - prose view for code blocks
  initReadLikeNovel();

  // Hotspot tooltip positioning
  initHotspotTooltips();

  // Collapsible sidebar sub-navigation
  initCollapsibleSubnav();

  // Run code buttons for output simulation
  initRunButtons();
});

/**
 * Initialize code tab switching functionality
 */
function initCodeTabs() {
  const tabContainers = document.querySelectorAll('.code-tabs');
  
  tabContainers.forEach(container => {
    const buttons = container.querySelectorAll('.tab-button');
    const contents = container.querySelectorAll('.tab-content');
    
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const lang = button.dataset.lang;
        
        // Update button states
        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Update content visibility and exit any active novel mode
        contents.forEach(content => {
          content.classList.remove('active');
          if (content.dataset.lang === lang) {
            content.classList.add('active');
          }
          // Reset novel mode when switching tabs
          var novelPanel = content.querySelector('.novel-panel');
          if (novelPanel) {
            var pre = content.querySelector('pre');
            if (pre) pre.style.display = '';
            novelPanel.remove();
            content.classList.remove('novel-active');
          }
        });

        // Store preference
        localStorage.setItem('preferredLang', lang);
      });
    });
    
    // Set initial state based on preference
    const preferredLang = localStorage.getItem('preferredLang') || 'python';
    const preferredButton = container.querySelector(`[data-lang="${preferredLang}"]`);
    if (preferredButton) {
      preferredButton.click();
    }
  });
}

/**
 * Initialize mobile menu toggle
 */
function initMobileMenu() {
  const toggle = document.querySelector('.mobile-menu-toggle');
  const sidebar = document.querySelector('.sidebar');
  
  if (toggle && sidebar) {
    toggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      toggle.setAttribute('aria-expanded', sidebar.classList.contains('open'));
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!sidebar.contains(e.target) && !toggle.contains(e.target)) {
        sidebar.classList.remove('open');
      }
    });
  }
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/**
 * Initialize active navigation highlighting based on scroll position
 */
function initActiveNav() {
  const sections = document.querySelectorAll('h2[id], h3[id]');
  const navLinks = document.querySelectorAll('.toc a');
  
  if (sections.length === 0) return;
  
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { rootMargin: '-20% 0% -80% 0%' });
  
  sections.forEach(section => observer.observe(section));
}

/**
 * Initialize copy code functionality
 */
function initCopyCode() {
  document.querySelectorAll('pre').forEach(pre => {
    const button = document.createElement('button');
    button.className = 'copy-btn';
    button.textContent = 'Copy';
    button.setAttribute('aria-label', 'Copy code to clipboard');
    
    button.addEventListener('click', async () => {
      const code = pre.querySelector('code');
      const text = code ? code.textContent : pre.textContent;
      
      try {
        await navigator.clipboard.writeText(text);
        button.textContent = 'Copied!';
        button.classList.add('copied');
        setTimeout(() => {
          button.textContent = 'Copy';
          button.classList.remove('copied');
        }, 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
        button.textContent = 'Failed';
      }
    });
    
    pre.style.position = 'relative';
    pre.appendChild(button);
  });
  
  // Add styles for copy button
  const style = document.createElement('style');
  style.textContent = `
    .copy-btn {
      position: absolute;
      top: 8px;
      right: 8px;
      padding: 4px 12px;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 4px;
      color: #888;
      font-size: 12px;
      cursor: pointer;
      opacity: 0;
      transition: all 0.2s ease;
    }
    
    pre:hover .copy-btn {
      opacity: 1;
    }
    
    .copy-btn:hover {
      background: rgba(255, 255, 255, 0.2);
      color: #fff;
    }
    
    .copy-btn.copied {
      background: #38a169;
      border-color: #38a169;
      color: white;
    }
  `;
  document.head.appendChild(style);
}

/**
 * Initialize "Read Like a Novel" functionality
 * Adds a button to each code block that generates a prose narrative
 * from the semantic markup and tooltip annotations
 */
function initReadLikeNovel() {
  var narrativeCache = new WeakMap();

  // Only target <pre> elements inside .tab-content (the actual code blocks)
  document.querySelectorAll('.tab-content pre').forEach(function(pre) {
    var codeEl = pre.querySelector('code');
    if (!codeEl) return;

    var btn = document.createElement('button');
    btn.className = 'read-novel-btn';
    btn.textContent = 'Read Like a Novel';
    btn.setAttribute('aria-label', 'Read this code as a narrative explanation');
    btn.setAttribute('title', 'Read Like a Novel');

    btn.addEventListener('click', function() {
      var tabContent = pre.closest('.tab-content');
      if (!tabContent) return;

      // Toggle: if already in novel mode, go back to code
      var existingPanel = tabContent.querySelector('.novel-panel');
      if (existingPanel) {
        exitNovelMode(tabContent, pre, existingPanel);
        return;
      }

      enterNovelMode(tabContent, pre, codeEl);
    });

    pre.appendChild(btn);
  });

  // --- Mode switching ---

  function enterNovelMode(tabContent, pre, codeEl) {
    var narrativeHtml = getOrGenerate(codeEl);

    var panel = document.createElement('div');
    panel.className = 'novel-panel';
    panel.innerHTML =
      '<div class="novel-header">' +
        '<span class="novel-title">Reading: Code as Prose</span>' +
        '<button class="novel-back-btn">\u2190 Back to Code</button>' +
      '</div>' +
      '<div class="novel-body">' + narrativeHtml + '</div>';

    panel.querySelector('.novel-back-btn').addEventListener('click', function() {
      exitNovelMode(tabContent, pre, panel);
    });

    pre.style.display = 'none';
    tabContent.classList.add('novel-active');

    var runBtn = tabContent.querySelector('.run-btn');
    if (runBtn) {
      tabContent.insertBefore(panel, runBtn);
    } else {
      tabContent.appendChild(panel);
    }

    panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function exitNovelMode(tabContent, pre, panel) {
    panel.remove();
    pre.style.display = '';
    tabContent.classList.remove('novel-active');
  }

  function getOrGenerate(codeEl) {
    if (narrativeCache.has(codeEl)) return narrativeCache.get(codeEl);
    var html = generateNarrative(codeEl);
    narrativeCache.set(codeEl, html);
    return html;
  }

  // --- Narrative generation ---

  function generateNarrative(codeEl) {
    var lines = parseCodeLines(codeEl);

    if (lines.length === 0) {
      return '<p class="novel-no-annotations">This code block is empty.</p>';
    }

    var html = '';
    for (var i = 0; i < lines.length; i++) {
      var type = classifyLine(lines[i].dom);
      switch (type) {
        case 'blank':
          html += '<div class="novel-break"></div>';
          break;
        case 'comment':
          html += narrateComment(lines[i].dom);
          break;
        case 'code-with-tooltips':
          html += narrateCodeWithTooltips(lines[i].dom);
          break;
        case 'code-plain':
          html += narratePlainCode(lines[i].dom);
          break;
      }
    }

    return html;
  }

  function parseCodeLines(codeEl) {
    var rawHTML = codeEl.innerHTML;
    var htmlLines = rawHTML.split('\n');
    return htmlLines.map(function(lineHtml) {
      var container = document.createElement('span');
      container.innerHTML = lineHtml;
      return { html: lineHtml, dom: container };
    });
  }

  function classifyLine(dom) {
    var text = dom.textContent.trim();
    if (text === '') return 'blank';

    // Check if line is comment-only
    var comments = dom.querySelectorAll('.code-comment');
    if (comments.length > 0) {
      var clone = dom.cloneNode(true);
      clone.querySelectorAll('.code-comment').forEach(function(c) { c.remove(); });
      if (clone.textContent.trim() === '') return 'comment';
    }

    if (dom.querySelector('.code-tooltip[data-tip]')) return 'code-with-tooltips';

    return 'code-plain';
  }

  function narrateComment(dom) {
    var commentEl = dom.querySelector('.code-comment');
    var text = commentEl.textContent;
    // Strip comment markers: # * // ---
    text = text.replace(/^[\s]*[#*]+\s?/, '').replace(/^[\s]*\/\/\s?/, '').trim();
    if (text === '') return '';
    return '<p class="novel-context"><em>' + escapeHtmlText(text) + '</em></p>';
  }

  function narrateCodeWithTooltips(dom) {
    var codeText = dom.textContent.trim();

    // Check for trailing inline comment
    var trailingComment = '';
    var commentInLine = dom.querySelector('.code-comment');
    if (commentInLine) {
      var clone = dom.cloneNode(true);
      clone.querySelectorAll('.code-comment').forEach(function(c) { c.remove(); });
      var pureCodeText = clone.textContent.trim();
      if (pureCodeText !== '') {
        trailingComment = commentInLine.textContent
          .replace(/^[\s]*[#*]+\s?/, '')
          .replace(/^[\s]*\/\/\s?/, '')
          .trim();
      }
    }

    // Collect top-level vs nested tooltips
    var allTooltips = dom.querySelectorAll('.code-tooltip[data-tip]');
    var topLevel = [];
    var nested = [];

    allTooltips.forEach(function(tt) {
      var parent = tt.parentElement ? tt.parentElement.closest('.code-tooltip[data-tip]') : null;
      if (parent && dom.contains(parent)) {
        nested.push(tt);
      } else {
        topLevel.push(tt);
      }
    });

    var html = '<p class="novel-code-line">';
    html += '<code class="novel-inline-code">' + escapeHtmlText(codeText) + '</code>';
    html += '</p>';

    if (trailingComment) {
      html += '<p class="novel-context"><em>' + escapeHtmlText(trailingComment) + '</em></p>';
    }

    if (topLevel.length > 0) {
      html += '<p class="novel-explanation">';
      var explanations = topLevel.map(function(tt) {
        return extractProse(tt.getAttribute('data-tip'));
      });
      html += explanations.join(' ');

      if (nested.length > 0) {
        var nestedExplanations = nested.map(function(tt) {
          return extractProse(tt.getAttribute('data-tip'));
        });
        html += ' ' + nestedExplanations.join(' ');
      }

      html += '</p>';
    }

    return html;
  }

  function narratePlainCode(dom) {
    var codeText = dom.textContent.trim();

    // Check for inline comment
    var trailingComment = '';
    var commentInLine = dom.querySelector('.code-comment');
    if (commentInLine) {
      trailingComment = commentInLine.textContent
        .replace(/^[\s]*[#*]+\s?/, '')
        .replace(/^[\s]*\/\/\s?/, '')
        .trim();
    }

    var html = '<p class="novel-code-line">';
    html += '<code class="novel-inline-code">' + escapeHtmlText(codeText) + '</code>';
    html += '</p>';

    if (trailingComment) {
      html += '<p class="novel-explanation-plain">' + escapeHtmlText(trailingComment) + '</p>';
    } else {
      var desc = buildSemanticDescription(dom);
      if (desc) {
        html += '<p class="novel-explanation-plain">' + desc + '</p>';
      }
    }

    return html;
  }

  function buildSemanticDescription(dom) {
    var parts = [];
    var kws = dom.querySelectorAll('.code-keyword');
    var fns = dom.querySelectorAll('.code-function');
    var pkgs = dom.querySelectorAll('.code-package');

    if (kws.length > 0) {
      var kwTexts = Array.from(kws).map(function(k) { return k.textContent.trim(); }).filter(Boolean);
      if (kwTexts.length) {
        parts.push('uses ' + kwTexts.map(function(k) {
          return '<code>' + escapeHtmlText(k) + '</code>';
        }).join(', '));
      }
    }
    if (fns.length > 0) {
      var fnTexts = Array.from(fns).map(function(f) { return f.textContent.trim(); }).filter(Boolean);
      if (fnTexts.length) {
        parts.push('calls ' + fnTexts.map(function(f) {
          return '<code>' + escapeHtmlText(f) + '</code>';
        }).join(', '));
      }
    }
    if (pkgs.length > 0) {
      var pkgTexts = Array.from(pkgs).map(function(p) { return p.textContent.trim(); }).filter(Boolean);
      if (pkgTexts.length) {
        parts.push('from ' + pkgTexts.map(function(p) {
          return '<code>' + escapeHtmlText(p) + '</code>';
        }).join(', '));
      }
    }

    if (parts.length === 0) return '';
    return 'This line ' + parts.join(', ') + '.';
  }

  function extractProse(tipText) {
    var text = tipText;
    // Strip leading ALL-CAPS labels like "IMPORT:", "VARIABLE ASSIGNMENT:", etc.
    var match = text.match(/^[A-Z_().\s]{2,40}:\s*/);
    if (match) {
      text = text.substring(match[0].length);
    }
    text = text.trim();
    if (text && !text.endsWith('.') && !text.endsWith('!') && !text.endsWith('?')) {
      text += '.';
    }
    return text;
  }

  function escapeHtmlText(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
}

/**
 * Utility: Format date
 */
function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

/**
 * Track reading progress (optional enhancement)
 */
function trackProgress() {
  const content = document.querySelector('.content');
  if (!content) return;
  
  const progressBar = document.createElement('div');
  progressBar.className = 'reading-progress';
  progressBar.innerHTML = '<div class="reading-progress-bar"></div>';
  document.body.appendChild(progressBar);
  
  const bar = progressBar.querySelector('.reading-progress-bar');
  
  window.addEventListener('scroll', () => {
    const contentTop = content.offsetTop;
    const contentHeight = content.offsetHeight;
    const windowHeight = window.innerHeight;
    const scrollTop = window.scrollY;
    
    const progress = Math.min(100, Math.max(0,
      ((scrollTop - contentTop + windowHeight) / contentHeight) * 100
    ));
    
    bar.style.width = progress + '%';
  });
  
  // Add styles
  const style = document.createElement('style');
  style.textContent = `
    .reading-progress {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: rgba(0,0,0,0.1);
      z-index: 1000;
    }
    .reading-progress-bar {
      height: 100%;
      background: var(--color-accent);
      width: 0;
      transition: width 0.1s ease;
    }
  `;
  document.head.appendChild(style);
}

/**
 * Initialize hotspot tooltip positioning
 * Moves tooltips to body and positions them with fixed positioning
 * to ensure they're always visible regardless of parent overflow settings
 */
function initHotspotTooltips() {
  const hotspots = document.querySelectorAll('.hotspot');

  hotspots.forEach(hotspot => {
    const tooltip = hotspot.querySelector('.hotspot-tooltip');
    if (!tooltip) return;

    // Move tooltip to body to escape any overflow:hidden containers
    document.body.appendChild(tooltip);

    // Store reference to hotspot on tooltip for cleanup
    tooltip._hotspot = hotspot;

    // Position and show tooltip on mouse enter
    hotspot.addEventListener('mouseenter', () => {
      positionTooltip(hotspot, tooltip);
      tooltip.style.opacity = '1';
      tooltip.style.visibility = 'visible';
    });

    // Hide tooltip on mouse leave
    hotspot.addEventListener('mouseleave', () => {
      tooltip.style.opacity = '0';
      tooltip.style.visibility = 'hidden';
    });

    // Also handle touch devices
    hotspot.addEventListener('touchstart', (e) => {
      e.preventDefault();
      positionTooltip(hotspot, tooltip);
      tooltip.style.opacity = '1';
      tooltip.style.visibility = 'visible';

      // Hide on touch elsewhere
      const hideTooltip = () => {
        tooltip.style.opacity = '0';
        tooltip.style.visibility = 'hidden';
        document.removeEventListener('touchstart', hideTooltip);
      };
      setTimeout(() => {
        document.addEventListener('touchstart', hideTooltip);
      }, 100);
    });
  });
}

/**
 * Position a tooltip relative to its hotspot
 */
function positionTooltip(hotspot, tooltip) {
  const hotspotRect = hotspot.getBoundingClientRect();
  const tooltipWidth = 280;
  const tooltipHeight = tooltip.offsetHeight || 150;
  const padding = 15;
  const arrowSize = 10;

  // Get viewport dimensions
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  // Determine best position based on available space
  const spaceRight = viewportWidth - hotspotRect.right;
  const spaceLeft = hotspotRect.left;
  const spaceTop = hotspotRect.top;
  const spaceBottom = viewportHeight - hotspotRect.bottom;

  let top, left;
  let position = 'right'; // default

  // Determine best position
  if (spaceRight >= tooltipWidth + padding) {
    // Position to the right
    position = 'right';
    left = hotspotRect.right + arrowSize;
    top = hotspotRect.top + (hotspotRect.height / 2) - (tooltipHeight / 2);
  } else if (spaceLeft >= tooltipWidth + padding) {
    // Position to the left
    position = 'left';
    left = hotspotRect.left - tooltipWidth - arrowSize;
    top = hotspotRect.top + (hotspotRect.height / 2) - (tooltipHeight / 2);
  } else if (spaceTop >= tooltipHeight + padding) {
    // Position above
    position = 'top';
    left = hotspotRect.left + (hotspotRect.width / 2) - (tooltipWidth / 2);
    top = hotspotRect.top - tooltipHeight - arrowSize;
  } else {
    // Position below
    position = 'bottom';
    left = hotspotRect.left + (hotspotRect.width / 2) - (tooltipWidth / 2);
    top = hotspotRect.bottom + arrowSize;
  }

  // Keep tooltip within viewport bounds
  if (left < padding) left = padding;
  if (left + tooltipWidth > viewportWidth - padding) {
    left = viewportWidth - tooltipWidth - padding;
  }
  if (top < padding) top = padding;
  if (top + tooltipHeight > viewportHeight - padding) {
    top = viewportHeight - tooltipHeight - padding;
  }

  // Apply position
  tooltip.style.position = 'fixed';
  tooltip.style.top = top + 'px';
  tooltip.style.left = left + 'px';
  tooltip.style.transform = 'none';

  // Update arrow position class
  tooltip.classList.remove('top', 'bottom', 'left', 'right');
  tooltip.classList.add(position);
}

/**
 * Initialize run code buttons for output simulation
 * Handles showing/hiding simulated output for code examples
 */
function initRunButtons() {
  // Handle run button clicks
  document.querySelectorAll('.run-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const lang = this.dataset.lang;
      const codeBlock = this.closest('.code-tabs');
      const outputId = codeBlock ? codeBlock.dataset.runnable : null;

      if (!outputId) return;

      // Change button state temporarily
      const originalText = this.textContent;
      this.textContent = 'Running...';
      this.disabled = true;

      // Simulate a brief delay for "execution"
      setTimeout(() => {
        this.textContent = originalText;
        this.disabled = false;

        // Try both output formats for compatibility:
        // Format 1: .output-simulation[data-output][data-lang] (legacy)
        const legacyOutput = document.querySelector(`.output-simulation[data-output="${outputId}"][data-lang="${lang}"]`);
        if (legacyOutput) {
          // Hide all outputs for this code block first
          document.querySelectorAll(`.output-simulation[data-output="${outputId}"]`).forEach(out => {
            out.classList.remove('visible');
          });
          legacyOutput.classList.add('visible');
          legacyOutput.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          return;
        }

        // Format 2: .code-output-wrapper[data-for] (new format)
        const newOutput = document.querySelector(`.code-output-wrapper[data-for="${outputId}"]`);
        if (newOutput) {
          // Toggle visibility with animation
          if (newOutput.style.display === 'none' || !newOutput.style.display) {
            newOutput.style.display = 'block';
            newOutput.style.opacity = '0';
            newOutput.style.transform = 'translateY(-10px)';
            // Trigger reflow
            newOutput.offsetHeight;
            newOutput.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            newOutput.style.opacity = '1';
            newOutput.style.transform = 'translateY(0)';
            // Scroll into view
            setTimeout(() => {
              newOutput.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
          }
        }
      }, 400);
    });
  });

  // Handle close output button clicks (legacy format)
  document.querySelectorAll('.close-output').forEach(btn => {
    btn.addEventListener('click', function() {
      this.closest('.output-simulation').classList.remove('visible');
    });
  });

  // Add click-to-close for new format outputs
  document.querySelectorAll('.code-output-wrapper .output-header').forEach(header => {
    header.style.cursor = 'pointer';
    header.title = 'Click to hide output';
    header.addEventListener('click', function() {
      const wrapper = this.closest('.code-output-wrapper');
      if (wrapper) {
        wrapper.style.opacity = '0';
        wrapper.style.transform = 'translateY(-10px)';
        setTimeout(() => {
          wrapper.style.display = 'none';
        }, 300);
      }
    });
  });
}

/**
 * Initialize collapsible sidebar sub-navigation
 * Allows clicking on parent items to expand/collapse sub-menus
 */
function initCollapsibleSubnav() {
  const sidebar = document.querySelector('.sidebar nav');
  if (!sidebar) return;

  // Find all items with sub-navs
  const itemsWithSubnav = sidebar.querySelectorAll('li.has-subnav');

  itemsWithSubnav.forEach(parentLi => {
    const subnav = parentLi.querySelector(':scope > ul.sub-nav');
    const parentLink = parentLi.querySelector(':scope > a');

    if (!subnav || !parentLink) return;

    // Check if any subitem is active (active class can be on li or a) - if so, expand by default
    const hasActiveChild = subnav.querySelector('li.active') !== null ||
                          subnav.querySelector('a.active') !== null;
    const parentIsActive = parentLi.classList.contains('active');

    if (hasActiveChild || parentIsActive) {
      parentLi.classList.add('expanded');
      subnav.classList.add('expanded');
    }

    // Create a clickable toggle button for expand/collapse (the +/- indicator)
    const toggleBtn = document.createElement('span');
    toggleBtn.className = 'subnav-toggle';
    toggleBtn.setAttribute('aria-label', 'Toggle submenu');
    toggleBtn.setAttribute('role', 'button');
    toggleBtn.setAttribute('tabindex', '0');
    parentLink.appendChild(toggleBtn);

    // Toggle on clicking the toggle button (prevents navigation)
    toggleBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      parentLi.classList.toggle('expanded');
      subnav.classList.toggle('expanded');
    });

    // Allow keyboard activation
    toggleBtn.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        e.stopPropagation();
        parentLi.classList.toggle('expanded');
        subnav.classList.toggle('expanded');
      }
    });

    // If clicking the link text and already on that page, just toggle (don't navigate)
    parentLink.addEventListener('click', function(e) {
      // If clicked on toggle button, it's already handled
      if (e.target === toggleBtn) return;

      const href = parentLink.getAttribute('href');
      const currentPath = window.location.pathname;
      const isCurrentPage = currentPath.endsWith(href) ||
                           currentPath.endsWith(href.replace('../', '')) ||
                           currentPath.endsWith(href.replace('./', ''));

      if (isCurrentPage) {
        e.preventDefault();
        parentLi.classList.toggle('expanded');
        subnav.classList.toggle('expanded');
      }
    });
  });
}
