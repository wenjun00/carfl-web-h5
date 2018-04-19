import { StorageService } from '~/utils/storage.service';
export default {
    /**
    * 更新用户资源信息
    * @param state
    * @param rescource
    */
    updateUserMenuResource: function (state, rescource) {
        state.menuResource = rescource;
    },
    /**
    * 更新用户资源信息
    * @param state
    * @param rescource
    */
    updateUserControlResource: function (state, rescource) {
        state.controlResource = rescource;
    },
    /**
     * 更新布局
     * @param state
     * @param layout
     */
    updateLayout: function (state, layout) {
        state.layout = layout || 'default';
    },
    /**
     * 更新数据字典
     * @param state/
     * @param data
     */
    updateDictData: function (state, data) {
        state.dictData = data;
    },
    /**
     * 更新用户token
     * @param state
     * @param token
     */
    updateUserToken: function (state, token) {
        state.userToken = token;
        StorageService.setItem("userToken", token);
    },
    /**
     * 更新用户数据
     * @param state
     * @param user
     */
    updateUserData: function (state, user) {
        state.userData = user;
    },
    /**
     * 打开页面
     * @param state
     * @param page
     */
    openPage: function (state, page) {
        if (typeof page === "string") {
            page = state.pageList.find(function (x) { return x.path === page; });
        }
        var hasPage = state.pageList.find(function (x) { return x.path === page.path; });
        if (!hasPage) {
            state.pageList.push(page);
        }
        state.currentPage = page.path;
    },
    /**
     * 关闭页面
     * @param state
     * @param path
     */
    closePage: function (state, path) {
        var page = state.pageList.find(function (x) { return x.path === path; });
        var index = state.pageList.indexOf(page);
        if (index > 0) {
            state.pageList.splice(index, 1);
        }
    },
    /**
     * 关闭所有
     * @param state
     */
    closeAllPage: function (state) {
        state.pageList = [{
                path: 'home',
                resoname: '主页'
            }];
        state.currentPage = 'home';
    },
    /**
     * 更新主题
     * @param state
     * @param theme
     */
    updateTheme: function (state, theme) {
        state.theme = theme;
    },
    /**
     * 修改token过期标识
     * @param state
     * @param data
     */
    updateTokenExpire: function (state, data) {
        state.tokenExpire = data;
    },
    /**
     * 更新初始化状态
     * @param state
     */
    ready: function (state) {
        state.ready = true;
    }
};
