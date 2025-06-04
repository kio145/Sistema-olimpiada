import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import '../../css/VistaCajero.css';
import api from '../../api/api';

export function VistaCajero() {
  const { state } = useLocation();
  const navigate = useNavigate();
  
  const [profile, setProfile] = useState(null);
  const [habilitados, setHabilitados] = useState([]);

  // Usar localStorage como respaldo
  const user = state?.user || JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user?.profile_id) {
      navigate('/login');
      return;
    }

    localStorage.setItem('user', JSON.stringify(user)); // guarda user para futuros reloads

    const cajeroId = user.profile_id;

    api.get(`/cajeros/${cajeroId}`)
      .then(res => setProfile(res.data))
      .catch(() => {
        localStorage.removeItem('token');
        navigate('/login');
      });
  }, [user, navigate]);

  useEffect(() => {
    api.get('/boleta/habilitados')
      .then(res => setHabilitados(res.data))
      .catch(err => console.error('Error al cargar habilitados', err));
  }, []);

  if (!profile) {
    return <p>Cargando perfil…</p>;
  }

  const initials = `${profile.nombrecajero?.[0] || ''}${profile.apellidocajero?.[0] || ''}`.toUpperCase();

  return (
    <div className="cajero-container">
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
              <Link to="/editar-perfil" className="btn-editar-admin" state={{ user }}>
                Editar perfil ✎
              </Link>
              <Link to="/inicio" className="btn-cerrar-admin" onClick={() => {
                localStorage.removeItem('token');
                navigate('/inicio');
              }}>
                Cerrar Sesión
              </Link>
            </div>
          </div>
        </div>

        <hr />

        <div className="boleta">
          <button className="btn-generar" onClick={() => navigate('/generar-boleta')}>
            Generar Boleta
          </button>
        </div>

        <div className="tabla">
          <h3>Listado de Competidores Habilitados :</h3>
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
              {habilitados.length > 0 ? (
                habilitados.map(insc => (
                  <tr key={insc._inscripcion_id}>
                    <td>{insc.competidor?.nombrecompetidor} {insc.competidor?.apellidocompetidor}</td>
                    <td>{insc.competencia?.areacompetencia}</td>
                    <td>{insc.competidor?.cicompetidor}</td>
                    <td>{insc.competencia?.preciocompetencia || 0} Bs</td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No existen habilitados</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
