import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shell, Page, PageTitle, Mini } from '../components/layout/Shell.jsx';
import { I } from '../components/icons/index.jsx';
import { MAP, SCREEN_COUNT, hashToPath } from '../lib/screensCatalog.js';

/* Índice de pantallas — portado de `Indice()`.
   Sirve de checklist de paridad visual: las 40 pantallas del original,
   navegables. Se conserva también como dato (lib/screensCatalog.js). */
export function Indice() {
  const navigate = useNavigate();

  return (
    <Shell tab="">
      <Page>
        <PageTitle>Todas las pantallas</PageTitle>
        <div className="meta" style={{ margin: '-.6rem 0 1.4rem' }}>
          {SCREEN_COUNT} pantallas · toca cualquiera para verla
        </div>

        {MAP.map(([group, rows]) => (
          <Fragment key={group}>
            <Mini style={{ margin: '1.3rem 0 .5rem' }}>{group}</Mini>
            <div className="card" style={{ padding: '.2rem 1rem' }}>
              {rows.map(([label, hash]) => (
                <div key={hash} className="row k-pointer" onClick={() => navigate(hashToPath(hash))}>
                  <div className="grow">
                    <div className="t1">{label}</div>
                    <div className="t2">{hash}</div>
                  </div>
                  <span className="k-chevron"><I.back /></span>
                </div>
              ))}
            </div>
          </Fragment>
        ))}
      </Page>
    </Shell>
  );
}
