const {Router} = require('express');
const {getUsers, register, login, protected, logout, getVett, getMascotasDueno, editarUsuario, crearCita, obtenerCitas} = require('../controllers/auth');
const {validationMiddleware} = require('../middlewares/validation-middleware');
const { registerValidation, loginValidation} = require('../validators/auth');
const {userAuth} = require('../middlewares/auth-middleware');
const router = Router();

router.get('/get-users', getUsers);
router.get('/get-vett', getVett);
router.get('/get-mascotas-de-dueno', userAuth, getMascotasDueno);
router.get('/protected', userAuth, protected);  
router.get('/logout', logout);
router.get('/lista_citas', userAuth, obtenerCitas)

router.post('/register', registerValidation, validationMiddleware, register);
router.post('/login', loginValidation, validationMiddleware, login);
router.post('/editar-usuario', userAuth, editarUsuario);
router.post('/crear-cita', userAuth, crearCita);

module.exports = router;