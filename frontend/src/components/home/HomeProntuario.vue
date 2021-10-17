<template>
  <div class="homeprontuario">
    <PageTitle
      icon="fa fa-first-aid"
      main="Prontuários"
      sub="Abertura de Prontuários por Atendimento"
    />
    <div class="menus-homecadastro">
      <div class="coluna1">
        <router-link to="/">
          <Menus icon="fas fa-home" title="Menu Principal" />
        </router-link>
        <router-link to="/prontuarios">
          <Menus icon="fa fa-first-aid" title="Prontuários" />
        </router-link>
      </div>
      </div>
    </div>
</template>

<script>
import PageTitle from "../template/PageTitle.vue";
import Menus from "./Menus.vue";

export default {
  name: "HomeProntuario",
  components: { PageTitle, Menus },
};
</script>

<style>
.menus-homeprontuario {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
}

.coluna1 a:hover {
  text-decoration: none;
  color: #000;
}
</style>