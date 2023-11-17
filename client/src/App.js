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
import LISTA_CITAS from './pages/lista_citas'
import MASCOTAS_REGISTRADAS from './pages/mascotas_registradas'
import EDITAR_PERFIL from './pages/editarperfil'
import RegisterPet from './pages/agregar_mascota'
import { useSelector } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'

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
          <Route path='/lista_citas' element={< LISTA_CITAS/>} />
          <Route path='/editar_perfil' element={< EDITAR_PERFIL/>} />
          <Route path='/mascotas_registradas' element={< MASCOTAS_REGISTRADAS/>} />
          <Route path='/registrar_mascota' element={< RegisterPet/>} />
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