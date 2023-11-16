import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { onLogout } from '../api/auth';
import { unauthenticateUser } from '../redux/slices/authSlice';
import { Modal, Button } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';

const Closesession = () => {
  const dispatch = useDispatch();
  const [modal, setShowModal] = useState(false);

  const showModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const logout = async () => {
    try {
      await onLogout();
      dispatch(unauthenticateUser());
      localStorage.removeItem('isAuth');
      localStorage.removeItem('userRole');
      closeModal();
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <>
      <Nav.Link onClick={showModal}>CERRAR SESION</Nav.Link>

      <Modal show={modal} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Cierre de Sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas cerrar sesión?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={logout}>
            Cerrar Sesión
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Closesession;