// Sticky header
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
});

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
});

navMenu.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// Gallery Lightbox
const galleryItems = document.querySelectorAll('.gallery__item img');
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
const lbCounter = document.getElementById('lbCounter');
let lbIndex = 0;

const lbImages = Array.from(galleryItems).map(img => ({ src: img.src, alt: img.alt }));

function lbShow(index) {
  lbIndex = (index + lbImages.length) % lbImages.length;
  lbImg.classList.add('fading');
  setTimeout(() => {
    lbImg.src = lbImages[lbIndex].src;
    lbImg.alt = lbImages[lbIndex].alt;
    lbCounter.textContent = (lbIndex + 1) + ' / ' + lbImages.length;
    lbImg.classList.remove('fading');
  }, 150);
}

function lbOpen(index) {
  lbShow(index);
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function lbClose() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

galleryItems.forEach((img, i) => {
  img.parentElement.addEventListener('click', () => lbOpen(i));
});

document.getElementById('lbClose').addEventListener('click', lbClose);
document.getElementById('lbPrev').addEventListener('click', () => lbShow(lbIndex - 1));
document.getElementById('lbNext').addEventListener('click', () => lbShow(lbIndex + 1));

lightbox.addEventListener('click', e => { if (e.target === lightbox) lbClose(); });

document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape') lbClose();
  if (e.key === 'ArrowLeft') lbShow(lbIndex - 1);
  if (e.key === 'ArrowRight') lbShow(lbIndex + 1);
});

// Scroll reveal animation
const revealEls = document.querySelectorAll(
  '.product-card, .why-card, .testimonial-card, .about__content, .about__image-wrap, .contact-item'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity .5s ease, transform .5s ease';
  observer.observe(el);
});
