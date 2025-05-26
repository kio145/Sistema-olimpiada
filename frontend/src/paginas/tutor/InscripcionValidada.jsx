//import React from "react";
import "../../css/ValidarInscripcion.css";
import DatosInscripcion from './DatosInscripcion';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/api';

export function InscripcionValidada(){

	const navigate = useNavigate();
	const {id} = useParams();
	const [inscripcion, setInscripcion] = useState(null);
	const [estado, setEstado] = useState(null);

	//obtiene datos de inscripcion
	useEffect(() => {
	api.get(`/tutores/inscripcion/${id}`)
		.then(res => setInscripcion(res.data))
		.catch(err => console.error(err));
	}, [id]);
	
	api.get(`/inscripciones/${id}`)
		.then(res => setEstado(res.data))
		.catch(err => console.error(err));
	

    	if(!inscripcion)return<p>Cargando datos de inscripción</p>

      return (
        <div className="validar-container">
          <h2 className="titulo">Inscripción aceptada</h2>
    
          {inscripcion && <DatosInscripcion inscripcion={inscripcion}/>}
    
          <div className="validacion">
            <p>Usted validó todos sus datos</p>
            <p>{estado.estado_inscripcion}</p>
          </div>
    
          <div className="volver">
            <button className="btn-volver" onClick={() => navigate('/vista-tutor')}>🔙 Regresar a menú de tutor</button>
          </div>
        </div>
      );
    };
export default InscripcionValidada;
