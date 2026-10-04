/* ============================================================
   KRONOS — Icon system
   37 iconos portados VERBATIM desde el objeto `I` de kronos.html.
   Los atributos `d`, `cx`, `cy`, `r`, `rx` NO se han modificado:
   se conserva la calidad vectorial al 100 % (sin rasterizar).

   Diferencia respecto al original: allí eran strings HTML y el
   tamaño se cambiaba con .replace('width="15" height="15"', ...).
   Aquí cada icono acepta la prop `size`, con el mismo valor por
   defecto que en el original.
   ============================================================ */

const Svg = ({ size, viewBox = '0 0 24 24', stroke, strokeWidth, fill, children }) => (
  <svg
    width={size}
    height={size}
    viewBox={viewBox}
    {...(fill !== undefined ? { fill } : {})}
    {...(stroke !== undefined ? { stroke, strokeWidth } : {})}
  >
    {children}
  </svg>
);

/* --- tabbar / navegación --- */
export const IconHome = ({ size = 21 }) => (
  <Svg size={size} fill="none" stroke="currentColor" strokeWidth="1.4">
    <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />
  </Svg>
);

export const IconSearch = ({ size = 21 }) => (
  <Svg size={size} fill="none" stroke="currentColor" strokeWidth="1.4">
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.6-3.6" />
  </Svg>
);

export const IconPlus = ({ size = 21 }) => (
  <Svg size={size} fill="none" stroke="currentColor" strokeWidth="1.4">
    <path d="M12 5v14M5 12h14" />
  </Svg>
);

export const IconSpark = ({ size = 21 }) => (
  <Svg size={size} fill="none" stroke="currentColor" strokeWidth="1.4">
    <path d="M12 3l1.9 5.6L19.5 10l-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.4z" />
  </Svg>
);

export const IconUser = ({ size = 21 }) => (
  <Svg size={size} fill="none" stroke="currentColor" strokeWidth="1.4">
    <circle cx="12" cy="8.5" r="3.8" />
    <path d="M4.5 20.5c1.4-3.7 4-5.5 7.5-5.5s6.1 1.8 7.5 5.5" />
  </Svg>
);

export const IconBell = ({ size = 20 }) => (
  <Svg size={size} fill="none" stroke="currentColor" strokeWidth="1.4">
    <path d="M18 16V10a6 6 0 1 0-12 0v6l-1.6 2.4h15.2z" />
    <path d="M10 20.5a2.2 2.2 0 0 0 4 0" />
  </Svg>
);

export const IconMail = ({ size = 20 }) => (
  <Svg size={size} fill="none" stroke="currentColor" strokeWidth="1.4">
    <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
    <path d="m4 7 8 5.5L20 7" />
  </Svg>
);

/* --- acciones de publicación --- */
export const IconHeart = ({ size = 16 }) => (
  <Svg size={size} fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 20s-7.5-4.6-7.5-9.4A4.1 4.1 0 0 1 12 8.2a4.1 4.1 0 0 1 7.5 2.4C19.5 15.4 12 20 12 20z" />
  </Svg>
);

export const IconHeartOn = ({ size = 16 }) => (
  <Svg size={size} fill="currentColor">
    <path d="M12 20s-7.5-4.6-7.5-9.4A4.1 4.1 0 0 1 12 8.2a4.1 4.1 0 0 1 7.5 2.4C19.5 15.4 12 20 12 20z" />
  </Svg>
);

export const IconComment = ({ size = 16 }) => (
  <Svg size={size} fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M20.5 12c0 4-3.8 7.2-8.5 7.2a10 10 0 0 1-2.6-.34L4.5 20.5l1.3-3.7A6.9 6.9 0 0 1 3.5 12c0-4 3.8-7.2 8.5-7.2s8.5 3.2 8.5 7.2z" />
  </Svg>
);

export const IconSave = ({ size = 16 }) => (
  <Svg size={size} fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M6.5 4h11a.5.5 0 0 1 .5.5v15l-6-3.6-6 3.6v-15a.5.5 0 0 1 .5-.5z" />
  </Svg>
);

export const IconSaveOn = ({ size = 16 }) => (
  <Svg size={size} fill="currentColor">
    <path d="M6.5 4h11a.5.5 0 0 1 .5.5v15l-6-3.6-6 3.6v-15a.5.5 0 0 1 .5-.5z" />
  </Svg>
);

export const IconShare = ({ size = 16 }) => (
  <Svg size={size} fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7" />
    <path d="M12 15.5V4M8 7.5 12 3.5l4 4" />
  </Svg>
);

export const IconDots = ({ size = 16 }) => (
  <Svg size={size} fill="currentColor">
    <circle cx="5" cy="12" r="1.6" />
    <circle cx="12" cy="12" r="1.6" />
    <circle cx="19" cy="12" r="1.6" />
  </Svg>
);

/* --- navegación y estados --- */
export const IconBack = ({ size = 20 }) => (
  <Svg size={size} fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M15 5l-7 7 7 7" />
  </Svg>
);

export const IconEye = ({ size = 17 }) => (
  <Svg size={size} fill="none" stroke="currentColor" strokeWidth="1.4">
    <path d="M2.5 12S6 5.8 12 5.8 21.5 12 21.5 12 18 18.2 12 18.2 2.5 12 2.5 12z" />
    <circle cx="12" cy="12" r="2.8" />
  </Svg>
);

export const IconCheck = ({ size = 34 }) => (
  <Svg size={size} fill="none" stroke="currentColor" strokeWidth="1.3">
    <circle cx="12" cy="12" r="9.2" />
    <path d="m8 12.3 2.7 2.7L16 9.6" />
  </Svg>
);

export const IconClock = ({ size = 34 }) => (
  <Svg size={size} fill="none" stroke="currentColor" strokeWidth="1.3">
    <circle cx="12" cy="12" r="9.2" />
    <path d="M12 7v5.3l3.4 2" />
  </Svg>
);

export const IconGrid = ({ size = 20 }) => (
  <Svg size={size} fill="none" stroke="currentColor" strokeWidth="1.4">
    <rect x="3.5" y="3.5" width="7" height="7" rx="1.6" />
    <rect x="13.5" y="3.5" width="7" height="7" rx="1.6" />
    <rect x="3.5" y="13.5" width="7" height="7" rx="1.6" />
    <rect x="13.5" y="13.5" width="7" height="7" rx="1.6" />
  </Svg>
);

/* --- Kairos / medios --- */
export const IconImg = ({ size = 22 }) => (
  <Svg size={size} fill="none" stroke="currentColor" strokeWidth="1.3">
    <rect x="3" y="4.5" width="18" height="15" rx="2.5" />
    <circle cx="8.5" cy="9.5" r="1.7" />
    <path d="m4 17 5-5 4 4 2.5-2.5L20 17" />
  </Svg>
);

export const IconVideo = ({ size = 22 }) => (
  <Svg size={size} fill="none" stroke="currentColor" strokeWidth="1.3">
    <rect x="2.5" y="5.5" width="14" height="13" rx="2.5" />
    <path d="m16.5 10.5 5-3v9l-5-3z" />
  </Svg>
);

export const IconScript = ({ size = 22 }) => (
  <Svg size={size} fill="none" stroke="currentColor" strokeWidth="1.3">
    <path d="M6 3h8l4 4v14H6z" />
    <path d="M14 3v4h4M9 12h6M9 16h6" />
  </Svg>
);

export const IconCaps = ({ size = 22 }) => (
  <Svg size={size} fill="none" stroke="currentColor" strokeWidth="1.3">
    <rect x="4" y="9" width="16" height="11" rx="2.5" />
    <path d="M8 9V6.8A4 4 0 0 1 16 6.8V9" />
    <circle cx="12" cy="14.5" r="1.4" />
  </Svg>
);

export const IconLive = ({ size = 22 }) => (
  <Svg size={size} fill="none" stroke="currentColor" strokeWidth="1.3">
    <circle cx="12" cy="12" r="3" />
    <path d="M6.5 6.5a8 8 0 0 0 0 11M17.5 6.5a8 8 0 0 1 0 11M3.5 3.5a12 12 0 0 0 0 17M20.5 3.5a12 12 0 0 1 0 17" />
  </Svg>
);

export const IconPulse = ({ size = 22 }) => (
  <Svg size={size} fill="none" stroke="currentColor" strokeWidth="1.3">
    <path d="M2.5 12h4l2.5-6 4 13 2.5-7h6" />
  </Svg>
);

export const IconChart = ({ size = 22 }) => (
  <Svg size={size} fill="none" stroke="currentColor" strokeWidth="1.3">
    <path d="M4 20V4M4 20h16M8 20v-6M12.5 20V8M17 20v-9" />
  </Svg>
);

/* --- sistema / comunidades --- */
export const IconGear = ({ size = 20 }) => (
  <Svg size={size} fill="none" stroke="currentColor" strokeWidth="1.3">
    <circle cx="12" cy="12" r="3.2" />
    <path d="M19.4 14.5a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1v.3a2 2 0 1 1-4 0v-.2a1.6 1.6 0 0 0-2.8-1.1l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0-1.1-2.7h-.3a2 2 0 1 1 0-4h.2A1.6 1.6 0 0 0 4.6 7l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 2.7-1.1V2.8a2 2 0 1 1 4 0V3a1.6 1.6 0 0 0 2.7 1.1l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0 1.1 2.7h.3a2 2 0 1 1 0 4h-.2a1.6 1.6 0 0 0-1.4 1z" />
  </Svg>
);

export const IconUsers = ({ size = 22 }) => (
  <Svg size={size} fill="none" stroke="currentColor" strokeWidth="1.3">
    <circle cx="9" cy="8.5" r="3.3" />
    <path d="M2.5 20c1.2-3.2 3.5-4.8 6.5-4.8s5.3 1.6 6.5 4.8" />
    <path d="M16.5 5.6a3.3 3.3 0 0 1 0 6.3M18 15.5c2 .6 3.2 2 3.8 4" />
  </Svg>
);

export const IconOrbit = ({ size = 22 }) => (
  <Svg size={size} fill="none" stroke="currentColor" strokeWidth="1.3">
    <circle cx="12" cy="12" r="4" />
    <ellipse cx="12" cy="12" rx="10" ry="4.6" transform="rotate(-24 12 12)" />
    <circle cx="20.2" cy="8.4" r="1.5" fill="currentColor" />
  </Svg>
);

export const IconHash = ({ size = 22 }) => (
  <Svg size={size} fill="none" stroke="currentColor" strokeWidth="1.3">
    <path d="M9 3.5 7 20.5M17 3.5l-2 17M3.5 8.5h17M3 15.5h17" />
  </Svg>
);

export const IconShield = ({ size = 22 }) => (
  <Svg size={size} fill="none" stroke="currentColor" strokeWidth="1.3">
    <path d="M12 2.8 20 6v6c0 4.6-3.3 8.3-8 9.2-4.7-.9-8-4.6-8-9.2V6z" />
    <path d="m8.6 12.2 2.4 2.4 4.4-4.6" />
  </Svg>
);

/* --- acciones pequeñas --- */
export const IconDown = ({ size = 15 }) => (
  <Svg size={size} fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 4v11M7.5 11 12 15.5 16.5 11M5 20h14" />
  </Svg>
);

export const IconTrash = ({ size = 15 }) => (
  <Svg size={size} fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4.5 6.5h15M9.5 6.5V4.8h5v1.7M6.5 6.5 7.6 20h8.8l1.1-13.5M10.5 10v6M13.5 10v6" />
  </Svg>
);

export const IconSend = ({ size = 17 }) => (
  <Svg size={size} fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 12 20.5 4 13 20.5l-1.8-6.7z" />
  </Svg>
);

export const IconPencil = ({ size = 15 }) => (
  <Svg size={size} fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 20h4L19.5 8.5a2.1 2.1 0 0 0-3-3L5 17z" />
  </Svg>
);

/* Multicolor: conserva sus 4 fills originales de Google. */
export const IconGoogle = ({ size = 17 }) => (
  <Svg size={size} viewBox="0 0 48 48">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
  </Svg>
);

export const IconLock = ({ size = 34 }) => (
  <Svg size={size} fill="none" stroke="currentColor" strokeWidth="1.3">
    <rect x="4.6" y="10.4" width="14.8" height="10.2" rx="2.4" />
    <path d="M8.2 10.4V8a3.8 3.8 0 0 1 7.6 0v2.4" />
  </Svg>
);

/* ============================================================
   Registro de iconos — reemplaza al objeto `I` de kronos.html.
   Uso:  <I.home />   ·   <I.pencil size={22} />
   (El original hacía I.pencil.replace('width="15"…','width="22"…');
    ahora se pasa la prop `size`, con idéntico resultado.)
   ============================================================ */
export const I = {
  home: IconHome,
  search: IconSearch,
  plus: IconPlus,
  spark: IconSpark,
  user: IconUser,
  bell: IconBell,
  mail: IconMail,
  heart: IconHeart,
  heartOn: IconHeartOn,
  comment: IconComment,
  save: IconSave,
  saveOn: IconSaveOn,
  share: IconShare,
  dots: IconDots,
  back: IconBack,
  eye: IconEye,
  check: IconCheck,
  clock: IconClock,
  grid: IconGrid,
  img: IconImg,
  video: IconVideo,
  script: IconScript,
  caps: IconCaps,
  live: IconLive,
  pulse: IconPulse,
  chart: IconChart,
  gear: IconGear,
  users: IconUsers,
  orbit: IconOrbit,
  hash: IconHash,
  shield: IconShield,
  down: IconDown,
  trash: IconTrash,
  send: IconSend,
  pencil: IconPencil,
  google: IconGoogle,
  lock: IconLock,
};
