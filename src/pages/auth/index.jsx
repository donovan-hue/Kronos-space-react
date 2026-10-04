import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Brand } from '../../components/Brand.jsx';
import { Btn } from '../../components/Button.jsx';
import { Field } from '../../components/Field.jsx';
import { I } from '../../components/icons/index.jsx';
import { useToast } from '../../components/Toasts.jsx';
import { useStore } from '../../state/store.jsx';
import { useForm } from '../../lib/hooks.js';
import { RULES, matchRule } from '../../lib/validation.js';
import { store } from '../../lib/sessionStore.js';

/* ============================================================
   Autenticación — portado de authShell / Login / Registro /
   Recuperar / Restablecer / Verificar.

   Las REGLAS de validación son las del original (lib/validation.js).
   Lo que cambia es el mecanismo: antes se leía y escribía el DOM por
   id (`val`, `setErr`); ahora el estado del formulario es local al
   componente y Field muestra el error.

   El flujo sigue siendo SIMULADO (no hay llamadas de red), igual que
   en el original: no se toca ninguna capa de autenticación real
   (§20 de la orden).
   ============================================================ */

/** Envoltorio de tarjeta de autenticación — `authShell(title, inner)`. */
function AuthShell({ title, children }) {
  const navigate = useNavigate();
  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="auth-head">
          <div className="k-pointer" onClick={() => navigate('/')}>
            <Brand text="KRONOS" cls="mark" />
          </div>
          <div className="sub">Space</div>
        </div>
        <div className="auth-title">{title}</div>
        {children}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------
   Login — `Login()` + `doLogin()` / `doGoogle()`
   ------------------------------------------------------------ */
export function Login() {
  const navigate = useNavigate();
  const toast = useToast();
  const { S } = useStore();
  const form = useForm({ l_mail: '', l_pass: '' });

  const doLogin = () => {
    let ok = form.check('l_mail', RULES.l_mail(form.get('l_mail')));
    ok = form.check('l_pass', RULES.l_pass(form.get('l_pass'))) && ok;
    if (!ok) return;
    toast('Sesión iniciada');
    navigate('/home');
  };

  const doGoogle = () => {
    toast('Conectando con Google...');
    setTimeout(() => {
      toast('Sesión iniciada como ' + S.user.name);
      navigate('/home');
    }, 850);
  };

  return (
    <AuthShell title="Iniciar sesión">
      <Field id="l_mail" label="Correo" type="email" placeholder="tu@correo.com"
        error={form.errors.l_mail ?? ''} {...form.bind('l_mail')} />
      <Field id="l_pass" label="Contraseña" type="password" placeholder="••••••••"
        error={form.errors.l_pass ?? ''} {...form.bind('l_pass')} />

      <div className="row-between" style={{ margin: '.2rem .2rem 1.4rem' }}>
        <span className="link" onClick={() => navigate('/recuperar')}>¿Olvidaste tu contraseña?</span>
      </div>

      <Btn label="Iniciar sesión" cls="block" onClick={doLogin} />
      <div className="or"><span>o</span></div>
      <Btn label="Continuar con Google" cls="block" icon={<I.google />} onClick={doGoogle} />
      <div className="rule" />
      <div className="center meta">
        ¿Todavía no tienes cuenta?{' '}
        <span className="link" style={{ marginLeft: '.4rem' }} onClick={() => navigate('/registro')}>Crear cuenta</span>
      </div>
    </AuthShell>
  );
}

/* ------------------------------------------------------------
   Registro — `Registro()` + `doRegister()`
   ------------------------------------------------------------ */
export function Registro() {
  const navigate = useNavigate();
  const toast = useToast();
  const { S } = useStore();
  const form = useForm({ r_user: '', r_mail: '', r_pass: '', r_pass2: '' });

  const doRegister = () => {
    let ok = form.check('r_user', RULES.r_user(form.get('r_user')));
    ok = form.check('r_mail', RULES.r_mail(form.get('r_mail'))) && ok;
    ok = form.check('r_pass', RULES.r_pass(form.get('r_pass'))) && ok;
    ok = form.check('r_pass2', matchRule(form.get('r_pass2'), form.get('r_pass'))) && ok;
    if (!ok) return;
    store.set('kv', 'pending');
    toast('Cuenta creada');
    navigate('/verificar');
  };

  /* El original llama al MISMO doGoogle() del login. */
  const doGoogle = () => {
    toast('Conectando con Google...');
    setTimeout(() => {
      toast('Sesión iniciada como ' + S.user.name);
      navigate('/home');
    }, 850);
  };

  return (
    <AuthShell title="Crear cuenta">
      <Field id="r_user" label="Nombre de usuario" type="text" placeholder="@username"
        error={form.errors.r_user ?? ''} {...form.bind('r_user')} />
      <Field id="r_mail" label="Correo" type="email" placeholder="tu@correo.com"
        error={form.errors.r_mail ?? ''} {...form.bind('r_mail')} />
      <Field id="r_pass" label="Contraseña" type="password" placeholder="Mínimo 8 caracteres"
        error={form.errors.r_pass ?? ''} {...form.bind('r_pass')} />
      <Field id="r_pass2" label="Confirmación de contraseña" type="password" placeholder="Repite la contraseña"
        error={form.errors.r_pass2 ?? ''} {...form.bind('r_pass2')} />

      <div className="k-sp-6" />
      <Btn label="Crear cuenta" cls="block" onClick={doRegister} />
      <div className="or"><span>o</span></div>
      <Btn label="Registrarse con Google" cls="block" icon={<I.google />} onClick={doGoogle} />
      <div className="rule" />
      <div className="center meta">
        ¿Ya tienes cuenta?{' '}
        <span className="link" style={{ marginLeft: '.4rem' }} onClick={() => navigate('/login')}>Iniciar sesión</span>
      </div>
    </AuthShell>
  );
}

/* ------------------------------------------------------------
   Recuperar — `Recuperar()` + `doRecover()`
   ------------------------------------------------------------ */
export function Recuperar() {
  const navigate = useNavigate();
  const toast = useToast();
  const form = useForm({ f_mail: '' });

  const doRecover = () => {
    if (!form.check('f_mail', RULES.f_mail(form.get('f_mail')))) return;
    toast('Enlace enviado a tu correo');
    navigate('/restablecer');
  };

  return (
    <AuthShell title="Recuperar contraseña">
      <div className="center meta" style={{ margin: '-.6rem 0 1.5rem', lineHeight: 1.7 }}>
        Escribe tu correo y te enviamos un enlace<br />para restablecer el acceso.
      </div>

      <Field id="f_mail" label="Correo" type="email" placeholder="tu@correo.com"
        error={form.errors.f_mail ?? ''} {...form.bind('f_mail')} />

      <div className="k-sp-6" />
      <Btn label="Solicitar recuperación" cls="block" onClick={doRecover} />
      <div className="rule" />
      <div className="center">
        <span className="link" onClick={() => navigate('/login')}>Volver a iniciar sesión</span>
      </div>
    </AuthShell>
  );
}

/* ------------------------------------------------------------
   Restablecer — `Restablecer()` + `doReset()`
   ------------------------------------------------------------ */
export function Restablecer() {
  const navigate = useNavigate();
  const toast = useToast();
  const form = useForm({ n_pass: '', n_pass2: '' });

  const doReset = () => {
    let ok = form.check('n_pass', RULES.n_pass(form.get('n_pass')));
    ok = form.check('n_pass2', matchRule(form.get('n_pass2'), form.get('n_pass'))) && ok;
    if (!ok) return;
    toast('Contraseña actualizada');
    navigate('/login');
  };

  return (
    <AuthShell title="Restablecer contraseña">
      <Field id="n_pass" label="Nueva contraseña" type="password" placeholder="Mínimo 8 caracteres"
        error={form.errors.n_pass ?? ''} {...form.bind('n_pass')} />
      <Field id="n_pass2" label="Confirmación de contraseña" type="password" placeholder="Repite la nueva contraseña"
        error={form.errors.n_pass2 ?? ''} {...form.bind('n_pass2')} />

      <div className="k-sp-6" />
      <Btn label="Guardar" cls="block" onClick={doReset} />
      <div className="rule" />
      <div className="center">
        <span className="link" onClick={() => navigate('/login')}>Cancelar</span>
      </div>
    </AuthShell>
  );
}

/* ------------------------------------------------------------
   Verificar correo — `Verificar()` + la máquina de estados
   El flag sigue guardándose en sessionStorage (lib/sessionStore.js),
   igual que en el original, para que el comportamiento sea idéntico.
   ------------------------------------------------------------ */
export function Verificar() {
  const navigate = useNavigate();
  const toast = useToast();
  const [state, setState] = useState(() => store.get('kv') || 'pending');

  const setVerify = (v) => { store.set('kv', v); setState(v); };
  const verifyNow = () => { store.set('kv', 'ok'); setState('ok'); toast('Correo verificado'); };
  const resend = () => { store.set('kv', 'pending'); setState('pending'); toast('Enlace reenviado'); };

  const map = {
    pending: {
      ic: <I.clock />, t: 'Verificación en curso',
      d: <>Enviamos un enlace a tu correo.<br />Ábrelo para confirmar tu cuenta.</>,
      b: 'Ya verifiqué', f: verifyNow,
    },
    ok: {
      ic: <I.check />, t: 'Correo verificado',
      d: <>Tu cuenta quedó activa.<br />Bienvenida a KRONOS SPACE.</>,
      b: 'Continuar', f: () => navigate('/home'),
    },
    err: {
      ic: <I.lock />, t: 'Enlace no válido',
      d: <>El enlace expiró o ya se usó.<br />Puedes pedir uno nuevo.</>,
      b: 'Reenviar enlace', f: resend,
    },
  }[state] || null;

  return (
    <AuthShell title="Verificar correo">
      <div className="card" style={{ textAlign: 'center', padding: '2.2rem 1.2rem' }}>
        <div style={{ color: '#cfd6de', marginBottom: '1rem' }}>{map ? map.ic : null}</div>
        <div style={{ fontSize: '.8rem', letterSpacing: '.2em', textTransform: 'uppercase', color: '#dfe5ec' }}>
          {map ? map.t : ''}
        </div>
        <div className="meta" style={{ marginTop: '.9rem', lineHeight: 1.8 }}>{map ? map.d : null}</div>
      </div>
      <div className="k-sp-4" />
      {map ? <Btn label={map.b} cls="block" onClick={map.f} /> : null}
      <div className="rule" />
      <div className="center">
        <span className="link" onClick={() => setVerify('ok')}>ver estado: verificado</span>{' '}
        <span className="meta" style={{ margin: '0 .5rem' }}>·</span>{' '}
        <span className="link" onClick={() => setVerify('err')}>error</span>{' '}
        <span className="meta" style={{ margin: '0 .5rem' }}>·</span>{' '}
        <span className="link" onClick={() => setVerify('pending')}>pendiente</span>
      </div>
    </AuthShell>
  );
}
