import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { CircleUserRound } from 'lucide-react';
import logo from '/logo.JPG';

function Barra2(){
    return (
        <div className='barraNavegacion'>
            <a href="/inicio">
            <div className='cuadroLogo'>
                <img src={logo} alt="logo"/>
            </div>
            </a>
            
            <div className="enlaces">
                <ul><a href="/informacion-inscripciones" className='opcion'>¿Como me inscribo?</a></ul>
                <ul><a href="/competiciones" className='opcion'>Competiciones</a></ul>
                <ul><CircleUser /><a href="/sesion-estudiante" className='opcion'>Iniciar Sesion</a>
                </ul>
            </div>
        </div>
    )
}

export function Barra(){
    return(
        <Navbar bg="white" className="shadow p-0 mb-5" >
        <Container className='p-3'>
          <Navbar.Brand href="/inicio">
            <img
              src={logo}
              className="d-inline-block align-top"
              alt="logo.png"
            />
          </Navbar.Brand>
          <Nav className="ms-auto">
            <div class="vr" />
            <Nav.Link className="px-5" href="/informacion-inscripciones">¿Como me inscribo?</Nav.Link>
            <div class="vr"  />
            <Nav.Link className="px-5" href="/competiciones">Competiciones</Nav.Link>
            <div class="vr"  />
            <Nav.Link className="px-5" href="/sesion-estudiante">
                <CircleUserRound className="mx-2 w-auto h-auto" />Iniciar Sesion</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

    )
}