import Layout from "../components/layout"
import '../styles/apartar_cita.css'
const Agendar_citas = () =>{


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
        <input
          type='text'
          className='form-control-apo'
          placeholder='SELECCIONAR VETERINARIO'
          required
        />
        <input
          type='text'
          className='form-control-apo'
          placeholder='SELECCIONAR MASCOTA'
          required
        />
        <button type="submit" className="btn-success agn-btn">
          AGENDAR
        </button>
      </form>
  </Layout>
    )}
export default Agendar_citas