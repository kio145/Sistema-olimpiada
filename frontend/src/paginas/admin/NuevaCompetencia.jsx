import React, { useState } from 'react';
import '../../css/NuevaCompetencia.css';

export function NuevaCompetencia() {
  const [area, setArea] = useState('');
  const [nivel, setNivel] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [costo, setCosto] = useState('');
  const [cursosSeleccionados, setCursosSeleccionados] = useState([]);
  const [imagen, setImagen] = useState(null);
  const [imagenURL, setImagenURL] = useState(null);

  const cursos = [
    '1ro de Primaria', '2do de Primaria', '3ro de Primaria', '4to de Primaria', '5to de Primaria', '6to de Primaria',
    '1ro de Secundaria', '2do de Secundaria', '3ro de Secundaria', '4to de Secundaria', '5to de Secundaria', '6to de Secundaria'
  ];

  const toggleCurso = (curso) => {
    setCursosSeleccionados(prev =>
      prev.includes(curso) ? prev.filter(c => c !== curso) : [...prev, curso]
    );
  };

  const handleImagen = (e) => {
    const file = e.target.files[0];
    setImagen(file);
    setImagenURL(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevaCompetencia = {
      area,
      nivel,
      descripcion,
      costo,
      cursos: cursosSeleccionados,
      imagen,
    };
    console.log('Competencia creada:', nuevaCompetencia);
    alert('¡Competencia creada correctamente!');
    // Aquí iría la lógica de envío al backend
  };

  return (
    <form className="formulario-competencia" onSubmit={handleSubmit}>
      <h2>Nueva competencia</h2>

      <input type="text" placeholder="Área" value={area} onChange={e => setArea(e.target.value)} />
      <input type="text" placeholder="Nivel/Categoría" value={nivel} onChange={e => setNivel(e.target.value)} />

      <textarea placeholder="Descripción" value={descripcion} onChange={e => setDescripcion(e.target.value)} />

      <input type="number" placeholder="Costo por participante (Bs)" value={costo} onChange={e => setCosto(e.target.value)} />

      <div className="cursos-checkbox">
        <p>Selecciona los cursos habilitados:</p>
        <div className="grid-cursos">
          {cursos.map((curso, index) => (
            <label key={index}>
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
        <p>Sube una imagen para la competencia</p>
        {imagenURL && <img src={imagenURL} alt="Vista previa" width="120" />}
        <input type="file" accept="image/*" onChange={handleImagen} />
      </div>

      <button type="submit" className="crear-btn">Crear</button>
    </form>
  );
}
