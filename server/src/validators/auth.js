const {check} = require('express-validator')
const db = require('../db')
//password
const password = check(`contrasenaUsuario`).isLength({min:6, max:15}).withMessage(`Ingrese Una Contraseña con caracteres entre 6 y 15`)
//email
const email = check(`correoUsuario`).isEmail().withMessage(`Debe ingresar un correo valido`)

//revisa si existe el email
const emailExist = check(`correoUsuario`).custom(async (value) =>{
    const {rows} = await db.query(`select*from "Usuarios" Where "Usuarios".correoUsuario = $1`,[
        value,
    ])
    if(rows.isLength){
        throw new Error(`El correo ya esta registrado`)
    }
})

module.exports = {
    registerValidation:[email, password, emailExist]
}