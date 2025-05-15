import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import '../../css/GestionarFechas.css';

export function GestionarFechas() {
  const [fechas, setFechas] = useState([
    { etapa: 'Inscripciones', inicio: '00/00/2025', fin: '00/00/2025' },
    { etapa: 'Validaciones', inicio: '00/00/2025', fin: '00/00/2025' },
    { etapa: 'Pago de inscripciones', inicio: '00/00/2025', fin: '00/00/2025' },
    { etapa: 'Periodo de competiciones', inicio: '00/00/2025', fin: '00/00/2025' },
  ]);

  const [mostrarModal, setMostrarModal] = useState(false);
  const [indiceEditando, setIndiceEditando] = useState(null);
  const [nuevaFechaInicio, setNuevaFechaInicio] = useState('');
  const [nuevaFechaFin, setNuevaFechaFin] = useState('');

  const abrirModal = (index) => {
    setIndiceEditando(index);
    setNuevaFechaInicio('');
    setNuevaFechaFin('');
    setMostrarModal(true);
  };

  const aplicarCambios = () => {
    const nuevasFechas = [...fechas];
    nuevasFechas[indiceEditando].inicio = nuevaFechaInicio;
    nuevasFechas[indiceEditando].fin = nuevaFechaFin;
    setFechas(nuevasFechas);
    setMostrarModal(false);
  };

  const volver = () => {
    window.location.href = '/vista-admin';
  };

  return (
    <div className="contenedor-fechas">
      <h2>Gestionar fechas</h2>
      <p>Fechas de inicio y fin actuales:</p>

      <table className="tabla-fechas">
        <thead>
          <tr>
            <th>Etapa</th>
            <th>Fecha de Inicio</th>
            <th>Fecha de Fin</th>
            <th>Editar fechas</th>
          </tr>
        </thead>
        <tbody>
          {fechas.map((f, i) => (
            <tr key={i}>
              <td>{f.etapa}</td>
              <td>{f.inicio}</td>
              <td>{f.fin}</td>
              <td>
                <button className="editar-btn" onClick={() => abrirModal(i)}>
                  <FaEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {mostrarModal && (
        <div className="modal-gestion">
          <div className="modal-contenido">
          
          <div className="modal-header">¿Seguro de cambiar las fechas?</div>
          
            <p>Estás editando las fechas de: <strong>{fechas[indiceEditando].etapa}</strong></p>
            <div className="modal-fechas">
              <div>
                <label>Fecha de Inicio</label>
                <input
                  type="date"
                  value={nuevaFechaInicio}
                  onChange={(e) => setNuevaFechaInicio(e.target.value)}
                />
              </div>
              <div>
                <label>Fecha de Fin</label>
                <input
                  type="date"
                  value={nuevaFechaFin}
                  onChange={(e) => setNuevaFechaFin(e.target.value)}
                />
              </div>
            </div>

            <div className="modal-botones">
              <button onClick={() => setMostrarModal(false)}>No</button>
              <button onClick={aplicarCambios}>Sí, aplicar cambios</button>
            </div>
          </div>
        </div>
      )}

      <div className="volver">
        <button onClick={volver}>⨯ Regresar a menú de administrador</button>
      </div>
    </div>
  );
}
