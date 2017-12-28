import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

import systemManageRoute from './system-manage.route'

const Test1 = () => import('~/pages/test1.vue')
const Test2 = () => import('~/pages/test2.vue')
const Login = () => import('~/pages/login.vue')

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/test1',
      name: 'test1',
      component: Test1
    }, {
      path: '/test2',
      name: 'test2',
      component: Test2
    },
    ...systemManageRoute
  ]
})

router.beforeResolve(({ matched }, from, next) => {
  if (matched && matched.length > 0) {
    let [{ components }] = matched
    let component = components.default
    store.commit('updateLayout', component['$layout'] || 'default')
  }

  next()
})

export default router
