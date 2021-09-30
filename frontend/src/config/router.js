import Vue from "vue"
import VueRouter from 'vue-router'

import Home from '@/components/home/Home'
import HomeCadastro from '@/components/home/HomeCadastro'
import Pacientes from '@/components/paciente/Pacientes'
import Usuarios from '@/components/usuario/Usuarios'
import NovoUsuario from '@/components/usuario/NovoUsuario'
import UsuarioCadastrado from '@/components/usuario/UsuarioCadastrado'

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
    name: 'usuariocadastrado',
    path: '/usuarios/:codigo',
    component: UsuarioCadastrado
}]

export default new VueRouter({
    mode: 'history',
    routes
})

