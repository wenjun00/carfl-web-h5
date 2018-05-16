<!--抵押申请-->
<template>
  <section class="component mortgage-application">
    <i-card title="申请信息">
      <i-form ref="application-form" :label-width="120" :model="applicationModel" :rules="applicationRules">
        <i-row>
          <i-col :span="12">
            <i-form-item label="申请省份" prop="province">
              <i-select v-model="applicationModel.province">
                <i-option v-for="{value,label} in $city.getCityData({ level : 1 })" :key="value" :value="value" :label="label"></i-option>
              </i-select>
            </i-form-item>
          </i-col>
          <i-col :span="12">
            <i-form-item label="申请城市" prop="city">
              <i-select v-model="applicationModel.city" :disabled="!applicationModel.province">
                <i-option v-for="{value,label} in $city.getCityData({ level : 1, id:applicationModel.province})" :key="value" :value="value" :label="label"></i-option>
              </i-select>
            </i-form-item>
          </i-col>
          <i-col :span="12">
            <i-form-item label="所属公司" prop="company">
              <i-select v-model="applicationModel.company" clearable>
                <i-option v-for="item in companyList" :key="item.id" :value="item.id" :label="item.companyChinaname"></i-option>
              </i-select>
            </i-form-item>
          </i-col>
          <i-col :span="12">
            <i-form-item label="抵押贷款用途" prop="mortgageUse">
              <i-input v-model="applicationModel.mortgageUse"></i-input>
            </i-form-item>
          </i-col>
          <i-col :span="12">
            <i-form-item label="意向贷款金额" prop="intentionAmount">
              <i-input-number :min="0" v-model="applicationModel.intentionAmount"></i-input-number>
            </i-form-item>
          </i-col>
          <i-col :span="12">
            <i-form-item label="意向期限" prop="intentionPeriods">
              <i-select v-model="applicationModel.intentionPeriods">
                <i-option v-for="{value,label} in $dict.getDictData('0435')" :key="value" :label="label" :value="value"></i-option>
              </i-select>
            </i-form-item>
          </i-col>
          <i-col :span="12">
            <i-form-item label="意向抵押方式" prop="intentionMethod">
              <i-select v-model="applicationModel.intentionMethod">
                <i-option v-for="{value,label} in $dict.getDictData('0451')" :key="value" :label="label" :value="value"></i-option>
              </i-select>
            </i-form-item>
          </i-col>
        </i-row>
      </i-form>
    </i-card>

    <i-card title="押品信息">
      <template slot="extra">
        <command-button label="添加押品" icon="plus" @click="showMortgageCarList"></command-button>
      </template>
      <template>
        <i-table :columns="carColumns" :data="carDataSet"></i-table>
        <i-row class="total">
          <i-col :span="6">
            合计数量: {{carDataSet.length}}
          </i-col>
          <i-col :span="6">
            合计金额(元): <b>{{productModel.evaluateAmount|toThousands}}</b>
          </i-col>
        </i-row>
      </template>
    </i-card>

    <i-card title="产品信息">
      <template slot="extra">
        <command-button :label="currentProduct?'更改产品':'添加产品'" icon="plus" @click="onShowProductList"></command-button>
      </template>
      <i-form v-show="currentProduct" ref="product-form" :label-width="120" :model="productModel" :rules="productRules">
        <!--产品信息-->
        <i-row>
          <i-col :span="12">
            <i-form-item label="产品系列">
              <label>{{currentProduct?currentProduct.seriesName:""}}</label>
            </i-form-item>
          </i-col>
          <i-col :span="12">
            <i-form-item label="产品名称">
              <label>{{currentProduct?currentProduct.productName:""}}</label>
            </i-form-item>
          </i-col>
          <i-col :span="12">
            <i-form-item label="产品期数">
              <label>{{currentProduct?currentProduct.periodNumber:""}}</label>
            </i-form-item>
          </i-col>
          <i-col :span="12">
            <i-form-item label="产品利率">
              <label>{{currentProduct?currentProduct.productRate:""}}</label>
            </i-form-item>
          </i-col>
          <i-col :span="12">
            <i-form-item label="还款方式">
              <label>{{currentProduct?this.$dict.getDictName(currentProduct.payWay):""}}</label>
            </i-form-item>
          </i-col>
        </i-row>
        <!--产品输入金额-->
        <i-row>
          <i-col :span="12">
            <i-form-item label="抵押车辆估价(元)">
              <i-input-number readonly v-model="productModel.evaluateAmount" :formatter="this.$filter.moneyFormat" :parser="this.$filter.moneyParse"></i-input-number>
            </i-form-item>
          </i-col>
          <i-col :span="12">
            <i-form-item label="贷款总额(元)" prop="loadAmount">
              <i-input-number v-model="productModel.loadAmount" :formatter="this.$filter.moneyFormat" :parser="this.$filter.moneyParse" @on-change="getComputedAmount"></i-input-number>
            </i-form-item>
          </i-col>
        </i-row>
        <!--产品计算金额-->
        <i-row>
          <i-col :span="12">
            <i-form-item label="月供金额(元)" prop="monthlySupply  ">
              <i-input-number readonly v-model="productModel.monthlySupply" :formatter="this.$filter.moneyFormat" :parser="this.$filter.moneyParse"></i-input-number>
            </i-form-item>
          </i-col>
          <i-col :span="12">
            <i-col :span="12">
              <i-form-item label="管理费(元)" prop="manageRatio">
                <i-select :disabled="!currentProduct||currentProduct.manageRatioList.length===0" v-model="productModel.manageRatio" @on-change="getComputedAmount">
                  <template v-if="currentProduct">
                    <i-option v-for="item in currentProduct.manageRatioList" :key="item.value" :value="item.value" :label="item.label"></i-option>
                  </template>
                </i-select>
              </i-form-item>
            </i-col>
            <i-col :span="12">
              <i-form-item :label-width="50" prop="manageAmount">
                <i-input-number readonly v-model="productModel.manageAmount" :formatter="this.$filter.moneyFormat" :parser="this.$filter.moneyParse"></i-input-number>
              </i-form-item>
            </i-col>
          </i-col>
          <i-col :span="12">
            <i-form-item label="GPS费用(元)" prop="gpsAmount">
              <i-input-number v-model="productModel.gpsAmount" :formatter="this.$filter.moneyFormat" :parser="this.$filter.moneyParse"></i-input-number>
            </i-form-item>
          </i-col>
          <i-col :span="12">
            <i-form-item label="其他费用(元)" prop="otherAmount">
              <i-input-number v-model="productModel.otherAmount" :formatter="this.$filter.moneyFormat" :parser="this.$filter.moneyParse"></i-input-number>
            </i-form-item>
          </i-col>
          <i-col :span="12">
            <i-form-item label="备注" prop="remark">
              <i-input v-model="productModel.remark"></i-input>
            </i-form-item>
          </i-col>
        </i-row>
      </i-form>
      <div v-show="!currentProduct" class="empty-text">
        请选择抵押产品
      </div>
    </i-card>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Dependencies } from "~/core/decorator";
import { Watch, Emit, Prop } from "vue-property-decorator";
import { State, Mutation, Action } from "vuex-class";
import MortgageCarList from "~/components/purchase-manage/mortgage/mortgage-car-list.vue";
import ProductList from "~/components/purchase-manage/product-list.tsx.vue";
import { ProductPlanIssueService } from "~/services/manage-service/product-plan-issue.service";
import { Form } from "iview";
@Component({
  components: {}
})
export default class MortgageApplication extends Vue {
  @State companyList;
  @Action getCompanyList;
  @Dependencies(ProductPlanIssueService)
  productPlanIssueService: ProductPlanIssueService;

  @Emit("on-product-change")
  emitProductChange(product) { }
  @Prop() cardNumber; // 身份证号码
  // 车辆押品列表
  public carDataSet: Array<any> = [];

  // 当前产品
  public currentProduct = null;
  // 申请信息数据
  public applicationModel = {
    province: null,
    city: null,
    company: null,
    mortgageUse: null,
    intentionAmount: null,
    intentionPeriods: null,
    intentionMethod: null
  };

  // 当前产品数据
  public productModel = {
    evaluateAmount: 0, // 估价金额
    monthlySupply: 0, // 月供金额
    loadAmount: 0, // 贷款金额
    gpsAmount: 0, // gps金额
    manageRatio: null, // 管理费比例
    manageAmount: 0, // 管理金额
    otherAmount: 0, // 其他金额
    remark: "" // 备注
  };

  // 申请表单验证规则
  private applicationRules = {
    province: [
      {
        type: "number",
        required: true,
        message: "请选择省份",
        trigger: "change"
      }
    ],
    city: [
      {
        type: "number",
        required: true,
        message: "请选择城市",
        trigger: "change"
      }
    ],
    company: [
      {
        type: "number",
        required: true,
        message: "请选择所属公司",
        trigger: "change"
      }
    ],
    mortgageUse: [
      {
        required: true,
        message: "请填写抵押贷款用途",
        trigger: "blur"
      }
    ],
    intentionUse: [
      {
        required: true,
        type: "number",
        message: "请填写意向贷款金额",
        trigger: "change"
      }
    ],
    intentionPeriods: [
      {
        required: true,
        type: "number",
        message: "请填写意向期限",
        trigger: "change"
      }
    ]
  };

  // 产品数据校验
  private productRules: any = {
    loadAmount: [
      {
        required: true,
        type: "number",
        message: "请填写贷款总额",
        trigger: "change"
      },
      {
        min: 1,
        type: "number",
        message: "贷款总额必须大于0",
        trigger: "change"
      }
    ],
    manageRatio: [
      {
        validator: this.validateManageRatio,
        trigger: "change"
      }
    ]
  };

  // 车辆列配置
  private carColumns = [
    {
      title: "操作",
      align: "center",
      width: 80,
      render: (h, { row, index }) => {
        return h("command-button", {
          props: {
            label: "删除"
          },
          on: {
            click: () => {
              this.onDeleteCar(index);
            }
          }
        });
      }
    },
    {
      title: "品牌",
      align: "center",
      minWidth: this.$common.getColumnWidth(4),
      key: "brandName"
    },
    {
      title: "系列",
      align: "center",
      minWidth: this.$common.getColumnWidth(5),
      key: "seriesName"
    },
    {
      title: "型号",
      align: "center",
      minWidth: this.$common.getColumnWidth(4),
      key: "carName"
    },
    {
      title: "车身颜色",
      align: "center",
      minWidth: this.$common.getColumnWidth(4),
      key: "carColor"
    },
    {
      title: "车辆排量",
      align: "center",
      minWidth: this.$common.getColumnWidth(4),
      key: "displacement"
    },
    {
      title: "车辆牌照",
      align: "center",
      minWidth: this.$common.getColumnWidth(4),
      key: "carNo"
    },
    {
      title: '押品单号',
      align: 'center',
      minWidth: this.$common.getColumnWidth(6),
      key: 'assessmentNo'
    },
    {
      title: '车架号',
      align: 'center',
      minWidth: this.$common.getColumnWidth(6),
      key: 'frameNo'
    },
    {
      title: "行驶公里数",
      align: "center",
      key: "mileage",
      minWidth: this.$common.getColumnWidth(4),
    },
    {
      title: "评估价(元)",
      align: "center",
      key: "evaluation",
      minWidth: this.$common.getColumnWidth(4),
      render: (h, { row }) =>
        h("span", this.$filter.toThousands(row.evaluation))
    }
  ];

  // 业务验证规则
  private customRules = {
    applicationForm: [
      {
        validator: this.$validator.formValidate,
        message: "请检查申请信息"
      }
    ],
    carListCount: [
      {
        type: "number",
        min: 1,
        message: "请添加押品车辆"
      }
    ],
    currentProduct: [
      {
        required: true,
        message: "请选择对应产品"
      }
    ],
    productForm: [
      {
        validator: this.$validator.formValidate,
        message: "请检查产品信息"
      }
    ]
  };

  private validateManageRatio(rule, value, callback) {
    if (
      this.currentProduct &&
      this.currentProduct.manageRatioList &&
      this.currentProduct.manageRatioList.length &&
      value === null
    ) {
      return callback(new Error("选择管理费比例"));
    }
    callback();
  }

  /**
   * 删除车辆
   */
  onDeleteCar(index) {
    this.$Modal.confirm({
      title: "提示",
      content: "确定删除吗？",
      onOk: () => {
        this.carDataSet.splice(index, 1);
      }
    });
  }

  /**
   * 显示质押车辆列表
   */
  private showMortgageCarList() {
    if (!this.cardNumber) {
      this.$Message.info("请输入证件号码后添加押品");
      return
    }

    if (!this.$validator.regex.idCard.test(this.cardNumber)) {
      this.$Message.info("请输入正确的证件号码");
      return
    }

    let dialog = this.$dialog.show({
      title: "押品列表",
      footer: true,
      width: 1200,
      size: 'large',
      onOk: mortgageCarList => {
        let currentSelection = mortgageCarList.getCurrentSelection();
        if (!currentSelection || currentSelection.length === 0) {
          this.$Message.error("请选择待添加的押品");
          return false;
        }
        if (this.carDataSet.length === 0) {
          this.carDataSet = [...this.carDataSet, ...currentSelection];
        } else if (this.carDataSet.map(v => v.assessmentId).forEach((v) => { return v }) === currentSelection.map(v => v.assessmentId).forEach((m) => { return m })) {
          this.$Message.error("该押品已经添加！");
          return false;
        }
      },
      render: h => {
        return h(MortgageCarList, {
          props: {
            cardNumber: this.cardNumber
          }
        });
      }
    });
  }

  /**
   * 格式化产品数据
   */
  formatProductModal(product) {
    let formatRadio = x => {
      if (!x) return [];

      return x.split(";").map(item => ({
        label: `${item}%`,
        value: item / 100
      }));
    };

    product.manageRatioList = formatRadio(product.manageCost); // 管理费
    product.periodNumber = parseInt(this.$dict.getDictName(product.periods)); // 管理费

    return product;
  }

  /**
   * 显示产品列表
   */
  onShowProductList() {
    let dialog = this.$dialog.show({
      title: "选择产品",
      footer: true,
      width: 1000,
      onOk: productList => {
        let currentRow = productList.getCurrentRow();

        if (currentRow) {
          // 转换数据产品信息数据格式
          this.currentProduct = this.formatProductModal(currentRow);
          this.currentProduct.productIssueId = currentRow.id;
          // 更新当前产品
          this.emitProductChange(this.currentProduct);
        } else {
          this.$Message.error("请选择对应的产品");
          return false;
        }
      },
      onCancel: () => { },
      render: h => {
        return h(ProductList, {});
      }
    });
  }

  @Watch("carDataSet")
  onCarDataSetChange() {
    this.productModel.evaluateAmount = this.carDataSet
      .map(x => x.evaluation)
      .reduce((x, y) => x + y, 0);

  }

  /**
   * 获取计算金额
   */
  getComputedAmount() {
    if (!this.currentProduct) {
      return
    }

    // 管理费 = 贷款总额x管理费比例
    this.productModel.manageAmount =
      this.productModel.loadAmount * (this.productModel.manageRatio || 0);

    // 月供金额 = 贷款总额x (1+月利率x期数)/期数
    this.productModel.monthlySupply =
      this.productModel.loadAmount *
      (1 + this.currentProduct.productRate * this.currentProduct.periodNumber) /
      this.currentProduct.periodNumber;
  }

  /**
   * 验证数据
   */
  async validate() {
    let applicationForm = this.$refs["application-form"] as Form;
    let productForm = this.$refs["product-form"] as Form;

    // 自定义验证
    return await this.$validator
      .validate(
        {
          applicationForm,
          carListCount: this.carDataSet.length,
          currentProduct: this.currentProduct,
          productForm
        },
        this.customRules
      )
      .then(error => {
        if (!error) {
          return true;
        }

        this.$Message.error(error);
      });
  }

  /**
   * 获取产品期数信息
   */
  async getProductIssisDetail(id) {
    return new Promise((reslove, reject) => {
      this.productPlanIssueService.findProductPlanById(id).subscribe(
        data => {
          let product = this.formatProductModal(data);
          product.productIssueId = data.id;
          // 更新当前产品
          this.emitProductChange(product);
          reslove(product);
        },
        () => {
          reject();
        }
      );
    });
  }

  /**
   * 返回数据格式化
   */
  async revert(data) {
    // 申请信息
    this.applicationModel = {
      province: data.province,
      city: data.city,
      company: data.companyId,
      mortgageUse: data.financingUse,
      intentionAmount: data.intentionFinancingAmount,
      intentionPeriods: data.intentionPeriods,
      intentionMethod: data.intentionMethod
    };

    // 获取产品信息
    this.currentProduct = await this.getProductIssisDetail(data.productIssueId);

    // 茶品数据
    this.productModel.loadAmount = data.financingAmount;
    this.productModel.gpsAmount = data.gpsFee;
    this.productModel.manageRatio = data.manageCostPercent;
    this.productModel.manageAmount = data.manageCost;
    this.productModel.otherAmount = data.otherFee;
    this.productModel.remark = data.remark;

    this.carDataSet = data.orderCars.map(v => {
      return {
        brandName: v.brandName,
        seriesName: v.serisesName,
        carColor: v.carColor,
        displacement: v.carEmissions,
        carNo: v.carLicence,
        assessmentNo: v.carNumber,
        frameNo: v.frameNo,
        mileage: v.mileage,
        evaluation: v.carAmount,
        carName: v.modelName,
        assessmentId: v.assessmentId,
        id: v.id
      }
    })

    // 计算金额
    this.getComputedAmount();
  }

  /**
   * 重置数据
   * 1 重置申请表单
   * 2 重置产品表单
   * 3 清空当前产品
   * 4 清空车辆数据
   */
  reset() {
    // 申请信息表单
    let applicationForm = this.$refs["application-form"] as Form;
    // 产品表单
    let productForm = this.$refs["product-form"] as Form;

    // step1 - 重置申请表单
    applicationForm.resetFields();
    // step2 - 重置产品表单
    productForm.resetFields();
    // step3 - 清空当前产品
    this.carDataSet = [];
    // step3 - 清空车辆数据
    this.currentProduct = null

    // 通知当前产品变更，清空上传素材，素材种类列表
    this.emitProductChange(null);
  }

  mounted() {
    this.getCompanyList();
  }
}
</script>

<style lang="less" scoped>
.component.mortgage-application {
  .empty-text {
    font-size: 32px;
    color: #ccc;
    font-weight: bold;
    background: #f2f2f2;
    height: 500px;
    text-align: center;
    line-height: 500px;
    letter-spacing: 1px;
    box-shadow: 0px 0px 5px #ccc;
  }
  .total {
    margin-top: 15px;
  }
}
</style>
