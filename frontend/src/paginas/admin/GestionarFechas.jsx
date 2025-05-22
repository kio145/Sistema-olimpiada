// src/paginas/admin/GestionarFechas.jsx
import React, { useState, useEffect } from 'react';
import { FaEdit } from 'react-icons/fa';
import '../../css/GestionarFechas.css';
import api from '../../api/api';

export function GestionarFechas() {
  const [competencias, setCompetencias] = useState([]);
  const [selectedComp, setSelectedComp] = useState(null);

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

  // 1) Al montar: cargo competencias y todas las fechas
  useEffect(() => {
    Promise.all([
      api.get('/competencias/todas'),
      api.get('/fechas'),
    ])
    .then(([cResp, fResp]) => {
      setCompetencias(cResp.data);
      setAllFechas(fResp.data);
    })
    .catch(console.error);
  }, []);

  // guardo todas las fechas y luego filtramos por compu que elija
  const [allFechas, setAllFechas] = useState([]);

  // 2) Cuando cambie la competencia seleccionada, rellenar etapas
  useEffect(() => {
    if (!selectedComp) {
      setRegistro(null);
      setEtapas([]);
      return;
    }
    // buscar fecha existente
    const f = allFechas.find(x => x.idcompetencia === +selectedComp) || null;
    setRegistro(f);
    // inicializar etapas: si f existe, con sus campos; si no, vacíos
    setEtapas(config.map(c => ({
      label: c.label,
      inicio: f?.[c.inicioField] ?? '',
      fin:    f?.[c.finField]    ?? ''
    })));
  }, [selectedComp, allFechas]);

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
    if (!inicio || !fin) {
      setErrors({ modal: 'Ambas fechas son requeridas.' });
      return;
    }
    if (inicio >= fin) {
      setErrors({ modal: 'La fecha de inicio debe ser anterior a la de fin.' });
      return;
    }

    // payload parcial
    const payload = { idcompetencia: +selectedComp };
    payload[inicioField] = inicio;
    payload[finField]    = fin;

    try {
      let resp;
      if (registro) {
        // existe → PUT
        resp = await api.put(`/fechas/${registro.idfecha}`, payload);
      } else {
        // no existe → POST
        resp = await api.post(`/fechas`, payload);
      }
      // actualizo lista local de fechas y cierro modal
      const nueva = resp.data;
      setAllFechas(fs => {
        const filtradas = fs.filter(x => x.idfecha !== nueva.idfecha);
        return [...filtradas, nueva];
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
      <h2>Gestionar fechas por Competencia</h2>

      <div className="selector-comp">
        <label>Competencia:&nbsp;
          <select
            value={selectedComp ?? ''}
            onChange={e => setSelectedComp(e.target.value || null)}
          >
            <option value="">— Elige una competencia —</option>
            {competencias.map(c => (
              <option key={c.idcompetencia} value={c.idcompetencia}>
                {c.areacompetencia} ({c.nivelcompetencia})
              </option>
            ))}
          </select>
        </label>
      </div>

      {selectedComp && (
        <>
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
              {etapas.map((f, i) => (
                <tr key={i}>
                  <td>{f.label}</td>
                  <td>{f.inicio}</td>
                  <td>{f.fin}</td>
                  <td>
                    <button className="editar-btn" onClick={() => abrirModal(i)}>
                      <FaEdit/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {!!modal.abierto && (
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
