
module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    const save = async (req, res) => {
        const prontuario = { ...req.body }
        if(req.params.codigo) prontuario.codigo = req.params.codigo
               
        // Está verificando se o usuário esqueceu de preencher algum campo, se esqueceu o sistema irá mostrar uma mensagem
        try {
            existsOrError(prontuario.codigoatendimento, 'Código Atendimento não informado')
            existsOrError(prontuario.paciente, 'Paciente não informado')
            existsOrError(prontuario.datadoprontuario, 'Data não informada')
            existsOrError(prontuario.medico, 'Médico não informado')
            existsOrError(prontuario.convenio, 'Convênio não informado')
            existsOrError(prontuario.especialidade, 'Especialidade não informado')
            existsOrError(prontuario.servico, 'Serviço não informado')
            existsOrError(prontuario.relatorio, 'Relatorio não preenchido')
    } catch(msg) {
        return res.status(400).send(msg)
    }       
    
    if(prontuario.codigo){
        app.db('prontuarios')
            .update(prontuario)
            .where({ codigo: prontuario.codigo })
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
     } else {
        app.db('prontuarios')
            .insert(prontuario)
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
     }
    }

    const get = (req, res) => {
        app.db('prontuarios')
            .select('codigo', 'datadoprontuario', 'codigoatendimento', 'paciente', 'convenio', 'medico', 'servico', 'especialidade')
            .then(prontuarios => res.json(prontuarios))
            .catch(err => res.status(500).send(err))
    }

    const getByCodigo = (req, res) =>{ 
        app.db('prontuarios')
            .where({ codigo: req.params.codigo })
            .first()
            .then(prontuario => res.json(prontuario))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('prontuario')
                .where({ codigo: req.params.codigo }).del()
            
            try {
                existsOrError(rowsDeleted, 'Prontuario não foi encontrado.')
            } catch(msg) {
                return res.status(400).send(msg)    
            }

            res.status(204).send()
        } catch(msg) {
            res.status(500).send(msg)
        }
    }

    return { save, get, getByCodigo, remove}
}