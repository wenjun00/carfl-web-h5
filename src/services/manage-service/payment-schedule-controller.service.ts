import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { requestType } from "~/config/enum.config";
import { manageService } from '~/config/server/manage-service'

export class PaymentScheduleControllerService {
    @Inject(NetService)
    private netService: NetService


    /**
     * 获取还款详情
     */
    getPaymentScheduleList(personalId){
        return this.netService.send({
            server: manageService.paymentScheduleController.getPaymentScheduleList,
            data:{
                personId: personalId
            }
        })
    }
}
