// src/paginas/admin/ListadoCompeticiones.jsx

import React, { useState, useEffect } from 'react';
import '../../css/ListadoCompeticiones.css';
import { FaSearch, FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';

export function ListadoCompeticiones() {
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState('');
  const [competiciones, setCompeticiones] = useState([]);

  useEffect(() => {
    api.get('/competencias')              // llama a GET /api/competencias
       .then(res => setCompeticiones(res.data.data)) // paginador Laravel
       .catch(console.error);
  }, []);

  const filtradas = competiciones.filter(c =>
    `${c.areacompetencia} ${c.nivelcompetencia}`
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  return (
    <div className="contenedor-competiciones">
      <h2>Competiciones</h2>

      <div className="busqueda-nueva">
        <input
          type="text"
          placeholder="Buscar competiciones..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
        />
        <button className="buscar-btn"><FaSearch/></button>
        <button className="nueva-btn" onClick={() => navigate('/nueva-competencia')}>
          Crear Nueva Competición
        </button>
      </div>

      <table className="tabla-competiciones">
        <thead>
          <tr>
            <th>ID</th><th>Área</th><th>Nivel</th>
            <th>Descripción</th><th>Cursos</th><th>Costo (Bs)</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filtradas.map(c => (
            <tr key={c.idcompetencia}>
              <td>{c.idcompetencia}</td>
              <td>{c.areacompetencia}</td>
              <td>{c.nivelcompetencia}</td>
              <td>{c.descripcion}</td>
              <td>
                {(c.requisitos || [])
                  .map(r => r.curso)
                  .join(', ')}
              </td>
              <td>{c.preciocompetencia}</td>
              <td>
                <button onClick={()=>navigate(`/editar-competencia/${c.idcompetencia}`)} className="accion editar">
                  <FaEdit/>
                </button>
                <button onClick={()=> {
                  if (confirm('¿Eliminar esta competencia?')) {
                    api.delete(`/competencias/${c.idcompetencia}`)
                       .then(() => setCompeticiones(prev => prev.filter(x => x.idcompetencia!==c.idcompetencia)))
                       .catch(console.error);
                  }
                }} className="accion eliminar">
                  <FaTrash/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="volver">
        <button onClick={() => navigate('/vista-admin')}>
          ⨯ Regresar a menú de administrador
        </button>
      </div>
    </div>
  );
}
