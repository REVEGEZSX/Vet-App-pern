import React from 'react';
import { useSelector } from 'react-redux';
import Closesession from './closesession';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavbarBrand from 'react-bootstrap/esm/NavbarBrand';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Header = () => {
    const { isAuth } = useSelector((state) => state.auth);
    const nombreRegistro = localStorage.getItem('nombreI');
    const apellidoRegistro = localStorage.getItem('apellidoI');
    const nombreDeUsuario = nombreRegistro + ' ' + apellidoRegistro;

    return (
        <>{isAuth ? (
          <Navbar data-bs-theme="dark" bg='dark'>
              <Container>
                <Nav>
                    <NavbarBrand href='/home'>INICIO</NavbarBrand>
                    <Nav.Link href='/agendar_citas'>AGENDAR CITAS</Nav.Link>
                    <Nav.Link href='/'></Nav.Link>
                    <Nav.Link href='/registrar_mascota'>REGISTRAR MASCOTA</Nav.Link>
                    <NavDropdown title={nombreDeUsuario} id="basic-nav-dropdown">
                        <NavDropdown.Item href="/editar_perfil">EDITAR PERFIL</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item>
                        <Closesession />
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
              </Container>
                </Navbar>
      ) : (
          <Navbar data-bs-theme="dark" bg='dark'>
            <Container>
              <Nav>
                <NavbarBrand href='/home'>INICIO</NavbarBrand>
                <Nav.Link href='/login'>INGRESO</Nav.Link>
                <Nav.Link href='/register'>REGISTRO</Nav.Link>
              </Nav>
            </Container>
          </Navbar>
      )}</>
    );
};

export default Header;
