import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { requestType } from "~/config/enum.config";
import { manageService } from '~/config/server/manage-service'

export class AppCustomerService {
    @Inject(NetService)
    private netService: NetService


    /**
     * 用户状态
     */
    checkCustomerType(personalDataId){
        return this.netService.send({
            server: manageService.appCustomerController.checkCustomerType,
            data:{
              personalDataId: personalDataId
            }
        })
    }
    /**
     * 领取用户订单
     */
    customerReservation(personalId){
        return this.netService.send({
            server: manageService.appCustomerController.customerReservation,
            data:{
                personalId: personalId
            }
        })
    }
  
}