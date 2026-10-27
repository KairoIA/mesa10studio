/* Preguntas frecuentes (14-oct-2026). Va después de js/paginas.js (el mármol, los datos al revés y el año).
   Desde el 27-oct cada idioma es su propia página (/faq y /en-faq, la inglesa hecha con _tools/version_ingles.py), así
   que el idioma es el del <html lang>; con ES / EN se va a la otra página y se recuerda (m10-lang). Quien entra por la
   española con el navegador en inglés ya habrá pasado a la inglesa en js/arranque.js. Las dos versiones siguen
   marcadas con data-version (la española lleva las dos; la inglesa, solo la suya); el titular del mármol se talla
   en el idioma de la página (data-es / data-en). Volver a la web, en js/paginas.js. */
(function () {
  var html = document.documentElement;
  var TITULO = { es: 'Preguntas frecuentes — Mesa 10 Studio', en: 'FAQ — Mesa 10 Studio' };
  var OTRA = { es: '/en-faq', en: '/faq' };

  function ponerIdioma(lang) {
    html.lang = lang;
    document.querySelectorAll('[data-version]').forEach(function (el) { el.hidden = el.getAttribute('data-version') !== lang; });
    document.querySelectorAll('.idioma button').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.lang === lang)); });
    document.querySelectorAll('[data-estela][data-' + lang + ']').forEach(function (el) {
      if (window.MesaLosa) window.MesaLosa.cambiar(el, el.getAttribute('data-' + lang));
    });
    document.title = TITULO[lang];
  }
  var lang = html.lang === 'en' ? 'en' : 'es';
  ponerIdioma(lang);
  document.querySelectorAll('.idioma button').forEach(function (b) {
    b.addEventListener('click', function () {
      if (b.dataset.lang === lang) return;
      try { localStorage.setItem('m10-lang', b.dataset.lang); } catch (e) {}
      location.href = b.dataset.lang === 'en' ? OTRA.es : OTRA.en;
    });
  });

})();
