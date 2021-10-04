import Vue from "vue"
import VueRouter from 'vue-router'

import Home from '@/components/home/Home'
import HomeCadastro from '@/components/home/HomeCadastro'
import Pacientes from '@/components/paciente/Pacientes'
import Usuarios from '@/components/usuario/Usuarios'
import NovoUsuario from '@/components/usuario/NovoUsuario'
import UsuarioAlterado from '@/components/usuario/UsuarioAlterado'
import Especialidades from '@/components/especialidade/Especialidades'


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
    path: '/paciente',
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
}]

export default new VueRouter({
    mode: 'history',
    routes
})

