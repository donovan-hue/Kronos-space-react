/* Marca KRONOS — sello 3D de 4 capas.
   Reproduce el helper `brand(txt, cls)` de kronos.html.
   Las 4 capas (.b-extrude / .b-bevel / .b-rim / .b-face) y sus
   text-shadow / -webkit-text-stroke se conservan en CSS sin tocar:
   son las que producen el efecto de extrusión cromada. */
export function Brand({ text = 'KRONOS', cls = '' }) {
  return (
    <span className={`brand ${cls}`}>
      <span className="lay b-extrude" aria-hidden="true">{text}</span>
      <span className="lay b-bevel" aria-hidden="true">{text}</span>
      <span className="lay b-rim" aria-hidden="true">{text}</span>
      <span className="lay b-face">{text}</span>
    </span>
  );
}
