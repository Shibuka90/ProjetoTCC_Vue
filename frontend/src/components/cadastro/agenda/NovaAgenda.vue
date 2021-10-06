<template>
    <div class="novaagenda">
        <PageTitle icon="fas fa-calendar-alt" main="Nova Agenda" sub="Cdastro da Agenda" />

        <div class="form">
            <b-form>
                <input id="agenda-codigo" type="hidden" v-model="medico.codigo">
                <b-row>
                    <b-col md="auto">
                        <b-form-group label="Código Médico" label-for="medico-codigo">
                            <b-form-input id="medico-codigo" type="text" v-model="selected" required
                            :readonly="mode === 'remove'" />
                        </b-form-group>
                    </b-col>
                    <b-col md="6">
                        <b-form-group label="Medico" label-for="agenda-medico">
                            <b-form-select id="agenda-medico" :options="medicos" v-model="selected" required />
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
                selected: null,
            }
        },
        methods: {
            loadMedicos() {
            const url = `${baseApiUrl}/medicos`;
            axios.get(url).then((res) => {
            this.medicos = res.data.map(medico => {
                return{value: medico.codigo, text: `${medico.nome}` }
            })
            })
        },
        },
        mounted(){
            this.loadMedicos()
        }
}
</script>

<style>

</style>