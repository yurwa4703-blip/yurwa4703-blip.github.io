// Small mouse reactions for the version 2 hero only.
(function () {
  const hero = document.getElementById('home');
  const photo = hero.querySelector('.profile-frame');
  const glow = hero.querySelector('.hero-glow');
  const mouse = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 769px)');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  function move(element, transform) {
    const current = getComputedStyle(element).transform;
    element.getAnimations().forEach(function (animation) { animation.cancel(); });
    element.animate([{ transform: current }, { transform: transform }], {
      duration: 500, easing: 'ease-out', fill: 'forwards'
    });
  }

  function reset() {
    [photo, glow].forEach(function (element) {
      element.getAnimations().forEach(function (animation) { animation.cancel(); });
    });
  }

  hero.addEventListener('pointermove', function (event) {
    if (!mouse.matches || reduced.matches || event.pointerType !== 'mouse') return;
    const rect = hero.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    move(photo, 'translate(' + x * 16 + 'px, ' + y * 16 + 'px) rotate(' + x * 2 + 'deg)');
    move(glow, 'translate(' + x * -48 + 'px, ' + y * -48 + 'px)');
  });
  hero.addEventListener('pointerleave', function () {
    if (!mouse.matches || reduced.matches) return;
    move(photo, 'translate(0, 0) rotate(0deg)');
    move(glow, 'translate(0, 0)');
  });
  mouse.addEventListener('change', reset);
  reduced.addEventListener('change', reset);
})();
