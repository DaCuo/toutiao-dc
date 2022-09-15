import Vue from 'vue'
import Vuex from 'vuex'
import Persistedstate from 'vuex-persistedstate'

Vue.use(Vuex)
// mapState
export default new Vuex.Store({
  /**
   * reducer（暂时是数组）
   */
  plugins: [
    Persistedstate({
      key: 'HM_TT',
      reducer({ tokenObj, myChannels, histories }) {
        return { tokenObj, myChannels, histories }
      }
    })
  ],
  state: {
    tokenObj: {},
    myChannels: [],
    histories: []
  },
  getters: {
    isLogin(state) {
      return !!state.tokenObj.token
    }
  },
  mutations: {
    GET_TOKEN(state, token) {
      state.tokenObj = token
    },
    /**
     *
     * @param {ArrayS} channel 删除或添加后最新的额数组
     */
    GET_MY_CHANNELS(state, channel) {
      state.myChannels = channel
    },
    GET_HISTORY(state, histories) {
      state.histories = histories
    }
  },
  actions: {},
  modules: {}
})
