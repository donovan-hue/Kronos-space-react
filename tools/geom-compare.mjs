/* Compara las cajas reales (getBoundingClientRect) de cada elemento entre el
   original y el port React. Detecta diferencias de tamaño/posición exactas. */
import puppeteer from 'puppeteer';

const [, , ruta, selector = '*'] = process.argv;
const ORIGEN = 'http://localhost:8080/kronos.html';
const PORT = 'http://localhost:5173/';

async function medir(page, base, hash) {
  await page.goto(base + '#/', { waitUntil: 'load' });
  await page.evaluate((h) => { window.location.hash = h; }, '#' + hash);
  await new Promise((r) => setTimeout(r, 300));
  return page.evaluate((sel) => {
    const raiz = document.querySelector('.screen.active') || document.body;
    const nodos = [...raiz.querySelectorAll(sel)];
    return nodos.map((el) => {
      const r = el.getBoundingClientRect();
      return {
        tag: el.tagName.toLowerCase(),
        cls: (el.className && el.className.baseVal !== undefined ? el.className.baseVal : el.className) || '',
        x: Math.round(r.x), y: Math.round(r.y + window.scrollY),
        w: Math.round(r.width), h: Math.round(r.height),
      };
    });
  }, selector);
}

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox', '--font-render-hinting=none'] });
const p1 = await browser.newPage();
await p1.setViewport({ width: 430, height: 932 });
await p1.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
const A = await medir(p1, ORIGEN, ruta);

const p2 = await browser.newPage();
await p2.setViewport({ width: 430, height: 932 });
await p2.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
const B = await medir(p2, PORT, ruta);
await browser.close();

const clave = (o) => `${o.tag}.${String(o.cls).split(' ').filter(Boolean).join('.')}`;
const n = Math.max(A.length, B.length);
console.log(`ruta=${ruta}  selector="${selector}"  original=${A.length} nodos  react=${B.length} nodos\n`);
console.log('  #  ORIGINAL (tag.cls · x,y · w×h)                    REACT                              Δ');
let halladas = 0;
for (let i = 0; i < n; i++) {
  const a = A[i], b = B[i];
  if (!a || !b) { console.log(`${String(i).padStart(3)}  ${a ? clave(a) : '—'}  vs  ${b ? clave(b) : '—'}   (longitud distinta)`); continue; }
  const dx = b.x - a.x, dy = b.y - a.y, dw = b.w - a.w, dh = b.h - a.h;
  if (dx || dy || dw || dh) {
    halladas++;
    if (halladas <= 18) {
      console.log(`${String(i).padStart(3)}  ${clave(a).padEnd(30)} ${String(a.x+','+a.y).padEnd(10)} ${String(a.w+'×'+a.h).padEnd(10)} | ${String(b.x+','+b.y).padEnd(10)} ${String(b.w+'×'+b.h).padEnd(10)} | Δx${dx} Δy${dy} Δw${dw} Δh${dh}`);
    }
  }
}
console.log(`\nTOTAL de nodos con diferencias geométricas: ${halladas} de ${n}`);
