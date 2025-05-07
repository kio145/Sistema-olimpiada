import '../../css/Inicio.css';

export function Competiciones() {
    return (
      <>
        <Header />
        <main className="main-container">
          <h2>Competiciones :</h2>
  
          <div className="filters">
            <label>Áreas :
              <select>
                <option>Robotica</option>
              </select>
            </label>
            <label>Niveles :
              <select>
                <option>Todos los niveles/categorías</option>
              </select>
            </label>
          </div>
  
          <button className="btn-filtrar">Aplicar filtros</button>
          <hr />
  
          <div className="cards-grid">
            <Card nivel="Builders P" />
            <Card nivel="Builders S" />
            <Card nivel="Lego P" />
            <Card nivel="Lego S" />
          </div>
        </main>
      </>
    );
  }