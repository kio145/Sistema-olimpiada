import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/Inicio.css';
import imagenCuadro from '/imagenInicio.JPG';
import api from '@/api/api';

export function Inicio() {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [fechas, setFechas] = useState({ inicio: '', fin: '' });

  // Cargar fechas de inscripción
  useEffect(() => {
    api.get('/fechas')
      .then(res => {
        const f = Array.isArray(res.data) && res.data.length > 0 ? res.data[0] : {};
        setFechas({
          inicio: f.fecha_inicio_inscripcion ?? '',
          fin:    f.fecha_fin_inscripcion ?? ''
        });
      })
      .catch(() => setFechas({ inicio: '', fin: '' }));
  }, []);

  return (
    <div className="contenedorInicio">
      <div className="contenedorImagen">
        <img src={imagenCuadro} alt="imagen" />
      </div>
      <div className="contenedorTexto">
        <p className="titulo1">Olimpiadas Cientificas 2025</p>
        <p className="titulo2">Facultad de Ciencias y Tecnología - UMSS</p>
        <div>
          <p className="parrafo">
            Bienvenido al portal oficial de inscripciones para las Olimpiadas Cientificas organizadas por la Facultad de Ciencias y Tecnologia de la Universidad Mayor de San Simon
          </p>
          <p className="parrafo">
            Este espacio está diseñado para que estudiantes de primaria y secundaria de Cochabamba participen en un evento donde la ciencia, la tecnología y la creatividad se unen para inspirar el futuro.
          </p>
        </div>
        <div>
          <p className="titulo3">¿Quieres ser parte?</p>
          <div className="parrafo">
            Para inscribirse a algunas de las áreas de competencia, solo necesitas
            <Link to="/login" className="enlace"> Iniciar Sesión</Link> o{' '}
            <button
              className="opcion boton-registrarse"
              type="button"
              onClick={() => setMostrarModal(true)}
            >
              Registrarse
            </button>
          </div>
        </div>
        <div>
          <p className="titulo3">Fecha de Inscripciones</p>
          <p className="parrafo">
            Inicio: <b>{fechas.inicio ? fechas.inicio : 'Por definir'}</b>
          </p>
          <p className="parrafo">
            Fin: <b>{fechas.fin ? fechas.fin : 'Por definir'}</b>
          </p>
        </div>
        <div className="prueba"></div>
      </div>

      {/* MODAL REGISTRO */}
      {mostrarModal && (
        <div className="modal-overlay" onClick={() => setMostrarModal(false)}>
          <div className="modal-menu" onClick={e => e.stopPropagation()}>
            <h3>¿Registrar como?</h3>
            <Link to="/registro" className="modal-link" onClick={() => setMostrarModal(false)}>
              Estudiante
            </Link>
            <Link to="/registro-tutor" className="modal-link" onClick={() => setMostrarModal(false)}>
              Tutor
            </Link>
            <button className="modal-cerrar" onClick={() => setMostrarModal(false)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}
