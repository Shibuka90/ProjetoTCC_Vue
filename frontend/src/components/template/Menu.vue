<!-- Layout dos Menus de acessos -->

<template>
  <aside class="menu" v-show="isMenuVisible">
      <div class="home-menu">
        <router-link to="/">
            <p><i class="fa fa-home"></i>Home</p>
        </router-link>
        <router-link to="/pacientes">
            <p><i class="fa fa-user"></i>Pacientes</p>
        </router-link>
        <router-link to="/medicos"  v-if="usuario.admin">
            <p><i class="fa fa-user-md" ></i>Médicos</p>
        </router-link>
        <router-link to="/convenios"  v-if="usuario.admin">
            <p><i class="fa fa-book-medical"></i>Convênios</p>
        </router-link>
        <router-link to="/especialidades"  v-if="usuario.admin">
            <p><i class="fa fa-stethoscope"></i>Especialidades</p>
        </router-link>
        <router-link to="/servicos"  v-if="usuario.admin">
            <p><i class="fa fa-medkit"></i>Serviços</p>
        </router-link>
        <router-link to="/usuarios" v-if="usuario.admin">
            <p><i class="fa fa-users"></i>Colaboradores</p>
        </router-link>
        <router-link to="/agendas" v-if="usuario.admin">
            <p><i class="fas fa-calendar-alt"></i>Agendas</p>
        </router-link>
        <router-link to="/agendamentos">
            <p><i class="far fa-calendar-alt"></i>Agendamentos</p>
        </router-link>
        <router-link to="/atendimentos">
            <p><i class="fas fa-address-book"></i>Atendimentos</p>
        </router-link>
        <router-link to="/prontuarios">
            <p><i class="fa fa-first-aid"></i>Prontuários</p>
        </router-link>
      </div>
  </aside>
</template>

<script>
import { mapState } from 'vuex'//Importa as configuração do vuex

export default {
    name: 'Menu',
    //Configuração de inicial do Menu após o login
    computed: mapState(['isMenuVisible', 'usuario'])
}
</script>

<style>
.menu {
    grid-area: menu;
    background: #e52d27;

    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
}

.home-menu{
  margin: 10px 0px 0px 10px;
 
}
.home-menu i{
  color:white;
  font-size: 2rem;
  margin: 2px;
  padding: 3px;  
}

.home-menu p{
  color: white;
  font-size: 1rem;
}

.home-menu a:hover{
  text-decoration: none;
  
}

</style>