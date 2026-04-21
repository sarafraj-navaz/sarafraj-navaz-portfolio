/* ─── LOADING ─── */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loading').classList.add('hidden');
    // Trigger initial reveals
    revealOnScroll();
  }, 1400);
});

/* ─── CURSOR GLOW ─── */
const glow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', e => {
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});

/* ─── THEME TOGGLE ─── */
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const themeLabel = document.getElementById('themeLabel');

const savedTheme = localStorage.getItem('theme') || 'dark';
applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = document.body.classList.contains('light-theme') ? 'light' : 'dark';
  const next = current === 'light' ? 'dark' : 'light';
  applyTheme(next);
  localStorage.setItem('theme', next);
});

function applyTheme(theme) {
  document.body.classList.toggle('light-theme', theme === 'light');
  if (theme === 'light') {
    themeIcon.className = 'fas fa-sun';
    themeLabel.textContent = 'Light Mode';
  } else {
    themeIcon.className = 'fas fa-moon';
    themeLabel.textContent = 'Dark Mode';
  }
}

/* ─── SMOOTH NAV SCROLL ─── */
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
    }
  });
});

/* ─── ACTIVE NAV ON SCROLL ─── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateNav() {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.dataset.section === current) link.classList.add('active');
  });
}

/* ─── SCROLL REVEAL ─── */
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

/* ─── SCROLL TO TOP ─── */
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  updateNav();
  scrollTopBtn.classList.toggle('show', window.scrollY > 400);
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ─── SKILL HOVER TOOLTIP ─── */
document.querySelectorAll('.skill-item').forEach(item => {
  item.addEventListener('mouseenter', () => {
    item.style.setProperty('--hover', '1');
  });
});

/* ─── TYPING EFFECT on banner headline ─── */
window.addEventListener('load', () => {
  setTimeout(() => {
    const headline = document.querySelector('.banner-headline');
    if (!headline) return;
    headline.style.opacity = '0';
    headline.style.transform = 'translateY(12px)';
    headline.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    setTimeout(() => {
      headline.style.opacity = '1';
      headline.style.transform = 'translateY(0)';
    }, 300);
  }, 1500);
});