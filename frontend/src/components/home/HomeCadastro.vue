<template>
  <div class="homecadastro">
    <PageTitle
      icon="fa fa-folder"
      main="Cadastros Gerais"
      sub="Pacientes - Médicos - Especialidades - Convênios - Serviços - Colaboradores"
    />
    <div class="menus-homecadastro">
      <div class="coluna1">
        <router-link to="/paciente">
            <Menus icon="fa fa-user" title="Pacientes" />
        </router-link>
        <Menus icon="fa fa-user-md" title="Médicos" />
      </div>
      <div class="coluna2">
          <Menus icon="fa fa-book-medical" title="Convênios" />
        <Menus icon="fa fa-stethoscope" title="Especialidades" />          
      </div>
      <div class="coluna3">
        <Menus icon="fa fa-medkit" title="Serviços" />
          <Menus icon="fa fa-users" title="Colaboradores" />
      </div>
      <div class="coluna4">
           <router-link to="/">
          <Menus icon="fa fa-home" title="Menu Principal" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from "../template/PageTitle.vue";
import Menus from "./Menus.vue";


export default {
  name: "HomeCadastro",
  components: { PageTitle, Menus },
};
</script>

<style>
.menus-homecadastro {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
}

.coluna1 a:hover {
  text-decoration: none;
  color: #000;
}
</style>