const {Router} = require('express')
//
const {getUsers, register, login, protected, logout, getVett} = require('../controllers/auth')
//
const {validationMiddleware} = require('../middlewares/validation-middleware')
const { registerValidation, loginValidation} = require('../validators/auth')
const {userAuth} = require('../middlewares/auth-middleware')
const router = Router()

router.get('/get-users', getUsers)
router.get('/get-vett', getVett)
router.get('/protected', userAuth, protected)  
router.get('/logout', logout)  
router.post('/register', registerValidation, validationMiddleware, register)
router.post('/login', loginValidation, validationMiddleware, login)

module.exports = router