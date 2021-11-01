// Arquivo de rotas do frontend

import Vue from "vue"//importa as configurações do VUE
import VueRouter from 'vue-router'//importa as configuração do VUE-ROUTER

import Home from '@/components/home/Home'//Importa as configurações da página Home para a rota da página Home

import HomeCadastro from '@/components/home/HomeCadastro'//Importa as configurações da página HomeCadasto para a rota da página HomeCadasto
import Pacientes from '@/components/cadastro/paciente/Pacientes'//Importa as configurações da página Paciente para a rota da página Paciente
import NovoPaciente from '@/components/cadastro/paciente/NovoPaciente'//Importa as configurações da página NovoPaciente para a rota da página NovoPaciente
import PacienteAlterado from '@/components/cadastro/paciente/PacienteAlterado'//Importa as configurações da página PacienteAlterado para a rota da página PacienteAlterado
import NovoPacienteAtendimento from '@/components/cadastro/paciente/NovoPacienteAtendimento'//Importa as configurações da página NovoPacienteAtendimento para a rota da página NovoPacienteAtendimento

import Usuarios from '@/components/cadastro/usuario/Usuarios'//Importa as configurações da página Usuários para a rota da página Usuários
import NovoUsuario from '@/components/cadastro/usuario/NovoUsuario'//Importa as configurações da página NovoUsuário para a rota da página NovoUsuário
import UsuarioAlterado from '@/components/cadastro/usuario/UsuarioAlterado'//Importa as configurações da página UsuárioAlterado para a rota da página UsuárioAlterado

import Especialidades from '@/components/cadastro/especialidade/Especialidades'//Importa as configurações da página Especialidades para a rota da página Especialidades

import Servicos from '@/components/cadastro/servico/Servico'//Importa as configurações da página Serviço para a rota da página Serviço

import Convenios from '@/components/cadastro/convenio/Convenio'//Importa as configurações da página Convênio para a rota da página Convênio

import Medicos from '@/components/cadastro/medico/Medico'//Importa as configurações da página Medico para a rota da página Medico
import NovoMedico from '@/components/cadastro/medico/NovoMedico'//Importa as configurações da página NovoMedico para a rota da página NovoMedico
import MedicoAlterado from '@/components/cadastro/medico/MedicoAlterado'//Importa as configurações da página MedicoAlterado para a rota da página MedicoAlterado

import HomeAgendamento from '@/components/home/HomeAgendamento'//Importa as configurações da página HomeAgendamento para a rota da página HomeAgendamento
import Agendas from '@/components/cadastro/agenda/Agenda'//Importa as configurações da página Agenda para a rota da página Agenda
import AgendaAlterada from '@/components/cadastro/agenda/AgendaAlterada'//Importa as configurações da página AgendaAlterada para a rota da página AgendaAlterada
import NovaAgenda from '@/components/cadastro/agenda/NovaAgenda'//Importa as configurações da página NovaAgenda para a rota da página NovaAgenda
import Agendamento from '@/components/cadastro/agenda/Agendamento'//Importa as configurações da página Agendamento para a rota da página Agendamento
import NovoAgendamento from '@/components/cadastro/agenda/NovoAgendamento'//Importa as configurações da página NovoAgendamento para a rota da página NovoAgendamento
import AgendamentoAlterado from '@/components/cadastro/agenda/AgendamentoAlterado'//Importa as configurações da página AgendamentoAlterado para a rota da página AgendamentoAlterado

import HomeAtendimento from '@/components/home/HomeAtendimento'//Importa as configurações da página HomeAtendimento para a rota da página HomeAtendimento
import Atendimentos from '@/components/cadastro/atendimento/Atendimento'//Importa as configurações da página Atendimento para a rota da página Atendimento
import NovoAtendimento from '@/components/cadastro/atendimento/NovoAtendimento'//Importa as configurações da página NovoAtendimento para a rota da página NovoAtendimento
import AtendimentoAlterado from '@/components/cadastro/atendimento/AtendimentoAlterado'//Importa as configurações da página AtendimentoAlterado para a rota da página AtendimentoAlterado

import HomePronturario from '@/components/home/HomeProntuario'//Importa as configurações da página HomeProntario para a rota da página HomeProntario
import Prontuarios from '@/components/cadastro/prontuario/Prontuario'//Importa as configurações da página Prontuario para a rota da página Prontuario
import NovoProntuario from '@/components/cadastro/prontuario/NovoProntuario'//Importa as configurações da página NovoProntuario para a rota da página NovoProntuario
import ProntuarioAlterado from '@/components/cadastro/prontuario/ProntuarioAlterado'//Importa as configurações da página ProntuarioAlterado para a rota da página ProntuarioAlterado

import Auth from '@/components/auth/Auth'//Importa as configurações da página Auth para a rota da página Auth

Vue.use(VueRouter)

const routes = [{
    name: 'home',//nome da rota
    path: '/',//caminho da rota
    component: Home//componente que a rota irá usar para importar as configuração da página
}, {
    name: 'homecadastro',//nome da rota
    path: '/homecadastro',//caminho da rota
    component: HomeCadastro//componente que a rota irá usar para importar as configuração da página
}, {
    name: 'paciente',//nome da rota
    path: '/pacientes',//caminho da rota
    component: Pacientes//componente que a rota irá usar para importar as configuração da página
}, {
    name: 'novopaciente',//nome da rota
    path: '/novopaciente',//caminho da rota
    component: NovoPaciente//componente que a rota irá usar para importar as configuração da página
}, {
    name: 'pacientealterado',//nome da rota
    path: '/pacientes/:codigopac',//caminho da rota
    component: PacienteAlterado//componente que a rota irá usar para importar as configuração da página
}, {
    name: 'usuario',//nome da rota
    path: '/usuarios',//caminho da rota
    component: Usuarios//componente que a rota irá usar para importar as configuração da página
}, {
    name: 'novousuario',//nome da rota
    path: '/novousuario',//caminho da rota
    component: NovoUsuario//componente que a rota irá usar para importar as configuração da página
}, {
    name: 'usuarioalterado',//nome da rota
    path: '/usuarios/:codigo',//caminho da rota
    component: UsuarioAlterado//componente que a rota irá usar para importar as configuração da página
}, {
    name: 'especialidade',//nome da rota
    path: '/especialidades',//caminho da rota
    component: Especialidades//componente que a rota irá usar para importar as configuração da página
}, {
    name: 'servico',//nome da rota
    path: '/servicos',//caminho da rota
    component: Servicos//componente que a rota irá usar para importar as configuração da página
}, {
    name: 'convenio',//nome da rota
    path: '/convenios',//caminho da rota
    component: Convenios//componente que a rota irá usar para importar as configuração da página
}, {
    name: 'medico',//nome da rota
    path: '/medicos',//caminho da rota
    component: Medicos//componente que a rota irá usar para importar as configuração da página
},{
    name: 'novomedico',//nome da rota
    path: '/novomedico',//caminho da rota
    component: NovoMedico//componente que a rota irá usar para importar as configuração da página
}, {
    name: 'medicoalterado',//nome da rota
    path: '/medicos/:codigomed',//caminho da rota
    component: MedicoAlterado//componente que a rota irá usar para importar as configuração da página
}, {
    name:'homeagendamento',//nome da rota
    path:'/homeagendamento',//caminho da rota
    component:HomeAgendamento//componente que a rota irá usar para importar as configuração da página
}, {
    name:'agendas',//nome da rota
    path:'/agendas',//caminho da rota
    component:Agendas//componente que a rota irá usar para importar as configuração da página
}, {
    name: 'novaagenda',//nome da rota
    path: '/novaagenda',//caminho da rota
    component: NovaAgenda//componente que a rota irá usar para importar as configuração da página
},{
    name: 'agendaalterada',//nome da rota
    path: '/agendas/:codigoag',//caminho da rota
    component: AgendaAlterada//componente que a rota irá usar para importar as configuração da página
},{
    name: 'agendamento',//nome da rota
    path: '/agendamentos',//caminho da rota
    component: Agendamento//componente que a rota irá usar para importar as configuração da página
},{
    name: 'novoagendamento',//nome da rota
    path: '/novoagendamento',//caminho da rota
    component: NovoAgendamento//componente que a rota irá usar para importar as configuração da página
},{
    name: 'agendamentoalterado',//nome da rota
    path: '/agendamentos/:codigo',//caminho da rota
    component: AgendamentoAlterado//componente que a rota irá usar para importar as configuração da página
},{
    name: 'homeatendimento',//nome da rota
    path: '/homeatendimento',//caminho da rota
    component: HomeAtendimento//componente que a rota irá usar para importar as configuração da página
},  {
    name:'atendimentos',//nome da rota
    path:'/atendimentos',//caminho da rota
    component:Atendimentos//componente que a rota irá usar para importar as configuração da página
}, {
    name: 'novoatendimento',//nome da rota
    path: '/novoatendimento',//caminho da rota
    component: NovoAtendimento//componente que a rota irá usar para importar as configuração da página
}, {
    name: 'atendimentoalterado',//nome da rota
    path: '/atendimentos/:codigoatend',//caminho da rota
    component: AtendimentoAlterado//componente que a rota irá usar para importar as configuração da página
}, {
    name: 'novopacienteatendimento',//nome da rota
    path: '/novopacienteatendimento',//caminho da rota
    component: NovoPacienteAtendimento//componente que a rota irá usar para importar as configuração da página
}, {
    name: 'auth',//nome da rota
    path: '/auth',//caminho da rota
    component: Auth//componente que a rota irá usar para importar as configuração da página
}, {
    name: 'homeprontuario',//nome da rota
    path: '/homeprontuario',//caminho da rota
    component: HomePronturario//componente que a rota irá usar para importar as configuração da página
}, {
    name: 'prontuario',//nome da rota
    path: '/prontuarios',//caminho da rota
    component: Prontuarios//componente que a rota irá usar para importar as configuração da página
}, {
    name: 'novoprontuario',//nome da rota
    path: '/novoprontuario',//caminho da rota
    component: NovoProntuario//componente que a rota irá usar para importar as configuração da página
}, {
    name: 'prontuarioalterado',//nome da rota
    path: '/prontuarios/:codigopront',//caminho da rota
    component: ProntuarioAlterado//componente que a rota irá usar para importar as configuração da página
}
]

//Faz um histório de acesso
export default new VueRouter({
    mode: 'history',
    routes
})

