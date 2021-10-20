
module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    const save = async (req, res) => {
        const especialidade = { ...req.body }
        if(req.params.codigo) especialidade.codigo = req.params.codigo
        
        // if(!req.originalUrl.startWith('/especialidades')) especialidade.admin = false
        // if(!req.especialidade || !req.especialidade.admin) especialidade.admin = false
        
        // Está verificando se o usuário esqueceu de preencher algum campo, se esqueceu o sistema irá mostrar uma mensagem
        try {
            existsOrError(especialidade.especialidade, 'Serviço não informado')

            const especialidadeFromDB = await app.db('especialidades')
            .where({ especialidade: especialidade.especialidade }).first()
        if(!especialidade.especialidade) {
            notExistsOrError(especialidadeFromDB, 'Serviço já cadastrado')
        }
    } catch(msg) {
        return res.status(400).send(msg)
    }       
    
    if(especialidade.codigo){
        app.db('especialidades')
            .update(especialidade)
            .where({ codigo: especialidade.codigo })
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
     } else {
        app.db('especialidades')
            .insert(especialidade)
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
     }
    }

    const get = (req, res) => {
        app.db('especialidades')
            .select('codigo', 'especialidade' )
            .then(especialidades => res.json(especialidades))
            .catch(err => res.status(500).send(err))
    }

    const getByCodigo = (req, res) =>{ 
        app.db('especialidades')
            .where({ codigo: req.params.codigo })
            .first()
            .then(especialidade => res.json(especialidade))
            .catch(err => res.status(500).send(err))
    }
  
    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('especialidades')
                .where ({ codigo: req.params.codigo }).del()
                existsOrError(rowsDeleted, 'Especialidade não encontrada')

            res.status(204).send()
        }catch(msg) {
            res.status(400).send(msg)
        }
    }

    return { save, getByCodigo, remove, get }
}