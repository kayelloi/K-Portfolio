(function () {
  var root = document.documentElement;
  var scrollEndTimer;
  var ticking = false;

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(function () {
        root.classList.add('is-scrolling');
        ticking = false;
      });
    }

    clearTimeout(scrollEndTimer);
    scrollEndTimer = setTimeout(function () {
      root.classList.remove('is-scrolling');
    }, 180);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('touchmove', onScroll, { passive: true });
})();
