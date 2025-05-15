import { useState } from 'react';
import imagenCuadro from '/imagenInicio.JPG';
import '../../css/Competiciones.css';

export function Area() {
  const [mostrarModal, setMostrarModal] = useState(false);

  const abrirModal = () => {
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
  };

  return (
    <main className="main-container">
      <div className="area-container">
        <h2>Área : Robótica</h2>
        <div className="area-content">
          <div className="area-image">
            <img src={imagenCuadro} alt="imagen" />
            <table className="tabla-costo">
              <tbody>
                <tr>
                  <th className="columna-label">Costo por participante</th>
                  <td className="columna-valor">15 Bs</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="area-info">
            <h3>Requisitos</h3>
            <ul>
              <li>Nivel Lego P</li>
              <li>Cursar 5to o 6to de primaria</li>
              <li>Ser estudiante de nivel primaria en el sistema de Educación Regular del Estado de Bolivia</li>
              <li>Tener cédula de identidad vigente</li>
            </ul>

            <h3>Descripción</h3>
            <p>
              Esta categoría está dirigida a los últimos cursos de primaria. Los participantes trabajarán en equipo para construir y programar robots usando kits LEGO, resolviendo divertidos desafíos que estimulan la creatividad, la lógica y el pensamiento crítico.
            </p>
          </div>
        </div>

        <div className="area-button">
          <button className="inscribirse-btn" onClick={abrirModal}>
            Inscribirse
          </button>
          <div class="area-button">
              <a href="/inscripcion" class="inscribirse-btn">Inscribirse</a>
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
