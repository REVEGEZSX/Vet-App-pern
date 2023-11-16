import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Closesession from './closesession'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavbarBrand from 'react-bootstrap/esm/NavbarBrand';
const Header = () => {
    const { isAuth } = useSelector((state) => state.auth)
    return(
    <>
      {isAuth ?(
        <Navbar data-bs-theme="dark" bg='dark'>
          <Container>
            <Nav>
              <NavbarBrand href='/home'>INICIO</NavbarBrand>
              <Nav.Link href='/agendar_citas'>AGENDAR CITAS</Nav.Link>
              <Nav.Link href='/editar_perfil'>EDITAR PERFIL</Nav.Link>
              <Closesession/>
            </Nav>
          </Container>
        </Navbar>
          ):(
        <Navbar data-bs-theme="dark" bg='dark'>
          <Container>
            <Nav>
              <NavbarBrand href='/home'>INICIO</NavbarBrand>
              <Nav.Link href='/login'>INGRESO</Nav.Link>
              <Nav.Link href='/register'>REGISTRO</Nav.Link>
            </Nav>
          </Container>                                                 
        </Navbar>
      )}                
    </>            
    )
}
export default Header