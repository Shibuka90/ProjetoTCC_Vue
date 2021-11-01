import axios from 'axios'//importa as configurações do AXIOS
import Vue from 'vue'//importa as configurações do VUE
import Vuex from 'vuex'//importa as configurações do VUEX

Vue.use(Vuex)

export default new Vuex.Store({
    //estado inicial do Menu e do Usuário
    state: {
        isMenuVisible: false,
        usuario: null
    },
    mutations: {
        //Função para mostrar o Menu
        toggleMenu(state, isVisible) {
            if(!state.usuario){
                state.isMenuVisible = false
                return
            }

            if(isVisible === undefined) {
                state.isMenuVisible = !state.isMenuVisible
            }else{
                state.isMenuVisible = isVisible
            }
        },
        //Função para inicializar o sistema com o usuário
        setUsuario(state, usuario){
            state.usuario = usuario
            if(usuario){
                axios.defaults.headers.common['Authorization'] = `bearer ${usuario.token}`
                state.isMenuVisible = false
            }else{
                delete axios.defaults.headers.common['Authorization']
                state.isMenuVisible = false
            }
        }
    }
})