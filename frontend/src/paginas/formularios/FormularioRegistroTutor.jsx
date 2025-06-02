// src/components/FormularioRegistroTutor.jsx

import '../../css/FormularioIns.css';
import { Lock, Mail, Eye, EyeOff } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/api/api';

export function FormularioRegistroTutor() {
  const [form, setForm] = useState({
    nombretutor: '',
    apellidotutor: '',
    correotutor: '',
    passwordtutor: '',
    passwordtutor_confirmation: '',
    telefonotutor: '',
    citutor: '',
    areas: [],              
  });
  const [mostrar, setMostrar] = useState(false);
  const [error,   setError]   = useState('');
  const [areas,   setAreas]   = useState([]);  
  const navigate = useNavigate();

  // 1) Traer todas las competencias y extraer áreas únicas
  useEffect(() => {
    api.get('/competencias/todas')
      .then(res => {
        const uniq = Array.from(new Set(
          res.data.map(c => c.areacompetencia).filter(Boolean)
        ));
        setAreas(uniq);
      })
      .catch(err => console.error('No se pudieron cargar áreas:', err));
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  // 2) Toggle de checkboxes de área, máximo 2
  const toggleArea = area => {
    setForm(f => {
      const has = f.areas.includes(area);
      if (has) {
        return { ...f, areas: f.areas.filter(a => a !== area) };
      }
      if (f.areas.length < 2) {
        return { ...f, areas: [...f.areas, area] };
      }
      return f;
    });
    setError('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    // validaciones básicas
    if (form.passwordtutor !== form.passwordtutor_confirmation) {
      setError('Las contraseñas no coinciden');
      return;
    }
    if (form.areas.length === 0) {
      setError('Selecciona al menos un área (máximo 2)');
      return;
    }

    try {
      const payload = {
        nombretutor: form.nombretutor,
        apellidotutor: form.apellidotutor,
        correotutor: form.correotutor,
        passwordtutor: form.passwordtutor,
        passwordtutor_confirmation: form.passwordtutor_confirmation,
        telefonotutor: form.telefonotutor,
        citutor: form.citutor,
        area: form.areas.join(', ')
      };

      await api.post('/tutores', payload);
      navigate('/login');
    } catch (err) {
      console.error('Error al registrar tutor:', err);
      setError(
        err.response?.data?.message
        || Object.values(err.response?.data?.errors || {}).flat().join(' ')
        || 'Error al registrar'
      );
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        {/* Nombre / Apellidos */}
        <div className="grupo">
          <div className="campo">
            <label>Nombre/s *</label>
            <input
              type="text"
              name="nombretutor"
              required
              value={form.nombretutor}
              onChange={handleChange}
            />
          </div>
          <div className="campo">
            <label>Apellidos *</label>
            <input
              type="text"
              name="apellidotutor"
              required
              value={form.apellidotutor}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Correo */}
        <div className="campo">
          <label>Correo Electrónico *</label>
          <input
            type="email"
            name="correotutor"
            required
            value={form.correotutor}
            onChange={handleChange}
          />
        </div>

        {/* Teléfono / Cédula */}
        <div className="grupo">
          <div className="campo">
            <label>Celular *</label>
            <input
              type="text"
              name="telefonotutor"
              required
              value={form.telefonotutor}
              onChange={handleChange}
            />
          </div>
          <div className="campo">
            <label>Cédula de identidad *</label>
            <input
              type="text"
              name="citutor"
              required
              value={form.citutor}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Contraseña y confirmación */}
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
              <span onClick={() => setMostrar(v => !v)}>
                {mostrar ? <EyeOff /> : <Eye />}
              </span>
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
              <span onClick={() => setMostrar(v => !v)}>
                {mostrar ? <EyeOff /> : <Eye />}
              </span>
            </div>
          </div>
        </div>

        {/* Selección de Áreas (hasta 2) */}
        <div className="grupo">
           <div className="campo">
               <label>Áreas (máximo 2) *</label>
                  {areas.map(ar => (
                  <div key={ar}>
                   <input
                    type="checkbox"
                       id={ar}
                       checked={form.areas.includes(ar)}
                       onChange={() => toggleArea(ar)}
                        />
                          <label htmlFor={ar}>{ar}</label>
                    </div>
                   ))}
               </div>
            </div>

        {/* Botón y errores */}
        <button type="submit" className="submit-btn btn-tutor">
          Registrarse
        </button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}
