/* Auditoría geométrica de las 40 rutas: compara el ÁRBOL COMPLETO de cajas
   (tag + clase + x,y + w×h) entre el original y el port React.
   Reporta cualquier nodo cuya geometría difiera. */
import puppeteer from 'puppeteer';

const RUTAS = [
  ['login','/login'],['registro','/registro'],['recuperar','/recuperar'],['restablecer','/restablecer'],
  ['verificar','/verificar'],['home','/home'],['post','/post/p1'],['guardados','/guardados'],
  ['vertical','/vertical'],['crear','/crear'],['crear-publicacion','/crear-publicacion'],
  ['historias','/historias'],['buscar','/buscar'],['perfil','/perfil'],['perfil-u','/u/ivanmora'],
  ['circles','/circles'],['orbits','/orbits'],['orbit','/orbit/Kairos Lab'],['channels','/channels'],
  ['mensajes','/mensajes'],['chat','/mensajes/c1'],['conversaciones','/conversaciones'],
  ['notificaciones','/notificaciones'],['kairos','/kairos'],['kairos-imagen','/kairos-imagen'],
  ['kairos-video','/kairos-video'],['kairos-trabajos','/kairos-trabajos'],['kairos-scripts','/kairos-scripts'],
  ['kairos-historial','/kairos-historial'],['library','/library'],['live','/live'],['capsules','/capsules'],
  ['pulse','/pulse'],['analytics','/analytics'],['settings','/settings'],['settings-perfil','/settings-perfil'],
  ['settings-seguridad','/settings-seguridad'],['admin','/admin'],['splash','/'],['404','/no-existe'],
];

const snap = (sel) => {
  const raiz = document.querySelector('.screen.active') || document.body;
  return [...raiz.querySelectorAll(sel)].map((el) => {
    const r = el.getBoundingClientRect();
    const c = (el.className && el.className.baseVal !== undefined) ? el.className.baseVal : (el.className || '');
    return { t: el.tagName.toLowerCase(), c: String(c), x: Math.round(r.x), y: Math.round(r.y + scrollY), w: Math.round(r.width), h: Math.round(r.height) };
  });
};

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox','--disable-setuid-sandbox','--font-render-hinting=none'] });
const mk = async () => {
  const p = await browser.newPage();
  await p.setViewport({ width: 430, height: 932 });
  await p.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  return p;
};
const po = await mk(), pr = await mk();

let totalNodos = 0, totalDif = 0; const detalle = [];
for (const [slug, ruta] of RUTAS) {
  await po.goto('http://localhost:8080/kronos.html#/', { waitUntil: 'load' });
  await po.evaluate((h) => { location.hash = h; }, '#' + ruta);
  await new Promise((r) => setTimeout(r, 260));
  const A = await po.evaluate(snap, '*');

  await pr.goto('http://localhost:5173/#/', { waitUntil: 'load' });
  await pr.evaluate((h) => { location.hash = h; }, '#' + ruta);
  await new Promise((r) => setTimeout(r, 260));
  const B = await pr.evaluate(snap, '*');

  totalNodos += Math.max(A.length, B.length);
  const dif = [];
  const n = Math.max(A.length, B.length);
  for (let i = 0; i < n; i++) {
    const a = A[i], b = B[i];
    if (!a || !b) { dif.push(`#${i} nodo ausente: ${(a || b).t}.${(a || b).c}`); continue; }
    const dx = b.x - a.x, dy = b.y - a.y, dw = b.w - a.w, dh = b.h - a.h;
    if (dx || dy || dw || dh) {
      dif.push(`#${i} ${a.t}.${a.c || '—'} orig(${a.x},${a.y} ${a.w}×${a.h}) → react(${b.x},${b.y} ${b.w}×${b.h}) Δx${dx} Δy${dy} Δw${dw} Δh${dh}`);
    }
  }
  totalDif += dif.length;
  detalle.push(`${slug.padEnd(20)} nodos ${String(A.length).padStart(3)}/${String(B.length).padStart(3)}  diferencias: ${dif.length}`);
  if (dif.length) dif.slice(0, 5).forEach((d) => detalle.push('      · ' + d));
}
await browser.close();

console.log('=== AUDITORÍA GEOMÉTRICA — 40 rutas ===');
console.log(detalle.join('\n'));
console.log(`\nTOTAL: ${totalNodos} nodos comparados · ${totalDif} con diferencias geométricas`);
