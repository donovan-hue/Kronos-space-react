/* ============================================================
   KRONOS — Verificación visual automática (§18 de la orden)

   Captura las 40 pantallas del original (kronos.html) y del port
   React, y las compara píxel a píxel.

   Uso:  node tools/visual-verify.mjs
   Requisitos: servidor de referencia en :8080 y vite dev en :5173
   ============================================================ */
import fs from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

const ORIGEN = 'http://localhost:8080/kronos.html';
const PORT = 'http://localhost:5173/';
const OUT = path.resolve('../verificacion');

/* Las 40 pantallas del catálogo MAP de kronos.html, en orden. */
const PANTALLAS = [
  ['01-login', '/login'],
  ['02-registro', '/registro'],
  ['03-recuperar', '/recuperar'],
  ['04-restablecer', '/restablecer'],
  ['05-verificar', '/verificar'],
  ['06-home', '/home'],
  ['07-post-detalle', '/post/p1'],
  ['08-guardados', '/guardados'],
  ['09-vertical', '/vertical'],
  ['10-crear', '/crear'],
  ['11-crear-publicacion', '/crear-publicacion'],
  ['12-historias', '/historias'],
  ['13-buscar', '/buscar'],
  ['14-perfil', '/perfil'],
  ['15-perfil-username', '/u/ivanmora'],
  ['16-circles', '/circles'],
  ['17-orbits', '/orbits'],
  ['18-orbit-feed', '/orbit/Kairos Lab'],
  ['19-channels', '/channels'],
  ['20-mensajes', '/mensajes'],
  ['21-chat', '/mensajes/c1'],
  ['22-conversaciones', '/conversaciones'],
  ['23-notificaciones', '/notificaciones'],
  ['24-kairos', '/kairos'],
  ['25-kairos-imagen', '/kairos-imagen'],
  ['26-kairos-video', '/kairos-video'],
  ['27-kairos-trabajos', '/kairos-trabajos'],
  ['28-kairos-scripts', '/kairos-scripts'],
  ['29-kairos-historial', '/kairos-historial'],
  ['30-library', '/library'],
  ['31-live', '/live'],
  ['32-capsules', '/capsules'],
  ['33-pulse', '/pulse'],
  ['34-analytics', '/analytics'],
  ['35-settings', '/settings'],
  ['36-settings-perfil', '/settings-perfil'],
  ['37-settings-seguridad', '/settings-seguridad'],
  ['38-admin', '/admin'],
  ['39-splash', '/'],
  ['40-404', '/no-existe'],
];

const err = (m) => `\x1b[31m${m}\x1b[0m`;
const ok = (m) => `\x1b[32m${m}\x1b[0m`;

async function capturar(page, base, dir) {
  const consola = [];
  page.on('console', (m) => {
    if (m.type() === 'error' || m.type() === 'warning') consola.push(`[${m.type()}] ${m.text()}`);
  });
  page.on('pageerror', (e) => consola.push(`[pageerror] ${e.message}`));

  for (const [slug, ruta] of PANTALLAS) {
    await page.goto(base + '#/', { waitUntil: 'load' });
    await page.evaluate((h) => { window.location.hash = h; }, '#' + ruta);
    await new Promise((r) => setTimeout(r, 260));
    await page.screenshot({ path: path.join(OUT, dir, `${slug}.png`), fullPage: true });
  }
  return consola;
}

(async () => {
  fs.mkdirSync(path.join(OUT, 'original'), { recursive: true });
  fs.mkdirSync(path.join(OUT, 'react'), { recursive: true });
  fs.mkdirSync(path.join(OUT, 'diff'), { recursive: true });

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--font-render-hinting=none', '--force-device-scale-factor=1'],
  });

  const erroresOrig = [];
  const erroresPort = [];

  /* --- 1. Capturar original --- */
  const p1 = await browser.newPage();
  await p1.setViewport({ width: 430, height: 932, deviceScaleFactor: 1 });
  await p1.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  const e1 = await capturar(p1, ORIGEN, 'original');
  erroresOrig.push(...e1);
  await p1.close();

  /* --- 2. Capturar port React --- */
  const p2 = await browser.newPage();
  await p2.setViewport({ width: 430, height: 932, deviceScaleFactor: 1 });
  await p2.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  const e2 = await capturar(p2, PORT, 'react');
  erroresPort.push(...e2);
  await p2.close();

  await browser.close();

  /* --- 3. Comparar --- */
  const filas = [];
  let identicas = 0, casi = 0, distintas = 0;

  for (const [slug] of PANTALLAS) {
    const a = PNG.sync.read(fs.readFileSync(path.join(OUT, 'original', `${slug}.png`)));
    const b = PNG.sync.read(fs.readFileSync(path.join(OUT, 'react', `${slug}.png`)));

    const mismaMedida = a.width === b.width && a.height === b.height;
    const w = Math.min(a.width, b.width);
    const h = Math.min(a.height, b.height);
    const diff = new PNG({ width: w, height: h });

    let pix = 0;
    try {
      pix = pixelmatch(a.data, b.data, diff.data, w, h, { threshold: 0.1, includeAA: false });
    } catch (e) { pix = -1; }

    if (pix >= 0) {
      fs.writeFileSync(path.join(OUT, 'diff', `${slug}.png`), PNG.sync.write(diff));
    }

    const total = mismaMedida ? w * h : Math.max(a.width * a.height, b.width * b.height);
    const pct = pix >= 0 ? (pix / total) * 100 : 100;

    let estado;
    if (!mismaMedida) { estado = err(`DIM ${a.width}x${a.height} vs ${b.width}x${b.height}`); distintas++; }
    else if (pct < 0.5) { estado = ok('IDÉNTICA'); identicas++; }
    else if (pct < 3) { estado = ok(`casi (${pct.toFixed(2)}%)`); casi++; }
    else { estado = err(`DIF ${pct.toFixed(2)}%`); distintas++; }

    filas.push([slug, `${a.width}x${a.height}`, `${b.width}x${b.height}`, pix >= 0 ? pix : 'n/d', estado]);
  }

  /* --- 4. Reporte --- */
  const lineas = [];
  lineas.push('=== VERIFICACIÓN VISUAL KRONOS — original vs port React ===');
  lineas.push(`Viewport: 430x932 · prefers-reduced-motion: reduce · captura fullPage`);
  lineas.push('');
  lineas.push('PANTALLA              ORIGINAL      PORT          PX DIFF   ESTADO');
  lineas.push('-'.repeat(78));
  for (const f of filas) {
    lineas.push(`${f[0].padEnd(22)}${f[1].padEnd(14)}${f[2].padEnd(14)}${String(f[3]).padEnd(10)}${f[4]}`);
  }
  lineas.push('-'.repeat(78));
  lineas.push(`TOTAL: ${PANTALLAS.length} pantallas · ${identicas} idénticas · ${casi} casi idénticas · ${distintas} con diferencias`);
  lineas.push('');
  lineas.push(`Errores/avisos de consola — ORIGINAL: ${erroresOrig.length}`);
  [...new Set(erroresOrig)].slice(0, 20).forEach((m) => lineas.push('   · ' + m));
  lineas.push(`Errores/avisos de consola — PORT REACT: ${erroresPort.length}`);
  [...new Set(erroresPort)].slice(0, 20).forEach((m) => lineas.push('   · ' + m));

  const texto = lineas.join('\n');
  fs.writeFileSync(path.join(OUT, '00-VERIFICACION-VISUAL.txt'), texto);
  console.log(texto);
})();
