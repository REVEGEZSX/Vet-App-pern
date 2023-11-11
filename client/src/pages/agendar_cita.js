import Layout from "../components/layout"
import '../styles/apartar_cita.css'
import { useState, useEffect } from 'react'
import { listaVeterinarios } from '../api/auth'

const Agendar_citas = () =>{

  const [veterinarios, setVeterinarios] = useState([])
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
  }, []);
    return (
  <Layout>
    <form className='form-vet-apo'>
    <h1 className="form-title-apo">APARTAR CITA</h1>
    <input
        type='date'
        className='form-control-apo'
        placeholder='fecha_cita'
        required
      />
    <select className='form-control-apo' required>
      <option>--Seleccione un veterinario</option>
      {veterinarios.map(
        veterinario => (
          <option key={veterinario.id_usuario}>{veterinario.nombre_usuario}</option>))}
    </select>
    <select className='form-control-apo' required>
        <option>--Seleccione su mascota</option>
    </select>
    <button type="submit" className="btn-success agn-btn">
      AGENDAR
    </button>
    </form>
</Layout>
  )}
export default Agendar_citas