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

  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);

  const [cargado, setCargado] = useState(false); // <-- flag aquí

  useEffect(() => {
    if (!user.profile_id) return navigate('/login');
    if (cargado) return; // <-- Solo carga una vez
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
            ? `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'}/storage/${admin.imagenadmi}`
            : null
        );
        setCargado(true); // <-- ya no vuelve a cargar
      })
      .catch(() => navigate('/login'));
  }, [user, navigate, cargado]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFile = e => {
    const img = e.target.files[0];
    setFile(img);
    setPreview(img ? URL.createObjectURL(img) : null);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);

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
            />
          </div>
          <div className="campo">
            <label>Apellido *</label>
            <input
              type="text"
              name="apellidoadmi"
              value={form.apellidoadmi}
              onChange={handleChange}
              required
            />
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
          />
        </div>
        <div className="campo">
          <label>Nueva contraseña (opcional)</label>
          <input
            type="password"
            name="passwordadmi"
            value={form.passwordadmi}
            onChange={handleChange}
            placeholder="Dejar vacío para mantener la actual"
          />
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
