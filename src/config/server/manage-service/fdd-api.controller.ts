// 四要素
import { requestType } from "~/config/enum.config";
const SERVICE = 'service-manage'
const CONTROLLER = 'fddApi' 



export default {
    /**
     * 四要素验证
     */
    getInvokeFourElementVerify: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'getInvokeFourElementVerify',
        type: requestType.Get
    },    

}