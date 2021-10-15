const bcrypt = require('bcrypt-nodejs')
const { serializeUser } = require('passport')

module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation
    
    const save = async (req, res) => {
        const paciente = { ...req.body }
        if(req.params.codigo) paciente.codigo = req.params.codigo
                
        // Está verificando se o usuário esqueceu de preencher algum campo, se esqueceu o sistema irá mostrar uma mensagem
        try{
            existsOrError(paciente.nome, 'Nome não informado')
            existsOrError(paciente.email, 'Email não informado')
            existsOrError(paciente.cpf, 'CPF não informado')
            existsOrError(paciente.datanasc, 'Data de Nascimento não informada')
            existsOrError(paciente.estadocivil, 'Estado Civil não informado')
            existsOrError(paciente.sexo, 'Sexo não informado')
            existsOrError(paciente.mae, 'Mãe não informada')
            existsOrError(paciente.pai, 'Pai não informado')
            existsOrError(paciente.ceppaciente, 'CEP não informado')
            existsOrError(paciente.tipo, 'Tipo do Logradouro não informado')
            existsOrError(paciente.endereco, 'Endereço não informado')
            existsOrError(paciente.numero, 'Número não informado')
            existsOrError(paciente.bairro, 'Bairro não informado')
            existsOrError(paciente.municipio, 'Municipio não informado')
            existsOrError(paciente.ufmunicipio, 'UF do Municipio não informado')
            existsOrError(paciente.celddd, 'DDD do Celular não informado')
            existsOrError(paciente.cel, 'Celular não informado')
            existsOrError(paciente.convenio, 'Convenio não informado')
            existsOrError(paciente.matricula, 'Matricula não informada')
            existsOrError(paciente.vencimento, 'Vencimento não informado')
        
        }catch(msg) {
            return res.status(400).send(msg)
        } 

        if(paciente.codigo){
            app.db('pacientes')
                .update(paciente)
                .where({ codigo: paciente.codigo })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('pacientes')
                .insert(paciente)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }

    }

    const get = (req, res) => {
        app.db('pacientes')
            .select('codigo', 'nome', 'email', 'cpf', 'datanasc', 'estadocivil', 'sexo', 'mae', 'pai', 'ceppaciente', 'tipo', 
            'endereco', 'numero', 'bairro', 'municipio', 'ufmunicipio', 'telddd', 'tel', 'celddd', 'cel', 'convenio', 'matricula', 'vencimento' )
            .then(pacientes => res.json(pacientes))
            .catch(err => res.status(500).send(err))
    }

    const getByCodigo = (req, res) => {
        app.db('pacientes')
            .where({ codigo: req.params.codigo })
            .first()
            .then(paciente => res.json(paciente))
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

            const rowsDeleted = await app.db('pacientes')
                .where ({ codigo: req.params.codigo }).del()
                existsOrError(rowsDeleted, 'Paciente não encontrado')

            res.status(204).send()
        }catch(msg) {
            res.status(400).send(msg)
        }
    }

    return { save, get, getByCodigo, remove}
}