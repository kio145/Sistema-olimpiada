// src/paginas/competiciones/InscripcionRechazada.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/api";
import "../../css/ValidarInscripcion.css";

export function InscripcionRechazada() {
  const { validarId } = useParams(); // viene de la ruta: /inscripcion-rechazada/:validarId
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [competidor, setCompetidor] = useState(null);
  const [tutor, setTutor] = useState(null);
  const [inscripcion, setInscripcion] = useState(null); // para obtener motivo_rechazo

  useEffect(() => {
    if (!validarId) {
      setError("No se especificó la validación.");
      setLoading(false);
      return;
    }

    // 1) Cargo el registro de validar_tutor
    api
      .get(`/validarTutor/${validarId}`)
      .then((res) => {
        const v = res.data;
        if (v.estado_validacion !== "rechazado") {
          // Si alguien accede aquí pero no está rechazado, regreso a vista-tutor
          navigate("/vista-tutor");
          return null;
        }
        return v;
      })
      .then((v) => {
        if (!v) return;
        setInscripcion(v);
        return Promise.all([
          api.get(`/competidores/${v.idcompetidor}`),
          api.get(`/tutores/${v.idtutor}`),
        ]);
      })
      .then(([resC, resT]) => {
        setCompetidor(resC.data);
        setTutor(resT.data);
      })
      .catch((err) => {
        console.error(err);
        setError("No se pudo cargar la información de la inscripción rechazada.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [validarId, navigate]);

  if (loading) {
    return <p>Cargando…</p>;
  }
  if (error) {
    return <p className="error">{error}</p>;
  }
  if (!competidor || !tutor || !inscripcion) {
    return <p className="error">Faltan datos para mostrar la rechazo.</p>;
  }

  return (
    <div className="validar-container">
      <h2 className="titulo">Inscripción Rechazada</h2>

      <div className="card-rechazada">
        <h3 className="seccion">I. Datos del Competidor</h3>
        <ul className="lista">
          <li>
            <strong>Nombre/s y Apellido/s:</strong> {competidor.nombrecompetidor}{" "}
            {competidor.apellidocompetidor}
          </li>
          <li>
            <strong>Correo electrónico:</strong> {competidor.emailcompetidor}
          </li>
          <li>
            <strong>Cédula de Identidad:</strong> {competidor.cicompetidor}
          </li>
          <li>
            <strong>Fecha de Nacimiento:</strong>{" "}
            {new Date(competidor.fechanacimiento).toLocaleDateString()}
          </li>
          <li>
            <strong>Colegio:</strong> {competidor.colegio || "—"}
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
            <strong>Nombre/s y Apellido/s:</strong> {tutor.nombretutor}{" "}
            {tutor.apellidotutor}
          </li>
          <li>
            <strong>Correo electrónico:</strong> {tutor.correotutor}
          </li>
          <li>
            <strong>El tutor es:</strong> {tutor.tipo_tutor || "—"}
          </li>
          <li>
            <strong>Número de Celular:</strong> {tutor.telefonotutor}
          </li>
        </ul>
      </div>

      <div className="validacion">
        <p>
          <strong>Razones por las cuales esta inscripción fue rechazada:</strong>
        </p>
        <p>{inscripcion.motivo_rechazo || "—"}</p>
      </div>

      <div className="volver">
        <button className="btn-volver">
          <a href="/vista-tutor" className="ruta-tutor">
            🔙 Regresar a menú de tutor
          </a>
        </button>
      </div>
    </div>
  );
}

export default InscripcionRechazada;
