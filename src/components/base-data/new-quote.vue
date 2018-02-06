// 新增报价
<template>
  <i-form ref="quoteForm" :model="quoteForm" :rules="rulesQuote" :label-width="85">
    <i-form-item label="经销商" prop="productPackageName">
      <i-input v-model="quoteForm.productPackageName"></i-input>
    </i-form-item>
    <div class="title_info">车辆信息</div>
    <div class="flex">
      <i-form-item label="品牌" prop="carBrandName">
        <i-input v-model="quoteForm.carBrandName"></i-input>
      </i-form-item>
      <i-form-item label="车型" prop="carName">
        <i-input v-model="quoteForm.carName"></i-input>
      </i-form-item>
    </div>
    <div class="flex">
      <i-form-item label="车系" prop="carSeriesName">
        <i-input v-model="quoteForm.carSeriesName"></i-input>
      </i-form-item>
      <i-form-item label="颜色" prop="carRemark">
        <i-input v-model="quoteForm.carRemark"></i-input>
      </i-form-item>
    </div>
    <div class="title_info">报价信息</div>
    <div class="flex">
      <i-form-item label="市场指导价" prop="marketGuidingPrice">
        <i-input v-model="quoteForm.marketGuidingPrice"></i-input>
      </i-form-item>
      <i-form-item label="租金(月）" prop="monthPay">
        <i-input v-model="quoteForm.monthPay"></i-input>
      </i-form-item>
    </div>
    <div class="flex">
      <i-form-item label="经销商报价" prop="dealerGuidingPrice">
        <i-input v-model="quoteForm.dealerGuidingPrice"></i-input>
      </i-form-item>
      <i-form-item label="购置税" prop="purchaseTaxMoney">
        <i-input v-model="quoteForm.purchaseTaxMoney"></i-input>
      </i-form-item>
    </div>
    <div class="flex">
      <i-form-item label="首期金额" prop="firstPayment">
        <i-input v-model="quoteForm.firstPayment"></i-input>
      </i-form-item>
      <i-form-item label="路桥费" prop="roadBridgeFee">
        <i-input v-model="quoteForm.roadBridgeFee"></i-input>
      </i-form-item>
    </div>
    <div class="flex">
      <i-form-item label="融资金额" prop="financeAmount">
        <i-input v-model="quoteForm.financeAmount"></i-input>
      </i-form-item>
      <i-form-item label="保险费" prop="annualAmount">
        <i-input v-model="quoteForm.annualAmount"></i-input>
      </i-form-item>
    </div>
    <div class="flex">
      <i-form-item label="融资期数" prop="periods">
        <i-input v-model="quoteForm.periods"></i-input>
      </i-form-item>
      <i-form-item label="GPS费" prop="gpsFee">
        <i-input v-model="quoteForm.gpsFee"></i-input>
      </i-form-item>
    </div>
    <div class="flex">
      <i-form-item label="其他费用" prop="otherFee">
        <i-input v-model="quoteForm.otherFee" type="number"></i-input>
      </i-form-item>
      <i-form-item label="是否启用" prop="status">
        <i-radio-group v-model="quoteForm.status">
          <i-radio :label="0" :value="0">启用</i-radio>
          <i-radio :label="1" :value="1">停用</i-radio>
        </i-radio-group>
      </i-form-item>
    </div>
  </i-form>
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
    CarQuotationService
  } from '~/services/manage-service/carQuotation.service';

  @Component({
    components: {
      DataGrid,
      DataGridItem,
    },
  })
  export default class AddPeriods extends Vue {
    @Dependencies(CarQuotationService) private carQuotationService: CarQuotationService;
    private quoteForm: any = {};
    private rulesQuote: Object = {};
    private check: Boolean = true;
    created() {
      this.quoteForm = {
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
        status: '',
      };
      this.rulesQuote = {
        productPackageName: [{
          required: true,
          message: '您输入的内容不能为空',
          trigger: 'blur'
        }],
        carBrandName: [{
          required: true,
          message: '您输入的内容不能为空',
          trigger: 'blur'
        }],
        carName: [{
          required: true,
          message: '您输入的内容不能为空',
          trigger: 'blur'
        }],
        carSeriesName: [{
          required: true,
          message: '您输入的内容不能为空',
          trigger: 'blur'
        }],
        carRemark: [{
          required: true,
          message: '您输入的内容不能为空',
          trigger: 'blur'
        }],
        marketGuidingPrice: [{
          type: 'number',
          required: true,
          message: '您输入的内容不能为空',
          trigger: 'blur'
        }],
        monthPay: [{
          type: 'number',
          required: true,
          message: '您输入的内容不能为空',
          trigger: 'blur'
        }],
        dealerGuidingPrice: [{
          type: 'number',
          required: true,
          message: '您输入的内容不能为空',
          trigger: 'blur'
        }],
        purchaseTaxMoney: [{
          type: 'number',
          required: true,
          message: '您输入的内容不能为空',
          trigger: 'blur'
        }],
        firstPayment: [{
          type: 'number',
          required: true,
          message: '您输入的内容不能为空',
          trigger: 'blur'
        }],
        roadBridgeFee: [{
          type: 'number',
          required: true,
          message: '您输入的内容不能为空',
          trigger: 'blur'
        }],
        financeAmount: [{
          type: 'number',
          required: true,
          message: '您输入的内容不能为空',
          trigger: 'blur'
        }],
        annualAmount: [{
          type: 'number',
          required: true,
          message: '您输入的内容不能为空',
          trigger: 'blur'
        }],
        periods: [{
          type: 'number',
          required: true,
          message: '您输入的内容不能为空',
          trigger: 'blur'
        }],
        gpsFee: [{
          type: 'number',
          required: true,
          message: '您输入的内容不能为空',
          trigger: 'blur'
        }],
        status: [{
          required: true,
          message: '您输入的内容不能为空',
          trigger: 'blur'
        }],
      };
    }
    rulesFun() {
      let form: any = < Form > this.$refs['quoteForm'];
      form.validate(valid => {
        if (!valid) {
          this.$Message.error('验证不通过');
          return false;
        } else {
          this.check === true ? (this.quoteForm.status = 0) : (this.quoteForm.status = 1);
          this.carQuotationService.createCarQuotation(this.quoteForm).subscribe(val => {
            this.$Message.success('新增成功！');
            this.$emit('close');
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
