/* Almacén de la verificación de correo.
   Portado VERBATIM de `const store` en kronos.html:
   intenta sessionStorage y cae a memoria si el entorno lo bloquea
   (iframe en sandbox). Se conserva tal cual. */
const mem = {};

export const store = {
  get(k) {
    try { return sessionStorage.getItem(k); } catch (e) { return mem[k]; }
  },
  set(k, v) {
    try { sessionStorage.setItem(k, v); } catch (e) { mem[k] = v; }
  },
};
