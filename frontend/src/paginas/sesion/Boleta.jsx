import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/Boleta.css';
import { FaSearch } from 'react-icons/fa';

export function Boleta() {
  const [ciTutor, setCiTutor] = useState('');
  const [tutor, setTutor] = useState(null);
  const [monto, setMonto] = useState('');
  const [cambio, setCambio] = useState('');

  const navigate = useNavigate(); // <--- Hook de navegación

  const baseDatos = {
    '1234567': {
      nombre: 'Juan Daneo Hinojosa',
      estudiantes: [
        { nombre: 'Lidia Hinojosa Merlan', area: 'Astrofísica', nivel: '5S', costo: 15 },
      ]
    },
  };

  const buscarTutor = () => {
    const resultado = baseDatos[ciTutor];
    setTutor(resultado || null);
    setCambio('');
    setMonto('');
  };

  const calcularCambio = (e) => {
    const valor = parseFloat(e.target.value);
    setMonto(valor);
    if (tutor) {
      const total = tutor.estudiantes.reduce((sum, e) => sum + e.costo, 0);
      setCambio((valor - total).toFixed(2));
    }
  };

  const manejarAceptar = () => {
    const total = tutor.estudiantes.reduce((sum, e) => sum + e.costo, 0);
    navigate('/pago-boleta', {
      state: {
        tutor,
        total,
        monto,
        cambio
      }
    });
  };
  
  const [mostrarModal, setMostrarModal] = useState(false);

  return (
    <div className="boleta-container">
      <h2>Generando Boleta</h2>
      <p className="sub-text">
        Busque al tutor con su cédula de identidad para obtener los estudiantes afiliados a ese tutor
      </p>

      <div className="busqueda">
        <label>C.I. tutor:</label>
        <input
          type="text"
          value={ciTutor}
          onChange={(e) => setCiTutor(e.target.value)}
          placeholder="Ej. 1234567"
        />
        <button onClick={buscarTutor}><FaSearch /></button>
      </div>

      {tutor && (
        <>
          <hr />
          <div className="tutor-info">
            <label>Nombre del tutor :</label>
            <input type="text" value={tutor.nombre} readOnly />
          </div>

          <table className="tabla-estudiantes">
            <thead>
              <tr>
                <th>Competidores</th>
                <th>Area</th>
                <th>Nivel</th>
                <th>Costo</th>
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

          <div className="totales">
            <p>Total a pagar en Bs <strong>{tutor.estudiantes.reduce((sum, e) => sum + e.costo, 0)}</strong></p>
          </div>

          <div className="pago">
            <div>
              <label>Monto depositado</label>
              <input type="number" value={monto} onChange={calcularCambio} />
            </div>
            <div>
              <label>Cambio a entregar</label>
              <input type="text" value={cambio} readOnly />
            </div>
          </div>

          <div className="boton-aceptar">
            <button onClick={manejarAceptar}>Aceptar</button>
          </div>
          <div className="boton-aceptar">
            <button onClick={() => setMostrarModal(true)}>Modal</button>
          </div>

        </>
        
      )}
      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">Fecha inválida</div>
            <div className="modal-body">
              <p>El periodo de pago ha terminado, usted no puede pagar.</p>
              <button onClick={() => setMostrarModal(false)}>Aceptar</button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
}
