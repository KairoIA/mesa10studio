/* ============================================================
   Mesa 10 Studio — comportamiento del sitio
   Sin dependencias. Los textos de marca (descripción, público,
   eslogan) son literales validados: no reescribir sin permiso.
   ============================================================ */
(function () {
  'use strict';

  /* ── Textos ─────────────────────────────────────────────── */
  var EN = {
    'skip': 'Skip to content',

    'nav.work': 'Work',
    'nav.services': 'What I do',
    'nav.method': 'How',
    'nav.contact': 'Contact',

    'hero.claim': 'Video production and process automation with AI.',
    'hero.who': 'Freelancers, creators and small businesses.',
    'hero.slogan': 'New tools, done right.',
    'hero.cta1': 'See the work',
    'hero.cta2': 'Get in touch',

    'work.eyebrow': 'Work',
    'work.title': 'None of this was filmed.',
    'work.lead': 'No camera, no location, no actors. Everything you see is generated with artificial intelligence. What is not the AI’s is what to say and where to cut.',

    'player.sound': 'Sound',

    'case.chef.kicker': 'Restaurant · The real world, regenerated',
    'case.chef.body': 'The restaurant exists. The ad was never shot. Fourteen shots generated with two different models and one shared grade on top, so they read as the same day’s footage. What the machine makes is the shot; what makes it work is the order: it follows a menu — the empty room, the kitchen, dishes alternating with the table, the wine, dessert — and no AI proposes that order.',
    'case.chef.shots': '14, chosen by hand',

    'case.f.duration': 'Length',
    'case.f.shots': 'Shots',
    'case.f.shoot': 'Shoot',
    'case.f.none': 'None',
    'case.f.product': 'Product',
    'case.f.location': 'Location',
    'case.f.built': 'Generated',

    'case.lucy.kicker': 'Virtual creator · Made from nothing',
    'case.lucy.body': 'Lucy does not exist. She is not a retouched model: there is nobody behind her. She is Andalusian, speaks English, recommends places in the south, and her account runs on reels generated one by one, with a generated voice. The hard part is not a pretty shot — any model gives you that — it is that the same face holds across thirteen shots, changes outfit and city and still reads as her. A clothing brand can have its own without signing anyone and without a photo shoot.',
    'case.lucy.pieces': 'Two formats',
    'case.lucy.face': 'Invented, and consistent',
    'case.lucy.voice': 'Generated',
    'case.lucy.cap1': 'Travel tips · Cádiz',
    'case.lucy.cap2': 'Street fashion · for clothing brands',

    'case.f.pieces': 'Pieces',
    'case.f.face': 'Identity',
    'case.f.voice': 'Voice',

    'case.serenica.kicker': 'E-commerce · Real product, invented home',
    'case.serenica.body': 'The print being sold is real and shows exactly as it is. What does not exist is the flat it hangs in: an Andalusian living room with late-afternoon sun filtering through a linen curtain, built from scratch for this ad. Showing a print in its place no longer costs a beautiful flat, a photographer and an afternoon of good light.',
    'case.serenica.product': 'Real, unretouched',

    'soon.tag': 'In progress',
    'soon.title': 'Physiotherapy clinic',
    'soon.body': 'An ad for a dermatofunctional treatment and, alongside it, a receptionist that answers the clinic’s phone and WhatsApp. Neither is the video shot nor does the receptionist exist: both halves of the studio, generated, for the same client.',

    'serv.eyebrow': 'What I do',
    'serv.title': 'Two things, and both of them properly.',
    'serv.lead': 'Both of them with artificial intelligence from end to end.',

    'serv.video.title': 'Video production',
    'serv.video.body': 'Ads, reels and brand films generated end to end. There are three places to start from: a real person turned into a digital avatar, a character who does not exist and gets built from zero, or the world you already have — your product, your place — regenerated into sets nobody has to rent. Then comes the usual: script, edit, colour, music and titles.',
    'serv.video.l1': 'Your face, or your team’s, as an avatar',
    'serv.video.l2': 'A character of your own, invented for your brand',
    'serv.video.l3': 'Your product in generated settings',
    'serv.video.l4': 'Short cuts for every platform',

    'serv.auto.title': 'Process automation',
    'serv.auto.body': 'Whatever you repeat every day, a machine can do. A receptionist that picks up the phone and books appointments, WhatsApp replies, quotes that fill themselves in, reports that arrive already written. The code and the plumbing are written by AI too; what has to be thought through is what steps your process has and where it breaks. Built on top of the tools you already use.',
    'serv.auto.l1': 'Voice and WhatsApp receptionist',
    'serv.auto.l2': 'Automatic booking and reminders',
    'serv.auto.l3': 'Invoices and documents without typing',
    'serv.auto.l4': 'Your existing apps, wired together',

    'met.eyebrow': 'How I work',
    'met.title': 'AI does all of it. Except the deciding.',
    'met.lead': 'The tools are within anyone’s reach and they get better every month. What you cannot download is knowing what deserves telling and where the cut goes. That is the human part, and it is the only one that does not automate.',

    'met.machine.tag': 'What the machine brings',
    'met.machine.l1': 'Faces, bodies and voices — yours or invented',
    'met.machine.l2': 'Sets, products and light',
    'met.machine.l3': 'Voice-over, subtitles and translation',
    'met.machine.l4': 'The code that wires your tools together',

    'met.human.tag': 'What I bring',
    'met.human.l1': 'What to say, in what order, and to whom',
    'met.human.l2': 'Which shot comes in, and at which exact second',
    'met.human.l3': 'Making twelve shots look like one shoot',
    'met.human.l4': 'What steps the process has and where it breaks',

    'met.close': 'A shot comes in at 6.05 seconds and not at 5 because before that there is a loaf of bread fading away. No AI notices that. That detail is the work — and it is why every piece is built whole for that business, and why you keep the master and the files, with no subscription to go on owning what is yours.',

    'cta.mail': 'Write to me',
    'cta.eyebrow': 'Contact',
    'cta.title': 'Tell me what you want to show.',
    'cta.lead': 'Write to me with what you sell and who you sell it to. I will tell you what can be done, how long it takes and what it costs. Without an hour-long meeting for that.'
  };

  var META = {
    es: {
      title: 'Mesa 10 Studio — Producción audiovisual y automatización con IA',
      desc: 'Anuncios y automatizaciones hechos enteros con inteligencia artificial, para autónomos, creadores de contenido y pymes. Lo único que no pone la IA es la creatividad.',
      og: 'img/hero_web_es.png'
    },
    en: {
      title: 'Mesa 10 Studio — Video production and process automation with AI',
      desc: 'Ads and automations made end to end with artificial intelligence, for freelancers, creators and small businesses. The only thing AI does not bring is the creativity.',
      og: 'img/hero_web_en.png'
    }
  };

  var nodes = document.querySelectorAll('[data-i18n]');
  var ES = {};
  nodes.forEach(function (el) {
    var k = el.getAttribute('data-i18n');
    if (!(k in ES)) ES[k] = el.textContent;
  });

  function setLang(lang, remember) {
    var dict = lang === 'en' ? EN : ES;
    nodes.forEach(function (el) {
      var k = el.getAttribute('data-i18n');
      if (dict[k]) el.textContent = dict[k];
    });

    document.documentElement.lang = lang;
    document.title = META[lang].title;
    setMeta('name', 'description', META[lang].desc);
    setMeta('property', 'og:description', META[lang].desc);
    setMeta('property', 'og:title', META[lang].title);
    setMeta('property', 'og:image', META[lang].og);

    document.querySelectorAll('.lang button').forEach(function (b) {
      var on = b.dataset.lang === lang;
      b.classList.toggle('is-on', on);
      b.setAttribute('aria-current', on ? 'true' : 'false');
    });

    if (remember) { try { localStorage.setItem('m10-lang', lang); } catch (e) {} }
  }

  function setMeta(attr, key, value) {
    var el = document.querySelector('meta[' + attr + '="' + key + '"]');
    if (el) el.setAttribute('content', value);
  }

  document.querySelectorAll('.lang button').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.dataset.lang, true); });
  });

  var saved = null;
  try { saved = localStorage.getItem('m10-lang'); } catch (e) {}
  if (!saved) saved = (navigator.language || 'es').toLowerCase().indexOf('es') === 0 ? 'es' : 'en';
  if (saved === 'en') setLang('en', false);

  /* ── Vídeo de fondo del hero ────────────────────────────────
     Sólo en pantallas anchas: el clip es 16:9 y en un móvil vertical se
     recortaría hasta dejar sólo pared, además de gastar datos. El fichero ya
     viene ping-pong (ida y vuelta), así que el bucle no da tirón: basta con
     `loop`. Entra fundido cuando puede reproducirse de corrido.
     ───────────────────────────────────────────────────────── */
  var fondo = document.querySelector('[data-fondo]');
  if (fondo) {
    // ?video=1 fuerza el vídeo aunque sea móvil. Es para poder comprobar en un
    // teléfono real si va fluido; el encuadre no será el bueno hasta que haya
    // una versión 9:16.
    var forzado = /[?&]video=1/.test(location.search);

    var anchaBastante = window.matchMedia('(min-width:760px)').matches;
    var quietoPorFavor = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var ahorroDatos = navigator.connection && navigator.connection.saveData;

    if (forzado || (anchaBastante && !quietoPorFavor && !ahorroDatos)) {
      fondo.addEventListener('canplaythrough', function () {
        fondo.classList.add('is-ready');
      }, { once: true });
      fondo.addEventListener('error', function () { fondo.remove(); }, { once: true });

      fondo.src = fondo.dataset.src;
      fondo.play().catch(function () { fondo.remove(); });

      // Si la pestaña se va al fondo no tiene sentido seguir decodificando
      document.addEventListener('visibilitychange', function () {
        if (document.hidden) fondo.pause();
        else fondo.play().catch(function () {});
      });
    } else {
      fondo.remove();
    }
  }

  /* ── Cabecera al hacer scroll ───────────────────────────── */
  var head = document.getElementById('head');
  var onScroll = function () {
    head.classList.toggle('is-stuck', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Entradas ───────────────────────────────────────────── */
  // El hero entra siempre al cargar, esté donde esté el pliegue
  requestAnimationFrame(function () {
    document.querySelectorAll('.hero .reveal').forEach(function (el) {
      el.classList.add('is-in');
    });
  });

  var reveals = document.querySelectorAll('.sec .reveal, .foot .reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ── Vídeos: carga perezosa, reproducen en pantalla ─────── */
  var players = document.querySelectorAll('[data-player]');

  players.forEach(function (p) {
    var video = p.querySelector('[data-video]');
    var sound = p.querySelector('[data-sound]');

    sound.addEventListener('click', function () {
      var unmuting = video.muted;
      if (unmuting) {
        players.forEach(function (other) {
          if (other === p) return;
          var ov = other.querySelector('[data-video]');
          ov.muted = true;
          other.querySelector('[data-sound]').setAttribute('aria-pressed', 'false');
        });
      }
      video.muted = !unmuting;
      sound.setAttribute('aria-pressed', unmuting ? 'true' : 'false');
      if (unmuting) video.play().catch(function () {});
    });

    // Al hacer clic en el vídeo: pausa o sigue
    video.addEventListener('click', function () {
      if (video.paused) video.play().catch(function () {}); else video.pause();
    });
  });

  if ('IntersectionObserver' in window) {
    var vio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var v = e.target;
        if (e.isIntersecting) {
          if (!v.src) v.src = v.dataset.src;
          v.play().catch(function () {});
        } else {
          v.pause();
          if (!v.muted) {
            v.muted = true;
            v.closest('[data-player]').querySelector('[data-sound]')
              .setAttribute('aria-pressed', 'false');
          }
        }
      });
    }, { threshold: 0.35 });
    document.querySelectorAll('[data-video]').forEach(function (v) { vio.observe(v); });
  } else {
    document.querySelectorAll('[data-video]').forEach(function (v) {
      v.src = v.dataset.src;
      v.setAttribute('controls', '');
    });
  }

  /* ── Correo ─────────────────────────────────────────────────
     En claro dentro del HTML lo recogen los rastreadores de spam el primer día.
     Se arma aquí; sin JavaScript queda un enlace que lleva a esta sección.
     ───────────────────────────────────────────────────────── */
  var mail = document.querySelector('.mail[data-buzon]');
  if (mail) {
    var dir = mail.dataset.buzon + '@' + mail.dataset.dominio;
    mail.href = 'mailto:' + dir;
    mail.textContent = dir;
    mail.removeAttribute('data-i18n');   // ya no es un texto traducible
  }

  /* ── Año del pie ────────────────────────────────────────── */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
