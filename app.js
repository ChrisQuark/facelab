'use strict';

const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');
function closeMenu() {
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation');
  mobileNav.hidden = true;
}
menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  mobileNav.hidden = !open;
});
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
window.matchMedia('(min-width: 801px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

const services = {
  skin: {
    name: 'Skin care',
    price: 'Pricing after consultation',
    description: 'Explore 3D skin analysis, Dermapen microneedling and skincare products. Your therapist will discuss your goals, treatment suitability and pricing before you decide.'
  },
  nutrition: {
    name: 'Nutrition',
    price: '€30 per consultation',
    description: 'An individual consultation to discuss your eating habits and explore practical nutrition guidance that fits your everyday life.'
  },
  mind: {
    name: 'Psychology',
    price: '€50 · 45 minutes',
    description: 'A private, one-to-one session with a psychologist. A space to talk about what is on your mind and explore the support you are looking for.'
  }
};
const dialog = document.querySelector('#booking-dialog');
const selection = document.querySelector('#booking-selection');
const result = document.querySelector('#booking-result');
const nextButton = document.querySelector('.booking-next');
const serviceDetail = document.querySelector('#service-detail');
let selectedService = null;
let dialogTrigger = null;

function chooseService(key) {
  selectedService = services[key] ? key : null;
  dialog.querySelectorAll('[data-service]').forEach(button => {
    button.setAttribute('aria-pressed', String(button.dataset.service === selectedService));
  });
  serviceDetail.textContent = selectedService ? services[selectedService].description : 'Choose a service to explore your first visit.';
  nextButton.disabled = !selectedService;
}
function showSelection() {
  selection.hidden = false;
  result.hidden = true;
  dialog.setAttribute('aria-labelledby', 'booking-title');
  dialog.scrollTop = 0;
}
document.querySelectorAll('[data-book]').forEach(button => {
  button.addEventListener('click', () => {
    dialogTrigger = button;
    closeMenu();
    showSelection();
    chooseService(button.dataset.book);
    dialog.showModal();
    document.body.classList.add('modal-open');
  });
});
dialog.querySelectorAll('[data-service]').forEach(button => {
  button.addEventListener('click', () => chooseService(button.dataset.service));
});
nextButton.addEventListener('click', () => {
  if (!selectedService) return;
  const service = services[selectedService];
  document.querySelector('#summary-service').textContent = service.name;
  document.querySelector('#summary-price').textContent = service.price;
  document.querySelector('#summary-description').textContent = service.description;
  selection.hidden = true;
  result.hidden = false;
  dialog.setAttribute('aria-labelledby', 'result-title');
  dialog.scrollTop = 0;
  document.querySelector('#result-title').focus();
});
document.querySelector('.booking-back').addEventListener('click', () => {
  showSelection();
  dialog.querySelector(`[data-service="${selectedService}"]`).focus();
});
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
});
dialog.addEventListener('close', () => {
  document.body.classList.remove('modal-open');
  dialogTrigger?.focus();
});
document.querySelector('#year').textContent = new Date().getFullYear();
