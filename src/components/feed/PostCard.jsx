import { useNavigate } from 'react-router-dom';
import { Avatar } from '../Avatar.jsx';
import { I } from '../icons/index.jsx';
import { Art } from '../graphics/index.jsx';
import { useStore } from '../../state/store.jsx';
import { useToast } from '../Toasts.jsx';
import { useSheet } from '../Sheet.jsx';

/* ============================================================
   Tarjeta de publicación — portada de `postCard(p)`.
   Toda la interacción (me gusta, guardar, repost, menú contextual)
   pasa de onclick inline + mutación de `S` + render() global
   a acciones del store. La estructura y las clases son idénticas.
   ============================================================ */

/** Menú contextual de publicación — portado de `postMenu(id)`. */
export function usePostMenu() {
  const { toggleSave, hidePost } = useStore();
  const { openSheet } = useSheet();
  const toast = useToast();

  return (id) => {
    openSheet('Publicación', [
      { label: 'Guardar publicación', run: () => toggleSave(id) },
      { label: 'Compartir enlace', run: () => toast('Enlace copiado') },
      { label: 'Ocultar publicación', run: () => { hidePost(id); toast('Publicación oculta'); } },
      { label: 'Silenciar autor', run: () => toast('Autor silenciado') },
      { label: 'Bloquear autor', danger: true, run: () => toast('Autor bloqueado') },
      { label: 'Reportar', danger: true, run: () => toast('Reporte enviado a moderación') },
    ]);
  };
}

export function PostCard({ p }) {
  const navigate = useNavigate();
  const toast = useToast();
  const { S, toggleLike, toggleSave } = useStore();
  const postMenu = usePostMenu();

  const liked = S.liked[p.id];
  const saved = S.saved[p.id];

  return (
    <div className="card">
      <div className="k-row-sm">
        <Avatar ini={p.ini} />
        <div className="k-grow k-pointer" onClick={() => navigate('/perfil')}>
          <div className="author">{p.a}</div>
          <div className="meta">@{p.u} · {p.t}</div>
        </div>
        <button className="act" onClick={() => postMenu(p.id)}><I.dots /></button>
      </div>

      <div className="body-text k-pointer" onClick={() => navigate(`/post/${p.id}`)}>{p.txt}</div>

      {p.media ? (
        <div className="k-pointer" onClick={() => navigate(`/post/${p.id}`)}>
          <Art kind={p.media} seed={p.id} />
        </div>
      ) : null}

      <div className="actions-row">
        <button className={`act ${liked ? 'on' : ''}`} onClick={() => toggleLike(p.id)}>
          {liked ? <I.heartOn /> : <I.heart />}
          <span>{p.likes + (liked ? 1 : 0)}</span>
        </button>
        <button className="act" onClick={() => navigate(`/post/${p.id}`)}>
          <I.comment /><span>{p.comments}</span>
        </button>
        <button className="act" onClick={() => toast('Republicado en tu perfil')}>
          <I.share /><span>Repost</span>
        </button>
        <span className="spacer" />
        <button className={`act ${saved ? 'on' : ''}`} onClick={() => {
          toggleSave(p.id);
          toast(saved ? 'Quitado de guardados' : 'Guardado');
        }}>
          {saved ? <I.saveOn /> : <I.save />}
        </button>
      </div>
    </div>
  );
}
