import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

/* Sistema visual KRONOS — un único punto de entrada de estilos.
   Orden de import = orden del <style> original de kronos.html (verbatim). */
import './styles/index.css';

import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
