
module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    const save = async (req, res) => {
        const agenda = { ...req.body }
        if(req.params.codigoag) agenda.codigoag = req.params.codigoag
        
        // if(!req.originalUrl.startWith('/agendas')) agenda.admin = false
        // if(!req.agenda || !req.agenda.admin) agenda.admin = false
        
        // Está verificando se o usuário esqueceu de preencher algum campo, se esqueceu o sistema irá mostrar uma mensagem
        try {
            existsOrError(agenda.codmedico, 'Código Médico não informado')
            existsOrError(agenda.codespecialidade, 'Código da Especialidade não informada')
            existsOrError(agenda.tempodeatendimento, 'Tempo de Atendimento não informado')
            existsOrError(agenda.horainicial, 'Hora Inicial não informada')
            existsOrError(agenda.horafinal, 'Hora Final não informada')
            existsOrError(agenda.intervaloinicial, 'Inervalo Inical não informado')
            existsOrError(agenda.intervalofinal, 'Inervalo Final não informado')

    } catch(msg) {
        return res.status(400).send(msg)
    }       
    
    if(agenda.codigoag){
        app.db('agendas')
            .update(agenda)
            .where({ codigoag: agenda.codigoag })
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
     } else {
        app.db('agendas')
            .insert(agenda)
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
     }
    }

    const get = (req, res) => {
        app.db({a: 'agendas', m: 'medicos', e: 'especialidades'})
            .select('a.codigoag', 'a.tempodeatendimento', 
            'a.horainicial', 'a.horafinal', 'a.intervaloinicial', 'a.intervalofinal', {medico: 'm.nome'}, {especialidade: 'e.especialidade'})
            .whereRaw('?? = ??', ['a.codmedico', 'm.codigomed'])
            .whereRaw('?? = ??', ['a.codespecialidade', 'e.codigo'])
            .then(agendas => res.json(agendas))
            .catch(err => res.status(500).send(err))
    }

    const getByCodigo = (req, res) =>{ 
        app.db('agendas')
            .where({ codigoag: req.params.codigoag })
            .first()
            .then(agenda => res.json(agenda))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {

            const agendamentos = await app.db('agendamentos')
                .where({codagenda: req.params.codigoag})
                notExistsOrError(agendamentos, "Agenda amarrada a Agendamento")

            const rowsDeleted = await app.db('agendas')
                .where ({ codigoag: req.params.codigoag }).del()
                existsOrError(rowsDeleted, 'Agenda não encontrada')

            res.status(204).send()
        }catch(msg) {
            res.status(400).send(msg)
        }
    }

    return { save, get, getByCodigo, remove}
}