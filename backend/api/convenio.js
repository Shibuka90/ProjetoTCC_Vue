module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    const save = async (req, res) => {
        const convenio = { ...req.body }
        if(req.params.codigo) convenio.codigo = req.params.codigo
        
        // if(!req.originalUrl.startWith('/convenios')) especialidade.admin = false
        // if(!req.convenio || !req.convenio.admin) especialidade.admin = false
        
        // Está verificando se o usuário esqueceu de preencher algum campo, se esqueceu o sistema irá mostrar uma mensagem
        try {
            existsOrError(convenio.convenio, 'Serviço não informado')

            const convenioFromDB = await app.db('convenios')
            .where({ convenio: convenio.convenio }).first()
        if(!convenio.convenio) {
            notExistsOrError(convenioFromDB, 'Serviço já cadastrado')
        }
    } catch(msg) {
        return res.status(400).send(msg)
    }         
    
    if(convenio.codigo){
        app.db('convenios')
            .update(convenio)
            .where({ codigo: convenio.codigo })
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
     } else {
        app.db('convenios')
            .insert(convenio)
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
     }
    }
    const get = (req, res) => {
        app.db('convenios')
            .select('codigo', 'convenio' )
            .then(convenios => res.json(convenios))
            .catch(err => res.status(500).send(err))
    }

    const getByCodigo = (req, res) =>{ 
        app.db('convenios')
            .where({ codigo: req.params.codigo })
            .first()
            .then(convenio => res.json(convenio))
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

            const rowsDeleted = await app.db('convenios')
                .where ({ codigo: req.params.codigo }).del()
                existsOrError(rowsDeleted, 'Convênio não encontrada')

            res.status(204).send()
        }catch(msg) {
            res.status(400).send(msg)
        }
    }

    const limit = 10 // usado para paginação
    const getpg = async (req, res) => {
        const page = req.query.page || 1

        const result = await app.db('convenios').count('codigo').first()
        const count = parseInt(result.count)

        app.db('convenios')
            .select('codigo', 'convenios')
            .limit(limit).offset(page * limit - limit)
            .then(convenios => res.json({ data: convenios, count, limit }))
            .catch(err => res.status(500).send(err))
    }


    return { save, get, getByCodigo, remove, getpg}
}

