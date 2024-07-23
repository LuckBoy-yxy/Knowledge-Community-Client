import Vue from 'vue'
import store from '@/store'

class WebSocketClient {
  constructor (config = {}) {
    const defaultConfig = {
      url: '127.0.0.1',
      port: 3012,
      protocol: 'ws'
    }
    const finalConfig = {
      ...defaultConfig,
      ...config
    }
    this.ws = {}
    this.port = finalConfig.port
    this.url = finalConfig.url
    this.protocol = finalConfig.protocol
  }

  init () {
    this.ws = new WebSocket(`${this.protocol}://${this.url}:${this.port}`)
    this.ws.onopen = this.onOpen
    this.ws.onmessage = this.onMessage
    this.ws.onclose = this.onClose
    this.ws.onerror = this.onError
  }

  onOpen () {
    this.send(JSON.stringify({
      event: 'auth',
      message: `Bearer ${store.state.userInfo.token}`
    }))
  }

  onMessage (event) {
    const obj = JSON.parse(event.data)
    switch (obj.event) {
      case 'noauth':
        // this.$pop(obj.messgae)
        Vue.prototype.$pop(obj.messgae)
        store.commit('logout')
        // this.$router.push('/login')
        break
      case 'heartbeat':
        // this.checkServer()
        this.send(JSON.stringify({
          event: 'heartbeat',
          message: 'pong'
        }))
        break
      default:
        store.dispatch(obj.event, obj)
    }
  }

  onClose () {
    this.close()
  }

  onError () {
    setTimeout(() => {
      this.init()
    }, 1000)
  }

  send (msg) {
    this.ws.send(msg)
  }
}

export default WebSocketClient
