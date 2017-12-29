import Vue from 'vue'
import Router from 'vue-router'
import store from '~/store'

import systemManageRoute from './system-manage.route'
import caseImportRoute from './case-import.route'
import caseManageRoute from './case-manage.route'
import approvalManageRoute from './approval-manage.route'
import TemplateSettings from './template-manage.route'
import TaticsManage from './tatics-manage.route'

const Test1 = () => import('~/pages/test1.vue')
const Test2 = () => import('~/pages/test2.vue')
const Login = () => import('~/pages/login.vue')

Vue.use(Router)

// 生成路由配置
const routes = [
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
  ...systemManageRoute,
  ...caseImportRoute,
  ...caseManageRoute,
  ...approvalManageRoute,
  ...TemplateSettings,
  ...TaticsManage
]

// 生成路由实体
const router = new Router({
  mode: 'history',
  routes
})

/**
 * 路由守卫
 * 布局检测
 */
router.beforeResolve(({ matched, path }, from, next) => {
  if (matched && matched.length > 0) {
    let [{ components }] = matched
    let component = components.default
    store.commit('updateLayout', component['$layout'] || 'default')
  }

  next()
})

export default router
