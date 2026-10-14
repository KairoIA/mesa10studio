/* Las páginas aparte: preguntas frecuentes y legal (14-oct-2026, Javi: «vamos a poner las páginas bonitas»).
   - El titular, en el mármol de la web: se talla en la losa, la losa se desenrolla y la frase se escribe como código.
     COPIA reducida de js/web.js (grabar, plan, ajustar, poner, ritmo y escribir, hacia la l. 640): si cambia allí,
     se cambia aquí. Sin igualar (aquí hay un solo titular).
   - Cuando el mármol se ha abierto, entra el texto de debajo y la sombra del olivo (css, body.listo).
   - Los datos que van al revés en data-r (para que no los recojan los robots) y el año del pie.
   - Volver a la web sin ver otra vez la intro: si se llegó desde la web, se vuelve atrás y el navegador la recupera
     donde estaba (data-volver).
   - window.MesaLosa.cambiar(el, texto): para otro idioma (js/faq.js); se talla ya escrita. */
(function () {
  function grabar(el) {
    var texto = el.dataset.texto || el.textContent.trim();
    el.dataset.texto = texto;
    el.innerHTML = '<span class="vh"></span><span class="losa" aria-hidden="true"><span class="losa__texto"></span></span>';
    el.firstChild.textContent = texto;
    var i = 0;
    el._palabras = texto.split(/\s+/).map(function (palabra) {
      var p = document.createElement('span');
      p.className = 'p';
      p.dataset.t = palabra;
      palabra.split('').forEach(function (ch) {
        var l = document.createElement('span');
        l.className = 'l'; l.dataset.c = ch; l.textContent = ch; l.style.setProperty('--i', i++);
        p.appendChild(l);
      });
      return p;
    });
    if (el.classList.contains('grabada')) el.classList.add('hecha');
  }

  // encajar, como en la web: las líneas y el cuerpo con los que la frase cabe entera entre las volutas
  var MOLDURA = 0.118, ZOCALO = 0.182, AIRE = 0.3, INTERLINEA = 1.25, VOLUTAS = 0.924 + 0.933, TOPE = 0.46;
  var SUELO_PX = 16;
  var regla = document.createElement('canvas').getContext('2d');
  function medir(txt, fs) {
    regla.font = '400 ' + fs + 'px "Mesa Entasis"';
    if ('fontKerning' in regla) regla.fontKerning = 'none';
    return regla.measureText(txt).width;
  }
  function repartos(anchos, espacio) {
    var m = anchos.length, todos = [];
    for (var mask = 0; mask < (1 << (m - 1)); mask++) {
      var cortes = [], lineas = [], w = 0;
      for (var j = 0; j < m; j++) {
        w += anchos[j];
        if (j === m - 1 || (mask & (1 << j))) { lineas.push(w); w = 0; if (j < m - 1) cortes.push(j + 1); }
        else w += espacio;
      }
      var max = Math.max.apply(null, lineas);
      var cojo = lineas.reduce(function (s, x) { return s + Math.pow(1 - x / max, 2); }, 0) / lineas.length;
      todos.push({ n: lineas.length, ancho: max, cortes: cortes, cojo: cojo });
    }
    return todos;
  }
  function cabeEn(ancho, lineas, em) {
    var lo = 4, hi = 400;
    for (var k = 0; k < 24; k++) {
      var f = (lo + hi) / 2;
      var alto = (lineas * INTERLINEA * f + 2 * AIRE * f) / (1 - MOLDURA - ZOCALO);
      var total = Math.min(VOLUTAS * alto, TOPE * ancho) + 0.6 * f + em * f;
      if (total <= ancho) lo = f; else hi = f;
    }
    return lo;
  }
  /* medir, sin deslizarse (14-oct, Javi: «tiene un glitch en el lado derecho al empezar, está como cortado»): al
     medirla cambian las volutas, y la cara y la voluta derecha iban de las medidas de partida a las buenas con el
     mismo retraso que el desenrollado, que aquí llega a los 200 ms; se abría desde las de partida, con la cara cortada
     en seco a media voluta y un hueco antes de la otra. Las medidas nuevas se ponen de golpe (.midiendo) */
  function ajustar(el) {
    el.classList.add('midiendo');
    encajar(el);
    var losa = el.querySelector('.losa');
    if (losa) { getComputedStyle(losa, '::before').clipPath; getComputedStyle(losa, '::after').right; }
    el.classList.remove('midiendo');
  }
  function encajar(el) {
    var losa = el.querySelector('.losa'), tx = el.querySelector('.losa__texto'), ps = el._palabras;
    if (!losa || !ps) return;
    el.style.fontSize = '';
    var padre = el.parentNode, cs = getComputedStyle(padre);
    var ancho = (padre.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight)) * 0.97;
    if (ancho <= 0) return;
    var f0 = parseFloat(getComputedStyle(el).fontSize);
    var anchos = ps.map(function (p) { return medir(p.dataset.t, f0); }), espacio = medir(' ', f0);
    var elegido = null, opciones = repartos(anchos, espacio).filter(function (r) { return r.n <= 4; });
    opciones.forEach(function (r) { r.f = Math.min(f0, cabeEn(ancho, r.n, r.ancho / f0)); });
    // como en la web (igualar): más pequeña que SUELO_PX no se lee; si alguna forma de partirla llega, solo esas
    var legibles = opciones.filter(function (r) { return r.f >= SUELO_PX; });
    (legibles.length ? legibles : opciones).forEach(function (r) {
      var nota = r.f / f0 - 0.2 * (r.n - 1) - 0.5 * r.cojo;
      if (!elegido || nota > elegido.nota) elegido = { n: r.n, f: r.f, cortes: r.cortes, nota: nota };
    });
    if (!elegido) return;
    tx.textContent = '';
    var linea;
    ps.forEach(function (p, k) {
      if (k === 0 || elegido.cortes.indexOf(k) >= 0) { linea = document.createElement('span'); linea.className = 'losa__linea'; tx.appendChild(linea); }
      else linea.appendChild(document.createTextNode(' '));
      linea.appendChild(p);
    });
    poner(el, losa, tx, elegido.f, elegido.n, ancho);
    if (tx.scrollWidth > tx.clientWidth + 1) poner(el, losa, tx, elegido.f * tx.clientWidth / tx.scrollWidth * 0.98, elegido.n, ancho);
  }
  function poner(el, losa, tx, f, n, ancho, vuelta) {
    el.style.fontSize = f.toFixed(2) + 'px';
    var aire = AIRE * f;
    var alto = (n * INTERLINEA * f + 2 * aire) / (1 - MOLDURA - ZOCALO);
    losa.style.paddingTop = (MOLDURA * alto + aire).toFixed(1) + 'px';
    losa.style.paddingBottom = (ZOCALO * alto + aire).toFixed(1) + 'px';
    var h = losa.offsetHeight;
    var i = h * 0.924, d = h * 0.933, tope = ancho * TOPE;
    if (i + d > tope && (vuelta || 0) < 3) return poner(el, losa, tx, f * tope / (i + d) * 0.99, n, ancho, (vuelta || 0) + 1);
    var estrecha = i + d > tope;
    if (estrecha) { var k = tope / (i + d); i *= k; d *= k; }
    losa.classList.toggle('losa--estrecha', estrecha);
    losa.style.setProperty('--ala-i', i.toFixed(1) + 'px');
    losa.style.setProperty('--ala-d', d.toFixed(1) + 'px');
  }

  // escribir: sugerencia en azul tenue y un cursor que la teclea a ritmo de persona; la tecla, roja y azul por palabras
  function ritmo(ls, base) {
    var semilla = 7, rnd = function () { semilla = (semilla * 16807) % 2147483647; return semilla / 2147483647; };
    var t = 0;
    return ls.map(function (l, k) {
      var antes = k ? ls[k - 1] : null;
      var entre = antes && (antes.dataset.c === ' ' || antes.parentNode !== l.parentNode);
      var coma = antes && /[,.;:]/.test(antes.dataset.c);
      t += base * (0.5 + rnd() * 0.75) + (entre ? base * 1.3 : 0) + (coma ? base * 2.6 : 0);
      return t;
    });
  }
  var SUGERENCIA = 600;
  function escribir(el) {
    var losa = el.querySelector('.losa');
    var ls = Array.prototype.slice.call(losa.querySelectorAll('.l'));
    if (!ls.length || el.classList.contains('hecha')) { el.classList.add('hecha'); return; }
    var cursor = document.createElement('span');
    cursor.className = 'cursor-codigo';
    losa.appendChild(cursor);
    function ponerCursor(l, delante) {
      var b = losa.getBoundingClientRect(), r = l.getBoundingClientRect();
      cursor.style.left = ((delante ? r.left : r.right) - b.left + (delante ? -2 : 1)) + 'px';
      cursor.style.top = (r.top - b.top + r.height * 0.14) + 'px';
      cursor.style.height = (r.height * 0.72) + 'px';
    }
    el.classList.add('sugerida');
    ponerCursor(ls[0], true);
    cursor.classList.add('activo');
    var cuando = ritmo(ls, Math.max(46, Math.min(88, 2500 / ls.length)));
    var pal = 0, palabra = ls.map(function (l, k) { if (k && ls[k - 1].parentNode !== l.parentNode) pal++; return pal; });
    ls.forEach(function (l, k) {
      if (palabra[k] % 2 === 0) l.classList.add('rojo');
      setTimeout(function () {
        if (!l.isConnected) return;                                    // otro idioma a mitad: ya se talló entera
        cursor.classList.add('tecleando');
        ponerCursor(l);
        l.classList.add('va', 'tecla');
        setTimeout(function () { l.classList.remove('tecla'); }, 200);
      }, SUGERENCIA + cuando[k]);
    });
    var fin = SUGERENCIA + cuando[cuando.length - 1];
    setTimeout(function () { cursor.classList.remove('tecleando'); }, fin + 250);
    setTimeout(function () {
      el.classList.add('hecha');
      el.classList.remove('sugerida');
      cursor.classList.remove('activo');
      setTimeout(function () { cursor.remove(); }, 400);
    }, fin + 1700);
  }

  var estelas = Array.prototype.slice.call(document.querySelectorAll('[data-estela]'));
  estelas.forEach(grabar);
  function ajustarTodas() { estelas.forEach(ajustar); }
  ajustarTodas();
  var DESENROLLA = 1750, empezado = false;
  function empezar() {                                                 // con la letra ya cargada: medidas buenas
    if (empezado) return;
    empezado = true;
    ajustarTodas();
    setTimeout(function () { estelas.forEach(function (el) { el.classList.add('grabada'); }); }, 200);
    setTimeout(function () { document.body.classList.add('listo'); }, 200 + DESENROLLA * 0.7);
    setTimeout(function () { estelas.forEach(escribir); }, 200 + DESENROLLA);
  }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(empezar);
  setTimeout(empezar, 1500);                                           // por si la letra tarda
  var anchoVentana = window.innerWidth, tAjuste;
  window.addEventListener('resize', function () {
    if (window.innerWidth === anchoVentana) return;
    anchoVentana = window.innerWidth;
    clearTimeout(tAjuste); tAjuste = setTimeout(ajustarTodas, 120);
  });
  window.MesaLosa = {
    cambiar: function (el, texto) {
      if (!el || el.dataset.texto === texto) return;
      var escribiendo = el.classList.contains('sugerida');
      el.dataset.texto = texto;
      if (escribiendo) { el.classList.remove('sugerida'); el.classList.add('hecha'); }
      grabar(el); ajustar(el);
    }
  };

  document.querySelectorAll('.dato[data-r]').forEach(function (el) {
    var texto = el.getAttribute('data-r').split('').reverse().join('');
    el.textContent = texto;
    el.removeAttribute('data-r');
    if (el.classList.contains('dato--correo')) el.href = 'mailto:' + texto;
  });
  var anio = document.getElementById('anio');
  if (anio) anio.textContent = new Date().getFullYear();

  document.querySelectorAll('[data-volver]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var r = document.referrer;
      if (r && r.indexOf(location.origin + '/') === 0 && history.length > 1) { e.preventDefault(); history.back(); }
    });
  });
})();
