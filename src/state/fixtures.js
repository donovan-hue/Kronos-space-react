/* ============================================================
   KRONOS — Datos de ejemplo (fixtures)
   Extraídos VERBATIM del objeto `S` y del Object.assign(S, {...})
   de kronos.html.

   En el original estaban embebidos en el mismo script que las vistas.
   Aquí se aíslan en un único módulo de datos para que sustituirlos por
   la API real sea un cambio localizado (§22 de la orden).
   ============================================================ */

export const USER = { name: 'Ana Ruiz', username: 'anaruiz', initials: 'AR' };

export const POSTS = [
  { id: 'p1', a: 'Ana Ruiz', u: 'anaruiz', ini: 'AR', t: 'hace 12 min', txt: 'Primera cápsula programada para abrirse en 2031. Cinco años guardando un mensaje que ni yo recuerdo haber escrito.', media: 'caps', likes: 128, comments: 14 },
  { id: 'p2', a: 'Iván Mora', u: 'ivanmora', ini: 'IM', t: 'hace 1 h', txt: 'Render nuevo del orbitador. Generado en Kairos con un prompt de nueve palabras.', media: 'orb', likes: 342, comments: 51 },
  { id: 'p3', a: 'Lucía Fenn', u: 'lfenn', ini: 'LF', t: 'hace 3 h', txt: 'El tiempo no se gestiona, se ocupa. Lo demás es inventario.', media: null, likes: 76, comments: 9 },
];

export const STORIES = [
  { n: 'Tu historia', i: '+', me: true },
  { n: 'ivanmora', i: 'IM' }, { n: 'lfenn', i: 'LF' }, { n: 'noa.k', i: 'NK' },
  { n: 'zeta', i: 'ZT' }, { n: 'mariel', i: 'MR' }, { n: 'orbit_9', i: 'O9' },
];

export const COMMENTS = [
  { a: 'Iván Mora', ini: 'IM', t: 'hace 8 min', txt: 'Esto es exactamente lo que buscaba en la plataforma.' },
  { a: 'Lucía Fenn', ini: 'LF', t: 'hace 4 min', txt: '¿La cápsula se puede compartir con un círculo entero o solo individual?' },
];

export const USERS = [
  { n: 'Iván Mora', u: 'ivanmora', i: 'IM', b: 'Diseño orbital, render y ruido.', f: '12.4k', g: '842' },
  { n: 'Lucía Fenn', u: 'lfenn', i: 'LF', b: 'Escribo sobre el tiempo que no vuelve.', f: '8.1k', g: '311' },
  { n: 'Noa Kael', u: 'noa.k', i: 'NK', b: 'Cápsulas, archivos y memoria.', f: '3.9k', g: '204' },
  { n: 'Zeta Ruiz', u: 'zeta', i: 'ZT', b: 'Live todos los jueves.', f: '22k', g: '90' },
  { n: 'Mariel Ocampo', u: 'mariel', i: 'MR', b: 'Fotografía de larga exposición.', f: '5.6k', g: '677' },
];

export const CONVS = [
  { id: 'c1', n: 'Iván Mora', i: 'IM', last: 'Te paso el render en cuanto salga', t: '12:40', un: 2 },
  { id: 'c2', n: 'Órbita Kairos', i: 'OK', last: 'Lucía: subí el script v3', t: '11:02', un: 0, grp: true },
  { id: 'c3', n: 'Noa Kael', i: 'NK', last: 'Visto', t: 'Ayer', un: 0 },
];

export const MSGS = {
  c1: [
    { me: false, txt: 'Oye, ¿viste la cápsula que programé?', t: '12:31' },
    { me: true, txt: 'Sí, la de 2031. Muy buena idea.', t: '12:33', st: 'leído' },
    { me: false, txt: 'Te paso el render en cuanto salga', t: '12:40' },
  ],
  c2: [{ me: false, txt: 'Lucía: subí el script v3', t: '11:02' }],
  c3: [{ me: true, txt: '¿Nos vemos en el live?', t: 'Ayer', st: 'entregado' }],
};

export const NOTIFS = [
  { k: 'like', a: 'Iván Mora', i: 'IM', txt: 'le dio me gusta a tu publicación', t: 'hace 5 min', un: true },
  { k: 'follow', a: 'Lucía Fenn', i: 'LF', txt: 'empezó a seguirte', t: 'hace 22 min', un: true },
  { k: 'comment', a: 'Noa Kael', i: 'NK', txt: 'comentó: ¿se puede compartir con un círculo?', t: 'hace 1 h', un: false },
  { k: 'orbit', a: 'Órbita Kairos', i: 'OK', txt: 'publicó algo nuevo en la órbita', t: 'hace 3 h', un: false },
  { k: 'caps', a: 'KRONOS', i: 'KS', txt: 'tu cápsula se abre en 9 días', t: 'ayer', un: false },
];

export const JOBS = [
  { id: 'j1', p: 'Orbitador plateado girando sobre fondo negro', st: 'processing', pr: 62 },
  { id: 'j2', p: 'Reloj de cromo flotando en el vacío, 8 segundos', st: 'success', pr: 100 },
  { id: 'j3', p: 'Time-lapse de una cápsula abriéndose', st: 'failure', pr: 0 },
];

export const CAPS = [
  { id: 'k1', t: 'Carta a los 30', d: '14 mar 2031', open: false, txt: '' },
  { id: 'k2', t: 'Primer prototipo', d: '02 ene 2026', open: true, txt: 'Si estás leyendo esto, el prototipo funcionó. Guarda la versión 0.1, algún día va a dar risa.' },
  { id: 'k3', t: 'Para el equipo', d: '20 jun 2027', open: false, txt: '' },
];

export const CIRCLES = [
  { n: 'Núcleo', m: 8, p: 'Privado', d: 'Gente con la que comparto todo.' },
  { n: 'Trabajo', m: 24, p: 'Restringido', d: 'Equipo y colaboradores.' },
  { n: 'Archivo', m: 3, p: 'Secreto', d: 'Solo para cápsulas largas.' },
];

export const ORBITS = [
  { n: 'Kairos Lab', m: 1240, d: 'Experimentos con generación AI.', r: 'Admin' },
  { n: 'Larga Exposición', m: 486, d: 'Fotografía de tiempo y luz.', r: 'Miembro' },
  { n: 'Cápsulas 2030', m: 92, d: 'Mensajes que se abren en el futuro.', r: 'Moderador' },
];

export const CHANNELS = [
  { n: 'anuncios', o: 'Kairos Lab', m: 1240, r: 'Solo lectura' },
  { n: 'general', o: 'Kairos Lab', m: 1240, r: 'Abierto' },
  { n: 'renders', o: 'Kairos Lab', m: 318, r: 'Abierto' },
  { n: 'moderación', o: 'Cápsulas 2030', m: 6, r: 'Privado' },
];

export const ROOMS = [
  { n: 'Jueves de render', h: 'zeta', v: 312, on: true },
  { n: 'Preguntas sobre Kairos', h: 'ivanmora', v: 84, on: true },
  { n: 'Lectura de cápsulas', h: 'lfenn', v: 0, on: false },
];

export const HIST = [
  { k: 'Imagen', p: 'Orbitador plateado sobre negro', t: 'hace 2 h' },
  { k: 'Script', p: 'Guion de 30 s para lanzamiento', t: 'ayer' },
  { k: 'Video', p: 'Reloj de cromo flotando', t: 'hace 3 d' },
  { k: 'Imagen', p: 'Textura de metal pulido', t: 'hace 5 d' },
];

export const PULSE = [
  { t: 'Cápsulas colectivas', d: '1.2k personas abrieron una cápsula hoy', m: '+48%' },
  { t: 'Kairos video', d: 'Trabajos completados en la última hora', m: '+12%' },
  { t: 'Live', d: 'Salas activas ahora mismo', m: '31' },
  { t: 'Órbitas nuevas', d: 'Creadas esta semana', m: '217' },
];

export const BLOCKED = ['spam_bot_01', 'troll42'];
export const MUTED = ['ruido.diario'];
export const REPORTS = [
  { w: '@spam_bot_01', r: 'Spam masivo', st: 'En revisión' },
  { w: 'Publicación #4821', r: 'Contenido engañoso', st: 'Resuelto' },
];
export const ADMINS = [
  { n: 'Ana Ruiz', u: 'anaruiz', r: 'Owner', st: 'Activo' },
  { n: 'Iván Mora', u: 'ivanmora', r: 'Admin', st: 'Activo' },
  { n: 'Lucía Fenn', u: 'lfenn', r: 'Moderador', st: 'Activo' },
  { n: 'spam_bot_01', u: 'spam_bot_01', r: 'Usuario', st: 'Suspendido' },
];

export const INITIAL_STATE = {
  user: USER,
  liked: {},
  saved: {},
  posts: POSTS,
  stories: STORIES,
  comments: COMMENTS,
  ui: {},
  follow: {},
  users: USERS,
  convs: CONVS,
  msgs: MSGS,
  notifs: NOTIFS,
  jobs: JOBS,
  caps: CAPS,
  circles: CIRCLES,
  orbits: ORBITS,
  channels: CHANNELS,
  rooms: ROOMS,
  hist: HIST,
  pulse: PULSE,
  blocked: BLOCKED,
  muted: MUTED,
  reports: REPORTS,
  admins: ADMINS,
};
