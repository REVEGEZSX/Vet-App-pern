import React from 'react';
import { useSelector } from 'react-redux'; // Importa useSelector de react-redux
import Navbar from './navbar'
import NavbarVet from './navbarvet'
import '../styles/layout.css'

const Layout = ({children})=>{ 
    const userRole = useSelector(state => state.auth.userRole); // Obtiene userRole desde el estado de Redux
    console.log('userRole: ', userRole)
    return(
        <section className='section-layout'>
             {userRole === 3 ? <NavbarVet /> : <Navbar />}
            <article className='container-body'>
                {children}
            </article>
        </section>
    )
}
export default Layout