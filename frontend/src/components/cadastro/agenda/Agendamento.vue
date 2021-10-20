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
                    <b-col md="4">
                        <b-form-group label="Médico" label-for="agenda-medico">
                            <b-form-input input type="text" id="agenda-medico" v-model="agenda.medico" readonly  class="mb-4 "></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col md="4">
                        <b-form-group label="Especialidade" label-for="agenda-especialidade">
                            <b-form-input input type="text" id="agenda-especialidade" v-model="agenda.especialidade" readonly  class="mb-4 "></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col md="2">
                        <b-button v-b-modal="'modal-agendas'" variant="primary" size="lg" class="mt-4" block><i class="fas fa-search"> Agendas</i></b-button>                   
                </b-col>
                    <b-modal id="modal-agendas" centered size="xl" title="Agendas" @ok="resetFilter">
                        <b-row>
                            <b-col md="12">
                                <b-form-group label="Pesquisar:" label-for="filtro-agenda">
                                    <b-form-input id="filtro-agenda" v-model="filter" autofocus type="search" placeholder="Digite para filtrar...."></b-form-input>
                            </b-form-group>                    
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col md="2">
                                <b-form-group label="Códgio" label-for="agenda-codigo">
                                    <b-form-input id="agenda-codigo" v-model="agenda.codigo" readonly size="lg" type="text" ></b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col md="8">
                                <b-form-group label="Médicos" label-for="agenda-medico">
                                    <b-form-input id="agenda-medico" v-model="agenda.medico" readonly size="lg" type="text" ></b-form-input>
                                </b-form-group>
                            </b-col>
                        </b-row>                  
                        <b-table hover striped :items="agendas" :fields="fields" :filter="filter" @filtered="onFiltered" @row-clicked="loadAgenda" :sort-by.sync="sortBy">
                            <template slot="actions"> </template>
                        </b-table>
                    </b-modal>
                    <b-row>
                        <b-col md="2">
                            <b-form-group label="Hora Inicial" label-for="agenda-horainicial">
                                <b-form-input id="agenda-horainicial" v-model="agenda.horainicial" readonly  type="text" ></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col md="2">
                            <b-form-group label="Hora Final" label-for="agenda-horafinal">
                                    <b-form-input id="agenda-horafinal" v-model="agenda.horafinal" readonly  type="text" ></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col md="2">
                            <b-form-group label="Intervalo Inicial" label-for="agenda-intervaloinicial">
                                <b-form-input id="agenda-intervaloinicial" v-model="agenda.intervaloinicial" readonly  type="text" ></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col md="2">
                            <b-form-group label="Intervalo Final" label-for="agenda-intervalofinal">
                                <b-form-input id="agenda-intervalofinal" v-model="agenda.intervalofinal" readonly  type="text" ></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col md="2">
                            <b-form-group label="Tempo de Atendimento" label-for="agenda-tempodeatendimento">
                                <b-form-input id="agenda-tempodeatendimento" v-model="agenda.tempodeatendimento" readonly  type="text" ></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col md="2">
                        <b-button variant="primary" class="mt-4" size="lg" router-link to="/novoagendamento">Novo Agendamento</b-button>

                        </b-col>
                    </b-row>
                </b-row>
            </b-form>
            <hr>
            <b-row>
                <b-col md="2">
                    <template>
                        <div>
                            <label for="example-datepicker">Choose a date</label>
                                <b-form-datepicker id="example-datepicker" v-model="agendamento.dataagendamento" class="mb-2"></b-form-datepicker>
                        </div>
                    </template>
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
            mode: "save",
            agenda: {},
            agendas: [],
            agendamento: {},
            agendamentos: [],
            fields: [
                { key: "codigo", label: "Código", sortable: true},
                { key: "medico", label: "Médico", sortable: true},
                { key: "especialidade", label: "Especialidade", sortable: true},
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

        loadAgendas() {
            const url = `${baseApiUrl}/agendas`;
            axios.get(url).then((res) => {
                this.agendas = res.data; 
                this.count = res.data.count
                this.limit = res.data.limit 
                });
            },
        
        loadAgenda(agenda, mode='save'){
            this.mode = mode
            this.agenda = {...agenda}
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
    }

}
</script>

<style>

</style>