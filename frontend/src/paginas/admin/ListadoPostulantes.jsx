// src/components/ListadoPostulantes.jsx

import React, { useState, useEffect } from 'react';
import '../../css/ListadoPostulantes.css';
import { FaSearch, FaEdit, FaTrash, FaFilePdf, FaFileExcel } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import api from '@/api/api';

export function ListadoPostulantes() {
  const [busqueda, setBusqueda]       = useState('');
  const [postulantes, setPostulantes] = useState([]);
  const [error, setError]             = useState('');
  const navigate                      = useNavigate();

  useEffect(() => {
    const fetchHabilitados = async () => {
      try {
        const res = await api.get('/competidores/habilitados');
        setPostulantes(res.data);
      } catch (e) {
        console.error('Error al cargar postulantes habilitados:', e);
        setError('No se pudo cargar el listado de postulantes habilitados.');
      }
    };
    fetchHabilitados();
  }, []);

  const filtrados = postulantes.filter(p =>
    `${p.nombre} ${p.apellidos} ${p.correo}`.toLowerCase().includes(busqueda.toLowerCase())
  );

  const eliminarPostulante = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar este postulante?')) return;
    try {
      await api.delete(`/competidores/${id}`);
      setPostulantes(prev => prev.filter(p => p.id !== id));
    } catch (e) {
      console.error('Error al eliminar postulante:', e);
      alert('No se pudo eliminar. Intenta nuevamente.');
    }
  };

  const editarPostulante = (id) => {
    navigate(`/editar-competidor/${id}`);
  };

  const exportarPDF = async () => {
    try {
      const res = await api.get('/competidores/exportar/pdf', { responseType: 'blob' });
      const url = URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'postulantes_habilitados.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (e) {
      console.error('Error al exportar PDF:', e);
      alert('No se pudo exportar a PDF.');
    }
  };

  const exportarExcel = async () => {
    try {
      const res = await api.get('/competidores/exportar/excel', { responseType: 'blob' });
      const url = URL.createObjectURL(new Blob([res.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'postulantes_habilitados.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (e) {
      console.error('Error al exportar Excel:', e);
      alert('No se pudo exportar a Excel.');
    }
  };

  const volver = () => {
    navigate('/vista-admin');
  };

  return (
    <div className="listado-container">
      <h2>Postulantes Habilitados</h2>

      {error && <p className="error">{error}</p>}

      <div className="busqueda-postulante">
        <input
          type="text"
          placeholder="Buscar por nombre, apellidos o correo..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <button className="buscar-btn">
          <FaSearch />
        </button>
      </div>

      <div className="export-buttons">
        <button onClick={exportarPDF} className="export-btn pdf">
          <FaFilePdf /> PDF
        </button>
        <button onClick={exportarExcel} className="export-btn excel">
          <FaFileExcel /> Excel
        </button>
      </div>

      <table className="tabla-postulantes">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Correo</th>
            <th>Nivel</th>
            <th>Área</th>
            <th>Nombre Tutor</th>
            <th>Apellido Tutor</th>
            <th>Teléfono Tutor</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filtrados.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nombre}</td>
              <td>{p.apellidos}</td>
              <td>{p.correo}</td>
              <td>{p.nivel}</td>
              <td>{p.area}</td>
              <td>{p.tutorNombre}</td>
              <td>{p.tutorApellido}</td>
              <td>{p.telefono}</td>
              <td>{p.estado}</td>
              <td>
                <button 
                  className="accion editar" 
                  onClick={() => editarPostulante(p.id)}
                >
                  <FaEdit />
                </button>
                <button 
                  className="accion eliminar" 
                  onClick={() => eliminarPostulante(p.id)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
          {filtrados.length === 0 && (
            <tr>
              <td colSpan="11" className="no-data">
                No hay postulantes habilitados que coincidan con la búsqueda.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="volver">
        <button onClick={volver}>⨯ Regresar al menú de administrador</button>
      </div>
    </div>
  );
}

export default ListadoPostulantes;
