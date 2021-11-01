<!--Layout da Identificação do usuário logado -->

<template>
    <div class="user-dropdown">
        <div class="user-button">
            <span class="d-none d-sm-block">{{usuario.nome}}</span>
            <div class="user-dropdown-img">
                <Gravatar :email="usuario.email" alt="Usuário" />
            </div>
            <i class="fa fa-angle-down"></i>
        </div>
        <div class="user-dropdown-content">
            <a href @click.prevent="logout"><i class="fa fa-sign-out">Sair</i></a>
        </div>
    </div>
  
</template>

<script>
import { userKey } from '@/global'//Importa as configuraçãoes do arquivo global
import { mapState } from 'vuex'//Importa as configurações do vuex
import Gravatar from 'vue-gravatar'//Importa as configurações do vue-gravatar, colcoa uma imagem para cada usuário

export default {
    name: 'UserFropDown',
    components: { Gravatar },
    //Configuração de inicial do Menu após o login
    computed: mapState(['usuario']),
    methods: {
        //Função de deslogar do sistema, remove o token, usuário fica "nulo" e votla para a página de login
        logout(){
            localStorage.removeItem(userKey)
            this.$store.commit('setUsuario', null)
            this.$router.push({ name: 'auth'})
        }
    }
}
</script>

<style>
    .user-dropdown{
        position: relative;
        height: 100%;
    }

    .user-button {
        display: flex;
        align-items: center;
        color: #fff;
        font-weight: 200;
        height: 100%;
        padding: 0px 20px;
    }

    .user-dropdown:hover{
        background-color: rgba(0, 0, 0, 0.2);
    }

    .user-dropdown-img{
        margin: 0px 10px;
    }

    .user-dropdown-img > img{
        max-height: 37px;
        border-radius: 5px;
    }

    .user-dropdown-content{
        position: absolute;
        right: 0px;
        background-color: #f9f9f9;
        min-width: 170px;
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
        padding: 10px;
        z-index: 1;

        display: flex;
        flex-direction: column;
        flex-wrap: wrap;

        visibility: hidden;
        opacity: 0;
        transition: visibility 0s, opacity 0.5s linear;
    }

    .user-dropdown:hover .user-dropdown-content{
        visibility: visible;
        opacity: 1;
    }

    .user-dropdown-content a{
        text-decoration: none;
        color: #000;
        padding: 10px;
    }

    .user-dropdown-content a:hover{
        background-color: #EDEDED;
        text-decoration: none;
         color: #000;
    }


</style>