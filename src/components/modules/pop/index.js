import PopCom from './Pop.vue'

const Pop = {}

Pop.install = Vue => {
  const PopConstructor = Vue.extend(PopCom)
  const instance = new PopConstructor()
  instance.$mount(document.createElement('div'))
  document.body.appendChild(instance.$el)

  Vue.prototype.$pop = (msg, type) => {
    instance.isShow = true
    instance.msg = msg
    instance.type = type
  }
}

export default Pop
