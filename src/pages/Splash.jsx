import { useNavigate } from 'react-router-dom';
import { Brand } from '../components/Brand.jsx';
import { Btn } from '../components/Button.jsx';

/* Pantalla Splash — portada de `Splash()`.
   El efecto 3D es CSS puro y se conserva intacto:
     .splash   → perspective:2400px; perspective-origin:50% 48%
     .lockup   → transform-style:preserve-3d + @keyframes sway 18s (rotateX 8° / rotateY ±3°)
   El tamaño del lockup usa min(13vw,26vh) etc., tal cual el original.
   El original tenía botones "Inicio" y "Crear cuenta" apilados con gap:.85rem
   (idéntico a .stack) pero centrados en un contenedor absoluto: se mantiene
   el style con los mismos valores para no alterar la composición. */
export function Splash() {
  const navigate = useNavigate();

  return (
    <div className="splash" style={{ position: 'relative' }}>
      <div className="lockup">
        <Brand text="KRONOS" cls="w1" />
        <Brand text="SPACE" cls="w2" />
        <div className="rule" />
        <div className="tag">Tu Tiempo, Tu espacio, Tu dominio</div>
      </div>

      <div style={{ position: 'absolute', left: 0, right: 0, bottom: '16vh', display: 'flex', flexDirection: 'column', gap: '.85rem', alignItems: 'center', zIndex: 5 }}>
        <Btn label="Inicio" onClick={() => navigate('/login')} />
        <Btn label="Crear cuenta" onClick={() => navigate('/registro')} />
      </div>

      <div style={{ position: 'fixed', left: 0, right: 0, bottom: '1.1rem', textAlign: 'center' }}>
        <span
          onClick={() => navigate('/pantallas')}
          style={{ fontSize: '.58rem', letterSpacing: '.3em', textTransform: 'uppercase', color: '#3a4047', cursor: 'pointer' }}
        >
          Ver todas las pantallas
        </span>
      </div>
    </div>
  );
}
