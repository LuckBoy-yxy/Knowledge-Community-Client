import AlertCom from './Alert.vue'

const Alert = {}

Alert.install = Vue => {
  const AlertConstructor = Vue.extend(AlertCom)
  const instance = new AlertConstructor()
  instance.$mount(document.createElement('div'))
  document.body.appendChild(instance.$el)

  Vue.prototype.$alert = function (msg) {
    instance.msg = msg
    instance.isShow = true
  }
}

export default Alert
