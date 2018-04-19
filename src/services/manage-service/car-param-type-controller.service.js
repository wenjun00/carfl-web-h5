var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// 车辆参数类型管理service
import { manageService } from '~/config/server/manage-service';
import { NetService } from '~/utils/net.service';
import { Inject } from "~/core/decorator";
var CarParamTypeControllerService = /** @class */ (function () {
    function CarParamTypeControllerService() {
    }
    /**
     * 根据车辆ID获取所有的参数类型
     */
    CarParamTypeControllerService.prototype.getCarParamTypeByCarId = function (_a) {
        var carId = _a.carId;
        return this.netService.send({
            server: manageService.carParamTypeController.getCarParamTypeByCarId,
            data: {
                carId: carId
            }
        });
    };
    /**
   * 新增或者修改参数类型
   */
    CarParamTypeControllerService.prototype.saveOrUpdate = function (data) {
        return this.netService.send({
            server: manageService.carParamTypeController.saveOrUpdate,
            data: data
        });
    };
    __decorate([
        Inject(NetService)
    ], CarParamTypeControllerService.prototype, "netService", void 0);
    return CarParamTypeControllerService;
}());
export { CarParamTypeControllerService };
