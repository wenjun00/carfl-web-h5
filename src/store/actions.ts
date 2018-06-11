import router from '~/router'


export default {
  /**
   * 更新用户登录数据
   */
  updateUserLoginData({ state, commit, dispatch }, { token, personalId, personalName,userPhone }) {
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
    commit('updateTokenExpire', false)
  },
  /**
   * 清除登录数据
   */
  clearUserLoginData({ commit }) {
    // 重置用户token
    commit('updateUserToken', "");
    // 重置token过期标识
    commit('updateTokenExpire', true);
    // 清空数据
    localStorage.removeItem('vuex')
    localStorage.removeItem('userToken')
  }
}
