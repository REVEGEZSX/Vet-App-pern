const passport = require('passport')
const { Strategy } = require('passport-jwt')
const { SECRET } = require('../constants')
const db = require('../db')

const cookieExtractor = function (req) {
    let token = null
    if (req && req.cookies) token = req.cookies['token']
    return token
}

const opts = {
    secretOrKey: SECRET,
    jwtFormRequest: cookieExtractor
}

passport.use(
    new Strategy(opts, async ({ id_usuario }, done) => {
      try {
        const { rows } = await db.query(
          'SELECT id_usuario, correo_usuario FROM usuarios WHERE id_usuario = $1',
          [id_usuario]
        )
  
        if (!rows.length) {
          throw new Error('401 not authorized')
        }
  
        let usuario = { id_usuario: rows[0].id_usuario, correo_usuario: rows[0].correo_usuario }
  
        return await done(null, usuario)
      } catch (error) {
        console.log(error.message)
        done(null, false)
      }
    })
  )
  exports.userAuth = passport.authenticate('jwt', { session: false })