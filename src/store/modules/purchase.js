export default {
    namespaced: true,
    state: {
        productId: '',
        paymentRecordFlag: '',
        collectiondata: {}
    },
    mutations: {
        collectionRowData: function (state, data) {
            state.collectiondata = data;
        },
        updateProductId: function (state, id) {
            state.productId = id;
        },
        updatePaymentRecord: function (state, time) {
            state.paymentRecordFlag = time;
        },
    },
    actions: {}
};
