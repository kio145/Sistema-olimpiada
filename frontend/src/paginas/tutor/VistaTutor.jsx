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
                {/* Mapea competidores desde props/datos aquí */}
                <tr>
                <td>Catalina Ramirez Herrera</td>
                <td className="estado-inscripcion espera-validacion">En espera de validación</td>
                <td className="estado-validacion pendiente">
                    <a href="validar-inscripcion">Pendiente</a>
                    </td>
                </tr>
                <tr>
                <td>Romeo Luis Escalera Valverde</td>
                <td className="estado-inscripcion espera-pago">En espera de pago</td>
                <td className="estado-validacion aceptada">
                   <a href="inscripcion-aceptada"> Aceptada</a></td>
                </tr>
                <tr>
                <td>Lizbeth Jimenez Aranibar</td>
                <td className="estado-inscripcion espera-pago">Rechazado</td>
                <td className="estado-validacion aceptada">
                   <a href="inscripcion-rechazada"> Rechazada</a></td>
                </tr>
                {/* ...más filas */}
            </tbody>
            </table>
            <script>
                
            </script>
        </div>
        </div>
      </div> 
  );
}
