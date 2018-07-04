// 四要素
import { requestType } from "~/config/enum.config";
const SERVICE = 'service-manage'
const CONTROLLER = 'fddApi' 



export default {
    /**
     * 四要素验证
     */
    getInvokeFourElementVerifyForH5: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'getInvokeFourElementVerifyForH5',
        type: requestType.Get
    },    

}