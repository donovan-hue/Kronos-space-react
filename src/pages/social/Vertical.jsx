import { useNavigate } from 'react-router-dom';
import { Shell } from '../../components/layout/Shell.jsx';
import { Avatar } from '../../components/Avatar.jsx';
import { Btn } from '../../components/Button.jsx';
import { I } from '../../components/icons/index.jsx';
import { ArtV } from '../../components/graphics/index.jsx';
import { useToast } from '../../components/Toasts.jsx';

/* Feed vertical — portado de `Vertical()`.
   Se conserva el contenedor con scroll-snap y la altura 100dvh-4rem,
   y la barra de progreso con anchura dependiente del índice (28+n*22 %). */
const REELS = [
  { u: 'ivanmora', i: 'IM', txt: 'Render final del orbitador. Sin posproducción.', l: '2.1k', c: '84' },
  { u: 'mariel', i: 'MR', txt: 'Doce horas de cielo en once segundos.', l: '940', c: '37' },
  { u: 'zeta', i: 'ZT', txt: 'Probando la cámara nueva en el estudio.', l: '3.4k', c: '152' },
];

export function Vertical() {
  const navigate = useNavigate();
  const toast = useToast();

  return (
    <Shell tab="home">
      <div
        className="page"
        style={{ paddingTop: '.6rem', scrollSnapType: 'y mandatory', height: 'calc(100dvh - 4rem)', overflowY: 'auto' }}
      >
        {REELS.map((r, n) => (
          <div className="reel" key={r.u}>
            <ArtV seed={n} />
            <div className="play" onClick={() => toast('Reproduciendo')}><I.spark /></div>

            <div className="ov">
              <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem', marginBottom: '.6rem' }}>
                <Avatar ini={r.i} cls="sm" />
                <span className="author">@{r.u}</span>
                <Btn label="Seguir" cls="sm" onClick={() => toast('Siguiendo a @' + r.u)} />
              </div>
              <div style={{ fontSize: '.86rem', color: '#dce3eb', maxWidth: '76%', lineHeight: 1.5 }}>{r.txt}</div>
              <div className="bar" style={{ marginTop: '.9rem' }}><i style={{ width: `${28 + n * 22}%` }} /></div>
            </div>

            <div className="rail">
              <button onClick={() => toast('Me gusta')}><I.heart /><span>{r.l}</span></button>
              <button onClick={() => navigate('/post/p2')}><I.comment /><span>{r.c}</span></button>
              <button onClick={() => toast('Guardado')}><I.save /></button>
              <button onClick={() => toast('Compartido')}><I.share /></button>
            </div>
          </div>
        ))}
      </div>
    </Shell>
  );
}
