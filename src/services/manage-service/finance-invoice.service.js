var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//backlog-controller : 待办事项管理
import { manageService } from '~/config/server/manage-service';
import { NetService } from '~/utils/net.service';
import { Inject } from "~/core/decorator";
var FinanceInvoiceService = /** @class */ (function () {
    function FinanceInvoiceService() {
    }
    /**
     * 财务开票列表
     */
    FinanceInvoiceService.prototype.getFinanceInvoiceList = function (data, page) {
        return this.netService.send({
            server: manageService.financeInvoiceController.getFinanceInvoiceList,
            data: data,
            page: page
        });
    };
    __decorate([
        Inject(NetService)
    ], FinanceInvoiceService.prototype, "netService", void 0);
    return FinanceInvoiceService;
}());
export { FinanceInvoiceService };
