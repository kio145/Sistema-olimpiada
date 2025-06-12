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
  const [error, setError] = useState('');
  const [areas, setAreas] = useState([]);
  const [erroresCampos, setErroresCampos] = useState({});
  const navigate = useNavigate();

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

  // ------ VALIDACIÓN CAMPO A CAMPO ------
  const validarCampo = (name, value) => {
    switch (name) {
      case 'nombretutor':
      case 'apellidotutor':
        if (!/^[A-Za-záéíóúÁÉÍÓÚüÜñÑ\s]+$/.test(value)) {
          return 'Solo se permiten letras y espacios';
        }
        break;
      case 'telefonotutor':
        if (!/^\d{8}$/.test(value)) {
          return 'Debe ser un número de 8 dígitos';
        }
        break;
      case 'citutor':
        if (!/^\d{7,10}$/.test(value)) {
          return 'Debe ser un número entre 7 y 10 dígitos';
        }
        break;
      case 'correotutor':
        if (!/^[\w\-.]+@[\w\-]+\.(com)$/.test(value)) {
          return 'Debe ingresar un correo válido (ej: ejemplo@dominio.com)';
        }
        break;
      default:
        break;
    }
    return '';
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));

    // Valida el campo individualmente
    const mensaje = validarCampo(name, value);
    setErroresCampos(prev => ({ ...prev, [name]: mensaje }));
  };

  // Checkbox áreas (máximo 2)
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

  // ------ VALIDACIÓN GENERAL AL ENVIAR ------
  const validarFormulario = () => {
    const errores = {};
    if (!/^[A-Za-záéíóúÁÉÍÓÚüÜñÑ\s]+$/.test(form.nombretutor)) {
      errores.nombretutor = 'Solo se permiten letras y espacios';
    }
    if (!/^[A-Za-záéíóúÁÉÍÓÚüÜñÑ\s]+$/.test(form.apellidotutor)) {
      errores.apellidotutor = 'Solo se permiten letras y espacios';
    }
    if (!/^\d{8}$/.test(form.telefonotutor)) {
      errores.telefonotutor = 'Debe ser un número de 8 dígitos';
    }
    if (!/^\d{7,10}$/.test(form.citutor)) {
      errores.citutor = 'Debe ser un número entre 7 y 10 dígitos';
    }
    if (!/^[\w\-.]+@[\w\-]+\.(com)$/.test(form.correotutor)) {
      errores.correotutor = 'Debe ingresar un correo válido (ej: ejemplo@dominio.com)';
    }
    if (form.passwordtutor !== form.passwordtutor_confirmation) {
      errores.passwordtutor = 'Las contraseñas no coinciden';
      errores.passwordtutor_confirmation = 'Las contraseñas no coinciden';
    }
    if (form.areas.length === 0) {
      errores.areas = 'Selecciona al menos un área (máximo 2)';
    }
    setErroresCampos(errores);
    return Object.keys(errores).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    if (!validarFormulario()) {
      setError('Revisa los campos marcados en rojo');
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

  // ------------------------
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="grupo">
          <div className="campo">
            <label>Nombre/s *</label>
            <input
              type="text"
              name="nombretutor"
              required
              value={form.nombretutor}
              onChange={handleChange}
              className={erroresCampos.nombretutor ? "input-error" : ""}
            />
            {erroresCampos.nombretutor && <span className="error">{erroresCampos.nombretutor}</span>}
          </div>
          <div className="campo">
            <label>Apellidos *</label>
            <input
              type="text"
              name="apellidotutor"
              required
              value={form.apellidotutor}
              onChange={handleChange}
              className={erroresCampos.apellidotutor ? "input-error" : ""}
            />
            {erroresCampos.apellidotutor && <span className="error">{erroresCampos.apellidotutor}</span>}
          </div>
        </div>
        <div className="campo">
          <label>Correo Electrónico *</label>
          <input
            type="email"
            name="correotutor"
            required
            value={form.correotutor}
            onChange={handleChange}
            className={erroresCampos.correotutor ? "input-error" : ""}
          />
          {erroresCampos.correotutor && <span className="error">{erroresCampos.correotutor}</span>}
        </div>
        <div className="grupo">
          <div className="campo">
            <label>Celular *</label>
            <input
              type="text"
              name="telefonotutor"
              required
              value={form.telefonotutor}
              onChange={handleChange}
              className={erroresCampos.telefonotutor ? "input-error" : ""}
              maxLength={8}
            />
            {erroresCampos.telefonotutor && <span className="error">{erroresCampos.telefonotutor}</span>}
          </div>
          <div className="campo">
            <label>Cédula de identidad *</label>
            <input
              type="text"
              name="citutor"
              required
              value={form.citutor}
              onChange={handleChange}
              className={erroresCampos.citutor ? "input-error" : ""}
              maxLength={10}
            />
            {erroresCampos.citutor && <span className="error">{erroresCampos.citutor}</span>}
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
                className={erroresCampos.passwordtutor ? "input-error" : ""}
              />
              <span onClick={() => setMostrar(v => !v)}>
                {mostrar ? <EyeOff /> : <Eye />}
              </span>
            </div>
            {erroresCampos.passwordtutor && <span className="error">{erroresCampos.passwordtutor}</span>}
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
                className={erroresCampos.passwordtutor_confirmation ? "input-error" : ""}
              />
              <span onClick={() => setMostrar(v => !v)}>
                {mostrar ? <EyeOff /> : <Eye />}
              </span>
            </div>
            {erroresCampos.passwordtutor_confirmation && <span className="error">{erroresCampos.passwordtutor_confirmation}</span>}
          </div>
        </div>
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
            {erroresCampos.areas && <span className="error">{erroresCampos.areas}</span>}
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
