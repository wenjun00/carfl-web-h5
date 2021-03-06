import router from '~/router'

const productOrderService = () => import('~/services/manage-service/product-order.service');

export default {
  /**
   * 更新用户登录数据
   */
  updateUserLoginData({ state, commit, dispatch }, { token, personalId, personalName, userPhone, authCode }) {
    // 更新用户token
    if (!!token) {
      commit('updateUserToken', token);
    }
    // 更新用户数据
    commit('updateUserData', {
      id: personalId,
      personalName: personalName || "",
      userPhone: userPhone,
      authCode: authCode
    });
    // 执行 getOrderInfo 方法 传 userPhone
    // dispatch('getOrderInfo', userPhone)
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
    // 清除用户数据
    commit('updateUserData', "");
    commit('updateCarbrand', "");
    commit('updateSeries', "");
    commit('updateProduct', "");
    commit('updataCity', "");
    commit('updateInformation', "");
    commit('updateSubmit', "");
    // 清空数据
    localStorage.removeItem('vuex')
    localStorage.removeItem('userToken')
  }

}
