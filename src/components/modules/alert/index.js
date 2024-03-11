import AlertCom from './Alert.vue'

const Alert = {}

Alert.install = Vue => {
  const AlertConstructor = Vue.extend(AlertCom)
  const instance = new AlertConstructor()
  instance.$mount(document.createElement('div'))
  document.body.appendChild(instance.$el)

  Vue.prototype.$alert = function (msg) {
    instance.type = 'alert'
    instance.msg = msg
    instance.isShow = true
  }

  Vue.prototype.$confirm = function (msg, cancel, success) {
    instance.type = 'confirm'
    instance.msg = msg
    instance.isShow = true
    if (typeof cancel !== 'undefined') {
      instance.cancel = cancel
    }
    if (typeof success !== 'undefined') {
      instance.success = success
    }
  }
}

export default Alert
