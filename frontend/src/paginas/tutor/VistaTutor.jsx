// src/paginas/tutor/VistaTutor.jsx

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import "../../css/VistaTutor.css";
import api from "../../api/api";

export function VistaTutor() {
  const { state } = useLocation();
  const navigate   = useNavigate();
  const user       = state?.user;
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Función para recargar el perfil (lista de competidores + pivots)
  const fetchProfile = () => {
    if (!user?.profile_id) return;
    api.get(`/tutores/${user.profile_id}`)
      .then(res => setProfile(res.data))
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/login");
      });
  };

  useEffect(() => {
    if (!user?.profile_id) {
      navigate("/login");
      return;
    }
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, navigate]);

  // Handler para eliminar un registro de validar_tutor
  const handleEliminar = async (validarId) => {
    const confirmar = window.confirm(
      "¿Estás seguro de que deseas eliminar esta validación?"
    );
    if (!confirmar) return;

    setLoading(true);
    try {
      await api.delete(`/validarTutor/${validarId}`);
      alert("Validación eliminada correctamente.");
      // Después de borrar, recargamos el perfil para reflejar cambios
      fetchProfile();
    } catch (e) {
      console.error("Error al eliminar la validación:", e);
      alert("Ocurrió un error al eliminar. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  if (!profile) {
    return <p>Cargando perfil…</p>;
  }

  const initials = (
    (profile.nombretutor?.[0] || "") +
    (profile.apellidotutor?.[0] || "")
  ).toUpperCase();

  return (
    <div className="tutor-container">
      <div className="perfil-header">
        <div className="foto-perfil">
          <div className="circulo">
            <span className="inicial">{initials}</span>
          </div>
        </div>
        <div className="datos-usuario">
          <p className="rol">Tutor</p>
          <h2 className="nombre">
            {profile.nombretutor} {profile.apellidotutor}
          </h2>
          <div className="botones-admin">
            <Link
              to="/editar-perfil"
              className="btn-editar-admin"
              state={{ user }}
            >
              Editar perfil ✎
            </Link>
            <button
              className="btn-cerrar-admin"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/inicio");
              }}
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>

      <hr />

      <h3 className="titulo-tabla">Listado de tus competidores :</h3>
      <div className="tabla-wrapper">
        <table className="tabla-competidores">
          <thead>
            <tr>
              <th>Nombre y Apellidos del Competidor</th>
              <th>Estado de Inscripción</th>
              <th>Estado de Validación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {profile.competidores?.map((competidor, index) => {
              const p = competidor.pivot || {};
              const estado = (p.estado_validacion || "").toLowerCase();
              const validarId = p.validar_id;

              // Texto legible para “inscripción”
              let textoIns = "";
              if (estado === "pendiente") textoIns = "En espera de validación";
              else if (estado === "aceptada") textoIns = "En espera de pago";
              else if (estado === "rechazado") textoIns = "Rechazado";

              // Clases CSS para colorear estado_inscripción
              let claseIns = "estado-inscripcion ";
              if (estado === "pendiente") claseIns += "espera-validacion";
              else if (estado === "aceptada") claseIns += "espera-pago";
              else claseIns += "rechazada";

              // Ruta de enlace según estado de validación
              let ruta = "#";
              if (estado === "pendiente") {
                ruta = `/validar-inscripcion/${validarId}`;
              } else if (estado === "aceptada") {
                ruta = `/inscripcion-aceptada/${validarId}`;
              } else if (estado === "rechazado") {
                ruta = `/inscripcion-rechazada/${validarId}`;
              }

              return (
                <tr key={index}>
                  <td>
                    {competidor.nombrecompetidor}{" "}
                    {competidor.apellidocompetidor}
                  </td>
                  <td className={claseIns}>{textoIns}</td>
                  <td className={`estado-validacion ${estado}`}>
                    <Link to={ruta}>
                      {estado.charAt(0).toUpperCase() + estado.slice(1)}
                    </Link>
                  </td>
                  <td>
                    {/* Botón Editar: lleva a la misma pantalla de validación */}
                    <Link
                      to={`/validar-inscripcion/${validarId}`}
                      className="btn-accion editar"
                    >
                      ✎
                    </Link>

                    {/* Botón Eliminar: llama a handleEliminar */}
                    <button
                      className="btn-accion eliminar"
                      onClick={() => handleEliminar(validarId)}
                      disabled={loading}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default VistaTutor;
