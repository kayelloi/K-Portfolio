(function () {
  var reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    reveals.forEach(function (el) {
      el.classList.add('active');
    });
    return;
  }

  var viewportHeight = window.innerHeight;
  reveals.forEach(function (el) {
    var rect = el.getBoundingClientRect();
    if (rect.top < viewportHeight * 0.92 && rect.bottom > 0) {
      el.classList.add('active');
    }
  });

  document.documentElement.classList.add('reveal-pending');

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -8% 0px' }
  );

  reveals.forEach(function (el) {
    if (!el.classList.contains('active')) {
      observer.observe(el);
    }
  });
})();
