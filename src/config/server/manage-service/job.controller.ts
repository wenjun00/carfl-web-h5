// 批量管理
import { requestType } from '~/config/enum.config'

const SERVICE = 'service-manage'
const CONTROLLER = 'job'

export default {
  /**
   * 批量管理查询
   */
  list: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'list',
    type: requestType.Get
  },
  /**
   * 新增管理
   */
   add:{
    service: SERVICE,
    controller: CONTROLLER,
    action: 'add',
    type: requestType.Get  
   }
 
 
 

  

  

}
 