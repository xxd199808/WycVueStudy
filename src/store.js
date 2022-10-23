import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        oUserInfo: {}, //用户信息
    },
    mutations: {
        fSetUserInfo(state, data) {
            state.oUserInfo = data;
        }
    },
    actions: {

    }
})