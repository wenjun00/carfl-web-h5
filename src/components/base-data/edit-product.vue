<!--新增期数-->
<template>
  <i-form ref="productref" :model="productDetail" :rules="formRules">
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
          <i-form-item style="width:65%;" prop="payWay">
            <i-select v-model="productDetail.payWay">
              <i-option label="等本等息" value="384" key="384"></i-option>
              <i-option label="等额等息" value="385" key="385"></i-option>
            </i-select>
          </i-form-item>
        </data-grid-item>
        <data-grid-item label="周期类型" :span="4">
          <i-form-item style="width:65%;" prop="periodType">
            <i-select v-model="productDetail.periodType">
              <i-option label="月" value="388" key="388"></i-option>
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
          <i-form-item style="width:21%;" prop="paymentType">
            <i-radio-group style="margin-top:14px;" v-model="productDetail.paymentType">
              <i-radio label="正常账期"></i-radio>
              <i-radio label="固定账期"></i-radio>
            </i-radio-group>
          </i-form-item>
          <i-select v-model="productDetail.paymentDay" style="width:30%;margin-top:0px;">
            <i-option :key="item.key" :value="item.key" v-for="item in monthDay">{{item.value}}</i-option>
          </i-select>
        </data-grid-item>
      </data-grid>
      <div class="addPeriodsItem">首付款参数</div>
      <data-grid :labelWidth="100">
        <data-grid-item label="首付款" :span="12">
          <i-radio-group style="margin-top:6px;" v-model="initialParams" @on-change="changeInitialParams">
            <i-radio label="无"></i-radio>
            <i-radio label="有"></i-radio>
          </i-radio-group>
          <div v-if="initialParamsShow" style="margin-left:10px;margin-top:21px;" class="initialPayment">
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
          <i-radio-group style="margin-top:6px;" v-model="promiseMoenyParams" @on-change="changePromiseMoenyParams">
            <i-radio label="无"></i-radio>
            <i-radio label="有"></i-radio>
          </i-radio-group>
        </data-grid-item>
        <data-grid-item label="保证金比例" :span="12">
          <div v-if="promiseMoneyShow" style="margin-top:17px;" class="initialPayment">
            <i-form-item prop="depositCash" label="比例">
              <i-input v-model="productDetail.depositCash"></i-input>
            </i-form-item>
            <span style="color:red" class="after_text">%</span>
            <i-form-item prop="depositCashType">
              <i-select v-model="productDetail.depositCashType" placeholder="缴纳方式">
                <i-option label="退还" value="退还" key="退还"></i-option>
                <i-option label="不退还" value="不退还" key="不退还"></i-option>
              </i-select>
            </i-form-item>
            <span style="color:blue" class="after_text">如果有多个则用分号隔开</span>
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
          <div v-if="residueParamsShow" class="initialPayment" style="margin-top:27px;">
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
          <i-radio-group style="margin-top:6px;" v-model="manageMoneyParams" @on-change="changeManageMoney">
            <i-radio label="无"></i-radio>
            <i-radio label="有"></i-radio>
          </i-radio-group>
          <div v-if="manageParamsShow" style="margin-top:21px;margin-left:10px;" class="initialPayment">
            <i-form-item prop="manageCost" label="比例">
              <i-input v-model="productDetail.manageCost"></i-input>
            </i-form-item>
            <span style="color:red" class="after_text">%</span>
            <span style="color:blue" class="after_text">如果有多个则用分号隔开</span>
          </div>
        </data-grid-item>
        <data-grid-item label="管理费收取方式" :span="12">
          <i-form-item prop="manageCostType" style="margin-top:15px;">
            <i-radio-group v-model="costType" @on-change="stagingPeriod">
              <i-radio label="一次性收取"></i-radio>
              <i-radio label="分期数收取"></i-radio>
            </i-radio-group>
          </i-form-item>
          <div v-if="stagingPeriodShow" class="initialPayment" style="margin-top:15px;margin-left:-30px;">
            <i-form-item prop="stagingPeriods" label="期数" >
              <i-input v-model="productDetail.stagingPeriods"></i-input>
            </i-form-item>
          </div>
        </data-grid-item>
      </data-grid>
      <div class="addPeriodsItem">逾期违约惩罚参数</div>
      <data-grid :labelWidth="100">
        <data-grid-item :span="6" label="征信保护天数">
          <i-form-item prop="creditProtectDays" style="margin-top:15px;">
            <i-input v-model="productDetail.creditProtectDays"></i-input>天
          </i-form-item>
        </data-grid-item>
        <data-grid-item :span="6" label="逾期保护天数">
          <i-form-item prop="overdueProtectDays" style="margin-top:15px;">
            <i-input v-model="productDetail.overdueProtectDays"></i-input>天
          </i-form-item>
        </data-grid-item>
        <data-grid-item :span="6" label="合同违约金费率" style="margin-top:15px;">
          <i-form-item prop="contractBreakRate">
            <i-input v-model="productDetail.contractBreakRate"></i-input>天
          </i-form-item>
        </data-grid-item>
        <data-grid-item :span="6" label="提前还款费率" style="margin-top:15px;">
          <i-form-item prop="prepaymentRate">
            <i-input v-model="productDetail.prepaymentRate"></i-input>天
          </i-form-item>
        </data-grid-item>
        <data-grid-item :span="12" label="罚息费率" style="margin-top:15px;">
          <i-form-item prop="penaltyRate">
            <i-input v-model="productDetail.penaltyRate"></i-input>天
          </i-form-item>
        </data-grid-item>
      </data-grid>
      <div style="margin-right:10px;display:inline-block" class="addPeriodsItem">状态</div>
      <i-form-item prop="isPublish">
        <i-radio-group v-model="isPublish">
          <i-radio label="未发布"></i-radio>
          <i-radio label="已发布"></i-radio>
        </i-radio-group>
      </i-form-item>
    </section>
  </i-form>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { DataGrid, DataGridItem } from 'vue-fintech-component';
import { Form } from 'iview';
import { Dependencies } from '~/core/decorator';
import { ProductPlanIssueService } from '~/services/manage-service/productPlanIssue.service';

@Component({
	components: {
		DataGrid,
		DataGridItem,
	},
})
export default class AddPeriods extends Vue {
	@Dependencies(ProductPlanIssueService) private ProductPlanIssueService: ProductPlanIssueService;
	private productDetail: any = {};
	@Prop() pNameTitle: any;
	private accountPeriodsList: String = '正常账期';
	private initialParams: String = '无';
	private promiseMoenyParams: String = '无';
	private residueParams: String = '无';
	private manageMoneyParams: String = '无';
	private costType: String = '一次性收取';
	private isPublish: String = '未发布';
	private disabled: Boolean = false;
	private initialParamsShow: Boolean = false;
	private changePromiseMoenyShow: Boolean = false;
	private promiseMoneyShow: Boolean = false;
	private residueParamsShow: Boolean = false;
	private manageParamsShow: Boolean = false;
	private formRules: Object = {};
	private formItems: any = {};
	private amount: any = {};
	private monthDay: any = [];
	private stagingPeriodShow: Boolean = false;
	private moneyArray: any = [];

	created() {
		this.monthDayFun();
		this.formRules = {
			periods: [{ required: true, message: '您输入的内容不能为空', trigger: 'blur' }],
			productRate: [{ required: true, message: '您输入的内容不能为空', trigger: 'blur' }],
			payWay: [{ required: true, message: '请选择', trigger: 'change' }],
			periodType: [{ required: true, message: '请选择', trigger: 'change' }],
			// financingAmount: [{ required: true, message: '您输入的内容不能为空', trigger: 'blur', type: 'number' }],
			// financingAmount2: [{ required: true, message: '您输入的内容不能为空', trigger: 'blur', type: 'number' }],
			paymentDay: [{ required: true, message: '请选择', trigger: 'change' }],
			initialPayment: [{ required: true, message: '您输入的内容不能为空', trigger: 'blur' }],
			depositCash: [{ required: true, message: '您输入的内容不能为空', trigger: 'blur' }],
			depositCashType: [{ required: true, message: '请选择', trigger: 'change' }],
			finalCash: [{ required: true, message: '您输入的内容不能为空', trigger: 'blur' }],
			manageCost: [{ required: true, message: '您输入的内容不能为空', trigger: 'blur' }],
			stagingPeriods: [{ required: true, message: '您输入的内容不能为空', trigger: 'blur' }],
			creditProtectDays: [{ required: true, message: '您输入的内容不能为空', trigger: 'blur' }],
			overdueProtectDays: [{ required: true, message: '您输入的内容不能为空', trigger: 'blur' }],
			contractBreakRate: [{ required: true, message: '您输入的内容不能为空', trigger: 'blur' }],
			prepaymentRate: [{ required: true, message: '您输入的内容不能为空', trigger: 'blur' }],
			penaltyRate: [{ required: true, message: '您输入的内容不能为空', trigger: 'blur' }],
		};
		this.productDetail = {
			productId: '',
			periods: '', //产品期数
			periodType: '',
			paymentType: '',
			paymentDay: '',
			productRate: '',
			payWay: '',
			financingAmount: '',
			initialPayment: '',
			depositCash: '',
			depositCashType: '',
			finalCash: '',
			manageCost: '',
			manageCostType: '',
			stagingPeriods: '', // 期数
			creditProtectDays: '',
			overdueProtectDays: '',
			penaltyRate: '',
			contractBreakRate: '',
			prepaymentRate: '',
			productStatus: '',
			isPublish: '',
			operator: '',
			operatorTime: '',
			id: '',
		};
	}

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
	changeInitialParams(val) {
		if (val === '无') {
			this.initialParamsShow = false;
		} else {
			this.initialParamsShow = true;
		}
	}
	changePromiseMoenyParams(val) {
		if (val === '无') {
			this.promiseMoneyShow = false;
		} else {
			this.promiseMoneyShow = true;
		}
	}
	changeResidueParams(val) {
		if (val === '无') {
			this.residueParamsShow = false;
		} else {
			this.residueParamsShow = true;
		}
	}
	changeManageMoney(val) {
		if (val === '无') {
			this.manageParamsShow = false;
		} else {
			this.manageParamsShow = true;
		}
	}
	stagingPeriod(val) {
		if (val === '一次性收取') {
			this.stagingPeriodShow = false;
		} else {
			this.stagingPeriodShow = true;
		}
	}
	moneyFun(item) {
		this.productDetail = item;
		this.moneyArray = item.financingAmount.split('~');
		this.amount = {
			financingAmount1: this.moneyArray[0],
			financingAmount2: this.moneyArray[1],
		};
		this.productDetail.paymentType === 386
			? (this.productDetail.paymentType = '正常账期')
			: (this.productDetail.paymentType = '固定账期');
		if (this.productDetail.initialPayment != ' ') {
			this.initialParams = '有';
			this.initialParamsShow = true;
		}
		if (this.productDetail.depositCash != ' ') {
			this.promiseMoenyParams = '有';
			this.promiseMoneyShow = true;
		}
		if (this.productDetail.finalCash != ' ') {
			this.residueParams = '有';
			this.residueParamsShow = true;
		}
		if (this.productDetail.manageCost != ' ') {
			this.manageMoneyParams = '有';
			this.manageParamsShow = true;
		}
		if (this.productDetail.stagingPeriods != ' ') {
			this.costType = '分期数收取';
			this.stagingPeriodShow = true;
		}
		if (this.productDetail.isPublish === 361) {
			this.isPublish = '未发布';
		} else {
			this.isPublish = '已发布';
		}
	}
	/**@
	 * 点击确定按钮
	 */
	confirmPeriods() {
		let formVal = <Form>this.$refs['productref'];
		console.log(2222);
		formVal.validate(valid => {
			if (!valid) return false;
			this.$emit('close', this.productDetail);
			this.productDetail.paymentType === '固定账期'
				? (this.productDetail.paymentType = 387)
				: (this.productDetail.paymentType = 386);
			this.productDetail.manageCostType === '一次性收取'
				? (this.productDetail.manageCostType = 394)
				: (this.productDetail.manageCostType = 395);
			this.productDetail.depositCashType === '退还'
				? (this.productDetail.depositCashType = 396)
				: (this.productDetail.depositCashType = 397);
			this.productDetail.isPublish === '未发布'
				? (this.productDetail.isPublish = 361)
				: (this.productDetail.isPublish = 360);
			this.productDetail.financingAmount = this.amount.financingAmount1 + '~' + this.amount.financingAmount2;
			this.productDetail.productId = this.productDetail.id;
			this.productDetail.productStatus = this.productDetail.status;
			this.ProductPlanIssueService.createOrModifyProductPlan(this.productDetail).subscribe(val => {
				this.$Message.success('新增成功！');
			});
		});
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