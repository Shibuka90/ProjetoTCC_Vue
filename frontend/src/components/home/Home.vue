<template>
  <div id="home" :class="{ 'hide-menu': isMenuVisible }">
    <PageTitle icon="fa fa-folder" main="Gestão de Cadastros" sub="Cadastros gerais"
    />
    <div class="cadastros-gerais">
      <div class="cadastro">
        <router-link to="/homecadastro">
          <i class="fa fa-folder"></i>
        </router-link>
        <span>Cadastos Gerais</span>
      </div>
      <div class="agendamento">
        <i class="fa fa-calendar"></i>
        <span>Agendamento</span>
      </div>
      <div class="atendimento">
        <i class="fa fa-users"></i>
        <span>Atendimento</span>
      </div>
    </div>
    <hr />
    <PageTitle icon="fa fa-first-aid" main="Gestão Clínica" sub="Apoio Clínico" />
    <div class="cadastros-gerais">
      <div class="prontuario">
        <i class="fa fa-first-aid"></i>
        <span>Prontuário</span>
      </div>
    </div>
    <hr />
  </div>
</template>

<script>
import PageTitle from "../template/PageTitle.vue";
import Menu from "@/components/template/Menu";
import { mapState } from "vuex";

export default {
  name: "Home",
  components: { PageTitle, Menu },
  computed: mapState(["isMenuVisible"]),
}
</script>

<style>
.cadastros-gerais {
  display: flex;
  justify-content: space-evenly;
}

.cadastro {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  align-items: center;
}

.cadastro i {
  font-size: 5em;
  color: red;
}

.agendamento {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  align-items: center;
}

.agendamento i {
  font-size: 5em;
  color: red;
}

.atendimento {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  align-items: center;
}

.atendimento i {
  font-size: 5em;
  color: red;
}

.prontuario {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  align-items: center;
}

.prontuario i {
  font-size: 5em;
  color: red;
}

#home.hide-menu {
  grid-template-areas:
    "header header"
    "content content"
    "footer footer";

  display: flex;
  flex-direction: row;
}

</style>