// src/paginas/sesion/VistaAdmin.jsx
import { useLocation, Link } from 'react-router-dom';
import '../../css/VistaAdmin.css';
import { FiMonitor, FiCalendar, FiClipboard } from 'react-icons/fi';

export function VistaAdmin() {
  const { state } = useLocation();
  const { usuario, etapaActual, fechaHora } = state || {};

  if (!usuario) {
    return (
      <p>
        No autorizado. <Link to="/login">Inicia sesión</Link>
      </p>
    );
  }

  return (
    <div className="admin-container">
      {/* Perfil */}
      <div className="perfil-admin">
        <div className="foto-admin">
          <div className="circulo-admin">
            <span className="inicial-admin">{usuario.iniciales}</span>
          </div>
        </div>
        <div className="info-admin">
          <p className="rol-admin">Administrador</p>
          <h2 className="nombre-admin">{usuario.nombre}</h2>
          <div className="botones-admin">
            <Link to="/editar-perfil" className="btn-editar-admin">
              Editar perfil ✎
            </Link>
            <button
              className="btn-cerrar-admin"
              onClick={usuario.cerrarSesion}
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>

      <hr />

      {/* Etapa actual */}
      <div className="etapa-actual">
        <p><strong>ETAPA ACTUAL :</strong> {etapaActual}</p>
        <p className="fecha-hora">{fechaHora}</p>
      </div>

      {/* Tarjetas */}
      <div className="cards-admin">
        <div className="card-admin">
          <div className="icono-card"><FiMonitor size={32} /></div>
          <div className="contenido-card">
            <h3>Competiciones</h3>
            <p>Consulta todas las competiciones…</p>
            <Link to="listado-competiciones" className="link-card">
              Ir a la página →
            </Link>
          </div>
        </div>

        <div className="card-admin">
          <div className="icono-card"><FiCalendar size={32} /></div>
          <div className="contenido-card">
            <h3>Gestionar fechas</h3>
            <p>Actualiza las fechas de inscripciones…</p>
            <Link to="/gestionar-fechas" className="link-card">
              Ir a la página →
            </Link>
          </div>
        </div>

        <div className="card-admin">
          <div className="icono-card"><FiClipboard size={32} /></div>
          <div className="contenido-card">
            <h3>Generar reportes</h3>
            <ul>
              <li>
                <Link to="listado-postulantes">Listado de postulantes</Link>
              </li>
              <li>
                <Link to="listado-pagos">Listado de pagos</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
