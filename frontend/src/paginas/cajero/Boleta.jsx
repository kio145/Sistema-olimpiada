// src/paginas/cajero/Boleta.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/Boleta.css';
import api from '../../api/api'; // Axios configurado con baseURL y token

import { FaSearch } from 'react-icons/fa';

export function Boleta() {
  const [ciTutor, setCiTutor]           = useState('');
  const [tutor, setTutor]               = useState(null);
  const [estudiantes, setEstudiantes]   = useState([]); 
  const [monto, setMonto]               = useState('');
  const [cambio, setCambio]             = useState('');
  const [error, setError]               = useState('');
  const [cajero, setCajero]             = useState(null);

  const navigate = useNavigate();

  // 0) Al montar, consultamos “/cajeros/me” para saber qué cajero está logueado
  useEffect(() => {
    api.get('/cajeros/me')
      .then(res => {
        setCajero(res.data);
      })
      .catch(err => {
        console.error('No se pudo identificar al cajero:', err);
        setError('Error al identificar al cajero. Vuelve a iniciar sesión.');
      });
  }, []);

  const buscarTutor = async () => {
    setError('');
    setTutor(null);
    setEstudiantes([]);
    setMonto('');
    setCambio('');

    if (!ciTutor.trim()) {
      setError('Por favor ingresa la cédula del tutor.');
      return;
    }

    try {
      // 1) Obtener lista completa de tutores
      const resTutores = await api.get('/tutores');
      const todosTut   = resTutores.data;

      // Filtrar por “citutor” (string)
      const encontrado = todosTut.find(t => String(t.citutor) === ciTutor.trim());
      if (!encontrado) {
        setError('No se encontró ningún tutor con esa cédula.');
        return;
      }

      // 2) Obtener todas las validaciones (con “competidor” y “competencia”)
      const resValidaciones = await api.get('/validarTutor');
      const allValid        = resValidaciones.data;

      // 3) Filtrar solo aquellas filas de este tutor con estado “validado”
      const validDelTutor = allValid.filter(v =>
        v.idtutor === encontrado.idtutor && v.estado_validacion === 'validado'
      );

      if (validDelTutor.length === 0) {
        setError('Este tutor no tiene competidores habilitados para pago.');
        return;
      }

      // 4) Por cada validación “validado”, buscar su inscripción exacta
      const listaEst = [];
      for (let v of validDelTutor) {
        // GET /inscripciones?idcompetidor=XX&idcompetencia=YY
        const resInsc = await api.get('/inscripciones', {
          params: {
            idcompetidor:   v.idcompetidor,
            idcompetencia:  v.idcompetencia
          }
        });
        const inscs = resInsc.data;
        if (inscs.length === 0) {
          continue; // en teoría, ya debería haber inscripción
        }
        const insc = inscs[0];

        listaEst.push({
          nombre:        `${v.competidor.nombrecompetidor} ${v.competidor.apellidocompetidor}`,
          area:          v.competencia.areacompetencia,
          nivel:         v.competencia.nivelcompetencia,
          costo:         v.competencia.preciocompetencia,
          inscripcionId: insc._inscripcion_id,
          idcompetidor:  v.idcompetidor
        });
      }

      if (listaEst.length === 0) {
        setError('No hay inscripciones válidas asociadas a este tutor.');
        return;
      }

      setTutor(encontrado);
      setEstudiantes(listaEst);

    } catch (e) {
      console.error('Error al buscar tutor o validaciones:', e);
      setError('Hubo un problema al conectarse con el servidor.');
    }
  };

  const calcularCambio = e => {
    const valor = parseFloat(e.target.value);
    setMonto(e.target.value);

    if (isNaN(valor) || estudiantes.length === 0) {
      setCambio('');
      return;
    }
    const total = estudiantes.reduce((sum, est) => sum + est.costo, 0);
    setCambio((valor - total).toFixed(2));
  };

  const manejarAceptar = async () => {
    setError('');

    if (!cajero) {
      setError('No se ha identificado al cajero.');
      return;
    }
    if (!tutor || estudiantes.length === 0) {
      setError('No hay datos para procesar.');
      return;
    }

    const total = estudiantes.reduce((sum, est) => sum + est.costo, 0);
    if (parseFloat(monto) < total) {
      setError('El monto depositado es menor al total a pagar.');
      return;
    }

    try {
      // 5) Por cada estudiante, creamos un registro en boleta_pago y actualizamos la inscripción
      for (let est of estudiantes) {
        // 5.1) Crear boleta_pago
        await api.post('/boleta-pagos', {
          // Nota: “idboleta” lo autogenera Eloquent porque es autoincrement
          idcajero:      cajero.idcajero,
          idcompetidor:  est.idcompetidor,
          fecha_emision: new Date().toISOString().split('T')[0], // YYYY-MM-DD
          montototal:    est.costo,
          id_tutor:      tutor.idtutor
        });

        // 5.2) Actualizar la inscripción para que quede “inscrito”
        await api.put(`/inscripciones/${est.inscripcionId}`, {
          estado_inscripcion: 'inscrito'
        });
      }

      // 6) Una vez creado todo, navegamos a la pantalla de pago exitoso
      navigate('/pago-boleta', {
        state: {
          tutor: {
            nombre: (tutor.nombrecajero 
                      ? `${tutor.nombrecajero} ${tutor.apellidocajero}` 
                      : `${tutor.nombretutor} ${tutor.apellidotutor}`),
            estudiantes: estudiantes.map(est => ({
              nombre: est.nombre,
              area:   est.area,
              nivel:  est.nivel,
              costo:  est.costo
            }))
          },
          total,
          monto:   parseFloat(monto),
          cambio:  parseFloat(monto) - total
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
        <label>Cédula del Tutor:</label>
        <input
          type="text"
          value={ciTutor}
          onChange={e => setCiTutor(e.target.value)}
          placeholder="Ej. 1234567"
        />
        <button onClick={buscarTutor}><FaSearch /></button>
      </div>

      {tutor && (
        <>
          <hr />
          <h3>
            Tutor: {tutor.nombrecajero 
                      ? `${tutor.nombrecajero} ${tutor.apellidocajero}` 
                      : `${tutor.nombretutor} ${tutor.apellidotutor}` }
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
              {estudiantes.map((est, i) => (
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
            <p>
              Total a pagar: <strong>
                {estudiantes.reduce((sum, e) => sum + e.costo, 0)} Bs
              </strong>
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
    </div>
  );
}

export default Boleta;
