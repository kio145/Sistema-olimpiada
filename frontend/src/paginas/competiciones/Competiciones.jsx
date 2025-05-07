import '../../css/Competiciones.css';

export function Competiciones() {
    return (
      <main class="main-container">
      <h2>Competiciones :</h2>
      <div class="filters">
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
      <button class="btn-filtrar">Aplicar filtros</button>
  
      <div class="cards-grid">
        <div class="card">
          <div class="img-placeholder"></div>
          <div class="card-body">
            <h3>Robotica</h3>
            <p>Nivel : Builders P</p>
            <a href="/area">Más información</a>
          </div>
        </div>
  
        <div class="card">
          <div class="img-placeholder"></div>
          <div class="card-body">
            <h3>Robotica</h3>
            <p>Nivel : Builders S</p>
            <a href="/area">Más información</a>
          </div>
        </div>
  
        <div class="card">
          <div class="img-placeholder"></div>
          <div class="card-body">
            <h3>Robotica</h3>
            <p>Nivel : Lego P</p>
            <a href="/area">Más información</a>
          </div>
        </div>
  
        <div class="card">
          <div class="img-placeholder"></div>
          <div class="card-body">
            <h3>Robotica</h3>
            <p>Nivel : Lego S</p>
            <a href="/area">Más información</a>
          </div>
        </div>
      </div>
    </main>
    );
  }