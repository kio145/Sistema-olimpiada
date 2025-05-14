import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/VistaTutor.css';
import { FiMonitor, FiCalendar, FiClipboard } from 'react-icons/fi';

export function VistaTutor() {
  return (
    <div className="tutor-container">
        <div className="perfil-header">
            <img className="foto-perfil" src="URL_IMAGEN" alt="Foto del tutor" />
            <div className="datos-usuario">
            <p className="rol">Tutor</p>
            <h2 className="nombre">Dayra Damian Grageda</h2>
            <div className="acciones">
            <Link to="/editar-perfil" className="btn-editar-admin">
                    Editar perfil ✎
                    </Link>
                    <Link to="/inicio" className="btn-cerrar-admin">
                    Cerrar Sesión
                    </Link></div>
            </div>
        </div>

        <hr />

        <h3 className="titulo-tabla">Listado de tus competidores :</h3>

        <div className="tabla-wrapper">
            <table className="tabla-competidores">
            <thead>
                <tr>
                <th>Nombre y Apellidos del Competidor</th>
                <th>Estado de Inscripción</th>
                <th>Estado de Validación</th>
                </tr>
            </thead>
            <tbody>
                {/* Mapea competidores desde props/datos aquí */}
                <tr>
                <td>Catalina Ramirez Herrera</td>
                <td className="estado-inscripcion espera-validacion">En espera de validación</td>
                <td className="estado-validacion pendiente">
                    <a href="validar-inscripcion">Pendiente</a>
                    </td>
                </tr>
                <tr>
                <td>Romeo Luis Escalera Valverde</td>
                <td className="estado-inscripcion espera-pago">En espera de pago</td>
                <td className="estado-validacion aceptada">
                   <a href="inscripcion-aceptada"> Aceptada</a></td>
                </tr>
                <tr>
                <td>Lizbeth Jimenez Aranibar</td>
                <td className="estado-inscripcion espera-pago">Rechazado</td>
                <td className="estado-validacion aceptada">
                   <a href="inscripcion-rechazada"> Rechazada</a></td>
                </tr>
                {/* ...más filas */}
            </tbody>
            </table>
        </div>
        </div>

  );
}
