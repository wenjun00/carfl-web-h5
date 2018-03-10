<!--新增期数-->
<template>
  <section class="component add-periods">
    <i-form ref="productref" :model="productDetail" :rules="formRules">
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
          <i-form-item style="width:70%;" prop="periods">
            <i-input v-model="productDetail.periods" placeholder="请输入产品期数"></i-input>
          </i-form-item>
        </data-grid-item>
        <data-grid-item label="产品利率" :span="4">
          <i-form-item style="width:70%;" prop="productRate">
            <i-input v-model="productDetail.productRate" placeholder="请输入产品利率"></i-input>
          </i-form-item>
          <div class="after_text">%/月</div>
        </data-grid-item>
        <data-grid-item label="还款方式" :span="4">
          <i-form-item style="width:70%;" prop="payWay">
            <i-select v-model="productDetail.payWay">
              <i-option label="等本等息" :value="384" :key="384"></i-option>
              <i-option label="等额等息" :value="385" :key="385"></i-option>
            </i-select>
          </i-form-item>
        </data-grid-item>
        <data-grid-item label="周期类型" :span="4">
          <i-form-item style="width:70%;" prop="periodType">
            <i-select v-model="productDetail.periodType">
              <i-option label="月" :value="388" :key="388"></i-option>
            </i-select>
          </i-form-item>
        </data-grid-item>
        <data-grid-item label="融资金额" :span="8">
          <i-form-item prop="financingAmount">
            <i-input v-model="amount.financingAmount1" placeholder="请输入融资金额"></i-input>~
          </i-form-item>
          <i-form-item prop="financingAmount2">
            <i-input v-model="amount.financingAmount2" placeholder="请输入融资金额"></i-input>
          </i-form-item>
        </data-grid-item>
        <data-grid-item label="账期类型" :span="12">
          <i-form-item style="width:23%;" prop="paymentType">
            <i-radio-group style="margin-top:14px;" v-model="productDetail.paymentType">
              <i-radio :label="386">正常账期</i-radio>
              <i-radio :label="387">固定账期</i-radio>
            </i-radio-group>
          </i-form-item>
          <i-select v-model="productDetail.paymentDay" style="width:30%;margin-top:0px;" v-if="productDetail.paymentType === 387">
            <i-option :key="item.key" :value="item.key" v-for="item in monthDay">{{item.value}}</i-option>
          </i-select>
        </data-grid-item>
      </data-grid>
      <div class="addPeriodsItem">首付款参数</div>
      <data-grid :labelWidth="100">
        <data-grid-item label="首付款" :span="12">
          <i-radio-group style="margin-top:6px;" v-model="initialParams">
            <i-radio label="无"></i-radio>
            <i-radio label="有"></i-radio>
          </i-radio-group>
          <div v-if="initialParams==='有'" style="margin-left:10px;margin-top:21px;" class="initialPayment">
            <i-form-item style="width:35%;" prop="initialPayment" label="比例">
              <i-input v-model="productDetail.initialPayment"></i-input>
            </i-form-item>
            <div style="color:red" class="after_text">%</div>
            <div style="color:blue" class="after_text">如果有多个则用分号隔开</div>
          </div>
        </data-grid-item>
      </data-grid>
      <div class="addPeriodsItem">保证金参数</div>
      <data-grid :labelWidth="100">
        <data-grid-item label="保证金" :span="12">
          <i-radio-group style="margin-top:6px;" v-model="promiseMoenyParams">
            <i-radio label="无"></i-radio>
            <i-radio label="有"></i-radio>
          </i-radio-group>
        </data-grid-item>
        <data-grid-item label="保证金比例" :span="12" v-if="promiseMoenyParams==='有'">
          <div style="margin-top:17px;" class="initialPayment">
            <i-form-item prop="depositCash" label="比例">
              <i-input v-model="productDetail.depositCash"></i-input>
            </i-form-item>
            <span style="color:red" class="after_text">%</span>
            <i-form-item prop="depositCashType" style="width:30%;">
              <i-select v-model="productDetail.depositCashType" placeholder="缴纳方式">
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
          <i-radio-group style="float:left;margin-top:6px;" v-model="residueParams">
            <i-radio label="无"></i-radio>
            <i-radio label="有"></i-radio>
          </i-radio-group>
          <div v-if="residueParams==='有'" class="initialPayment" style="margin-top:27px;">
            <i-form-item style="width:37%;" prop="finalCash" label="年利率">
              <i-input v-model="productDetail.finalCash"></i-input>
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
          <div v-if="manageMoneyParams==='有'" style="margin-top:21px;margin-left:10px;" class="initialPayment">
            <i-form-item prop="manageCost" label="比例">
              <i-input v-model="productDetail.manageCost"></i-input>
            </i-form-item>
            <span style="color:red" class="after_text">%</span>
            <span style="color:blue" class="after_text">如果有多个则用分号隔开</span>
          </div>
        </data-grid-item>
        <data-grid-item label="管理费收取方式" :span="12"  v-if="manageMoneyParams==='有'">
          <i-form-item prop="manageCostType" style="margin-top:15px;">
            <i-radio-group v-model="costType">
              <i-radio :label="394">一次性收取</i-radio>
              <i-radio :label="395">分期数收取</i-radio>
            </i-radio-group>
          </i-form-item>
          <div v-if="costType===395" class="initialPayment" style="margin-top:15px;">
            <i-form-item prop="stagingPeriods" label="期数">
              <i-input v-model="productDetail.stagingPeriods"></i-input>
            </i-form-item>
          </div>
        </data-grid-item>
      </data-grid>
      <div class="addPeriodsItem">逾期违约惩罚参数</div>
      <data-grid :labelWidth="100">
        <data-grid-item :span="6" label="征信保护天数">
          <i-form-item prop="creditProtectDays" style="margin-top:15px;">
            <i-input v-model="productDetail.creditProtectDays"></i-input>
          </i-form-item><span>&nbsp;天</span>
        </data-grid-item>
        <data-grid-item :span="6" label="逾期保护天数">
          <i-form-item prop="overdueProtectDays" style="margin-top:15px;">
            <i-input v-model="productDetail.overdueProtectDays"></i-input>
          </i-form-item><span >&nbsp;天</span>
        </data-grid-item>
        <data-grid-item :span="6" label="合同违约金费率">
          <i-form-item prop="contractBreakRate"  style="margin-top:15px;">
            <i-input v-model="productDetail.contractBreakRate"></i-input>
          </i-form-item><span >&nbsp;%</span>
        </data-grid-item>
        <data-grid-item :span="6" label="提前还款费率">
          <i-form-item prop="prepaymentRate" style="margin-top:15px;">
            <i-input v-model="productDetail.prepaymentRate"></i-input>
          </i-form-item><span >&nbsp;%</span>
        </data-grid-item>
        <data-grid-item :span="12" label="罚息费率" >
          <i-form-item prop="penaltyRate" style="margin-top:15px;">
            <i-input v-model="productDetail.penaltyRate"></i-input>
          </i-form-item><span >&nbsp;%/天</span>
        </data-grid-item>
      </data-grid>
      <!--<div style="margin-right:10px;display:inline-block" class="addPeriodsItem">状态</div>
      <i-form-item prop="isPublish">
        <i-radio-group v-model="productDetail.isPublish">
          <i-radio :label="361">未发布</i-radio>
          <i-radio :label="360">已发布</i-radio>        
        </i-radio-group>
      </i-form-item>-->
    </i-form>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { DataGrid, DataGridItem } from '@zct1989/vue-component';
import { Form } from 'iview';
import { Dependencies } from '~/core/decorator';
import { ProductPlanIssueService } from '~/services/manage-service/product-plan-issue.service';

@Component({
	components: {
		DataGrid,
		DataGridItem,
	},
})
export default class AddProduct extends Vue {
	@Dependencies(ProductPlanIssueService) private ProductPlanIssueService: ProductPlanIssueService;
	private productDetail: any = {};
	@Prop() pNameTitle: any;
	private initialParams: String = '无';
	private promiseMoenyParams: String = '无';
	private residueParams: String = '无';
	private manageMoneyParams: String = '无';
	private costType: any = '';
	private disabled: Boolean = false;
	private changePromiseMoenyShow: Boolean = false;
	private formRules: Object = {};
	private amount: any = {};
	private monthDay: any = [];
	private moneyArray: any = [];



	/**
	 * 获取月份天数
	 */
	monthDayFun() {
		let arr: any = 31;
		for (let i = 1; i <= arr; i++) {
			this.monthDay.push({
				day: i + '日',
				key: i,
				value: i,
			});
		}
	}
	/**
	 * 父组件向子组件传值  并转为字符串
	 */
	moneyFun(item) {
    console.log(item)
    this.productDetail = item
    this.productDetail.periods = String(item.periods)
    this.productDetail.productRate = String(item.productRate)
    this.productDetail.creditProtectDays = String(item.creditProtectDays)
    this.productDetail.overdueProtectDays = String(item.overdueProtectDays)
    this.productDetail.contractBreakRate = String(item.contractBreakRate)
    this.productDetail.prepaymentRate = String(item.prepaymentRate)
    this.productDetail.penaltyRate = String(item.penaltyRate)
    if(item.stagingPeriods) {
      this.productDetail.stagingPeriods = String(item.stagingPeriods)
    }
		this.moneyArray = item.financingAmount.split('~');
		this.amount = {
			financingAmount1: this.moneyArray[0],
			financingAmount2: this.moneyArray[1],
		};
		if (this.productDetail.initialPayment) {
			this.initialParams = '有';
		}
		if (this.productDetail.depositCash) {
			this.promiseMoenyParams = '有';
		}
		if (this.productDetail.finalCash) {
			this.residueParams = '有';
		}
		if (this.productDetail.manageCost) {
			this.manageMoneyParams = '有';
		}
		if (this.productDetail.stagingPeriods) {
			this.costType = 395;
		}
	}
	/**@
	 * 点击确定按钮
	 */
	confirmPeriods() {
		let formVal = <Form>this.$refs['productref'];
		formVal.validate(valid => {
      if (!valid) return false;
      this.productDetail.financingAmount = this.amount.financingAmount1 + '~' + this.amount.financingAmount2;
      this.ProductPlanIssueService.createOrModifyProductPlan(this.productDetail).subscribe(
        val => {
          this.$emit('close');
          this.$Message.success('修改成功！');
        },
        ({ msg }) => {
          this.$Message.error(msg);
        });
		});
	}
  created() {
		this.monthDayFun();
		this.formRules = {
			periods: [
				{
					required: true,
					message: '请输入产品期数',
					trigger: 'blur',
				},
			],
			productRate: [
				{
					required: true,
					message: '请输入产品利率',
					trigger: 'blur',
				},
			],
			payWay: [
				{
					required: true,
					message: '请选择还款方式',
					trigger: 'change',
					type: 'number',
				},
			],
			periodType: [
				{
					required: true,
					message: '请选择周期类型',
					trigger: 'change',
					type: 'number',
				},
			],
			paymentDay: [
				{
					required: true,
					message: '请选择固定账期期数',
					trigger: 'change',
					type: 'number',
				},
			],
			initialPayment: [
				{
					required: true,
					message: '请输入首付款比例',
					trigger: 'blur',
				},
			],
			depositCash: [
				{
					required: true,
					message: '请输入保证金比例',
					trigger: 'blur',
				},
			],
			depositCashType: [
				{
					required: true,
					message: '请选择退还方式',
					trigger: 'change',
					type: 'number',
				},
			],
			finalCash: [
				{
					required: true,
					message: '请输入尾付款年利率',
					trigger: 'blur',
				},
			],
			manageCost: [
				{
					required: true,
					message: '请输入管理费比例',
					trigger: 'blur',
				},
			],
			stagingPeriods: [
				{
					required: true,
					message: '请输入管理费分期期数',
					trigger: 'blur',
				},
			],
			creditProtectDays: [
				{
					required: true,
					message: '请输入征信保护天数',
					trigger: 'blur',
				},
			],
			overdueProtectDays: [
				{
					required: true,
					message: '请输入逾期保护天数',
					trigger: 'blur',
				},
			],
			contractBreakRate: [
				{
					required: true,
					message: '请输入合同违约金费率',
					trigger: 'blur',
				},
			],
			prepaymentRate: [
				{
					required: true,
					message: '请输入提前还款费率',
					trigger: 'blur',
				},
			],
			penaltyRate: [
				{
					required: true,
					message: '请输入罚期费率',
					trigger: 'blur',
				},
			],
		};
		this.productDetail = {
			productId: '',
			periods: '', //产品期数
			periodType: '', // 周期类型
			paymentType: '', //账期类型
			paymentDay: '', //固定账期 期数
			productRate: '', // 产品利率
			payWay: '', //还款方式
			financingAmount: '', //融资金额
			initialPayment: '', // 首付款比例
			depositCash: '', // 保证金比例
			depositCashType: '', //缴纳方式
			finalCash: '', // 尾付款年利率
			manageCost: '', //管理费比例
			manageCostType: '', //管理费收取方式
			stagingPeriods: '', // 管理费分期 期数
			creditProtectDays: '', // 征信保护天数
			overdueProtectDays: '', //逾期保护天数
			penaltyRate: '', //罚息费率
			contractBreakRate: '', //合同违约金费率
			prepaymentRate: '', //提前还款费率
			// isPublish: '', // 未发布or已发布
			operator: '',
			operatorTime: '',
			id: '',
		};
	}
}
</script>

<style lang="less" scoped>
.addPeriodsItem {
	font-size: 14px;
	font-weight: bold;
	margin-top: 16px;
}

.ivu-form-item-content {
	margin-left: 0 !important;
}

.data-grid-item__content,
.initialPayment,
.ivu-form-item-content {
	display: flex;
	align-items: center;
}

.ivu-form-item {
	margin-bottom: 16px;
}

.after_text {
	line-height: 33px;
	margin-left: 5px;
	margin-bottom: 20px;
}

.initialPayment {
	width: 70%;
}
</style>
