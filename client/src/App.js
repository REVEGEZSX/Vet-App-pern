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
import Dashboard from './pages/dashboard'
import Agendar_cita from './pages/agendar_cita'
import Historial_de_citas from './pages/historial_de_citas'
import Mascotas_registradas from './pages/mascotas_registradas'
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
          <Route path='/Dashboard' element={<Dashboard />} />
          <Route path='/agendar_citas' element={< Agendar_cita/>} />
          <Route path='/historial_de_citas' element={< Historial_de_citas/>} />
          <Route path='/mascotas_registradas' element={< Mascotas_registradas/>} />
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