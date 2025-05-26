//import React from "react";
import "../../css/ValidarInscripcion.css";
import DatosInscripcion from './DatosInscripcion';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/api';

export function InscripcionRechazada(){
    
    	const navigate = useNavigate();
	const {id} = useParams();
	const [inscripcion, setInscripcion] = useState(null);
	const [motivo, setMotivo] = useState(null);

	//obtiene datos de inscripcion
	useEffect(() => {
	api.get(`/tutores/inscripcion/${id}`)
		.then(res => setInscripcion(res.data))
		.catch(err => console.error(err));
	},[id]);
	useEffect(() => {
	api.get(`/validaciones-tutor/${id}`)
		.then(res => setMotivo(res.data))
		.catch(err => console.error(err));
	}, [id]);
	

    	if(!inscripcion || !motivo) return <p>Cargando datos de inscripción</p>

      return (
        <div className="validar-container">
          <h2 className="titulo">Inscripción rechazada</h2>
    
           {inscripcion && <DatosInscripcion inscripcion={inscripcion} tipo="rechazado"/>}
    
          <div className="validacion">
            <p>Razones por las cuales esta inscripción fue rechazada: </p>
            <p> {motivo.motivo_rechazo} </p>
          </div>
    
          <div className="volver">
           <button className="btn-volver" onClick={() => navigate('/vista-tutor')}>🔙 Regresar a menú de tutor</button>
          </div>
    
        </div>
      );
    };
export default InscripcionRechazada;   