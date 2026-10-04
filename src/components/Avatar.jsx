import { I } from './icons/index.jsx';

/* Avatar con aro cromado (--ring). Portado del helper `avatar(ini, cls)`. */
export function Avatar({ ini, cls = '' }) {
  return (
    <span className={`avatar ${cls}`}>
      <span>{ini}</span>
    </span>
  );
}

/* Variante usada en "Historias" y Mensajes: <span class="avatar"><span>+</span></span> */
export function AvatarRaw({ children, cls = '' }) {
  return (
    <span className={`avatar ${cls}`}>
      <span>{children}</span>
    </span>
  );
}

/* Icono dentro de un contenedor .icon-btn (patrón repetido en las listas) */
export function IconBtn({ children, onClick, title, dot }) {
  return (
    <button className="icon-btn" onClick={onClick} title={title}>
      {children}
      {dot ? <span className="dot" /> : null}
    </button>
  );
}

export { I };
