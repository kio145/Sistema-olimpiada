import { useEffect, useState } from "react";
import '../../css/Competiciones.css';
import api from "../../api/api";

export function Competiciones() {
  const [areas, setAreas] = useState([]);
  const [niveles, setNiveles] = useState([]);
  const [areaSeleccionada, setAreaSeleccionada] = useState("");
  const [nivelSeleccionado, setNivelSeleccionado] = useState("");
  const [competencias, setCompetencias] = useState([]);

  useEffect(() => {
    api.get(`/competencias/areas`)
      .then(res => setAreas(res.data))
      .catch(error => {
        console.error('Error al obtener áreas:', error);
        setAreas([]);
      });
  }, []);

  useEffect(() => {
    if (areaSeleccionada) {
      api.get(`/competencias/niveles`, {
        params: { area: areaSeleccionada }
      })
      .then(response => setNiveles(response.data))
      .catch(error => {
        console.error('Error al obtener niveles:', error);
        setNiveles([]);
      });
    } else {
      setNiveles([]);
    }
  }, [areaSeleccionada]);

  const aplicarFiltros = () => {
    api.get('/competencias', {
      params: {
        area: areaSeleccionada,
        nivel: nivelSeleccionado
      }
    })
    .then(res => setCompetencias(res.data.data)) // Laravel devuelve un objeto paginado, usamos .data
    .catch(err => {
      console.error('Error al obtener competencias:', err);
      setCompetencias([]);
    });
  };

  return (
    <main className="main-container">
      <h2>Competiciones :</h2>
      <div className="filters">
        <div className="filter-item">
          <label>Áreas:
            <select value={areaSeleccionada} onChange={e => setAreaSeleccionada(e.target.value)}>
              <option value="">Seleccione un área</option>
              {areas.map((area, index) => (
                <option key={index} value={area}>{area}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="filter-item">
          <label>Niveles:
            <select value={nivelSeleccionado} onChange={e => setNivelSeleccionado(e.target.value)}>
              <option value="">Todos los niveles/categorías</option>
              {niveles.map((nivel, index) => (
                <option key={index} value={nivel}>{nivel}</option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <button className="btn-filtrar" onClick={aplicarFiltros}>Aplicar filtros</button>

      <div className="cards-grid">
        {competencias.length === 0 ? (
          <p>No se encontraron competencias.</p>
        ) : (
          competencias.map(comp => (
            <div className="card-comp" key={comp.idcompetencia}>
              <div className="img-placeholder">
                {/* Puedes mostrar imagen real si existe */}
                {comp.imagencompetencia && (
                  <img src={`/storage/imagenes/${comp.imagencompetencia}`} alt="Imagen competencia" />
                )}
              </div>
              <div className="card-body">
                <h3>{comp.areacompetencia}</h3>
                <p>Nivel : {comp.nivelcompetencia}</p>
                <p>{comp.descripcion}</p>
                <a href={`/competencias/${comp.idcompetencia}`}>Más información</a>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
