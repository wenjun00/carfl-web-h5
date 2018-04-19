var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NetService } from '~/utils/net.service';
import { Inject } from "~/core/decorator";
import { manageService } from '~/config/server/manage-service';
var DepartmentService = /** @class */ (function () {
    function DepartmentService() {
    }
    /**
     * 新增组织机构
     */
    DepartmentService.prototype.createDepartment = function (data) {
        return this.netService.send({
            server: manageService.departmentController.createDepartment,
            data: data
        });
    };
    /**
     * 删除组织机构
     */
    DepartmentService.prototype.deleteDept = function (_a) {
        var deptId = _a.deptId;
        return this.netService.send({
            server: manageService.departmentController.deleteDept,
            data: {
                deptId: deptId
            }
        });
    };
    /**
     * 更新组织机构
     */
    DepartmentService.prototype.updateDepartment = function (data) {
        return this.netService.send({
            server: manageService.departmentController.updateDepartment,
            data: data
        });
    };
    /**
     * 根据机构查询公司
     */
    DepartmentService.prototype.findCompanyByDeptId = function (_a) {
        var deptId = _a.deptId;
        return this.netService.send({
            server: manageService.departmentController.findCompanyByDeptId,
            data: {
                deptId: deptId
            }
        });
    };
    __decorate([
        Inject(NetService)
    ], DepartmentService.prototype, "netService", void 0);
    return DepartmentService;
}());
export { DepartmentService };
