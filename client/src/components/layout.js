import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from './navbar'
import NavbarVet from './navbarvet'
import '../styles/layout.css'

const Layout = ({children})=>{ 
    const userRole = useSelector(state => state.auth.userRole);
    return(
        <section className='section-layout'>
             {userRole === 2 ? <NavbarVet /> : <Navbar />}
            <article className='container-body'>
                {children}
            </article>
        </section>
    )
}
export default Layout