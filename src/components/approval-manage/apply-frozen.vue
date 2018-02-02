<!--申请冻结-->
<template>
  <section class="component apply-frozen">
    <data-grid :labelWidth="120">
      <data-grid-item label="应还罚息" :span="6">
        <template>
          <div>{{repaySumObj.paymentSchedule?repaySumObj.paymentSchedule.penaltyReceivable:0}}</div>
        </template>
      </data-grid-item>
      <data-grid-item label="已还罚息" :span="6">
        <template>
          <div>{{repaySumObj.paymentSchedule?repaySumObj.paymentSchedule.penaltyReceived:0}}</div>
        </template>
      </data-grid-item>
      <data-grid-item label="可冻结罚息" :span="6">
        <template>
          <div>{{repaySumObj.paymentSchedule?repaySumObj.paymentSchedule.penaltyReceivable:0}}</div>
        </template>
      </data-grid-item>
      <data-grid-item label="冻结罚息" :span="6">
        <template>
          <i-input style="width:90%" v-model="applyFrozenModel.remitAmount"></i-input>
        </template>
      </data-grid-item>
      <data-grid-item label="备注" :span="12">
        <template>
          <i-input style="width:90%" type="textarea" v-model="applyFrozenModel.remark"></i-input>
        </template>
      </data-grid-item>
    </data-grid>
  </section>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component'
  import {
    Prop
  } from "vue-property-decorator";
  import {
    DataGrid,
    DataGridItem
  } from "vue-fintech-component";
  import {
    RemitApplicationService
  } from "~/services/manage-service/remitApplication.service";
  import {
    Dependencies
  } from "~/core/decorator";
  @Component({
    components: {
      DataGrid,
      DataGridItem
    }
  })
  export default class ApplyFrozen extends Vue {
    @Dependencies(RemitApplicationService) private remitApplicationService: RemitApplicationService;
    private columns1: any;
    private data1: Array < Object > = [];
    private applyFrozenModel: any = {
      remitAmount: 0,
      remark: '',
      paymentScheduleId: '',
      orderId: '',
      remitItem: 1122
    }
    private repaySumObj: any = {}
    private paymentScheduleId: number = 0;
    private orderId: number = 0;
    created() {

    }
    cancel() {

    }
    getInterestInfo(data, orderId) {
      this.repaySumObj = data
      if (data && data.paymentSchedule) {
        this.paymentScheduleId = data.paymentSchedule.id // 获取当前记录id
      }
      this.orderId = orderId // 获取orderId
    }
    /**
     * 确定申请冻结
     */
    confirmApplyFrozen() {
      this.applyFrozenModel.paymentScheduleId = this.paymentScheduleId
      this.applyFrozenModel.orderId = this.orderId
      if (this.applyFrozenModel.remitAmount > this.repaySumObj.paymentSchedule.penaltyReceivable) {
        this.$Message.error('申请冻结罚息不能大于可冻结罚息')
      } else if (!this.applyFrozenModel.remitAmount) {
        this.$Message.error('申请冻结罚息必须大于0')
      } else {
        this.remitApplicationService.applyToFreeze(this.applyFrozenModel).subscribe(val => {
          this.$Message.success('申请冻结成功！')
          this.$emit('close')
        }, ({
          msg
        }) => {
          this.$Message.error(msg)
        })
      }
    }
  }

</script>
