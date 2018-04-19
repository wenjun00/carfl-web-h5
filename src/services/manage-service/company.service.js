var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NetService } from '~/utils/net.service';
import { Inject } from "~/core/decorator";
import { manageService } from '~/config/server/manage-service';
var CompanyService = /** @class */ (function () {
    function CompanyService() {
    }
    /**
     * 获取所有公司
     */
    CompanyService.prototype.getAllCompany = function (data) {
        return this.netService.send({
            server: manageService.companyController.getAllCompany,
            data: data
        });
    };
    /**
    * 查询分公司信息
    */
    CompanyService.prototype.getAllCompanyWithPage = function (data, page) {
        return this.netService.send({
            server: manageService.companyController.getAllCompanyWithPage,
            data: data,
            page: page
        });
    };
    /**
    * 停用/启用
    */
    CompanyService.prototype.disableOrEnable = function (data) {
        return this.netService.send({
            server: manageService.companyController.disableOrEnable,
            data: data
        });
    };
    /**
    * 新增/修改公司信息
    */
    CompanyService.prototype.createOrModifyCompany = function (data) {
        return this.netService.send({
            server: manageService.companyController.createOrModifyCompany,
            data: data
        });
    };
    /**
     * 查询公司
     */
    CompanyService.prototype.getAllEnableCompany = function (data) {
        return this.netService.send({
            server: manageService.companyController.getAllEnableCompany,
            data: data
        });
    };
    __decorate([
        Inject(NetService)
    ], CompanyService.prototype, "netService", void 0);
    return CompanyService;
}());
export { CompanyService };
