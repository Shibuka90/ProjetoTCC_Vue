module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    const save = async (req, res) => {
        const atendimento = { ...req.body }
        if(req.params.codigoatend) atendimento.codigoatend = req.params.codigoatend
               
        // Está verificando se o usuário esqueceu de preencher algum campo, se esqueceu o sistema irá mostrar uma mensagem
        try {
            existsOrError(atendimento.codpaciente, 'Código Paciente não informado')
            existsOrError(atendimento.datadoatendimento, 'Data não informada')
            existsOrError(atendimento.codmedico, 'Médico não informado')
            existsOrError(atendimento.convenio, 'Convênio não informado')
            existsOrError(atendimento.codservico, 'Serviço não informado')
            existsOrError(atendimento.codespecialidade, 'Especialidade não informado')
            existsOrError(atendimento.matricula, 'Matricula não informada')
            existsOrError(atendimento.vencimento, 'Vencimento não informado')
            

    } catch(msg) {
        return res.status(400).send(msg)
    }       
    
    if(atendimento.codigoatend){
        app.db('atendimentos')
            .update(atendimento)
            .where({ codigoatend: atendimento.codigoatend })
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
     } else {
        app.db('atendimentos')
            .insert(atendimento)
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
     }
    }

    const get = (req, res) => {
        app.db({a: 'atendimentos',p: 'pacientes'})
            .select('a.codigoatend','a.datadoatendimento','a.alta', 'a.convenio', 'a.matricula', 'a.vencimento', 
            {paciente: 'p.nomepac'})
            .whereRaw('?? = ??', ['a.codpaciente', 'p.codigopac'])
            .then(atendimentos => res.json(atendimentos))
            .catch(err => res.status(500).send(err))
    }

    const getByCodigo = (req, res) =>{ 
        app.db('atendimentos')
            .where({ codigoatend: req.params.codigoatend })
            .first()
            .then(atendimento => res.json(atendimento))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            const rowsUpdate = await app.db('atendimentos')
                .update({ alta: new Date() })
                .where({ codigoatend: req.params.codigoatend })
        existsOrError(rowsUpdate, 'Atendimento não foi encontrado.')
        
        res.status(204).send()
        }catch(msg) {
            res.status(400).send(msg)
        }
    }

    return { save, get, getByCodigo, remove}
}