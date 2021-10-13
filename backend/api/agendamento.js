const bcrypt = require('bcrypt-nodejs')
const { serializeUser } = require('passport')

module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    const save = async (req, res) => {
        const agendamento = { ...req.body }
        if(req.params.codigo) agendamento.codigo = req.params.codigo
        
        // if(!req.originalUrl.startWith('/agendamentos')) agendamento.admin = false
        // if(!req.agendamento || !req.agendamento.admin) agendamento.admin = false
        
        // Está verificando se o usuário esqueceu de preencher algum campo, se esqueceu o sistema irá mostrar uma mensagem
        try {
            existsOrError(agendamento.horario, 'Horário não informado')
            existsOrError(agendamento.dataagendamento, 'Data não informado')
            existsOrError(agendamento.codigomedico, 'Código Médico não informado')
            existsOrError(agendamento.medico, 'Médico não informado')
            existsOrError(agendamento.codigopaciente, 'Código do Paciente não informada')
            existsOrError(agendamento.paciente, 'Especialidade não informada')
            existsOrError(agendamento.codigoservico, 'Código do Serviço não informada')
            existsOrError(agendamento.servico, 'Serviço não informada')
                       

    } catch(msg) {
        return res.status(400).send(msg)
    }       
    
    if(agenda.codigo){
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
            .select('codigo', 'horario', 'dataagendamento', 'codigomedico', 'medico', 'codigopaciente', 'paciente', 'codigoservico', 'servico')
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
            // existsOrError(req.params.id, 'Código da Especialidade não informado.!')

            // const subcategory = await app.db('categories')
            //     .where({ parentId: req.params.id })

            //     notExistsOrError(subcategory, 'Categoria possui subcategorias.!')

            // const articles = await app.db('articles')
            //     .where({ categoryId: req.params.id })
            //     notExistsOrError(articles, 'Categoria possui artigos')

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