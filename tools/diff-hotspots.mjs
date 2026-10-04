/* Localiza por rejilla dónde se concentran las diferencias.
   diffMask:true → sólo los píxeles distintos quedan opacos en la máscara. */
import fs from 'node:fs';
import path from 'node:path';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

const OUT = path.resolve('../verificacion');
for (const slug of process.argv.slice(2)) {
  const a = PNG.sync.read(fs.readFileSync(path.join(OUT, 'original', `${slug}.png`)));
  const b = PNG.sync.read(fs.readFileSync(path.join(OUT, 'react', `${slug}.png`)));
  const w = Math.min(a.width, b.width), h = Math.min(a.height, b.height);
  const mask = new PNG({ width: w, height: h });
  const n = pixelmatch(a.data, b.data, mask.data, w, h, { threshold: 0.1, includeAA: false, diffMask: true });

  const GX = 8, GY = 10, cells = new Map();
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    if (mask.data[(y * w + x) * 4 + 3] > 0) {
      const k = `${Math.floor(x / (w / GX))},${Math.floor(y / (h / GY))}`;
      cells.set(k, (cells.get(k) || 0) + 1);
    }
  }
  console.log(`\n### ${slug} — ${n} px distintos (${(n / (w * h) * 100).toFixed(2)}%) ${w}x${h}`);
  [...cells.entries()].sort((p, q) => q[1] - p[1]).slice(0, 6).forEach(([k, v]) => {
    const [gx, gy] = k.split(',').map(Number);
    console.log(`   x:${Math.round(gx*w/GX)}-${Math.round((gx+1)*w/GX)} y:${Math.round(gy*h/GY)}-${Math.round((gy+1)*h/GY)} → ${v} px`);
  });
}
