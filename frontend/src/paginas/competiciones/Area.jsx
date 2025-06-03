// src/paginas/competiciones/Area.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/api';
import '../../css/Competiciones.css';

export function Area() {
  const { id }   = useParams();
  const navigate = useNavigate();
  const [c, setC]       = useState(null);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    api.get(`/competencias/${id}`)
       .then(res => setC(res.data))
       .catch(console.error);
  }, [id]);

  if (!c) return <p>Cargando…</p>;

  const {
    fechas,
    areacompetencia,
    imagencompetencia,
    preciocompetencia,
    requisitos,
    descripcion
  } = c;

  // Si no hay fechas asociadas, la inscripción NO está abierta
  let abierta = false;
  if (fechas?.fecha_inicio_inscripcion && fechas?.fecha_fin_inscripcion) {
    const hoy        = new Date().setHours(0,0,0,0);
    const inicio = new Date(fechas.fecha_inicio_inscripcion).setHours(0,0,0,0);
    const fin    = new Date(fechas.fecha_fin_inscripcion).setHours(0,0,0,0);
    abierta = hoy >= inicio && hoy <= fin;
  }

  const handleInscribir = () => {
    if (!abierta) {
      setModal(true);
      return;
    }
    // Navegar al formulario de inscripción, pasando el id de competencia
    navigate('/inscripcion', { state: { competenciaId: id } });
  };

  return (
    <main className="main-container">
      <h2>Área: {areacompetencia}</h2>

      {imagencompetencia
        ? <img
            src={`${api.defaults.baseURL}/storage/${imagencompetencia}`}
            alt={areacompetencia}
            className="area-image"
          />
        : <div className="area-image img-placeholder" />
      }

      <table className="tabla-costo">
        <tbody>
          <tr>
            <th>Costo por participante</th>
            <td>{preciocompetencia} Bs</td>
          </tr>
        </tbody>
      </table>

      <h3>Requisitos</h3>
      <ul>
        {requisitos.map(r =>
          <li key={r.requisito_id}>{r.curso}</li>
        )}
      </ul>

      <h3>Descripción</h3>
      <p>{descripcion}</p>

      <button
        onClick={handleInscribir}
        className="inscribirse-btn"
      >
        Inscribirse
      </button>

      {modal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">Fecha Inválida</div>
            <div className="modal-body">
              <p>Se encuentra fuera del periodo de inscripcion</p>
            </div>
            <div className="modal-footer">
              <button
                className="btn-cerrar"
                onClick={() => setModal(false)}
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
