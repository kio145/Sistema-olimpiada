import '../../css/Formulario.css';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/api/api'; // Ajusta la ruta si es diferente

export function FormularioRegistro() {
  const [form, setForm] = useState({
    idadmi: '',
    nombreadmi: '',
    apellidoadmi: '',
    correoadmi: '',
    passwordadmi: '',
    passwordadmi_confirmation: '',
    imagenadmi: ''
  });
  const [mostrarContrasenia, setMostrarContrasenia] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    console.log('Payload que envío:', form);
    if (form.passwordadmi !== form.passwordadmi_confirmation) {
      setError('Las contraseñas no coinciden');
      return;
    }
    try {
      const res = await api.post('/administradores', form);
      console.log('Registro exitoso:', res.data);
      navigate('/login');
    } catch (err) {
      console.error(err.response?.data);
      setError(err.response?.data?.message || 'Error al registrar');
    }
  };

    return (
        <div>
            <form onSubmit={iniciar} className='formularioRegistro'>
                <div className='campoRegistro' id='entrada'>
                    <label htmlFor="nombre" id='texto'> Nombre de Usuario</label>
                    <input type="text" name="nombre" id="nombre"  onChange={(e) => setNombre(e.target.value)}/>
                </div>
                <div className='campoRegistro' id='entrada'>
                    <label htmlFor="correo" id='texto'> Correo Electronico</label>
                    <input type="email" name="correo" id="correo"  onChange={(e) => setCorreo(e.target.value)}/>
                </div>
                <div  className='campoRegistro' id='entrada'>
                    <label htmlFor="password" id='texto'> Contrasena</label>
                    <div className='contenedor-contrasenia'>
                        <input name="password" id="password" 
                            type={mostrarContrasenia ? 'text' : 'password'}
                            onChange={(e) => setContrasenia(e.target.value)}/> 
                        <span className='icono-mostrar-contrasenia'
                            onClick={() => setMostrarContrasenia(!mostrarContrasenia)}>
                                {mostrarContrasenia ? <EyeOff color='#777'/> : <Eye color='#777'/> } 
                        </span>
                    </div>
                </div>
                <div  className='campoRegistro' id='entrada'>
                    <label htmlFor="password" id='texto'> Confirmar Contrasena</label>
                    <div className='contenedor-contrasenia'>
                        <input name="password" id="password" 
                            type={mostrarContrasenia ? 'text' : 'password'}
                            onChange={(e) => setContrasenia(e.target.value)}/> 
                        <span className='icono-mostrar-contrasenia'
                            onClick={() => setMostrarContrasenia(!mostrarContrasenia)}>
                                {mostrarContrasenia ? <EyeOff color='#777'/> : <Eye color='#777'/> } 
                        </span>
                    </div>
                </div>
                <div  className='campo' id='boton'>
                    <button type="submit">Registrarse</button>
                </div>
            </form>
        </div>
    )
}
