import { useNavigate, useParams } from 'react-router-dom';
import { Shell, Page } from '../../components/layout/Shell.jsx';
import { Avatar } from '../../components/Avatar.jsx';
import { Btn } from '../../components/Button.jsx';
import { Seg } from '../../components/Primitives.jsx';
import { I } from '../../components/icons/index.jsx';
import { ArtV, ProfileCover } from '../../components/graphics/index.jsx';
import { PostCard } from '../../components/feed/PostCard.jsx';
import { useStore } from '../../state/store.jsx';
import { useToast } from '../../components/Toasts.jsx';

/* Perfil — portado de `Perfil(uname)`.
   Se sirve en dos rutas: /perfil (usuario propio) y /u/:username.
   Pestañas Publicaciones / Media / Cápsulas con el mismo estado `ptab`. */
export function Perfil() {
  const { username } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { S, setUi, toggleFollow } = useStore();

  const uname = username ?? null;
  const me = !uname || uname === S.user.username;
  const u = me
    ? { n: S.user.name, u: S.user.username, i: S.user.initials, b: 'Construyendo KRONOS SPACE. Tiempo, espacio y archivo.', f: '4.2k', g: '318' }
    : (S.users.find((x) => x.u === uname) || S.users[0]);

  const tab = S.ui.ptab || 0;
  const mine = S.posts.filter((p) => (me ? p.u === S.user.username : p.u === u.u));
  const list = mine.length ? mine : S.posts.slice(0, 2);

  return (
    <Shell tab={me ? 'perfil' : 'buscar'}>
      <Page>
        <ProfileCover />

        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1rem', marginTop: '-34px', padding: '0 .3rem' }}>
          <Avatar ini={u.i} cls="lg" />
          <div style={{ flex: 1, paddingBottom: '.3rem' }}>
            <div style={{ fontSize: '1.05rem', color: '#eaf0f7', letterSpacing: '.02em' }}>{u.n}</div>
            <div className="meta">@{u.u}</div>
          </div>
          {me ? (
            <Btn label="Editar" cls="sm ghost" onClick={() => navigate('/settings-perfil')} />
          ) : (
            <Btn
              label={S.follow[u.u] ? 'Siguiendo' : 'Seguir'}
              cls={'sm' + (S.follow[u.u] ? ' ghost' : '')}
              onClick={() => {
                toggleFollow(u.u);
                toast(S.follow[u.u] ? 'Dejaste de seguir a @' + u.u : 'Siguiendo a @' + u.u);
              }}
            />
          )}
        </div>

        <div className="body-text" style={{ marginTop: '.9rem' }}>{u.b}</div>

        <div className="stats">
          <div className="stat"><b>{u.g}</b><span>Publicaciones</span></div>
          <div className="stat"><b>{u.f}</b><span>Seguidores</span></div>
          <div className="stat"><b>512</b><span>Seguidos</span></div>
        </div>

        <Seg options={['Publicaciones', 'Media', 'Cápsulas']} value={tab} onChange={(i) => setUi('ptab', i)} />

        {tab === 0 ? list.map((p) => <PostCard key={p.id} p={p} />) : null}

        {tab === 1 ? (
          <div className="grid g3">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="thumb" onClick={() => navigate('/post/p2')}>
                <ArtV seed={'m' + i} />
              </div>
            ))}
          </div>
        ) : null}

        {tab === 2 ? (
          <div className="card">
            {S.caps.map((c) => (
              <div className="row" key={c.id}>
                <span className="icon-btn"><I.caps /></span>
                <div className="grow">
                  <div className="t1">{c.t}</div>
                  <div className="t2">Se abre el {c.d}</div>
                </div>
                <span className={`badge ${c.open ? 'ok' : ''}`}>{c.open ? 'Abierta' : 'Bloqueada'}</span>
              </div>
            ))}
          </div>
        ) : null}
      </Page>
    </Shell>
  );
}
