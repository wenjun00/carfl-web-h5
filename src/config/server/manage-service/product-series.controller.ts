//产品系列管理
import { requestType } from '~/config/enum.config'
const SERVICE = 'service-manage'
const CONTROLLER = 'productSeries'
export default {
  /**
   * 新增/修改产品系列
   */
  createOrModifyProductSeries: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'createOrModifyProductSeries',
    type: requestType.Post
  },
  /**
  * 删除产品系列
  */
  deleteProductSeries: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'deleteProductSeries',
    type: requestType.Delete
  }
}