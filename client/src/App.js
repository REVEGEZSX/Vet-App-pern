/*<Route path='/Dashboard' element={<Dashboard />} />*/
import {
  BrowserRouter,
  Navigate,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'
import AGENDAR_CITA from './pages/agendar_cita'
import HISTORIAL_DE_CITAS from './pages/historial_de_citas'
import MASCOTAS_REGISTRADAS from './pages/mascotas_registradas'
import { useSelector } from 'react-redux'

const PrivateRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth)

  return <>{isAuth ? <Outlet /> : <Navigate to='/login' />}</>
}

const RestrictedRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth)

  return <>{!isAuth ? <Outlet /> : <Navigate to='/' />}</>
}

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />

        <Route element={<PrivateRoutes />}>
          <Route path='/agendar_citas' element={< AGENDAR_CITA/>} />
          <Route path='/historial_de_citas' element={< HISTORIAL_DE_CITAS/>} />
          <Route path='/mascotas_registradas' element={< MASCOTAS_REGISTRADAS/>} />
        </Route>

        <Route element={<RestrictedRoutes />}>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App