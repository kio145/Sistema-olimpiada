import React from "react";
import "../../css/ValidarInscripcion.css";
import { useLocation, useNavigate } from "react-router-dom";

export function InscripcionValidada(){
    const { state } = useLocation();
       const navigate = useNavigate();
     
       const { tutor, competidor,  motivo_rechazo } = state || {};
       console.log('Navegando con state:', { tutor, competidor, motivo_rechazo });
     
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
    
    
      return (
        <div className="validar-container">
          <h2 className="titulo">Inscripción aceptada</h2>
    
          <div className="card-aceptada">
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
              <li><strong>Área a la que se inscribe:</strong> {competenciaActual?.area || 'No disponible'}</li>
              <li><strong>Nivel/Categoría:</strong> {competenciaActual?.nivel || 'No disponible'}</li>

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
            <p>Usted validó todos sus datos</p>
            <p>🟡 Estado de inscripcion en espera de pago</p>
          </div>
    
          <div className="volver">
            <button className="btn-volver" onClick={() => navigate(-1)}>🔙 Regresar a menú de tutor</button>
          </div>
        </div>
      );
    };
export default InscripcionValidada;
