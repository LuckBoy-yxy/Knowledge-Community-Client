import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'
import WebSocketClient from '@/utils/websocket'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sid: '',
    userInfo: {},
    isHide: false,
    ws: null,
    num: 0
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
    },
    initWebSocket (state, config) {
      state.ws = new WebSocketClient(config)
      state.ws.init()
    },
    setMessage (state, value) {
      state.num = value.message ? value.message : 0
    }
  },
  actions: {
    message (ctx, msgObj) {
      ctx.commit('setMessage', msgObj)
    }
  }
})
