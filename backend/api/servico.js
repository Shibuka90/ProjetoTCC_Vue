
module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    const save = async (req, res) => {
        const servico = { ...req.body }
        if(req.params.codigo) servico.codigo = req.params.codigo
        
        // if(!req.originalUrl.startWith('/servicos')) especialidade.admin = false
        // if(!req.servico || !req.servico.admin) especialidade.admin = false
        
        // Está verificando se o usuário esqueceu de preencher algum campo, se esqueceu o sistema irá mostrar uma mensagem
        try {
            existsOrError(servico.servico, 'Serviço não informado')

            const servicoFromDB = await app.db('servicos')
            .where({ servico: servico.servico }).first()
        if(!servico.servico) {
            notExistsOrError(servicoFromDB, 'Serviço já cadastrado')
        }
    } catch(msg) {
        return res.status(400).send(msg)
    }
    
    if(servico.codigo){
        app.db('servicos')
            .update(servico)
            .where({ codigo: servico.codigo })
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
     } else {
        app.db('servicos')
            .insert(servico)
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
     }
    }
    const get = (req, res) => {
        app.db('servicos')
            .select('codigo', 'servico' )
            .then(servicos => res.json(servicos))
            .catch(err => res.status(500).send(err))
    }

    const getByCodigo = (req, res) =>{ 
        app.db('servicos')
            .where({ codigo: req.params.codigo })
            .first()
            .then(servico => res.json(servico))
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

            const rowsDeleted = await app.db('servicos')
                .where ({ codigo: req.params.codigo }).del()
                existsOrError(rowsDeleted, 'Serviço não encontrada')

            res.status(204).send()
        }catch(msg) {
            res.status(400).send(msg)
        }
    }

    return { save, get, getByCodigo, remove}
}

