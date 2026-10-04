import { useNavigate, useParams } from 'react-router-dom';
import { Shell, Page, PageTitle, Mini } from '../components/layout/Shell.jsx';
import { HBar } from '../components/layout/HBar.jsx';
import { Avatar } from '../components/Avatar.jsx';
import { Btn } from '../components/Button.jsx';
import { Switch, Chip } from '../components/Primitives.jsx';
import { I } from '../components/icons/index.jsx';
import { useStore } from '../state/store.jsx';
import { useToast } from '../components/Toasts.jsx';
import { useSheet } from '../components/Sheet.jsx';
import { useForm } from '../lib/hooks.js';

/* ============================================================
   MENSAJERÍA — Mensajes / Chat / Conversaciones
   ============================================================ */

export function Mensajes() {
  const navigate = useNavigate();
  const { S } = useStore();

  return (
    <Shell tab="perfil">
      <Page>
        <PageTitle>Mensajes</PageTitle>
        <Btn label="Nueva conversación" cls="block" onClick={() => navigate('/conversaciones')} />
        <div className="k-sp-11" />
        <div className="card">
          {S.convs.map((c) => (
            <div className="row k-pointer" key={c.id} onClick={() => navigate(`/mensajes/${c.id}`)}>
              <Avatar ini={c.i} />
              <div className="grow">
                <div className="t1">
                  {c.n} {c.grp ? <span className="badge" style={{ marginLeft: '.4rem' }}>Grupo</span> : null}
                </div>
                <div className="t2">{c.last}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div className="meta">{c.t}</div>
                {c.un ? (
                  <div className="badge" style={{ marginTop: '.3rem', color: '#eaf0f7', borderColor: 'rgba(226,233,242,.6)' }}>{c.un}</div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </Page>
    </Shell>
  );
}

/* Conversación — `Chat(id)` + `sendMsg(id)`.
   Los acuses de recibo (enviado → entregado → leído) usaban dos setTimeout
   sobre el último mensaje del array. Se conservan los tiempos (700 y 1800 ms)
   actualizando el mensaje por índice. */
export function Chat() {
  const { id } = useParams();
  const toast = useToast();
  const { openSheet } = useSheet();
  const { S, addMsg, setMsgStatus, setUi } = useStore();
  const form = useForm({ m_new: '' });

  const c = S.convs.find((x) => x.id === id) || S.convs[0];
  const ms = S.msgs[c.id] || [];

  const sendMsg = () => {
    const v = form.get('m_new');
    if (!v) return;
    const index = ms.length;
    addMsg(c.id, { me: true, txt: v, t: 'ahora', st: 'enviado' });
    form.setValues((s) => ({ ...s, m_new: '' }));
    setTimeout(() => setMsgStatus(c.id, index, 'entregado'), 700);
    setTimeout(() => setMsgStatus(c.id, index, 'leído'), 1800);
  };

  const retry = () => { setUi('failed', null); toast('Mensaje reenviado'); };

  return (
    <Shell tab="perfil">
      <Page>
        <HBar
          title={c.n}
          extra={
            <button
              className="icon-btn"
              onClick={() => openSheet('Conversación', [
                { label: 'Ver miembros' },
                { label: 'Silenciar' },
                { label: 'Salir', danger: true },
              ])}
            ><I.dots /></button>
          }
        />

        <div className="msgs">
          {ms.map((m, i) => (
            <div key={i}>
              <div className={`bubble ${m.me ? 'me' : 'you'}`}>{m.txt}</div>
              <div className={`tick ${m.me ? 'me' : ''}`}>
                {m.t}{m.me ? ' · ' + (m.st || 'enviado') : ''}
              </div>
            </div>
          ))}

          {S.ui.failed ? (
            <div>
              <div className="bubble me" style={{ borderColor: 'rgba(224,139,139,.5)' }}>{S.ui.failed}</div>
              <div className="tick me" style={{ color: '#d99a9a' }}>
                No se envió · <span className="link" onClick={retry}>Reintentar</span>
              </div>
            </div>
          ) : null}
        </div>

        <div className="composer">
          <div className="input-ring" style={{ flex: 1 }}>
            <input id="m_new" type="text" placeholder="Escribe un mensaje..." {...form.bind('m_new')} />
          </div>
          <Btn label="Enviar" cls="sm" onClick={sendMsg} />
        </div>
      </Page>
    </Shell>
  );
}

export function Conversaciones() {
  const navigate = useNavigate();
  const toast = useToast();
  const { S, toggleUi, setUi } = useStore();

  const roles = ['Miembro', 'Moderador', 'Solo lectura'];
  const rol = S.ui.rol || 0;

  return (
    <Shell tab="perfil">
      <Page>
        <HBar title="Nueva conversación" />
        <div className="input-ring" style={{ marginBottom: '1rem' }}>
          <input type="text" placeholder="Buscar personas..." />
        </div>

        <Mini style={{ marginBottom: '.5rem' }}>Selecciona miembros</Mini>
        <div className="card">
          {S.users.map((u) => (
            <div className="row" key={u.u}>
              <Avatar ini={u.i} />
              <div className="grow">
                <div className="t1">{u.n}</div>
                <div className="t2">@{u.u}</div>
              </div>
              <Switch on={!!S.ui['sel' + u.u]} onClick={() => toggleUi('sel' + u.u)} />
            </div>
          ))}
        </div>

        <Mini style={{ margin: '1.2rem 0 .5rem' }}>Rol por defecto</Mini>
        <div style={{ display: 'flex', gap: '.5rem', marginBottom: '1.2rem' }}>
          {roles.map((r, i) => (
            <Chip key={r} on={rol === i} onClick={() => setUi('rol', i)}>{r}</Chip>
          ))}
        </div>

        <Btn label="Crear conversación" cls="block" onClick={() => { toast('Conversación creada'); navigate('/mensajes'); }} />
      </Page>
    </Shell>
  );
}
