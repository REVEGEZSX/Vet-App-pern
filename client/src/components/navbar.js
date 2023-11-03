import React from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/navbar.css'
const Navbar = () => {
    const isAuth = false
    return(
        <header>
            <nav className='container'>
                <div className='home-btn'>
                    <NavLink to='/home' >
                        <span>INICIO</span>
                    </NavLink>                                         
                </div>

                {isAuth ?(
                    <div className='nav-btn'>
                        <NavLink to='/dashboard' >
                            <span>dashboard</span>
                        </NavLink>                                         
                    </div>
                ):(
                    <div className='nav-btn'>
                        <NavLink to='/login' >
                            <span>LOGIN</span>
                        </NavLink>                                         
                        <NavLink to='/register' >
                            <span>SIGN</span>
                        </NavLink>                                                             
                    </div>
                )}                
            </nav>            
        </header>
    )
}
export default Navbar