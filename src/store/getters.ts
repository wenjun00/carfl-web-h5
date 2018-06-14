import state from "./state";

export default {

  /**
   * 计算当前是否含有订单
   * @param state 
   */
  hasOrder(state){
    return state.orderInfo.orderNumber && state.orderInfo.orderNumber !== ''
  }

}
