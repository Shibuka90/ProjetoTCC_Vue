const { authSecret } = require('../.env') //importa o authSecret de .env
const jwt = require('jwt-simple')//importa o jwt-simple
const bcrypt = require('bcrypt-nodejs')//importa a criptografia do nodejs

module.exports = app => {
    //função para logar no sistema
    const signin = async (req, res) => {
        //codição de validação do e-mail e da senha do usuário
        if(!req.body.email || !req.body.password) {
            //caso o e-mail e a senha não foram informado, o sistema irá mostrar uma mensagem
            return res.status(400).send('Informe usuário e senha!!!')
        }

        //Obtêm o usuário do banco de dados, através do e-mail do informado no corpo da página
        const usuario = await app.db('usuarios')
            .where({ email: req.body.email })
            .first()
        //caso não haja usuário cadastrado ou o e-mail está errado, o sistema mostra a mensagem
        if (!usuario) return res.status(400).send('Usuário não encontrado!!!')
        
        //compara a senha informada no corpo da página com a senha cadastrada no cadastro do usuário
        const isMacth = bcrypt.compareSync(req.body.password, usuario.password)
        //se não existir a senha cadastrada, o sistema mostra a mensagem
        if (!isMacth) return res.status(401).send('Email/Senha inválidos!!!')

        //pega a data atual em segundos
        const now = Math.floor(Date.now() / 1000)

        //configuraçã odo token de autenticação
        const payload = {
            codigo: usuario.codigo,
            nome: usuario.nome,
            email: usuario.email,
            admin: usuario.admin,
            iat: now,//data de geração do token
            exp: now + (60 * 60 * 24 * 3)/*tempo para expirar o token, 
                                            pega a data atual(now) soma
                                            com (s * min * h * d), nesse caso
                                            o token experirá em três da data que foi
                                            gerado*/
        }

        //envia a resposta
        res.json({
            //primeiro os dados informados no payload
            ...payload,
            //gera o token
            token: jwt.encode(payload, authSecret)
        })
    }

    //função para validar o token
    const validateToken = async (req, res) => {
        //pega os dados do corpo da página
        const userData = req.body || null
        try {
            //condição existência de usuário
            if(userData){
                //decodifica o token
                const token = jwt.decode(userData.token, authSecret)
                //codição para verificar se o token é válido
                if(new Date(token.exp * 1000) > new Date()){
                    return res.send(true)
                }
            }
        } catch(e){
            //problema com o token
        }
        res.send(false)
    }

    //retorna as funções
    return { signin, validateToken }
}