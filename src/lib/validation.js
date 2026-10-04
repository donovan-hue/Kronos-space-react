/* Reglas de validación — portadas VERBATIM de kronos.html.
   En el original se aplicaban leyendo el DOM por id (val/setErr).
   Aquí son funciones puras sobre el valor; la presentación del error
   la gestiona el componente Field. Las REGLAS no cambian. */

export const isMail = (v) => /^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(v);

export const RULES = {
  /* login */
  l_mail: (v) => (isMail(v) ? '' : 'Correo no válido'),
  l_pass: (v) => (v.length >= 8 ? '' : 'Mínimo 8 caracteres'),
  /* registro */
  r_user: (v) => (v.length >= 3 ? '' : 'Mínimo 3 caracteres'),
  r_mail: (v) => (isMail(v) ? '' : 'Correo no válido'),
  r_pass: (v) => (v.length >= 8 ? '' : 'Mínimo 8 caracteres'),
  /* recuperar */
  f_mail: (v) => (isMail(v) ? '' : 'Correo no válido'),
  /* restablecer */
  n_pass: (v) => (v.length >= 8 ? '' : 'Mínimo 8 caracteres'),
};

/** Confirmación de contraseña — compara con el valor actual del campo base. */
export const matchRule = (a, b) => (a === b ? '' : 'Las contraseñas no coinciden');
