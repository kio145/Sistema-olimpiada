import '../../css/Inicio.css';
import { FormularioRegistro } from '../formularios/FormularioRegistro';
export function RegistroEstudiante(){
    return (
        <div>
            <p className='titulo1'>Registrarse</p>
            <p className='titulo2'>Como Estudiante</p>
            <FormularioRegistro/>
        </div>
    )
}