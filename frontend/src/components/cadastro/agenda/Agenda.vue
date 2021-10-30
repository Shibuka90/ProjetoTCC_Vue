<!--Página da Tabela de Agendas -->

<template>
<!-- titulo da página -->
  <div class="agendas">
      <PageTitle icon="fas fa-calendar-alt" main="Agendas" sub="Grid de Agendas" />
      
      <!-- Início da Tabela  -->
      <div class="pesquisa">
            <b-form>
                <b-row>
                    <b-col md="2">
                        <b-button router-link to="/" class="fa fa-home mt-4 mr-4 mb-4" variant="info" size="lg"></b-button>
                        <b-button router-link to="/homeagendamento"  size="lg" class="mb-4 mt-4"><i class="fas fa-arrow-left"></i> Voltar</b-button> 
                    </b-col>
                    <b-col md="2">
                        <b-form-group label="Código Agenda:" label-for="agenda-codigo"> 
                            <b-form-input input type="text" id="agenda-codigo" readonly size="lg" v-model="agenda.codigoag" class="mb-4 "></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col md="4">
                        <b-form-group label="Agenda:" label-for="agenda-medico">
                            <b-form-input input type="text" id="agenda-medico" readonly size="lg" v-model="agenda.medico" class="mb-4 "></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col md="4">
                        <b-button router-link to="/novaagenda" variant="primary" size='lg' class="mt-4 ml-2 mr-4">Novo</b-button>
                        <b-button v-if="agenda.medico" @click="getAgenda" router-link :to="'/agendas/' + this.agenda.codigoag" class=" mt-4 ml-2 mr-2" size="lg" variant="danger">Alterar/Excluir</b-button>  
                    </b-col> 
                </b-row>
            </b-form>
            <hr>
            <b-row>
                <b-col md="6">
                    <b-form-group label="Pesquisar:" label-for="filtro-agenda">
                        <b-form-input id="filtro-agenda" v-model="filter" autofocus  size="lg" type="search" placeholder="Digite para filtrar...."></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
                <b-table hover striped :items="agendas" :fields="fields" :filter="filter" @filtered="onFiltered" @row-clicked="loadAgenda" :sort-by.sync="sortBy"
                :current-page="currentPage" :per-page="perPage"  />
                <b-pagination size="md" v-model="currentPage" :total-rows="totalRows" :per-page="perPage" />
      </div>
  </div>
</template>

<script>
import PageTitle from "../../template/PageTitle.vue" // Importa o layout do titulo da página
import { baseApiUrl} from '@/global' // Importa as configuração de acesso para página e mensagens
import axios from 'axios' // Importa as configurações do AXIOS

export default {
    name: 'Agendas',
    components: {PageTitle},
    data: function() {
        return {
            agenda: {},
            agendas: [],
            fields: [
                { key: "codigoag", label: "Código", sortable: true},
                { key: "medico", label: "Agenda"},
                { key: "especialidade", label: "Especialidade"},
            ],
            sortBy: 'codigoag',
            totalRows: 1,
            currentPage: 1,
            perPage: 5,
            filter: null,
           
        }
    },
    methods: {
         
         //Carrega os dados da Tabela Agendas
        loadAgendas() {
            const url = `${baseApiUrl}/agendas`;
            axios.get(url).then((res) => {
                this.agendas = res.data; 
            });
            },
        
        //Carrega os dados da Agenda para acessar a página de Alteração/Exclusão
        loadAgenda(agenda){
                this.agenda = {...agenda}
            },

        //Pega os dados da Agenda pelo CODIGO Da AGENDA que foi carregado pelo loadAgenda
        getAgenda(){
            const url = `${baseApiUrl}/agendas/${this.agenda.codigoag}`
            axios(url).then(res => this.agenda = res.data)
            },

        //Traz os dados filtrados para a tabela
        onFiltered(filteredItems) {
            // Acione a paginação para atualizar o número de botões / páginas devido à filtragem
            this.totalRows = filteredItems.length
            this.currentPage = 1
      }
    },
    mounted(){
        this.loadAgendas()//Carrega os dados para montar a Tabela de Agenda
         this.totalRows = this.agendas.length //Total de linhas pela quantidade de Cadastro de Atendimentos
    }
}
</script>

<style>

</style>