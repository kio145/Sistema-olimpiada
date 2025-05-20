import React, { useState, useEffect, useRef } from 'react';
  import '../css/Inicio.css';
import imagenCuadro from '/imagenInicio.JPG';
import { SubmenuTest } from './sesion/SubmenuTest';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

 function Inicio2() {
  const [mostrarSubmenu, setMostrarSubmenu] = useState(false);
  const submenuRef = useRef(null);
  
   
  const toggleSubmenu = () => {
    setMostrarSubmenu((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (submenuRef.current && !submenuRef.current.contains(event.target)) {
      setMostrarSubmenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="contenedorInicio">
      <div className="contenedorImagen">
        <img src={imagenCuadro} alt="imagen" />
      </div>
      <div className="contenedorTexto">
        <p className="titulo1">Olimpiadas Cientificas 2025</p>
        <p className="titulo2">Facultad de Ciencias y Tecnología - UMSS</p>
        <div>
          <p className="parrafo">
            Bienvenido al portal oficial de inscripciones para las Olimpiadas Cientificas organizadas por la Facultad de Ciencias y Tecnologia de la Universidad Mayor de San Simon
          </p>
          <p className="parrafo">
            Este espacio está diseñado para que estudiantes de primaria y secundaria de Cochabamba participen en un evento donde la ciencia, la tecnología y la creatividad se unen para inspirar el futuro.
          </p>
        </div>
        <div>
          <p className="titulo3">¿Quieres ser parte?</p>
          <div className="parrafo">
            Para inscribirse a algunas de las áreas de competencia, solo necesitas
            <a href="sesion-estudiante" className="enlace"> Iniciar Sesión</a> o{' '}
            <span
                ref={submenuRef}
                style={{ position: 'relative', display: 'inline-block' }}
                >
                <a href="/registro" className="opcion" onClick={toggleSubmenu}>
                    Crear cuenta
                </a>
                {mostrarSubmenu && (
                    <ul className="submenu">
                    <li><a href="/registro">Estudiante</a></li>
                    <li><a href="/registro-tutor">Tutor</a></li>
                    </ul>
                )}
                </span>

            </div>

        </div>
        
        <div>
          <p className="titulo3">Fecha de Inscripciones</p>
          <p className="parrafo">Inicio:</p>
          <p className="parrafo">Fin:</p>
        </div>
        <div className="prueba"></div>
      </div>
    </div>
  );
}

export function Inicio() {
  const [fechas, setFechas] = useState({
    fechaInicio: '2025-03-01',
    fechaFin: '2025-04-15',
  });
  function recibirfechas(){
    let Datosfetch; /*funcion de api para recibir fechas*/
    setFechas(Datosfetch);
  }
  
return(
  <>
    <Row className='justify-content-center'>
      <Col xs={6} md={4}>
        <img src={imagenCuadro} alt="imagen.png" />
        </Col>
        <Col xs={6} md={4}>
        <h1 style={{textAlign: "center", fontSize:35,  color: '#359bdf'}} >Olimpiadas ciencitificas 2025</h1>
         <h2 style={{textAlign: "center", fontSize:20,  }} >Facultad de Ciencias y Tecnología - UMSS </h2>
         <p>Bienvenido al portal oficial de inscripciones para las Olimpiadas Cientificas organizadas por la  Facultad de Ciencias y Tecnologia de la Universidad Mayor de San Simon.
          </p>
          <p>
          Este espacio esta diseñado para que estudiantes de primaria y secundaria de Cochabamba participen en un evento donde la ciencia, la tecnologia y la creatividad se unen para inspirar el futuro.
          </p>  
         <h3>¿Quieres ser parte?</h3>
         <p>Olimpiadas Cientificas 2025Para inscribirse a algunas de las areas de competencia, solo necesitas <a href='/sesion-estudiante'>Iniciar Sesion</a> o <a href='/registro'>Crear cuenta</a>
         </p>
         <h3>Fechas de inscripciones</h3>
         <p className='mx-4'>Inicio: {fechas.fechaInicio}</p>
         <p className='mx-4'>Fin: {fechas.fechaInicio}</p>
      </Col>
    </Row>
  </>
)
}