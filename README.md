# KRONOS SPACE — port del sistema visual a React

Port completo del sistema visual de `kronos.html` a una aplicación **React + Vite**,
conservando la apariencia, los gráficos vectoriales, las animaciones y la calidad visual.

> **Regla aplicada:** cada parte se convirtió a la tecnología que realmente le corresponde.
> `kronos.html` **no** se metió dentro de React (ni iframe, ni `dangerouslySetInnerHTML`).

---

## Arranque

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # build de producción → dist/
npm run preview    # sirve el build → http://localhost:4173
```

El router usa `HashRouter`, así que **los enlaces del original siguen funcionando**:
`#/home`, `#/kairos-imagen`, `#/perfil`, etc.

---

## Estructura

```
src/
├── main.jsx                    entrypoint (importa styles/index.css + monta la app)
├── App.jsx                     41 rutas + providers
├── styles/                     SISTEMA VISUAL  ← fuente de verdad del diseño
│   ├── index.css               orden de carga (idéntico al <style> original)
│   ├── 01-tokens.css           :root (14 tokens) + reset + base      ┐
│   ├── 02-theme.css            cromo, marca (4 capas), botones       │ 220 líneas
│   ├── 03-buttons.css          botones, separadores                  │ VERBATIM
│   ├── 04-components.css       tiles, badges, segmentado, filas…     │ del original
│   ├── 05-layout.css           appbar, tabbar, page                  │ (0 diferencias
│   ├── 06-cards.css            tarjetas, avatar, acciones, chips…    │  verificadas
│   ├── 07-states.css           estados + @keyframes shimmer          │  por diff)
│   ├── 08-overlays.css         sheet + toast + keyframes up/tin      │
│   ├── 09-splash.css           splash 3D + @keyframes sway           ┘
│   ├── 10-utilities.css        utilidades extraídas de los style="" inline
│   └── 11-responsive.css       prefers-reduced-motion extendido
├── components/
│   ├── Brand.jsx               sello 3D de 4 capas
│   ├── Button.jsx              aro cromado + interior hueco
│   ├── Avatar.jsx              avatar con anillo
│   ├── Field.jsx               campo con aro cromado + label + hint + err
│   ├── Primitives.jsx          Chip · Seg · Switch · Tile · RowLink
│   ├── Sheet.jsx               bottom-sheet (provider + hook)
│   ├── Toasts.jsx              toasts (provider + hook)
│   ├── icons/index.jsx         37 iconos SVG + registro `I`
│   ├── graphics/index.jsx      Art · ArtV · ProfileCover · SettingsCover
│   ├── feed/PostCard.jsx       tarjeta de publicación + menú contextual
│   └── layout/                 Shell · AppBar · TabBar · Page · HBar…
├── pages/                      40 pantallas
│   ├── Splash.jsx  NotFound.jsx  Indice.jsx
│   ├── auth/           Login · Registro · Recuperar · Restablecer · Verificar
│   ├── social/         Home · Guardados · PostDetail · Vertical · Crear · Buscar · Perfil
│   ├── comunidades/    Circles · Orbits · OrbitFeed · Channels
│   ├── Mensajes.jsx    Mensajes · Chat · Conversaciones
│   ├── kairos/         Kairos · KImagen · KVideo · KTrabajos · KScripts · KHistorial · Library
│   ├── Modulos.jsx     Live · Capsules · Pulse · Analytics
│   └── ajustes/        Settings · SettingsPerfil · SettingsSeguridad · Admin
├── state/
│   ├── store.jsx               estado (reemplaza al objeto global `S`)
│   └── fixtures.js             datos de ejemplo extraídos
└── lib/
    ├── hooks.js                useBack · useForm
    ├── validation.js           reglas de validación (idénticas)
    ├── sessionStore.js         sessionStorage con fallback en memoria
    └── screensCatalog.js       catálogo de las 40 pantallas
```

---

## Fuentes de verdad (una sola cada una)

| Capa | Fuente de verdad |
|---|---|
| UI | **React / JSX** — `src/pages`, `src/components` |
| Diseño | **CSS Design System** — `src/styles` (importado una vez desde `main.jsx`) |
| Gráficos vectoriales | **SVG** — `components/icons`, `components/graphics` |
| Gráficos 2D | **SVG** (no hay Canvas en el original) |
| Gráficos 3D | **CSS 3D** — `perspective` + `preserve-3d` en `09-splash.css` (no hay WebGL) |
| Interacción | **React** — `state/store.jsx` + eventos JSX |
| Movimiento | **CSS `@keyframes`** (4, intactos) |
| Datos | `state/fixtures.js` (aislado para sustituirlo por la API) |

---

## Nota sobre el repositorio destino

Este port se construyó **a partir de `kronos.html` tal cual**, porque el repositorio
`~/PROYECTOS/KRONOS/Kronos-space.com` no estaba accesible en el entorno de trabajo.
La estructura de carpetas sigue la convención pedida en la orden (puntos 5 y 22).

Al integrarlo en el repo real:

1. **`client/src/styles/kronos-html-theme.css`** — comparar bloque a bloque con `src/styles/`
   antes de escribir, para no duplicar el design system.
2. **`client/src/main.jsx`** — añadir únicamente el `import './styles/index.css'`.
3. **Router** — el repo puede usar `BrowserRouter`; estas rutas funcionan igual,
   sólo hay que ajustar el prefijo.
4. **`state/fixtures.js`** — sustituir por la API real cuando toque.

---

## Verificación

Las herramientas de `tools/` están incluidas y son reproducibles:

```bash
node tools/visual-verify.mjs     # captura y compara las 40 pantallas (pixelmatch)
node tools/geom-all.mjs          # compara las cajas (getBoundingClientRect) de las 40 rutas
node tools/diff-hotspots.mjs <slug>   # localiza dónde difiere una pantalla
node tools/crop-compare.mjs <slug> x0 y0 x1 y1 [escala]   # recorte lado a lado
```
