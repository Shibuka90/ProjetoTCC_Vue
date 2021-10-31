//Interface de programção da aplicação Usuários

const bcrypt = require('bcrypt-nodejs')//importa a configuração de criptografia

module.exports = app => {
    //funções destructor da API de Validação, para não ficar repetinto  app.api.validation.função
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    //Função para criptografar a senha
    const encryptPassword = password => {
        const salt = bcrypt .genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }
    
    //Função para criptografar a confirmação de senha
    const encryptConfirmPassword = confirmpassword => {
        const salt = bcrypt .genSaltSync(10)
        return bcrypt.hashSync(confirmpassword, salt)
    }
    
    //Função Salvar ou Alterar os dados no banco de dados
    const save = async (req, res) => {
        const usuario = { ...req.body }
        if(req.params.codigo) usuario.codigo = req.params.codigo
        
        if(!req.originalUrl.startWith('/usuarios')) usuario.admin = false
        if(!req.usuario || !req.usuario.admin) usuario.admin = false
        
        // Está verificando se o usuário esqueceu de preencher algum campo, se esqueceu o sistema irá mostrar uma mensagem e retorna status 400 no banco de dados
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
            existsOrError(usuario.password, 'Senha não informada')
            existsOrError(usuario.confirmpassword, 'Confirmação de senha não informada')

            //Função para verificar se o usuário já existe
            const userFromDB = await app.db('usuarios').where({ email: usuario.email }).first()
            if(!usuario.codigo){
                notExistsOrError(userFromDB, 'Usuário já cadastrado')
            }
        }catch(msg){
            return res.status(400).send(msg)
        }

        //Faz a criptografia da senha e da confirmação de senha
        usuario.password = encryptPassword(req.body.password)
        usuario.confirmpassword = encryptConfirmPassword(req.body.confirmpassword)
      

        /*Condição de existência de dados na variável codigo, se existir, será feito o update nos dados do Usuário cadastrado, 
        se não existir, será feito o insert dos dados de cadastro do Usuário no banco de dados*/
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

    /*Função de "trazer ou pegar" as informações da tabela Usuários para montar a tabela de dados na página de Usuários*/
    const get = (req, res) => {
        //faz a conexão com o banco de dados
        app.db('usuarios')
        //seleciona os dados da tabela Usuários
            .select('codigo', 'nome', 'email', 'cpf', 'datanasc', 'estadocivil', 'sexo', 'cargo', 'siglacr', 'cr', 'ufcr',
                    'cepusuario', 'tipo', 'endereco', 'numero', 'bairro', 'municipio', 'ufmunicipio', 'telddd', 'tel',
                    'celddd', 'cel', 'admin' )
            //condição filtar os cadastor que estejam com o campo DELETEDAT = NULL
            .whereNull('deletedAt')
            //envia os dados como JSON para o backend
            .then(usuarios => res.json(usuarios))
            //caso haja erro na consulta, é enviado status 500, que há algum "problema" no banco de dados
            .catch(err => res.status(500).send(err))
    }

    /*Função para "trazer ou pegar" as informações de um determinado cadastro da Tabela Usuários e mostrar na página de cadastro do Usuário*/ 
    const getByCodigo = (req, res) => {
        //faz a conexão com o banco de dados
        app.db('usuarios')
        //condição para trazer os dados do cadasto do Usuário
            .where({ codigo: req.params.codigo })
            //traz o primeiro cadastro que o banco de dados "achou"
            .first()
            //envia os dados como JSON para o backend
            .then(usuario => res.json(usuario))
            //caso haja erro na consulta, é enviado status 500, que há algum "problema" no banco de dados
            .catch(err => res.status(500).send(err))
    }
  
    /*Função para remover o cadastro do Usuário*/
    const remove = async (req, res) => {
        try{

            //"Exclui" o cadastro do Usuário
            const rowsUpdate = await app.db('usuarios')
                .update({ deletedAt: new Date() })
                .where({ codigo: req.params.codigo })
            existsOrError(rowsUpdate, 'Usuário não foi encontrado.')
            
            res.status(204).send()
        } catch(msg) {
            res.status(400).send(e)
        }
    }

    //retorna as funcções
    return { save, get, getByCodigo, remove}
}