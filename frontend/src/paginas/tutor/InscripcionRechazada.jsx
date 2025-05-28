import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../css/ValidarInscripcion.css";

export function InscripcionRechazada() {
  const location = useLocation();
  const navigate = useNavigate();
  const { tutor, competidor } = location.state || {};

  if (!tutor || !competidor) {
    return <p>No hay datos disponibles.</p>;
  }

  const datosCompetidor = {
    nombre: `${competidor.nombrecompetidor} ${competidor.apellidocompetidor}`,
    correo: competidor.correo || 'No disponible',
    ci: competidor.ci || 'No disponible',
    nacimiento: competidor.nacimiento || 'No disponible',
    colegio: competidor.colegio || 'No disponible',
    curso: competidor.curso || 'No disponible',
    departamento: competidor.departamento || 'No disponible',
    provincia: competidor.provincia || 'No disponible',
    area: competidor.area || 'No disponible',
    nivel: competidor.nivel || 'No disponible',
  };

  const datosTutor = {
    nombre: `${tutor.nombretutor} ${tutor.apellidotutor}`,
    correo: tutor.correo || 'No disponible',
    rol: tutor.rol || 'Tutor',
    celular: tutor.celular || 'No disponible',
  };

  return (
    <div className="validar-container">
      <h2 className="titulo">Inscripción rechazada</h2>

      <div className="card-rechazada">
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
        <p>Razones por las cuales esta inscripción fue rechazada: </p>
        <p>- Cédula de identidad vencida</p>
        <p>- No cuenta con correo electrónico propio</p>
      </div>

      <div className="volver">
        <button
          className="btn-volver"
          onClick={() => navigate('/vista-tutor')}
        >
          🔙 Regresar a menú de tutor
        </button>
      </div>
    </div>
  );
}

export default InscripcionRechazada;
