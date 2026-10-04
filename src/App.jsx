import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import { StoreProvider } from './state/store.jsx';
import { ToastProvider } from './components/Toasts.jsx';
import { SheetProvider } from './components/Sheet.jsx';

/* Auth */
import { Login, Registro, Recuperar, Restablecer, Verificar } from './pages/auth/index.jsx';
/* Sistema */
import { Splash } from './pages/Splash.jsx';
import { NotFound } from './pages/NotFound.jsx';
import { Indice } from './pages/Indice.jsx';
/* Social */
import { Home, Guardados } from './pages/social/Home.jsx';
import { PostDetail } from './pages/social/PostDetail.jsx';
import { Vertical } from './pages/social/Vertical.jsx';
import { Crear, CrearPublicacion, Historias } from './pages/social/Crear.jsx';
import { Buscar } from './pages/social/Buscar.jsx';
import { Perfil } from './pages/social/Perfil.jsx';
/* Comunidades */
import { Circles, Orbits, OrbitFeed, Channels } from './pages/comunidades/index.jsx';
/* Mensajería */
import { Mensajes, Chat, Conversaciones } from './pages/Mensajes.jsx';
import { Notificaciones } from './pages/Notificaciones.jsx';
/* Kairos */
import {
  Kairos, KImagen, KVideo, KTrabajos, KScripts, KHistorial, Library,
} from './pages/kairos/index.jsx';
/* Módulos */
import { Live, Capsules, Pulse, Analytics } from './pages/Modulos.jsx';
/* Ajustes */
import { Settings, SettingsPerfil, SettingsSeguridad, Admin } from './pages/ajustes/index.jsx';

/* ============================================================
   Reproduce el `if(seg0!=='vertical') window.scrollTo(0,0)`
   del render() original.
   ============================================================ */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (!pathname.startsWith('/vertical')) window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

/* ============================================================
   KRONOS — Rutas
   Espejo 1:1 del objeto ROUTES de kronos.html (35 entradas)
   más las rutas con parámetro (post/:id, u/:username, orbit/:name,
   mensajes/:id) que el original resolvía por split de la ruta.

   El original usaba hash routing (#/home); aquí se usa HashRouter,
   así que las URLs resultantes son idénticas y los enlaces
   compartidos del original siguen funcionando.
   ============================================================ */
function KronosRoutes() {
  return (
    <Routes>
      {/* Sistema */}
      <Route path="/" element={<Splash />} />
      <Route path="/pantallas" element={<Indice />} />

      {/* Autenticación */}
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/recuperar" element={<Recuperar />} />
      <Route path="/restablecer" element={<Restablecer />} />
      <Route path="/verificar" element={<Verificar />} />

      {/* Inicio y social */}
      <Route path="/home" element={<Home />} />
      <Route path="/guardados" element={<Guardados />} />
      <Route path="/vertical" element={<Vertical />} />
      <Route path="/post/:id" element={<PostDetail />} />

      {/* Creación */}
      <Route path="/crear" element={<Crear />} />
      <Route path="/crear-publicacion" element={<CrearPublicacion />} />
      <Route path="/historias" element={<Historias />} />

      {/* Usuarios */}
      <Route path="/buscar" element={<Buscar />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/u/:username" element={<Perfil />} />

      {/* Comunidades */}
      <Route path="/circles" element={<Circles />} />
      <Route path="/orbits" element={<Orbits />} />
      <Route path="/orbit/:name" element={<OrbitFeed />} />
      <Route path="/channels" element={<Channels />} />

      {/* Mensajería */}
      <Route path="/mensajes" element={<Mensajes />} />
      <Route path="/mensajes/:id" element={<Chat />} />
      <Route path="/conversaciones" element={<Conversaciones />} />

      {/* Notificaciones */}
      <Route path="/notificaciones" element={<Notificaciones />} />

      {/* Kairos / AI */}
      <Route path="/kairos" element={<Kairos />} />
      <Route path="/kairos-imagen" element={<KImagen />} />
      <Route path="/kairos-video" element={<KVideo />} />
      <Route path="/kairos-trabajos" element={<KTrabajos />} />
      <Route path="/kairos-scripts" element={<KScripts />} />
      <Route path="/kairos-historial" element={<KHistorial />} />
      <Route path="/library" element={<Library />} />

      {/* Módulos */}
      <Route path="/live" element={<Live />} />
      <Route path="/capsules" element={<Capsules />} />
      <Route path="/pulse" element={<Pulse />} />
      <Route path="/analytics" element={<Analytics />} />

      {/* Ajustes y administración */}
      <Route path="/settings" element={<Settings />} />
      <Route path="/settings-perfil" element={<SettingsPerfil />} />
      <Route path="/settings-seguridad" element={<SettingsSeguridad />} />
      <Route path="/admin" element={<Admin />} />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <ToastProvider>
        <SheetProvider>
          <ScrollToTop />
          {/* El original envolvía cada pantalla en <div class="screen active"> */}
          <div className="screen active">
            <KronosRoutes />
          </div>
        </SheetProvider>
      </ToastProvider>
    </StoreProvider>
  );
}
