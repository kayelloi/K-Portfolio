document.addEventListener('DOMContentLoaded', function () {
  if (!window.matchMedia('(pointer: fine)').matches) return;

  var cursor = document.getElementById('customCursor');
  if (!cursor) return;

  var links = document.querySelectorAll('a, button, .btn, .project-img-wrapper');
  var x = 0;
  var y = 0;
  var pending = false;

  function updatePosition() {
    var scale = cursor.classList.contains('cursor-hover') ? 1.3 : 1;
    pending = false;
    cursor.style.transform =
      'translate3d(' +
      x +
      'px, ' +
      y +
      'px, 0) translate(-50%, -50%) scale(' +
      scale +
      ')';
  }

  document.addEventListener(
    'mousemove',
    function (e) {
      x = e.clientX;
      y = e.clientY;
      if (!pending) {
        pending = true;
        requestAnimationFrame(updatePosition);
      }
    },
    { passive: true }
  );

  links.forEach(function (link) {
    link.addEventListener('mouseenter', function () {
      cursor.classList.add('cursor-hover');
      updatePosition();
    });
    link.addEventListener('mouseleave', function () {
      cursor.classList.remove('cursor-hover');
      updatePosition();
    });
  });
});
