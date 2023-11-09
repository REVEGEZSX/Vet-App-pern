import { useDispatch } from 'react-redux'
import { onLogout } from '../api/auth'
import { unauthenticateUser } from '../redux/slices/authSlice'

const Closesession = () => {
  const dispatch = useDispatch()

  const logout = async () => {
    try {
      await onLogout()

      dispatch(unauthenticateUser())
      localStorage.removeItem('isAuth')
    } catch (error) {
      console.log(error.response)
    }
  }

  return (
    <div>
        <span onClick={() => logout()}>
          CERRAR SESION
        </span>
    </div>
  )
}

export default Closesession