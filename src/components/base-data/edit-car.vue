<!--编辑经销商报价-->
<template>
  <section>
    <i-form ref="form" class="editcar" :model="carFormItem" :rules="ruleValidate" :label-width="85" label-position="left">
      <i-row>
        <i-col :span="11">
          <i-form-item label="经销商" prop="quotationName">
            <i-input v-model="carFormItem.quotationName"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12" :push="1">
          <i-form-item label="产品包" prop="quotationName">
            <i-select v-model="carFormItem.productPackageId">
              <i-option v-for="item in allProdPackage" :key="item.id" :value="item.id" :label="item.fileName"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
      </i-row>
      <div>
        <div style="width:7px;height:20px;background:#265EA2;display:inline-block;margin-right:6px;position:relative;top:4px;"></div>
        <span>车辆信息</span>
      </div>
      <i-row>
        <i-col :span="11">
          <i-form-item label="品牌" prop="carBrandId">
            <i-select v-model="carFormItem.carBrandId">
              <i-option v-for="item in brandList" :value="item.id" :label="item.brandName" :key="item.id"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <i-col :span="12" :push="1">
          <i-form-item label="车型" prop="carName">
            <i-select v-model="carFormItem.carName">
              <i-option v-for="item in carList" :value="item.modelName" :label="item.modelName" :key="item.id"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="11">
          <i-form-item label="车系" prop="carSeriesName">
            <i-select v-model="carFormItem.carSeriesName">
              <i-option v-for="item in SeriesList" :value="item.seriesName" :label="item.seriesName" :key="item.id"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <i-col :span="12" :push="1">
          <i-form-item label="颜色" prop="carColor">
            <i-input v-model="carFormItem.carColor"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <div>
        <div style="width:7px;height:20px;background:#265EA2;display:inline-block;margin-right:6px;position:relative;top:4px;"></div>
        <span>报价信息</span>
      </div>
      <i-row>
        <i-col :span="11">
          <i-form-item label="市场指导价" prop="marketGuidingPrice">
            <i-input v-model="carFormItem.marketGuidingPrice"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12" :push="1">
          <i-form-item label="租金（月）" prop="monthPay">
            <i-input v-model="carFormItem.monthPay"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="11">
          <i-form-item label="经销商报价" prop="firstPayment">
            <i-input v-model="carFormItem.firstPayment"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12" :push="1">
          <i-form-item label="购置税" prop="purchaseTaxMoney">
            <i-input v-model="carFormItem.purchaseTaxMoney"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="11">
          <i-form-item label="首期金额" prop="firstPayment">
            <i-input v-model="carFormItem.firstPayment"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12" :push="1">
          <i-form-item label="路桥费" prop="roadBridgeFee">
            <i-input v-model="carFormItem.roadBridgeFee"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="11">
          <i-form-item label="融资金额" prop="financeAmount">
            <i-input v-model="carFormItem.financeAmount"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12" :push="1">
          <i-form-item label="保险费" prop="annualAmount">
            <i-input v-model="carFormItem.annualAmount"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="11">
          <i-form-item label="融资期数" prop="periods">
            <i-input v-model="carFormItem.periods"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12" :push="1">
          <i-form-item label="GPS费" prop="gpsFee">
            <i-input v-model="carFormItem.gpsFee"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="11">
          <i-form-item label="其他费用" prop="otherFee">
            <i-input v-model="carFormItem.otherFee"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12" :push="1">
          <i-form-item label="是否启用" prop="status">
            <i-select v-model="carFormItem.status">
              <i-option label="启用" :key="0" :value="0"></i-option>
              <i-option label="停用" :key="1" :value="1"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
      </i-row>
    </i-form>
    <!-- <div style="text-align:right">
      <i-button class="Ghost" @click="close()">取消</i-button>
      <i-button class="blueButton" @click="submitButton">确定</i-button>
    </div> -->
  </section>
</template>
<script lang="ts">
import Vue from 'vue';
import { Prop } from 'vue-property-decorator';
import Component from 'vue-class-component';
import { Form } from 'iview';
import { Dependencies } from '~/core/decorator';
import { CarQuotationService } from '~/services/manage-service/car-quotation.service';
import { CarService } from '~/services/manage-service/car.service';
import { ProductPackageService } from '~/services/manage-service/product-package.service';
import { Emit } from 'vue-property-decorator';

@Component({
	components: {},
})
export default class EditCar extends Vue {
	@Dependencies(CarQuotationService) private carQuotationService: CarQuotationService;
	@Dependencies(CarService) private carService: CarService;
	@Dependencies(ProductPackageService) private productPackageService: ProductPackageService;
	@Prop() carFormItem: any;

	@Emit('close')
	close() {}
	@Emit('seachBusiness')
	seachBusiness() {}

	private brandList: any = []; // 品牌
	private SeriesList: any = []; // 系列
	private carList: any = []; // 型号
	private allProdPackage: Array<any> = [];
	private ruleValidate: any = {
		quotationName: [
			{
				required: true,
				message: '请输入经销商',
				trigger: 'blur',
			},
			{ type: 'string', max: 10, message: '您输入的字符不能超过10个', trigger: 'blur' },
		],
		carBrandId: [
			{
				required: true,
				message: '请输入品牌',
				trigger: 'change',
				type: 'number',
			},
		],
		carSeriesName: [
			{
				required: true,
				message: '请输入系列',
				trigger: 'change',
				// type: 'number'
			},
		],
		carName: [
			{
				required: true,
				message: '请输入型号',
				trigger: 'change',
				// type: 'number'
			},
		],
		carColor: [
			{
				required: true,
				message: '请输入颜色',
				trigger: 'blur',
			},
			{ type: 'string', max: 10, message: '您输入的字符不能超过10个', trigger: 'blur' },
		],
		marketGuidingPrice: [
			{
				required: true,
				message: '请输入市场指导价',
				trigger: 'blur',
				type: 'number',
			},
			{ type: 'string', max: 10, message: '您输入的字符不能超过10个', trigger: 'blur' },
		],
		dealerGuidingPrice: [
			{
				required: true,
				message: '请输入经销商报价',
				trigger: 'blur',
				type: 'number',
			},
			{ type: 'string', max: 10, message: '您输入的字符不能超过10个', trigger: 'blur' },
		],
		firstPayment: [
			{
				required: true,
				message: '请输入首期金额',
				trigger: 'blur',
				type: 'number',
			},
			{ type: 'string', max: 10, message: '您输入的字符不能超过10个', trigger: 'blur' },
		],
		financeAmount: [
			{
				required: true,
				message: '请输入融资金额',
				trigger: 'blur',
				type: 'number',
			},
			{ type: 'string', max: 10, message: '您输入的字符不能超过10个', trigger: 'blur' },
		],
		periods: [
			{
				required: true,
				message: '请输入融资期数',
				trigger: 'blur',
				type: 'number',
			},
			{ type: 'string', max: 10, message: '您输入的字符不能超过10个', trigger: 'blur' },
		],
		monthPay: [
			{
				required: true,
				message: '请输入租金',
				trigger: 'blur',
				type: 'number',
			},
			{ type: 'string', max: 10, message: '您输入的字符不能超过10个', trigger: 'blur' },
		],
		purchaseTaxMoney: [
			{
				required: true,
				message: '请输入购置税',
				trigger: 'blur',
				type: 'number',
			},
			{ type: 'string', max: 10, message: '您输入的字符不能超过10个', trigger: 'blur' },
		],
		roadBridgeFee: [
			{
				required: true,
				message: '请输入路桥费',
				trigger: 'blur',
				type: 'number',
			},
			{ type: 'string', max: 10, message: '您输入的字符不能超过10个', trigger: 'blur' },
		],
		annualAmount: [
			{
				required: true,
				message: '请输入保险费',
				trigger: 'blur',
				type: 'number',
			},
			{ type: 'string', max: 10, message: '您输入的字符不能超过10个', trigger: 'blur' },
		],
		gpsFee: [
			{
				required: true,
				message: '请输入GPS费',
				trigger: 'blur',
				type: 'number',
			},
			{ type: 'string', max: 10, message: '您输入的字符不能超过10个', trigger: 'blur' },
		],
		otherFee: [
			{
				required: true,
				message: '请输入其他费用',
				trigger: 'blur',
				type: 'number',
			},
			{ type: 'string', max: 10, message: '您输入的字符不能超过10个', trigger: 'blur' },
		],
		status: [
			{
				required: true,
				message: '请选择状态',
				trigger: 'blur',
				type: 'number',
			},
			{ type: 'string', max: 10, message: '您输入的字符不能超过10个', trigger: 'blur' },
		],
	};

	created() {
		console.log(this.carFormItem, 90);
		// 获取品牌
		this.carService.getAllBrand().subscribe(
			data => {
				this.brandList = data;
			},
			({ msg }) => {
				this.$Message.error(msg);
			}
		);
		//   获取系列
		this.carService.getAllSeries().subscribe(
			data => {
				this.SeriesList = data;
			},
			({ msg }) => {
				this.$Message.error(msg);
			}
		);
		// 获取型号
		this.carService.getAllModel().subscribe(
			data => {
				this.carList = data;
				console.log(data, 666);
			},
			({ msg }) => {
				this.$Message.error(msg);
			}
		);
	}
	resetInput() {
		let formVal: any = this.$refs['form'];
		formVal.resetFields();
	}
	/**
	 * 确定
	 */
	submitButton() {
		let formVal: any = this.$refs['form'];
		formVal.validate(valid => {
			if (!valid) return false;
			this.carFormItem.carRemark = this.carFormItem.carColor;
			this.carQuotationService.updateCarQuotation(this.carFormItem).subscribe(
				data => {
					this.$Message.success('修改成功！');
					this.$emit('close');
				},
				({ msg }) => {
					this.$Message.error(msg);
				}
			);
		});
	}
	/**
	 * 获取所有产品包
	 */
	getAllProdPackage() {
		this.productPackageService.getAllProductPackageNoPage().subscribe(
			data => {
				this.allProdPackage = data;
			},
			({ msg }) => {
				this.$Message.error(msg);
			}
		);
	}
}
</script>
<style lang="less">

</style>
