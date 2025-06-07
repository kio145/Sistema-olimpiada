// src/paginas/cajero/Boleta.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/Boleta.css';
import api from '../../api/api';
import { FaSearch } from 'react-icons/fa';

export function Boleta() {
  const [ciCompetidor, setCiCompetidor] = useState('');
  const [competidor, setCompetidor]     = useState(null);
  const [inscripciones, setInscripciones] = useState([]);
  const [monto, setMonto]               = useState('');
  const [cambio, setCambio]             = useState('');
  const [error, setError]               = useState('');
  const [cajero, setCajero]             = useState(null);

  // Fechas de pago
  const [fechaInicioPago, setFechaInicioPago] = useState(null);
  const [fechaFinPago, setFechaFinPago] = useState(null);
  const [fechasCargadas, setFechasCargadas] = useState(false);
  const [mostrarFueraDeRango, setMostrarFueraDeRango] = useState(false);

  const navigate = useNavigate();

  // 0) Al montar, consultamos “/cajeros/me” para identificar al cajero logueado
  useEffect(() => {
    api.get('/cajeros/me')
      .then(res => setCajero(res.data))
      .catch(err => {
        console.error('No se pudo identificar al cajero:', err);
        setError('Error al identificar al cajero. Vuelve a iniciar sesión.');
      });
    // ① Pedimos las fechas globales
    api.get('/fechas')
      .then(res => {
        // Asumiendo que solo hay un registro
        const fechas = Array.isArray(res.data) ? res.data[0] : res.data;
        if (fechas) {
          setFechaInicioPago(new Date(fechas.fecha_inicio_pago));
          setFechaFinPago(new Date(fechas.fecha_fin_pago));
          setFechasCargadas(true);
        }
      })
      .catch(err => {
        setError('No se pudo obtener el rango de fechas de pago.');
      });
  }, []);

  // Modal de rango fuera de fechas
  function verificarRango() {
    if (!fechasCargadas) return false;
    const ahora = new Date();
    if (
      fechaInicioPago instanceof Date &&
      fechaFinPago instanceof Date &&
      (ahora < fechaInicioPago || ahora > fechaFinPago)
    ) {
      setMostrarFueraDeRango(true);
      return false;
    }
    return true;
  }

  const buscarCompetidor = async () => {
    setError('');
    setCompetidor(null);
    setInscripciones([]);
    setMonto('');
    setCambio('');

    // ── ① Verificar fechas antes de buscar ──
    if (!verificarRango()) return;

    if (!ciCompetidor.trim()) {
      setError('Por favor ingresa la cédula del competidor.');
      return;
    }

    try {
      // 1) Llamamos al nuevo endpoint que definimos: GET /api/competidores/ci/{ciCompetidor}
      const resComp = await api.get(`/competidores/ci/${ciCompetidor.trim()}`);
      const encontrado = resComp.data;

      // 2) Obtener todas las validaciones (con “competidor” y “competencia” pre-cargadas)
      const resValidaciones = await api.get('/validarTutor');
      const allValid = resValidaciones.data;

      // 3) Filtrar solo aquellas filas para este competidor con estado “validado”
      const validDelCompetidor = allValid.filter(v =>
        v.idcompetidor === encontrado.idcompetidor && v.estado_validacion === 'validado'
      );

      if (validDelCompetidor.length === 0) {
        setError('Este competidor no tiene inscripciones validadas para pago.');
        return;
      }

      // 4) Por cada validación “validado”, buscar su inscripción exacta
      const listaIns = [];
      for (let v of validDelCompetidor) {
        const resInsc = await api.get('/inscripciones', {
          params: {
            idcompetidor:  v.idcompetidor,
            idcompetencia: v.idcompetencia
          }
        });
        const inscs = resInsc.data;
        if (inscs.length === 0) continue;
        const insc = inscs[0];

        listaIns.push({
          nombre:        `${encontrado.nombrecompetidor} ${encontrado.apellidocompetidor}`,
          area:          v.competencia.areacompetencia,
          nivel:         v.competencia.nivelcompetencia,
          costo:         v.competencia.preciocompetencia,
          inscripcionId: insc._inscripcion_id,
          idcompetidor:  v.idcompetidor,
          idtutor:       v.idtutor
        });
      }

      if (listaIns.length === 0) {
        setError('No hay inscripciones válidas asociadas a este competidor.');
        return;
      }

      setCompetidor(encontrado);
      setInscripciones(listaIns);

    } catch (e) {
      console.error('Error al buscar competidor o validaciones:', e);
      setError('Hubo un problema al conectarse con el servidor.');
    }
  };

  const calcularCambio = e => {
    const valor = parseFloat(e.target.value);
    setMonto(e.target.value);
    if (isNaN(valor) || inscripciones.length === 0) {
      setCambio('');
      return;
    }
    const total = inscripciones.reduce((sum, ins) => sum + ins.costo, 0);
    setCambio((valor - total).toFixed(2));
  };

  const manejarAceptar = async () => {
    setError('');

    // ── ② Verificar fechas antes de aceptar pago ──
    if (!verificarRango()) return;

    if (!cajero) {
      setError('No se ha identificado al cajero.');
      return;
    }
    if (!competidor || inscripciones.length === 0) {
      setError('No hay datos para procesar.');
      return;
    }

    const total = inscripciones.reduce((sum, ins) => sum + ins.costo, 0);
    if (parseFloat(monto) < total) {
      setError('El monto depositado es menor al total a pagar.');
      return;
    }

    try {
      // 5) Por cada inscripción, creamos un registro en boleta_pago y actualizamos inscripción
      for (let ins of inscripciones) {
        await api.post('/boleta-pagos', {
          idcajero:      cajero.idcajero,
          idcompetidor:  ins.idcompetidor,
          fecha_emision: new Date().toISOString().split('T')[0], // YYYY-MM-DD
          montototal:    ins.costo,
          id_tutor:      ins.idtutor
        });

        await api.put(`/inscripciones/${ins.inscripcionId}`, {
          estado_inscripcion: 'inscrito'
        });
      }

      navigate('/pago-boleta', {
        state: {
          tutor: {
            nombre: `${competidor.nombrecompetidor} ${competidor.apellidocompetidor}`,
            estudiantes: inscripciones.map(ins => ({
              nombre: ins.nombre,
              area:   ins.area,
              nivel:  ins.nivel,
              costo:  ins.costo
            }))
          },
          total,
          monto:  parseFloat(monto),
          cambio: parseFloat(monto) - total
        }
      });

    } catch (e) {
      console.error('Error al registrar boletas o actualizar inscripción:', e);
      setError('Ocurrió un problema al guardar la boleta o actualizar la inscripción.');
    }
  };

  return (
    <div className="boleta-container">
      <h2>Generar Boleta de Pago</h2>

      {error && <p className="error">{error}</p>}

      <div className="busqueda">
        <label>Cédula del Competidor:</label>
        <input
          type="text"
          value={ciCompetidor}
          onChange={e => setCiCompetidor(e.target.value)}
          placeholder="Ej. 1234567"
        />
        <button onClick={buscarCompetidor}><FaSearch /></button>
      </div>

      {competidor && (
        <>
          <hr />
          <h3>
            Competidor: {competidor.nombrecompetidor} {competidor.apellidocompetidor}
          </h3>

          <table className="tabla-estudiantes">
            <thead>
              <tr>
                <th>Competidor</th>
                <th>Área</th>
                <th>Nivel</th>
                <th>Costo (Bs)</th>
              </tr>
            </thead>
            <tbody>
              {inscripciones.map((ins, i) => (
                <tr key={i}>
                  <td>{ins.nombre}</td>
                  <td>{ins.area}</td>
                  <td>{ins.nivel}</td>
                  <td>{ins.costo}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="totales">
            <p>
              Total a pagar: <strong>{inscripciones.reduce((sum, i) => sum + i.costo, 0)} Bs</strong>
            </p>
          </div>

          <div className="pago">
            <div className="campo-pago">
              <label>Monto depositado (Bs)</label>
              <input
                type="number"
                value={monto}
                onChange={calcularCambio}
                placeholder="0.00"
              />
            </div>
            <div className="campo-pago">
              <label>Cambio a entregar (Bs)</label>
              <input
                type="text"
                value={cambio}
                readOnly
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="boton-aceptar">
            <button onClick={manejarAceptar}>
              Aceptar y Generar Boleta
            </button>
          </div>
        </>
      )}

      {/* ────────────────────────────────────────────── */}
      {/* Modal fuera de fecha de pago */}
      {mostrarFueraDeRango && (
        <div className="modal-overlay">
          <div className="modal-contenido">
            <h3>Fuera de Fecha de Pago</h3>
            <p>
              El pago solo está permitido entre{" "}
              <strong>
                {fechaInicioPago && fechaInicioPago.toLocaleDateString()}
              </strong>{" "}
              y{" "}
              <strong>
                {fechaFinPago && fechaFinPago.toLocaleDateString()}
              </strong>
              .<br />
              Hoy es <strong>{new Date().toLocaleDateString()}</strong>.
            </p>
            <div className="modal-botones">
              <button onClick={() => setMostrarFueraDeRango(false)}>
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}
      {/* ────────────────────────────────────────────── */}
    </div>
  );
}

export default Boleta;
