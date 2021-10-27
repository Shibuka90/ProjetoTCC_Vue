<!--Página da Tabela de Atendimentos -->

<template>
<!-- titulo da página -->
  <div class="atendimentos">
    <PageTitle icon="fas fa-address-book" main="Atendiemntos" sub="Grid de Atendimentos"/>
      
      <!-- Início da Tabela  -->
      <div class="pesquisa"> 
        <b-form>
          <b-row >
            <b-col md="2"> 
              <b-button router-link to="/" class="fa fa-home mr-4 mb-4" variant="info" size="lg"></b-button>
              <b-button router-link to="/homeatendimento"  size="lg" class="mb-4"><i class="fas fa-arrow-left"></i> Voltar</b-button>  
            </b-col>
            <b-col md="6">
              <b-form-input input type="text" id="atedimento-codigo" readonly v-model="atendimento.codigoatend" size="lg" class="mb-4 "></b-form-input> 
            </b-col>
            <b-col md="4">
              <b-button router-link to="/novoatendimento" variant="primary" size='lg' class="ml-2 mr-4">Novo</b-button>
              <b-button v-if="atendimento.codigoatend" @click="getAtendimento" router-link :to="'/atendimentos/' + this.atendimento.codigoatend" class="ml-2 mr-2" size="lg" variant="danger">Alterar/Alta</b-button>  
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
      <b-table hover striped :items="atendimentos" :fields="fields" :filter="filter" @filtered="onFiltered" @row-clicked="loadAtendimento" :sort-by.sync="sortBy" 
      :current-page="currentPage" :per-page="perPage" />
      <b-pagination size="md" v-model="currentPage" :total-rows="totalRows" :per-page="perPage" />
  </div>

</template>

<script>
import PageTitle from "../../template/PageTitle.vue" // Importa o layout do titulo da página
import { baseApiUrl} from '@/global' // Importa as configuração de acesso para página e mensagens
import axios from 'axios' // Importa as configurações do AXIOS

export default {
    name: "Atendimentos",
    components: {PageTitle},
    data: function(){
        return {
            atendimento: {},
            atendimentos: [],
            fields: [
                { key: "codigoatend", label: "Atendimento", sortable: true },
                { key: "datadoatendimento", label: "Data do Atend.", sortable: true},
                { key: "alta", label: "Alta", sortable: true},
                { key: "nomepaciente", label: "Paciente", sortable: true},
                { key: "convenio", label: "Convênio" },
                { key: "servico", label: "Serviço"},
                { key: "especialidade", label: "Especialidade"},

            ],
            sortBy: 'codigoatend',
            totalRows: 1,
            currentPage: 1,
            perPage: 5,
            filter: null,
        }
    },
    methods: {

      //Carrega os dados da Tabela Atendimentos
      loadAtendimentos() {
        const url = `${baseApiUrl}/atendimentos`;
        axios.get(url).then((res) => {
          this.atendimentos = res.data; 
          });
        },
      
      //Carrega os dados do Atendimento para acessar a página de Alteração/Exclusão
      loadAtendimento(atendimento){
          this.atendimento = {...atendimento}        
        },

      //Pega os dados do Atendimento pelo CODIGO DO ATENDIMENTO que foi carregado pelo loadAtendimento
      getAtendimento(){
          const url = `${baseApiUrl}/atendimentos/${this.atendimento.codigotend}`
          axios(url).then(res => this.atendimento = res.data)
          console.log(url)
        },
      
      //Traz os dados filtrados para a tabela
      onFiltered(filteredItems) {
        // Acione a paginação para atualizar o número de botões / páginas devido à filtragem
        this.totalRows = filteredItems.length
        this.currentPage = 1
        }
    },

    //Clico de Vida -> Renderização
    mounted(){
      this.loadAtendimentos()//Carrega os dados para montar a Tabela de Atendimento
      this.totalRows = this.atendimentos.length //Total de linhas pela quantidade de Cadastro de Atendimentos
    }
}
</script>

<style>

</style>