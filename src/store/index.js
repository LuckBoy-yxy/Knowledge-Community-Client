import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sid: '',
    userInfo: {}
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
      router.push('/login')
    }
  },
  actions: {
  },
  modules: {
  }
})
