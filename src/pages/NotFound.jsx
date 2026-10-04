import { useNavigate } from 'react-router-dom';
import { Brand } from '../components/Brand.jsx';
import { Btn } from '../components/Button.jsx';

/* Página 404 — portada de `NotFound()`.
   NOTA: en kronos.html esta función está definida DOS VECES (líneas 723 y
   1542) con cuerpo idéntico. Se portó una sola vez; la duplicada no se migró. */
export function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="auth-wrap">
      <div className="auth-card center">
        <div className="auth-head">
          <div><Brand text="404" cls="mark" /></div>
        </div>
        <div className="state" style={{ borderStyle: 'solid' }}>
          <div className="t">Página no encontrada</div>
          <div className="d">
            Esta coordenada no existe en KRONOS SPACE.<br />
            Puede que se haya movido o que el enlace esté roto.
          </div>
        </div>
        <div className="k-sp-12" />
        <Btn label="Volver al inicio" cls="block" onClick={() => navigate('/home')} />
      </div>
    </div>
  );
}
