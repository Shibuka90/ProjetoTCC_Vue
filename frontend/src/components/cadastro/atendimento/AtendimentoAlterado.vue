<!--Página de alteração do cadastro do atendimento caso haja necessidade-->

<template>
<!-- titulo da página -->
<div class="atendimentoalterado">
    <PageTitle icom="fas fa-address-book" main="Atendimentos" sub="Cadastro do Atendimento" />

    <!-- início do formulário do cadastro do paciente -->
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
                    <b-button router-link to="/atendimentos" size='lg' class="mb-2" block>Voltar/Cancelar</b-button>
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
import PageTitle from "../../template/PageTitle.vue" // Importa o layout do titulo da página
import { baseApiUrl, showError } from '@/global' // Importa as configuração de acesso para página e mensagens
import axios from 'axios' // Importa as configurações do AXIOS

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
        }
    },
    methods: {

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

        //Da alta (saída) somente do Atendimento
        remove() {
            const codigoatend = this.atendimento.codigoatend
            axios.delete(`${baseApiUrl}/atendimentos/${codigoatend}`)
            .then(() => {
                this.$toasted.global.defaultSuccess()
                })
                .catch(showError)
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
        
        //Traz as informações do Atendimento a partir do CODGIO DO ATENDIMENTO
        getAtendimento(){
            const url = `${baseApiUrl}/atendimentos/${this.atendimento.codigoatend}`
             axios(url).then(res => this.atendimento = res.data)
            },
    },
    //Clico de Vida -> Renderização
    mounted(){
        this.atendimento.codigoatend = this.$route.params.codigoatend //Rota para a página do Atendimento
        this.getAtendimento()//Carrega as informações do Atendimento para a página
        this.loadMedicos()//Carrega as informações para opções de Médicos FORM-SELECT
        this.loadServicos()//Carrega as informações para opções de Serviços FORM-SELECT 
        this.loadEspecialidades()//Carrega as informações para opções de Especialidades FORM-SELECT
    }
}
</script>

<style>

</style>