import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import(/* webpackChunkName: 'login' */ '../views/Login.vue')
const Reg = () => import(/* webpackChunkName: 'reg' */ '../views/Reg.vue')
const Forget = () => import(/* webpackChunkName: 'forget' */ '../views/Forget.vue')
const Home = () => import(/* webpackChunkName: 'home' */ '../views/Home')
const HomeIndex = () => import(/* webpackChunkName: 'homeIndex' */ '../views/Channels')
const HomeAsk = () => import(/* webpackChunkName: 'homeAsk' */ '../views/Channels/templateOne.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/reg',
    name: 'reg',
    component: Reg,
    beforeEnter (to, form, next) {
      if (form.path === '/login') {
        next()
      } else {
        next('/login')
      }
    }
  },
  {
    path: '/forget',
    name: 'forget',
    component: Forget
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      {
        path: '',
        component: HomeIndex,
        name: 'homeIndex'
      },
      {
        path: '/homeIndex/:catalog',
        component: HomeAsk,
        name: 'homeAsk'
      }
    ]
  }
]

const router = new VueRouter({
  routes,
  linkActiveClass: 'layui-this'
})

export default router
