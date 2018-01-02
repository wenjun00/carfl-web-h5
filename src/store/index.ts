import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { StorageService } from '~/utils/storage.service'
import workspace from './modules/workspace'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    workspace: workspace,
  },
  state: {
    layout: 'default',
    resourceData: '',
    dictData: '',
    userToken: '',
    userData: '',
    userRole: '',
    userRescource: [],
    menuCollapse: false,
    theme: 'theme-default'
  },
  mutations: {
    updateMenuCollapse(state, collapse) {
      state.menuCollapse = collapse
    },
    updateLayout(state, layout) {
      state.layout = layout || 'default'
    },
    updateDictData(state, data) {
      state.dictData = data
    },
    updateUserToken(state, token) {
      state.userToken = token
      StorageService.setItem('userToken', token)
    },
    updateUserData(state, user) {
      state.userData = user
    },
    updateUserRole(state, role) {
      state.userRole = role
    },
    updateUserResource(state, rescource) {
      state.userRescource = rescource
    },

  },
  plugins: [
    createPersistedState({
      key:'vuex',
      storage:localStorage
    })
  ]
})

export default store
