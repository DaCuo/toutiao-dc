import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// mapState
export default new Vuex.Store({
  state: {
    tokenObj: {}
  },
  getters: {},
  mutations: {
    GET_TOKEN(state, token) {
      state.tokenObj = token
    }
  },
  actions: {},
  modules: {}
})
