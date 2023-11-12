
    import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import '../styles/navbar.css'
import Closesession from './closesession'
const Navbar = () => {
    const { isAuth } = useSelector((state) => state.auth)
    return(
        <header>
            <nav className='nav-bar-cont'>
                {isAuth ?(
                    <div className='nav-bar-btn'>
                        <NavLink to='/home' className='bar-btn'>
                            <div>INICIO</div>
                        </NavLink>                        
                        <NavLink to='/agendar_citas' className='bar-btn a-c'>
                            <div>AGENDAR CITAS</div>
                        </NavLink>
                        <NavLink to='/agendar_citas' className='bar-btn a-c'>
                            <div>EDITAR PERFIL</div>
                        </NavLink>                                                      
                        <NavLink className='bar-btn'>
                            <Closesession/>
                        </NavLink>
                    </div>
                ):(
                    <div className='nav-bar-btn'>
                        <NavLink to='/home' className='bar-btn'>
                            <div>INICIO</div>
                        </NavLink>                            
                        <NavLink to='/login' className='bar-btn'>
                            <div>LOGIN</div>
                        </NavLink>                                         
                        <NavLink to='/register' className='bar-btn'>
                            <div>SIGN</div>
                        </NavLink>                                                             
                    </div>
                )}                
            </nav>            
        </header>
    )
}
export default Navbar