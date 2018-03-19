<!--复审终审通过-->
<template>
  <section class="component second-last-approve">
    <data-grid :labelWidth="140">
      <data-grid-item label="车辆参考总价" :span="6">
        <div>{{vehicleAmount === undefined?0:vehicleAmount}}</div>
      </data-grid-item>
      <data-grid-item label="融资总额" :span="6">
        <div>{{financingAmount === undefined?0:financingAmount}}</div>
      </data-grid-item>
      <data-grid-item label="首付比例" :span="6">
        <!--<i-select v-model="passModel.paymentScale" clearable @on-change="initialChange">-->
          <!--<i-option v-for="item in initialPayment" :key="item" :value="item" :label="item+'%'"></i-option>-->
        <!--</i-select>-->
        <div>{{paymentScale === undefined?0:paymentScale+'%'}}</div>
      </data-grid-item>
      <data-grid-item label="首付金额" :span="6">
        <div>{{initialPayment === undefined?0:initialPayment}}</div>
      </data-grid-item>
      <data-grid-item label="保证金比例" :span="6">
        <!--<i-select v-model="passModel.depositPercent" clearable @on-change="depositChange">-->
          <!--<i-option v-for="item in depositCash" :key="item" :value="item" :label="item+'%'"></i-option>-->
        <!--</i-select>-->
        <div>{{depositPercent === undefined?0:depositPercent+'%'}}</div>
      </data-grid-item>
      <data-grid-item label="保证金额" :span="6">
        <div>{{depositCash === undefined?0:depositCash}}</div>
      </data-grid-item>
      <data-grid-item label="尾付本金" :span="6">
        <div>{{finalPayment === undefined?0:finalPayment}}</div>
      </data-grid-item>
      <data-grid-item label="尾付金额" :span="6">
        <div>{{finalCash === undefined?0:finalCash}}</div>
      </data-grid-item>
      <data-grid-item label="管理费率" :span="6">
        <!--<i-select v-model="passModel.manageCostPercent" clearable @on-change="manageChange">-->
          <!--<i-option v-for="item in manageCost" :key="item" :value="item" :label="item+'%'"></i-option>-->
        <!--</i-select>-->
        <div>{{manageCostPercent === undefined?0:manageCostPercent+'%'}}</div>
      </data-grid-item>
      <data-grid-item label="管理费金额" :span="6">
        <div>{{manageCost === undefined?0:manageCost}}</div>
      </data-grid-item>
      <data-grid-item label="融资期数" :span="6">
        <div>{{periods?0:$dict.getDictName(periods)}}</div>
      </data-grid-item>
      <data-grid-item label="月供金额" :span="6">
        <div>{{monthlySupply === undefined?0:monthlySupply}}</div>
      </data-grid-item>
      <data-grid-item label="月利率" :span="6">
        <div>{{productRate === undefined?0:productRate+'%'}}</div>
      </data-grid-item>
      <data-grid-item label="还款方式" :span="6">
        <!--<i-select v-model="passModel.payWay" clearable>-->
          <!--<i-option v-for="{value,label} in $dict.getDictData('0408')" :key="value" :label="label" :value="value"></i-option>-->
        <!--</i-select>-->
        <div>{{payWay === undefined?'':$dict.getDictName(payWay)}}</div>
      </data-grid-item>
      <data-grid-item label="保险费" :span="6">
        <div>{{insuranceExpenses === undefined?0:insuranceExpenses}}</div>
      </data-grid-item>
      <data-grid-item label="路桥费" :span="6">
        <div>0</div>
      </data-grid-item>
      <data-grid-item label="GPS费" :span="6">
        <div>{{gpsFee === undefined?0:gpsFee}}</div>
      </data-grid-item>
      <data-grid-item label="上牌费" :span="6">
        <div>{{installLicenseFee === undefined?0:installLicenseFee}}</div>
      </data-grid-item>
      <data-grid-item label="购置税" :span="6">
        <div>{{purchaseTax === undefined?0:purchaseTax}}</div>
      </data-grid-item>
      <data-grid-item label="其他费用" :span="6">
        <div>{{otherFee === undefined?0:otherFee}}</div>
      </data-grid-item>
      <data-grid-item label="备注" :span="12">
        <!--<i-input type="textarea" v-model="passModel.remark"></i-input>-->
        <div>{{remark === undefined?'':remark}}</div>
      </data-grid-item>
    </data-grid>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { DataGrid, DataGridItem } from "@zct1989/vue-component";
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
  private insuranceExpenses :any = ''; // 保险费
  private gpsFee :any= ''; // GPS费
  private installLicenseFee:any = ''; // 上牌费
  private purchaseTax :any= ''; // 购置税
  private remark:any =''; // 备注
  private vehicleAmount :any= ''; // 车辆参考总价1
  private paymentScale:any = ''; // 首付比例1
  private depositPercent :any= ''; // 保证金比例1
  private financingAmount :any = ''; // 融资金额1
  private finalCash :any = ''; // 尾付金额1
  private payWay :any = ''; // 还款方式
  private manageCostPercent :any = ''; // 管理费率
  private orderId:any = ''


  private pageData: any = {};
  private passModel: any = {
    initialPayment: '',
  depositCash: '',
   manageCost: '',
   otherFee: '',
   productRate:'',
   finalPayment: '',
   monthlySupply:'',
   periods: '',
   insuranceExpenses: '',
   gpsFee : '',
   installLicenseFee: '',
   purchaseTax : '',
   remark: '',
   vehicleAmount : '',
   paymentScale: '',
   depositPercent : '',
   financingAmount : '',
   finalCash : '',
   payWay : '',
   manageCostPercent : '',
    orderId:''
  };
  @Prop() row: Object;

  created() {}

  /**
   * 上个组件的传值
   */
  getPassData(pageData){
    this.financingAmount = pageData.financingAmount; // 融资金额1
    this.initialPayment = pageData.initialPayment; // 首付金额1
    this.depositCash = pageData.depositCash; // 保证金额1
    this.finalCash = pageData.finalCash; // 尾付金额1
    this.manageCost = pageData.manageCost; // 管理费金额
    this.insuranceExpenses = pageData.insuranceExpenses; // 保险费
    this.gpsFee = pageData.gpsFee; // GPS费
    this.installLicenseFee = pageData.installLicenseFee; // 上牌费
    this.purchaseTax = pageData.purchaseTax; // 购置税
    this.remark = pageData.remark; // 备注
    this.vehicleAmount = pageData.vehicleAmount; // 车辆参考总价1
    this.paymentScale = pageData.paymentScale; // 首付比例1
    this.depositPercent = pageData.depositPercent; // 保证金比例1
    this.finalPayment = pageData.finalPayment; // 尾付本金1
    this.periods = pageData.periods; // 融资期数
    this.monthlySupply = pageData.monthlySupply; // 月供金额
    this.productRate = pageData.productRate; // 月利率
    this.payWay = pageData.payWay; // 还款方式
    this.otherFee = pageData.otherFee; // 其他费用
    this.manageCostPercent = pageData.manageCostPercent; // 管理费率
    this.orderId = pageData.id;//订单Id
  }

  /**
   * 获取页面所需比例
   */
  getRate(orderId, pageData) {
    this.passModel.orderId = orderId; // 获取通过时需要的orderId
    this.pageData = pageData;
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
    console.log(this.orderId)
    this.passModel.financingAmount = this.financingAmount; // 融资金额1
    this.passModel.initialPayment = this.initialPayment; // 首付金额1
    this.passModel.depositCash = this.depositCash; // 保证金额1
    this.passModel.finalCash = this.finalCash; // 尾付金额1
    this.passModel.manageCost = this.manageCost; // 管理费金额
    this.passModel.insuranceExpenses = this.insuranceExpenses; // 保险费
    this.passModel.gpsFee = this.gpsFee; // GPS费
    this.passModel.installLicenseFee = this.installLicenseFee; // 上牌费
    this.passModel.purchaseTax = this.purchaseTax; // 购置税
    this.passModel.remark = this.remark; // 备注
    this.passModel.vehicleAmount = this.vehicleAmount; // 车辆参考总价1
    this.passModel.paymentScale = this.paymentScale; // 首付比例1
    this.passModel.depositPercent = this.depositPercent; // 保证金比例1
    this.passModel.finalPayment = this.finalPayment; // 尾付本金1
    this.passModel.periods = this.periods; // 融资期数
    this.passModel.monthlySupply = this.monthlySupply; // 月供金额
    this.passModel.productRate = this.productRate; // 月利率
    this.passModel.payWay = this.payWay; // 还款方式
    this.passModel.otherFee = this.otherFee; // 其他费用
    this.passModel.manageCostPercent = this.manageCostPercent; // 管理费率
    this.passModel.orderId = this.orderId
    if (
      this.passModel.paymentScale !==undefined &&
      this.passModel.depositPercent!==undefined &&
      this.passModel.manageCostPercent!==undefined &&
      this.passModel.payWay!=''
    ) {
      this.approvalService.passApproval(this.passModel).subscribe(
        data => {
          this.$Message.success("操作成功！");
          this.$emit("close");
        },
        ({ msg }) => {
          this.$Message.error(msg);
        }
      );
    } else if (this.passModel.paymentScale === undefined) {
      this.$Message.error("请选择首付比例！");
    } else if (this.passModel.depositPercent === undefined) {
      this.$Message.error("请选择保证金比例！");
    } else if (this.passModel.manageCostPercent === undefined) {
      this.$Message.error("请选择管理费率！");
    } else if (this.passModel.payWay === '') {
      this.$Message.error("请选择还款方式！");
    }
  }
  /**
   * 首付比例change计算首付金额：公式（首付金额=车辆参考总价*首付比例）
   */
  initialChange(data) {
    this.pageData.initialPayment =
      parseFloat(data) / 100 * this.pageData.vehicleAmount;
  }
  /**
   * 保证金比例change计算保证金：公式（保证金额=车辆参考总价*保证金比例）
   */
  depositChange(data) {
    this.pageData.insuranceExpenses =
      parseFloat(data) / 100 * this.pageData.vehicleAmount;
  }
  /**
   * 管理费比例change计算管理费：公式（管理费=车辆参考总价*管理费比例）
   */
  manageChange(data) {
    this.pageData.manageCost =
      parseFloat(data) / 100 * this.pageData.vehicleAmount;
  }
}
</script>
