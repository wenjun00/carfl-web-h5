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
    let page, path, params

    if (typeof target === "string") {
      path = target
    } else {
      path = target.path
      params = target.params
    }

    // 获取是否是显示中的页面
    page = state.pageList.find(x => x.path === path)


    if (page) {
      // 当前页面已经打开
      page.params = params
    } else {
      // 当前页面未打开
      page = state.menuResource.find(x => x.path === path)
      // 添加新页面
      state.pageList.push(Object.assign({
        params
      }, page))
    }

    // 切换显示页面
    state.currentPage = page.path
  },
  /**
   * 关闭页面
   * @param state
   * @param path
   */
  closePage(state, path) {
    let page = state.pageList.find(x => x.path === path)

    if (!page) {
      return
    }

    let index = state.pageList.indexOf(page)
    state.currentPage = state.pageList[index - 1].path

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
  },
  updateCompanyList(state, data) {
    state.companyList = data
  },
  /**
   * 更新用户手机号码
   * @param state
   * @param phoneNumber 手机号码
   */
  updateUserPhone(state, phoneNumber) {
    state.userPhone = phoneNumber
  },
  //身份证信息页
  idcCard(state, data) {
    state.intoA.personal = data
  },
  //驾驶者信息页
  choosePeople(state, data) {
    state.intoA.personalCar = data
  },
  //银行卡信息页
  bankCard(state, data) {
    state.intoA.personalBank = data
  },
  //工作情况
  going(state, data) {
    state.intoA.PersonalJob = data
  },
  // 联系人
  linkman(state, data) {
    state.intoA.PersonalContact = data
  },
  // 所有照片
  tenantImg(state, data) {
    state.intoA.PersonalAdditional = data
  },
  //车辆详情
  carDetails(state, data){
    state.intoA.orderCar = data
  },
  carDetailTwo(state, data){
    state.intoA.orderCarTwo = data
  },
  // 改变进件城市选择
  selectCity(state, data){
    state.IntoACity = data
  },

  getOrderIdFun(state,data){
    state.getOrderId = data
  },

  // 清空进件城市
  clearSelectCity(state){
    state.IntoACity = ''
  },

  // 清空intoA
  clearIntoA(state) {
    state.intoA = {}
  },
  // 点击立即预约改变状态
  promptlyMakeControl(state, data){
    state.promptlyMake = data
  },
  // 获取车辆详情数据
  getcarData(state, data){
    state.carData = data
  },
  // 清空车辆详情数据
  clearCarDate(state){
    state.carData = {}
  },

  /**
   * 更新用户订单数据
   * @param state
   * @param data
   */
  updateUserOrder(state,data){
    state.orderInfo = data
  },

  updateCarbrand(state,data){
    state.carBrand = data
  },
  updateSeries(state,data){
    state.carSeries = data
  },
  updateProduct(state,data){
    state.carProduct = data
  },
  updataCity(state,data){
    state.carCity = data
  },
  updateInformation(state,data){
    state.carInformation = data
  },
  updateSubmit(state,data){
    state.carSubmit = data
  },
}


