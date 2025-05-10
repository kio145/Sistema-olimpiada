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
      <form onSubmit={handleSubmit} className='formulario'>
        <div className='campo'>
          <label htmlFor='idadmi'>ID Administrador</label>
          <input
            type='number'
            name='idadmi'
            id='idadmi'
            value={form.idadmi}
            onChange={handleChange}
            required
          />
        </div>

        <div className='campo'>
          <label htmlFor='nombreadmi'>Nombre</label>
          <input
            type='text'
            name='nombreadmi'
            id='nombreadmi'
            value={form.nombreadmi}
            onChange={handleChange}
            required
          />
        </div>

        <div className='campo'>
          <label htmlFor='apellidoadmi'>Apellido</label>
          <input
            type='text'
            name='apellidoadmi'
            id='apellidoadmi'
            value={form.apellidoadmi}
            onChange={handleChange}
            required
          />
        </div>

        <div className='campo'>
          <label htmlFor='correoadmi'>Correo Electrónico</label>
          <input
            type='email'
            name='correoadmi'
            id='correoadmi'
            value={form.correoadmi}
            onChange={handleChange}
            required
          />
        </div>

        <div className='campo'>
          <label htmlFor='passwordadmi'>Contraseña</label>
          <div className='contenedor-contrasenia'>
            <input
              name='passwordadmi'
              id='passwordadmi'
              type={mostrarContrasenia ? 'text' : 'password'}
              value={form.passwordadmi}
              onChange={handleChange}
              required
            />
            <span onClick={() => setMostrarContrasenia(!mostrarContrasenia)}>
              {mostrarContrasenia ? <EyeOff /> : <Eye />}
            </span>
          </div>
        </div>

        <div className='campo'>
          <label htmlFor='passwordadmi_confirmation'>Confirmar Contraseña</label>
          <div className='contenedor-contrasenia'>
            <input
              name='passwordadmi_confirmation'
              id='passwordadmi_confirmation'
              type={mostrarContrasenia ? 'text' : 'password'}
              value={form.passwordadmi_confirmation}
              onChange={handleChange}
              required
            />
            <span onClick={() => setMostrarContrasenia(!mostrarContrasenia)}>
              {mostrarContrasenia ? <EyeOff /> : <Eye />}
            </span>
          </div>
        </div>

        <div className='campo' id='boton'>
          <button type='submit'>Registrarse</button>
        </div>
        {error && <p className='error'>{error}</p>}
      </form>
    </div>
  );
}
