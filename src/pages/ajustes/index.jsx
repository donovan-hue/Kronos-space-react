import { useNavigate } from 'react-router-dom';
import { Shell, Page, PageTitle, Mini } from '../../components/layout/Shell.jsx';
import { HBar } from '../../components/layout/HBar.jsx';
import { Avatar } from '../../components/Avatar.jsx';
import { Btn } from '../../components/Button.jsx';
import { Seg, Switch, RowLink } from '../../components/Primitives.jsx';
import { Field } from '../../components/Field.jsx';
import { I } from '../../components/icons/index.jsx';
import { SettingsCover } from '../../components/graphics/index.jsx';
import { useStore } from '../../state/store.jsx';
import { useToast } from '../../components/Toasts.jsx';
import { useSheet } from '../../components/Sheet.jsx';

/* ============================================================
   SETTINGS / ADMIN — Settings / SettingsPerfil /
   SettingsSeguridad / Admin
   ============================================================ */

export function Settings() {
  const navigate = useNavigate();
  const toast = useToast();
  const { S, toggleUi } = useStore();

  return (
    <Shell tab="perfil">
      <Page>
        <PageTitle>Settings</PageTitle>

        <div className="card">
          <RowLink icon={<I.user />} title="Perfil" desc="Nombre, username, biografía y fotos" onClick={() => navigate('/settings-perfil')} />
          <RowLink icon={<I.shield />} title="Seguridad y moderación" desc="Bloqueados, silenciados y reportes" onClick={() => navigate('/settings-seguridad')} />
          <RowLink icon={<I.gear />} title="Cuenta" desc="Correo, contraseña y sesiones" onClick={() => toast('Ajustes de cuenta')} />
        </div>

        <Mini style={{ margin: '1.3rem 0 .6rem' }}>Preferencias</Mini>
        <div className="card">
          <div className="row">
            <div className="grow"><div className="t1">Modo reducido</div><div className="t2">Menos movimiento en la interfaz</div></div>
            <Switch on={!!S.ui.m1} onClick={() => toggleUi('m1')} />
          </div>
          <div className="row">
            <div className="grow"><div className="t1">Notificaciones push</div><div className="t2">Avisos en tiempo real</div></div>
            <Switch on={!!S.ui.m2} onClick={() => toggleUi('m2')} />
          </div>
          <div className="row">
            <div className="grow"><div className="t1">Perfil privado</div><div className="t2">Solo tus seguidores ven tu contenido</div></div>
            <Switch on={!!S.ui.m3} onClick={() => toggleUi('m3')} />
          </div>
          <div className="row">
            <div className="grow"><div className="t1">Mostrar actividad</div><div className="t2">Quién está en línea</div></div>
            <Switch on={!!S.ui.m4} onClick={() => toggleUi('m4')} />
          </div>
        </div>

        <div className="k-sp-14" />
        <Btn label="Cerrar sesión" cls="block ghost" onClick={() => { toast('Sesión cerrada'); navigate('/'); }} />
        <div className="center meta" style={{ marginTop: '1.4rem' }}>KRONOS SPACE · versión 0.1</div>
      </Page>
    </Shell>
  );
}

export function SettingsPerfil() {
  const navigate = useNavigate();
  const toast = useToast();

  return (
    <Shell tab="perfil">
      <Page>
        <HBar title="Profile Settings" />
        <SettingsCover />

        <div style={{ display: 'flex', gap: '.7rem', margin: '.8rem 0 1.3rem' }}>
          <Btn label="Cambiar portada" cls="sm ghost" onClick={() => toast('Selector de portada')} />
          <Btn label="Cambiar foto" cls="sm ghost" onClick={() => toast('Selector de foto')} />
        </div>

        <Field id="sp_n" label="Nombre" type="text" placeholder="Ana Ruiz" error="" />
        <Field id="sp_u" label="Username" type="text" placeholder="@anaruiz" error="" />
        <Field
          id="sp_bio"
          label="Biografía"
          as="textarea"
          placeholder="Cuéntale a tu órbita quién eres"
          defaultValue="Construyendo KRONOS SPACE. Tiempo, espacio y archivo."
        />

        <Btn label="Guardar cambios" cls="block" onClick={() => { toast('Perfil actualizado'); navigate('/perfil'); }} />
      </Page>
    </Shell>
  );
}

export function SettingsSeguridad() {
  const toast = useToast();
  const { openSheet } = useSheet();
  const { S, setUi } = useStore();
  const st = S.ui.st || 0;

  const reportDialog = () => {
    openSheet('Reportar contenido', [
      { label: 'Spam o engaño', run: () => toast('Reporte enviado') },
      { label: 'Acoso o incitación al odio', run: () => toast('Reporte enviado') },
      { label: 'Contenido sensible', run: () => toast('Reporte enviado') },
      { label: 'Suplantación de identidad', run: () => toast('Reporte enviado') },
      { label: 'Cancelar' },
    ]);
  };

  return (
    <Shell tab="perfil">
      <Page>
        <HBar title="Security / Moderation" />
        <Seg options={['Bloqueados', 'Silenciados', 'Reportes']} value={st} onChange={(i) => setUi('st', i)} />

        {st === 0 ? (
          <div className="card">
            {S.blocked.map((b) => (
              <div className="row" key={b}>
                <Avatar ini={b.slice(0, 2).toUpperCase()} />
                <div className="grow">
                  <div className="t1">@{b}</div>
                  <div className="t2">Bloqueado</div>
                </div>
                <Btn label="Desbloquear" cls="sm ghost" onClick={() => toast('Desbloqueado')} />
              </div>
            ))}
          </div>
        ) : null}

        {st === 1 ? (
          <div className="card">
            {S.muted.map((b) => (
              <div className="row" key={b}>
                <Avatar ini={b.slice(0, 2).toUpperCase()} />
                <div className="grow">
                  <div className="t1">@{b}</div>
                  <div className="t2">Silenciado</div>
                </div>
                <Btn label="Reactivar" cls="sm ghost" onClick={() => toast('Ya no está silenciado')} />
              </div>
            ))}
          </div>
        ) : null}

        {st === 2 ? (
          <div className="card">
            {S.reports.map((r) => (
              <div className="row" key={r.w}>
                <span className="icon-btn"><I.shield /></span>
                <div className="grow">
                  <div className="t1">{r.w}</div>
                  <div className="t2">{r.r}</div>
                </div>
                <span className={`badge ${r.st === 'Resuelto' ? 'ok' : 'warn'}`}>{r.st}</span>
              </div>
            ))}
          </div>
        ) : null}

        <div className="k-sp-12" />
        <Btn label="Abrir diálogo de reporte" cls="block ghost" onClick={reportDialog} />
      </Page>
    </Shell>
  );
}

export function Admin() {
  const toast = useToast();
  const { openSheet } = useSheet();
  const { S, setUi, toggleUi } = useStore();

  if (S.ui.denied) {
    return (
      <Shell tab="perfil">
        <Page>
          <HBar title="Admin" />
          <div className="state" style={{ borderColor: 'rgba(224,139,139,.35)' }}>
            <div className="t" style={{ color: 'var(--bad)' }}>403 · Acceso prohibido</div>
            <div className="d">
              Tu rol no permite entrar a esta sección.<br />Pide acceso a un Owner.
            </div>
            <div style={{ marginTop: '1.3rem' }}>
              <Btn label="Volver" cls="sm" onClick={() => setUi('denied', false)} />
            </div>
          </div>
        </Page>
      </Shell>
    );
  }

  const at = S.ui.at || 0;

  return (
    <Shell tab="perfil">
      <Page>
        <HBar title="Admin" extra={<span className="badge ok">Owner</span>} />
        <Seg options={['Usuarios', 'Moderación', 'Configuración']} value={at} onChange={(i) => setUi('at', i)} />

        {at === 0 ? (
          <div className="card" style={{ overflowX: 'auto' }}>
            <table className="table">
              <thead>
                <tr><th>Usuario</th><th>Rol</th><th>Estado</th><th /></tr>
              </thead>
              <tbody>
                {S.admins.map((a) => (
                  <tr key={a.u}>
                    <td>
                      <div style={{ color: '#e4eaf1' }}>{a.n}</div>
                      <div className="meta">@{a.u}</div>
                    </td>
                    <td><span className="badge">{a.r}</span></td>
                    <td><span className={`badge ${a.st === 'Activo' ? 'ok' : 'bad'}`}>{a.st}</span></td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        className="act"
                        onClick={() => openSheet('@' + a.u, [
                          { label: 'Cambiar rol' },
                          { label: 'Suspender', danger: true },
                          { label: 'Eliminar cuenta', danger: true },
                        ])}
                      ><I.dots /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}

        {at === 1 ? (
          <div className="card">
            {S.reports.map((r) => (
              <div className="row" key={r.w}>
                <span className="icon-btn"><I.shield /></span>
                <div className="grow">
                  <div className="t1">{r.w}</div>
                  <div className="t2">{r.r}</div>
                </div>
                <Btn label="Resolver" cls="sm ghost" onClick={() => toast('Reporte resuelto')} />
              </div>
            ))}
          </div>
        ) : null}

        {at === 2 ? (
          <div className="card">
            <div className="row">
              <div className="grow"><div className="t1">Registro abierto</div><div className="t2">Permitir nuevas cuentas</div></div>
              <Switch on={!!S.ui.a1} onClick={() => toggleUi('a1')} />
            </div>
            <div className="row">
              <div className="grow"><div className="t1">Kairos para todos</div><div className="t2">Generación AI sin lista de espera</div></div>
              <Switch on={!!S.ui.a2} onClick={() => toggleUi('a2')} />
            </div>
            <div className="row">
              <div className="grow"><div className="t1">Modo mantenimiento</div><div className="t2">Bloquea el acceso público</div></div>
              <Switch on={!!S.ui.a3} onClick={() => toggleUi('a3')} />
            </div>
          </div>
        ) : null}

        {at === 2 ? (
          <>
            <div className="k-sp-12" />
            <Btn label="Ver estado sin permisos" cls="block ghost" onClick={() => setUi('denied', true)} />
          </>
        ) : null}
      </Page>
    </Shell>
  );
}
