import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shell, Page, PageTitle, Mini, EmptyState } from '../../components/layout/Shell.jsx';
import { Avatar } from '../../components/Avatar.jsx';
import { Btn } from '../../components/Button.jsx';
import { Chip } from '../../components/Primitives.jsx';
import { I } from '../../components/icons/index.jsx';
import { useStore } from '../../state/store.jsx';
import { useToast } from '../../components/Toasts.jsx';

/* Explore — portado de `Buscar()`.
   El original escribía en el estado global y re-renderizaba con retardo:
     oninput="S.ui.q=this.value; clearTimeout(window._t); window._t=setTimeout(render,220)"
   Se reproduce igual: el texto se escribe sin retardo (estado local) y el
   filtrado se aplica 220 ms después, para no cambiar el comportamiento. */
const SUGERENCIAS = ['Personas', 'Órbitas', 'Canales', 'Cápsulas', 'Pulse'];

export function Buscar() {
  const navigate = useNavigate();
  const toast = useToast();
  const { S, setUi, toggleFollow } = useStore();
  const [q, setQ] = useState(S.ui.q || '');

  useEffect(() => {
    const t = setTimeout(() => setUi('q', q), 220);
    return () => clearTimeout(t);
  }, [q, setUi]);

  const query = q.toLowerCase();
  const res = S.users.filter((u) => !query || u.n.toLowerCase().includes(query) || u.u.includes(query));
  const sg = S.ui.sg || 0;

  return (
    <Shell tab="buscar">
      <Page>
        <PageTitle>Explore</PageTitle>

        <div className="input-ring" style={{ marginBottom: '1rem' }}>
          <input id="q" type="search" placeholder="Buscar personas, órbitas, canales..."
            value={q} onChange={(e) => setQ(e.target.value)} />
        </div>

        <div className="scroll-x" style={{ marginBottom: '.4rem' }}>
          {SUGERENCIAS.map((c, i) => (
            <Chip key={c} on={sg === i} onClick={() => setUi('sg', i)}>{c}</Chip>
          ))}
        </div>

        {res.length ? (
          <>
            <Mini style={{ margin: '1rem 0 .3rem' }}>Personas · {res.length}</Mini>
            <div className="card">
              {res.map((u) => (
                <div className="row" key={u.u}>
                  <Avatar ini={u.i} />
                  <div className="grow k-pointer" onClick={() => navigate(`/u/${u.u}`)}>
                    <div className="t1">{u.n}</div>
                    <div className="t2">@{u.u} · {u.f} seguidores</div>
                  </div>
                  <Btn
                    label={S.follow[u.u] ? 'Siguiendo' : 'Seguir'}
                    cls={'sm' + (S.follow[u.u] ? ' ghost' : '')}
                    onClick={() => { toggleFollow(u.u); toast(S.follow[u.u] ? 'Dejaste de seguir a @' + u.u : 'Siguiendo a @' + u.u); }}
                  />
                </div>
              ))}
            </div>

            <Mini style={{ margin: '1.4rem 0 .3rem' }}>Órbitas sugeridas</Mini>
            <div className="card">
              {S.orbits.slice(0, 2).map((o) => (
                <div className="row" key={o.n}>
                  <span className="icon-btn"><I.orbit /></span>
                  <div className="grow">
                    <div className="t1">{o.n}</div>
                    <div className="t2">{o.m} miembros</div>
                  </div>
                  <Btn label="Ver" cls="sm" onClick={() => navigate(`/orbit/${encodeURIComponent(o.n)}`)} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <EmptyState
            title="Sin resultados"
            desc={<>No encontramos nada para "{S.ui.q || ''}".<br />Prueba con otro término.</>}
          />
        )}
      </Page>
    </Shell>
  );
}
