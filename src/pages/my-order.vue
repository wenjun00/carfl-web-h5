<template>
  <section class="page my-order">
    <div v-if="!hasOrder" class="my-order-no" key="no-order">
      <img src="/static/images/home/no-order.png" />
    </div>
    <div v-else key="has-order">
      <van-cell-group>
        <van-cell :title="`订单编号：${productOrderInfo.orderReference }`"></van-cell>
        <van-cell :title="`车型：${productOrderInfo.carType}`"></van-cell>
        <van-cell title="下单城市" is-link :value="productOrderInfo.placeCity | cityConvert" />
        <van-cell :title="`首付：${productOrderInfo.downPayment} 元`"></van-cell>
        <van-cell :title="`期数：${productOrderInfo.periods} 期`"></van-cell>
        <van-cell :title="`月供信息：${productOrderInfo.informationOn}元 `"></van-cell>
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
  private productOrderInfo: any = {
    orderReference: '',    // 订单编号
    carType: '',  //车型
    placeCity: '',  // 下单城市
    downPayment: '',  // 首付
    periods: '',   // 期数
    informationOn: '', // 月供信息



  } // 订单基本信息 存储


  /**
   * 通过订单号查询订单信息
   */
  getOredrMessage() {
    this.productOrderService.findOrderInfoByOrderNumber(this.orderInfo.orderNo).subscribe(
      data => {
        // this.productOrderInfo = data
        this.productOrderInfo.orderReference = data.orderNumber
        this.productOrderInfo.carType = data.orderCar.modelName
        this.productOrderInfo.placeCity = [data.city]
        this.productOrderInfo.downPayment = data.schedulePlanResultModel.schedulePlanResult.firstPayment
        this.productOrderInfo.periods = data.schedulePlanResultModel.schedulePlanResult.planType
        this.productOrderInfo.informationOn = data.schedulePlanResultModel.schedulePlanResult.firstYearMonthrent
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




  mounted() {
    this.$loading.show()
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

