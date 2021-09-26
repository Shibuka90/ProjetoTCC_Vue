const { authSecret } = require('../.env')
const passport = require('passport')
const passaportJwt = require('passport-jwt')
const { Strategy, ExtractJwt } = passaportJwt

module.exports = app => {
    const params = { 
        secretOrKey : authSecret,
        jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken()
    }

    const strategy = new Strategy(params, (payload, done) => {
        app.db('usuarios')
            .where({ codigo: payload.codigo })
            .first()
            .then(usuario => done(null, usuario ? {...payload } : false))
            .catch(err => done(err, false))
    })
    
    passport.use(strategy)

    return {
        authenticate: () => passport.authenticate('jwt', { session: false})
    }
}