// 产品service
import { manageService } from '~/config/server/manage-service'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { requestType } from "~/config/enum.config";

export class ProductService {
    @Inject(NetService)
    private netService: NetService

    /**
     * 配置产品流程--添加
     */
    configureProductProcessAdd(data) {
        return this.netService.send({
            server: manageService.productController.configureProductProcessAdd,
            data: data
        })
    }
    /**
     * 
     * @param data 配置产品流程--删除
     */
    configureProductProcessDelete(data) {
        return this.netService.send({
            server: manageService.productController.configureProductProcessDelete,
            data: data
        })
    }
    /**
     * 配置产品流程--上下移动
     */
    configureProductProcessMove(data) {
        return this.netService.send({
            server: manageService.productController.configureProductProcessMove,
            data: data
        })
    }
    /**
     * 新增修改产品
     */
    createOrModifyProduct(data) {
        return this.netService.send({
            server: manageService.productController.createOrModifyProduct,
            data: data
        })
    }
    /**
     * 删除产品
     */
    deleteProduct({ id }) {
        return this.netService.send({
            server: manageService.productController.deleteProduct,
            id: id
        })
    }
    /**
     * 查询所有产品 ---树形结构
     */
    getAllProduct() {
        return this.netService.send({
            server: manageService.productController.getAllProduct,
        })
    }
    /**
     * 查询产品名称及序列号 租金渠道
     */
    getProductById({ id }) {
        return this.netService.send({
            server: manageService.productController.getProductById,
            data: {
                id: id
            }
        })
    }
}
