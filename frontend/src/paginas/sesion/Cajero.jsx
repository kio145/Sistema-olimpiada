import '../../css/Inicio.css';
import { Formulario } from './Formulario';
export function Cajero(){
    return (
        <div>
            <p className='titulo1'>Iniciar Sesion</p>
            <p className='titulo2'>Como Cajero</p>
            <Formulario/>
            <p className='parrafoFinal'>Su contrasenia le sera dada por el administrador</p>
        </div>
    )
}