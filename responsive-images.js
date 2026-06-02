(function () {
  var MOBILE_QUERY = '(max-width: 768px)';
  var mobileMq = window.matchMedia(MOBILE_QUERY);

  function mobileAssetPath(src) {
    var match = src.match(/\/media\/([^?#]+)$/);
    if (!match) return null;
    var base = match[1].replace(/\.[^.]+$/, '');
    return 'media/mobile/' + base + '.webp';
  }

  function applyResponsiveImage(img) {
    if (img.dataset.responsiveApplied === '1') return;
    var mobileSrc = img.getAttribute('data-mobile-src') || mobileAssetPath(img.getAttribute('src') || '');
    if (!mobileSrc) return;

    img.dataset.originalSrc = img.dataset.originalSrc || img.getAttribute('src') || '';
    img.dataset.mobileSrc = mobileSrc;

    function useOriginal() {
      if (img.dataset.originalSrc) {
        img.setAttribute('src', img.dataset.originalSrc);
      }
    }

    function update() {
      if (mobileMq.matches) {
        if (img.getAttribute('src') !== mobileSrc) {
          img.setAttribute('src', mobileSrc);
        }
      } else {
        useOriginal();
      }
    }

    img.addEventListener('error', function onError() {
      if (mobileMq.matches && img.getAttribute('src') === mobileSrc) {
        useOriginal();
      }
    });

    update();
    img.dataset.responsiveApplied = '1';
    mobileMq.addEventListener('change', update);
  }

  function setupLazyImages() {
    var images = document.querySelectorAll('img[src*="media/"]');
    images.forEach(function (img, index) {
      if (img.closest('.custom-cursor-container')) return;
      if (img.classList.contains('lightning-icon')) return;

      var inHero = img.closest('.hero, .gallery-intro, .project-hero, .navbar');
      var inFirstScreen = index < 3 && img.closest('nav, .hero');

      if (!inHero && !inFirstScreen) {
        if (!img.hasAttribute('loading')) {
          img.setAttribute('loading', 'lazy');
        }
      }

      if (!img.hasAttribute('decoding')) {
        img.setAttribute('decoding', 'async');
      }

      if (img.closest('.scroll-track') && img.getAttribute('alt') && img.getAttribute('alt').indexOf('-dup') !== -1) {
        img.setAttribute('loading', 'lazy');
        img.setAttribute('fetchpriority', 'low');
      }

      applyResponsiveImage(img);
    });
  }

  function deferHeavyDecor() {
    if (!mobileMq.matches) return;
    document.querySelectorAll('.lightning-zap').forEach(function (el) {
      el.style.backgroundImage = 'none';
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      setupLazyImages();
      deferHeavyDecor();
    });
  } else {
    setupLazyImages();
    deferHeavyDecor();
  }

  mobileMq.addEventListener('change', deferHeavyDecor);
})();
