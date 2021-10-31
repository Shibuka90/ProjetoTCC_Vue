<!--Página de autenticação-->
<template>
<!-- Modal da Imagem e Campos de autenticação -->
<div class="auth-content">
    <div class="auth-modal">
        <img src="@/assets/SGCM2_1.jpg" width="200" alt="Logo" />
        <hr>
        <div class="auth-title">Login</div>
        <input type="text" v-model="usuario.email" placeholder="E-mail">
        <input type="password" v-model="usuario.password" placeholder="Senha">
    <div class="botoes">
        <b-button class="mr-2" variant="success" @click="signin">Entrar</b-button>
        <b-button router-link to="/novousuarioauth" variant="info">Registra-se aqui</b-button>
    </div>
    </div>
</div>
</template>

<script>
import { baseApiUrl, showError, userKey} from '@/global' // Importa as configuração de acesso para página e mensagens
import axios from 'axios' // Importa as configurações do AXIOS

export default {
    name: 'Auth',
    data: function () {
        return {
            usuario: {}
        }
    },
    methods: {

        //Método para logar no sistema
        signin() {
            axios.post(`${baseApiUrl}/signin`, this.usuario)
                .then(res => {
                    this.$store.commit('setUsuario', res.data)
                    localStorage.setItem(userKey, JSON.stringify(res.data))
                    this.$router.push({path: '/'})
                })
                .catch(showError)
        },

        // signup() {
        //     axios.post(`${baseApiUrl}/signup`, this.usuario)
        //         .then(() => {
        //             this.$toasted.global.defaultSuccess()
        //             this.usuario = {}
        //         })
        //         .catch(showError)
        // }
    }

}
</script>

<style>
.auth-content{
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.auth-modal{
    background-color: #FFF;
    width: 350px;
    padding: 35px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);

    display: flex;
    flex-direction: column;
    align-items: center;
}

.auth-title{
    font-size: 1.2rem;
    font-weight: 100;
    margin-top: 10px;
    margin-bottom: 15px
}

.auth-modal input{
    border: 1px solid #BBB;
    width: 100%;
    margin-bottom: 15px;
    padding: 3px 8px;
    outline: none;
}

.auth-modal hr {
    border: 0;
    width: 100%;
    height: 1px;
    background-image: linear-gradient(to right,
        rgba(120, 120, 120, 0),
        rgba(120, 120, 120, 0.75),
        rgba(120, 120, 120, 0));
    }

.auth-modal img {
    width: 100%;
}


</style>