var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NetService } from '~/utils/net.service';
import { Inject } from "~/core/decorator";
import { manageService } from '~/config/server/manage-service';
var FileUploadControllerService = /** @class */ (function () {
    function FileUploadControllerService() {
    }
    /**
     * 下载文件
     */
    FileUploadControllerService.prototype.file = function (_a) {
        var id = _a.id;
        return this.netService.send({
            server: manageService.fileUploadController.file,
            data: {
                id: id
            }
        });
    };
    /**
     * 查询文件信息
     */
    FileUploadControllerService.prototype.getAllUploadFileByIdList = function () {
        return this.netService.send({
            server: manageService.fileUploadController.getAllUploadFileByIdList,
        });
    };
    /**
     * 上传压缩文件，后台进行解压缩
     */
    FileUploadControllerService.prototype.unZipCaseFile = function (data) {
        return this.netService.send({
            server: manageService.fileUploadController.unZipCaseFile,
            data: data
        });
    };
    /**
   * Grid方式上传文件
   */
    FileUploadControllerService.prototype.uploadFileGrid = function () {
        return this.netService.send({
            server: manageService.fileUploadController.uploadFileGrid,
        });
    };
    /**
  * 在线显示文件
  */
    FileUploadControllerService.prototype.view = function (_a) {
        var id = _a.id;
        return this.netService.send({
            server: manageService.fileUploadController.view,
            data: {
                id: id
            }
        });
    };
    /**
     * 删除文件
     */
    FileUploadControllerService.prototype.delect = function (_a) {
        var id = _a.id;
        return this.netService.send({
            server: manageService.fileUploadController.delect,
            data: {
                id: id
            }
        });
    };
    __decorate([
        Inject(NetService)
    ], FileUploadControllerService.prototype, "netService", void 0);
    return FileUploadControllerService;
}());
export { FileUploadControllerService };
