// src/paginas/competiciones/FormularioIns.jsx
import '../../css/FormularioIns.css';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../api/api';

export function FormularioIns() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { competenciaId } = state || {};

  const [tutores, setTutores] = useState([]);
  const [area, setArea] = useState('');
  const [error, setError] = useState('');
  // Formulario ahora incluye idtutor
  const [form, setForm] = useState({
    nombrecompetidor:   '',
    apellidocompetidor: '',
    emailcompetidor:    '',
    cedulacompetidor:   '',
    fechanacimiento:    '',
    colegio:           '',
    curso:             '',
    departamento:      '',
    provincia:         '',
    idtutor:           '',
    idcompetencia: competenciaId || '',
  });

  // 1. Cargar el área de la competencia seleccionada (una sola vez)
  useEffect(() => {
    if (!competenciaId) return;
    api.get(`/competencias/${competenciaId}`)
      .then(res => {
        setArea(res.data.areacompetencia);
      })
      .catch(err => {
        setError('No se pudo obtener el área de la competencia.');
        console.error(err);
      });
  }, [competenciaId]);

  // 2. Cargar tutores de ese área (cuando se tenga el área)
  useEffect(() => {
    if (!area) return;
    api.get('/tutores', { params: { area } })
      .then(res => setTutores(res.data))
      .catch(err => {
        setError('No se pudieron cargar los tutores de esta área.');
        console.error(err);
      });
  }, [area]);

  const handleChange = e => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  useEffect(() => {
  const datosGuardados = localStorage.getItem('datosCompetidor');
  if (datosGuardados) {
    setForm(prev => ({
      ...prev,
      ...JSON.parse(datosGuardados),
      idcompetencia: competenciaId || '',
      idtutor: '', // siempre pedir nuevo tutor
    }));
  }
}, [competenciaId]);

  const validar = () => {
    const req = [
      'nombrecompetidor',
      'apellidocompetidor',
      'emailcompetidor',
      'cedulacompetidor',
      'fechanacimiento',
      'curso',
      'provincia',
      'idtutor'             
    ];
    for (let campo of req) {
      if (!form[campo]?.toString().trim()) {
        setError('Por favor completa todos los campos obligatorios.');
        return false;
      }
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.emailcompetidor)) {
      setError('Introduce un correo electrónico válido.');
      return false;
    }
    if (!/^\d{6,}$/.test(form.cedulacompetidor)) {
      setError('La cédula debe tener al menos 6 dígitos numéricos.');
      return false;
    }
    const hoy = new Date().setHours(0,0,0,0);
    const nac = new Date(form.fechanacimiento).setHours(0,0,0,0);
    if (nac > hoy) {
      setError('La fecha de nacimiento no puede ser futura.');
      return false;
    }
    if (form.provincia.trim().length < 2) {
      setError('La provincia debe tener al menos 2 caracteres.');
      return false;
    }
    return true;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    if (!validar()) return;

    try {
      await api.post('/inscripciones/competidor', {
        ...form,
        idcompetencia: competenciaId
      });
      const { idtutor, idcompetencia, ...resto } = form;
  localStorage.setItem('datosCompetidor', JSON.stringify(resto));
  navigate('/confirmacion');
    } catch (e) {
      console.error(e);
      if (e.response?.data?.errors) {
        setError(Object.values(e.response.data.errors).flat().join(' '));
      } else if (e.response?.data?.message) {
        setError(e.response.data.message);
      } else {
        setError('Error al inscribir. Intenta de nuevo.');
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Registro de Inscripción</h2>
      {area && <p><b>Área seleccionada:</b> {area}</p>}
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} noValidate>
        {/* Nombre y Apellidos */}
        <div className="grupo">
          <div className="campo">
            <label>Nombre/s *</label>
            <input
              type="text"
              name="nombrecompetidor"
              value={form.nombrecompetidor}
              onChange={handleChange}
              required
            />
          </div>
          <div className="campo">
            <label>Apellidos *</label>
            <input
              type="text"
              name="apellidocompetidor"
              value={form.apellidocompetidor}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Correo */}
        <div className="campo">
          <label>Correo Electrónico *</label>
          <input
            type="email"
            name="emailcompetidor"
            value={form.emailcompetidor}
            onChange={handleChange}
            required
          />
        </div>

        {/* Cédula y Fecha de Nacimiento */}
        <div className="grupo">
          <div className="campo">
            <label>Cédula de Identidad *</label>
            <input
              type="text"
              name="cedulacompetidor"
              value={form.cedulacompetidor}
              onChange={handleChange}
              required
            />
          </div>
          <div className="campo">
            <label>Fecha de Nacimiento *</label>
            <input
              type="date"
              name="fechanacimiento"
              value={form.fechanacimiento}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Colegio y Curso */}
        <div className="grupo">
          <div className="campo">
            <label>Unidad Educativa</label>
            <input
              type="text"
              name="colegio"
              value={form.colegio}
              onChange={handleChange}
            />
          </div>
          <div className="campo">
            <label>Curso *</label>
            <select
              name="curso"
              value={form.curso}
              onChange={handleChange}
              required
            >
              <option value="">— Selecciona —</option>
              <option>1ro Primaria</option>
              <option>2do Primaria</option>
              <option>3ro Primaria</option>
              <option>4to Primaria</option>
              <option>5to Primaria</option>
              <option>6to Primaria</option>
              <option>1ro Secundaria</option>
              <option>2do Secundaria</option>
              <option>3ro Secundaria</option>
              <option>4to Secundaria</option>
              <option>5to Secundaria</option>
              <option>6to Secundaria</option>
            </select>
          </div>
        </div>

        {/* Departamento y Provincia */}
        <div className="grupo">
          <div className="campo">
            <label>Departamento *</label>
            <select
              name="departamento"
              value={form.departamento}
              onChange={handleChange}
              required
            >
              <option value="">— Selecciona —</option>
              <option>Cochabamba</option>
              <option>La Paz</option>
              <option>Santa Cruz</option>
              <option>Oruro</option>
              <option>Potosí</option>
              <option>Tarija</option>
              <option>Chuquisaca</option>
              <option>Pando</option>
              <option>Beni</option>
            </select>
          </div>
          <div className="campo">
            <label>Provincia *</label>
            <input
              type="text"
              name="provincia"
              placeholder="Escribe tu provincia"
              value={form.provincia}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Selección de Tutor */}
        <div className="campo">
          <label>Tutor *</label>
          <select
            name="idtutor"
            value={form.idtutor}
            onChange={handleChange}
            required
            disabled={!tutores.length}
          >
            <option value="">— Elige un tutor —</option>
            {tutores.map(t => (
              <option key={t.idtutor} value={t.idtutor}>
                {t.nombretutor} {t.apellidotutor}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="submit-btn">
          Enviar inscripción
        </button>
      </form>

      <div className="regresar-btn">
        <button onClick={() => navigate('/competiciones')}>
          ← Regresar a competiciones
        </button>
      </div>
    </div>
  );
}

export default FormularioIns;
