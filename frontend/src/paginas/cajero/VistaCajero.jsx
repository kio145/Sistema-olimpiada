import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../../css/VistaCajero.css';
import api from '../../api/api';

export function VistaCajero() {
  const { state } = useLocation();
  const navigate   = useNavigate();
  const user       = state?.user;
  const [profile, setProfile]           = useState(null);

  useEffect(() => {

    if (!user?.profile_id) {
      return navigate('/login');
    }

    const cajeroId = user.profile_id;

    api.get(`/cajeros/${cajeroId}`)
      .then(res => setProfile(res.data))
      .catch(() => {
        localStorage.removeItem('token');
        navigate('/login');
      });
  }, [user, navigate]);
  
  if (!profile) {
    return <p>Cargando perfil…</p>;
  }
  const initials = `${profile.nombrecajero?.[0] || ''}${profile.apellidocajero?.[0] || ''}`.toUpperCase();

  return (
    <div className="cajero-container">
      {/* Cabecera */}
              <div className="perfil-container">
            {/* Cabecera */}
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
  <hr />
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
              <th>CI del Estudiante</th>
              <th>Costo de Inscripción</th>
            </tr>
          </thead>
          <tbody>
            {/* {cajeros.map((c, i) => (
              <tr key={i}>
                <td>{c.nombre}</td>
                <td>{c.area}</td>
                <td>{c.ci}</td>
                <td>{c.costo}</td>
              </tr>
            ))} */}
          </tbody>
          No existen habilitados 
        </table>
      </div>
    </div>
    </div>
  );
}
