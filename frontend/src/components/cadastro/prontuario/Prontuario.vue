<template>
<div class="prontuarios">
      <PageTitle
      icon="fa fa-first-aid"
      main="Prontuários"
      sub="Grid de Prontuarios"
    />
    <div class="pesquisa"> 
      <b-form>
      <b-row >
        <b-col md="2"> 
          <b-button router-link to="/" class="fa fa-home mr-4 mb-4" variant="info" size="lg"></b-button>
          <b-button router-link to="/homeprontuario"  size="lg" class="mb-4"><i class="fas fa-arrow-left"></i> Voltar</b-button>  
        </b-col>
        <b-col md="6">
          <b-form-input input type="text" id="prontuario-paciente" readonly v-model="prontuario.paciente" autofocus size="lg" class="mb-4"></b-form-input> 
        </b-col>
       <b-col md="4">
         <b-button router-link to="/novoprontuario" variant="primary" size='lg' class="ml-2 mr-4">Novo</b-button>
          <b-button v-if="prontuario.paciente" @click="getProntuario" router-link :to="'/prontuarios/' + this.prontuario.codigo" class="ml-2 mr-2" size="lg" variant="danger">Alterar/Excluir</b-button>  
        </b-col> 
      </b-row>
    </b-form>     
    </div>
    <hr>
        <b-row>
          <b-col md="6">
            <b-form-group label="Pesquisar:" label-for="filtro-prontuarios">
              <b-form-input id="filtro-prontuarios" v-model="filter" size="lg" type="search" placeholder="Digite para filtrar...."></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
    <b-table hover striped :items="prontuarios" :fields="fields" :filter="filter" @filtered="onFiltered" @row-clicked="loadProntuario" :sort-by.sync="sortBy">
      <template slot="actions" > 
      </template>
    </b-table>
    <b-pagination size="md" v-model="currentPage" :total-rows="totalRows" :per-page="perPage" />
</div>
  
</template>

<script>
import PageTitle from "../../template/PageTitle.vue"
import { baseApiUrl} from "@/global";
import axios from "axios";

export default {
    name: "Prontuarios",
    components: {PageTitle},
    data: function () {
        return{
            mode: "save",
            prontuario: {},
            prontuarios: [],
            sortBy: 'codigo',
            page: 1,
            limit: 0,
            count: 0,
            fields: [
                { key: "codigo", label: "Código", sortable: true },
                { key: "codigoatendimento", label: "Atendimento", sortable: true },
                { key: "paciente", label: "Paciente", sortable: true },
                { key: "medico", label: "Médico" },
                { key: "especialidade", label: "Especialidade" },
                ],
            totalRows: 1,
            currentPage: 1,
            perPage: 5,
            filter: null,
            }
        },
    methods: {
        loadProntuarios() {
            const url = `${baseApiUrl}/prontuarios`;
            axios.get(url).then((res) => {
                this.prontuarios = res.data; 
                this.count = res.data.count
                this.limit = res.data.limit 
                });
            },
        
        getProntuario(){
            const url = `${baseApiUrl}/prontuarios/${this.prontuario.codigo}`
            axios(url).then(res => this.prontuario = res.data)
            },
            
         loadProntuario(prontuario, mode = 'save') {
            this.mode = mode
            axios.get(`${baseApiUrl}/prontuarios/${prontuario.codigo}`)
                .then(res => this.prontuario = res.data)          
        },
            
        onFiltered(filteredItems) {
            this.totalRows = filteredItems.length
        }
    }, 
    watch: {
        page() {
            this.loadProntuarios()
        },
    },       
    mounted() {
          this.loadProntuarios()
        }
    }
</script>

<style>

</style>