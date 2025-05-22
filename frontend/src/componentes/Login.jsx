// src/componentes/Login.jsx
import '../css/Formulario.css';
import { Lock, Mail, EyeOff, Eye } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/api/api';

export function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mostrarSubmenu, setMostrarSubmenu] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async e => {
  e.preventDefault();
  setError('');
  setLoading(true);

  try {
    // 1) Invocamos el login en el endpoint correcto
    const { data } = await api.post('/login', {
      email:    form.email,
      password: form.password
    });

    // 2) Desestructuramos el payload
    const { token, role, user } = data;
    console.log('Login ok:', role, user);

    // 3) Guardamos token y configuramos el header
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    // 4) Redirigimos según rol
    switch (role) {
      case 'administrador':
        navigate('/vista-admin', {
          state: {
            usuario: {
              nombre:        user.name,
              iniciales:     user.name.slice(0, 2).toUpperCase(),
            },
            etapaActual: '',
            fechaHora:   ''
          }
        });
        break;

      case 'competidor':
        // PerfilEstudiante espera `state.user.profile_id`
        if (!user.profile_id) {
          throw new Error('No se recibió profile_id');
        }
        navigate('/perfil-estudiante', { state: { user } });
        break;

      case 'tutor':
        navigate('/vista-tutor', { state: { user } });
        break;

      case 'cajero':
        navigate('/vista-cajero', { state: { user } });
        break;

      default:
        setError('Rol de usuario desconocido');
    }

  } catch (err) {
    console.error('Login error:', err);
    // 5) Mejor lectura del mensaje de error
    const msg = err.response?.data?.message
             || err.response?.data?.error
             || 'Error al iniciar sesión';
    setError(msg);
  } finally {
    setLoading(false);
  }
};


  const toggleSubmenu = () => {
    setMostrarSubmenu(prev => !prev);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="formulario">
        <div className="campo">
          <label htmlFor="email"><Mail color="#359bdf" /> Correo</label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="campo">
          <label htmlFor="password"><Lock color="#359bdf" /> Contraseña</label>
          <div className="contenedor-contrasenia">
            <input
              type={showPwd ? 'text' : 'password'}
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <span onClick={() => setShowPwd(s => !s)}>
              {showPwd ? <EyeOff /> : <Eye />}
            </span>
          </div>
        </div>

        {error && <p className="error">{error}</p>}

        <div className="campo" id="boton">
          <button type="submit" disabled={loading}>
            {loading ? 'Ingresando…' : 'Iniciar Sesión'}
          </button>
        </div>
      </form>

      {/* Bloque final con enlace para registrarse */}
      <div className="parrafoFinal">
        <p>En caso de no tener una cuenta por favor</p>
        <div className="menu-boton centrado">
         <button type="button" className="opcion" onClick={toggleSubmenu}>
             Registrarse
          </button>
          {mostrarSubmenu && (
            <ul className="submenu">
              <li><a href="/registro">Estudiante</a></li>
              <li><a href="/registro-tutor">Tutor</a></li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
