// src/components/FormularioTutor.jsx
import '../../css/FormularioRegistro.css';
import { Lock, Mail, Eye, EyeOff, User } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/api/api';

export function FormularioTutor() {
  const [form, setForm] = useState({
    nombretutor: '',
    apellidotutor: '',
    correotutor: '',
    passwordtutor: '',
    passwordtutor_confirmation: ''
  });

  const [mostrar, setMostrar] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    if (form.passwordtutor !== form.passwordtutor_confirmation) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      const res = await api.post('/tutores', {
        nombretutor: form.nombretutor,
        apellidotutor: form.apellidotutor,
        correotutor: form.correotutor,
        passwordtutor: form.passwordtutor,
        passwordtutor_confirmation: form.passwordtutor_confirmation
      });
      console.log('Tutor registrado:', res.data);
      navigate('/login-tutor');
    } catch (err) {
      console.error(err.response?.data);
      setError(err.response?.data?.message || 'Error al registrar tutor');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="formulario-registro">
      <div className="campo">
        <label htmlFor="nombretutor">Nombre</label>
        <div className="input-icono">
          <User size={18} />
          <input
            name="nombretutor"
            id="nombretutor"
            value={form.nombretutor}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="campo">
        <label htmlFor="apellidotutor">Apellido</label>
        <div className="input-icono">
          <User size={18} />
          <input
            name="apellidotutor"
            id="apellidotutor"
            value={form.apellidotutor}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="campo">
        <label htmlFor="correotutor">Correo Electrónico</label>
        <div className="input-icono">
          <Mail size={18} />
          <input
            type="email"
            name="correotutor"
            id="correotutor"
            value={form.correotutor}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="campo">
        <label htmlFor="passwordtutor">Contraseña</label>
        <div className="input-icono">
          <Lock size={18} />
          <input
            name="passwordtutor"
            id="passwordtutor"
            type={mostrar ? 'text' : 'password'}
            value={form.passwordtutor}
            onChange={handleChange}
            required
          />
          <span onClick={() => setMostrar(!mostrar)}>
            {mostrar ? <EyeOff /> : <Eye />}
          </span>
        </div>
      </div>

      <div className="campo">
        <label htmlFor="passwordtutor_confirmation">Confirmar Contraseña</label>
        <div className="input-icono">
          <Lock size={18} />
          <input
            name="passwordtutor_confirmation"
            id="passwordtutor_confirmation"
            type={mostrar ? 'text' : 'password'}
            value={form.passwordtutor_confirmation}
            onChange={handleChange}
            required
          />
          <span onClick={() => setMostrar(!mostrar)}>
            {mostrar ? <EyeOff /> : <Eye />}
          </span>
        </div>
      </div>

      <button type="submit" className="boton-registrar">Registrarse</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}
