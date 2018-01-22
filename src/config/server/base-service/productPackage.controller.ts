const SERVICE = 'manage-service'
const CONTROLLER = 'productPackage'

export default {
    /**
     * 多条件分页查询产品包信息
     */
    getAllProductPackage: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'getAllProductPackage',
        type: 'Get'
    },

}