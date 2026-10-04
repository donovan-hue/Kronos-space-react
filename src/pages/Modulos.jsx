import { useNavigate } from 'react-router-dom';
import { Shell, Page, PageTitle, Mini, Bar } from '../components/layout/Shell.jsx';
import { HBar } from '../components/layout/HBar.jsx';
import { Btn } from '../components/Button.jsx';
import { Seg } from '../components/Primitives.jsx';
import { I } from '../components/icons/index.jsx';
import { ArtV } from '../components/graphics/index.jsx';
import { PostCard } from '../components/feed/PostCard.jsx';
import { useStore } from '../state/store.jsx';
import { useToast } from '../components/Toasts.jsx';

/* ============================================================
   LIVE / CAPSULES / PULSE / ANALYTICS
   Portado de las cuatro funciones homónimas.
   ============================================================ */

/* Live — `Live()`.
   `S.ui.room` guarda el ÍNDICE de la sala (0 es válido), así que la
   comprobación es != null, igual que en el original (`S.ui.room!=null`). */
export function Live() {
  const toast = useToast();
  const { S, setUi } = useStore();

  if (S.ui.room != null) {
    const r = S.rooms[S.ui.room];
    return (
      <Shell tab="perfil">
        <Page>
          <HBar title={r.n} extra={<span className="badge bad">En vivo</span>} />

          <div className="reel" style={{ height: '46vh' }}>
            <ArtV seed="live" />
            <div className="ov">
              <div style={{ fontSize: '.84rem', color: '#dce3eb' }}>Sala de {r.h} · {r.v} viendo</div>
            </div>
          </div>

          <div className="card">
            <div className="kv"><span>Estado de conexión</span><span className="badge ok">Estable · 48 ms</span></div>
            <div className="kv"><span>Participantes</span><span>{r.v}</span></div>
            <div className="kv" style={{ border: 0 }}><span>Audio / Video</span><span>Activos</span></div>
          </div>

          <div style={{ display: 'flex', gap: '.6rem', flexWrap: 'wrap' }}>
            <Btn label="Silenciar" cls="sm ghost" onClick={() => toast('Micrófono silenciado')} />
            <Btn label="Cámara" cls="sm ghost" onClick={() => toast('Cámara apagada')} />
            <Btn label="Salir" cls="sm" onClick={() => { setUi('room', null); toast('Saliste de la sala'); }} />
          </div>
        </Page>
      </Shell>
    );
  }

  return (
    <Shell tab="perfil">
      <Page>
        <PageTitle>Live</PageTitle>
        <Btn label="Crear sala" cls="block" onClick={() => { toast('Sala creada'); setUi('room', 0); }} />
        <div className="k-sp-11" />

        {S.rooms.map((r, i) => (
          <div className="card" key={r.n}>
            <div className="k-row">
              <span className="icon-btn"><I.live /></span>
              <div style={{ flex: 1 }}>
                <div className="t1">{r.n}</div>
                <div className="t2">@{r.h} · {r.v} viendo</div>
              </div>
              <span className={`badge ${r.on ? 'bad' : ''}`}>{r.on ? 'En vivo' : 'Terminada'}</span>
            </div>
            <div className="actions-row">
              <span className="spacer" />
              {r.on
                ? <Btn label="Entrar" cls="sm" onClick={() => setUi('room', i)} />
                : <Btn label="Ver grabación" cls="sm ghost" onClick={() => toast('Reproduciendo grabación')} />}
            </div>
          </div>
        ))}
      </Page>
    </Shell>
  );
}

/* Capsules — `Capsules()`.
   Tamaños de candado: el original usaba .replace(/34/g,'22') y /34/g,'14']. */
export function Capsules() {
  const toast = useToast();
  const { S } = useStore();

  return (
    <Shell tab="perfil">
      <Page>
        <PageTitle>Capsules</PageTitle>
        <Btn label="Crear cápsula" cls="block" onClick={() => toast('Nueva cápsula')} />
        <div className="k-sp-11" />

        {S.caps.map((c) => (
          <div className="card" key={c.id}>
            <div className="k-row">
              <span className="icon-btn">{c.open ? <I.caps /> : <I.lock size={22} />}</span>
              <div style={{ flex: 1 }}>
                <div className="t1">{c.t}</div>
                <div className="t2">Fecha de apertura · {c.d}</div>
              </div>
              <span className={`badge ${c.open ? 'ok' : 'warn'}`}>{c.open ? 'Abierta' : 'Bloqueada'}</span>
            </div>

            {c.open ? (
              <div className="body-text" style={{ fontSize: '.88rem' }}>{c.txt}</div>
            ) : (
              <>
                <Bar width={c.id === 'k1' ? 34 : 72} style={{ marginTop: '.9rem' }} />
                <div className="meta" style={{ marginTop: '.5rem' }}>
                  Se desbloquea automáticamente en la fecha indicada
                </div>
              </>
            )}

            <div className="actions-row">
              <span className="meta">Guardada en tu espacio</span>
              <span className="spacer" />
              {c.open ? (
                <button className="act" onClick={() => toast('Cápsula leída')}>Leer</button>
              ) : (
                <button className="act" onClick={() => toast('Todavía bloqueada')}>
                  <I.lock size={14} /><span>Bloqueada</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </Page>
    </Shell>
  );
}

/* Pulse — `Pulse()` */
export function Pulse() {
  const { S, setUi } = useStore();
  return (
    <Shell tab="buscar">
      <Page>
        <PageTitle>Pulse</PageTitle>
        <Seg options={['Ahora', 'Hoy', 'Semana']} value={S.ui.pf || 0} onChange={(i) => setUi('pf', i)} />

        {S.pulse.map((p) => (
          <div className="card" key={p.t}>
            <div className="k-row">
              <span className="icon-btn"><I.pulse /></span>
              <div style={{ flex: 1 }}>
                <div className="t1">{p.t}</div>
                <div className="t2">{p.d}</div>
              </div>
              <span className="badge ok">{p.m}</span>
            </div>
          </div>
        ))}

        <Mini style={{ margin: '1.2rem 0 .6rem' }}>Resultados relacionados</Mini>
        {S.posts.slice(0, 1).map((p) => <PostCard key={p.id} p={p} />)}
      </Page>
    </Shell>
  );
}

/* Analytics — `Analytics()`.
   Las alturas de las barras son dinámicas (por eso van como prop style),
   el degradado metálico sale del CSS. */
const BARS = [38, 54, 41, 78, 62, 91, 70];
const DAYS = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
const METRICS = [
  ['Alcance', '48.2k', '+18%'],
  ['Interacciones', '6.4k', '+9%'],
  ['Remixes', '312', '+34%'],
  ['Nuevos seguidores', '1.1k', '+5%'],
];

export function Analytics() {
  const { S, setUi } = useStore();
  return (
    <Shell tab="perfil">
      <Page>
        <PageTitle>Analytics</PageTitle>
        <Seg options={['7 días', '30 días', 'Año']} value={S.ui.af || 0} onChange={(i) => setUi('af', i)} />

        <div className="grid g2" style={{ marginBottom: '.9rem' }}>
          {METRICS.map((m) => (
            <div className="card" key={m[0]} style={{ margin: 0 }}>
              <div className="mini">{m[0]}</div>
              <div style={{ fontSize: '1.3rem', color: '#eaf0f7', margin: '.35rem 0 .2rem', letterSpacing: '.02em' }}>{m[1]}</div>
              <span className="badge ok">{m[2]}</span>
            </div>
          ))}
        </div>

        <div className="card">
          <Mini style={{ marginBottom: '1rem' }}>Alcance por día</Mini>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '.55rem', height: 124 }}>
            {BARS.map((b, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '.45rem' }}>
                <div style={{
                  width: '100%', height: `${b}%`, borderRadius: '6px 6px 2px 2px',
                  background: 'linear-gradient(180deg,#e2e8f0,#3a4047)', opacity: .85,
                }} />
                <span className="mini">{DAYS[i]}</span>
              </div>
            ))}
          </div>
        </div>

        <Mini style={{ margin: '1.2rem 0 .6rem' }}>Publicaciones propias</Mini>
        <div className="card">
          {S.posts.map((p) => (
            <div className="row" key={p.id}>
              <div className="grow">
                <div className="t1" style={{ lineHeight: 1.4 }}>{p.txt.slice(0, 46)}...</div>
                <div className="t2">{p.likes} me gusta · {p.comments} comentarios</div>
              </div>
              <span className="badge">{p.likes * 7}</span>
            </div>
          ))}
        </div>
      </Page>
    </Shell>
  );
}
