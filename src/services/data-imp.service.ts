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
  // getAllDataImpRecord() {
  //   return this.netService.send({
  //     server: dataImpController.getAllDataImpRecord
  //   })
  // }
  getDataImpByBatch(batch) {
    return this.netService.send({
      server: dataImpController.getDataImpByBatch,
      data: { batch }
    })
  }
  getErrorMsgByBatch(batch) {
    return this.netService.send({
      server: dataImpController.getErrorMsgByBatch,
      data: { batch }
    })
  }
  manualEnterOrder(model) {
    return this.netService.send({
      server: dataImpController.manualEnterOrder,
      data: { model }
    })
  }
  cancelImp(batch) {
    return this.netService.send({
      server: dataImpController.cancelImp,
      data: { batch }
    })
  }
  getAllBatch() {
    return this.netService.send({
      server: dataImpController.getAllBatch
    })
  }
  confirmImp(batch) {
    return this.netService.send({
      server: dataImpController.confirmImp,
      data: { batch }
    })
  }
}

