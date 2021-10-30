<template>
    <div class="agendamentos">
        <PageTitle icon="far fa-calendar-alt" main="Agendamentos"/>
        <div class="pesquisa">
            <b-form>
                <b-row>
                     <b-col md="2">
                        <b-button router-link to="/" class="fa fa-home mr-4 mb-4 mt-4" variant="info" size="lg"></b-button>
                        <b-button router-link to="/homeagendamento"  size="lg" class="mb-4 mt-4"><i class="fas fa-arrow-left"></i> Voltar</b-button> 
                    </b-col>
                    <b-col md="2">
                        <b-form-group label="Código" label-for="agendamento-codigo">
                            <b-form-input input type="text" id="agendamento-codigo" v-model="agendamento.codigo" readonly  class="mb-4 "></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col md="4">
                        <b-form-group label="Agendamento" label-for="agenda-agendamento">
                            <b-form-input input type="text" id="agenda-agendamento" v-model="agendamento.agenda" readonly  class="mb-4 "></b-form-input>
                        </b-form-group>
                    </b-col>
                        <b-col md="4">
                        <b-button variant="primary" class="mt-4 ml-2 mr-2" size="lg" router-link to="/novoagendamento">Novo</b-button>
                        <b-button v-if="agendamento.agenda" class="mt-4" @click="getAgendamento" router-link :to="'/agendamentos/' + this.agendamento.codigo" size="lg" variant="danger">Alterar/Excluir</b-button>
                        </b-col>
                    </b-row>
            </b-form>
            <hr>
            <b-row>
                <b-col md="6">
                    <b-form-group label="Pesquisar:" label-for="filtro-agendamento">
                        <b-form-input id="filtro-agendamento" v-model="filter" autofocus  size="lg" type="search" placeholder="Digite para filtrar...."></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col md="4">
                    <template>
                        <div>
                            <label for="dataagendamento-datepicker">Escolha a Data</label>
                                <b-form-datepicker id="dataagendamento-datepicker" v-model="filter" size="lg"  class="mb-2" locale="pt"></b-form-datepicker>
                        </div>
                    </template>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-table hover striped :items="agendamentos" :fields="fieldsAgen" :filter="filter" @filtered="onFiltered" @row-clicked="loadAgendamento" :sort-by.sync="sortAgen">
                            <template slot="actions"> </template>
                        </b-table>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script>
import PageTitle from '../../template/PageTitle.vue'
import { baseApiUrl} from "@/global";
import axios from "axios";

export default {
    name:"Agendamento",
    components: {PageTitle},
    data: function() {
        return{
            agenda: {},
            agendas: [],
            agendamento: {},
            agendamentos: [],
            fieldsMed: [
                { key: "codigoag", label: "Código", sortable: true},
                { key: "medico", label: "Agenda", sortable: true},
                { key: "especialidade", label: "Especialidade"},
            ],
            fieldsAgen: [
                { key: "codigo", label: "Código Agend.", sortable: true},
                { key: "agenda", label: "Agenda", sortable: true},
                { key: "paciente", label: "Paciente"},
                { key: "dataagendamento", label: "Data"},
                { key: "horario", label: "Horário"},
                { key: "servico", label: "Serviço"},
            ],
            sortAg: 'codigoag',
            sortAgen: 'codigo',
            totalRows: 1,
            currentPage: 1,
            perPage: 5,
            filter: null,
        }
    },
    methods: {

        loadAgendas() {
            const url = `${baseApiUrl}/agendas`;
            axios.get(url).then((res) => {
                this.agendas = res.data; 
                });
            },
        
        loadAgenda(agenda){
            this.agenda = {...agenda}
            },

        loadAgendamentos() {
            const url = `${baseApiUrl}/agendamentos`;
            axios.get(url).then((res) => {
                this.agendamentos = res.data; 
                });
            },
        
        loadAgendamento(agendamento){
            this.agendamento = {...agendamento}
            },

        getAgendamento(){
            const url = `${baseApiUrl}/agendamentos/${this.agendamento.codigo}`
            axios(url).then(res => this.agendamento = res.data)
            },
        
        onFiltered(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length
            this.currentPage = 1
            },

        resetFilter(){
             this.filter = null
             },
    },
    watch: {
        page() {
            this.loadAgendas()
        }
    },
    mounted(){
        this.loadAgendas()
        this.loadAgendamentos()
    }

}
</script>

<style>

</style>