import '../../css/FormularioIns.css';
import { Lock , Mail ,Eye, EyeOff} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function FormularioRegistroTutor (){
    const [formulario, setFormulario] = useState({
        nombres: '',
        apellidos: '',
        correo: '',
        celular: '',
        cedula: '',
        area: '',
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
                <label>Celular *</label>
                <input type="text" name="celular"  />
              </div>
              <div className="campo">
                <label>Cedula de identidad * </label>
                <input type="text" name="cedula" />
             </div>
            </div>
    
            <div className="grupo">
              <div className="campo">
                <label>Contraseña</label>
                <input type="password" name="contrasenia" />
              </div>
              <div className="campo">
                <label>Confirmar Contraseña</label>
                <input type="password" name="confirmar-contrasenia" />
              </div>
            </div>

            <div className="grupo">
            <div className="campo">
            <label>Seleccione el area al que pertenece</label>
            <select name="parentesco" >
              <option>Robotica</option>
            </select>
            </div>
            </div>
            <button type="submit" className="submit-btn btn-tutor"><a href="vista-tutor" className='enviar-form-registro'>Registrarse</a></button>
          </form>
        </div>
    )
}