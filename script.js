document.addEventListener('DOMContentLoaded', function () {

  /* -----------------------------------------------------
     헤더 스크롤 상태
  ----------------------------------------------------- */
  var header = document.getElementById('siteHeader');

  function updateHeaderScroll() {
    if (window.scrollY > 10) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }
  updateHeaderScroll();
  window.addEventListener('scroll', updateHeaderScroll);

  /* -----------------------------------------------------
     PC 메가메뉴 - 대메뉴에 마우스를 올리면 헤더 배경도 함께 전환
  ----------------------------------------------------- */
  var gnbItems = document.querySelectorAll('.gnb-item');
  gnbItems.forEach(function (item) {
    item.addEventListener('mouseenter', function () {
      header.classList.add('is-menu-open');
      gnbItems.forEach(function (el) { el.classList.remove('is-active'); });
      item.classList.add('is-active');
    });
    item.addEventListener('mouseleave', function () {
      header.classList.remove('is-menu-open');
      item.classList.remove('is-active');
    });
  });

  /* -----------------------------------------------------
     모바일 메뉴 토글
  ----------------------------------------------------- */
  var mobileToggle = document.getElementById('mobileToggle');
  var mobileNav = document.getElementById('mobileNav');

  mobileToggle.addEventListener('click', function () {
    header.classList.toggle('is-menu-open');
    mobileToggle.classList.toggle('is-open');
  });

  var mobileDepth1Buttons = document.querySelectorAll('.mobile-depth1');
  mobileDepth1Buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var submenu = btn.nextElementSibling;
      var isOpen = btn.classList.contains('is-open');

      mobileDepth1Buttons.forEach(function (otherBtn) {
        otherBtn.classList.remove('is-open');
        otherBtn.nextElementSibling.style.maxHeight = null;
      });

      if (!isOpen) {
        btn.classList.add('is-open');
        submenu.style.maxHeight = submenu.scrollHeight + 'px';
      }
    });
  });

  /* -----------------------------------------------------
     히어로 배경 슬라이드
  ----------------------------------------------------- */
  var heroSlides = document.querySelectorAll('.hero-slide');
  var heroDots = document.querySelectorAll('.hero-dot');
  var currentSlide = 0;
  var slideInterval = null;

  function goToSlide(idx) {
    heroSlides.forEach(function (slide, i) {
      slide.classList.toggle('is-active', i === idx);
    });
    heroDots.forEach(function (dot, i) {
      dot.classList.toggle('is-active', i === idx);
    });
    currentSlide = idx;
  }

  function startSlideShow() {
    slideInterval = setInterval(function () {
      goToSlide((currentSlide + 1) % heroSlides.length);
    }, 5000);
  }

  if (heroSlides.length > 1) {
    startSlideShow();
    heroDots.forEach(function (dot, i) {
      dot.addEventListener('click', function () {
        clearInterval(slideInterval);
        goToSlide(i);
        startSlideShow();
      });
    });
  }

  /* -----------------------------------------------------
     스크롤 등장 애니메이션
  ----------------------------------------------------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* -----------------------------------------------------
     친환경 바이오케미칼 - 제품 탭 메뉴
  ----------------------------------------------------- */
  var biochemTabs = document.querySelectorAll('.biochem-tab');
  if (biochemTabs.length) {
    var biochemPanels = document.querySelectorAll('.biochem-panel');

    biochemTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var target = tab.dataset.target;

        biochemTabs.forEach(function (t) { t.classList.remove('is-active'); });
        tab.classList.add('is-active');

        biochemPanels.forEach(function (panel) {
          panel.classList.toggle('is-active', panel.id === 'panel-' + target);
        });
      });
    });
  }

  /* -----------------------------------------------------
     인증/특허 라이트박스 (크게 보기)
  ----------------------------------------------------- */
  var certModal = document.getElementById('certModal');
  if (certModal) {
    var certCards = Array.prototype.slice.call(document.querySelectorAll('.cert-card'));
    var certModalImg = document.getElementById('certModalImg');
    var certModalCaption = document.getElementById('certModalCaption');
    var certIndex = 0;

    function openCertModal(idx) {
      certIndex = idx;
      var card = certCards[certIndex];
      certModalImg.src = card.dataset.src;
      certModalImg.alt = card.dataset.label;
      certModalCaption.textContent = card.dataset.label;
      certModal.classList.add('is-open');
    }

    function closeCertModal() {
      certModal.classList.remove('is-open');
    }

    function showCertOffset(offset) {
      certIndex = (certIndex + offset + certCards.length) % certCards.length;
      openCertModal(certIndex);
    }

    certCards.forEach(function (card, idx) {
      card.addEventListener('click', function () { openCertModal(idx); });
    });

    document.getElementById('certModalClose').addEventListener('click', closeCertModal);
    document.getElementById('certModalPrev').addEventListener('click', function () { showCertOffset(-1); });
    document.getElementById('certModalNext').addEventListener('click', function () { showCertOffset(1); });

    certModal.addEventListener('click', function (e) {
      if (e.target === certModal) { closeCertModal(); }
    });

    document.addEventListener('keydown', function (e) {
      if (!certModal.classList.contains('is-open')) { return; }
      if (e.key === 'Escape') { closeCertModal(); }
      if (e.key === 'ArrowLeft') { showCertOffset(-1); }
      if (e.key === 'ArrowRight') { showCertOffset(1); }
    });
  }

});
