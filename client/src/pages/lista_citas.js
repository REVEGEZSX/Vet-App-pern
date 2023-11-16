import Layout from "../components/layout"
import { useState, useEffect } from 'react'
import { obtenerCitas } from '../api/auth'
import Card from 'react-bootstrap/Card'
import '../styles/lista_citas.css'
const Lista_citas = () =>{

  const [citas, setCitas] = useState([]);

  useEffect(() => {
    obtenerCitas()
      .then(response => {
        console.log(response)
        setCitas(response);
      })
      .catch(error => {
        console.error('Hubo un error al obtener las citas:', error);
      });
  }, []);
  return (
    <Layout>
      <section className="container-lista-citas">
        <h1 className="tittle-citas">LISTA DE CITAS</h1>
        {citas.map(cita => (
          <Card key={cita.fecha_cita} className="mb-3">
            <Card.Body>
              <Card.Title>Fecha de la cita: {cita.fecha_cita}</Card.Title>
              <Card.Text>Nombre del dueño: {cita.nombre_dueno}</Card.Text>
              <Card.Text>Nombre de la mascota: {cita.nombre_mascota}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </section>
    </Layout>
  );
};

export default Lista_citas;