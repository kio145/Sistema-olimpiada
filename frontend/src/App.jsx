import './App.css'
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import { Inicio } from './paginas/Inicio';
import { Barra } from './componentes/Barra';
import { InfoInscripcion } from './paginas/InfoInscripcion';
import { Estudiante } from './paginas/sesion/Estudiante';
import { Admin } from './paginas/sesion/Admin';
import { Cajero } from './paginas/sesion/Cajero';
import { PerfilEstudiante } from './paginas/sesion/Perfil';

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
      <Route path='/perfil-estudiante' element={<PerfilEstudiante/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
