import Vue from "vue"
import VueRouter from 'vue-router'

import Home from '@/components/home/Home'

import HomeCadastro from '@/components/home/HomeCadastro'
import Pacientes from '@/components/cadastro/paciente/Pacientes'
import NovoPaciente from '@/components/cadastro/paciente/NovoPaciente'
import PacienteAlterado from '@/components/cadastro/paciente/PacienteAlterado'
import NovoPacienteAtendimento from '@/components/cadastro/paciente/NovoPacienteAtendimento'

import Usuarios from '@/components/cadastro/usuario/Usuarios'
import NovoUsuario from '@/components/cadastro/usuario/NovoUsuario'
import UsuarioAlterado from '@/components/cadastro/usuario/UsuarioAlterado'
import NovoUsuarioAuth from '@/components/cadastro/usuario/NovoUsuarioAuth'

import Especialidades from '@/components/cadastro/especialidade/Especialidades'

import Servicos from '@/components/cadastro/servico/Servico'

import Convenios from '@/components/cadastro/convenio/Convenio'

import Medicos from '@/components/cadastro/medico/Medico'
import NovoMedico from '@/components/cadastro/medico/NovoMedico'
import MedicoAlterado from '@/components/cadastro/medico/MedicoAlterado'

import HomeAgendamento from '@/components/home/HomeAgendamento'
import Agendas from '@/components/cadastro/agenda/Agenda'
import AgendaAlterada from '@/components/cadastro/agenda/AgendaAlterada'
import NovaAgenda from '@/components/cadastro/agenda/NovaAgenda'
import Agendamento from '@/components/cadastro/agenda/Agendamento'

import HomeAtendimento from '@/components/home/HomeAtendimento'
import Atendimentos from '@/components/cadastro/atendimento/Atendimento'
import NovoAtendimento from '@/components/cadastro/atendimento/NovoAtendimento'
import AtendimentoAlterado from '@/components/cadastro/atendimento/AtendimentoAlterado'

import HomePronturario from '@/components/home/HomeProntuario'
import Prontuarios from '@/components/cadastro/prontuario/Prontuario'
import NovoProntuario from '@/components/cadastro/prontuario/NovoProntuario'
import ProntuarioAlterado from '@/components/cadastro/prontuario/ProntuarioAlterado'

import Auth from '@/components/auth/Auth'

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
    name: 'novousuarioatuh',
    path: '/novousuarioauth',
    component: NovoUsuarioAuth
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
    name: 'novaagenda',
    path: '/novaagenda',
    component: NovaAgenda
},{
    name: 'agendaalterada',
    path: '/agendas/:codigo',
    component: AgendaAlterada
},{
    name: 'agendamento',
    path: '/agendamentos',
    component: Agendamento
},{
    name: 'homeatendimento',
    path: '/homeatendimento',
    component: HomeAtendimento
},  {
    name:'atendimentos',
    path:'/atendimentos',
    component:Atendimentos
}, {
    name: 'novoatendimento',
    path: '/novoatendimento',
    component: NovoAtendimento
}, {
    name: 'atendimentoalterado',
    path: '/atendimentos/:codigo',
    component: AtendimentoAlterado
}, {
    name: 'novopacienteatendimento',
    path: '/novopacienteatendimento',
    component: NovoPacienteAtendimento
}, {
    name: 'auth',
    path: '/auth',
    component: Auth
}, {
    name: 'homeprontuario',
    path: '/homeprontuario',
    component: HomePronturario
}, {
    name: 'prontuario',
    path: '/prontuarios',
    component: Prontuarios
}, {
    name: 'novoprontuario',
    path: '/novoprontuario',
    component: NovoProntuario
}, {
    name: 'prontuarioalterado',
    path: '/prontuarios/:codigo',
    component: ProntuarioAlterado
}
]

export default new VueRouter({
    mode: 'history',
    routes
})

