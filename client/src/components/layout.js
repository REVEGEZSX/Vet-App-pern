import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from './navbar'
import NavbarVet from './navbarvet'
import '../styles/layout.css'
const Layout = ({children})=>{ 
    const userRole = useSelector(state => state.auth.userRole);
    return(
      <main>
        {userRole === 2 ? <NavbarVet /> : <Navbar />}
        {children}
      </main>
    )
}
export default Layout