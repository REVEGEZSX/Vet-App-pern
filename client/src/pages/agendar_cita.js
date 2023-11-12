import Layout from "../components/layout"
import '../styles/apartar_cita.css'
import { useState, useEffect } from 'react'
import { listaVeterinarios, listaMascotasDeDueno, crearCita } from '../api/auth'

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
      <form onSubmit={handleSubmit} className='form-vet-apo'> {/* Aquí agregamos la función handleSubmit */}
        <h1 className="form-title-apo">APARTAR CITA</h1>
        <input
          type='date'
          name='fecha_cita' // Agregamos el atributo name
          className='form-control-apo'
          value={citaData.fecha_cita} // El valor del input está vinculado al estado
          onChange={handleChange} // Aquí agregamos la función handleChange
          placeholder='fecha_cita'
          required
        />
        <select 
          name='id_veterinario_cita' // Agregamos el atributo name
          className='form-control-apo' 
          value={citaData.id_veterinario_cita} // El valor del select está vinculado al estado
          onChange={handleChange} // Aquí agregamos la función handleChange
          required
        >
          <option>--Seleccione un veterinario</option>
          {veterinarios.map(
            veterinario => (
              <option key={veterinario.id_usuario} value={veterinario.id_usuario}>{veterinario.nombre_usuario}</option>))}
        </select>
        <select 
          name='id_mascota_cita' // Agregamos el atributo name
          className='form-control-apo' 
          value={citaData.id_mascota_cita} // El valor del select está vinculado al estado
          onChange={handleChange} // Aquí agregamos la función handleChange
          required
        >
          <option>--Seleccione su mascota</option>
          {mascotas.map(
            mascota => (
              <option key={mascota.id_mascota} value={mascota.id_mascota}>{mascota.nombre_mascota}</option>))}
        </select>
        <button type="submit" className="btn-success agn-btn">
          AGENDAR
        </button>
      </form>
    </Layout>
  )
}
export default Agendar_citas;