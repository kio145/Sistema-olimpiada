import "../../css/ValidarInscripcion.css";

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/api';

export function ValidarInscripcion(){
  const navigate = useNavigate();
	const {id} = useParams();
	const [inscripcion, setInscripcion] = useState(null);
        const [mostrarModal, setMostrarModal] = useState(false);
	const [motivo, setMotivo] = useState('');
	      
	
	//obtiene datos de inscripcion
	useEffect(() => {
	api.get(`/tutores/inscripcion/${id}`)
		.then(res => setInscripcion(res.data))
		.catch(err => console.error(err));
	}, [id]);
	
  //aceptar inscripcion
	const aceptar = () => {
	const datos = {
		idtutor:inscripcion.idtutor,
		idcompetidor: inscripcion.idcompetidor,
		estado_validacion: 'aceptado',
	};

	api.post('/validaciones-tutor', datos)
		.then(() => {
			return api.put(`/inscripciones/${id}`,{
			estado_validacion: 'aceptado',
			estado_inscripcion: 'En espera de pago',
			});
		})
		.then(() => {
		alert("✅ Inscripción validada");
    navigate('/vista-tutor');
		})
		.catch(err => console.error(err));
	};
  //rechazar inscripcion
  const rechazar = () => {
    if(motivo){

    }
	const datos = {
		idtutor: inscripcion.idtutor,
		idcompetidor: inscripcion.idcompetidor,
		estado_validacion: "rechazado",
		motivo_rechazo: motivo,
	};

	api.post('/validaciones-tutor', datos)
		.then(() => {
			return api.put(`/inscripciones/${id}`,{
			estado_validacion: 'rechazado',
			estado_inscripcion: 'rechazado',
			});
		})
		.then(() => {
		alert("❌ Inscripción rechazada");
    navigate('/vista-tutor');
		})
		.catch(err => console.error(err));
	};

    	if(!inscripcion)return<p>Cargando datos de inscripción</p>

      return (
        <div className="validar-container">
          <h2 className="titulo">Inscripción con validación pendiente</h2>
    
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
    
          <div className="validacion">
            <p>¿Usted valida esta inscripción?</p>
            <div className="botones">
              <button className="btn btn-aceptar" onClick={() => aceptar() }>Sí</button>
                 <button
                    className="btn btn-rechazar"
                    onClick={() => setMostrarModal(true)}
                    >
                    No
                </button>
            </div>
          </div>
    
          <div className="volver">
            <button className="btn-volver" onClick={() => navigate('/vista-tutor')}>🔙 Regresar a menú de tutor</button>
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
        value={motivo}
        onChange={(e) => setMotivo(e.target.value)}
        placeholder="Escribe la razón aquí..."
      ></textarea>

      <div className="modal-botones">
        <button onClick={() => setMostrarModal(false)}>No</button>
        <button onClick={() => {
                                if(!motivo.trim()){
                                  alert("Por favor, ingrese unmotivo para el rechazo");
                                  return;
                                }rechazar(); }}>Sí, enviar</button>
      </div>
    </div>
  </div>
)}

        </div>
      );
    };
export default ValidarInscripcion;
