import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/VistaTutor.css';
import { FiMonitor, FiCalendar, FiClipboard } from 'react-icons/fi';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../api/api';


export function VistaTutor() {
	const { state } = useLocation();
  const navigate   = useNavigate();
  const user       = state?.user;
 	const [profile, setProfile]           = useState(null);
  const [inscripciones, setInscripciones] = useState([]);
	const [competidores, setCompetidores] = useState([]);
	const [tutores, setTutores] = useState([]);
	const [loading, setLoading] = useState(true)

	const tutorId = user.profile_id;
	
	  useEffect(() => {
    if (!user?.profile_id) {
      return navigate('/login');
    }

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
	    });},[user, navigate]);

  return (
    <div className="tutor-container">
        <div className="perfil-header">
            <img className="foto-perfil" src="URL_IMAGEN" alt="Foto del tutor" />
            <div className="datos-usuario">
            <p className="rol">Tutor</p>
            <h2 className="nombre">Dayra Luis
	    </h2>
            <p className="area">Area</p>
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
			<td className="estado-inscripcion">{comp.estado_inscripcion}</td>
			<td className="estado-validacion">
      {
        (()=>{
          switch (comp.estado_validacion?.toLowerCase()){
            case 'pendiente':
              return<Link to={`/validar-inscripcion/${comp._inscripcion_id}`}>Pendiente</Link>;
            case 'rechazado':
              return<Link to="/inscripcion-rechazada">Rechazado</Link>;
            case 'aceptado':
              return<Link to="/inscripcion-aceptada">Aceptada</Link>;
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
