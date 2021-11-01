<!--Layout do Cabeçalho do Site -->

<template>
  <header class="header">
      <!-- Está inicial do Menu -->
      <a class="toggle" @click="toggleMenu" v-if="!hideToggle">
          <i class="fa fa-lg" :class="icon"></i>
      </a>
      <!-- Título do Site e encaminha para o Home clicando no título -->
      <h1 class="title">
         <router-link to="/"> {{title}}</router-link>
      </h1>
      <!-- Usado para identificar o usuário logado e onde o usuário desloga do sistema -->
      <UserDropDown v-if="!hideUserDropdown" />
  </header>
</template>

<script>
import UserDropDown from './UserDropDown'

export default {
        name: 'Header',
        components: { UserDropDown },
        props: {
            title: String,
            hideToggle: Boolean,
            hideUserDropdown: Boolean,
        },

        computed: {
            // Icone da Seta para o Menu visível e escondido
            icon() {
                return this.$store.state.isMenuVisible ? "fa-angle-left" : "fa-angle-down"
            }
        },
        methods: {
            //Traz as configuração do Menu da Store
            toggleMenu(){
                this.$store.commit('toggleMenu')
            }
        }
}
</script>

<style>
    .header{
        grid-area: header;
        background: linear-gradient(to right,  #e52d27, #b31217 );

        display: flex;
        justify-content: center;
        align-items: center;
    }

      .title{
        font-size: 1.4rem;; 
        color: #fff;
        font-weight: 100;
        flex-grow: 1;
        text-align: center;
    }

    .title a{
        color: #FFF;
        text-decoration: none;
    }

    .title a:hover{
        color: #FFF;
        text-decoration: none;
    }

    header.header > a.toggle {
        width: 60px;
        height: 100%;
        color: #fff;
        justify-content: flex-start;
        text-decoration: none;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    header.header > a.toggle:hover{
        background-color: rgba(0, 0, 0, 0.2);
    }
</style>