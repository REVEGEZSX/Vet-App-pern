const db = require('../db')
const {hash} = require('bcryptjs')

//obtener lista de usuarios
exports.getUsers = async (req, res) => {
    try {
        const {rows}  = await db.query('select * from usuarios')
        console.log(rows)
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