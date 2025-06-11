import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../css/VistaAdmin.css';
import { FiMonitor, FiCalendar, FiClipboard } from 'react-icons/fi';

export function VistaAdmin() {
  const navigate = useNavigate();

  // 1) Recuperamos el user de localStorage
  const usuario = JSON.parse(localStorage.getItem('user'));

  // 2) Si no hay usuario, redirigimos a login
  if (!usuario) {
    return (
      <div className="admin-container">
        <p>
          No autorizado. <Link to="/login">Inicia sesión</Link>
        </p>
      </div>
    );
  }

  // 3) Calculamos iniciales y nombre
  const iniciales = usuario.name.slice(0, 2).toUpperCase();
  const nombre    = usuario.name;

  // 4) Logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="admin-container">
      {/* Cabecera de perfil */}
      <div className="perfil-admin">
        <div className="foto-admin">
          <div className="circulo-admin">
            <span className="inicial-admin">{iniciales}</span>
          </div>
        </div>
        <div className="info-admin">
          <p className="rol-admin">Administrador</p>
          <h2 className="nombre-admin">{nombre}</h2>
          <div className="botones-admin">
            <Link to="/editar-perfil-admin" className="btn-editar-admin">
              Editar perfil ✎
            </Link>
            <button className="btn-cerrar-admin" onClick={handleLogout}>
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>

      <hr />

      <div className="etapa-actual">
        <p>
          <strong>ETAPA ACTUAL :</strong> 
        </p>
        <p className="fecha-hora"></p>
      </div>

      <div className="cards-admin">
        <div className="card-admin">
          <div className="icono-card">
            <FiMonitor size={32} />
          </div>
          <div className="contenido-card">
            <h3>Competiciones</h3>
            <p>Consulta todas las competiciones…</p>
            <Link to="/listado-competiciones" className="link-card">
              Ir a la página &rarr;
            </Link>
          </div>
        </div>

        <div className="card-admin">
          <div className="icono-card">
            <FiCalendar size={32} />
          </div>
          <div className="contenido-card">
            <h3>Gestionar fechas</h3>
            <p>Consulta y actualiza las fechas…</p>
            <Link to="/gestionar-fechas" className="link-card">
              Ir a la página &rarr;
            </Link>
          </div>
        </div>

        <div className="card-admin">
          <div className="icono-card">
            <FiClipboard size={32} />
          </div>
          <div className="contenido-card">
            <h3>Generar reportes</h3>
            <p>Consulta la información de los postulantes:</p>
            <ul>
              <li>
                <Link to="/listado-postulantes" className="sub-link">
                  Listado de postulantes
                </Link>
              </li>
              <li>
                <Link to="/listado-pagos" className="sub-link">
                  Listado de pagos
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
