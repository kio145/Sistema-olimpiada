import React, { useState, useEffect, useRef } from 'react';
import '../css/Inicio.css';
import imagenCuadro from '/imagenInicio.JPG';
import { SubmenuTest } from './sesion/SubmenuTest';
export function Inicio() {
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
