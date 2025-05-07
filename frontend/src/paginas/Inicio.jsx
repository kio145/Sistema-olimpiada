import imagenCuadro from '/imagenInicio.JPG';
import '../css/Inicio.css';
import { Nuevo } from './Nuevo';
export function Inicio(){
    return (
        <div className='contenedorInicio'>
            <div className='contenedorImagen'>
                <img src={imagenCuadro} alt="imagen" />
            </div>
            <div className='contenedorTexto'>
                <p className='titulo1'>Olimpiadas Cientificas 2025</p>
                <p className='titulo2'>Facultad de Ciencias y Tecnología - UMSS</p>
                <div>
                    <p className='parrafo'>Bienvenido al portal oficial de inscripciones para las Olimpiadas Cientificas organizadas por la  Facultad de Ciencias y Tecnologia de la Universidad Mayor de San Simon</p>
                    <p className='parrafo'>Este espacio esta diseñado para que estudiantes de primaria y secundaria de Cochabamba participen en un evento donde la ciencia, la tecnologia y la creatividad se unen para inspirar el futuro.</p>
                </div>
                <div>
                    <p className='titulo3'>Quieres ser parte?</p>
                    <p className='parrafo'>Para inscribirse a algunas de las areas de competencia, solo necesitas
                         <span><a href="#" className='enlace'> Iniciar Sesion</a></span> o <span><a href="#" className='enlace'>Crear una cuenta</a></span>
                    </p>
                </div>
                <div>
                    <p className='titulo3'>Fecha de Inscripciones</p>
                    <p className='parrafo'>Inicio:</p>
                    <p className='parrafo'>Fin:   </p>
                </div>
                <Nuevo />
                <div className='prueba'></div>
            </div>
        </div>
    )
}