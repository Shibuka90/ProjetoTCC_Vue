<template>
<div class="atendimentoalterado">
    <PageTitle icom="fas fa-address-book" main="Atendimentos" sub="Cadastro do Atendimento" />
    <div class="form">
        <b-form>
            <input type="hidden" id="atendimento-codigo" v-model="atendimento.codigo">
            <b-row>
                <b-col md="auto">
                    <b-form-group label="Código Paciente :" label-for="atendimento-codigopaciente">    
                        <b-form-input id="atendimento-codigopaciente" type="text" v-model="atendimento.codigopaciente" required readonly/>
                </b-form-group>
                </b-col>
                   <b-col md="6" sm="12">
                     <b-form-group label="Paciente:" label-for="atendimento-paciente">
                    <b-form-input id="atendimento-paciente" type="text" v-model="atendimento.paciente" readonly required 
                     placeholder="Informe o Nome do(a) Paciente(a)...." />
                </b-form-group>
                </b-col>
                 <b-col md="2">
                    <b-form-group label="Data:" label-for="atendimento-datadoatendimento">
                      <b-form-input id="atendimento-datadoatendimento" type="date" v-model="atendimento.datadoatendimento"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col md="2"> 
                    <b-form-checkbox id="atendimento" v-show="mode === 'save'" v-model="atendimento.censo" class="mt-3 mb-3">Censo</b-form-checkbox>
                </b-col>
            </b-row>
            <b-row>
                 <b-col md="4">
                    <b-form-group label="Médico:" label-for="atendimento-medico">
                      <b-form-select id="atendimento-medico" :options="medicos" v-model="atendimento.medico"></b-form-select>
                    </b-form-group>
                </b-col>
                 <b-col md="4">
                    <b-form-group label="Serviço:" label-for="atendimento-servico">
                      <b-form-select id="atendimento-servico" :options="servicos" v-model="atendimento.servico"></b-form-select>
                    </b-form-group>
                </b-col>
                 <b-col md="4">
                    <b-form-group label="Especialidade:" label-for="atendimento-especialidade">
                      <b-form-select id="atendimento-especialidade" :options="especialidades" v-model="atendimento.especialidade"></b-form-select>
                    </b-form-group>
                </b-col>
            </b-row> 
              <b-row>
                 <b-col md="4">
                    <b-form-group label="Convênio:" label-for="atendimento-convenio">
                      <b-form-select id="atendimento-convenio" :options="convenios" v-model="atendimento.convenio"></b-form-select>
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
            mode:"save",
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
            this.atenimento = {}
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

        loadEspecialidades() {
            const url = `${baseApiUrl}/especialidades`;
            axios.get(url).then((res) => {
            this.especialidades = res.data.map(especialidade => {
                return{value: especialidade.especialidade, text: `${especialidade.especialidade}` }
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
        
        getAtendimento(){
            const url = `${baseApiUrl}/atendimentos/${this.atendimento.codigo}`
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
        this.atendimento.codigo = this.$route.params.codigo
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