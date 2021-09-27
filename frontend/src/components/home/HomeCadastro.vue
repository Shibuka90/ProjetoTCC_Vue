<template>
  <div id="home" :class="{ 'hide-menu': isMenuVisible }">
    <div class="titlecadastro">
      <router-link to="/">
        <PageTitle
          icon="fa fa-folder"
          main="Cadastros Gerais"
          sub="Pacientes - Médicos - Especialidades - Convênios - Serviços - Colaboradores"
        />
      </router-link>
    </div>

    .
  </div>
</template>

<script>
import PageTitle from "../template/PageTitle.vue";
import Menu from "@/components/template/Menu";
import { mapState } from "vuex";

export default {
  name: "HomeCadastro",
  components: { PageTitle, Menu },
  computed: mapState(["isMenuVisible"]),
};
</script>

<style>
.titlecadastro a:hover {
  text-decoration: none;
  color: #000;
}
</style>