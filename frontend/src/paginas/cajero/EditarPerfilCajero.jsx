import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../api/api';
import '../../css/FormularioEdicion.css';

export function EditarPerfilCajero() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const user = state?.user;
  const [error, setError] = useState(null);

  // Estado inicial del formulario
  const [form, setForm] = useState({
    nombrecajero: '',
    apellidocajero: '',
    emailcajero: '',
    passwordcajero: ''
  });

  const [originalEmail, setOriginalEmail] = useState('');
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (!user?.profile_id) return navigate('/login');

    api.get(`/cajeros/${user.profile_id}`)
      .then(res => {
        const cajero = res.data;
        setForm({
          nombrecajero: cajero.nombrecajero || '',
          apellidocajero: cajero.apellidocajero || '',
          emailcajero: cajero.emailcajero || '',
          passwordcajero: ''
        });
        setOriginalEmail(cajero.emailcajero || '');
        setPreview(
          cajero.imagencajero
            ? `${import.meta.env.VITE_API_BASE_URL}/storage/${cajero.imagencajero}`
            : null
        );
      })
      .catch(() => navigate('/login'));
  }, [user, navigate]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFile = e => {
    const img = e.target.files[0];
    setFile(img);
    setPreview(img ? URL.createObjectURL(img) : null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const formData = new FormData();
formData.append('nombrecajero', form.nombrecajero);
formData.append('apellidocajero', form.apellidocajero);
formData.append('emailcajero', form.emailcajero);
if (form.passwordcajero) {
  formData.append('passwordcajero', form.passwordcajero);
  formData.append('passwordcajero_confirmation', form.passwordcajero);
}
if (file) {
  formData.append('imagencajero', file);
}
formData.append('_method', 'PUT'); // Importante

await api.post(`/cajeros/${user.profile_id}`, formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
});


      // Si se cambió el correo o la contraseña, actualiza el token
      // Solo relogea si se cambió la contraseña
if (form.passwordcajero) {
  const loginResponse = await api.post('/login', {
    email: form.emailcajero,
    password: form.passwordcajero
  });
  localStorage.setItem('token', loginResponse.data.token);
}


      alert('Perfil actualizado correctamente');
      navigate('/vista-cajero', {
        state: {
          user: {
            ...user,
            name: `${form.nombrecajero} ${form.apellidocajero}`,
            email: form.emailcajero
          }
        }
      });
    } catch (err) {
      console.error("Error en la actualización:", err.response?.data || err);
      if (err.response?.data?.errors) {
        const errorMessages = Object.values(err.response.data.errors)
          .flat()
          .join('\n');
        setError(errorMessages);
      } else {
        setError(err.response?.data?.message || 'Error al actualizar el perfil');
      }
    }
  };

  return (
    <div className="form-container">
      <form className="formulario-edicion" onSubmit={handleSubmit}>
        <h2 className="editar-perfil">Editar Perfil de Cajero</h2>
        
        {error && <div className="error-message">{error}</div>}

        {/* Foto de perfil */}
        <div className="campo centrado">
          <label>Foto de perfil</label>
          {preview && (
            <div className="imagen-perfil-preview">
              <img src={preview} alt="Preview" className="imagen-perfil" />
            </div>
          )}
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFile}
            className="input-file"
          />
        </div>

        {/* Datos personales */}
        <div className="grupo">
          <div className="campo">
            <label>Nombre *</label>
            <input
              type="text"
              name="nombrecajero"
              value={form.nombrecajero}
              onChange={handleChange}
              required
            />
          </div>
          <div className="campo">
            <label>Apellido *</label>
            <input
              type="text"
              name="apellidocajero"
              value={form.apellidocajero}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Contacto */}
        <div className="campo">
          <label>Correo electrónico *</label>
          <input
            type="email"
            name="emailcajero"
            value={form.emailcajero}
            onChange={handleChange}
            required
          />
        </div>

        {/* Contraseña */}
        <div className="campo">
          <label>Nueva contraseña (opcional)</label>
          <input
            type="password"
            name="passwordcajero"
            value={form.passwordcajero}
            onChange={handleChange}
            placeholder="Dejar vacío para mantener la actual"
          />
        </div>

        {/* Botones */}
        <div className="grupo">
          <button type="submit" className="submit-btn enviar-form">
            Guardar cambios
          </button>
          <button 
            type="button" 
            className="regresar-btn"
            onClick={() => navigate('/vista-cajero')}
          >
            <span className="regresar">Cancelar</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditarPerfilCajero;
