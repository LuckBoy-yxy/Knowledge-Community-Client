import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import(/* webpackChunkName: 'login' */ '../views/Login.vue')
const Reg = () => import(/* webpackChunkName: 'reg' */ '../views/Reg.vue')
const Forget = () => import(/* webpackChunkName: 'forget' */ '../views/Forget.vue')
const Home = () => import(/* webpackChunkName: 'home' */ '../views/Home')
const HomeIndex = () => import(/* webpackChunkName: 'homeIndex' */ '../views/Channels')
const HomeAsk = () => import(/* webpackChunkName: 'homeAsk' */ '../views/Channels/templateOne.vue')
const Center = () => import(/* webpackChunkName: 'center' */ '../views/Center')
const UserCenter = () => import(/* webpackChunkName: 'userCenter' */ '../views/Center/components/Center.vue')
const Settings = () => import(/* webpackChunkName: 'settings' */ '../views/Center/components/Settings.vue')
const Posts = () => import(/* webpackChunkName: 'posts' */ '../views/Center/components/Posts.vue')
const Messages = () => import(/* webpackChunkName: 'messages' */ '../views/Center/components/Message.vue')
const Others = () => import(/* webpackChunkName: 'others' */ '../views/Center/components/Others.vue')
const User = () => import(/* webpackChunkName: 'user' */ '../views/User/index.vue')
const Accounts = () => import(/* webpackChunkName: 'accounts' */ '../views/Center/components/Accounts.vue')
const MyInfo = () => import(/* webpackChunkName: 'accounts' */ '../views/Center/components/MyInfo.vue')
const PicUpload = () => import(/* webpackChunkName: 'accounts' */ '../views/Center/components/PicUpload.vue')
const Passwd = () => import(/* webpackChunkName: 'accounts' */ '../views/Center/components/Passwd.vue')
const MyPost = () => import(/* webpackChunkName: 'accounts' */ '../views/Center/components/MyPost.vue')
const MyCollection = () => import(/* webpackChunkName: 'accounts' */ '../views/Center/components/MyCollection.vue')

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
  },
  {
    path: '/center',
    name: 'center',
    component: Center,
    children: [
      {
        path: '',
        name: 'user-center',
        component: UserCenter
      },
      {
        path: 'settings',
        name: 'settings',
        component: Settings,
        children: [
          {
            path: '',
            name: 'info',
            component: MyInfo
          },
          {
            path: 'pic',
            name: 'pic',
            component: PicUpload
          },
          {
            path: 'passwd',
            name: 'passwd',
            component: Passwd
          },
          {
            path: 'account',
            name: 'account',
            component: Accounts
          }
        ]
      },
      {
        path: 'posts',
        name: 'posts',
        component: Posts,
        children: [
          {
            path: '',
            name: 'mypost',
            component: MyPost
          },
          {
            path: 'mycollection',
            name: 'mycollection',
            component: MyCollection
          }
        ]
      },
      {
        path: 'messages',
        name: 'messages',
        component: Messages
      },
      {
        path: 'others',
        name: 'others',
        component: Others
      }
    ]
  },
  {
    path: '/user/:uid',
    name: 'home',
    props: true,
    component: User
  }
]

const router = new VueRouter({
  routes,
  // linkActiveClass: 'layui-this'
  linkExactActiveClass: 'layui-this'
})

export default router
