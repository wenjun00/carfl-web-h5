<!--还款总览-->
<template>
  <section class="component repay-sum">
    <div class="zonglan">
      <i-button class="jianmian blueButton" @click="applyDerate" size="small">申请减免</i-button>
      <i-button @click="applyFrozen" class="blueButton" size="small">申请冻结</i-button>
    </div>
    <data-grid :labelWidth="110" labelAlign="left" contentAlign="left">
      <data-grid-item label="客户姓名" :span="2">
        <template>
          <div>{{repaySumObj.personal?repaySumObj.personal.name:''}}</div>
        </template>
      </data-grid-item>
      <data-grid-item label="身份证号" :span="3">
        <template>
          <div>{{repaySumObj.personal?repaySumObj.personal.idCard:''}}</div>
        </template>
      </data-grid-item>
      <data-grid-item label="融资金额(元)" :span="3">
        <template>
          <div>{{repaySumObj.productOrder?repaySumObj.productOrder.financingAmount:''}}</div>
        </template>
      </data-grid-item>
      <data-grid-item label="期数" :span="2">
        <template>
          <div>{{repaySumObj.productOrder?$dict.getDictName(repaySumObj.productOrder.periods):''}}</div>
        </template>
      </data-grid-item>
      <data-grid-item label="月利率" :span="2">
        <template>
          <div>{{repaySumObj.productOrder.productRate | decimalToPrecent}}</div>
        </template>
      </data-grid-item>
    </data-grid>

    <table border="1" width="1018" class="mingxi">
      <tr height="40">
        <td bgcolor="#F2F2F2" colspan="3">还款</td>
        <td bgcolor="#F2F2F2" colspan="4">明细</td>
      </tr>
      <tr height="40">
        <td bgcolor="#F2F2F2">本金</td>
        <td>应付本金</td>
        <td>{{repaySumObj.paymentSchedule?repaySumObj.paymentSchedule.principalReceivable:0}}</td>
        <td>已还本金</td>
        <td>{{repaySumObj.paymentSchedule?repaySumObj.paymentSchedule.principalReceived:0}}</td>
        <td>剩余本金</td>
        <td>{{repaySumObj.paymentSchedule?repaySumObj.paymentSchedule.principalSurplus:0}}</td>
      </tr>
      <tr height="40">
        <td bgcolor="#F2F2F2">利息</td>
        <td>应还利息</td>
        <td>{{repaySumObj.paymentSchedule?repaySumObj.paymentSchedule.interestReceivable:0}}</td>
        <td>已还利息</td>
        <td>{{repaySumObj.paymentSchedule?repaySumObj.paymentSchedule.interestReceived:0}}</td>
        <td>剩余利息</td>
        <td>{{repaySumObj.paymentSchedule?repaySumObj.paymentSchedule.interestSurplus:0}}</td>
      </tr>
      <tr height="40">
        <td bgcolor="#F2F2F2">罚息</td>
        <td>应还罚息</td>
        <td>{{repaySumObj.paymentSchedule?repaySumObj.paymentSchedule.penaltyReceivable:0}}</td>
        <td>已还罚息</td>
        <td>{{repaySumObj.paymentSchedule?repaySumObj.paymentSchedule.penaltyReceived:0}}</td>
        <td>剩余罚息</td>
        <td>
          <span
            class="shengyu1">{{repaySumObj.paymentSchedule?(repaySumObj.paymentSchedule.penaltyFreezeAddDerate):0}}</span>
          <span class="shengyu2">{{repaySumObj.paymentSchedule?repaySumObj.paymentSchedule.penaltySurplus:''}}</span>
        </td>
      </tr>
      <tr height="40">
        <td bgcolor="#F2F2F2">合计</td>
        <td>应付</td>
        <td>{{repaySumObj.paymentSchedule?repaySumObj.paymentSchedule.amountReceivable:0}}</td>
        <td>已还</td>
        <td>{{repaySumObj.paymentSchedule?repaySumObj.paymentSchedule.amountReceived:0}}</td>
        <td>剩余</td>
        <td>{{repaySumObj.paymentSchedule?repaySumObj.paymentSchedule.amountSurplus:0}}</td>
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
  import {PaymentScheduleService} from "~/services/manage-service/payment-schedule.service";
  import {DataGrid, DataGridItem} from "@zct1989/vue-component";
  import {Prop} from "vue-property-decorator";
  import {Dependencies} from "~/core/decorator";

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
      productOrder:{}
    };
    private orderId: number = 0;
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
          ({msg}) => {
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
    text-align: right
  }

  .jianmian {
    margin: 10px;
  }

  .mingxi {
    margin-top: 10px;
    text-align: center;
    border: 1px solid #DDDEE1
  }

  .shengyu1 {
    text-decoration: line-through;
    margin-right: 6px
  }

  .shengyu2 {
    color: red;
  }
</style>
