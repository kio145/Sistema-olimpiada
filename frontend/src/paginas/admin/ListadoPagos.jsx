import React, { useState } from 'react';
import '../../css/ListadoPostulantes.css';
import { FaSearch, FaEdit, FaTrash } from 'react-icons/fa';

export function ListadoPagos() {
  const [busqueda, setBusqueda] = useState('');
  const [pagos, setPagos] = useState([
    {
      id: 1,
      nombre: 'Luis',
      apellidos: 'Fernández Ríos',
      competidores: 'competidor',
      fechaPago: '2025-05-05',
      montoTotal: '100',
    },
    // puedes agregar más...
  ]);
  const filtrados = pagos.filter(p =>
    `${p.nombre} ${p.apellidos}`.toLowerCase().includes(busqueda.toLowerCase())
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
      <h2>Listado de boletas de pagos</h2>

      <div className="busqueda-pago">
        <input
          type="text"
          placeholder="Buscar..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <button className='buscar-btn'><FaSearch /></button>
      </div>

      <table className="tabla-pagos">
        <thead>
          <tr>
            <th>Cod.Boleta</th>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Competidores</th>
            <th>Fecha pago</th>
            <th>Monto total</th>
          </tr>
        </thead>
        <tbody>
          {filtrados.map((p, i) => (
            <tr key={i}>
              <td>{p.id}</td>
              <td>{p.nombre}</td>
              <td>{p.apellidos}</td>
              <td>{p.competidores}</td>
              <td>{p.fechaPago}</td>
              <td>{p.montoTotal}</td>
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
