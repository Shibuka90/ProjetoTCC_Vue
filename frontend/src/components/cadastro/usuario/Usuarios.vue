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
        <b-col md="2"> 
          <b-button router-link to="/" class="fa fa-home mr-4 mb-4" variant="info" size="lg"></b-button>
          <b-button router-link to="/homecadastro"  size="lg" class="mb-4"><i class="fas fa-arrow-left"></i> Voltar</b-button>  
        </b-col>
        <b-col md="6">
          <b-form-input input type="text" id="usuario-codigo" readonly v-model="usuario.nome" autofocus size="lg" class="mb-4 "></b-form-input> 
        </b-col>
       <b-col md="4">
         <b-button router-link to="/novousuario" variant="primary" size='lg' class="ml-2 mr-4">Novo</b-button>
          <b-button v-if="usuario.nome" @click="getUsuario" router-link :to="'/usuarios/' + this.usuario.codigo" class="ml-2 mr-2" size="lg" variant="danger">Alterar/Excluir</b-button>  
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
    <b-table hover striped :items="usuarios" :fields="fields" :filter="filter" @filtered="onFiltered" @row-clicked="loadUsuario" :sort-by.sync="sortBy">
      <template slot="actions" > 
      </template>
    </b-table>
    <b-pagination size="md" v-model="currentPage" :total-rows="totalRows" :per-page="perPage" />
  </div>
</template>

<script>
import PageTitle from "../../template/PageTitle.vue";
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
      sortBy: 'codigo',
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
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      filter: null,
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