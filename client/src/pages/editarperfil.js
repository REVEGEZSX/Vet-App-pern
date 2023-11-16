import Layout from '../components/layout';
import { useState } from 'react';
import { editarUsuario } from '../api/auth';
//css
import '../styles/register.css'
//*************************************
//librerias bootstrap
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
//********************************************
const Editprofile = () => {
  const [usuarioData, setUsuarioData] = useState({
    nombre_usuario: '',
    apellido_usuario: '',
    correo_usuario: '',
    telefono_usuario: '',
    contrasena_usuario: ''
  });

  const handleChange = (e) => {
    setUsuarioData({
      ...usuarioData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await editarUsuario(usuarioData);
    console.log(response);
    setUsuarioData({
      nombre_usuario: '',
      apellido_usuario: '',
      correo_usuario: '',
      telefono_usuario: '',
      contrasena_usuario: ''
    });
  };

  return (
    <Layout>
      <section className='section-register'>
        <Form onSubmit={handleSubmit} className='mb-6 form-register'>
          <h1 className='form-title'>EDITAR PERFIL</h1>
          <Form.Group className="mb-3"><Form.Control type="text" name="nombre_usuario" className='form-control' value={usuarioData.nombre_usuario} onChange={handleChange} placeholder="Nombre" required /></Form.Group>
          <Form.Group className="mb-3"><Form.Control type="text" name="apellido_usuario" className='form-control' value={usuarioData.apellido_usuario} onChange={handleChange} placeholder="Apellido" required /></Form.Group>
          <Form.Group className="mb-3"><Form.Control type="email" name="correo_usuario" className='form-control' value={usuarioData.correo_usuario} onChange={handleChange} placeholder="Correo electrónico" required /></Form.Group>
          <Form.Group className="mb-3"><Form.Control type="tel" name="telefono_usuario" className='form-control' value={usuarioData.telefono_usuario} onChange={handleChange} placeholder="Teléfono" required /></Form.Group>
          <Form.Group className="mb-3"><Form.Control type="password" name="contrasena_usuario" className='form-control' value={usuarioData.contrasena_usuario} onChange={handleChange} placeholder="Contraseña" required /></Form.Group>
          <Button size='sm' type='submit' variant='success'>REGISTRARSE</Button>
        </Form>        
      </section>
    </Layout>
  );
};

export default Editprofile;
