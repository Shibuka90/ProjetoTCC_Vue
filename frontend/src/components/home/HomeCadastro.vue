<template>
  <div id="home" :class="{ 'hide-menu': isMenuVisible }">
    <PageTitle
      icon="fa fa-folder"
      main="Cadastros Gerais"
      sub="Pacientes - Médicos - Especialidades - Convênios - Serviços - Colaboradores"
    />
    <div class="menus-homecadastro">
      <div class="home">
        <router-link to="/">
          <Menus icon="fa fa-home" title="Menu Principal" />
        </router-link>
      </div>
      <div class="paciente">
          <Menus icon="fa fa-user" title="Pacientes" />
      </div>
      <div class="medico">
          <Menus icon="fa fa-user-md" title="Médicos" />
      </div>
      <div class="convenio">
          <Menus icon="fa fa-book-medical" title="Convênios" />
      </div>
      <div class="especialidade">
          <Menus icon="fa fa-stethoscope" title="Especialidades" />
      </div>
      <div class="servico">
          <Menus icon="fa fa-medkit" title="Serviços" />
      </div>
      <div class="usuarios">
          <Menus icon="fa fa-users" title="Colaboradores" />
      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from "../template/PageTitle.vue";
import Menu from "@/components/template/Menu";
import Menus from "./Menus.vue";
import { mapState } from "vuex";

export default {
  name: "HomeCadastro",
  components: { PageTitle, Menu, Menus },
  computed: mapState(["isMenuVisible"]),
};
</script>

<style>
.menus-homecadastro {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
}

.home a:hover {
  text-decoration: none;
  color: #000;
}
</style>