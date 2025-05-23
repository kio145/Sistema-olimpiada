// src/components/FormularioRegistro.jsx

import '../../css/FormularioRegistro.css';
import { Lock, Mail, Eye, EyeOff, User } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/api/api';

export function FormularioRegistro() {
  const [form, setForm] = useState({
    nombrecompetidor: '',
    apellidocompetidor: '',
    emailcompetidor: '',
    passwordcompetidor: '',
    passwordcompetidor_confirmation: ''
  });
  const [mostrar, setMostrar] = useState(false);
  const [error, setError]       = useState('');
  const navigate                = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    if (form.passwordcompetidor !== form.passwordcompetidor_confirmation) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      // Payload con solo los campos básicos
      const payload = {
        nombrecompetidor:   form.nombrecompetidor,
        apellidocompetidor: form.apellidocompetidor,
        emailcompetidor:    form.emailcompetidor,
        passwordcompetidor: form.passwordcompetidor,
        passwordcompetidor_confirmation: form.passwordcompetidor_confirmation
      };

      const res = await api.post('/competidores', payload);
      console.log('Registrado:', res.data);
      navigate('/login');  // redirige a login tras registro
    } catch (err) {
      console.error(err.response?.data);
      setError(err.response?.data?.message || 'Error al registrar');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="formulario-registro">
      {/* Nombre */}
      <div className="campo">
        <label htmlFor="nombrecompetidor">Nombre</label>
        <div className="input-icono">
          <User size={18} />
          <input
            name="nombrecompetidor"
            id="nombrecompetidor"
            value={form.nombrecompetidor}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* Apellido */}
      <div className="campo">
        <label htmlFor="apellidocompetidor">Apellido</label>
        <div className="input-icono">
          <User size={18} />
          <input
            name="apellidocompetidor"
            id="apellidocompetidor"
            value={form.apellidocompetidor}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* Correo */}
      <div className="campo">
        <label htmlFor="emailcompetidor">Correo Electrónico</label>
        <div className="input-icono">
          <Mail size={18} />
          <input
            type="email"
            name="emailcompetidor"
            id="emailcompetidor"
            value={form.emailcompetidor}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* Contraseña */}
      <div className="campo">
        <label htmlFor="passwordcompetidor">Contraseña</label>
        <div className="input-icono">
          <Lock size={18} />
          <input
            name="passwordcompetidor"
            id="passwordcompetidor"
            type={mostrar ? 'text' : 'password'}
            value={form.passwordcompetidor}
            onChange={handleChange}
            required
          />
          <span onClick={() => setMostrar(!mostrar)}>
            {mostrar ? <EyeOff /> : <Eye />}
          </span>
        </div>
      </div>

      {/* Confirmación de Contraseña */}
      <div className="campo">
        <label htmlFor="passwordcompetidor_confirmation">Confirmar Contraseña</label>
        <div className="input-icono">
          <Lock size={18} />
          <input
            name="passwordcompetidor_confirmation"
            id="passwordcompetidor_confirmation"
            type={mostrar ? 'text' : 'password'}
            value={form.passwordcompetidor_confirmation}
            onChange={handleChange}
            required
          />
          <span onClick={() => setMostrar(!mostrar)}>
            {mostrar ? <EyeOff /> : <Eye />}
          </span>
        </div>
      </div>

      <button type="submit" className="boton-registrar">
        Registrarse
      </button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}
