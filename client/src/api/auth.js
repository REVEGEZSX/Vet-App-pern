import axios from 'axios'
axios.defaults.withCredentials = true

export async function obtenerOpcionesSexoMascota() {
  const response = await axios.get('http://localhost:8000/api/get-sexo-options');
  console.log('response.data axios obtener opciones sexo mascota: ', response.data);
  return response.data;
}

export async function obtenerOpcionesTipoMascota() {
  const response = await axios.get('http://localhost:8000/api/get-tipo-options');
  console.log('response.data axios obtener opciones tipo mascota: ', response.data);
  return response.data;
}

export async function registrarMascota(mascotaData) {
  console.log('mascotaData ', mascotaData);
  return await axios.post('http://localhost:8000/api/register-mascota', mascotaData);
}

export async function obtenerCitas() {
  const response = await axios.get('http://localhost:8000/api/lista_citas');
  console.log('response.data axios obtener citas: ', response.data.citas)
  return response.data.citas;
}

export async function editarUsuario(usuarioData) {
  return await axios.post('http://localhost:8000/api/editar-usuario', usuarioData);
}

export async function onLogin(loginData) {
  const response = await axios.post('http://localhost:8000/api/login', loginData);
  console.log(response.data)
  return response.data;
}

export async function onRegistration(registrationData) {
  return await axios.post('http://localhost:8000/api/register', registrationData
  )
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
      return response.data.usuarios
    })
    .catch(error => {
      console.error('Hubo un error al obtener la lista de veterinarios:', error);
    });
}

export async function listaMascotasDeDueno() {
  return await axios.get('http://localhost:8000/api/get-mascotas-de-dueno')
    .then(response => {
      //console.log('response limadedu axios: ', response.data)
      return response.data;
    })
    .catch(error => {
      console.error('Hubo un error al obtener la lista de mascotas:', error);
    });
}
export async function crearCita(citaData) {
  console.log('citaData ', citaData)
  return await axios.post('http://localhost:8000/api/crear-cita', citaData);
}