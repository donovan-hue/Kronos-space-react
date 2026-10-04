import { useNavigate, useParams } from 'react-router-dom';
import { Shell, Page, PageTitle, EmptyState } from '../../components/layout/Shell.jsx';
import { HBar } from '../../components/layout/HBar.jsx';
import { Btn } from '../../components/Button.jsx';
import { Seg } from '../../components/Primitives.jsx';
import { I } from '../../components/icons/index.jsx';
import { PostCard } from '../../components/feed/PostCard.jsx';
import { useStore } from '../../state/store.jsx';
import { useToast } from '../../components/Toasts.jsx';
import { useSheet } from '../../components/Sheet.jsx';

/* ============================================================
   COMUNIDADES — Circles / Orbits / OrbitFeed / Channels
   Portado de las cuatro funciones homónimas.
   ============================================================ */

export function Circles() {
  const toast = useToast();
  const { openSheet } = useSheet();
  const { S } = useStore();

  return (
    <Shell tab="perfil">
      <Page>
        <PageTitle>Circles</PageTitle>
        <Btn label="Crear círculo" cls="block" onClick={() => toast('Nuevo círculo')} />
        <div className="k-sp-11" />

        {S.circles.map((c) => (
          <div className="card" key={c.n}>
            <div className="k-row">
              <span className="icon-btn"><I.users /></span>
              <div style={{ flex: 1 }}>
                <div className="t1">{c.n}</div>
                <div className="t2">{c.d}</div>
              </div>
              <span className="badge">{c.p}</span>
            </div>
            <div className="actions-row">
              <span className="meta">{c.m} miembros</span>
              <span className="spacer" />
              <button
                className="act"
                onClick={() => openSheet(`Roles de ${c.n}`, [
                  { label: 'Administrador' },
                  { label: 'Miembro' },
                  { label: 'Solo lectura' },
                ])}
              >Roles</button>
              <button className="act" onClick={() => toast('Gestionando miembros')}>Miembros</button>
            </div>
          </div>
        ))}
      </Page>
    </Shell>
  );
}

export function Orbits() {
  const navigate = useNavigate();
  const toast = useToast();
  const { S } = useStore();

  return (
    <Shell tab="perfil">
      <Page>
        <PageTitle>Orbits</PageTitle>
        <Btn label="Crear órbita" cls="block" onClick={() => toast('Nueva órbita')} />
        <div className="k-sp-11" />

        {S.orbits.map((o) => (
          <div className="card k-pointer" key={o.n} onClick={() => navigate(`/orbit/${encodeURIComponent(o.n)}`)}>
            <div className="k-row">
              <span className="icon-btn"><I.orbit /></span>
              <div style={{ flex: 1 }}>
                <div className="t1">{o.n}</div>
                <div className="t2">{o.d}</div>
              </div>
              <span className="badge">{o.r}</span>
            </div>
            <div className="actions-row">
              <span className="meta">{o.m} miembros</span>
              <span className="spacer" />
              <button className="act">Entrar</button>
            </div>
          </div>
        ))}
      </Page>
    </Shell>
  );
}

export function OrbitFeed() {
  const { name } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { S, setUi } = useStore();

  const o = S.orbits.find((x) => x.n === name) || S.orbits[0];
  const tab = S.ui.otab || 0;
  const canales = S.channels.filter((c) => c.o === o.n);

  return (
    <Shell tab="perfil">
      <Page>
        <HBar title={o.n} />
        <div className="card">
          <div className="k-row">
            <span className="icon-btn"><I.orbit /></span>
            <div style={{ flex: 1 }}>
              <div className="t1">{o.n}</div>
              <div className="t2">{o.d}</div>
            </div>
            <span className="badge">{o.r}</span>
          </div>
          <div className="actions-row">
            <span className="meta">{o.m} miembros</span>
            <span className="spacer" />
            <Btn label="Miembros" cls="sm ghost" onClick={() => toast('Lista de miembros')} />
            <Btn label="Configuración" cls="sm ghost" onClick={() => toast('Configuración de la órbita')} />
          </div>
        </div>

        <Seg options={['Publicaciones', 'Canales']} value={tab} onChange={(i) => setUi('otab', i)} />

        {tab === 0 ? S.posts.slice(0, 2).map((p) => <PostCard key={p.id} p={p} />) : null}

        {tab === 1 ? (
          <div className="card">
            {canales.length ? canales.map((c) => (
              <div className="row" key={c.n}>
                <span className="icon-btn"><I.hash /></span>
                <div className="grow">
                  <div className="t1">{c.n}</div>
                  <div className="t2">{c.m} miembros · {c.r}</div>
                </div>
                <Btn label="Abrir" cls="sm" onClick={() => navigate('/channels')} />
              </div>
            )) : <EmptyState title="Sin canales" />}
          </div>
        ) : null}
      </Page>
    </Shell>
  );
}

export function Channels() {
  const navigate = useNavigate();
  const toast = useToast();
  const { S } = useStore();

  return (
    <Shell tab="perfil">
      <Page>
        <PageTitle>Channels</PageTitle>
        <Btn label="Crear canal" cls="block" onClick={() => toast('Nuevo canal')} />
        <div className="k-sp-11" />
        <div className="card">
          {S.channels.map((c) => (
            <div className="row" key={c.n}>
              <span className="icon-btn"><I.hash /></span>
              <div className="grow">
                <div className="t1">#{c.n}</div>
                <div className="t2">{c.o} · {c.m} miembros</div>
              </div>
              <span className="badge">{c.r}</span>
              <Btn label="Entrar" cls="sm" onClick={() => navigate('/mensajes/c2')} />
            </div>
          ))}
        </div>
      </Page>
    </Shell>
  );
}
