import { useState } from 'react'
import { onRegistration } from '../api/auth'
import Layout from '../components/layout'
//css
import '../styles/register.css'
//*************************************
//librerias bootstrap
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert';
//********************************************
const Register = () => {
  const [values, setValues] = useState({
    nombre_usuario:'',
    apellido_usuario:'',
    correo_usuario: '',
    contrasena_usuario: '',
    telefono_usuario:'',
    id_roles_usuario:''
  })
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const { data } = await onRegistration(values)

      setError('')
      setSuccess(data.message)
      setValues({
        nombre_usuario:'', 
        apellido_usuario:'', 
        correo_usuario: '', 
        contrasena_usuario: '',
        telefono_usuario:'',
        id_roles_usuario:''
      })
    } catch (error) {
      console.log(error.response.data.errors[0].msg)
      setError(error.response.data.errors[0].msg)
      setSuccess('')
    }
  }

  return (
    <Layout>
      <section className='section-register'>
        <Form onSubmit={(e) => onSubmit(e)} className='mb-6 form-register'>
          <h1 className='form-title'>REGISTRO</h1>
          <Form.Group className="mb-3">
            <Form.Control
              size='sm'
              onChange={(e) => onChange(e)}
              type='text'
              className='form-control'
              id='nombre_usuario'
              name='nombre_usuario'
              value={values.nombre_usuario}
              placeholder='NOMBRE'
              required
            />            
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              size='sm'
              onChange={(e) => onChange(e)}
              type='text'
              className='form-control'
              id='apellido_usuario'
              name='apellido_usuario'
              value={values.apellido_usuario}
              placeholder='APELLIDO'
              required
            />            
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              size='sm'
              onChange={(e) => onChange(e)}
              type='email'
              className='form-control'
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
              className='form-control'
              id='contrasena_usuario'
              name='contrasena_usuario'
              placeholder='CONTRASEÑA'
              required
            />            
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              size='sm'
              onChange={(e) => onChange(e)}
              type='number'
              className='form-control'
              id='telefono_usuario'
              name='telefono_usuario'
              value={values.telefono_usuario}
              placeholder='TELEFONO'
              required
            />            
          </Form.Group>

        <Button size='sm' type='submit' variant='success'>
          REGISTRARSE
        </Button>
        <Form.Group className="mb-3">
          <Form.Control
              disabled
              onChange={(e) => onChange(e)}
              type='number'
              className='form-control'
              id='id_roles_usuario'
              name='id_roles_usuario'
              value={values.id_roles_usuario=3}
              placeholder='Cliente'
              defaultValue={3}
              required
              hidden
          />        
        </Form.Group>
        <Form.Group className="mb-3"><Alert variant = 'danger' id='ALERT' hidden>{error}</Alert></Form.Group>
        <Form.Group className="mb-3"><Alert variant = 'success' id='ALERT' hidden>{success}</Alert></Form.Group>                
        </Form>
      </section>
    </Layout>
  )
}
export default Register