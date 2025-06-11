// src/paginas/competiciones/Area.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/api';
import '../../css/Competiciones.css';

// Función para mostrar fecha en formato DD/MM/YYYY
// Nueva función: no usa new Date, solo formatea la cadena
function formatoFecha(fecha) {
  if (!fecha) return '';
  const [y, m, d] = fecha.split('-');
  return `${d}/${m}/${y}`;
}


export function Area() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [c, setC] = useState(null);
  const [modal, setModal] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get(`/competencias/${id}`)
      .then(res => setC(res.data))
      .catch(err => {
        console.error('Error al cargar la competencia:', err);
        setError('No se pudo cargar los datos del área.');
      });
  }, [id]);

  if (error) return <p className="error">{error}</p>;
  if (!c) return <p>Cargando…</p>;

  // Extraigo los campos necesarios de la respuesta
  const {
    areacompetencia,
    imagencompetencia,
    preciocompetencia,
    descripcion,
    requisitos,
    fechas
  } = c;

  // Determino si la inscripción está abierta según fechas.fecha_inicio_inscripcion y fecha_fin_inscripcion
  let abierta = false;
if (
  fechas &&
  fechas.fecha_inicio_inscripcion &&
  fechas.fecha_fin_inscripcion
) {
  // Forzamos la hora a medianoche para evitar desfase de zona horaria
  const hoy    = new Date();
  hoy.setHours(0, 0, 0, 0);

  const inicio = new Date(fechas.fecha_inicio_inscripcion + 'T00:00:00');
  const fin    = new Date(fechas.fecha_fin_inscripcion + 'T00:00:00');
  abierta = hoy >= inicio && hoy <= fin;
}


  const handleInscribir = () => {
    if (!abierta) {
      setModal(true);
      return;
    }
    navigate('/inscripcion', {
      state: {
        competenciaId: id,
        area: areacompetencia
      }
    });
  };

  return (
    <main className="area-container">
      <h2>Área: {areacompetencia}</h2>

      {imagencompetencia ? (
        <img
          src={`${api.defaults.baseURL}/storage/${imagencompetencia}`}
          alt={areacompetencia}
          className="area-image"
        />
      ) : (
        <div className="area-image img-placeholder" />
      )}

      <table className="tabla-costo">
        <tbody>
          <tr>
            <th>Costo por participante</th>
            <td>{preciocompetencia} Bs</td>
          </tr>
        </tbody>
      </table>

      <h3>Requisitos</h3>
      <ul className="lista-requisitos">
        {requisitos.map(r => (
          <li key={r.requisito_id}>{r.curso}</li>
        ))}
      </ul>

      <h3>Descripción</h3>
      <p>{descripcion}</p>

      <button onClick={handleInscribir} className="inscribirse-btn">
        Inscribirse
      </button>

      {modal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">Fecha Inválida</div>
            <div className="modal-body">
              <p>Se encuentra fuera del período de inscripción.</p>
              {fechas?.fecha_inicio_inscripcion && fechas?.fecha_fin_inscripcion && (
                <p>
                  El período de inscripción es del{' '}
                  <b>{formatoFecha(fechas.fecha_inicio_inscripcion)}</b> al{' '}
                  <b>{formatoFecha(fechas.fecha_fin_inscripcion)}</b>
                </p>
              )}
            </div>
            <div className="modal-footer">
              <button className="btn-cerrar" onClick={() => setModal(false)}>
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
export default Area;
