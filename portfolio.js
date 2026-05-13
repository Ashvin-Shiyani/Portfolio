const loadingScreen = document.getElementById('loading-screen');

window.addEventListener('load', () => {
  setTimeout(() => {
    loadingScreen.style.opacity = '0';
    setTimeout(() => {
      loadingScreen.style.display = 'none';
      startTyping();
    }, 600);
  }, 2000);
});

const typedEl = document.getElementById('typed-role');
const words = ['Aspiring Software Developer', 'Python Developer', 'Web Developer', 'Problem Solver'];
let wordIndex = 0, charIndex = 0, deleting = false;

function startTyping() {
  if (!typedEl) return;
  tick();
}

function tick() {
  const word = words[wordIndex];
  typedEl.textContent = word.substring(0, charIndex);

  if (!deleting && charIndex < word.length) {
    charIndex++;
    setTimeout(tick, 100);
  } else if (deleting && charIndex > 0) {
    charIndex--;
    setTimeout(tick, 50);
  } else {
    deleting = !deleting;
    if (!deleting) wordIndex = (wordIndex + 1) % words.length;
    setTimeout(tick, 1000);
  }
}

const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

function setActiveNav() {
  const scrollPos = window.scrollY + 100;
  sections.forEach(section => {
    if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
      navLinks.forEach(l => l.classList.remove('active'));
      const match = document.querySelector(`.nav-link[href="#${section.id}"]`);
      if (match) match.classList.add('active');
    }
  });
}

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.getElementById(link.getAttribute('href').substring(1));
    if (!target) return;
    window.scrollTo({ top: target.offsetTop - 64, behavior: 'smooth' });
  });
});

const revealEls = document.querySelectorAll('.about-grid, .projects-grid, .contact-sub, .contact-email, .contact-details, .contact-socials');
revealEls.forEach(el => el.classList.add('reveal'));

const backToTop = document.createElement('div');
backToTop.id = 'back-to-top';
backToTop.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
document.body.appendChild(backToTop);
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

window.addEventListener('scroll', () => {
  setActiveNav();

  revealEls.forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 80) {
      el.classList.add('visible');
    }
  });

  backToTop.style.display = window.scrollY > 400 ? 'flex' : 'none';
});
const themeToggle = document.getElementById('theme-toggle');
const icon = themeToggle.querySelector('i');

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
  if (document.body.classList.contains('light')) {
    icon.className = 'fa-solid fa-moon';
  } else {
    icon.className = 'fa-solid fa-sun';
  }
});