<template>
  <div class="usuarios">
    <PageTitle
      icon="fa fa-users"
      main="Colaboradores"
      sub="Grid de Colaboradores"
    />
    <b-row>
      <b-col md="8"> 
        <div class="pesquisa">
          <b-form-input id="presquisa" type="search" placeholder="Digite para pesquisar..." size='lg' class="mr-3"></b-form-input>    
          <b-button id="presquisa" variant="primary" size='lg' class="fa fa-search"></b-button>
        </div>        
      </b-col>
      <b-col md="4">
        <div class="botoes">
         <b-button router-link to="/novousuario" variant="primary" size='lg'>Novo</b-button>
          <b-button router-link to="/homecadastro" class="ml-2 mr-2" size="lg">Voltar</b-button>  
          <b-button router-link to="/" class="fa fa-home" variant="danger" size="lg"></b-button>
        </div>
      </b-col>      
    </b-row>
    <b-table hover striped :items="usuarios" :fields="fields">
      <template slot="actions" slot-scope="data"> 
       <b-button variant = "warning" class="mr-2" @click="getUsuario">
          <i class="fa fa-pencil"></i>
        </b-button>
        <b-button variant = "danger">
          <i class="fas fa-trash-alt"></i>
        </b-button>

      </template>
    </b-table>
  </div>
</template>

<script>
import PageTitle from "../template/PageTitle.vue";
import { baseApiUrl} from "@/global";
import axios from "axios";


export default {
  name: "Usuarios",
  components: { PageTitle },
  data: function () {
    return {
      mode: "save",
      usuario: {},
      usuarios: [],
      fields: [
        { key: "codigo", label: "Código", sortable: true },
        { key: "nome", label: "Nome", sortable: true },
        { key: "email", label: "E-mail" },
        { key: "cpf", label: "CPF" },
        { key: "cargo", label: "Cargo" },
        {key: "admin", label: "Adm",
          formatter: (value) => (value ? "Sim" : "Não")},
        { key:"actions", label: "Ações" },
      ],
    };
    
  },
  methods: {
    loadUsuarios() {
      const url = `${baseApiUrl}/usuarios`;
      axios.get(url).then((res) => {
        this.usuarios = res.data;
       
      });
    },
     getUsuario(){
            console.log(document.getElementById('codigo'))
     }
  },      
  mounted() {
    this.loadUsuarios();
    this.getUsuario();
    
    
  }
}
</script>


<style>

.botoes{
    display: flex;
    justify-content: center;
    margin: 10px;
}

.pesquisa{
    display: flex;
    justify-content: flex-start;
    margin: 10px;
}
</style>