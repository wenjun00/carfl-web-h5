var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// 审批管理service
import { contractService } from '~/config/server/contract-service';
import { NetService } from '~/utils/net.service';
import { Inject } from "~/core/decorator";
var ContractService = /** @class */ (function () {
    function ContractService() {
    }
    /**
     * 生成合同
     */
    ContractService.prototype.createOneContract = function (data) {
        return this.netService.send({
            server: contractService.contractController.createOneContract,
            data: data
        });
    };
    /**
     * 合同资料的上传
     */
    ContractService.prototype.uploadContractResource = function (data) {
        return this.netService.send({
            server: contractService.contractController.uploadContractResource,
            data: data
        });
    };
    /**
     * 查看订单合同资料
     */
    ContractService.prototype.getContractResourceAll = function (data) {
        return this.netService.send({
            server: contractService.contractController.getContractResourceAll,
            data: data
        });
    };
    __decorate([
        Inject(NetService)
    ], ContractService.prototype, "netService", void 0);
    return ContractService;
}());
export { ContractService };
