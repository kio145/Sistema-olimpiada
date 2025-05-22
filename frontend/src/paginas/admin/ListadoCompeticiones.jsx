import React, { useState } from 'react';
import '../../css/ListadoCompeticiones.css';
import { FaSearch, FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export function ListadoCompeticiones() {
  const navigate = useNavigate();

  const [busqueda, setBusqueda] = useState('');
  const [competiciones, setCompeticiones] = useState([
    {
      id: 1,
      area: 'Astronomía - Astrofísica',
      nivel: '3P',
      descripcion: '',
      cursos: ['3ro Primaria'],
      costo: '15',
    },
    {
      id: 2,
      area: 'Informática',
      nivel: 'Guacamayo',
      descripcion: '',
      cursos: ['5to Primaria', '6to Primaria'],
      costo: '15',
    }
  ]);

  const filtradas = competiciones.filter(c =>
    `${c.area} ${c.nivel}`.toLowerCase().includes(busqueda.toLowerCase())
  );

  const crearNueva = () => {
    navigate('/nueva-competencia');
  };

  const volver = () => {
    navigate('/vista-admin');
  };

  const editar = (id) => {
    alert(`Editar competencia con ID: ${id}`);
    // Aquí iría la lógica de redirección o edición
  };

  const eliminar = (id) => {
    if (window.confirm('¿Estás seguro que deseas eliminar esta competencia?')) {
      setCompeticiones(prev => prev.filter(c => c.id !== id));
    }
  };

  return (
    <div className="contenedor-competiciones">
      <h2>Competiciones</h2>

      <div className="busqueda-nueva">
        <input
          type="text"
          placeholder="Listado de competiciones"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <button className='buscar-btn'><FaSearch /></button>
        <button className="nueva-btn" onClick={crearNueva}>Crear Nueva Competición</button>
      </div>

      <table className="tabla-competiciones">
        <thead>
          <tr>
            <th>ID</th>
            <th>Área</th>
            <th>Nivel</th>
            <th>Descripción</th>
            <th>Cursos</th>
            <th>Costo por participante (Bs)</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filtradas.map((c, i) => (
            <tr key={i}>
              <td>{c.id}</td>
              <td>{c.area}</td>
              <td>{c.nivel}</td>
              <td>{c.descripcion}</td>
              <td>{c.cursos.join(', ')}</td>
              <td>{c.costo}</td>
              <td>
                <button onClick={() => editar(c.id)} className="accion editar"><FaEdit /></button>
                <button onClick={() => eliminar(c.id)} className="accion eliminar"><FaTrash /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="volver">
        <button onClick={volver}>⨯ Regresar a menú de administrador</button>
      </div>
    </div>
  );
}
