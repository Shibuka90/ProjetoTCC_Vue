<!--Página de cadastro do Atendimento -->

<template>
<!-- titulo da página -->
<div class="novopronturario">
      <PageTitle icon="fa fa-first-aid" main="Prontuários" sub="Abertura de Prontuario" />

     <!-- início do formulário do cadastro do atendimento --> 
    <div class="form">
        <b-form>
            <input type="hidden" id="prontuario-codigo" v-model="prontuario.codigopront" />
            <b-row>
                <b-col md="2">
                    <b-form-group label="Pesquisar:" label-for="pesquisar-prontuario"> 
                        <b-button v-b-modal="'modal-prontuarios'" variant="primary" block><i class="fas fa-search">Atendimentos</i></b-button>  
                    </b-form-group>                  
                </b-col>
                    <b-modal id="modal-prontuarios"  centered size="xl" title="Atendimentos" @ok="resetFilter">
                        <b-row>
                            <b-col md="8">
                                <b-form-group label="Pesquisar:" label-for="filtro-atendimento">
                                    <b-form-input id="filtro-atendimento" v-model="filter" autofocus size="lg" type="search" placeholder="Digite para filtrar...."></b-form-input>
                                </b-form-group>                    
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col md="auto">
                                <b-form-group label="Códgio" label-for="atendimento-codigo">
                                    <b-form-input id="atendimento-codigo" v-model="atendimento.codigoatend" readonly size="lg" type="text" ></b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col md="8">
                                <b-form-group label="Atendimento" label-for="atendimento-paciente">
                                    <b-form-input id="atendimento-paciente" v-model="atendimento.nomepaciente" readonly size="lg" type="text" ></b-form-input>
                                </b-form-group>
                            </b-col>
                        </b-row>                  
                        <b-table hover striped :items="atendimentos" :fields="fields" :filter="filter" @filtered="onFiltered" @row-clicked="loadAtendimento" :sort-by.sync="sortBy" />
                    </b-modal>
                <b-col md="auto">
                    <b-form-group label="Código Atendimento:" label-for="prontuario-codigoatendimento">
                        <b-form-input id="prontuario-codigoatendimento" type="text" :value="atendimento.codigoatend" @blur="prontuario.codatendimento = $event.target.value" required></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="Paciente:" label-for="prontuario-paciente">
                        <b-form-input id="prontuario-paciente" type="text" :value="atendimento.nomepaciente" @blur="prontuario.paciente = $event.target.value" required 
                        placeholder="Informe o Nome do(a) Paciente(a)...." />
                    </b-form-group>
                </b-col>
                <b-col md="2">
                    <b-form-group label="Data:" label-for="prontuario-datadoprontuario">
                        <b-form-input id="prontuario-datadoprontuario" type="date" :value="atendimento.datadoatendimento" @blur="prontuario.datadoprontuario = $event.target.value" required ></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="4"> 
                    <b-form-group label="Médico:" label-for="prontuario-medico">
                            <b-form-input type="text" id="prontuario-medico" :value="atendimento.medico" @blur="prontuario.medico = $event.target.value" required  />
                    </b-form-group>
                </b-col>
                <b-col md="2">
                    <b-form-group label="Convênio:" label-for="prontuario-convenio">
                        <b-form-input id="prontuario-convenio" :value="atendimento.convenio" @blur="prontuario.convenio = $event.target.value" required  />
                    </b-form-group>
                </b-col>
                <b-col md="2">
                    <b-form-group label="Especialidade:" label-for="prontuario-especialidade">
                        <b-form-input id="prontuario-especialidade" :value="atendimento.especialidade" @blur="prontuario.especialidade = $event.target.value" required  />
                    </b-form-group>
                </b-col>
                <b-col md="2">
                    <b-form-group label="Serviço:" label-for="prontuario-servico">
                        <b-form-input id="prontuario-servico" :value="atendimento.servico" @blur="prontuario.servico = $event.target.value" required  />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="12">
                    <b-form-group label="Relatório:" label-for="prontuario-relatorio">
                        <VueEditor v-model="prontuario.relatorio" placeholder="Relatar o atendimento...." />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
               <b-col md="6">
                    <b-button router-link to="/prontuarios" size='lg' class="mb-2" block>Cancelar</b-button>
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
import { VueEditor } from "vue2-editor"

export default {
    name: "NovoProntuario",
    components: {PageTitle, VueEditor},
    data: function() {
        return{
            prontuario: {},
            prontuarios: [],
            atendimento: {},
            atendimentos: [],
            fields: [
                { key: "codigoatend", label: "Código", sortable: true},
                { key: "datadoatendimento", label: "Data do Atend.", sortable: true},
                { key: "alta", label: "Alta", sortable: true},
                { key: "nomepaciente", label: "Paciente", sortable: true},
                { key: "medico", label:"Médico"},
                { key: "especialidade", label: "Especialidade"},
            ],
            sortBy: 'codigoatend',
            totalRows: 1,
            currentPage: 1,
            perPage: 5,
            filter: null,
       }
    },
    methods: {

        //Limpa a tela após a inclusão do Prontuário
        reset(){
            this.prontuario = {}
        },
        
        //Inclui ou Altera o Cadastro do Prontuário
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

        // Carregada as informações da Tabela Pacientes para o MODAL
        loadAtendimentos() {
            const url = `${baseApiUrl}/atendimentos`;
            axios.get(url).then((res) => {
                this.atendimentos = res.data; 
                });
            },

        //Carrega os dados do Atendimento para passar os dados para os campos Código Atendimento e Paciente
        loadAtendimento(atendimento){
            this.atendimento = {...atendimento}           
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
    mounted(){
        this.loadAtendimentos()//Carrega os dados para montar a Tabela de Atendimentos
    }

}
</script>

<style>

</style>