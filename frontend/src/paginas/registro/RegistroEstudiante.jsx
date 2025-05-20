import '../../css/Inicio.css';
import { FormularioRegistro } from '../formularios/FormularioRegistro';
import Nav from 'react-bootstrap/Nav';
import { Container, Row, Col, Form, Button, InputGroup, FormGroup } from 'react-bootstrap';
import { Mail,Lock } from 'lucide-react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';
import { LiaIdCard } from "react-icons/lia";

function RegistroEstudiante2(){
    return (
        <div>
            <p className='titulo1'>Registrarse</p>
            <p className='titulo2'>Como Estudiante</p>
            <FormularioRegistro/>
        </div>
    )
}
export function RegistroEstudiante() {
    const [tabActiva, setTabActiva] = useState('estudiante');
  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Row className="w-100 justify-content-center">
        <Col md={6} lg={4} className="">
          <h1 className="mb-4 text-center">Registrarse</h1>

          <Nav
            variant="tabs"
            activeKey={tabActiva}
            onSelect={(selectedKey) => setTabActiva(selectedKey)}
            className="justify-content-center mb-4 border-bottom-0"
            >
            <Nav.Item>
              <Nav.Link eventKey="estudiante" > Estudiante</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="tutor">Tutor</Nav.Link>
            </Nav.Item>
            
          {tabActiva === 'estudiante' && <FormularioRegistroEstudiante />}
          {tabActiva === 'tutor' && <FormularioRegistroTutor />}
          </Nav>
        </Col>
      </Row>
    </Container>
  );
}

export function FormularioRegistroEstudiante() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(prev => !prev);

  return (
    <Container className="d-flex justify-content-center align-items-center pt-5">
      <Row className="justify-content-center w-100">
        <Col md={10} lg={11}>
          <Form className='z'>
            <FormGroup>
              <Form.Label> <LiaIdCard className='me-2' size={'30'} />Nombre completo</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={e=>setName(e.target.value)}
                placeholder='Nombre Completo'
                >
              </Form.Control>
            </FormGroup>
            <Form.Group controlId="formEmail" className="pb-2 pt-2">
              <Form.Label className=''><Mail className='me-2' />Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="ejemplo@correo.com"
              />
            </Form.Group>
            <Form.Group controlId="formPassword" className="mb-4 pb-2 pt-2">
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
                  style={{width: '1px', position:'absolute', marginLeft: '80%'}}
                >
                  {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
              </Button>

              </InputGroup>
            </Form.Group>
            <div className="d-flex justify-content-center align-items-center pb-3">
              <Button variant="primary">
                Registrarse
              </Button>
              
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}


export function FormularioRegistroTutor(){
    return(
    <>
        <h1>Hola Registro 2</h1>
    </>
    )
}