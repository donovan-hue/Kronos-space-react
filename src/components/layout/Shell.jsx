import { useNavigate } from 'react-router-dom';
import { Brand } from '../Brand.jsx';
import { I } from '../icons/index.jsx';

/* ============================================================
   Shell de la aplicación — reemplaza a `shell(inner, tab)`.
   Appbar sticky (blur 14px) + barra inferior de 5 pestañas.
   Los `onclick="go('#/x')"` se convierten en navegación del router.

   El layout NO es una ruta contenedora: cada pantalla lo usa como
   envoltorio, exactamente igual que el original, porque `tab` cambia
   según la pantalla (buscar se marca activo en Perfil, kairos en sus
   vistas, etc.).
   ============================================================ */

const TABS = [
  { r: 'home', label: 'Home', Icon: I.home },
  { r: 'buscar', label: 'Explore', Icon: I.search },
  { r: 'crear', label: 'Crear', Icon: I.plus },
  { r: 'kairos', label: 'Kairos', Icon: I.spark },
  { r: 'perfil', label: 'Perfil', Icon: I.user },
];

export function AppBar() {
  const navigate = useNavigate();
  return (
    <div className="appbar">
      <div className="k-pointer" onClick={() => navigate('/home')}>
        <Brand text="KRONOS" cls="mark" />
      </div>
      <div style={{ display: 'flex', gap: '.2rem' }}>
        <button className="icon-btn" onClick={() => navigate('/buscar')} title="Buscar"><I.search /></button>
        <button className="icon-btn" onClick={() => navigate('/notificaciones')} title="Notificaciones">
          <I.bell /><span className="dot" />
        </button>
        <button className="icon-btn" onClick={() => navigate('/mensajes')} title="Mensajes"><I.mail /></button>
        <button className="icon-btn" onClick={() => navigate('/pantallas')} title="Todas las pantallas"><I.grid /></button>
      </div>
    </div>
  );
}

export function TabBar({ tab }) {
  const navigate = useNavigate();
  return (
    <div className="tabbar">
      {TABS.map(({ r, label, Icon }) => (
        <div key={r} className={`tab ${tab === r ? 'on' : ''}`} onClick={() => navigate(`/${r}`)}>
          <Icon />
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}

/** Envoltorio completo: .appbar + contenido + .tabbar */
export function Shell({ children, tab }) {
  return (
    <>
      <AppBar />
      {children}
      <TabBar tab={tab} />
    </>
  );
}

/** .page — contenedor de ancho máximo 660 px. */
export function Page({ children, className = '', ...rest }) {
  return <div className={`page ${className}`} {...rest}>{children}</div>;
}

/** Título de página cromado (.page-title). */
export function PageTitle({ children, style }) {
  return <div className="page-title" style={style}>{children}</div>;
}

/** Etiqueta pequeña en mayúsculas (.mini). */
export function Mini({ children, style }) {
  return <div className="mini" style={style}>{children}</div>;
}

/** .state — estado vacío / informativo. */
export function EmptyState({ title, desc, action }) {
  return (
    <div className="state">
      <div className="t">{title}</div>
      {desc ? <div className="d">{desc}</div> : null}
      {action ? <div style={{ marginTop: '1.4rem' }}>{action}</div> : null}
    </div>
  );
}

/** .bar — barra de progreso metálica. */
export function Bar({ width, style }) {
  return (
    <div className="bar" style={style}>
      <i style={{ width: `${width}%` }} />
    </div>
  );
}
