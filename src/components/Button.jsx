/* Botón KRONOS — aro cromado + interior hueco.
   Reproduce el helper `btn(label, onclick, cls)` y `btnIcon(...)`.
   La clase se pasa como string `cls` igual que en el original
   ('block', 'sm', 'sm ghost', 'ghost', '') para que el CSS resultante
   sea EXACTAMENTE el mismo: btn / btn ico + block + sm + ghost. */
export function Btn({ label, onClick, cls = '', icon, type = 'button' }) {
  const classes = ['btn', icon ? 'ico' : null, cls || null].filter(Boolean).join(' ');
  return (
    <button type={type} className={classes} onClick={onClick}>
      <span>
        {icon}
        <i>{label}</i>
      </span>
    </button>
  );
}
