<!--Página da Tabela de Pacientes -->

<template>
<!-- titulo da página -->
  <div class="pacientes">
    <PageTitle icon="fa fa-user" main="Pacientes" sub="Grid de Pacientes" />

    <!-- Início da Tabela  -->
     <div class="pesquisa"> 
       <b-form>
          <b-row >
            <b-col md="2"> 
              <b-button router-link to="/" class="fa fa-home mr-4 mb-4" variant="info" size="lg"></b-button>
              <b-button router-link to="/homecadastro"  size="lg" class="mb-4"><i class="fas fa-arrow-left"></i> Voltar</b-button>  
            </b-col>
            <b-col md="6">
              <b-form-input input type="text" id="paciente-codigo" readonly v-model="paciente.nomepac" autofocus size="lg" class="mb-4"></b-form-input> 
            </b-col>
            <b-col md="4">
              <b-button router-link to="/novopaciente" variant="primary" size='lg' class="ml-2 mr-4">Novo</b-button>
              <b-button v-if="paciente.nomepac" @click="getPaciente" router-link :to="'/pacientes/' + this.paciente.codigopac" class="ml-2 mr-2" size="lg" variant="danger">Alterar/Excluir</b-button>  
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
        <b-table hover striped :items="pacientes" :fields="fields" :filter="filter" @filtered="onFiltered" @row-clicked="loadPaciente" :sort-by.sync="sortBy" :current-page="currentPage"
          :per-page="perPage" />
        <b-pagination size="md" v-model="currentPage" :total-rows="totalRows" :per-page="perPage" />
  </div>
</template>

<script>
import PageTitle from "../../template/PageTitle.vue" // Importa o layout do titulo da página
import { baseApiUrl} from '@/global' // Importa as configuração de acesso para página e mensagens
import axios from 'axios' // Importa as configurações do AXIOS


export default {
  name: "Pacientes",
  components: { PageTitle },
  data: function () {
    return {
      paciente: {},
      pacientes: [],
      fields: [
        { key: "codigopac", label: "Código", sortable: true },
        { key: "nomepac", label: "Nome", sortable: true },
        { key: "datanasc", label: "Data Nasc." },
        { key: "convenio", label: "Convênio" },
        { key: "matricula", label: "Matricula" },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      filter: null,
      sortBy: 'codigopac',
    };
    
  },
  methods: {
    //Carrega os dados da Tabela Pacientes
    loadPacientes() {
      const url = `${baseApiUrl}/pacientes`;
      axios.get(url).then((res) => {
        this.pacientes = res.data;      
      });
    },

    //Pega os dados do Paciente pelo CODIGO DO PACIENTE que foi carregado pelo loadPaciente
    getPaciente(){
        const url = `${baseApiUrl}/pacientes/${this.paciente.codigopac}`
        axios(url).then(res => this.paciente = res.data)
    },

    //Carrega os dados do Paciente para acessar a página de Alteração/Exclusão
    loadPaciente(paciente){
        this.paciente = {...paciente}
    },
    
    //Traz os dados filtrados para a tabela
    onFiltered(filteredItems) {
    // Acione a paginação para atualizar o número de botões / páginas devido à filtragem
    this.totalRows = filteredItems.length
    this.currentPage = 1
       
      }
  }, 
  //Clico de Vida -> Renderização
  mounted() {
    this.loadPacientes(); //Carrega os dados para montar a Tabela de Pacientes
    this.totalRows = this.pacientes.length //Total de linhas pela quantidade de Cadastro de Pacientes
  }
}
</script>


<style>

</style>