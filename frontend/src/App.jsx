// src/App.jsx
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Inicio } from './paginas/Inicio';
import { Barra } from './componentes/Barra';
import { InfoInscripcion } from './paginas/InfoInscripcion';
import { Estudiante } from './paginas/sesion/Estudiante';
import { Admin } from './paginas/sesion/Admin';
import { Cajero } from './paginas/sesion/Cajero';
import { Tutor } from './paginas/sesion/Tutor';
import { PerfilEstudiante } from './paginas/sesion/Perfil';
import { EditarPerfil } from './paginas/sesion/EditarPerfil';
import { RegistroEstudiante } from './paginas/registro/RegistroEstudiante';
import { RegistroAdministrador } from './paginas/registro/RegistroAdmin';
import { RegistroCajero } from './paginas/registro/RegistroCajero';
import { RegistroTutor } from './paginas/registro/RegistroTutor';
import { Competiciones } from './paginas/competiciones/Competiciones';
import { Area } from './paginas/competiciones/Area';
import { Inscripcion } from './paginas/competiciones/Inscripcion';
import { Confirmacion } from './paginas/competiciones/Confirmacion';
import { VistaCajero } from './paginas/cajero/VistaCajero';
import { VistaAdmin } from './paginas/admin/VistaAdmin';
import { VistaTutor } from './paginas/tutor/VistaTutor';
import { Boleta } from './paginas/cajero/Boleta';
import { Pago } from './paginas/cajero/Pago';
import { ListadoPostulantes } from './paginas/admin/ListadoPostulantes';
import { ListadoPagos } from './paginas/admin/ListadoPagos';
import { ListadoCompeticiones } from './paginas/admin/ListadoCompeticiones';
import { NuevaCompetencia } from './paginas/admin/NuevaCompetencia';
import { GestionarFechas } from './paginas/admin/GestionarFechas';
import { Login } from './componentes/Login';
import { FormularioEdicionPerfil } from './paginas/formularios/FormularioEdicionPerfil';
import { FormularioIns } from './paginas/competiciones/FormularioIns';
import { EditarPerfilCajero } from './paginas/cajero/EditarPerfilCajero';
import {EditarPerfilTutor} from './paginas/tutor/EditarPerfilTutor';
import {EditarPerfilAdmin} from './paginas/admin/EditarPerfilAdmin';


function App() {
  return (
    <BrowserRouter>
      <Barra />
      <Routes>
        <Route path="/" element={<Navigate to="/inicio" replace />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/informacion-inscripciones" element={<InfoInscripcion />} />

        {/* Login y Sesiones */}
        <Route path="/login" element={<Login key={Math.random()} />} />
        <Route path="/sesion-estudiante" element={<Estudiante />} />
        <Route path="/sesion-cajero" element={<Cajero />} />
        <Route path="/sesion-admin" element={<Admin />} />
        <Route path="/sesion-tutor" element={<Tutor />} />

        {/* Paneles */}
        <Route path="/vista-admin" element={<VistaAdmin />} />
        <Route path="/vista-cajero" element={<VistaCajero />} />
        

        {/* Perfil */}
        <Route path="/perfil-estudiante" element={<PerfilEstudiante />} />
        <Route path="/editar-perfil" element={<EditarPerfil />} />
        <Route path="/editar-perfil" element={<FormularioEdicionPerfil />} />

        {/* Registro */}
        <Route path="/registro" element={<RegistroEstudiante />} />
        <Route path="/registro-admin" element={<RegistroAdministrador />} />
        <Route path="/registro-cajero" element={<RegistroCajero />} />
        <Route path="/registro-tutor" element={<RegistroTutor />} />

        {/* Competiciones */}
        <Route path="/competiciones" element={<Competiciones />} />
        {/* Parámetro dinámico para cargar un área concreta */}
        <Route path="/area/:id" element={<Area />} />
        {/* Listado de inscripciones para un competidor, etc. */}
        <Route path="/inscripcion" element={<Inscripcion />} />
        {/* Formulario de inscripción separado para evitar conflictos */}
        <Route path="/inscripcion/registro" element={<FormularioIns />} />
        <Route path="/confirmacion" element={<Confirmacion />} />

        {/* Cajero */}
        <Route path="/generar-boleta" element={<Boleta />} />
        <Route path="/pago-boleta" element={<Pago />} />
        <Route path="/editar-perfil-cajero" element={<EditarPerfilCajero />} />

        {/* Admin */}
        <Route path="/editar-perfil-admin" element={<EditarPerfilAdmin />} />
        <Route path="/listado-postulantes" element={<ListadoPostulantes />} />
        <Route path="/listado-pagos" element={<ListadoPagos />} />
        <Route path="/listado-competiciones" element={<ListadoCompeticiones />} />
        <Route path="/nueva-competencia" element={<NuevaCompetencia />} />
        <Route path="/gestionar-fechas" element={<GestionarFechas />} />

        {/* Tutor: validación con parámetro dinámico */}
        <Route path="/editar-perfil-tutor" element={<EditarPerfilTutor />} />

        <Route path="/vista-tutor" element={<VistaTutor />} />


        {/* Fallback: si no coincide ninguna ruta */}
        <Route path="*" element={<Navigate to="/inicio" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
