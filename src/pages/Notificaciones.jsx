import { useNavigate } from 'react-router-dom';
import { Shell, Page, PageTitle, EmptyState } from '../components/layout/Shell.jsx';
import { Avatar } from '../components/Avatar.jsx';
import { Btn } from '../components/Button.jsx';
import { Seg } from '../components/Primitives.jsx';
import { useStore } from '../state/store.jsx';
import { useToast } from '../components/Toasts.jsx';

/* Notificaciones — portado de `Notificaciones()`.
   Filtro por tipo con el mismo mapeo de índices a claves. */
const KINDS = [null, 'like', 'comment', 'follow'];

export function Notificaciones() {
  const navigate = useNavigate();
  const toast = useToast();
  const { S, setUi, markAllNotifsRead } = useStore();

  const f = S.ui.nf || 0;
  const list = S.notifs.filter((n) => !KINDS[f] || n.k === KINDS[f]);

  return (
    <Shell tab="perfil">
      <Page>
        <PageTitle>Notificaciones</PageTitle>
        <Seg options={['Todas', 'Me gusta', 'Comentarios', 'Seguidores']} value={f} onChange={(i) => setUi('nf', i)} />

        {list.length ? (
          <div className="card">
            {list.map((n, i) => (
              <div className="row k-pointer" key={i} onClick={() => navigate('/post/p1')}>
                <Avatar ini={n.i} />
                <div className="grow">
                  <div className="t1">{n.a} <span style={{ color: 'var(--dim)' }}>{n.txt}</span></div>
                  <div className="t2">{n.t}</div>
                </div>
                {n.un ? <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#e8eef5', flex: 'none' }} /> : null}
              </div>
            ))}
          </div>
        ) : (
          <EmptyState title="Nada por aquí" desc="No tienes notificaciones de este tipo." />
        )}

        <div className="k-sp-10" />
        <Btn
          label="Marcar todas como leídas"
          cls="block ghost"
          onClick={() => { markAllNotifsRead(); toast('Todo leído'); }}
        />
      </Page>
    </Shell>
  );
}
