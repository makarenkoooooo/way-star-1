
document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const burger = document.querySelector('.burger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const closeBtn = document.querySelector('.mobile-menu__close');
  const mobileLinks = document.querySelectorAll('.mobile-nav a');

  const setActiveNav = () => {
    const page = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-desktop a, .mobile-nav a').forEach(a => {
      const href = a.getAttribute('href');
      if (href === page) a.classList.add('is-active');
    });
  };

  const openMenu = () => {
    if (!mobileMenu) return;
    mobileMenu.classList.add('is-open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    burger?.setAttribute('aria-expanded', 'true');
    body.style.overflow = 'hidden';
    if (window.gsap) {
      gsap.fromTo('.mobile-nav a', {y: 28, opacity: 0}, {y: 0, opacity: 1, stagger: 0.06, duration: 0.5, ease: 'power3.out'});
    }
  };

  const closeMenu = () => {
    if (!mobileMenu) return;
    mobileMenu.classList.remove('is-open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    burger?.setAttribute('aria-expanded', 'false');
    body.style.overflow = '';
  };

  burger?.addEventListener('click', openMenu);
  closeBtn?.addEventListener('click', closeMenu);
  mobileMenu?.addEventListener('click', (e) => {
    if (e.target === mobileMenu) closeMenu();
  });
  mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

  setActiveNav();

  if (window.Swiper) {
    document.querySelectorAll('[data-slider]').forEach((slider) => {
      const id = slider.getAttribute('data-slider');
      const prev = slider.parentElement.querySelector(`[data-prev="${id}"]`);
      const next = slider.parentElement.querySelector(`[data-next="${id}"]`);
      new Swiper(slider, {
        slidesPerView: 1.08,
        spaceBetween: 16,
        speed: 800,
        navigation: { prevEl: prev, nextEl: next },
        breakpoints: {
          640: { slidesPerView: 1.35, spaceBetween: 18 },
          768: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 2.4, spaceBetween: 22 },
          1200: { slidesPerView: 3, spaceBetween: 24 },
        }
      });
    });
  }

  if (window.gsap) {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('.reveal').forEach(el => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 86%',
          once: true
        }
      });
    });

    gsap.utils.toArray('[data-parallax]').forEach(el => {
      gsap.to(el, {
        yPercent: 8,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.6
        }
      });
    });

    const marquee = document.querySelector('.marquee__track');
    if (marquee) {
      gsap.to(marquee, {
        xPercent: -50,
        duration: 28,
        ease: 'linear',
        repeat: -1
      });
    }

    gsap.utils.toArray('[data-count]').forEach(counter => {
      const target = +counter.dataset.count;
      const decimal = counter.dataset.decimal === 'true';
      gsap.fromTo(counter, { innerText: 0 }, {
        innerText: target,
        duration: 2,
        ease: 'power2.out',
        snap: { innerText: decimal ? 0.1 : 1 },
        onUpdate: function () {
          const value = Number(counter.innerText);
          counter.innerText = decimal ? value.toFixed(1) : Math.floor(value).toString();
        },
        scrollTrigger: {
          trigger: counter,
          start: 'top 90%',
          once: true
        }
      });
    });

    const heroTitle = document.querySelector('.hero h1, .page-hero h1');
    if (heroTitle) {
      gsap.from(heroTitle, { y: 40, opacity: 0, duration: 0.9, ease: 'power3.out' });
      const heroP = document.querySelector('.hero p, .page-hero p');
      if (heroP) gsap.from(heroP, { y: 28, opacity: 0, delay: 0.15, duration: 0.9, ease: 'power3.out' });
    }

    const heroCard = document.querySelector('.hero__card');
    if (heroCard) gsap.from(heroCard, { y: 34, opacity: 0, delay: 0.25, duration: 0.9, ease: 'power3.out' });
  }

  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const note = contactForm.querySelector('.form-note');
      btn.disabled = true;
      btn.textContent = 'Заявка отправлена';
      note.textContent = 'Демо-режим: форма подготовлена для интеграции с почтой или CRM.';
      contactForm.reset();
      setTimeout(() => {
        btn.disabled = false;
        btn.textContent = 'Отправить заявку';
      }, 4000);
    });
  }
});
