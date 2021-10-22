
module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    const save = async (req, res) => {
        const agendamento = { ...req.body }
        if(req.params.codigo) agendamento.codigo = req.params.codigo
        
        // Está verificando se o usuário esqueceu de preencher algum campo, se esqueceu o sistema irá mostrar uma mensagem
        try {
            existsOrError(agendamento.codigoagenda, 'Código Agenda não informado')
            existsOrError(agendamento.agenda, 'Agenda não informado')
            existsOrError(agendamento.dataagendamento, 'Data não informado')
            existsOrError(agendamento.horario, 'Horário não informado')
            existsOrError(agendamento.paciente, 'Horário não informado')
            existsOrError(agendamento.servico, 'Serviço não informada')
                       

    } catch(msg) {
        return res.status(400).send(msg)
    }       
    
    if(agendamento.codigo){
        app.db('agendamentos')
            .update(agendamento)
            .where({ codigo: agendamento.codigo })
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
     } else {
        app.db('agendamentos')
            .insert(agendamento)
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
     }
    }

    const get = (req, res) => {
        app.db('agendamentos')
            .select('codigo', 'horario', 'dataagendamento', 
            'codigoagenda', 'agenda', 'paciente', 'servico')
            .then(agendas => res.json(agendas))
            .catch(err => res.status(500).send(err))
    }

    const getByCodigo = (req, res) =>{ 
        app.db('agendamentos')
            .where({ codigo: req.params.codigo })
            .first()
            .then(agendamento => res.json(agendamento))
            .catch(err => res.status(500).send(err))
    }
    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('agendamentos')
                .where ({ codigo: req.params.codigo }).del()
                existsOrError(rowsDeleted, 'Agendamento não encontrado')

            res.status(204).send()
        }catch(msg) {
            res.status(400).send(msg)
        }
    }

    return { save, get, getByCodigo, remove}
}