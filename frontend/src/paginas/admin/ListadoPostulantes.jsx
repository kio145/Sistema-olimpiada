// src/components/ListadoPostulantes.jsx

import React, { useState, useEffect } from 'react';
import '../../css/ListadoPostulantes.css';
import { FaSearch, FaEdit, FaTrash, FaFilePdf, FaFileExcel } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import api from '@/api/api';
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import logo from '/logo.JPG'; 

export function ListadoPostulantes() {
  const [busqueda, setBusqueda]       = useState('');
  const [postulantes, setPostulantes] = useState([]);
  const [error, setError]             = useState('');
  const navigate                      = useNavigate();

  useEffect(() => {
    const fetchHabilitados = async () => {
      try {
        const res = await api.get('/competidores/habilitados');
        setPostulantes(res.data);
      } catch (e) {
        console.error('Error al cargar postulantes habilitados:', e);
        setError('No se pudo cargar el listado de postulantes habilitados.');
      }
    };
    fetchHabilitados();
  }, []);

  const filtrados = postulantes.filter(p =>
    `${p.nombre} ${p.apellidos} ${p.correo}`.toLowerCase().includes(busqueda.toLowerCase())
  );

  const eliminarPostulante = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar este postulante?')) return;
    try {
      await api.delete(`/competidores/${id}`);
      setPostulantes(prev => prev.filter(p => p.id !== id));
    } catch (e) {
      console.error('Error al eliminar postulante:', e);
      alert('No se pudo eliminar. Intenta nuevamente.');
    }
  };

  const editarPostulante = (id) => {
    navigate(`/editar-competidor/${id}`);
  };

  // ==========================
  // AQUÍ LA FUNCIÓN PDF FORMAL
  // ==========================
  const exportarPDF = async () => {
    const doc = new jsPDF('landscape');
    const pageWidth = doc.internal.pageSize.getWidth();
    // Logo (opcional, ajusta el tamaño según tu imagen)
    try { doc.addImage(logo, 'JPEG', 15, 6, 25, 18); } catch (e) {}

    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('REPORTE DE POSTULANTES HABILITADOS', pageWidth / 2, 20, { align: 'center' });

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Fecha de generación: ${new Date().toLocaleDateString()}`, pageWidth - 70, 28);

    // Tabla de datos
    const head = [[
      "ID", "Nombre", "Apellidos", "Correo", "Nivel", "Área",
      "Nombre Tutor", "Apellido Tutor", "Teléfono Tutor", "Estado"
    ]];

    const body = filtrados.map(p => [
      p.id,
      p.nombre,
      p.apellidos,
      p.correo,
      p.nivel,
      p.area,
      p.tutorNombre,
      p.tutorApellido,
      p.telefono,
      p.estado_validacion_tutor !== 'validado'
        ? (p.estado_validacion_tutor === 'rechazado'
            ? 'Validación Tutor: Rechazado'
            : 'Validación Tutor: En espera'
          )
        : (p.estado_pago !== 'pagado'
            ? 'Pago: En espera'
            : 'Inscrito'
          )
    ]);

    autoTable(doc,{
      head,
      body,
      startY: 34,
      theme: 'grid',
      headStyles: {
        fillColor: [33, 97, 140],
        textColor: 255,
        fontStyle: 'bold',
        halign: 'center',
        valign: 'middle',
      },
      styles: {
        fontSize: 9,
        cellPadding: 2,
        overflow: 'linebreak',
        halign: 'center',
        valign: 'middle',
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240],
      },
      margin: { left: 7, right: 7 },
      didDrawPage: (data) => {
        // Pie de página con paginación
        const pageCount = doc.internal.getNumberOfPages();
        doc.setFontSize(9);
        doc.text(`Página ${pageCount}`, pageWidth - 20, doc.internal.pageSize.getHeight() - 10);
      }
    });

    // Pie institucional
    doc.setFontSize(10);
    doc.text('Este reporte fue generado automáticamente desde el sistema.', pageWidth / 2, doc.internal.pageSize.getHeight() - 5, { align: 'center' });

    doc.save('reporte_postulantes_habilitados.pdf');
  };

  // ==========================
  // FIN DE LA FUNCIÓN PDF
  // ==========================

  

  const volver = () => {
    navigate('/vista-admin');
  };

  return (
    <div className="listado-container">
      <h2>Postulantes Habilitados</h2>

      {error && <p className="error">{error}</p>}

      <div className="busqueda-postulante">
        <input
          type="text"
          placeholder="Buscar por nombre, apellidos o correo..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <button className="buscar-btn">
          <FaSearch />
        </button>
      </div>

      <div className="export-buttons">
        <button onClick={exportarPDF} className="export-btn pdf">
          <FaFilePdf /> PDF
        </button>
      </div>

      <table className="tabla-postulantes">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Correo</th>
            <th>Nivel</th>
            <th>Área</th>
            <th>Nombre Tutor</th>
            <th>Apellido Tutor</th>
            <th>Teléfono Tutor</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filtrados.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nombre}</td>
              <td>{p.apellidos}</td>
              <td>{p.correo}</td>
              <td>{p.nivel}</td>
              <td>{p.area}</td>
              <td>{p.tutorNombre}</td>
              <td>{p.tutorApellido}</td>
              <td>{p.telefono}</td>
              <td>
                {p.estado_validacion_tutor !== 'validado' ? (
                  p.estado_validacion_tutor === 'rechazado'
                    ? 'Validación Tutor: Rechazado'
                    : 'Validación Tutor: En espera'
                ) : (
                  p.estado_pago !== 'pagado'
                    ? 'Pago: En espera'
                    : 'Inscrito'
                )}
              </td>
              <td>
                <button
                  className="accion editar"
                  onClick={() => editarPostulante(p.id)}
                >
                  <FaEdit />
                </button>
                <button
                  className="accion eliminar"
                  onClick={() => eliminarPostulante(p.id)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
          {filtrados.length === 0 && (
            <tr>
              <td colSpan="11" className="no-data">
                No hay postulantes habilitados que coincidan con la búsqueda.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="volver">
        <button onClick={volver}>⨯ Regresar al menú de administrador</button>
      </div>
    </div>
  );
}

export default ListadoPostulantes;
