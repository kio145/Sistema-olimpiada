// src/paginas/tutor/ValidarInscripcion.jsx

import "../../css/ValidarInscripcion.css";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/api";

export function ValidarInscripcion() {
  // 1) Leemos de la URL el parámetro “validarId”
  const { validarId } = useParams();
  const navigate = useNavigate();

  const [validarRegistro, setValidarRegistro] = useState(null);
  const [competidor, setCompetidor]           = useState(null);
  const [tutor, setTutor]                     = useState(null);
  const [error, setError]                     = useState("");
  const [loading, setLoading]                 = useState(false);
  const [mostrarModal, setMostrarModal]       = useState(false);
  const [razon, setRazon]                     = useState("");

  // 2) Cargar el registro de ValidarTutor (pivot)
  useEffect(() => {
    if (!validarId) return;

    api.get(`/validarTutor/${validarId}`)
      .then(resV => {
        setValidarRegistro(resV.data);
        // a) Ya tenemos idcompetidor: pedimos sus datos
        return api.get(`/competidores/${resV.data.idcompetidor}`);
      })
      .then(resC => {
        setCompetidor(resC.data);
      })
      .catch(err => {
        console.error(err);
        setError("No se pudo cargar la validación.");
      });
  }, [validarId]);

  // 3) Cargar al tutor autenticado (“me”)
  useEffect(() => {
    api.get("/tutores/me")
      .then(res => {
        setTutor(res.data);
      })
      .catch(() => {
        setError("No se pudo identificar al tutor.");
      });
  }, []);

  const validar = async estado => {
    if (estado === "rechazado" && !razon.trim()) {
      alert("Debes poner un motivo.");
      return;
    }

    setLoading(true);

    try {
      await api.post("/validarTutor", {
        idcompetencia:     validarRegistro.idcompetencia,
        idcompetidor:      validarRegistro.idcompetidor,
        idtutor:           tutor.idtutor,
        tipo_tutor:        "tutor", // fijo “tutor”
        estado_validacion: estado,
        motivo_rechazo:    estado === "rechazado" ? razon : null,
      });

      alert(
        estado === "validado"
          ? "✅ Inscripción validada"
          : `❌ Inscripción rechazada\nMotivo: ${razon}`
      );
      navigate("/vista-tutor");
    } catch (e) {
      console.error(e);
      setError("Error al enviar la validación.");
    } finally {
      setLoading(false);
      setMostrarModal(false);
    }
  };

  if (!validarId) {
    return <p className="error">No se especificó la validación a procesar.</p>;
  }
  if (error) {
    return <p className="error">{error}</p>;
  }
  if (!validarRegistro || !competidor || !tutor) {
    return <p>Cargando…</p>;
  }

  return (
    <div className="validar-container">
      <h2 className="titulo">Validar Inscripción</h2>

      <div className="card">
        <h3 className="seccion">I. Datos del Competidor</h3>
        <ul className="lista">
          <li>
            <strong>Nombre:</strong> {competidor.nombrecompetidor}{" "}
            {competidor.apellidocompetidor}
          </li>
          <li>
            <strong>Email:</strong> {competidor.emailcompetidor}
          </li>
          <li>
            <strong>CI:</strong> {competidor.cicompetidor}
          </li>
          <li>
            <strong>Nacimiento:</strong>{" "}
            {new Date(competidor.fechanacimiento).toLocaleDateString()}
          </li>
          <li>
            <strong>Colegio:</strong> {competidor.colegio}
          </li>
          <li>
            <strong>Curso:</strong> {competidor.curso}
          </li>
          <li>
            <strong>Departamento:</strong> {competidor.departamento}
          </li>
          <li>
            <strong>Provincia:</strong> {competidor.provincia}
          </li>
        </ul>

        <h3 className="seccion">II. Datos del Tutor</h3>
        <ul className="lista">
          <li>
            <strong>Nombre:</strong> {tutor.nombretutor} {tutor.apellidotutor}
          </li>
          <li>
            <strong>Email:</strong> {tutor.correotutor}
          </li>
          <li>
            <strong>Teléfono:</strong> {tutor.telefonotutor}
          </li>
          <li>
            <strong>Área:</strong> {tutor.area}
          </li>
        </ul>
      </div>

      <div className="validacion">
        <p>¿Usted valida esta inscripción?</p>
        <div className="botones">
          <button
            className="btn btn-aceptar"
            disabled={loading}
            onClick={() => validar("validado")}
          >
            Sí
          </button>
          <button
            className="btn btn-rechazar"
            disabled={loading}
            onClick={() => setMostrarModal(true)}
          >
            No
          </button>
        </div>
      </div>

      <div className="volver">
        <button className="btn-volver" onClick={() => navigate("/vista-tutor")}>
          🔙 Volver
        </button>
      </div>

      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal-contenido">
            <h3>¿Seguro de rechazar?</h3>
            <textarea
              rows="4"
              value={razon}
              onChange={e => setRazon(e.target.value)}
              placeholder="Motivo de rechazo..."
            />
            <div className="modal-botones">
              <button onClick={() => setMostrarModal(false)}>Cancelar</button>
              <button onClick={() => validar("rechazado")}>Enviar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ValidarInscripcion;
