import React from 'react';
import '../../css/VistaCajero.css';
import { Link } from 'react-router-dom';


export function VistaCajero() {
  // Datos simulados
  const competidores = [
    { nombre: 'Catalina Ramirez Herrera', area: 'Robotica', ci: '1234567', costo: 15 },
    { nombre: 'Romeo Luis Escalera Valverde', area: 'Fisica', ci: '2637488', costo: 20 },
    { nombre: 'Lucia Quispe Quispe', area: 'Astrofísica', ci: '9099099', costo: 15 },
    { nombre: 'Maria Ximena Quinteros Duran', area: 'Robotica', ci: '5262662', costo: 15 },
    { nombre: 'Oswald Orellana Luan', area: 'Matematicas', ci: '2578198', costo: 10 },
  ];

  return (
    <div className="cajero-container">
      <div className="perfil">
        <div className="foto-perfil">
          <div className="circulo">
            <span className="inicial">X</span>
          </div>
        </div>
        <div className="info-perfil">
          <p className="rol">Cajero</p>
          <h2 className="nombre">Carlos Valverde Teran</h2>
          <div className="botones-admin">
                    <Link to="/editar-perfil" className="btn-editar-admin">
                    Editar perfil ✎
                    </Link>
                    <Link to="/inicio" className="btn-cerrar-admin">
                    Cerrar Sesión
                    </Link>
                </div>
        </div>
      </div>

      <div className="boleta">
        <button className="btn-generar"><a href="generar-boleta" className='generar-boleta-link'>Generar Boleta</a> </button>
      </div>

      <div className="tabla">
        <h3>Listado de Competidores Habilitados :</h3>
        <table>
          <thead>
            <tr>
              <th>Nombre y Apellidos del Competidor</th>
              <th>Area</th>
              <th>CI del Tutor</th>
              <th>Costo de Inscripción</th>
            </tr>
          </thead>
          <tbody>
            {competidores.map((c, i) => (
              <tr key={i}>
                <td>{c.nombre}</td>
                <td>{c.area}</td>
                <td>{c.ci}</td>
                <td>{c.costo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
