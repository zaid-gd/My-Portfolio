// Utility: throttle for scroll events
function throttle(fn, wait) {
  let last = 0;
  return function throttled(...args) {
    const now = Date.now();
    if (now - last >= wait) {
      last = now;
      fn.apply(this, args);
    }
  };
}

// Smooth scroll for in-page links
document.addEventListener('click', (e) => {
  const target = e.target;
  if (target.matches('a[href^="#"]')) {
    const href = target.getAttribute('href');
    const el = document.querySelector(href);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
});

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');
if (navToggle && navList) {
  navToggle.addEventListener('click', () => {
    const open = navList.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
}

// Scroll progress bar
const progressBar = document.getElementById('scroll-progress');
function updateProgress() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  if (progressBar) progressBar.style.width = progress + '%';
}
window.addEventListener('scroll', throttle(updateProgress, 20), { passive: true });
updateProgress();

// IntersectionObserver: section highlighting + reveals
const navLinks = Array.from(document.querySelectorAll('.nav-link'));
const sections = Array.from(document.querySelectorAll('main section, #hero'));

// Reveal animations
const revealEls = Array.from(document.querySelectorAll('.reveal-up, .reveal-fade'));
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const delay = Number(entry.target.getAttribute('data-delay') || 0);
      setTimeout(() => {
        entry.target.classList.add('is-visible');
      }, delay * 1000);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach((el) => revealObserver.observe(el));

// Active nav link based on scroll position
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const id = entry.target.getAttribute('id');
    if (!id) return;
    const link = navLinks.find((l) => l.getAttribute('href') === '#' + id);
    if (!link) return;
    if (entry.isIntersecting) {
      navLinks.forEach((l) => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
}, { threshold: 0.55 });
sections.forEach((s) => sectionObserver.observe(s));

// Parallax hero layers
const layers = Array.from(document.querySelectorAll('.layer'));
function updateParallax() {
  const scrollY = window.scrollY || window.pageYOffset;
  layers.forEach((layer) => {
    const depth = Number(layer.getAttribute('data-depth') || 0.1);
    const translateY = scrollY * depth * 0.25; // subtle
    layer.style.transform = `translate3d(0, ${translateY}px, 0)`;
  });
}
window.addEventListener('scroll', throttle(updateParallax, 20), { passive: true });
updateParallax();

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}


