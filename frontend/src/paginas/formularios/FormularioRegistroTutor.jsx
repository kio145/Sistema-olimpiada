// src/components/FormularioRegistroTutor.jsx

import '../../css/FormularioIns.css';
import { Lock, Mail, Eye, EyeOff, User } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/api/api'; // Asegúrate de que esto apunta a tu axios configurado

export function FormularioRegistroTutor() {
  const [form, setForm] = useState({
    nombretutor: '',
    apellidotutor: '',
    correotutor: '',
    passwordtutor: '',
    passwordtutor_confirmation: '',
    telefonotutor: '',
    citutor: '',
    area: '',
  });

  const [mostrar, setMostrar] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    if (form.passwordtutor !== form.passwordtutor_confirmation) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      const payload = {
        ...form
      };

      const res = await api.post('/tutores', payload);
      console.log('Registro exitoso:', res.data);
      navigate('/login'); // redirige después de registro
    } catch (err) {
      console.error('Error al registrar tutor:', err.response?.data);
      setError(err.response?.data?.message || 'Error al registrar');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="grupo">
          <div className="campo">
            <label>Nombre/s *</label>
            <input type="text" name="nombretutor" required value={form.nombretutor} onChange={handleChange} />
          </div>
          <div className="campo">
            <label>Apellidos *</label>
            <input type="text" name="apellidotutor" required value={form.apellidotutor} onChange={handleChange} />
          </div>
        </div>

        <div className="grupo">
          <div className="campo">
            <label>Correo Electrónico *</label>
            <input type="email" name="correotutor" required value={form.correotutor} onChange={handleChange} />
          </div>
        </div>

        <div className="grupo">
          <div className="campo">
            <label>Celular *</label>
            <input type="text" name="telefonotutor" required value={form.telefonotutor} onChange={handleChange} />
          </div>
          <div className="campo">
            <label>Cédula de identidad *</label>
            <input type="text" name="citutor" required value={form.citutor} onChange={handleChange} />
          </div>
        </div>

        <div className="grupo">
          <div className="campo">
            <label>Contraseña *</label>
            <div className="input-icono">
              <Lock size={18} />
              <input
                type={mostrar ? 'text' : 'password'}
                name="passwordtutor"
                required
                value={form.passwordtutor}
                onChange={handleChange}
              />
              <span onClick={() => setMostrar(!mostrar)}>{mostrar ? <EyeOff /> : <Eye />}</span>
            </div>
          </div>
          <div className="campo">
            <label>Confirmar Contraseña *</label>
            <div className="input-icono">
              <Lock size={18} />
              <input
                type={mostrar ? 'text' : 'password'}
                name="passwordtutor_confirmation"
                required
                value={form.passwordtutor_confirmation}
                onChange={handleChange}
              />
              <span onClick={() => setMostrar(!mostrar)}>{mostrar ? <EyeOff /> : <Eye />}</span>
            </div>
          </div>
        </div>

        <div className="grupo">
          <div className="campo">
            <label>Seleccione el área a la que pertenece *</label>
            <select name="area" required value={form.area} onChange={handleChange}>
              <option value="">Seleccione...</option>
              <option value="Robotica">Robótica</option>
              <option value="Informatica">Informática</option>
              <option value="Electronica">Electrónica</option>
            </select>
          </div>
        </div>

        <button type="submit" className="submit-btn btn-tutor">
          Registrarse
        </button>

        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}
