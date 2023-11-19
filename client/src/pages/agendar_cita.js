import Layout from "../components/layout"
import { useState, useEffect } from 'react'
import { listaVeterinarios, listaMascotasDeDueno, crearCita } from '../api/auth'
//css
import '../styles/register.css'
import '../styles/agendar_cita.css'
//*************************************
//librerias bootstrap
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
//********************************************

const Agendar_citas = () =>{

  const [veterinarios, setVeterinarios] = useState([]);
  const [mascotas, setMascotas] = useState([]);
  const [citaData, setCitaData] = useState({
    fecha_cita: '',
    id_veterinario_cita: '',
    id_mascota_cita: ''
  });

  const handleChange = (e) => {
    setCitaData({
      ...citaData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await crearCita(citaData);
    console.log(response);
    setCitaData({
      fecha_cita: '',
      id_veterinario_cita: '',
      id_mascota_cita: ''
    });
  };

  useEffect(() => {
    listaVeterinarios()
      .then(response => {
        console.log('respuesta completa: ', response)
        setVeterinarios(response);
      })
      .catch(error => {
        console.error('Hubo un error al obtener la lista de veterinarios:', error);
        if (error.response) {
          console.log(error.response.data);
        }
      });

    listaMascotasDeDueno()
      .then(response => {
        console.log('respuesta completa: ', response)
        setMascotas(response);
      })
      .catch(error => {
        console.error('Hubo un error al obtener la lista de mascotas:', error);
        if (error.response) {
          console.log(error.response.data);
        }
      });
  }, []);

  return (
    <Layout>
      <section className='section-cita-apartar'>
        <Form onSubmit={handleSubmit} className='mb-6 form-register apartar-cita'>
          <h1 className="form-title-apo">APARTAR CITA</h1>
          <Form.Group className="mb-3">
            <Form.Control
              type='date'
              name='fecha_cita'
              className='form-control-apo'
              value={citaData.fecha_cita}
              onChange={handleChange}
              placeholder='fecha_cita'
              required
            />            
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Select 
              name='id_veterinario_cita'
              className='form-control-apo' 
              value={citaData.id_veterinario_cita}
              onChange={handleChange}
              required
            >
              <option>--Seleccione un veterinario</option>
              {veterinarios.map(
                veterinario => (
                  <option key={veterinario.id_usuario} value={veterinario.id_usuario}>{veterinario.nombre_usuario}</option>))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
          <Form.Select 
            name='id_mascota_cita'
            className='form-control-apo' 
            value={citaData.id_mascota_cita}
            onChange={handleChange}
            required
          >
            <option>--Seleccione su mascota</option>
            {mascotas.map(
              mascota => (
                <option key={mascota.id_mascota} value={mascota.id_mascota}>{mascota.nombre_mascota}</option>))}
          </Form.Select>            
          </Form.Group>
          <Button size='sm' type='submit' variant='success'>REGISTRARSE</Button>
        </Form>        
      </section>
    </Layout>
  )
}
export default Agendar_citas;