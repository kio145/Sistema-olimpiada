import '../css/Barra.css';
import {CircleUser} from 'lucide-react';
import logo from '/logo.JPG';
export function Barra(){
    return (
        <div className='barraNavegacion'>
            <div className='cuadroLogo'>
                <img src={logo} alt="logo"/>
            </div>
            <div className="enlaces">
                <ul><a href="/informacion-inscripciones" className='opcion'>¿Como me inscribo?</a></ul>
                <ul><a href="/competiciones" className='opcion'>Competiciones</a></ul>
                <ul className="menu-boton">
                    <a href="#" className="opcion">
                        <CircleUser /> Iniciar Sesión
                    </a>
                    <ul className="submenu">
                    <li><a href="/sesion-estudiante">Estudiante</a></li>
                    <li><a href="/sesion-cajero">Cajero</a></li>
                    <li><a href="/sesion-admin">Administrador</a></li>
                    <li><a href="/sesion-tutor">Tutor</a></li>
                    </ul>
                </ul>
            </div>
        </div>
    )
}