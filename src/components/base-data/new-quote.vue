<!--新增报价-->
<template>
  <section>
    <i-form ref="quoteForm" :model="quoteForm" :rules="rulesQuote" :label-width="85" class="quoteForm" label-position="left">
      <i-row>
        <i-col :span="11">
          <i-form-item label="经销商" prop="quotationName">
            <i-input v-model="quoteForm.quotationName"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12" :push="1">
          <i-form-item label="产品包" prop="productPackageId">
            <i-select v-model="quoteForm.productPackageId" clearable>
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
            <i-select v-model="quoteForm.carBrandId" clearable>
              <i-option v-for="item in brandList" :value="item.id" :label="item.brandName" :key="item.id"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <i-col :span="12" :push="1">
          <i-form-item label="车型" prop="carId">
            <i-select v-model="quoteForm.carId" clearable>
              <i-option v-for="item in carList" :value="item.id" :label="item.modelName" :key="item.id"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="11">
          <i-form-item label="车系" prop="carSeriesName">
            <i-select v-model="quoteForm.carSeriesName" clearable>
              <i-option v-for="item in SeriesList" :value="item.id" :label="item.seriesName" :key="item.id"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <i-col :span="12" :push="1">
          <i-form-item label="颜色" prop="carColor">
            <i-input v-model="quoteForm.carColor"></i-input>
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
            <i-input v-model="quoteForm.marketGuidingPrice"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12" :push="1">
          <i-form-item label="租金(月）" prop="monthPay">
            <i-input v-model="quoteForm.monthPay"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="11">
          <i-form-item label="经销商报价" prop="dealerGuidingPrice">
            <i-input v-model="quoteForm.dealerGuidingPrice"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12" :push="1">
          <i-form-item label="购置税" prop="purchaseTaxMoney">
            <i-input v-model="quoteForm.purchaseTaxMoney"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="11">
          <i-form-item label="首期金额" prop="firstPayment">
            <i-input v-model="quoteForm.firstPayment"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12" :push="1">
          <i-form-item label="路桥费" prop="roadBridgeFee">
            <i-input v-model="quoteForm.roadBridgeFee"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="11">
          <i-form-item label="融资金额" prop="financeAmount">
            <i-input v-model="quoteForm.financeAmount"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12" :push="1">
          <i-form-item label="保险费" prop="annualAmount">
            <i-input v-model="quoteForm.annualAmount"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="11">
          <i-form-item label="融资期数" prop="periods">
            <i-input v-model="quoteForm.periods"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12" :push="1">
          <i-form-item label="GPS费" prop="gpsFee">
            <i-input v-model="quoteForm.gpsFee"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="11">
          <i-form-item label="其他费用" prop="otherFee">
            <i-input v-model="quoteForm.otherFee"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12" :push="1">
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
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { DataGrid, DataGridItem } from "vue-fintech-component";
import { CarService } from "~/services/manage-service/car.service";
import { Form } from "iview";
import { Dependencies } from "~/core/decorator";
import { Emit } from "vue-property-decorator";
import { CarQuotationService } from "~/services/manage-service/car-quotation.service";
import { ProductPackageService } from "~/services/manage-service/product-package.service";

@Component({
  components: {
    DataGrid,
    DataGridItem
  }
})
export default class AddPeriods extends Vue {
  @Dependencies(CarService) private carService: CarService;
  @Dependencies(ProductPackageService)
  private productPackageService: ProductPackageService;
  @Dependencies(CarQuotationService)
  private carQuotationService: CarQuotationService;
  private quoteForm: any = {
    quotationName: "",
    carBrandId: "",
    carId: "",
    carSeriesName: "",
    carColor: "",
    marketGuidingPrice: "",
    monthPay: "",
    dealerGuidingPrice: "",
    purchaseTaxMoney: "",
    firstPayment: "",
    roadBridgeFee: "",
    financeAmount: "",
    annualAmount: "",
    periods: "",
    gpsFee: "",
    otherFee: "",
    status: 0,
    productPackageId: ""
  };
  private allProdPackage: Array<any> = [];
  private brandList: any = []; // 品牌
  private SeriesList: any = []; // 系列
  private carList: any = []; // 型号
  private rulesQuote: any = {
    quotationName: [
      {
        required: true,
        message: "请输入经销商",
        trigger: "blur"
      }
    ],
    productPackageId: [
      {
        required: true,
        message: "请输入产品包",
        trigger: "change",
        type: "number"
      }
    ],
    carBrandId: [
      {
        required: true,
        message: "请输入品牌",
        trigger: "change",
        type: "number"
      }
    ],
    carId: [
      {
        required: true,
        message: "请输入车型",
        trigger: "change",
        type: "number"
      }
    ],
    carSeriesName: [
      {
        required: true,
        message: "请输入车系",
        trigger: "change",
        type: "number"
      }
    ],
    carColor: [
      {
        required: true,
        message: "请输入颜色",
        trigger: "blur"
      }
    ],
    marketGuidingPrice: [
      {
        required: true,
        message: "请输入市场指导价",
        trigger: "blur"
      }
    ],
    monthPay: [
      {
        required: true,
        message: "请输入租金",
        trigger: "blur"
      }
    ],
    dealerGuidingPrice: [
      {
        required: true,
        message: "请输入经销商报价",
        trigger: "blur"
      }
    ],
    purchaseTaxMoney: [
      {
        required: true,
        message: "请输入购置税",
        trigger: "blur"
      }
    ],
    firstPayment: [
      {
        required: true,
        message: "请输入首期金额",
        trigger: "blur"
      }
    ],
    roadBridgeFee: [
      {
        required: true,
        message: "请输入路桥费",
        trigger: "blur"
      }
    ],
    financeAmount: [
      {
        required: true,
        message: "请输入融资金额",
        trigger: "blur"
      }
    ],
    annualAmount: [
      {
        required: true,
        message: "请输入保险费",
        trigger: "blur"
      }
    ],
    periods: [
      {
        required: true,
        message: "请输入融资期数",
        trigger: "blur"
      }
    ],
    gpsFee: [
      {
        required: true,
        message: "请输入GPS费",
        trigger: "blur"
      }
    ],
    status: [
      {
        required: true,
        message: "请选择是否启用",
        trigger: "change",
        type: "number"
      }
    ]
  };
  private check: Boolean = true;

  @Emit("seachBusiness")
  seachBusiness() {}

  created() {
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
      },
      ({ msg }) => {
        this.$Message.error(msg);
      }
    );
  }
  rulesFun() {
    let form: any = this.$refs["quoteForm"];
    form.validate(valid => {
      if (!valid) {
        return false;
      } else {
        //   this.check === true ? (this.quoteForm.status = 0) : (this.quoteForm.status = 1);
        this.carQuotationService
          .createCarQuotation(this.quoteForm)
          .subscribe(val => {
            this.$Message.success("新增成功！");
            this.$emit("close");
            this.seachBusiness();
          });
      }
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
  /**
   * 清空表单
   */
  resetForm() {
    let _addQuoteForm: any = this.$refs["quoteForm"];
    _addQuoteForm.resetFields();
  }
}
</script>
<style lang="less">
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
