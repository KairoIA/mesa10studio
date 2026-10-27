/* Mesa 10 Studio: lo primero que se ejecuta (en el <head>, antes de pintar). Marca que hay JS para que el CSS
   prepare las animaciones. Va en su fichero y no en línea para que la política de seguridad (CSP) pueda
   prohibir todo script en línea: un script inyectado no correría. */
document.documentElement.classList.replace('sin-js', 'js');

/* IDIOMA (27-oct-2026). La versión en inglés es otra página de verdad (/en y /en-faq), para que los buscadores la
   indexen en inglés. Las páginas en español que tienen gemela llevan data-en="/en". Una persona con el navegador en
   inglés (o que ya eligió EN con los botones, m10-lang) que entra por la española pasa a la inglesa, con su
   #ancla; un buscador se queda donde está (Googlebot llega con el navegador en inglés y tiene que ver el español).
   En la inglesa no se redirige nunca: quien llega ahí quiere inglés. */
(function () {
  var h = document.documentElement, otra = h.getAttribute('data-en');
  if (h.lang !== 'es' || !otra) return;
  if (/bot|crawl|spider|slurp|facebookexternalhit|embedly|preview|lighthouse/i.test(navigator.userAgent || '')) return;
  var guardado = null;
  try { guardado = localStorage.getItem('m10-lang'); } catch (e) {}
  var quiere = guardado || ((navigator.language || 'es').toLowerCase().indexOf('es') === 0 ? 'es' : 'en');
  if (quiere === 'en') location.replace(otra + location.search + location.hash);
})();
