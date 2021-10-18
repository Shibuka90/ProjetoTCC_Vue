<template>
<div class="novopronturario">
      <PageTitle
      icon="fa fa-first-aid"
      main="Prontuários"
      sub="Abertura de Prontuario"
    />
    <div class="form">
        <input type="hidden" id="prontuario-codigo" v-model="prontuario.codigo" />
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
                                    <b-form-input id="atendimento-codigo" v-model="atendimento.codigo" readonly size="lg" type="text" ></b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col md="8">
                                <b-form-group label="Atendimento" label-for="atendimento-paciente">
                                    <b-form-input id="atendimento-paciente" v-model="atendimento.paciente" readonly size="lg" type="text" ></b-form-input>
                                </b-form-group>
                            </b-col>
                        </b-row>                  
                        <b-table hover striped :items="atendimentos" :fields="fields" :filter="filter" @filtered="onFiltered" @row-clicked="loadAtendimento" :sort-by.sync="sortBy">
                            <template slot="actions"> </template>
                        </b-table>
                    </b-modal>
                <b-col md="auto">
                    <b-form-group label="Código Atendimento:" label-for="prontuario-codigoatendimento">
                        <b-form-input id="prontuario-codigoatendimento" type="text" :value="atendimento.codigo" @blur="prontuario.codigoatendimento = $event.target.value" required></b-form-input>
                    </b-form-group>
                </b-col>
                  <b-col md="6" sm="12">
                     <b-form-group label="Paciente:" label-for="prontuario-paciente">
                    <b-form-input id="prontuario-paciente" type="text" :value="atendimento.paciente" @blur="prontuario.paciente = $event.target.value" required 
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
    </div>
</div>
  
</template>

<script>
import PageTitle from '../../template/PageTitle.vue'
import { VueEditor } from "vue2-editor"
import { baseApiUrl, showError} from "@/global";
import axios from "axios";

export default {
    name: "NovoProntuario",
    components: {PageTitle, VueEditor},
    data: function() {
        return{
            mode: "save",
            prontuario: {},
            prontuarios: [],
            atendimento: {},
            atendimentos: [],
            fields: [
                { key: "codigo", label: "Código", sortable: true},
                { key: "datadoatendimento", label: "Data do Atend.", sortable: true},
                { key: "alta", label: "Alta", sortable: true},
                { key: "paciente", label: "Paciente", sortable: true},
                { key: "medico", label:"Médico"},
                { key: "especialidade", label: "Especialidade"},
            ],
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

        loadAtendimentos() {
            const url = `${baseApiUrl}/atendimentos`;
            axios.get(url).then((res) => {
                this.atendimentos = res.data; 
                this.count = res.data.count
                this.limit = res.data.limit 
                });
            },

        loadAtendimento(atendimento, mode='save'){
            this.mode = mode
            this.atendimento = {...atendimento}           
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
        this.loadAtendimentos()
    }

}
</script>

<style>

</style>