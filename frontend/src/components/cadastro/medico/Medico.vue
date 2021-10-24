<template>
  <div class="medicos">
    <PageTitle
      icon="fa fa-user-md"
      main="Médicos"
      sub="Grid de Médicos"
    />
     <div class="pesquisa"> 
      <b-form>
      <b-row >
        <b-col md="2"> 
          <b-button router-link to="/" class="fa fa-home mr-4 mb-4" variant="info" size="lg"></b-button>
          <b-button router-link to="/homecadastro"  size="lg" class="mb-4"><i class="fas fa-arrow-left"></i> Voltar</b-button>  
        </b-col>
        <b-col md="6">
          <b-form-input input type="text" id="medico-codigo" readonly v-model="medico.nome" size="lg" class="mb-4 "></b-form-input> 
        </b-col>
       <b-col md="4">
         <b-button router-link to="/novomedico" variant="primary" size='lg' class="ml-2 mr-4">Novo</b-button>
          <b-button v-if="medico.nome" @click="getMedico" router-link :to="'/medicos/' + this.medico.codigomed" class="ml-2 mr-2" size="lg" variant="danger">Alterar/Excluir</b-button>  
        </b-col> 
      </b-row>
    </b-form>     
    </div>
    <hr>
        <b-row>
          <b-col md="6">
            <b-form-group label="Pesquisar:" label-for="filtro-medico">
              <b-form-input id="filtro-medico" v-model="filter" autofocus  size="lg" type="search" placeholder="Digite para filtrar...."></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
    <b-table hover striped :items="medicos" :fields="fields" :filter="filter" @filtered="onFiltered" @row-clicked="loadMedico" :sort-by.sync="sortBy" :current-page="currentPage"
          :per-page="perPage" >
      <template slot="actions"> </template>
    </b-table>
    <b-pagination size="md" v-model="currentPage" :total-rows="totalRows" :per-page="perPage" />
  </div>
</template>

<script>
import PageTitle from "../../template/PageTitle.vue";
import { baseApiUrl} from "@/global";
import axios from "axios";


export default {
  name: "Medicos",
  components: { PageTitle },
  data: function () {
    return {
      medico: {},
      medicos: [],
      sortBy: 'codigo',
      fields: [
        { key: "codigo", label: "Código", sortable: true },
        { key: "nome", label: "Nome", sortable: true },
        { key: "email", label: "E-mail" },
        { key: "crm", label: "CRM" },
        { key: "especialidade", label:"Especialidade"}
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      filter: null,
    };
    
  },
  methods: {
    loadMedicos() {
      const url = `${baseApiUrl}/medicos`;
      axios.get(url).then((res) => {
        this.medicos = res.data; 
        
      });
    },
  
    getMedico(){
      const url = `${baseApiUrl}/medicos/${this.medico.codigomed}`
      axios(url).then(res => this.medico = res.data)
    },

    loadMedico(medico){
        this.medico = {...medico}
    },

    onFiltered(filteredItems) {
    // Trigger pagination to update the number of buttons/pages due to filtering
    this.totalRows = filteredItems.length
    this.currentPage = 1
    }

  },   
  mounted() {
    this.loadMedicos(); 
    this.totalRows = this.medicos.length //Total de linhas pela quantidade de Cadastro de Pacientes 
  }
}
</script>


<style>

</style>