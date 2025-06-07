// Confirmacion.jsx
import { useNavigate } from 'react-router-dom';
import '../../css/Inicio.css';

export function Confirmacion() {
  const navigate = useNavigate();

  return (
    <div className="mensaje-exito">
      <h2>Inscripción Enviada con Éxito</h2>
      <h4>Hemos recibido tu inscripción correctamente</h4>

      <p>Se han enviado tus datos al tutor seleccionado.</p>
      <p>Para completar el proceso, el tutor deberá:</p>

      <ol>
        <li>
          <strong>Validar los datos de inscripción</strong> siguiendo las
          instrucciones del correo
        </li>
        <li>
          <strong>Realizar el pago</strong> correspondiente{' '}
          <strong>de forma presencial</strong> en la caja de la Facultad de
          Ciencias y Tecnología
        </li>
      </ol>

      <div className="advertencia">
        ⚠️{' '}
        <em>
          Recuerda que la inscripción no estará confirmada hasta que se haya
          validado y efectuado el pago
        </em>
      </div>

      <p className="gracias">¡Gracias por participar en las Olimpiadas Científicas!</p>

      <button 
      onClick={() => {
    const user = JSON.parse(localStorage.getItem('user')); 
    navigate('/perfil-estudiante', { state: { user } });
       }} 
        className="btn-regresar"
       >
        ← Regresar a menú de estudiante
        </button>
    </div>
  );
}

export default Confirmacion;