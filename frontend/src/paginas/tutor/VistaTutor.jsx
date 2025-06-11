import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import "../../css/VistaTutor.css";
import api from "../../api/api";
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
export function VistaTutor() {
  const { state } = useLocation();
  const navigate   = useNavigate();
  const user       = state?.user;
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fechaInicioValidacion, setFechaInicioValidacion] = useState(null);
  const [fechaFinValidacion, setFechaFinValidacion] = useState(null);

  // --- Nuevo: control de modales ---
  const [modal, setModal] = useState({
    abierto: false,
    tipo: "",           // "validado" | "rechazado"
    competidor: null,
    validarId: null,
    motivo: "",
  });
  const [accionLoading, setAccionLoading] = useState(false);

   useEffect(() => {
    if (!user?.profile_id) {
      navigate("/login");
      return;
    }
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, navigate]);
  // --- Fetch profile ---
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
    api.get("/fechas").then(res => {
      if (Array.isArray(res.data) && res.data.length > 0) {
        const f = res.data[0];
        setFechaInicioValidacion(f.fecha_inicio_validacion);
        setFechaFinValidacion(f.fecha_fin_validacion);
      }
    });
  }, []);

  const hoy = dayjs();
 const dentroDeRango =
  fechaInicioValidacion &&
  fechaFinValidacion &&
  hoy.isSameOrAfter(dayjs(fechaInicioValidacion, "YYYY-MM-DD")) &&
  hoy.isSameOrBefore(dayjs(fechaFinValidacion, "YYYY-MM-DD"));

const fueraDeRango = !dentroDeRango;

  const handleEliminar = async (validarId) => {
    const confirmar = window.confirm(
      "¿Estás seguro de que deseas eliminar esta validación?"
    );
    if (!confirmar) return;
    setLoading(true);
    try {
      await api.delete(`/validarTutor/${validarId}`);
      alert("Validación eliminada correctamente.");
      fetchProfile();
    } catch (e) {
      alert("Ocurrió un error al eliminar. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  // --- Acciones para aceptar/rechazar ---
  const abrirModal = (tipo, competidor, validarId) => {
    setModal({
      abierto: true,
      tipo,
      competidor,
      validarId,
      motivo: "",
    });
  };

  const cerrarModal = () => setModal(m => ({ ...m, abierto: false, motivo: "" }));

  const confirmarAccion = async () => {
    setAccionLoading(true);
    try {
      const payload = {
        idcompetencia: modal.competidor.pivot.idcompetencia,
        idcompetidor: modal.competidor.idcompetidor,
        idtutor: user.profile_id,
        tipo_tutor: "tutor",
        estado_validacion: modal.tipo,
        motivo_rechazo: modal.tipo === "rechazado" ? modal.motivo : null,
      };
      await api.post("/validarTutor", payload);
      cerrarModal();
      fetchProfile(); // Recarga la lista con el nuevo estado
    } catch (e) {
      alert("Error al actualizar el estado.");
    } finally {
      setAccionLoading(false);
    }
  };

  if (!profile) {
    return <p>Cargando perfil…</p>;
  }

  // ----------- Header del tutor estilo perfil -----------
  const initials = (
    (profile.nombretutor?.[0] || "") +
    (profile.apellidotutor?.[0] || "")
  ).toUpperCase();

  return (
    <div className="tutor-container">
      {/* CABECERA DEL PERFIL DEL TUTOR */}
      <div className="perfil-container">
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
              to="/editar-perfil-tutor"  
              className="btn-editar-admin"
              state={{ user }} 
            >
              Editar perfil ✎
            </Link>
            <Link
              to="/inicio"
                className="btn-cerrar-admin"
                  onClick={() => {
                   localStorage.removeItem("token");
                    navigate("/inicio");
                     }}
                    >
                 Cerrar Sesión
             </Link>
          </div>
        </div>
      </div>
     </div>

      {/* FIN CABECERA */}
      <hr />
      <h3 className="titulo-tabla ">Listado de tus competidores :</h3>
      <div className="tabla-wrapper ">
        {fueraDeRango && (
          <div className="alerta-fecha">
            <strong>⚠️ Fuera del rango de validación.</strong> Solo puedes validar entre&nbsp;
            <strong>{dayjs(fechaInicioValidacion).format('DD/MM/YYYY')}</strong> y&nbsp;
            <strong>{dayjs(fechaFinValidacion).format('DD/MM/YYYY')}</strong>. Hoy es&nbsp;
            <strong>{dayjs().format('DD/MM/YYYY')}</strong>
          </div>
        )}
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

              let textoIns = "";
              if (estado === "pendiente" || !estado) textoIns = "En espera de validación";
              else if (estado === "validado" || estado === "validado") textoIns = "En espera de pago";
              else if (estado === "rechazado") textoIns = "Rechazado";

              let claseIns = "estado-inscripcion ";
              if (estado === "pendiente" || !estado) claseIns += "espera-validacion";
              else if (estado === "validado" || estado === "validado") claseIns += "espera-pago";
              else claseIns += "rechazada";
              const mostrarAcciones = (estado === "pendiente" || !estado) && !fueraDeRango;

              return (
                <tr key={index}>
                  <td>{competidor.nombrecompetidor} {competidor.apellidocompetidor}</td>
                  <td className={claseIns}>{textoIns}</td>
                  <td className={`estado-validacion ${estado}`}>
                    {estado.charAt(0).toUpperCase() + estado.slice(1)}
                  </td>
                  <td>
                    {mostrarAcciones ? (
                      <>
                        <button
                          className="btn-accion aceptar"
                          onClick={() => abrirModal("validado", competidor, validarId)}
                          disabled={loading}
                        >
                          Aceptar
                        </button>
                        <button
                          className="btn-accion rechazar"
                          onClick={() => abrirModal("rechazado", competidor, validarId)}
                          disabled={loading}
                        >
                          Rechazar
                        </button>
                      </>
                    ) : (
                      <span className="text-muted">---</span>
                    )}
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

      {/* --- MODAL DE CONFIRMACIÓN --- */}
      {modal.abierto && (
        <div className="modal-overlay">
          <div className="modal-contenido">
            {modal.tipo === "validado" ? (
              <>
                <h3>Confirmar Validación</h3>
                <p>¿Está seguro de validar esta inscripción?</p>
                <div className="modal-datos">
                  <h4>Datos del Competidor</h4>
                  <ul>
                    <li><strong>Nombre:</strong> {modal.competidor.nombrecompetidor} {modal.competidor.apellidocompetidor}</li>
                    <li><strong>Email:</strong> {modal.competidor.emailcompetidor}</li>
                    <li><strong>CI:</strong> {modal.competidor.cicompetidor}</li>
                    <li><strong>Nacimiento:</strong> {new Date(modal.competidor.fechanacimiento).toLocaleDateString()}</li>
                    <li><strong>Colegio:</strong> {modal.competidor.colegio}</li>
                  </ul>
                  <h4>Datos del Tutor</h4>
                  <ul>
                    <li><strong>Nombre:</strong> {profile.nombretutor} {profile.apellidotutor}</li>
                    <li><strong>Email:</strong> {profile.correotutor}</li>
                    <li><strong>Teléfono:</strong> {profile.telefonotutor}</li>
                    <li><strong>Área:</strong> {profile.area}</li>
                  </ul>
                </div>
                <div className="modal-botones">
                  <button onClick={cerrarModal} disabled={accionLoading}>Cancelar</button>
                  <button onClick={confirmarAccion} disabled={accionLoading}>
                    Confirmar
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3>Rechazar Inscripción</h3>
                <p>Razones por las cuales esta inscripción será rechazada:</p>
                <textarea
                  rows="3"
                  value={modal.motivo}
                  onChange={e => setModal(m => ({ ...m, motivo: e.target.value }))}
                  placeholder="Motivo de rechazo..."
                  style={{ width: "100%" }}
                />
                <div className="modal-datos">
                  <h4>Datos del Competidor</h4>
                  <ul>
                    <li><strong>Nombre:</strong> {modal.competidor.nombrecompetidor} {modal.competidor.apellidocompetidor}</li>
                    <li><strong>Email:</strong> {modal.competidor.emailcompetidor}</li>
                    <li><strong>CI:</strong> {modal.competidor.cicompetidor}</li>
                    <li><strong>Nacimiento:</strong> {new Date(modal.competidor.fechanacimiento).toLocaleDateString()}</li>
                    <li><strong>Colegio:</strong> {modal.competidor.colegio}</li>
                  </ul>
                  <h4>Datos del Tutor</h4>
                  <ul>
                    <li><strong>Nombre:</strong> {profile.nombretutor} {profile.apellidotutor}</li>
                    <li><strong>Email:</strong> {profile.correotutor}</li>
                    <li><strong>Teléfono:</strong> {profile.telefonotutor}</li>
                    <li><strong>Área:</strong> {profile.area}</li>
                  </ul>
                </div>
                <div className="modal-botones">
                  <button onClick={cerrarModal} disabled={accionLoading}>Cancelar</button>
                  <button onClick={confirmarAccion} disabled={accionLoading || !modal.motivo.trim()}>
                    Confirmar Rechazo
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default VistaTutor;
