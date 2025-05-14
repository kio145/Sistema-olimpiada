import { useState } from 'react';
import '../../css/Inicio.css';
import { Formulario } from './Formulario';

export function Estudiante() {
  const [mostrarSubmenu, setMostrarSubmenu] = useState(false);

  const toggleSubmenu = () => {
    setMostrarSubmenu(!mostrarSubmenu);
  };

  return (
    <div>
      <p className='titulo1'>Iniciar Sesión</p>
      <Formulario />
      <div className="parrafoFinal">
        <p>En caso de no tener una cuenta por favor</p>
        <div className="menu-boton centrado">
          <a href="#" className="opcion" onClick={toggleSubmenu}>
            Registrarse
          </a>
          {mostrarSubmenu && (
            <ul className="submenu">
              <li><a href="/registro">Estudiante</a></li>
              <li><a href="/registro-tutor">Tutor</a></li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
