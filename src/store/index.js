import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sid: ''
  },
  getters: {
  },
  mutations: {
    setSid (state, sid) {
      state.sid = sid
    }
  },
  actions: {
  },
  modules: {
  }
})
