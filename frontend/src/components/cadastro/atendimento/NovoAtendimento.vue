<template>
  <div class="novoatendimento">
      <PageTitle icon="fas fa-address-book" main="Atendimentos" sub="Cadastro de Atendimento"/>
      <div class="form">
          <b-form>
                <input type="hidden" id="atendimento-codigo" v-model="atendimento.codigo" />
            <b-row>
            <b-col md="2">
                    <b-form-group label="Pesquisar:" label-for="pesquisar-atendimento"> 
                        <b-button v-b-modal="'modal-atendimentos'" variant="primary" block><i class="fas fa-search"> Pacientes</i></b-button>  
                    </b-form-group>                  
                </b-col>
                    <b-modal id="modal-atendimentos"  centered size="xl" title="Pacinetes" @ok="resetFilter">
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
                                    <b-form-input id="paciente-codigo" v-model="paciente.codigo" readonly size="lg" type="text" ></b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col md="8">
                                <b-form-group label="Paciente" label-for="paciente-paciente">
                                    <b-form-input id="paciente-paciente" v-model="paciente.nome" readonly size="lg" type="text" ></b-form-input>
                                </b-form-group>
                            </b-col>
                        </b-row>                  
                        <b-table hover striped :items="pacientes" :fields="fields" :filter="filter" @filtered="onFiltered" @row-clicked="loadPaciente" :sort-by.sync="sortBy">
                            <template slot="actions"> </template>
                        </b-table>
                    </b-modal>
                    <b-col md="auto">
                     <b-form-group label="Código Paciente :" label-for="atendimento-codigopaciente">
                        <b-form-input id="atendimento-codigopaciente" type="text" :value="paciente.codigo" @blur="atendimento.codigopaciente = $event.target.value" required />
                </b-form-group>
                </b-col>
                   <b-col md="6" sm="12">
                     <b-form-group label="Paciente:" label-for="atendimento-paciente">
                    <b-form-input id="atendimento-paciente" type="text" :value="paciente.nome" @blur="atendimento.paciente = $event.target.value" required 
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
                        <b-form-select id="atendimento-medico" :options="medicos" v-model="atendimento.medico" required  />
                    </b-form-group>
                </b-col>
                <b-col md="4"> 
                    <b-form-group label="Serviço:" label-for="atendimento-servico">
                        <b-form-select id="atendimento-servico" :options="servicos" v-model="atendimento.servico" required  />
                    </b-form-group>
                </b-col>
                <b-col md="4"> 
                    <b-form-group label="Especialidade:" label-for="atendimento-especialidade">
                        <b-form-select id="atendimento-especialidade" :options="especialidades" v-model="atendimento.especialidade" required  />
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
                    <b-button router-link to="/atendimentos" size='lg' class="mb-2" block>Cancelar</b-button>
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
import { baseApiUrl, showError} from "@/global";
import axios from "axios";

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
                { key: "codigo", label: "Código", sortable: true },
                { key: "nome", label: "Nome", sortable: true },
                { key: "datanasc", label: "Data Nasc." },
                { key: "convenio", label: "Convênio" },
                { key: "matricula", label: "Matricula" },
            ],
            page: 1,
            limit: 0,
            count: 0,
            totalRows: 1,
            currentPage: 1,
            perPage: 5,
            filter: null,
            sortBy: 'codigo',
        }
    },
    methods: {
        reset(){
            this.mode = 'save'
            this.atendimento = {}
        },

        save() {
            const method = this.atendimento.codigo ? 'put' : 'post'
            const codigo = this.atendimento.codigo ? `/${this.atendimento.codigo}` : ''
            axios[method](`${baseApiUrl}/atendimentos${codigo}`, this.atendimento)
            .then(() => {
                this.$toasted.global.defaultSuccess()
                this.reset()
                })
                .catch(showError)
            },
        remove() {
            const codigo = this.atendimento.codigo
            axios.delete(`${baseApiUrl}/atendimentos/${codigo}`)
            .then(() => {
                this.$toasted.global.defaultSuccess()
                })
                .catch(showError)
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

        loadMedicos() {
            const url = `${baseApiUrl}/medicos`;
            axios.get(url).then((res) => {
            this.medicos = res.data.map(medico => {
                return{value: medico.nome, text: `${medico.nome}` }
            })
            })
        },

        loadServicos() {
            const url = `${baseApiUrl}/servicos`;
            axios.get(url).then((res) => {
            this.servicos = res.data.map(servico => {
                return{value: servico.servico, text: `${servico.servico}` }
            })
            })
        },

        loadConvenios() {
            const url = `${baseApiUrl}/convenios`;
            axios.get(url).then((res) => {
            this.convenios = res.data.map(convenio => {
                return{value: convenio.convenio, text: `${convenio.convenio}` }
            })
            })
        },

        loadEspecialidades() {
            const url = `${baseApiUrl}/especialidades`;
            axios.get(url).then((res) => {
            this.especialidades = res.data.map(especialidade => {
                return{value: especialidade.especialidade, text: `${especialidade.especialidade}` }
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
        this.loadPacientes()
        this.loadMedicos()
        this.loadServicos()
        this.loadConvenios()
        this.loadEspecialidades()
    }

   

}
</script>

<style>

</style>