import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

/* ============================================================
   Hooks del port
   ============================================================ */

/** Botón "atrás": reproduce `back()` de kronos.html, que sacaba la ruta
 *  de una pila interna y caía a '#/home' si la pila estaba vacía.
 *  Con React Router: retrocede si hay historial propio; si no, va a /home. */
export function useBack() {
  const navigate = useNavigate();
  return useCallback(() => {
    const idx = window.history.state && window.history.state.idx;
    if (typeof idx === 'number' && idx > 0) navigate(-1);
    else navigate('/home');
  }, [navigate]);
}

/** Estado de formulario. Sustituye a `val(id)` / `setErr(id,msg)`, que
 *  leían y escribían el DOM por id. Las reglas son las mismas. */
export function useForm(initial) {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});

  const bind = (key) => ({
    value: values[key] ?? '',
    onChange: (e) => setValues((v) => ({ ...v, [key]: e.target.value })),
  });

  /** Equivalente a `val(id)`: valor recortado. */
  const get = (key) => String(values[key] ?? '').trim();

  /** Equivalente a `setErr(id,msg)`: guarda el error y devuelve si es válido. */
  const check = (key, msg) => {
    setErrors((e) => ({ ...e, [key]: msg || '' }));
    return !msg;
  };

  return { values, errors, bind, get, check, setValues, setErrors };
}
