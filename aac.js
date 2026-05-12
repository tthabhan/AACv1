// ─── SCROLL FADE-IN ANIMATION ───────────────────────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // fire once, then stop watching
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));


// ─── STAGGERED FADE FOR GROUPED ELEMENTS ────────────────────────────────────
// Work grid images and contact boxes stagger in one by one
const staggerObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const siblings = entry.target.parentElement.querySelectorAll('.fade-in');
      siblings.forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), i * 100);
      });
      staggerObserver.unobserve(entry.target); // only trigger once per group
    }
  });
}, { threshold: 0.1 });

// Apply stagger to work grid and contact grid children
document.querySelectorAll('.work-grid .fade-in, .contact-grid .fade-in')
  .forEach(el => {
    // Remove from regular observer, add to stagger observer
    observer.unobserve(el);
    staggerObserver.observe(el);
  });


// ─── ACTIVE NAV HIGHLIGHT ON SCROLL ─────────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav a');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle(
          'active',
          link.getAttribute('href') === `#${entry.target.id}`
        );
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(section => navObserver.observe(section));
