import { useState } from 'react'
import { onLogin } from '../api/auth'
import Layout from '../components/layout'
import { useDispatch } from 'react-redux'
import { authenticateUser } from '../redux/slices/authSlice'
import '../styles/login.css'

const Login = () => {
  const [values, setValues] = useState({
    correo_usuario: '',
    contrasena_usuario: '',
  })
  
  const [error, setError] = useState(false)

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const dispatch = useDispatch()
  
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
        const data = await onLogin(values);
        dispatch(authenticateUser(data.userRole));
        localStorage.setItem('isAuth', 'true');
        localStorage.setItem('userRole', data.userRole);
    } catch (error) {
        console.log(error.response.data.errors[0].msg);
        setError(error.response.data.errors[0].msg);
    }
  }

  return (
    <Layout>
      <section>
      <form onSubmit={(e) => onSubmit(e)} className='form-login form-register'>
        <h1 className='form-title'>Login</h1>

        <div className='email-input'>
          <input
            onChange={(e) => onChange(e)}
            type='email'
            className='form-control'
            id='correo_usuario'
            name='correo_usuario'
            value={values.correo_usuario}
            placeholder='CORREO'
            required
          />
        </div>

        <div className='password-input'>
          <input
            onChange={(e) => onChange(e)}
            type='password'
            value={values.contrasena_usuario}
            className='form-control'
            id='contrasena_usuario'
            name='contrasena_usuario'
            placeholder='CONTRASEÑA'
            required
          />
        </div>

        <div style={{ color: 'red', margin: '10px 0' }}>{error}</div>

        <button type='submit' className='btn-success'>
          INGRESAR
        </button>
      </form>
      </section>
    </Layout>
  )
}

export default Login