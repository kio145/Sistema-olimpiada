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
  const navigate = useNavigate();

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/login', {
        email: form.email,
        password: form.password
      });
      const { token, role, user } = res.data;

      // Guarda el token para futuras peticiones
      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Redirige según rol
      if (role === 'administrador') {
        navigate('/vista-admin', {
          state: {
            usuario: {
              nombre: user.name,
              iniciales: user.name.slice(0, 2).toUpperCase(),
              cerrarSesion: () => {
                localStorage.removeItem('token');
                navigate('/login');
              }
            },
            etapaActual: '',
            fechaHora: ''
          }
        });
      } else {
        // Ajusta la ruta para el competidor
        navigate('/dashboard-estudiante', { state: { user } });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
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
  );
}
