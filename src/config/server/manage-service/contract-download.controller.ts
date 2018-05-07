// 合同下载controller
import { requestType } from '~/config/enum.config'

const SERVICE = 'service-manage'
const CONTROLLER = 'ContractDownload'
export default {
  /**
   * 获取合同下载列表
   */
  getAllContractInfo: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getAllContractInfo',
    type: requestType.Get
  },
 


 
}
