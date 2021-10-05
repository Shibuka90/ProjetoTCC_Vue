const bcrypt = require('bcrypt-nodejs')
const { serializeUser } = require('passport')

module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    const encryptPassword = password => {
        const salt = bcrypt .genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }
    
    const encryptConfirmPassword = confirmpassword => {
        const salt = bcrypt .genSaltSync(10)
        return bcrypt.hashSync(confirmpassword, salt)
    }
    
    const save = async (req, res) => {
        const usuario = { ...req.body }
        if(req.params.codigo) usuario.codigo = req.params.codigo
        
        // if(!req.originalUrl.startWith('/usuarios')) usuario.admin = false
        // if(!req.usuario || !req.usuario.admin) usuario.admin = false
        
        // Está verificando se o usuário esqueceu de preencher algum campo, se esqueceu o sistema irá mostrar uma mensagem
        try{
            existsOrError(usuario.nome, 'Nome não informado')
            existsOrError(usuario.email, 'Email não informado')
            existsOrError(usuario.cpf, 'CPF não informado')
            existsOrError(usuario.datanasc, 'Data de Nascimento não informada')
            existsOrError(usuario.estadocivil, 'Estado Civil não informado')
            existsOrError(usuario.sexo, 'Sexo não informado')
            existsOrError(usuario.cargo, 'Cargo não informado')
            existsOrError(usuario.cepusuario, 'CEP não informado')
            existsOrError(usuario.tipo, 'Tipo do Logradouro não informado')
            existsOrError(usuario.endereco, 'Endereço não informado')
            existsOrError(usuario.numero, 'Número não informado')
            existsOrError(usuario.bairro, 'Bairro não informado')
            existsOrError(usuario.municipio, 'Municipio não informado')
            existsOrError(usuario.ufmunicipio, 'UF do Municipio não informado')
            existsOrError(usuario.celddd, 'DDD do Celular não informado')
            existsOrError(usuario.cel, 'Celular não informado')

            const usuarioFromDB = await app.db('usuarios')
                .where ({ email: usuario.email }).first()
            if(!usuario.codigo){
                notExistsOrError(usuarioFromDB, 'Usuário já cadastrado')
                existsOrError(usuario.password, 'Senha não informada')
                existsOrError(usuario.confirmpassword, 'Confirmação de senha não informada')
                equalsOrError(usuario.password, usuario.confirmpassword, 'Senhas não conferem')
            } else {
                if (usuario.password || usuario.confirmpassword) {
                    existsOrError(usuario.password, 'Senha não informada')
                    existsOrError(usuario.confirmpassword, 'Confirmação de senha não informada')
                }
            }            
        }catch(msg) {
            return res.status(400).send(msg)
        }

        usuario.password = encryptPassword(req.body.password)
        usuario.confirmpassword = encryptConfirmPassword(req.body.confirmpassword)
      

        if(usuario.codigo){
            app.db('usuarios')
                .update(usuario)
                .where({ codigo: usuario.codigo })
                .whereNull('deletedAt')
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('usuarios')
                .insert(usuario)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }

    }

    const get = (req, res) => {
        app.db('usuarios')
            .select('codigo', 'nome', 'email', 'cpf', 'datanasc', 'estadocivil', 'sexo', 'cargo', 'siglacr', 'cr', 'ufcr',
                    'cepusuario', 'tipo', 'endereco', 'numero', 'bairro', 'municipio', 'ufmunicipio', 'telddd', 'tel',
                    'celddd', 'cel', 'admin' )
            .whereNull('deletedAt')
            .then(usuarios => res.json(usuarios))
            .catch(err => res.status(500).send(err))
    }

    const getByCodigo = (req, res) => {
        app.db('usuarios')
            .where({ codigo: req.params.codigo })
            .first()
            .then(usuario => res.json(usuario))
            .catch(err => res.status(500).send(err))
    }
    const getByNome = (req, res) => {
        app.db('usuarios')
            .where({ nome: req.params.nome })
            .first()
            .then(usuario => res.json(usuario))
            .catch(err => res.status(500).send(err))
    }


    const remove = async (req, res) => {
        try{
            const rowsUpdate = await app.db('usuarios')
                .update({ deletedAt: new Date() })
                .where({ codigo: req.params.codigo })
            existsOrError(rowsUpdate, 'Usuário não foi encontrado.')
            
            res.status(204).send()
        } catch(msg) {
            res.status(400).send(e)
        }
    }

    return { save, get, getByCodigo, getByNome, remove}
}