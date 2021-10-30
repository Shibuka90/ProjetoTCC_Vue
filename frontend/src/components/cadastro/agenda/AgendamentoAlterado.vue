<template>
  <div class="agendamentoalterado">
      <PageTitle icon="far fa-calendar-alt" main="Agendamento" sub="Cadastro do Agendamento"/>
      <div class="form">
          <b-form>
              <b-row>
                  <b-col md="2">
                  <b-form-group label="Agendamento" label-for="agendmento-codigo">
                    <b-form-input  id="agendamento-codigo" v-model="agendamento.codigo" readonly />
                  </b-form-group>
                  </b-col>
                    <b-col md="2">
                        <b-form-group label="Código Agenda:" label-for="agendamento-codigoagenda">
                            <b-form-input type="text" id="agendamento-codigoagenda" v-model="agendamento.codagenda" readonly></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col md="4">
                        <b-form-group label="Agenda" label-for="agendamento-agenda">
                            <b-form-input type="text" id="agendamento-agenda" v-model="agendamento.agenda" readonly></b-form-input>
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
                    <b-col md="4">
                        <b-form-group label="Paciente:" label-for="agendamento-paciente">
                            <b-form-input type="text" id="agendamento-paciente" v-model="agendamento.paciente" readonly></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col md="4">
                        <b-form-group label="Serviço:" label-for="agendamento-servico">
                            <b-form-select type="text" id="agendamento-servico" :options="servicos" v-model="agendamento.codservico"></b-form-select>
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
                <b-col md="4">
                    <b-button router-link to="/agendamentos" size='lg' class="mb-2" block>Cancelar</b-button>
                </b-col>
                <b-col md="2">
                    <b-button variant="danger" size='lg' class="mb-2" block @click="remove" router-link to="/agendamentos">Excluir</b-button>
                </b-col>
                <b-col md="6">
                    <b-button variant="success" size='lg' class="mb-2" block  @click="save" router-link to="/agendamentos">Alterar</b-button>
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
            agendamento: {},
            agendamentos: [],
            agenda: {},
            agendas: [],
            paciente: {},
            pacientes: [],
            servicos: [],
        }
    },
    methods: {
        reset(){
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

        remove() {
            const codigo = this.agendamento.codigo
            axios.delete(`${baseApiUrl}/agendamentos/${codigo}`)
            .then(() => {
                this.$toasted.global.defaultSuccess()
                })
                .catch(showError)
            },

        getAgendamento(){
            const url = `${baseApiUrl}/agendamentos/${this.agendamento.codigo}`
            axios(url).then(res => this.agendamento = res.data)
        },

        loadServicos() {
            const url = `${baseApiUrl}/servicos`;
            axios.get(url).then((res) => {
            this.servicos = res.data.map(servico => {
                return{value: servico.codigo, text: `${servico.servico}` }
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
        this.agendamento.codigo = this.$route.params.codigo//Rota para a página da Agenda
        this.getAgendamento()//Carrega as informações da Agenda para a página
        this.loadServicos()
    }
}
</script>

<style>

</style>