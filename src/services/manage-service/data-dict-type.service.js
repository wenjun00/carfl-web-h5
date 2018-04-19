var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NetService } from '~/utils/net.service';
import { Inject } from "~/core/decorator";
import { manageService } from '~/config/server/manage-service';
var DataDictTypeService = /** @class */ (function () {
    function DataDictTypeService() {
    }
    /**
     * 查询所有数据字典类型
     */
    DataDictTypeService.prototype.getAllDictType = function () {
        return this.netService.send({
            server: manageService.dataDictTypeController.getAllDictType,
        });
    };
    DataDictTypeService.prototype.createOrModifyDataDictType = function (data) {
        return this.netService.send({
            server: manageService.dataDictTypeController.createOrModifyDataDictType,
            data: data
        });
    };
    __decorate([
        Inject(NetService)
    ], DataDictTypeService.prototype, "netService", void 0);
    return DataDictTypeService;
}());
export { DataDictTypeService };
