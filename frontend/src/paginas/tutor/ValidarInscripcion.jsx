// ValidarInscripcion.jsx
import "../../css/ValidarInscripcion.css";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function ValidarInscripcion() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { tutor, competidor } = state || {};

  // Si no vienen datos, redirige o muestra error
  if (!tutor || !competidor) {
    return (
      <div className="validar-container">
        <h2>Error: No hay datos para validar inscripción</h2>
        <button onClick={() => navigate(-1)}>Volver</button>
      </div>
    );
  }
   const competenciaActual = competidor.competencias?.find(
    (c) => c.idcompetencia === competidor.pivot?.idcompetencia
  );

  const [mostrarModal, setMostrarModal] = useState(false);
  const [razonRechazo, setRazonRechazo] = useState('');
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

  const validarInscripcion = (respuesta) => {
  if (respuesta === "si") {
    const validarId = competidor.pivot?.validar_id; 
    console.log("validarId:", validarId);

    if (!validarId) {
      alert('No se pudo obtener el ID de validación.');
      return;
    }

    fetch(`http://127.0.0.1:8000/api/validarTutor/${validarId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        estado_validacion: 'aceptado',
      })
    })
    .then(res => {
      
      if (!res.ok) throw new Error('Error actualizando validación');
      return res.json();
    })
    .then(data => {
      setMostrarConfirmacion(true);
    })
    .catch(err => {
      alert('Error al validar inscripción: ' + err.message);
    });

  } else {
    setMostrarModal(true);
  }
};

  const enviarRechazo = () => {
    if (razonRechazo.trim() === '') {
      alert('Por favor, ingrese una razón.');
      return;
    }
    alert("❌ Inscripción rechazada\nMotivo: " + razonRechazo);
    setMostrarModal(false);
    navigate(-1);
  };

  return (
    <div className="validar-container">
      <h2 className="titulo">Inscripción con validación pendiente</h2>

      <div className="card">
        <h3 className="seccion">I. Datos del Competidor</h3>
        <ul className="lista">
          <li><strong>Nombre/s y Apellido/s:</strong> {competidor.nombrecompetidor} {competidor.apellidocompetidor}</li>
          <li><strong>Correo electrónico:</strong> {competidor.emailcompetidor || 'No disponible'}</li>
          <li><strong>Cédula de Identidad:</strong> {competidor.cicompetidor || 'No disponible'}</li>
          <li><strong>Fecha de Nacimiento:</strong> {competidor.fechanacimiento || 'No disponible'}</li>
          <li><strong>Colegio:</strong> {competidor.colegio || 'No disponible'}</li>
          <li><strong>Curso:</strong> {competidor.curso || 'No disponible'}</li>
          <li><strong>Departamento:</strong> {competidor.departamento || 'No disponible'}</li>
          <li><strong>Provincia:</strong> {competidor.provincia || 'No disponible'}</li>
          <li><strong>Área a la que se inscribe:</strong> {competenciaActual?.areacompetencia || 'No disponible'}</li>
          <li><strong>Nivel/Categoría:</strong> {competenciaActual?.nivelcompetencia || 'No disponible'}</li>
        </ul>

        <h3 className="seccion">II. Datos del Tutor</h3>
        <ul className="lista">
          <li><strong>Nombre/s y Apellido/s:</strong> {tutor.nombretutor} {tutor.apellidotutor}</li>
          <li><strong>Correo electrónico:</strong> {tutor.correotutor || 'No disponible'}</li>
          <li><strong>Rol:</strong> {tutor.rol || 'Tutor'}</li>
          <li><strong>Número de Celular:</strong> {tutor.telefonotutor || 'No disponible'}</li>
        </ul>
      </div>

      <div className="validacion">
        <p>¿Usted valida esta inscripción?</p>
        <div className="botones">
          <button className="btn btn-aceptar" onClick={() => validarInscripcion("si")}>Sí</button>
          <button className="btn btn-rechazar" onClick={() => validarInscripcion("no")}>No</button>
        </div>
      </div>

      <div className="volver">
        <button className="btn-volver" onClick={() => navigate(-1)}>🔙 Regresar a menú de tutor</button>
      </div>

      <p className="nota">
        Por favor, revise cuidadosamente los datos proporcionados por el estudiante. 
        Si toda la información es correcta, haga clic en el botón “Sí” para confirmar.
      </p>

      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal-contenido">
            <h3>¿Seguro de rechazar esta inscripción?</h3>
            <p>Por favor, escribe las razones por las cuales rechazas esta inscripción:</p>
            <textarea
              rows="4"
              value={razonRechazo}
              onChange={(e) => setRazonRechazo(e.target.value)}
              placeholder="Escribe la razón aquí..."
            ></textarea>
            <div className="modal-botones">
              <button onClick={() => setMostrarModal(false)}>No</button>
              <button onClick={enviarRechazo}>Sí, enviar</button>
            </div>
          </div>
        </div>
      )}
      {mostrarConfirmacion && (
      <div className="modal-overlay">
        <div className="modal-contenido">
          <h3>✅ Inscripción validada</h3>
          <button
            className="btn-volver"
            onClick={() => {
              setMostrarConfirmacion(false);
              navigate(-1);
            }}
          >
            Volver
          </button>
        </div>
      </div>
    )}
    </div>
  );
}

export default ValidarInscripcion;
