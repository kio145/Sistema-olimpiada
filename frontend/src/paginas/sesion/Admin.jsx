import '../../css/Inicio.css';
import { Formulario } from './Formulario';
export function Admin(){
    return (
        <div>
            <p className='titulo1'>Iniciar Sesion</p>
            <p className='titulo2'>Como Administrador</p>
            <Formulario/>
        </div>
    )
}