export default {
  namespaced: true,
  state: {
    productId: '',
    paymentRecordFlag:''
  },
  mutations: {
    updateProductId(state, id) {
      state.productId = id
    },
    updatePaymentRecord(state, time) {
      state.paymentRecordFlag = time
    },
  },
  actions: {
  }
}
