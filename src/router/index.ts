import Vue from 'vue'
import Router from 'vue-router'
import store from '~/store'
import storeInit from '~/core/bootstrap/store.init'
// import Login from '~/pages/login.vue'
// import Index from '~/pages/index.vue'
const Login = () => Promise.resolve(require('~/pages/login.vue'))
const Index = () => Promise.resolve(require('~/pages/index.vue'))
const Register = ()=> Promise.resolve(require('~/pages/register.vue'))
const CustomInformation = ()=> Promise.resolve(require('~/pages/customInformation.vue'))
const ContactInformation = ()=> Promise.resolve(require('~/pages/contactInformation.vue'))
const UploadIdPhotoFirst = ()=> Promise.resolve(require('~/pages/uploadIdPhotoFirst.vue'))
const UploadIdPhotoTwo = ()=> Promise.resolve(require('~/pages/uploadIdPhotoTwo.vue'))
const UploadIdPhotoThree = ()=> Promise.resolve(require('~/pages/uploadIdPhotoThree.vue'))
const AddInformation = ()=> Promise.resolve(require('~/pages/addInformation.vue'))
const AddDocumentInfor = ()=> Promise.resolve(require('~/pages/addDocumentInfor.vue'))
Vue.use(Router)

// 生成路由配置
const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
    beforeEnter: (to, from, next) => {
      store.dispatch('clearUserLoginData')
      next()
    }
  }, {
    path: '/home',
    name: 'index',
    component: Index
  },{
    path: '/register',
    name :'register',
    component: Register
  },{
    path: '/customInformation',
    name :'customInformation',
    component: CustomInformation
  },
  {
    path: '/contactInformation',
    name :'contactInformation',
    component: ContactInformation
  },
  {
    path: '/uploadIdPhotoFirst',
    name :'uploadIdPhotoFirst',
    component: UploadIdPhotoFirst
  },
  {
    path: '/uploadIdPhotoTwo',
    name :'uploadIdPhotoTwo',
    component: UploadIdPhotoTwo
  },
  {
    path: '/uploadIdPhotoThree',
    name :'uploadIdPhotoThree',
    component: UploadIdPhotoThree
  },
  {
    path: '/addInformation',
    name :'addInformation',
    component: AddInformation
  },
  {
    path: '/addDocumentInfor',
    name :'addDocumentInfor',
    component: AddDocumentInfor
  }
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
// router.beforeResolve(({ matched, path }, from, next) => {
//   // workspaceTab检测
//   // tabsCheck(path, from.path)
//   next()
//   // setTimeout(() => tabsCheck(path, from.path), 100)
// })

router.beforeEach(async ({ matched, path }, from, next) => {
  if (!store.state.ready) {
    await storeInit({
      store,
      router
    })
  }

  if (store.state.tokenExpire && path !== "/") {
    // 重置用户过期状态
    store.commit('updateTokenExpire', false)
    return next("/")
  }

  next()
})
/**
 * 路由后置守卫
 * 布局检测
 */
router.afterEach((to, from) => {
  //  布局检测
  layoutCheck(to.matched)
  // Tab更新检测
  // tabsCheck(to.path, from.path)
})

// 布局监测
function layoutCheck(matched) {
  if (matched && matched.length > 0) {
    let [{ components }] = matched
    let component = components.default
    let targetLayout = component['$layout'] || 'default'
    if (store.state.layout !== targetLayout) {
      store.commit('updateLayout', targetLayout )
    }

  }
}

/**
 * Tabs更新检测
 * @param toPath
 * @param fromPath
 */
function tabsCheck(toPath, fromPath) {
  if (!toPath || toPath == '/') {
    return
  }

  let toItem: any = store.state.userResource.find((x: any) => x.url === toPath);
  let fromItem: any = store.state.userResource.find((x: any) => x.url === fromPath);

  if (!toItem) {
    return
  }

  if (!store.state.workspace.currentTabs || !fromItem) {
    store.dispatch('workspace/updateTabs', toItem.parentId)
  }

  if (toItem.url !== store.state.workspace.currentTab) {
    // 更新当前选中tab
    store.commit('workspace/updateCurrentTab', toItem.url)
  }
}

export default router
