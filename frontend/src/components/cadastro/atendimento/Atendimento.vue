<template>
    <div class="atendimentos">
        <PageTitle icon="fas fa-address-book" main="Atendiemntos" sub="Grid de Atendimentos"/>

        <div class="pequisa">
            <div class="pesquisa"> 
      <b-form>
      <b-row >
        <b-col md="2"> 
          <b-button router-link to="/" class="fa fa-home mr-4 mb-4" variant="info" size="lg"></b-button>
          <b-button router-link to="/homeatendimento"  size="lg" class="mb-4"><i class="fas fa-arrow-left"></i> Voltar</b-button>  
        </b-col>
        <b-col md="6">
          <b-form-input input type="text" id="atedimento-codigo" readonly v-model="atendimento.paciente" size="lg" class="mb-4 "></b-form-input> 
        </b-col>
       <b-col md="4">
         <b-button router-link to="/novoatendimento" variant="primary" size='lg' class="ml-2 mr-4">Novo</b-button>
          <b-button v-if="atendimento.paciente" @click="getAtendimento" router-link :to="'/atendimentos/' + this.atendimento.codigo" class="ml-2 mr-2" size="lg" variant="danger">Alterar/Excluir</b-button>  
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
           <b-col md="2"> 
                    <b-form-checkbox id="atendimento"  class="mt-3 mb-3">Censo</b-form-checkbox>
                </b-col>
        </b-row>
    <b-table hover striped :items="atendimentos" :fields="fields" :filter="filter" @filtered="onFiltered" @row-clicked="loadAtendimento" :sort-by.sync="sortBy">
      <template slot="actions"> </template>
    </b-table>
    <b-pagination size="md" v-model="currentPage" :total-rows="totalRows" :per-page="perPage" />
        </div>
    </div>
</template>

<script>
import PageTitle from '../../template/PageTitle.vue'
import { baseApiUrl} from "@/global";
import axios from "axios";

export default {
    name: "Atendimentos",
    components: {PageTitle},
    data: function(){
        return {
            atendimento: {},
            atendimentos: [],
            fields: [
                { key: "codigo", label: "Atendimento", sortable: true },
                { key: "datadoatendimento", label: "Data do Atend.", sortable: true},
                { key: "alta", label: "Alta", sortable: true},
                { key: "paciente", label: "Paceinte", sortable: true},
                { key: "convenio", label: "Convênio" },
                { key: "servico", label: "Serviço"},
                { key: "medico", label: "Médico"},
            ],
            sortBy: 'codigo',
            page: 1,
            limit: 0,
            count: 0,
            totalRows: 1,
            currentPage: 1,
            perPage: 5,
            filter: null,
        }
    },
    methods: {
        loadAtendimentos() {
            const url = `${baseApiUrl}/atendimentos`;
            axios.get(url).then((res) => {
                this.atendimentos = res.data; 
                this.count = res.data.count
                this.limit = res.data.limit 
                });
            },
            
        loadAtendimento(atendimento, mode='save'){
            this.mode = mode
            this.atendimento = {...atendimento}
           
            },

        getAtendimento(){
            const url = `${baseApiUrl}/atendimentos/${this.atendimento.codigo}`
            axios(url).then(res => this.atendimento = res.data)
            },
        
        onFiltered(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length
            this.currentPage = 1
            }
    },
    watch: {
      page() {
        this.loadMedicos()
      }
  }, 
    mounted(){
        this.loadAtendimentos()
    }
}
</script>

<style>

</style>