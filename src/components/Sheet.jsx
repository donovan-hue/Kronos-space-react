import { createContext, useCallback, useContext, useState } from 'react';

/* ============================================================
   Menú contextual (bottom sheet) — reemplaza a `sheet(title, items)`.
   En el original: se inyectaba HTML en #sheet y se añadía .open a
   #sheetbg. Los items podían no tener `run` (sólo cerraban el menú):
   ese comportamiento se conserva.
   Se conservan .sheet-bg (backdrop-filter:blur(3px)) y @keyframes up.
   ============================================================ */
const SheetContext = createContext(null);

export function SheetProvider({ children }) {
  const [sheet, setSheet] = useState(null);

  const openSheet = useCallback((title, items) => setSheet({ title, items }), []);
  const closeSheet = useCallback(() => setSheet(null), []);

  return (
    <SheetContext.Provider value={{ openSheet, closeSheet }}>
      {children}
      <div
        className={`sheet-bg${sheet ? ' open' : ''}`}
        id="sheetbg"
        onClick={(e) => { if (e.target.id === 'sheetbg') closeSheet(); }}
      >
        <div className="sheet" id="sheet">
          {sheet ? (
            <>
              <h4>{sheet.title}</h4>
              {sheet.items.map((it, i) => (
                <button
                  key={i}
                  className={it.danger ? 'danger' : ''}
                  onClick={() => { closeSheet(); if (it.run) it.run(); }}
                >
                  {it.label}
                </button>
              ))}
            </>
          ) : null}
        </div>
      </div>
    </SheetContext.Provider>
  );
}

export function useSheet() {
  const ctx = useContext(SheetContext);
  if (!ctx) throw new Error('useSheet debe usarse dentro de <SheetProvider>');
  return ctx;
}
