import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isMenuVisible: false,
        usuario: {
            nome: 'Usuário Mock',
            email: 'mock@cod3r.com.br'
        }
    },
    mutations: {
        toggleMenu(state, isVisible) {
            if(isVisible === undefined) {
                state.isMenuVisible = !state.isMenuVisible
            }else{
                state.isMenuVisible = isVisible
            }
        }
    }
})