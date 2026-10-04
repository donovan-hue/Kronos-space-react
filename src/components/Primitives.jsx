/* Primitivas de UI portadas de kronos.html.
   Se mantienen como <div> cuando el original usaba <div> (chips, switch,
   tiles, filas): cambiar la etiqueta alteraría el render exacto. */

/** .chip — filtro/pill. onclick="S.ui.x=i" → prop onClick. */
export function Chip({ children, on, onClick }) {
  return <div className={`chip ${on ? 'on' : ''}`} onClick={onClick}>{children}</div>;
}

/** .seg — control segmentado. Reproduce seg(key, opts). */
export function Seg({ options, value, onChange }) {
  return (
    <div className="seg">
      {options.map((o, i) => (
        <button key={o} className={value === i ? 'on' : ''} onClick={() => onChange(i)}>{o}</button>
      ))}
    </div>
  );
}

/** .sw — interruptor. Reproduce tgl(key). */
export function Switch({ on, onClick }) {
  return <div className={`sw ${on ? 'on' : ''}`} onClick={onClick} />;
}

/** .tile — tarjeta de acceso. Reproduce el helper `t(ic,tt,td,r)`. */
export function Tile({ icon, title, desc, onClick, className = '' }) {
  return (
    <div className={`tile ${className}`} onClick={onClick}>
      <div className="ti">{icon}</div>
      <div className="tt">{title}</div>
      <div className="td">{desc}</div>
    </div>
  );
}

/** .row con chevron — filas-enlace de Settings / Indice. */
export function RowLink({ icon, title, desc, onClick }) {
  return (
    <div className="row k-pointer" onClick={onClick}>
      <span className="icon-btn">{icon}</span>
      <div className="grow">
        <div className="t1">{title}</div>
        <div className="t2">{desc}</div>
      </div>
      <span className="k-chevron"><BackChevron /></span>
    </div>
  );
}

const BackChevron = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M15 5l-7 7 7 7" />
  </svg>
);
