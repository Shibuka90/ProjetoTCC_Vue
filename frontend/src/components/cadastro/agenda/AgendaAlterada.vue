<!--Página de alteração do cadastro da agenda caso haja necessidade-->

<template>
<!-- titulo da página -->
  <div class="agendaalterada">
      <PageTitle icon="fas fa-calendar-alt" main="Agendas" sub="Cadastro da Agendas" />

      <!-- início do formulário do cadastro da agenda -->
      <div class="form">
          <b-form>
            <b-row>
                <b-col md="auto">
                     <b-form-group label="Código Agenda:" label-for="agenda-codigoag">
                        <b-form-input id="agenda-codigoag" type="text" v-model="agenda.codigoag" readonly required />
                    </b-form-group>
                </b-col>
                <b-col md="auto">
                    <b-form-group label="Código Médico:" label-for="agenda-codigomed">
                        <b-form-input id="agenda-codigomed" type="text" v-model="agenda.codmedico" readonly required />
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="Médico:" label-for="agenda-medico">
                        <b-form-input id="agenda-medico" type="text" v-model="agenda.nomemedico" readonly required 
                        placeholder="Informe o Nome do(a) Médico(a)...." />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="4">
                    <b-form-group label="Código Especialidade:" label-for="agenda-codigoespecialidade">
                        <b-form-select id="agenda-codigoespecialidade" type="text" :options="especialidades" v-model="agenda.codespecialidade" required />
                    </b-form-group>
                </b-col>
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
import PageTitle from "../../template/PageTitle.vue" // Importa o layout do titulo da página
import { baseApiUrl, showError } from '@/global' // Importa as configuração de acesso para página e mensagens
import axios from 'axios' // Importa as configurações do AXIOS

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
            }

        },

        methods: {

                //Inclui ou Altera o Cadastro da Agenda
                save() {
                    const method = this.agenda.codigoag ? 'put' : 'post'
                    const codigoag = this.agenda.codigoag ? `/${this.agenda.codigoag}` : ''
                    axios[method](`${baseApiUrl}/agendas${codigoag}`, this.agenda)
                    .then(() => {
                        this.$toasted.global.defaultSuccess()
                         })
                        .catch(showError)
                    },

                //Remove somente a Agenda
                remove() {
                    const codigoag = this.agenda.codigoag
                    axios.delete(`${baseApiUrl}/agendas/${codigoag}`)
                    .then(() => {
                        this.$toasted.global.defaultSuccess()
                        })
                        .catch(showError)
                    },

                //Traz as informações da Agenda a partir do CODGIO DO AGENDA
                getAgenda(){
                    const url = `${baseApiUrl}/agendas/${this.agenda.codigoag}`
                    axios(url).then(res => this.agenda = res.data)
                    },
                   
                // Carregada as informações da Tabela Especialidades para o FORM-SELECT
                loadEspecialidades() {
                    const url = `${baseApiUrl}/especialidades`;
                    axios.get(url).then((res) => {
                        this.especialidades = res.data.map(especialidade => {
                        return{value: especialidade.codigo, text: `${especialidade.especialidade}` }
                    })
                    })
                },

                //Clico de Vida -> Renderização
                mounted(){
                    this.agenda.codigoag = this.$route.params.codigoag//Rota para a página da Agenda
                    this.getAgenda()//Carrega as informações da Agenda para a página
                    this.loadEspecialidades()//Carrega as informações para opções de Especialidades FORM-SELECT
                }
        }
}
</script>

<style>

</style>