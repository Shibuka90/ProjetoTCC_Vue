<!--Página de cadastro do Atendimento -->

<template>
<!-- titulo da página -->
  <div class="novoatendimento">
      <PageTitle icon="fas fa-address-book" main="Atendimentos" sub="Cadastro de Atendimento"/>

      <!-- início do formulário do cadastro do atendimento -->
      <div class="form">
          <b-form>
                <input type="hidden" id="atendimento-codigo" v-model="atendimento.codigoatend" />
                <b-row>
                    <b-col md="2">
                        <b-form-group label="Pesquisar:" label-for="pesquisar-atendimento"> 
                            <b-button v-b-modal="'modal-atendimentos'" variant="primary" block><i class="fas fa-search"> Pacientes</i></b-button>  
                        </b-form-group>                  
                    </b-col>
                    <b-modal id="modal-atendimentos"  centered size="xl" title="Pacientes" @ok="resetFilter">
                        <b-row>
                            <b-col md="8">
                                <b-form-group label="Pesquisar:" label-for="filtro-atendimento">
                                    <b-form-input id="filtro-atendimento" v-model="filter" autofocus size="lg" type="search" placeholder="Digite para filtrar...."></b-form-input>
                                </b-form-group>                    
                            </b-col>
                            <b-col md="4"> 
                                <b-button variant="info" block router-link to="/novopacienteatendimento">Cadastrar</b-button>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col md="auto">
                                <b-form-group label="Códgio" label-for="paciente-codigo">
                                    <b-form-input id="paciente-codigo" v-model="paciente.codigopac" readonly size="lg" type="text" ></b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col md="8">
                                <b-form-group label="Paciente" label-for="paciente-paciente">
                                    <b-form-input id="paciente-paciente" v-model="paciente.nomepac" readonly size="lg" type="text" ></b-form-input>
                                </b-form-group>
                            </b-col>
                        </b-row>                  
                        <b-table hover striped :items="pacientes" :fields="fields" :filter="filter" @filtered="onFiltered" @row-clicked="loadPaciente" :sort-by.sync="sortBy"/>
                    </b-modal>
                    <b-col md="auto">
                        <b-form-group label="Código Paciente:" label-for="atendimento-codigopaciente">
                            <b-form-input id="atendimento-codigopaciente" type="text" :value="paciente.codigopac" @blur="atendimento.codpaciente = $event.target.value" required />
                        </b-form-group>
                    </b-col>
                   <b-col md="6" sm="12">
                        <b-form-group label="Paciente:" label-for="atendimento-paciente">
                            <b-form-input id="atendimento-paciente" type="text" :value="paciente.nomepac" @blur="atendimento.nomepaciente = $event.target.value" required 
                            placeholder="Informe o Nome do(a) Paciente(a)...." />
                        </b-form-group>
                    </b-col>
                    <b-col md="2">
                        <b-form-group label="Data:" label-for="atendimento-datadoatendimento">
                            <b-form-input id="atendimento-datadoatendimento" type="date" v-model="atendimento.datadoatendimento"></b-form-input>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col md="4"> 
                        <b-form-group label="Médico:" label-for="atendimento-medico">
                            <b-form-select id="atendimento-medico" :options="medicos" v-model="atendimento.codmedico" required  />
                        </b-form-group>
                    </b-col>
                    <b-col md="4"> 
                        <b-form-group label="Serviço:" label-for="atendimento-servico">
                            <b-form-select id="atendimento-servico" :options="servicos" v-model="atendimento.codservico" required  />
                        </b-form-group>
                    </b-col>
                    <b-col md="4"> 
                        <b-form-group label="Especialidade:" label-for="atendimento-especialidade">
                            <b-form-select id="atendimento-especialidade" :options="especialidades" v-model="atendimento.codespecialidade" required  />
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col md="4">
                        <b-form-group label="Convênio:" label-for="atendimento-convenio">
                            <b-form-input id="atendimento-convenio" :value="paciente.convenio" @blur="atendimento.convenio = $event.target.value" required  />
                        </b-form-group>
                    </b-col>
                    <b-col md="4">
                        <b-form-group label="Matricula:" label-for="atendimento-matricula">
                            <b-form-input id="atendimento-matricula" :value="paciente.matricula" @blur="atendimento.matricula = $event.target.value" required  />
                        </b-form-group>
                    </b-col>
                    <b-col md="4">
                        <b-form-group label="Vencimento:" label-for="atendimento-vencimento">
                            <b-form-input id="atendimento-vencimento" type="date" :value="paciente.vencimento" @blur="atendimento.vencimento = $event.target.value" required  />
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col md="6">
                        <b-button router-link to="/atendimentos" size='lg' class="mb-2" block>Voltar/Cancelar</b-button>
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
    name: "NovoAtendimento",
    components: {PageTitle},
    data: function() {
        return{
            atendimento: {},
            atendimentos:[],
            paciente: {},
            pacientes: [],
            medicos: [],
            servicos:[],
            convenios: [],
            especialidades: [],
            fields: [
                { key: "codigopac", label: "Código", sortable: true },
                { key: "nomepac", label: "Nome", sortable: true },
                { key: "datanasc", label: "Data Nasc." },
                { key: "convenio", label: "Convênio" },
                { key: "matricula", label: "Matricula" },
            ],
            filter: null,
            sortBy: 'codigopac',
        }
    },
    methods: {
        
        //Limpa a tela após a inclusão do Atendimento
        reset(){
            this.atendimento = {}
        },

        //Inclui ou Altera o Cadastro do Atendimento
        save() {
            const method = this.atendimento.codigoatend ? 'put' : 'post'
            const codigoatend = this.atendimento.codigoatend ? `/${this.atendimento.codigoatend}` : ''
            axios[method](`${baseApiUrl}/atendimentos${codigoatend}`, this.atendimento)
            .then(() => {
                this.$toasted.global.defaultSuccess()
                this.reset()
                })
                .catch(showError)
            },
        // Carregada as informações da Tabela Convênio para o MODAL
        loadPacientes() {
            const url = `${baseApiUrl}/pacientes`;
            axios.get(url).then((res) => {
                this.pacientes = res.data;     
                });
            },
        
        //Carrega os dados do Paciente para passar os dados para os campos Código Paciente e Paciente
        loadPaciente(paciente){
            this.paciente = {...paciente}
            },

        // Carregada as informações da Tabela Médicos para o FORM-SELECT
        loadMedicos() {
            const url = `${baseApiUrl}/medicos`;
            axios.get(url).then((res) => {
            this.medicos = res.data.map(medico => {
                return{value: medico.codigomed, text: `${medico.nome}` }
            })
            })
        },

        // Carregada as informações da Tabela Serviços para o FORM-SELECT
        loadServicos() {
            const url = `${baseApiUrl}/servicos`;
            axios.get(url).then((res) => {
            this.servicos = res.data.map(servico => {
                return{value: servico.codigo, text: `${servico.servico}` }
            })
            })
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
      }       
    },
    //Clico de Vida -> Renderização
    mounted(){
        this.loadPacientes()//Carrega os dados para montar a Tabela de Pacientes
        this.loadMedicos()//Carrega os dados para as opções de Médicos
        this.loadServicos()//Carrega os dados para opções de Serviços
        this.loadEspecialidades()//Carrega os dados para opções de Especialidades
    }
}
</script>

<style>

</style>