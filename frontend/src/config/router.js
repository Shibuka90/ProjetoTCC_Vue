import Vue from "vue"
import VueRouter from 'vue-router'

import Home from '@/components/home/Home'
import HomeCadastro from '@/components/home/HomeCadastro'
import Pacientes from '@/components/paciente/Pacientes'
import Usuarios from '@/components/usuario/Usuarios'
import NovoUsuario from '@/components/usuario/NovoUsuario'
import UsuarioAlterado from '@/components/usuario/UsuarioAlterado'
import Especialidades from '@/components/especialidade/Especialidades'
import Servicos from '@/components/servico/Servico'
import Convenios from '@/components/convenio/Convenio'
import Medicos from '@/components/medico/Medico'
import NovoMedico from '@/components/medico/NovoMedico'
import MedicoAlterado from '@/components/medico/MedicoAlterado'


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
},
]

export default new VueRouter({
    mode: 'history',
    routes
})

