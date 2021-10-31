//Interface de programção da aplicação de Rotas do banco de dados

const admin = require('./admin')//importa as configurções do usuário admin

module.exports = app => {
    // app.post('/signup', app.api.usuario.save)
    app.post('/signin', app.api.auth.signin)//rota para conectar ao sistema
    app.post('/validateToken', app.api.auth.validateToken)//rota para validar o token

    app.route('/usuarios')//rota para tabela usuários
        .all(app.config.passport.authenticate())//só acessa se estiver autenticado com o token
        .post(app.api.usuario.save)//faz a inserção do cadastro do usuário
        .get(admin(app.api.usuario.get))//traz as informação da tabela Usuários, mas só acessa se for admin

    app.route('/usuarios/:codigo')//rota para o cadastro do usuário
        .all(app.config.passport.authenticate())//só acessa se estiver autenticado com o token
        .put(admin(app.api.usuario.save))//faz alteração no cadastro do usuário, mas só faz a alteração se for admin
        .get(admin(app.api.usuario.getByCodigo))//traz as informações de um usuário específico, mas só acessa se for admin
        .delete(admin(app.api.usuario.remove))//exclui somete o usuário selecionado, mas só exclui se for admin
        
    app.route('/especialidades')//rota para a tabela especialidades
        .all(app.config.passport.authenticate())//só acessa se estiver autenticado com o token
        .post(admin(app.api.especialidade.save))//faz a inserção do cadastro da especialidade, mas só inclui se for admin
        .get(app.api.especialidade.get)//traz as informações da tabela Especialidades
    
    app.route('/especialidades/:codigo')//rota para o cadastro da especialidade
        .all(app.config.passport.authenticate())//só acessa se estiver autenticado com o token
        .put(admin(app.api.especialidade.save))//faz as alteração do cadastro da especialidade, mas só faz a alteração se for admin
        .get(admin(app.api.especialidade.get))//traz as informações de uma especialidade específica, mas só acessa for admin
        .delete(admin(app.api.especialidade.remove))//exclui somente a especialidade selecionada, mas só exclui se for admin

    app.route('/servicos')//rota para a tabela serviços
        .all(app.config.passport.authenticate())//só acessa se estiver autenticado com o token
        .post(admin(app.api.servico.save))//faz a inserção do cadastro do serviço, mas só inclui se for admin
        .get(app.api.servico.get)//traz as informações da tabela Serviços
    
    app.route('/servicos/:codigo')//rota para o cadastro do serviço
        .all(app.config.passport.authenticate())//só acessa se estiver autenticado com o token
        .put(admin(app.api.servico.save))//faz as alteração do cadastro do serviço, mas só faz a alteração se for admin
        .get(admin(app.api.servico.get))//traz as informações de um serviço específico, mas só acessa for admin
        .delete(admin(app.api.servico.remove))//exclui somente a especialidade selecionada, mas só exclui se for admin

    app.route('/convenios')//rota para a tabela convênios
        .all(app.config.passport.authenticate())//só acessa se estiver autenticado com o token
        .post(admin(app.api.convenio.save))//faz a inserção do cadastro do convênio, mas só inclui se for admin
        .get(app.api.convenio.get)//traz as informações da tabela Convênios
    
    app.route('/convenios/:codigo')//rota para o cadastro do convênio
        .all(app.config.passport.authenticate())//só acessa se estiver autenticado com o token
        .put(admin(app.api.convenio.save))//faz as alteração do cadastro do convênio, mas só faz a alteração se for admin
        .get(admin(app.api.convenio.get))//traz as informações de um convênio específico, mas só acessa for admin
        .delete(admin(app.api.convenio.remove))//exclui somente o convênio selecionado, mas só exclui se for admin

    app.route('/medicos')//rota para a tabela médicos
        .all(app.config.passport.authenticate())//só acessa se estiver autenticado com o token
        .post(admin(app.api.medico.save))//faz a inserção do cadastro do médico, mas só inclui se for admin
        .get(app.api.medico.get)//traz as informações da tabela Médicos

    app.route('/medicos/:codigomed')//rota para o cadastro do médico
        .all(app.config.passport.authenticate())//só acessa se estiver autenticado com o token
        .put(admin(app.api.medico.save))//faz as alteração do cadastro do médico, mas só faz a alteração se for admin
        .get(admin(app.api.medico.getByCodigo))//traz as informações de um médico específico, mas só acessa for admin
        .delete(admin(app.api.medico.remove))//exclui somente o médico selecionado, mas só exclui se for admin
        
    app.route('/pacientes')//rota para a tabela pacientes
        .all(app.config.passport.authenticate())//só acessa se estiver autenticado com o token
        .post(app.api.paciente.save)//faz a inserção do cadastro do paciente
        .get(app.api.paciente.get)//traz as informações da tabela pacientes

    app.route('/pacientes/:codigopac')//rota para o cadastro do paciente
        .all(app.config.passport.authenticate())//só acessa se estiver autenticado com o token
        .put(app.api.paciente.save)//faz as alteração do cadastro do paciente
        .get(app.api.paciente.getByCodigo)//traz as informações de um paciente específico
        .delete(admin(app.api.paciente.remove))//exclui somente o paciente selecionado, mas só exclui se for admin
        
    app.route('/agendas')//rota para a tabela agendas
        .all(app.config.passport.authenticate())//só acessa se estiver autenticado com o token
        .post(admin(app.api.agenda.save))//faz a inserção do cadastro da agenda, mas só inclui se for admin
        .get(app.api.agenda.get)//traz as informações da tabela agendas

    app.route('/agendas/:codigoag')//rota para o cadastro da agenda
        .all(app.config.passport.authenticate())//só acessa se estiver autenticado com o token
        .put(admin(app.api.agenda.save))//faz as alteração do cadastro da agenda, mas só faz a alteração se for admin
        .get(app.api.agenda.getByCodigo)//traz as informações de uma agenda específica
        .delete(admin(app.api.agenda.remove))//exclui somente a agenda selecionada, mas só exclui se for admin
    
    app.route('/agendamentos')//rota para a tabela agendamentos
        .all(app.config.passport.authenticate())//só acessa se estiver autenticado com o token
        .post(app.api.agendamento.save)//faz a inserção do cadastro do agendamento
        .get(app.api.agendamento.get)//traz as informações da tabela agendamento

    app.route('/agendamentos/:codigo')//rota para o cadastro da agendamento
        .all(app.config.passport.authenticate())//só acessa se estiver autenticado com o token
        .put(app.api.agendamento.save)//faz as alteração do cadastro da agendamento
        .get(app.api.agendamento.getByCodigo)//traz as informações de um agendamento específico
        .delete(app.api.agendamento.remove)//exclui somente a agenda selecionada, mas só exclui se for admin
    
    app.route('/atendimentos')//rota para a tabela atendimentos
        .all(app.config.passport.authenticate())//só acessa se estiver autenticado com o token
        .post(app.api.atendimento.save)//faz a inserção do cadastro do atendimentos
        .get(app.api.atendimento.get)//traz as informações da tabela atendimentos

    app.route('/atendimentos/:codigoatend')//rota para o cadastro do atendimento
        .all(app.config.passport.authenticate())//só acessa se estiver autenticado com o token
        .put(app.api.atendimento.save)//faz as alteração do cadastro do atendimento
        .get(app.api.atendimento.getByCodigo)//traz as informações de um atendimento específico
        .delete(app.api.atendimento.alta)//Da alta para o atendimento selecionado
    
    app.route('/prontuarios')//rota para a tabela prontuários
        .all(app.config.passport.authenticate())//só acessa se estiver autenticado com o token
        .post(app.api.prontuario.save)//faz a inserção do cadastro do prontuário
        .get(app.api.prontuario.get)//traz as informações da tabela prontuários

    app.route('/prontuarios/:codigopront')//rota para o cadastro do prontuário
        .all(app.config.passport.authenticate())//só acessa se estiver autenticado com o token
        .put(app.api.prontuario.save)//faz as alteração do cadastro do prontuario
        .get(app.api.prontuario.getByCodigo)//traz as informações de um prontuário específico
        .delete(app.api.prontuario.remove)//exclui somente o prontuário selecionado
}