import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/VistaTutor.css';
import { FiMonitor, FiCalendar, FiClipboard } from 'react-icons/fi';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../api/api';


export function VistaTutor() {
	const user = JSON.parse(localStorage.getItem('user'));
	const role = localStorage.getItem('role');
  const navigate   = useNavigate();
 	const [profile, setProfile]           = useState(null);
  const [inscripciones, setInscripciones] = useState([]);
	const [competidores, setCompetidores] = useState([]);
	const [tutores, setTutores] = useState([]);
	const [loading, setLoading] = useState(true)

  const formatearEstado = (estado) =>{
	if(!estado) return 'desconocido';
	return estado.toLowerCase().replace(/\s+/g, '-');
};

	  useEffect(() => {
    if (!user || role !== 'tutor') {
      return navigate('/login');
    }

	const tutorId = user.profile_id;

    api.get(`/tutores/${tutorId}`)
      .then(res => setProfile(res.data))
      .catch(() => {
        localStorage.removeItem('token');
        navigate('/login');
      });

      api.get(`/tutores/${tutorId}/competidores`)
      .then(res => setCompetidores(res.data))
      .catch(() => {
        console.error('Error', error);
	    setLoading(false);
	    });},[user, role, navigate]);
	if(!user||!profile) return <p>Cargando datos de tutor...</p>

  return (
    <div className="tutor-container">
        <div className="perfil-header">
            <img className="foto-perfil" src="URL_IMAGEN" alt="Foto del tutor" />
            <div className="datos-usuario">
            <p className="rol">Tutor</p>
            <h2 className="nombre">{profile.nombretutor} {profile.apellidotutor}
	    </h2>
            <p className="area">{profile.area}</p>
            <div className="acciones">
            <Link to="/editar-perfil" className="btn-editar-admin">
                    Editar perfil ✎
                    </Link>
                    <Link to="/inicio" className="btn-cerrar-admin">
                    Cerrar Sesión
                    </Link></div>
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
                {competidores.map((comp)=>(
		<tr key={comp.idcompetidor}>
			<td>{comp.nombrecompetidor} {comp.apellidocompetidor}</td>
			<td className={`estado-inscripcion ${(comp.estado_inscripcion).toLowerCase().replace(/\s+/g, '-')}`}>{comp.estado_inscripcion}</td>
			<td className={`estado-validacion ${(comp.estado_validacion).toLowerCase().replace(/\s+/g, '-')}`}>
      {
        (()=>{
          switch (comp.estado_validacion?.toLowerCase()){
	    case 'pendiente':
              return<Link to={`/validar-inscripcion/${comp._inscripcion_id}`}>Pendiente</Link>;
            case 'rechazado':
              return<Link to={`/inscripcion-rechazada/${comp._inscripcion_id}`}>Rechazado</Link>;
            case 'aceptado':
              return<Link to={`/inscripcion-aceptada/${comp._inscripcion_id}`}>Aceptada</Link>;
            default:
              return comp.estado_validacion || 'Desconocido';
          }
        })()
      }</td>
		</tr>
		))}
            </tbody>
            </table>
            <script>
                
            </script>
        </div>
        </div>

  );
}
