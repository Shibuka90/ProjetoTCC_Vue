//Interface de programção da aplicação Prontuários

module.exports = app => {
    //funções destructor da API de Validação, para não ficar repetinto  app.api.validation.função
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    //Função Salvar ou Alterar os dados no banco de dados
    const save = async (req, res) => {
        //Variável agenda que armazena todos os dados que estão no corpo da página
        const prontuario = { ...req.body }
        //Condição de existência da variável codigopront do parâmetro da requisição para passar para a variável codigopront de protuário
        if(req.params.codigopront) prontuario.codigopront = req.params.codigopront
               
        // Está verificando se o usuário esqueceu de preencher algum campo, se esqueceu o sistema irá mostrar uma mensagem e retorna status 400 no banco de dados
        try {
            existsOrError(prontuario.codatendimento, 'Código Atendimento não informado')
            existsOrError(prontuario.paciente, 'Paciente não informado')
            existsOrError(prontuario.datadoprontuario, 'Data não informada')
            existsOrError(prontuario.medico, 'Médico não informado')
            existsOrError(prontuario.convenio, 'Convênio não informado')
            existsOrError(prontuario.especialidade, 'Especialidade não informado')
            existsOrError(prontuario.servico, 'Serviço não informado')
            existsOrError(prontuario.relatorio, 'Relatorio não preenchido')
    } catch(msg) {
        return res.status(400).send(msg)
    }       
    
    /*Condição de existência de dados na variável codigopront, se existir, será feito o update nos dados do Prontuário cadastrado, 
    se não existir, será feito o insert dos dados de cadastro do Prontuário no banco de dados*/
    if(prontuario.codigopront){
        app.db('prontuarios')
            .update(prontuario)
            .where({ codigopront: prontuario.codigopront })
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
     } else {
        app.db('prontuarios')
            .insert(prontuario)
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
     }
    }

    /*Função de "trazer ou pegar" as informações das tabela Prontuário para montar a tabela de dados na página de Prontuários,
    a tabela Prontuários, tem FK(Foreign Key) da tabela Atendimentos */
    const get = (req, res) => {
        //faz a conexão com o banco de dados
        app.db('prontuarios')
         //seleciona os dados das tabela Prontuários
            .select('codigopront', 'datadoprontuario', 'codatendimento', 'paciente', 'convenio', 'medico', 'servico', 'especialidade')
            //envia os dados como JSON para o backend
            .then(prontuarios => res.json(prontuarios))
            //caso haja erro na consulta, é enviado status 500, que há algum "problema" no banco de dados
            .catch(err => res.status(500).send(err))
    }

    /*Função para "trazer ou pegar" as informações de um determinado cadastro da Tabela Prontuários e mostrar na página de cadastro do Prontuário*/ 
    const getByCodigo = (req, res) =>{ 
        //faz a conexão com o banco de dados
        app.db('prontuarios')
            //condição para trazer os dados do cadasto do Prontuário
            .where({ codigopront: req.params.codigopront })
            //traz o primeiro cadastro que o banco de dados "achou"
            .first()
            //envia os dados como JSON para o backend
            .then(prontuario => res.json(prontuario))
            //caso haja erro na consulta, é enviado status 500, que há algum "problema" no banco de dados
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {

            //Excluí somente o Prontuario passado pelo CÓDIGOPRONT
            const rowsDeleted = await app.db('prontuario')
                .where({ codigopront: req.params.codigopront }).del()
                existsOrError(rowsDeleted, 'Prontuario não foi encontrado.') 
            } catch(msg) {
            res.status(500).send(msg)
        }
    }

    return { save, get, getByCodigo, remove}
}