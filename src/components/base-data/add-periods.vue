<!--新增期数-->
<template>
  <i-form ref="formItems" :model="formItems" :rules="formRules" :label-width="100">
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
          <i-form-item prop="periods" style="width:70%;">
            <i-input v-model="formItems.periods" placeholder="请输入产品期数"></i-input>
          </i-form-item>
        </data-grid-item>
        <data-grid-item label="产品利率" :span="4">
          <i-form-item prop="productRate" style="width:70%;">
            <i-input v-model="formItems.productRate" placeholder="请输入产品利率"></i-input>
          </i-form-item>
          <div class="after_text">%/月</div>
        </data-grid-item>
        <data-grid-item label="还款方式" :span="4">
          <i-form-item prop="payWay" style="width:70%;">
            <i-select v-model="formItems.payWay">
              <i-option label="等本等息" :value="384" key="等本等息"></i-option>
              <!--<i-option label="等额等息" :value="385" key="等额等息"></i-option>-->
            </i-select>
          </i-form-item>
        </data-grid-item>
        <data-grid-item label="周期类型" :span="4">
          <i-form-item prop="periodType" style="width:70%;">
            <i-select v-model="formItems.periodType">
              <i-option label="月" :value="388" key="月"></i-option>
            </i-select>
          </i-form-item>
        </data-grid-item>
        <data-grid-item label="融资金额" :span="8">
          <i-form ref="finance" :model="amount" :rules="amountRules" inline>
            <i-form-item prop="financingAmount1">
              <i-input v-model="amount.financingAmount1" placeholder="请输入融资金额"></i-input>~
            </i-form-item>
            <i-form-item prop="financingAmount2">
              <i-input v-model="amount.financingAmount2" placeholder="请输入融资金额"></i-input>
            </i-form-item>
          </i-form>
        </data-grid-item>
        <data-grid-item label="账期类型" :span="12">
          <i-form-item prop="paymentType">
            <i-radio-group style="margin-top:14px;" v-model="formItems.paymentType">
              <i-radio :label="386" style="margin-right:40px;">正常账期</i-radio>
              <i-radio :label="387">固定账期</i-radio>
            </i-radio-group>
          </i-form-item>
          <i-select v-model="formItems.paymentDay" style="width:30%;" v-if="formItems.paymentType === 387">
            <i-option :label="item.day" :key="item.key" :value="item.value" v-for="item in monthDay"></i-option>
          </i-select>
        </data-grid-item>
      </data-grid>
      <div class="addPeriodsItem">首付款参数</div>
      <data-grid :labelWidth="100">
        <data-grid-item ref label="首付款" :span="12">
          <i-radio-group style="margin-top:6px;" v-model="initialParams">
            <i-radio label="无"></i-radio>
            <i-radio label="有"></i-radio>
          </i-radio-group>
          <div v-if="initialParams==='有'" style="margin-top:24px;margin-left:-51px;" class="initialPayment">
            <i-form-item prop="initialPayment" label="比例">
              <i-input v-model="formItems.initialPayment" style="width:80%;"></i-input>
            </i-form-item>
            <span style="color:red;margin-left:-30px;" class="after_text">%</span>
            <span style="color:blue;" class="after_text">如果有多个则用分号隔开</span>
          </div>
        </data-grid-item>
      </data-grid>
      <div class="addPeriodsItem">保证金参数</div>
      <data-grid :labelWidth="100">
        <data-grid-item label="保证金" :span="12">
          <i-radio-group style="float:left;margin-top:6px;" v-model="promiseMoenyParams">
            <i-radio label="无"></i-radio>
            <i-radio label="有"></i-radio>
          </i-radio-group>
        </data-grid-item>
        <data-grid-item label="保证金比例" :span="12" v-if="promiseMoenyParams==='有'">
          <div style="margin-left:-51px;margin-top:17px;" class="initialPayment">
            <i-form-item prop="depositCash" label="比例">
              <i-input v-model="formItems.depositCash"></i-input>
            </i-form-item>
            <span style="color:red" class="after_text">%</span>
            <i-form-item prop="depositCashType">
              <i-select v-model="formItems.depositCashType" placeholder="缴纳方式">
                <i-option :value="396">退还</i-option>
                <i-option :value="397">不退还</i-option>
              </i-select>
            </i-form-item>
            <span style="color:blue" class="after_text">如果有多个则用分号隔开</span>
          </div>
        </data-grid-item>
      </data-grid>
      <div class="addPeriodsItem">尾付款参数</div>
      <data-grid :labelWidth="100">
        <data-grid-item label="尾付款" :span="12">
          <i-radio-group style="margin-top:6px;" v-model="residueParams">
            <i-radio label="无"></i-radio>
            <i-radio label="有"></i-radio>
          </i-radio-group>
          <div v-if="residueParams==='有'" class="initialPayment" style="margin-top:27px;">
            <span class="after_text">年利率:</span>
            <i-form-item prop="finalCash">
              <i-input v-model="formItems.finalCash"></i-input>
            </i-form-item>
            <span style="color:red" class="after_text">%</span>
            <span style="color:blue" class="after_text">如果有多个则用分号隔开</span>
          </div>
        </data-grid-item>
      </data-grid>
      <div class="addPeriodsItem">管理费参数</div>
      <data-grid :labelWidth="100">
        <data-grid-item label="管理费" :span="12">
          <i-radio-group style="margin-top:6px;" v-model="manageMoneyParams">
            <i-radio label="无"></i-radio>
            <i-radio label="有"></i-radio>
          </i-radio-group>
          <div v-if="manageMoneyParams==='有'" style="margin-top:21px;margin-left:-50px;" class="initialPayment">
            <i-form-item prop="manageCost" label="比例">
              <i-input v-model="formItems.manageCost"></i-input>
            </i-form-item>
            <span style="color:red" class="after_text">%</span>
            <span style="color:blue" class="after_text">如果有多个则用分号隔开</span>
          </div>
        </data-grid-item>
        <data-grid-item label="管理费收取方式" :span="12" v-if="manageMoneyParams==='有'">
          <i-form-item prop="manageCostType" style="margin-top:15px;">
            <i-radio-group v-model="formItems.manageCostType">
              <i-radio :label="394">一次性收取</i-radio>
              <i-radio :label="395">分期数收取</i-radio>
            </i-radio-group>
          </i-form-item>
          <div v-if="formItems.manageCostType===395" class="initialPayment" style="margin-top:15px;">
            <i-form-item prop="stagingPeriods" label="期数">
              <i-input v-model="formItems.stagingPeriods"></i-input>
            </i-form-item>
          </div>
        </data-grid-item>
      </data-grid>
      <div class="addPeriodsItem">逾期违约惩罚参数</div>
      <data-grid :labelWidth="100">
        <data-grid-item :span="6" label="征信保护天数">
          <i-form-item prop="creditProtectDays" style="margin-top:15px;">
            <i-input v-model="formItems.creditProtectDays"></i-input>&nbsp;天
          </i-form-item>
        </data-grid-item>
        <data-grid-item :span="6" label="逾期保护天数">
          <i-form-item prop="overdueProtectDays" style="margin-top:15px;">
            <i-input v-model="formItems.overdueProtectDays"></i-input>&nbsp;天
          </i-form-item>
        </data-grid-item>
        <data-grid-item :span="6" label="合同违约金费率">
          <i-form-item prop="contractBreakRate" style="margin-top:15px;">
            <i-input v-model="formItems.contractBreakRate"></i-input>&nbsp;%
          </i-form-item>
        </data-grid-item>
        <data-grid-item :span="6" label="提前还款费率">
          <i-form-item prop="prepaymentRate" style="margin-top:15px;">
            <i-input v-model="formItems.prepaymentRate"></i-input>&nbsp;%
          </i-form-item>
        </data-grid-item>
        <data-grid-item :span="12" label="罚息费率">
          <i-form-item prop="penaltyRate" style="margin-top:15px;">
            <i-input v-model="formItems.penaltyRate"></i-input>
          </i-form-item>
          <span>&nbsp;%/天</span>
        </data-grid-item>
      </data-grid>
      <!--<div style="margin-right:10px;display:inline-block" class="addPeriodsItem">状态</div>
      <i-form-item prop="isPublish">
        <i-radio-group v-model="formItems.isPublish">
          <i-radio :label="361">未发布</i-radio>
          <i-radio :label="360">已发布</i-radio>
        </i-radio-group>
      </i-form-item>-->
    </section>
  </i-form>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { DataGrid, DataGridItem } from "@zct1989/vue-component";
import { Form } from "iview";
import { Dependencies } from "~/core/decorator";
import { ProductPlanIssueService } from "~/services/manage-service/product-plan-issue.service";

@Component({
  components: {
    DataGrid,
    DataGridItem
  }
})
export default class AddPeriods extends Vue {
  @Dependencies(ProductPlanIssueService)
  private ProductPlanIssueService: ProductPlanIssueService;
  @Prop() pNameTitle: any;
  private accountPeriodsList: String = "正常账期";
  private initialParams: String = "无";
  private promiseMoenyParams: String = "无";
  private residueParams: String = "无";
  private manageMoneyParams: String = "无";
  private disabled: Boolean = false;
  private changePromiseMoenyShow: Boolean = false;
  private formItems: any = {
    productId: "",
    periods: "", //产品期数
    periodType: "",
    paymentType: "",
    paymentDay: "",
    productRate: "",
    payWay: "",
    financingAmount: "",
    initialPayment: "",
    depositCash: "",
    depositCashType: "",
    finalCash: "",
    manageCostType: 394,
    stagingPeriods: "", // 期数
    creditProtectDays: "",
    overdueProtectDays: "",
    penaltyRate: "",
    contractBreakRate: "",
    prepaymentRate: "",
    productStatus: "",
    // isPublish: '',
    manageCost: ""
  };
  private amountRules: Object = {};
  private amount: any;
  private monthDay: any;
  private formRules: Object = {};

  refresh() {
    for (let v in this.formItems) {
      this.formItems[v] = "";
    }
    this.amount = {
      financingAmount1: "",
      financingAmount2: ""
    };
    this.formItems.manageCostType = 394;
    let form: any = this.$refs["formItems"];
    form.resetFields();
  }
  created() {
    this.amount = {
      financingAmount1: "",
      financingAmount2: ""
    };
    this.monthDay = [];
    this.monthDayFun();
    this.amountRules = {
    	financingAmount1: [
				{ pattern: /^[\d.]+$/, message: '请输入数字或小数', trigger: 'blur' }
			],
      financingAmount2: [
				{ pattern: /^[\d.]+$/, message: '请输入数字或小数', trigger: 'blur' }
			]
    }
		this.formRules = {
			periods: [
				{ required: true, message: '请输入产品期数', trigger: 'blur' },
				{ pattern: /^[\d]+$/, message: '请输入数字', trigger: 'blur' }        
			],
			productRate: [
				{ required: true, message: '请输入产品利率', trigger: 'blur' },
				{ pattern: /^[\d.]+$/, message: '请输入数字或小数', trigger: 'blur' }
			],
			payWay: [
				{ required: true, message: '请选择还款方式', trigger: 'change', type: 'number' }
			],
			periodType: [
				{ required: true, message: '请选择周期类型', trigger: 'change', type: 'number' }
			],
			paymentDay: [
				{ required: true, message: '请选择固定账期期数', trigger: 'change', type: 'number' }
			],
			initialPayment: [
				{ required: true, message: '请输入首付款比例', trigger: 'blur' },
				{ pattern: /^[\d.;]+$/, message: '请输入数字或小数多个用英文分号隔开', trigger: 'blur' }        
			],
			depositCash: [
        { required: true, message: '请输入保证金比例', trigger: 'blur' },
				{ pattern: /^[\d.;]+$/, message: '请输入数字或小数多个用英文分号隔开', trigger: 'blur' }                
			],
			depositCashType: [
				{ required: true, message: '请选择退还方式', trigger: 'change', type: 'number' }
			],
			finalCash: [
				{ required: true, message: '请输入尾付款年利率', trigger: 'blur' },
				{ pattern: /^[\d.;]+$/, message: '请输入数字或小数多个用英文分号隔开', trigger: 'blur' }                        
			],
			manageCost: [
				{ required: true, message: '请输入管理费比例', trigger: 'blur' },
				{ pattern: /^[\d.;]+$/, message: '请输入数字或小数多个用英文分号隔开', trigger: 'blur' }                                
			],
			stagingPeriods: [
				{ required: true, message: '请输入管理费分期期数', trigger: 'blur' },
				{ pattern: /^[\d]+$/, message: '请输入数字', trigger: 'blur' }                                        
			],
			creditProtectDays: [
				{ required: true, message: '请输入征信保护天数', trigger: 'blur' },
				{ pattern: /^[\d]+$/, message: '请输入数字', trigger: 'blur' }                                                
			],
			overdueProtectDays: [
				{ required: true, message: '请输入逾期保护天数', trigger: 'blur' },
				{ pattern: /^[\d]+$/, message: '请输入数字', trigger: 'blur' }                                            
			],
			contractBreakRate: [
				{ required: true, message: '请输入合同违约金费率', trigger: 'blur' },
				{ pattern: /^[\d.]+$/, message: '请输入数字或小数', trigger: 'blur' }                                                    
			],
			prepaymentRate: [
				{ required: true, message: '请输入提前还款费率', trigger: 'blur' },
				{ pattern: /^[\d.]+$/, message: '请输入数字或小数', trigger: 'blur' }                                                    
			],
			penaltyRate: [
				{ required: true, message: '请输入罚期费率', trigger: 'blur' },
				{ pattern: /^[\d.]+$/, message: '请输入数字或小数', trigger: 'blur' }                                                    
			]
		};
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

  /**@
   * 点击确定按钮
   */
  confirmPeriods() {
    let form = <Form>this.$refs["formItems"];
    let formVal = <Form>this.$refs['finance'];
    form.validate(valid => {
      formVal.validate(vali => {
        if(!vali || !valid) return false;
        if (this.manageMoneyParams === "无") {
          delete this.formItems.manageCost;
          delete this.formItems.manageCostType;
          delete this.formItems.stagingPeriods;
        } else {
          if (this.formItems.manageCostType === 394) {
            delete this.formItems.stagingPeriods;
          }
        }
        if (this.initialParams === "无") {
          delete this.formItems.initialPayment;
        }

        if (this.promiseMoenyParams === "无") {
          delete this.formItems.depositCash;
        }
        if (this.residueParams === "无") {
          delete this.formItems.finalCash;
        }
        this.formItems.financingAmount = this.amount.financingAmount1 + "~" + this.amount.financingAmount2;
        this.formItems.productId = this.pNameTitle.id;
        this.formItems.productStatus = this.pNameTitle.status;
        this.ProductPlanIssueService.createOrModifyProductPlan(this.formItems).subscribe(val => {
          this.$Message.success("新增成功！");
          this.$emit("close", this.formItems);
        }, ({ msg }) => {
          this.$Message.error(msg);
        });
      })
      if (!valid) return false;
    })
  }
}
</script>

<style lang="less">
.addPeriodsItem {
  font-size: 14px;
  font-weight: bold;
  margin-top: 16px;
}

.ivu-form-item-content {
  margin-left: 0 !important;
  margin-left: 0 !important;
}

.data-grid-item__content,
.initialPayment,
.ivu-form-item-content {
  display: flex;
  align-items: center;
}
.add-periods {
  .ivu-form-item {
    margin-bottom: 16px;
  }
}

.after_text {
  line-height: 33px;
  margin-left: 5px;
  margin-bottom: 20px;
}
</style>
