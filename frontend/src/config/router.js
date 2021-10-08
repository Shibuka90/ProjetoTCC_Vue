import Vue from "vue"
import VueRouter from 'vue-router'

import Home from '@/components/home/Home'
import HomeCadastro from '@/components/home/HomeCadastro'
import Pacientes from '@/components/cadastro/paciente/Pacientes'
import NovoPaciente from '@/components/cadastro/paciente/NovoPaciente'
import PacienteAlterado from '@/components/cadastro/paciente/PacienteAlterado'
import Usuarios from '@/components/cadastro/usuario/Usuarios'
import NovoUsuario from '@/components/cadastro/usuario/NovoUsuario'
import UsuarioAlterado from '@/components/cadastro/usuario/UsuarioAlterado'
import Especialidades from '@/components/cadastro/especialidade/Especialidades'
import Servicos from '@/components/cadastro/servico/Servico'
import Convenios from '@/components/cadastro/convenio/Convenio'
import Medicos from '@/components/cadastro/medico/Medico'
import NovoMedico from '@/components/cadastro/medico/NovoMedico'
import MedicoAlterado from '@/components/cadastro/medico/MedicoAlterado'

import HomeAgendamento from '@/components/home/HomeAgendamento'
import Agendas from '@/components/cadastro/agenda/Agenda'
import AgendaAlterada from '@/components/cadastro/agenda/AgendaAlterada'



Vue.use(VueRouter)

const routes = [{
    name: 'home',
    path: '/',
    component: Home
}, {
    name: 'homecadastro',
    path: '/homecadastro',
    component: HomeCadastro
}, {
    name: 'paciente',
    path: '/pacientes',
    component: Pacientes
}, {
    name: 'novopaciente',
    path: '/novopaciente',
    component: NovoPaciente
}, {
    name: 'pacientealterado',
    path: '/pacientes/:codigo',
    component: PacienteAlterado
}, {
    name: 'usuario',
    path: '/usuarios',
    component: Usuarios
}, {
    name: 'novousuario',
    path: '/novousuario',
    component: NovoUsuario
}, {
    name: 'usuarioalterado',
    path: '/usuarios/:codigo',
    component: UsuarioAlterado
}, {
    name: 'especialidade',
    path: '/especialidades',
    component: Especialidades
}, {
    name: 'servico',
    path: '/servicos',
    component: Servicos
}, {
    name: 'convenio',
    path: '/convenios',
    component: Convenios
}, {
    name: 'medico',
    path: '/medicos',
    component: Medicos
},{
    name: 'novomedico',
    path: '/novomedico',
    component: NovoMedico
}, {
    name: 'medicoalterado',
    path: '/medicos/:codigo',
    component: MedicoAlterado
}, {
    name:'homeagendamento',
    path:'/homeagendamento',
    component:HomeAgendamento
}, {
    name:'agendas',
    path:'/agendas',
    component:Agendas
}, {
    name: 'agendaalterada',
    path: '/agendas/:codigo',
    component: AgendaAlterada
}]

export default new VueRouter({
    mode: 'history',
    routes
})

