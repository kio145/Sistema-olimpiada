import '../../css/FormularioEdicion.css';
import { Lock, Mail, User, Image, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import imagenCuadro from '/imagenInicio.JPG';

export function FormularioEdicionPerfil() {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [mostrarContrasenia, setMostrarContrasenia] = useState(false);
  const [imagenPerfil, setImagenPerfil] = useState(null);

  const manejarImagen = (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      setImagenPerfil(URL.createObjectURL(archivo));
    }
  };

  const aplicarCambios = (e) => {
    e.preventDefault();
    console.log('Nombre:', nombreUsuario);
    console.log('Correo:', correo);
    console.log('Contraseña:', contrasenia);
    alert('Cambios aplicados');
  };

  return (
    <form className='formulario' onSubmit={aplicarCambios}>
      <h2 className='titulo-editar'>Editar Perfil</h2>
      
      <div className='campo centrado'>
      <label htmlFor="imagen">Cambiar imagen de perfil</label>
      <div className="fila-imagen">
        
          <div className="imagen-perfil-preview">
            <img src={imagenCuadro || 'https://via.placeholder.com/80'}
              alt="Perfil"
              className="imagen-perfil"
            />
          </div>
          <input type="file" accept="image/*" onChange={manejarImagen} />
        </div>        
      </div>

      <div className='campo'>
        <label htmlFor="usuario"> <User color='#359bdf'/> Cambiar nombre de usuario</label>
        <input
          type="text"
          id="usuario"
          value={nombreUsuario}
          onChange={(e) => setNombreUsuario(e.target.value)}
        />
      </div>

      <div className='campo'>
        <label htmlFor="correo"> <Mail color='#359bdf'/> Cambiar correo electrónico</label>
        <input
          type="email"
          id="correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
      </div>

      <div className='campo'>
        <label htmlFor="contrasenia"> <Lock color='#359bdf'/> Cambiar contraseña</label>
        <div className="contenedor-contrasenia">
          <input
            id="contrasenia"
            type={mostrarContrasenia ? 'text' : 'password'}
            value={contrasenia}
            onChange={(e) => setContrasenia(e.target.value)}
          />
          <span
            className="icono-mostrar-contrasenia"
            onClick={() => setMostrarContrasenia(!mostrarContrasenia)}
          >
            {mostrarContrasenia ? <EyeOff color="#777" /> : <Eye color="#777" />}
          </span>
        </div>
      </div>

      <div className='campo centrado'>
        <button type="submit">Aplicar cambios</button>
      </div>
    </form>
  );
}
