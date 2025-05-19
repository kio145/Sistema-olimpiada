import '../../css/Formulario.css';
import { Lock , Mail ,Eye, EyeOff} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Formulario(){
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
                    <label htmlFor="correo" id='texto'> <Mail color='#359bdf'/> Correo Electrónico</label>
                    <input type="email" name="correo" id="correo"  onChange={(e) => setCorreo(e.target.value)}/>
                </div>
                <div  className='campo' id='entrada'>
                    <label htmlFor="password" id='texto'> <Lock color='#359bdf'/> Contraseña</label>
                    <div className='contenedor-contrasenia'>
                        <input name="password" id="password" 
                            type={mostrarContrasenia ? 'text' : 'password'}
                            onChange={(e) => setContrasenia(e.target.value)}/> 
                        <span className='icono-mostrar-contrasenia'
                            onClick={() => setMostrarContrasenia(!mostrarContrasenia)}>
                                {mostrarContrasenia } 
                        </span>
                    </div>
                </div>
                <div  className='campo' id='boton'>
                    <button type="submit">Iniciar Sesión</button>
                </div>
            </form>
        </div>
    )
}