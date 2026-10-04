import { useNavigate } from 'react-router-dom';
import { Shell, Page, EmptyState } from '../../components/layout/Shell.jsx';
import { Avatar } from '../../components/Avatar.jsx';
import { Btn } from '../../components/Button.jsx';
import { Chip } from '../../components/Primitives.jsx';
import { PostCard } from '../../components/feed/PostCard.jsx';
import { useStore } from '../../state/store.jsx';
import { useToast } from '../../components/Toasts.jsx';
import { HBar as HBarLocal } from '../../components/layout/HBar.jsx';

/* Home / Feed — portado de `Home()`.
   Historias (scroll horizontal) + chips de acceso + compositor + feed. */
const ACCESOS = [
  ['Feed vertical', '/vertical'],
  ['Guardadas', '/guardados'],
  ['Pulse', '/pulse'],
  ['Live', '/live'],
  ['Capsules', '/capsules'],
  ['Orbits', '/orbits'],
  ['Analytics', '/analytics'],
];

export function Home() {
  const navigate = useNavigate();
  const toast = useToast();
  const { S } = useStore();

  return (
    <Shell tab="home">
      <Page>
        <div className="scroll-x" style={{ marginBottom: '.4rem' }}>
          {S.stories.map((s) => (
            <div
              key={s.n}
              className="story"
              onClick={() => (s.me ? navigate('/crear') : toast('Historia de @' + s.n))}
            >
              <div className="ring"><div className={`in ${s.me ? 'plus' : ''}`}>{s.i}</div></div>
              <div className="nm">{s.n}</div>
            </div>
          ))}
        </div>

        <div className="scroll-x" style={{ marginBottom: '.5rem' }}>
          {ACCESOS.map(([label, to]) => (
            <Chip key={to} onClick={() => navigate(to)}>{label}</Chip>
          ))}
        </div>

        <div
          className="card k-row k-pointer"
          onClick={() => navigate('/crear-publicacion')}
        >
          <Avatar ini={S.user.initials} />
          <div className="meta k-grow" style={{ fontSize: '.86rem', color: '#6e757d' }}>
            ¿Qué está pasando en tu espacio?
          </div>
          <Btn
            label="Publicar"
            cls="sm"
            onClick={(e) => { e.stopPropagation(); navigate('/crear-publicacion'); }}
          />
        </div>

        <div id="feed">
          {S.posts.map((p) => <PostCard key={p.id} p={p} />)}
        </div>
      </Page>
    </Shell>
  );
}

/* Publicaciones guardadas — portado de `Guardados()`. */
export function Guardados() {
  const navigate = useNavigate();
  const { S } = useStore();
  const items = S.posts.filter((p) => S.saved[p.id]);

  return (
    <Shell tab="home">
      <Page>
        <HBarLocal title="Publicaciones guardadas" />
        {items.length ? (
          items.map((p) => <PostCard key={p.id} p={p} />)
        ) : (
          <EmptyState
            title="Todavía no guardas nada"
            desc={<>Toca el marcador en cualquier publicación<br />y aparecerá aquí.</>}
            action={<Btn label="Ir al feed" cls="sm" onClick={() => navigate('/home')} />}
          />
        )}
      </Page>
    </Shell>
  );
}
