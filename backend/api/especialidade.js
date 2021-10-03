module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    const save = async (req, res) => {
        const especialidades = { ...req.body }
        if(req.params.codigo) especialidades.codigo = req.params.codigo
        
        // if(!req.originalUrl.startWith('/especialidades')) especialidade.admin = false
        // if(!req.especialidade || !req.especialidade.admin) especialidade.admin = false
        
        // Está verificando se o usuário esqueceu de preencher algum campo, se esqueceu o sistema irá mostrar uma mensagem
        const especialidadeFromDB = await app.db('usuarios')
                .where ({ especialidades: especialidade.especialidades }).first()
        try {
            existsOrError(especialidade.especialidades, 'Especialidade não informado')
        }catch(msg) {
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
            .select('codigo', 'especialidades' )
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
       app.db('especialidades')
            .where({ codigo: req.params.codigo })
            .first()
            .then(especialidade => res.json(especialidade))
            .catch(err => res.status(500).send(err))
    }

    const limit = 10 // usado para paginação
    const getpg = async (req, res) => {
        const page = req.query.page || 1

        const result = await app.db('especialidades').count('codigo').first()
        const count = parseInt(result.count)

        app.db('especialidades')
            .select('codigo', 'especialidades')
            .limit(limit).offset(page * limit - limit)
            .then(especialidades => res.json({ data: especialidades, count, limit }))
            .catch(err => res.status(500).send(err))
    }


    return { save, get, getByCodigo, remove, getpg}
}

