<template>
  <div class="especialidades">
       <PageTitle
      icon="fa fa-stethoscope"
      main="Especialidades"
      sub="Grid de Especiadlidades"
    />
    <div class="pesquisa" >
    <b-form>
      <b-row >
        <b-col md="2"> 
          <b-button router-link to="/" class="fa fa-home ml-2 mt-4 mr-4 mb-4" variant="info" size="lg"></b-button>
          <b-button router-link to="/homecadastro" size="lg" class="mb-4 mt-4"><i class="fas fa-arrow-left"></i> Voltar</b-button>  
        </b-col>
        <b-col md="8">
          <b-form-group label="Especialiade" label-for="especialidade-codigo">
            <b-form-input input type="text" id="especialidade-codigo"  v-model="especialidade.especialidade" autofocus size="lg" class="mb-4"></b-form-input> 
          </b-form-group>
        </b-col>          
       <b-col md="auto">
         <b-button variant="success" class="mb-4 mt-4" v-if="mode === 'save'" size="lg" block @click="save">Incluir/Aterar</b-button> 
         <b-button variant="danger"  class="mb-4 mt-4" v-if="mode === 'remove'" size="lg" block @click="remove">Excluir</b-button> 
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
        <b-row>
          <b-table hover striped :items="especialidades" :fields="fields" :filter="filter" @filtered="onFiltered" :sort-by.sync="sortBy" >
            <template v-slot:cell(actions)="data">
              <b-button variant ="warning" @click="loadEspecialidade(data.item)" class="mr-2"><i class="fa fa-pencil"></i></b-button>
               <b-button variant='danger' @click="loadEspecialidade(data.item, 'remove')"><i class="fas fa-trash"></i></b-button>
            </template>
          </b-table>
        </b-row>
  </div>
</template>

<script>
import PageTitle from "../../template/PageTitle.vue";
import { baseApiUrl, showError} from "@/global";
import axios from "axios";
export default {
    name: "Especialidades",
    components: { PageTitle },
    data: function(){
        return{
            mode: 'save',
            especialidade: {},
            especialidades: [],
            page: 1,
            limit: 0,
            count: 0,         
            fields: [
                 { key: "codigo", label: "Código", sortable: true},
                 { key: "especialidade", label: "Especialidades"},
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
        loadEspecialidades(){
          const url = `${baseApiUrl}/especialidades`;
            axios.get(url).then((res) => {
            this.especialidades = res.data;
            this.count = res.data.count;
            this.limit = res.data.limit; 
            })
        },
        reset() {
            this.mode = 'save'
            this.especialidade = {}
            this.loadEspecialidades()
        },
        save() {
            const method = this.especialidade.codigo ? 'put' : 'post'
            const codigo = this.especialidade.codigo ? `/${this.especialidade.codigo}` : ''
            axios[method](`${baseApiUrl}/especialidades${codigo}`, this.especialidade)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        remove() {
            const codigo = this.especialidade.codigo
            axios.delete(`${baseApiUrl}/especialidades/${codigo}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },

        loadEspecialidade(especialidade, mode='save'){
            this.mode = mode
            this.especialidade = {...especialidade}
        },
        
        onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
        },
    },
     watch: {
      page() {
        this.loadEspecialidades()
      }
  } ,   
    mounted() {
        this.loadEspecialidades();
  }
}
</script>

<style>

</style>