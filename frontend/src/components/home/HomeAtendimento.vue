<template>
  <div class="homeatendimento">
    <PageTitle
      icon="fa fa-users"
      main="Atendimentos"
      sub="Cadastro de Atendimentos"
    />
    <div class="menus-homecadastro">
      <div class="coluna1">
        <router-link to="/">
          <Menus icon="fas fa-home" title="Menu Principal" />
        </router-link>
        <router-link to="/atendimentos">
          <Menus icon="fas fa-address-book" title="Atendimentos" />
        </router-link>
      </div>
      </div>
    </div>
</template>

<script>
import PageTitle from "../template/PageTitle.vue";
import Menus from "./Menus.vue";

export default {
  name: "HomeAtendimento",
  components: { PageTitle, Menus },
};
</script>

<style>
.menus-homeatendimento {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
}

.coluna1 a:hover {
  text-decoration: none;
  color: #000;
}
</style>