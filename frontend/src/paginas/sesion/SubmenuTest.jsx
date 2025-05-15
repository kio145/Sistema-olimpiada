// SubmenuTest.jsx
import React, { useState, useEffect, useRef } from 'react';
import '../../css/SubmenuTest.css'; // Crea este archivo para los estilos de abajo

export function SubmenuTest() {
  const [abierto, setAbierto] = useState(false);
  const ref = useRef(null);

  const toggleSubmenu = () => setAbierto(prev => !prev);

  useEffect(() => {
    const manejarClickFuera = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setAbierto(false);
      }
    };
    document.addEventListener('mousedown', manejarClickFuera);
    return () => document.removeEventListener('mousedown', manejarClickFuera);
  }, []);

  return (
    <div className="submenu-test-container">
      <span onClick={toggleSubmenu} className="boton">
        Crear cuenta
      </span>
      {abierto && (
        <ul className="submenu" ref={ref}>
          <li><a href="/registro">Estudiante</a></li>
          <li><a href="/registro-tutor">Tutor</a></li>
        </ul>
      )}
    </div>
  );
}
