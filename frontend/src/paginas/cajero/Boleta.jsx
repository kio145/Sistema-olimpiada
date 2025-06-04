import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/Boleta.css';
import { FaSearch } from 'react-icons/fa';
import api from '../../api/api';  // Ajusta la ruta según donde pongas el archivo api.js


export function Boleta() {
  const [competidor, setCompetidor] = useState(null);
  const [ciCompetidor, setCiCompetidor] = useState('');
  const [monto, setMonto] = useState('');
  const [cambio, setCambio] = useState('');

  // elimina esta línea o ponla dentro de una condición
  // const inscripcionesValidadas = competidor.inscripciones.filter(insc => insc.estado_inscripcion === 'en espera de pago');

  const buscarCompetidor = async () => {
    try {
      const res = await api.get(`/competidores/ci/${ciCompetidor}`);
      const competidor = res.data;

      setCompetidor(competidor);
      setCambio('');
      setMonto('');

      const inscRes = await api.get(`/inscripciones?idcompetidor=${competidor.idcompetidor}`);
      const todasInscripciones = inscRes.data;

      const inscripcionesValidadas = todasInscripciones.filter(insc =>
        insc.estado_inscripcion === 'en espera de pago'
      );

      const estudiantes = inscripcionesValidadas.map(insc => ({
        nombre: `${competidor.nombrecompetidor} ${competidor.apellidocompetidor}`,
        area: insc.competencia?.areacompetencia,
        nivel: insc.competencia?.nivelcompetencia,
        costo: insc.competencia?.preciocompetencia || 0,
      }));

      setCompetidor({ ...competidor, estudiantes });
    } catch (error) {
      console.error('Error al buscar competidor', error);
      setCompetidor(null);
      alert('No se encontró un competidor con ese C.I.');
    }
  };

  const calcularCambio = (e) => {
    const valor = parseFloat(e.target.value);
    setMonto(valor);
    if (competidor) {
  const total = (competidor.estudiantes ?? []).reduce((sum, e) => sum + e.costo, 0);
  setCambio((valor - total).toFixed(2));
}
  };

  const manejarAceptar = () => {
    if (!competidor || !competidor.estudiantes) return;

    const total = competidor.estudiantes.reduce((sum, e) => sum + e.costo, 0);
    navigate('/pago-boleta', {
      state: {
        competidor,
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
      </p>

      <div className="busqueda">
        <label>C.I. estudiante:</label>
        <input
          type="text"
          value={ciCompetidor}
          onChange={(e) => setCiCompetidor(e.target.value)}
          placeholder="Ej. 1234567"
        />
        <button onClick={buscarCompetidor}><FaSearch /></button>
      </div>

      {competidor && (
        <>
          <hr />
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
              {competidor.estudiantes && competidor.estudiantes.length > 0 ? (
                competidor.estudiantes.map((e, index) => (
                  <tr key={index}>
                    <td>{e.nombre}</td>
                    <td>{e.area}</td>
                    <td>{e.nivel}</td>
                    <td>{e.costo} Bs</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No tiene inscripciones válidas</td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="totales">
            <p>Total a pagar en Bs <strong>{(competidor.estudiantes ?? []).reduce((sum, e) => sum + e.costo, 0)}</strong></p>
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
