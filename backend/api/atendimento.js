const bcrypt = require('bcrypt-nodejs')
const { serializeUser } = require('passport')

module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    const save = async (req, res) => {
        const atendimento = { ...req.body }
        if(req.params.codigo) atendimento.codigo = req.params.codigo
               
        // Está verificando se o usuário esqueceu de preencher algum campo, se esqueceu o sistema irá mostrar uma mensagem
        try {
            existsOrError(atendimento.codigopaciente, 'Código Paciente não informado')
            existsOrError(atendimento.paciente, 'Paciente não informado')
            existsOrError(atendimento.datadoatendimento, 'Data não informada')
            existsOrError(atendimento.medico, 'Médico não informado')
            existsOrError(atendimento.servico, 'Serviço não informado')
            existsOrError(atendimento.especialidade, 'Especialidade não informado')
            existsOrError(atendimento.convenio, 'Convênio não informado')
            existsOrError(atendimento.matricula, 'Matricula não informada')
            existsOrError(atendimento.vencimento, 'Vencimento não informado')
            

    } catch(msg) {
        return res.status(400).send(msg)
    }       
    
    if(atendimento.codigo){
        app.db('atendimentos')
            .update(atendimento)
            .where({ codigo: atendimento.codigo })
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
        app.db('atendimentos')
            .select('codigo', 'datadoatendimento', 'codigopaciente', 'paciente', 'convenio', 'medico', 'servico', 'especialidade', 'matricula', 'vencimento', 'alta' )
            .whereRaw('censo = ?', true)
            .then(atendimentos => res.json(atendimentos))
            .catch(err => res.status(500).send(err))
    }

    const getByCodigo = (req, res) =>{ 
        app.db('atendimentos')
            .where({ codigo: req.params.codigo })
            .first()
            .then(atendimento => res.json(atendimento))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            const rowsUpdate = await app.db('atendimentos')
                .update({ alta: new Date() })
                .where({ codigo: req.params.codigo })
        existsOrError(rowsUpdate, 'Atendimento não foi encontrado.')
        
        res.status(204).send()
        }catch(msg) {
            res.status(400).send(msg)
        }
    }

    return { save, get, getByCodigo, remove}
}