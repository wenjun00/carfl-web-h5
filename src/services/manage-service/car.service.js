var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NetService } from '~/utils/net.service';
import { Inject } from "~/core/decorator";
import { manageService } from '~/config/server/manage-service';
var CarService = /** @class */ (function () {
    function CarService() {
    }
    /**
     * 获取所有车辆系列
     */
    CarService.prototype.findAllCarSeries = function (data) {
        return this.netService.send({
            server: manageService.carController.findAllCarSeries,
            data: data
        });
    };
    /**
     * 查询车辆系列下所有车辆
     */
    CarService.prototype.findAllCarBySeries = function (_a) {
        var seriesId = _a.seriesId, brandId = _a.brandId, carId = _a.carId;
        return this.netService.send({
            server: manageService.carController.findAllCarBySeries,
            data: {
                seriesId: seriesId,
                brandId: brandId,
                carId: carId
            }
        });
    };
    /**
     * 新增车辆
     */
    CarService.prototype.addVehicle = function (data) {
        return this.netService.send({
            server: manageService.carController.addVehicle,
            data: data
        });
    };
    /**
     * 搜索
     */
    CarService.prototype.seachCar = function (_a) {
        var carParam = _a.carParam;
        return this.netService.send({
            server: manageService.carController.seachCar,
            data: {
                carParam: carParam
            }
        });
    };
    /**
     * 修改车辆信息
     */
    CarService.prototype.updateVehicle = function (data) {
        return this.netService.send({
            server: manageService.carController.updateVehicle,
            data: data
        });
    };
    /**
     * 所有品牌
     */
    CarService.prototype.getAllBrand = function () {
        return this.netService.send({
            server: manageService.carController.getAllBrand,
        });
    };
    /**
     * 所有型号
     */
    CarService.prototype.getAllModel = function () {
        return this.netService.send({
            server: manageService.carController.getAllModel,
        });
    };
    /**
     * 所有系列
     */
    CarService.prototype.getAllSeries = function () {
        return this.netService.send({
            server: manageService.carController.getAllSeries,
        });
    };
    /**
     * 根据车辆id获取车辆系列
     */
    CarService.prototype.getSeriesByBrandId = function (_a) {
        var brandId = _a.brandId;
        return this.netService.send({
            data: {
                brandId: brandId
            },
            server: manageService.carController.getSeriesByBrandId,
        });
    };
    /**
     * 新增系列
     */
    CarService.prototype.createCarSeries = function (_a) {
        var brandId = _a.brandId, seriesName = _a.seriesName;
        return this.netService.send({
            data: {
                brandId: brandId,
                seriesName: seriesName
            },
            server: manageService.carController.createCarSeries,
        });
    };
    /**
     * 根据车辆系列id获取车辆品牌
     */
    CarService.prototype.getCarBrandBySeriesId = function (_a) {
        var seriesId = _a.seriesId;
        return this.netService.send({
            data: {
                seriesId: seriesId
            },
            server: manageService.carController.getCarBrandBySeriesId,
        });
    };
    /**
     * 新增车辆品牌
     */
    CarService.prototype.createCarBrand = function (_a) {
        var brandName = _a.brandName;
        return this.netService.send({
            data: {
                brandName: brandName
            },
            server: manageService.carController.createCarBrand,
        });
    };
    /**
     * 修改车辆品牌和系列
     */
    CarService.prototype.modifyCarInfo = function (data) {
        return this.netService.send({
            server: manageService.carController.modifyCarInfo,
            data: data
        });
    };
    __decorate([
        Inject(NetService)
    ], CarService.prototype, "netService", void 0);
    return CarService;
}());
export { CarService };
