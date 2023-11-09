import Layout from "../components/layout"
import '../styles/mascotas_registradas.css'
import Cards from '../components/cards'
const Mascotas_registradas = () =>{
    return (
    <Layout>
          <article className="cardlist">
          <Cards
              nombre_mascota='NOMBRE MASCOTA'
              nombre_sexo_mascota='MACHO'
              nombre_tipo_mascota='TIPO_A'
            />                                    
          <Cards
              nombre_mascota='NOMBRE MASCOTA'
              nombre_sexo_mascota='MACHO'
              nombre_tipo_mascota='TIPO_A'
            />                                    
          <Cards
              nombre_mascota='NOMBRE MASCOTA'
              nombre_sexo_mascota='MACHO'
              nombre_tipo_mascota='TIPO_A'
            />                                    
          <Cards
              nombre_mascota='NOMBRE MASCOTA'
              nombre_sexo_mascota='MACHO'
              nombre_tipo_mascota='TIPO_A'
            />                                    
          <Cards
              nombre_mascota='NOMBRE MASCOTA'
              nombre_sexo_mascota='MACHO'
              nombre_tipo_mascota='TIPO_A'
            />                                    
          <Cards
              nombre_mascota='NOMBRE MASCOTA'
              nombre_sexo_mascota='MACHO'
              nombre_tipo_mascota='TIPO_A'
            />                                                                                                
          </article>
    </Layout>
    )}
export default Mascotas_registradas