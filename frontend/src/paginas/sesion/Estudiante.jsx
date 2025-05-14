import '../../css/Inicio.css';

import { Formulario } from './Formulario';
export function Estudiante(){
    return (
        <div>
            <p className='titulo1'>Iniciar Sesion</p>
            <p className='titulo2'>Como Estudiante</p>
            <Formulario/>
            <p className='parrafoFinal'>En caso de no tener una cuenta por favor
                
                   <ul>
                        <a href="registro" className="opcion">Registrarse</a>
                    <ul className="submenu">
                    <li><a href="/regsitro">Estudiante</a></li>
                    <li><a href="/registro-tutor">Tutor</a></li>
                    </ul>
                   </ul>
            </p>
        </div>
    )
}