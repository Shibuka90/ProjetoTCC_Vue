<template>
  <div class="pacientes">
    <PageTitle
      icon="fa fa-user"
      main="Pacientes"
      sub="Grid de Pacientes"
    />
     <div class="pesquisa"> 
      <b-form>
      <b-row >
        <b-col md="2"> 
          <b-button router-link to="/" class="fa fa-home mr-4 mb-4" variant="info" size="lg"></b-button>
          <b-button router-link to="/homecadastro"  size="lg" class="mb-4"><i class="fas fa-arrow-left"></i> Voltar</b-button>  
        </b-col>
        <b-col md="6">
          <b-form-input input type="text" id="paciente-codigo" readonly v-model="paciente.nome" autofocus size="lg" class="mb-4com "></b-form-input> 
        </b-col>
       <b-col md="4">
         <b-button router-link to="/novopaciente" variant="primary" size='lg' class="ml-2 mr-4">Novo</b-button>
          <b-button v-if="paciente.nome" @click="getPaciente" router-link :to="'/pacientes/' + this.paciente.codigo" class="ml-2 mr-2" size="lg" variant="danger">Alterar/Excluir</b-button>  
        </b-col> 
      </b-row>
    </b-form>     
    </div>
    <hr>
        <b-row>
          <b-col md="6">
            <b-form-group label="Pesquisar:" label-for="filtro-paciente">
              <b-form-input id="filtro-paciente" v-model="filter" size="lg" type="search" placeholder="Digite para filtrar...."></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
    <b-table hover striped :items="pacientes" :fields="fields" :filter="filter" @filtered="onFiltered" @row-clicked="loadPaciente" :sort-by.sync="sortBy">
      <template slot="actions" > 
      </template>
    </b-table>
    <b-pagination size="md" v-model="page" :total-rows="count" :per-page="limit" />
  </div>
</template>

<script>
import PageTitle from "../../template/PageTitle.vue";
import { baseApiUrl} from "@/global";
import axios from "axios";


export default {
  name: "Pacientes",
  components: { PageTitle },
  data: function () {
    return {
      mode: "save",
      paciente: {},
      pacientes: [],
      sortBy: 'codigo',
      page: 1,
      limit: 0,
      count: 0,
      fields: [
        { key: "codigo", label: "Código", sortable: true },
        { key: "nome", label: "Nome", sortable: true },
        { key: "datanasc", label: "Data Nasc." },
        { key: "convenio", label: "Convênio" },
        { key: "matricula", label: "Matricula" },
      ],
      totalRows: 1,
      filter: null,
    };
    
  },
  methods: {
    loadPacientes() {
      const url = `${baseApiUrl}/pacientes?=page${this.page}`;
      axios.get(url).then((res) => {
        this.pacientes = res.data.data; 
        this.count = res.data.count
        this.limit = res.data.limit      
      });
    },
  
     getPaciente(){
            const url = `${baseApiUrl}/pacientes/${this.paciente.codigo}`
             axios(url).then(res => this.paciente = res.data)
     },

     loadPaciente(paciente, mode='save'){
            this.mode = mode
            this.paciente = {...paciente}
        },
        onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
       
      }
  }, 
  watch: {
      page() {
        this.loadPacientes()
      }
  } ,   
  mounted() {
    this.loadPacientes();  
  }
}
</script>


<style>

</style>