import { createContext, useCallback, useContext, useRef, useState } from 'react';

/* ============================================================
   Toasts — reemplaza a `#toasts` + la función `toast(msg)`.
   En el original: document.createElement + appendChild a un div fijo,
   fundido a los 2100 ms y retirada a los 2460 ms.
   Aquí es el mismo comportamiento, gestionado por React. La animación
   de entrada (@keyframes tin) y el contenedor .toasts no cambian.
   ============================================================ */
const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [items, setItems] = useState([]);
  const nextId = useRef(0);

  const toast = useCallback((msg) => {
    const id = ++nextId.current;
    setItems((v) => [...v, { id, msg, closing: false }]);
    setTimeout(() => {
      setItems((v) => v.map((t) => (t.id === id ? { ...t, closing: true } : t)));
    }, 2100);
    setTimeout(() => {
      setItems((v) => v.filter((t) => t.id !== id));
    }, 2460);
  }, []);

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="toasts" id="toasts">
        {items.map((t) => (
          <div
            key={t.id}
            className="toast"
            style={t.closing ? { transition: 'opacity .35s', opacity: 0 } : undefined}
          >
            {t.msg}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast debe usarse dentro de <ToastProvider>');
  return ctx;
}
