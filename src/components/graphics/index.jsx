import { useId } from 'react';

/* ============================================================
   KRONOS — Gráficos vectoriales generativos
   Portado VERBATIM de las funciones `art()` y `artV()` de kronos.html.

   Los SVG se conservan vectoriales (NO se rasterizan).
   Los atributos viewBox / preserveAspectRatio / stroke-opacity NO cambian.

   Única diferencia técnica: en el original los ids de gradiente se
   derivaban del `seed` (p.ej. id="bgp1"). Si el mismo seed se montaba
   dos veces en pantalla, los gradientes colisionaban. Aquí useId()
   garantiza unicidad. El resultado visual es idéntico.
   ============================================================ */

/* Paletas por tipo de medio. Comportamiento del original replicado:
   `[kind] || {}.dflt || FALLBACK` — la rama `{}.dflt` nunca se cumple,
   de modo que cualquier kind distinto de 'caps'/'orb' usa el fallback.
   Se preserva ese comportamiento real (documentado en el informe). */
const PALETTES = {
  caps: ['#0b1016', '#1b2530', '#39404a'],
  orb: ['#0a0c10', '#232a33', '#4a525c'],
};
const FALLBACK = ['#080a0c', '#151a1f', '#2e343c'];

const palette = (kind) => PALETTES[kind] ?? FALLBACK;

/** Portada procedural 640×400 (.media) — posts, previews, resultados Kairos. */
export function Art({ kind, seed }) {
  const uid = useId().replace(/[:]/g, '');
  const g = palette(kind);
  const bg = `bg${uid}`;
  const gl = `gl${uid}`;

  return (
    <svg
      className="media"
      viewBox="0 0 640 400"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={bg} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={g[0]} />
          <stop offset=".55" stopColor={g[1]} />
          <stop offset="1" stopColor={g[2]} />
        </linearGradient>
        <radialGradient id={gl} cx=".7" cy=".3" r=".7">
          <stop offset="0" stopColor="#cfd8e2" stopOpacity=".5" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="640" height="400" fill={`url(#${bg})`} />
      <rect width="640" height="400" fill={`url(#${gl})`} />
      <g fill="none" stroke="#dbe3ec" strokeOpacity=".5">
        <ellipse cx="320" cy="200" rx="128" ry="128" strokeOpacity=".32" />
        <ellipse cx="320" cy="200" rx="168" ry="62" transform="rotate(-22 320 200)" />
        <ellipse cx="320" cy="200" rx="150" ry="150" strokeOpacity=".14" />
      </g>
      <circle cx="320" cy="200" r="5" fill="#e8eef5" />
      <path d="M320 200 L392 168" stroke="#eaf0f6" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="404" cy="162" r="11" fill="#cfd8e2" />
    </svg>
  );
}

/** Arte vertical 360×640 — reels, historias y miniaturas.
 *  Sin width/height a propósito: el original tampoco los tiene, y el
 *  tamaño lo determina el contenedor (.reel svg al 100 %, .thumb recorta). */
export function ArtV({ seed }) {
  const uid = useId().replace(/[:]/g, '');
  const v = `v${uid}`;
  const vg = `vg${uid}`;

  return (
    <svg viewBox="0 0 360 640" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={v} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#05070a" />
          <stop offset=".5" stopColor="#1a2028" />
          <stop offset="1" stopColor="#434b55" />
        </linearGradient>
        <radialGradient id={vg} cx=".5" cy=".38" r=".6">
          <stop offset="0" stopColor="#d7dfe8" stopOpacity=".45" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="360" height="640" fill={`url(#${v})`} />
      <rect width="360" height="640" fill={`url(#${vg})`} />
      <g fill="none" stroke="#e3eaf2" strokeOpacity=".45">
        <circle cx="180" cy="250" r="86" />
        <ellipse cx="180" cy="250" rx="116" ry="42" transform="rotate(-20 180 250)" />
        <circle cx="180" cy="250" r="110" strokeOpacity=".16" />
      </g>
      <circle cx="180" cy="250" r="4.5" fill="#eef3f8" />
      <path d="M180 250 L232 226" stroke="#eef3f8" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/* ============================================================
   Portadas de perfil (640×160, preserveAspectRatio="none")
   Las dos portadas del original NO son idénticas, así que se
   conservan como dos componentes separados — sin unificar.
   ============================================================ */

/** Portada del Perfil — degradado cromado + elipse rotada −16°. */
export function ProfileCover() {
  const uid = useId().replace(/[:]/g, '');
  return (
    <svg className="cover" viewBox="0 0 640 160" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`cv${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#080a0d" />
          <stop offset=".6" stopColor="#1d242c" />
          <stop offset="1" stopColor="#454d57" />
        </linearGradient>
      </defs>
      <rect width="640" height="160" fill={`url(#cv${uid})`} />
      <g fill="none" stroke="#dde5ee" strokeOpacity=".3">
        <ellipse cx="480" cy="80" rx="150" ry="52" transform="rotate(-16 480 80)" />
        <circle cx="480" cy="80" r="46" />
      </g>
    </svg>
  );
}

/** Portada de Profile Settings — fondo plano #10141a + círculo r=44. */
export function SettingsCover() {
  return (
    <svg className="cover" viewBox="0 0 640 160" preserveAspectRatio="none">
      <rect width="640" height="160" fill="#10141a" />
      <g fill="none" stroke="#dde5ee" strokeOpacity=".25">
        <circle cx="500" cy="80" r="44" />
        <ellipse cx="500" cy="80" rx="140" ry="48" transform="rotate(-16 500 80)" />
      </g>
    </svg>
  );
}
