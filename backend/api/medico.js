
module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation
    
    const save = async (req, res) => {
        const medico = { ...req.body }
        if(req.params.codigo) medico.codigo = req.params.codigo
        
        // if(!req.originalUrl.startWith('/medicos')) medico.admin = false
        // if(!req.medico || !req.medico.admin) medico.admin = false
        
        // Está verificando se o usuário esqueceu de preencher algum campo, se esqueceu o sistema irá mostrar uma mensagem
        try{
            existsOrError(medico.nome, 'Nome não informado')
            existsOrError(medico.email, 'Email não informado')
            existsOrError(medico.cpf, 'CPF não informado')
            existsOrError(medico.datanasc, 'Data de Nascimento não informada')
            existsOrError(medico.estadocivil, 'Estado Civil não informado')
            existsOrError(medico.sexo, 'Sexo não informado')
            existsOrError(medico.especialidade, 'Cargo não informado')
            existsOrError(medico.crm, 'CRM não informado')
            existsOrError(medico.ufcr, 'Uf não informado')
            existsOrError(medico.cepmedico, 'CEP não informado')
            existsOrError(medico.tipo, 'Tipo do Logradouro não informado')
            existsOrError(medico.endereco, 'Endereço não informado')
            existsOrError(medico.numero, 'Número não informado')
            existsOrError(medico.bairro, 'Bairro não informado')
            existsOrError(medico.municipio, 'Municipio não informado')
            existsOrError(medico.ufmunicipio, 'UF do Municipio não informado')
            existsOrError(medico.celddd, 'DDD do Celular não informado')
            existsOrError(medico.cel, 'Celular não informado')
        
        }catch(msg) {
            return res.status(400).send(msg)
        } 

        if(medico.codigo){
            app.db('medicos')
                .update(medico)
                .where({ codigo: medico.codigo })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('medicos')
                .insert(medico)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }

    }

    const get = (req, res) => {
        app.db('medicos')
            .select('codigo', 'nome', 'email', 'cpf', 'datanasc', 'estadocivil', 'sexo', 'especialidade', 'crm', 'ufcr',
                    'cepmedico', 'tipo', 'endereco', 'numero', 'bairro', 'municipio', 'ufmunicipio', 'telddd', 'tel',
                    'celddd', 'cel' )
            .then(medicos => res.json(medicos))
            .catch(err => res.status(500).send(err))
    }

    const getByCodigo = (req, res) => {
        app.db('medicos')
            .where({ codigo: req.params.codigo })
            .first()
            .then(medico => res.json(medico))
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

            const rowsDeleted = await app.db('medicos')
                .where ({ codigo: req.params.codigo }).del()
                existsOrError(rowsDeleted, 'Medico não encontrado')

            res.status(204).send()
        }catch(msg) {
            res.status(400).send(msg)
        }
    }

    return { save, get, getByCodigo, remove}
}