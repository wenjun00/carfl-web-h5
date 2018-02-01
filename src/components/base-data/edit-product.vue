<!--新增期数-->
<template>
    <i-form ref="productDetail" :model="productDetail" :rules="formRules" :label-width="100">
        <section class="component add-periods">
            <div class="addPeriodsItem">自然参数</div>
            <data-grid :labelWidth="100">
                <data-grid-item label="产品序号" :span="4">
                    <div>
                        {{pNameTitle.number}}
                    </div>
                </data-grid-item>
                <data-grid-item label="产品名称" :span="8">
                    <div>
                        {{pNameTitle.name}}
                    </div>
                </data-grid-item>
                <data-grid-item label="产品期数" :span="4">
                    <i-form-item prop="periods">
                        <i-input v-model="productDetail.periods" placeholder="请输入产品期数"></i-input>
                    </i-form-item>
                </data-grid-item>
                <data-grid-item label="产品利率" :span="4">
                    <i-form-item prop="productRate">
                        <i-input v-model="productDetail.productRate" placeholder="请输入产品利率"></i-input>%/月
                    </i-form-item>
                </data-grid-item>
                <data-grid-item label="还款方式" :span="4">
                    <i-form-item prop="payWay">
                        <i-select v-model="productDetail.payWay">
                            <i-option label="等本等息" :value="384" :key="384"></i-option>
                            <i-option label="等额等息" :value="385" :key="385"></i-option>
                        </i-select>
                    </i-form-item>
                </data-grid-item>
                <data-grid-item label="周期类型" :span="4">
                    <i-form-item prop="periodType">
                        <i-select v-model="productDetail.periodType">
                            <i-option label="月" :value="388" :key="388"></i-option>
                        </i-select>
                    </i-form-item>
                </data-grid-item>
                <data-grid-item label="融资金额" :span="8">
                    <i-form-item prop="financingAmount">
                        <i-input v-model="amount.financingAmount1" placeholder="请输入融资金额"></i-input>~
                        <i-input v-model="amount.financingAmount2" placeholder="请输入融资金额"></i-input>
                    </i-form-item>
                </data-grid-item>
                <data-grid-item label="账期类型" :span="12">
                    <i-form-item prop="paymentType">
                        <i-radio-group style="float:left;margin-top:6px;" v-model="productDetail.paymentType">
                            <i-radio label="正常账期"></i-radio>
                            <i-radio label="固定账期"></i-radio>
                        </i-radio-group>
                        <i-select v-model="productDetail.paymentDay">
                            <i-option :label="item.day" :key="item.key" :value="item.value" v-for="item in monthDay"></i-option>
                        </i-select>
                    </i-form-item>
                </data-grid-item>
            </data-grid>
            <div class="addPeriodsItem">首付款参数</div>
            <data-grid :labelWidth="100">
                <data-grid-item label="首付款" :span="12">
                    <i-radio-group style="float:left;margin-top:6px;" v-model="initialParams" @on-change="changeInitialParams">
                        <i-radio label="无"></i-radio>
                        <i-radio label="有"></i-radio>
                    </i-radio-group>
                    <div v-show="initialParamsShow" style="float:left">
                        <i-form-item prop="initialPayment" label="比例">
                            <i-input v-model="productDetail.initialPayment" style="width:45%;display:inline-block;margin-left:10px;"></i-input>
                        </i-form-item>
                        <span style="color:red">%</span>
                        <span style="color:blue">如果有多个则用分号隔开</span>
                    </div>
                </data-grid-item>
            </data-grid>
            <div class="addPeriodsItem">保证金参数</div>
            <data-grid :labelWidth="100">
                <data-grid-item label="保证金" :span="12">
                    <i-radio-group style="float:left;margin-top:6px;" v-model="promiseMoenyParams" @on-change="changePromiseMoenyParams">
                        <i-radio label="无"></i-radio>
                        <i-radio label="有"></i-radio>
                    </i-radio-group>
                </data-grid-item>
                <data-grid-item label="保证金比例" :span="12">
                    <div v-show="promiseMoneyShow" style="float:left">
                        <i-row>
                            <i-col span="10">
                                <i-form-item prop="depositCash" label="比例">
                                    <i-input v-model="productDetail.depositCash"></i-input>
                                </i-form-item>
                            </i-col>
                            <i-col span="2">
                                <span style="color:red">%</span>

                            </i-col>
                            <i-col span="10">
                                <i-form-item prop="depositCashType">
                                    <i-select v-model="productDetail.depositCashType" placeholder="缴纳方式">
                                        <i-option label="退还" value="退还" key="退还"></i-option>
                                        <i-option label="不退还" value="不退还" key="不退还"></i-option>
                                    </i-select>
                                </i-form-item>
                                <span style="color:blue">如果有多个则用分号隔开</span>
                            </i-col>
                        </i-row>
                    </div>
                </data-grid-item>
            </data-grid>
            <div class="addPeriodsItem">尾付款参数</div>
            <data-grid :labelWidth="100">
                <data-grid-item label="尾付款" :span="12">
                    <i-radio-group style="float:left;margin-top:6px;" v-model="residueParams" @on-change="changeResidueParams">
                        <i-radio label="无"></i-radio>
                        <i-radio label="有"></i-radio>
                    </i-radio-group>
                    <div v-show="residueParamsShow" style="float:left">
                        <span>年利率</span>
                        <i-form-item prop="finalCash">
                            <i-input v-model="productDetail.finalCash"></i-input>
                        </i-form-item>
                        <span style="color:red">%</span>
                        <span style="color:blue">如果有多个则用分号隔开</span>
                    </div>
                </data-grid-item>
            </data-grid>
            <div class="addPeriodsItem">管理费参数</div>
            <data-grid :labelWidth="100">
                <data-grid-item label="管理费" :span="12">
                    <i-radio-group style="float:left;margin-top:6px;" v-model="manageMoneyParams" @on-change="changeManageMoney">
                        <i-radio label="无"></i-radio>
                        <i-radio label="有"></i-radio>
                    </i-radio-group>
                    <div v-show="manageParamsShow" style="float:left">
                        <i-form-item prop="manageCost" label="比例">
                            <i-input v-model="productDetail.manageCost"></i-input>
                        </i-form-item>
                        <span style="color:red">%</span>
                        <span style="color:blue">如果有多个则用分号隔开</span>
                    </div>
                </data-grid-item>
                <data-grid-item label="管理费收取方式" :span="12">
                    <i-form-item prop="manageCostType">
                        <i-radio-group v-model="productDetail.manageCostType" @on-change="stagingPeriod">
                            <i-radio label="一次性收取"></i-radio>
                            <i-radio label="分期数收取"></i-radio>
                        </i-radio-group>
                    </i-form-item>
                    <div v-show="stagingPeriodShow">
                        <i-form-item prop="stagingPeriods" label="期数">
                            <i-input v-model="productDetail.stagingPeriods"></i-input>
                        </i-form-item>
                    </div>
                </data-grid-item>
            </data-grid>
            <div class="addPeriodsItem">逾期违约惩罚参数</div>
            <data-grid :labelWidth="100">
                <data-grid-item :span="6" label="征信保护天数">
                    <i-form-item prop="creditProtectDays" inline>
                        <i-input v-model="productDetail.creditProtectDays"></i-input>天
                    </i-form-item>
                </data-grid-item>
                <data-grid-item :span="6" label="逾期保护天数">
                    <i-form-item prop="overdueProtectDays" inline>
                        <i-input v-model="productDetail.overdueProtectDays"></i-input>天
                    </i-form-item>
                </data-grid-item>
                <data-grid-item :span="6" label="合同违约金费率">
                    <i-form-item prop="contractBreakRate" inline>
                        <i-input v-model="productDetail.contractBreakRate"></i-input>天
                    </i-form-item>
                </data-grid-item>
                <data-grid-item :span="6" label="提前还款费率">
                    <i-form-item prop="prepaymentRate" inline>
                        <i-input v-model="productDetail.prepaymentRate"></i-input>天
                    </i-form-item>
                </data-grid-item>
                <data-grid-item :span="12" label="罚息费率">
                    <i-form-item prop="penaltyRate">
                        <i-input v-model="productDetail.penaltyRate"></i-input>天
                    </i-form-item>
                </data-grid-item>
            </data-grid>
            <div style="margin-right:10px;display:inline-block" class="addPeriodsItem">状态</div>
            <i-form-item prop="isPublish">
                <i-radio-group v-model="productDetail.isPublish">
                    <i-radio label="未发布"></i-radio>
                    <i-radio label="已发布"></i-radio>
                </i-radio-group>
            </i-form-item>
        </section>
    </i-form>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { DataGrid, DataGridItem } from "vue-fintech-component";
import { Form } from "iview";
import { Dependencies } from "~/core/decorator";
import { ProductPlanIssueService } from "~/services/manage-service/productPlanIssue.service";

@Component({
  components: {
    DataGrid,
    DataGridItem
  }
})
export default class AddPeriods extends Vue {
  @Dependencies(ProductPlanIssueService)
  private ProductPlanIssueService: ProductPlanIssueService;
  @Prop() productDetail: any;
  @Prop() pNameTitle: any;
  private accountPeriodsList: String = "正常账期";
  private initialParams: String = "无";
  private promiseMoenyParams: String = "无";
  private residueParams: String = "无";
  private manageMoneyParams: String = "无";
  private disabled: Boolean = false;
  private initialParamsShow: Boolean = false;
  private changePromiseMoenyShow: Boolean = false;
  private promiseMoneyShow: Boolean = false;
  private residueParamsShow: Boolean = false;
  private manageParamsShow: Boolean = false;
  private formRules: Object = {};
  //   private formItems: any = {
  //     productId: "",
  //     periods: "", //产品期数
  //     periodType: "",
  //     paymentType: "",
  //     paymentDay: "",
  //     productRate: "",
  //     payWay: "",
  //     financingAmount: "",
  //     initialPayment: "",
  //     depositCash: "",
  //     depositCashType: "",
  //     finalCash: "",
  //     manageCost: "",
  //     manageCostType: "",
  //     stagingPeriods: "", // 期数
  //     creditProtectDays: "",
  //     overdueProtectDays: "",
  //     penaltyRate: "",
  //     contractBreakRate: "",
  //     prepaymentRate: "",
  //     productStatus: "",
  //     isPublish: "",
  //     operator: "",
  //     operatorTime: "",
  //     id: ""
  //   };
  private amount: any;
  private monthDay: any;
  private stagingPeriodShow: Boolean = false;

  created() {
    this.amount = {
      financingAmount1: "",
      financingAmount2: ""
    };
    this.monthDay = [];
    this.monthDayFun();
    this.formRules = {};
    this.productDetail.payWay = 384
      ? (this.productDetail.payWay = "等本等息")
      : (this.productDetail.payWay = "等额等息");
  }

  /**
   * 获取月份天数
   */
  monthDayFun() {
    let arr: any = 31;
    for (let i = 1; i <= arr; i++) {
      this.monthDay.push({
        day: i + "日",
        key: i + "日",
        value: i
      });
    }
  }
  changeInitialParams(val) {
    if (val === "无") {
      this.initialParamsShow = false;
    } else {
      this.initialParamsShow = true;
    }
  }
  changePromiseMoenyParams(val) {
    if (val === "无") {
      this.promiseMoneyShow = false;
    } else {
      this.promiseMoneyShow = true;
    }
  }
  changeResidueParams(val) {
    if (val === "无") {
      this.residueParamsShow = false;
    } else {
      this.residueParamsShow = true;
    }
  }
  changeManageMoney(val) {
    if (val === "无") {
      this.manageParamsShow = false;
    } else {
      this.manageParamsShow = true;
    }
  }
  stagingPeriod(val) {
    if (val === "一次性收取") {
      this.stagingPeriodShow = false;
    } else {
      this.stagingPeriodShow = true;
    }
  }

  /**@
   * 点击确定按钮
   */
  confirmPeriods() {
    // let formVal = <Form>this.$refs["formItems"];
    // console.log(this.formItems);
    // formVal.validate(valid => {
    //   if (valid) {
    //     this.$emit("close", this.formItems);
    //     this.formItems.paymentType === "固定账期"
    //       ? (this.formItems.paymentType = 387)
    //       : (this.formItems.paymentType = 386);
    //     this.formItems.manageCostType === "一次性收取"
    //       ? (this.formItems.manageCostType = 394)
    //       : (this.formItems.manageCostType = 395);
    //     this.formItems.depositCashType === "退还"
    //       ? (this.formItems.depositCashType = 396)
    //       : (this.formItems.depositCashType = 397);
    //     this.formItems.isPublish === "未发布"
    //       ? (this.formItems.isPublish = 361)
    //       : (this.formItems.isPublish = 360);
    //     this.formItems.financingAmount =
    //       this.amount.financingAmount1 + "~" + this.amount.financingAmount2;
    //     this.formItems.productId = this.productDetail.id;
    //     this.formItems.productStatus = this.productDetail.status;
    //     this.ProductPlanIssueService.createOrModifyProductPlan(
    //       this.formItems
    //     ).subscribe(val => {
    //       this.$Message.success(val.msg == "" ? "新增成功！" : val.msg);
    //     });
    //   } else {
    //     this.$Message.error("Fail!");
    //   }
    // });
  }
}
</script>

<style lang="less">
.addPeriodsItem {
  font-size: 14px;
  font-weight: bold;
  margin-top: 16px;
}
</style>