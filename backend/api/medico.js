//Interface de programção da aplicação Médicos

module.exports = app => {
    //funções destructor da API de Validação, para não ficar repetinto  app.api.validation.função
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation
    
    //Função Salvar ou Alterar os dados no banco de dados
    const save = async (req, res) => {
        //Variável agenda que armazena todos os dados que estão no corpo da página
        const medico = { ...req.body }
        //Condição de existência da variável codigomed do parâmetro da requisição para passar para a variável codigomed de médico
        if(req.params.codigomed) medico.codigomed = req.params.codigomed
                
        // Está verificando se o usuário esqueceu de preencher algum campo, se esqueceu o sistema irá mostrar uma mensagem e retorna status 400 no banco de dados
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

         /*Condição de existência de dados na variável codigomed, se existir, será feito o update nos dados do Médico cadastrado, 
        se não existir, será feito o insert dos dados de cadastro do Médico no banco de dados*/
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

    /*Função de "trazer ou pegar" as informações das tabelas Médicos e Especialidades para montar a tabela de dados na página de Médicos,
    a tabela Médicos, tem FK(Foreign Key) da tabela Especialidades */
    const get = (req, res) => {
        //faz a conexão com o banco de dados
        app.db({m: 'medicos', e: 'especialidades'})
            //seleciona os dados das tabela Médicos e Especialidades 
            .select('m.codigomed', 'm.nome', 'm.email', 'm.cpf', 'm.datanasc', 'm.estadocivil', 'm.sexo', {especialidade: 'e.especialidade'}, 'm.crm', 'm.ufcr',
                    'm.cepmedico', 'm.tipo', 'm.endereco', 'm.numero', 'm.bairro', 'm.municipio', 'm.ufmunicipio', 'm.telddd', 'm.tel',
                    'm.celddd', 'm.cel' )
            //condição para mostrar o dados que são iguias na tabelas Médicos e Especialidades
            .whereRaw('?? = ??', ['m.codespecialidade', 'e.codigo'])
            //envia os dados como JSON para o backend
            .then(medicos => res.json(medicos))
             //caso haja erro na consulta, é enviado status 500, que há algum "problema" no banco de dados
            .catch(err => res.status(500).send(err))
    }

    /*Função para "trazer ou pegar" as informações de um determinado cadastro da Tabela Médicos e mostrar na página de cadastro do Médico*/ 
    const getByCodigo = (req, res) => {
        //faz a conexão com o banco de dados
        app.db('medicos')
            //condição para trazer os dados do cadasto do Médico
            .where({ codigomed: req.params.codigomed })
            //traz o primeiro cadastro que o banco de dados "achou"
            .first()
            //envia os dados como JSON para o backend
            .then(medico => res.json(medico))
            //caso haja erro na consulta, é enviado status 500, que há algum "problema" no banco de dados
            .catch(err => res.status(500).send(err))
    }

    /*Função para remover o cadastro do médico*/
    const remove = async (req, res) => {
        try {

            //consulta no banco de dados para verificar se o médico está amarrado com alguma agenda
            const agendas = await app.db('agendas')
                .where({codmedico: req.params.codigomed})
                notExistsOrError(agendas, "Médico amarrado a Agenda")

            //consulta no banco de dados para verificar se o médico está amarrado com algum atendimento
            const atendimentos = await app.db('atendimentos')
                .where({codmedico: req.params.codigomed})
                notExistsOrError(atendimentos, "Médico amarrado a Atendimento")

            //caso o médico não esteja amarrado com alguma agenda ou algum atendimento, o médico passado pelo CÓDIGOMED é excluído do banco de dados
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