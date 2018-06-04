<template>
  <section class="page my-order">
    <div v-if="!hasOrder" class="my-order-no" key="no-order">
      <img src="/static/images/home/no-order.png" />
    </div>
    <div v-else key="has-order">
      <van-cell-group>
        <van-row class="my-order-title">
          <van-col :span="16">待客户补充资料</van-col>
          <van-col :span="8">
            <van-button type="primary" size="small" @click="$router.push('/upload-id-photo-first')">上传资料</van-button>
          </van-col>
        </van-row>
        <van-cell :title="`订单编号：${orderInfo.no}`"></van-cell>
        <van-cell :title="`车型：${orderInfo.carModle}`"></van-cell>
        <van-cell :title="`下单城市：${orderInfo.city}`"></van-cell>
        <van-cell :title="`首付：${orderInfo.firstPayment} 元`"></van-cell>
        <van-cell :title="`期数：${orderInfo.periods} 期`"></van-cell>
        <van-panel title="月供信息：">
          <div class="my-order-month-pay">
            <van-row>
              <van-col :span="12" v-for="(item,index) of orderInfo.monthPayment" :key="index">第{{index + 1}}年月供：{{ item | toThousands}}元</van-col>
            </van-row>
          </div>
        </van-panel>
      </van-cell-group>
      <van-collapse v-model="activatedCollapse">
        <van-collapse-item title="合同详情" name="contract">
          <order-contract :orderId="orderInfo.id"></order-contract>
        </van-collapse-item>
        <van-collapse-item title="订单操作记录" name="record">
          <order-record :orderId="orderInfo.id"></order-record>
        </van-collapse-item>
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

@Component({
  components: {
    OrderContract,
    OrderRecord
  }
})
export default class MyOrder extends Vue {


  get hasOrder() {
    return this.orderInfo.id !== undefined
  }

  private orderInfo: any = {}
  private activatedCollapse = []



  private getOrder() {
    //this.orderInfo = {}
    this.orderInfo = {
      id: 11023,
      no: 'NT20180302118855',
      carModle: '2017款 福睿斯 1.5L 自动舒适型',
      city: '深圳',
      firstPayment: 30000,
      periods: 48,
      monthPayment: [3263.25, 3725.25, 3500.25, 3300.25]
    }
  }

  activated() {
    this.getOrder()
  }

  mounted() {
    this.getOrder()
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

