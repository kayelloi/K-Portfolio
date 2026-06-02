(function () {
  var images = document.querySelectorAll('.image-rotator img');
  var container = document.querySelector('.image-rotator');
  if (!images.length || !container) return;

  var index = 0;
  var interval = null;

  function nextImage() {
    images[index].classList.remove('is-active');
    index = (index + 1) % images.length;
    images[index].classList.add('is-active');
  }

  function start() {
    if (interval || document.documentElement.classList.contains('is-scrolling')) return;
    interval = setInterval(nextImage, 2000);
  }

  function stop() {
    if (!interval) return;
    clearInterval(interval);
    interval = null;
  }

  container.addEventListener('mouseenter', stop);
  container.addEventListener('mouseleave', start);

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(
      function (entries) {
        if (entries[0].isIntersecting) start();
        else stop();
      },
      { threshold: 0.15 }
    ).observe(container);
  } else {
    start();
  }

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) stop();
    else start();
  });
})();
