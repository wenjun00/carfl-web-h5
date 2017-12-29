import { requestType } from '~/config/enum.config'

const CONTROLLER = 'dataImpController'

export const dataImpController = {
  /**
   * 查询所有导入记录
   */
  getAllDataImpRecord: {
    controller: CONTROLLER,
    action: 'getAllDataImpRecord',
    type: requestType.Get
  },
  /**
   * 分页查询待确认案件
   */
  getDataImpByBatch: {
    controller: CONTROLLER,
    action: 'getDataImpByBatch',
    type: requestType.Get
  },
  /**
   * 查看错误信息
   */
  getErrorMsgByBatch: {
    controller: CONTROLLER,
    action: 'getErrorMsgByBatch',
    type: requestType.Get
  },
  /**
   * 手工录入案件信息
   */
  manualEnterOrder: {
    controller: CONTROLLER,
    action: 'manualEnterOrder',
    type: requestType.Post
  },
  /**
   * 取消导入
   */
  cancelImp: {
    controller: CONTROLLER,
    action: 'cancelImp',
    type: requestType.Get
  },
  /**
   * 确认导入
   */
  confirmImp: {
    controller: CONTROLLER,
    action: 'confirmImp',
    type: requestType.Get
  },
  /**
   * 获取所有导入的批次
   */
  getAllBatch: {
    controller: CONTROLLER,
    action: 'getAllBatch',
    type: requestType.Get
  }
}
