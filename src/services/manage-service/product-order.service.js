var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { manageService } from '~/config/server/manage-service';
import { NetService } from '~/utils/net.service';
import { Inject } from "~/core/decorator";
var ProductOrderService = /** @class */ (function () {
    function ProductOrderService() {
    }
    /**
     * 获取订单交接列表
     */
    ProductOrderService.prototype.getOrderHandover = function (data, page) {
        return this.netService.send({
            server: manageService.productOrderController.getOrderHandover,
            data: data,
            page: page
        });
    };
    /**
     * 进件模块 - 订单交接 - 交接记录查询
     */
    ProductOrderService.prototype.findOrderHandoverHistory = function (data) {
        return this.netService.send({
            server: manageService.productOrderController.findOrderHandoverHistory,
            data: data
        });
    };
    /**
     * 进件模块-订单交接
     */
    ProductOrderService.prototype.orderTransfer = function (data) {
        return this.netService.send({
            server: manageService.productOrderController.orderTransfer,
            data: data
        });
    };
    /**
     * 根据订单号获取订单详情
     */
    ProductOrderService.prototype.findOrderInfoByOrderNumber = function (_a) {
        var orderNumber = _a.orderNumber;
        return this.netService.send({
            server: manageService.productOrderController.findOrderInfoByOrderNumber,
            data: {
                orderNumber: orderNumber
            }
        });
    };
    /**
     * 进件模块--订单查询
     */
    ProductOrderService.prototype.orderSearch = function (data, page) {
        return this.netService.send({
            server: manageService.productOrderController.orderSearch,
            data: data,
            page: page
        });
    };
    /**
       * 创建全额付款订单
       */
    ProductOrderService.prototype.createFullPaymentOrder = function (data) {
        return this.netService.send({
            server: manageService.productOrderController.createFullPaymentOrder,
            data: data
        });
    };
    /**
     * 创建融资租赁订单
     */
    ProductOrderService.prototype.saveFinanceApplyInfo = function (data) {
        return this.netService.send({
            server: manageService.productOrderController.saveFinanceApplyInfo,
            data: data
        });
    };
    /**
     * 批量导出订单列表
     */
    ProductOrderService.prototype.exportProductList = function (_a) {
        var ids = _a.ids;
        return this.netService.send({
            server: manageService.productOrderController.exportProductList,
            data: {
                ids: ids
            }
        });
    };
    /**
     * 查询订单状态变更列表
     */
    ProductOrderService.prototype.getOrderStatusChange = function (_a, page) {
        var orderInfo = _a.orderInfo;
        return this.netService.send({
            server: manageService.productOrderController.getOrderStatusChange,
            data: {
                orderInfo: orderInfo
            },
            page: page
        });
    };
    /**
     * 订单状态变更
     */
    ProductOrderService.prototype.changeOrderStatus = function (_a) {
        var orderId = _a.orderId, linkId = _a.linkId;
        return this.netService.send({
            server: manageService.productOrderController.changeOrderStatus,
            data: {
                orderId: orderId,
                linkId: linkId
            }
        });
    };
    /**
     * 根据订单id获取订单前期流程
     */
    ProductOrderService.prototype.getPreProcess = function (_a) {
        var orderId = _a.orderId;
        return this.netService.send({
            server: manageService.productOrderController.getPreProcess,
            data: {
                orderId: orderId
            }
        });
    };
    __decorate([
        Inject(NetService)
    ], ProductOrderService.prototype, "netService", void 0);
    return ProductOrderService;
}());
export { ProductOrderService };
