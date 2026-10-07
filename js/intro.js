/* La escena de la mesa (intro), como módulo de la web.
   Generado por _tools/copiar_intro.py desde 5_audiovisual/intro_mesa/prototipo: no editar aquí.
   Uso: MesaIntro.iniciar(contenedor, { base: "intro/" }); MesaIntro.repetir(); MesaIntro.pausar() / seguir() /
   calentar() (prepara las imágenes antes de volver a la mesa). Avisa con el evento "intro:fin" en el contenedor. */
window.MesaIntro = (function () {
"use strict";
let contenedor, BASE = "intro/", formato = null, encajar = () => {};
const VERSION = "2610041801";                  // cambia en cada copia: el navegador no tira de lo que tenía guardado
const ruta = s => BASE + s + "?v=" + VERSION;
// una imagen que falla (red del móvil, túnel) se pide otra vez una sola vez
function cargarImg(i, src) {
  i.onerror = () => { if (!i.dataset.r) { i.dataset.r = "1"; i.src = ruta(src) + "&r=" + Date.now(); } };
  i.src = ruta(src);
}
// la mesa se anima siempre, también con "reducir movimiento" (Javi, 02-oct: Windows con las animaciones
// apagadas lo activa sin querer). Para volver a respetarlo: matchMedia("(prefers-reduced-motion: reduce)").matches
const QUIETO = false;
const api = { empezar: () => {}, animar: () => {}, saltar: () => {}, pausar: () => {}, seguir: () => {}, calentar: () => {} };
const bucles = [];

function cargar() {
  const dePie = contenedor.clientHeight > contenedor.clientWidth;
  formato = dePie ? "vertical" : "horizontal";
  const s = document.createElement("script");
  s.src = ruta(dePie ? "escena_movil.js" : "escena.js");
  s.onload = () => { api.matar && api.matar(); bucles.splice(0).forEach(b => b.kill()); arrancar(); };
  document.head.appendChild(s);
}

function arrancar() {
  const E = window.ESCENA;
  const viejo = contenedor.querySelector("#escenario");
  if (viejo) viejo.remove();
  const esc = document.createElement("div");
  esc.id = "escenario";
  contenedor.appendChild(esc);
  Object.assign(esc.style, { width: E.W + "px", height: E.H + "px" });
  const SVG = "http://www.w3.org/2000/svg";
  const imagenes = [];
  // la luz viene de arriba a la izquierda: todo lo que esta en alto echa la sombra hacia abajo a la derecha,
  // y cuanto mas alto, mas lejos y mas difusa (LUZ = direccion, C = px de sombra por px de altura)
  const LUZ = [0.537, 0.844], C = 0.8, GROSOR = 6;
  const rad = g => g * Math.PI / 180;
  const px = v => v + "px";

  // --- piezas --------------------------------------------------------------------------------------
  const sombra = (s, alto = 0) => {
    const f = 1 - Math.min(0.5, alto / 320);
    return `drop-shadow(${(s.dx + alto * C * LUZ[0]).toFixed(1)}px ${(s.dy + alto * C * LUZ[1]).toFixed(1)}px ` +
           `${(s.blur + alto * 0.09).toFixed(1)}px rgba(20,22,26,${(s.o * f).toFixed(3)}))`;
  };
  // sin decoding="async" (03-oct, noche): con él Chrome puede pintar la mesa SIN la imagen mientras la decodifica
  // (checker-imaging; solo lo hace con las imágenes marcadas async) y se ve lo de debajo un instante
  function img(src, x, y, w, h, padre = esc) {
    const i = new Image();
    cargarImg(i, src); i.alt = "";
    Object.assign(i.style, { left: px(x), top: px(y), width: px(w), height: px(h) });
    imagenes.push(i); padre.appendChild(i); return i;
  }
  // objeto plano (papel, regla, pigmentos, capitel...): la caja exterior lleva la sombra y la interior se
  // mueve. Su estado: x, y (desplazamiento desde su sitio), rot, alto (lo levantado que va en la mano)
  function obj(p) {
    const d = document.createElement("div");
    d.className = "obj"; d.id = p.id;
    Object.assign(d.style, { left: px(p.x), top: px(p.y), width: px(p.w), height: px(p.h), filter: sombra(p.sombra) });
    const g = document.createElement("div"); g.className = "giro";
    const i = new Image(); cargarImg(i, p.src); i.alt = ""; imagenes.push(i);
    g.appendChild(i); d.appendChild(g); esc.appendChild(d);
    d.giro = g; d.datos = p;
    d.pinta = () => {
      const s = d.s, k = 1 + s.alto / 1800;                      // lo que sube se acerca a la camara
      g.style.transform = `translate(${s.x}px,${s.y}px) rotate(${s.rot}deg) scale(${k})`;
      d.style.filter = sombra(p.sombra, s.alto);
    };
    d.inicial = { x: 0, y: 0, rot: 0, alto: 0 };
    return d;
  }
  // herramienta (lapiz, compas): se mueve por su punta, se inclina (beta: grados sobre la mesa) y su sombra
  // se calcula: la parte que sube se proyecta hacia donde cae la luz. eje "x" = el largo va a lo ancho de la
  // imagen (lapiz, de la mina hacia atras); eje "y" = el largo va de las puntas hacia la cabeza (compas)
  // pelo: donde acaba el pelo de un pincel; lleva encima una capa con la forma exacta del pelo (la misma imagen
  // como mascara) que se tiñe del pigmento al mojarlo. s.cs: cuanto se alarga la sombra por px de altura; en el
  // lapicero va casi plana, como la del propio lapicero, y al sacarlo pasa a la de verdad (C)
  function herramienta(p, origen, eje, degradado, pelo) {
    const capa = cls => {
      const d = document.createElement("div"); d.className = cls;
      Object.assign(d.style, { width: px(p.w), height: px(p.h), transformOrigin: `${origen[0]}px ${origen[1]}px` });
      const i = new Image(); cargarImg(i, p.src); i.alt = ""; imagenes.push(i);
      d.appendChild(i); esc.appendChild(d); return d;
    };
    const somb = capa("herrSombra"), cuerpo = capa("herr");
    somb.firstChild.style.webkitMaskImage = somb.firstChild.style.maskImage = degradado;
    const h = { cuerpo, somb };
    if (pelo) {
      const c = document.createElement("div"), corte = (pelo / p.w * 100).toFixed(1);
      c.className = "carga";
      const mascara = `url(${ruta(p.src)}), linear-gradient(to right, #000 ${corte}%, transparent ${corte}%)`;
      Object.assign(c.style, { webkitMaskImage: mascara, maskImage: mascara });
      cuerpo.appendChild(c); h.carga = c;
    }
    h.pinta = () => {
      const s = h.s, cs = s.cs ?? C;
      const r = rad(s.rot + (s.pulso || 0) * (2.2 * Math.sin(s.x / 53) + 1.4 * Math.sin(s.y / 31)));
      const cr = Math.cos(r), sr = Math.sin(r), cb = Math.cos(rad(s.beta)), sb = Math.sin(rad(s.beta));
      const k = 1 + s.alto * (s.pk ?? 1) / 1800;              // lo que sube se acerca a la camara (en el lapicero no: es la foto)
      let m, ms;                                                  // columnas: a donde van los ejes x e y de la imagen
      if (eje === "x") {
        m = [cr * cb * k, sr * cb * k, -sr * k, cr * k];
        ms = [cr * cb + sb * cs * LUZ[0], sr * cb + sb * cs * LUZ[1], -sr, cr];
      } else {
        m = [cr * k, sr * k, -sr * cb * k, cr * cb * k];
        ms = [cr, sr, -sr * cb - sb * cs * LUZ[0], cr * cb - sb * cs * LUZ[1]];
      }
      const tx = s.x - origen[0], ty = s.y - origen[1], f = v => v.toFixed(4);
      const z = s.alto + GROSOR;                                  // tumbado tambien levanta un poco: su grosor
      cuerpo.style.transform = `translate(${tx.toFixed(2)}px,${ty.toFixed(2)}px) matrix(${m.map(f)},0,0)`;
      somb.style.transform = `translate(${(tx + z * cs * LUZ[0]).toFixed(2)}px,${(ty + z * cs * LUZ[1]).toFixed(2)}px) matrix(${ms.map(f)},0,0)`;
      somb.style.filter = `brightness(0) blur(${(1.6 + s.alto * 0.03).toFixed(2)}px)`;
      somb.style.opacity = (0.30 * (1 - Math.min(0.5, s.alto / 400))).toFixed(3);
    };
    return h;
  }
  const capa = (id, x, y, w, h) => {
    const d = document.createElement("div");
    d.id = id; d.className = "sombras";
    Object.assign(d.style, { left: px(x), top: px(y), width: px(w), height: px(h) });
    esc.appendChild(d); return d;
  };
  const dato = id => E.objetos.find(x => x.id === id);

  // --- el escenario, de abajo arriba --------------------------------------------------------------
  const [mx, my, mw, mh] = E.mesa;
  img(E.fondo, 0, 0, E.W, E.H);                                   // suelo al sol, banco y sombra de la mesa
  // la sombra del olivo sobre el suelo: solo en las tiras de suelo que quedan alrededor de la mesa, cada una
  // recortando lo suyo (03-oct, tarde). Antes iba en una capa del tamaño de la escena por debajo del tablero.
  // Como las ramas se mecen, el navegador separaba en capas aparte todo lo que pisaba esa sombra (tablero, tablet,
  // dibujo, luz) y el móvil no daba abasto: huecos negros al volver a la portada y al ampliar
  const tirasSuelo = [[0, 0, E.W, my], [0, my + mh, E.W, E.H - my - mh], [0, my, mx, mh], [mx + mw, my, E.W - mx - mw, mh]]
    .filter(t => t[2] > 0 && t[3] > 0)
    .map((t, k) => { const d = capa("sombraSuelo" + k, ...t); d.style.overflow = "hidden"; d.caja = t; return d; });
  img(E.tablero, mx, my, mw, mh);                                  // la losa de la mesa
  const luz = document.createElement("div"); luz.id = "luz";       // la luz, quieta, sobre la mesa
  Object.assign(luz.style, { left: px(mx), top: px(my), width: px(mw), height: px(mh) });
  esc.appendChild(luz);
  const aparatos = {};
  for (const a of E.aparatos) {
    aparatos[a.id] = obj(a);
    const s = a.pantalla, p = document.createElement("div");
    p.className = "pantalla";
    p.id = a.id === "tablet" ? "pantallaTablet" : "pantallaMovil";
    Object.assign(p.style, { left: px(s.cx), top: px(s.cy), width: px(s.w), height: px(s.h),
                             borderRadius: px(Math.min(s.w, s.h) * (a.id === "tablet" ? 0.03 : 0.17)) });
    gsap.set(p, { xPercent: -50, yPercent: -50, rotation: s.rot });
    esc.appendChild(p); aparatos[a.id].pantalla = p;
  }
  const o = {};
  o.lapicero = obj(dato("lapicero"));
  o.papel = obj({ id: "papel", ...E.papel });

  // el dibujo, en vector: lineas de construccion (solo sobre el papel), simbolo y nombre
  const D = E.dibujo, [ppx, ppy, ppw, pph] = [E.papel.x, E.papel.y, E.papel.w, E.papel.h];
  const svg = document.createElementNS(SVG, "svg");
  // del tamaño del papel, que es donde se dibuja (03-oct, tarde): a tamaño de escena pisaba el vídeo del móvil y
  // el navegador lo separaba, y con él todo lo de encima, en capas aparte. Las coordenadas siguen siendo las de
  // la escena (el viewBox empieza donde empieza el papel)
  svg.id = "dibujo"; svg.setAttribute("viewBox", `${ppx} ${ppy} ${ppw} ${pph}`);
  Object.assign(svg.style, { left: px(ppx), top: px(ppy), width: px(ppw), height: px(pph) });
  const rect = (id, c) => `<clipPath id="${id}"><rect x="${c[0]}" y="${c[1]}" width="${c[2]}" height="${c[3]}"/></clipPath>`;
  svg.innerHTML =
    `<defs>${rect("cPapel", [ppx, ppy, ppw, pph])}${rect("cIso", D.cajaIso)}${rect("cNom", D.cajaNombre)}` +
    // el color del 1 y del 0 solo aparece por donde ha pasado el pincel (una mascara que se va trazando)
    // la máscara, del tamaño del papel: a tamaño de escena el navegador la separaba en una capa enorme (03-oct)
    ["uno", "cero"].map(k => `<mask id="m_${k}" maskUnits="userSpaceOnUse" x="${ppx}" y="${ppy}" width="${ppw}" height="${pph}">` +
      `<path class="pincelada" d="${D.pinceladas[k]}" fill="none" stroke="#fff" stroke-width="7" ` +
      `stroke-linecap="round" stroke-linejoin="round"/></mask>`).join("") + `</defs>` +
    `<g id="guias" clip-path="url(#cPapel)"></g><g clip-path="url(#cIso)">${D.iso}</g>` +
    `<g id="nombre" clip-path="url(#cNom)">${D.nombre}</g>` +
    `<g id="uno" mask="url(#m_uno)">${D.nombre}</g><g id="cero" mask="url(#m_cero)">${D.nombre}</g>`;
  // el 1 y el 0 se entintan primero en negro, como el resto; el color llega despues, con el pincel
  svg.querySelectorAll(`#nombre path[fill="${D.colores.uno}"], #nombre path[fill="${D.colores.cero}"]`)
     .forEach(p => p.setAttribute("fill", D.colores.negro));
  svg.querySelectorAll(`#uno path:not([fill="${D.colores.uno}"]), #cero path:not([fill="${D.colores.cero}"])`)
     .forEach(p => p.remove());
  const gGuias = svg.querySelector("#guias");
  const guia = (d, circulo) => {
    const p = document.createElementNS(SVG, "path");
    p.setAttribute("d", d); p.setAttribute("class", "guia"); p.circulo = circulo;
    gGuias.appendChild(p); return p;
  };
  const recta = t => { const n = t.d.match(/-?\d+\.?\d*/g).map(Number); return [[n[0], n[1]], [n[2], n[3]]]; };
  const lineaD = (a, b) => `M${a[0]} ${a[1]} L${b[0]} ${b[1]}`;
  // lineas del simbolo, en el orden en que las haria alguien con prisa y buen pulso: verticales de izquierda
  // a derecha (una baja, la siguiente sube), horizontales de abajo arriba (una a cada lado), y el tejado
  const rectasIso = D.trazos.filter(t => t.g === "iso" && !t.d.includes("A")).map(recta);
  const vert = rectasIso.filter(([a, b]) => Math.abs(a[0] - b[0]) < 0.5).sort((u, v) => u[0][0] - v[0][0]);
  const hor = rectasIso.filter(([a, b]) => Math.abs(a[1] - b[1]) < 0.5).sort((u, v) => v[0][1] - u[0][1])
                       .filter((l, i, arr) => i === 0 || Math.abs(l[0][1] - arr[i - 1][0][1]) > 2);
  const tejado = rectasIso.filter(([a, b]) => Math.abs(a[0] - b[0]) >= 0.5 && Math.abs(a[1] - b[1]) >= 0.5)
                          .sort((u, v) => u[0][0] - v[0][0]);
  const orienta = (l, alReves) => alReves ? [l[1], l[0]] : l;
  const planIso = [
    ...vert.map(([a, b], i) => orienta(a[1] < b[1] ? [a, b] : [b, a], i % 2 === 1)),
    ...hor.map(([a, b], i) => orienta(a[0] < b[0] ? [a, b] : [b, a], i % 2 === 0)),
    ...tejado,
  ].map(([a, b]) => ({ a, b, el: guia(lineaD(a, b), false) }));
  const circ = D.trazos.find(t => t.g === "iso" && t.d.includes("A"));
  const circulo = guia(circ.d, true);
  const cn = circ.d.match(/-?\d+\.?\d*/g).map(Number);            // M cx cy-r A r ...
  const centro = [cn[0], cn[1] + cn[2]];
  const renglones = D.trazos.filter(t => t.g === "nom" && !t.d.includes("A")).map(recta)
                           .sort((u, v) => v[0][1] - u[0][1])      // de abajo arriba: la base, el medio, arriba
                           .map(([a, b], i) => orienta(a[0] < b[0] ? [a, b] : [b, a], i % 2 === 1))
                           .map(([a, b]) => ({ a, b, el: guia(lineaD(a, b), false) }));
  const guias = [...planIso.map(g => g.el), circulo, ...renglones.map(g => g.el)];
  esc.appendChild(svg);

  o.regla = obj(dato("regla"));
  o.pigmentos = obj(dato("pigmentos"));
  o.capitel = obj(dato("capitel"));
  const HL = E.herramientas.lapiz, HC = E.herramientas.compas, HP = E.herramientas.pincel;
  const pin = herramienta(HP, HP.punta, "x", "linear-gradient(to right, #000, rgba(0,0,0,.35))", HP.pelo[0]);
  const lap = herramienta(HL, HL.punta, "x", "linear-gradient(to right, #000, rgba(0,0,0,.35))");
  const com = herramienta(HC, HC.aguja, "y", "linear-gradient(to top, #000, rgba(0,0,0,.35))");
  const sombraMesa = capa("sombraMesa", mx, my, mw, mh);          // la sombra del olivo sobre la mesa y lo que hay encima

  // las ramas: la misma rama en las dos alturas, meciendose a la vez. La del suelo va en cada tira de suelo por
  // la que pasa al mecerse (la caja que barre, girada sobre su eje)
  const barrido = r => {
    const ox = r.x + r.ox, oy = r.y + r.oy, v = Math.abs(1.7 * (r.vaiven || 1)) + 1;
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    for (const g of [r.rot - v, r.rot, r.rot + v]) {
      const c = Math.cos(rad(g)), s = Math.sin(rad(g));
      for (const [qx, qy] of [[r.x, r.y], [r.x + r.w, r.y], [r.x, r.y + r.h], [r.x + r.w, r.y + r.h]]) {
        const X = ox + (qx - ox) * c - (qy - oy) * s, Y = oy + (qx - ox) * s + (qy - oy) * c;
        x0 = Math.min(x0, X); y0 = Math.min(y0, Y); x1 = Math.max(x1, X); y1 = Math.max(y1, Y);
      }
    }
    return [x0, y0, x1, y1];
  };
  const ramas = [[], [], [], []];
  E.ramas.forEach((r, i) => {
    let sitios = [[sombraMesa, mx, my]];
    if (r.nivel !== "mesa") {
      const [x0, y0, x1, y1] = barrido(r);
      sitios = tirasSuelo.filter(d => x1 > d.caja[0] && x0 < d.caja[0] + d.caja[2] && y1 > d.caja[1] && y0 < d.caja[1] + d.caja[3])
                         .map(d => [d, d.caja[0], d.caja[1]]);
    }
    for (const [padre, dx, dy] of sitios) {
      const el = img(r.src, r.x - dx, r.y - dy, r.w, r.h, padre);
      el.className = "rama";
      gsap.set(el, { transformOrigin: `${r.ox}px ${r.oy}px`, rotation: r.rot, opacity: r.o });
      ramas[Math.floor(i / 2)].push({ el, r });
    }
  });

  // --- la tablet: se programa de verdad ------------------------------------------------------------
  // lo que se programa (03-oct, Javi): tres partes. El estudio (quiénes somos, cómo trabajamos, el lema), el
  // software y lo audiovisual (cómo lo hacemos y ejemplos). Líneas de 44 como mucho: si no, se cortan
  const PROGRAMAS = [
    { nombre: "estudio.py", salida: "Lo nuevo, a conciencia.", codigo:
`# Mesa 10 Studio · estudio.py
from mesa10 import oficio, criterio
import herramientas  # de siempre y de ahora

class Mesa10Studio:
    lema = "Lo nuevo, a conciencia."
    arte = "el de siempre"
    con = "las herramientas de ahora"
    para = ["empresas", "pymes",
            "autónomos", "creadores"]
    ramas = ["software a medida",
             "producción audiovisual"]

    def encargo(self, idea):
        caso = criterio.escuchar(idea)
        plan = criterio.estudiar(caso)
        obra = herramientas.hacer(plan)
        return oficio.entregar(obra)

estudio = Mesa10Studio()
print(estudio.lema)` },
    { nombre: "software.py", salida: "✓ funcionando con lo que ya usas", codigo:
`# software a medida · software.py
from mesa10 import estudio, ia

def a_medida(negocio):
    proceso = estudio.entender(negocio)
    for tarea in proceso.repetitivas():
        tarea.automatizar(con=ia)
    app = estudio.construir(proceso)
    app.conectar(negocio.herramientas)
    app.probar(datos_reales=True)
    return app.entregar()

ejemplos = [
    "facturas que se apuntan solas",
    "recepcionista por voz y WhatsApp",
    "búsqueda de datos a gran escala",
    "apps, webs y oficinas virtuales",
]
a_medida(tu_negocio)` },
    { nombre: "audiovisual.py", salida: "✓ listo para instagram y tiktok", codigo:
`# producción audiovisual · audiovisual.py
from mesa10 import guion, ia, montaje

def pieza(marca, idea):
    texto = guion.escribir(idea, tono=marca)
    planos = ia.generar(texto, rodaje=None)
    corte = montaje.elegir(planos)  # a mano
    final = montaje.etalonar(corte)
    return final.para("instagram", "tiktok")

ejemplos = [
    "anuncios para cualquier canal",
    "reels y campañas para redes",
    "avatares: tu cara o un personaje",
    "montaje de tu propio material",
]
pieza(tu_marca, "campaña de temporada")` },
  ];
  const COL = { com: "c-com", kw: "c-kw", fn: "c-fn", st: "c-st", cte: "c-cte", tx: "c-tx" };   // los colores, en el CSS
  const PAL = "A-Za-z_áéíóúñÁÉÍÓÚÑ";
  const KW = /^(from|import|class|def|return|for|in|if|print)$/, CTE = /^(None|True|False|self)$/;
  function colorea(linea) {                                      // [[texto, color], ...] con los colores de un editor
    const out = [], re = new RegExp(`(#.*$)|(f?"[^"]*"?)|([${PAL}][${PAL}0-9]*)|([0-9]+)|(\\s+)|(.)`, "g");
    let m, antes = "";
    while ((m = re.exec(linea)) && m[0]) {
      let c = COL.tx;
      if (m[1]) c = COL.com;
      else if (m[2]) c = COL.st;
      else if (m[3]) {
        c = KW.test(m[3]) ? COL.kw : CTE.test(m[3]) ? COL.cte
          : (antes === "def" || antes === "class" || linea[re.lastIndex] === "(") ? COL.fn : COL.tx;
        antes = m[3];
      } else if (m[4]) c = COL.cte;
      out.push([m[0], c]);
    }
    return out;
  }
  // cuando aparece cada letra: ritmo de alguien que escribe rapido, con la sangria automatica del editor,
  // el autocompletado en las palabras largas y alguna pausa para pensar
  function horario(texto, semilla) {
    let a = semilla >>> 0;
    const rnd = () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ t >>> 15, t | 1);
                        t ^= t + Math.imul(t ^ t >>> 7, t | 61); return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const t = []; let ahora = 0;
    texto.split("\n").forEach((l, n) => {
      if (n > 0) { ahora += 0.09 + rnd() * 0.16; t.push(ahora); }   // el salto de linea
      let j = 0;
      while (l[j] === " ") { t.push(ahora); j++; }
      while (j < l.length) {
        const pal = new RegExp(`^[${PAL}]+`).exec(l.slice(j));
        if (pal && pal[0].length >= 9 && rnd() < 0.8) {
          for (let q = 0; q < 3; q++) { ahora += 0.025 + rnd() * 0.03; t.push(ahora); }
          ahora += 0.12;
          for (let q = 3; q < pal[0].length; q++) t.push(ahora);
          j += pal[0].length; continue;
        }
        if (l[j - 1] === " " && rnd() < 0.03) ahora += 0.3;
        ahora += 0.02 + rnd() * 0.028 + (",:(".includes(l[j - 1]) ? 0.05 : 0);
        t.push(ahora); j++;
      }
    });
    return t;
  }
  const programas = PROGRAMAS.map((p, k) => {
    const lineas = p.codigo.split("\n");
    return { ...p, lineas, color: lineas.map(colorea), t: horario(p.codigo, 7 + k * 31) };
  });

  const pt = aparatos.tablet.pantalla, st = E.aparatos.find(a => a.id === "tablet").pantalla;
  const fs = Math.min(st.h / 15.5, st.w / 30), lh = fs * 1.42;
  const cab = fs * 2.05, pie = lh * 2.6;
  pt.innerHTML = `<div id="codigo" style="font-size:${fs}px;line-height:${lh}px">` +
    `<div class="cab" style="font-size:${fs * 0.8}px;padding:${fs * 0.55}px ${st.w * 0.04}px 0">` +
    programas.map(p => `<span class="pest">${p.nombre}</span>`).join("") + `</div>` +
    `<div class="ventana" style="height:${st.h - cab - fs * 0.5}px;margin-top:${fs * 0.5}px;padding:0 ${st.w * 0.035}px"><div id="lineas"></div></div>` +
    `<div id="terminal" style="height:${pie}px;padding:${fs * 0.3}px ${st.w * 0.035}px;font-size:${fs * 0.9}px;` +
    `--oculta:${-Math.ceil(pie + fs * 0.6 + 2)}px"></div></div>`;
  const lineas = pt.querySelector("#lineas"), terminal = pt.querySelector("#terminal");
  const pestanas = [...pt.querySelectorAll(".pest")];
  const VISIBLES = Math.floor((st.h - cab - fs * 0.5) / lh);
  const escapa = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
  let yaPintado = -1, desplazado = 0;
  function pintaCodigo(k, n, conTerminal = false) {
    const P = programas[k], clave = k * 1e5 + n + (conTerminal ? 5e4 : 0);
    if (clave === yaPintado) return;
    yaPintado = clave;
    let html = "", q = n, lineaCursor = 0;
    for (let i = 0; i < P.lineas.length; i++) {
      let fila = `<span class="num">${String(i + 1).padStart(2, " ")}</span>  `;
      for (const [txt, c] of P.color[i]) {
        if (q <= 0) break;
        const parte = txt.slice(0, q); q -= parte.length;
        fila += `<span class="${c}">${escapa(parte)}</span>`;
      }
      if (q <= 0) { fila += `<span class="cursor"></span>`; lineaCursor = i; html += fila + "\n"; break; }
      q -= 1; lineaCursor = i; html += fila + "\n";
    }
    lineas.innerHTML = html;
    // el editor baja solo para que el cursor no se salga (y deja sitio a la terminal cuando se ejecuta)
    const sitio = VISIBLES - (conTerminal ? Math.ceil(pie / lh) : 0);
    const bajar = Math.max(0, lineaCursor - sitio + 2);
    if (bajar !== desplazado) { desplazado = bajar; lineas.style.top = `${-Math.round(bajar * lh)}px`; }
  }
  function abre(k) {
    pestanas.forEach((p, i) => p.classList.toggle("activa", i === k));
    terminal.classList.remove("visible"); terminal.innerHTML = "";
    desplazado = 0; lineas.style.transition = "none"; lineas.style.top = "0px";
    yaPintado = -1; pintaCodigo(k, 0);
    void lineas.offsetHeight; lineas.style.transition = "";
  }
  function ejecuta(k) {
    const P = programas[k];
    terminal.innerHTML = `<span class="orden">$ python ${P.nombre}</span>\n`;
    terminal.classList.add("visible");
    yaPintado = -1; pintaCodigo(k, P.codigo.length, true);
  }
  const bucleCodigo = gsap.timeline({ repeat: -1, paused: true });
  programas.forEach((P, k) => {
    const reloj = { t: 0 }, T = P.t[P.t.length - 1];
    let n = 0;
    bucleCodigo
      .add(() => abre(k))
      .fromTo(reloj, { t: 0 }, { t: T, duration: T, ease: "none", immediateRender: false, onUpdate: () => {
        while (n < P.t.length && P.t[n] <= reloj.t) n++;
        while (n > 0 && P.t[n - 1] > reloj.t) n--;
        pintaCodigo(k, n);
      } })
      .add(() => ejecuta(k), "+=0.5")
      .add(() => { terminal.innerHTML += `<span class="salida">${escapa(P.salida)}</span>`; }, "+=0.55")
      .to({}, { duration: 4.2 })
      .to(pt.firstChild, { opacity: 0, duration: 0.35 })
      .add(() => { n = 0; })
      .to(pt.firstChild, { opacity: 1, duration: 0.25 });
  });

  // el movil: Lucy en el pueblo blanco
  const pm = aparatos.movil.pantalla;
  pm.innerHTML = `<video src="${ruta(E.video)}" muted loop playsinline preload="auto" aria-hidden="true"></video>`;
  const video = pm.querySelector("video");
  video.muted = true; video.playsInline = true;                  // lo que piden los móviles para arrancar solo
  if (E.poster) video.poster = ruta(E.poster);
  // si el navegador no deja arrancar todavía, se reintenta cuando el vídeo esté listo, y al primer toque
  const reproducir = () => {
    video.muted = true;
    const p = video.play();
    // AbortError = alguien lo ha parado a proposito (pause): eso no se reintenta
    if (p) p.catch(e => { if (e.name !== "AbortError") video.addEventListener("canplay", () => video.play().catch(() => {}), { once: true }); });
  };
  addEventListener("touchstart", () => { if (video.paused && pm.style.opacity !== "0") reproducir(); }, { passive: true });
  pm.insertAdjacentHTML("beforeend", '<span class="isla"></span>');   // la isla del iPhone, por encima del vídeo

  // --- lo que se mueve siempre: el olivo (la luz ya no respira, ver #luz) -----------------------------
  ramas.forEach((par, k) => {
    const v = par[0].r.vaiven;
    bucles.push(gsap.to(par.map(p => p.el), { rotation: `+=${-1.7 * v}`, duration: 5.6 + k * 0.9, ease: "sine.inOut", yoyo: true, repeat: -1 }));
  });

  // --- la intro: unas manos que no se ven -------------------------------------------------------------
  // Cada pieza lleva su "plan" (donde se quedo en el guion) y cada movimiento sale de ahi: asi la linea de
  // tiempo se puede rebobinar y repetir sin sorpresas.
  const tl = gsap.timeline({ paused: true, onComplete: () => contenedor.dispatchEvent(new CustomEvent("intro:fin")) });
  const P = E.poses;                                                // lo que cambia de un formato a otro
  const LAP_REPOSO = { x: P.lapizReposo[0], y: P.lapizReposo[1], rot: P.lapizReposo[2], beta: 0, alto: 0, pulso: 0 };
  const COM_REPOSO = { x: P.compasReposo[0], y: P.compasReposo[1], rot: P.compasReposo[2], beta: 0, alto: 0 };
  const desde = ([x, y, rot, alto]) => ({ x, y, rot, alto });
  const reglaCanto = dato("regla").y + dato("regla").canto;         // el canto de arriba de la regla, en reposo
  const grados = r => r * 180 / Math.PI;

  // de pie en el lapicero, donde estaba en la foto: la punta en su sitio, apuntando al fondo, e inclinado lo
  // justo para que visto desde arriba mida lo mismo. Sombra y tamaño como los del lapicero (planos)
  function enLapicero([punta, fondo], largo) {
    const dx = fondo[0] - punta[0], dy = fondo[1] - punta[1];
    const beta = -grados(Math.acos(Math.min(1, Math.hypot(dx, dy) / largo)));
    const alto = largo * Math.sin(rad(-beta));                      // el otro extremo toca el fondo
    return { x: punta[0], y: punta[1], rot: grados(Math.atan2(dy, dx)), beta, alto, cs: 24 / (alto + GROSOR), pk: 0, pulso: 0 };
  }
  function mover(pz, t, dur, hasta, { ease = "power2.inOut", pico = 0 } = {}) {
    const desde = { ...pz.plan }, fin = { ...desde, ...hasta };
    pz.plan = fin;
    const q = { p: 0 };
    tl.fromTo(q, { p: 0 }, { p: 1, duration: dur, ease, immediateRender: false, onUpdate() {
      for (const k in fin) pz.s[k] = desde[k] + (fin[k] - desde[k]) * q.p;
      pz.s.alto += pico * Math.sin(Math.PI * q.p);                  // se levanta por el camino
      pz.pinta();
    } }, t);
    return t + dur;
  }
  function sacado(p, d) {                                           // la postura tras tirar d px hacia arriba, por su eje
    const r = rad(p.rot), b = rad(-p.beta), h = d * Math.cos(b);
    return { x: p.x - Math.cos(r) * h, y: p.y - Math.sin(r) * h, alto: p.alto + d * Math.sin(b), cs: 0.35, pk: 1 };
  }
  const sacar = (pz, t, dur, d) => mover(pz, t, dur, sacado(pz.plan, d), { ease: "power1.inOut" });
  function trazar(pz, g, t, dur, ease = "power1.inOut") {        // la mina (o el pincel) va dejando la linea
    const L = g.el.getTotalLength(), q = { p: 0 };
    tl.fromTo(q, { p: 0 }, { p: 1, duration: dur, ease, immediateRender: false, onUpdate() {
      g.el.style.strokeDashoffset = L * (1 - q.p);
      const a = g.el.getPointAtLength(L * q.p);
      pz.s.x = a.x; pz.s.y = a.y; pz.pinta();
    } }, t);
    const b = g.el.getPointAtLength(L);
    pz.plan = { ...pz.plan, x: b.x, y: b.y };
    return t + dur;
  }
  function saltar(pz, a, t) {                                      // levanta un poco y va al siguiente trazo
    const d = Math.hypot(a[0] - pz.plan.x, a[1] - pz.plan.y);
    return mover(pz, t, 0.045 + d / 3800, { x: a[0], y: a[1] }, { ease: "sine.inOut", pico: Math.min(26, 4 + d * 0.06) });
  }
  function entintar(pz, clip, caja, t, dur, vueltas) {             // rellena: la mina va y viene por delante de la tinta
    const q = { p: 0 }, y = p => caja[1] + caja[3] * (0.5 - 0.42 * Math.cos(2 * Math.PI * vueltas * p));
    tl.fromTo(q, { p: 0 }, { p: 1, duration: dur, ease: "power1.inOut", immediateRender: false, onUpdate() {
      clip.setAttribute("width", caja[2] * q.p);
      pz.s.x = caja[0] + caja[2] * q.p; pz.s.y = y(q.p); pz.pinta();
    } }, t);
    pz.plan = { ...pz.plan, x: caja[0] + caja[2], y: y(1) };
    return t + dur;
  }
  function mojar(pz, [cx, cy], color, t) {                         // baja al pigmento, remueve y sube cargado
    t = mover(pz, t, 0.12, { x: cx + 5, y: cy, alto: 4 }, { ease: "power2.in" });
    tl.set(pz.carga, { backgroundColor: color }, t);
    tl.to(pz.carga, { opacity: 0.9, duration: 0.25 }, t);
    const q = { p: 0 };
    tl.fromTo(q, { p: 0 }, { p: 1, duration: 0.3, ease: "sine.inOut", immediateRender: false, onUpdate() {
      const a = 2 * Math.PI * 1.25 * q.p;
      pz.s.x = cx + 5 * Math.cos(a); pz.s.y = cy + 4 * Math.sin(a); pz.pinta();
    } }, t);
    pz.plan = { ...pz.plan, x: cx, y: cy + 4 };
    return mover(pz, t + 0.3, 0.13, { alto: 34 }, { ease: "power2.out" });
  }
  const invierte = (ease, v) => {                                   // cuando llega una curva a un valor (para esperar al lapiz)
    const f = gsap.parseEase(ease); let a = 0, b = 1;
    for (let i = 0; i < 30; i++) { const m = (a + b) / 2; if (f(m) < v) a = m; else b = m; }
    return (a + b) / 2;
  };

  const clipIso = svg.querySelector("#cIso rect"), clipNom = svg.querySelector("#cNom rect");
  const pincelada = k => ({ el: svg.querySelector(`#m_${k} path`) });
  const dxC = HC.mina[0] - HC.aguja[0], dyC = HC.mina[1] - HC.aguja[1];

  function montar() {
    tl.clear();
    // todo a su sitio de salida
    for (const g of [...guias, ...svg.querySelectorAll("path.pincelada")]) {
      const L = g.getTotalLength();
      g.style.strokeDasharray = L; g.style.strokeDashoffset = L;
      if (!g.classList.contains("pincelada")) g.style.opacity = g.circulo ? 0.3 : 0.62;
    }
    clipIso.setAttribute("width", 0); clipNom.setAttribute("width", 0);
    const inicio = {
      papel: desde(P.papel), regla: { x: 0, y: 0, rot: 0, alto: 0 },
      pigmentos: desde(P.pigmentos), capitel: desde(P.capitel),
      lapicero: { x: 0, y: 0, rot: 0, alto: 0 },
    };
    for (const k in inicio) { o[k].s = { ...inicio[k] }; o[k].plan = { ...inicio[k] }; o[k].pinta(); }
    lap.s = enLapicero(E.enLapicero.lapiz, HL.w);                  // el lapiz y el pincel, en el lapicero
    pin.s = enLapicero(E.enLapicero.pincel, HP.w);
    const [ex, ey, er] = P.compasEntra;
    com.s = { x: ex, y: ey, rot: er, beta: 50, alto: 150 };        // el compas, fuera, en la otra mano
    for (const h of [lap, pin, com]) { h.plan = { ...h.s }; h.pinta(); }
    gsap.set(pin.carga, { opacity: 0 });
    gsap.set([pt, pm], { opacity: 0 });
    bucleCodigo.pause(0); abre(0);
    video.pause(); video.currentTime = 0;

    // el fundido de entrada lo hace el compositor (Web Animations), no el hilo principal: sigue suave aunque la
    // pagina este terminando de cargar (03-oct, Javi: la mesa aparecia a tirones)
    const fundir = () => {
      if (!esc.animate) { gsap.fromTo(esc, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "power1.out" }); return; }
      esc.getAnimations().forEach(a => a.cancel());
      esc.style.opacity = 1;
      esc.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 600, easing: "cubic-bezier(.25,.46,.45,.94)" });
    };
    tl.add(fundir, 0)
      .to(pt, { opacity: 1, duration: 0.4 }, 0.25)                  // la tablet se despierta y alguien programa
      .add(() => bucleCodigo.restart(), 0.55);

    // mano 2: trae el papel, lo deja y lo cuadra
    mover(o.papel, 0.35, 0.85, { x: 8, y: 5, rot: -0.8, alto: 0 }, { ease: "power2.out" });
    mover(o.papel, 1.2, 0.3, { x: 0, y: 0, rot: 0 });

    // mano 1: coge el lapiz de la derecha del lapicero, lo saca, le da la vuelta y lo lleva al papel
    let t = sacar(lap, 1.15, 0.5, 125);
    t = mover(lap, t, 0.9, { x: planIso[0].a[0], y: planIso[0].a[1], rot: 35, beta: 55, alto: 0, cs: C, pulso: 1 });

    // mano 2: trae el compas abierto, clava la aguja en el vertice del tejado y da la vuelta
    const cb = Math.cos(rad(50)), giro0 = -90 - grados(Math.atan2(dyC * cb, dxC));
    mover(com, 1.35, 0.9, { x: centro[0], y: centro[1], rot: giro0, alto: 0 });
    {
      const L = circulo.getTotalLength(), q = { p: 0 };
      tl.fromTo(q, { p: 0 }, { p: 1, duration: 1.25, ease: "power1.inOut", immediateRender: false, onUpdate() {
        circulo.style.strokeDashoffset = L * (1 - q.p);
        com.s.rot = giro0 + 360 * q.p; com.pinta();
      } }, 2.4);
      com.plan = { ...com.plan, rot: giro0 + 360 };
    }
    // en cuanto empieza el dibujo, el movil se enciende solo: Lucy en el pueblo blanco
    tl.add(() => { video.currentTime = 0; reproducir(); }, 2.4)
      .to(pm, { opacity: 1, duration: 0.35 }, 2.45);
    // y lo deja tumbado a la derecha del papel
    const vuelta = giro0 + 360, rotReposo = COM_REPOSO.rot + 360 * Math.round((vuelta - COM_REPOSO.rot) / 360);
    mover(com, 3.75, 0.85, { ...COM_REPOSO, rot: rotReposo }, { pico: 45 });

    // mano 1: las lineas del simbolo, una detras de otra
    for (const g of planIso) {
      t = saltar(lap, g.a, t);
      t = trazar(lap, g, t, 0.05 + Math.hypot(g.b[0] - g.a[0], g.b[1] - g.a[1]) / 2900);
    }
    // mano 2 acerca la regla; mano 1 traza los renglones del nombre contra su canto (la regla sube uno a uno)
    renglones.forEach((g, i) => {
      const y = g.a[1] + 1.2 - reglaCanto;                         // el canto justo debajo del renglon
      const tr = i === 0 ? mover(o.regla, Math.max(4.8, t - 0.5), 0.45, { y })   // la acerca mientras acaba el simbolo
                         : mover(o.regla, t, 0.22, { y });                         // la sube al renglon siguiente
      t = saltar(lap, g.a, t);
      t = trazar(lap, g, Math.max(t, tr), 0.3, "sine.inOut");
    });
    const tReglaFuera = mover(o.regla, t, 0.45, { y: 0 });

    // mano 1 entinta el simbolo y luego el nombre (el 1 y el 0 quedan en negro, como todo)
    const ci = D.cajaIso, cnm = D.cajaNombre;
    t = saltar(lap, [ci[0], ci[1] + ci[3] * 0.08], t);
    t = entintar(lap, clipIso, ci, t, 1.0, 4);
    t = saltar(lap, [cnm[0], cnm[1] + cnm[3] * 0.08], t);
    const tNombre = t, DUR_NOMBRE = 1.15;
    t = entintar(lap, clipNom, cnm, t, DUR_NOMBRE, 9);
    const tTinta = t;

    // mano 2 trae los pigmentos
    let tb = mover(o.pigmentos, tReglaFuera + 0.1, 0.75, { x: 0, y: 0, rot: 0, alto: 0 }, { ease: "power2.inOut" });

    // mano 2: coge el pincel del lapicero, lo moja en el rojo y pinta el 1 en cuanto el lapiz ha pasado de largo
    const { rojo, azul } = E.cuencos;
    tb = sacar(pin, tb + 0.1, 0.4, 110);
    tb = mover(pin, tb, 0.5, { x: rojo[0] + 5, y: rojo[1], rot: 40, beta: 60, alto: 34, cs: C });
    tb = mojar(pin, rojo, D.colores.uno, tb);
    const uno = pincelada("uno"), cero = pincelada("cero");
    const n0 = D.pinceladas.cero.match(/-?\d+\.?\d*/g).map(Number), pasado = n0[0] + n0[2] + 14;   // M cx cy-ry A rx ...
    const libre = tNombre + DUR_NOMBRE * invierte("power1.inOut", (pasado - cnm[0]) / cnm[2]) + 0.1;
    const a1 = uno.el.getPointAtLength(0);
    tb = mover(pin, Math.max(tb, libre), 0.45, { x: a1.x, y: a1.y, rot: 38, beta: 50, alto: 0, pulso: 1 });
    tl.to(pin.carga, { opacity: 0.55, duration: 0.45 }, tb);
    tb = trazar(pin, uno, tb, 0.45, "sine.inOut");
    // lo moja en el azul y pinta el 0, de una vuelta
    tb = mover(pin, tb, 0.45, { x: azul[0] + 5, y: azul[1], beta: 60, alto: 34, pulso: 0 }, { pico: 18 });
    tb = mojar(pin, azul, D.colores.cero, tb);
    const a0 = cero.el.getPointAtLength(0);
    tb = mover(pin, tb, 0.45, { x: a0.x, y: a0.y, rot: 38, beta: 50, alto: 0, pulso: 1 });
    tl.to(pin.carga, { opacity: 0.5, duration: 0.6 }, tb);
    tb = trazar(pin, cero, tb, 0.6, "sine.inOut");
    const tPintado = tb;
    // y lo vuelve a meter en el lapicero, en su sitio, ya limpio
    const enSuSitio = enLapicero(E.enLapicero.pincel, HP.w);
    tl.to(pin.carga, { opacity: 0, duration: 0.6 }, tb);
    tb = mover(pin, tb, 0.65, { ...sacado(enSuSitio, 110), pulso: 0 }, { pico: 25 });
    tb = mover(pin, tb, 0.4, enSuSitio, { ease: "power1.inOut" });

    // mano 1 suelta el lapiz junto al papel (rueda un poco) y pone el capitel encima del papel
    t = mover(lap, tTinta + 0.05, 0.7, { ...LAP_REPOSO, y: LAP_REPOSO.y - 6, rot: -6 }, { pico: 30 });
    t = mover(lap, t, 0.35, { y: LAP_REPOSO.y, x: LAP_REPOSO.x + 0.8, rot: LAP_REPOSO.rot }, { ease: "power2.out" });
    t = mover(o.capitel, t + 0.2, 0.85, { x: 0, y: 0, rot: 1.2, alto: 0 }, { ease: "power2.inOut" });
    mover(o.capitel, t, 0.25, { rot: 0 }, { ease: "power2.out" });

    // al final solo queda el logo, tal cual es
    tl.to(guias, { opacity: 0, duration: 0.9, ease: "power1.in" }, Math.max(tPintado, t) - 0.1);
    tl.to({}, { duration: 0.2 });
    window.__intro.duracion = tl.duration();
  }

  // --- encaje en la pantalla y arranque -----------------------------------------------------------------
  function encaja() {
    const w = contenedor.clientWidth / E.W, h = contenedor.clientHeight / E.H;
    const s = Math.min(Math.max(w, h), Math.min(w, h) * 1.06);   // casi entera: llena un poco mas sin tapar los cantos de la mesa
    esc.style.transform = `translate(-50%, -50%) scale(${s})`;
    (contenedor.closest("[data-escala]") || contenedor).style.setProperty("--escala", s);   // para el suelo de fuera
  }
  encajar = encaja; encaja();
  window.__intro = { tl, bucleCodigo, montar, programas };          // para pruebas: parar en un segundo concreto
  let animarYa = false;                                          // "Ver otra vez" la anima aunque se pida quietud
  function empezar() {
    montar();
    if (QUIETO && !animarYa) {                                    // sin movimiento: el final, con el codigo ya escrito
      // con avisos (no progress(1, true)): cada pieza se coloca en su onUpdate; sin ellos la mesa salia a medio montar
      tl.progress(1);
      bucles.forEach(b => b.pause()); bucleCodigo.pause(); video.pause();
      abre(0); ejecuta(0);
      terminal.innerHTML += `<span class="salida">${escapa(programas[0].salida)}</span>`;
      return;
    }
    animarYa = false;
    tl.restart();
  }
  api.animar = () => { animarYa = true; empezar(); };
  let empezado = false;                                          // la mesa sale aunque alguna imagen se atasque
  const arranca = () => { if (!empezado) { empezado = true; empezar(); } };
  setTimeout(arranca, 6000);
  api.empezar = empezar;
  // SALTAR (04-oct, Javi): la mesa al final de golpe, viva (el código sigue y el vídeo también). Con avisos, como
  // QUIETO: cada pieza se coloca en su sitio, saltan los bucles y "intro:fin"
  api.saltar = () => { if (!empezado) { empezado = true; montar(); } tl.progress(1); };
  api.matar = () => { tl.kill(); bucleCodigo.kill(); video.pause(); };
  api.pausar = () => { bucles.forEach(b => b.pause()); bucleCodigo.pause(); video.pause(); };
  api.seguir = () => {
    if (QUIETO && tl.progress() === 1) return;
    bucles.forEach(b => b.resume());
    if (tl.progress() > 0.3) { bucleCodigo.resume(); video.play().catch(() => {}); }
  };
  // volver a la mesa (03-oct, tarde): en el móvil, lejos de la portada el navegador suelta las imágenes ya
  // preparadas y al volver tiene que prepararlas otra vez; mientras, se veía negro. Se piden antes de llegar
  api.calentar = () => { imagenes.forEach(i => { if (i.decode) i.decode().catch(() => {}); }); };
  Promise.all(imagenes.map(i => i.decode().catch(() => {}))).then(arranca);
}

function iniciar(el, opciones = {}) {
  contenedor = el;
  BASE = opciones.base || BASE;
  cargar();
  // si el contenedor cambia de forma (girar el movil), se monta la otra escena
  addEventListener("resize", () => {
    const dePie = contenedor.clientHeight > contenedor.clientWidth;
    if ((dePie ? "vertical" : "horizontal") !== formato) cargar(); else encajar();
  });
}

return {
  iniciar,
  repetir: () => api.empezar(),
  animar: () => api.animar(),                    // a peticion (boton): anima aunque el sistema pida quietud
  saltar: () => api.saltar(),                    // boton "Saltar animacion": al final, ya
  pausar: () => api.pausar(),
  seguir: () => api.seguir(),
  calentar: () => api.calentar(),                // preparar las imágenes antes de volver a verlas
};
})();
