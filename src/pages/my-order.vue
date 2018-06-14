<template>
  <section class="page my-order">
    <div v-if="!hasOrder" class="my-order-no" key="no-order">
      <img src="/static/images/home/no-order.png" />
    </div>
    <div v-else key="has-order">
      <van-cell-group>
        <van-cell :title="`订单编号：${productOrderInfo.orderNumber}`"></van-cell>
        <van-cell :title="`车型：${productOrderInfo.orderCar.modelName}`"></van-cell>
        <van-cell title="下单城市" is-link :value="[productOrderInfo.city] | cityConvert " />
        <van-cell :title="`首付：${productOrderInfo.schedulePlanResultModel.schedulePlanResult.firstPayment} 元`"></van-cell>
        <van-cell :title="`期数：${productOrderInfo.schedulePlanResultModel.schedulePlanResult.planType} 期`"></van-cell>
        <van-cell :title="`月供信息：${productOrderInfo.schedulePlanResultModel.schedulePlanResult.firstYearMonthrent}元 `"></van-cell>
      </van-cell-group>
      <van-collapse v-model="activatedCollapse">
        <van-collapse-item title="合同详情" name="contract">
          <order-contract :orderId="orderInfo.id"></order-contract>
        </van-collapse-item>
        <div @click="operating">
          <van-collapse-item title="订单操作记录" name="record">
            <order-record ref="order-record" :orderId="orderInfo.id"></order-record>
          </van-collapse-item>
        </div>
      </van-collapse>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import NavBar from "~/components/common/nav-bar.vue";
import OrderContract from "~/components/order/order-contract.vue";
import OrderRecord from "~/components/order/order-record.vue";
import { Getter, State } from "vuex-class";
import { ProductOrderService } from "~/services/manage-service/product-order.service";
import { Dependencies } from "~/core/decorator";
import { CityService } from "~/utils/city.service";
import { setTimeout } from "core-js";
@Component({
  components: {
    OrderContract,
    OrderRecord
  }
})
export default class MyOrder extends Vue {
  @Dependencies(ProductOrderService) private productOrderService: ProductOrderService;
  @Getter hasOrder;
  @State orderInfo
  @State userData


  private orderNumber: any = ''  // 获取当前订单号
  private activatedCollapse = []
  private productOrderInfo: any = {} // 订单基本信息 存储

  getOredrMessage() {
    this.productOrderService.findOrderInfoByOrderNumber(this.orderNumber).subscribe(
      data => {
        this.productOrderInfo = data
      },
      err => this.$toast(err.msg)
    )
  }
  /**
   * 操作记录
   */
  operating() {
    let a = this.productOrderInfo.orderProcessRecord
    let orderRecord = this.$refs['order-record'] as OrderRecord
    orderRecord.orderRecordfun(a)
  }

  // /**
  //  * 查询订单
  //  */
   getOrderNumber() {
    this.productOrderService.getOrder(this.userData.userPhone).subscribe(
      data => {
        console.log(data,'123')
      },
      err => this.$toast(err.msg)
    )
  }



  mounted() {
    this.getOrderNumber()
    this.orderNumber = this.orderInfo.orderNumber
    this.getOredrMessage()
  }

}
</script>

<style lang="less" scoped>
.my-order {
  &-no {
    margin-top: 20%;
    text-align: center;
  }
  &-title {
    height: 44px;
    line-height: 44px;
    .van-col {
      padding-left: 15px;
    }
  }
  &-month-pay {
    font-size: 0.8rem;
    color: gray;
    .van-col {
      padding-left: 15px;
      height: 30px;
      line-height: 30px;
    }
  }
}
</style>

