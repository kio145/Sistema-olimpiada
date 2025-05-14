import React from "react";
import "../../css/ValidarInscripcion.css";

export function ValidarInscripcion(){
    const datosCompetidor = {
        nombre: "Dayra Damian Grageda",
        correo: "dayra.damian@sadosa.edu.bo",
        ci: "1558247",
        nacimiento: "30/06/2010",
        colegio: "Santo Domingo Savio A",
        curso: "Quinto Primaria",
        departamento: "Cochabamba",
        provincia: "Cercado",
        area: "Robótica",
        nivel: "Lego P",
      };
    
      const datosTutor = {
        nombre: "Laura Grageda Gonzales",
        correo: "lauragragedagonzales@gmail.com",
        rol: "Madre del estudiante",
        celular: "7646443",
      };
    
      const validarInscripcion = (respuesta) => {
        if (respuesta === "si") {
          alert("✅ Inscripción validada");
        } else {
          alert("❌ Inscripción rechazada");
        }
      };
    
      return (
        <div className="validar-container">
          <h2 className="titulo">Inscripción con validación pendiente</h2>
    
          <div className="card">
            <h3 className="seccion">I. Datos del Competidor</h3>
            <ul className="lista">
              <li><strong>Nombre/s y Apellido/s:</strong> {datosCompetidor.nombre}</li>
              <li><strong>Correo electrónico:</strong> {datosCompetidor.correo}</li>
              <li><strong>Cédula de Identidad:</strong> {datosCompetidor.ci}</li>
              <li><strong>Fecha de Nacimiento:</strong> {datosCompetidor.nacimiento}</li>
              <li><strong>Colegio:</strong> {datosCompetidor.colegio}</li>
              <li><strong>Curso:</strong> {datosCompetidor.curso}</li>
              <li><strong>Departamento:</strong> {datosCompetidor.departamento}</li>
              <li><strong>Provincia:</strong> {datosCompetidor.provincia}</li>
              <li><strong>Área a la que se inscribe:</strong> {datosCompetidor.area}</li>
              <li><strong>Nivel/Categoría:</strong> {datosCompetidor.nivel}</li>
            </ul>
    
            <h3 className="seccion">II. Datos del Tutor</h3>
            <ul className="lista">
              <li><strong>Nombre/s y Apellido/s:</strong> {datosTutor.nombre}</li>
              <li><strong>Correo electrónico:</strong> {datosTutor.correo}</li>
              <li><strong>El tutor es:</strong> {datosTutor.rol}</li>
              <li><strong>Número de Celular:</strong> {datosTutor.celular}</li>
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
            <button className="btn-volver"><a href="vista-tutor" className="ruta-tutor">🔙 Regresar a menú de tutor</a></button>
            </div>
    
          <p className="nota">
            Por favor, revise cuidadosamente los datos proporcionados por el estudiante. 
            Si toda la información es correcta, haga clic en el botón “Sí” para confirmar.
          </p>
        </div>
      );
    };
export default ValidarInscripcion;
