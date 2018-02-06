// 新增报价
<template>
  <section>
    <i-form ref="quoteForm" :model="quoteForm" :rules="rulesQuote" :label-width="85">
      <i-row>
        <i-form-item label="经销商" prop="productPackageName">
          <i-input v-model="quoteForm.productPackageName"></i-input>
        </i-form-item>
      </i-row>
      <div class="title_info">车辆信息</div>
      <i-row>
        <i-col :span="12">
          <i-form-item label="品牌" prop="carBrandName">
            <i-input v-model="quoteForm.carBrandName"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="车型" prop="carName">
            <i-input v-model="quoteForm.carName"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="12">
          <i-form-item label="车系" prop="carSeriesName">
            <i-input v-model="quoteForm.carSeriesName"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="颜色" prop="carRemark">
            <i-input v-model="quoteForm.carRemark"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <div class="title_info">报价信息</div>
      <i-row>
        <i-col :span="12">
          <i-form-item label="市场指导价" prop="marketGuidingPrice">
            <i-input v-model="quoteForm.marketGuidingPrice"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="租金(月）" prop="monthPay">
            <i-input v-model="quoteForm.monthPay"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="12">
          <i-form-item label="经销商报价" prop="dealerGuidingPrice">
            <i-input v-model="quoteForm.dealerGuidingPrice"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="购置税" prop="purchaseTaxMoney">
            <i-input v-model="quoteForm.purchaseTaxMoney"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="12">
          <i-form-item label="首期金额" prop="firstPayment">
            <i-input v-model="quoteForm.firstPayment"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="路桥费" prop="roadBridgeFee">
            <i-input v-model="quoteForm.roadBridgeFee"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="12">
          <i-form-item label="融资金额" prop="financeAmount">
            <i-input v-model="quoteForm.financeAmount"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="保险费" prop="annualAmount">
            <i-input v-model="quoteForm.annualAmount"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="12">
          <i-form-item label="融资期数" prop="periods">
            <i-input v-model="quoteForm.periods"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="GPS费" prop="gpsFee">
            <i-input v-model="quoteForm.gpsFee"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="12">
          <i-form-item label="其他费用" prop="otherFee">
            <i-input v-model="quoteForm.otherFee"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="是否启用" prop="status">
            <i-select v-model="quoteForm.status">
              <i-option label="启用" :key="0" :value="0"></i-option>
              <i-option label="停用" :key="1" :value="1"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
      </i-row>
    </i-form>
  </section>
</template>
<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import {
    Prop
  } from 'vue-property-decorator';
  import {
    DataGrid,
    DataGridItem
  } from 'vue-fintech-component';
  import {
    Form
  } from 'iview';
  import {
    Dependencies
  } from '~/core/decorator';
  import {
    Emit
  } from "vue-property-decorator";
  import {
    CarQuotationService
  } from '~/services/manage-service/car-quotation.service';

  @Component({
    components: {
      DataGrid,
      DataGridItem,
    },
  })
  export default class AddPeriods extends Vue {
    @Dependencies(CarQuotationService) private carQuotationService: CarQuotationService;
    private quoteForm: any = {
      productPackageName: '',
      carBrandName: '',
      carName: '',
      carSeriesName: '',
      carRemark: '',
      marketGuidingPrice: '',
      monthPay: '',
      dealerGuidingPrice: '',
      purchaseTaxMoney: '',
      firstPayment: '',
      roadBridgeFee: '',
      financeAmount: '',
      annualAmount: '',
      periods: '',
      gpsFee: '',
      otherFee: '',
      status: 0,
    };
    private rulesQuote: any = {
      productPackageName: [{
        required: true,
        message: '请输入经销商',
        trigger: 'blur'
      }],
      carBrandName: [{
        required: true,
        message: '请输入品牌',
        trigger: 'blur'
      }],
      carName: [{
        required: true,
        message: '请输入车型',
        trigger: 'blur'
      }],
      carSeriesName: [{
        required: true,
        message: '请输入车系',
        trigger: 'blur'
      }],
      carRemark: [{
        required: true,
        message: '请输入颜色',
        trigger: 'blur'
      }],
      marketGuidingPrice: [{
        required: true,
        message: '请输入市场指导价',
        trigger: 'blur'
      }],
      monthPay: [{
        required: true,
        message: '请输入租金',
        trigger: 'blur'
      }],
      dealerGuidingPrice: [{
        required: true,
        message: '请输入经销商报价',
        trigger: 'blur'
      }],
      purchaseTaxMoney: [{
        required: true,
        message: '请输入购置税',
        trigger: 'blur'
      }],
      firstPayment: [{
        required: true,
        message: '请输入首期金额',
        trigger: 'blur'
      }],
      roadBridgeFee: [{
        required: true,
        message: '请输入路桥费',
        trigger: 'blur'
      }],
      financeAmount: [{
        required: true,
        message: '请输入融资金额',
        trigger: 'blur'
      }],
      annualAmount: [{
        required: true,
        message: '请输入保险费',
        trigger: 'blur'
      }],
      periods: [{
        required: true,
        message: '请输入融资期数',
        trigger: 'blur'
      }],
      gpsFee: [{
        required: true,
        message: '请输入GPS费',
        trigger: 'blur'
      }],
      status: [{
        required: true,
        message: '请选择是否启用',
        trigger: 'change',
        type: 'number',
      }],
    };
    private check: Boolean = true;

    @Emit('seachBusiness')
    seachBusiness() {}

    created() {}
    rulesFun() {
      let form: any = this.$refs['quoteForm'];
      form.validate(valid => {
        if (!valid) {
          return false;
        } else {
          //   this.check === true ? (this.quoteForm.status = 0) : (this.quoteForm.status = 1);
          this.carQuotationService.createCarQuotation(this.quoteForm).subscribe(val => {
            this.$Message.success('新增成功！');
            this.$emit('close');
            this.seachBusiness()
          });
        }
      });
    }
  }

</script>
<style lang="less" scope>
  .flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .ivu-form-item {
      flex: 50%;
    }
  }
  
  .title_info {
    width: 100%;
    background: rgb(236, 235, 235);
    font-size: 14px;
    color: white;
    padding-left: 15px;
    line-height: 40px;
    margin-bottom: 20px;
  }

</style>
