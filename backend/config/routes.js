const admin = require('./admin')

module.exports = app => {
    app.post('/signup', app.api.usuario.save)
    app.post('/signin', app.api.auth.signin)
    app.post('validateToken', app.api.auth.validateToken)

    app.route('/usuarios')
        // .all(app.config.passport.authenticate())
        .post(app.api.usuario.save)
        // .get(admin(app.api.usuario.get))
        .get(app.api.usuario.get)

    app.route('/usuarios/:codigo')
        // .all(app.config.passport.authenticate())
        .put(app.api.usuario.save)
        .get(app.api.usuario.getByCodigo)
        .delete(app.api.usuario.remove)
        
    app.route('/usuarios/:nome')
        .get(app.api.usuario.getByNome)
    
    app.route('/especialidades')
        .post(app.api.especialidade.save)
        .get(app.api.especialidade.get)
    
    app.route('/especialidades/:codigo')
        .put(app.api.especialidade.save)
        .get(app.api.especialidade.get)
        .delete(app.api.especialidade.remove)

}