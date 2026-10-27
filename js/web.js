/* ============================================================
   Mesa 10 Studio — comportamiento de la web
   La intro de la mesa vive en intro.js (generado desde el prototipo). Aquí: idioma, cabecera,
   los tres gestos (tallar en mármol, posar, escribir), el ánfora de «la herramienta no decide», los vídeos y el correo.
   Los textos de marca (descripción, público, eslogan) son literales validados: no reescribir.
   ============================================================ */
(function () {
  'use strict';

  /* Todo se anima siempre, también con "reducir movimiento" (decisión de Javi, 02-oct): Windows con las
     animaciones apagadas —y cualquier escritorio remoto— lo activa sin querer y la web salía quieta.
     Para volver a respetarlo: matchMedia('(prefers-reduced-motion: reduce)').matches aquí, en copiar_intro.py
     y el bloque de estilo.css. */
  var QUIETO = false;

  /* Sin clic derecho ni "Guardar imagen/vídeo como" en fotos y vídeos propios (07-oct, Javi: que no se
     descarguen fácil). No frena a quien use las herramientas de desarrollador, pero sí el menú normal. */
  document.addEventListener('contextmenu', function (e) {
    if (e.target.closest('img, video')) e.preventDefault();
  });

  /* ── Textos en inglés (los de español están escritos en el HTML) ── */
  var EN = {
    'saltar': 'Skip to content',
    'nav.servicios': 'What we do',
    'nav.trabajo': 'Work',
    'nav.metodo': 'How we work',
    'nav.faq': 'FAQ',
    'nav.contacto': 'Contact',
    'portada.otra': 'Watch again',
    'portada.bajar': 'Scroll to the content',

    'lema': 'Timeless art, with today’s tools.',
    'publico': 'Custom software and audiovisual production for small businesses, freelancers and social media content creators.',
    'desc': 'Custom software and audiovisual production. Based in Seville, working across Spain and Europe.',
    'eslogan': 'New tools, done right.',
    'accion': 'Tell us your idea',

    'serv.titulo': 'Two branches, one table.',
    'serv.entrada': 'We create software that saves you time and work, and videos that put your brand on a level with the big names. We don’t start from a tool but from your case: first we understand what you need, then we choose how to make it.',
    'serv.abrir': 'See what we do',
    'pliegue.cerrar': 'Close',
    'serv.soft.titulo': 'Custom software and tools',
    'serv.soft.cuerpo': 'Tools built around the way you work, not the other way round. We understand your process — what repeats, where time gets lost — and build the solution on what you already use, with artificial intelligence only where it helps.',
    'serv.soft.l1': 'Task and process automation: invoices that file themselves, enquiries that reach whoever should handle them and orders that move into production on their own, with no manual work',
    'serv.soft.l2': 'Voice and WhatsApp assistants that answer for you, book appointments and run your diary',
    'serv.soft.l3': 'Custom management software — ERP and CRM sized for a small business — and in-house tools, built around the way you work',
    'serv.soft.l7': 'Connections between the software and machines you already use (middleware): sales, bookings, payments, stock or production, working as a single system',
    'serv.soft.l4': 'Websites and mobile apps: design, development and upkeep, with our review room, so you can tell us your changes right on the site, easily and clearly',
    'serv.soft.l6': 'Large-scale data search: what would take weeks to find online, verified and organised in a simple tool',
    'serv.soft.editor': 'Code example: how we build a made-to-measure tool',
    'serv.soft.pie': 'A sketch of how we work, not a client’s code.',
    'serv.soft.pest': 'made_to_measure.py',
    'serv.soft.pest2': 'notes.md',
    'serv.soft.orden': '$ python made_to_measure.py',
    'serv.soft.sal1': 'understood · built · tested',
    'serv.soft.sal2': 'done: it runs on what you already use',
    'serv.av.titulo': 'Audiovisual production',
    'serv.av.cuerpo': 'We work like a production company: idea, script, editing, colour and sound. Artificial intelligence spares us the shoot — actors, locations, cameras — but what makes a piece work is still human: the idea, the taste and the hand that decides every shot.',
    'serv.av.l1': 'Cinematic-quality ads at an affordable price, reels and UGC content (the kind that looks filmed by a customer on their phone) for social media and businesses',
    'serv.av.l3': 'Avatars: your face in digital form or a character of your own, with a personality, a voice and a story; we create and manage it',
    'serv.av.l4': 'Professional editing for social media and content creators: your streams, recordings or the videos piling up on your phone, turned into pieces that tell a story, adapted to every platform and language',
    'serv.av.l5': 'Your product and your premises, with the look of a major campaign and no shoot or sets',
    'serv.av.l8': 'Our own review room: you tell us your changes right on the video, faster and more clearly',
    'serv.av.l7': 'Brand identity: a logo, typeface and tagline of your own, made with the same care as this studio’s',

    'trab.titulo': 'On the table.',
    'trab.entrada': 'Every project starts from a specific problem: a clinic that was missing calls, a print shop printing every order by hand, a chef who wanted an image worthy of his cooking. Here is how we solved them.',
    'trab.abrir': 'See the work',
    'trab.ramas': 'Branches',
    'trab.r.soft': 'Software',
    'trab.r.av': 'Audiovisual',
    'trab.lista.soft': 'Software work',
    'trab.lista.av': 'Audiovisual work',
    'trab.sel.clin': '24/7 receptionist',
    'trab.sel.copi': 'Automated production',
    'trab.sel.chef': 'Events & personal brand',
    'trab.sel.seren': 'E-commerce advertising',
    'trab.sel.lucy': 'Content creators',
    'trab.sel.moda': 'Fashion campaigns',
    'ap.ver.serv': 'See everything we do',
    'ap.ver.trab': 'See all the work',
    'ap.editor': 'What we build in software, written as code',
    'maq.aria': 'An example of automation: a call, an invoice and an order go into the agent and come out done: an appointment in the calendar, the invoice recorded and the order packed.',
    'maq.llega': 'In',
    'maq.agente': 'Agent',
    'maq.listo': 'Done',
    'trab.sel.otras': 'Other creations',
    'trab.sel.avatares': 'Avatars',
    'ley.guion': 'Script',
    'ley.gen': 'Generation',
    'ley.montaje': 'Editing',
    'ap.seren': 'E‑commerce advertising',
    'pieza.sonido': 'Sound',
    'pieza.ia': 'AI-generated',
    'caso.chef.tipo': 'Food & hospitality · Audiovisual production · An image that matches his cooking',
    'caso.chef.cuerpo': 'Chef Roberto Vera cooks at private events in villas and exclusive homes. We adapted his brand to that world and created this cinematic piece to promote them. Nothing was filmed: no set, no villa, no cameras; the chef appears as his digital avatar and everything else is generated with artificial intelligence. What makes it look real is the rest: the right model for every shot, knowing exactly what to ask for and an edit done by hand.',
    'caso.chef.planos': '14, chosen by hand',
    'ficha.duracion': 'Length',
    'ficha.planos': 'Shots',
    'ficha.rodaje': 'Shoot',
    'ficha.ninguno': 'None',
    'ficha.producto': 'Product',
    'ficha.localizacion': 'Location',
    'ficha.generada': 'Generated',
    'ficha.para': 'For',
    'ficha.protagonista': 'Lead',
    'clin.titulo': '24/7 receptionist for a physiotherapy clinic',
    'clin.tipo': 'Health · Custom software · No call left unanswered',
    'clin.cuerpo': 'In a clinic, the phone rings just when the physiotherapist is with a patient, and every missed call can end up at another clinic. For FisioBoost we built a virtual receptionist that answers around the clock: it speaks naturally, answers with the clinic’s information and, when someone wants an appointment, takes their details and sends them straight to the physiotherapist on WhatsApp, who confirms the time in person. It is ready to grow —taking more details from each patient or booking appointments straight into the diary— but the physiotherapist preferred to keep it simple and stay in control of every appointment.',
    'clin.f1': 'Client',
    'clin.f1v': 'Live since August',
    'clin.f2': 'Recovered',
    'clin.f2v': 'At least 20 patients who called when no one could pick up',
    'clin.llamada': 'After-hours call',
    'clin.quien1': 'Patient',
    'clin.quien2': 'Receptionist · AI',
    'clin.l1': 'Hi, do you treat back contractures? I’ve been in pain for a week.',
    'clin.l2': 'Yes, it’s one of the things we see most at FisioBoost. Shall I request an appointment for you?',
    'clin.l3': 'Yes, please. Afternoons are better.',
    'clin.l4': 'Perfect. Could I have your name and a contact number?',
    'clin.ejemplo': 'An example call, not a real one.',
    'caso.serenica.tipo': 'E-commerce · Audiovisual · AI-generated commercial',
    'caso.serenica.cuerpo': 'Serénica sells decorative prints online, and buyers need to picture them at home before deciding. We start from real photos of each print; the room, the afternoon light and the person opening the parcel are made with artificial intelligence. The print looks exactly as it is; the house doesn’t exist. That way its customers live the product before they hold it, with the quality of a TV ad.',
    'caso.serenica.producto': 'Real, unretouched',
    'copi.titulo': 'Print agent for a large copy shop',
    'copi.tipo': 'Custom software · Automatic order printing',
    'copi.cuerpo': 'Iris Copy is a high-volume copy shop that sells through its website and ships across Spain. Every order had to be printed by hand — download the files, check the options, send them to the printer one by one — while serving the counter. We built them an agent that lives on the shop’s computer: it prepares every paid order with its paper, colour and copies, sends it to the right printer, and the team only has to pack it. Whatever it can’t do reliably, it sets aside and flags for a person. We also designed and delivered a custom app to supervise the agent: from their phone, the shop can see at any moment what it is doing, which orders are queued and how the day is going, and ask it about any order without walking over to the computer.',
    'copi.f1': 'Running',
    'copi.f1v': 'Since September',
    'copi.f2': 'Saves',
    'copi.f2v': 'A full working day every week (about 8 hours)',
    'copi.hoja': 'Order sheet',
    'copi.h.archivos': 'Files',
    'copi.h.archivosv': '3 · 214 sheets',
    'copi.h.a1': 'B/W · double-sided · 2 copies',
    'copi.h.a2': 'Colour · single-sided',
    'copi.h.a3': 'Card stock · BY HAND',
    'copi.h.enc': 'Binding',
    'copi.h.encv': 'Black spiral',
    'copi.h.pie': 'An example sheet, not a real order.',
    'caso.lucy.tipo': 'Audiovisual · Video generation and editing · Social media',
    'caso.lucy.titulo': 'Virtual travel influencer for Andalusia',
    'caso.lucy.cuerpo': 'Lucy Rivero is an avatar we created, with her own Instagram account of travel tips for Andalusia. Everything is generated with artificial intelligence, but the places are real: the corners of Cádiz and Marbella she visits exist exactly as shown. That’s our strength: taking a digital creator to real places. We do the content, script, voice and edit, and it works for any niche: fashion, beauty, food, sport…',
    'caso.lucy.para': 'Creators and fashion brands',
    'caso.lucy.prota': 'Lucy, the studio’s avatar',
    'caso.lucy.pie1': 'Travel tips · Cádiz',
    'caso.lucy.pie2': 'Travel tips · Marbella',
    'tamb.titulo': 'Also on the table',
    'tamb.entrada': 'More software from this studio, for clients and for our own use. The images are recreations with sample data; open one to see it larger.',
    'tamb.fact': 'Supplier invoices · admin',
    'tamb.factv': 'Bookkeeping automation for a small business: the system spots supplier invoices in the mailbox, reads their data with artificial intelligence and records them in Holded, its accounting software, never booking one twice.',
    'tamb.busq': 'Data search and organisation · sales',
    'tamb.busqv': 'Market research for an industrial machinery brand’s sales rep: we found the companies on his route that fit the client profile, checked one by one that they were still active and delivered 163 profiles on a map, ready to plan his visits.',
    'tamb.eg': 'Equity Guard · trading',
    'tamb.egv': 'Risk management for MetaTrader 5, built for funded accounts: it watches equity in real time and, if the day’s loss hits the limit, closes every position and can keep the account from trading until the next reset. Published in the MQL5 community.',
    'tamb.ofi': 'Virtual office · productivity',
    'tamb.ofiv': 'Our own studio’s virtual office: calendar, tasks, projects and notes in one place, on computer and phone, with an artificial-intelligence assistant you talk or write to. It books appointments, sums up the day and briefs you every morning. It adapts to any business or person.',
    'alt.ofi': 'Mock-up of the virtual office: the day dashboard with the morning briefing and, on the phone, the chat with the assistant.',
    'alt.fact': 'Mock-up of an invoice’s journey: from the mailbox to the data read by artificial intelligence and the bookkeeping entry.',
    'alt.busq': 'Map of the sales route with the companies by town and two sample records.',
    'tamb.mat': 'Matinal · news',
    'tamb.matv': 'A newspaper of your own that writes itself: every morning it gathers the news on the topics the client follows, summarises it and lays it out like a classic daily, puzzle included. At seven it reaches their phone, with a version to listen to as well.',
    'alt.mat': 'Mock-up of Matinal: today’s front page and the seven o’clock alert on the phone.',
    'tamb.rec': 'Forma · training',
    'tamb.recv': 'An app to log gym lifts and body weight without notebooks: it keeps each exercise’s history, flags every record and shows progress on a chart. It installs on the phone and works offline.',
    'alt.rec': 'Mock-up of Forma: the lifts list with a new personal best and the weight page with calendar and chart.',
    'tamb.bol': 'Jugada · betting',
    'tamb.bolv': 'An app to keep track of sports bets: it works out the bankroll, the return and which leagues go best. To log a bet you just write it as you’d say it, or upload a photo of the slip, and every week it prepares a report laid out like a newspaper.',
    'alt.bol': 'Mock-up of Jugada: bankroll and recent bets, a bet logged with AI from a sentence and the weekly newspaper-style report.',
    'tamb.arc': 'Arcade Gaming · custom video game',
    'tamb.arcv': 'A nineties-style arcade game starring a group of friends, each with their own gestures and running jokes. Almost everything can be customised — characters, levels, in-jokes — as a gift, for a farewell party or for an event.',
    'alt.arc': 'Screenshot of the arcade game, with a sample character.',
    'alt.eg': 'Mock-up of the Equity Guard panel over a MetaTrader chart: equity, daily loss and room before the lock.',
    'obra.rec': 'Mock-up',
    'visor': 'Enlarged image',
    'visor.cerrar': 'Close',

    'rep.titulo': 'Designer stars',
    'rep.entrada': 'We create and look after them ourselves, each with a story, a way of speaking and an audience of their own. None of them is flesh and blood, and we never hide it; but the emotions they convey are real. A brand can work with one of them, or commission its own.',
    'rep.lista': 'Designer stars',
    'rep.aviso': 'Virtual character · created by Mesa 10 Studio',
    'rep.preparacion': 'In preparation',
    'rep.d.clave': 'Keyword',
    'rep.d.publico': 'Audience',
    'rep.d.encaja': 'A natural fit for',
    'rep.d.formato': 'Format',
    'rep.kimiko.apodo': 'The Cool Hunter',
    'rep.kimiko.cuerpo': 'Japanese, raised between Tokyo and London. She says little and watches a lot: she can tell what will last from what is merely new, and sees it before anyone else. Beside a tech, design or designer-fashion brand, she conveys something hard to fake: having got there first.',
    'rep.kimiko.clave': 'Anticipation',
    'rep.kimiko.publico': 'Ages 20–40 · design, tech, designer fashion, Japanese culture',
    'rep.kimiko.encaja': 'Electronics and gadgets · designer and avant-garde fashion · beauty tech · galleries and design spaces',
    'rep.kimiko.formato': 'Product presentations, trends told on video, launch previews',
    'rep.kimiko.pie': 'Introduction reel · “Tokyo, by night” · 43 s',
    'rep.runa.apodo': 'The Creative Rebel',
    'rep.runa.cuerpo': 'Scandinavian roots, raised by the internet. She never fitted into a single tribe, so she built her own: skate, drawing, video games, manga and music. Beside a gaming, streetwear or creative-software brand, she gives permission to be different without apologising.',
    'rep.runa.clave': 'Break',
    'rep.runa.publico': 'Ages 18–34 · gaming, anime, alternative music, streetwear',
    'rep.runa.encaja': 'Video games and gaming gear · streetwear and skate · apps and creative software · comics and manga',
    'rep.runa.formato': 'Fast-paced reels, creator collaborations, street campaigns',
    'rep.runa.pie': 'Introduction reel · “Blue Noise” · 52 s',
    'rep.sabrina.apodo': 'The Serene Aesthete',
    'rep.sabrina.cuerpo': 'European, raised among books, museums and well-made things. She doesn’t dress to impress but to create calm around her: ivory, camel, noble fabrics. With her, a fashion, home or wellbeing brand feels cared for and made to last.',
    'rep.sabrina.clave': 'Harmony',
    'rep.sabrina.publico': 'Women aged 24–45 · timeless fashion, home, wellbeing, culture',
    'rep.sabrina.encaja': 'Timeless fashion and leather goods · home and interiors · wellbeing and spa · bookshops, art and culture',
    'rep.sabrina.formato': 'Slow-paced campaigns, the product told through a gesture, lifestyle editorial',
    'rep.sabrina.pie': 'Introduction reel · “Still Water” · 43 s',
    'rep.lara.apodo': 'The Femme Fatale',
    'rep.lara.cuerpo': 'Latin and Anglo roots, and the ease of someone at home in any room. She doesn’t chase attention: she commands it. She doesn’t show off; she chooses well: a fragrance, a jewel, a hotel. She makes a brand feel more exclusive and harder to ignore.',
    'rep.lara.clave': 'Magnetism',
    'rep.lara.publico': 'Ages 25–44 · luxury, beauty, nightlife, city breaks',
    'rep.lara.encaja': 'Fine fragrance · jewellery · five-star hotels · premium cocktails',
    'rep.lara.formato': 'Fragrance and beauty spots, night campaigns, luxury launches',
    'rep.lara.pie': 'Introduction reel · “Slow Gold” · 35 s',
    'rep.lucy.apodo': 'The Local Friend',
    'rep.lucy.cuerpo': 'Andalusian roots, virtual from birth. Sweet, fun and kind, she teaches you to travel the way a friend would: the trusted bilingual guide anyone would hope to meet on arrival. With her, a destination, a day trip or a proper local bar feels like a tip from someone who lives there.',
    'rep.lucy.clave': 'Connection',
    'rep.lucy.publico': 'English-speaking travellers aged 22–45 visiting Andalusia',
    'rep.lucy.encaja': 'Destinations and tourist boards · experiences and tours · transport and rentals · bars and local food',
    'rep.lucy.formato': 'Reels, carousels and guides in English · @itslucyinthesouth',
    'rep.lucy.pie': 'Introduction reel · “Whitewash and Sea” · 52 s',
    'rep.melissa.apodo': 'The Sunlit Star',
    'rep.melissa.cuerpo': 'Daughter of an American father and an Australian mother, she spends her summers in Europe. She sings, writes songs and plays several instruments. Her looks open the door, but what stays is her talent. She makes a brand feel younger without making it childish.',
    'rep.melissa.clave': 'Tide',
    'rep.melissa.publico': 'Ages 18–34 · music, surf, festivals, summer',
    'rep.melissa.encaja': 'Instruments and music · swimwear and surf · sun care and hair care · summer festivals',
    'rep.melissa.formato': 'Reels with her own music, summer campaigns, acoustic sessions',
    'rep.melissa.pie': 'Introduction reel · “Salt in Her Hair” · 62 s',
    'rep.malik.apodo': 'The High-Performance Creative',
    'rep.malik.cuerpo': 'Senegalese and French roots, between Paris and London. A music producer and creative director, he trains the way he works: with method and without showing off. With him, a sport, sneaker or audio brand feels current without trying too hard.',
    'rep.malik.clave': 'Pulse',
    'rep.malik.publico': 'Ages 20–40 · urban sport, sneakers, electronic music, tech',
    'rep.malik.encaja': 'Sportswear and sneakers · basketball and gym · wearables and sports watches · headphones and music production',
    'rep.malik.formato': 'Urban sport campaigns, sneaker launches, product in real use',
    'rep.malik.pie': 'Introduction reel · “Before the Noise” · 47 s',
    'rep.adrian.apodo': 'The Mediterranean Gentleman',
    'rep.adrian.cuerpo': 'Spanish with Italian roots, between Madrid, Milan and Lisbon. An architectural photographer, he travels unhurriedly, analogue camera to hand, noticing the details. With him, a hotel, a menswear label or a watchmaker feels better chosen and more credible.',
    'rep.adrian.clave': 'Presence',
    'rep.adrian.publico': 'Ages 27–48 · menswear, food, travel, design',
    'rep.adrian.encaja': 'Boutique hotels and restaurants · wine and food · menswear and classic watchmaking · analogue photography',
    'rep.adrian.formato': 'Travel and stays told unhurriedly, menswear editorial, the object in hand',
    'rep.adrian.pie': 'Introduction reel · “Window Light” · 52 s',
    'met.titulo': 'Think before generating.',
    'met.entrada': 'Anyone can ask a machine for something. The hard part is knowing what to ask, seeing when what comes back isn’t good enough, and finishing it by hand. We tell it as a Greek workshop: each step of the potter is a step of our work.',

    'crit.titulo': 'The tool doesn’t decide.',
    'crit.entrada': 'We use artificial intelligence the way you use a compass: to reach further, more precisely. But the compass doesn’t choose what gets drawn. The tools are within anyone’s reach and get better every month; what you can’t download is judgement, an idea of your own and care for detail.',
    'proc.aria': 'How we work, told with a Greek amphora: the client brings a need and the shape comes from their answers; it is drawn by hand, with compass and template, before any machine is switched on; the wheel gives it volume in seconds and makes copies; the hand adds the handles and paints the scene; out of the kiln, a cracked piece is discarded, another goes back to the wheel and the good one is checked against the drawing; the finished piece is handed over to the client by the sea.',
    'cine.mandos': 'Animation controls',
    'cine.atras': 'Previous step',
    'cine.pausa': 'Pause',
    'cine.alante': 'Next step',
    'proc.e1': 'Your idea',
    'proc.e1s': 'You tell us what you need and we ask until we understand it: what it’s for, who it’s for and what it has to achieve. The shape comes from your answers.',
    'proc.e2': 'The design',
    'proc.e2s': 'Like a potter drawing the amphora before turning it, we plan everything before switching on any machine: the script and every shot, or every step of the program.',
    'proc.e3': 'The wheel',
    'proc.e3s': 'Artificial intelligence is our wheel: it quickly gives shape to what we designed — images, shots, code — and to as many versions as needed.',
    'proc.e4': 'The hand',
    'proc.e4s': 'What makes a piece unique comes from the hand, not the machine: the editing and rhythm of a video, or a program fitted to the way you work.',
    'proc.e5': 'Judgement',
    'proc.e5s': 'We check everything against the design, like a potter opening the kiln. Whatever isn’t good enough doesn’t leave the workshop: it gets remade.',
    'proc.e6': 'Delivery',
    'proc.e6s': 'We hand it over finished, tested and explained, ready to work from day one. An amphora was made to travel full; what we make is made to be used.',
    'ent.titulo': 'Entasis',
    'ent.cuerpo': 'Greek columns aren’t straight: they swell slightly towards the middle. A straight-sided column, seen from a distance, seems to thin out in the middle, and the Greeks corrected it by eye, thinking of whoever would look at it. That curve doesn’t come from any rule: it comes from looking. That is why our brand’s lettering is called Éntasis, and why we work the way we do: the tool raises the straight column; we give it the curve that makes it look perfect to whoever sees it.',
    'ent.corto': 'Greek columns are curved by eye so they look perfect. The tool raises the column; we give it the curve: the detail designed for whoever looks at it.',
    'ent.recta': 'straight: what the rule gives',
    'ent.curva': 'with entasis: what the eye gives (exaggerated)',
    'gr.titulo': 'The roots of the brand',
    'gr.intro': 'We love Greek culture, and not as decoration: it gives us our lettering, our way of working and even the shade that falls across this website. Three ideas explain it.',
    'gr.mas': 'Read more',
    'gr.tek.titulo': 'Tékhne',
    'gr.tek.arte': 'art',
    'gr.tek.oficio': 'craft',
    'gr.tek.de': 'technology',
    'gr.tek.cuerpo': 'The Greeks had a single word for art and for craft: tékhne, knowing how to do something well, with head and hands. It is where the word “technology” comes from. That is why at Mesa 10 we don’t separate the creative from the technical: the newest tool doesn’t replace the craft, it continues it, and it only gives its best in the hands of someone who has mastered it.',
    'gr.tek.corto': 'For the Greeks, art and craft were a single word, the root of “technology”. That’s why we care as much about how something looks as about how it works.',
    'gr.oli.titulo': 'The olive tree',
    'gr.oli.cuerpo': 'Athena won the patronage of Athens with a gift: against the spring Poseidon struck from the rock, she planted an olive tree, and the city chose what was useful and lasting over what was spectacular. The olive tree can also be grafted: a new branch on an old root keeps bearing fruit for centuries. That is Mesa 10: two branches, software and audiovisual, each in its own colour, growing from the same trunk, timeless craft, and renewed with today’s tools. That is why its shade falls across this whole website.',
    'gr.oli.corto': 'A new branch grafted onto an old root bears fruit for centuries. That’s how our software and audiovisual work grow: new tools on a timeless craft.',
    'noes.titulo': 'What we don’t do',
    'noes.l1a': 'Hand over the first thing the machine comes up with.',
    'noes.l1': 'The first result is only the starting point. Every piece goes through several rounds, and through human eyes, before it reaches you.',
    'noes.l2a': 'Use templates.',
    'noes.l2': 'Your business isn’t the one next door. We start from your problem, your audience and the way you speak, and every piece is made for you.',
    'noes.l3a': 'Hide what is generated.',
    'noes.l3': 'We always say so, clearly: in the piece itself or with the label of the platform where it’s published. Your customers’ trust is worth more than any effect.',
    'noes.l4a': 'Tie you to a subscription to keep what is yours.',
    'noes.l4': 'The files and the code are yours from day one. If you ever decide to carry on by yourself, you take everything with you.',

    'cont.titulo': 'Tell us what you have in mind.',
    'cont.entrada': 'A need, a problem that eats up your hours, an idea you don’t know where to start with, or plain curiosity about what is possible today. Write to us and we’ll tell you what we’d do, how long it would take and what it would cost. No endless meetings.',
    'cont.correo': 'Write to us',
    'cont.con': 'Write with',
    'cont.app': 'Your mail app',
    'cont.copiar': 'Copy',
    'cont.copiado': 'Copied',
    'cont.asunto': 'An idea for Mesa 10 Studio',
    'cont.llamar': 'Call',
    'cont.wa': 'WhatsApp',
    'cont.wa.texto': 'Hi, I’m writing from the Mesa 10 Studio website.',
    'buzon.abrir': 'Or leave your idea here',
    'buzon.titulo': 'Tell us your idea',
    'buzon.idea': 'Your idea',
    'buzon.idea.ph': 'What you need, what eats up your hours or what you’ve come up with.',
    'buzon.correo': 'Your email, so we can reply',
    'buzon.nombre': 'Your name (if you like)',
    'buzon.aviso': 'We only use your email and what you tell us to reply to you. We don’t give it to anyone and we delete it whenever you ask.',
    'buzon.enviar': 'Send',
    'buzon.enviando': 'Sending…',
    'buzon.hecho': 'Received. We’ll write to {c} as soon as we read it.',
    'buzon.hecho.n': 'Received, {n}. We’ll write to {c} as soon as we read it.',
    'buzon.err.idea': 'Tell us a little more: one sentence is enough.',
    'buzon.err.correo': 'Check the email: we couldn’t reply to that one.',
    'buzon.err.largo': 'It’s too long for the paper. Shorten it a little or send it to us by email.',
    'buzon.err.muchos': 'You’ve written to us several times in a row. Wait a few minutes or message us on WhatsApp.',
    'buzon.err.red': 'It couldn’t be sent. Try again in a moment, or write to us by email or WhatsApp.',
    'buzon.privacidad': 'How we handle your data',
    'pie.legal': 'Information',
    'pie.faq': 'FAQ',
    'pie.aviso': 'Legal notice',
    'pie.privacidad': 'Privacy',
    'pie.cookies': 'Cookies',
    'portada.saltar': 'Skip intro',
    'copi.cad.mapa': 'All of Spain',
    'copi.cad.tienda': 'The shop',
    'copi.cad.web': 'Website',
    'copi.cad.agente': 'Agent',
    'copi.cad.impresora': 'Printer',
    'copi.cad.empaquetado': 'Packing',
    'copi.cad.revision': 'Review',
    'copi.cad.pie': 'Diagram of the system, not the real screen.',
    'copi.cad.aria': 'How Iris Copy’s agent works: orders arrive from all over Spain through the website, the agent checks every file and sends it to the printer, then it is packed and shipped to any city; anything it cannot do reliably goes to review.',
    'copi.f0': 'Client',
    'caso.serenica.titulo': 'Commercial spot for decorative prints',
    'ficha.real': 'Real',
    'ficha.ia': 'AI-made',
    'ficha.nuestro': 'Ours',
    'caso.chef.titulo': 'Spot for a private dining event',
    'caso.chef.real': 'The chef, as an avatar',
    'caso.chef.ia': 'The villa, the guests and the dishes',
    'caso.chef.nuestro': 'Idea, direction of every shot and edit',
    'clin.quien3': 'WhatsApp to the clinic',
    'clin.l5': 'Marta Ruiz. This same number.',
    'clin.l6': 'Noted, Marta. I’m passing it to the physiotherapist now and he’ll confirm the time on WhatsApp.',
    'clin.l7': 'Marta Ruiz · afternoons · back contracture · call this number',
    'clin.cad.paciente': 'Patient',
    'clin.cad.clinica': 'Clinic',
    'clin.cad.asistente': 'AI assistant',
    'clin.cad.fisio': 'Physiotherapist',
    'clin.cad.llamando': 'Calling the clinic…',
    'clin.cad.nadie': 'Nobody answers',
    'clin.cad.contesta': 'The AI receptionist answers',
    'clin.cad.aria': 'How the FisioBoost receptionist works: a patient in pain calls the clinic after hours; nobody answers and the virtual receptionist steps in, answers the call and takes her details; when the call ends, it sends a WhatsApp to the physiotherapist, who sees it.',
    'clin.f3': 'Running',
    'clin.f3v': 'Since August',
    'caso.serenica.real': 'The print, exactly as sold',
    'caso.serenica.ia': 'The house, the light, the person and every shot',
    'caso.serenica.nuestro': 'Idea, a model for every shot and edit',
    'copi.fl.titulo': 'How an order travels',
    'copi.fl.vivo': 'Running',
    'copi.fl.p1': 'Website',
    'copi.fl.p1t': 'A paid order comes in',
    'copi.fl.p2': 'Agent',
    'copi.fl.p2t': 'Picks it up and checks every file',
    'copi.fl.p3': 'Printer',
    'copi.fl.p3t': 'Each file with its paper, colour and copies',
    'copi.fl.p4': 'Shop',
    'copi.fl.p4t': 'Order sheet on top: pack and ship',
    'copi.fl.aviso': 'If it can’t do something reliably, it sets it aside and flags it.',
    'copi.fl.pie': 'Diagram of the system, not the real screen.',
    'caso.lucy.real': 'The places: Cádiz and Marbella',
    'caso.lucy.ia': 'Lucy and every shot in motion',
    'caso.lucy.nuestro': 'Content, script, voice and edit',
    'caso.moda.titulo': 'Two fashion spots: streetwear and classic',
    'caso.moda.tipo': 'Fashion · Audiovisual production · Sample project',
    'caso.moda.pie1': 'Streetwear',
    'caso.moda.pie2': 'Classic fashion · Autumn-winter',
    'caso.moda.cuerpo': 'Sample pieces for a streetwear brand and a classic fashion label, starring our own avatars. We design the setting to suit the clothes, choose the music and pace and decide every shot, without filming: the city, the light and the season are chosen from the studio. In a real commission, the stars would be your garments.',
    'caso.moda.real': 'In a commission, the brand’s clothes',
    'caso.moda.ia': 'The model, the street and every shot',
    'caso.moda.nuestro': 'Set, music, pace and edit'
  };
  var META = {
    es: { title: 'Software a medida y productora audiovisual en Sevilla | Mesa 10 Studio',
          desc: 'Desde Sevilla para toda España: software a medida, automatización y asistentes con IA, y producción de vídeo, anuncios UGC y reels para empresas y autónomos.' },
    en: { title: 'Custom software and video production in Seville | Mesa 10 Studio',
          desc: 'Custom software, automation and AI assistants for WhatsApp and phone, plus video production, UGC ads and reels for small businesses and freelancers. From Seville, working across Spain and Europe.' }
  };

  var ES = {}, ESaria = {};
  document.querySelectorAll('[data-i18n]').forEach(function (el) {
    var k = el.getAttribute('data-i18n');
    if (!(k in ES)) ES[k] = el.textContent.trim();
  });
  document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
    ESaria[el.getAttribute('data-i18n-aria')] = el.getAttribute('aria-label');
  });
  ES['cont.copiado'] = 'Copiada';
  ES['cont.asunto'] = 'Una idea para Mesa 10 Studio';
  ES['cont.wa.texto'] = 'Hola, os escribo desde la web de Mesa 10 Studio.';
  ES['buzon.enviando'] = 'Enviando…';
  ES['buzon.hecho'] = 'Recibido. Te escribimos a {c} en cuanto lo leamos.';
  ES['buzon.hecho.n'] = 'Recibido, {n}. Te escribimos a {c} en cuanto lo leamos.';
  ES['buzon.err.idea'] = 'Cuéntanos un poco más: con una frase basta.';
  ES['buzon.err.correo'] = 'Revisa el correo: a ese no podríamos contestarte.';
  ES['buzon.err.largo'] = 'Es demasiado largo para el papel. Resúmelo un poco o mándanoslo por correo.';
  ES['buzon.err.muchos'] = 'Nos has escrito varias veces seguidas. Espera unos minutos o escríbenos por WhatsApp.';
  ES['buzon.err.red'] = 'No ha podido salir. Prueba otra vez en un momento, o escríbenos al correo o por WhatsApp.';
  var ESalt = {};
  document.querySelectorAll('[data-i18n-alt]').forEach(function (el) { ESalt[el.getAttribute('data-i18n-alt')] = el.getAttribute('alt'); });
  var ESph = {};
  document.querySelectorAll('[data-i18n-ph]').forEach(function (el) {
    ESph[el.getAttribute('data-i18n-ph')] = el.getAttribute('placeholder');
  });
  var idioma = 'es';
  var alIdioma = [];                                           // lo que se monta después y también cambia de idioma
  var t = function (k) { return (idioma === 'en' ? EN : ES)[k] || ES[k] || ''; };

  function ponerTexto(el, texto) {
    var tinta = el.querySelector(':scope > .tinta');
    if (el.hasAttribute('data-estela')) { el.dataset.texto = texto; grabar(el); ajustar(el); return; }
    (tinta || el).textContent = texto;
  }

  function setLang(lang, recordar) {
    idioma = lang;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var texto = t(el.getAttribute('data-i18n'));
      if (texto) ponerTexto(el, texto);
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      var k = el.getAttribute('data-i18n-aria');
      el.setAttribute('aria-label', lang === 'en' ? EN[k] : ESaria[k]);
    });
    document.querySelectorAll('[data-i18n-alt]').forEach(function (el) {
      var k = el.getAttribute('data-i18n-alt');
      el.setAttribute('alt', lang === 'en' ? EN[k] : ESalt[k]);
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(function (el) {
      var k = el.getAttribute('data-i18n-ph');
      el.setAttribute('placeholder', lang === 'en' ? EN[k] : ESph[k]);
    });
    ponerContacto();
    alIdioma.forEach(function (f) { f(lang); });
    document.documentElement.lang = lang;
    document.title = META[lang].title;
    var d = document.querySelector('meta[name="description"]');
    if (d) d.setAttribute('content', META[lang].desc);
    document.querySelectorAll('.idioma button').forEach(function (b) {
      b.setAttribute('aria-pressed', b.dataset.lang === lang ? 'true' : 'false');
    });
    if (window.MesaAnfora) MesaAnfora.idioma(lang);                // las cartelas del ánfora
    if (recordar) { try { localStorage.setItem('m10-lang', lang); } catch (e) {} }
  }

  /* ── La mesa (intro) ─────────────────────────────────────── */
  var portada = document.getElementById('portada');
  var mesa = document.getElementById('mesa');
  var hayIntro = !!(window.MesaIntro && window.gsap && mesa);
  /* MIENTRAS SE MONTA LA MESA hay dos cosas distintas (13-oct, Javi: «que a los 4 segundos ya puedas bajar»):
     - mesa-montando: la intro corre y se ve «Saltar animación»; dura hasta que acaba (o a los 26 s, por si no avisa).
     - mesa-quieta: la página no baja (ni rueda, ni dedo, ni teclas, ni enlaces #), para que nadie se la salte de
       un tirón sin querer. Se suelta cuando la animación lleva BAJAR_A segundos de verdad (no desde que carga la
       página: sus imágenes pueden tardar), y como mucho a los 10 s */
  var raiz = document.documentElement, soltarTras = null, dejarBajarTras = null, BAJAR_A = 4;
  function bloquear() {
    if (!hayIntro) return;
    raiz.classList.add('mesa-montando', 'mesa-quieta');
    clearTimeout(soltarTras); clearTimeout(dejarBajarTras);
    soltarTras = setTimeout(soltar, 26000);
    dejarBajarTras = setTimeout(dejarBajar, 10000);
  }
  function dejarBajar() { clearTimeout(dejarBajarTras); raiz.classList.remove('mesa-quieta'); }
  function soltar() { clearTimeout(soltarTras); dejarBajar(); raiz.classList.remove('mesa-montando'); }
  function montando() { return raiz.classList.contains('mesa-montando'); }
  function bloqueada() { return raiz.classList.contains('mesa-quieta'); }
  function quieta(e) { if (bloqueada() && e.cancelable) e.preventDefault(); }
  window.addEventListener('wheel', quieta, { passive: false });
  window.addEventListener('touchmove', quieta, { passive: false });
  window.addEventListener('keydown', function (e) {
    if (!bloqueada() || (e.target.closest && e.target.closest('input, textarea, select, button, [contenteditable]'))) return;
    if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'End', 'Home', ' ', 'Spacebar'].indexOf(e.key) >= 0) e.preventDefault();
  });
  document.addEventListener('click', function (e) {
    var a = bloqueada() && e.target.closest && e.target.closest('a[href^="#"]');
    if (a) { e.preventDefault(); e.stopImmediatePropagation(); }
  }, true);
  if (hayIntro) {
    bloquear();
    MesaIntro.iniciar(mesa, { base: 'intro/' });
    mesa.addEventListener('intro:fin', function () { portada.classList.add('terminada'); soltar(); });
    /* volver a la mesa (03-oct, tarde). En el móvil, al bajar por la web, el navegador suelta las imágenes de la
       mesa ya preparadas. Al volver, lo primero que entraba (la tablet, el móvil y el suelo) se veía negro un
       momento. Ahora la mesa se despierta y prepara sus imágenes, también la del suelo, una pantalla antes de
       llegar. Se duerme solo cuando queda a más de una pantalla */
    var suelo = null;
    var calentar = function () {
      if (MesaIntro.calentar) MesaIntro.calentar();
      try {
        if (!suelo) {
          var m = /url\(["']?([^"')]+)/.exec(getComputedStyle(portada, '::before').backgroundImage || '');
          if (m) { suelo = new Image(); suelo.src = m[1]; }
        }
        if (suelo && suelo.decode) suelo.decode().catch(function () {});
      } catch (err) {}
    };
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (e) {
        if (e[0].isIntersecting) { calentar(); MesaIntro.seguir(); } else MesaIntro.pausar();
      }, { rootMargin: '100% 0px 100% 0px' }).observe(portada);
    }
  } else {
    portada.classList.add('terminada');
  }
  function otraVez(animar) {
    if (!hayIntro) return;
    portada.classList.remove('terminada');
    window.scrollTo({ top: 0, behavior: 'auto' });
    bloquear();
    if (animar === true) MesaIntro.animar(); else MesaIntro.repetir();
  }
  /* el botón anima siempre: con "reducir movimiento" (Windows con las animaciones apagadas, el escritorio
     remoto) la mesa sale ya montada y quieta, y quien quiera verla montarse la pide aquí */
  document.getElementById('otraVez').addEventListener('click', function () { otraVez(true); });
  /* SALTAR (04-oct, Javi): la mesa al final y la página libre para bajar */
  var botonSaltar = document.getElementById('saltar');
  if (botonSaltar) botonSaltar.addEventListener('click', function () {
    if (hayIntro && MesaIntro.saltar) MesaIntro.saltar();
    portada.classList.add('terminada'); soltar();
  });
  /* EL ANCLA de «Saltar animación» y de la flecha (06-oct, tarde, Javi: «abajo de la regla»): centrados bajo la
     regla, en el hueco entre la regla y lo que tenga debajo (el canto de la mesa, o la tablet o el móvil si caen en
     su ancho). Si el hueco no da para el botón (en vertical, la tablet queda justo debajo), sin ancla: el CSS los
     pone abajo, en el centro. Se mide la caja de la regla en reposo, que no se mueve (se mueve la de dentro); su
     imagen lleva la sombra alrededor y la regla en sí acaba al 57 % de su alto */
  function anclarPortada() {
    var regla = document.getElementById('regla'), mesaLuz = document.getElementById('luz');
    if (!regla || !mesaLuz || !botonSaltar) return false;
    var p = portada.getBoundingClientRect(), r = regla.getBoundingClientRect();
    var x = r.left + r.width / 2 - p.left, techo = r.top + r.height * .57 - p.top;
    var suelo = mesaLuz.getBoundingClientRect().bottom - p.top, medio = Math.max(botonSaltar.offsetWidth, 200) / 2 + 12;
    ['tablet', 'movil'].forEach(function (id) {
      var o = document.getElementById(id);
      if (!o) return;
      var b = o.getBoundingClientRect();
      if (b.right - p.left > x - medio && b.left - p.left < x + medio && b.top - p.top > techo) suelo = Math.min(suelo, b.top - p.top);
    });
    var cabe = suelo - techo >= 76;
    portada.classList.toggle('portada--ancla', cabe);
    portada.style.setProperty('--ancla-x', Math.round(x) + 'px');
    if (cabe) portada.style.setProperty('--ancla-y', Math.round((techo + suelo) / 2) + 'px');
    else portada.style.removeProperty('--ancla-y');
    return true;
  }
  if (hayIntro) {
    var intentosAncla = 0;
    (function esperarRegla() { if (!anclarPortada() && intentosAncla++ < 80) setTimeout(esperarRegla, 150); })();
    var anclaTras = [];
    window.addEventListener('resize', function () {         // al girar el móvil la mesa cambia de escena: se mide al rato otra vez
      anclaTras.forEach(clearTimeout);
      anclaTras = [200, 900, 2000].map(function (ms) { return setTimeout(anclarPortada, ms); });
    });
    /* lo que lleva la intro, en la raya de «Saltar animación» (solo mientras se monta la mesa) */
    var avanceCada = null;
    var seguirAvance = function () {
      if (avanceCada || !montando()) return;
      avanceCada = setInterval(function () {
        var tl = window.__intro && window.__intro.tl;
        if (tl) {
          botonSaltar.style.setProperty('--avance', tl.progress().toFixed(3));
          if (bloqueada() && tl.time() >= BAJAR_A) dejarBajar();
        }
        if (!montando()) { clearInterval(avanceCada); avanceCada = null; }
      }, 100);
    };
    seguirAvance();
    new MutationObserver(seguirAvance).observe(raiz, { attributes: true, attributeFilter: ['class'] });
  }

  /* el idioma: cada idioma es su propia página (/ y /en, desde el 27-oct); al cambiarlo se va a la otra y la mesa
     se vuelve a montar al cargar (decisión de Javi, 30-sep) */
  document.querySelectorAll('.idioma button').forEach(function (b) {
    b.addEventListener('click', function () {
      if (b.dataset.lang === idioma) return;
      try { localStorage.setItem('m10-lang', b.dataset.lang); } catch (e) {}
      location.href = b.dataset.lang === 'en' ? '/en' : '/';
    });
  });

  /* ── Cabecera: aparece al dejar atrás la mesa ───────────── */
  var barra = document.getElementById('barra');
  var menu = document.getElementById('menu');
  var olivo = document.getElementById('olivo');
  /* el alto de la portada, medido al cambiar el tamaño y no en cada scroll (06-oct, tarde): leerlo en cada scroll
     obligaba al navegador a recalcular la página entera si algo había cambiado (las piezas que se posan) */
  var altoPortada = portada.offsetHeight;
  window.addEventListener('resize', function () { altoPortada = portada.offsetHeight; alDesplazar(); });
  function alDesplazar() {
    var pasada = window.scrollY > altoPortada * 0.72;
    barra.classList.toggle('visible', pasada);
    olivo.classList.toggle('visible', pasada);
  }
  window.addEventListener('scroll', alDesplazar, { passive: true });
  barra.addEventListener('focusin', function () { barra.classList.add('visible'); });
  alDesplazar();

  /* LAS SECCIONES, SIEMPRE A MANO (06-oct, Javi: «en el móvil, mientras bajas, que salgan arriba las secciones para ir
     rápido; no dentro de un menú»). En el móvil van en una fila bajo la cabecera (antes, tras el botón «Menú»). Se marca
     la sección en la que estás: la que cruza una raya imaginaria al 40 % de la pantalla. Si la fila no cabe entera, se
     desliza sola hasta ella. «La herramienta no decide» cuenta como «Cómo trabajamos» */
  var enlaces = [].slice.call(menu.querySelectorAll('a'));
  var SECCIONES = ['servicios', 'trabajo', 'metodo', 'criterio', 'contacto'], CUENTA_COMO = { criterio: 'metodo' };
  var seccionActual;
  function marcarSeccion(id) {
    if (id === seccionActual) return;
    seccionActual = id;
    enlaces.forEach(function (a) {
      var si = a.getAttribute('href') === '#' + id;
      a.classList.toggle('activa', si);
      if (si) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current');
      if (si && menu.scrollWidth > menu.clientWidth + 2) {
        var m = menu.getBoundingClientRect(), r = a.getBoundingClientRect();
        menu.scrollTo({ left: menu.scrollLeft + r.left - m.left - (m.width - r.width) / 2, behavior: 'smooth' });
      }
    });
  }
  if ('IntersectionObserver' in window) {
    var seccionEnRaya = {};
    var vigiaSecciones = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) { seccionEnRaya[e.target.id] = e.isIntersecting; });
      var id = null;
      SECCIONES.forEach(function (s) { if (seccionEnRaya[s]) id = CUENTA_COMO[s] || s; });
      marcarSeccion(id);
    }, { rootMargin: '-40% 0px -59% 0px' });
    SECCIONES.forEach(function (s) { var sec = document.getElementById(s); if (sec) vigiaSecciones.observe(sec); });
  }

  /* ── La inscripción: una losa con volutas que se desenrolla (CSS) y en la que la frase se escribe como
     código, letra a letra (escribir). grabar() hace las letras; encajar() decide las líneas y el tamaño ── */
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
    if (el.classList.contains('grabada')) el.classList.add('hecha');      // cambio de idioma: ya escrita
  }

  /* ENCAJAR, como centrar en Word: se buscan las líneas y el cuerpo de letra con los que la frase cabe
     entera entre las volutas, sin salirse, y el bloque queda en el centro de la cara lisa del mármol (la
     moldura de arriba es el 19 % del alto de la losa: el texto no la pisa). Las volutas no se deforman: su
     ancho sale del alto (proporción de las imágenes); si no caben enteras se achican y van a media altura */
  // la losa jónica policromada (05-oct, _tools/preparar_losa.py): el texto va en el panel interior, entre los junquillos
  var MOLDURA = 0.118, ZOCALO = 0.182, AIRE = 0.3, INTERLINEA = 1.25, VOLUTAS = 0.924 + 0.933, TOPE = 0.46;
  var regla = document.createElement('canvas').getContext('2d');
  function medir(txt, fs) {
    regla.font = '400 ' + fs + 'px "Mesa Entasis"';
    if ('fontKerning' in regla) regla.fontKerning = 'none';           // cada letra va en su caja: sin pares
    return regla.measureText(txt).width;
  }
  function repartos(anchos, espacio, cortesFijos) {               // todas las formas de partir la frase
    var m = anchos.length, todos = [];
    for (var mask = 0; mask < (1 << (m - 1)); mask++) {
      var ok = true;
      for (var k = 0; k < m - 1; k++) if (cortesFijos[k] && !(mask & (1 << k))) { ok = false; break; }   // tras la coma, se corta
      if (!ok) continue;
      var cortes = [], lineas = [], w = 0;
      for (var j = 0; j < m; j++) {
        w += anchos[j];
        if (j === m - 1 || (mask & (1 << j))) { lineas.push(w); w = 0; if (j < m - 1) cortes.push(j + 1); }
        else w += espacio;
      }
      var max = Math.max.apply(null, lineas);
      var cojo = lineas.reduce(function (s, x) { return s + Math.pow(1 - x / max, 2); }, 0) / lineas.length;   // líneas desparejas
      todos.push({ n: lineas.length, ancho: max, cortes: cortes, cojo: cojo });
    }
    return todos;
  }
  function cabeEn(ancho, lineas, em) {                             // el cuerpo mayor con el que cabe
    var lo = 4, hi = 400;
    for (var k = 0; k < 24; k++) {
      var f = (lo + hi) / 2;
      var alto = (lineas * INTERLINEA * f + 2 * AIRE * f) / (1 - MOLDURA - ZOCALO);
      var total = Math.min(VOLUTAS * alto, TOPE * ancho) + 0.6 * f + em * f;
      if (total <= ancho) lo = f; else hi = f;
    }
    return lo;
  }
  function plan(el) {                                              // medidas y todas las formas de partir la frase
    var losa = el.querySelector('.losa'), tx = el.querySelector('.losa__texto'), ps = el._palabras;
    if (!losa || !ps) return null;
    var antes = el.style.fontSize;                                 // medir sin deshacer lo que ya hubiera
    el.style.fontSize = '';
    var padre = el.parentNode, cs = getComputedStyle(padre);
    var ancho = (padre.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight)) * 0.97;
    var f0 = parseFloat(getComputedStyle(el).fontSize);
    el.style.fontSize = antes;
    var anchos = ps.map(function (p) { return medir(p.dataset.t, f0); });
    var espacio = medir(' ', f0);
    var conComa = el.hasAttribute('data-lineas') || el.hasAttribute('data-centrar');
    // data-corte: palabras con las que empieza un renglón cuando la frase se parte (en el móvil); p. ej. «qué|what»
    var corte = (el.getAttribute('data-corte') || '').toLowerCase().split('|').filter(Boolean);
    var fijos = ps.map(function (p, k) {
      if (k >= ps.length - 1) return false;
      return (conComa && /,$/.test(p.dataset.t)) || corte.indexOf(ps[k + 1].dataset.t.toLowerCase().replace(/[.,;:¿?¡!]/g, '')) >= 0;
    });
    var rs = repartos(anchos, espacio, fijos).filter(function (r) { return r.n <= 5; });
    rs.forEach(function (r) { r.f = Math.min(f0, cabeEn(ancho, r.n, r.ancho / f0)); });
    var todo = anchos.reduce(function (s, w) { return s + w; }, 0) + espacio * (ps.length - 1);   // en una línea, sin cortes
    return { losa: losa, tx: tx, ps: ps, ancho: ancho, f0: f0, rs: rs, minimo: fijos.indexOf(true) >= 0 ? 2 : 1,
             una: Math.min(f0, cabeEn(ancho, 1, todo / f0)) };
  }
  // fuerza: en una línea, con ese cuerpo; tope: cuerpo máximo; cuerpo: ese cuerpo, en las menos líneas en que quepa
  function ajustar(el, fuerza, tope, cuerpo) {
    var P = plan(el);
    if (!P) return;
    var losa = P.losa, tx = P.tx, ps = P.ps, ancho = P.ancho, f0 = P.f0;
    var elegido = fuerza ? { n: 1, f: fuerza, cortes: [] } : null;
    if (cuerpo) P.rs.forEach(function (r) {
      if (r.f < cuerpo * .999) return;
      if (!elegido || r.n < elegido.n || (r.n === elegido.n && r.cojo < elegido.cojo)) elegido = { n: r.n, f: cuerpo, cortes: r.cortes, cojo: r.cojo };
    });
    // la mejor: letra grande, pocas líneas y parejas (nada de una palabra corta sola en su línea)
    if (!elegido) P.rs.forEach(function (r) {
      var f = Math.min(tope || cuerpo || f0, r.f);
      var nota = f / f0 - 0.2 * (r.n - P.minimo) - 0.5 * r.cojo;
      if (!elegido || nota > elegido.nota) elegido = { n: r.n, f: f, cortes: r.cortes, nota: nota };
    });
    if (!elegido) return;
    // las líneas: se mueven las palabras (las mismas letras, por si se están escribiendo)
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
    // losa jónica (05-oct): si las volutas no caben, se achica la letra, no las volutas (encogidas, la cara
    // sobresalía por encima de ellas)
    if (i + d > tope && (vuelta || 0) < 3) return poner(el, losa, tx, f * tope / (i + d) * 0.99, n, ancho, (vuelta || 0) + 1);
    var estrecha = i + d > tope;
    if (estrecha) { var k = tope / (i + d); i *= k; d *= k; }
    losa.classList.toggle('losa--estrecha', estrecha);
    losa.style.setProperty('--ala-i', i.toFixed(1) + 'px');
    losa.style.setProperty('--ala-d', d.toFixed(1) + 'px');
  }
  var estelas = Array.prototype.slice.call(document.querySelectorAll('[data-estela]'));
  estelas.forEach(grabar);
  /* IGUALAR (05-oct, Javi: «a una línea los que quepan, con la letra algo más pequeña, para que esté toda la letra
     más igualada y no se vean tan grandes»): todos los titulares de sección en una línea y con el mismo cuerpo, el
     que le cabe al más largo; el lema final, en una línea y algo mayor que ellos. Si así quedaría demasiado pequeña
     (el móvil), cada uno se reparte en líneas como siempre */
  var SUELO = 0.6, SUELO_PX = 16, ESLOGAN = 1.3;                  // más pequeña no se lee (en el móvil, en líneas)
  function unaLinea(el) {                                          // el mayor cuerpo con el que cabe en una línea
    var P = plan(el);
    if (!P) return null;
    return { f0: P.f0, f: P.una };                                 // los cortes (coma, data-corte) son solo para varias líneas
  }
  function enDos(el) {                                             // el mayor cuerpo con el que cabe en dos renglones
    var P = plan(el);
    if (!P) return null;
    var dos = P.rs.filter(function (r) { return r.n <= 2; });
    return Math.max.apply(null, (dos.length ? dos : P.rs).map(function (r) { return r.f; }));
  }
  function igualar() {
    var titulos = estelas.filter(function (el) { return el.classList.contains('titulo'); });
    var medidas = titulos.map(unaLinea).filter(Boolean);
    if (!medidas.length) return;
    var comun = Math.min.apply(null, medidas.map(function (m) { return m.f; }));
    if (comun < SUELO * medidas[0].f0 || comun < SUELO_PX) {
      // en el móvil: todos con la misma letra, la mayor con la que cada uno cabe en dos renglones como mucho; cada
      // uno, en los menos renglones posibles con esa letra
      var cuerpo = Math.min.apply(null, titulos.map(enDos).filter(Boolean));
      titulos.forEach(function (el) { ajustar(el, null, null, cuerpo); });
      var menor = Math.min.apply(null, titulos.map(function (el) { return parseFloat(el.style.fontSize) || 999; }));
      titulos.forEach(function (el) { if (parseFloat(el.style.fontSize) > menor + .05) ajustar(el, null, null, menor); });
      return;
    }
    titulos.forEach(function (el) { ajustar(el, comun); });
    estelas.forEach(function (el) {
      if (!el.classList.contains('eslogan')) return;
      var m = unaLinea(el);
      if (m && m.f >= comun) ajustar(el, Math.min(m.f, comun * ESLOGAN));
      else ajustar(el);
    });
  }
  function ajustarTodas() { estelas.forEach(function (el) { ajustar(el); }); igualar(); }
  ajustarTodas();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(ajustarTodas);
  var tAjuste, anchoVentana = window.innerWidth;
  window.addEventListener('resize', function () {
    if (window.innerWidth === anchoVentana) return;               // en el móvil, la barra del navegador no cuenta
    anchoVentana = window.innerWidth;
    clearTimeout(tAjuste); tAjuste = setTimeout(ajustarTodas, 120);
  });

  /* ESCRIBIR (03-oct, sustituye a los signos de código, que parecían un virus): primero asoma la frase en
     sugerencia, en azul tenue, como la que propone un editor de código con IA; luego un cursor la teclea a ritmo
     de persona —ligero dentro de la palabra, una pausa entre palabras y tras las comas— y cada letra entra en azul
     y se queda tallada. La herramienta sugiere; la mano escribe. Las letras no cambian: nada se mueve.
     El color de la tecla va por palabras, como el logo: rojo, azul, rojo… (el rojo primero; Javi, 03-oct) */
  function ritmo(ls, base) {                                       // cuándo entra cada letra (ms); siempre el mismo
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
  var SUGERENCIA = 600;                                            // lo que se ve la sugerencia antes de teclear
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
        cursor.classList.add('tecleando');
        ponerCursor(l);
        l.classList.add('va', 'tecla');
        setTimeout(function () { l.classList.remove('tecla'); }, 200);
      }, SUGERENCIA + cuando[k]);
    });
    var fin = SUGERENCIA + cuando[cuando.length - 1];
    setTimeout(function () { cursor.classList.remove('tecleando'); }, fin + 250);   // al acabar, parpadea un poco
    setTimeout(function () {
      el.classList.add('hecha');
      el.classList.remove('sugerida');
      cursor.classList.remove('activo');
      setTimeout(function () { cursor.remove(); }, 400);
    }, fin + 1700);
  }
  /* lo mismo, para una línea suelta (el correo, «tecnología», el papel): sugerencia y tecla; el cursor es una
     raya fina pegada a la última letra. «cortes»: signos que también empiezan palabra nueva (en el correo, @ y .) */
  function codigo(el, letrasDe, paso, alAcabar, cortes) {
    var ls = letrasDe, ultima = null, pal = 0;
    ls.forEach(function (l, k) {
      if (k && ((ls[k - 1].dataset.c === ' ' && l.dataset.c !== ' ') || (cortes && cortes.indexOf(l.dataset.c) >= 0))) pal++;
      l.classList.toggle('rojo', pal % 2 === 0);
      l.classList.add('sug'); l.style.opacity = '.3';
    });
    var cuando = ritmo(ls, paso * 0.8), espera = SUGERENCIA * 0.65;
    ls.forEach(function (l, k) {
      setTimeout(function () {
        if (ultima) ultima.classList.remove('punta');
        l.classList.remove('sug');
        l.classList.add('tecla', 'punta');
        l.style.opacity = '1';
        ultima = l;
        setTimeout(function () { l.classList.remove('tecla'); }, 200);
      }, espera + cuando[k]);
    });
    var fin = espera + cuando[cuando.length - 1];
    setTimeout(function () { if (ultima) ultima.classList.add('parpadea'); }, fin + 200);
    setTimeout(function () {
      if (ultima) ultima.classList.remove('punta', 'parpadea');
      if (alAcabar) alAcabar();
    }, fin + 1300);
  }
  function enLetras(el, texto, clase) {                            // cada carácter en su caja, con su letra guardada
    el.textContent = '';
    return texto.split('').map(function (ch) {
      var l = document.createElement('span');
      l.className = clase + (ch === '1' ? ' uno' : ch === '0' ? ' cero' : '');
      l.dataset.c = ch; l.textContent = ch;
      el.appendChild(l);
      return l;
    });
  }


  /* ── ESCRIBIR, 2: la tablet. Pantalla clara con los colores de la marca (los pone el CSS, c-*) y el ritmo de
     alguien que escribe rápido. El código va en el idioma de la página (el inglés, en data-en) ── */
  var COL = { com: 'c-com', kw: 'c-kw', fn: 'c-fn', st: 'c-st', cte: 'c-cte', tx: 'c-tx' };
  var PAL = 'A-Za-z_áéíóúñÁÉÍÓÚÑ';
  var KW = /^(from|import|class|def|return|for|in|print)$/, CTE = /^(None|True|False|self)$/;
  function colorea(linea) {
    var out = [], m, antes = '';
    var re = new RegExp('(#.*$)|(f?"[^"]*"?)|([' + PAL + '][' + PAL + '0-9]*)|([0-9]+)|(\\s+)|(.)', 'g');
    while ((m = re.exec(linea)) && m[0]) {
      var c = COL.tx;
      if (m[1]) c = COL.com;
      else if (m[2]) c = COL.st;
      else if (m[3]) {
        c = KW.test(m[3]) ? COL.kw : CTE.test(m[3]) ? COL.cte
          : (antes === 'def' || antes === 'class' || linea[re.lastIndex] === '(') ? COL.fn : COL.tx;
        antes = m[3];
      } else if (m[4]) c = COL.cte;
      out.push([m[0], c]);
    }
    return out;
  }
  function horario(texto) {                                    // cuándo aparece cada letra (segundos)
    var semilla = 11, rnd = function () { semilla = (semilla * 16807) % 2147483647; return semilla / 2147483647; };
    var tiempos = [], ahora = 0;
    texto.split('\n').forEach(function (l, n) {
      if (n > 0) { ahora += 0.1 + rnd() * 0.12; tiempos.push(ahora); }
      var j = 0;
      while (l[j] === ' ') { tiempos.push(ahora); j++; }            // sangría automática del editor
      for (; j < l.length; j++) { ahora += 0.015 + rnd() * 0.022 + (',:('.indexOf(l[j - 1]) >= 0 ? 0.04 : 0); tiempos.push(ahora); }
    });
    return tiempos;
  }
  var escapa = function (s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;'); };
  function prepararEditor(fig) {
    var pre = fig.querySelector('[data-escribir]'), code = pre.querySelector('code');
    var textos = { es: code.textContent, en: pre.getAttribute('data-en') || code.textContent };
    var texto, lineas, tiempos, n = 0, listo = false;
    function cargar(lang) { texto = textos[lang] || textos.es; lineas = texto.split('\n').map(colorea); tiempos = horario(texto); }
    function pinta(n, cursor) {
      var html = '', q = n;
      for (var i = 0; i < lineas.length; i++) {
        var fila = '<span class="num">' + String(i + 1).padStart(2, ' ') + '</span>  ';
        for (var k = 0; k < lineas[i].length && q > 0; k++) {
          var parte = lineas[i][k][0].slice(0, q); q -= parte.length;
          fila += '<span class="' + lineas[i][k][1] + '">' + escapa(parte) + '</span>';
        }
        if (q <= 0) { html += fila + (cursor ? '<span class="cursor"></span>' : ''); break; }
        q -= 1; html += fila + '\n';
      }
      code.innerHTML = html;
    }
    var alto = 0;                                              // el hueco del más largo de los dos, para que nada salte
    ['en', 'es'].forEach(function (lang) { cargar(lang); pinta(texto.length, false); alto = Math.max(alto, pre.offsetHeight); });
    // en em y no en px: si la letra cambia con el ancho (la tablet del aperitivo), el hueco cambia con ella
    pre.style.minHeight = (alto / (parseFloat(getComputedStyle(pre).fontSize) || 16)).toFixed(3) + 'em';
    cargar(idioma);
    alIdioma.push(function (lang) {                            // al cambiar de idioma, el mismo punto en el otro texto
      cargar(lang);
      pinta(listo ? texto.length : Math.min(n, texto.length), !listo);
    });
    if (QUIETO) { listo = true; pinta(texto.length, false); fig.classList.add('ejecutado'); return function () {}; }
    pinta(0, true);
    /* EN BUCLE (15-oct, Javi: «que se reescriba a sí misma, que no acabe… para que parezca viva, igual que la cadena»):
       escrita y ejecutada, se deja leer unos segundos, se borra deprisa de abajo arriba y vuelve a escribirse. Solo
       mientras se ve: fuera de la pantalla espera y sigue al volver */
    var PAUSA = 4500, BORRA = 900, vista = true, esperando = false;
    if ('IntersectionObserver' in window) new IntersectionObserver(function (e) {
      vista = e[0].isIntersecting;
      if (vista && esperando) { esperando = false; borrar(); }
    }, { rootMargin: '80px 0px' }).observe(fig);
    function teclear() {
      listo = false; n = 0; fig.classList.remove('ejecutado');
      var t0 = performance.now();
      (function paso(ahora) {
        var s = (ahora - t0) / 1000;
        var antes = n;
        while (n < tiempos.length && tiempos[n] <= s) n++;
        if (n !== antes) pinta(n, true);
        if (n < tiempos.length) requestAnimationFrame(paso);
        else setTimeout(function () {
          listo = true; pinta(texto.length, false); fig.classList.add('ejecutado');
          setTimeout(otraVez, PAUSA);
        }, 600);
      })(t0);
    }
    function otraVez() { if (vista) borrar(); else esperando = true; }
    function borrar() {
      listo = false; fig.classList.remove('ejecutado');
      var total = texto.length, t0 = performance.now();
      (function paso(ahora) {
        var k = Math.max(0, Math.round(total * (1 - (ahora - t0) / BORRA)));
        if (k !== n) { n = k; pinta(k, true); }
        if (k > 0) requestAnimationFrame(paso); else setTimeout(teclear, 350);
      })(t0);
    }
    return function (espera) { setTimeout(teclear, espera || 0); };
  }

  var SVGNS = 'http://www.w3.org/2000/svg';
  /* ── EL ÁNFORA (04-oct; Javi eligió este storyboard entre tres: «me encantan los dibujos»). Cómo nos relacionamos
     con las herramientas, contado en un taller griego, en seis tiempos que se encienden al lado:
     1 tu idea: el cliente trae la necesidad y cada respuesta (aceite, premio, viaje) le da forma a la vasija;
     2 el diseño: guías, compás, el perfil a lápiz, la decoración planeada y la plantilla, antes de ninguna máquina;
     3 el torno (la máquina, en rojo): el perfil gira y sale el volumen en segundos, y copias;
     4 la mano: las asas y la pintura, a pincel; 5 el criterio: al salir del horno una se raja, otra vuelve y la
     buena se mide contra el dibujo; 6 la firma, «ΜΕΣΑ 10 ΕΠΟΙΗΣΕΝ» («me hizo»), y se entrega.
     Ilustraciones: 5_audiovisual/anfora (generar.py → procesar.py → img/anfora). Todo es función del tiempo t: cada
     pista dice cuánto vale una propiedad en cada momento, así que un clic en un paso salta a él ── */
  function prepararAnfora(fig) {
    var svg = fig.querySelector('svg'), capa = svg.querySelector('.af-capa'), defs = svg.querySelector('defs');
    var pasos = [].slice.call(fig.querySelectorAll('.taller__pasos li'));
    var hilo = [].slice.call(fig.querySelectorAll('.taller__hilo i'));
    var A = 'img/anfora/', CAJA = 879 / 1531, DUR = 34, INI = [0, 7, 13.6, 17.2, 22.6, 27.8];
    /* perfil del ánfora sin asas (procesar.py → medidas.json): altura y radio, en altos de ánfora */
    var PY = [.002,.018,.033,.049,.065,.080,.096,.112,.127,.143,.159,.174,.190,.206,.221,.237,.253,.269,.284,.300,.316,.331,.347,.362,.378,.394,.409,.425,.441,.457,.472,.488,.504,.519,.535,.551,.566,.582,.598,.613,.629,.645,.660,.676,.692,.707,.723,.739,.754,.770,.786,.801,.817,.833,.849,.864,.880,.895,.911,.927,.943,.958,.974,.990,.996];
    var PR = [.053,.155,.173,.156,.136,.128,.123,.120,.118,.117,.116,.117,.118,.120,.124,.130,.139,.154,.183,.208,.224,.236,.246,.256,.264,.270,.276,.279,.282,.283,.284,.283,.282,.280,.278,.274,.271,.267,.262,.258,.252,.246,.240,.234,.227,.220,.212,.204,.196,.187,.177,.168,.157,.146,.133,.120,.105,.097,.110,.134,.159,.164,.154,.104,.049];
    var P = {}, PISTAS = [], sucio = [], imgs = [];

    function nuevo(tag, at, padre) {
      var e = document.createElementNS(SVGNS, tag);
      Object.keys(at || {}).forEach(function (k) { e.setAttribute(k, at[k]); });
      (padre || capa).appendChild(e);
      return e;
    }
    function imagen(src, x, y, w, h, padre, at) {
      var e = nuevo('image', Object.assign({ x: +x.toFixed(1), y: +y.toFixed(1), width: +w.toFixed(1), height: +h.toFixed(1), preserveAspectRatio: 'none' }, at || {}), padre);
      e._src = A + src + '.webp'; imgs.push(e);
      return e;
    }
    function pieza(nombre, padre, x, y, s, at) {                // grupo que se mueve: x, y, giro r, escala s (y sx)
      var g = nuevo('g', at, padre);
      P[nombre] = { el: g, x: x || 0, y: y || 0, r: 0, s: s || 1, sx: 1 };
      componer(P[nombre]);
      return g;
    }
    function trazo(nombre, d, clase, padre, at) {               // línea que se dibuja (o se apaga)
      var e = nuevo('path', Object.assign({ d: d, class: clase || '' }, at || {}), padre);
      P[nombre] = { el: e };
      return e;
    }
    function anforaEn(src, H, padre, at) { return imagen(src, -H * CAJA / 2, -H, H * CAJA, H, padre, at); }   // pie en (0,0)
    function radio(y) {
      for (var i = 1; i < PY.length; i++) if (y <= PY[i]) return PR[i - 1] + (PR[i] - PR[i - 1]) * (y - PY[i - 1]) / (PY[i] - PY[i - 1]);
      return PR[PR.length - 1];
    }
    function f1(n) { return +n.toFixed(1); }
    function lado(H, rr, s) {                                    // medio contorno: s=1 derecho (de arriba abajo), s=-1 izquierdo (de abajo arriba)
      var pts = PY.map(function (y, i) { return f1(s * (rr || PR)[i] * H) + ' ' + f1(-H + y * H); });
      if (s < 0) pts.reverse();
      return 'M' + pts.join('L');
    }
    function contorno(H, rr) { return lado(H, rr, 1) + lado(H, rr, -1).replace('M', 'L') + 'Z'; }
    function mueve(nombre, k, claves) { PISTAS.push({ p: P[nombre], k: k, c: claves }); }
    function ve(nombre, claves) { mueve(nombre, 'o', claves); }
    function dibuja(nombre, t0, t1, curva) { mueve(nombre, 'd', [[t0, 0], [t1, 1, curva || 'io']]); }
    function ventana(t0, t1, f) { return [[t0, 0], [t0 + f, 1], [t1, 1], [t1 + f, 0]]; }
    function mano(nombre, tramos) { PISTAS.push({ p: P[nombre], k: 'mano', tramos: tramos }); }

    /* ── 1 · TU IDEA ── */
    var e1 = pieza('e1');
    imagen('taller', 0, 0, 1536, 1024, e1);
    [[1152, 282, 7], [1128, 250, 10], [1098, 214, 14]].forEach(function (b, i) {
      nuevo('circle', { r: b[2], class: 'af-pompa' }, pieza('b' + i, e1, b[0], b[1]));
    });
    [['idea_aceite', 555, 180, 168, 300 / 513], ['idea_corona', 800, 122, 118, 300 / 255], ['idea_barco', 1045, 172, 124, 300 / 252]].forEach(function (d, i) {
      var w = d[3] * d[4];
      imagen(d[0], -w / 2, -d[3] / 2, w, d[3], pieza('i' + i, e1, d[1], d[2]));
    });
    trazo('h0', 'M558 268C585 390 640 470 694 528', 'af-hilo', e1);
    trazo('h1', 'M800 186C800 260 797 314 795 362', 'af-hilo', e1);
    trazo('h2', 'M1035 238C1015 330 950 384 892 408', 'af-hilo', e1);
    var v1 = pieza('v1', e1, 795, 712), H1 = 340;
    var RA = PY.map(function (y) { return .12 + .11 * Math.pow(Math.sin(Math.PI * y), .9); });
    var RB = PY.map(function (y, i) { return RA[i] + .07 * Math.exp(-Math.pow((y - .55) / .18, 2)); });
    var forma = function (f) {                                   // la vasija que va saliendo de las respuestas
      var a = f < 1 ? RA : RB, b = f < 1 ? RB : PR, x = f < 1 ? f : f - 1;
      return contorno(H1, a.map(function (v, i) { return v + (b[i] - v) * x; }));
    };
    trazo('v1d', forma(0), 'af-boceto af-boceto--raya', v1);
    trazo('v1a', 'M46 -318C68 -334 92 -326 92 -300L92 -236C92 -228 90 -222 86 -216M-46 -318C-68 -334 -92 -326 -92 -300L-92 -236C-92 -228 -90 -222 -86 -216', 'af-boceto af-boceto--raya', v1);
    trazo('v1s', contorno(H1) + 'M46 -318C68 -334 92 -326 92 -300L92 -236C92 -228 90 -222 86 -216M-46 -318C-68 -334 -92 -326 -92 -300L-92 -236C-92 -228 -90 -222 -86 -216', 'af-boceto', v1);

    /* ── 2 · EL DISEÑO (todo en coordenadas del dibujo: pie del ánfora en 520, 905) ── */
    var e2 = pieza('e2'), H2 = 790;
    imagen('papel', 0, 0, 1536, 1024, e2);
    var v2 = pieza('v2', e2, 520, 905);
    var yb = [0, .151, .472, .9, 1].map(function (y) { return f1(-H2 + y * H2); });
    trazo('g0', 'M0 25V-815', 'af-guia', v2);
    yb.forEach(function (y, i) { trazo('g' + (i + 1), 'M-250 ' + y + 'H250', 'af-guia', v2); });
    trazo('rh', 'M250 -790V0', 'af-nada', v2);
    var R2 = radio(.472) * H2, yv = -H2 + .472 * H2;
    var arco = function (g) { return [f1(R2 * Math.cos(g * Math.PI / 180)), f1(yv + R2 * Math.sin(g * Math.PI / 180))]; };
    trazo('arco', 'M' + arco(-38).join(' ') + 'A' + f1(R2) + ' ' + f1(R2) + ' 0 0 1 ' + arco(38).join(' '), 'af-guia af-guia--azul', v2);
    var sc = R2 / 402.3, compas = pieza('compas', v2, 0, yv);
    imagen('compas', -4 * sc, -868 * sc, 420 * sc, 873 * sc, compas);
    trazo('p2r', lado(H2, null, 1), 'af-perfil', v2);
    trazo('p2l', lado(H2, null, -1), 'af-perfil', v2);
    trazo('z1', 'M-150 -561H150V-262H-150Z', 'af-zona', v2);
    trazo('z2', 'M-196 -236H196M-176 -182H176', 'af-zona', v2);
    [['plan_figura', 380, -755, 360, 267, 'M380 -621H740', 290], ['plan_meandro', 380, -450, 360, 76, 'M380 -412H740', 96],
     ['plan_olivo', 380, -345, 360, 85, 'M380 -302H740', 104]].forEach(function (d, i) {
      var m = nuevo('mask', { id: 'afW' + i, maskUnits: 'userSpaceOnUse', x: -2000, y: -2000, width: 5000, height: 5000 }, defs);
      trazo('w' + i, d[5], 'af-mascara', m, { 'stroke-width': d[6] });
      imagen(d[0], d[1], d[2], d[3], d[4], v2, { mask: 'url(#afW' + i + ')' });
    });
    trazo('c1', 'M375 -621C300 -600 220 -520 155 -470', 'af-zona', v2);
    trazo('c2', 'M375 -412C320 -380 250 -300 200 -244', 'af-zona', v2);
    trazo('rw', 'M380 -640L740 -600L400 -430L740 -400L400 -320L740 -296', 'af-nada', v2);
    imagen('plantilla', -80, -150, 160.5, 300, pieza('plantilla', v2, 1100, -105));
    var lap = pieza('lapiz', v2, 1150, -100), sl = .62;
    imagen('mano_lapiz', -3.6 * sl, -443.2 * sl, 560 * sl, 447 * sl, lap);

    /* ── 3 · EL TORNO (la máquina) ── */
    var e3 = pieza('e3'), H3 = 430;
    imagen('torno', 0, 0, 1536, 1024, e3);
    [[240, 30, 'a'], [262, 40, 'b'], [285, 50, 'c']].forEach(function (d) {
      nuevo('ellipse', { cx: 600, cy: 592, rx: d[0], ry: d[1], class: 'af-giro af-giro--' + d[2] }, e3);
    });
    var v3 = pieza('v3', e3, 600, 588);
    var m3 = nuevo('mask', { id: 'afM3', maskUnits: 'userSpaceOnUse', x: -2000, y: -2000, width: 5000, height: 5000 }, defs);
    trazo('m3', 'M0 12V-445', 'af-mascara', m3, { 'stroke-width': 300, 'stroke-linecap': 'butt' });
    anforaEn('anfora_sin_asas', H3, v3, { mask: 'url(#afM3)' });
    trazo('p3', lado(H3, null, 1), 'af-perfil', pieza('p3g', v3));
    var copias = [[930, 170], [1130, 170], [1330, 170], [930, 397], [1130, 397], [1330, 397]];
    copias.forEach(function (c, i) { anforaEn('anfora_sin_asas', H3, pieza('k' + i, e3, 600, 588)); });
    var mt = pieza('mt', e3, 200, 380), st = .62;
    imagen('mano_torno', -516.8 * st, -140.6 * st, 520 * st, 276 * st, mt);

    /* ── 4 · LA MANO (asas y pintura) ── */
    var e4 = pieza('e4'), H4 = 620;
    imagen('mesa', 0, 0, 1536, 1024, e4);
    var v4 = pieza('v4', e4, 830, 714);
    anforaEn('anfora_sin_asas', H4, v4);
    [['afCi', -400], ['afCd', 0]].forEach(function (c) {
      nuevo('rect', { x: c[1], y: -800, width: 400, height: 900 }, nuevo('clipPath', { id: c[0], clipPathUnits: 'userSpaceOnUse' }, defs));
    });
    anforaEn('anfora_asas', H4, pieza('ai', v4, -140, 0), { 'clip-path': 'url(#afCi)' });
    anforaEn('anfora_asas', H4, pieza('ad', v4, 140, 0), { 'clip-path': 'url(#afCd)' });
    anforaEn('anfora_boceto', H4, pieza('bo', v4));
    var zig = [], fila = 0;   // pares [x, y]
    for (var y = -H4 + 30; y < -10; y += 76, fila++) {          // el pincel barre de arriba abajo, de lado a lado
      var yy = (y + H4) / H4, ancho = Math.max(radio(yy), yy > .03 && yy < .42 ? .3 : 0) * H4 + 26;
      zig.push([f1(fila % 2 ? ancho : -ancho), f1(y)], [f1(fila % 2 ? -ancho : ancho), f1(y)]);
    }
    var m4 = nuevo('mask', { id: 'afM4', maskUnits: 'userSpaceOnUse', x: -2000, y: -2000, width: 5000, height: 5000 }, defs);
    var dzig = 'M' + zig.map(function (p) { return p.join(' '); }).join('L');
    trazo('m4', dzig, 'af-mascara', m4, { 'stroke-width': 118 });
    anforaEn('anfora', H4, v4, { mask: 'url(#afM4)' });
    trazo('rz', dzig, 'af-nada', v4);
    var pin = pieza('pincel', v4, 520, -200), sp = .5;
    imagen('mano_pincel', -3.3 * sp, -407.7 * sp, 560 * sp, 411 * sp, pin);

    /* ── 5 · EL CRITERIO (al salir del horno) ── */
    var e5 = pieza('e5'), H5 = 260;
    imagen('horno', 0, 0, 1536, 1024, e5);
    var brillo = nuevo('radialGradient', { id: 'afBrillo' }, defs);
    nuevo('stop', { offset: 0, 'stop-color': '#d8573a', 'stop-opacity': '.55' }, brillo);
    nuevo('stop', { offset: 1, 'stop-color': '#792911', 'stop-opacity': '0' }, brillo);
    nuevo('ellipse', { cx: 310, cy: 420, rx: 230, ry: 250, fill: 'url(#afBrillo)', class: 'af-brillo' }, e5);
    var grieta = [[12, -238], [-4, -196], [14, -158], [-8, -112], [10, -70], [-6, -28], [4, 0]];
    var gtxt = grieta.map(function (p) { return p.join(' '); });
    nuevo('path', { d: 'M-130 -280L12 -280L' + gtxt.join('L') + 'L4 12L-130 12Z' }, nuevo('clipPath', { id: 'afK1', clipPathUnits: 'userSpaceOnUse' }, defs));
    nuevo('path', { d: 'M12 -280L130 -280L130 12L4 12L' + gtxt.slice().reverse().join('L') + 'Z' }, nuevo('clipPath', { id: 'afK2', clipPathUnits: 'userSpaceOnUse' }, defs));
    var k1 = pieza('q1', e5, 310, 592, .75);
    anforaEn('anfora', H5, pieza('q1a', k1), { 'clip-path': 'url(#afK1)' });
    anforaEn('anfora', H5, pieza('q1b', k1), { 'clip-path': 'url(#afK2)' });
    trazo('grieta', 'M' + gtxt.join('L'), 'af-grieta', k1);
    var k2 = pieza('q2', e5, 310, 592, .75);
    anforaEn('anfora', H5, k2);
    nuevo('ellipse', { cx: 12, cy: -150, rx: 9, ry: 6, class: 'af-mancha' }, pieza('mancha', k2));
    trazo('cerco', 'M12 -178A28 28 0 1 1 11.9 -178', 'af-perfil af-perfil--fino', k2);
    trazo('flecha', 'M1000 352C880 230 600 220 450 300M474 274L450 300L480 312', 'af-perfil af-perfil--fino', e5);
    var k3 = pieza('q3', e5, 310, 592, .75);
    anforaEn('anfora', H5, k3);
    trazo('o5', contorno(640), 'af-perfil af-perfil--mide', pieza('o5g', e5, 1000, 985));
    trazo('ok5', 'M1218 420l24 26l50 -60', 'af-perfil af-perfil--ok', e5);

    /* ── 6 · LA FIRMA (y se entrega) ── */
    var e6 = pieza('e6'), H6 = 440, s6 = H6 / 1531;
    imagen('entrega', 0, 0, 1536, 1024, e6);
    var v6 = pieza('v6', e6, 715, 585);
    anforaEn('anfora', H6, v6);
    var firma = nuevo('g', { transform: 'translate(' + f1(-H6 * CAJA / 2) + ' ' + (-H6) + ') scale(' + s6.toFixed(4) + ')' }, v6);
    var LETRA = {                                                // mayúsculas griegas a trazo, alto 1 (como en las vasijas)
      'Μ': [.8, 'M0 1L0 0L.4 .62L.8 0L.8 1'], 'Ε': [.55, 'M.55 0H0V1H.55M0 .5H.45'], 'Σ': [.6, 'M.6 0H0L.32 .5L0 1H.6'],
      'Α': [.64, 'M0 1L.32 0L.64 1M.12 .62H.52'], '1': [.38, 'M.08 .2L.3 0V1'], '0': [.56, 'M.28 0C.5 0 .56 .25 .56 .5C.56 .75 .5 1 .28 1C.06 1 0 .75 0 .5C0 .25 .06 0 .28 0'],
      'Π': [.6, 'M0 1V0H.6V1'], 'Ο': [.7, 'M.35 0C.6 0 .7 .22 .7 .5C.7 .78 .6 1 .35 1C.1 1 0 .78 0 .5C0 .22 .1 0 .35 0'],
      'Ι': [0, 'M0 0V1'], 'Η': [.6, 'M0 0V1M.6 0V1M0 .5H.6'], 'Ν': [.62, 'M0 1V0L.62 1V0']
    };
    var letras = [];
    [['ΜΕΣΑ 10', 123, 470], ['ΕΠΟΙΗΣΕΝ', 123, 530]].forEach(function (l) {
      var x = l[1], alto = 42;
      l[0].split('').forEach(function (c) {
        if (c === ' ') { x += alto * .35; return; }
        var L = LETRA[c];
        var g = nuevo('g', { transform: 'translate(' + f1(x) + ' ' + l[2] + ') scale(' + alto + ')' }, firma);
        letras.push(trazo('l' + letras.length, L[1], 'af-letra' + (c === '1' ? ' af-letra--uno' : ''), g));
        x += (L[0] + .26) * alto;
      });
    });
    trazo('rf1', 'M123 512H372', 'af-nada', firma);
    trazo('rf2', 'M123 572H396', 'af-nada', firma);
    var pf = nuevo('g', {}, firma); P.pf = { el: pf, x: 950, y: 950, r: 0, s: 1, sx: 1 }; componer(P.pf);
    var sf = .44;
    imagen('mano_pincel', -3.3 * sf, -407.7 * sf, 560 * sf, 411 * sf, pf);
    var foco = [715 - H6 * CAJA / 2 + 259 * s6, 585 - H6 + 521 * s6];

    /* ── LA PARTITURA (segundos) ── */
    ve('e1', [[0, 0], [.5, 1, 'o'], [6.8, 1], [7.3, 0]]);
    mueve('e1', 'cam', [[0, [768, 512, 1]], [7.3, [795, 560, 1.1], 'io']]);
    ['b0', 'b1', 'b2'].forEach(function (b, i) { var t0 = .9 + i * .2; ve(b, [[t0, 0], [t0 + .25, 1]]); mueve(b, 's', [[t0, .3], [t0 + .35, 1, 'b']]); });
    [1.6, 2.9, 4.2].forEach(function (t0, i) {
      ve('i' + i, [[t0, 0], [t0 + .3, 1]]);
      mueve('i' + i, 's', [[t0, .55], [t0 + .45, 1, 'b']]);
      dibuja('h' + i, t0 + .35, t0 + .75);
      ve('h' + i, [[t0 + .35, 1], [6.0, 1], [6.4, 0]]);
    });
    ve('v1d', [[2.0, 0], [2.4, 1], [5.6, 1], [6.1, 0]]);
    mueve('v1d', 'forma', [[2.35, 0], [2.95, 1], [3.65, 1], [4.25, 2]]);
    ve('v1a', [[4.95, 0], [5.4, 1], [5.6, 1], [6.1, 0]]);
    ve('v1s', [[5.6, 0], [6.1, 1]]);

    ve('e2', [[6.8, 0], [7.3, 1], [13.4, 1], [13.8, 0]]);
    mueve('e2', 'cam', [[6.8, [768, 512, 1.05]], [13.8, [768, 512, 1], 'o']]);
    dibuja('g0', 7.5, 7.9);
    [1, 2, 3, 4, 5].forEach(function (k) { dibuja('g' + k, 7.9 + (k - 1) * .12, 8.15 + (k - 1) * .12); });
    ve('compas', [[8.6, 0], [8.8, 1], [9.85, 1], [10.1, 0]]);
    mueve('compas', 'r', [[8.8, -35.9], [9.8, 40.1, 'io']]);
    dibuja('arco', 8.8, 9.8);
    dibuja('p2r', 10.0, 11.0, 'l');
    dibuja('p2l', 11.0, 11.5, 'l');
    dibuja('z1', 11.6, 11.95, 'l');
    dibuja('z2', 11.95, 12.1);
    dibuja('w0', 12.1, 12.3, 'l'); dibuja('w1', 12.3, 12.5, 'l'); dibuja('w2', 12.5, 12.7, 'l');
    dibuja('c1', 12.3, 12.6); dibuja('c2', 12.5, 12.8);
    mueve('plantilla', 'x', [[12.4, 1100], [12.95, 720, 'o']]);
    mueve('plantilla', 'r', [[12.4, 14], [12.95, -4, 'o']]);
    mano('lapiz', [[7.0, 7.5, [1150, -100], [0, 25]], [7.5, 7.9, 'g0'], [7.9, 8.0, [0, -815], [250, -790]], [8.0, 8.5, 'rh'],
                   [8.5, 8.8, [250, 0], [430, -120]], [9.75, 10.0, [430, -120], [42, -790]], [10.0, 11.0, 'p2r'], [11.0, 11.5, 'p2l'],
                   [11.5, 11.6, [-42, -790], [-150, -561]], [11.6, 11.95, 'z1'], [11.95, 12.1, [-150, -561], [380, -640]],
                   [12.1, 12.7, 'rw'], [12.75, 13.2, [740, -296], [1150, 60]]]);

    ve('e3', [[13.4, 0], [13.8, 1], [17.0, 1], [17.4, 0]]);
    mueve('e3', 'c', [[13.5, 0, 'l'], [13.51, 1, 'l'], [17.3, 1, 'l'], [17.31, 0, 'l']]);
    ve('p3g', [[13.7, 0], [13.9, 1], [14.85, 1], [15.1, 0]]);
    mueve('p3g', 'sx', [[14.0, 1], [14.9, -1, 'io']]);
    dibuja('m3', 14.0, 14.9);
    mueve('mt', 'x', [[13.9, 140], [14.25, 474, 'o'], [15.0, 474], [15.35, 120, 'i']]);
    mueve('mt', 'y', [[13.9, 400], [14.25, 361, 'o'], [15.0, 361], [15.35, 410, 'i']]);
    ve('mt', [[13.9, 0], [14.1, 1], [15.2, 1], [15.35, 0]]);
    copias.forEach(function (c, i) {
      var t0 = 15.0 + i * .15;
      ve('k' + i, [[t0, 0], [t0 + .06, 1]]);
      mueve('k' + i, 'x', [[t0, 600], [t0 + .42, c[0], 'o']]);
      mueve('k' + i, 'y', [[t0, 588], [t0 + .42, c[1], 'o']]);
      mueve('k' + i, 's', [[t0, 1], [t0 + .42, 140 / H3, 'o']]);
    });

    ve('e4', [[17.0, 0], [17.4, 1], [22.4, 1], [22.8, 0]]);
    ve('ai', [[17.5, 0], [17.7, 1]]); mueve('ai', 'x', [[17.5, -140], [18.0, 0, 'o']]);
    ve('ad', [[17.7, 0], [17.9, 1]]); mueve('ad', 'x', [[17.7, 140], [18.2, 0, 'o']]);
    ve('bo', [[18.3, 0], [18.7, 1]]);
    dibuja('m4', 18.85, 21.6, 'l');
    mano('pincel', [[18.45, 18.85, [520, -200], zig[0]], [18.85, 21.6, 'rz'], [21.65, 22.1, zig[zig.length - 1], [720, -780]]]);

    ve('e5', [[22.4, 0], [22.8, 1], [27.6, 1], [28.0, 0]]);
    [['q1', 790], ['q2', 1040], ['q3', 1290]].forEach(function (k, i) {
      var t0 = 22.9 + i * .15;
      if (i !== 1) ve(k[0], [[t0, 0], [t0 + .15, 1]]);
      if (i) return;                                            // la 2 y la 3 tienen más viaje: abajo
      mueve(k[0], 'x', [[t0, 310], [t0 + .6, k[1], 'o']]);
      mueve(k[0], 'y', [[t0, 592], [t0 + .6, 630, 'o']]);
      mueve(k[0], 's', [[t0, .75], [t0 + .6, 1, 'o']]);
    });
    dibuja('grieta', 24.0, 24.3);
    ve('grieta', [[24.0, 1], [24.4, 1], [24.55, 0]]);
    mueve('q1a', 'x', [[24.4, 0], [25.0, -40, 'i']]); mueve('q1a', 'y', [[24.4, 0], [25.0, 150, 'i']]); mueve('q1a', 'r', [[24.4, 0], [25.0, -28, 'i']]);
    mueve('q1b', 'x', [[24.4, 0], [25.0, 36, 'i']]); mueve('q1b', 'y', [[24.4, 0], [25.0, 160, 'i']]); mueve('q1b', 'r', [[24.4, 0], [25.0, 22, 'i']]);
    ve('q1a', [[24.7, 1], [25.0, 0]]); ve('q1b', [[24.7, 1], [25.0, 0]]);
    ve('mancha', [[24.55, 0], [24.65, 1]]);
    dibuja('cerco', 24.7, 25.0);
    dibuja('flecha', 25.0, 25.3);
    ve('flecha', [[25.0, 1], [25.6, 1], [25.9, 0]]);
    mueve('q2', 'x', [[23.05, 310], [23.65, 1040, 'o'], [25.3, 1040], [25.9, 310, 'io']]);
    mueve('q2', 'y', [[23.05, 592], [23.65, 630, 'o'], [25.3, 630], [25.9, 592, 'io']]);
    mueve('q2', 's', [[23.05, .75], [23.65, 1, 'o'], [25.3, 1], [25.9, .7, 'io']]);
    ve('q2', [[23.05, 0], [23.2, 1], [25.6, 1], [25.9, 0]]);
    mueve('q3', 'x', [[23.2, 310], [23.8, 1290, 'o'], [25.6, 1290], [26.3, 1000, 'io']]);
    mueve('q3', 'y', [[23.2, 592], [23.8, 630, 'o'], [25.6, 630], [26.3, 985, 'io']]);
    mueve('q3', 's', [[23.2, .75], [23.8, 1, 'o'], [25.6, 1], [26.3, 640 / H5, 'io']]);
    dibuja('o5', 26.3, 27.0);
    dibuja('ok5', 27.0, 27.25, 'o');

    ve('e6', [[27.6, 0], [28.0, 1], [33.4, 1], [34, 0]]);
    mueve('e6', 'cam', [[27.8, [foco[0], foco[1], 5]], [29.9, [foco[0], foco[1], 5]], [31.4, [768, 512, 1], 'io']]);
    letras.forEach(function (l, i) {
      var t0 = i < 6 ? 28.1 + i * .125 : 28.95 + (i - 6) * .094;
      dibuja('l' + i, t0, t0 + (i < 6 ? .12 : .09), 'l');
    });
    mano('pf', [[27.85, 28.1, [950, 950], [123, 512]], [28.1, 28.85, 'rf1'], [28.85, 28.95, [372, 512], [123, 572]], [28.95, 29.7, 'rf2'],
                [29.7, 30.1, [396, 572], [1000, 1000]]]);

    /* ── el motor ── */
    var CURVA = {
      l: function (x) { return x; },
      io: function (x) { return x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; },
      o: function (x) { return 1 - Math.pow(1 - x, 3); },
      i: function (x) { return x * x * x; },
      b: function (x) { return 1 + 2.70158 * Math.pow(x - 1, 3) + 1.70158 * Math.pow(x - 1, 2); }
    };
    function mezcla(a, b, x) { return typeof a === 'number' ? a + (b - a) * x : a.map(function (v, i) { return v + (b[i] - v) * x; }); }
    function valor(c, t) {
      if (t <= c[0][0]) return c[0][1];
      for (var i = 1; i < c.length; i++) if (t < c[i][0]) {
        var a = c[i - 1], b = c[i];
        return mezcla(a[1], b[1], CURVA[b[2] || 'io']((t - a[0]) / (b[0] - a[0])));
      }
      return c[c.length - 1][1];
    }
    function largo(el) { if (el._largo == null) el._largo = el.getTotalLength(); return el._largo; }
    function punto(q, t) {                                       // dónde está la mano: en un tramo recto o siguiendo una línea
      var tr = q.tramos, i, u;
      for (i = 0; i < tr.length; i++) if (t < tr[i][1]) break;
      if (i === tr.length) { i = tr.length - 1; u = 1; }
      else u = Math.max(0, (t - tr[i][0]) / (tr[i][1] - tr[i][0]));
      if (t < tr[i][0] && i > 0) { i--; u = 1; }
      var s = tr[i];
      if (typeof s[2] === 'string') {
        var ruta = P[s[2]].el, pt = ruta.getPointAtLength(Math.min(1, u) * largo(ruta));
        return [pt.x, pt.y];
      }
      return mezcla(s[2], s[3], CURVA.io(Math.min(1, u)));
    }
    function componer(p) {
      if (p.cam) {
        var c = p.cam;
        p.el.setAttribute('transform', 'translate(768 512) scale(' + c[2].toFixed(4) + ') translate(' + (-c[0]).toFixed(1) + ' ' + (-c[1]).toFixed(1) + ')');
        return;
      }
      p.el.setAttribute('transform', 'translate(' + p.x.toFixed(1) + ' ' + p.y.toFixed(1) + ')' + (p.r ? ' rotate(' + p.r.toFixed(2) + ')' : '') +
        (p.s !== 1 || p.sx !== 1 ? ' scale(' + (p.s * p.sx).toFixed(4) + ' ' + p.s.toFixed(4) + ')' : ''));
    }
    function aplicar(q, t) {
      var p = q.p, el = p.el, v;
      if (q.k === 'mano') { v = punto(q, t); p.x = v[0]; p.y = v[1]; sucio.push(p); return; }
      v = valor(q.c, t);
      if (q.k === 'o') { el.style.opacity = v.toFixed(3); el.style.visibility = v < .003 ? 'hidden' : ''; }
      else if (q.k === 'd') {
        var L = largo(el);
        el.style.strokeDasharray = L.toFixed(1) + ' ' + (L + 2).toFixed(1);
        el.style.strokeDashoffset = (L * (1 - v)).toFixed(1);
        if (!el.classList.contains('af-mascara')) el.style.visibility = v < .002 ? 'hidden' : '';
      }
      else if (q.k === 'forma') el.setAttribute('d', forma(v));
      else if (q.k === 'c') el.classList.toggle('gira', v >= .5);
      else { if (q.k === 'cam') p.cam = v; else p[q.k] = v; sucio.push(p); }
    }
    var t = 0, ultimo = null, visible = false, andando = false, cargado = false, empezado = false;
    function pintar(tt) {
      for (var i = 0; i < PISTAS.length; i++) aplicar(PISTAS[i], tt);
      for (var j = 0; j < sucio.length; j++) componer(sucio[j]);
      sucio.length = 0;
      var k = 0;
      while (k < INI.length - 1 && tt >= INI[k + 1]) k++;
      var av = (tt - INI[k]) / ((k < INI.length - 1 ? INI[k + 1] : DUR) - INI[k]);
      [pasos, hilo].forEach(function (lista) {
        lista.forEach(function (li, n) {
          li.classList.toggle('activa', n === k); li.classList.toggle('hecha', n < k);
          li.style.setProperty('--av', n === k ? av.toFixed(3) : n < k ? 1 : 0);
        });
      });
    }
    function bucle(ts) {
      if (!visible || document.hidden) { andando = false; return; }
      if (ultimo !== null) t = (t + Math.min(.1, (ts - ultimo) / 1000)) % DUR;
      ultimo = ts; pintar(t);
      requestAnimationFrame(bucle);
    }
    function arrancar() { if (andando || !visible) return; andando = true; ultimo = null; requestAnimationFrame(bucle); }
    function cargar() { if (cargado) return; cargado = true; imgs.forEach(function (e) { e.setAttribute('href', e._src); }); }
    pasos.forEach(function (li, n) {
      li.querySelector('button').addEventListener('click', function () { t = INI[n] + .01; empezado = true; pintar(t); arrancar(); });
    });
    document.addEventListener('visibilitychange', arrancar);
    pintar(DUR - 1.2);                                           // antes de verse: la pieza entregada
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (e) { if (e[0].isIntersecting) cargar(); }, { rootMargin: '900px 0px' }).observe(fig);
      new IntersectionObserver(function (e) {
        visible = e[0].isIntersecting;
        if (visible && !empezado) { empezado = true; t = 0; }
        arrancar();
      }, { threshold: .25 }).observe(fig.querySelector('.taller__lienzo'));
    } else { cargar(); visible = true; empezado = true; arrancar(); }
    return function () { cargar(); };
  }

  /* ── EL ÁNFORA EN VÍDEO (05-oct; Javi: «me gusta, cámbialo en la web»). Los mismos seis tiempos en un solo vídeo
     (img/anfora/cine/anfora.mp4; data-ini: el segundo en que empieza cada paso, con un fotograma clave ahí para que el
     salto sea al instante). Se carga al acercarse, va mientras se ve y se para al salir; un clic en un paso salta a él.
     Se ve UNA vez (sin bucle, para que no compita con el ánfora que gira debajo) y se queda en la pieza firmada; los
     pasos siguen llevando a cada escena. Antes de verse, el cartel es la pieza firmada y entregada ── */
  function prepararCine(fig) {
    var v = fig.querySelector('video');
    var pasos = [].slice.call(fig.querySelectorAll('.taller__pasos li'));
    var hilo = [].slice.call(fig.querySelectorAll('.taller__hilo i'));
    var INI = v.getAttribute('data-ini').split(' ').map(Number);
    var visible = false, cargado = false, empezado = false, raf = 0;
    var lamina = fig.querySelector('.taller__lienzo.posable'), posado = !lamina;   // si entra posándose, arranca al posarse
    if (lamina) lamina.addEventListener('asentado', function () { posado = true; v.currentTime = 0; seguir(); });
    function encender(k, av) {
      [pasos, hilo].forEach(function (lista) {
        lista.forEach(function (li, n) {
          li.classList.toggle('activa', n === k); li.classList.toggle('hecha', n < k);
          li.style.setProperty('--av', n === k ? av.toFixed(3) : n < k ? 1 : 0);
        });
      });
    }
    function pasoActual() {
      var k = 0;
      while (k < INI.length - 1 && v.currentTime >= INI[k + 1]) k++;
      return k;
    }
    function pintar() {
      var tt = v.currentTime, k = pasoActual();
      var fin = k < INI.length - 1 ? INI[k + 1] : (v.duration || INI[k] + 7.5);
      encender(k, Math.max(0, Math.min(1, (tt - INI[k]) / (fin - INI[k]))));
      if (alante) alante.disabled = k === INI.length - 1;
    }
    function bucle() { pintar(); raf = v.paused ? 0 : requestAnimationFrame(bucle); }
    function cargar() { if (cargado) return; cargado = true; v.preload = 'auto'; v.src = v.getAttribute('data-src'); }
    function seguir() {
      if (visible && empezado && posado && !quieto && !document.hidden && !v.ended) {
        cargar();
        var p = v.play();
        if (p && p.catch) p.catch(function () {});
      } else if (!v.paused) v.pause();
    }
    /* MANDOS (06-oct, Javi: «que se pueda parar para leer»): paso anterior, pausa/seguir y paso siguiente. Parada, se
       puede ir de paso en paso leyendo y no arranca hasta que se pide. Al acabar, «seguir» la ve otra vez desde el
       principio. En el móvil los mandos salen al tocar la animación, y el toque la para o la sigue; mientras está
       parada se quedan, y al seguir se van a los 2,5 s */
    var quieto = false, ocultarMandos = null;
    var mandos = fig.querySelector('.cine__mandos');
    var atras = fig.querySelector('[data-cine="atras"]'), pausa = fig.querySelector('[data-cine="pausa"]'), alante = fig.querySelector('[data-cine="alante"]');
    function iconos() {
      if (!pausa) return;
      pausa.classList.toggle('quieto', quieto || v.ended);
      pausa.setAttribute('aria-pressed', quieto ? 'true' : 'false');
    }
    function verMandos() {
      if (!mandos) return;
      fig.classList.add('mandos-vistos');
      clearTimeout(ocultarMandos);
      if (!quieto && !v.ended) ocultarMandos = setTimeout(function () { fig.classList.remove('mandos-vistos'); }, 2500);
    }
    function pararOSeguir() {
      if (quieto || v.ended) {
        quieto = false;
        if (v.ended) irA(0); else seguir();
      } else { quieto = true; seguir(); }
      iconos(); verMandos();
    }
    if (pausa) pausa.addEventListener('click', pararOSeguir);
    if (atras) atras.addEventListener('click', function () { irA(Math.max(0, pasoActual() - 1)); verMandos(); });
    if (alante) alante.addEventListener('click', function () { irA(Math.min(INI.length - 1, pasoActual() + 1)); verMandos(); });
    v.addEventListener('play', function () { if (!raf) raf = requestAnimationFrame(bucle); iconos(); });
    v.addEventListener('seeked', pintar);
    v.addEventListener('timeupdate', pintar);                     // por si el navegador frena los fotogramas (al volver al principio)
    v.addEventListener('ended', function () { pintar(); iconos(); verMandos(); });   // se ve una vez y se queda en la pieza entregada (Javi, 05-oct)
    function irA(n) {
      cargar(); empezado = true;
      if (v.readyState < 1) v.addEventListener('loadedmetadata', function () { v.currentTime = INI[n] + .01; }, { once: true });
      else v.currentTime = INI[n] + .01;
      pintar(); seguir(); iconos();
    }
    pasos.forEach(function (li, n) {
      li.querySelector('button').addEventListener('click', function () { irA(n); });
    });
    // en el móvil solo se ve el paso que toca: la barra de arriba es la que lleva a cada escena (Javi: «le doy para atrás
    // otras escenas y solo se va al principio de la que está enseñando»)
    var barra = fig.querySelector('.taller__hilo');
    if (barra) barra.addEventListener('click', function (e) {
      var r = barra.getBoundingClientRect();
      irA(Math.max(0, Math.min(INI.length - 1, Math.floor((e.clientX - r.left) / r.width * INI.length))));
    });
    /* Tocar la animación o su barra: igual que las stories (07-oct, Javi). MANTENER el dedo quieto la para
       mientras se sostiene y, al soltar, sigue sola sin quedar parada (aunque antes del toque ya estuviera en
       marcha). Si ya estaba parada a propósito (quieto === true de antes), mantener el dedo no hace nada
       nuevo: sigue parada hasta que se suelte. Un toque CORTO en el vídeo para o sigue, como siempre
       (pararOSeguir); un toque corto en la barra salta al paso tocado (su propio click, sin tocar esto). */
    (function gestoStories() {
      // 09-oct: el toque se resuelve UNA vez (pointerup, pointercancel o pointerleave: el primero que llegue).
      // En móvil, al levantar el dedo, pointerup y pointerleave pueden llegar los dos seguidos; sin "resuelto"
      // el segundo volvía a disparar pararOSeguir() y la animación se quedaba pausada sin querer (Javi, 09-oct).
      var MANTENER_MS = 180, enEspera = null, manteniendo = false, yaEstabaQuieta = false, resuelto = true, x0 = 0, y0 = 0;
      function empezar(e) {
        if (e.pointerType === 'mouse') return;              // el ratón ya tiene su propio click en los mandos
        yaEstabaQuieta = quieto; manteniendo = false; resuelto = false; x0 = e.clientX; y0 = e.clientY;
        clearTimeout(enEspera);
        enEspera = setTimeout(function () {
          manteniendo = true;
          if (!yaEstabaQuieta) { quieto = true; seguir(); iconos(); verMandos(); }
        }, MANTENER_MS);
      }
      function soltar(e, esVideo) {
        if (e.pointerType === 'mouse' || resuelto) return;
        resuelto = true;
        clearTimeout(enEspera);
        /* DESLIZAR (15-oct, Javi: «en el móvil debería poder ser deslizable con táctil»): de lado, a la escena siguiente
           o a la anterior, como en las stories; si estaba parada a propósito, sigue parada en la escena nueva */
        var dx = e.clientX - x0, dy = e.clientY - y0;
        if (e.type === 'pointerup' && Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.5) {
          if (manteniendo && !yaEstabaQuieta) quieto = false;
          irA(Math.max(0, Math.min(INI.length - 1, pasoActual() + (dx < 0 ? 1 : -1))));
          verMandos();
          return;
        }
        if (manteniendo) {
          if (!yaEstabaQuieta) { quieto = false; if (v.ended) irA(0); else seguir(); iconos(); verMandos(); }
        } else if (esVideo && e.type === 'pointerup') pararOSeguir();   // toque corto en el vídeo: el de siempre
      }
      [[v, true], [barra, false]].forEach(function (par) {
        var el = par[0], esVideo = par[1];
        if (!el) return;
        el.addEventListener('pointerdown', empezar);
        el.addEventListener('pointerup', function (e) { soltar(e, esVideo); });
        el.addEventListener('pointercancel', function (e) { soltar(e, esVideo); });
        el.addEventListener('pointerleave', function (e) { soltar(e, esVideo); });
      });
    })();
    document.addEventListener('visibilitychange', seguir);
    if (lamina) encender(0, 0);                                  // entra posándose: con el primer paso, y arranca ahí
    else encender(INI.length - 1, 1);                            // antes de verse: la pieza entregada
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (e) { if (e[0].isIntersecting) cargar(); }, { rootMargin: '900px 0px' }).observe(fig);
      new IntersectionObserver(function (e) {
        visible = e[0].isIntersecting;
        if (visible && !empezado) { empezado = true; v.currentTime = 0; }
        seguir();
      }, { threshold: .25 }).observe(fig.querySelector('.taller__lienzo'));
    } else { cargar(); visible = true; empezado = true; seguir(); }
    return function () { cargar(); };
  }

  /* ── ESCRIBIR, 3: el correo se teclea ──────────────────── */
  function teclear(el, texto, ms, cursor, alAcabar) {
    var i = 0;
    el.textContent = '';
    var c = null;
    if (cursor) { c = document.createElement('span'); c.className = 'cursor'; }
    (function sigue() {
      el.textContent = texto.slice(0, i);
      if (c) el.appendChild(c);
      if (i++ < texto.length) setTimeout(sigue, ms + Math.random() * ms * 0.6);
      else {
        if (c) setTimeout(function () { c.remove(); }, 1800);
        if (alAcabar) alAcabar();
      }
    })();
  }
  /* LA CADENA DE IRIS COPY (04-oct, Javi: «una cadena viva, infografía chula, con sus dibujos propios, sin papel y sin
     bola que se vaya del encuadre»). De toda España a toda España: una ciudad lanza un pedido → la web → el agente
     (cada tantos, uno va a «Revisión») → la impresora (sale en hojas) → el empaquetado (sale en caja) → la tienda de
     Sevilla → la caja vuela a otra ciudad. Varios a la vez y todo dentro del dibujo (svg de _tools/cadena_svg.py).
     Solo se mueve mientras se ve y con la pestaña a la vista */
  function prepararCadena(fig) {
    var svgs = Array.prototype.slice.call(fig.querySelectorAll('.cadena__svg'));
    var geo = null, items = [], reloj = 0, ultimo = 0, siguiente = 0, cuenta = 0, raf = 0, visible = false, empezado = false;
    function activo() {
      for (var i = 0; i < svgs.length; i++) if (svgs[i].getBoundingClientRect().width > 0) return svgs[i];
      return null;
    }
    function medir(svg) {
      var pista = svg.querySelector('.cadena__pista'), L = pista.getTotalLength(), n = 500, m = [], i;
      for (i = 0; i <= n; i++) m.push(pista.getPointAtLength(L * i / n));
      function fraccion(x, y) {
        var mejor = 0, d = Infinity;
        for (var j = 0; j <= n; j++) { var dx = m[j].x - x, dy = m[j].y - y, q = dx * dx + dy * dy; if (q < d) { d = q; mejor = j; } }
        return mejor / n;
      }
      var est = {};
      Array.prototype.forEach.call(svg.querySelectorAll('[data-est]'), function (g) {
        var x = +g.getAttribute('data-x'), y = +g.getAttribute('data-y');
        est[g.getAttribute('data-est')] = { g: g, x: x, y: y, f: fraccion(x, y) };
      });
      var ciudades = Array.prototype.map.call(svg.querySelectorAll('.cadena__ciudad'), function (c) {
        return { g: c, x: +c.getAttribute('data-x'), y: +c.getAttribute('data-y') };
      });
      return { svg: svg, pista: pista, L: L, est: est, ciudades: ciudades, capa: svg.querySelector('.cadena__items'),
               plantilla: svg.querySelector('defs .cadena__item'), escala: +svg.getAttribute('data-escala') || 1 };
    }
    function activar(g) { if (!g) return; g.classList.remove('activa'); void g.getBoundingClientRect(); g.classList.add('activa'); }
    function suave(t) { return t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }
    function arco(a, b, t, alto) {
      var cx = (a.x + b.x) / 2, cy = (a.y + b.y) / 2 - alto, u = 1 - t;
      return { x: u * u * a.x + 2 * u * t * cx + t * t * b.x, y: u * u * a.y + 2 * u * t * cy + t * t * b.y };
    }
    function nuevo() {
      var e = geo.est, cs = geo.ciudades, n = cuenta++;
      var origen = cs[(n * 5 + 2) % cs.length], destino = cs[(n * 7 + 9) % cs.length];
      var g = geo.plantilla.cloneNode(true);
      g.removeAttribute('id'); g.setAttribute('data-e', 'doc'); g.style.opacity = 0;
      geo.capa.appendChild(g);
      function estado(s) { return function () { g.setAttribute('data-e', s); }; }
      var segs = [
        { dur: 1400, tipo: 'arco', a: origen, b: e.web, alto: 60, entra: true },
        { dur: 450, tipo: 'quieto', en: e.web, alEmpezar: function () { activar(e.web.g); } },
        { dur: 1300, tipo: 'pista', de: e.web.f, a: e.agente.f },
        { dur: 700, tipo: 'quieto', en: e.agente, alEmpezar: function () { activar(e.agente.g); } }
      ];
      if (n % 6 === 4) {                                       // algo que no se puede hacer con garantías: a «Revisión»
        segs.push({ dur: 900, tipo: 'arco', a: e.agente, b: e.revision, alto: 24, alEmpezar: estado('aviso') },
                  { dur: 1400, tipo: 'quieto', en: e.revision, alEmpezar: function () { activar(e.revision.g); }, sale: true });
      } else {
        segs.push({ dur: 1300, tipo: 'pista', de: e.agente.f, a: e.impresora.f },
                  { dur: 900, tipo: 'quieto', en: e.impresora, alEmpezar: function () { activar(e.impresora.g); }, alAcabar: estado('hojas') },
                  { dur: 1150, tipo: 'pista', de: e.impresora.f, a: e.empaquetado.f },
                  { dur: 800, tipo: 'quieto', en: e.empaquetado, alEmpezar: function () { activar(e.empaquetado.g); }, alAcabar: estado('caja') },
                  { dur: 1600, tipo: 'pista', de: e.empaquetado.f, a: e.tienda.f },
                  { dur: 300, tipo: 'quieto', en: e.tienda, alEmpezar: function () { activar(e.tienda.g); } },
                  { dur: 1400, tipo: 'arco', a: e.tienda, b: destino, alto: 34, alAcabar: function () { activar(destino.g); }, sale: true });
      }
      activar(origen.g);
      items.push({ g: g, k: 0, t0: reloj, segs: segs });
    }
    function mover(it, i) {
      var s = it.segs[it.k];
      while (reloj - it.t0 >= s.dur) {
        if (s.alAcabar) s.alAcabar();
        it.t0 += s.dur; it.k++;
        if (it.k >= it.segs.length) { if (it.g.parentNode) it.g.parentNode.removeChild(it.g); items.splice(i, 1); return; }
        s = it.segs[it.k];
        if (s.alEmpezar) s.alEmpezar();
      }
      var t = Math.max(0, Math.min(1, (reloj - it.t0) / s.dur)), p, op = 1;
      if (s.tipo === 'arco') p = arco(s.a, s.b, suave(t), s.alto);
      else if (s.tipo === 'pista') p = geo.pista.getPointAtLength(geo.L * (s.de + (s.a - s.de) * suave(t)));
      else p = s.en;
      if (s.entra) op = Math.min(1, t / 0.18);
      if (s.sale) op = t < 0.55 ? 1 : 1 - (t - 0.55) / 0.45;
      it.g.setAttribute('transform', 'translate(' + p.x.toFixed(1) + ' ' + p.y.toFixed(1) + ') scale(' + geo.escala + ')');
      it.g.style.opacity = op.toFixed(2);
    }
    function cuadro(ahora) {
      raf = 0;
      if (!visible || document.hidden || !geo) return;
      reloj += Math.min(64, ahora - (ultimo || ahora)); ultimo = ahora;
      if (reloj >= siguiente && items.length < 10) { nuevo(); siguiente = reloj + 1700; }
      for (var i = items.length - 1; i >= 0; i--) mover(items[i], i);
      raf = requestAnimationFrame(cuadro);
    }
    function seguir() {
      var vivo = visible && empezado && !document.hidden;
      fig.classList.toggle('cadena--viva', vivo);
      if (vivo && !raf) { ultimo = 0; raf = requestAnimationFrame(cuadro); }
    }
    function cambiaDibujo() {                                 // al girar el móvil o cambiar el ancho: el otro dibujo
      var s = activo();
      if (!s || (geo && geo.svg === s)) return;
      items.forEach(function (it) { if (it.g.parentNode) it.g.parentNode.removeChild(it.g); });
      items = []; geo = medir(s); siguiente = reloj;
    }
    var tCambio;
    window.addEventListener('resize', function () {
      clearTimeout(tCambio); tCambio = setTimeout(function () { if (empezado) cambiaDibujo(); }, 200);
    });
    document.addEventListener('visibilitychange', seguir);
    if ('IntersectionObserver' in window) new IntersectionObserver(function (e) { visible = e[0].isIntersecting; seguir(); }).observe(fig);
    else visible = true;
    return function (espera) {                                 // se va trazando mientras llega (no llega en blanco); al posarse, se mueve
      setTimeout(function () { fig.classList.add('cadena--trazada'); }, 250);
      setTimeout(function () { empezado = true; cambiaDibujo(); siguiente = reloj + 200; seguir(); }, Math.max(espera || 0, 1600) + 300);
    };
  }

  /* ── LA CADENA DE FISIOBOOST (04-oct, Javi: «como lo de Iris Copy: una cadena ilustrativa de sucesos»). La paciente
     con dolor llama → en la clínica, cerrada, suena tres veces y nadie lo coge → salta la recepcionista IA → la
     conversación de siempre, tecleada como un chat → al colgar, el WhatsApp viaja al fisioterapeuta, que lo ve (✓✓ en
     azul). Unos 30 s por vuelta y solo mientras se ve (dibujo de _tools/recep_svg.py; estados en-* en el css) ── */
  function prepararRecep(fig) {
    var svgs = [].slice.call(fig.querySelectorAll('.recep__svg'));
    var lis = [].slice.call(fig.querySelectorAll('.recep__lineas li'));
    var sis = lis.filter(function (li) { return li.classList.contains('rc-sis'); });            // llamando · nadie · contesta
    var charla = lis.filter(function (li) { return li.classList.contains('rc-p') || li.classList.contains('rc-ia'); });
    var wa = fig.querySelector('.rc-wa');
    var lista = fig.querySelector('.recep__lineas'), ventana = fig.querySelector('.recep__ventana');
    var ESTADOS = ['en-dolor', 'en-llama', 'en-suena', 'en-nadie', 'en-ia', 'en-habla', 'en-manda', 'en-aviso', 'en-visto', 'en-fin'];
    var visible = false, cola = [], andando = false;
    function sigue() {
      if (!visible || document.hidden) return;
      var c = cola; cola = []; c.forEach(function (ok) { ok(); });
    }
    function esperar(ms) {                                     // si deja de verse, espera a que vuelva
      return new Promise(function (ok) { setTimeout(function () { if (visible && !document.hidden) ok(); else cola.push(ok); }, ms); });
    }
    function estado(e, si) { fig.classList.toggle(e, si !== false); }
    function dibujo() {
      for (var i = 0; i < svgs.length; i++) if (svgs[i].getBoundingClientRect().width > 0) return svgs[i];
      return svgs[0];
    }
    function suave(x) { return x < .5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2; }
    function viaje(cual, tramo, ms) {                          // la llamada o el WhatsApp, por su tramo de pista
      var s = dibujo(), item = s.querySelector('.rc-item--' + cual), pista = s.querySelector('.rc-pista--' + tramo), L = pista.getTotalLength();
      item.classList.add('en-marcha');
      return new Promise(function (ok) {
        var t0 = null;
        function paso(ts) {
          if (t0 === null) t0 = ts;
          var u = Math.min(1, (ts - t0) / ms), q = pista.getPointAtLength(L * suave(u));
          item.setAttribute('transform', 'translate(' + q.x.toFixed(1) + ' ' + q.y.toFixed(1) + ')');
          if (u < 1) requestAnimationFrame(paso);
          else { item.classList.remove('en-marcha'); ok(); }
        }
        requestAnimationFrame(paso);
      });
    }
    function encuadra() {                                      // como un chat: la última frase, siempre a la vista
      var sobra = lista.offsetHeight - ventana.clientHeight;
      lista.style.transform = sobra > 0 ? 'translateY(' + (-sobra) + 'px)' : '';
    }
    if ('ResizeObserver' in window) new ResizeObserver(encuadra).observe(lista);
    function decir(li) {
      var sp = li.querySelector('span'), texto = t(sp.getAttribute('data-i18n'));
      sp.textContent = '';
      li.classList.add('dicho'); encuadra();
      return new Promise(function (ok) { teclear(sp, texto, 15, false, function () { encuadra(); ok(); }); });
    }
    function reiniciar() {
      ESTADOS.forEach(function (e) { estado(e, false); });
      lis.forEach(function (li) { li.classList.remove('dicho'); var sp = li.querySelector('span'); sp.textContent = t(sp.getAttribute('data-i18n')); });
      lista.style.transform = '';
    }
    function vuelta() {
      reiniciar();
      var c = esperar(600)
        .then(function () { estado('en-dolor'); return esperar(1000); })                 // le duele y coge el móvil
        .then(function () { decir(sis[0]); estado('en-llama'); return viaje('llamada', 1, 1200); })   // llama a la clínica
        .then(function () { estado('en-suena'); return esperar(2500); })                  // suena tres veces…
        .then(function () { estado('en-nadie'); return decir(sis[1]); })                  // …y nadie lo coge
        .then(function () { return esperar(700); })
        .then(function () { estado('en-suena', false); return viaje('llamada', 2, 900); })
        .then(function () { estado('en-ia'); return decir(sis[2]); })                     // salta la recepcionista
        .then(function () { estado('en-habla'); return esperar(400); });
      charla.forEach(function (li) {
        c = c.then(function () { return decir(li); }).then(function () { return esperar(560); });
      });
      return c
        .then(function () { estado('en-habla', false); estado('en-manda'); return viaje('wa', 3, 1400); })   // cuelga y avisa
        .then(function () { estado('en-aviso'); return decir(wa); })
        .then(function () { return esperar(1000); })
        .then(function () { estado('en-visto'); return esperar(3800); })                 // el fisio lo ve
        .then(function () { estado('en-fin'); return esperar(900); })
        .then(vuelta);
    }
    document.addEventListener('visibilitychange', sigue);
    if ('IntersectionObserver' in window) new IntersectionObserver(function (e) { visible = e[0].isIntersecting; sigue(); }).observe(fig);
    else visible = true;
    return function (espera) {
      setTimeout(function () { if (!andando) { andando = true; vuelta(); } }, espera || 0);
    };
  }

  /* el correo, como el nombre de la marca: en negro, el 1 en rojo y el 0 en azul, y se escribe como código */
  var correo = document.querySelector('.correo[data-buzon]');
  var direccion = correo.dataset.buzon + '@' + correo.dataset.dominio;
  correo.href = 'mailto:' + direccion;
  correo.setAttribute('aria-label', direccion);
  correo.removeAttribute('data-i18n');                         // ya no es un texto traducible
  var correoTexto = document.createElement('span');
  correoTexto.className = 'correo__texto';
  correoTexto.setAttribute('aria-hidden', 'true');
  correo.textContent = '';
  correo.appendChild(correoTexto);
  var correoLetras = enLetras(correoTexto, direccion, 'cl');
  /* con qué escribir (Javi, 03-oct): en el móvil, el correo abre su app de correo (mailto); en el ordenador se
     despliega Gmail · Outlook · su app · copiar, porque allí mailto suele no llevar a ninguna parte */
  var con = document.getElementById('correoCon');
  var tactil = window.matchMedia('(pointer: coarse)').matches;
  function enlacesCorreo() {
    var a = encodeURIComponent(direccion), s = encodeURIComponent(t('cont.asunto'));
    return {
      gmail: 'https://mail.google.com/mail/?view=cm&fs=1&to=' + a + '&su=' + s,
      outlook: 'https://outlook.live.com/mail/0/deeplink/compose?to=' + a + '&subject=' + s,
      app: 'mailto:' + direccion + '?subject=' + s
    };
  }
  function desplegarCon(abrir) {
    con.classList.toggle('abierto', abrir);
    correo.setAttribute('aria-expanded', abrir ? 'true' : 'false');
    if ('inert' in con) con.inert = !abrir;
  }
  if (!tactil) {
    correo.setAttribute('aria-controls', 'correoCon');
    desplegarCon(false);
  }
  correo.addEventListener('click', function (e) {
    if (tactil) return;                                        // mailto: su app de correo
    e.preventDefault();
    desplegarCon(!con.classList.contains('abierto'));
  });
  document.addEventListener('click', function (e) {
    if (con.classList.contains('abierto') && !con.contains(e.target) && !correo.contains(e.target)) desplegarCon(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && con.classList.contains('abierto')) { desplegarCon(false); correo.focus(); }
  });
  con.querySelectorAll('a[data-con]').forEach(function (a) {
    a.addEventListener('click', function () { setTimeout(function () { desplegarCon(false); }, 60); });
  });
  var copiar = con.querySelector('[data-con="copiar"]');
  copiar.addEventListener('click', function () {
    var hecho = function () {
      var r = copiar.querySelector('span');
      r.textContent = t('cont.copiado');
      copiar.classList.add('hecho');
      setTimeout(function () { r.textContent = t('cont.copiar'); copiar.classList.remove('hecho'); }, 1800);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(direccion).then(hecho, function () {});
    } else {
      var ta = document.createElement('textarea');
      ta.value = direccion; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { if (document.execCommand('copy')) hecho(); } catch (err) {}
      ta.remove();
    }
  });
  /* teléfono y WhatsApp: el número se monta al pulsar (va al revés en la página) y no se queda en el enlace */
  var tel = document.querySelector('.telefono[data-tel]');
  var alReves = function (x) { return x.split('').reverse().join(''); };
  function numero() { return alReves(tel.dataset.pais) + alReves(tel.dataset.tel).split('|').join(''); }
  tel.querySelectorAll('[data-op]').forEach(function (a) {
    a.addEventListener('click', function () {
      a.href = a.dataset.op === 'wa'
        ? 'https://wa.me/' + numero() + '?text=' + encodeURIComponent(t('cont.wa.texto'))
        : 'tel:+' + numero();
      setTimeout(function () { a.href = '#contacto'; }, 0);
    });
  });
  function ponerContacto() {                                   // lo que cambia con el idioma
    if (!con) return;
    var e = enlacesCorreo();
    con.querySelectorAll('a[data-con]').forEach(function (a) { a.href = e[a.dataset.con]; });
    if (tactil) correo.href = e.app;
  }
  ponerContacto();

  /* ── Un solo vigilante para los gestos: cada cosa se anima una vez, al verse ── */
  var acciones = new Map();
  /* POSAR (04-oct): cada pieza entra desde fuera por el lado de su columna (en el ordenador) o por el lado al que
     está torcida (en el móvil, donde todo va en una columna); el giro de entrada va hacia ese mismo lado */
  function aterriza(el) {                                    // ms hasta que toca la mesa: lo que dura su posar-llega (css)
    return (parseFloat(getComputedStyle(el).animationDuration) || 2.8) * 1000 - 100;
  }
  function fuera(r, lado) {                                   // lo justo para que empiece entera fuera de la pantalla
    return Math.round(lado > 0 ? window.innerWidth - r.left + 40 : -(r.right + 40));
  }
  function posar(el) {
    var ancho = window.innerWidth, movil = ancho <= 860, r = el.getBoundingClientRect(), lado;
    if (movil) lado = parseFloat(getComputedStyle(el).getPropertyValue('--giro')) < 0 ? -1 : 1;
    else lado = r.left + r.width / 2 >= ancho / 2 ? 1 : -1;
    el.style.setProperty('--dx', fuera(r, lado) + 'px');
    el.style.setProperty('--dgiro', lado * (movil ? 6 : 8) + 'deg');
    el.classList.add('posado');
    el.dispatchEvent(new CustomEvent('posandose'));
    /* PIES PEGADOS A SU VÍDEO (06-oct, noche, Javi: «no están adheridos a su animación, ya están fijos»): el pie que va
       justo debajo (moda, creadores, avatares) llega con su pieza, por el mismo camino y al mismo ritmo */
    var pie = el.nextElementSibling;
    if (pie && (pie.tagName === 'FIGCAPTION' || pie.classList.contains('personaje__pie'))) {
      var q = pie.getBoundingClientRect();                     // gira con ella: sobre el centro de la pieza, no el suyo
      pie.style.transformOrigin = Math.round(r.left + r.width / 2 - q.left) + 'px ' + Math.round(r.top + r.height / 2 - q.top) + 'px';
      pie.style.setProperty('--giro', getComputedStyle(el).getPropertyValue('--giro') || '0deg');
      pie.style.setProperty('--dgiro', el.style.getPropertyValue('--dgiro'));
      pie.style.setProperty('--dx', fuera(r, lado) + 'px');
      pie.classList.add('pie--posado');
    }
    var retraso = parseFloat(getComputedStyle(el).getPropertyValue('--retraso')) || 0;   // las copias van escalonadas
    setTimeout(function () { el.classList.add('asentado'); el.dispatchEvent(new CustomEvent('asentado')); }, aterriza(el) + retraso * 1000);
  }
  document.querySelectorAll('.posable').forEach(function (el) {
    if (el.closest('.inscripcion')) return;                  // lo de la inscripción va en su orden (inscripcion)
    acciones.set(el, function () { posar(el); });
  });
  /* LA CADENA, CON SU TABLET (15-oct, Javi: «que se despliegue con la tablet a la misma vez; ahora va cuando bajas un
     poco»): no espera a verse ella; se posa cuando se posa la tablet, por el mismo lado */
  document.querySelectorAll('.maq.posable').forEach(function (fig) {
    var mesa = fig.closest('.pliego__mesa'), tablet = mesa && mesa.querySelector('.editor.posable');
    if (!tablet || !acciones.has(tablet)) return;
    acciones.delete(fig);
    var antes = acciones.get(tablet);
    acciones.set(tablet, function () { antes(); posar(fig); });
  });
  /* LOS PASOS DEL ÁNFORA (15-oct, Javi: «el 1, 2, 3, 4, 5 y 6 ya está ahí puesto; tiene que entrar desplazándose
     suavemente, como todo lo demás»): la barra de escenas (móvil) y la lista llegan desde fuera, uno detrás de otro */
  function pasosLlegan(lista) {
    lista.classList.add('llegan');
    if (!lista.animate) return;
    [].forEach.call(lista.children, function (li, k) {
      var r = li.getBoundingClientRect(), dx = Math.round(window.innerWidth - Math.max(0, r.left) + 40);
      li.animate([{ translate: dx + 'px -24px' }, { translate: '0 0' }],
        { duration: 1900, delay: k * 110, easing: 'cubic-bezier(.22, .61, .24, 1)', fill: 'backwards' });
    });
  }
  document.querySelectorAll('.taller__pasos, .taller__hilo').forEach(function (lista) {
    acciones.set(lista, function () { pasosLlegan(lista); });
  });
  var DESENROLLA = 1750;                                       // lo que tarda el mármol en desenrollarse
  estelas.forEach(function (el) {
    var cab = el.closest('.cab'), ins = el.closest('.inscripcion');
    acciones.set(el, function () {
      el.classList.add('grabada');
      setTimeout(function () {
        escribir(el);
        if (cab) cabecera(cab); else if (ins) inscripcion(ins);
      }, DESENROLLA);
    });
  });
  /* CABECERAS EN ORDEN (04-oct, Javi): mármol → el texto se ilumina de 0 a 100 (2,4 s, css) y a la vez la piedra
     entra desde fuera, de modo que está llegando a su sitio cuando el texto termina (llega en 2,6 s frenando; acaba de
     girar en 3,4) → su rótulo se escribe como código. La piedra espera a verse: en el móvil va debajo del texto y
     podría posarse fuera de la pantalla */
  var TEXTO_APARECE = 1400, PIEDRA_LLEGA = 2600;
  function cuandoSeVea(el, hacer) {
    if (!('IntersectionObserver' in window)) { hacer(); return; }
    var vigilaUna = new IntersectionObserver(function (e) {
      if (!e[0].isIntersecting) return;
      vigilaUna.disconnect(); hacer();
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.5 });
    vigilaUna.observe(el);
  }
  function cabecera(cab) {
    cab.classList.add('cab--texto');
    cab._texto = Date.now();                                   // lo que va debajo puede esperar a esto (la muestra)
    cab.dispatchEvent(new CustomEvent('cab:texto'));
    var sec = cab.closest('section');                          // la piedra puede esperar al final de la sección
    var piedra = cab.querySelector('.piedra') || (sec && sec.querySelector('.piedra'));
    if (!piedra) return;
    cuandoSeVea(piedra, function () {                          // entra a la vez que se ilumina el texto
      posarPiedra(piedra);
      setTimeout(function () { rotular(piedra); }, PIEDRA_LLEGA - 150);
    });
  }
  function posarPiedra(b) { entrar(b, 14, 10); }
  function entrar(b, giro, giroMovil) {                       // desde fuera de la pantalla, por el lado de su columna
    var ancho = window.innerWidth, movil = ancho <= 860, r = b.getBoundingClientRect();
    var lado = movil || r.left + r.width / 2 >= ancho / 2 ? 1 : -1;
    b.style.setProperty('--dx', fuera(r, lado) + 'px');
    b.style.setProperty('--dgiro', lado * (movil ? giroMovil : giro) + 'deg');
    b.classList.add('posada');
  }
  /* LA INSCRIPCIÓN (04-oct, Javi): igual que las cabeceras: mármol → «Software a medida…» de 0 a 100 */
  function inscripcion(sec) { sec.classList.add('ins--texto'); }
  /* EL ÁNFORA DEL BOTÓN («Cuéntanos tu idea»). Desde el 06-oct va justo debajo de la animación, en «Cómo trabajamos»
     (Javi: «solo tiene sentido después de presentarlo»): cuando se ve y la lámina del taller ya está en su sitio,
     entra desde fuera y se posa; ya posada, empieza a girar (anfora.js) */
  var ANFORA_LLEGA = 3000;
  function posarAnfora(anfora) {
    var r = anfora.getBoundingClientRect(), movil = window.innerWidth <= 860;       // desde fuera de la pantalla
    anfora.style.setProperty('--dx', Math.round(window.innerWidth - r.left + 30) + 'px');
    anfora.style.setProperty('--dgiro', (movil ? 8 : 10) + 'deg');
    anfora.classList.add('posada');
    setTimeout(function () {                                   // la marca vale aunque anfora.js aún no haya cargado
      anfora.setAttribute('data-girar', ''); anfora.classList.add('asentada');
      if (window.MesaAnfora && window.MesaAnfora.girar) window.MesaAnfora.girar();
    }, ANFORA_LLEGA);
  }
  document.querySelectorAll('a.anfora').forEach(function (anfora) {
    var sec = anfora.closest('section'), lamina = sec && sec.querySelector('.taller__lienzo.posable');
    var listo = !lamina, visto = false, hecho = false;
    function ir() { if (listo && visto && !hecho) { hecho = true; posarAnfora(anfora); } }
    if (lamina) lamina.addEventListener('asentado', function () { listo = true; ir(); });
    cuandoSeVea(anfora, function () { visto = true; ir(); });
  });
  function rotular(b) {                                        // «Ver qué hacemos», tecleado como el correo
    var rot = b.querySelector('.piedra__abrir');
    var ls = enLetras(rot, rot.textContent.trim(), 'cl');
    b.classList.add('rotulada');
    codigo(rot, ls, 70, function () { rot.textContent = rot.textContent; });   // al acabar, texto normal otra vez
  }
  function ademas(el, hacer) {                                 // se posa y además se escribe: escribe al tocar la mesa
    var antes = acciones.get(el);
    acciones.set(el, function () { if (antes) antes(); hacer(antes ? aterriza(el) : 0); });
  }
  document.querySelectorAll('[data-recep]').forEach(function (fig) { ademas(fig, prepararRecep(fig)); });
  document.querySelectorAll('.editor').forEach(function (fig) { ademas(fig, prepararEditor(fig)); });
  document.querySelectorAll('[data-cadena]').forEach(function (fig) { ademas(fig, prepararCadena(fig)); });
  document.querySelectorAll('[data-taller]').forEach(function (fig) {
    acciones.set(fig, fig.querySelector('video') ? prepararCine(fig) : prepararAnfora(fig));
  });
  /* TRAZAR: la éntasis y el olivo se dibujan; al acabar no se quedan quietos (vivo): la curva respira,
     las ramas se mecen. τέχνη se escribe letra a letra y «tecnología» sale de ella como código */
  document.querySelectorAll('[data-trazo]').forEach(function (el) {
    acciones.set(el, function () {
      el.classList.add('trazado');
      setTimeout(function () {
        el.classList.add('vivo');
        el.querySelectorAll('animate, animateTransform').forEach(function (a, k) {       // las hojas, cada una a su ritmo
          if (a.beginElementAt) a.beginElementAt(a.localName === 'animate' ? 0 : (k * 0.37) % 2.6);
        });
      }, 3600);
    });
  });
  document.querySelectorAll('[data-tekhne]').forEach(function (fig) {
    var palabra = fig.querySelector('.tekhne');
    var griegas = enLetras(palabra, palabra.textContent.trim(), 'tk');
    griegas.forEach(function (l, k) { l.style.setProperty('--k', k); });
    var de = fig.querySelector('[data-i18n="gr.tek.de"]');
    acciones.set(fig, function () {
      var ls = enLetras(de, de.textContent, 'cl');
      ls.forEach(function (l) { l.style.opacity = 0; });
      fig.classList.add('trazado');
      setTimeout(function () {
        codigo(de, ls, 95, function () { de.textContent = de.textContent; fig.classList.add('vivo'); });
      }, 2900);
    });
  });
  acciones.set(correo, function () {
    codigo(correoTexto, correoLetras, 65, function () {
      correo.classList.add('escrito');
      setTimeout(function () { tel.classList.add('escrito'); }, 250);
    }, '@.');
  });

  /* ── EL BUZÓN: el ánfora (o el rollo de papel) lo desenrolla y se escribe en él ── */
  var buzon = document.getElementById('buzon');
  var papel = document.getElementById('buzonPapel');
  var hoja = buzon.querySelector('.buzon__hoja');
  var abrirB = buzon.querySelector('.buzon__abrir');
  var formB = buzon.querySelector('.buzon__form');
  var tituloB = buzon.querySelector('.buzon__titulo');
  var estadoB = buzon.querySelector('.buzon__estado');
  var enviarB = buzon.querySelector('.buzon__enviar');
  var hechoB = buzon.querySelector('.buzon__hecho');
  var abiertoEn = 0;
  if ('inert' in hoja) hoja.inert = true;
  /* LO QUE SE ESCRIBE EN EL PAPEL (Javi, 03-oct): cada letra nueva entra en color —azul o rojo, una palabra de
     cada— y se seca en tinta, como en
     los mármoles (antes pasaba por un signo de código; parecía un virus). El campo de verdad (teclado, cursor,
     selección, autocorrector) sigue ahí con la letra transparente; encima, un eco que pinta lo escrito. Lo pegado
     o autocompletado se teclea de corrido. Si algo falla, el campo se ve normal (la clase con-eco va al final) */
  var TINTA = 1100;
  function pluma(campo) {
    var area = campo.tagName === 'TEXTAREA';
    var caja = document.createElement('span');
    caja.className = 'pluma' + (area ? ' pluma--area' : '');
    campo.parentNode.insertBefore(caja, campo);
    caja.appendChild(campo);
    var eco = document.createElement('span');
    eco.className = 'pluma__eco';
    eco.setAttribute('aria-hidden', 'true');
    caja.appendChild(eco);
    var antes = '', nac = [], vivo = false;
    function seguir() { eco.scrollLeft = campo.scrollLeft; eco.scrollTop = campo.scrollTop; }
    function pintar() {
      var ahora = performance.now(), v = campo.value, joven = false, tramo = '', pal = 0, blanco = false;
      eco.textContent = '';
      for (var i = 0; i < v.length; i++) {
        if (/\s/.test(v[i])) blanco = true;
        else if (blanco) { pal++; blanco = false; }
        var edad = ahora - nac[i];
        if (!(edad < TINTA)) { tramo += v[i]; continue; }
        if (tramo) { eco.appendChild(document.createTextNode(tramo)); tramo = ''; }
        joven = true;
        var l = document.createElement('span');
        l.textContent = v[i];
        if (edad < 0) l.className = 'p-espera';
        else { l.className = 'p-tinta' + (pal % 2 ? '' : ' p-rojo'); l.style.setProperty('--k', (edad / TINTA).toFixed(3)); }
        eco.appendChild(l);
      }
      if (tramo) eco.appendChild(document.createTextNode(tramo));
      if (area && v.slice(-1) === '\n') eco.appendChild(document.createTextNode('\u200b'));
      seguir();
      if (joven) requestAnimationFrame(pintar); else vivo = false;
    }
    campo.addEventListener('input', function () {
      var v = campo.value, p = 0, f = 0;
      while (p < v.length && p < antes.length && v[p] === antes[p]) p++;
      while (f < v.length - p && f < antes.length - p && v[v.length - 1 - f] === antes[antes.length - 1 - f]) f++;
      var n = v.length - p - f, ahora = performance.now(), paso = n > 1 ? Math.min(24, 900 / n) : 0, nuevos = [];
      for (var i = 0; i < n; i++) nuevos.push(ahora + i * paso);
      nac = nac.slice(0, p).concat(nuevos, nac.slice(antes.length - f));
      antes = v;
      if (!area || !CSS.supports('field-sizing', 'content')) crecer();
      if (!vivo) { vivo = true; requestAnimationFrame(pintar); }
    });
    function crecer() {                                        // sin field-sizing (Safari, Firefox): a mano
      if (!area) return;
      campo.style.height = 'auto';
      campo.style.height = campo.scrollHeight + 'px';
    }
    ['scroll', 'keyup', 'select', 'click', 'focus'].forEach(function (ev) { campo.addEventListener(ev, seguir); });
    campo.addEventListener('blur', function () { setTimeout(seguir, 0); });   // al salir, el campo vuelve al principio
    caja.classList.add('con-eco');
    return function vaciar() { antes = ''; nac = []; eco.textContent = ''; if (area) campo.style.height = ''; };
  }
  var vaciarPlumas = ['idea', 'correo', 'nombre'].map(function (n) { return pluma(formB.elements[n]); });
  /* desenrollar = la hoja crece de 0 a su alto; el rodillo de abajo va pegado a su borde. Al acabar se queda en
     auto, para que el papel se alargue con lo que se escribe */
  function rodar(abrir) {
    hoja.style.height = (abrir ? 0 : hoja.scrollHeight) + 'px';
    void hoja.offsetHeight;
    hoja.style.height = (abrir ? hoja.scrollHeight : 0) + 'px';
    hoja.addEventListener('transitionend', function fin(e) {
      if (e.target !== hoja) return;
      hoja.removeEventListener('transitionend', fin);
      if (abrir) hoja.style.height = 'auto';
    });
  }
  function abrirBuzon(foco) {
    if (buzon.classList.contains('abierto') || buzon.classList.contains('enviado')) return;
    rodar(true);
    buzon.classList.add('abierto');
    abrirB.setAttribute('aria-expanded', 'true');
    if ('inert' in hoja) hoja.inert = false;
    abiertoEn = Date.now();
    var letras = enLetras(tituloB, tituloB.textContent.trim(), 'cl');
    letras.forEach(function (l) { l.style.opacity = 0; });
    setTimeout(function () { codigo(tituloB, letras, 60, function () { tituloB.classList.add('escrito'); }); }, 450);
    if (foco) setTimeout(function () { formB.idea.focus({ preventScroll: true }); }, 1400);
  }
  function aLaVista() {                                        // la hoja, arriba, bajo la cabecera
    window.scrollTo({ top: papel.getBoundingClientRect().top + window.pageYOffset - Math.max(96, barra.offsetHeight + 12), behavior: 'smooth' });
  }
  abrirB.addEventListener('click', function () { abrirBuzon(true); aLaVista(); });
  papel.addEventListener('click', function () {
    if (!buzon.classList.contains('abierto') && !buzon.classList.contains('enviado')) { abrirBuzon(true); aLaVista(); }
  });
  /* el ánfora: lleva al correo y, al llegar, desenrolla el papel. En táctil no se abre el teclado solo */
  var anforaB = document.querySelector('.anfora');
  if (anforaB) anforaB.addEventListener('click', function (e) {
    e.preventDefault();
    correo.scrollIntoView({ behavior: 'smooth', block: 'start' });
    var listo = false;
    function llega() {
      if (listo) return;
      listo = true;
      window.removeEventListener('scrollend', llega);
      abrirBuzon(window.matchMedia('(pointer: fine)').matches);
    }
    if ('onscrollend' in window) window.addEventListener('scrollend', llega);
    setTimeout(llega, 1500);
  });
  function avisoB(motivo, campo) {
    estadoB.textContent = t('buzon.err.' + motivo) || t('buzon.err.red');
    if (campo) { campo.setAttribute('aria-invalid', 'true'); campo.focus(); }
  }
  formB.addEventListener('input', function (e) {
    if (e.target.hasAttribute('aria-invalid')) { e.target.removeAttribute('aria-invalid'); estadoB.textContent = ''; }
  });
  function recibido(nombre, direccionV) {
    rodar(false);
    buzon.classList.remove('abierto');
    buzon.classList.add('enviado');
    if ('inert' in hoja) hoja.inert = true;
    var frase = t(nombre ? 'buzon.hecho.n' : 'buzon.hecho').replace('{n}', nombre).replace('{c}', direccionV);
    formB.reset();
    vaciarPlumas.forEach(function (v) { v(); });
    setTimeout(function () {
      hechoB.textContent = '';
      var leido = document.createElement('span'); leido.className = 'sr'; leido.textContent = frase;
      var visto = document.createElement('span'); visto.setAttribute('aria-hidden', 'true');
      hechoB.appendChild(leido); hechoB.appendChild(visto);
      var letras = enLetras(visto, frase, 'cl');
      codigo(visto, letras, 32);
    }, 1200);
  }
  formB.addEventListener('submit', function (e) {
    e.preventDefault();
    if (enviarB.disabled) return;
    var idea = formB.idea.value.trim(), dir = formB.correo.value.trim(), nombre = formB.nombre.value.trim();
    estadoB.textContent = '';
    if (idea.length < 10) return avisoB('idea', formB.idea);
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(dir)) return avisoB('correo', formB.correo);
    var rotulo = enviarB.querySelector('span');
    enviarB.disabled = true;
    rotulo.textContent = t('buzon.enviando');
    fetch('buzon', {
      method: 'POST', cache: 'no-store', credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idea: idea, correo: dir, nombre: nombre, aguja: formB.aguja.value,
                             t: Date.now() - abiertoEn, idioma: idioma })
    }).then(function (r) {
      return r.json().catch(function () { return {}; }).then(function (d) {
        if (r.ok && d.ok) return recibido(nombre, dir);
        var m = d.motivo;
        avisoB(m, m === 'correo' ? formB.correo : m === 'idea' || m === 'largo' ? formB.idea : null);
      });
    }).catch(function () { avisoB('red'); }).then(function () {
      enviarB.disabled = false;
      rotulo.textContent = t('buzon.enviar');
    });
  });

  if (QUIETO || !('IntersectionObserver' in window)) {
    acciones.forEach(function (hacer) { hacer(); });
  } else {
    var vigia = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (!e.isIntersecting) return;
        vigia.unobserve(e.target);
        acciones.get(e.target)();
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.3 });
    acciones.forEach(function (_, el) { vigia.observe(el); });
    /* LA MUESTRA DE «QUÉ HACEMOS» (15-oct, Javi: «tienen que arrancar un poco antes… está demasiado abajo el comienzo»):
       antes cada pieza esperaba a verse en un tercio, cuando su borde de arriba ya iba por los tres cuartos de la
       pantalla, y se veía el título solo con el hueco debajo. Ahora cada rama arranca en cuanto su título asoma por
       abajo: la pieza empieza a llegar justo antes de entrar en la pantalla y el título se ilumina a la vez (css).
       15-oct (Javi: «los títulos no pueden aparecer antes que el desenrollamiento del mármol y la descripción; un poco
       después, y luego los ejemplos, para que sea coordinado»): en orden, mármol → descripción → (1 s) títulos →
       (0,7 s) ejemplos. Si la cabecera ya se encendió hace rato (se baja despacio, o en el móvil la segunda rama),
       el título sale al asomar y los ejemplos 0,7 s después.
       14-oct (Javi: «te has colado saliendo tan rápido: un poco más abajo, pero no tan abajo como antes»): los ejemplos
       esperan además a que el borde de arriba de su mesa pase del 88 % de la pantalla (antes, del 72-75 %; con el
       cambio del 15, salían aún fuera, por debajo). Los vídeos del abanico ya se ponen en marcha con el título, de
       modo que llegan moviéndose (bucle de abajo, «preparate») */
    var TITULO_TRAS_TEXTO = 1000, PIEZAS_TRAS_TITULO = 700, ESPERA_MAX = 6000;
    function arrancarRama(pliego) {
      var cab = pliego.closest('section').querySelector('.cab'), hecho = false, mesaVista = false, tituloHecho = false;
      function piezas() {
        if (!mesaVista || !tituloHecho || pliego._posada) return;
        pliego._posada = true;
        pliego.querySelectorAll('.posable').forEach(function (el) {
          var hacer = acciones.get(el);
          if (hacer) { vigia.unobserve(el); hacer(); }
        });
      }
      var mesa = pliego.querySelector('.pliego__mesa');
      var vigiaMesa = new IntersectionObserver(function (e) {
        if (!e[0].isIntersecting) return;
        vigiaMesa.disconnect(); mesaVista = true; piezas();
      }, { rootMargin: '0px 0px -12% 0px', threshold: 0 });
      if (mesa) vigiaMesa.observe(mesa); else mesaVista = true;
      // los vídeos se cargan y arrancan ya al asomar la rama (aún sin verse): así van en marcha cuando llegan
      pliego.querySelectorAll('.posable').forEach(function (el) { el.dispatchEvent(new CustomEvent('preparate')); });
      function ya() {
        if (hecho) return; hecho = true;
        pliego.classList.add('pliego--visto');
        setTimeout(function () { tituloHecho = true; piezas(); }, PIEZAS_TRAS_TITULO);
      }
      if (!cab || cab._texto) { setTimeout(ya, cab ? Math.max(0, cab._texto + TITULO_TRAS_TEXTO - Date.now()) : 0); return; }
      cab.addEventListener('cab:texto', function () { setTimeout(ya, TITULO_TRAS_TEXTO); }, { once: true });
      setTimeout(ya, ESPERA_MAX);                              // por si la cabecera no llegara a encenderse
    }
    document.documentElement.classList.add('muestra-sincro');
    var vigiaMuestra = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (!e.isIntersecting) return;
        vigiaMuestra.unobserve(e.target);
        arrancarRama(e.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0 });
    document.querySelectorAll('.plegable--muestra .pliego').forEach(function (p) {
      p.querySelectorAll('.posable').forEach(function (el) { vigia.unobserve(el); });
      vigiaMuestra.observe(p);
    });
    /* TRABAJOS EN EL MÓVIL (04-oct, Javi): el título entra a la vez que su vídeo o su animación, cuando ya se ve al
       menos la mitad de arriba; antes asomaba el título solo, con el hueco debajo. Lo de cada trabajo se posa a la
       vez (deja de vigilarlo el vigía general). 06-oct (Javi, con captura): «la mitad» era la mitad del recuadro, y el
       de la recepcionista en el móvil es más alto que media pantalla: había que bajar mucho con el hueco vacío a la
       vista. Ahora arranca en cuanto su borde de arriba pasa del último cuarto de la pantalla.
       06-oct, noche (Javi, 2.ª vez: «arrancar incluso un poco antes… o se queda blanco a mitad de pantalla»): aún quedaba
       un hueco en blanco mientras llegaba la pieza. Ahora arranca cuando falta una pantalla y media para llegar a ella
       (margen +40 % bajo la pantalla): al verla ya se está posando o ya está puesta */
    if (window.matchMedia && window.matchMedia('(max-width: 860px)').matches) {
      document.documentElement.classList.add('casos-sincro');
      var vigiaCasos = new IntersectionObserver(function (entradas) {
        entradas.forEach(function (e) {
          if (!e.isIntersecting) return;
          vigiaCasos.unobserve(e.target);
          e.target.closest('.caso').classList.add('caso--visto');
          e.target.querySelectorAll('.posable').forEach(function (el) { var hacer = acciones.get(el); if (hacer) hacer(); });
        });
      }, { rootMargin: '0px 0px 40% 0px', threshold: 0 });
      document.querySelectorAll('.caso .caso__media').forEach(function (m) {
        m.querySelectorAll('.posable').forEach(function (el) { vigia.unobserve(el); });
        vigiaCasos.observe(m);
      });
    }
  }
  /* EL ABANICO (04-oct, Javi): los tres vídeos se mueven, mudos y sin mandos, solo mientras se ven y solo cuando su
     tarjeta ya está posada en la mesa (no mientras llega) */
  document.querySelectorAll('video[data-bucle]').forEach(function (v) {
    v.muted = true;
    var copia = v.closest('.posable'), visible = false;
    // las fichas de «Sobre la mesa» (15-oct, Javi): ya se mueven mientras llegan, no esperan a tocar la mesa.
    // El abanico de «Qué hacemos» (14-oct, Javi: «tienen que estar reproduciéndose desde que empieza el
    // desplazamiento»): arranca con su título («preparate», antes de posarse), así llega ya en marcha
    var alVuelo = !!(copia && (copia.classList.contains('ap-ficha__foto') || copia.classList.contains('copia')));
    var preparada = false;
    function dale() {
      if (!visible) return;
      if (!v.src) v.src = v.dataset.src;                        // se va cargando mientras llega
      if (copia && !preparada && !copia.classList.contains(alVuelo ? 'posado' : 'asentado')) return;
      /* A LA PAR (04-oct, Javi): las tres duran lo mismo (546 fotogramas); la que se posa más tarde se engancha al
         tiempo de la que ya va, y así van juntas en cada vuelta */
      var mesa = v.closest('.copias');
      if (mesa && v.paused) {
        var guia = [].filter.call(mesa.querySelectorAll('video[data-bucle]'), function (o) { return o !== v && !o.paused; })[0];
        if (guia) v.currentTime = guia.currentTime;
      }
      var p = v.play(); if (p && p.catch) p.catch(function () {});
    }
    if (copia && alVuelo) copia.addEventListener('posandose', function () { if (!v.src) v.src = v.dataset.src; dale(); });
    else if (copia) copia.addEventListener('asentado', dale);
    if (copia) copia.addEventListener('preparate', function () { preparada = true; v.preload = 'auto'; if (!v.src) v.src = v.dataset.src; dale(); });
    /* A LA PAR TAMBIÉN AL ARRANCAR JUNTAS (14-oct): si las tres arrancan a la vez, cada una empieza cuando le llegan
       sus datos y quedaban hasta medio segundo desfasadas. Al empezar a moverse de verdad, una vez, se engancha al
       tiempo de la que ya iba */
    var enganchada = false;
    v.addEventListener('playing', function () {
      var mesa = v.closest('.copias');
      if (!mesa || enganchada) return;
      enganchada = true;
      var guia = [].filter.call(mesa.querySelectorAll('video[data-bucle]'), function (o) {
        return o !== v && !o.paused && o.readyState >= 3 && o.currentTime > 0.05;
      })[0];
      if (guia && Math.abs(guia.currentTime - v.currentTime) > 0.08) v.currentTime = guia.currentTime;
    });
    if (!('IntersectionObserver' in window)) { visible = true; dale(); return; }
    new IntersectionObserver(function (e) {
      // mientras la ficha llega (sale de fuera de la pantalla) no cuenta como «fuera»: sigue en marcha
      if (!e[0].isIntersecting && alVuelo && copia.classList.contains('posado') && !copia.classList.contains('asentado')) return;
      visible = e[0].isIntersecting; if (visible) dale(); else v.pause();
    }, { rootMargin: '120px 0px' }).observe(v);
  });

  /* ── Desplegables: la piedra sujeta la losa; al levantarla se abre la sección ── */
  /* LA PIEDRA, DE SITIO (14-oct, Javi): cerrada, al final de la sección, debajo de la muestra («Ver todo…»); abierta,
     en su sitio de siempre, junto al texto de la cabecera («Cerrar»). Si la sección no tiene pie, no se mueve */
  function moverPiedra(sec, abierta) {
    var piedra = sec.querySelector('.piedra'), pie = sec.querySelector('.seccion__pie'), cab = sec.querySelector('.cab__texto');
    if (!piedra || !pie || !cab) return;
    var sitio = abierta ? cab : pie;
    if (piedra.parentNode === sitio) return;
    var conFoco = document.activeElement === piedra;
    sitio.appendChild(piedra);
    // al cambiarla de sitio el navegador le reinicia la entrada (llegaba otra vez volando desde fuera): ya llegó
    piedra.querySelectorAll('img').forEach(function (img) {
      if (img.getAnimations) img.getAnimations().forEach(function (a) { if (/^piedra-/.test(a.animationName)) a.finish(); });
    });
    if (conFoco) piedra.focus({ preventScroll: true });       // quien va con teclado no pierde su sitio
  }
  /* LEYENDA Y RÓTULOS A LA MISMA ALTURA (15-oct, Javi: simetría): cerrada y en el ordenador, «Guion · Generación ·
     Montaje» (bajo las fotos) se coloca a la altura de «Llega · Agente · Listo» (bajo la tablet). Cada columna mide
     distinto según el ancho, así que se mide: con posiciones de maqueta (offsetTop), que no cambian mientras algo
     se mueve */
  function alturaReal(el) { var y = 0; while (el) { y += el.offsetTop; el = el.offsetParent; } return y; }
  function alinearLeyenda() {
    var ley = document.querySelector('.copias__ley'), caja = document.querySelector('.maq'), rot = caja && caja.querySelector('.cadena__rot');   // la figura: se mueve con sus rótulos
    if (!ley || !rot) return;
    var sec = ley.closest('.plegable');
    ley.style.translate = '';
    if (!sec || sec.classList.contains('abierta') || window.innerWidth <= 860) return;
    var copias = ley.closest('.copias');
    // por el centro de las letras y con medidas de maqueta: el rótulo, en las coordenadas del dibujo (getBBox), que no
    // cambian aunque la cadena esté llegando girada; la leyenda, por offsetTop
    var svg = rot.ownerSVGElement, bb = rot.getBBox(), vb = svg.viewBox.baseVal;
    var rotY = alturaReal(caja) + (bb.y + bb.height / 2) * caja.offsetHeight / vb.height;
    var leyY = alturaReal(copias) + ley.offsetTop + ley.offsetHeight / 2;
    ley.style.translate = '0 ' + Math.round(rotY - leyY) + 'px';
  }
  var alinearLuego;
  window.addEventListener('resize', function () { clearTimeout(alinearLuego); alinearLuego = setTimeout(alinearLeyenda, 150); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(alinearLeyenda);
  window.addEventListener('load', alinearLeyenda);
  alIdioma.push(function () { setTimeout(alinearLeyenda, 0); });
  function abrir(sec, abierta) {
    var boton = sec.querySelector('.piedra'), pliegue = sec.querySelector('.pliegue'), ap = sec.querySelector('.aperitivo');
    sec.classList.toggle('abierta', abierta);
    boton.setAttribute('aria-expanded', abierta ? 'true' : 'false');
    // la muestra de «Qué hacemos» está dentro del pliegue y se ve cerrada: ese pliegue nunca es inerte
    if ('inert' in pliegue) pliegue.inert = !abierta && !sec.classList.contains('plegable--muestra');
    if (ap && !ap._recoger) ap.hidden = abierta;
    moverPiedra(sec, abierta);
    alinearLeyenda();
  }
  /* PERGAMINO (03-oct, noche): al pulsar, la sección se desenrolla (o se enrolla) con suavidad. Solo rueda lo que
     se ve: de donde empieza el pliegue hasta el pie de la pantalla; lo de más abajo se abre o se recoge de golpe,
     sin verse. Ritmo según lo que hay que recorrer (0,9 a 1,6 s). Si se pulsa a medio rodar, sigue desde donde va.
     Antes: grid 0fr→1fr con una curva de arranque brusco (casi todo en el primer instante) y, al cerrar, la página
     se movía a la vez (scrollIntoView).
     14-oct (la piedra, al final): lo que el usuario tiene delante se queda quieto en la pantalla (al abrir, la
     muestra; al cerrar, la cabecera) aunque la piedra cambie de sitio por encima. En «Qué hacemos» las piezas se
     recolocan (recomponer); en «Sobre la mesa» las fichas se recogen mientras se desenrolla el trabajo */
  var RODAR = 'cubic-bezier(.45, .05, .2, 1)', RECOLOCA = 1500, RECOLOCA_MOVIL = 1150;
  function enMovil() { return window.matchMedia('(max-width: 860px)').matches; }
  function curvaDe(x1, y1, x2, y2) {                           // una cubic-bezier hecha a mano: dónde va algo en cada instante
    function eje(a, b, t) { return ((1 - 3 * b + 3 * a) * t + (3 * b - 6 * a)) * t * t + 3 * a * t; }
    return function (x) {
      var lo = 0, hi = 1, t = x;
      for (var i = 0; i < 22; i++) { t = (lo + hi) / 2; if (eje(x1, x2, t) < x) lo = t; else hi = t; }
      return eje(y1, y2, t);
    };
  }
  var curvaRodar = curvaDe(.45, .05, .2, 1), curvaPulso = curvaDe(.65, 0, .35, 1);
  function sinSuave(hacer) {                                    // html va con scroll-behavior: smooth; esto, de golpe
    var h = document.documentElement, antes = h.style.scrollBehavior;
    h.style.scrollBehavior = 'auto'; hacer(); h.style.scrollBehavior = antes;
  }
  function llevar(el, antes, ms) {                             // de donde estaba a su sitio nuevo, sin saltos
    var b = el.getBoundingClientRect(), dx = antes.left - b.left, dy = antes.top - b.top;
    if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return;
    el._llevar = el.animate([{ translate: dx + 'px ' + dy + 'px' }, { translate: '0 0' }], { duration: ms, easing: RODAR });
    el._llevar.onfinish = function () { el._llevar = null; };
  }
  /* LA CORTINA (14-oct, móvil): un texto que aparece (o se va) entre dos piezas que se mueven se ve justo en el hueco
     que deja la pieza de debajo: asoma de arriba abajo a la vez que ella baja y, al cerrar, ella lo tapa al subir.
     Se calcula con la misma curva que mueve la pieza, en 16 pasos */
  function cortina(t, caja, debajo, dura, queda) {
    var h = caja.height, kf = [];
    if (h < 1) return;
    for (var k = 0; k <= 16; k++) {
      var s = k / 16, v = Math.max(0, Math.min(h, debajo(curvaRodar(s)) - caja.top));
      kf.push({ clipPath: 'inset(0 0 ' + (h - v).toFixed(1) + 'px 0)', opacity: (0.25 + 0.75 * v / h).toFixed(3), offset: s });
    }
    t._cortina = t.animate(kf, { duration: dura, easing: 'linear', fill: queda ? 'forwards' : 'none' });   // al cerrar, tapado hasta soltarlo
  }
  /* al cerrar, los textos ya no ocupan sitio: se quedan pintados donde estaban mientras se van */
  function fijarTexto(t, caja, display) {
    t.style.display = display; t.style.position = 'absolute'; t.style.margin = '0';
    t.style.width = caja.width + 'px'; t.style.pointerEvents = 'none';
    var p = (t.offsetParent || document.body).getBoundingClientRect();
    t.style.left = (caja.left - p.left) + 'px'; t.style.top = (caja.top - p.top) + 'px';
  }
  function soltarTexto(t) {
    if (t._cortina) { t._cortina.cancel(); t._cortina = null; }
    ['display', 'position', 'margin', 'width', 'pointerEvents', 'left', 'top'].forEach(function (k) { t.style[k] = ''; });
  }
  /* un título que cambia mucho de sitio no vuela: una copia quieta se apaga donde estaba (con su ancho de antes, para
     que no cambie de líneas) mientras el de verdad se enciende en el nuevo. La copia va en su mismo pliego (mismos
     estilos) y no ocupa sitio */
  function fantasma(el, caja, ms) {
    var c = el.cloneNode(true), pliego = el.closest('.pliego');
    c.removeAttribute('id'); c.removeAttribute('data-i18n'); c.setAttribute('aria-hidden', 'true'); c.classList.add('fantasma');
    c.style.position = 'absolute'; c.style.margin = '0'; c.style.width = caja.width + 'px'; c.style.pointerEvents = 'none';
    pliego.appendChild(c);
    var p = (c.offsetParent || document.body).getBoundingClientRect();
    c.style.left = (caja.left - p.left) + 'px'; c.style.top = (caja.top - p.top) + 'px';
    var a = c.animate([{ opacity: 1 }, { opacity: 0 }], { duration: ms, easing: 'ease-out', fill: 'forwards' });
    a.onfinish = a.oncancel = function () { if (c.parentNode) c.parentNode.removeChild(c); };
  }
  function desplegar(sec, abierta) {
    var pl = sec.querySelector('.pliegue'), ap = sec.querySelector('.aperitivo'), piedra = sec.querySelector('.piedra');
    var muestra = sec.classList.contains('plegable--muestra'), movil = muestra && enMovil();
    var piezas = [].slice.call(sec.querySelectorAll(muestra ? '.pliego .subtitulo, .editor, .maq-caja, .copias' : '.nada'));
    var textos = muestra ? [].slice.call(sec.querySelectorAll('.pliego__texto > :not(.subtitulo)')) : [];
    textos.forEach(soltarTexto);
    [].forEach.call(sec.querySelectorAll('.fantasma'), function (c) { c.parentNode.removeChild(c); });
    piezas.concat(piedra).forEach(function (el) { if (el._llevar) { el._llevar.cancel(); el._llevar = null; } });
    if (pl._rodar) { pl._rodar.cancel(); pl._rodar = null; }
    if (ap && ap._anim) { ap._anim.cancel(); ap._anim = null; }
    var antes = piezas.map(function (el) { return el.getBoundingClientRect(); });
    var textosAntes = abierta ? null : textos.map(function (t) { return { caja: t.getBoundingClientRect(), display: getComputedStyle(t).display }; });
    var piedraAntes = piedra.getBoundingClientRect();
    // al abrir, lo que se está mirando (el pliegue, ya subido al principio); al cerrar, la cabecera
    var ancla = abierta ? (ap && !ap.hidden ? ap : pl) : sec.querySelector('.cab');
    var anclaAntes = ancla.getBoundingClientRect().top;
    var desde = pl.getBoundingClientRect().height;
    var apAlto = ap && !ap.hidden ? ap.getBoundingClientRect().height : 0;
    // lo compensamos nosotros, no el navegador (Chrome, en la página principal, solo atiende al de body)
    var anclajes = [document.documentElement, document.body];
    anclajes.forEach(function (n) { n.style.overflowAnchor = 'none'; });
    if (ap) ap._recoger = abierta && !ap.hidden && !!ap.animate;
    abrir(sec, abierta);
    var mover = ancla.getBoundingClientRect().top - anclaAntes;
    if (Math.abs(mover) > 1) sinSuave(function () { window.scrollBy(0, mover); });
    var soltarAnclaje = function () { anclajes.forEach(function (n) { n.style.overflowAnchor = ''; }); };
    if (!pl.animate) { if (ap) { ap._recoger = false; ap.hidden = abierta; } soltarAnclaje(); return; }
    var dura;
    if (muestra) {
      var hasta = pl.getBoundingClientRect().height, CORTE = 0.45;
      dura = movil ? RECOLOCA_MOVIL : RECOLOCA;
      sec.classList.add('preparando');                         // su capa, mientras dura (ya puesta si se fue a pulsar)
      clearTimeout(sec._sinCapa);
      sec._sinCapa = setTimeout(function () { sec.classList.remove('preparando'); }, dura + 150);
      var mov = piezas.map(function (el, i) {
        var b = el.getBoundingClientRect();
        return { el: el, b: b, dx: antes[i].left - b.left, dy: antes[i].top - b.top };
      });
      var dentro = sec.querySelector('.pliegue__dentro');
      dentro.style.position = 'relative';                      // para lo que se queda pintado donde estaba
      setTimeout(function () { if (!sec.querySelector('.fantasma') && !textos.some(function (t) { return t.style.position; })) dentro.style.position = ''; }, dura + 60);
      if (!abierta) {                                          // los textos se quedan donde estaban mientras se van
        textos.forEach(function (t, k) { fijarTexto(t, textosAntes[k].caja, textosAntes[k].display); });
        setTimeout(function () { if (!sec.classList.contains('abierta')) textos.forEach(soltarTexto); }, dura + 30);
      }
      if (movil) {
        /* EN EL MÓVIL (14-oct, Javi: «que se recoloque todo muy suave y muy sutilmente… en el móvil es donde me
           chirría»): una sola columna y el mismo orden abierta y cerrada, así que nada se cruza. Todo baja (o sube) a la
           vez y con la misma curva, el pliegue crece a su paso y cada texto asoma por el hueco que le deja la pieza de
           debajo (al cerrar, la pieza que sube lo va tapando). Nada desaparece de golpe ni se queda la pantalla vacía */
        // sin recortar (sin .rodando): nada pasa del borde de abajo, que va a su ritmo, y arriba la primera pieza
        // puede venir de un poco más arriba que el pliegue (la piedra ha entrado en la cabecera y lo ha empujado)
        if (Math.abs(hasta - desde) > 4) {
          pl._rodar = pl.animate([{ height: desde + 'px' }, { height: hasta + 'px' }], { duration: dura, easing: RODAR });
          pl._rodar.onfinish = function () { pl._rodar = null; };
        }
        mov.forEach(function (m) {
          if (Math.abs(m.dx) < 1 && Math.abs(m.dy) < 1) return;
          m.el._llevar = m.el.animate([{ translate: m.dx + 'px ' + m.dy + 'px' }, { translate: '0 0' }], { duration: dura, easing: RODAR });
          m.el._llevar.onfinish = function () { m.el._llevar = null; };
        });
        var plArriba = pl.getBoundingClientRect().top;
        textos.forEach(function (t, k) {
          var caja = abierta ? t.getBoundingClientRect() : textosAntes[k].caja, sig = null;
          // la pieza que tiene justo debajo donde se ve el texto (abierta: al final; al cerrar: al principio)
          mov.forEach(function (m) {
            var top = abierta ? m.b.top : m.b.top + m.dy;
            if (top >= caja.bottom - 2 && (!sig || top < (abierta ? sig.b.top : sig.b.top + sig.dy))) sig = m;
          });
          var debajo;
          if (sig) {
            var hueco = (abierta ? sig.b.top : sig.b.top + sig.dy) - caja.bottom;
            debajo = function (e) { return sig.b.top + sig.dy * (1 - e) - hueco; };
          } else {                                             // el último: lo destapa (o lo tapa) el borde del pliegue
            var holgura = plArriba + (abierta ? hasta : desde) - caja.bottom;
            debajo = function (e) { return plArriba + desde + (hasta - desde) * e - holgura; };
          }
          cortina(t, caja, debajo, dura, !abierta);
        });
      } else {
        /* COMO QUIEN RECOLOCA UNA MESA (14-oct, Javi: que nada pase por dentro de nada). Al abrir, las fotos bajan
           primero (el pliegue crece a su paso) y luego van a su sitio; la tablet espera a que quede el hueco y se
           desliza. Al cerrar, al revés: la tablet vuelve primero, las fotos van por abajo y suben al final (el pliegue
           encoge a su paso). Los títulos que cambian mucho de sitio no vuelan: se apagan en su sitio y se encienden en
           el nuevo (antes desaparecían de golpe) */
        if (Math.abs(hasta - desde) > 4) {
          pl.classList.add('rodando');
          pl._rodar = pl.animate(abierta
            ? [{ height: desde + 'px', easing: RODAR }, { height: hasta + 'px', offset: CORTE }, { height: hasta + 'px' }]
            : [{ height: desde + 'px' }, { height: desde + 'px', offset: CORTE, easing: RODAR }, { height: hasta + 'px' }],
            { duration: dura });
          pl._rodar.onfinish = function () { pl.classList.remove('rodando'); pl._rodar = null; };
        }
        mov.forEach(function (m, i) {
          var el = m.el, dx = m.dx, dy = m.dy;
          if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return;
          var t = function (x, y) { return { translate: x + 'px ' + y + 'px' }; }, kf;
          if (el.classList.contains('subtitulo')) {
            if (Math.hypot(dx, dy) < 60) {                    // se corre un poco: al abrir, cuando la tablet ya ha pasado
              kf = abierta ? [t(dx, dy), Object.assign(t(dx, dy), { offset: 0.66, easing: RODAR }), t(0, 0)]
                : [Object.assign(t(dx, dy), { easing: RODAR }), Object.assign(t(0, 0), { offset: 0.45 }), t(0, 0)];
              el._llevar = el.animate(kf, { duration: dura });
              el._llevar.onfinish = function () { el._llevar = null; };
              return;
            }
            fantasma(el, antes[i], 260);
            el._llevar = el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 600, delay: dura * 0.78, easing: 'ease', fill: 'backwards' });
            el._llevar.onfinish = function () { el._llevar = null; };
            return;
          }
          if (el.classList.contains('copias')) kf = abierta
            ? [Object.assign(t(dx, dy), { easing: RODAR }), Object.assign(t(dx, 0), { offset: CORTE, easing: RODAR }), t(0, 0)]
            : [t(dx, dy), Object.assign(t(dx, dy), { offset: 0.1, easing: RODAR }), Object.assign(t(0, dy), { offset: 0.5, easing: RODAR }), t(0, 0)];
          else kf = abierta                                    // la tablet y su cadena, juntas
            ? [t(dx, dy), Object.assign(t(dx, dy), { offset: 0.3, easing: RODAR }), t(0, 0)]
            : [Object.assign(t(dx, dy), { easing: RODAR }), Object.assign(t(0, 0), { offset: 0.6 }), t(0, 0)];
          el._llevar = el.animate(kf, { duration: dura });
          el._llevar.onfinish = function () { el._llevar = null; };
        });
        textos.forEach(function (txt, k) {
          var av = txt.closest('.pliego--vuelta');             // los de audiovisual, cuando las fotos ya han dejado su sitio
          if (abierta) txt._cortina = txt.animate([{ opacity: 0, translate: '0 14px' }, { opacity: 1, translate: '0 0' }],
            { duration: 750, delay: dura * (av ? 0.78 : 0.6) + k * 90, easing: 'cubic-bezier(.16, 1, .3, 1)', fill: 'backwards' });
          else txt._cortina = txt.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 240, easing: 'ease-out', fill: 'forwards' });
        });
      }
    } else {
      var caja = pl.getBoundingClientRect();
      var vista = Math.max(0, window.innerHeight - caja.top + apAlto + 60);   // las fichas se recogen a la vez
      var de = Math.min(desde, vista), hastaV = Math.min(abierta ? caja.height : 0, vista);
      dura = Math.round(Math.min(1600, Math.max(900, Math.abs(hastaV - de) * 1.7)));
      if (Math.abs(hastaV - de) >= 4) {
        pl.classList.add('rodando');
        pl._rodar = pl.animate([{ height: de + 'px' }, { height: hastaV + 'px' }], { duration: dura, easing: RODAR });
        pl._rodar.onfinish = function () { pl.classList.remove('rodando'); pl._rodar = null; };
      }
      if (ap) {                                                // las fichas: se recogen al abrir; vuelven al cerrar
        var alto = abierta ? apAlto : ap.getBoundingClientRect().height, margen = getComputedStyle(ap).marginTop;
        var lleno = { height: alto + 'px', marginTop: margen, opacity: 1 }, vacio = { height: '0px', marginTop: '0px', opacity: 0 };
        ap.style.overflow = 'hidden';
        // forwards: al acabar de recogerse no vuelve a asomar un instante antes de esconderse
        var anim = ap._anim = ap.animate(abierta ? [lleno, vacio] : [vacio, lleno], { duration: dura, easing: RODAR, fill: 'forwards' });
        anim.onfinish = function () {
          if (ap._recoger) { ap._recoger = false; ap.hidden = true; }
          ap.style.overflow = ''; anim.cancel(); if (ap._anim === anim) ap._anim = null;
        };
      }
    }
    var posarse = function (ms) {                              // la piedra aparece en su sitio nuevo, como posándose
      piedra.animate([{ opacity: 0, translate: '0 -14px' }, { opacity: 1, translate: '0 0' }],
        { duration: 600, delay: ms, easing: 'cubic-bezier(.16, 1, .3, 1)', fill: 'backwards' });
    };
    // en «Qué hacemos» no cruza la sección volando por encima de las piezas: se posa arriba cuando ya hay sitio
    if (abierta && muestra) posarse(dura * 0.55);
    else if (abierta) llevar(piedra, piedraAntes, dura);       // en «Sobre la mesa», sube a su sitio
    else if (sec.querySelector('.seccion__pie')) posarse(dura - 150);   // y se posa al final
    clearTimeout(desplegar._soltar);
    desplegar._soltar = setTimeout(soltarAnclaje, dura + 100);
  }
  /* «VER TODO» (14-oct, en el móvil; 15-oct, también en el ordenador, Javi: «que te lleve arriba del todo para
     empezar la lectura, justo donde empieza el software a medida»): la piedra está al final de la muestra y abrir ahí
     dejaba al usuario a mitad de la sección. Antes de recolocar, la página sube suave hasta que el primer título queda
     arriba, bajo la barra, y la recolocación se ve delante. Si el usuario toca la pantalla mientras sube, se para y
     se abre ahí mismo */
  function subirYAbrir(sec) {
    var pl = sec.querySelector('.pliegue'), tit = sec.querySelector('.pliego .subtitulo') || pl;
    sec.classList.add('preparando'); clearTimeout(sec._sinCapa);   // mientras sube, las piezas ya van a su capa
    var barra = document.getElementById('barra'), arriba = barra ? Math.max(0, barra.getBoundingClientRect().bottom) : 0;
    var d = tit.getBoundingClientRect().top - (arriba + 24);
    if (Math.abs(d) < 40 || !window.requestAnimationFrame) { desplegar(sec, true); return; }
    var y0 = window.scrollY, ms = Math.round(Math.min(950, Math.max(450, Math.abs(d) * 0.45))), t0 = null, hecho = false;
    var acabar = function () {
      if (hecho) return;
      hecho = true; sec._subiendo = false;
      window.removeEventListener('touchstart', acabar); window.removeEventListener('wheel', acabar);
      desplegar(sec, true);
    };
    sec._subiendo = true;
    window.addEventListener('touchstart', acabar, { passive: true }); window.addEventListener('wheel', acabar, { passive: true });
    requestAnimationFrame(function paso(ahora) {
      if (hecho) return;
      if (t0 === null) t0 = ahora;
      var s = Math.min(1, (ahora - t0) / ms);
      sinSuave(function () { window.scrollTo(0, y0 + d * curvaPulso(s)); });
      if (s < 1) requestAnimationFrame(paso); else acabar();
    });
  }
  var plegables = document.querySelectorAll('.plegable');
  plegables.forEach(function (sec) {
    var boton = sec.querySelector('.piedra');
    abrir(sec, false);
    if (sec.classList.contains('plegable--muestra')) {
      /* LAS CAPAS, SOLO AL IR A USARLAS (14-oct): al acercarse a la piedra (ratón, dedo o teclado) las piezas pasan a
         su propia capa (css, .preparando); desplegar() la quita al acabar de recolocar, y si no se pulsa, a los 4 s */
      var preparar = function () {
        sec.classList.add('preparando');
        clearTimeout(sec._sinCapa);
        sec._sinCapa = setTimeout(function () { sec.classList.remove('preparando'); }, 4000);
      };
      ['pointerenter', 'touchstart', 'focus'].forEach(function (ev) { boton.addEventListener(ev, preparar, { passive: true }); });
    }
    boton.addEventListener('click', function () {
      if (sec._subiendo) return;
      var abrirla = !sec.classList.contains('abierta');
      if (abrirla && sec.classList.contains('plegable--muestra')) subirYAbrir(sec);
      else desplegar(sec, abrirla);
    });
    sec.querySelector('.cab__losa .estela').addEventListener('click', function () { boton.click(); });
  });
  /* LAS RAYAS QUE INVITAN A PULSAR, A LA VEZ (14-oct, Javi: «la de arriba llega antes que la de abajo»): cada raya
     empieza cuando se pinta su pestaña, y al cambiar de rama o de trabajo nacen rayas nuevas desacompasadas. Se las
     pone a todas en el mismo reloj (el de la página): Software/Audiovisual y los trabajos se dibujan juntos */
  function acompasarRayas() {
    if (!document.getAnimations) return;
    document.getAnimations().forEach(function (a) { if (a.animationName === 'invita') a.startTime = 0; });
  }
  /* pestañas (accesibles, con flechas): el reparto (una copia por personaje; al elegirla se ve su ficha) y, desde el
     06-oct, los trabajos (Javi: «que ocupen menos espacio»): uno a la vista y los demás a un clic */
  document.querySelectorAll('[role="tablist"]').forEach(function (lista) {
    var pestanas = Array.prototype.slice.call(lista.querySelectorAll('[role="tab"]'));
    function elegir(b, foco) {
      pestanas.forEach(function (o) {
        var sel = o === b;
        o.setAttribute('aria-selected', sel ? 'true' : 'false');
        o.tabIndex = sel ? 0 : -1;
        document.getElementById(o.getAttribute('aria-controls')).hidden = !sel;
      });
      if (foco) b.focus();
      acompasarRayas();
    }
    pestanas.forEach(function (b, i) {
      b.addEventListener('click', function () { elegir(b); });
      b.addEventListener('keydown', function (e) {
        var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (d) { e.preventDefault(); elegir(pestanas[(i + d + pestanas.length) % pestanas.length], true); }
      });
    });
    if (pestanas.length) elegir(pestanas[0]);
  });

  /* APERITIVO (13-oct, Javi): cada ficha de trabajo abre la sección ya en el suyo (su rama y su pestaña) y baja hasta
     él cuando el pergamino acaba de desenrollarse. Primero se abre: con la sección cerrada el pliegue es inerte y no
     acepta clics */
  document.querySelectorAll('.aperitivo').forEach(function (ap) {
    var sec = ap.closest('.plegable');
    if (!sec) return;
    var pl = sec.querySelector('.pliegue');
    ap.querySelectorAll('[data-ap-trab]').forEach(function (b) {
      b.addEventListener('click', function () {
        var tab = document.getElementById(b.getAttribute('data-ap-trab'));
        if (!tab) return;
        if (!sec.classList.contains('abierta')) desplegar(sec, true);
        var panel = tab.closest('[role="tabpanel"]');
        var rama = panel && document.querySelector('[role="tab"][aria-controls="' + panel.id + '"]');
        if (rama) rama.click();
        tab.click();
        var destino = (rama && rama.closest('.ramas-sel')) || document.getElementById(tab.getAttribute('aria-controls'));
        var bajar = function () { destino.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
        // se baja cuando ya está todo en su sitio: el trabajo desenrollado y las fichas recogidas y escondidas
        var esperar = [pl._rodar, ap._anim].filter(function (a) { return a && a.finished; })
          .map(function (a) { return a.finished.catch(function () {}); });
        if (esperar.length && window.Promise) Promise.all(esperar).then(function () { setTimeout(bajar, 60); });
        else bajar();
      });
    });
  });

  /* las animaciones de las ramas (Software / Audiovisual), quietas mientras no se ven */
  var ramasSel = document.querySelector('.ramas-sel');
  if (ramasSel && 'IntersectionObserver' in window) {
    ramasSel.classList.add('ramas-sel--quieta');
    new IntersectionObserver(function (e) { ramasSel.classList.toggle('ramas-sel--quieta', !e[0].isIntersecting); }).observe(ramasSel);
  }

  /* la cadena de la tablet, igual: se mueve solo mientras se ve */
  document.querySelectorAll('.maq').forEach(function (fig) {
    if (!('IntersectionObserver' in window)) { fig.classList.add('cadena--viva'); return; }
    new IntersectionObserver(function (e) { fig.classList.toggle('cadena--viva', e[0].isIntersecting); }).observe(fig);
  });

  /* DESLIZAR, EN EL MÓVIL (14-oct, Javi: «que en el móvil deslizando puedas pasar de tipo de trabajo… y si deslizas
     en la parte de software y producción audiovisual, se desliza de rama… a la altura que sea… inclusive en la misma
     descripción del trabajo»). Además de pulsar: en la fila de las ramas se cambia de rama; en un trabajo (sus
     pestañas, su dibujo o vídeo y su texto) se pasa al siguiente o al anterior, y del último de una rama al primero de
     la otra; sobre las estrellas de diseño, de una a otra. Lo que ya se desliza de lado
     por su cuenta (la tira de obras) manda. Solo cuentan los gestos claramente de lado: el scroll no se toca. Lo nuevo
     entra por el lado hacia el que se desliza; si no hay más, un amago. Si la fila de pestañas quedó por encima de la
     pantalla, se sube a ella para ver lo nuevo desde el principio */
  (function deslizar() {
    var zona = document.getElementById('trab-pliegue'), sec = document.getElementById('trabajo');
    var ramas = document.querySelector('.ramas-sel');
    if (!zona || !sec || !ramas || !('ontouchstart' in window)) return;
    var pestanas = function (lista) { return lista ? [].slice.call(lista.querySelectorAll('[role="tab"]')) : []; };
    var ramasB = pestanas(ramas), x0 = 0, y0 = 0, t0 = 0, origen = null;
    var elegida = function (bs) { for (var i = 0; i < bs.length; i++) if (bs[i].getAttribute('aria-selected') === 'true') return i; return 0; };
    var panel = function (b) { return document.getElementById(b.getAttribute('aria-controls')); };
    function entrar(el, paso) {
      if (el && el.animate) el.animate([{ translate: (paso * 44) + 'px 0', opacity: 0 }, { translate: '0 0', opacity: 1 }],
        { duration: 460, easing: 'cubic-bezier(.16, 1, .3, 1)' });
    }
    function tope(el, paso) {
      if (el && el.animate) el.animate([{ translate: '0 0' }, { translate: (-paso * 16) + 'px 0' }, { translate: '0 0' }],
        { duration: 320, easing: 'ease-out' });
    }
    function verArriba(lista) {
      if (lista.getBoundingClientRect().top < 80) lista.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    function pasar(bs, paso, lista) {                           // dentro de una misma fila; false si no hay más
      var i = elegida(bs), j = i + paso;
      if (j < 0 || j >= bs.length) return false;
      bs[j].click(); entrar(panel(bs[j]), paso); verArriba(lista);
      return true;
    }
    function cambiarRama(paso) {
      if (!pasar(ramasB, paso, ramas)) tope(panel(ramasB[elegida(ramasB)]), paso);
    }
    function cambiarTrabajo(rp, paso) {
      var lista = rp.querySelector('.trabajo-sel'), bs = pestanas(lista);
      if (pasar(bs, paso, lista)) return;
      var k = elegida(ramasB) + paso;
      if (k < 0 || k >= ramasB.length) { tope(panel(bs[elegida(bs)]), paso); return; }
      var otra = panel(ramasB[k]), obs = pestanas(otra.querySelector('.trabajo-sel'));
      ramasB[k].click();
      if (obs.length) (paso > 0 ? obs[0] : obs[obs.length - 1]).click();
      entrar(otra, paso); verArriba(ramas);
    }
    zona.addEventListener('touchstart', function (e) {
      origen = null;
      if (e.touches.length !== 1 || !sec.classList.contains('abierta')) return;
      var el = e.target;
      if (el.closest('input, select, textarea, [data-sin-deslizar]')) return;
      for (var n = el; n && n !== zona; n = n.parentElement) {
        if (n.scrollWidth > n.clientWidth + 2 && /auto|scroll/.test(getComputedStyle(n).overflowX)) return;
      }
      origen = el; x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; t0 = Date.now();
    }, { passive: true });
    zona.addEventListener('touchcancel', function () { origen = null; }, { passive: true });
    zona.addEventListener('touchend', function (e) {
      var el = origen;
      origen = null;
      if (!el) return;
      var t = e.changedTouches[0], dx = t.clientX - x0, dy = t.clientY - y0;
      if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy) * 1.7 || Date.now() - t0 > 900) return;
      // 15-oct: «Otras creaciones» y «Avatares» son una pestaña más de su rama: dentro se pasa de trabajo como en los
      // demás, salvo sobre las estrellas (sus pestañas o su ficha), donde se pasa de estrella
      var paso = dx < 0 ? 1 : -1, estrella = el.closest('.reparto-sel, .personaje'), rp = el.closest('.rama-panel');
      if (el.closest('.ramas-sel')) cambiarRama(paso);
      else if (estrella) {
        var rep = estrella.closest('.filas').querySelector('.reparto-sel'), rbs = pestanas(rep);
        if (!pasar(rbs, paso, rep)) tope(panel(rbs[elegida(rbs)]), paso);
      }
      else if (rp) cambiarTrabajo(rp, paso);
      else cambiarRama(paso);
    }, { passive: true });
  })();

  /* el menú y los enlaces llevan a la sección abierta */
  function irA(id) {
    var sec = document.getElementById(id);
    if (sec && sec.classList.contains('plegable')) abrir(sec, true);
  }
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function () { irA(a.getAttribute('href').slice(1)); });
  });
  /* al entrar o recargar, todo cerrado y desde arriba (Javi, 03-oct): la intro se ve entera y el usuario
     despliega lo que quiera. Sin esto, un #servicios que quedara en la dirección abría esa sección */
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  if (location.hash) history.replaceState(null, '', location.pathname + location.search);
  window.scrollTo(0, 0);

  /* ── El visor: las fotos de «También en la mesa», en grande ── */
  var visor = document.getElementById('visor');
  if (visor && visor.showModal) {
    var visorImg = visor.querySelector('.visor__img');
    document.querySelectorAll('.obra__foto').forEach(function (b) {
      b.addEventListener('click', function () {
        var img = b.querySelector('img');
        visorImg.src = b.dataset.grande;
        visorImg.alt = img.alt;
        visor.showModal();
      });
    });
    visor.querySelector('.visor__cerrar').addEventListener('click', function () { visor.close(); });
    visor.addEventListener('click', function (e) { if (e.target === visor) visor.close(); });   // fuera de la foto
  }

  /* ── Vídeos: carga perezosa, suenan de uno en uno, se paran fuera de pantalla ── */
  var piezas = document.querySelectorAll('[data-player]');
  piezas.forEach(function (p) {
    var video = p.querySelector('[data-video]');
    var sonido = p.querySelector('[data-sonido]');
    sonido.addEventListener('click', function () {
      var activar = video.muted;
      if (activar) {
        piezas.forEach(function (otra) {
          if (otra === p) return;
          otra.querySelector('[data-video]').muted = true;
          otra.querySelector('[data-sonido]').setAttribute('aria-pressed', 'false');
        });
      }
      video.muted = !activar;
      sonido.setAttribute('aria-pressed', activar ? 'true' : 'false');
      if (activar) video.play().catch(function () {});
    });
    video.addEventListener('click', function () { if (video.paused) video.play().catch(function () {}); else video.pause(); });
    video.addEventListener('contextmenu', function (e) { e.preventDefault(); });
  });
  if ('IntersectionObserver' in window) {
    var vio = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        var v = e.target;
        if (e.isIntersecting) {
          if (!v.src) v.src = v.dataset.src;
          if (!QUIETO) v.play().catch(function () {});
        } else {
          v.pause();
          if (!v.muted) {
            v.muted = true;
            v.closest('[data-player]').querySelector('[data-sonido]').setAttribute('aria-pressed', 'false');
          }
        }
      });
    }, { threshold: 0.35 });
    document.querySelectorAll('[data-video]').forEach(function (v) { vio.observe(v); });
  } else {
    document.querySelectorAll('[data-video]').forEach(function (v) { v.src = v.dataset.src; v.setAttribute('controls', ''); });
  }

  /* ── Idioma de la página, y el año del pie ──────────────────── */
  /* Cada idioma es su propia página (27-oct, posicionamiento): la inglesa (/en, hecha con _tools/version_ingles.py)
     ya viene escrita en inglés, y aquí solo se avisa a lo que cambia en vivo (el código de la tablet, los enlaces de
     contacto, las cartelas del ánfora…). Quien entra por la española con el navegador en inglés ya habrá pasado a la
     inglesa en js/arranque.js (los buscadores no: ven el español en /) */
  if (document.documentElement.lang === 'en') setLang('en', false);
  document.getElementById('anio').textContent = new Date().getFullYear();
})();
