var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NetService } from '~/utils/net.service';
import { Inject } from "~/core/decorator";
import { manageService } from '~/config/server/manage-service';
var DataDictService = /** @class */ (function () {
    function DataDictService() {
    }
    /**
     * 查询所有数据字典类型
     */
    DataDictService.prototype.getDataDictByTypeCode = function (_a) {
        var typeCode = _a.typeCode;
        return this.netService.send({
            server: manageService.dataDictController.getDataDictByTypeCode,
            data: {
                typeCode: typeCode
            }
        });
    };
    /**
     * 新增/修改数据字典项
     */
    DataDictService.prototype.createOrModifyDataDict = function (data) {
        return this.netService.send({
            server: manageService.dataDictController.createOrModifyDataDict,
            data: data
        });
    };
    /**
     * 删除数据字典项
     */
    DataDictService.prototype.deleteDataDict = function (_a) {
        var id = _a.id;
        return this.netService.send({
            server: manageService.dataDictController.deleteDataDict,
            data: {
                id: id
            }
        });
    };
    /**
     * 根据条件搜索对应的数字字典项
    */
    DataDictService.prototype.getAllDataDict = function (data, page) {
        return this.netService.send({
            server: manageService.dataDictController.getAllDataDict,
            data: data,
            page: page
        });
    };
    /**
     * 查询所有数据字典项(无typeCode)
    */
    DataDictService.prototype.getAll = function () {
        return this.netService.send({
            server: manageService.dataDictController.getAll,
        });
    };
    DataDictService.prototype.getDictHash = function () {
        return this.netService.send({
            server: manageService.dataDictController.getDictHash,
        });
    };
    /**
    * 获取字典数据
    */
    DataDictService.prototype.getDictData = function () {
        return this.netService.send({
            server: manageService.dataDictController.getDictData,
        });
    };
    /**
    * 分页查询数据字典类型对应的数据字典项
    */
    DataDictService.prototype.getDataDictByTypeCodeWithPage = function (data, page) {
        return this.netService.send({
            server: manageService.dataDictController.getDataDictByTypeCodeWithPage,
            data: data,
            page: page
        });
    };
    __decorate([
        Inject(NetService)
    ], DataDictService.prototype, "netService", void 0);
    return DataDictService;
}());
export { DataDictService };
