import '../css/Info.css';
import { CircleDollarSign, NotebookPen, Contact } from 'lucide-react';

export function InfoInscripcion(){
    return (
        <div className='container'>
            <p className='tituloPrincipal'>¿Como me inscribo?</p>
            <hr />
            <div>
                <div>
                    <p className='tituloSegundario' id='s1'>1. Registro en linea </p>
                    <div className='contenido'>
                        <NotebookPen size={64} color="#549cd4" />
                        <p className='parrafo'> 
                            <li>Ingresa al sistema de inscripciones desde esta pagina</li>
                            <li>Haz clic en "Registrarse" si aun no tienes una cuenta</li>
                            <li>Una vez registrado, inicia sesión y llena el formulario de inscripción, eligiendo tu área de interes.</li>
                            <li>Asegurate de ingresar correctamente el correo del tutor.</li>
                        </p>
                    </div>
                </div>
                <div>
                    <p className='tituloSegundario' id='s2'>2. Validación por parte del Tutor</p>
                    <div className='contenido'>
                        <p className='parrafo'>
                            <li>Después de enviar tu inscripción, se enviará un correo al tutor con los detalles.</li>
                            <li>El tutor debe revisar los datos y validar la inscripción desde el enlace recibido por correo.</li>
                        </p>
                        <Contact size={64} color="#549cd4" />
                    </div>
                </div>
                <div>
                    <p className='tituloSegundario' id='s3'>3. Pago presencial</p>
                    <div className='contenido'>
                        <CircleDollarSign size={82} color="#549cd4" />
                        <p className='parrafo'>
                            <li>Una vez validada la inscripción, el tutor deberá dirigirse personalmente al cajero de la Facultad de Ciencias y Tecnología, en el Departamento de Informática.</li>
                            <li>Allí deberá realizar el pago correspondiente para confirmar oficialmente la participación del estudiante.</li>
                        </p>
                    </div>
                </div>
            </div>
            <p className='parrafoFinal'>En caso de cualquier duda, puede contactarnos al correo de soporte <span><a href="mailto:aikacomsoftnext@gmail.com" className='correo'> aikacomsoftnext@gmail.com</a></span> </p>
        </div>
    )
}
