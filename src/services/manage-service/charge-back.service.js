var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// 审批管理service
import { manageService } from '~/config/server/manage-service';
import { NetService } from '~/utils/net.service';
import { Inject } from "~/core/decorator";
import { FilterService } from "~/utils/filter.service";
var ChargeBackService = /** @class */ (function () {
    function ChargeBackService() {
    }
    /**
     * 客户开户
     */
    ChargeBackService.prototype.createPersonalAccount = function (data) {
        return this.netService.send({
            server: manageService.chargeBackController.createPersonalAccount,
            data: data
        });
    };
    /**
     * 获取个人开户列表
     */
    ChargeBackService.prototype.getPersonalAccountList = function (data, page) {
        return this.netService.send({
            server: manageService.chargeBackController.getPersonalAccountList,
            data: {
                orderInfo: data.orderInfo,
                createDateStart: FilterService.dateFormat(data.createDateStart, 'yyyy-MM-dd'),
                createDateEnd: FilterService.dateFormat(data.createDateEnd, 'yyyy-MM-dd'),
                timeSearch: data.timeSearch
            },
            page: page
        });
    };
    /**
     *
     * 获取划扣记录
     */
    ChargeBackService.prototype.getChargeRecordList = function (data, page) {
        return this.netService.send({
            server: manageService.chargeBackController.getChargeRecordList,
            data: {
                startTime: FilterService.dateFormat(data.startTime, 'yyyy-MM-dd'),
                endTime: FilterService.dateFormat(data.endTime, 'yyyy-MM-dd'),
                payStatus: data.payStatus,
                personalInfo: data.personalInfo,
                personalId: data.personalId
            },
            page: page
        });
    };
    /**
     * 获取客户银行卡信息
     */
    ChargeBackService.prototype.getPersonalBank = function (data) {
        return this.netService.send({
            server: manageService.chargeBackController.getPersonalBank,
            data: data
        });
    };
    /**
     * 划扣
     */
    ChargeBackService.prototype.saveChargeback = function (data) {
        return this.netService.send({
            server: manageService.chargeBackController.saveChargeback,
            data: data
        });
    };
    /**
     * 解绑银行卡
     */
    ChargeBackService.prototype.removePersonalBank = function (data) {
        return this.netService.send({
            server: manageService.chargeBackController.removePersonalBank,
            data: data
        });
    };
    /**
     * 更换银行卡
     */
    ChargeBackService.prototype.updatePersonalBank = function (data) {
        return this.netService.send({
            server: manageService.chargeBackController.updatePersonalBank,
            data: data
        });
    };
    __decorate([
        Inject(NetService)
    ], ChargeBackService.prototype, "netService", void 0);
    return ChargeBackService;
}());
export { ChargeBackService };
