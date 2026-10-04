import { I } from '../icons/index.jsx';
import { useBack } from '../../lib/hooks.js';

/* Cabecera interna con botón atrás — portado del helper `hbar(title, extra)`.
   El `extra` (por ejemplo un botón de menú o un badge) se conserva. */
export function HBar({ title, extra }) {
  const back = useBack();
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem', marginBottom: '1.1rem' }}>
      <button className="icon-btn" onClick={back}><I.back /></button>
      <div className="page-title" style={{ margin: 0, flex: 1 }}>{title}</div>
      {extra || null}
    </div>
  );
}
