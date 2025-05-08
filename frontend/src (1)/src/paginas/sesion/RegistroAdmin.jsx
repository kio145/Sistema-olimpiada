import '../../css/Inicio.css';
import { FormularioRegistro } from './FormularioRegistro';
export function RegistroAdministrador(){
    return (
        <div>
            <p className='titulo1'>Registrarse</p>
            <p className='titulo2'>Como Administrador</p>
            <FormularioRegistro/>
            
        </div>
    )
}