import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
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
    },
    updateUserData(state, user) {
      state.userData = user
    },
    updateUserRole(state, role) {
      state.userRole = role
    },
    updateUserResource(state, rescource) {
      state.userRescource = rescource
    }
  },
  plugins: [
    createPersistedState(localStorage)
  ]
})

export default store
