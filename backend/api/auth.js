const { authSecret } = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const signin = async (req, res) => {
        if(!req.body.email || !req.body.password) {
            return res.status(400).send('Informe usuário e senha!!!')
        }

        const usuario = await app.db('usuarios')
            .where({ email: req.body.email })
            .first()

        if (!usuario) return res.status(400).send('Usuário não encontrado!!!')

        const isMacth = bcrypt.compareSync(req.body.password, usuario.password)
        if (!isMacth) return res.status(401).send('Email/Senha inválidos!!!')

        const now = Math.floor(Date.now() / 1000)

        const payload = {
            codigo: usuario.codigo,
            nome: usuario.nome,
            email: usuario.email,
            admin: usuario.admin,
            iat: now,
            exp: now + (60 * 60 * 24 * 3)
        }

        res.json({
            ...payload,
            token: jwt.encode(payload, authSecret)
        })
    }

    const validateToken = async (req, res) => {
        const userData = req.body || null
        try {
            if(userData){
                const token = jwt.decode(userData.token, authSecret)
                if(new Date(token.exp * 1000) > new Date()){
                    return res.send(true)
                }
            }
        } catch(e){
            //problema com o token
        }
        res.send(false)
    }

    return { signin, validateToken }
}