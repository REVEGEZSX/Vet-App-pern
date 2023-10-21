const {check} = require('express-validator')
const db = require('../db')
//password
const password = check(`contrasenausuario`).isLength({min:6, max:15}).withMessage(`Ingrese Una Contraseña con caracteres entre 6 y 15`)
//email
const email = check(`correousuario`).isEmail().withMessage(`Debe ingresar un correo valido`)

//revisa si existe el email
const emailExist = check(`correousuario`).custom(async (value) =>{
    const {rows} = await db.query(`select*from usuarios Where correousuario = $1`,[
        value,
    ])
    if(rows.isLength){
        throw new Error(`El correo ya esta registrado`)
    }
})

module.exports = {
    registerValidation:[email, password, emailExist]
}