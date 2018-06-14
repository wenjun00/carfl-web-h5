import router from '~/router'

const productOrderService = () => import('~/services/manage-service/product-order.service');

export default {
  /**
   * 更新用户登录数据
   */
  updateUserLoginData({ state, commit, dispatch }, { token, personalId, personalName, userPhone }) {
    // 更新用户token
    if (!!token) {
      commit('updateUserToken', token);
    }
    // 更新用户数据
    commit('updateUserData', {
      id: personalId,
      personalName: personalName || "",
      userPhone: userPhone
    });
    // 执行 getOrderInfo 方法 传 userPhone
    dispatch('getOrderInfo', userPhone)
    commit('updateTokenExpire', false)
  },
  /**
   * 清除登录数据
   */
  clearUserLoginData({ commit }) {
    // 重置用户token
    commit('updateUserToken', "");
    // 清空用户订单数据
    commit('updateUserOrder', '')
    // 重置token过期标识
    commit('updateTokenExpire', true);
    // 清空数据
    localStorage.removeItem('vuex')
    localStorage.removeItem('userToken')
  },

  /**
   * 获取用户订单
   * @param param0  commit 方法
   * @param userPhone  用户手机号
   */
  async getOrderInfo({ commit }, userPhone) {
    let { ProductOrderService } = await productOrderService()
    let productService = new ProductOrderService()
    productService.getOrder(userPhone).subscribe(
      data => {
        // 更新用户订单数据
        commit('updateUserOrder', data)
      },
      err => console.error('获取用户订单出错')
    )
  }

}
