import { useState } from 'react'
import { onLogin } from '../api/auth'
import Layout from '../components/layout'
import { useDispatch } from 'react-redux'
import { authenticateUser } from '../redux/slices/authSlice'
//css
import '../styles/login.css'
//*************************************
//librerias bootstrap
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert';
//********************************************
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
    e.preventDefault()
    try {
        const data = await onLogin(values)
        dispatch(authenticateUser(data.userRole))
        localStorage.setItem('isAuth', 'true')
        localStorage.setItem('userRole', data.userRole)
    } catch (error) {
        console.log(error.response.data.errors[0].msg)
        setError(error.response.data.errors[0].msg)
        var alerta = document.getElementById('ALERT');
        alerta.removeAttribute("hidden")
    }
  }

  return (
    <Layout>
      <section className='section-login'>
        <Form onSubmit={(e) => onSubmit(e)} className='mb-6 form-login'>
          <h1 className='form-title'>Login</h1>
          <Form.Group className="mb-3">
          <Form.Control
              size='sm'
              onChange={(e) => onChange(e)}
              type='email'
              id='correo_usuario'
              name='correo_usuario'
              value={values.correo_usuario}
              placeholder='CORREO'
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              size='sm'
              onChange={(e) => onChange(e)}
              type='password'
              value={values.contrasena_usuario}
              id='contrasena_usuario'
              name='contrasena_usuario'
              placeholder='CONTRASEÑA'
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
              <Button size='sm' type='submit' variant='success'>
                INGRESAR
              </Button>
          </Form.Group>
          <Form.Group className="mb-3"><Alert variant = 'danger' id='ALERT' hidden>{error}</Alert></Form.Group>
        </Form>
      </section>
    </Layout>
  )
}

export default Login