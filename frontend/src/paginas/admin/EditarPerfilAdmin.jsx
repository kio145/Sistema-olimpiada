import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../api/api';
import '../../css/FormularioEdicion.css';

export function EditarPerfilAdmin() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const user = state?.user || JSON.parse(localStorage.getItem('user')) || {};
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    nombreadmi: '',
    apellidoadmi: '',
    correoadmi: '',
    passwordadmi: ''
  });
  const [erroresCampos, setErroresCampos] = useState({});

  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);

  const [cargado, setCargado] = useState(false);

  useEffect(() => {
    if (!user.profile_id) return navigate('/login');
    if (cargado) return;
    api.get(`/administradores/${user.profile_id}`)
      .then(res => {
        const admin = res.data;
        setForm({
          nombreadmi: admin.nombreadmi || '',
          apellidoadmi: admin.apellidoadmi || '',
          correoadmi: admin.correoadmi || '',
          passwordadmi: ''
        });
        setPreview(
          admin.imagenadmin
            ? `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'}/storage/${admin.imagenadmin}`
            : null
        );
        setCargado(true);
      })
      .catch(() => navigate('/login'));
  }, [user, navigate, cargado]);

  // Validaciones individuales
  const validarCampo = (name, value) => {
    switch (name) {
      case 'nombreadmi':
      case 'apellidoadmi':
        if (!/^[A-Za-záéíóúÁÉÍÓÚüÜñÑ\s]+$/.test(value))
          return 'Solo se permiten letras y espacios';
        break;
      case 'correoadmi':
        if (!/^[\w\-.]+@[\w\-]+\.(com)$/.test(value))
          return 'Debe ser un correo válido ejemplo@dominio.com';
        break;
      case 'passwordadmi':
        if (value && value.length < 6)
          return 'La contraseña debe tener al menos 6 caracteres';
        break;
      default:
        break;
    }
    return '';
  };

  const validarFormulario = () => {
    const errores = {};
    if (!/^[A-Za-záéíóúÁÉÍÓÚüÜñÑ\s]+$/.test(form.nombreadmi))
      errores.nombreadmi = 'Solo se permiten letras y espacios';
    if (!/^[A-Za-záéíóúÁÉÍÓÚüÜñÑ\s]+$/.test(form.apellidoadmi))
      errores.apellidoadmi = 'Solo se permiten letras y espacios';
    if (!/^[\w\-.]+@[\w\-]+\.(com)$/.test(form.correoadmi))
      errores.correoadmi = 'Debe ser un correo válido ejemplo@dominio.com';
    if (form.passwordadmi && form.passwordadmi.length < 6)
      errores.passwordadmi = 'La contraseña debe tener al menos 6 caracteres';
    setErroresCampos(errores);
    return Object.keys(errores).length === 0;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));

    // Validación en tiempo real
    const msg = validarCampo(name, value);
    setErroresCampos(prev => ({ ...prev, [name]: msg }));
  };

  const handleFile = e => {
    const img = e.target.files[0];
    setFile(img);
    setPreview(img ? URL.createObjectURL(img) : null);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);

    if (!validarFormulario()) {
      setError('Revisa los campos marcados en rojo.');
      return;
    }

    const formData = new FormData();
    formData.append('nombreadmi', form.nombreadmi);
    formData.append('apellidoadmi', form.apellidoadmi);
    formData.append('correoadmi', form.correoadmi);
    if (form.passwordadmi) {
      formData.append('passwordadmi', form.passwordadmi);
      formData.append('passwordadmi_confirmation', form.passwordadmi);
    }
    if (file) formData.append('imagenadmi', file);
    formData.append('_method', 'PUT');

    try {
      await api.post(`/administradores/${user.profile_id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Perfil actualizado correctamente');
      navigate('/vista-admin', {
        state: {
          user: {
            ...user,
            name: `${form.nombreadmi} ${form.apellidoadmi}`,
            email: form.correoadmi
          }
        }
      });
    } catch (err) {
      if (err.response?.data?.errors) {
        setError(Object.values(err.response.data.errors).flat().join('\n'));
      } else {
        setError(err.response?.data?.message || 'Error al actualizar el perfil');
      }
    }
  };

  return (
    <div className="form-container">
      <form className="formulario-edicion" onSubmit={handleSubmit}>
        <h2>Editar Perfil de Administrador</h2>
        {error && <div className="error-message">{error}</div>}

        <div className="campo centrado">
          <label>Foto de perfil</label>
          {preview && <img src={preview} alt="Preview" className="imagen-perfil" />}
          <input type="file" accept="image/*" onChange={handleFile} />
        </div>

        <div className="grupo">
          <div className="campo">
            <label>Nombre *</label>
            <input
              type="text"
              name="nombreadmi"
              value={form.nombreadmi}
              onChange={handleChange}
              required
              className={erroresCampos.nombreadmi ? "input-error" : ""}
            />
            {erroresCampos.nombreadmi && <span className="error">{erroresCampos.nombreadmi}</span>}
          </div>
          <div className="campo">
            <label>Apellido *</label>
            <input
              type="text"
              name="apellidoadmi"
              value={form.apellidoadmi}
              onChange={handleChange}
              required
              className={erroresCampos.apellidoadmi ? "input-error" : ""}
            />
            {erroresCampos.apellidoadmi && <span className="error">{erroresCampos.apellidoadmi}</span>}
          </div>
        </div>
        <div className="campo">
          <label>Correo electrónico *</label>
          <input
            type="email"
            name="correoadmi"
            value={form.correoadmi}
            onChange={handleChange}
            required
            className={erroresCampos.correoadmi ? "input-error" : ""}
          />
          {erroresCampos.correoadmi && <span className="error">{erroresCampos.correoadmi}</span>}
        </div>
        <div className="campo">
          <label>Nueva contraseña (opcional)</label>
          <input
            type="password"
            name="passwordadmi"
            value={form.passwordadmi}
            onChange={handleChange}
            placeholder="Dejar vacío para mantener la actual"
            className={erroresCampos.passwordadmi ? "input-error" : ""}
          />
          {erroresCampos.passwordadmi && <span className="error">{erroresCampos.passwordadmi}</span>}
        </div>
        <div className="grupo">
          <button type="submit" className="submit-btn enviar-form">
            Guardar cambios
          </button>
          <button
            type="button"
            className="regresar-btn"
            onClick={() => navigate('/vista-admin')}
          >
            <span className="regresar">Cancelar</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditarPerfilAdmin;
