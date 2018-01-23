// 数字字典controller
import { requestType } from '~/config/enum.config'

const SERVICE = 'manage-service'
const CONTROLLER = 'dataDictType'

export default {
    /**
     * 查询所有数据字典类型
     */
    getAllDictType: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'getAllDictType',
        type: requestType.Get
    }
}