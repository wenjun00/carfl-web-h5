import Vue from 'vue'
import Router from 'vue-router'
import store from '~/store'
import storeInit from '~/core/bootstrap/store.init'
const Login = () => import('~/pages/login.vue')
const Index = () => import('~/pages/index.vue')
const NotFound = () => import('~/pages/not-found.vue')
import Routes from "./routes";

Vue.use(Router)

// 生成路由配置
const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    beforeEnter: (to, from, next) => {
      store.dispatch('clearUserLoginData')
      next()
    }
  }, {
    path: '/index',
    name: 'Index',
    component: Index,
    // index 页面使用了router-view 这里需要重新定向到home 
    // 以使home组件为router-view的默认值
    redirect: '/home',
    children: [...Routes]
  }, {
    path: '*',
    name: 'notfound',
    component: NotFound
  }
]

// 生成路由实体
const router = new Router({
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  routes
})

router.beforeEach(async ({ matched, path }, from, next) => {
  if (!store.state.ready) {
    await storeInit({
      store,
      router
    })
  }

  if ((store.state.tokenExpire || store.state.userToken === '') && path !== "/") {
    // 重置用户过期状态
    store.commit('updateTokenExpire', false)
    return next("/")
  }

  next()
})


export default router
