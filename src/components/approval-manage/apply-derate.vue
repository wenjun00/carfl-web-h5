<!--申请减免-->
<template>
  <section class="component apply-derate">
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
      <data-grid-item label="剩余应还罚息" :span="6">
        <template>
          <div>{{repaySumObj.paymentSchedule?repaySumObj.paymentSchedule.penaltySurplus:''}}</div>
        </template>
      </data-grid-item>
      <data-grid-item label="减免罚息" :span="6">
        <template>
          <i-input-number v-model="applyDerateModel.remitAmount" :formatter="$filter.moneyFormat" :parser="$filter.moneyParse"> </i-input-number>
        </template>
      </data-grid-item>
      <data-grid-item label="备注" :span="12">
        <template>
          <i-input class="input" type="textarea" v-model="applyDerateModel.remark"></i-input>
        </template>
      </data-grid-item>
    </data-grid>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { DataGrid, DataGridItem } from "@zct1989/vue-component";
import { RemitApplicationService } from "~/services/manage-service/remit-application.service";
import { Dependencies } from "~/core/decorator";
@Component({
  components: {
    DataGrid,
    DataGridItem
  }
})
export default class ApplyDerate extends Vue {
  @Dependencies(RemitApplicationService)
  private remitApplicationService: RemitApplicationService;

  private columns1: any;
  private data1: Array<Object> = [];
  private repaySumObj: any = {};
  private paymentScheduleId: number = 0;
  private orderId: number = 0;
  private applyDerateModel: any = {
    paymentScheduleId: "",
    orderId: "",
    remark: "",
    remitAmount: 0,
    remitItem: 1121
  };
  @Prop() row: Object;

  created() {}

  cancel() {}
  confirm() {}

  getInterestInfo(data, orderId) {
    this.repaySumObj = data;
    if (data && data.paymentSchedule) {
      this.paymentScheduleId = data.paymentSchedule.id; // 获取当前记录id
    }
    this.orderId = orderId; // 获取orderId
  }
  confirmApplyDerate() {
    this.applyDerateModel.paymentScheduleId = this.paymentScheduleId;
    this.applyDerateModel.orderId = this.orderId;
    if (!this.applyDerateModel.remitAmount || this.applyDerateModel.remitAmount <= 0 ) {
      this.$Message.error("减免金额必须大于0！");
    } else if (
      this.applyDerateModel.remitAmount >
      this.repaySumObj.paymentSchedule.penaltySurplus
    ) {
      this.$Message.error("减免金额不能大于剩余应还罚息！");
    } else {
      this.remitApplicationService
        .applyForRelief(this.applyDerateModel)
        .subscribe(
          val => {
            this.$Message.success("申请减免成功！");
            this.$emit("close");
            this.resetInput();
          },
          ({ msg }) => {
            this.$Message.error(msg);
          }
        );
    }
  }
  /**
   * 重置之前输入的减免金额和备注
   */
  resetInput() {
    this.applyDerateModel.remitAmount = 0;
    this.applyDerateModel.remark = "";
  }
}
</script>
<style lang="less" scoped>
  .input{
    width:90%
  }
</style>
