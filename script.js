// ─── LOADING SCREEN ───
window.addEventListener('load', () => {
  setTimeout(() => {
    const loading = document.getElementById('loading');
    if (loading) loading.classList.add('hidden');
    revealOnScroll();
  }, 1400);
});

// ─── CURSOR GLOW ───
const glow = document.getElementById('cursorGlow');
if (glow) {
  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
}

// ─── THEME TOGGLE ───
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const themeLabel = document.getElementById('themeLabel');

const savedTheme = localStorage.getItem('theme') || 'dark';
applyTheme(savedTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = document.body.classList.contains('light-theme') ? 'light' : 'dark';
    const next = current === 'light' ? 'dark' : 'light';
    applyTheme(next);
    localStorage.setItem('theme', next);
  });
}

function applyTheme(theme) {
  document.body.classList.toggle('light-theme', theme === 'light');
  if (theme === 'light') {
    if (themeIcon) themeIcon.className = 'fas fa-sun';
    if (themeLabel) themeLabel.textContent = 'Light Mode';
  } else {
    if (themeIcon) themeIcon.className = 'fas fa-moon';
    if (themeLabel) themeLabel.textContent = 'Dark Mode';
  }
}

// ─── SMOOTH NAV SCROLL ───
document.querySelectorAll('.nav-link, a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (!href || !href.startsWith('#')) return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
      
      // Update active state
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
});

// ─── ACTIVE NAV ON SCROLL ───
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateNav() {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) {
      current = sec.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.dataset.section === current) link.classList.add('active');
  });
}

// ─── SCROLL REVEAL ───
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

function revealOnScroll() {
  document.querySelectorAll('.reveal, .reveal-item').forEach(el => {
    revealObserver.observe(el);
  });
}

// ─── SCROLL TO TOP ───
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  updateNav();
  if (scrollTopBtn) {
    scrollTopBtn.classList.toggle('show', window.scrollY > 400);
  }
});

if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ─── COPY TO CLIPBOARD FUNCTION ───
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`📋 Copied: ${text}`);
  }).catch(() => {
    showToast('Failed to copy');
  });
}

// ─── TOAST NOTIFICATION ───
function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  
  toast.textContent = message;
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2000);
}

// ─── MAKE COPY BUTTONS WORK ───
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const parent = btn.closest('.contact-item');
    const valueElement = parent.querySelector('.contact-value');
    if (valueElement) {
      const textToCopy = valueElement.textContent.trim().replace(/[^\d+@a-z.]/gi, '');
      copyToClipboard(textToCopy);
    }
  });
});

// ─── SKILL HOVER EFFECT ───
document.querySelectorAll('.skill-item').forEach(item => {
  item.addEventListener('mouseenter', () => {
    item.style.setProperty('--hover', '1');
  });
});

// ─── BANNER ANIMATION ───
window.addEventListener('load', () => {
  setTimeout(() => {
    const headline = document.querySelector('.banner-headline');
    if (headline) {
      headline.style.opacity = '0';
      headline.style.transform = 'translateY(12px)';
      headline.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
      setTimeout(() => {
        headline.style.opacity = '1';
        headline.style.transform = 'translateY(0)';
      }, 300);
    }
  }, 1500);
});

// ─── PRELOADER WITH PROGRESS ───
let progress = 0;
const loadFill = document.querySelector('.load-fill');
if (loadFill) {
  const interval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
    }
    loadFill.style.width = progress + '%';
  }, 100);
}

// ─── ADD WHATSAPP CLICK TRACKING (Optional Analytics) ───
document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
  link.addEventListener('click', () => {
    console.log('WhatsApp clicked - Contact initiated');
    // You can add analytics tracking here
  });
});

// ─── ADD EMAIL CLICK TRACKING ───
document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
  link.addEventListener('click', () => {
    console.log('Email clicked - Contact initiated');
    // You can add analytics tracking here
  });
});

console.log('Portfolio loaded — Back & Better in 2026! 🚀');