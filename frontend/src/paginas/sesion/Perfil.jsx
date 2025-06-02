// src/paginas/sesion/PerfilEstudiante.jsx

import { useLocation, useNavigate, Link } from 'react-router-dom';
import '../../css/Perfil.css';
import { useEffect, useState } from 'react';
import api from '../../api/api';

export function PerfilEstudiante() {
  const { state } = useLocation();
  const navigate   = useNavigate();
  const user       = state?.user;
  const [profile, setProfile] = useState(null);
  const [inscripciones, setInscripciones] = useState([]);

  useEffect(() => {
    if (!user?.profile_id) {
      return navigate('/login');
    }
    const competidorId = user.profile_id;

    // 1) Cargo datos del competidor
    api.get(`/competidores/${competidorId}`)
      .then(res => setProfile(res.data))
      .catch(() => {
        localStorage.removeItem('token');
        navigate('/login');
      });

    // 2) Cargo sus inscripciones
    api.get('/inscripciones', { params: { idcompetidor: competidorId } })
      .then(res => setInscripciones(res.data))
      .catch(console.error);

  }, [user, navigate]);

  if (!profile) {
    return <p>Cargando perfil…</p>;
  }

  const initials = (
    (profile.nombrecompetidor?.[0] || '') +
    (profile.apellidocompetidor?.[0] || '')
  ).toUpperCase();

  return (
    <div className="perfil-container">
      {/* Cabecera del estudiante */}
      <div className="perfil-header">
        <div className="foto-perfil">
          <div className="circulo">
            <span className="inicial">{initials}</span>
          </div>
        </div>
        <div className="datos-usuario">
          <p className="rol">Estudiante</p>
          <h2 className="nombre">
            {profile.nombrecompetidor} {profile.apellidocompetidor}
          </h2>
          <div className="botones-admin">
            <Link
              to="/editar-perfil"
              className="btn-editar-admin"
              state={{ user }}
            >
              Editar perfil ✎
            </Link>
            <Link
              to="/inicio"
              className="btn-cerrar-admin"
              onClick={() => {
                localStorage.removeItem('token');
                navigate('/inicio');
              }}
            >
              Cerrar Sesión
            </Link>
          </div>
        </div>
      </div>

      <hr />

      <p className="inscripcion-titulo">Áreas a las que te has inscrito:</p>

      {inscripciones.length === 0 ? (
        <p>No te has inscrito en ninguna competencia aún.</p>
      ) : (
        inscripciones.map(insc => {
          if (!insc.competencia) return null;

          // Determino el texto según el estado real en la BD:
          let textoEstado = '';
          if (insc.estado_inscripcion === 'inscrito') {
            textoEstado = 'Inscrito';
          } else if (insc.estado_inscripcion === 'rechazado') {
            textoEstado = 'Rechazado';
          } else {
            textoEstado = 'En espera de validación';
          }

          return (
            <div className="tarjeta-competencia" key={insc._inscripcion_id}>
              <div className="imagen-competencia">
                {/* Si maneja imagen:
                <img
                  src={`${api.defaults.baseURL}/storage/${insc.competencia.imagencompetencia}`}
                  alt={insc.competencia.areacompetencia}
                /> */}
              </div>
              <div className="info-competencia">
                <strong>{insc.competencia.areacompetencia}</strong>
                <p>Nivel: {insc.competencia.nivelcompetencia}</p>
                <p className={`estado ${insc.estado_inscripcion}`}>
                  <span className="punto" />
                  Estado: {textoEstado}
                </p>
              </div>
            </div>
          );
        })
      )}

      <div className="acciones-competencia">
        <Link to="/competiciones" className="btn-buscar">
          Buscar más competiciones
        </Link>
        <p className="nota">
          Recuerda que como máximo puedes inscribirte a dos competiciones.
        </p>
      </div>
    </div>
  );
}

export default PerfilEstudiante;
