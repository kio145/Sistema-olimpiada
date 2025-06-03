import '../../css/Inicio.css';
import { FormularioRegistroTutor } from '../formularios/FormularioRegistroTutor';
export function RegistroTutor(){
    return (
        <div>
            <p className='titulo1'>Registrarse</p>
            <p className='titulo2'>Como Tutor</p>
            <FormularioRegistroTutor/>

        </div>
    )
}