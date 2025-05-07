import './App.css'
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import { Inicio } from './paginas/Inicio';
import { Barra } from './componentes/Barra';
import { InfoInscripcion } from './paginas/InfoInscripcion';
import { Estudiante } from './paginas/sesion/Estudiante';
import { Admin } from './paginas/sesion/Admin';
import { Cajero } from './paginas/sesion/Cajero';
import { Tutor} from './paginas/sesion/Tutor';
import { PerfilEstudiante } from './paginas/sesion/Perfil';
import { RegistroEstudiante } from './paginas/sesion/RegistroEstudiante';
import { RegistroAdministrador} from './paginas/sesion/RegistroAdmin';
import { RegistroTutor } from './paginas/sesion/RegistroTutor';
import { RegistroCajero } from './paginas/sesion/RegistroCajero';
import { Competiciones } from './paginas/competiciones/Competiciones';



function App() {
  return (
    <BrowserRouter>
      <Barra/>
      <Routes>
      <Route path="/" element={<Navigate to="/inicio"/>}/>
      <Route path="/inicio" element={<Inicio />} />
      <Route path="/informacion-inscripciones" element={<InfoInscripcion />} />
      <Route path='/sesion-estudiante' element={<Estudiante/>}/>
      <Route path='/sesion-cajero' element={<Cajero/>}/>
      <Route path='/sesion-admin' element={<Admin/>}/>
      <Route path='/sesion-tutor' element={<Tutor/>}/>
      <Route path='/perfil-estudiante' element={<PerfilEstudiante/>}></Route>
      <Route path='/registro' element={<RegistroEstudiante/>}></Route>
      <Route path='/registro-admin' element={<RegistroAdministrador/>}></Route>
      <Route path='/registro-cajero' element={<RegistroCajero/>}></Route>
      <Route path='/registro-tutor' element={<RegistroTutor/>}></Route>
      <Route path='/competiciones' element={<Competiciones/>}></Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
