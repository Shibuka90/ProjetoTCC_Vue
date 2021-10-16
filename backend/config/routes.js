const admin = require('./admin')

module.exports = app => {
    app.post('/signup', app.api.usuario.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)

    app.route('/usuarios')
        .all(app.config.passport.authenticate())
        .post(app.api.usuario.save)
        .get(admin(app.api.usuario.get))

    app.route('/usuarios/:codigo')
        .all(app.config.passport.authenticate())
        .put(admin(app.api.usuario.save))
        .get(admin(app.api.usuario.getByCodigo))
        .delete(admin(app.api.usuario.remove))
        
    app.route('/especialidades')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.especialidade.save))
        .get(app.api.especialidade.get)
    
    app.route('/especialidades/:codigo')
        .all(app.config.passport.authenticate())
        .put(admin(app.api.especialidade.save))
        .get(admin(app.api.especialidade.get))
        .delete(admin(app.api.especialidade.remove))

    app.route('/servicos')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.servico.save))
        .get(app.api.servico.get)
    
    app.route('/servicos/:codigo')
        .all(app.config.passport.authenticate())
        .put(admin(app.api.servico.save))
        .get(admin(app.api.servico.get))
        .delete(admin(app.api.servico.remove))

    app.route('/convenios')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.convenio.save))
        .get(app.api.convenio.get)
    
    app.route('/convenios/:codigo')
        .all(app.config.passport.authenticate())
        .put(admin(app.api.convenio.save))
        .get(admin(app.api.convenio.get))
        .delete(admin(app.api.convenio.remove))

    app.route('/medicos')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.medico.save))
        .get(app.api.medico.get)

    app.route('/medicos/:codigo')
        .all(app.config.passport.authenticate())
        .put(admin(app.api.medico.save))
        .get(admin(app.api.medico.getByCodigo))
        .delete(admin(app.api.medico.remove))
        
    app.route('/pacientes')
        .all(app.config.passport.authenticate())
        .post(app.api.paciente.save)
        .get(app.api.paciente.get)

    app.route('/pacientes/:codigo')
        .all(app.config.passport.authenticate())
        .put(app.api.paciente.save)
        .get(app.api.paciente.getByCodigo)
        .delete(admin(app.api.paciente.remove))
        
    app.route('/agendas')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.agenda.save))
        .get(app.api.agenda.get)

    app.route('/agendas/:codigo')
        .all(app.config.passport.authenticate())
        .put(admin(app.api.agenda.save))
        .get(app.api.agenda.getByCodigo)
        .delete(admin(app.api.agenda.remove))
    
    app.route('/agendamentos')
        .all(app.config.passport.authenticate())
        .post(app.api.agendamento.save)
        .get(app.api.agendamento.get)

    app.route('/agendamentos/:codigo')
        .all(app.config.passport.authenticate())
        .put(app.api.agendamento.save)
        .get(app.api.agendamento.getByCodigo)
        .delete(app.api.agendamento.remove)
    
    app.route('/atendimentos')
        .all(app.config.passport.authenticate())
        .post(app.api.atendimento.save)
        .get(app.api.atendimento.get)

    app.route('/atendimentos/:codigo')
        .all(app.config.passport.authenticate())
        .put(app.api.atendimento.save)
        .get(app.api.atendimento.getByCodigo)
        .delete(app.api.atendimento.remove)
}