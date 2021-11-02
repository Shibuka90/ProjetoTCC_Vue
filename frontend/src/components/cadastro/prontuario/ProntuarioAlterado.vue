<!--Página de alteração do cadastro do prontuário caso haja necessidade-->

<template>
<!-- titulo da página -->
<div class="pronturarioalterado">
      <PageTitle icon="fa fa-first-aid" main="Prontuários" sub="Prontuario do" />

      <!-- início do formulário do cadastro do prontuário -->
    <div class="form">
        <b-form>
            <input type="hidden" id="prontuario-codigo" v-model="prontuario.codigopront" />
            <b-row>
                <b-col md="auto">
                    <b-form-group label="Código Atendimento:" label-for="prontuario-codigoatendimento">
                        <b-form-input id="prontuario-codigoatendimento" v-model="prontuario.codatendimento" readonly></b-form-input>
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
                    <b-button router-link to="/prontuarios" size='lg' class="mb-2" block>Voltar/Cancelar</b-button>
                </b-col>
                <b-col md="2">
                    <b-button variant="danger" size='lg' class="mb-2" block @click="remove" router-link to="/prontuarios">Excluir</b-button>
                </b-col>
                <b-col md="6">
                    <b-button variant="success" size='lg' class="mb-2" block  @click="save" router-link to="/prontuarios">Alterar</b-button>
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
import { VueEditor } from "vue2-editor" //Importa as configurações para gerar o Editor de Texto

export default {
    name: "ProntuarioAlterado",
    components: {PageTitle, VueEditor },
    data: function() {
        return{
            prontuario: {},
            prontuarios: [],             
       }
    },
    methods: {

         //Inclui ou Altera o Cadastro do Protuário
        save() {
            const method = this.prontuario.codigopront ? 'put' : 'post'
            const codigopront = this.prontuario.codigopront ? `/${this.prontuario.codigopront}` : ''
            axios[method](`${baseApiUrl}/prontuarios${codigopront}`, this.prontuario)
            .then(() => {
                this.$toasted.global.defaultSuccess()
                this.reset()
                })
                .catch(showError)
            },

        //Remove somente o Prontuário
        remove() {
            const codigopront = this.prontuario.codigopront
            axios.delete(`${baseApiUrl}/prontuarios/${codigopront}`)
            .then(() => {
                this.$toasted.global.defaultSuccess()
                })
                .catch(showError)
            },

        //Traz as informações do Prontuário a partir do CODGIO DO PRONTUÁRIO
        getProntuario(){
            const url = `${baseApiUrl}/prontuarios/${this.prontuario.codigopront}`
             axios(url).then(res => this.prontuario = res.data)
            },
    },

    //Clico de Vida -> Renderização
    mounted(){
        this.prontuario.codigopront = this.$route.params.codigopront//Rota para a página do Prontuário
        this.getProntuario()//Carrega as informações do Prontuário para a página
       
      
        
    }

}
</script>

<style>

</style>