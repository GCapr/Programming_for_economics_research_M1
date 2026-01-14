/**
 * Data Science Foundations Course
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
        
        // Update content visibility
        contents.forEach(content => {
          content.classList.remove('active');
          if (content.dataset.lang === lang) {
            content.classList.add('active');
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
