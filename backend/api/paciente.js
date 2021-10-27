
module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation
    
    const save = async (req, res) => {
        const paciente = { ...req.body }
        if(req.params.codigopac) paciente.codigopac = req.params.codigopac
                
        // Está verificando se o usuário esqueceu de preencher algum campo, se esqueceu o sistema irá mostrar uma mensagem
        try{
            existsOrError(paciente.nomepac, 'Nome não informado')
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
            existsOrError(paciente.codconvenio, 'Convenio não informado')
            existsOrError(paciente.matricula, 'Matricula não informada')
            existsOrError(paciente.vencimento, 'Vencimento não informado')
        
        }catch(msg) {
            return res.status(400).send(msg)
        } 

        if(paciente.codigopac){
            app.db('pacientes')
                .update(paciente)
                .where({ codigopac: paciente.codigopac })
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
        app.db({p: 'pacientes', c: 'convenios'})
            .select('p.codigopac', 'p.nomepac', 'p.email', 'p.cpf', 'p.datanasc', 'p.estadocivil', 'p.sexo', 'p.mae', 'p.pai', 'p.ceppaciente', 'p.tipo', 
            'p.endereco', 'p.numero', 'p.bairro', 'p.municipio', 'p.ufmunicipio', 'p.telddd', 'p.tel', 'p.celddd', 'p.cel', {convenio: 'c.convenio'},
            'p.matricula', 'p.vencimento' )
            .whereRaw('?? = ??', ['p.codconvenio', 'c.codigo'])
            .then(pacientes => res.json(pacientes))
            .catch(err => res.status(500).send(err))
    }

    const getByCodigo = (req, res) => {
        app.db('pacientes')
            .where({ codigopac: req.params.codigopac })
            .first()
            .then(paciente => res.json(paciente))
            .catch(err => res.status(500).send(err))
    }
 
    const remove = async (req, res) => {
        try {

            const atendimentos = await app.db('atendimentos')
                .where({codpaciente: req.params.codigopac})
                notExistsOrError(atendimentos, "Paciente amarrado a Atendimento")

            const rowsDeleted = await app.db('pacientes')
                .where ({ codigopac: req.params.codigopac }).del()
                existsOrError(rowsDeleted, 'Paciente não encontrado')

            res.status(204).send()
        }catch(msg) {
            res.status(400).send(msg)
        }
    }

    return { save, get, getByCodigo, remove}
}