import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../../css/VistaTutor.css';
import api from '../../api/api';

export function VistaTutor() {
  const { state } = useLocation();
  const navigate   = useNavigate();
  const user       = state?.user;
  const [profile, setProfile]           = useState(null);

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
      {/* Cabecera */}
        <div className="perfil-container">
      {/* Cabecera */}
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

  // Determinar estado de inscripción basado en estado de validación
  let estadoInscripcion = '';
  if (estadoValidacion === 'pendiente') {
    estadoInscripcion = 'En espera de validación';
  } else if (estadoValidacion === 'aceptada') {
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

  // Link según validación
  let link = '#';
  if (estadoValidacion === 'pendiente') {
    link = '/validar-inscripcion';
  } else if (estadoValidacion === 'aceptada') {
    link = '/inscripcion-aceptada';
  } else if (estadoValidacion === 'rechazado') {
    link = '/inscripcion-rechazada';
  }

  return (
    <tr key={index}>
      <td>{competidor.nombrecompetidor} {competidor.apellidocompetidor}</td>
      <td className={claseInscripcion}>{estadoInscripcion}</td>
      <td className={`estado-validacion ${estadoValidacion}`}>
        <a href={link}>{estadoValidacion.charAt(0).toUpperCase() + estadoValidacion.slice(1)}</a>
      </td>
    </tr>
  );
})}

</tbody>

            </table>
            <script>
                
            </script>
        </div>
        </div>
      </div> 
  );
}
