import { useSearchParams } from 'react-router-dom';

export function PerfilEstudiante(){
    const [searchParam] = useSearchParams();
    const correo = searchParam.get('correo');
    const contrasenia = searchParam.get('contrasenia');

    return (
        <div>
            <p>correo es: {correo}</p>
            <p>clave es: {contrasenia}</p>
        </div>
    )
}