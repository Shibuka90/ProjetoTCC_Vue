import Vue from "vue"
import VueRouter from 'vue-router'

import Home from '@/components/home/Home'
import HomeCadastro from '@/components/home/HomeCadastro'

Vue.use(VueRouter)

const routes = [{
    name: 'home',
    path: '/',
    component: Home
}, {
    name: 'homecadastro',
    path: '/homecadastro',
    component: HomeCadastro
}]

export default new VueRouter({
    mode: 'history',
    routes
})

