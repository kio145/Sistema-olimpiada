// src/componentes/Barra.jsx
import '../css/Barra.css';
import { CircleUser } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '/logo.JPG';

export function Barra() {
  return (
    <div className="barraNavegacion">
      <Link to="/inicio">
        <div className="cuadroLogo">
          <img src={logo} alt="logo" />
        </div>
      </Link>

      <div className="enlaces">
        <ul>
          <li>
            <Link to="/informacion-inscripciones" className="opcion">
              ¿Cómo me inscribo?
            </Link>
          </li>
          <li>
            <CircleUser />
            <Link to="/login" className="opcion">
              Iniciar Sesión
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
