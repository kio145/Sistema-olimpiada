import '../../css/FormularioIns.css';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/api'; 

export function FormularioIns() {
  const { id } = useParams(); // <- Captura el id de la URL
  const navigate = useNavigate();

  const [formulario, setFormulario] = useState({
    nombres: '',
    apellidos: '',
    correo: '',
    cedula: '',
    nacimiento: '',
    unidad: '',
    curso: 'Quinto Primaria',
    departamento: 'Cochabamba',
    provincia: 'Cercado',
    tutor: 'Padro Vasques Quintana',
    parentesco: 'Madre del estudiante',
  });

  const [competencia, setCompetencia] = useState({ area: '', nivel: '' });

    // Traer datos de la competencia
    useEffect(() => {
        api.get(`/competencias/${id}`)
        .then(response => {
            const { area, nivel } = response.data;
            setCompetencia({ area, nivel });
        })
        .catch(error => {
            console.error('Error al obtener la competencia:', error);
        });
    }, [id]);


  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const enviarFormulario = async (e) => {
  e.preventDefault();
  try {
    const response = await api.post(`/inscribir/${id}`, {
      ...formulario,
      idcompetencia: id, // usa el id de la competencia
    });
    alert('Datos correctamente enviados');
    navigate('/confirmacion');  
  } catch (error) {
    console.error('Error al enviar datos:', error);
    alert('Error al enviar los datos, por favor intenta nuevamente.');
  }
};

  return (
    <div className="form-container">
      <h2>Registro de Inscripción</h2>
      <p><strong>{competencia.area} - {competencia.nivel}</strong></p>

      <form onSubmit={enviarFormulario}>
        <h3>Por favor llene sus datos cuidadosamente</h3>

        <div className="grupo">
          <div className="campo">
            <label>Nombre/s *</label>
            <input type="text" name="nombres" required value={formulario.nombres} onChange={manejarCambio} />
          </div>
          <div className="campo">
            <label>Apellidos *</label>
            <input type="text" name="apellidos" required value={formulario.apellidos} onChange={manejarCambio} />
          </div>
        </div>

        <div className="grupo">
          <div className="campo">
            <label>Correo Electrónico *</label>
            <input type="email" name="correo" required value={formulario.correo} onChange={manejarCambio} />
          </div>
        </div>

        <div className="grupo">
          <div className="campo">
            <label>Cédula de Identidad *</label>
            <input type="text" name="cedula" required value={formulario.cedula} onChange={manejarCambio} />
          </div>
          <div className="campo">
            <label>Fecha de Nacimiento *</label>
            <input type="date" name="nacimiento" required value={formulario.nacimiento} onChange={manejarCambio} />
          </div>
        </div>

        <div className="grupo">
          <div className="campo">
            <label>Nombre de la Unidad Educativa</label>
            <input type="text" name="unidad" value={formulario.unidad} onChange={manejarCambio} />
          </div>
          <div className="campo">
            <label>Curso</label>
            <select name="curso" value={formulario.curso} onChange={manejarCambio}>
              <option>Quinto Primaria</option>
              <option>Sexto Primaria</option>
              <option>Primero Secundaria</option>
            </select>
          </div>
        </div>

        <div className="grupo">
          <div className="campo">
            <label>Departamento</label>
            <select name="departamento" value={formulario.departamento} onChange={manejarCambio}>
              <option>Cochabamba</option>
              <option>La Paz</option>
              <option>Santa Cruz</option>
            </select>
          </div>
          <div className="campo">
            <label>Provincia</label>
            <select name="provincia" value={formulario.provincia} onChange={manejarCambio}>
              <option>Cercado</option>
              <option>Chapare</option>
              <option>Campero</option>
            </select>
          </div>
        </div>

        <div className="grupo">
          <div className="campo">
            <label>Selecciona el nombre de tu tutor</label>
            <select name="tutor" value={formulario.tutor} onChange={manejarCambio}>
              <option>Padro Vasques Quintana</option>
              <option>Maria Pérez</option>
            </select>
          </div>
        </div>

        <div className="grupo">
          <div className="campo">
            <label>El tutor es:</label>
            <select name="parentesco" value={formulario.parentesco} onChange={manejarCambio}>
              <option>Madre del estudiante</option>
              <option>Padre del estudiante</option>
              <option>Otro</option>
            </select>
          </div>
        </div>

        <button type="submit" className="submit-btn">Enviar</button>

        <div className="regresar-btn">
          <a href="/competiciones" className="regresar">Regresar a competiciones</a>
        </div>
      </form>
    </div>
  );
}
