
module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation
    
    const save = async (req, res) => {
        const medico = { ...req.body }
        if(req.params.codigomed) medico.codigomed = req.params.codigomed
        
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
            existsOrError(medico.codespecialidade, 'Cargo não informado')
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

        if(medico.codigomed){
            app.db('medicos')
                .update(medico)
                .where({ codigomed: medico.codigomed })
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
        app.db({m: 'medicos', e: 'especialidades'})
            .select('m.codigomed', 'm.nome', 'm.email', 'm.cpf', 'm.datanasc', 'm.estadocivil', 'm.sexo', {especialidade: 'e.especialidade'}, 'm.crm', 'm.ufcr',
                    'm.cepmedico', 'm.tipo', 'm.endereco', 'm.numero', 'm.bairro', 'm.municipio', 'm.ufmunicipio', 'm.telddd', 'm.tel',
                    'm.celddd', 'm.cel' )
            .whereRaw('?? = ??', ['m.codespecialidade', 'e.codigo'])
            .then(medicos => res.json(medicos))
            .catch(err => res.status(500).send(err))
    }

    const getByCodigo = (req, res) => {
        app.db('medicos')
            .where({ codigomed: req.params.codigomed })
            .first()
            .then(medico => res.json(medico))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('medicos')
                .where ({ codigomed: req.params.codigomed }).del()
                existsOrError(rowsDeleted, 'Medico não encontrado')

            res.status(204).send()
        }catch(msg) {
            res.status(400).send(msg)
        }
    }

    return { save, get, getByCodigo, remove}
}