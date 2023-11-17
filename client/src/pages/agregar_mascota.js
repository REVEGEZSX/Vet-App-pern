import React, { useState, useEffect } from 'react';
import Layout from '../components/layout';
import {
  registrarMascota,
  obtenerOpcionesSexoMascota,
  obtenerOpcionesTipoMascota,
} from '../api/auth';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const RegisterPet = () => {
  const [showModal, setShowModal] = useState(false);
  const [petData, setPetData] = useState({
    nombre: '',
    sexo: '',
    tipo: '',
  });
  const [opcionesSexo, setOpcionesSexo] = useState([]);
  const [opcionesTipo, setOpcionesTipo] = useState([]);

  useEffect(() => {
    obtenerOpcionesSexo();
    obtenerOpcionesTipo();
  }, []);

  const obtenerOpcionesSexo = async () => {
    try {
      const opcionesSexo = await obtenerOpcionesSexoMascota();
      setOpcionesSexo(opcionesSexo.options);
    } catch (error) {
      console.error('Error al obtener opciones de sexo:', error);
    }
  };

  const obtenerOpcionesTipo = async () => {
    try {
      const opcionesTipo = await obtenerOpcionesTipoMascota();
      setOpcionesTipo(opcionesTipo.options);
    } catch (error) {
      console.error('Error al obtener opciones de tipo:', error);
    }
  };

  const onChange = (e) => {
    setPetData({
      ...petData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await registrarMascota(petData);
      setPetData({
        nombre: '',
        sexo: '',
        tipo: '',
        
      });
      setShowModal(true);
    } catch (error) {
      console.error(error);
    }
  };
  const handleClose = () => {
    setShowModal(false);
    setPetData({
      nombre: '',
      sexo: '',
      tipo: '',
    });
  };
  
  return (
    <Layout>
      <section className='section-register'>
        <Form onSubmit={onSubmit} className='mb-6 form-register'>
          <h1 className='form-title'>REGISTRO DE MASCOTA</h1>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              name="nombre"
              className='form-control'
              value={petData.nombre}
              onChange={onChange}
              placeholder="Nombre de la Mascota"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              as="select"
              name="sexo"
              value={petData.sexo}
              onChange={onChange}
              required
            >
              <option value="" disabled>
                Selecciona el sexo
              </option>
              {opcionesSexo.map((opcion) => (
                <option key={opcion.id_mascota_sexo} value={opcion.id_mascota_sexo}>
                  {opcion.nombre_sexo}
                </option>
              ))}
            </Form.Control>
            
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              as="select"
              name="tipo"
              value={petData.tipo}
              onChange={onChange}
              required
            >
              <option value="" disabled>
                Selecciona el tipo
              </option>
              {opcionesTipo.map((opcion) => (
                <option key={opcion.id_tipo_mascota} value={opcion.id_tipo_mascota}>
                  {opcion.nombre_tipo_mascota}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Foto de la Mascota</Form.Label>
            <Form.Control
              type="file"
              name="foto"
              onChange={onChange}
              accept="image/*"
            />
          </Form.Group>

          <Button size='sm' type='submit' variant='success'>
            REGISTRAR MASCOTA
          </Button>
          <Modal show={showModal} onHide={handleClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>¡Mascota registrada!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              La mascota se registró correctamente.
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

export default RegisterPet;


