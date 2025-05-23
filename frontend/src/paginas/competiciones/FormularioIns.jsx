import '../../css/FormularioIns.css';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../api/api';

export function FormularioIns() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { competenciaId } = state || {};

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
  });
  const [error, setError] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      // 1) Crear competidor
      const { data: comp } = await api.post('/competidores', form);
      // 2) Crear inscripción (ahora sólo necesitamos competenciaId)
      await api.post('/inscripciones', {
        idcompetencia: competenciaId
      });
      navigate('/confirmacion');
    } catch (e) {
      console.error(e);
      if (e.response?.data?.errors) {
        setError(Object.values(e.response.data.errors).flat().join(' '));
      } else {
        setError('Error al inscribir. Intenta de nuevo.');
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Registro de Inscripción</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="grupo">
          <div className="campo">
            <label>Nombre/s *</label>
            <input
              type="text"
              name="nombrecompetidor"
              required
              value={form.nombrecompetidor}
              onChange={handleChange}
            />
          </div>
          <div className="campo">
            <label>Apellidos *</label>
            <input
              type="text"
              name="apellidocompetidor"
              required
              value={form.apellidocompetidor}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="campo">
          <label>Correo Electrónico *</label>
          <input
            type="email"
            name="emailcompetidor"           
            required
            value={form.emailcompetidor}
            onChange={handleChange}
          />
        </div>

        <div className="grupo">
          <div className="campo">
            <label>Cédula de Identidad *</label>
            <input
              type="text"
              name="cedulacompetidor"
              required
              value={form.cedulacompetidor}
              onChange={handleChange}
            />
          </div>
          <div className="campo">
            <label>Fecha de Nacimiento *</label>
            <input
              type="date"
              name="fechanacimiento"
              required
              value={form.fechanacimiento}
              onChange={handleChange}
            />
          </div>
        </div>

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
            <label>Curso</label>
            <select
              name="curso"
              required
              value={form.curso}
              onChange={handleChange}
            >
              <option value="">— Selecciona —</option>
              <option>Quinto Primaria</option>
              <option>Sexto Primaria</option>
              <option>Primero Secundaria</option>
            </select>
          </div>
        </div>

        <div className="grupo">
          <div className="campo">
            <label>Departamento</label>
            <select
              name="departamento"
              value={form.departamento}
              onChange={handleChange}
            >
              <option>Cochabamba</option>
              <option>La Paz</option>
              <option>Santa Cruz</option>
            </select>
          </div>
          <div className="campo">
            <label>Provincia</label>
            <select
              name="provincia"
              value={form.provincia}
              onChange={handleChange}
            >
              <option>Cercado</option>
              <option>Chapare</option>
              <option>Campero</option>
            </select>
          </div>
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
