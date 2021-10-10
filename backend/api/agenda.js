const bcrypt = require('bcrypt-nodejs')
const { serializeUser } = require('passport')

module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    const save = async (req, res) => {
        const agenda = { ...req.body }
        if(req.params.codigo) agenda.codigo = req.params.codigo
        
        // if(!req.originalUrl.startWith('/agendas')) agenda.admin = false
        // if(!req.agenda || !req.agenda.admin) agenda.admin = false
        
        // Está verificando se o usuário esqueceu de preencher algum campo, se esqueceu o sistema irá mostrar uma mensagem
        try {
            existsOrError(agenda.codigomedico, 'Médico não informado')
            existsOrError(agenda.tempodeatendimento, 'Tempo de Atendimento não informado')
            existsOrError(agenda.horainicial, 'Hora Inicial não informada')
            existsOrError(agenda.horafinal, 'Hora Final não informada')
            existsOrError(agenda.intervaloinicial, 'Inervalo Inical não informado')
            existsOrError(agenda.intervalofinal, 'Inervalo Final não informado')
            existsOrError(agenda.codigoespecialidade, 'Especialidade não informada')

    } catch(msg) {
        return res.status(400).send(msg)
    }       
    
    if(agenda.codigo){
        app.db('agendas')
            .update(agenda)
            .where({ codigo: agenda.codigo })
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
        app.db('agendas')
            .select('codigo', 'codigomedico', 'medico', 'tempodeatendimento', 'horainicial', 'horafinal', 'intervaloinicial', 'intervalofinal', 'codigoespecialidade', 'especialidade')
            .then(agendas => res.json(agendas))
            .catch(err => res.status(500).send(err))
    }

    const getByCodigo = (req, res) =>{ 
        app.db('agendas')
            .where({ codigo: req.params.codigo })
            .first()
            .then(agenda => res.json(agenda))
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

            const rowsDeleted = await app.db('agendas')
                .where ({ codigo: req.params.codigo }).del()
                existsOrError(rowsDeleted, 'Agenda não encontrada')

            res.status(204).send()
        }catch(msg) {
            res.status(400).send(msg)
        }
    }

    return { save, get, getByCodigo, remove}
}