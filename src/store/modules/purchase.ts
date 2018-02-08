export default {
  namespaced: true,
  state: {
    productId: ''
  },
  mutations: {
    updateProductId(state, id) {
      state.productId = id
    }
  },
  actions: {
  }
}
