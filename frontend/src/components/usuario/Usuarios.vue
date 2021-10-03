<template>
  <div class="usuarios">
    <PageTitle
      icon="fa fa-users"
      main="Colaboradores"
      sub="Grid de Colaboradores"
    />
     <div class="pesquisa"> 
      <b-form>
      <b-row>
        <b-col md="6"> 
          <b-form-input input type="text" id="usuario-codigo" v-model="usuario.nome" size="lg" @keypress="loadUsuario"></b-form-input>   
        </b-col>
        <b-col m="2">
          <b-button id="usuario-codigo" variant="primary" size='lg' class="fa fa-search" @click="loadUsuarioNome"></b-button>              
        </b-col>
       <b-col md="4">
         <b-button router-link to="/novousuario" variant="primary" size='lg'>Novo</b-button>
          <b-button @click="getUsuario" router-link :to="'/usuarios/' + this.usuario.codigo" class="ml-2 mr-2" size="lg" variant="danger">Alterar/Excluir</b-button>  
          <b-button router-link to="/homecadastro" class="ml-2 mr-2" size="lg">Voltar</b-button>  
          <b-button router-link to="/" class="fa fa-home" variant="danger" size="lg"></b-button>
        </b-col> 
      </b-row>
    </b-form>     
    </div>   
    <hr>
    <b-table hover striped :items="usuarios" :fields="fields">
      <template slot="actions" slot-scope="data" > 
       <b-button variant = "info" class="mr-2" @click="loadUsuario(data.item)" >
          Selecionar
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
        { id: 'codigo', key: "codigo", label: "Código", sortable: true },
        { key: "nome", label: "Nome", sortable: true },
        { key: "email", label: "E-mail" },
        { key: "cpf", label: "CPF" },
        { key: "cargo", label: "Cargo" },
        {key: "admin", label: "Adm",
          formatter: (value) => (value ? "Sim" : "Não")},
        { key:"actions", label: "Ação" },
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
    
    loadUsuarioNome() {
      let texto= document.querySelector("#usuario-codigo")
      console.log(texto)

    },

    loadUsuarioN() {
      const url = `${baseApiUrl}/usuarios/${this.texto}`;
      axios.get(url).then((res) => {
        this.usuario = res.data;       
      });
    },
     getUsuario(){
            const url = `${baseApiUrl}/usuarios/${this.usuario.codigo}`
             axios(url).then(res => this.usuario = res.data)
     },

     loadUsuario(usuario, mode='save'){
            this.mode = mode
            this.usuario = {...usuario}
        },
  },      
  mounted() {
    this.loadUsuarios();   
  }
}
</script>


<style>

</style>