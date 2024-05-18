import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sid: '',
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || {}
  },
  getters: {
  },
  mutations: {
    setSid (state, sid) {
      state.sid = sid
    },
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
    },
    logout (state) {
      state.userInfo = {}
      localStorage.setItem('userInfo', JSON.stringify({}))
    }
  },
  actions: {
  },
  modules: {
  }
})
