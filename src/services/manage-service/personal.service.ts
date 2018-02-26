import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { requestType } from "~/config/enum.config";
import { manageService } from '~/config/server/manage-service'

export class PersonalService {
    @Inject(NetService)
    private netService: NetService

    /**
     * 根据客户三项查询历史订单
     */
    getCustomerHistoryFinanceInfo(data?) {
        return this.netService.send({
            server: manageService.personalController.getCustomerHistoryFinanceInfo,
            data: data
        })
    }
    /**
     * 客户信息查询
     */
    getPersonalMessage({ personalId }) {
        return this.netService.send({
            server: manageService.personalController.getPersonalMessage,
            data: {
                personalId: personalId
            }
        })
    }
    /**
    * 客户号获取开户信息
    */
    getBankByClientNumber({ clientNumber, settleChannel }) {
        return this.netService.send({
            server: manageService.personalController.getBankByClientNumber,
            data: {
                clientNumber: clientNumber,
                settleChannel: settleChannel
            }
        })
    }
    /**
     * 获取客户开户列表
     */
    getCustomerAccountList(data, page) {
        return this.netService.send({
            server: manageService.personalController.getCustomerAccountList,
            data: data,
            page: page
        })
    }
    /**
     * 获取客户签约列表
     */
    getCustomerSignList(data, page) {
        return this.netService.send({
            server: manageService.personalController.getCustomerSignList,
            data: data,
            page: page
        })
    }
    /**
     * 修改结算通道
     */
    modifySettleChannel({ settleChannel, id }) {
        return this.netService.send({
            server: manageService.personalController.modifySettleChannel,
            data: {
                settleChannel: settleChannel,
                id: id
            }
        })
    }
    /**
     * 进件模块-客户资料
     */
    getCustomerDataOrder(data, page) {
        return this.netService.send({
            server: manageService.personalController.getCustomerDataOrder,
            data: data,
            page: page
        })
    }
}