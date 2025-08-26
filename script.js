// Personalization config
const SITE_CONTENT = {
  logo: "LG",
  name: "Legend",
  role: "Frontend Developer",
  tagline: "I build fast, elegant, and accessible web experiences.",
  about: {
    intro: "I craft performant UIs with modern tooling, component-driven architectures, and thoughtful micro-interactions. I care about clean design, accessibility, and maintainable code.",
    bullets: [
      "Responsive, mobile-first layouts",
      "Animations that enhance, not distract",
      "Semantic HTML and ARIA best practices",
    ],
  },
  skills: ["Video editing", "Game development", "Motion graphics (basics)"],
  projects: [
    { title: "Interactive Dashboard", blurb: "Real-time charts with smooth transitions and dynamic theming.", url: "#" },
    { title: "Portfolio Engine", blurb: "Static-site portfolio with markdown content and image optimization.", url: "#" },
    { title: "Landing Page Kit", blurb: "Accessible components and delightful micro-interactions.", url: "#" },
  ],
  socials: [
    { label: "GitHub", url: "#" },
    { label: "LinkedIn", url: "#" },
    { label: "Twitter", url: "#" },
  ],
  contactCta: "Have a project in mind? Let’s build something great together.",
};

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

// Populate static content from config
function populateContent() {
  const { logo, name, role, tagline, about, skills, projects, socials, contactCta } = SITE_CONTENT;

  const logoEl = document.querySelector('.logo');
  if (logoEl) logoEl.textContent = logo;

  const heroEyebrow = document.querySelector('.eyebrow');
  if (heroEyebrow) heroEyebrow.textContent = `Hi, I’m`;

  const headline = document.querySelector('.headline');
  if (headline) headline.textContent = `${name} • ${role}`;

  const subhead = document.querySelector('.subhead');
  if (subhead) subhead.textContent = tagline;

  const aboutP = document.querySelector('#about p');
  if (aboutP) aboutP.textContent = about.intro;

  const bulletsUl = document.querySelector('#about .bullets');
  if (bulletsUl) {
    bulletsUl.innerHTML = '';
    about.bullets.forEach((b) => {
      const li = document.createElement('li');
      li.textContent = b;
      bulletsUl.appendChild(li);
    });
  }

  const skillsCloud = document.querySelector('.skills-cloud');
  if (skillsCloud) {
    skillsCloud.innerHTML = '';
    skills.forEach((s, i) => {
      const span = document.createElement('span');
      span.className = 'tag reveal-up';
      span.setAttribute('data-delay', String(0.05 + i * 0.025));
      span.textContent = s;
      skillsCloud.appendChild(span);
    });
  }

  const cards = document.querySelector('#projects .cards');
  if (cards) {
    cards.innerHTML = '';
    projects.forEach((p, idx) => {
      const article = document.createElement('article');
      article.className = 'card reveal-fade';
      article.setAttribute('data-delay', String(0.05 + idx * 0.05));
      article.innerHTML = `
        <div class="card-media"></div>
        <div class="card-body">
          <h3>${p.title}</h3>
          <p>${p.blurb}</p>
          <a href="${p.url}" class="card-link" target="_blank" rel="noopener noreferrer">View project</a>
        </div>
      `;
      cards.appendChild(article);
    });
  }

  const socialsWrap = document.querySelector('.socials');
  if (socialsWrap) {
    socialsWrap.innerHTML = '';
    socials.forEach((s) => {
      const a = document.createElement('a');
      a.href = s.url;
      a.className = 'social';
      a.setAttribute('aria-label', s.label);
      a.textContent = s.label;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      socialsWrap.appendChild(a);
    });
  }

  const contactLead = document.querySelector('#contact .col p');
  if (contactLead) contactLead.textContent = contactCta;

  // Re-attach reveal observers for newly created elements
  const newReveals = Array.from(document.querySelectorAll('.reveal-up, .reveal-fade'));
  newReveals.forEach((el) => revealObserver.observe(el));
}

populateContent();


