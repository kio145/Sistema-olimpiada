import React, { useState } from 'react';
import '../../css/ListadoPostulantes.css';
import { FaSearch, FaEdit, FaTrash } from 'react-icons/fa';

export function ListadoPostulantes() {
  const [busqueda, setBusqueda] = useState('');
  const [postulantes, setPostulantes] = useState([
    {
      id: 1,
      nombre: 'Luis',
      apellidos: 'Fernández Ríos',
      correo: 'luis@gmail.com',
      nivel: '6to',
      area: 'Matemáticas',
      tutorNombre: 'Carlos',
      tutorApellido: 'Fernández',
      telefono: '77712345',
      estado: 'Pendiente',
    },
    // puedes agregar más...
  ]);

  const filtrados = postulantes.filter(p =>
    `${p.nombre} ${p.apellidos} ${p.correo}`.toLowerCase().includes(busqueda.toLowerCase())
  );

  const exportarPDF = () => {
    alert('Función para exportar a PDF');
  };

  const exportarExcel = () => {
    alert('Función para exportar a Excel');
  };

  const volver = () => {
    window.location.href = '/vista-admin';
  };

  return (
    <div className="listado-container">
      <h2>Listado de postulantes</h2>

      <div className="busqueda-postulante">
        <input
          type="text"
          placeholder="Buscar..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <button className='buscar-btn'><FaSearch /></button>
      </div>

      <table className="tabla-postulantes">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Correo Electrónico</th>
            <th>Nivel</th>
            <th>Área</th>
            <th>Nombre Tutor</th>
            <th>Apellido Tutor</th>
            <th>Teléfono (Tutor)</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filtrados.map((p, i) => (
            <tr key={i}>
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
                <button className="accion editar"><FaEdit /></button>
                <button className="accion eliminar"><FaTrash /></button>
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
