import '../../css/FormularioRegistro.css';
import { Lock, Mail, Eye, EyeOff, User } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function FormularioRegistro() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [confirmarContrasenia, setConfirmarContrasenia] = useState('');
  const [mostrarContrasenia, setMostrarContrasenia] = useState(false);

  const navegacion = useNavigate();

  const iniciar = (event) => {
    event.preventDefault();
    console.log(nombre, correo, contrasenia, confirmarContrasenia);
    navegacion(`/perfil-estudiante?correo=${encodeURIComponent(correo)}&contrasenia=${encodeURIComponent(contrasenia)}`);
  };

  return (
    <form onSubmit={iniciar} className="formulario-registro">
        <div className="campo">
        <label htmlFor="nombre">Nombre de Usuario</label>
        <div className="input-icono">
          <User size={18} />
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="campo">
        <label htmlFor="correo">Correo Electrónico</label>
        <div className="input-icono">
          <Mail size={18} />
          <input
            type="email"
            id="correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="campo">
        <label htmlFor="contrasenia">Contraseña</label>
        <div className="input-icono">
          <Lock size={18} />
          <input
            type={mostrarContrasenia ? 'text' : 'password'}
            id="contrasenia"
            value={contrasenia}
            onChange={(e) => setContrasenia(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="campo">
        <label htmlFor="confirmar">Confirmar Contraseña</label>
        <div className="input-icono">
          <Lock size={18} />
          <input
            type={mostrarContrasenia ? 'text' : 'password'}
            id="confirmar"
            value={confirmarContrasenia}
            onChange={(e) => setConfirmarContrasenia(e.target.value)}
            required
          />
        </div>
      </div>

      <button type="submit" className="boton-registrar">Registrarse</button>
    </form>
  );
}
