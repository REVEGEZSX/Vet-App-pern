import { useDispatch } from 'react-redux'
import { onLogout } from '../api/auth'
import { unauthenticateUser } from '../redux/slices/authSlice'
import Nav from 'react-bootstrap/Nav';

const Closesession = () => {
  const dispatch = useDispatch()
  const logout = async () => {
    try {
      await onLogout()
      dispatch(unauthenticateUser())
      localStorage.removeItem('isAuth')
      localStorage.removeItem('userRole')
    } catch (error) {
      console.log(error.response)
    }
  }

  return (
    <Nav.Link onClick={() => logout()}>CERRAR SESION</Nav.Link>
  )
}

export default Closesession