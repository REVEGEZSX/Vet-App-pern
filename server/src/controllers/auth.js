const db = require('../db')
const {hash} = require('bcryptjs')
const {sign} = require('jsonwebtoken')
const {SECRET} = require('../constants')

//obtener lista de usuarios
exports.getUsers = async (req, res) => {
    try {
        const {rows}  = await db.query('select correo_usuario, contrasena_usuario from usuarios')
        return res.status(200).json({
            sucess: true,
            usuarios: rows
        })
    } catch (error) {
        console.log(error.message)
    }
}

//registro modo admin
exports.register = async (req,res) => {
    const {
        nombre_usuario, 
        apellido_usuario, 
        correo_usuario, 
        contrasena_usuario, 
        telefono_usuario, 
        id_roles_usuario} = req.body
    try {
        const Hashedcontrasena_usuario = await hash(contrasena_usuario, 10)
        await db.query(
        `insert into usuarios(
            nombre_usuario, 
            apellido_usuario, 
            correo_usuario, 
            contrasena_usuario,
            telefono_usuario,
            id_roles_usuario)
                values(
                    $1,
                    $2,
                    $3,
                    $4,
                    $5,
                    $6
        )`,[nombre_usuario, 
            apellido_usuario, 
            correo_usuario, 
            Hashedcontrasena_usuario, 
            telefono_usuario, 
            id_roles_usuario])
        return res.status(201).json({
            sucess: 'true',
            message: 'Se Registro con exito'
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            error: error.message
        })
    }
}
//login
exports.login = async(req,res)=>{
    let usuario = req.usuario
    console.log(usuario)
    payload ={
        id_usuario: usuario.id_usuario,
        /*nombre_usuario: usuario.nombre_usuario,
        apellido_usuario: usuario.apellido_usuario,*/
        correo_usuario: usuario.correo_usuario
    }
    try {
        const token = await sign(payload, SECRET)
        return res.status(200).cookie('token', token, {httpOnly:true}).json({
            sucess: true,
            message: 'Ingresado con exito'
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
         error: error.message
        })        
    }
}

//Denegar acceso
exports.protected = async (req, res) => {
    try {
        return res.status(200).json({
            info: 'protected info'
        })
    } catch (error) {
        console.log(error.message)
    }
}