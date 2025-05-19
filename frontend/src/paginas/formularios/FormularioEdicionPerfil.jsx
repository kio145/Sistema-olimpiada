import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../api/api';
import '../../css/FormularioEdicion.css';

export function FormularioEdicionPerfil() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const user     = state?.user;

  // Formulario local
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
  });
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);

  // 1) Al montar, carga datos actuales
  useEffect(() => {
    if (!user?.profile_id) return navigate('/login');

    api.get(`/competidores/${user.profile_id}`)
      .then(res => {
        const p = res.data;
        setForm({
          nombre:   p.nombrecompetidor,
          apellido: p.apellidocompetidor,
          email:    p.emailcompetidor,
          password: '',
        });
        setPreview(p.imagencompetidor
          ? `http://tu_dominio/storage/${p.imagencompetidor}`
          : null);
      })
      .catch(() => navigate('/login'));
  }, [user, navigate]);

  // 2) Handlers
  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleFile = e => {
    const img = e.target.files[0];
    setFile(img);
    setPreview(URL.createObjectURL(img));
  };

  // 3) Submit
  const handleSubmit = async e => {
    e.preventDefault();

    // Usamos FormData para imagen + campos JSON
    const data = new FormData();
    data.append('nombrecompetidor', form.nombre);
    data.append('apellidocompetidor', form.apellido);
    data.append('emailcompetidor', form.email);
    if (form.password) {
      data.append('passwordcompetidor', form.password);
      data.append('passwordcompetidor_confirmation', form.password);
    }
    if (file) data.append('imagencompetidor', file);

    try {
      await api.put(
        `/competidores/${user.profile_id}`,
        data
      );
      alert('Perfil actualizado con éxito');
      navigate('/perfil-estudiante', { state: { user: { ...user, name: `${form.nombre} ${form.apellido}` } } });
    } catch (err) {
      console.error(err);
      alert('Error al actualizar perfil');
    }
  };

  return (
    <form className="formulario-edicion" onSubmit={handleSubmit}>
      <h2>Editar Perfil</h2>

      {/* Imagen */}
      <div className="campo">
        <label>Cambiar foto</label>
        {preview && <img src={preview} alt="Preview" className="preview" />}
        <input type="file" accept="image/*" onChange={handleFile} />
      </div>

      {/* Nombre */}
      <div className="campo">
        <label>Nombre</label>
        <input
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          required
        />
      </div>

      {/* Apellido */}
      <div className="campo">
        <label>Apellido</label>
        <input
          name="apellido"
          value={form.apellido}
          onChange={handleChange}
          required
        />
      </div>

      {/* Email */}
      <div className="campo">
        <label>Correo</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>

      {/* Password */}
      <div className="campo">
        <label>Nueva contraseña (opcional)</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Deja en blanco para no cambiar"
        />
      </div>

      <button type="submit">Aplicar cambios</button>
    </form>
  );
}
