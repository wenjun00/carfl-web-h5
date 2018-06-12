<template>
  <section class="page payment-record">
    <div class="break-line"> </div>
    <div class="payment-record-table">
      <van-row class="payment-record-table-title">
        <van-col :span="4">期数</van-col>
        <van-col :span="8">还款日期</van-col>
        <van-col :span="6">还款金额</van-col>
        <van-col :span="6">还款状态</van-col>
      </van-row>
      <div class="van-hairline--bottom"></div>
      <van-row class="payment-record-table-content" v-for="item in dataSet" :key="item.period">
        <van-col :span="4">{{`${item.periods}/${dataSet.length}`}}</van-col>
        <van-col :span="8">{{item.minRepayDate | dateFormat('yyyy-MM-dd')}}</van-col>
        <van-col class="payment-record-table-content-money" :span="6">￥{{item.sumAmount | toThousands}}</van-col>
        <van-col :class="`payment-record-table-content-state${item.state}`" :span="6">{{item.status | convertState}}</van-col>
      </van-row>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { PaymentScheduleControllerService } from "~/services/manage-service/payment-schedule-controller.service";
import { Dependencies } from "~/core/decorator";
import { State, Mutation, Action } from "vuex-class";
@Component({
  components: {
  },
  filters: {
    convertState: (key) => {
      let str = ''
      switch (key) {
        case 4:
          str = '已还清'
          break;
        case 3:
          str = '已逾期'
          break;
        case 2:
          str = '待还款'
          break;
        default:
          str = '未出账单'
          break;
      }
      return str
    }
  }
})
export default class PaymentRecord extends Vue {
  @Dependencies(PaymentScheduleControllerService) private paymentScheduleControllerService: PaymentScheduleControllerService;
  
  @State  userData
  private dataSet: any = []

  // private createTmpData(index) {
  //   let rand = Math.random()
  //   return {
  //     period: index,
  //     payDate: new Date(),
  //     payment: rand * 10000,
  //     state: 4
  //   }
  // }
  // 查询还款详情
  getPaymentDetails() {
    this.paymentScheduleControllerService.getPaymentScheduleList(9999).subscribe(
      data => {
       this.dataSet = data
       console.log(this.dataSet)
      },
      err => this.$toast(err.msg)
    )
  }

  mounted() {
    this.getPaymentDetails()
    // console.log(this.userData,'123')
    // this.dataSet = [];
    // let index = 1;
    // while (index <= 24) {
    //   this.dataSet.push(this.createTmpData(index))
    //   index++
    // }
  }

}
</script>

<style lang="less" scoped>
.payment-record {
  .break-line {
    background-color: #f2f2f2;
    height: 10px;
  }
  &-table {
    text-align: center;
    line-height: 40px;
    &-title {
      font-size: 0.9rem;
      font-weight: bold;
    }
    &-content {
      font-size: 0.8rem;
      color: gray;
      &-money {
        text-align: right;
        padding-right: 8px;
      }
      &-state {
        &3 {
          color: red;
        }
        &4 {
          color: goldenrod;
        }
      }
    }
  }
}
</style>

