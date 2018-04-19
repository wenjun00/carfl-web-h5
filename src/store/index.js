import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';
import workspace from './modules/workspace';
import purchase from './modules/purchase';
import createPersistedState from 'vuex-persistedstate';
Vue.use(Vuex);
var filterList = ['ready'];
var store = new Vuex.Store({
    modules: {
        workspace: workspace,
        purchase: purchase
    },
    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions,
    plugins: [
        // 持久化存储插件
        createPersistedState({
            key: "vuex",
            reducer: function (state, paths) {
                return Object.assign({}, state, { ready: false });
            },
            storage: localStorage,
            filter: function (_a) {
                var type = _a.type, payload = _a.payload;
                return !filterList.includes(type);
            }
        })
    ]
});
export default store;
