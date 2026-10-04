import { useNavigate, useParams } from 'react-router-dom';
import { Shell, Page, PageTitle } from '../../components/layout/Shell.jsx';
import { Avatar } from '../../components/Avatar.jsx';
import { Btn } from '../../components/Button.jsx';
import { I } from '../../components/icons/index.jsx';
import { Art } from '../../components/graphics/index.jsx';
import { usePostMenu } from '../../components/feed/PostCard.jsx';
import { useStore } from '../../state/store.jsx';
import { useToast } from '../../components/Toasts.jsx';
import { useSheet } from '../../components/Sheet.jsx';
import { useForm } from '../../lib/hooks.js';
import { NotFound } from '../NotFound.jsx';

/* Detalle de publicación — portado de `PostDetail(id)` + `sendComment()`.
   Si el id no existe, cae en la página 404 igual que el original. */
export function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { openSheet } = useSheet();
  const { S, toggleLike, toggleSave, addComment } = useStore();
  const postMenu = usePostMenu();
  const form = useForm({ c_new: '' });

  const p = S.posts.find((x) => x.id === id);
  if (!p) return <NotFoundRedirect />;

  const liked = S.liked[p.id];
  const saved = S.saved[p.id];

  const sendComment = () => {
    const v = form.get('c_new');
    if (!v) { toast('Escribe algo primero'); return; }
    addComment({ a: S.user.name, ini: S.user.initials, t: 'ahora', txt: v });
    form.setValues((s) => ({ ...s, c_new: '' }));
    toast('Comentario publicado');
  };

  return (
    <Shell tab="home">
      <Page>
        <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem', marginBottom: '.9rem' }}>
          <button className="icon-btn" onClick={() => navigate(-1)}><I.back /></button>
          <PageTitle style={{ margin: 0 }}>Publicación</PageTitle>
        </div>

        <div className="card">
          <div className="k-row-sm">
            <Avatar ini={p.ini} />
            <div className="k-grow">
              <div className="author">{p.a}</div>
              <div className="meta">@{p.u} · {p.t}</div>
            </div>
            <button className="act" onClick={() => postMenu(p.id)}><I.dots /></button>
          </div>

          <div className="body-text">{p.txt}</div>
          {p.media ? <Art kind={p.media} seed={p.id + 'd'} /> : null}

          <div className="actions-row">
            <button className={`act ${liked ? 'on' : ''}`} onClick={() => toggleLike(p.id)}>
              {liked ? <I.heartOn /> : <I.heart />}
              <span>{p.likes + (liked ? 1 : 0)}</span>
            </button>
            <button className="act"><I.comment /><span>{p.comments}</span></button>
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

        <PageTitle style={{ fontSize: '.72rem', margin: '1.4rem 0 .9rem' }}>Comentarios</PageTitle>

        {S.comments.map((c, i) => (
          <div key={i} className="card" style={{ padding: '.85rem' }}>
            <div style={{ display: 'flex', gap: '.7rem' }}>
              <Avatar ini={c.ini} cls="sm" />
              <div style={{ flex: 1 }}>
                <div className="author" style={{ fontSize: '.8rem' }}>
                  {c.a} <span className="meta">· {c.t}</span>
                </div>
                <div className="body-text" style={{ fontSize: '.86rem', marginTop: '.35rem' }}>{c.txt}</div>
                <div style={{ display: 'flex', gap: '.2rem', marginTop: '.4rem' }}>
                  <button className="act" style={{ fontSize: '.7rem' }} onClick={() => toast('Me gusta')}><I.heart /></button>
                  <button className="act" style={{ fontSize: '.7rem' }} onClick={() => toast('Respondiendo...')}>Responder</button>
                  <button
                    className="act"
                    style={{ fontSize: '.7rem' }}
                    onClick={() => openSheet('Moderación', [
                      { label: 'Ocultar comentario' },
                      { label: 'Reportar', danger: true },
                    ])}
                  ><I.dots /></button>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="card k-row-sm" style={{ alignItems: 'flex-start' }}>
          <Avatar ini={S.user.initials} cls="sm" />
          <div style={{ flex: 1 }}>
            <div className="input-ring">
              <input id="c_new" type="text" placeholder="Escribe un comentario..." {...form.bind('c_new')} />
            </div>
          </div>
          <Btn label="Enviar" cls="sm" onClick={sendComment} />
        </div>
      </Page>
    </Shell>
  );
}

/* Fallback a 404 (el original hacía `return NotFound()`). */
function NotFoundRedirect() { return <NotFound />; }
