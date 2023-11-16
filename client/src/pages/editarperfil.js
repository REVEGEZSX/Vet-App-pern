import Layout from '../components/layout';
import { useState } from 'react';
import { editarUsuario } from '../api/auth';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
//css
import '../styles/register.css'
//*************************************
//librerias bootstrap
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
//********************************************
const Editprofile = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [usuarioData, setUsuarioData] = useState({
    nombre_usuario: localStorage.getItem('nombreI'),
    apellido_usuario: localStorage.getItem('apellidoI'),
    correo_usuario: localStorage.getItem('correoI'),
    telefono_usuario: localStorage.getItem('telefonoI'),
    contrasena_usuario: ''
  });

  const onChange = (e) => {
    setUsuarioData({
      ...usuarioData,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await editarUsuario(usuarioData);
    console.log(response);
    setShowModal(true)
  };

  const handleClose = () => {
    setShowModal(false);
    navigate('/home')
  };

  return (
    <Layout>
      <section className='section-register'>
        <Form onSubmit={onSubmit} className='mb-6 form-register'>
          <h1 className='form-title'>EDITAR PERFIL</h1>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              name="nombre_usuario"
              className='form-control'
              value={usuarioData.nombre_usuario}
              onChange={onChange}
              placeholder="Nombre"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              name="apellido_usuario"
              className='form-control'
              value={usuarioData.apellido_usuario}
              onChange={onChange}
              placeholder="Apellido"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              name="correo_usuario"
              className='form-control'
              value={usuarioData.correo_usuario}
              onChange={onChange}
              placeholder="Correo electrónico"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="tel"
              name="telefono_usuario"
              className='form-control'
              value={usuarioData.telefono_usuario}
              onChange={onChange}
              placeholder="Teléfono"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              name="contrasena_usuario"
              className='form-control'
              value={usuarioData.contrasena_usuario}
              onChange={onChange}
              placeholder="Contraseña"
              required
            />
          </Form.Group>
          <Button size='sm' type='submit' variant='success'>
            GUARDAR CAMBIOS
          </Button>   
            <Modal show={showModal} onHide={handleClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>¡Cambios guardados!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Tus cambios se guardaron correctamente.
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleClose}>
                OK
              </Button>
            </Modal.Footer>
          </Modal>                 
        </Form>
      </section>
    </Layout>
  );
};

export default Editprofile;
