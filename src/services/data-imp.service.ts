import { dataImpController } from '~/config/server'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";

export class dataImpService {

  @Inject()
  private netService: NetService

  /**
   * 查询所有导入记录
   */
  @Debounce()
  getAllDataImpRecord() {
    return this.netService.send({
      server: dataImpController.getAllDataImpRecord
    })
  }
  /**
   * 获取案件信息
   */
  getDataImpByBatch(batch) {
    return this.netService.send({
      server: dataImpController.getDataImpByBatch,
      data: { batch }
    })
  }
  /**
   * 获取错误信息
   */
  getErrorMsgByBatch(batch) {
    return this.netService.send({
      server: dataImpController.getErrorMsgByBatch,
      data: { batch }
    })
  }
  /**
   * 手工录入案件信息
   */
  manualEnterOrder(model) {
    return this.netService.send({
      server: dataImpController.manualEnterOrder,
      data: { model }
    })
  }
  /**
   * 取消导入
   */
  cancelImp(batch) {
    return this.netService.send({
      server: dataImpController.cancelImp,
      data: { batch }
    })
  }
  /**
   * 获取所有批次号
   */
  getAllBatch() {
    return this.netService.send({
      server: dataImpController.getAllBatch
    })
  }
  /**
   * 确认导入
   */
  confirmImp(batch) {
    return this.netService.send({
      server: dataImpController.confirmImp,
      data: { batch }
    })
  }
  importExcel(fileId, templateId) {
    return this.netService.send({
      server: dataImpController.importExcel,
      data: {
        fileId: fileId,
        templateId: templateId
      }
    })
  }
  /**
   * 导入自定义模板信息
   */
  importAttribute(fileId) {
    return this.netService.send({
      server: dataImpController.importAttribute,
      data: {
        fileId: fileId
      }
    })
  }
}

