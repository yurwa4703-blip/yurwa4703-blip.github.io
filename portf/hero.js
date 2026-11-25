// A small, quiet particle field. Pause when offscreen or motion is reduced.
(function () {
  const hero = document.getElementById('home');
  const canvas = document.getElementById('hero-particles');
  if (!hero || !canvas) return;
  const context = canvas.getContext('2d');
  if (!context) return;
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let width = 0;
  let height = 0;
  let frame = 0;
  let visible = true;
  let lastTime = 0;
  const pointer = { x: -1000, y: -1000 };
  const dots = Array.from({ length: 18 }, function () {
    return { x: Math.random(), y: Math.random(), radius: 1.5 + Math.random() * 2, speed: 0.003 + Math.random() * 0.005 };
  });

  function resize() {
    width = hero.clientWidth;
    height = hero.clientHeight;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  function draw(time) {
    const delta = lastTime ? Math.min((time - lastTime) / 1000, 0.05) : 0;
    lastTime = time;
    context.clearRect(0, 0, width, height);
    dots.forEach(function (dot) {
      dot.y -= dot.speed * delta;
      if (dot.y < -0.02) dot.y = 1.02;
      let x = dot.x * width;
      let y = dot.y * height;
      const dx = x - pointer.x;
      const dy = y - pointer.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance > 0 && distance < 140) {
        const shift = (1 - distance / 140) * 15;
        x += dx / distance * shift;
        y += dy / distance * shift;
      }
      context.beginPath();
      context.arc(x, y, dot.radius, 0, Math.PI * 2);
      context.fillStyle = 'rgba(94, 122, 83, 0.25)';
      context.fill();
    });
    frame = window.requestAnimationFrame(draw);
  }

  function update() {
    window.cancelAnimationFrame(frame);
    lastTime = 0;
    context.clearRect(0, 0, width, height);
    if (visible && !document.hidden && !motion.matches) frame = window.requestAnimationFrame(draw);
  }
  hero.addEventListener('pointermove', function (event) {
    const rect = hero.getBoundingClientRect();
    pointer.x = event.clientX - rect.left;
    pointer.y = event.clientY - rect.top;
  });
  hero.addEventListener('pointerleave', function () { pointer.x = pointer.y = -1000; });
  window.addEventListener('resize', resize);
  document.addEventListener('visibilitychange', update);
  motion.addEventListener('change', update);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) { visible = entries[0].isIntersecting; update(); }).observe(hero);
  }
  resize();
  update();
})();
