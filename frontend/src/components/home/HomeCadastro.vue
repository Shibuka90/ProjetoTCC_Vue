<template>
  <div class="homecadastro">
    <PageTitle
      icon="fa fa-folder"
      main="Cadastros Gerais"
      sub="Pacientes - Médicos - Especialidades - Convênios - Serviços - Colaboradores"
    />
    <div class="menus-homecadastro">
      <div class="coluna1">
        <router-link to="/">
          <Menus icon="fas fa-home" title="Menu Principal" />
        </router-link>
      </div>
      <div class="coluna2">
        <router-link to="/pacientes">
          <Menus icon="fa fa-user" title="Pacientes" />
        </router-link>
        <router-link to="/medicos">
          <Menus icon="fa fa-user-md" title="Médicos" />
        </router-link>        
      </div>
      <div class="coluna3">
        <router-link to="/convenios">
         <Menus icon="fa fa-book-medical" title="Convênios" />
        </router-link>
        <router-link to="/especialidades">
          <Menus icon="fa fa-stethoscope" title="Especialidades" />
        </router-link>
      </div>
      <div class="coluna4">
        <router-link to="/servicos">
          <Menus icon="fa fa-medkit" title="Serviços" />  
        </router-link>
        <router-link to="/usuarios">
          <Menus icon="fa fa-users" title="Colaboradores" />
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

.coluna2 a:hover {
  text-decoration: none;
  color: #000;
}

.coluna3 a:hover {
  text-decoration: none;
  color: #000;
}

.coluna4 a:hover {
  text-decoration: none;
  color: #000;
}
</style>