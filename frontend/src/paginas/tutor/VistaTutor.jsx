// VistaTutor.jsx
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import '../../css/VistaTutor.css';
import api from '../../api/api';

export function VistaTutor() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const user = state?.user;
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!user?.profile_id) {
      return navigate('/login');
    }

    const tutorId = user.profile_id;

    api.get(`/tutores/${tutorId}`)
      .then(res => setProfile(res.data))
      .catch(() => {
        localStorage.removeItem('token');
        navigate('/login');
      });
  }, [user, navigate]);

  if (!profile) {
    return <p>Cargando perfil…</p>;
  }

  const initials = `${profile.nombretutor?.[0] || ''}${profile.apellidotutor?.[0] || ''}`.toUpperCase();

  return (
    <div className="tutor-container">
      <div className="perfil-container">
        <div className="perfil-header">
          <div className="foto-perfil">
            <div className="circulo">
              <span className="inicial">{initials}</span>
            </div>
          </div>
          <div className="datos-usuario">
            <p className="rol">Tutor</p>
            <h2 className="nombre">
              {profile.nombretutor} {profile.apellidotutor}
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

        <h3 className="titulo-tabla">Listado de tus competidores :</h3>

        <div className="tabla-wrapper">
          <table className="tabla-competidores">
            <thead>
              <tr>
                <th>Nombre y Apellidos del Competidor</th>
                <th>Estado de Inscripción</th>
                <th>Estado de Validación</th>
              </tr>
            </thead>
            <tbody>
              {profile.competidores?.map((competidor, index) => {
                const estadoValidacion = competidor.pivot?.estado_validacion?.toLowerCase() || '';
                const motivoRechazoData = competidor.pivot?.motivo_rechazo || 'No disponible';

                // Determinar estado de inscripción basado en estado de validación
                let estadoInscripcion = '';
                if (estadoValidacion === 'pendiente') {
                  estadoInscripcion = 'En espera de validación';
                } else if (estadoValidacion === 'aceptado') {
                  estadoInscripcion = 'En espera de pago';
                } else if (estadoValidacion === 'rechazado') {
                  estadoInscripcion = 'Rechazado';
                }

                let claseInscripcion = '';
                if (estadoInscripcion === 'En espera de validación') {
                  claseInscripcion = 'estado-inscripcion espera-validacion';
                } else if (estadoInscripcion === 'En espera de pago') {
                  claseInscripcion = 'estado-inscripcion espera-pago';
                } else {
                  claseInscripcion = 'estado-inscripcion rechazada';
                }

                // Link según validación: ahora con navigate para pasar estado
                return (
                  <tr key={index}>
                    <td>{competidor.nombrecompetidor} {competidor.apellidocompetidor}</td>
                    <td className={claseInscripcion}>{estadoInscripcion}</td>
                    <td className={`estado-validacion ${estadoValidacion}`}>
                    {estadoValidacion === 'pendiente' && (
                      <a
                        href="#"
                        onClick={e => {
                          e.preventDefault();
                          navigate('/validar-inscripcion', { state: { tutor: profile, competidor } });
                        }}
                      >
                        Pendiente
                      </a>
                    )}

                    {estadoValidacion === 'aceptado' && (
                      <a
                        href="#"
                        onClick={e => {
                          e.preventDefault();
                          navigate('/inscripcion-aceptada', { state: { tutor: profile, competidor } });
                        }}
                      >
                        Aceptado
                      </a>
                    )}

                    {estadoValidacion === 'rechazado' && (
                      <a
                        href="#"
                        onClick={e => {
                          e.preventDefault();
                          navigate('/inscripcion-rechazada', { state: { tutor: profile, competidor, motivo_rechazo: motivoRechazoData } });
                        }}
                      >
                        Rechazado
                      </a>
                    )}
                  </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
