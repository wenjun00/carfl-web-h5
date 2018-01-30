<!--还款总览-->
<template>
  <section class="component repay-sum">
    <div style="text-align:right">
      <i-button @click="applyDerate" class="blueButton" size="small" style="margin:10px;">申请减免</i-button>
      <i-button @click="applyFrozen" class="blueButton" size="small">申请冻结</i-button>
    </div>
    <data-grid :labelWidth="90" labelAlign="left" contentAlign="left">
      <data-grid-item label="客户姓名" :span="2">
        <template>
          <div>{{repaySumObj.personal?repaySumObj.personal.name:''}}</div>
        </template>
      </data-grid-item>
      <data-grid-item label="身份证号" :span="4">
        <template>
          <div>{{repaySumObj.personal?repaySumObj.personal.idCard:''}}</div>
        </template>
      </data-grid-item>
      <data-grid-item label="融资金额（元）" :span="2">
        <template>
          <div>{{repaySumObj.productOrder?repaySumObj.productOrder.financingAmount:''}}</div>
        </template>
      </data-grid-item>
      <data-grid-item label="期数" :span="2">
        <template>
          <div>{{repaySumObj.productOrder?repaySumObj.productOrder.periods:''}}</div>
        </template>
      </data-grid-item>
      <data-grid-item label="利率%/月" :span="2">
        <template>
          <div>{{repaySumObj.productOrder?repaySumObj.productOrder.productRate:''}}</div>
        </template>
      </data-grid-item>
    </data-grid>

    <table border="1" width="868" style="margin-top:10px;text-align:center;border:1px solid #DDDEE1">
      <tr height="40">
        <td bgcolor="#F2F2F2" colspan="3">还款</td>
        <td bgcolor="#F2F2F2" colspan="4">明细</td>
      </tr>
      <tr height="40">
        <td bgcolor="#F2F2F2">本金</td>
        <td>应付本金</td>
        <td>{{repaySumObj.productOrder?repaySumObj.productOrder.principalReceivable:''}}</td>
        <td>已还本金</td>
        <td>{{repaySumObj.productOrder?repaySumObj.productOrder.principalReceived:''}}</td>
        <td>剩余本金</td>
        <td>{{repaySumObj.productOrder?repaySumObj.productOrder.principalSurplus:''}}</td>
      </tr>
      <tr height="40">
        <td bgcolor="#F2F2F2">利息</td>
        <td>应还利息</td>
        <td>{{repaySumObj.productOrder?repaySumObj.productOrder.interestReceivable:''}}</td>
        <td>已还利息</td>
        <td>{{repaySumObj.productOrder?repaySumObj.productOrder.interestReceived:''}}</td>
        <td>剩余利息</td>
        <td>{{repaySumObj.productOrder?repaySumObj.productOrder.interestSurplus:''}}</td>
      </tr>
      <tr height="40">
        <td bgcolor="#F2F2F2">罚息</td>
        <td>应付罚息</td>
        <td>{{repaySumObj.productOrder?repaySumObj.productOrder.penaltyReceivable:''}}</td>
        <td>已还罚息</td>
        <td>{{repaySumObj.productOrder?repaySumObj.productOrder.penaltyReceived:''}}</td>
        <td>剩余罚息</td>
        <td><span style="color:red;text-decoration:line-through;margin-right:6px">{{repaySumObj.productOrder?repaySumObj.productOrder.principalReceivable:''}}</span><span>{{repaySumObj.productOrder?repaySumObj.productOrder.penaltySurplus:''}}</span></td>
      </tr>
      <tr height="40">
        <td bgcolor="#F2F2F2">合计</td>
        <td>应付</td>
        <td>{{repaySumObj.productOrder?repaySumObj.productOrder.principalReceivable:''}}</td>
        <td>已还本金</td>
        <td>{{repaySumObj.productOrder?repaySumObj.productOrder.principalReceivable:''}}</td>
        <td>剩余本金</td>
        <td>{{repaySumObj.productOrder?repaySumObj.productOrder.principalReceivable:''}}</td>
      </tr>
    </table>

    <template>
      <i-modal title="申请减免" v-model="applyDerateOpen">
        <apply-derate></apply-derate>
      </i-modal>
    </template>

    <template>
      <i-modal title="申请冻结" v-model="applyFrozenOpen">
        <apply-frozen></apply-frozen>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component'
  import ApplyDerate from '~/components/approval-manage/apply-derate.vue'
  import ApplyFrozen from '~/components/approval-manage/apply-frozen.vue'
  import {
    PaymentScheduleService
  } from "~/services/manage-service/paymentSchedule.service";
  import {
    DataGrid,
    DataGridItem
  } from "vue-fintech-component";
  import {
    Prop
  } from "vue-property-decorator";
  import {
    Dependencies
  } from "~/core/decorator";
  @Component({
    components: {
      DataGrid,
      DataGridItem,
      ApplyDerate,
      ApplyFrozen
    }
  })
  export default class RepaySum extends Vue {
    @Dependencies(PaymentScheduleService) private paymentScheduleService: PaymentScheduleService;
    private applyDerateOpen: Boolean = false
    private applyFrozenOpen: Boolean = false
    private repaySumObj: any = {}

    @Prop()
    row: Object;

    created() {

    }
    applyDerate() {
      this.applyDerateOpen = true
    }
    applyFrozen() {
      this.applyFrozenOpen = true
    }
    getRepaySum(orderId) {
      this.paymentScheduleService.getRepaymentOverview({
        orderId: orderId
      }).subscribe(val => {
        console.log('val', val)
        this.repaySumObj = val.object
      })
    }
  }

</script>
<style>


</style>
