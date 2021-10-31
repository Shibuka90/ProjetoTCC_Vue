<!--Página da Home Agendamento -->
<template>
  <div class="homeagendamento">
    <!-- titulo da divisão -->
      <PageTitle icon="fa fa-calendar" main="Agendamento" sub="Cadastro de Agenda e Agendamento" />
      <!-- Divisão de Agendas e Agendamento -->
      <div class="menus-homeagendamento">
         <div class="coluna1">
            <router-link to="/">
             <Menus icon="fas fa-home" title="Menu Principal" />
            </router-link>
            <router-link to="/agendas" v-if="usuario.admin">
             <Menus icon="fas fa-calendar-alt" title="Cadastro de Agenda" />
            </router-link>
            <router-link to="/agendamentos">
             <Menus icon="far fa-calendar-alt" title="Agendamento" />
            </router-link>
        </div>
      </div>
  </div>
</template>

<script>
import PageTitle from "../template/PageTitle.vue"//importa o layout do títuo da página
import {mapState} from 'vuex'//Importa as configuração da Store
import Menus from "./Menus.vue"//IMporta o layout dos Menus da página

export default {
    name: "HomeAgendamento",
    components: { PageTitle, Menus },
    computed: mapState(['usuario']),
}
</script>

<style>
.menus-homeagendamento {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.coluna1 a:hover {
  text-decoration: none;
  color: #000;
}
</style>