<template>
<div class="pronturarioalterado">
      <PageTitle
      icon="fa fa-first-aid"
      main="Prontuários"
      sub="Prontuario do"
    />
    <div class="form">
        <input type="hidden" id="prontuario-codigo" v-model="prontuario.codigo" />
        <b-row>
            <b-col md="auto">
                <b-form-group label="Código Atendimento:" label-for="prontuario-codigoatendimento">
                    <b-form-input id="prontuario-codigoatendimento" v-model="prontuario.codigoatendimento" readonly></b-form-input>
                </b-form-group>
            </b-col>
            <b-col md="6">
                <b-form-group label="Paciente:" label-for="prontuario-paciente">
                    <b-form-input id="prontuario-paciente" v-model="prontuario.paciente" readonly></b-form-input>
                </b-form-group>
            </b-col>
            <b-col md="2">
                <b-form-group label="Data:" label-for="prontuario-datadoprontuario">
                    <b-form-input id="prontuario-datadoprontuario" type="date" v-model="prontuario.datadoprontuario" readonly required ></b-form-input>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col md="4"> 
                <b-form-group label="Médico:" label-for="prontuario-medico">
                    <b-form-input type="text" id="prontuario-medico" v-model="prontuario.medico" readonly required  />
                </b-form-group>
            </b-col>
            <b-col md="2">
                <b-form-group label="Convênio:" label-for="prontuario-convenio">
                     <b-form-input id="prontuario-convenio" v-model="prontuario.convenio" readonly required  />
                </b-form-group>
             </b-col>
            <b-col md="2">
                <b-form-group label="Especialidade:" label-for="prontuario-especialidade">
                    <b-form-input id="prontuario-especialidade" v-model="prontuario.especialidade" readonly required  />
             </b-form-group>
            </b-col>
            <b-col md="2">
                <b-form-group label="Serviço:" label-for="prontuario-servico">
                    <b-form-input id="prontuario-servico" v-model="prontuario.servico" readonly required  />
                </b-form-group>
            </b-col>
        </b-row>
         <b-row>
            <b-col md="12">
                <b-form-group label="Relatório:" label-for="prontuario-relatorio">
                    <VueEditor v-model="prontuario.relatorio"  placeholder="Relatar o atendimento...." />
                </b-form-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col md="4">
                <b-button router-link to="/prontuarios" size='lg' class="mb-2" block>Cancelar</b-button>
            </b-col>
            <b-col md="2">
                <b-button variant="danger" size='lg' class="mb-2" block @click="remove" router-link to="/prontuarios">Excluir</b-button>
            </b-col>
            <b-col md="6">
                <b-button variant="success" size='lg' class="mb-2" block  @click="save" router-link to="/prontuarios">Alterar</b-button>
            </b-col>
        </b-row> 
    </div>
</div>
  
</template>

<script>
import PageTitle from '../../template/PageTitle.vue'
import { VueEditor } from "vue2-editor"
import { baseApiUrl, showError} from "@/global";
import axios from "axios";

export default {
    name: "ProntuarioAlterado",
    components: {PageTitle, VueEditor },
    data: function() {
        return{
            mode: "save",
            prontuario: {},
            prontuarios: [],
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
        reset(){
            this.mode = 'save'
            this.atendimento = {}
        },

        save() {
            const method = this.prontuario.codigo ? 'put' : 'post'
            const codigo = this.prontuario.codigo ? `/${this.prontuario.codigo}` : ''
            axios[method](`${baseApiUrl}/prontuarios${codigo}`, this.prontuario)
            .then(() => {
                this.$toasted.global.defaultSuccess()
                this.reset()
                })
                .catch(showError)
            },

        remove() {
            const codigo = this.prontuario.codigo
            axios.delete(`${baseApiUrl}/prontuarios/${codigo}`)
            .then(() => {
                this.$toasted.global.defaultSuccess()
                })
                .catch(showError)
            },

        getProntuario(){
            const url = `${baseApiUrl}/prontuarios/${this.prontuario.codigo}`
             axios(url).then(res => this.prontuario = res.data)
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
        this.prontuario.codigo = this.$route.params.codigo
        this.getProntuario()
       
      
        
    }

}
</script>

<style>

</style>