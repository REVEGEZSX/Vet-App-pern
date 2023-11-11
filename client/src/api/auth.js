import axios from 'axios'
axios.defaults.withCredentials = true

export async function onRegistration(registrationData) {
  return await axios.post(
    'http://localhost:8000/api/register',
    registrationData
  )
}

export async function onLogin(loginData) {
  return await axios.post('http://localhost:8000/api/login', loginData)
}

export async function onLogout() {
  return await axios.get('http://localhost:8000/api/logout')
}

export async function fetchProtectedInfo() {
  return await axios.get('http://localhost:8000/api/protected')
}

export async function listaUsuarios(){
  return await axios.get('http://localhost:8000/api/get-users')
}

export async function listaVeterinarios(){
  return await axios.get('http://localhost:8000/api/get-vett')
    .then(response => {
      console.log(response.data.usuarios)
      return response.data.usuarios
    })
    .catch(error => {
      console.error('Hubo un error al obtener la lista de veterinarios:', error);
    });
}