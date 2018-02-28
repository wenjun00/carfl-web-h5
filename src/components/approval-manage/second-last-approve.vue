<!--复审终审通过-->
<template>
  <section class="component second-last-approve">
    <data-grid :labelWidth="140">
      <data-grid-item label="开呗参考价/成交价" :span="6">
        <div>1234</div>
      </data-grid-item>
      <data-grid-item label="融资额" :span="6">
        <div>{{pageData.intentionFinancingAmount}}</div>
      </data-grid-item>
      <data-grid-item label="首付比例" :span="6">
        <i-select v-model="passModel.paymentScale">
          <i-option v-for="item in initialPayment" :key="item" :value="item" :label="item+'%'"></i-option>
        </i-select>
      </data-grid-item>
      <data-grid-item label="首付金额" :span="6">
        <div>{{pageData.initialPayment}}</div>
      </data-grid-item>
      <data-grid-item label="保证金比例" :span="6">
        <i-select v-model="passModel.depositPercent">
          <i-option v-for="item in depositCash" :key="item" :value="item" :label="item+'%'"></i-option>
        </i-select>
      </data-grid-item>
      <data-grid-item label="保证金额" :span="6">
        <div>{{pageData.insuranceExpenses}}</div>
      </data-grid-item>
      <data-grid-item label="尾付本金" :span="6">
        <div>{{finalPayment}}</div>
      </data-grid-item>
      <data-grid-item label="尾付金额" :span="6">
        <div>{{pageData.finalCash}}</div>
      </data-grid-item>
      <data-grid-item label="管理费率" :span="6">
        <i-select v-model="passModel.manageCostPercent">
          <i-option v-for="item in manageCost" :key="item" :value="item" :label="item+'%'"></i-option>
        </i-select>
      </data-grid-item>
      <data-grid-item label="管理费金额" :span="6">
        <div>{{pageData.manageCost}}</div>
      </data-grid-item>
      <data-grid-item label="融资期数" :span="6">
        <div>{{periods}}</div>
      </data-grid-item>
      <data-grid-item label="期供金额" :span="6">
        <div>{{monthlySupply}}</div>
      </data-grid-item>
      <data-grid-item label="月利率" :span="6">
        <div>{{productRate}}</div>
      </data-grid-item>
      <data-grid-item label="还款方式" :span="6">
        <i-select v-model="passModel.payWay">
          <i-option v-for="{value,label} in $dict.getDictData('0408')" :key="value" :label="label" :value="value"></i-option>
        </i-select>
      </data-grid-item>
      <data-grid-item label="保险费" :span="6">
        <div>{{pageData.intentionFinancingAmount}}</div>
      </data-grid-item>
      <data-grid-item label="路桥费" :span="6">
        <div>0</div>
      </data-grid-item>
      <data-grid-item label="GPS费" :span="6">
        <div>{{pageData.gpsFee}}</div>
      </data-grid-item>
      <data-grid-item label="上牌费" :span="6">
        <div>{{pageData.installLicenseFee}}</div>
      </data-grid-item>
      <data-grid-item label="购置税" :span="6">
        <div>{{pageData.purchaseTax}}</div>
      </data-grid-item>
      <data-grid-item label="其他费用" :span="6">
        <div>{{otherFee}}</div>
      </data-grid-item>
      <data-grid-item label="备注" :span="12">
        <i-input type="textarea" v-model="passModel.remark"></i-input>
      </data-grid-item>
    </data-grid>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { DataGrid, DataGridItem } from "vue-fintech-component";
import { ApprovalService } from "~/services/manage-service/approval.service";
import { Dependencies } from "~/core/decorator";

@Component({
  components: {
    DataGrid,
    DataGridItem
  }
})
export default class SecondLastApprove extends Vue {
  @Dependencies(ApprovalService) private approvalService: ApprovalService;
  private initialPayment: Array<any> = [];
  private depositCash: Array<any> = [];
  private manageCost: Array<any> = [];
  private otherFee: Number = 0;
  private productRate: Number = 0;
  private finalPayment: Number = 0;
  private monthlySupply: Number = 0;
  private periods: String = "";
  private pageData: any = {};

  private passModel: any = {
    paymentScale: "",
    depositPercent: "",
    manageCostPercent: "",
    payWay: "",
    remark: "",
    initialPayment: ""
  };
  @Prop() row: Object;

  created() {}
  /**
   * 获取页面所需比例
   */
  getRate(orderId, pageData) {
    this.passModel.orderId = orderId; // 获取通过时需要的orderId
    this.pageData = pageData;
    this.passModel.remark=pageData.remark
    console.log(pageData, 9980);
    this.approvalService
      .getRate({
        orderId: orderId
      })
      .subscribe(
        data => {
          this.initialPayment = data.initialPayment; // 首付比例
          this.depositCash = data.depositCash; // 保证金比例
          this.manageCost = data.manageCost; // 管理费率
          this.otherFee = data.otherFee; // 其他费用
          this.finalPayment = data.finalPayment; // 尾付本金
          this.productRate = data.productRate; // 月利率
          this.monthlySupply = data.monthlySupply; // 期供金额
          this.periods = data.periods; //融资期数
        },
        ({ msg }) => {
          this.$Message.error(msg);
        }
      );
  }
  /**
   * 复审终审确定通过
   */
  confirmPass() {
    this.passModel.initialPayment = this.pageData.initialPayment; // 首付款
    this.passModel.depositCash = this.pageData.insuranceExpenses; // 保证金额
    this.passModel.finalPayment = this.finalPayment; // 尾付本金
    this.passModel.finalCash = this.pageData.finalCash; // 尾付款金额
    this.passModel.manageCost = this.pageData.manageCost; // 管理费金额
    this.passModel.periods = this.periods; // 期数
    this.passModel.monthlySupply = this.monthlySupply; // 月供金额
    this.passModel.productRate = this.productRate; // 产品利率

    this.approvalService.passApproval(this.passModel).subscribe(
      data => {
        this.$Message.success("操作成功！");
        this.$emit("close");
      },
      ({ msg }) => {
        this.$Message.error(msg);
      }
    );
  }
}
</script>
