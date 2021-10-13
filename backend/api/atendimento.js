const bcrypt = require('bcrypt-nodejs')
const { serializeUser } = require('passport')

module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    const save = async (req, res) => {
        const atendimento = { ...req.body }
        if(req.params.codigo) atendimento.codigo = req.params.codigo
        
        // if(!req.originalUrl.startWith('/atendimentos')) atendimento.admin = false
        // if(!req.atendimento || !req.atendimento.admin) atendimento.admin = false
        
        // Está verificando se o usuário esqueceu de preencher algum campo, se esqueceu o sistema irá mostrar uma mensagem
        try {
            existsOrError(atendimento.codigopaciente, 'Código Paciente não informado')
            existsOrError(atendimento.paciente, 'Paciente não informado')
            existsOrError(atendimento.convenio, 'Convênio não informado')
            existsOrError(atendimento.medico, 'Médico não informado')
            existsOrError(atendimento.servico, 'Serviço não informado')
            existsOrError(atendimento.especialidade, 'Especialidade não informado')
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
            .select('codigo', 'codigopaciente', 'paciente', 'convenio', 'medico', 'servico', 'especialidade', 'matricula', 'vencimento', 'alta' )
            .whereNull('deletedAt')
            .then(atendimentos => res.json(atendimentos))
            .catch(err => res.status(500).send(err))
    }

    const getByCodigo = (req, res) =>{ 
        app.db('atendimentos')
            .where({ codigo: req.params.codigo })
            .first()
            .then(atendimento => res.json(agenda))
            .catch(err => res.status(500).send(err))
    }
    const remove = async (req, res) => {
        try {
            // existsOrError(req.params.id, 'Código da Especialidade não informado.!')

            // const subcategory = await app.db('categories')
            //     .where({ parentId: req.params.id })

            //     notExistsOrError(subcategory, 'Categoria possui subcategorias.!')

            // const articles = await app.db('articles')
            //     .where({ categoryId: req.params.id })
            //     notExistsOrError(articles, 'Categoria possui artigos')

            const rowsUpdate = await app.db('atedimentoss')
                .update({ deletedAt: new Date() })
                .where({ codigo: req.params.codigo })
        existsOrError(rowsUpdate, 'Atendimento não foi encontrado.')
        
        res.status(204).send()
        }catch(msg) {
            res.status(400).send(msg)
        }
    }

    return { save, get, getByCodigo, remove}
}