<template>
  <div class="agendapadrao">
      <PageTitle icon="fas fa-calendar-alt" main="Agenda Padrão" sub="Grid de Agenda" />

  <div class="pesquisa"> 
      <b-form>
      <b-row >
        <b-col md="2"> 
          <b-button router-link to="/" class="fa fa-home mr-4 mb-4" variant="info" size="lg"></b-button>
          <b-button router-link to="/homeagendamento"  size="lg" class="mb-4"><i class="fas fa-arrow-left"></i> Voltar</b-button>  
        </b-col>
        <b-col md="6">
          <b-form-input input type="text" id="agenda-codigo" readonly v-model="agenda.medico" size="lg" class="mb-4 "></b-form-input> 
        </b-col>
       <b-col md="4">
         <b-button router-link to="/novaagenda" variant="primary" size='lg' class="ml-2 mr-4">Novo</b-button>
          <b-button v-if="agenda.medico" class="ml-2 mr-2" size="lg" variant="danger">Alterar/Excluir</b-button>  
        </b-col> 
      </b-row>
    </b-form>     
    </div>
    <hr>
     <b-row>
          <b-col md="6">
            <b-form-group label="Pesquisar:" label-for="filtro-medico">
              <b-form-input id="filtro-medico" autofocus v-model="filter" size="lg" type="search" placeholder="Digite para filtrar...."></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
    <b-table hover striped :items="agendas" :fields="fields" :filter="filter" @filtered="onFiltered" @row-clicked="loadAgenda" :sort-by.sync="sortBy">
      <template slot="actions"> 
      </template>
    </b-table>
    <b-pagination size="md" v-model="currentPage" :total-rows="totalRows" :per-page="perPage" />
  </div>  
</template>

<script>
import PageTitle from '../../template/PageTitle.vue'
import {baseApiUrl} from '@/global'
import axios from 'axios'


export default {
        name: "AgendaPadrao",
        components: {PageTitle},
        data: function() {
            return {
                mode: "save",
                agenda: {},
                agendas: [], 
                sortBy: 'codigo',
                page: 1,
                limit: 0,
                count: 0,
                fields: [
                    {key: "codigo", label: "Códgio", sortable: true},
                    {key: "medico", label: "Médico", sortable: true},
                    {key: "servico", label: "Serviço"},
                    {key: "especialidade", label: "Especialidade"}
                ],
                totalRows: 1,
                currentPage: 1,
                perPage: 5,
                filter: null,
            }
        },
        methods: {
            loadAgendas() {
              const url = `${baseApiUrl}/agendas`;
              axios.get(url).then((res) => {
              this.agendas = res.data; 
              this.count = res.data.count
              this.limit = res.data.limit      
              });
            },
            loadAgenda(agenda, mode='save'){
            this.mode = mode
            this.agenda = {...agenda}
            },
            onFiltered(filteredItems) {
                 // Trigger pagination to update the number of buttons/pages due to filtering
                this.totalRows = filteredItems.length
                this.currentPage = 1
      }
    },
    watch: {
      
  },
    mounted() {
      this.loadAgendas()
    
  }
}
</script>

<style>

</style>