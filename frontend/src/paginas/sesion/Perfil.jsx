// src/paginas/sesion/PerfilEstudiante.jsx
import { useLocation, useNavigate } from 'react-router-dom';
import '../../css/Perfil.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../api/api'; 

export function PerfilEstudiante() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const user = state?.user;
  const [profile, setProfile] = useState(null);
  const [inscripciones, setInscripciones] = useState([]);

  useEffect(() => {
    if (!user) {
      // If no user in state, redirect to login
      return navigate('/login');
    }

    // 1) Fetch full competitor profile
    api.get(`/competidores/${user.id}`)
      .then(res => setProfile(res.data))
      .catch(() => {
        // token invalid or not found
        localStorage.removeItem('token');
        navigate('/login');
      });

    // 2) Fetch this user’s inscriptions (assuming you have this query param)
    api.get('/inscripciones', { params: { idcompetidor: user.id } })
      .then(res => setInscripciones(res.data))
      .catch(console.error);
  }, [user, navigate]);

  if (!profile) {
    return <p>Cargando perfil…</p>;
  }

  // Build initials from first letters
  const initials = `${profile.nombrecompetidor?.[0] || ''}${profile.apellidocompetidor?.[0] || ''}`.toUpperCase();

  return (
    <div className="perfil-container">
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
            <Link to="/editar-perfil" className="btn-editar-admin">
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
        inscripciones.map((insc) => (
          <div className="tarjeta-competencia" key={insc._inscripcion_id}>
            <div className="imagen-competencia">
              {/* puedes usar insc.competencia.imagencompetencia aquí */}
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
        ))
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
