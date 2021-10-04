<template>
  <div class="convenios">
       <PageTitle
      icon="fa fa-book-medical"
      main="Convênios"
      sub="Grid de Convênios"
    />
    <div class="pesquisa">
      <b-form>
      <b-row >
        <b-col md="2"> 
          <b-button router-link to="/" class="fa fa-home ml-2 mr-4 mb-4" variant="info" size="lg"></b-button>
          <b-button router-link to="/homecadastro" class="mb-4" size="lg"><i class="fas fa-arrow-left"></i> Voltar</b-button>  
        </b-col>
        <b-col md="8">
          <b-form-input input type="text" id="convenio-codigo" class="mb-4" v-model="convenio.convenio" autofocus size="lg"></b-form-input> 
        </b-col>          
       <b-col md="auto">
         <b-button variant="success" v-if="mode === 'save'" block size="lg" @click="save">Incluir/Aterar</b-button> 
         <b-button variant="danger" v-if="mode === 'remove'" block size="lg" @click="remove">Excluir</b-button> 
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
        <b-table hover striped :items="convenios" :fields="fields" :filter="filter" @filtered="onFiltered">
          <template slot="actions" slot-scope="data">
             <b-button variant='warning' @click="loadConvenio(data.item)" class="mr-2">
                 <i class="fa fa-pencil"></i>
             </b-button>
             <b-button variant='danger' @click="loadConvenio(data.item, 'remove')">
                 <i class="fas fa-trash"></i>
             </b-button>
         </template>
    </b-table>
    <b-pagination size="md" v-model="page" :total-rows="count" :per-page="limit" />
  </div>
</template>

<script>
import PageTitle from "../template/PageTitle.vue";
import { baseApiUrl, showError} from "@/global";
import axios from "axios";
export default {
    name: "Convenios",
    components: { PageTitle },
    data: function(){
        return{
            mode: 'save',
            convenio: {},
            convenios: [],
             page: 1,
             limit: 0,
             count: 0,
             fields: [
                 { key: "codigo", label: "Código", sortable: true},
                 { key: "convenio", label: "Convênio", sortable: true},
                 { key: "actions", label: "Ações"},
             ],
             totalRows: 1,
             filter: null,
        };
    },
    methods: {
          loadConvenios() {
            const url = `${baseApiUrl}/convenios`;
            axios.get(url).then((res) => {
            this.convenios = res.data; 
            this.count = res.data.count
            this.limit = res.data.limit
            })
        },
        reset() {
            this.mode = 'save'
            this.convenio = {}
            this.loadConvenio()
        },
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
        remove() {
            const codigo = this.convenio.codigo
            axios.delete(`${baseApiUrl}/convenios/${codigo}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },

        loadConvenio(convenios, mode='save'){
            this.mode = mode
            this.convenio = {...convenios}
        },

        onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
        }
    },
     watch: {
      page() {
        this.loadConvenios()
      }
  } ,   
    mounted() {
        this.loadConvenios();  
  }
}
</script>

<style>

</style>