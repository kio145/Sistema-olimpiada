import '../../css/Inicio.css';
import { Formulario } from './Formulario';
export function Tutor(){
    return (
        <div>
            <p className='titulo1'>Iniciar Sesion</p>
            <p className='titulo2'>Como Tutor</p>
            <Formulario/>
            <p className='parrafoFinal'>En caso de no tener una cuenta por favor
                <span><a href="registro-tutor" className='enlace'> Registrate</a></span> 
            </p>
        </div>
    )
}