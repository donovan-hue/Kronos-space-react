/* Recorta una región de ambas capturas y las une lado a lado (original | react), 2x. */
import fs from 'node:fs';
import path from 'node:path';
import { PNG } from 'pngjs';

const OUT = path.resolve('../verificacion');
const [, , slug, x0s, y0s, x1s, y1s, scaleS = '2'] = process.argv;
const x0 = +x0s, y0 = +y0s, x1 = +x1s, y1 = +y1s, S = +scaleS;

const a = PNG.sync.read(fs.readFileSync(path.join(OUT, 'original', `${slug}.png`)));
const b = PNG.sync.read(fs.readFileSync(path.join(OUT, 'react', `${slug}.png`)));

const w = (x1 - x0) * S, h = (y1 - y0) * S;
const out = new PNG({ width: w * 2 + 8, height: h });
for (let yy = 0; yy < h; yy++) for (let xx = 0; xx < w; xx++) {
  const sy = y0 + Math.floor(yy / S), sx = x0 + Math.floor(xx / S);
  for (const [src, off] of [[a, 0], [b, w + 8]]) {
    const si = (sy * src.width + sx) * 4;
    const di = (yy * out.width + xx + off) * 4;
    out.data[di] = src.data[si]; out.data[di+1] = src.data[si+1];
    out.data[di+2] = src.data[si+2]; out.data[di+3] = 255;
  }
}
for (let yy = 0; yy < h; yy++) for (let xx = w; xx < w + 8; xx++) {
  const di = (yy * out.width + xx) * 4;
  out.data[di] = 255; out.data[di+1] = 0; out.data[di+2] = 0; out.data[di+3] = 255;
}
const f = path.join(OUT, 'diff', `crop-${slug}-${x0}-${y0}.png`);
fs.writeFileSync(f, PNG.sync.write(out));
console.log('→', f);
