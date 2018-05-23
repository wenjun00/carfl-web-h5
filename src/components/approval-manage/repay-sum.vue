<!--还款总览-->
<template>
  <section class="component repay-sum">
    <div class="zonglan">
      <i-button class="jianmian blueButton" @click="applyDerate" size="small">申请减免</i-button>
      <i-button @click="applyFrozen" class="blueButton" size="small">申请冻结</i-button>
    </div>
    <data-grid :labelWidth="120" labelAlign="right" contentAlign="left">
      <data-grid-item label="客户姓名" :span="4">{{personal.name}}</data-grid-item>
      <data-grid-item label="身份证号" :span="8">{{personal.idCard}}</data-grid-item>
      <data-grid-item label="融资金额(元)" :span="4"> {{productOrder.financingAmount | toThousands}} </data-grid-item>
      <data-grid-item label="期数" :span="4"> {{productOrder.periods | dictConvert}} </data-grid-item>
      <data-grid-item label="月利率" :span="4"> {{productOrder.productRate | decimalToPrecent}} </data-grid-item>
    </data-grid>

    <table border="1" width="1018" class="mingxi">
      <tr height="40">
        <td bgcolor="#F2F2F2" colspan="3">还款</td>
        <td bgcolor="#F2F2F2" colspan="4">明细</td>
      </tr>
      <tr height="40">
        <td bgcolor="#F2F2F2">本金</td>
        <td>应付本金</td>
        <td>{{paymentSchedule.principalReceivable | toThousands}}</td>
        <td>已还本金</td>
        <td>{{paymentSchedule.principalReceived | toThousands}}</td>
        <td>剩余本金</td>
        <td>{{paymentSchedule.principalSurplus | toThousands}}</td>
      </tr>
      <tr height="40">
        <td bgcolor="#F2F2F2">利息</td>
        <td>应还利息</td>
        <td>{{paymentSchedule.interestReceivable | toThousands}}</td>
        <td>已还利息</td>
        <td>{{paymentSchedule.interestReceived | toThousands}}</td>
        <td>剩余利息</td>
        <td>{{paymentSchedule.interestSurplus | toThousands}}</td>
      </tr>
      <tr height="40">
        <td bgcolor="#F2F2F2">罚息</td>
        <td>应还罚息</td>
        <td>{{paymentSchedule.penaltyReceivable | toThousands}}</td>
        <td>已还罚息</td>
        <td>{{paymentSchedule.penaltyReceived | toThousands}}</td>
        <td>剩余罚息</td>
        <td>
          <span class="shengyu1">{{paymentSchedule.penaltyFreezeAddDerate | toThousands}}</span>
          <span class="shengyu2">{{paymentSchedule.penaltySurplus | toThousands}}</span>
        </td>
      </tr>
      <tr height="40">
        <td bgcolor="#F2F2F2">管理费</td>
        <td>应收管理费</td>
        <td>{{paymentSchedule.manageFeeReceivable}}</td>
        <td>实收管理费</td>
        <td>{{paymentSchedule.manageFeeReceived}}</td>
        <td>剩余管理费</td>
        <td>{{paymentSchedule.manageFeeSurplus}}</td>
      </tr>
      <tr height="40">
        <td bgcolor="#F2F2F2">合计</td>
        <td>应付</td>
        <td>{{paymentSchedule.amountReceivable | toThousands}}</td>
        <td>已还</td>
        <td>{{paymentSchedule.amountReceived | toThousands}}</td>
        <td>剩余</td>
        <td>{{paymentSchedule.amountSurplus | toThousands}}</td>
      </tr>
    </table>

    <template>
      <i-modal title="申请减免" v-model="applyDerateOpen" @on-visible-change="applyDerateModalOpen">
        <apply-derate ref="apply-derate" @close="closeAndRefreshDerate"></apply-derate>
        <div slot="footer">
          <i-button @click="cancelApplyDerate">取消</i-button>
          <i-button @click="confirmApplyDerate" class="blueButton">确定</i-button>
        </div>
      </i-modal>
    </template>

    <template>
      <i-modal title="申请冻结" v-model="applyFrozenOpen" @on-visible-change="applyFrozenModalOpen">
        <apply-frozen ref="apply-frozen" @close="closeAndRefreshFrozen"></apply-frozen>
        <div slot="footer">
          <i-button @click="cancelApplyFrozen">取消</i-button>
          <i-button @click="confirmApplyFrozen" class="blueButton">确定</i-button>
        </div>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import ApplyDerate from "~/components/approval-manage/apply-derate.vue";
import ApplyFrozen from "~/components/approval-manage/apply-frozen.vue";
import { PaymentScheduleService } from "~/services/manage-service/payment-schedule.service";
import { DataGrid, DataGridItem } from "@zct1989/vue-component";
import { Prop } from "vue-property-decorator";
import { Dependencies } from "~/core/decorator";

@Component({
  components: {
    DataGrid,
    DataGridItem,
    ApplyDerate,
    ApplyFrozen
  }
})
export default class RepaySum extends Vue {
  @Dependencies(PaymentScheduleService)
  private paymentScheduleService: PaymentScheduleService;
  private applyDerateOpen: Boolean = false;
  private applyFrozenOpen: Boolean = false;

  private repaySumObj: any = {
    productOrder: {}
  };
  private orderId: number = 0;

  get paymentSchedule() {
    return this.repaySumObj.paymentSchedule || {}
  }

  get personal() {
    return this.repaySumObj.personal || {}
  }

  get productOrder() {
    return this.repaySumObj.productOrder || {}
  }


  @Prop() row: Object;

  created() {
  }

  applyDerate() {
    this.applyDerateOpen = true;
    let _appDerate: any = this.$refs["apply-derate"];
    _appDerate.resetInput();
  }

  applyFrozen() {
    this.applyFrozenOpen = true;
    let _appFrozen: any = this.$refs["apply-frozen"];
    _appFrozen.resetInput();
  }

  getRepaySum(orderId) {
    this.orderId = orderId;
    this.paymentScheduleService
      .getRepaymentOverview({
        orderId: orderId
      })
      .subscribe(
        data => {
          this.repaySumObj = data;
        },
        ({ msg }) => {
          this.$Message.error(msg);
        }
      );
  }

  applyDerateModalOpen(val) {
    if (val) {
      let _applyDerate: any = this.$refs["apply-derate"];
      _applyDerate.getInterestInfo(this.repaySumObj, this.orderId);
    }
  }

  applyFrozenModalOpen(val) {
    if (val) {
      let _applyFrozen: any = this.$refs["apply-frozen"];
      _applyFrozen.getInterestInfo(this.repaySumObj, this.orderId);
    }
  }

  /**
   * 取消申请减免
   */
  cancelApplyDerate() {
    this.applyDerateOpen = false;
  }

  /**
   * 确定申请减免
   */
  confirmApplyDerate() {
    let _applyDerate: any = this.$refs["apply-derate"];
    _applyDerate.confirmApplyDerate();
  }

  closeAndRefreshDerate() {
    this.applyDerateOpen = false;
    this.getRepaySum(this.orderId);
  }

  cancelApplyFrozen() {
    this.applyFrozenOpen = false;
  }

  /**
   * 确定申请冻结
   */
  confirmApplyFrozen() {
    let _applyFrozen: any = this.$refs["apply-frozen"];
    _applyFrozen.confirmApplyFrozen();
  }

  closeAndRefreshFrozen() {
    this.applyFrozenOpen = false;
    this.getRepaySum(this.orderId);
  }
}
</script>
<style lang="less" scoped>
.zonglan {
  text-align: right;
}

.jianmian {
  margin: 10px;
}

.mingxi {
  margin-top: 10px;
  text-align: center;
  border: 1px solid #dddee1;
}

.shengyu1 {
  text-decoration: line-through;
  margin-right: 6px;
}

.shengyu2 {
  color: red;
}
</style>
