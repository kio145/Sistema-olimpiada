import '../../css/Inicio.css';
export function Confirmacion(){
    return (
        <div class="mensaje-exito">
        <h2>Inscripción Enviada con Éxito</h2>
        <h4>Hemos recibido tu inscripción correctamente</h4>
        
        <p>Se han enviado tus datos al tutor seleccionado.</p>
        <p>Para completar el proceso, el tutor deberá:</p>

        <ol>
            <li><strong>Validar los datos de inscripción</strong> siguiendo las instrucciones del correo</li>
            <li><strong>Realizar el pago</strong> correspondiente <strong>de forma presencial</strong> en la caja de la Facultad de Ciencias y Tecnología</li>
        </ol>

        <div class="advertencia">
            ⚠️ <em>Recuerda que la inscripción no estará confirmada hasta que se haya validado y efectuado el pago</em>
        </div>

        <p class="gracias">¡Gracias por participar en las Olimpiadas Científicas!</p>

        <a href="/inicio" class="btn-regresar"> ← Regresar a menú de estudiante</a>
        </div>

    )
}