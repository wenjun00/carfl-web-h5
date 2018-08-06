import Vue from 'vue'
import Router from 'vue-router'
import store from '~/store'
import storeInit from '~/core/bootstrap/store.init'
const Login = () => import('~/pages/login.vue')
const Home = () => import('~/pages/home.vue')
const Index = () => import('~/pages/index.vue')
const NotFound = () => import('~/pages/not-found.vue')
import Routes from "./routes";

Vue.use(Router)

// 生成路由配置
const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: (to, from, next) => {
      store.dispatch('clearUserLoginData')
      next()
    }
  }, {
    path: '/',
    name: 'Index',
    component: Index,
    // index 页面使用了router-view 这里需要重新定向到home 
    // 以使home组件为router-view的默认值
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
  // console.log(matched[0].name == "Login")
  if(!(matched[0].name === "Login")){
    if(!!matched[1].meta.requireAuth){
      if(store.state.tokenExpire || store.state.userToken === ''){
        return next("/login")
      }
    }
  }
    
  
  

  // if ((store.state.tokenExpire || store.state.userToken === '') && path !== "/") {
  //   // 重置用户过期状态
  //   store.commit('updateTokenExpire', false)
  //   return next("/")
  // }

  next()
})





export default router
