const body = document.body;
const langBtn = document.querySelector('.lang-pill');
const langMenu = document.querySelector('.lang-menu');
const burger = document.querySelector('.burger');
const drawer = document.getElementById('mobile-drawer');
const backdrop = document.querySelector('.drawer-backdrop');
const closeDrawerBtn = document.querySelector('.drawer-close');
const modal = document.getElementById('privacy-modal');
const openPrivacy = document.querySelector('[data-open-privacy]');
const closePrivacy = document.querySelector('[data-close-privacy]');
const closeX = document.querySelector('.modal-x');
let focusReturn = null;

const trapFocus = (container, e) => {
  const nodes = [...container.querySelectorAll('button,a,input,summary,[tabindex]:not([tabindex="-1"])')];
  if (!nodes.length || e.key !== 'Tab') return;
  const first = nodes[0], last = nodes[nodes.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
};

if (langBtn && langMenu) {
  langBtn.addEventListener('click', () => {
    const open = langMenu.classList.toggle('open');
    langBtn.setAttribute('aria-expanded', String(open));
  });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.lang-wrap')) {
      langMenu.classList.remove('open');
      langBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

const openDrawer = () => {
  focusReturn = document.activeElement;
  drawer.classList.add('open');
  drawer.setAttribute('aria-hidden', 'false');
  burger.setAttribute('aria-expanded', 'true');
  backdrop.hidden = false;
  body.style.overflow = 'hidden';
  closeDrawerBtn.focus();
};

const closeDrawer = () => {
  drawer.classList.remove('open');
  drawer.setAttribute('aria-hidden', 'true');
  burger.setAttribute('aria-expanded', 'false');
  backdrop.hidden = true;
  body.style.overflow = '';
  if (focusReturn) focusReturn.focus();
};

burger?.addEventListener('click', openDrawer);
closeDrawerBtn?.addEventListener('click', closeDrawer);
backdrop?.addEventListener('click', closeDrawer);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (drawer?.classList.contains('open')) closeDrawer();
    if (modal?.classList.contains('open')) modalClose();
  }
  if (drawer?.classList.contains('open')) trapFocus(drawer, e);
  if (modal?.classList.contains('open')) trapFocus(modal, e);
});

const modalOpen = () => {
  focusReturn = document.activeElement;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  body.style.overflow = 'hidden';
  closeX.focus();
};

const modalClose = () => {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  body.style.overflow = '';
  if (focusReturn) focusReturn.focus();
};

openPrivacy?.addEventListener('click', (e) => { e.preventDefault(); modalOpen(); });
closePrivacy?.addEventListener('click', modalClose);
closeX?.addEventListener('click', modalClose);
modal?.addEventListener('click', (e) => { if (e.target === modal) modalClose(); });

document.querySelectorAll('.faq-item').forEach((item) => {
  item.addEventListener('toggle', () => {
    if (item.open) {
      document.querySelectorAll('.faq-item').forEach((other) => {
        if (other !== item) other.open = false;
      });
    }
  });
});

const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.animate([{ transform: 'translateY(14px)', opacity: 0 }, { transform: 'translateY(0)', opacity: 1 }], { duration: 500, fill: 'forwards' });
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });

document.querySelectorAll('.card,.visual-card,.review-card,.process-card,.faq-item').forEach((el) => io.observe(el));

document.querySelectorAll('form').forEach((form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('After you sign up, you get instant access to the next steps.');
    form.reset();
  });
});
