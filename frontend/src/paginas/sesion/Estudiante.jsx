import { useState } from 'react';
import '../../css/Inicio.css';
import { Formulario } from '../formularios/Formulario';
import { Container, Row, Col, Form, Button,InputGroup  } from 'react-bootstrap';
import { Mail,Lock } from 'lucide-react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Estudiante2() {
  const [mostrarSubmenu, setMostrarSubmenu] = useState(false);

  const toggleSubmenu = () => {
    setMostrarSubmenu(!mostrarSubmenu);
  };

  return (
    <div>
      <p className='titulo1'>Iniciar Sesión</p>
      <Formulario />
      <div className="parrafoFinal">
        <p>En caso de no tener una cuenta por favor</p>
        <div className="menu-boton centrado">
          <a href="#" className="opcion" onClick={toggleSubmenu}>
            Registrarse
          </a>
          {mostrarSubmenu && (
            <ul className="submenu">
              <li><a href="/registro">Estudiante</a></li>
              <li><a href="/registro-tutor">Tutor</a></li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export function Estudiante() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navegacion = useNavigate();
  const togglePassword = () => setShowPassword(prev => !prev);

  function handleSubmit(e) {
    
    console.log(email,password);
    if (email && password){
    navegacion(`/perfil-estudiante?correo=${encodeURIComponent(email)}&contrasenia=${encodeURIComponent(password)}`);
    }
  }

  return(
    <Container
      className="d-flex justify-content-center align-items-center"
    >
      <Row className="w-100 justify-content-center">
        <Col md={6} lg={4}>
          <h1 className="text-center" style={{ color: '#359bdf' }}>Iniciar Sesión</h1>
          <Form className='pt-5'> 
            <Form.Group controlId="formEmail" className='pb-2'>
              <Form.Label><Mail className='me-2' />Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="ejemplo@correo.com"
              />
            </Form.Group>

           <Form.Group controlId="formPassword" className="mb-4">
              <Form.Label> <Lock className='me-1'/> Contraseña</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  variant="link"
                  onClick={togglePassword}
                  style={{width: '1px', position:'fixed',marginLeft:'24%'}}
                >
                  {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
              </Button>

              </InputGroup>
            </Form.Group>
            
            <div className="d-flex justify-content-center align-items-center pb-3">
              <Button variant="primary" onClick={handleSubmit}>
                Iniciar Sesión
              </Button>
              
            </div>
            <p>En caso de no tener una cuenta, por favor <a href='/registro'>Registrese</a></p>
          </Form>
        </Col>
      </Row>
    </Container>
  )

}