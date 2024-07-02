import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sid: '',
    userInfo: {},
    isHide: false
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
    },
    setHide (state, value) {
      state.isHide = value
    }
  },
  actions: {
  },
  modules: {
  }
})
