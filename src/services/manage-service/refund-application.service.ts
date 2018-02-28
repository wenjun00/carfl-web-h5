import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { requestType } from "~/config/enum.config";
import { manageService } from '~/config/server/manage-service'
import { FilterService } from "~/utils/filter.service"


export class RefundApplicationService {
    @Inject(NetService)
    private netService: NetService

    /**
     * 进件  付款审批
     */
    getApprovalRecord(data, page) {
      return this.netService.send({
        server: manageService.refundApplicationController.getApprovalRecord,
        data: {
          getApprovalRecord: data.getApprovalRecord,
          refundName: data.refundName,
          timeSearch: data.timeSearch,
          startDate: FilterService.dateFormat(data.startDate, 'yyyy-MM-dd'),
          endDate: FilterService.dateFormat(data.endDate, 'yyyy-MM-dd')
        },
        page: page
      })
    }
    /**
     * 进件  付款审批
     */
    getRefundApplicationById({ refundId }) {
        return this.netService.send({
            server: manageService.refundApplicationController.getRefundApplicationById,
            data: {
                refundId: refundId
            }
        })
    }

    /**
     * 通过申请
     */
    passRefundApplication({ refundId }) {
        return this.netService.send({
            server: manageService.refundApplicationController.passRefundApplication,
            data: {
                refundId: refundId
            }
        })
    }

    /**
     * 退回申请
     */
    returnRefundApplication({ refundId }) {
        return this.netService.send({
            server: manageService.refundApplicationController.returnRefundApplication,
            data: {
                refundId: refundId
            }
        })
    }
    /**
     * 证件号、订单号、客户姓名查询订单/账户/付款信息
     */
    getAllMessageByParams(data) {
        return this.netService.send({
            server: manageService.refundApplicationController.getAllMessageByParams,
            data
        })
    }
    /**
     * 保存/保存并提交付款申请
     */
    saveSubmitApplication(data) {
        return this.netService.send({
            server: manageService.refundApplicationController.saveSubmitApplication,
            data
        })
    }
    /**
     * 获取付款明细项
     */
    getRefundItems({ orderId }) {
        return this.netService.send({
            server: manageService.refundApplicationController.getRefundItems,
            data: {
                orderId: orderId
            }
        })
    }
}
