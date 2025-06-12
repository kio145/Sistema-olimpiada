import '../../css/FormularioRegistro.css';
import { Lock, Mail, Eye, EyeOff, User } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/api/api';

export function FormularioRegistro() {
  const [form, setForm] = useState({
    nombrecompetidor: '',
    apellidocompetidor: '',
    emailcompetidor: '',
    passwordcompetidor: '',
    passwordcompetidor_confirmation: ''
  });
  const [mostrar, setMostrar] = useState(false);
  const [error, setError] = useState('');
  const [erroresCampos, setErroresCampos] = useState({});
  const navigate = useNavigate();

  // Validación campo por campo
  const validarCampo = (name, value) => {
    switch (name) {
      case 'nombrecompetidor':
      case 'apellidocompetidor':
        if (!/^[A-Za-záéíóúÁÉÍÓÚüÜñÑ\s]+$/.test(value))
          return 'Solo se permiten letras y espacios';
        break;
      case 'emailcompetidor':
        if (!/^[\w\-.]+@[\w\-]+\.(com)$/.test(value))
          return 'Debe ingresar un correo válido (ej: ejemplo@dominio.com)';
        break;
      default:
        break;
    }
    return '';
  };

  // Validación general al enviar
  const validarFormulario = () => {
    const errores = {};
    if (!/^[A-Za-záéíóúÁÉÍÓÚüÜñÑ\s]+$/.test(form.nombrecompetidor))
      errores.nombrecompetidor = 'Solo se permiten letras y espacios';
    if (!/^[A-Za-záéíóúÁÉÍÓÚüÜñÑ\s]+$/.test(form.apellidocompetidor))
      errores.apellidocompetidor = 'Solo se permiten letras y espacios';
    if (!/^[\w\-.]+@[\w\-]+\.(com)$/.test(form.emailcompetidor))
      errores.emailcompetidor = 'Debe ingresar un correo válido (ej: ejemplo@dominio.com)';
    if (form.passwordcompetidor !== form.passwordcompetidor_confirmation) {
      errores.passwordcompetidor = 'Las contraseñas no coinciden';
      errores.passwordcompetidor_confirmation = 'Las contraseñas no coinciden';
    }
    setErroresCampos(errores);
    return Object.keys(errores).length === 0;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));

    // Valida el campo individualmente
    const mensaje = validarCampo(name, value);
    setErroresCampos(prev => ({ ...prev, [name]: mensaje }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    if (!validarFormulario()) {
      setError('Revisa los campos marcados en rojo');
      return;
    }

    try {
      // Payload con solo los campos básicos
      const payload = {
        nombrecompetidor:   form.nombrecompetidor,
        apellidocompetidor: form.apellidocompetidor,
        emailcompetidor:    form.emailcompetidor,
        passwordcompetidor: form.passwordcompetidor,
        passwordcompetidor_confirmation: form.passwordcompetidor_confirmation
      };

      const res = await api.post('/competidores', payload);
      console.log('Registrado:', res.data);
      navigate('/login');  // redirige a login tras registro
    } catch (err) {
      console.error(err.response?.data);
      setError(
        err.response?.data?.message ||
        Object.values(err.response?.data?.errors || {}).flat().join(' ') ||
        'Error al registrar'
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="formulario-registro">
      {/* Nombre */}
      <div className="campo">
        <label htmlFor="nombrecompetidor">Nombre</label>
        <div className="input-icono">
          <User size={18} />
          <input
            name="nombrecompetidor"
            id="nombrecompetidor"
            value={form.nombrecompetidor}
            onChange={handleChange}
            required
            className={erroresCampos.nombrecompetidor ? "input-error" : ""}
          />
        </div>
        {erroresCampos.nombrecompetidor && <span className="error">{erroresCampos.nombrecompetidor}</span>}
      </div>

      {/* Apellido */}
      <div className="campo">
        <label htmlFor="apellidocompetidor">Apellido</label>
        <div className="input-icono">
          <User size={18} />
          <input
            name="apellidocompetidor"
            id="apellidocompetidor"
            value={form.apellidocompetidor}
            onChange={handleChange}
            required
            className={erroresCampos.apellidocompetidor ? "input-error" : ""}
          />
        </div>
        {erroresCampos.apellidocompetidor && <span className="error">{erroresCampos.apellidocompetidor}</span>}
      </div>

      {/* Correo */}
      <div className="campo">
        <label htmlFor="emailcompetidor">Correo Electrónico</label>
        <div className="input-icono">
          <Mail size={18} />
          <input
            type="email"
            name="emailcompetidor"
            id="emailcompetidor"
            value={form.emailcompetidor}
            onChange={handleChange}
            required
            className={erroresCampos.emailcompetidor ? "input-error" : ""}
          />
        </div>
        {erroresCampos.emailcompetidor && <span className="error">{erroresCampos.emailcompetidor}</span>}
      </div>

      {/* Contraseña */}
      <div className="campo">
        <label htmlFor="passwordcompetidor">Contraseña</label>
        <div className="input-icono">
          <Lock size={18} />
          <input
            name="passwordcompetidor"
            id="passwordcompetidor"
            type={mostrar ? 'text' : 'password'}
            value={form.passwordcompetidor}
            onChange={handleChange}
            required
            className={erroresCampos.passwordcompetidor ? "input-error" : ""}
          />
          <span onClick={() => setMostrar(!mostrar)}>
            {mostrar ? <EyeOff /> : <Eye />}
          </span>
        </div>
        {erroresCampos.passwordcompetidor && <span className="error">{erroresCampos.passwordcompetidor}</span>}
      </div>

      {/* Confirmación de Contraseña */}
      <div className="campo">
        <label htmlFor="passwordcompetidor_confirmation">Confirmar Contraseña</label>
        <div className="input-icono">
          <Lock size={18} />
          <input
            name="passwordcompetidor_confirmation"
            id="passwordcompetidor_confirmation"
            type={mostrar ? 'text' : 'password'}
            value={form.passwordcompetidor_confirmation}
            onChange={handleChange}
            required
            className={erroresCampos.passwordcompetidor_confirmation ? "input-error" : ""}
          />
          <span onClick={() => setMostrar(!mostrar)}>
            {mostrar ? <EyeOff /> : <Eye />}
          </span>
        </div>
        {erroresCampos.passwordcompetidor_confirmation && <span className="error">{erroresCampos.passwordcompetidor_confirmation}</span>}
      </div>

      <button type="submit" className="boton-registrar">
        Registrarse
      </button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}
