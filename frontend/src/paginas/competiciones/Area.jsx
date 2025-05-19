import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import imagenCuadro from '../../assets/imagenInicio.jpg';
import '../../css/Competiciones.css';
import { Link } from 'react-router-dom';
import api from '../../api/api';

export function Area() {
  const { id } = useParams(); // obtiene el id de la URL
  const [competencia, setCompetencia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get(`/competencias/${id}`)
      .then(response => {
        setCompetencia(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error al obtener la competencia:", error);
        setError('Competencia no encontrada.');
        setLoading(false);
      });
  }, [id]);

  const abrirModal = () => setMostrarModal(true);
  const cerrarModal = () => setMostrarModal(false);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main className="main-container">
      <div className="area-container">
        <h2>Área : {competencia.areacompetencia}</h2>
        <div className="area-content">
          <div className="area-image">
            <img src={imagenCuadro} alt="imagen" />
            <table className="tabla-costo">
              <tbody>
                <tr>
                  <th className="columna-label">Costo por participante</th>
                  <td className="columna-valor">{competencia.preciocompetencia} Bs</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="area-info">
            <h3>Requisitos</h3>
            <ul>
              <li>Nivel {competencia.nivelcompetencia}</li>
              <li>Tener cédula de identidad vigente</li>
            </ul>

            <h3>Descripción</h3>
            <p>{competencia.descripcion}</p>
          </div>
        </div>

        <div className="area-button">
          <button className="inscribirse-btn" onClick={abrirModal}>
            Inscribirse
          </button>
          <div className="area-button">
            <Link to={`/inscripcion/${id}`}>Inscribirse</Link>
          </div>
        </div>
      </div>

      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">Fecha Inválida</div>
            <div className="modal-body">
              <p>El período de inscripción ha terminado.</p>
              <p>Usted no puede inscribirse.</p>
            </div>
            <div className="modal-footer">
              <button onClick={cerrarModal} className="btn-cerrar">Aceptar</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
