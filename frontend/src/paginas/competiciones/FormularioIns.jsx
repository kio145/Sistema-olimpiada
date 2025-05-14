import '../../css/FormularioIns.css';
import { Lock , Mail ,Eye, EyeOff} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function FormularioIns(){
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
    
      const manejarCambio = (e) => {
        const { name, value } = e.target;
        setFormulario({ ...formulario, [name]: value });
      };
    
      const enviarFormulario = (e) => {
        e.preventDefault();
        console.log('Datos del formulario:', formulario);
        // Aquí puedes hacer un fetch o axios para enviar los datos a un backend
      };
    
      return (
        <div className="form-container">
          <h2>Registro de Inscripción</h2>
          <p><strong>Robótica - Lego P</strong></p>
    
          <form onSubmit={enviarFormulario}>
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
                <label>Fecha de Nacimiento * </label>
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
                  {/* Agrega más si es necesario */}
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
            <button type="submit" className="submit-btn"><a href="confirmacion" className='enviar-form'>Enviar</a></button>
            <div class="regresar-btn">
              <a href="competiciones" className='regresar'>Regresar a competiciones</a>
            </div>
          </form>
        </div>
    )
}