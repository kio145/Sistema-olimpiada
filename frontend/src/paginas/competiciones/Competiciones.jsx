import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/api';
import '../../css/Competiciones.css';

export function Competiciones() {
  const [comps, setComps] = useState([]);
  const [areas, setAreas] = useState([]);
  const [niveles, setNiveles] = useState([]);

  const [fArea, setFArea]       = useState('');
  const [fNivel, setFNivel]     = useState('');
  const [error, setError]       = useState('');
  const [filtradas, setFiltradas] = useState([]);

  useEffect(() => {
    api.get('/competencias/todas')
      .then(res => {
        const data = res.data;
        setComps(data);
        setAreas([...new Set(data.map(c => c.areacompetencia))]);
        setNiveles([...new Set(data.map(c => c.nivelcompetencia))]);
        setFiltradas(data);
      })
      .catch(err => {
        console.error(err);
        setError('No se pudieron cargar las competiciones.');
      });
  }, []);

  const aplicarFiltros = () => {
    let arr = comps;
    if (fArea)   arr = arr.filter(c => c.areacompetencia === fArea);
    if (fNivel)  arr = arr.filter(c => c.nivelcompetencia === fNivel);
    setFiltradas(arr);
  };

  return (
    <main className="main-container">
      <h2>Competiciones :</h2>

      <div className="filters">
        <div className="filter-item">
          <label>
            Áreas:
            <select value={fArea} onChange={e => setFArea(e.target.value)}>
              <option value="">Todas</option>
              {areas.map(a => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="filter-item">
          <label>
            Niveles:
            <select value={fNivel} onChange={e => setFNivel(e.target.value)}>
              <option value="">Todos</option>
              {niveles.map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </label>
        </div>
        <button className="btn-filtrar" onClick={aplicarFiltros}>
          Aplicar filtros
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="cards-grid">
        {filtradas.map(c => (
          <div key={c.idcompetencia} className="card-comp">
            {c.imagencompetencia ? (
              <img
                src={`${api.defaults.baseURL}/storage/${c.imagencompetencia}`}
                alt={c.areacompetencia}
                className="img-placeholder"
              />
            ) : (
              <div className="img-placeholder" />
            )}
            <div className="card-body">
              <h3>{c.areacompetencia}</h3>
              <p>Nivel: {c.nivelcompetencia}</p>
              <Link to={`/area/${c.idcompetencia}`}>
                Más información →
              </Link>
            </div>
          </div>
        ))}
        {filtradas.length === 0 && !error && (
          <p>No hay competiciones que coincidan con esos filtros.</p>
        )}
      </div>
    </main>
  );
}
