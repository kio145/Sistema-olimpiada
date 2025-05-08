import '../../css/Formulario.css';
import { Lock , Mail ,Eye, EyeOff} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function FormularioRegistro(){
    const [correo, setCorreo] = useState('');
    const [contrasenia, setContrasenia] = useState('');
    const [mostrarContrasenia, setMostrarContrasenia] = useState(false);
    const navegacion = useNavigate();

    const iniciar = (event) => {
        event.preventDefault(); 
        console.log(correo);
        console.log(contrasenia);
        navegacion(`/perfil-estudiante?correo=${encodeURIComponent(correo)}&contrasenia=${encodeURIComponent(contrasenia)}`);
    };

    return (
        <div>
            <form onSubmit={iniciar} className='formulario'>
                <div className='campo' id='entrada'>
                    <label htmlFor="nombre" id='texto'> Nombre de Usuario</label>
                    <input type="text" name="nombre" id="nombre"  onChange={(e) => setNombre(e.target.value)}/>
                </div>
                <div className='campo' id='entrada'>
                    <label htmlFor="correo" id='texto'> Correo Electronico</label>
                    <input type="email" name="correo" id="correo"  onChange={(e) => setCorreo(e.target.value)}/>
                </div>
                <div  className='campo' id='entrada'>
                    <label htmlFor="password" id='texto'> Contrasena</label>
                    <div className='contenedor-contrasenia'>
                        <input name="password" id="password" 
                            type={mostrarContrasenia ? 'text' : 'password'}
                            onChange={(e) => setContrasenia(e.target.value)}/> 
                        <span className='icono-mostrar-contrasenia'
                            onClick={() => setMostrarContrasenia(!mostrarContrasenia)}>
                                {mostrarContrasenia ? <EyeOff color='#777'/> : <Eye color='#777'/> } 
                        </span>
                    </div>
                </div>
                <div  className='campo' id='entrada'>
                    <label htmlFor="password" id='texto'> Confirmar Contrasena</label>
                    <div className='contenedor-contrasenia'>
                        <input name="password" id="password" 
                            type={mostrarContrasenia ? 'text' : 'password'}
                            onChange={(e) => setContrasenia(e.target.value)}/> 
                        <span className='icono-mostrar-contrasenia'
                            onClick={() => setMostrarContrasenia(!mostrarContrasenia)}>
                                {mostrarContrasenia ? <EyeOff color='#777'/> : <Eye color='#777'/> } 
                        </span>
                    </div>
                </div>
                <div  className='campo' id='boton'>
                    <button type="submit">Registrarse</button>
                </div>
            </form>
        </div>
    )
}