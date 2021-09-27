<template>
  <div class="home">
    <PageTitle icon="fa fa-folder" main="Gestão de Cadastros" sub="Cadastros gerais"
    />
    <div class="menus-home">
        <div class="cadastro">
            <router-link to="/homecadastro">
            <Menus icon="fa fa-folder" title="Cadastros Gerais" />
        </router-link>   
        </div> 
        <Menus icon="fa fa-calendar" title="Agendamento" />
        <Menus icon="fa fa-users" title="Atendimento" />            
        
    </div>
    <hr />
    <PageTitle icon="fa fa-first-aid" main="Gestão Clínica" sub="Apoio Clínico" />
    <div class="menus-home">
        
        <Menus icon="fa fa-first-aid" title="Prontuario" />
    </div>
    <hr />
  </div>
</template>

<script>
import PageTitle from "../template/PageTitle.vue";
import Menus from './Menus.vue'

export default {
  name: "Home",
  components: { PageTitle, Menus },
}
</script>

<style>
    .menus-home{
        display: flex;
        justify-content: space-evenly;
        flex-wrap: wrap;
    }

    .cadastro a:hover{
        text-decoration: none;
        color: #000;
    }

</style>