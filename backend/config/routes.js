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

    app.route('/servicos')
        .post(app.api.servico.save)
        .get(app.api.servico.get)
    
    app.route('/servicos/:codigo')
        .put(app.api.servico.save)
        .get(app.api.servico.get)
        .delete(app.api.servico.remove)

    app.route('/convenios')
        .post(app.api.convenio.save)
        .get(app.api.convenio.get)
    
    app.route('/convenios/:codigo')
        .put(app.api.convenio.save)
        .get(app.api.convenio.get)
        .delete(app.api.convenio.remove)

    app.route('/medicos')
        // .all(app.config.passport.authenticate())
        .post(app.api.medico.save)
        // .get(admin(app.api.medico.get))
        .get(app.api.medico.get)

    app.route('/medicos/:codigo')
        // .all(app.config.passport.authenticate())
        .put(app.api.medico.save)
        .get(app.api.medico.getByCodigo)
        .delete(app.api.medico.remove)
        
    app.route('/medicos/:nome')
        .get(app.api.medico.getByNome)

    app.route('/pacientes')
        // .all(app.config.passport.authenticate())
        .post(app.api.paciente.save)
        // .get(admin(app.api.paciente.get))
        .get(app.api.paciente.get)

    app.route('/pacientes/:codigo')
        // .all(app.config.passport.authenticate())
        .put(app.api.paciente.save)
        .get(app.api.paciente.getByCodigo)
        .delete(app.api.paciente.remove)
        
    app.route('/pacientes/:nome')
        .get(app.api.paciente.getByNome)

    app.route('/agendas')
        // .all(app.config.passport.authenticate())
        .post(app.api.agenda.save)
        // .get(admin(app.api.agenda.get))
        .get(app.api.agenda.get)

    app.route('/agendas/:codigo')
        // .all(app.config.passport.authenticate())
        .put(app.api.agenda.save)
        .get(app.api.agenda.getByCodigo)
        .delete(app.api.agenda.remove)
    
    app.route('/agendamentos')
        // .all(app.config.passport.authenticate())
        .post(app.api.agendamento.save)
        // .get(admin(app.api.agendamento.get))
        .get(app.api.agendamento.get)

    app.route('/agendamentos/:codigo')
        // .all(app.config.passport.authenticate())
        .put(app.api.agendamento.save)
        .get(app.api.agendamento.getByCodigo)
        .delete(app.api.agendamento.remove)

}