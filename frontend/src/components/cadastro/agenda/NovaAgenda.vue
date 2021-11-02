<!--Página de cadastro da Agenda -->

<template>
<!-- titulo da página -->
  <div class="novaagenda">
      <PageTitle icon="fas fa-calendar-alt" main="Agendas" sub="Cadastro de Agendas" />

       <!-- início do formulário do cadastro da agenda -->
      <div class="form">
          <b-form>
              <input id="agenda-codigomedico" type="hidden"  v-model="agenda.codigoag" />
                <b-row>
                    <b-col md="2">
                        <b-form-group label="Pesquisar:" label-for="pesquisar-medicos"> 
                            <b-button v-b-modal="'modal-medicos'" variant="primary" block><i class="fas fa-search"> Médicos</i></b-button>  
                        </b-form-group>                  
                    </b-col>
                        <b-modal id="modal-medicos" centered size="xl" title="Médicos" @ok="resetFilter">
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
                                        <b-form-input id="medico-codigo" v-model="medico.codigomed" readonly size="lg" type="text" ></b-form-input>
                                    </b-form-group>
                                </b-col>
                                <b-col md="6">
                                    <b-form-group label="Médicos" label-for="medico-nome">
                                        <b-form-input id="medico-nome" v-model="medico.nome" readonly size="lg" type="text" ></b-form-input>
                                    </b-form-group>
                                </b-col>
                            </b-row>                  
                                <b-table hover striped :items="medicos" :fields="fieldsMed" :filter="filter" @filtered="onFiltered" @row-clicked="loadMedico" :sort-by.sync="sortBy" />
                        </b-modal>
                    <b-col md="auto">
                        <b-form-group label="Código Médico:" label-for="agenda-codigomed">
                            <b-form-input id="agenda-codigomed" type="text" :value="medico.codigomed" @blur="agenda.codmedico = $event.target.value" required />
                        </b-form-group>
                    </b-col>
                    <b-col md="6" sm="12">
                        <b-form-group label="Médico:" label-for="agenda-medico">
                            <b-form-input id="agenda-medico" type="text" :value="medico.nome" @blur="agenda.nomemedico = $event.target.value" required 
                            placeholder="Informe o Nome do(a) Médico(a)...." />
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col md="4">
                        <b-form-group label="Especialidade:" label-for="agenda-especialidade">
                            <b-form-select type="text" id="agenda-especialidade" :options="especialidades" v-model="agenda.codespecialidade" required></b-form-select>
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
                    <b-col md="6">
                        <b-button router-link to="/agendas" size='lg' class="mb-2" block>Voltar/Cancelar</b-button>
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
import PageTitle from "../../template/PageTitle.vue" // Importa o layout do titulo da página
import { baseApiUrl, showError } from '@/global' // Importa as configuração de acesso para página e mensagens
import axios from 'axios' // Importa as configurações do AXIOS

export default {
        name:'AgendaAlterada',
        components: {PageTitle},
        data: function() {
            return{
                agenda: {},
                agendas: [],
                medico: {},
                medicos: [],
                especialidade: {},
                especialidades: [],
                fieldsMed: [
                    { key: "codigomed", label: "Código", sortable: true },
                    { key: "nome", label: "Nome", sortable: true },
                    { key: "email", label: "E-mail" },
                    { key: "crm", label: "CRM" },
                    { key: "especialidade", label:"Especialidade"}
                ],
                sortBy: 'codigomed',
                totalRows: 1,
                currentPage: 1,
                perPage: 5,
                filter: null,
        }               

        },
        methods: {

                 //Limpa a tela após a inclusão do Atendimento
                reset(){
                    this.agenda = {}
                    },

                //Inclui ou Altera o Cadastro da Agenda
                save() {
                    const method = this.agenda.codigoag ? 'put' : 'post'
                    const codigoag = this.agenda.codigoag ? `/${this.agenda.codigoag}` : ''
                    axios[method](`${baseApiUrl}/agendas${codigoag}`, this.agenda)
                    .then(() => {
                        this.$toasted.global.defaultSuccess()
                        this.reset()
                         })
                        .catch(showError)
                    },
                
                // Carregada as informações da Tabela Médicos para o MODAL
                loadMedicos() {
                    const url = `${baseApiUrl}/medicos`;
                    axios.get(url).then((res) => {
                        this.medicos = res.data; 
                        });
                    },
                
                //Carrega os dados do Médico para passar os dados para os campos Código Médico e Médico
                loadMedico(medico){
                    this.medico = {...medico}
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

                //Limpa os dados do campo Filtro do MODAL
                resetFilter(){
                    this.filter = null
                },

                //Traz os dados filtrados para a tabela
                onFiltered(filteredItems) {
                    // Acione a paginação para atualizar o número de botões / páginas devido à filtragem
                    this.totalRows = filteredItems.length
                    this.currentPage = 1
                    },
        },
        //Clico de Vida -> Renderização
        mounted(){
            this.loadMedicos()//Carrega os dados para montar a Tabela de Médicos
            this.loadEspecialidades()//Carrega os dados para opções de Especialidades
        }
}
</script>

<style>

</style>