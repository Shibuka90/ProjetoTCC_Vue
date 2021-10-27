<template>
<div class="atendimentoalterado">
    <PageTitle icom="fas fa-address-book" main="Atendimentos" sub="Cadastro do Atendimento" />
    <div class="form">
        <b-form>
            <input type="hidden" id="atendimento-codigo" v-model="atendimento.codigoatend">
            <b-row>
                <b-col md="auto">
                    <b-form-group label="Código Paciente :" label-for="atendimento-codigopaciente">    
                        <b-form-input id="atendimento-codigopaciente" type="text" v-model="atendimento.codpaciente" required readonly/>
                </b-form-group>
                </b-col>
                   <b-col md="6" sm="12">
                     <b-form-group label="Paciente:" label-for="atendimento-paciente">
                    <b-form-input id="atendimento-paciente" v-model="atendimento.nomepaciente" type="text"  readonly required 
                     placeholder="Informe o Nome do(a) Paciente(a)...." />
                </b-form-group>
                </b-col>
                 <b-col md="2">
                    <b-form-group label="Data:" label-for="atendimento-datadoatendimento">
                      <b-form-input id="atendimento-datadoatendimento" type="date" v-model="atendimento.datadoatendimento"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col md="2"> 
                    <b-form-checkbox id="atendimento" v-model="atendimento.censo" class="mt-4" size="lg">Censo</b-form-checkbox>
                </b-col>
            </b-row>
            <b-row>
                 <b-col md="4">
                    <b-form-group label="Médico:" label-for="atendimento-medico">
                      <b-form-select id="atendimento-medico" :options="medicos" v-model="atendimento.codmedico"></b-form-select>
                    </b-form-group>
                </b-col>
                 <b-col md="4">
                    <b-form-group label="Serviço:" label-for="atendimento-servico">
                      <b-form-select id="atendimento-servico" :options="servicos" v-model="atendimento.codservico"></b-form-select>
                    </b-form-group>
                </b-col>
                 <b-col md="4">
                    <b-form-group label="Especialidade:" label-for="atendimento-especialidade">
                      <b-form-select id="atendimento-especialidade" :options="especialidades" v-model="atendimento.codespecialidade"></b-form-select>
                    </b-form-group>
                </b-col>
            </b-row> 
              <b-row>
                 <b-col md="4">
                    <b-form-group label="Convênio:" label-for="atendimento-convenio">
                      <b-form-input id="atendimento-convenio" :options="convenios" v-model="atendimento.convenio"></b-form-input>
                    </b-form-group>
                </b-col>
                 <b-col md="4">
                    <b-form-group label="Matricula:" label-for="atendimento-matricula">
                      <b-form-input id="atendimento-matricula"  v-model="atendimento.matricula"></b-form-input>
                    </b-form-group>
                </b-col>
                 <b-col md="4">
                    <b-form-group label="Vencimento:" label-for="atendimento-vencimento">
                      <b-form-input id="atendimento-vencimento" type="date" v-model="atendimento.vencimento"></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row> 
               <b-row>
                <b-col md="4">
                <b-button router-link to="/atendimentos" size='lg' class="mb-2" block>Cancelar</b-button>
                </b-col>
                <b-col md="2">
                <b-button variant="info" size='lg' class="mb-2" block @click="remove" router-link to="/atendimentos">Alta</b-button>
                </b-col>
                <b-col md="6">
                <b-button variant="success" size='lg' class="mb-2" block  @click="save" router-link to="/atendimentos">Alterar</b-button>
                </b-col>
            </b-row>       
        </b-form>
    </div>
</div>
  
</template>

<script>
import PageTitle from '../../template/PageTitle.vue'
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'

export default {
    name:"AtendimentoAlterado",
    components: { PageTitle  },
    data: function() {
        return{
            atendimento: {},
            atenimentos: [],
            paciente: {},
            pacientes: [],
            medico:{},
            medicos: [],
            especialidades: [],
            servicos: [],
            convenios: [],
            fields: [
                { key: "codigo", label: "Código", sortable: true },
                { key: "nome", label: "Nome", sortable: true },
                { key: "datanasc", label: "Data Nasc." },
                { key: "convenio", label: "Convênio" },
                { key: "matricula", label: "Matricula" },
            ],
            totalRows: 1,
            currentPage: 1,
            perPage: 5,
            filter: null,
            sortBy: 'codigo',
        }
    },
    methods: {
        reset(){
            this.atenimento = {}
        },

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

        remove() {
            const codigoatend = this.atendimento.codigoatend
            axios.delete(`${baseApiUrl}/atendimentos/${codigoatend}`)
            .then(() => {
                this.$toasted.global.defaultSuccess()
                })
                .catch(showError)
            },


        loadPacientes() {
            const url = `${baseApiUrl}/pacientes`;
            axios.get(url).then((res) => {
                this.pacientes = res.data;      
                });
            },
        
        loadPaciente(paciente,){
            this.paciente = {...paciente}
            },

        loadMedicos() {
            const url = `${baseApiUrl}/medicos`;
            axios.get(url).then((res) => {
            this.medicos = res.data.map(medico => {
                return{value: medico.codigomed, text: `${medico.nome}` }
            })
            })
        },  

        loadServicos() {
            const url = `${baseApiUrl}/servicos`;
            axios.get(url).then((res) => {
            this.servicos = res.data.map(servico => {
                return{value: servico.codigo, text: `${servico.servico}` }
            })
            })
        },

        loadEspecialidades() {
            const url = `${baseApiUrl}/especialidades`;
            axios.get(url).then((res) => {
            this.especialidades = res.data.map(especialidade => {
                return{value: especialidade.codigo, text: `${especialidade.especialidade}` }
            })
            })
        },

        loadConvenios() {
            const url = `${baseApiUrl}/convenios`;
            axios.get(url).then((res) => {
            this.convenios = res.data.map(convenio => {
                return{value: convenio.codigo, text: `${convenio.convenio}` }
            })
            })
        },
        
        getAtendimento(){
            const url = `${baseApiUrl}/atendimentos/${this.atendimento.codigoatend}`
             axios(url).then(res => this.atendimento = res.data)
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
        this.atendimento.codigoatend = this.$route.params.codigoatend
        this.getAtendimento()
        this.loadPacientes()
        this.loadMedicos()
        this.loadServicos()
        this.loadEspecialidades()
        this.loadConvenios()
    }
}
</script>

<style>

</style>