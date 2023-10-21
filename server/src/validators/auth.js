const {check} = require('express-validator')
const db = require('../db')
//password
const password = check(`contrasena_usuario`).isLength({min:1, max:15}).withMessage(`Ingrese Una Contraseña con caracteres entre 1 y 15`)
//email
const email = check(`correo_usuario`).isEmail().withMessage(`Debe ingresar un correo valido`)

//revisa si existe el email
const emailExist = check(`correo_usuario`).custom(async (value) =>{
    const {rows} = await db.query(`select*from usuarios Where correo_usuario = $1`,[
        value,
    ])
    if(rows.isLength){
        throw new Error(`El correo ya esta registrado`)
    }
})

module.exports = {
    registerValidation:[email, password, emailExist]
}