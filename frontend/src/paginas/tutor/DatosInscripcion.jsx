import React from 'react';
//import api from '../../api/api';

export default function DatosInscripcion({ inscripcion }){

  if(!inscripcion) return null;
      return (
          <div className="card">
            <h3 className="seccion">I. Datos del Competidor</h3>
            <ul className="lista">
              <li><strong>Nombre/s y Apellido/s:</strong> {inscripcion.nombrecompetidor} {inscripcion.apellidocompetidor}</li>
              <li><strong>Correo electrónico:</strong> {inscripcion.emailcompetidor}</li>
              <li><strong>Cédula de Identidad:</strong> {inscripcion.cicompetidor}</li>
              <li><strong>Fecha de Nacimiento:</strong> {inscripcion.fechanacimiento}</li>
              <li><strong>Colegio:</strong> {inscripcion.colegio}</li>
              <li><strong>Curso:</strong> {inscripcion.curso}</li>
              <li><strong>Departamento:</strong> {inscripcion.departamento}</li>
              <li><strong>Provincia:</strong> {inscripcion.provincia}</li>
              <li><strong>Área a la que se inscribe:</strong> {inscripcion.areacompetencia}</li>
              <li><strong>Nivel/Categoría:</strong> {inscripcion.nivelcompetencia}</li>
            </ul>
    
            <h3 className="seccion">II. Datos del Tutor</h3>
            <ul className="lista">
              <li><strong>Nombre/s y Apellido/s:</strong> {inscripcion.nombretutor} {inscripcion.apellidotutor}</li>
              <li><strong>Cedula de Identidad:</strong> {inscripcion.citutor}</li>
              <li><strong>Correo electrónico:</strong> {inscripcion.correotutor}</li>
              <li><strong>El tutor es:</strong> {inscripcion.tipo_tutor}</li>
              <li><strong>Número de Celular:</strong> {inscripcion.telefonotutor}</li>
            </ul>
          </div>
	);
}