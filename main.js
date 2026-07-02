/* ============================================
   MAIN.JS - Pesona Sumut Enhancements
   Fitur: Navbar scroll, Scroll reveal, 
          Back to top, Hamburger menu
   ============================================ */

(function () {
  'use strict';

  // 1. NAVBAR SCROLL EFFECT

  function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // 2. SCROLL REVEAL ANIMATION

  function initScrollReveal() {
    const targets = document.querySelectorAll(
      '.content, .card, .box, .hero-img, .content-img, h2, h3'
    );

    targets.forEach(function (el) {
      el.classList.add('reveal');
    });

    function checkReveal() {
      const reveals = document.querySelectorAll('.reveal');
      const windowHeight = window.innerHeight;

      reveals.forEach(function (el) {
        const top = el.getBoundingClientRect().top;
        if (top < windowHeight - 80) {
          el.classList.add('revealed');
        }
      });
    }

    window.addEventListener('scroll', checkReveal);
    checkReveal(); // cek saat pertama load
  }

  // ==============================
  // 3. BACK TO TOP BUTTON

  function initBackToTop() {
    // Buat tombol
    const btn = document.createElement('button');
    btn.id = 'back-to-top';
    btn.innerHTML = '&#8679;';
    btn.setAttribute('aria-label', 'Kembali ke atas');
    document.body.appendChild(btn);

    // Tampilkan/sembunyikan saat scroll
    window.addEventListener('scroll', function () {
      if (window.scrollY > 300) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    });

    // Scroll ke atas saat diklik
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ==============================
  // 4. HAMBURGER MENU (MOBILE)
  // ==============================
  function initHamburger() {
    const nav = document.querySelector('.navbar .container');
    const menu = document.querySelector('.navbar .menu');
    if (!nav || !menu) return;

    // Buat tombol hamburger
    const hamburger = document.createElement('button');
    hamburger.id = 'hamburger-btn';
    hamburger.innerHTML = '<span></span><span></span><span></span>';
    hamburger.setAttribute('aria-label', 'Menu navigasi');
    nav.appendChild(hamburger);

    // Toggle menu
    hamburger.addEventListener('click', function () {
      menu.classList.toggle('open');
      hamburger.classList.toggle('active');
    });

    // Tutup menu saat link diklik
    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        menu.classList.remove('open');
        hamburger.classList.remove('active');
      });
    });
  }

  // ==============================
  // INIT SEMUA
  // ==============================
  function init() {
    initNavbarScroll();
    initScrollReveal();
    initBackToTop();
    initHamburger();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
