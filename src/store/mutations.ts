import { StorageService } from '~/utils/storage.service'

export default {
  /**
  * 更新用户资源信息
  * @param state
  * @param rescource
  */
  updateUserMenuResource(state, rescource) {
    state.menuResource = rescource
  },
  /**
  * 更新用户资源信息
  * @param state
  * @param rescource
  */
  updateUserControlResource(state, rescource) {
    state.controlResource = rescource
  },
  /**
   * 更新布局
   * @param state 
   * @param layout 
   */
  updateLayout(state, layout) {
    state.layout = layout || 'default'
  },
  /**
   * 更新数据字典
   * @param state/
   * @param data 
   */
  updateDictData(state, data) {
    state.dictData = data
  },
  /**
   * 更新用户token
   * @param state 
   * @param token 
   */
  updateUserToken(state, token) {
    state.userToken = token
    StorageService.setItem("userToken", token)
  },
  /**
   * 更新用户数据
   * @param state 
   * @param user 
   */
  updateUserData(state, user) {
    state.userData = user
  },
  /**
   * 打开页面
   * @param state 
   * @param page 
   */
  openPage(state, target) {
    // TODO: 传递至应该是菜单对象，从菜单中查询而非自定义对象
    let page: any

    if (typeof target === "string") {
      page = state.pageList.find(x => x.path === target)
    } else {
      // 菜单对象
      page = {
        path: target.path,
        resoname: target.resoname,
        params: target.params // 添加页面参数
      }
    }

    let pageModel = state.pageList.find(x => x.path === page.path)

    if (!pageModel) {
      state.pageList.push(page)
    }else{
      pageModel.params = target.params
    }

    state.currentPage = page.path
  },
  /**
   * 关闭页面
   * @param state 
   * @param path 
   */
  closePage(state, path) {
    let page = state.pageList.find(x => x.path === path)
    let index = state.pageList.indexOf(page)
    if (index > 0) {
      state.pageList.splice(index, 1)
    }
  },
  /**
   * 关闭所有
   * @param state 
   */
  closeAllPage(state) {
    state.pageList = [{
      path: 'home',
      resoname: '主页'
    }]
    state.currentPage = 'home'
  },
  /**
   * 更新主题
   * @param state 
   * @param theme 
   */
  updateTheme(state, theme) {
    state.theme = theme
  },
  /**
   * 修改token过期标识
   * @param state
   * @param data
   */
  updateTokenExpire(state, data) {
    state.tokenExpire = data
  },
  /**
   * 更新初始化状态
   * @param state
   */
  ready(state) {
    state.ready = true
  }
}


