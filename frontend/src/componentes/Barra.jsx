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
                <ul><CircleUser /><a href="/sesion-estudiante" className='opcion'>Iniciar Sesion</a>
                </ul>
            </div>
        </div>
    )
}