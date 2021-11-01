//Configuração para registar algo no banco de dados

import Vue from 'vue'
import Toasted from 'vue-toasted'

Vue.use(Toasted, {
    iconPack: 'fontawesome',//icone para o balão de mensagem no canto superior direito da tela
    duration: 5000// tempo q dura a renderização da mensagem
})

//Caso haja êxito com o registro, sistema mostra a mensagem de sucesso
Vue.toasted.register(
    'defaultSuccess',
    payload => !payload.msg ? 'Operação realidada com sucesso!' : payload.msg,
    { type: 'success', icon: 'check' }
)

//Caso não haja êxito com o registro, o sistema mostra a mensagem de erro
Vue.toasted.register(
    'defaultError',
    payload => !payload.msg ? 'Oops.. Erro inesperado.' : payload.msg,
    { type : 'error', icon : 'times' }
)