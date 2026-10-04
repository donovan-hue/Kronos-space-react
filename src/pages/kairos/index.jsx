import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shell, Page, PageTitle, Mini, EmptyState, Bar } from '../../components/layout/Shell.jsx';
import { HBar } from '../../components/layout/HBar.jsx';
import { Btn } from '../../components/Button.jsx';
import { Seg, Chip, Tile } from '../../components/Primitives.jsx';
import { Field, RingField } from '../../components/Field.jsx';
import { I } from '../../components/icons/index.jsx';
import { Art, ArtV } from '../../components/graphics/index.jsx';
import { useStore } from '../../state/store.jsx';
import { useToast } from '../../components/Toasts.jsx';
import { useSheet } from '../../components/Sheet.jsx';

/* ============================================================
   KAIROS / AI — Centro / Imagen / Video / Trabajos / Scripts /
   Historial / Library
   Portado de las siete funciones homónimas de kronos.html.

   La generación es SIMULADA igual que en el original
   (setTimeout de 1400 ms). No se conecta ninguna API: el alcance de
   esta migración es visual (§20 de la orden).
   ============================================================ */

/* Centro — `Kairos()`.
   Tamaños: I.clock y I.save venían con .replace('34'/'16','22') → size 22. */
export function Kairos() {
  const navigate = useNavigate();
  return (
    <Shell tab="kairos">
      <Page>
        <PageTitle>Centro Kairos</PageTitle>
        <div className="grid g2">
          <Tile icon={<I.img />} title="Imagen" desc="Genera imágenes desde un prompt." onClick={() => navigate('/kairos-imagen')} />
          <Tile icon={<I.video />} title="Video" desc="Crea clips y sigue el trabajo." onClick={() => navigate('/kairos-video')} />
          <Tile icon={<I.script />} title="Script" desc="Guiones y textos largos." onClick={() => navigate('/kairos-scripts')} />
          <Tile icon={<I.clock size={22} />} title="Historial" desc="Todo lo que has generado." onClick={() => navigate('/kairos-historial')} />
        </div>
        <div className="k-sp-9" />
        <Tile
          className=""
          icon={<I.save size={22} />}
          title="Library"
          desc="Tus imágenes, videos y scripts guardados en un solo lugar."
          onClick={() => navigate('/library')}
        />
      </Page>
    </Shell>
  );
}

/* ------------------------------------------------------------
   Generador de imágenes — `KImagen()` + `genImg()`
   Máquina de estados idle → run → ok (y err por el enlace de prueba).
   ------------------------------------------------------------ */
const PROMPT_IMG = 'Orbitador de cromo pulido girando sobre fondo negro';

export function KImagen() {
  const navigate = useNavigate();
  const toast = useToast();
  const { S, setUi } = useStore();
  const st = S.ui.kst || 'idle';
  const ar = S.ui.ar || 0;
  const sty = S.ui.sty || 0;

  const genImg = () => {
    setUi('kst', 'run');
    setTimeout(() => { setUi('kst', 'ok'); toast('Imagen lista'); }, 1400);
  };

  return (
    <Shell tab="kairos">
      <Page>
        <HBar title="Generador de imágenes" />

        <Field id="ki_p" label="Prompt" as="textarea" placeholder="Describe la imagen que quieres..." defaultValue={PROMPT_IMG} />

        <Mini style={{ margin: '.4rem 0 .6rem' }}>Configuración</Mini>
        <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap', marginBottom: '.8rem' }}>
          {['1:1', '16:9', '9:16'].map((r, i) => (
            <Chip key={r} on={ar === i} onClick={() => setUi('ar', i)}>{r}</Chip>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap', marginBottom: '1.2rem' }}>
          {['Cromo', 'Cinemático', 'Editorial', 'Ilustración'].map((r, i) => (
            <Chip key={r} on={sty === i} onClick={() => setUi('sty', i)}>{r}</Chip>
          ))}
        </div>

        <Btn label={st === 'run' ? 'Generando...' : 'Generar'} cls="block" onClick={genImg} />
        <div className="k-sp-12" />

        {st === 'run' ? (
          <div className="card">
            <Mini style={{ marginBottom: '.7rem' }}>Procesando</Mini>
            <Bar width={68} />
            <div className="meta" style={{ marginTop: '.7rem' }}>Difusión en curso · ~8 s</div>
          </div>
        ) : null}

        {st === 'ok' ? (
          <div className="card">
            <Art kind="orb" seed="gen" />
            <div style={{ display: 'flex', gap: '.6rem', marginTop: '.9rem' }}>
              <Btn label="Descargar" cls="sm ghost" onClick={() => toast('Descargando PNG')} />
              <Btn label="Guardar en Library" cls="sm" onClick={() => toast('Guardado en Library')} />
              <Btn label="Publicar" cls="sm ghost" onClick={() => navigate('/crear-publicacion')} />
            </div>
          </div>
        ) : null}

        {st === 'err' ? (
          <div className="state" style={{ borderColor: 'rgba(224,139,139,.35)' }}>
            <div className="t" style={{ color: 'var(--bad)' }}>Error de generación</div>
            <div className="d">
              El modelo rechazó el prompt o se agotó el tiempo.<br />Ajusta el texto e inténtalo otra vez.
            </div>
            <div style={{ marginTop: '1.2rem' }}><Btn label="Reintentar" cls="sm" onClick={genImg} /></div>
          </div>
        ) : null}

        <div className="rule" />
        <div className="center">
          <span className="link" onClick={() => setUi('kst', 'err')}>simular error</span>
        </div>
      </Page>
    </Shell>
  );
}

/* ------------------------------------------------------------
   Generador de video — `KVideo()`
   ------------------------------------------------------------ */
const PROMPT_VIDEO = 'Reloj de cromo flotando en el vacío, cámara lenta';

export function KVideo() {
  const navigate = useNavigate();
  const toast = useToast();
  const { S, setUi, addJob } = useStore();
  const [prompt, setPrompt] = useState(PROMPT_VIDEO);
  const dur = S.ui.dur || 1;
  const res = S.ui.res || 1;

  return (
    <Shell tab="kairos">
      <Page>
        <HBar title="Generador de video" />

        <Field id="kv_p" label="Prompt" as="textarea" placeholder="Describe el video..."
          value={prompt} onChange={(e) => setPrompt(e.target.value)} />

        <Mini style={{ margin: '.4rem 0 .6rem' }}>Configuración</Mini>
        <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap', marginBottom: '1.2rem' }}>
          {['4 s', '8 s', '16 s'].map((r, i) => (
            <Chip key={r} on={dur === i} onClick={() => setUi('dur', i)}>{r}</Chip>
          ))}
          {['720p', '1080p'].map((r, i) => (
            <Chip key={r} on={res === i} onClick={() => setUi('res', i)}>{r}</Chip>
          ))}
        </div>

        <Btn
          label="Crear trabajo"
          cls="block"
          onClick={() => {
            addJob({
              id: 'j' + Date.now(),
              p: prompt.trim() || 'Sin prompt',
              st: 'processing',
              pr: 8,
            });
            toast('Trabajo creado');
            navigate('/kairos-trabajos');
          }}
        />

        <div className="rule" />
        <Mini style={{ marginBottom: '.7rem' }}>Último resultado</Mini>
        <div className="card">
          <Art kind="caps" seed="kv" />
          <div style={{ display: 'flex', gap: '.6rem', marginTop: '.9rem' }}>
            <Btn label="Descargar" cls="sm ghost" onClick={() => toast('Descargando MP4')} />
            <Btn label="Ver trabajos" cls="sm" onClick={() => navigate('/kairos-trabajos')} />
          </div>
        </div>
      </Page>
    </Shell>
  );
}

/* ------------------------------------------------------------
   Trabajos de video — `KTrabajos()`
   ------------------------------------------------------------ */
const JOB_BADGE = {
  processing: ['warn', 'Processing'],
  success: ['ok', 'Success'],
  failure: ['bad', 'Failure'],
};

export function KTrabajos() {
  const toast = useToast();
  const { S, deleteJob } = useStore();

  return (
    <Shell tab="kairos">
      <Page>
        <HBar title="Trabajos de video" />
        {S.jobs.map((j) => (
          <div className="card" key={j.id}>
            <div style={{ display: 'flex', gap: '.8rem', alignItems: 'flex-start' }}>
              <span className="icon-btn"><I.video /></span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="t1" style={{ lineHeight: 1.4 }}>{j.p}</div>
                <div className="t2">ID {j.id}</div>
              </div>
              <span className={`badge ${JOB_BADGE[j.st][0]}`}>{JOB_BADGE[j.st][1]}</span>
            </div>

            {j.st === 'processing' ? (
              <>
                <Bar width={j.pr} style={{ marginTop: '.9rem' }} />
                <div className="meta" style={{ marginTop: '.5rem' }}>{j.pr}% · quedan ~2 min</div>
              </>
            ) : null}

            <div className="actions-row">
              <button className="act" onClick={() => toast(`Detalle del trabajo ${j.id}`)}>Detalle</button>
              {j.st === 'success' ? (
                <button className="act" onClick={() => toast('Descargando')}><I.down /><span>Descargar</span></button>
              ) : null}
              {j.st === 'failure' ? (
                <button className="act" onClick={() => toast('Reintentando')}>Reintentar</button>
              ) : null}
              <span className="spacer" />
              <button className="act" onClick={() => deleteJob(j.id)}><I.trash /></button>
            </div>
          </div>
        ))}
      </Page>
    </Shell>
  );
}

/* ------------------------------------------------------------
   Generador de scripts — `KScripts()`

   ⚠️ FIDELIDAD: en el original esta cadena se escribe dentro de un
   atributo onclick, y los saltos de línea llegan al textarea como
   "\n" LITERAL (barra invertida + n), no como salto real.
   Se reproduce EXACTAMENTE ese resultado para que la comparación
   visual sea 1:1. Ver «riesgos pendientes» en el informe: es un bug
   del original, no una decisión de diseño.
   Para corregirlo bastaría reemplazar '\\n' por '\n' aquí.
   ------------------------------------------------------------ */
const SCRIPT_DEMO =
  'LOCUTOR (V.O.)\\nHay dos cosas que nadie te devuelve: el tiempo y el espacio.\\n\\nIMAGEN\\nUn orbitador de cromo gira sobre negro absoluto.\\n\\nLOCUTOR\\nKRONOS SPACE. Guarda lo que importa, ábrelo cuando toque.\\n\\nCIERRE\\nTu tiempo. Tu espacio. Tu dominio.';

const PROMPT_SCRIPT = 'Lanzamiento de KRONOS SPACE en 30 segundos';

export function KScripts() {
  const navigate = useNavigate();
  const toast = useToast();
  const { S, setUi } = useStore();
  const out = S.ui.script;

  return (
    <Shell tab="kairos">
      <Page>
        <HBar title="Generador de scripts" />

        <Field id="ks_p" label="Entrada" as="textarea" placeholder="¿De qué trata el guion?" defaultValue={PROMPT_SCRIPT} />

        <Btn label="Generar script" cls="block" onClick={() => setUi('script', SCRIPT_DEMO)} />
        <div className="k-sp-12" />

        {out ? (
          <>
            <Mini style={{ marginBottom: '.6rem' }}>Editor</Mini>
            <RingField>
              <textarea id="ks_o" style={{ minHeight: 200 }} defaultValue={out} />
            </RingField>
            <div style={{ display: 'flex', gap: '.6rem', marginTop: '.9rem' }}>
              <Btn label="Guardar" cls="sm" onClick={() => toast('Script guardado en Library')} />
              <Btn label="Historial" cls="sm ghost" onClick={() => navigate('/kairos-historial')} />
            </div>
          </>
        ) : (
          <EmptyState title="Sin script todavía" desc="Escribe una entrada y genera el primer borrador." />
        )}
      </Page>
    </Shell>
  );
}

/* ------------------------------------------------------------
   Historial — `KHistorial()`
   El borrado usa el índice de la lista FILTRADA sobre el arreglo
   completo (comportamiento del original, incluido su efecto lateral).
   ------------------------------------------------------------ */
const HIST_KINDS = [null, 'Imagen', 'Video', 'Script'];

export function KHistorial() {
  const toast = useToast();
  const { S, setUi, deleteHist } = useStore();
  const f = S.ui.hf || 0;
  const list = S.hist.filter((h) => !HIST_KINDS[f] || h.k === HIST_KINDS[f]);

  return (
    <Shell tab="kairos">
      <Page>
        <HBar title="Historial de Kairos" />
        <Seg options={['Todo', 'Imagen', 'Video', 'Script']} value={f} onChange={(i) => setUi('hf', i)} />

        {list.length ? (
          <div className="card">
            {list.map((h, i) => (
              <div className="row" key={i}>
                <span className="icon-btn">
                  {h.k === 'Imagen' ? <I.img /> : h.k === 'Video' ? <I.video /> : <I.script />}
                </span>
                <div className="grow k-pointer" onClick={() => toast('Detalle de la generación')}>
                  <div className="t1">{h.p}</div>
                  <div className="t2">{h.k} · {h.t}</div>
                </div>
                <button className="act" onClick={() => { deleteHist(i); toast('Eliminado'); }}><I.trash /></button>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState title="Historial vacío" />
        )}
      </Page>
    </Shell>
  );
}

/* ------------------------------------------------------------
   Library — `Library()`
   ------------------------------------------------------------ */
export function Library() {
  const navigate = useNavigate();
  const { openSheet } = useSheet();
  const { S, setUi } = useStore();
  const t = S.ui.lt || 0;

  const empty = (
    <EmptyState
      title="Nada guardado aún"
      desc={<>Lo que generes en Kairos y guardes<br />aparecerá en esta pestaña.</>}
      action={<Btn label="Abrir Kairos" cls="sm" onClick={() => navigate('/kairos')} />}
    />
  );

  return (
    <Shell tab="kairos">
      <Page>
        <HBar title="Library" />
        <Seg options={['Imágenes', 'Videos', 'Scripts']} value={t} onChange={(i) => setUi('lt', i)} />

        {t === 0 ? (
          <div className="grid g3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="thumb"
                onClick={() => openSheet('Imagen generada', [
                  { label: 'Descargar' },
                  { label: 'Publicar' },
                  { label: 'Eliminar', danger: true },
                ])}
              ><ArtV seed={'l' + i} /></div>
            ))}
          </div>
        ) : null}

        {t === 1 ? (
          <div className="grid g2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="thumb"
                style={{ aspectRatio: '16/10' }}
                onClick={() => openSheet('Video generado', [
                  { label: 'Descargar' },
                  { label: 'Eliminar', danger: true },
                ])}
              ><ArtV seed={'v' + i} /></div>
            ))}
          </div>
        ) : null}

        {t === 2 ? empty : null}
      </Page>
    </Shell>
  );
}
