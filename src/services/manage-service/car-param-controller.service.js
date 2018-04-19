var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// 车辆参数管理service
import { manageService } from '~/config/server/manage-service';
import { NetService } from '~/utils/net.service';
import { Inject } from "~/core/decorator";
var CarParamControllerService = /** @class */ (function () {
    function CarParamControllerService() {
    }
    /**
     * 删除车辆参数
     */
    CarParamControllerService.prototype.deleteCarParam = function (_a) {
        var id = _a.id;
        return this.netService.send({
            server: manageService.carParamController.deleteCarParam,
            data: {
                id: id
            }
        });
    };
    /**
   * 获取所有的车辆参数
   */
    CarParamControllerService.prototype.findAll = function (data) {
        return this.netService.send({
            server: manageService.carParamController.findAll,
        });
    };
    /**
  * 查询对应的车辆参数的类型的参数
  */
    CarParamControllerService.prototype.getCarParamByCode = function (_a) {
        var code = _a.code;
        return this.netService.send({
            server: manageService.carParamController.getCarParamByCode,
            data: {
                code: code
            }
        });
    };
    /**
  * 新增或者修改车辆参数
  */
    CarParamControllerService.prototype.saveOrUpdate = function (_a) {
        var carParams = _a.carParams;
        return this.netService.send({
            server: manageService.carParamController.saveOrUpdate,
            data: {
                carParams: carParams
            }
        });
    };
    __decorate([
        Inject(NetService)
    ], CarParamControllerService.prototype, "netService", void 0);
    return CarParamControllerService;
}());
export { CarParamControllerService };
