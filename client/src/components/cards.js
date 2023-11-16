import React from 'react'
const Cards = (props) =>{
    return(
        <article className='pet-card'>
            <img className='img-pet-card'/>
            <p>{props.nombre_mascota}</p>
            <p>{props.nombre_sexo_mascota}</p>
            <p>{props.nombre_tipo_mascota}</p>
        </article>
    )
}

export default Cards