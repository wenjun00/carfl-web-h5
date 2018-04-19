export default {
    namespaced: true,
    state: {
        currentTab: '',
        currentTabs: '' // 当前显示的tabs
    },
    mutations: {
        updateCurrentTab: function (state, tab) {
            state.currentTab = tab;
        },
        updateCurrentTabs: function (state, tabs) {
            state.currentTabs = tabs;
        }
    },
    actions: {
        updateTabs: function (_a, parentId) {
            var state = _a.state, commit = _a.commit, rootState = _a.rootState;
            // 获取tabs标签页
            var tabs = rootState.userResource
                .filter(function (x) { return x.type === "MENU"; })
                .filter(function (x) { return x.parentId === parentId; })
                .sort(function (x, y) { return x.sort - y.sort; });
            // 更新tabs标签页
            commit('updateCurrentTabs', tabs);
        }
    }
};
