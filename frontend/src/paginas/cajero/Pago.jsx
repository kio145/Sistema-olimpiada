import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../css/Pago.css';

export function Pago() {
  const location = useLocation();
  const navigate = useNavigate();
  const { tutor, total, monto, cambio } = location.state || {};

  // Manejo si no hay datos (acceso directo a /pago-boleta sin pasar por boleta)
  if (!tutor) {
    return (
      <div className="pago-container">
        <h2>Error</h2>
        <p>No hay datos disponibles. Por favor genera una boleta primero.</p>
        <button onClick={() => navigate('/generar-boleta')}>Volver</button>
      </div>
    );
  }

  return (
    <div className="pago-container">
      <h2 className='titulo-pago'>Pago realizado con éxito</h2>
      <p>La siguiente Boleta de Pago fue emitida</p>
      <hr />
      <div className="boleta-detalle">
        <h3>BOLETA DE PAGO</h3>
        <table>
          <thead>
            <tr>
              <th>Competidores</th>
              <th>Área</th>
              <th>Nivel</th>
              <th>Monto</th>
            </tr>
          </thead>
          <tbody>
            {tutor.estudiantes.map((est, i) => (
              <tr key={i}>
                <td>{est.nombre}</td>
                <td>{est.area}</td>
                <td>{est.nivel}</td>
                <td>{est.costo}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p><strong>Costo total:</strong> {total} Bs</p>
        <p><strong>Monto pagado:</strong> {monto} Bs</p>
        <p><strong>Cambio entregado:</strong> {cambio} Bs</p>
      </div>

      <button className='btn-pago' onClick={() => navigate('/vista-cajero')} >Regresar a menú de cajero</button>
    </div>
  );
}
