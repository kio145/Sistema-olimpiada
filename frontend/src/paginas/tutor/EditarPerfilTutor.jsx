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
    telefonotutor: '',
    citutor: '',
    passwordtutor: '',
    areas: [],
  });
  const [areasDisponibles, setAreasDisponibles] = useState([]);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [errores, setErrores] = useState({});
  const [areasFijas, setAreasFijas] = useState([]);
  const bloqueoTotalAreas = areasFijas.length === 2;

  // Cargar áreas disponibles
  useEffect(() => {
    api.get('/competencias/todas')
      .then(res => {
        const uniq = Array.from(new Set(
          res.data.map(c => c.areacompetencia).filter(Boolean)
        ));
        setAreasDisponibles(uniq);
      })
      .catch(() => setAreasDisponibles([]));
  }, []);
useEffect(() => {
  if (!user?.profile_id) return;
  api.get(`/tutores/${user.profile_id}/areas-fijas`)
    .then(res => setAreasFijas(res.data)) 
    .catch(() => setAreasFijas([]));
}, [user]);
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
          telefonotutor: t.telefonotutor || '',
          citutor: t.citutor || '',
          passwordtutor: '',
          areas: t.area ? t.area.split(',').map(a => a.trim()) : [],
        }));
        setPreview(
          t.imagentutor
            ? `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'}/storage/${t.imagentutor}`
            : null
        );
      })
      .catch(() => navigate('/login'));
  }, [user, navigate]);

  // Validaciones individuales en tiempo real
  const validarCampo = (name, value) => {
    switch (name) {
      case 'nombretutor':
      case 'apellidotutor':
        if (!/^[A-Za-záéíóúÁÉÍÓÚüÜñÑ\s]+$/.test(value))
          return 'Solo se permiten letras y espacios';
        break;
      case 'correotutor':
        if (!/^[\w\-.]+@[\w\-]+\.(com)$/.test(value))
          return 'Debe ser un correo válido ejemplo@dominio.com';
        break;
      case 'telefonotutor':
        if (value && !/^\d{8}$/.test(value))
          return 'El teléfono debe tener 8 dígitos';
        break;
      case 'citutor':
        if (!/^\d{7,10}$/.test(value))
          return 'La cédula debe tener entre 7 y 10 números';
        break;
      case 'passwordtutor':
        if (value && value.length < 6)
          return 'La contraseña debe tener al menos 6 caracteres';
        break;
      default:
        break;
    }
    return '';
  };

  // Validar general
  const validarTodo = () => {
    const nuevosErrores = {};
    Object.keys(form).forEach(k => {
      // No validamos passwordtutor si está vacío (opcional)
      if (k === "passwordtutor" && !form[k]) return;
      const errorMsg = validarCampo(k, form[k]);
      if (errorMsg) nuevosErrores[k] = errorMsg;
    });
    if (!form.areas || form.areas.length === 0) {
      nuevosErrores.areas = 'Selecciona al menos un área (máximo 2)';
    }
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrores(prev => ({ ...prev, [name]: validarCampo(name, value) }));
  };

  const handleFile = e => {
    const img = e.target.files[0];
    setFile(img);
    setPreview(img ? URL.createObjectURL(img) : null);
  };

  // Checkbox áreas
  const toggleArea = area => {
    setForm(f => {
      const has = f.areas.includes(area);
      if (has) {
        return { ...f, areas: f.areas.filter(a => a !== area) };
      }
      if (f.areas.length < 2) {
        return { ...f, areas: [...f.areas, area] };
      }
      return f;
    });
    setErrores(e => ({ ...e, areas: '' }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!validarTodo()) {
      setError('Por favor corrige los campos marcados.');
      setLoading(false);
      return;
    }

    const data = new FormData();
    data.append('_method', 'PUT');
    data.append('nombretutor', form.nombretutor);
    data.append('apellidotutor', form.apellidotutor);
    data.append('correotutor', form.correotutor);
    data.append('telefonotutor', form.telefonotutor);
    data.append('citutor', form.citutor);
    data.append('area', form.areas.join(', ')); // IMPORTANTE: enviar como string al backend
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
            className={errores.nombretutor ? "input-error" : ""}
          />
          {errores.nombretutor && <span className="error">{errores.nombretutor}</span>}
        </div>
        <div className="campo">
          <label>Apellido *</label>
          <input
            type="text"
            name="apellidotutor"
            value={form.apellidotutor}
            onChange={handleChange}
            required
            className={errores.apellidotutor ? "input-error" : ""}
          />
          {errores.apellidotutor && <span className="error">{errores.apellidotutor}</span>}
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
            className={errores.correotutor ? "input-error" : ""}
          />
          {errores.correotutor && <span className="error">{errores.correotutor}</span>}
        </div>
        <div className="campo">
          <label>Celular</label>
          <input
            type="text"
            name="telefonotutor"
            value={form.telefonotutor}
            onChange={handleChange}
            className={errores.telefonotutor ? "input-error" : ""}
            maxLength={8}
          />
          {errores.telefonotutor && <span className="error">{errores.telefonotutor}</span>}
        </div>
      </div>

      <div className="grupo">
        <div className="campo">
          <label>Cédula de Identidad *</label>
          <input
            type="text"
            name="citutor"
            value={form.citutor}
            onChange={handleChange}
            required
            className={errores.citutor ? "input-error" : ""}
            maxLength={10}
          />
          {errores.citutor && <span className="error">{errores.citutor}</span>}
        </div>
        <div className="campo">
          <label>Áreas (máximo 2) *</label>
          <div className="campo">
  {areasDisponibles.map(ar => {
    const yaFija = areasFijas.includes(ar);
    return (
      <div key={ar}>
        <input
  type="checkbox"
  id={ar}
  checked={form.areas.includes(ar)}
  onChange={() => toggleArea(ar)}
  disabled={yaFija || bloqueoTotalAreas}
/>
{bloqueoTotalAreas && (
  <p style={{color:'crimson', fontWeight:'bold'}}>No puedes cambiar tus áreas porque ya fuiste elegido en ambas.</p>
)}

        <label htmlFor={ar}>
          {ar} {yaFija && <span style={{color:'crimson', fontSize:'0.9em'}}>(No editable)</span>}
        </label>
      </div>
    )
  })}
  {errores.areas && <span className="error">{errores.areas}</span>}
</div>

          {errores.areas && <span className="error">{errores.areas}</span>}
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
          className={errores.passwordtutor ? "input-error" : ""}
        />
        {errores.passwordtutor && <span className="error">{errores.passwordtutor}</span>}
      </div>

      <button type="submit" disabled={loading || bloqueoTotalAreas}>
  {loading ? 'Guardando...' : 'Aplicar cambios'}
</button>
    </form>
  );
}

export default EditarPerfilTutor;
