// src/paginas/tutor/EditarPerfilTutor.jsx
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../api/api';
import '../../css/EditarPerfilTutor.css';

export function EditarPerfilTutor() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const user = state?.user;

  const [form, setForm] = useState({
    nombretutor: '',
    apellidotutor: '',
    correotutor: '',
    area: '',
    telefonotutor: '',
    citutor: '',
    passwordtutor: ''
  });
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Cargar datos actuales del tutor
  useEffect(() => {
    if (!user?.profile_id) return navigate('/login');
    api.get(`/tutores/${user.profile_id}`)
      .then(res => {
        const t = res.data;
        setForm(f => ({
          ...f,
          nombretutor: t.nombretutor || '',
          apellidotutor: t.apellidotutor || '',
          correotutor: t.correotutor || '',
          area: t.area || '',
          telefonotutor: t.telefonotutor || '',
          citutor: t.citutor || '',
          passwordtutor: ''
        }));
        setPreview(
          t.imagentutor
            ? `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'}/storage/${t.imagentutor}`
            : null
        );
      })
      .catch(() => navigate('/login'));
  }, [user, navigate]);

  // Handlers
  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFile = e => {
    const img = e.target.files[0];
    setFile(img);
    setPreview(img ? URL.createObjectURL(img) : null);
  };

  // Submit
  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
if (!form.nombretutor || !form.apellidotutor || !form.correotutor || !form.area || !form.citutor) {
  setError('Por favor completa todos los campos obligatorios.');
  setLoading(false);
  return;
}


    const data = new FormData();
    data.append('_method', 'PUT'); 
    data.append('nombretutor', form.nombretutor);
    data.append('apellidotutor', form.apellidotutor);
    data.append('correotutor', form.correotutor);
    data.append('area', form.area);
    data.append('telefonotutor', form.telefonotutor);
    data.append('citutor', form.citutor);
    if (form.passwordtutor && form.passwordtutor.trim() !== '') {
      data.append('passwordtutor', form.passwordtutor);
    }
    if (file) data.append('imagentutor', file);

    try {
      await api.post(`/tutores/${user.profile_id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Perfil actualizado con éxito');
      navigate('/perfil-tutor', { state: { user: { ...user, name: `${form.nombretutor} ${form.apellidotutor}` } } });
    } catch (err) {
      console.error('Error al actualizar perfil:', err);
      if (err.response?.data?.errors) {
        setError(Object.values(err.response.data.errors).flat().join('\n'));
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Error al actualizar perfil');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="formulario" onSubmit={handleSubmit} encType="multipart/form-data">
      <h2 className="titulo-editar">Editar Perfil de Tutor</h2>
      {error && <div className="error-message">{error}</div>}

      <div className="campo centrado">
        <label>Cambiar foto</label>
        {preview && <img src={preview} alt="Preview" className="preview" />}
        <input type="file" accept="image/*" onChange={handleFile} />
      </div>

      <div className="grupo">
        <div className="campo">
          <label>Nombre *</label>
          <input
            type="text"
            name="nombretutor"
            value={form.nombretutor}
            onChange={handleChange}
            required
          />
        </div>
        <div className="campo">
          <label>Apellido *</label>
          <input
            type="text"
            name="apellidotutor"
            value={form.apellidotutor}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="grupo">
        <div className="campo">
          <label>Correo *</label>
          <input
            type="email"
            name="correotutor"
            value={form.correotutor}
            onChange={handleChange}
            required
          />
        </div>
        <div className="campo">
          <label>Área *</label>
          <input
            type="text"
            name="area"
            value={form.area}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="grupo">
        <div className="campo">
          <label>Teléfono</label>
          <input
            type="text"
            name="telefonotutor"
            value={form.telefonotutor}
            onChange={handleChange}
          />
        </div>
        <div className="campo">
          <label>Cédula de Identidad</label>
          <input
            type="text"
            name="citutor"
            value={form.citutor}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="campo">
        <label>Nueva contraseña (opcional)</label>
        <input
          type="password"
          name="passwordtutor"
          value={form.passwordtutor}
          onChange={handleChange}
          placeholder="Deja en blanco para no cambiar"
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Guardando...' : 'Aplicar cambios'}
      </button>
    </form>
  );
}

export default EditarPerfilTutor;
