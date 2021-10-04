<template>
  <div class="usuarios">
    <PageTitle
      icon="fa fa-users"
      main="Colaboradores"
      sub="Grid de Colaboradores"
    />
     <div class="pesquisa"> 
      <b-form>
      <b-row >
        <b-col md="8" class="justify-content-flex-start"> 
          <b-form-input input type="text" id="usuario-codigo" v-model="usuario.nome" autofocus size="lg"></b-form-input>   
        </b-col>
       <b-col md="4">
          <b-button router-link to="/homecadastro" class="mr-2" size="lg"><i class="fas fa-arrow-left"></i> Voltar</b-button>  
         <b-button router-link to="/novousuario" variant="primary" size='lg' class="ml-2 mr-2">Novo</b-button>
          <b-button v-if="usuario.nome" @click="getUsuario" router-link :to="'/usuarios/' + this.usuario.codigo" class="ml-2 mr-2" size="lg" variant="danger">Alterar/Excluir</b-button>  
          <b-button router-link to="/" class="fa fa-home ml-2" variant="info" size="lg"></b-button>
        </b-col> 
      </b-row>
    </b-form>     
    </div>   
    <hr>
        <b-row>
          <b-col md="6">
            <b-form-group label="Pesquisar:" label-for="filtro-usuario">
              <b-form-input id="filtro-usuario" v-model="filter" size="lg" type="search" placeholder="Digite para filtrar...."></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
    <b-table hover striped :items="usuarios" :fields="fields" :filter="filter" @filtered="onFiltered">
      <template slot="actions" slot-scope="data" > 
       <b-button variant = "info" class="mr-2" @click="loadUsuario(data.item)" >
          Selecionar
        </b-button>
      </template>
    </b-table>
    <b-pagination size="md" v-model="page" :total-rows="count" :per-page="limit" />
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
      page: 1,
      limit: 0,
      count: 0,
      fields: [
        { key: "codigo", label: "Código", sortable: true },
        { key: "nome", label: "Nome", sortable: true },
        { key: "email", label: "E-mail" },
        { key: "cpf", label: "CPF" },
        { key: "cargo", label: "Cargo" },
        {key: "admin", label: "Adm",
          formatter: (value) => (value ? "Sim" : "Não")},
        { key:"actions", label: "Ação" },
      ],
      totalRows: 1,
      filter: null,
    };
    
  },
  methods: {
    loadUsuarios() {
      const url = `${baseApiUrl}/usuarios`;
      axios.get(url).then((res) => {
        this.usuarios = res.data; 
        this.count = res.data.count
        this.limit = res.data.limit      
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
        onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      }
  }, 
  watch: {
      page() {
        this.loadUsuarios()
      }
  } ,   
  mounted() {
    this.loadUsuarios();  
  }
}
</script>


<style>

</style>