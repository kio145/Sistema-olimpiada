import { useSearchParams } from 'react-router-dom';
import '../../css/Perfil.css';
import { Link } from 'react-router-dom';


export function PerfilEstudiante(){
    const [searchParam] = useSearchParams();
    const correo = searchParam.get('correo');
    const contrasenia = searchParam.get('contrasenia');

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

            <div className="tarjeta-competencia">
                <div className="imagen-competencia"></div>
                <div className="info-competencia">
                <strong>Astronomía - Astrofísica</strong>
                <p>Nivel: 5P</p>
                <p className="estado"><span className="punto"></span> Estado: en espera de pago</p>
                </div>
            </div>

            <div className="acciones-competencia">
                <button className="btn-buscar"><a href="/competiciones" className='btn-buscar'>Buscar más competiciones</a> </button>
                <p className="nota">Recuerde que como máximo, puede inscribirse a dos competiciones</p>
            </div>
            </div>

    )
}