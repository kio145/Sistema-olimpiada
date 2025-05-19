// src/components/FormularioCompetidor.jsx
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
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    if (form.passwordcompetidor !== form.passwordcompetidor_confirmation) {
      setError('Las contraseñas no coinciden');
      return;
    }
    try {
      // POST a /competidores con sólo nombre, email y password
      const res = await api.post('/competidores', {
        //idcompetidor: form.idcompetidor, 
        nombrecompetidor:     form.nombrecompetidor,
        apellidocompetidor:   form.apellidocompetidor,
        emailcompetidor:      form.emailcompetidor,
        passwordcompetidor:   form.passwordcompetidor,
        passwordcompetidor_confirmation: form.passwordcompetidor_confirmation
      });
      console.log('Registrado:', res.data);
      navigate('/login-competidor');
    } catch (err) {
      console.error(err.response?.data);
      setError(err.response?.data?.message || 'Error al registrar');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="formulario-registro">
      <div className="campo">
        <label htmlFor="nombrecompetidor">Usuario</label>
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

      <button type="submit" className="boton-registrar">Registrarse</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}
