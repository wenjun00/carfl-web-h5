<template>
  <section>
    <i-form ref="form" class="editcar" :model="carFormItem" :rules="ruleValidate" :label-width="100">
      <i-row>
        <i-col :span="12">
          <i-form-item label="经销商" prop="productPackageName">
            <i-input v-model="carFormItem.productPackageName"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="品牌" prop="carBrandId">
            <i-select v-model="carFormItem.carBrandId">
              <i-option v-for="item in brandList" :value="item.id" :label="item.brandName" :key="item.id"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="12">
          <i-form-item label="系列" prop="carSeriesName">
            <i-select v-model="carFormItem.carSeriesName">
              <i-option v-for="item in SeriesList" :value="item.seriesName" :label="item.seriesName" :key="item.id"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="型号" prop="carName">
            <i-select v-model="carFormItem.carName">
              <i-option v-for="item in carList" :value="item.modelName" :label="item.modelName" :key="item.id"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="12">
          <i-form-item label="颜色" prop="carRemark">
            <i-input v-model="carFormItem.carRemark"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="市场指导价" prop="marketGuidingPrice">
            <i-input v-model="carFormItem.marketGuidingPrice"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="12">
          <i-form-item label="经销商报价" prop="dealerGuidingPrice">
            <i-input v-model="carFormItem.dealerGuidingPrice"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="首期金额" prop="firstPayment">
            <i-input v-model="carFormItem.firstPayment"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="12">
          <i-form-item label="融资金额" prop="financeAmount">
            <i-input v-model="carFormItem.financeAmount"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="融资期数" prop="periods">
            <i-input v-model="carFormItem.periods"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="12">
          <i-form-item label="租金（月）" prop="monthPay">
            <i-input v-model="carFormItem.monthPay"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="购置税" prop="purchaseTaxMoney">
            <i-input v-model="carFormItem.purchaseTaxMoney"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="12">
          <i-form-item label="路桥费" prop="roadBridgeFee">
            <i-input v-model="carFormItem.roadBridgeFee"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="保险费" prop="annualAmount">
            <i-input v-model="carFormItem.annualAmount"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="12">
          <i-form-item label="GPS费" prop="gpsFee">
            <i-input v-model="carFormItem.gpsFee"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="其他费用" prop="otherFee">
            <i-input v-model="carFormItem.otherFee"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="12">
          <i-form-item label="状态" prop="status">
            <i-input v-model="carFormItem.status"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
    </i-form>
    <div style="text-align:right">
      <i-button class="Ghost" @click="close()">取消</i-button>
      <i-button class="blueButton" @click="submitButton">确定</i-button>
    </div>
  </section>
</template>
<script lang="ts">
  import Vue from "vue";
  import {
    Prop
  } from "vue-property-decorator";
  import Component from "vue-class-component";
  import {
    Form
  } from "iview";
  import {
    Dependencies
  } from "~/core/decorator";
  import {
    CarQuotationService
  } from "~/services/manage-service/carQuotation.service";
  import {
    CarService
  } from "~/services/manage-service/car.service";

  import {
    Emit
  } from "vue-property-decorator";

  @Component({
    components: {}
  })
  export default class AddPeriods extends Vue {
    @Dependencies(CarQuotationService) private carQuotationService: CarQuotationService;
    @Dependencies(CarService) private carService: CarService;

    @Prop() carFormItem: any;

    @Emit('close')
    close() {}
    @Emit('seachBusiness')
    seachBusiness() {}

    private brandList: any = []; // 品牌
    private SeriesList: any = []; // 系列
    private carList: any = []; // 型号
    private ruleValidate: any = {
      productPackageName: [{
        required: true,
        message: "您输入的内容不能为空",
        trigger: "blur"
      }],
      carBrandId: [{
        required: true,
        message: "您输入的内容不能为空",
        trigger: "change",
        type: 'number'
      }],
      carSeriesName: [{
        required: true,
        message: "您输入的内容不能为空",
        trigger: "change"
        // type: 'number'
      }],
      carName: [{
        required: true,
        message: "您输入的内容不能为空",
        trigger: "change"
        // type: 'number'
      }],
      carRemark: [{
        required: true,
        message: "您输入的内容不能为空",
        trigger: "blur"
      }],
      marketGuidingPrice: [{
        required: true,
        message: "您输入的内容不能为空",
        trigger: "blur",
        type: 'number'
      }],
      dealerGuidingPrice: [{
        required: true,
        message: "您输入的内容不能为空",
        trigger: "blur",
        type: 'number'
      }],
      firstPayment: [{
        required: true,
        message: "您输入的内容不能为空",
        trigger: "blur",
        type: 'number'
      }],
      financeAmount: [{
        required: true,
        message: "您输入的内容不能为空",
        trigger: "blur",
        type: 'number'
      }],
      periods: [{
        required: true,
        message: "您输入的内容不能为空",
        trigger: "blur",
        type: 'number'
      }],
      monthPay: [{
        required: true,
        message: "您输入的内容不能为空",
        trigger: "blur",
        type: 'number'
      }],
      purchaseTaxMoney: [{
        required: true,
        message: "您输入的内容不能为空",
        trigger: "blur",
        type: 'number'
      }],
      roadBridgeFee: [{
        required: true,
        message: "您输入的内容不能为空",
        trigger: "blur",
        type: 'number'
      }],
      annualAmount: [{
        required: true,
        message: "您输入的内容不能为空",
        trigger: "blur",
        type: 'number'
      }],
      gpsFee: [{
        required: true,
        message: "您输入的内容不能为空",
        trigger: "blur",
        type: 'number'
      }],
      otherFee: [{
        required: true,
        message: "您输入的内容不能为空",
        trigger: "blur",
        type: 'number'
      }],
      status: [{
        required: true,
        message: "您输入的内容不能为空",
        trigger: "blur",
        type: 'number'
      }]
    };

    created() {
      console.log(this.carFormItem, 90)
      // 获取品牌
      this.carService.getAllBrand().subscribe(data => {
        this.brandList = data
      }, ({
        msg
      }) => {
        this.$Message.error(msg);
      });
      //   获取系列
      this.carService.getAllSeries().subscribe(data => {
        this.SeriesList = data
      }, ({
        msg
      }) => {
        this.$Message.error(msg);
      });
      // 获取型号
      this.carService.getAllModel().subscribe(data => {
        this.carList = data
        console.log(data, 666)
      }, ({
        msg
      }) => {
        this.$Message.error(msg);
      });
    }

    /**
     * 确定
     */
    submitButton() {
      let formVal: any = this.$refs["form"];
      formVal.validate(valid => {
        if (!valid) return false
        this.carQuotationService.updateCarQuotation(this.carFormItem).subscribe(data => {
          this.$Message.success("修改成功！")
          //   关闭弹框
          this.close()
          //   刷新databox
          this.seachBusiness()
        }, ({
          msg
        }) => {
          this.$Message.error(msg);
        });
      });
    }
  }

</script>
<style lang="less">
  .editcar {
    position: relative;
    right: 15px;
  }

</style>
