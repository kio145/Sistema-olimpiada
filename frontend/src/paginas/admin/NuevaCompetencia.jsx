// src/paginas/admin/NuevaCompetencia.jsx

import React, { useState } from 'react';
import '../../css/NuevaCompetencia.css';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';

export function NuevaCompetencia() {
  const navigate = useNavigate();
  const [area, setArea]             = useState('');
  const [nivel, setNivel]           = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [costo, setCosto]           = useState('');
  const [cursosSeleccionados, setCursosSeleccionados] = useState([]);
  const [imagen, setImagen]         = useState(null);
  const [error, setError]           = useState('');

  const cursos = [
    '1ro Primaria','2do Primaria','3ro Primaria','4to Primaria','5to Primaria','6to Primaria',
    '1ro Secundaria','2do Secundaria','3ro Secundaria','4to Secundaria','5to Secundaria','6to Secundaria'
  ];

  const toggleCurso = curso => {
    setCursosSeleccionados(prev =>
      prev.includes(curso)
        ? prev.filter(c => c !== curso)
        : [...prev, curso]
    );
  };

  const handleImagen = e => {
    setImagen(e.target.files[0] || null);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    // Pre‐validación sencilla
    if (!area || !nivel || !costo || cursosSeleccionados.length === 0) {
      setError('Completa todos los campos y selecciona al menos un curso.');
      return;
    }

    const formData = new FormData();
    formData.append('areacompetencia', area);
    formData.append('nivelcompetencia', nivel);
    formData.append('descripcion', descripcion);
    formData.append('preciocompetencia', costo);
    cursosSeleccionados.forEach(c => formData.append('cursos[]', c));
    if (imagen) formData.append('imagencompetencia', imagen);

    try {
      const { data } = await api.post('/competencias', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('¡Competencia creada correctamente!');
      navigate('/listado-competiciones');
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message
        || 'Error interno al crear la competencia.'
      );
    }
  };

  return (
    <form className="formulario-competencia" onSubmit={handleSubmit}>
      <h2>Nueva Competencia</h2>

      {error && <p className="error">{error}</p>}

      <input
        type="text"
        placeholder="Área"
        value={area}
        onChange={e => setArea(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Nivel/Categoría"
        value={nivel}
        onChange={e => setNivel(e.target.value)}
        required
      />

      <textarea
        placeholder="Descripción (opcional)"
        value={descripcion}
        onChange={e => setDescripcion(e.target.value)}
      />

      <input
        type="number"
        placeholder="Costo por participante (Bs)"
        value={costo}
        onChange={e => setCosto(e.target.value)}
        required
      />

      <div className="cursos-checkbox">
        <p>Selecciona cursos habilitados:</p>
        <div className="grid-cursos">
          {cursos.map((curso, i) => (
            <label key={i}>
              <input
                type="checkbox"
                checked={cursosSeleccionados.includes(curso)}
                onChange={() => toggleCurso(curso)}
              />
              {curso}
            </label>
          ))}
        </div>
      </div>

      <div className="imagen-upload">
        <p>Sube una imagen (opcional):</p>
        <input type="file" accept="image/*" onChange={handleImagen} />
      </div>

      <button type="submit" className="crear-btn">
        Crear Competencia
      </button>
    </form>
  );
}
