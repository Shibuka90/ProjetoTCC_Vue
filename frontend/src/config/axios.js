//Configuração para as requisições ao backend

import axios from 'axios'

//Acesso se estiver tudo ok
const success = res => res

//Caso alguém acesse uma página que tem permissão ou algum dado, volta para a página Home
const error = err => {
    if (401 === err.response.status) {
        window.location = '/'
    } else {
        return Promise.reject(err)
    }
}

axios.interceptors.response.use(success, error)