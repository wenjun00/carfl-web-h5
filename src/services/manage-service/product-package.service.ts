import { manageService } from '~/config/server/manage-service'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";

export class ProductPackageService {
    @Inject()
    private netService: NetService

    /**
     * 多条件分页查询产品包信息  
     */
    @Debounce()
    getAllProductPackage(data, page) {
        return this.netService.send({
            server: manageService.productPackageController.getAllProductPackage,
            data,
            page
        })
    }
    /**
     * 删除产品包信息
     */
    @Debounce()
    deleteProductPackage({ id }) {
        return this.netService.send({
            server: manageService.productPackageController.deleteProductPackage,
            data: {
                id: id
            }
        })
    }
    /**
     * 下载产品包信息
     */
    @Debounce()
    downloadProductPackage({ fileId }) {
        return this.netService.send({
            server: manageService.productPackageController.downloadProductPackage,
            data: {
                fileId: fileId
            }
        })
    }
    /**
     * 新增产品包信息
     */
    createProductPackage(data) {
        return this.netService.send({
            server: manageService.productPackageController.createProductPackage,
            data: data
        })
    }
    /**
     * 下载模板
     */
    downloadTemplate() {
        return this.netService.send({
            server: manageService.productPackageController.downloadTemplate
        })
    }

    /**
   * 查询所有产品包
   */
    getAllProductPackageNoPage() {
        return this.netService.send({
            server: manageService.productPackageController.getAllProductPackageNoPage
        })
    }
}
