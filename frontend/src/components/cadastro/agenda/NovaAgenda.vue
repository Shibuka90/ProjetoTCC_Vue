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
                            <b-form-input id="agenda-medico"   v-model="medico.nome" required readonly />
                        </b-form-group>
                    </b-col>
                    <b-col md="auto">
                        <b-form-group label="Pesquisar" label-for="pesquisar-medico">
                            <b-button id="pesquisar-medico" v-b-modal="'modal-medico'" variant="primary"><i class="fas fa-search"></i></b-button>
                        </b-form-group>
                         <b-modal id="modal-medico" centered scrollable size="xl" title="Médicos">
                              <b-form-group label="Pesquisar:" label-for="filtro-medico">
                                <b-form-input id="filtro-medico" v-model="filter" autofocus  size="lg" type="search" placeholder="Digite para filtrar...."></b-form-input>
                             </b-form-group>
                            <b-table hover striped :items="medicos" :fields="fieldsmedicos" :filter="filter" @filtered="onFiltered" @row-clicked="loadMedico" :sort-by.sync="sortBy">
                                <template slot="actions"> </template>
                            </b-table>
                        </b-modal>
                    </b-col>
                </b-row>
                <b-row>
                     <b-col md="auto">
                        <b-form-group label="Código Especialidade:" label-for="agenda-codigoespecialidade">
                            <b-form-input id="agenda-codigoespecialidade" type="text" v-model="especialidade.codigo" required
                            readonly />
                        </b-form-group>
                    </b-col>
                    <b-col md="6">
                        <b-form-group label="Especialidade:" label-for="agenda-especialidade">
                            <b-form-input id="agenda-especialidade"   v-model="especialidade.especialidade" required readonly />
                        </b-form-group>
                    </b-col>
                     <b-col md="auto">
                        <b-form-group label="Pesquisar" label-for="pesquisar-especialidade">
                            <b-button id="pesquisar-especialidade" v-b-modal="'modal-especialidade'" variant="primary"><i class="fas fa-search"></i></b-button>
                        </b-form-group>
                         <b-modal id="modal-especialidade" centered scrollable size="xl" title="Especialidades">
                              <b-form-group label="Pesquisar:" label-for="filtro-especialidade">
                                <b-form-input id="filtro-especialidade" v-model="filter" autofocus  size="lg" type="search" placeholder="Digite para filtrar...."></b-form-input>
                             </b-form-group>
                            <b-table hover striped :items="especialidades" :fields="fieldsespecialidades" :filter="filter" @filtered="onFiltered" @row-clicked="loadEspecialidade" :sort-by.sync="sortBy">
                                <template slot="actions"> </template>
                            </b-table>
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
                            <b-form-input id="agenda-horainicial" type="time" v-model="agenda.horainicial" required />
                        </b-form-group>
                    </b-col>
                    <b-col md="auto">
                        <b-form-group label="Hora Final:"  label-for="agenda-horafinal">
                            <b-form-input id="agenda-horafinal" type="time" v-model="agenda.horafinal" require />
                        </b-form-group>
                    </b-col>
                    <b-col md="auto">
                        <b-form-group label="Intervalo Inicial:"  label-for="agenda-intervaloinicial">
                            <b-form-input id="agenda-intervaloinicial" type="time" v-model="agenda.intervaloinicial" required />
                        </b-form-group>
                    </b-col>
                    <b-col md="auto">
                        <b-form-group label="Intervalo Final:"  label-for="agenda-intervalofinal">
                            <b-form-input id="agenda-intervalofinal" type="time" v-model="agenda.intervalofinal" required />
                        </b-form-group>
                    </b-col>
                    <b-col md="auto">
                        <b-form-group label="Semana:" label-fro="agenda-semana">
                            <b-form-checkbox-group id="agenda-semana" >
                                <b-form-checkbox value="domingo" @checked="desabilitarDomingo">Dom</b-form-checkbox>
                                <b-form-checkbox value="segunda">Seg</b-form-checkbox>
                                <b-form-checkbox value="terca">Ter</b-form-checkbox>
                                <b-form-checkbox value="quarta">Qua</b-form-checkbox>
                                <b-form-checkbox value="quinta">Qui</b-form-checkbox>
                                <b-form-checkbox value="sexta">Sex</b-form-checkbox>
                                <b-form-checkbox value="sabado">Sab</b-form-checkbox>
                            </b-form-checkbox-group>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <b-calendar locale="en"></b-calendar>
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
                especialidade: {},
                especialidades: [],
                selected: null,
                fieldsmedicos: [
                             { key: "codigo", label: "Código", sortable: true },
                             { key: "nome", label: "Nome", sortable: true },
                             { key: "email", label: "E-mail" },
                             { key: "crm", label: "CRM" },
                             { key: "especialidade", label: "Especialidade" },
                        ],
                fieldsespecialidades: [
                            { key: "codigo", label: "Código", sortable: true},
                            { key: "especialidade", label: "Especialidades"},
                            { key: "actions", label: "Ações"},
             ],
                 sortBy: 'codigo',
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

            loadEspecialidades(){
                const url = `${baseApiUrl}/especialidades`;
                axios.get(url).then((res) => {
                    this.especialidades = res.data;
                    this.count = res.data.count;
                    this.limit = res.data.limit;
                    })
                },
            
            loadEspecialidade(especialidade, mode='save'){
                this.mode = mode
                this.especialidade = {...especialidade}
                },
                
            onFiltered(filteredItems) {
                this.totalRows = filteredItems.length
                this.currentPage = 1
                },
            desabilitarDomingo(ymd,date){
                const domingo = date.getDay()
                return domingo === 0
            }

        },
        mounted(){
            this.loadMedicos()
            this.loadEspecialidades()
        }
}
</script>

<style>

</style>