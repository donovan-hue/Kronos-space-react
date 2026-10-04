import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shell, Page, PageTitle, Mini } from '../../components/layout/Shell.jsx';
import { HBar } from '../../components/layout/HBar.jsx';
import { Avatar } from '../../components/Avatar.jsx';
import { Btn } from '../../components/Button.jsx';
import { Field, RingField } from '../../components/Field.jsx';
import { Chip, Tile } from '../../components/Primitives.jsx';
import { I } from '../../components/icons/index.jsx';
import { Art, ArtV } from '../../components/graphics/index.jsx';
import { useStore } from '../../state/store.jsx';
import { useToast } from '../../components/Toasts.jsx';
import { useForm } from '../../lib/hooks.js';

/* ============================================================
   CREACIÓN — Crear / CrearPublicacion / Historias
   ============================================================ */

/* Centro de creación — `Crear()`.
   Tamaños de icono: el original hacía
   I.pencil.replace('width="15" height="15"','width="22" height="22"')
   → <I.pencil size={22} />. Los demás conservan su tamaño por defecto. */
export function Crear() {
  const navigate = useNavigate();
  return (
    <Shell tab="crear">
      <Page>
        <PageTitle>Centro de creación</PageTitle>
        <div className="grid g2">
          <Tile icon={<I.pencil size={22} />} title="Publicación" desc="Texto, imagen o video para tu feed." onClick={() => navigate('/crear-publicacion')} />
          <Tile icon={<I.plus />} title="Historia" desc="Desaparece a las 24 horas." onClick={() => navigate('/historias')} />
          <Tile icon={<I.spark />} title="Contenido AI" desc="Genera con Kairos en segundos." onClick={() => navigate('/kairos')} />
          <Tile icon={<I.caps />} title="Cápsula" desc="Se abre en la fecha que elijas." onClick={() => navigate('/capsules')} />
        </div>
        <div className="rule" />
        <Mini style={{ marginBottom: '.7rem' }}>Borradores</Mini>
        <div className="card">
          <div className="row">
            <div className="grow">
              <div className="t1">Sin título</div>
              <div className="t2">Editado hace 2 días · 48 palabras</div>
            </div>
            <Btn label="Abrir" cls="sm" onClick={() => navigate('/crear-publicacion')} />
          </div>
        </div>
      </Page>
    </Shell>
  );
}

/* Crear publicación — `CrearPublicacion()` + `publicar()`.
   La vista previa reaccionaba con oninput → setState local (mismo efecto
   inmediato que el original, que escribía en el DOM directamente). */
export function CrearPublicacion() {
  const navigate = useNavigate();
  const toast = useToast();
  const { S, setUi, addPost } = useStore();
  const form = useForm({ np_txt: '' });

  const aud = ['Público', 'Círculo: Núcleo', 'Solo yo'];
  const audIndex = S.ui.aud || 0;
  const preview = form.values.np_txt || 'Tu publicación se verá así.';

  const publicar = () => {
    const v = form.get('np_txt');
    if (!v) { toast('Escribe algo antes de publicar'); return; }
    addPost({
      id: 'n' + Date.now(), a: S.user.name, u: S.user.username, ini: S.user.initials,
      t: 'ahora', txt: v, media: 'orb', likes: 0, comments: 0,
    });
    toast('Publicado');
    navigate('/home');
  };

  return (
    <Shell tab="crear">
      <Page>
        <HBar title="Crear publicación" />
        <div className="card">
          <div className="k-row-sm" style={{ marginBottom: '.9rem' }}>
            <Avatar ini={S.user.initials} cls="sm" />
            <div className="author">{S.user.name}</div>
          </div>
          <RingField>
            <textarea id="np_txt" placeholder="¿Qué está pasando en tu espacio?" {...form.bind('np_txt')} />
          </RingField>
          <div style={{ display: 'flex', gap: '.6rem', marginTop: '.9rem', flexWrap: 'wrap' }}>
            <Btn label="Imagen" cls="sm" onClick={() => toast('Selector de imagen')} />
            <Btn label="Video" cls="sm" onClick={() => toast('Selector de video')} />
          </div>
        </div>

        <Mini style={{ margin: '1.1rem 0 .6rem' }}>Audiencia</Mini>
        <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap', marginBottom: '1.1rem' }}>
          {aud.map((a, i) => (
            <Chip key={a} on={audIndex === i} onClick={() => setUi('aud', i)}>{a}</Chip>
          ))}
        </div>

        <Mini style={{ marginBottom: '.6rem' }}>Vista previa</Mini>
        <div className="card">
          <div className="k-row-sm">
            <Avatar ini={S.user.initials} />
            <div>
              <div className="author">{S.user.name}</div>
              <div className="meta">@{S.user.username} · ahora</div>
            </div>
          </div>
          <div className="body-text" id="np_prev">{preview}</div>
          <Art kind="orb" seed="prev" />
        </div>

        <div style={{ display: 'flex', gap: '.7rem', marginTop: '1rem' }}>
          <Btn label="Guardar borrador" cls="ghost" onClick={() => toast('Borrador guardado')} />
          <Btn label="Publicar" onClick={publicar} />
        </div>
      </Page>
    </Shell>
  );
}

/* Archivo de historias — `Historias()`.
   Los grupos (día y número de historias) son datos locales del original. */
const GRUPOS = [{ d: 'Hoy', n: 3 }, { d: 'Ayer', n: 5 }, { d: '12 sep', n: 2 }, { d: '08 sep', n: 7 }];

export function Historias() {
  const toast = useToast();
  return (
    <Shell tab="crear">
      <Page>
        <HBar title="Archivo de historias" />
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '.9rem' }}>
          <span className="avatar"><span>+</span></span>
          <div className="grow" style={{ flex: 1 }}>
            <div className="t1">Crear historia</div>
            <div className="t2">Disponible 24 horas</div>
          </div>
          <Btn label="Crear" cls="sm" onClick={() => toast('Cámara lista')} />
        </div>

        {GRUPOS.map((g) => (
          <Fragment key={g.d}>
            <Mini style={{ margin: '1.2rem 0 .6rem' }}>{g.d}</Mini>
            <div className="grid g3">
              {Array.from({ length: g.n }).map((_, i) => (
                <div key={i} className="thumb" onClick={() => toast('Visualizador de historia')}>
                  <ArtV seed={g.d + i} />
                </div>
              ))}
            </div>
          </Fragment>
        ))}
      </Page>
    </Shell>
  );
}
