import React, { useEffect, useState } from 'react';
import api from '../../api/api'; // Axios configurado
import '../../css/ListadoPostulantes.css';
import { FaSearch } from 'react-icons/fa';

export function ListadoPagos() {
  const [busqueda, setBusqueda] = useState('');
  const [pagos, setPagos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar pagos reales
  useEffect(() => {
    api.get('/boleta-pagos')
      .then(res => {
        setPagos(res.data);
        setLoading(false);
      })
      .catch(err => {
        setPagos([]);
        setLoading(false);
        alert('Error al cargar pagos');
      });
  }, []);

  const filtrados = pagos.filter(p =>
    (`${p.nombre} ${p.apellidos}`.toLowerCase().includes(busqueda.toLowerCase()))
  );

  const volver = () => window.location.href = '/vista-admin';

  return (
    <div className="listado-container">
      <h2>Listado de boletas de pagos</h2>

      <div className="busqueda-pago">
        <input
          type="text"
          placeholder="Buscar..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
        />
        <button className='buscar-btn'><FaSearch /></button>
      </div>

      {loading ? (
        <p>Cargando pagos...</p>
      ) : (
      <table className="tabla-pagos">
        <thead>
          <tr>
            <th>Cod.Boleta</th>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Ci</th>
            <th>Fecha pago</th>
            <th>Monto total</th>
          </tr>
        </thead>
        <tbody>
  {filtrados.length === 0 ? (
    <tr>
      <td colSpan="6" style={{ textAlign: 'center' }}>No hay pagos para mostrar</td>
    </tr>
  ) : (
    filtrados.map((p, i) => (
      <tr key={p.idboleta}>
        <td>{p.idboleta}</td>
        <td>{p.nombre}</td>
        <td>{p.apellidos}</td>
        <td>{p.ci}</td>
        <td>{p.fechaPago}</td>
        <td>{p.montoTotal}</td>
      </tr>
    ))
  )}
</tbody>
      </table>
      )}

      <div className="volver">
        <button onClick={volver}>⨯ Regresar a menú de administrador</button>
      </div>
    </div>
  );
}
