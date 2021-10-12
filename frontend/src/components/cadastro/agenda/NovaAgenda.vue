<template>
  <div class="agendaalterada">
      <PageTitle icon="fas fa-calendar-alt" main="Agendas" sub="Cadastro de Agendas" />
      <div class="form">
          <b-form>
              <input id="agenda-codigomedico" type="hidden"  v-model="agenda.codigo" />
                   <b-row>
                <b-col md="2">
                    <b-form-group label="Pesquisar:" label-for="pesquisar-medicos"> 
                        <b-button v-b-modal="'modal-medicos'" variant="primary" block><i class="fas fa-search"> Médicos</i></b-button>  
                    </b-form-group>                  
                </b-col>
                    <b-modal id="modal-medicos" centered size="xl" title="Médicos" >
                        <b-row>
                            <b-col md="12">
                                <b-form-group label="Pesquisar:" label-for="filtro-agendamedico">
                                    <b-form-input id="filtro-agendamedico" v-model="filter" autofocus size="lg" type="search" placeholder="Digite para filtrar...."></b-form-input>
                            </b-form-group>                    
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col md="2">
                                <b-form-group label="Códgio" label-for="medico-codigo">
                                    <b-form-input id="medico-codigo" v-model="medico.codigo"  size="lg" type="text" ></b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col md="8">
                                <b-form-group label="Médicos" label-for="medico-nome">
                                    <b-form-input id="medico-nome" v-model="medico.nome" size="lg" type="text" ></b-form-input>
                                </b-form-group>
                            </b-col>
                        </b-row>                  
                        <b-table hover striped :items="medicos" :fields="fieldsMed" :filter="filter" @filtered="onFiltered" @row-clicked="loadMedico" :sort-by.sync="sortBy">
                            <template slot="actions"> </template>
                        </b-table>
                    </b-modal>
                   <b-col md="auto">
                     <b-form-group label="Código Médico:" label-for="agenda-codigomed">
                        <b-form-input id="agenda-codigomed" type="text" :value="medico.codigo" @blur="agenda.codigomedico = $event.target.value" required />
                </b-form-group>
                </b-col>
                   <b-col md="6" sm="12">
                     <b-form-group label="Médico:" label-for="agenda-medico">
                    <b-form-input id="agenda-medico" type="text" :value="medico.nome" @blur="agenda.medico = $event.target.value" required 
                     placeholder="Informe o Nome do(a) Médico(a)...." />
                </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col md="2">
                    <b-form-group label="Pesquisar:" label-for="pesquisar-especialidade"> 
                        <b-button v-b-modal="'modal-especialidades'" variant="primary" block><i class="fas fa-search"> Especialidades</i></b-button>  
                    </b-form-group>                  
                </b-col>
                    <b-modal id="modal-especialidades"  centered size="xl" title="Especialidades">
                        <b-row>
                            <b-col md="12">
                                <b-form-group label="Pesquisar:" label-for="filtro-agendaespecialidade">
                                    <b-form-input id="filtro-agendaespecialidade" v-model="filter" autofocus size="lg" type="search" placeholder="Digite para filtrar...."></b-form-input>
                            </b-form-group>                    
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col md="auto">
                                <b-form-group label="Códgio" label-for="especialidade-codigo">
                                    <b-form-input id="especialidade-codigo" v-model="especialidade.codigo" autofocus  size="lg" type="text" ></b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col md="8">
                                <b-form-group label="Especialidade" label-for="especialidade-especialidade">
                                    <b-form-input id="especialidade-especialidade" v-model="especialidade.especialidade" autofocus  size="lg" type="text" ></b-form-input>
                                </b-form-group>
                            </b-col>
                        </b-row>                  
                        <b-table hover striped :items="especialidades" :fields="fieldsEsp" :filter="filter" @filtered="onFiltered" @row-clicked="loadEspecialidade" :sort-by.sync="sortBy">
                            <template slot="actions"> </template>
                        </b-table>
                    </b-modal>'
                <b-col md="auto">
                    <b-form-group label="Código Especialidade:" label-for="agenda-codigoespecialidade">
                        <b-form-input id="agenda-codigoespecialidade" type="text" :value="especialidade.codigo" @blur="agenda.codigoespecialidade = $event.target.value" required />
                     </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="Especialidade:" label-for="agenda-especialidade"> 
                        <b-form-input id="agenda-especialidade" type="text" :value="especialidade.especialidade" @blur="agenda.especialidade = $event.target.value" required 
                         placeholder="Informe a Especialidade...."  />
                </b-form-group>
                </b-col>
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
                        <b-button router-link to="/agendas" size='lg' class="mb-2" block>Cancelar</b-button>
                    </b-col>
                    <b-col md="6">
                        <b-button variant="success" size='lg' class="mb-2" block  @click="save" >Incluir</b-button>
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
                fieldsEsp: [
                    { key: "codigo", label: "Código", sortable: true},
                    { key: "especialidade", label: "Especialidade", sortable: true},
                ],
                fieldsMed: [
                    { key: "codigo", label: "Código", sortable: true },
                    { key: "nome", label: "Nome", sortable: true },
                    { key: "email", label: "E-mail" },
                    { key: "crm", label: "CRM" },
                    { key: "especialidade", label:"Especialidade"}
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
                    
                loadMedicos() {
                    const url = `${baseApiUrl}/medicos`;
                    axios.get(url).then((res) => {
                        this.medicos = res.data; 
                        this.count = res.data.count
                        this.limit = res.data.limit 
                        });
                    },
                    
                loadEspecialidades() {
                    const url = `${baseApiUrl}/especialidades`;
                    axios.get(url).then((res) => {
                        this.especialidades = res.data; 
                        this.count = res.data.count
                        this.limit = res.data.limit 
                        });
                    },
                    
                loadMedico(medico, mode='save'){
                    this.mode = mode
                    this.medico = {...medico}
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
        mounted(){
            this.loadMedicos()
            this.loadEspecialidades()
        }
}
</script>

<style>

</style>