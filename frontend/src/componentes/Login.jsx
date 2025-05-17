import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/api/api';

export function Login() {
  const [form, setForm] = useState({ email:'', password:'' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.post('/login', form);
      const { token, role, user } = res.data;
      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // redirige según rol
      if (role === 'administrador') {
        navigate('/vista-admin', { state: {
          usuario: {
            nombre: user.name,
            iniciales: user.name.slice(0,2).toUpperCase(),
            cerrarSesion: () => {
              localStorage.removeItem('token');
              navigate('/login');
            }
          },
          etapaActual: '',
          fechaHora: '',
        }});
      } else {
        navigate('/dashboard-estudiante');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error al iniciar sesión');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="formulario">
      <div className="campo">
        <label htmlFor="email">Correo</label>
        <input name="email" type="email" value={form.email}
          onChange={handleChange} required />
      </div>
      <div className="campo">
        <label htmlFor="password">Contraseña</label>
        <input name="password" type="password" value={form.password}
          onChange={handleChange} required />
      </div>
      {error && <p className="error">{error}</p>}
      <button type="submit">Iniciar Sesión</button>
    </form>
  );
}
