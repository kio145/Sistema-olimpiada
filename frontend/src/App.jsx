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
import { RegistroAdministrador} from './paginas/registro/RegistroAdmin';
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
import { ValidarInscripcion } from './paginas/tutor/ValidarInscripcion';
import { InscripcionValidada } from './paginas/tutor/InscripcionValidada';
import { InscripcionRechazada } from './paginas/tutor/InscripcionRechazada';
import { Login } from './componentes/Login';




function App() {
  return (
    <BrowserRouter>
      <Barra/>
      <Routes>
        <Route path="/" element={<Navigate to="/inicio" />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/informacion-inscripciones" element={<InfoInscripcion />} />

        {/* Formularios de sesión y registro */}
        <Route path="/login" element={<Login />} />
        <Route path="/sesion-estudiante" element={<Estudiante />} />
        <Route path="/sesion-cajero" element={<Cajero />} />
        <Route path="/sesion-admin" element={<Admin />} />
        <Route path="/sesion-tutor" element={<Tutor />} />

        {/* Paneles */}
        <Route path="/vista-admin" element={<VistaAdmin />} />
        <Route path="/vista-cajero" element={<VistaCajero />} />
        <Route path="/vista-tutor" element={<VistaTutor />} />

        {/* Resto de rutas... */}
        <Route path="/perfil-estudiante" element={<PerfilEstudiante />} />
        <Route path="/editar-perfil" element={<EditarPerfil />} />
        <Route path="/registro" element={<RegistroEstudiante />} />
        <Route path="/registro-admin" element={<RegistroAdministrador />} />
        <Route path="/registro-cajero" element={<RegistroCajero />} />
        <Route path="/registro-tutor" element={<RegistroTutor />} />
        <Route path="/competiciones" element={<Competiciones />} />
        <Route path="/area" element={<Area />} />
        <Route path="/inscripcion" element={<Inscripcion />} />
        <Route path="/confirmacion" element={<Confirmacion />} />
        <Route path="/generar-boleta" element={<Boleta />} />
        <Route path="/pago-boleta" element={<Pago />} />
        <Route path="/vista-admin/listado-postulantes" element={<ListadoPostulantes />} />
        <Route path="/vista-admin/listado-pagos" element={<ListadoPagos />} />
        <Route path="/vista-admin/listado-competiciones" element={<ListadoCompeticiones />} />
        <Route path="/nueva-competencia" element={<NuevaCompetencia />} />
        <Route path="/gestionar-fechas" element={<GestionarFechas />} />
        <Route path="/validar-inscripcion" element={<ValidarInscripcion />} />
        <Route path="/inscripcion-aceptada" element={<InscripcionValidada />} />
        <Route path="/inscripcion-rechazada" element={<InscripcionRechazada />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
