import { createContext, useContext, useMemo, useReducer } from 'react';
import { INITIAL_STATE } from './fixtures.js';

/* ============================================================
   KRONOS — Estado de la aplicación
   Reemplaza al objeto global mutable `S` + la función `render()`
   de kronos.html (que reescribía el DOM completo con innerHTML).

   Mismo modelo de datos, misma semántica, pero el estado vive en
   React: cada acción produce un estado nuevo y sólo re-renderiza
   lo que depende de él.

   `ui` se conserva como bolsa de estado de interfaz (pestañas,
   filtros, toggles) igual que en el original: persiste entre
   pantallas porque vive en el provider, no en cada página.
   ============================================================ */

const StoreContext = createContext(null);

function reducer(S, a) {
  switch (a.type) {
    case 'TOGGLE_LIKE':
      return { ...S, liked: { ...S.liked, [a.id]: !S.liked[a.id] } };

    case 'TOGGLE_SAVE':
      return { ...S, saved: { ...S.saved, [a.id]: !S.saved[a.id] } };

    case 'TOGGLE_FOLLOW':
      return { ...S, follow: { ...S.follow, [a.u]: !S.follow[a.u] } };

    case 'HIDE_POST':
      return { ...S, posts: S.posts.filter((p) => p.id !== a.id) };

    case 'ADD_POST':
      return { ...S, posts: [a.post, ...S.posts] };

    case 'ADD_COMMENT':
      return { ...S, comments: [...S.comments, a.comment] };

    case 'MARK_ALL_NOTIFS_READ':
      return { ...S, notifs: S.notifs.map((n) => (n.un ? { ...n, un: false } : n)) };

    case 'SET_UI':
      return { ...S, ui: { ...S.ui, [a.key]: a.value } };

    case 'TOGGLE_UI':
      return { ...S, ui: { ...S.ui, [a.key]: !S.ui[a.key] } };

    case 'ADD_JOB':
      return { ...S, jobs: [a.job, ...S.jobs] };

    case 'DELETE_JOB':
      return { ...S, jobs: S.jobs.filter((x) => x.id !== a.id) };

    case 'DELETE_HIST':
      return { ...S, hist: S.hist.filter((_, i) => i !== a.index) };

    case 'ADD_MSG':
      return { ...S, msgs: { ...S.msgs, [a.convId]: [...(S.msgs[a.convId] || []), a.msg] } };

    case 'SET_MSG_STATUS': {
      const list = S.msgs[a.convId] || [];
      return {
        ...S,
        msgs: {
          ...S.msgs,
          [a.convId]: list.map((m, i) => (i === a.index ? { ...m, st: a.st } : m)),
        },
      };
    }

    default:
      return S;
  }
}

export function StoreProvider({ children }) {
  const [S, dispatch] = useReducer(reducer, INITIAL_STATE);

  const value = useMemo(
    () => ({
      S,
      dispatch,

      /* --- acciones con nombre: mismas operaciones que en kronos.html --- */
      toggleLike: (id) => dispatch({ type: 'TOGGLE_LIKE', id }),
      toggleSave: (id) => dispatch({ type: 'TOGGLE_SAVE', id }),
      toggleFollow: (u) => dispatch({ type: 'TOGGLE_FOLLOW', u }),
      hidePost: (id) => dispatch({ type: 'HIDE_POST', id }),
      addPost: (post) => dispatch({ type: 'ADD_POST', post }),
      addComment: (comment) => dispatch({ type: 'ADD_COMMENT', comment }),
      markAllNotifsRead: () => dispatch({ type: 'MARK_ALL_NOTIFS_READ' }),
      setUi: (key, val) => dispatch({ type: 'SET_UI', key, value: val }),
      toggleUi: (key) => dispatch({ type: 'TOGGLE_UI', key }),
      addJob: (job) => dispatch({ type: 'ADD_JOB', job }),
      deleteJob: (id) => dispatch({ type: 'DELETE_JOB', id }),
      deleteHist: (index) => dispatch({ type: 'DELETE_HIST', index }),
      addMsg: (convId, msg) => dispatch({ type: 'ADD_MSG', convId, msg }),
      setMsgStatus: (convId, index, st) => dispatch({ type: 'SET_MSG_STATUS', convId, index, st }),
    }),
    [S]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore debe usarse dentro de <StoreProvider>');
  return ctx;
}

/** Azúcar para leer una clave de `ui` con valor por defecto (equivalente a `S.ui.x || def`). */
export function useUi(key, fallback) {
  const { S } = useStore();
  const v = S.ui[key];
  return v === undefined ? fallback : v;
}
