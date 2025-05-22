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
        contrasenia: '',
        confirmarContrasenia: '',
      });
    
      const manejarCambio = (e) => {
        const { name, value } = e.target;
        setFormulario({ ...formulario, [name]: value });
      };
    
      const enviarFormulario = (e) => {
        e.preventDefault();
      
        if (formulario.contrasenia !== formulario.confirmarContrasenia) {
          alert("Las contraseñas no coinciden");
          return;
        }
      
        console.log('Datos del formulario:', formulario);
        // Aquí puedes enviar los datos al backend
      };
       
    
      return (
        <div className="form-container">
          <form onSubmit={enviarFormulario}>
            <div className="grupo">
              <div className="campo">
                <label>Nombre/s *</label>
                <input
                    type="text"
                    name="nombres"
                    required
                    value={formulario.nombres}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{0,50}$/.test(value)) {
                        setFormulario({ ...formulario, nombres: value });
                      }
                    }}
                    //placeholder="Solo letras, máximo 50 caracteres"
                  />
                                  </div>
              <div className="campo">
                <label>Apellidos *</label>
                <input
                  type="text"
                  name="apellidos"
                  required
                  value={formulario.apellidos}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{0,50}$/.test(value)) {
                      setFormulario({ ...formulario, apellidos: value });
                    }
                  }}
                  //placeholder="Solo letras, máximo 50 caracteres"
                />

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
                <input
                  type="text"
                  name="celular"
                  required
                  value={formulario.celular}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Permitir solo números y hasta 7 caracteres
                    if (/^\d{0,8}$/.test(value)) {
                      setFormulario({ ...formulario, celular: value });
                    }
                  }}
                />
              </div>
              <div className="campo">
                <label>Cedula de identidad * </label>
                <input
                  type="text"
                  name="cedula"
                  required
                  value={formulario.cedula}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d{0,7}$/.test(value)) {
                      setFormulario({ ...formulario, cedula: value });
                    }
                  }}
                />
             </div>
            </div>
    
            <div className="grupo">
            <div className="campo">
                <label>Contraseña</label>
                <input
                  type="password"
                  name="contrasenia"
                  required
                  value={formulario.contrasenia}
                  onChange={manejarCambio}
                />
              </div>
              <div className="campo">
                <label>Confirmar Contraseña</label>
                <input
                  type="password"
                  name="confirmarContrasenia"
                  required
                  value={formulario.confirmarContrasenia}
                  onChange={manejarCambio}
                />
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
            <button type="submit" className="submit-btn btn-tutor">Registrarse</button>
          </form>
        </div>
    )
}