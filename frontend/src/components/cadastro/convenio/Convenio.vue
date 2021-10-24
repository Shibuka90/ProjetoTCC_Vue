<!--Página de Cadastro/Alteração/Exclusão dos dados da Tabela de Convênios -->
<template>
<!-- titulo da página -->
  <div class="convenios">
       <PageTitle icon="fa fa-book-medical" main="Convênios" sub="Grid/Cadastro/Ateração/Exclusão de Convênios" />
    
     <!-- início do formulário do cadastro de Convênio -->
    <div class="pesquisa">
      <b-form>
      <b-row >
        <b-col md="2">          
           <b-button router-link to="/" class="fa fa-home mt-4 ml-2 mr-4 mb-4" variant="info" size="lg"></b-button>
           <b-button router-link to="/homecadastro" class="mb-4 mt-4" size="lg"><i class="fas fa-arrow-left"></i> Voltar</b-button>  
        </b-col>        
        <b-col md="8">
          <b-form-group label="Convênio:" label-for="convenio-convenio">
           <b-form-input type="text" id="convenio-convenio"  class="mb-4" v-model="convenio.convenio" size="lg"></b-form-input> 
          </b-form-group>
        </b-col>          
       <b-col md="auto">
         <b-button variant="success" class="mb-4 mt-4" v-if="mode === 'save'" block size="lg" @click="save">Incluir/Aterar</b-button> 
         <b-button variant="danger" class="mb-4 mt-4" v-if="mode === 'remove'" block size="lg" @click="remove">Excluir</b-button> 
        </b-col> 
      </b-row>
    </b-form>     
    </div>   
    <hr>
    <b-row>
          <b-col md="6">
            <b-form-group label="Pesquisar:" label-for="filtro-pequisa">
              <b-form-input id="filtro-pesquisa" v-model="filter" size="lg" type="search" placeholder="Digite para filtrar...."></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-table hover striped :items="convenios" :fields="fields" :filter="filter" @filtered="onFiltered" :sort-by.sync="sortBy" :current-page="currentPage"
          :per-page="perPage" >
          <template v-slot:cell(actions)="data">
             <b-button variant='warning' @click="loadConvenio(data.item)" class="mr-2">
                 <i class="fa fa-pencil"></i>
             </b-button>
             <b-button variant='danger' @click="loadConvenio(data.item, 'remove')">
                 <i class="fas fa-trash"></i>
             </b-button>
         </template>
    </b-table>
   <b-pagination size="md" v-model="currentPage" :total-rows="totalRows" :per-page="perPage" />
  </div>
</template>

<script>
import PageTitle from "../../template/PageTitle.vue" // Importa o layout do titulo da página
import { baseApiUrl, showError } from '@/global' // Importa as configuração de acesso para página e mensagens
import axios from 'axios' // Importa as configurações do AXIOS

export default {
    name: "Convenios",
    components: { PageTitle },
    data: function(){
        return{
            mode: 'save',
            convenio: {},
            convenios: [],
             fields: [
                 { key: "codigo", label: "Código", sortable: true},
                 { key: "convenio", label: "Convênio"},
                 { key: "actions", label: "Ações"},
             ],
             totalRows: 1,
             currentPage: 1,
             perPage: 5,
             filter: null,
             sortBy: 'codigo',
        };
    },
    methods: {
      //Carrega os dados da Tabela Convênios
      loadConvenios() {
        const url = `${baseApiUrl}/convenios`;
        axios.get(url).then((res) => {
        this.convenios = res.data; 
        })
      },

      //Limpa o formulário após a Inclusão/Ateração
      reset() {
        this.mode = 'save'
        this.convenio = {}
        this.loadConvenios()
      },
      
      //Inclui ou Altera o cadastro do Convênio
      save() {
        const method = this.convenio.codigo ? 'put' : 'post'
        const codigo = this.convenio.codigo ? `/${this.convenio.codigo}` : ''
        axios[method](`${baseApiUrl}/convenios${codigo}`, this.convenio)
          .then(() => {
            this.$toasted.global.defaultSuccess()
             this.reset()
            })
          .catch(showError)
        },

      //Exclui o Convênio
      remove() {
        const codigo = this.convenio.codigo
        axios.delete(`${baseApiUrl}/convenios/${codigo}`)
          .then(() => {
            this.$toasted.global.defaultSuccess()
            this.reset()
            })
          .catch(showError)
        },

      //Carrega os dados do Convênio
      loadConvenio(convenios, mode='save'){
        this.mode = mode
        this.convenio = {...convenios}
      },

      //Traz os dados filtrados para a tabela
      onFiltered(filteredItems) {
      // Acione a paginação para atualizar o número de botões / páginas devido à filtragem
      this.totalRows = filteredItems.length
      this.currentPage = 1
      }
    },

    //"Assiste a tabela para fazer a paginação"
    watch: {
      page() {
        this.loadConvenios()//Carrega os dados das Convênios para a página
      }
  }, 
    //Clico de Vida -> Renderização  
    mounted() {
        this.loadConvenios(); //Carrega os dados para montar a Tabela de Convênios
      this.totalRows = this.convenios.length//Total de linhas pela quantidade de Cadastro de Convênios
  }
}
</script>

<style>

</style>