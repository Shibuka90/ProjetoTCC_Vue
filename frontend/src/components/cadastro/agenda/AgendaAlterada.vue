<template>
  <div class="agendaalterada">
      <PageTitle icon="fas fa-calendar-alt" main="Agendas" sub="Cadastro da Agendas" />
      <div class="form">
          <b-form v-on:submit.prevent="save">
              <input id="agenda-codigomedico" type="hidden"  v-model="agenda.codigo" />
              <b-row>
                   <b-col md="auto">
                     <b-form-group label="Código Médico:" label-for="agenda-codigomedico">
                        <b-form-input id="agenda-codigomedico" type="text" v-model="agenda.codigomedico" required
                        readonly/>
                </b-form-group>
                </b-col>
                   <b-col md="6" sm="12">
                     <b-form-group label="Médico:" label-for="agenda-medico">
                    <b-form-input id="agenda-medico" type="text" v-model="agenda.medico" required 
                     placeholder="Informe o Nome do(a) Médico(a)...."/>
                </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col md="auto">
                    <b-form-group label="Código Especialidade:" label-for="agenda-codigoespecialidade">
                        <b-form-input id="agenda-codigoespecialidade" type="text" v-model="agenda.codigoespecialidade" required />
                     </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="Especialidade:" label-for="agenda-especialidade"> 
                        <b-form-input id="agenda-especialidade" type="text" v-model.lazy="agenda.especialidade" required 
                         placeholder="Informe a Especialidade...."/>
                </b-form-group>
                </b-col>
                <b-col>
                    <b-form-group label="Pesquisar:" label-for="pesquisar-especialidade"> 
                        <b-button v-b-modal="'modal-especialidades'" variant="primary"><i class="fas fa-search">Especialidades</i></b-button>  
                    </b-form-group>                  
                </b-col>
                    <b-modal id="modal-especialidades"  centered size="xl" title="Especialidades" @ok="capturar">                             
                        <b-form-group label="Pesquisar:" label-for="filtro-agenda">
                            <b-form-input id="filtro-agenda" v-model="filter" autofocus  size="lg" type="search" placeholder="Digite para filtrar...."></b-form-input>
                            <b-form-input id="especialidade" class="mt-2 mb-2" v-model="especialidade.especialidade" autofocus  size="lg" type="text" ></b-form-input>
                        </b-form-group>                    
                  
                        <b-table hover striped :items="especialidades" :fields="fields" :filter="filter" @filtered="onFiltered" @row-clicked="loadEspecialidade" :sort-by.sync="sortBy">
                            <template slot="actions"> </template>
                        </b-table>
                    </b-modal>
              </b-row>
              <b-row>
                <b-col md="auto">
                    <b-form-group label="Tempo de Atendimento:" label-for="agenda-tempodeatendimento">
                        <b-form-input id="agenda-tempodeatendimento" type="text" v-model="agenda.tempodeatendimento" required />
                     </b-form-group>
                </b-col>
                <b-col md="auto">
                    <b-form-group label="Hora Inicial:" label-for="agenda-horainicial">
                        <b-form-input id="agenda-horainicial" type="time" v-model="agenda.horainicial" required />
                     </b-form-group>
                </b-col>
                <b-col md="auto">
                    <b-form-group label="Hora Final:" label-for="agenda-horafinal">
                        <b-form-input id="agenda-horafinal" type="time" v-model="agenda.horafinal" required />
                     </b-form-group>
                </b-col>
                <b-col md="auto">
                    <b-form-group label="Intervalo Inicial:" label-for="agenda-intervaloinicial">
                        <b-form-input id="agenda-intervaloinicial" type="time" v-model="agenda.intervaloinicial" required />
                     </b-form-group>
                </b-col>
                <b-col md="auto">
                    <b-form-group label="Intervalo Final:" label-for="agenda-intervalofinal">
                        <b-form-input id="agenda-intervalofinal" type="time" v-model="agenda.intervalofinal" required />
                     </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col md="6">
                    <b-form-checkbox-group>
                        <!-- <b-form-checkbox  value="dom" v-model="agenda.domingo">Dom</b-form-checkbox> -->
                        <!-- <b-form-checkbox  value="seg" v-model="agenda.segunda">Seg</b-form-checkbox> -->
                        <!-- <b-form-checkbox value="2" v-model="agenda.terca">Ter</b-form-checkbox> -->
                        <!-- <b-form-checkbox value="3" v-model="agenda.quarta">Qua</b-form-checkbox> -->
                        <!-- <b-form-checkbox value="4" v-model="agenda.quinta">Qui</b-form-checkbox> -->
                        <!-- <b-form-checkbox value="5" v-model="agenda.sexta">Sex</b-form-checkbox> -->
                        <!-- <b-form-checkbox value="6" v-model="agenda.sabado">Sab</b-form-checkbox> -->
                    </b-form-checkbox-group>
                </b-col>
              </b-row>
                 <b-row>
                    <b-col md="4">
                        <b-button router-link to="/agendas" size='lg' class="mb-2" block>Cancelar</b-button>
                    </b-col>
                    <b-col md="2">
                        <b-button variant="danger" size='lg' class="mb-2" block @click="remove" router-link to="/agendas">Excluir</b-button>
                    </b-col>
                        <b-col md="6">
                    <b-button variant="success" size='lg' class="mb-2" block  @click="save" router-link to="/agendas">Alterar</b-button>
                </b-col> 
            </b-row>
          </b-form>
      </div>                
  </div>
</template>

<script>
import PageTitle from '../../template/PageTitle.vue'
import { baseApiUrl, showError} from '@/global'
import axios from 'axios'

export default {
        name:'AgendaAlterada',
        components: {PageTitle},
        data: function() {
            return{
                mode: "save",
                agenda: {},
                agendas: [],
                medico: {},
                medicos: [],
                especialidade: {},
                especialidades: [],
                fields: [
                            { key: "codigo", label: "Código", sortable: true},
                            { key: "especialidade", label: "Especialidade", sortable: true},
                    ],
                sortBy: 'codigo',
                page: 1,
                limit: 0,
                count: 0,
                totalRows: 1,
                currentPage: 1,
                perPage: 5,
                filter: null,
                capturando: '',
                value:'',
            }

        },

        methods: {
                save() {
                    const method = this.agenda.codigo ? 'put' : 'post'
                    const codigo = this.agenda.codigo ? `/${this.agenda.codigo}` : ''
                    axios[method](`${baseApiUrl}/agendas${codigo}`, this.agenda)
                    .then(() => {
                        this.$toasted.global.defaultSuccess()
                         })
                        .catch(showError)
                    },

                remove() {
                    const codigo = this.agenda.codigo
                    axios.delete(`${baseApiUrl}/agendas/${codigo}`)
                    .then(() => {
                        this.$toasted.global.defaultSuccess()
                        })
                        .catch(showError)
                    },

                getAgenda(){
                    const url = `${baseApiUrl}/agendas/${this.agenda.codigo}`
                    axios(url).then(res => this.agenda = res.data)
                    },
                    
                loadEspecialidades() {
                    const url = `${baseApiUrl}/especialidades`;
                    axios.get(url).then((res) => {
                        this.especialidades = res.data; 
                        this.count = res.data.count
                        this.limit = res.data.limit 
                        });
                    },
                
                loadEspecialidade(especialidade, mode='save'){
                    this.mode = mode
                    this.especialidade = {...especialidade}
                    console.log(this.especialidade)
                    },

                onFiltered(filteredItems) {
                     // Trigger pagination to update the number of buttons/pages due to filtering
                     this.totalRows = filteredItems.length
                     this.currentPage = 1
                     },

                capturar(capturando){
                    capturando = document.getElementById('especialidade').value
                    document.getElementById('agenda-especialidade').value = capturando
                }
         
                },
                mounted(){
                    this.agenda.codigo = this.$route.params.codigo
                    this.getAgenda()
                    this.loadEspecialidades()
        }
}
</script>

<style>

</style>