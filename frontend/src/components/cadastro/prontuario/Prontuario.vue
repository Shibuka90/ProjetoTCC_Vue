<!--Página da Tabela de Prontuários -->

<template>
<div class="prontuarios">
  <!-- titulo da página -->
      <PageTitle icon="fa fa-first-aid" main="Prontuários" sub="Grid de Prontuarios" />

     <!-- Início da Tabela  --> 
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
            <b-button v-if="prontuario.paciente" @click="getProntuario" router-link :to="'/prontuarios/' + this.prontuario.codigopront" class="ml-2 mr-2" size="lg" variant="danger">Alterar/Excluir</b-button>  
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
          <b-table hover striped :items="prontuarios" :fields="fields" :filter="filter" @filtered="onFiltered" @row-clicked="loadProntuario" :sort-by.sync="sortBy" />
          <b-pagination size="md" v-model="currentPage" :total-rows="totalRows" :per-page="perPage" />
</div>  
</template>

<script>
import PageTitle from "../../template/PageTitle.vue" // Importa o layout do titulo da página
import { baseApiUrl} from '@/global' // Importa as configuração de acesso para página e mensagens
import axios from 'axios' // Importa as configurações do AXIOS

export default {
    name: "Prontuarios",
    components: {PageTitle},
    data: function () {
        return{
            mode: "save",
            prontuario: {},
            prontuarios: [],
            sortBy: 'codigopront',
            fields: [
                { key: "codigopront", label: "Código", sortable: true },
                { key: "codatendimento", label: "Atendimento", sortable: true },
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
      //Carrega os dados da Tabela Prontuários
      loadProntuarios() {
        const url = `${baseApiUrl}/prontuarios`;
        axios.get(url).then((res) => {
          this.prontuarios = res.data; 
        });
      },
      
      //Pega os dados do Prontuário pelo CODIGO DO PRONTUÁRIO que foi carregado pelo loadProntuario
      getProntuario(){
        const url = `${baseApiUrl}/prontuarios/${this.prontuario.codigopront}`
        axios(url).then(res => this.prontuario = res.data)
      },
      
      //Carrega os dados do Prontuário para acessar a página de Alteração/Exclusão
      loadProntuario(prontuario) {
        axios.get(`${baseApiUrl}/prontuarios/${prontuario.codigopront}`)
          .then(res => this.prontuario = res.data)          
      },
       
      //Traz os dados filtrados para a tabela
      onFiltered(filteredItems) {
        // Acione a paginação para atualizar o número de botões / páginas devido à filtragem
        this.totalRows = filteredItems.length
      }
    }, 

    //Clico de Vida -> Renderização
    mounted() {
          this.loadProntuarios()//Carrega os dados para montar a Tabela de Prontuario
          this.totalRows = this.prontuarios.length //Total de linhas pela quantidade de Cadastro de Prontuario
        }
    }
</script>

<style>

</style>