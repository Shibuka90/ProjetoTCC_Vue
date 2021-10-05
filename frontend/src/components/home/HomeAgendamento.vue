<template>
  <div class="homeagendamento">
      <PageTitle icon="fa fa-calendar" main="Agendamento" sub="Cadastro de Agenda e Agendamento" />
      <div class="menus-homeagendamento">
         <div class="coluna1">
            <router-link to="/">
             <Menus icon="fas fa-home" title="Menu Principal" />
            </router-link>
            <router-link to="">
             <Menus icon="fas fa-calendar-alt" title="Cadastro de Agenda" />
            </router-link>
            <router-link to="">
             <Menus icon="far fa-calendar-alt" title="Agendamento" />
            </router-link>
        </div>
      </div>
  </div>
</template>

<script>
import PageTitle from "../template/PageTitle.vue"
import Menus from "./Menus.vue"

export default {
    name: "HomeAgendamento",
    components: { PageTitle, Menus }
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