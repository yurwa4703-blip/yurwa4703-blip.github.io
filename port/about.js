// Keep About visible when scroll observation is unavailable or motion is reduced.
const aboutItems = document.querySelectorAll('#about .about-left, #about .about-right');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const aboutObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        aboutObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  aboutItems.forEach(function (item) {
    item.classList.add('about-reveal');
    aboutObserver.observe(item);
  });
}