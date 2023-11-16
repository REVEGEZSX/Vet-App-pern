const db = require('../db')
const {hash} = require('bcryptjs')
const {sign} = require('jsonwebtoken')
const {SECRET} = require('../constants')

//obtener citas del veterinario logeado:
exports.obtenerCitas = async (req, res) => {
    try {
      const citas = await db.query(`
        SELECT 
          u.nombre_usuario AS nombre_dueno,
          m.nombre_mascota,
          c.fecha_cita
        FROM citas c
        JOIN mascotas m ON c.id_mascota_cita = m.id_mascota
        JOIN usuarios u ON m.id_dueno_mascota = u.id_usuario
        WHERE c.id_veterinario_cita = $1
        ORDER BY c.fecha_cita ASC
      `, [req.user.id_usuario]);
      console.log(citas.rows)
      return res.status(200).json({
        success: 'true',
        citas: citas.rows
      });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({
        error: error.message
      });
    }
  };

//crear cita
exports.crearCita = async (req, res) => {
    const { fecha_cita, id_veterinario_cita, id_mascota_cita } = req.body;
    try {
      await db.query(
        `INSERT INTO citas (fecha_cita, id_veterinario_cita, id_mascota_cita, asistencia_cita) VALUES ($1, $2, $3, $4)`,
        [fecha_cita, id_veterinario_cita, id_mascota_cita, false]
      );
      return res.status(201).json({
        success: 'true',
        message: 'Cita creada con éxito'
      });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({
        error: error.message
      });
    }
};

//editar usuario
exports.editarUsuario = async (req, res) => {
    const { nombre_usuario, apellido_usuario, correo_usuario, telefono_usuario, contrasena_usuario } = req.body;
    try {
        const usuario = await db.query(
            `SELECT 
                nombre_usuario, 
                apellido_usuario, 
                correo_usuario,
                telefono_usuario
                contrasena_usuario 
                FROM usuarios WHERE id_usuario = $1`, [req.user.id_usuario]);
        if (!usuario) {
            return res.status(404).json({
                success: 'false',
                message: 'Usuario no encontrado'
            });
        }
        const contrasena_usuario_cifrada = await hash(contrasena_usuario, 10);
        await db.query(
            `UPDATE usuarios SET 
                nombre_usuario = $1, 
                apellido_usuario = $2, 
                correo_usuario = $3, 
                telefono_usuario = $4,
                contrasena_usuario = $5
            WHERE id_usuario = $6`, 
            [nombre_usuario, apellido_usuario, correo_usuario, telefono_usuario, contrasena_usuario_cifrada, req.user.id_usuario]
        );
        return res.status(200).json({
            success: 'true',
            message: 'Información de usuario actualizada con éxito'
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            error: error.message
        });
    }
};


//entrada
exports.login = async(req,res)=>{
    let usuario = req.usuario
    payload = {
        id_usuario: usuario.id_usuario,
        correo_usuario: usuario.correo_usuario,
        id_roles_usuario: usuario.id_roles_usuario
    }
    try {
        const token = await sign(payload, SECRET)
        return res.status(200).cookie('token', token, {httpOnly:true}).json({
            success: true,
            message: 'Ingresado con exito',
            nombre: usuario.nombre_usuario,
            apellido: usuario.apellido_usuario,
            correo: usuario.correo_usuario,
            telefono: usuario.telefono_usuario,
            userRole: usuario.id_roles_usuario
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
         error: error.message
        })        
    }
}

// obtener mascotas de la persona logeada
exports.getMascotasDueno = async (req, res) => {
    try {
        const mascotas = await db.query(
            `SELECT id_mascota, nombre_mascota 
            FROM mascotas 
            WHERE id_dueno_mascota = $1`, 
            [req.user.id_usuario])
        console.log(mascotas)
        res.status(200).json(mascotas.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Hubo un error al obtener las mascotas.' });
    }
  };


//obtener lista de veterinarios
exports.getVett = async (req, res) => {
    try {
        const {rows}  = await db.query(    
        `select id_usuario, nombre_usuario
        FROM usuarios
        INNER JOIN veterinarios
        ON usuarios.id_usuario = veterinarios.id_veterinario`)
        console.log(rows)
        return res.status(200).json({
            //success: true, 
            usuarios: rows})
    } catch (error) {
        console.log(error.message)
    }
}

//obtener lista de usuarios
exports.getUsers = async (req, res) => {
    try {
        const {rows}  = await db.query('select correo_usuario, contrasena_usuario from usuarios')
        console.log(rows)
        return res.status(200).json({
            sucess: true,
            usuarios: rows
        })
    } catch (error) {
        console.log(error.message)
    }
}
//registro
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

//Denegar acceso
exports.protected = async (req, res) => {
    try {
        return res.status(200).json({
            info: 'informacion protegida'
        })
    } catch (error) {
        console.log(error.message)
    }
}

//salida
exports.logout = async (req, res) => {
    try {
      return res.status(200).clearCookie('token', { httpOnly: true }).json({
        success: true,
        message: 'sesion terminada con exito',
      })
    } catch (error) {
      console.log(error.message)
      return res.status(500).json({
        error: error.message,
      })
    }
  }
//borrar usuario
