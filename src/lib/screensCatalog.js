/* Catálogo de pantallas — portado VERBATIM del arreglo `MAP` de kronos.html.
   40 pantallas en 15 grupos. Se conserva como DATO (no como vista) y sirve
   de checklist de paridad visual: cada entrada debe existir en React.
   `hash` es la ruta original (para mostrarla tal cual en /pantallas);
   `to` es la misma ruta en el router de React (sin el '#'). */
export const MAP = [
  ['Autenticación', [['Login', '#/login'], ['Registro', '#/registro'], ['Recuperar contraseña', '#/recuperar'], ['Restablecer contraseña', '#/restablecer'], ['Verificar correo', '#/verificar']]],
  ['Inicio y social', [['Home / Feed', '#/home'], ['Detalle de publicación', '#/post/p1'], ['Publicaciones guardadas', '#/guardados'], ['Feed vertical', '#/vertical']]],
  ['Creación', [['Centro de creación', '#/crear'], ['Crear publicación', '#/crear-publicacion'], ['Archivo de historias', '#/historias']]],
  ['Usuarios', [['Búsqueda / Explore', '#/buscar'], ['Perfil', '#/perfil'], ['Perfil por username', '#/u/ivanmora']]],
  ['Comunidades', [['Circles', '#/circles'], ['Orbits', '#/orbits'], ['Feed de Orbit', '#/orbit/Kairos Lab'], ['Channels', '#/channels']]],
  ['Mensajería', [['Mensajes', '#/mensajes'], ['Conversación activa', '#/mensajes/c1'], ['Crear conversación', '#/conversaciones']]],
  ['Notificaciones', [['Notificaciones', '#/notificaciones']]],
  ['Kairos / AI', [['Centro Kairos', '#/kairos'], ['Generador de imágenes', '#/kairos-imagen'], ['Generador de video', '#/kairos-video'], ['Trabajos de video', '#/kairos-trabajos'], ['Generador de scripts', '#/kairos-scripts'], ['Historial', '#/kairos-historial'], ['Library', '#/library']]],
  ['Live', [['Live', '#/live']]],
  ['Capsules', [['Capsules', '#/capsules']]],
  ['Pulse', [['Pulse', '#/pulse']]],
  ['Analytics', [['Analytics', '#/analytics']]],
  ['Settings', [['Settings', '#/settings'], ['Profile Settings', '#/settings-perfil'], ['Security / Moderation', '#/settings-seguridad']]],
  ['Administración', [['Admin', '#/admin']]],
  ['Sistema', [['Splash', '#/'], ['Página 404', '#/no-existe']]],
];

export const SCREEN_COUNT = MAP.reduce((n, g) => n + g[1].length, 0);

/** '#/u/ivanmora' → '/u/ivanmora' */
export const hashToPath = (hash) => hash.replace(/^#/, '');
