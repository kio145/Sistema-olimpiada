import '../../css/Inicio.css';
import { FormularioRegistro } from './FormularioRegistro';
export function RegistroCajero(){
    return (
        <div>
            <p className='titulo1'>Registrarse</p>
            <p className='titulo2'>Como Cajero</p>
            <FormularioRegistro/>
        </div>
    )
}