<!--新增期数-->
<template>
  <i-form ref="formItems" :model="formItems" :rules="formRules" :label-width="100">
    <section class="component add-periods">
      <div class="add-periods-item">自然参数</div>
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
          <i-form-item class="item-chanpin" prop="periods">
            <i-select v-model="formItems.periods" placeholder="请输入产品期数">
              <i-option v-for="{value,label} in $dict.getDictData('0435')" :key="value" :label="label" :value="value"></i-option>
            </i-select>
          </i-form-item>
        </data-grid-item>
        <data-grid-item label="产品利率" :span="4">
          <i-form-item class="item-chanpin" prop="productRates">
            <i-input v-model="formItems.productRates" placeholder="请输入产品利率"></i-input>
          </i-form-item>
          <div class="after_text">%/月</div>
        </data-grid-item>
        <data-grid-item label="还款方式" :span="4">
          <i-form-item class="item-chanpin" prop="payWay">
            <i-select v-model="formItems.payWay">
              <i-option label="等本等息" :value="384" key="等本等息"></i-option>
              <!--<i-option label="等额等息" :value="385" key="等额等息"></i-option>-->
            </i-select>
          </i-form-item>
        </data-grid-item>
        <data-grid-item label="周期类型" :span="4">
          <i-form-item class="item-chanpin" prop="periodType">
            <i-select v-model="formItems.periodType">
              <i-option label="月" :value="388" key="月"></i-option>
            </i-select>
          </i-form-item>
        </data-grid-item>
        <data-grid-item label="融资金额" :span="8">
          <i-form ref="finance" :model="amount" :rules="amountRules" inline>
            <i-form-item prop="financingAmount1">
            <i-input-number  v-model="amount.financingAmount1" :formatter="$filter.moneyFormat" :parser="$filter.moneyParse"> </i-input-number> ~
            </i-form-item>
            <i-form-item prop="financingAmount2">
                <i-input-number  v-model="amount.financingAmount2" :formatter="$filter.moneyFormat" :parser="$filter.moneyParse"> </i-input-number> ~ 
            </i-form-item>
          </i-form>
        </data-grid-item>
        <data-grid-item label="账期类型" :span="12">
          <i-form-item prop="paymentType">
            <i-radio-group class="item-chanpin-group" v-model="formItems.paymentType">
              <i-radio :label="386" class="item-chanpin-radio">正常账期</i-radio>
              <i-radio :label="387">固定账期</i-radio>
            </i-radio-group>
          </i-form-item>
          <i-select v-model="formItems.paymentDay" class="item-chanpin-select" v-if="formItems.paymentType === 387">
            <i-option :label="item.day" :key="item.key" :value="item.value" v-for="item in monthDay"></i-option>
          </i-select>
        </data-grid-item>
      </data-grid>
      <div class="add-periods-item">首付款参数</div>
      <data-grid :labelWidth="100">
        <data-grid-item ref label="首付款" :span="12">
          <i-radio-group class="item-shoufu-group" v-model="initialParams">
            <i-radio label="无"></i-radio>
            <i-radio label="有"></i-radio>
          </i-radio-group>
          <div v-if="initialParams==='有'" class="item-shoufu-div initialPayment">
            <i-form-item prop="initialPayment" label="比例">
              <i-input v-model="formItems.initialPayment" class="item-shoufu-input"></i-input>
            </i-form-item>
            <span class="item-shoufu-span1 after_text">%</span>
            <span class="item-shoufu-span2 after_text">如果有多个则用英文分号隔开</span>
          </div>
        </data-grid-item>
      </data-grid>
      <div class="add-periods-item">保证金参数</div>
      <data-grid :labelWidth="100">
        <data-grid-item label="保证金" :span="12">
          <i-radio-group class="item-bzj-group" v-model="promiseMoenyParams">
            <i-radio label="无"></i-radio>
            <i-radio label="有"></i-radio>
          </i-radio-group>
        </data-grid-item>
        <data-grid-item label="保证金比例" :span="12" v-if="promiseMoenyParams==='有'">
          <div class="item-bzjbl-div initialPayment">
            <i-form-item prop="depositCash" label="比例">
              <i-input v-model="formItems.depositCash"></i-input>
            </i-form-item>
            <span class="item-bzjbl-span after_text">%</span>
            <i-form-item prop="depositCashType">
              <i-select v-model="formItems.depositCashType" placeholder="缴纳方式">
                <i-option :value="396">退还</i-option>
                <i-option :value="397">不退还</i-option>
              </i-select>
            </i-form-item>
            <span class="item-bzjbl-span2 after_text">如果有多个则用英文分号隔开</span>
          </div>
        </data-grid-item>
      </data-grid>
      <div class="add-periods-item">尾付款参数</div>
      <data-grid :labelWidth="100">
        <data-grid-item label="尾付款" :span="12">
          <i-radio-group class="item-mt6" v-model="residueParams">
            <i-radio label="无"></i-radio>
            <i-radio label="有"></i-radio>
          </i-radio-group>
          <div v-if="residueParams==='有'" class="initialPayment item-mt6-div">
            <span class="after_text">月利率:</span>
            <i-form-item prop="finalCash">
              <i-input v-model="formItems.finalCash"></i-input>
            </i-form-item>
            <span class="item-bzjbl-span after_text">%</span>
            <span class="item-bzjbl-span2 after_text">如果有多个则用英文分号隔开</span>
          </div>
        </data-grid-item>
      </data-grid>
      <div class="add-periods-item">管理费参数</div>
      <data-grid :labelWidth="100">
        <data-grid-item label="管理费" :span="12">
          <i-radio-group class="item-mt6" v-model="manageMoneyParams">
            <i-radio label="无"></i-radio>
            <i-radio label="有"></i-radio>
          </i-radio-group>
          <div v-if="manageMoneyParams==='有'" class="item-mt6-div2 initialPayment">
            <i-form-item prop="manageCost" label="比例">
              <i-input v-model="formItems.manageCost"></i-input>
            </i-form-item>
            <span class="item-bzjbl-span after_text">%</span>
            <span class="item-bzjbl-span2 after_text">如果有多个则用英文分号隔开</span>
          </div>
        </data-grid-item>
        <data-grid-item label="管理费收取方式" :span="12" v-if="manageMoneyParams==='有'">
          <i-radio-group v-model="formItems.manageCostType">
            <i-radio :label="394">一次性收取</i-radio>
            <i-radio :label="395">分期数收取</i-radio>
          </i-radio-group>
          <div v-if="formItems.manageCostType===395" class="initialPayment item-input">
            <i-form-item prop="stagingPeriods" label="期数">
              <i-input v-model="formItems.stagingPeriods"></i-input>
            </i-form-item>
          </div>
        </data-grid-item>
      </data-grid>
      <div class="add-periods-item">逾期违约惩罚参数</div>
      <data-grid :labelWidth="100">
        <data-grid-item :span="6" label="征信保护天数">
          <i-form-item prop="creditProtectDays" class="item-input">
            <i-input v-model="formItems.creditProtectDays"></i-input>&nbsp;天
          </i-form-item>
        </data-grid-item>
        <data-grid-item :span="6" label="逾期保护天数">
          <i-form-item class="item-input" prop="overdueProtectDays">
            <i-input v-model="formItems.overdueProtectDays"></i-input>&nbsp;天
          </i-form-item>
        </data-grid-item>
        <data-grid-item :span="6" label="合同违约金费率">
          <i-form-item class="item-input" prop="contractBreakRates">
             <i-input-number v-model="formItems.contractBreakRates" :formatter="$filter.moneyFormat" :parser="$filter.moneyParse"> </i-input-number>&nbsp;%
          </i-form-item>
        </data-grid-item>
        <data-grid-item :span="6" label="提前还款费率">
          <i-form-item class="item-input" prop="prepaymentRates">
            <i-input-number  v-model="formItems.prepaymentRates" :formatter="$filter.moneyFormat" :parser="$filter.moneyParse"> </i-input-number>&nbsp;%
          </i-form-item>
        </data-grid-item>
        <data-grid-item :span="12" label="罚息费率">
          <i-form-item class="item-input" prop="penaltyRates">
              <i-input-number  v-model="formItems.penaltyRates" :formatter="$filter.moneyFormat" :parser="$filter.moneyParse"> </i-input-number>  
          </i-form-item>
          <span>&nbsp;%/天</span>
        </data-grid-item>
      </data-grid>
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
import { ValidatorService } from "~/utils/validator.service";

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
  private initialParams: String = "有";
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
    productRates: "",
    payWay: "",
    financingAmount: "",
    initialPayment: "",
    depositCash: "",
    depositCashType: "",
    finalCash: "",
    manageCostType: 394,
    stagingPeriods: "", // 期数
    creditProtectDays: '0',
    overdueProtectDays: '0',
    penaltyRates: '1',
    contractBreakRates: '0',
    prepaymentRates: '0',
    productStatus: "",
    // isPublish: '',
    manageCost: "",

    penaltyRate: '',
    contractBreakRate: '',
    prepaymentRate: '',
    productRate: "",
  };
  private amountRules: Object = {};
  private amount: any = {
    financingAmount1: "",
    financingAmount2: ""
  };
  private monthDay: any;
  private formRules: Object = {};

  refresh() {
    for (let v in this.formItems) {
      this.formItems[v] = "";
    }
    this.formItems.creditProtectDays = '0'
    this.formItems.contractBreakRate = '0'
    this.formItems.overdueProtectDays = '0'
    this.formItems.prepaymentRate = '0'
    this.formItems.penaltyRate = '1'
    this.formItems.manageCostType = 394;
    let form1: any = this.$refs["formItems"];
    form1.resetFields();
    let form2: any = this.$refs["finance"];
    form2.resetFields();
  }

  /**
   * 金额大小验证
   */
  moneySmall(rule, value, callback) {
    if (!value) {
      callback(new Error('请输入最小金额'))
    } else {
      if (this.amount.financingAmount2 && value > this.amount.financingAmount2) {
        callback(new Error('最小金额必须小于最大金额'))
      } else {
        callback()
      }
    }
  }

  moneyBig(rule, value, callback) {
    if (!value) {
      callback(new Error('请输入最大金额'))
    } else {
      if (!this.amount.financingAmount1) {
        callback(new Error('请再输入最小金额'))
      } else if (this.amount.financingAmount1 > value) {
        callback(new Error('最大金额必须大于最小金额'))
      } else {
        callback()
      }
    }
  }

  created() {
    this.monthDay = [];
    this.monthDayFun();
    this.amountRules = {
      financingAmount1: { validator: this.moneySmall, trigger: 'blur' },
      financingAmount2: { validator: this.moneyBig, trigger: 'blur' }
    }
    this.formRules = {
      periods: [
        { required: true, message: '请输入产品期数', type: 'number', trigger: 'change' }
      ],
      productRates: [
        { required: true, message: '请输入产品利率', trigger: 'blur' },
        { pattern: /^[0-9]{1,3}([.]{1}[0-9]{0,4}){0,1}$/g, message: '请输入0~999整数或四位小数', trigger: 'blur' }
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
        { pattern: /^((0|[1-9][0-9]{0,1}|([1-9]|0)\.[0-9]{0,1}|100)\s*(;)?\s*)+$/g, message: '请输入0~100的数字', trigger: 'blur' }
        //   { pattern: /^((\d{1,2}|\d{1,2}\.[0-9]{1,2}|100)\;)+$/g, message: '请输入0~100的数字', trigger: 'blur' }
        // { pattern: /^(100|[0-9]{1,2}(\.{1}[0-9]{0,4})?(;|；)?){0,1}$/g, message: '请输入0~100的数字', trigger: 'blur' }
      ],
      depositCash: [
        { required: true, message: '请输入保证金比例', trigger: 'blur' },
        { pattern: /^((0|[1-9][0-9]{0,1}|([1-9]|0)\.[0-9]{0,1}|100)\s*(;)?\s*)+$/g, message: '请输入0~100的数字', trigger: 'blur' }
      ],
      depositCashType: [
        { required: true, message: '请选择退还方式', trigger: 'change', type: 'number' }
      ],
      finalCash: [
        { required: true, message: '请输入尾付款年利率', trigger: 'blur' },
        { pattern: /^((0|[1-9][0-9]{0,1}|([1-9]|0)\.[0-9]{0,1}|100)\s*(;)?\s*)+$/g, message: '请输入0~100的数字', trigger: 'blur' }
      ],
      manageCost: [
        { required: true, message: '请输入管理费比例', trigger: 'blur' },
        { pattern: /^((0|[1-9][0-9]{0,1}|([1-9]|0)\.[0-9]{0,1}|100)\s*(;)?\s*)+$/g, message: '请输入0~100的数字', trigger: 'blur' }
      ],
      stagingPeriods: [
        { required: true, message: '请输入管理费分期期数', trigger: 'blur' },
        { pattern: /^[\d]+$/, message: '请输入整数', trigger: 'blur' }
      ],
      creditProtectDays: [
        { required: true, message: '请输入征信保护天数', trigger: 'blur' },
        { pattern: /^(0|[1-9][0-9]{0,3})$/g, message: '请输入0~9999整数', trigger: 'blur' }
      ],
      overdueProtectDays: [
        { required: true, message: '请输入逾期保护天数', trigger: 'blur' },
        { pattern: /^(0|[1-9][0-9]{0,3})$/g, message: '请输入0~9999整数', trigger: 'blur' }
      ],
      contractBreakRates: [
        { required: true, message: '请输入合同违约金费率', trigger: 'blur' },
        { pattern: /^(\d{1,2}(\.\d{1,4})?|100)$/g, message: '请输入0~100整数或四位小数', trigger: 'blur' }
      ],
      prepaymentRates: [
        { required: true, message: '请输入提前还款费率', trigger: 'blur' },
        { pattern: /^(\d{1,2}(\.\d{1,4})?|100)$/g, message: '请输入0~100整数或四位小数', trigger: 'blur' }
      ],
      penaltyRates: [
        { required: true, message: '请输入罚期费率', trigger: 'blur' },
        { pattern: /^(\d{1,2}(\.\d{1,4})?|100)$/g, message: '请输入0~100整数或四位小数', trigger: 'blur' }
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
        if (!vali || !valid) return false;
        if (this.amount.financingAmount1 >= this.amount.financingAmount2) {
          this.$Message.error("请输入正确的融资金额");
          return false;
        }
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
        this.formItems.creditProtectDays = String(this.formItems.creditProtectDays);
        this.formItems.overdueProtectDays = String(this.formItems.overdueProtectDays);
        this.formItems.productRate = this.formItems.productRates * 0.01;
        this.formItems.contractBreakRate = String(this.formItems.contractBreakRates * 0.01);
        this.formItems.prepaymentRate = String(this.formItems.prepaymentRates * 0.01);
        this.formItems.penaltyRate = String(this.formItems.penaltyRates * 0.01);
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

<style lang="less" scoped>
.add-periods-item {
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
.item-input {
  margin-top: 15px;
}
.item-chanpin {
  width: 70%;
}
.item-chanpin-group {
  margin-top: 14px;
}
.item-chanpin-radio {
  margin-right: 40px;
}
.item-chanpin-select {
  width: 30%;
}
.item-shoufu-group {
  margin-top: 6px;
}
.item-shoufu-div {
  margin-top: 24px;
  margin-left: -51px;
}
.item-shoufu-input {
  width: 80%;
}
.item-shoufu-span1 {
  color: red;
  margin-left: -30px;
}
.item-shoufu-span2 {
  color: blue;
}
.item-bzj-group {
  float: left;
  margin-top: 6px;
}
.item-bzjbl-div {
  margin-left: -51px;
  margin-top: 17px;
}
.item-bzjbl-span {
  color: red;
}
.item-bzjbl-span2 {
  color: blue;
}
.item-mt6 {
  margin-top: 6px;
}
.item-mt6-div {
  margin-top: 27px;
}
.item-mt6-div2 {
  margin-top: 21px;
  margin-left: -50px;
}
</style>
