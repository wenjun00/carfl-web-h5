var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NetService } from '~/utils/net.service';
import { Inject } from "~/core/decorator";
import { manageService } from '~/config/server/manage-service';
var PersonalService = /** @class */ (function () {
    function PersonalService() {
    }
    /**
     * 根据客户三项查询历史订单
     */
    PersonalService.prototype.getCustomerHistoryFinanceInfo = function (data) {
        return this.netService.send({
            server: manageService.personalController.getCustomerHistoryFinanceInfo,
            data: data
        });
    };
    /**
     * 客户信息查询
     */
    PersonalService.prototype.getPersonalMessage = function (_a) {
        var personalId = _a.personalId;
        return this.netService.send({
            server: manageService.personalController.getPersonalMessage,
            data: {
                personalId: personalId
            }
        });
    };
    /**
    * 客户号获取开户信息
    */
    PersonalService.prototype.getBankByClientNumber = function (_a) {
        var clientNumber = _a.clientNumber, settleChannel = _a.settleChannel;
        return this.netService.send({
            server: manageService.personalController.getBankByClientNumber,
            data: {
                clientNumber: clientNumber,
                settleChannel: settleChannel
            }
        });
    };
    /**
     * 获取客户开户列表
     */
    PersonalService.prototype.getCustomerAccountList = function (data, page) {
        return this.netService.send({
            server: manageService.personalController.getCustomerAccountList,
            data: data,
            page: page
        });
    };
    /**
     * 获取客户签约列表
     */
    PersonalService.prototype.getCustomerSignList = function (data, page) {
        return this.netService.send({
            server: manageService.personalController.getCustomerSignList,
            data: data,
            page: page
        });
    };
    /**
     * 修改结算通道
     */
    PersonalService.prototype.modifySettleChannel = function (_a) {
        var settleChannel = _a.settleChannel, id = _a.id;
        return this.netService.send({
            server: manageService.personalController.modifySettleChannel,
            data: {
                settleChannel: settleChannel,
                id: id
            }
        });
    };
    /**
     * 进件模块-客户资料
     */
    PersonalService.prototype.getCustomerDataOrder = function (data, page) {
        return this.netService.send({
            server: manageService.personalController.getCustomerDataOrder,
            data: data,
            page: page
        });
    };
    /**
     * 上传客户审批资料
     */
    PersonalService.prototype.uploadPersonalApproveFile = function (_a) {
        var personalDataModel = _a.personalDataModel;
        return this.netService.send({
            server: manageService.personalController.uploadPersonalApproveFile,
            data: {
                personalDataModel: personalDataModel
            }
        });
    };
    __decorate([
        Inject(NetService)
    ], PersonalService.prototype, "netService", void 0);
    return PersonalService;
}());
export { PersonalService };
