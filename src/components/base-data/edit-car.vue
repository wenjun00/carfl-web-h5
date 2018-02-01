<template>
    <i-form ref="carFormItem" :model="carFormItem" :rules="ruleValidate" :label-width="80">
        <i-form-item label="经销商" prop="productPackageName">
            <i-input v-model="carFormItem.productPackageName"></i-input>
        </i-form-item>
        <i-form-item label="品牌" prop="carBrandId">
            <i-input v-model="carFormItem.carBrandId"></i-input>
        </i-form-item>
        <i-form-item label="系列" prop="carSeriesId">
            <i-input v-model="carFormItem.carSeriesId"></i-input>
        </i-form-item>
        <i-form-item label="型号" prop="carName">
            <i-input v-model="carFormItem.carName"></i-input>
        </i-form-item>
        <i-form-item label="颜色" prop="carRemark">
            <i-input v-model="carFormItem.carRemark"></i-input>
        </i-form-item>
        <i-form-item label="市场指导价" prop="marketGuidingPrice">
            <i-input v-model="carFormItem.marketGuidingPrice"></i-input>
        </i-form-item>
        <i-form-item label="经销商报价" prop="dealerGuidingPrice">
            <i-input v-model="carFormItem.dealerGuidingPrice"></i-input>
        </i-form-item>
        <i-form-item label="首期金额" prop="firstPayment">
            <i-input v-model="carFormItem.firstPayment"></i-input>
        </i-form-item>
        <i-form-item label="融资金额" prop="financeAmount">
            <i-input v-model="carFormItem.financeAmount"></i-input>
        </i-form-item>
        <i-form-item label="融资期数" prop="periods">
            <i-input v-model="carFormItem.periods"></i-input>
        </i-form-item>
        <i-form-item label="租金（月）" prop="monthPay">
            <i-input v-model="carFormItem.monthPay"></i-input>
        </i-form-item>
        <i-form-item label="购置税" prop="purchaseTaxMoney">
            <i-input v-model="carFormItem.purchaseTaxMoney"></i-input>
        </i-form-item>
        <i-form-item label="路桥费" prop="roadBridgeFee">
            <i-input v-model="carFormItem.roadBridgeFee"></i-input>
        </i-form-item>
        <i-form-item label="保险费" prop="annualAmount">
            <i-input v-model="carFormItem.annualAmount"></i-input>
        </i-form-item>
        <i-form-item label="GPS费" prop="gpsFee">
            <i-input v-model="carFormItem.gpsFee"></i-input>
        </i-form-item>
        <i-form-item label="其他费用" prop="otherFee">
            <i-input v-model="carFormItem.otherFee"></i-input>
        </i-form-item>
        <i-form-item label="状态" prop="status">
            <i-input v-model="carFormItem.status"></i-input>
        </i-form-item>

    </i-form>
</template>
<script lang="ts">
import Vue from "vue";
import { Prop } from "vue-property-decorator";
import Component from "vue-class-component";
import { Form } from "iview";
import { Dependencies } from "~/core/decorator";
import { CarQuotationService } from "~/services/manage-service/carQuotation.service";

@Component({
  components: {}
})
export default class AddPeriods extends Vue {
  @Dependencies(CarQuotationService)
  private carQuotationService: CarQuotationService;
  @Prop() carFormItem: any;
  private ruleValidate: any = {};
  created() {
    this.ruleValidate = {
      productPackageName: [
        { required: true, message: "您输入的内容不能为空", trigger: "blur" }
      ],
      carBrandId: [
        { required: true, message: "您输入的内容不能为空", trigger: "blur" }
      ],
      carSeriesId: [
        { required: true, message: "您输入的内容不能为空", trigger: "blur" }
      ],
      carName: [
        { required: true, message: "您输入的内容不能为空", trigger: "blur" }
      ],
      carRemark: [
        { required: true, message: "您输入的内容不能为空", trigger: "blur" }
      ],
      marketGuidingPrice: [
        { required: true, message: "您输入的内容不能为空", trigger: "blur" }
      ],
      dealerGuidingPrice: [
        { required: true, message: "您输入的内容不能为空", trigger: "blur" }
      ],
      firstPayment: [
        { required: true, message: "您输入的内容不能为空", trigger: "blur" }
      ],
      financeAmount: [
        { required: true, message: "您输入的内容不能为空", trigger: "blur" }
      ],
      periods: [
        { required: true, message: "您输入的内容不能为空", trigger: "blur" }
      ],
      monthPay: [
        { required: true, message: "您输入的内容不能为空", trigger: "blur" }
      ],
      purchaseTaxMoney: [
        { required: true, message: "您输入的内容不能为空", trigger: "blur" }
      ],
      roadBridgeFee: [
        { required: true, message: "您输入的内容不能为空", trigger: "blur" }
      ],
      annualAmount: [
        { required: true, message: "您输入的内容不能为空", trigger: "blur" }
      ],
      gpsFee: [
        { required: true, message: "您输入的内容不能为空", trigger: "blur" }
      ],
      otherFee: [
        { required: true, message: "您输入的内容不能为空", trigger: "blur" }
      ],
      status: [
        { required: true, message: "您输入的内容不能为空", trigger: "blur" }
      ]
    };
  }
  validForm() {
    this.carQuotationService
      .updateCarQuotation(this.carFormItem)
      .subscribe(val => {
        this.$Message.success("修改成功！");
        console.log(this.carFormItem);
      });
  }
}
</script>
