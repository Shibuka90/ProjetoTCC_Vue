<!--Página da Home  -->

<template>
  <div class="home">
    <!-- titulo da divisão -->
    <PageTitle icon="fa fa-folder" main="Gestão de Cadastros" sub="Cadastros gerais"
    />
    <!-- Divisão de Cadastros Gerais -->
    <div class="menus-cadastro">
        <div class="cadastro">
            <router-link to="/homecadastro">
            <Menus icon="fa fa-folder" title="Cadastros Gerais" />
        </router-link>   
        </div> 
        <div class="agendamento">
          <router-link to="/homeagendamento">
            <Menus icon="fa fa-calendar" title="Agendamento" />
          </router-link>
        </div>
        <div class="atendimento">
          <router-link to="/homeatendimento">
            <Menus icon="fa fa-users" title="Atendimento" /> 
          </router-link>
        </div>        
    </div>
    <hr />
    <!-- titulo da divisão -->
    <PageTitle icon="fa fa-first-aid" main="Gestão Clínica" sub="Apoio Clínico" />
    <!-- Divisão de Apoio Clínico -->
    <div class="menus-prontuario">
      <div class="prontuario">
        <router-link to="/homeprontuario">
          <Menus icon="fa fa-first-aid" title="Prontuários" />
        </router-link>
      </div>
    </div>
    <hr />
  </div>
</template>

<script>
import PageTitle from "../template/PageTitle.vue";//Importa o layout do titulo da página
import Menus from './Menus.vue'//Importa o layout dos Menus da página

export default {
  name: "Home",
  components: { PageTitle, Menus },
}
</script>

<style>
    .menus-cadastro{
        display: flex;
        justify-content: space-evenly;
        flex-wrap: wrap;
    }

    .cadastro a:hover{
        text-decoration: none;
        color: #000;
    }

    .agendamento a:hover{
        text-decoration: none;
        color: #000;
    }

    .atendimento a:hover{
        text-decoration: none;
        color: #000;
    }

    .menus-prontuario{
        display: flex;
        justify-content: space-evenly;
        flex-wrap: wrap;
    }
    .prontuario a:hover{
        text-decoration: none;
        color: #000;
    }

</style>