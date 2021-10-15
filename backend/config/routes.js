const admin = require('./admin')

module.exports = app => {
    app.post('/signup', app.api.usuario.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)

    app.route('/usuarios')
        .all(app.config.passport.authenticate())
        .post(app.api.usuario.save)
        .get(app.api.usuario.get)

    app.route('/usuarios/:codigo')
        .all(app.config.passport.authenticate())
        .put(app.api.usuario.save)
        .get(app.api.usuario.getByCodigo)
        .delete(app.api.usuario.remove)
        
    app.route('/especialidades')
        .all(app.config.passport.authenticate())
        .post(app.api.especialidade.save)
        .get(app.api.especialidade.get)
    
    app.route('/especialidades/:codigo')
        .all(app.config.passport.authenticate())
        .put(app.api.especialidade.save)
        .get(app.api.especialidade.get)
        .delete(app.api.especialidade.remove)

    app.route('/servicos')
        .all(app.config.passport.authenticate())
        .post(app.api.servico.save)
        .get(app.api.servico.get)
    
    app.route('/servicos/:codigo')
        .all(app.config.passport.authenticate())
        .put(app.api.servico.save)
        .get(app.api.servico.get)
        .delete(app.api.servico.remove)

    app.route('/convenios')
        .all(app.config.passport.authenticate())
        .post(app.api.convenio.save)
        .get(app.api.convenio.get)
    
    app.route('/convenios/:codigo')
        .all(app.config.passport.authenticate())
        .put(app.api.convenio.save)
        .get(app.api.convenio.get)
        .delete(app.api.convenio.remove)

    app.route('/medicos')
        .all(app.config.passport.authenticate())
        .post(app.api.medico.save)
        .get(app.api.medico.get)

    app.route('/medicos/:codigo')
        .all(app.config.passport.authenticate())
        .put(app.api.medico.save)
        .get(app.api.medico.getByCodigo)
        .delete(app.api.medico.remove)
        
    app.route('/pacientes')
        .all(app.config.passport.authenticate())
        .post(app.api.paciente.save)
        .get(app.api.paciente.get)

    app.route('/pacientes/:codigo')
        .all(app.config.passport.authenticate())
        .put(app.api.paciente.save)
        .get(app.api.paciente.getByCodigo)
        .delete(app.api.paciente.remove)
        
    app.route('/agendas')
        .all(app.config.passport.authenticate())
        .post(app.api.agenda.save)
        .get(app.api.agenda.get)

    app.route('/agendas/:codigo')
        .all(app.config.passport.authenticate())
        .put(app.api.agenda.save)
        .get(app.api.agenda.getByCodigo)
        .delete(app.api.agenda.remove)
    
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