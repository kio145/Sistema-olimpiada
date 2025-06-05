// src/paginas/cajero/Pago.jsx

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../css/Pago.css';

export function Pago() {
  const location = useLocation();
  const navigate = useNavigate();
  const { tutor, total, monto, cambio } = location.state || {};

  // Si el usuario entró directo a /pago-boleta sin pasar por la boleta
  if (!tutor) {
    return (
      <div className="pago-container">
        <h2>Error</h2>
        <p>No hay datos para procesar el pago. Genera primero la boleta.</p>
        <button onClick={() => navigate('/generar-boleta')}>
          Volver a Generar Boleta
        </button>
      </div>
    );
  }

  return (
    <div className="pago-container">
      <h2 className="titulo-pago">Pago realizado con éxito</h2>
      <p>Se ha emitido la siguiente boleta de pago:</p>
      <hr />

      <div className="boleta-detalle">
        <h3>BOLETA DE PAGO</h3>
        <table>
          <thead>
            <tr>
              <th>Competidor</th>
              <th>Área</th>
              <th>Nivel</th>
              <th>Costo (Bs)</th>
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

        <p>
          <strong>Costo total:</strong> {total} Bs
        </p>
        <p>
          <strong>Monto pagado:</strong> {monto} Bs
        </p>
        <p>
          <strong>Cambio entregado:</strong> {cambio} Bs
        </p>
      </div>

      <button className="btn-pago" onClick={() => navigate('/vista-cajero')}>
        ← Regresar al menú de cajero
      </button>
    </div>
  );
}

export default Pago;
