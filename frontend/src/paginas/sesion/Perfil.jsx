import { useLocation, useNavigate } from 'react-router-dom';
import '../../css/Perfil.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../api/api';

export function PerfilEstudiante() {
  const { state } = useLocation();
  const navigate   = useNavigate();
  const user       = state?.user;
  const [profile, setProfile]           = useState(null);
  const [inscripciones, setInscripciones] = useState([]);

  useEffect(() => {
    // Si no hay user o no tiene profile_id, volvemos a login
    if (!user?.profile_id) {
      return navigate('/login');
    }

    const competidorId = user.profile_id;

    // 1) Obtener perfil completo de competidor
    api.get(`/competidores/${competidorId}`)
      .then(res => setProfile(res.data))
      .catch(() => {
        localStorage.removeItem('token');
        navigate('/login');
      });

    // 2) Obtener inscripciones de este competidor (relacionadas con competencias)
    api.get('/inscripciones', { params: { idcompetidor: competidorId } })
      .then(res => setInscripciones(res.data))
      .catch(console.error);

  }, [user, navigate]);

  if (!profile) {
    return <p>Cargando perfil…</p>;
  }

  // Construimos iniciales
  const initials = `${profile.nombrecompetidor?.[0] || ''}${profile.apellidocompetidor?.[0] || ''}`.toUpperCase();

  return (
    <div className="perfil-container">
      {/* Cabecera */}
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
          // comprobamos que venga la relación 'competencia'
          if (!insc.competencia) return null;
          return (
            <div className="tarjeta-competencia" key={insc._inscripcion_id}>
              <div className="imagen-competencia">
                {/* <img src={insc.competencia.imagencompetencia} alt="" /> */}
              </div>
              <div className="info-competencia">
                <strong>{insc.competencia.areacompetencia}</strong>
                <p>Nivel: {insc.competencia.nivelcompetencia}</p>
                <p
                  className={`estado ${
                    insc.estado_inscripcion === 'inscrito' ? 'inscrito' : 'espera'
                  }`}
                >
                  <span className="punto" />
                  Estado:{' '}
                  {insc.estado_inscripcion === 'inscrito'
                    ? 'Inscrito'
                    : 'En espera de validación'}
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
