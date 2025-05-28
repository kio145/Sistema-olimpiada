// src/paginas/admin/GestionarFechas.jsx
import React, { useState, useEffect } from 'react';
import { FaEdit } from 'react-icons/fa';
import '../../css/GestionarFechas.css';
import api from '../../api/api';

export function GestionarFechas() {
  const [registro, setRegistro] = useState(null);
  const [etapas, setEtapas]     = useState([]);
  const [errors, setErrors]     = useState({});
  const [modal, setModal]       = useState({
    abierto: false,
    indice:  null,
    inicio:  '',
    fin:     '',
  });

  const config = [
    { key: 'inscripcion', label: 'Inscripciones', inicioField: 'fecha_inicio_inscripcion', finField: 'fecha_fin_inscripcion' },
    { key: 'validacion',  label: 'Validaciones',  inicioField: 'fecha_inicio_validacion', finField: 'fecha_fin_validacion' },
    { key: 'pago',        label: 'Pago de inscripciones', inicioField: 'fecha_inicio_pago', finField: 'fecha_fin_pago' },
    { key: 'competencia', label: 'Periodo de competiciones', inicioField: 'fecha_inicio_competencia', finField: 'fecha_fin_competencia' },
  ];

  // 1) Al montar: cargo el único registro de fechas (si existe)
  useEffect(() => {
    api.get('/fechas')
      .then(res => {
        const data = res.data;
        // si me devuelve un array, cojo el primero
        const f = Array.isArray(data) && data.length > 0 ? data[0] : null;
        setRegistro(f);
        // inicializo las etapas (con valores o vacíos)
        setEtapas(config.map(c => ({
          label: c.label,
          inicio: f?.[c.inicioField] ?? '',
          fin:    f?.[c.finField]    ?? ''
        })));
      })
      .catch(err => {
        console.error(err);
        alert('Error al cargar las fechas.');
      });
  }, []);

  const abrirModal = idx => {
    setErrors({});
    setModal({
      abierto: true,
      indice:  idx,
      inicio:  etapas[idx].inicio,
      fin:     etapas[idx].fin
    });
  };
  const cerrarModal = () => setModal(m => ({ ...m, abierto: false }));

  const aplicarCambios = async () => {
    const { indice, inicio, fin } = modal;
    const { inicioField, finField } = config[indice];

    // validaciones locales
    if (!inicio || !fin) {
      setErrors({ modal: 'Ambas fechas son requeridas.' });
      return;
    }
    if (inicio >= fin) {
      setErrors({ modal: 'La fecha de inicio debe ser anterior a la de fin.' });
      return;
    }

    // payload con sólo los campos que cambiaron
    const payload = { [inicioField]: inicio, [finField]: fin };

    try {
      let resp;
      if (registro) {
        // existe → PUT
        resp = await api.put(`/fechas/${registro.idfecha}`, payload);
      } else {
        // no existe → POST (Laravel llenará idcompetencia con null o lo que definas)
        resp = await api.post('/fechas', payload);
      }
      const nueva = resp.data;
      setRegistro(nueva);

      // actualizo localmente las etapas
      setEtapas(es => {
        const clone = [...es];
        clone[indice] = { ...clone[indice], inicio, fin };
        return clone;
      });

      cerrarModal();
    } catch (err) {
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors || { modal: 'Datos inválidos.' });
      } else {
        console.error(err);
        setErrors({ modal: 'Error inesperado al guardar.' });
      }
    }
  };

  return (
    <div className="contenedor-fechas">
      <h2>Gestionar fechas globales</h2>
      <p>Fechas de inicio y fin actuales:</p>

      <table className="tabla-fechas">
        <thead>
          <tr>
            <th>Etapa</th>
            <th>Fecha de Inicio</th>
            <th>Fecha de Fin</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody>
          {etapas.map((e, i) => (
            <tr key={i}>
              <td>{e.label}</td>
              <td>{e.inicio}</td>
              <td>{e.fin}</td>
              <td>
                <button className="editar-btn" onClick={() => abrirModal(i)}>
                  <FaEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modal.abierto && (
        <div className="modal-gestion">
          <div className="modal-contenido">
            <h3>Editar: {etapas[modal.indice].label}</h3>
            <div className="modal-fechas">
              <div>
                <label>Fecha de Inicio</label>
                <input
                  type="date"
                  value={modal.inicio}
                  onChange={e => setModal(m => ({ ...m, inicio: e.target.value }))}
                />
              </div>
              <div>
                <label>Fecha de Fin</label>
                <input
                  type="date"
                  value={modal.fin}
                  onChange={e => setModal(m => ({ ...m, fin: e.target.value }))}
                />
              </div>
            </div>
            {errors.modal && <p className="error">{errors.modal}</p>}
            <div className="modal-botones">
              <button onClick={cerrarModal}>Cancelar</button>
              <button onClick={aplicarCambios}>Guardar cambios</button>
            </div>
          </div>
        </div>
      )}

      <div className="volver">
        <button onClick={() => window.location.href = '/vista-admin'}>
          ⨯ Regresar a menú de administrador
        </button>
      </div>
    </div>
  );
}
