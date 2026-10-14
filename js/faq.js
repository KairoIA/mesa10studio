/* Preguntas frecuentes (14-oct-2026). Va después de js/paginas.js (el mármol, los datos al revés y el año):
   - el idioma: el mismo que se eligió en la web (m10-lang) o, si no, el del navegador, como en la portada; con ES / EN
     se cambia y se recuerda. Las dos versiones van enteras en la página (data-version); el titular del mármol se
     vuelve a tallar en el otro idioma (data-es / data-en). Volver a la web, en js/paginas.js. */
(function () {
  var html = document.documentElement;
  var TITULO = { es: 'Preguntas frecuentes — Mesa 10 Studio', en: 'FAQ — Mesa 10 Studio' };

  function ponerIdioma(lang, recordar) {
    html.lang = lang;
    document.querySelectorAll('[data-version]').forEach(function (el) { el.hidden = el.getAttribute('data-version') !== lang; });
    document.querySelectorAll('.idioma button').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.lang === lang)); });
    document.querySelectorAll('[data-estela][data-' + lang + ']').forEach(function (el) {
      if (window.MesaLosa) window.MesaLosa.cambiar(el, el.getAttribute('data-' + lang));
    });
    document.title = TITULO[lang];
    if (recordar) { try { localStorage.setItem('m10-lang', lang); } catch (e) {} }
  }
  var guardado = null;
  try { guardado = localStorage.getItem('m10-lang'); } catch (e) {}
  if (!guardado) guardado = (navigator.language || 'es').toLowerCase().indexOf('es') === 0 ? 'es' : 'en';
  ponerIdioma(guardado === 'en' ? 'en' : 'es', false);
  document.querySelectorAll('.idioma button').forEach(function (b) {
    b.addEventListener('click', function () { ponerIdioma(b.dataset.lang, true); });
  });

})();
