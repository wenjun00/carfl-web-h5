import Vue from 'vue'
import Vuex from 'vuex'
import workspace from './modules/workspace'
import purchaseManage from './modules/purchaseManage'
import injector from 'vue-inject';
import createPersistedState from 'vuex-persistedstate'
import { StorageService } from '~/utils/storage.service'
import { DataDictSerivce } from '~/services/business-service/data-dict.service'
import { ResourceSerivce } from '~/services/business-service/resource.service'

const resourceSerivce = (): ResourceSerivce => injector.get('resourceSerivce')
const dataDictSerivce = (): DataDictSerivce => injector.get('dataDictSerivce')

Vue.use(Vuex)
const filterList = ['ready']

const store = new Vuex.Store({
  modules: {
    workspace: workspace,
    purchaseManage: purchaseManage
  },
  state: {
    //启动状态
    ready: false,
    layout: 'default',
    resourceData: '',
    dictData: '',
    userToken: '',
    userData: '',
    userRole: '',
    pageList: [{
      path: 'home',
      title: '主页'
    }],// 当前打开的页面列表
    currentPage: '',
    theme: 'theme-default',
    themeList: [{
      name: 'theme-default',
      color: '#265EA2'
    }, {
      name: 'theme-theme1',
      color: '#18879B'
    }]
  },
  mutations: {
    updateResourceData(state, data) {
      state.resourceData = data
    },
    updateLayout(state, layout) {
      state.layout = layout || 'default'
    },
    updateDictData(state, data) {
      state.dictData = data
    },
    updateUserToken(state, token) {
      state.userToken = token
      StorageService.setItem("userToken", token)
    },
    updateUserData(state, user) {
      state.userData = user
    },
    updateUserRole(state, role) {
      state.userRole = role
    },
    openPage(state, page) {
      if (!state.pageList.find(x => x.path === page.path)) {
        state.pageList.push(page)
      }
      state.currentPage = page.path
    },
    closePage(state, path) {
      let page = state.pageList.find(x => x.path === path)
      let index = state.pageList.indexOf(page)
      if (index > 0) {
        state.pageList.splice(index, 1)
      }
    },
    closeAllPage(state) {
      state.pageList = [{
        path: 'home',
        title: '主页'
      }]
      state.currentPage = 'home'
    },
    updatePage(state, path) {
      state.currentPage = path
    },
    updateTheme(state, theme) {
      state.theme = theme
    },
    /**
     * 更新初始化状态
     * @param state
     */
    ready(state) {
      state.ready = true
    }
  },
  plugins: [
    // 持久化存储插件
    createPersistedState({
      key: "vuex",
      reducer: (state, paths) => {
        return Object.assign({}, state, { ready: false })
      },
      storage: localStorage,
      filter: ({ type, payload }) => {
        return !filterList.includes(type)
      }
    })
  ]
})

export default store

/**
 * 更新当前页
 * @param commit 
 * @param state 
 * @param param2 
 * @param redirect 
 */
function updateCurrentPage(commit, state, { path }, redirect) {
  let page = state.pageList.find(x => x.path === path)
  if (page) {
    commit('updatePage', path)
  } else {
    redirect('/home')
  }
}
