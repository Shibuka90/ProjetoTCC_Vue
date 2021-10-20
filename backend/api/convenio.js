
module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    const save = async (req, res) => {
        const convenio = { 
            codigo: req.body.codigo,
            convenio: req.body.convenio,
         }
        if(req.params.codigo) convenio.codigo = req.params.codigo
        
        // if(!req.originalUrl.startWith('/convenios')) especialidade.admin = false
        // if(!req.convenio || !req.convenio.admin) especialidade.admin = false
        
        // Está verificando se o usuário esqueceu de preencher algum campo, se esqueceu o sistema irá mostrar uma mensagem
        try {
            existsOrError(convenio.convenio, 'Convênio não informado')

            const convenioFromDB = await app.db('convenios')
            .where({ convenio: convenio.convenio }).first()
        if(!convenio.convenio) {
            notExistsOrError(convenioFromDB, 'Convênio já cadastrado')
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
            const rowsDeleted = await app.db('convenios')
                .where ({ codigo: req.params.codigo }).del()
                existsOrError(rowsDeleted, 'Convênio não encontrada')

            res.status(204).send()
        }catch(msg) {
            res.status(400).send(msg)
        }
    }

    return { save, get, getByCodigo, remove}
}

