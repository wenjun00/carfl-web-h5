import Vue from 'vue'
import Vuex from 'vuex'
import workspace from './modules/workspace'
import injector from 'vue-inject';
import createPersistedState from 'vuex-persistedstate'
import { StorageService } from '~/utils/storage.service'
import { DataDictSerivce } from '~/services/business-service/data-dict.service'
import { ResourceSerivce } from '~/services/business-service/resource.service'

const resourceSerivce = (): ResourceSerivce => injector.get('resourceSerivce')
const dataDictSerivce = (): DataDictSerivce => injector.get('dataDictSerivce')

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    workspace: workspace
  },
  state: {
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
    updatePage(state, path) {
      state.currentPage = path
    },
    updateTheme(state,theme){
      state.theme = theme
    }
  },
  plugins: [
    createPersistedState({
      key: 'vuex',
      storage: localStorage
    })
  ]
})

export default store


function updateCurrentPage(commit, state, { path },redirect) {
  let page = state.pageList.find(x => x.path === path)
  if (page) {
    commit('updatePage', path)
  } else {
    redirect('/home')
  }
}
