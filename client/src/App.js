import {
  BrowserRouter,
  Navigate,
  Routes,
  Route,
  Outlet} from 'react-router-dom'
  import  Home from './pages/home';
  import  Dashboard from './pages/dashboard';
  import  Login from './pages/login';
  import  Register from './pages/register';

  const PrivateRoute = () =>{
    const isAuth = false
    return <>{!isAuth ? <Outlet/> : <Navigate to='/login'/>}</>
  }

  const RestrictedRoute = () =>{
    const isAuth = false
    return <>{!isAuth ? <Outlet/> : <Navigate to='/dashboard'/>}</>
  }

  const App = () => {
    return(
      <BrowserRouter>
        <Routes>

          <Route path='/' element={ <Home/> }/>
          <Route path='/home' element={ <Home/> }/>

          <Route element={<RestrictedRoute/>}>
            <Route path='/dashboard' element={ <Dashboard/> }/>
          </Route>

          <Route element={<PrivateRoute/>}>
            <Route path='/login' element={ <Login/> }/>
            <Route path='/register' element={ <Register/> }/> 
          </Route>
          
          </Routes>
      </BrowserRouter>
    )}
  export default App