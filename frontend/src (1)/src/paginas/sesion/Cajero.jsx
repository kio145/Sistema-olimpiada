import '../../css/Inicio.css';
import { Formulario } from './Formulario';
export function Cajero(){
    return (
        <div>
            <p className='titulo1'>Iniciar Sesion</p>
            <p className='titulo2'>Como Cajero</p>
            <Formulario/>
            <p className='parrafoFinal'>En caso de no tener una cuenta por favor
                <span><a href="registro-cajero" className='enlace'> Registrate</a></span> 
            </p>    
        </div>
    )
}