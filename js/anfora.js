/* El ánfora de "Cuéntanos tu idea" (03-oct-2026; 2ª ronda: texto tallado, colores de marca, Musas de la marca).
   Ánfora de cuello ática de figuras negras, ancha para que se lea, que gira siempre (lo pide Javi:
   no se para ni con "reducir movimiento"). Al pasar el cursor o con el foco se acerca.
   Three.js se carga solo cuando el ánfora se acerca a la pantalla; hasta entonces, y sin WebGL,
   se ve la foto fija img/anfora.webp, que es un render de esta misma ánfora.
   La decoración se pinta en un canvas: rojo de Thera, negro, cal y azul. CUÉNTANOS / TU IDEA va tallado
   en el barro (relieve hundido, como las letras de las losas) y relleno de cal, entre dos columnas jónicas.
   Las cinco Musas (img/anfora_musas.webp) llevan cada una lo suyo: código, éntasis, tékhne, imagen, olivo.
   API: MesaAnfora.idioma('es' | 'en') repinta los textos (también sigue a <html lang> por su cuenta). */

const RAIZ = new URL('../', import.meta.url);
const ruta = (p) => new URL(p, RAIZ).href;

const C = { rojo: '#792911', negro: '#141414', cal: '#EAEAEB', azul: '#4D6C8E' };
/* la misma pintura vista como "rugosidad": el barniz negro brilla, la arcilla y la cal menos */
const R = { rojo: 'rgb(150,150,150)', negro: 'rgb(74,74,74)', cal: 'rgb(160,160,160)', azul: 'rgb(118,118,118)' };
/* y como relieve: el barro a ras y las letras hundidas */
const B = { relieve: true, fondo: 'rgb(205,205,205)', hondo: 'rgb(40,40,40)' };

/* las Musas, en el orden de la tira: tres a un lado (código, éntasis, tékhne) y dos al otro */
const NOMBRES = { es: ['CÓDIGO', 'ÉNTASIS', 'TÉKHNE', 'IMAGEN', 'OLIVO'], en: ['CODE', 'ENTASIS', 'TÉKHNE', 'IMAGE', 'OLIVE'] };
const LADO_A = [0, 1, 2], LADO_B = [3, 4];

const VUELTA = 18;            // segundos por vuelta
const CERCA = 1.13;           // escala al acercarse
const HOLGURA = 1.3;          // el lienzo es un 30 % mayor que la caja: al acercarse no se corta
const T = Math.PI * 2;
const RMAX = 0.39;            // radio del vientre (alto = 1): ancho ≈ 0,78 del alto
const CU = 0.106;             // columnas a ± CU (fracción de vuelta) del centro de cada inscripción
const LETRA = '"Mesa Entasis Anfora", "Mesa Entasis", "Ysabeau", serif';

/* perfil (radio, altura): pie con anillo, vientre ancho, hombro, cuello con filete, labio y un poco de dentro */
const PERFIL = [
  [0, 0], [0.150, 0], [0.172, 0.004], [0.181, 0.016], [0.177, 0.033], [0.160, 0.044],
  [0.120, 0.051], [0.112, 0.064], [0.138, 0.090], [0.198, 0.135], [0.262, 0.195],
  [0.318, 0.265], [0.358, 0.340], [0.382, 0.420], [0.390, 0.495], [0.384, 0.565],
  [0.362, 0.630], [0.322, 0.690], [0.268, 0.735], [0.205, 0.765], [0.170, 0.779],
  [0.174, 0.786], [0.160, 0.796], [0.150, 0.820], [0.146, 0.860], [0.151, 0.898],
  [0.166, 0.928], [0.190, 0.945], [0.205, 0.961], [0.207, 0.979], [0.199, 0.994],
  [0.186, 1.000], [0.168, 0.997], [0.152, 0.978], [0.142, 0.935], [0.137, 0.880]
];
const ASA = [[0.300, 0.692], [0.336, 0.725], [0.356, 0.780], [0.352, 0.845], [0.328, 0.893],
  [0.282, 0.918], [0.228, 0.916], [0.180, 0.900], [0.140, 0.885]];

/* las cajas de las Musas en su tira, medidas una vez (06-oct, tarde): medirlas en el navegador leía la imagen píxel a
   píxel justo al arrancar. Si se cambia img/anfora_musas.webp, borrar esto o volver a medirlo (con otro tamaño de
   imagen ya no se usa y se miden como antes, con cajas()) */
const CAJAS = { w: 1230, h: 380, y0: 4, x: [[3, 242], [3, 242], [3, 243], [4, 241], [4, 241]] };
/* un respiro: espera a que el navegador esté libre (o, como mucho, 400 ms) */
const respiro = () => new Promise((r) => ('requestIdleCallback' in window ? requestIdleCallback(() => r(), { timeout: 400 }) : setTimeout(r, 30)));

const el = document.querySelector('.anfora');
const estado = { lang: (document.documentElement.lang || 'es').slice(0, 2), repintar: null, lista: false, des: 0, figuras: [] };
// ESPERAR PARA GIRAR (04-oct, Javi): con data-esperar-giro, el ánfora se queda de frente (con su balanceo) hasta que
// web.js la posa en la mesa y llama a MesaAnfora.girar(); entonces arranca el giro, suave. Por si nadie llama, gira
// sola solo si la página va sin web.js (sin la clase js), en cuanto se ve
estado.girando = !(el && el.hasAttribute('data-esperar-giro'));

function textos(lang) {
  const d = (k) => el && el.getAttribute('data-' + k);
  return {
    lineas: (d(lang) || d('es') || 'CUÉNTANOS|TU IDEA').split('|'),
    nombres: NOMBRES[lang] || NOMBRES.es
  };
}

function ponerIdioma(lang) {
  lang = lang === 'en' ? 'en' : 'es';
  estado.lang = lang;
  if (!el) return;
  const clic = el.querySelector('.anfora__clic');
  if (clic) clic.textContent = clic.getAttribute('data-' + lang) || clic.textContent;
  const foto = el.querySelector('.anfora__foto');
  if (foto && foto.dataset.srcEn) {
    if (!foto.dataset.srcEs) foto.dataset.srcEs = foto.getAttribute('src');
    const src = lang === 'en' ? foto.dataset.srcEn : foto.dataset.srcEs;
    if (foto.getAttribute('src') !== src) foto.setAttribute('src', src);
  }
  if (estado.repintar) estado.repintar();
}

window.MesaAnfora = {
  idioma: ponerIdioma,
  get lista() { return estado.lista; },
  get cuadros() { return estado.cuadros || 0; },          // para pruebas: fotogramas pintados
  get figuras() { return estado.figuras.slice(); },        // para pruebas: dónde está cada Musa (fracción de vuelta)
  get frente() { return -estado.des; },                    // para pruebas: la pose que pone la inscripción de frente
  posar: (f) => { estado.pose = f; },                        // para capturas: fracción de vuelta, o null
  girar: () => { estado.girando = true; },                   // web.js: ya está posada en la mesa, a girar
  get girando() { return estado.girando; },
  get vuelta() { return estado.vuelta; },                    // para pruebas: fracción de vuelta en este momento
  foto: (lang, ancho) => estado.foto ? estado.foto(lang, ancho) : null
};

if (el) {
  ponerIdioma(estado.lang);
  new MutationObserver(() => {
    const l = (document.documentElement.lang || 'es').slice(0, 2);
    if (l !== estado.lang) ponerIdioma(l);
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

  const hayWebGL = (() => {
    try { return !!document.createElement('canvas').getContext('webgl2'); } catch (e) { return false; }
  })();
  if (hayWebGL) {
    // no arranca mientras se monta la mesa de la portada (03-oct): Three.js (shaders, texturas, lectura de
    // píxeles) bloqueaba el navegador justo cuando aparecía la mesa y se veía a tirones. Espera a que acabe la
    // intro; si antes se baja hasta el ánfora y se ve de verdad, arranca ya (la portada entonces está parada)
    let cerca = false, mesaLista = false, hecho = false, ultimoScroll = 0;
    const probar = (ya) => { if (!hecho && (ya || (cerca && mesaLista))) { hecho = true; arrancar(); } };
    // EN UN RATO TRANQUILO (06-oct, tarde, Javi: «que todas las animaciones vayan fluidas»): prepararla (pintar la
    // textura, compilar los shaders) bloqueaba el navegador unas décimas, y como arrancaba al acercarse, el tirón caía
    // en mitad del scroll, justo antes de la parte negra. Ahora, acabada la intro, se prepara cuando el navegador está
    // libre y nadie está bajando (ningún scroll en el último segundo), y por pasos. Si se baja antes, arranca al acercarse
    addEventListener('scroll', () => { ultimoScroll = performance.now(); }, { passive: true });
    const enCalma = () => {
      if (hecho) return;
      if (performance.now() - ultimoScroll < 1000) { setTimeout(enCalma, 700); return; }
      respiro().then(() => { if (performance.now() - ultimoScroll < 1000) setTimeout(enCalma, 700); else probar(true); });
    };
    const lista = () => { mesaLista = true; probar(); setTimeout(enCalma, 1200); };
    const mesa = document.getElementById('mesa'), portada = document.getElementById('portada');
    if (!mesa || !window.MesaIntro || (portada && portada.classList.contains('terminada'))) lista();
    else {
      mesa.addEventListener('intro:fin', lista, { once: true });
      setTimeout(() => { if (!mesaLista) lista(); }, 20000);           // por si la intro no llega a avisar
    }
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((e) => {
        if (e.some((x) => x.isIntersecting)) { io.disconnect(); cerca = true; probar(); }
      }, { rootMargin: '700px 0px' });
      io.observe(el);
      const ve = new IntersectionObserver((e) => {
        if (e.some((x) => x.isIntersecting)) { ve.disconnect(); probar(true); }
      });
      ve.observe(el);
    } else arrancar();
  }
}

async function arrancar() {
  let THREE;
  try {
    [THREE] = await Promise.all([
      import(ruta('vendor/three/three.anfora.min.js')),
      cargarLetra()
    ]);
  } catch (e) { return; }                                         // se queda la foto
  const img = new Image();
  img.src = ruta('img/anfora_musas.webp');
  let musas = null;
  try {
    await img.decode();
    const medidas = img.naturalWidth === CAJAS.w && img.naturalHeight === CAJAS.h;
    musas = { img, cajas: medidas ? CAJAS.x.map(([x0, x1]) => ({ x0, x1, y0: CAJAS.y0, celda: CAJAS.w / NOMBRES.es.length, alto: CAJAS.h })) : cajas(img) };
  } catch (e) { /* sin Musas, el resto se pinta igual */ }
  await respiro();
  montar(THREE, musas);
}

async function cargarLetra() {
  try {
    const f = new FontFace('Mesa Entasis Anfora', `url(${ruta('fonts/MesaEntasis.woff2')})`);
    await Promise.race([f.load(), new Promise((_, no) => setTimeout(no, 5000))]);
    document.fonts.add(f);
    await document.fonts.load('100px "Mesa Entasis Anfora"', 'CUÉNTANOS ÓÉ');
  } catch (e) { /* sigue con la letra de respaldo */ }
}

/* la caja de cada Musa dentro de su celda de la tira (para medir su ancho y poner su nombre al lado) */
function cajas(img) {
  const n = NOMBRES.es.length, w = img.naturalWidth, h = img.naturalHeight, celda = w / n;
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const x = c.getContext('2d', { willReadFrequently: true });
  x.drawImage(img, 0, 0);
  const a = x.getImageData(0, 0, w, h).data;
  const res = [];
  for (let k = 0; k < n; k++) {
    let x0 = celda, x1 = 0, y0 = h;
    for (let yy = 0; yy < h; yy++) {
      for (let xx = Math.floor(k * celda); xx < (k + 1) * celda; xx++) {
        if (a[(yy * w + xx) * 4 + 3] > 24) {
          const lx = xx - k * celda;
          if (lx < x0) x0 = lx; if (lx > x1) x1 = lx; if (yy < y0) y0 = yy;
        }
      }
    }
    res.push({ x0, x1: x1 + 1, y0, celda, alto: h });
  }
  return res;
}

/* ── Geometría ─────────────────────────────────────────────── */
function perfil(THREE) {
  const curva = new THREE.CatmullRomCurve3(PERFIL.map(([r, y]) => new THREE.Vector3(r, y, 0)), false, 'centripetal');
  curva.arcLengthDivisions = 3000;
  const N = 260;
  const pts = curva.getSpacedPoints(N).map((p) => new THREE.Vector2(Math.max(0, p.x), p.y));
  pts[0].set(0, 0);
  let arriba = 0;
  pts.forEach((p, j) => { if (p.y > pts[arriba].y) arriba = j; });
  return { pts, N, L: curva.getLength(), arriba };
}

/* ── La decoración ─────────────────────────────────────────── */
function pintar(ctx, W, H, P, pal, musas, txt, ex = 1, ey = 1) {
  const { pts, N, L, arriba } = P;
  const fila = (y) => {                                        // altura en el ánfora → fila del canvas
    let j = 0;
    while (j < arriba && pts[j + 1].y <= y) j++;
    const a = pts[j], b = pts[Math.min(j + 1, arriba)];
    const f = b.y > a.y ? (y - a.y) / (b.y - a.y) : 0;
    return (1 - (j + Math.max(0, Math.min(1, f))) / N) * H;
  };
  const sy = H / L;                                            // px por unidad de superficie, en vertical
  const sx = (r) => W / (T * r);                               // ... y en horizontal, según el radio
  const banda = (y0, y1, color) => { ctx.fillStyle = color; ctx.fillRect(0, fila(y1), W, fila(y0) - fila(y1)); };
  const tres = (fn, ancho = W) => { fn(0); fn(-ancho); fn(ancho); };   // repetir a los dos lados de la costura
  /* dibujar en unidades de superficie (o de casilla): el pincel queda estirado en el canvas
     justo lo que la vuelta del ánfora lo encoge, así que sobre el barro se ve redondo */
  const zona = (kx, ky, y0, fn) => { ctx.save(); ctx.transform(kx, 0, 0, ky, 0, y0); fn(); ctx.restore(); };
  const espacio = (px) => { if ('letterSpacing' in ctx) ctx.letterSpacing = px; };

  // el friso y su reparto: inscripciones, columnas y Musas
  const ySuelo = fila(0.337), yTecho = fila(0.648), altoF = ySuelo - yTecho;
  const dCol = altoF * 0.1;                                    // diámetro del fuste de las columnas
  const capU = 1.75 * dCol / W;                                // medio capitel, en fracción de vuelta
  const rep = reparto(W, altoF, capU, musas, txt);
  const uF = 0.25 - rep.des, uB = 0.75 + rep.des;              // centro de la inscripción de delante y de detrás

  const tallar = (uc) => {                                     // CUÉNTANOS / TU IDEA
    ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic'; ctx.lineJoin = 'round';
    ctx.font = `100px ${LETRA}`; espacio('4px');
    const medida = Math.max(...txt.lineas.map((l) => ctx.measureText(l).width));
    const hueco = (2 * CU - 1.5 * dCol / W - 0.016) * W;          // a la altura de las letras solo estorba el fuste
    const fs = Math.min(hueco / medida * 100, altoF * 0.37);
    ctx.font = `${fs}px ${LETRA}`; espacio(`${fs * 0.04}px`);
    const x = uc * W, b1 = yTecho + altoF / 2 + fs * 0.06 - 0.21 * fs - 0.02 * fs;
    const y = (i) => b1 + i * 1.14 * fs;
    if (pal.relieve) {                                         // hundidas, con los bordes en bisel
      ctx.save();
      const lejos = W * 3;                                     // se dibujan fuera y su sombra difusa cae en su sitio
      ctx.shadowColor = pal.hondo; ctx.shadowBlur = fs * 0.028 * ex;
      ctx.shadowOffsetX = lejos * ex; ctx.shadowOffsetY = 0;
      ctx.fillStyle = pal.hondo; ctx.strokeStyle = pal.hondo; ctx.lineWidth = fs * 0.05;
      txt.lineas.forEach((l, i) => { ctx.strokeText(l, x - lejos, y(i)); ctx.fillText(l, x - lejos, y(i)); });
      ctx.restore();
    } else {
      const letras = (dx, dy, color, grueso) => {
        ctx.fillStyle = color; ctx.strokeStyle = color; ctx.lineWidth = fs * grueso;
        txt.lineas.forEach((l, i) => { ctx.strokeText(l, x + dx, y(i) + dy); ctx.fillText(l, x + dx, y(i) + dy); });
      };
      if (pal === C) {                                         // talla, como las losas: el labio de abajo coge luz,
        letras(fs * 0.016, fs * 0.024, 'rgba(234,234,235,.4)', 0.04);    // el de arriba hace sombra (filos cortos:
        letras(-fs * 0.01, -fs * 0.016, 'rgba(10,8,8,.55)', 0.04);       // con más, la letra parecía doble y blanda)
      }
      ctx.strokeStyle = pal.negro; ctx.lineWidth = fs * 0.085;  // un filete negro fino
      txt.lineas.forEach((l, i) => ctx.strokeText(l, x, y(i)));
      letras(0, 0, pal.cal, 0.05);                             // la cal que rellena el corte
      if (pal === C) {                                         // dentro del corte, la pared de arriba en sombra
        const o = document.createElement('canvas');
        const ow = Math.ceil(2 * (CU - capU) * W), oh = Math.ceil(fs * 2.6);
        o.width = ow; o.height = oh;
        const c2 = o.getContext('2d');
        c2.font = ctx.font; if ('letterSpacing' in c2) c2.letterSpacing = `${fs * 0.04}px`;
        c2.textAlign = 'center'; c2.textBaseline = 'alphabetic'; c2.lineJoin = 'round'; c2.lineWidth = fs * 0.05;
        const oy = (i) => y(i) - (y(0) - fs * 0.95);
        const forma = (dy, color) => {
          c2.fillStyle = color; c2.strokeStyle = color;
          txt.lineas.forEach((l, i) => { c2.strokeText(l, ow / 2, oy(i) + dy); c2.fillText(l, ow / 2, oy(i) + dy); });
        };
        forma(0, 'rgba(60,52,50,.62)');
        c2.globalCompositeOperation = 'destination-out';
        c2.filter = 'blur(' + (fs * 0.012).toFixed(1) + 'px)';
        forma(fs * 0.045, '#000');
        c2.filter = 'none';
        ctx.drawImage(o, x - ow / 2, y(0) - fs * 0.95);
      }
    }
    espacio('0px');
  };

  ctx.setTransform(ex, 0, 0, ey, 0, 0);
  if (pal.relieve) {
    ctx.fillStyle = pal.fondo; ctx.fillRect(0, 0, W, H);
    tallar(uF); tallar(uB);
    return rep;
  }

  ctx.fillStyle = pal.negro; ctx.fillRect(0, 0, W, H);        // el barniz negro es el fondo
  banda(0.088, 0.772, pal.rojo);                               // arcilla del cuerpo y del hombro
  banda(0.800, 0.926, pal.rojo);                               // arcilla del cuello

  // rayos sobre el pie
  banda(0.100, 0.105, pal.negro);
  ctx.fillStyle = pal.negro;
  const nRay = 26, yb = fila(0.105), yt = fila(0.207);
  for (let i = 0; i < nRay; i++) tres((dx) => {
    const u = (i + 0.5) / nRay, a = 0.37 / nRay;
    ctx.beginPath(); ctx.moveTo((u - a) * W + dx, yb); ctx.lineTo(u * W + dx, yt); ctx.lineTo((u + a) * W + dx, yb); ctx.fill();
  });
  banda(0.214, 0.219, pal.negro); banda(0.226, 0.230, pal.negro);

  // greca (meandro) con cuadros de aspa azul; casillas de 12 de alto
  {
    const y0 = 0.240, y1 = 0.322, rM = 0.338;
    const g = (fila(y0) - fila(y1)) / 12;
    const grupos = Math.round(W / (33 * g * sx(rM) / sy));
    const gx = W / (grupos * 33), vuelta = grupos * 33;
    zona(gx, g, fila(y1) + 2 * g, () => {
      ctx.fillStyle = pal.negro;
      [-1.5, 7.5, 9.5].forEach((yy) => ctx.fillRect(0, yy - 0.5, vuelta, 1));
      ctx.lineWidth = 1; ctx.lineCap = 'butt'; ctx.lineJoin = 'miter';
      for (let k = 0; k < grupos; k++) tres((dx) => {
        const x0 = k * 33 + dx;
        ctx.strokeStyle = pal.negro;
        for (let c = 0; c < 3; c++) {
          ctx.beginPath();
          [[0.5, 7.5], [0.5, 0.5], [6.5, 0.5], [6.5, 5.5], [2.5, 5.5], [2.5, 2.5], [4.5, 2.5], [4.5, 3.5]]
            .forEach(([x, y], i) => ctx[i ? 'lineTo' : 'moveTo'](x0 + c * 8 + x, y));
          ctx.stroke();
        }
        const ox = x0 + 24;                                       // el cuadro de aspa
        ctx.strokeRect(ox + 0.5, 0.5, 7, 7);
        ctx.strokeStyle = pal.azul; ctx.lineWidth = 0.95;
        ctx.beginPath(); ctx.moveTo(ox + 1.6, 1.6); ctx.lineTo(ox + 6.4, 6.4); ctx.moveTo(ox + 6.4, 1.6); ctx.lineTo(ox + 1.6, 6.4); ctx.stroke();
        ctx.lineWidth = 1;
        ctx.fillStyle = pal.negro;
        [[4, 1.9], [4, 6.1], [1.9, 4], [6.1, 4]].forEach(([x, y]) => { ctx.beginPath(); ctx.arc(ox + x, y, 0.55, 0, T); ctx.fill(); });
      }, vuelta);
    });
  }

  banda(0.330, 0.337, pal.negro);                                // suelo del friso
  banda(0.648, 0.653, pal.negro);
  { // fila de puntos sobre el friso
    const a = fila(0.664), b = fila(0.657), rr = (b - a) * 0.42, n = 96;
    ctx.fillStyle = pal.negro;
    for (let i = 0; i < n; i++) tres((dx) => { ctx.beginPath(); ctx.arc((i + 0.5) / n * W + dx, (a + b) / 2, rr, 0, T); ctx.fill(); });
  }
  banda(0.667, 0.672, pal.negro);

  // lengüetas del hombro, negras y azules, colgando del cuello
  {
    const n = 44, yT = fila(0.772), yB = fila(0.684), rB = 0.336;
    for (let i = 0; i < n; i++) tres((dx) => {
      const w = 0.84 / n;
      const x0 = (i / n + (1 / n - w) / 2) * W + dx, ww = w * W;
      const ry = (w / 2) * T * rB * sy;                              // remate redondo en la superficie
      ctx.fillStyle = i % 2 ? pal.azul : pal.negro;
      ctx.beginPath(); ctx.moveTo(x0, yT); ctx.lineTo(x0, yB - ry);
      ctx.ellipse(x0 + ww / 2, yB - ry, ww / 2, ry, 0, Math.PI, 0, true);
      ctx.lineTo(x0 + ww, yT); ctx.fill();
    });
  }

  // cadena de palmetas en el cuello: un zarcillo ondulado y palmetas alternas
  {
    const rN = 0.150, y0 = fila(0.926);
    const h = (fila(0.800) - y0) / sy, n = 10, vuelta = T * rN, paso = vuelta / n;
    const mid = h / 2, A = h * 0.17;
    zona(sx(rN), sy, y0, () => {
      ctx.strokeStyle = pal.negro; ctx.lineWidth = 0.0055; ctx.lineCap = 'round';
      ctx.beginPath();
      for (let s = 0; s <= 400; s++) {
        const x = s / 400 * vuelta;
        ctx[s ? 'lineTo' : 'moveTo'](x, mid - A * Math.cos(x / paso * Math.PI));
      }
      ctx.stroke();
      const palmeta = (x, yBase, sube) => {
        const dir = sube ? -1 : 1, largo = h * 0.44;
        ctx.fillStyle = pal.negro;
        for (let k = -3; k <= 3; k++) {
          const th = k * 0.33, l = largo * (1 - 0.1 * Math.abs(k));
          const ux = Math.sin(th), uy = dir * Math.cos(th);
          ctx.beginPath();
          ctx.ellipse(x + ux * l * 0.55, yBase + uy * l * 0.55, l * 0.5, l * 0.12, Math.atan2(uy, ux), 0, T);
          ctx.fill();
        }
        ctx.fillStyle = pal.azul;
        ctx.beginPath(); ctx.arc(x, yBase, h * 0.085, sube ? Math.PI : 0, sube ? T : Math.PI); ctx.closePath(); ctx.fill();
        ctx.lineWidth = 0.0035; ctx.stroke(); ctx.lineWidth = 0.0055;
      };
      for (let i = 0; i < n; i++) tres((dx) => {
        const sube = i % 2 === 0;
        palmeta(i * paso + dx, sube ? mid + A : mid - A, sube);
      }, vuelta);
    });
  }

  // columnas jónicas a los lados de cada inscripción (el isotipo son columnas)
  [uF, uB].forEach((uc) => [-1, 1].forEach((s) => columna(ctx, (uc + s * CU) * W, ySuelo, yTecho, dCol, pal)));

  // las Musas (sin nombres: el único texto del ánfora es la inscripción, Javi 03-oct)
  if (musas) {
    let fuente = musas.img;
    if (pal !== C) {                                               // rugosidad: la silueta entera es barniz
      fuente = document.createElement('canvas');
      fuente.width = musas.img.naturalWidth; fuente.height = musas.img.naturalHeight;
      const c2 = fuente.getContext('2d');
      c2.drawImage(musas.img, 0, 0); c2.globalCompositeOperation = 'source-in';
      c2.fillStyle = pal.negro; c2.fillRect(0, 0, fuente.width, fuente.height);
    }
    rep.figuras.forEach(({ k, u, esc }) => tres((dx) => {
      const cj = musas.cajas[k], x = u * W + dx;                    // u: borde izquierdo de la figura
      ctx.drawImage(fuente, k * cj.celda + cj.x0, 0, cj.x1 - cj.x0, cj.alto,
        x, ySuelo - cj.alto * esc, (cj.x1 - cj.x0) * esc, cj.alto * esc);
    }));
  }

  tallar(uF); tallar(uB);
  return rep;
}

/* dónde va cada Musa: el lado de las tres (alrededor de u = 0,5) y el de las dos (alrededor de u = 0).
   Las inscripciones se desplazan hacia el lado de las dos para que ambos lados respiren igual. */
function reparto(W, altoF, capU, musas, txt) {
  const fsNombre = altoF * 0.085;
  const res = { des: 0, figuras: [], fsNombre };
  if (!musas) return res;
  const altoFig = altoF * 0.9;
  const ancho = (k) => {                                          // la figura, en fracción de vuelta
    const cj = musas.cajas[k], esc = altoFig / cj.alto;
    return ((cj.x1 - cj.x0) * esc) / W;
  };
  const m = 0.008;                                                // aire mínimo entre piezas
  const libre = 1 - 4 * (CU + capU);                              // lo que dejan las dos inscripciones
  const necA = LADO_A.reduce((s, k) => s + ancho(k), 0), necB = LADO_B.reduce((s, k) => s + ancho(k), 0);
  const huecosA = LADO_A.length + 1, huecosB = LADO_B.length + 1;
  // reparto del aire proporcional al número de huecos; si no cabe, las figuras encogen
  const esc = Math.min(1, (libre - (huecosA + huecosB) * m) / (necA + necB));
  const aire = (libre - esc * (necA + necB)) / (huecosA + huecosB);
  const gapA = esc * necA + aire * huecosA;
  res.des = (gapA - (0.5 - 2 * (CU + capU))) / 2;
  const poner = (lado, u0) => {
    let u = u0 + aire;
    lado.forEach((k) => {
      const cj = musas.cajas[k], e = esc * altoFig / cj.alto;
      res.figuras.push({ k, u, esc: e, centro: u + ((cj.x1 - cj.x0) * e / 2) / W });
      u += esc * ancho(k) + aire;
    });
  };
  poner(LADO_A, 0.25 - res.des + CU + capU);
  poner(LADO_B, 0.75 + res.des + CU + capU - 1);
  return res;
}

/* columna jónica pintada: basa de dos toros, fuste con éntasis y estrías incisas, capitel de volutas */
function columna(ctx, x, yB, yT, d, pal) {
  const h = yB - yT;
  ctx.fillStyle = pal.negro;
  const rr = (cx, y, w, hh) => { ctx.beginPath(); ctx.ellipse(cx, y + hh / 2, w / 2, hh / 2, 0, 0, T); ctx.fill(); };
  rr(x, yB - h * 0.036, d * 1.75, h * 0.036);                       // toro de abajo
  ctx.fillRect(x - d * 0.62, yB - h * 0.05, d * 1.24, h * 0.016);  // escocia
  rr(x, yB - h * 0.074, d * 1.5, h * 0.026);                        // toro de arriba
  const f0 = yB - h * 0.068, f1 = yT + h * 0.15;                    // fuste
  const ancho = (t) => d * (1 - 0.14 * t) * (1 + 0.05 * Math.sin(Math.PI * t * 0.9));
  ctx.beginPath();
  for (let i = 0; i <= 20; i++) { const t = i / 20; ctx.lineTo(x - ancho(t) / 2, f0 + (f1 - f0) * t); }
  for (let i = 20; i >= 0; i--) { const t = i / 20; ctx.lineTo(x + ancho(t) / 2, f0 + (f1 - f0) * t); }
  ctx.fill();
  ctx.fillRect(x - d * 0.62, yT + h * 0.12, d * 1.24, h * 0.035);  // equino
  ctx.fillRect(x - d * 1.2, yT + h * 0.06, d * 2.4, h * 0.06);     // canal de las volutas
  ctx.fillRect(x - d * 1.15, yT, d * 2.3, h * 0.03);               // ábaco
  const rv = h * 0.048;
  [-1, 1].forEach((s) => { ctx.beginPath(); ctx.arc(x + s * d * 1.15, yT + h * 0.06 + rv * 0.95, rv, 0, T); ctx.fill(); });
  if (pal !== C) return;
  ctx.strokeStyle = pal.cal; ctx.lineWidth = Math.max(1, d * 0.07); ctx.lineCap = 'round';
  [-0.24, 0, 0.24].forEach((o) => {                               // estrías
    ctx.beginPath();
    for (let i = 0; i <= 20; i++) { const t = i / 20; ctx.lineTo(x + o * ancho(t), f0 - h * 0.01 + (f1 - f0 + h * 0.02) * t); }
    ctx.stroke();
  });
  [-1, 1].forEach((s) => {                                         // espiral de cada voluta
    const cx = x + s * d * 1.15, cy = yT + h * 0.06 + rv * 0.95;
    ctx.beginPath();
    for (let i = 0; i <= 60; i++) {
      const a = i / 60 * T * 2.1, r = rv * 0.82 * (1 - i / 60 * 0.85);
      ctx.lineTo(cx + s * Math.cos(a + Math.PI) * r, cy + Math.sin(a + Math.PI) * r * -1);
    }
    ctx.stroke();
  });
  ctx.beginPath(); ctx.moveTo(x - d * 1.05, yT + h * 0.09); ctx.lineTo(x + d * 1.05, yT + h * 0.09); ctx.stroke();
}

/* ── La escena ─────────────────────────────────────────────── */
function entorno(THREE, renderer) {
  const sala = new THREE.Scene();
  const geo = [], mat = [];
  const caja = new THREE.Mesh(geo[geo.push(new THREE.BoxGeometry(12, 12, 12)) - 1],
    mat[mat.push(new THREE.MeshBasicMaterial({ color: new THREE.Color(0.12, 0.12, 0.12), side: THREE.BackSide })) - 1]);
  sala.add(caja);
  const panel = (w, h, c, x, y, z) => {
    const m = new THREE.Mesh(geo[geo.push(new THREE.PlaneGeometry(w, h)) - 1],
      mat[mat.push(new THREE.MeshBasicMaterial({ color: new THREE.Color(c[0], c[1], c[2]), side: THREE.DoubleSide })) - 1]);
    m.position.set(x, y, z); m.lookAt(0, 0, 0); sala.add(m);
  };
  panel(4.5, 3.2, [6.4, 6.3, 6.1], -3.6, 3.8, 3.2);    // ventana, arriba a la izquierda
  panel(2.2, 4.5, [1.1, 1.2, 1.4], 4.8, 0.6, 1.4);     // relleno frío a la derecha
  panel(1.4, 5.5, [3.2, 3.2, 3.3], 1.6, 1.2, -5);      // contraluz
  panel(11, 11, [0.6, 0.6, 0.61], 0, -5.5, 0);         // la cal del suelo devuelve luz
  const pm = new THREE.PMREMGenerator(renderer);
  const tex = pm.fromScene(sala, 0.04).texture;
  pm.dispose(); geo.forEach((g) => g.dispose()); mat.forEach((m) => m.dispose());
  return tex;
}

async function montar(THREE, musas) {
  const escena = el.querySelector('.anfora__escena') || el;
  const canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  escena.appendChild(canvas);

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'low-power' });
  } catch (e) { canvas.remove(); return; }
  const dpr = () => Math.min(3, window.devicePixelRatio || 1);            // a la densidad real de la pantalla (hasta 3)
  renderer.setPixelRatio(dpr());
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new THREE.Scene();
  scene.environment = entorno(THREE, renderer);
  await respiro();
  const FOV = 2 * Math.atan(HOLGURA * Math.tan(22 * Math.PI / 360)) * 180 / Math.PI;   // misma talla que sin holgura
  const camara = new THREE.PerspectiveCamera(FOV, 6 / 7, 0.1, 20);
  camara.position.set(0, 0.32, 3.2);
  camara.lookAt(0, 0.03, 0);

  const luz = (color, i, x, y, z) => { const l = new THREE.DirectionalLight(color, i); l.position.set(x, y, z); scene.add(l); };
  luz(0xffffff, 2.1, -3, 4, 3.2);        // clave: arriba a la izquierda, como toda la web
  luz(0xe4ebf3, 0.35, 3.5, 0.8, 2.5);    // relleno
  luz(0xffffff, 1.7, 2.6, 2.2, -4);      // contraluz que dibuja el borde
  luz(0xffffff, 0.7, -3, 1, -3.5);

  // la textura pintada, y su gemela del mismo tamaño (a la mitad, el borde de las letras salía blando):
  // relieve en el rojo, rugosidad en el verde
  const P = perfil(THREE);
  const W = dpr() >= 1.5 ? 2560 : 2048;
  const H = Math.round(W * P.L / (T * RMAX));
  const lienzo = document.createElement('canvas'); lienzo.width = W; lienzo.height = H;
  const gemela = () => { const c = document.createElement('canvas'); c.width = W; c.height = H; return c; };
  const rug = gemela(), rel = gemela();
  const mapa = new THREE.CanvasTexture(lienzo);
  mapa.colorSpace = THREE.SRGBColorSpace;
  mapa.wrapS = THREE.RepeatWrapping;
  mapa.anisotropy = renderer.capabilities.getMaxAnisotropy();
  const mapaR = new THREE.CanvasTexture(rug);
  mapaR.wrapS = THREE.RepeatWrapping;
  mapaR.anisotropy = mapa.anisotropy;
  // repintar, en cuatro pasos: la primera vez con un respiro entre uno y otro (06-oct, tarde: todo seguido era una
  // sola tarea larga que trababa el scroll); al cambiar de idioma o para la foto, seguidos
  const pasos = () => {
    const txt = textos(estado.lang);
    const cr = rug.getContext('2d', { willReadFrequently: true }), cl = rel.getContext('2d', { willReadFrequently: true });
    let rep;
    return [
      () => { rep = pintar(lienzo.getContext('2d'), W, H, P, C, musas, txt); },
      () => { pintar(cr, W, H, P, R, musas, txt); },
      () => { pintar(cl, W, H, P, B, musas, txt); },
      () => {
        const a = cr.getImageData(0, 0, rug.width, rug.height), b = cl.getImageData(0, 0, rug.width, rug.height).data;
        for (let i = 0; i < b.length; i += 4) a.data[i] = b[i];
        cr.putImageData(a, 0, 0);
        mapa.needsUpdate = true; mapaR.needsUpdate = true;
        estado.des = rep.des;                                        // la inscripción, algo corrida (ver reparto)
        estado.figuras = rep.figuras.map((f) => f.centro);
      }
    ];
  };
  const repintar = () => pasos().forEach((p) => p());
  const langPintado = estado.lang;
  for (const p of pasos()) { p(); await respiro(); }

  const barro = new THREE.MeshPhysicalMaterial({
    map: mapa, roughnessMap: mapaR, roughness: 1, metalness: 0,
    bumpMap: mapaR, bumpScale: -3.5,                            // con este torno, negativo = hundido (comprobado en capturas)
    clearcoat: 0.3, clearcoatRoughness: 0.32, envMapIntensity: 0.5
  });
  barro.onBeforeCompile = (sh) => {                           // la tarjeta, por ahorrar, leía una copia reducida
    sh.fragmentShader = sh.fragmentShader.replace('#include <map_fragment>',
      ['#ifdef USE_MAP', '  diffuseColor *= texture2D( map, vMapUv, -0.85 );', '#endif'].join('\n'));
  };
  const barniz = new THREE.MeshPhysicalMaterial({
    color: C.negro, roughness: 0.3, metalness: 0, clearcoat: 0.45, clearcoatRoughness: 0.25, envMapIntensity: 0.6
  });

  const cuerpo = new THREE.Mesh(new THREE.LatheGeometry(P.pts, 144, -Math.PI / 2, T), barro);
  const camino = new THREE.CatmullRomCurve3(ASA.map(([r, y]) => new THREE.Vector3(r, y, 0)), false, 'centripetal');
  const geoAsa = new THREE.TubeGeometry(camino, 64, 0.019, 16, false);
  geoAsa.scale(1, 1, 2.1);                                     // de tubo a cinta
  const asa1 = new THREE.Mesh(geoAsa, barniz);
  const asa2 = new THREE.Mesh(geoAsa, barniz); asa2.scale.x = -1;

  // grupos: acercar (escala) > balanceo (pivota en el pie) > giro
  const acercar = new THREE.Group(), balanceo = new THREE.Group(), giro = new THREE.Group();
  balanceo.position.y = -0.5;
  giro.add(cuerpo, asa1, asa2);
  balanceo.add(giro); acercar.add(balanceo); scene.add(acercar);

  // sombra de contacto, hacia abajo a la derecha (luz de arriba a la izquierda)
  const cs = document.createElement('canvas'); cs.width = cs.height = 128;
  const g2 = cs.getContext('2d'), gr = g2.createRadialGradient(64, 64, 4, 64, 64, 64);
  gr.addColorStop(0, 'rgba(20,22,26,0.42)'); gr.addColorStop(0.45, 'rgba(20,22,26,0.2)'); gr.addColorStop(1, 'rgba(20,22,26,0)');
  g2.fillStyle = gr; g2.fillRect(0, 0, 128, 128);
  const sombraMat = new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(cs), transparent: true, depthWrite: false, toneMapped: false });
  const sombra = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), sombraMat);
  sombra.rotation.x = -Math.PI / 2;
  sombra.renderOrder = -1;
  scene.add(sombra);

  // las texturas a la gráfica y los shaders compilados ahora, sin prisa (compileAsync usa la compilación en paralelo
  // si el navegador la tiene); si no, se hacía todo en el primer fotograma visible y la página se paraba
  try {
    renderer.initTexture(mapa); await respiro();
    renderer.initTexture(mapaR); await respiro();
    await renderer.compileAsync(scene, camara);
  } catch (e) { /* se hará en el primer fotograma, como antes */ }

  // tamaño
  const medir = () => {
    const w = canvas.clientWidth || 390, h = canvas.clientHeight || 455;
    renderer.setPixelRatio(dpr());
    renderer.setSize(w, h, false);
    camara.aspect = w / h; camara.updateProjectionMatrix();
    pedir();
  };
  if ('ResizeObserver' in window) new ResizeObserver(medir).observe(escena); else window.addEventListener('resize', medir);

  // acercarse: muelle amortiguado, sin saltos aunque se interrumpa
  let s = 1, v = 0, objetivo = 1;
  const cerca = (si) => { objetivo = si ? CERCA : 1; };
  el.addEventListener('pointerenter', (e) => { if (e.pointerType !== 'touch') cerca(true); });
  el.addEventListener('pointerleave', () => cerca(el.matches(':focus-visible')));
  el.addEventListener('focus', () => cerca(el.matches(':focus-visible') || el.matches(':hover')));
  el.addEventListener('blur', () => cerca(el.matches(':hover')));

  let t = 0, previo = 0, visible = true, enMarcha = false;
  estado.repintar = () => { repintar(); pedir(); };
  if (estado.lang !== langPintado) repintar();                      // cambió el idioma mientras se preparaba
  let tg = 0, vg = estado.girando ? 1 : 0;                    // reloj del giro y su velocidad (0 quieta, 1 normal)
  const colocar = (dt, quieto) => {
    if (!estado.girando && el.hasAttribute('data-girar')) estado.girando = true;   // web.js ya la posó
    vg += ((estado.girando ? 1 : 0) - vg) * Math.min(1, dt * 1.6);   // arranca suave, en ~1,5 s
    tg += dt * vg;
    const w0 = 9;
    v += (w0 * w0 * (objetivo - s) - 2 * w0 * v) * dt;
    s += v * dt;
    if (quieto) { s = 1; v = 0; }
    acercar.scale.setScalar(s);
    acercar.position.y = quieto ? 0 : Math.sin(t * 1.1) * 0.006 + (s - 1) * 0.3;
    balanceo.rotation.z = quieto ? 0 : Math.sin(t * 0.8) * 0.02;
    balanceo.rotation.x = quieto ? 0 : Math.sin(t * 0.57 + 1.3) * 0.014;
    // empieza con la inscripción de frente (como la foto) y luego gira sin parar
    const vuelta = estado.pose != null ? estado.pose : tg / VUELTA + Math.sin(t * 0.37) * 0.006 - estado.des;
    estado.vuelta = vuelta;
    giro.rotation.y = -vuelta * T;
    const lev = (s - 1) / (CERCA - 1);                         // 0 posada, 1 acercada
    sombra.position.set(0.05, -0.5 * s + acercar.position.y - 0.002, 0.02);
    sombra.scale.set(1.05 + lev * 0.25, 0.8 + lev * 0.18, 1);
    sombraMat.opacity = 1 - lev * 0.35;
  };
  const cuadro = (ahora) => {
    const dt = Math.min(0.05, Math.max(0, (ahora - previo) / 1000));
    previo = ahora; t += dt; estado.cuadros = (estado.cuadros || 0) + 1;
    colocar(dt, false);
    renderer.render(scene, camara);
    if (!estado.lista) {
      estado.lista = true;
      el.classList.add('anfora--viva');
    }
  };
  function pedir() {
    const debe = visible && !document.hidden;
    if (debe === enMarcha) return;
    enMarcha = debe;
    if (debe) { previo = performance.now(); renderer.setAnimationLoop(cuadro); } else renderer.setAnimationLoop(null);
  }
  if ('IntersectionObserver' in window) {
    let seguro = false;                                        // por si web.js no llega a decir «a girar»
    new IntersectionObserver((e) => {
      visible = e[e.length - 1].isIntersecting; pedir();
      // sin web.js (página sin la clase js) nadie la va a posar: gira en cuanto se ve. Con web.js, espera a la marca
      if (visible && !seguro && !estado.girando && !document.documentElement.classList.contains('js')) { seguro = true; estado.girando = true; }
    }).observe(el);
  }
  document.addEventListener('visibilitychange', pedir);
  canvas.addEventListener('webglcontextlost', (e) => { e.preventDefault(); el.classList.remove('anfora--viva'); });

  // foto fija (para generar img/anfora.webp): la inscripción de frente, quieta, al ancho pedido
  estado.foto = (lang, ancho) => {
    const antes = estado.lang;
    if (lang && lang !== estado.lang) { estado.lang = lang; repintar(); }
    const w = ancho || 760, h = Math.round(w * 7 / 6);
    renderer.setPixelRatio(1); renderer.setSize(w, h, false);
    camara.fov = 22; camara.aspect = w / h; camara.updateProjectionMatrix();   // la foto, sin holgura: a la caja
    const pose = estado.pose; estado.pose = -estado.des; t = 0;
    colocar(0, true);
    renderer.render(scene, camara);
    const url = canvas.toDataURL('image/png');
    camara.fov = FOV;
    estado.pose = pose;
    if (estado.lang !== antes) { estado.lang = antes; repintar(); }
    medir();
    return url;
  };

  medir();
  pedir();
}
