import Layout from "../components/layout"
import { useState, useEffect } from 'react'
import { obtenerCitas } from '../api/auth'

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
      <h1 className="grid-tittle">LISTA DE CITAS</h1>
      {citas.map(cita => (
          <article className="cartas-citas" key={cita.fecha_cita}>
            <p>Fecha de la cita: {cita.fecha_cita}</p>
            <p>Nombre del dueño: {cita.nombre_dueno}</p>
            <p>Nombre de la mascota: {cita.nombre_mascota}</p>
          </article>
      ))}
    </section>
    </Layout>
  );
};

export default Lista_citas;