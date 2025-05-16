import { useSearchParams } from 'react-router-dom';
import '../../css/Perfil.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../api/api'; // Tu instancia de Axios

export function PerfilEstudiante(){
    const [searchParam] = useSearchParams();
    const correo = searchParam.get('correo');
    const contrasenia = searchParam.get('contrasenia');
const [competencias, setCompetencias] = useState([]);

useEffect(() => {
    api.get('/competencias-inscripcion')
        .then(response => setCompetencias(response.data))
        .catch(error => console.error('Error al obtener competencias:', error));
}, []);

    return (
        <div className="perfil-container">
            <div className="perfil-header">
            <div className="foto-perfil">
                <div className="circulo">
                    <span className="inicial">X</span>
                </div>
                </div>
            <div className="datos-usuario">
                <p className="rol">Estudiante</p>
                <h2 className="nombre">Dayra Damian Grageda</h2>
                <div className="botones-admin">
                    <Link to="/editar-perfil" className="btn-editar-admin">
                    Editar perfil ✎
                    </Link>
                    <Link to="/inicio" className="btn-cerrar-admin">
                    Cerrar Sesión
                    </Link>
                </div>
                </div>
            </div>

            <hr />

            <p className="inscripcion-titulo">Áreas a la que se ha inscrito :</p>

{competencias.length === 0 ? (
  <p>No hay competencias registradas.</p>
                ) : (
                competencias.map((comp, index) => (
                    <div className="tarjeta-competencia" key={index}>
                    <div className="imagen-competencia"></div>
                    <div className="info-competencia">
                        <strong>{comp.nombrecompetencia}</strong>
                        <p>Nivel: {comp.nivelcompetencia}</p>
                        <p className={`estado ${comp.estadoinscripcion === 'inscrito' ? 'inscrito' : 'espera'}`}>
                        <span className="punto"></span> Estado:{" "}
                        {comp.estadoinscripcion === 'inscrito' ? "Inscrito" : "En espera de pago"}
                        </p>
                    </div>
                    </div>
                ))
                )}

            <div className="acciones-competencia">
                <button className="btn-buscar"><a href="/competiciones" className='btn-buscar'>Buscar más competiciones</a> </button>
                <p className="nota">Recuerde que como máximo, puede inscribirse a dos competiciones</p>
            </div>
            </div>

    )
}