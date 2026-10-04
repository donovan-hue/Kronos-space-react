/* Campo de formulario — aro cromado (.input-ring) + label + hint + err.
   Portado del helper `field(id,label,type,ph,hint)`.
   Se conserva: el <label for>, el div .hint opcional y el div .err
   (que existe siempre, con min-height:1em, igual que en el original). */
export function Field({
  id, label, type = 'text', placeholder, hint, value, onChange, defaultValue,
  error, as = 'input', autoComplete = 'off', children,
}) {
  /* El helper `field()` de kronos.html SIEMPRE incluía <div class="err">
     (con min-height:1em, es decir reservaba línea aunque estuviera vacío).
     Los campos escritos a mano en Kairos y Settings NO lo llevan.
     Por eso el div sólo se renderiza si la prop `error` viene definida:
     las pantallas de auth pasan `error={... ?? ''}` para reservar la línea,
     y el resto simplemente no la pasa. */
  const conErr = error !== undefined;
  const control = as === 'textarea' ? (
    <textarea id={id} placeholder={placeholder} value={value} defaultValue={defaultValue} onChange={onChange} />
  ) : (
    <input id={id} type={type} placeholder={placeholder} autoComplete={autoComplete} value={value} defaultValue={defaultValue} onChange={onChange} />
  );
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <div className="input-ring">{children || control}</div>
      {hint ? <div className="hint">{hint}</div> : null}
      {conErr ? <div className="err" id={`e_${id}`}>{error}</div> : null}
    </div>
  );
}

/* Campo libre (texto multilínea o input dentro de .input-ring sin label),
   usado en busqueda, chat, comentarios y los generadores de Kairos. */
export function RingField({ children, className = '', ...rest }) {
  return <div className={`input-ring ${className}`} {...rest}>{children}</div>;
}
