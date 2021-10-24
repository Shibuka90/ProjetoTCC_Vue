<template>
  <div class="novoagendamento">
      <PageTitle icon="far fa-calendar-alt" main="Agendamento" sub="Novo Agendamento"/>
      <div class="form">
          <b-form>
              <input type="hidden" id="agendamento-codigo" v-model="agendamento.codigo">
              <b-row>
                  <b-col md="2">
                    <b-form-group label="Pesquisar:" label-for="pesquisar-agendamento"> 
                        <b-button v-b-modal="'modal-agendamento'" variant="primary" block><i class="fas fa-search"> Agendas</i></b-button>  
                    </b-form-group>
                  </b-col>
                  <b-modal id="modal-agendamento"  centered size="xl" title="Agendas" @ok="resetFilter">
                        <b-row>
                            <b-col md="8">
                                <b-form-group label="Pesquisar:" label-for="filtro-agendas">
                                    <b-form-input id="filtro-agendas" v-model="filter" autofocus size="lg" type="search" placeholder="Digite para filtrar...."></b-form-input>
                            </b-form-group>                    
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col md="auto">
                                <b-form-group label="Códgio" label-for="agenda-codigo">
                                    <b-form-input id="agenda-codigo" v-model="agenda.codigo" readonly size="lg" type="text" ></b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col md="8">
                                <b-form-group label="Agenda" label-for="agenda-medico">
                                    <b-form-input id="agenda-medico" v-model="agenda.medico" readonly size="lg" type="text" ></b-form-input>
                                </b-form-group>
                            </b-col>
                        </b-row>                  
                        <b-table hover striped :items="agendas" :fields="fieldsAg" :filter="filter" @filtered="onFiltered" @row-clicked="loadAgenda" :sort-by.sync="sortBy">
                            <template slot="actions"> </template>
                        </b-table>
                    </b-modal>
                    <b-col md="2">
                        <b-form-group label="Código Agenda:" label-for="agendamento-codigoagenda">
                            <b-form-input type="text" id="agendamento-codigoagenda" :value="agenda.codigo" @blur="agendamento.codigoagenda = $event.target.value" required></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col md="4">
                        <b-form-group label="Agenda" label-for="agendamento-agenda">
                            <b-form-input type="text" id="agendamento-agenda" :value="agenda.medico" @blur="agendamento.agenda = $event.target.value"></b-form-input>
                        </b-form-group>
                    </b-col>
                  <b-col md="2">
                    <b-form-group label="Data:" label-for="agendamento-data">
                        <b-form-input type="date" id="agendamento-data" v-model="agendamento.dataagendamento" ></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col md="2">
                      <b-form-group label="Horário" label-for="agendamento-horario">
                          <b-form-input type="time" id="agendamento-horario" v-model="agendamento.horario"></b-form-input>
                      </b-form-group>
                  </b-col>
              </b-row>
              <b-row>
                  <b-col md="2">
                      <b-form-group label="Pesquisar:" label-for="pesquisar-agendamentopaciente"> 
                        <b-button v-b-modal="'modal-agendamentopaciente'" variant="primary" block><i class="fas fa-search"> Pacientes</i></b-button>  
                    </b-form-group>
                  </b-col>
                  <b-modal id="modal-agendamentopaciente"  centered size="xl" title="Pacientes" @ok="resetFilter">
                        <b-row>
                            <b-col md="8">
                                <b-form-group label="Pesquisar:" label-for="filtro-pacientes">
                                    <b-form-input id="filtro-pacientes" v-model="filter" autofocus size="lg" type="search" placeholder="Digite para filtrar...."></b-form-input>
                            </b-form-group>                    
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col md="8">
                                <b-form-group label="Paciente" label-for="paciente-nome">
                                    <b-form-input id="paciente-nome" v-model="paciente.nome" readonly size="lg" type="text" ></b-form-input>
                                </b-form-group>
                            </b-col>
                        </b-row>                  
                        <b-table hover striped :items="pacientes" :fields="fieldsPac" :filter="filter" @filtered="onFiltered" @row-clicked="loadPaciente" :sort-by.sync="sortBy">
                            <template slot="actions"> </template>
                        </b-table>
                    </b-modal>
                    <b-col md="4">
                        <b-form-group label="Paciente:" label-for="agendamento-paciente">
                            <b-form-input type="text" id="agendamento-paciente" :value="paciente.nome" @blur="agendamento.paciente = $event.target.value"></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col md="4">
                        <b-form-group label="Serviço:" label-for="agendamento-servico">
                            <b-form-select type="text" id="agendamento-servico" :options="servicos" v-model="agendamento.servico"></b-form-select>
                        </b-form-group>
                    </b-col>
              </b-row>
              <b-row>
                    <b-col md="12">
                        <b-form-group label="Observação:" label-for="agendamento-observacao">
                            <VueEditor v-model="agendamento.observacao" placeholder="Relatar algo do paciente (alergias, necessidades e etc.)...." />
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col md="6">
                        <b-button router-link to="/agendamentos" size='lg' class="mb-2" block>Cancelar</b-button>
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
import { VueEditor } from "vue2-editor"
import { baseApiUrl, showError} from "@/global";
import axios from "axios";

export default {
    name: 'NovoAgendamento',
    components: {PageTitle, VueEditor},
    data: function(){
        return{
            mode: "save",
            agendamento: {},
            agendamentos: [],
            agenda: {},
            agendas: [],
            paciente: {},
            pacientes: [],
            servicos: [],
            page: 1,
            limit: 0,
            count: 0,
            totalRows: 1,
            currentPage: 1,
            perPage: 5,
            filter: null,
            sortBy: 'codigo',
            fieldsAg: [
                { key: "codigo", label: "Código", sortable: true},
                { key: "medico", label: "Agenda", sortable: true},
                { key: "especialidade", label: "Especialidade", sortable: true},
            ],
            fieldsPac: [
                { key: "codigo", label: "Código", sortable: true },
                { key: "nome", label: "Nome", sortable: true},
                { key: "datanasc", label: "Data Nasc." },
                { key: "convenio", label: "Convênio" },
                { key: "matricula", label: "Matricula" },
            ],
        }
    },
    methods: {
        reset(){
            this.mode = 'save'
            this.agendamento = {}
        },

        save() {
            const method = this.agendamento.codigo ? 'put' : 'post'
            const codigo = this.agendamento.codigo ? `/${this.agendamento.codigo}` : ''
            axios[method](`${baseApiUrl}/agendamentos${codigo}`, this.agendamento)
            .then(() => {
                this.$toasted.global.defaultSuccess()
                this.reset()
                })
                .catch(showError)
            },

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
        
        loadPacientes() {
            const url = `${baseApiUrl}/pacientes`;
            axios.get(url).then((res) => {
                this.pacientes = res.data; 
                this.count = res.data.count
                this.limit = res.data.limit      
                });
            },

        loadPaciente(paciente, mode='save'){
            this.mode = mode
            this.paciente = {...paciente}
        },

        loadServicos() {
            const url = `${baseApiUrl}/servicos`;
            axios.get(url).then((res) => {
            this.servicos = res.data.map(servico => {
                return{value: servico.servico, text: `${servico.servico}` }
            })
            })
        },

        resetFilter(){
            this.filter = null
            },

        onFiltered(filteredItems) {
            this.totalRows = filteredItems.length
            this.currentPage = 1
            },
    },
    mounted(){
        this.loadAgendas()
        this.loadPacientes()
        this.loadServicos()
    }
}
</script>

<style>

</style>