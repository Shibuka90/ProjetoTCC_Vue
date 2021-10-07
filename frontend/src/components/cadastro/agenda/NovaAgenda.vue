<template>
    <div class="novaagenda">
        <PageTitle icon="fas fa-calendar-alt" main="Nova Agenda" sub="Cdastro da Agenda" />

        <div class="form">
            <b-form>
                <input id="agenda-codigo" type="hidden" v-model="medico.codigo">
                <b-row>
                    <b-col md="auto">
                        <b-form-group label="Código Médico:" label-for="agenda-codigomedico">
                            <b-form-input id="agenda-codigomedico" type="text" v-model="medico.codigo" required
                            readonly />
                        </b-form-group>
                    </b-col>
                    <b-col md="6">
                        <b-form-group label="Medico:" label-for="agenda-medico">
                            <b-form-input id="agenda-medico"   v-model="medico.nome" required  />
                        </b-form-group>
                    </b-col>
                    <b-col md="auto">
                        <b-button v-b-modal.modal-center> Teste</b-button>
                         <b-modal id="modal-center" centered scrollable size="xl" title="Médicos">
                              <b-form-group label="Pesquisar:" label-for="filtro-medico">
                                <b-form-input id="filtro-medico" v-model="filter" autofocus  size="lg" type="search" placeholder="Digite para filtrar...."></b-form-input>
                             </b-form-group>
                            <b-table hover striped :items="medicos" :fields="fields" :filter="filter" @filtered="onFiltered" @row-clicked="loadMedico" :sort-by.sync="sortBy">
                                <template slot="actions"> </template>
                            </b-table>
                        <b-pagination size="md" v-model="currentPage" :total-rows="totalRows" :per-page="perPage" />
                        </b-modal>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col md="auto">
                        <b-form-group label="Tempo de Atendimento:" label-for="agenda-tempodeatendimento">
                            <b-form-input id="agenda-tempodeatendimento" type="text" v-model="agenda.tempodeatendimento" required 
                             placeholder="Informe o Tempo de Atendimento"/>
                        </b-form-group>
                    </b-col>
                    <b-col md="auto">
                        <b-form-group label="Hora Inicial:"  label-for="agenda-horainicial">
                            <b-form-input id="agenda-horainicial" type="text" v-model="agenda.horainicial" required 
                             placeholder="Informe a Hora Inicial"/>
                        </b-form-group>
                    </b-col>
                    <b-col md="auto">
                        <b-form-group label="Hora Final:"  label-for="agenda-horafinal">
                            <b-form-input id="agenda-horafinal" type="text" v-model="agenda.horafinal" required 
                             placeholder="Informe a Hora Final"/>
                        </b-form-group>
                    </b-col>
                    <b-col md="auto">
                        <b-form-group label="Intervalo Inicial:"  label-for="agenda-intervaloinicial">
                            <b-form-input id="agenda-intervaloinicial" type="text" v-model="agenda.intervaloinicial" required 
                             placeholder="Informe a Intervalo Inicial"/>
                        </b-form-group>
                    </b-col>
                    <b-col md="auto">
                        <b-form-group label="Intervalo Final:"  label-for="agenda-intervalofinal">
                            <b-form-input id="agenda-intervalofinal" type="text" v-model="agenda.intervalofinal" required 
                             placeholder="Informe a Intervalo Final"/>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                     <b-col md="auto">
                        <b-form-group label="Código Serviço:" label-for="agenda-codigoservico">
                            <b-form-input id="agenda-codigoservico" type="text" v-model="selected" required
                            readonly />
                        </b-form-group>
                    </b-col>
                    <b-col md="6">
                        <b-form-group label="Servico:" label-for="agenda-servico">
                            <b-form-select id="agenda-servico" :options="servicos" v-model="selected" required  />
                        </b-form-group>
                    </b-col>
                </b-row>
            </b-form>
        </div>
    </div>
</template>

<script>
import PageTitle from '../../template/PageTitle.vue'
import { baseApiUrl} from '@/global'
import axios from 'axios'

export default {
        name: 'NovaAgenda',
        components: {PageTitle},
        data: function() {
            return {
                mode: 'save',
                agenda: {},
                agendas: [],
                medicos: [],
                medico: {},
                servico: {},
                servicos: [],
                especialidade: {},
                especialidades: [],
                selected: null,
                fields: [
                             { key: "codigo", label: "Código", sortable: true },
                             { key: "nome", label: "Nome", sortable: true },
                             { key: "email", label: "E-mail" },
                             { key: "crm", label: "CRM" },
                             { key: "especialidade", label: "Especialidade" },
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
            loadMedicos() {
                 const url = `${baseApiUrl}/medicos`;
                 axios.get(url).then((res) => {
                 this.medicos = res.data; 
                 this.count = res.data.count
                 this.limit = res.data.limit      
      });
    },
            loadMedico(medico, mode='save'){
            this.mode = mode
            this.medico = {...medico}
        },
            loadServicos() {
            const url = `${baseApiUrl}/servicos`;
            axios.get(url).then((res) => {
             this.servicos = res.data.map(servico => {
                return{value: servico.codigo, text: `${servico.servico}` }               
                })
            })
        },
            onFiltered(filteredItems) {
             // Trigger pagination to update the number of buttons/pages due to filtering
             this.totalRows = filteredItems.length
            this.currentPage = 1
         }
            
        },
        mounted(){
            this.loadMedicos()
            this.loadServicos()
        }
}
</script>

<style>

</style>