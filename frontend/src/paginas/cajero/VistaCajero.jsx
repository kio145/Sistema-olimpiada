// src/paginas/cajero/VistaCajero.jsx

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import api from '../../api/api';
import '../../css/VistaCajero.css';

export function VistaCajero() {
  const { state } = useLocation();
  const navigate   = useNavigate();
  const user       = state?.user;
  const [profile, setProfile]         = useState(null);
  const [habilitados, setHabilitados] = useState([]);

  useEffect(() => {
    if (!user?.profile_id) {
      navigate('/login');
      return;
    }

    // 1) Cargo datos del cajero
    api.get(`/cajeros/${user.profile_id}`)
      .then(res => setProfile(res.data))
      .catch(() => {
        localStorage.removeItem('token');
        navigate('/login');
      });

    // 2) Cargo la lista de competidores habilitados para pago
    api.get('/competidores/habilitados')
      .then(res => {
        // res.data == [ { nombrecompetidor, apellidocompetidor, cicompetidor, area, nivel, costo_inscripcion, validar_id }, … ]
        setHabilitados(res.data);
      })
      .catch(err => {
        console.error('Error al cargar habilitados: ', err);
        setHabilitados([]); // en caso de falla, dejamos vacío
      });
  }, [user, navigate]);

  if (!profile) {
    return <p>Cargando perfil…</p>;
  }

  const initials = (
    (profile.nombrecajero?.[0] || '') +
    (profile.apellidocajero?.[0] || '')
  ).toUpperCase();

  return (
    <div className="cajero-container">
      {/* Cabecera del cajero */}
      <div className="perfil-container">
        <div className="perfil-header">
          <div className="foto-perfil">
            <div className="circulo">
              <span className="inicial">{initials}</span>
            </div>
          </div>
          <div className="datos-usuario">
            <p className="rol">Cajero</p>
            <h2 className="nombre">
              {profile.nombrecajero} {profile.apellidocajero}
            </h2>
            <div className="botones-admin">
              <Link
                to="/editar-perfil"
                className="btn-editar-admin"
                state={{ user }}
              >
                Editar perfil ✎
              </Link>
              <Link
                to="/inicio"
                className="btn-cerrar-admin"
                onClick={() => {
                  localStorage.removeItem('token');
                  navigate('/inicio');
                }}
              >
                Cerrar Sesión
              </Link>
            </div>
          </div>
        </div>
      </div>

      <hr />

      {/* Botón para generar boleta de pago */}
      <div className="boleta">
        <button className="btn-generar">
          <Link to="/generar-boleta" className="generar-boleta-link">
            Generar Boleta
          </Link>
        </button>
      </div>

      {/* Listado de Competidores Habilitados */}
      <div className="tabla">
        <h3>Listado de Competidores Habilitados :</h3>

        {habilitados.length === 0 ? (
          <p>No existen competidores habilitados.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Nombre y Apellidos del Competidor</th>
                <th>Área</th>
                <th>CI del Estudiante</th>
                <th>Costo de Inscripción</th>
              </tr>
            </thead>
            <tbody>
              {habilitados.map((c, i) => (
                <tr key={i}>
                  <td>
                    {c.nombrecompetidor} {c.apellidocompetidor}
                  </td>
                  <td>{c.area}</td>
                  <td>{c.cicompetidor}</td>
                  <td>{c.costo_inscripcion} Bs</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default VistaCajero;
