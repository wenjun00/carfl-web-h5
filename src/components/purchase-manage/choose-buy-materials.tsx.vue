<!--选购材料-->
<template>
  <section class="component choose-buy-materials">
    <!-- 选购信息表单-start -->
    <i-card title="选购信息">
      <i-form ref="choose-form" :rules="chooseRules" :model="chooseModel" :label-width="150" label-position="right">
        <i-row>
          <i-col span="12">
            <i-form-item label="申请省份" prop="province">
              <i-select placeholder="选择省" v-model="chooseModel.province" clearable>
                <i-option v-for="{value,label} in this.$city.getCityData({ level : 1 })" :key="value" :label="label" :value="value"></i-option>
              </i-select>
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item label="申请城市" prop="city">
              <i-select :disabled="!chooseModel.province" v-model="chooseModel.city" placeholder="选择市" clearable>
                <i-option v-for="{value,label} in this.chooseModel.province ? this.$city.getCityData({ level: 1, id: this.chooseModel.province }) : []" :key="value" :label="label" :value="value"></i-option>
              </i-select>
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item label="所属公司" prop="companyId">
              <i-select v-model="chooseModel.companyId" clearable>
                <i-option v-for="item in companyList" :key="item.id" :value="item.id" :label="item.companyChinaname"></i-option>
                <i-option v-if="companyList.length===0" value="" readonly>暂无数据</i-option>
              </i-select>
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item label="自缴费用" prop="orderService">
              <i-checkbox-group v-model="chooseModel.orderService">
                <i-checkbox :label="368" :disabled="chooseModel.orderService.length>0&&!chooseModel.orderService.includes(368)">无</i-checkbox>
                <i-checkbox :label="369" :disabled="chooseModel.orderService.includes(368)">购置税</i-checkbox>
                <i-checkbox :label="370" :disabled="chooseModel.orderService.includes(368)">保险费</i-checkbox>
                <i-checkbox :label="371" :disabled="chooseModel.orderService.includes(368)">上牌费</i-checkbox>
                <i-checkbox :label="372" :disabled="chooseModel.orderService.includes(368)">路桥费</i-checkbox>
                <i-checkbox :label="373" :disabled="chooseModel.orderService.includes(368)">首期租金</i-checkbox>
              </i-checkbox-group>
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item label="融资租赁用途" prop="financingUse">
              <i-input type="text" v-model="chooseModel.financingUse">
              </i-input>
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item label="意向融资金额（元）" prop="intentionFinancingAmount">
              <i-input-number v-model="chooseModel.intentionFinancingAmount" :formatter="$filter.moneyFormat" :parser="$filter.moneyParse"> </i-input-number>
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item label="意向期限(期)" prop="intentionPeriods">
              <i-select v-model="chooseModel.intentionPeriods">
                <i-option v-for="{value,label} in $dict.getDictData('0435')" :key="value" :label="label" :value="value"></i-option>
              </i-select>
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item label="意向月供(元)" prop="rentPayable">
              <i-input-number v-model="chooseModel.rentPayable" :formatter="$filter.moneyFormat" :parser="$filter.moneyParse"> </i-input-number>
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item label="意向首付比例(%)" prop="intentionPaymentRatio">
              <input-number :max="100" :min="0" v-model="chooseModel.intentionPaymentRatio" :formatter="value => `${value}%`" :parser="value => value.replace('%', '')"></input-number>
            </i-form-item>
          </i-col>
        </i-row>
      </i-form>
    </i-card>
    <!--选购信息表单-end-->

    <!--车辆选购列表-start-->
    <i-card title="车辆列表" class="car-container">
      <div slot="extra">
        <i-button icon="plus" @click="onAddCar" type="text">添加车辆</i-button>
      </div>
      <i-table class="car-table" :columns="carColumns" :data="carDataSet" stripe></i-table>
      <div class="car-static row between-span">
        <div class="car-total-price">
          <span class="label">总价</span>
          <span class="price">￥ {{totalPrice|toThousands}}</span>
        </div>
      </div>
    </i-card>
    <!--车辆选购列表-end-->

    <!--产品信息-start-->
    <i-card title="产品信息" class="product-container">
      <div slot="extra">
        <i-button v-show="currentProduct.productIssueId&&!productAmountModel" @click="onSetProductAmount" type="text">计算费用</i-button>
        <i-button icon="plus" v-show="totalPrice>0" @click="onOpenProductList" type="text">{{currentProduct.productIssueId?"更改产品":"选择产品"}}</i-button>
      </div>
      <i-form v-show="currentProduct.productIssueId" ref="product-form" :rules="productRules" :model="productModel" :label-width="150">
        <i-row>
          <i-col span="12">
            <i-form-item label="产品系列">
              <span class="product-color">{{currentProduct.seriesName}}</span>
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item label="产品名称">
              <span class="product-color">{{currentProduct.productName}}</span>
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item label="产品期数(期)">
              <span class="product-color">{{$dict.getDictName(currentProduct.periods)}}</span>
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item label="产品利率" prop="productRate">
              <span class="product-color">{{currentProduct.productRate}}</span>
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item label="还款方式" prop="payWay">
              <span class="product-color">{{this.$dict.getDictName(currentProduct.payWay)}}</span>
            </i-form-item>
          </i-col>
        </i-row>

        <i-row>
          <i-col span="12">
            <i-form-item label="车辆参考总价(元)" prop="vehicleAmount">
              <i-input-number :disabled="!carDataSet.length||!totalPrice" v-model="productModel.vehicleAmount" :formatter="$filter.moneyFormatter" :parser="$filter.moneyParser" @on-change="onVehicleAmountChange" />
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-row :gutter="24">
              <i-col span="12">
                <i-form-item label="首付金额(元)" prop="Payment">
                  <i-select :disabled="!currentProduct.initialPayment" class="payment-amount-select" placeholder="请选择首付金额比例" v-model="productRadioModel.paymentScale" @on-change="onInitialPaymentChange">
                    <i-option v-for="item in currentProduct.initialPaymentList" :key="item.value" :value="item.value" :label="item.label"></i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <i-col span="12">
                <i-form-item prop="initialPayment" :label-width="50">
                  <i-input-number :disabled="!currentProduct.initialPayment" v-model="productModel.initialPayment" :formatter="$filter.moneyFormatter" :parser="$filter.moneyParser" readonly/>
                </i-form-item>
              </i-col>
            </i-row>
          </i-col>
          <i-col span="12">
            <i-form-item label="尾付本金(元)" prop="finalPayment">
              <i-input-number :disabled="!productModel.vehicleAmount" v-model="productModel.finalPayment" :formatter="$filter.moneyFormatter" :parser="$filter.moneyParser" @on-change="onFinalPaymentChange" />
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-row :gutter="24">
              <i-col span="12">
                <i-form-item label="尾付总额(元)" prop="final">
                  <i-select :disabled="!currentProduct.finalCash" placeholder="请选择尾付总额比例" v-model="productRadioModel.final">
                    <i-option v-for="item in currentProduct.finalCashList" :key="item.value" :value="item.value" :label="item.label"></i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <i-col span="12">
                <i-form-item prop="finalCash" :label-width="50">
                  <i-input-number :disabled="!currentProduct.finalCash" v-model="productModel.finalCash" :formatter="$filter.moneyFormatter" :parser="$filter.moneyParser" readonly/>
                </i-form-item>
              </i-col>
            </i-row>
          </i-col>
        </i-row>
        <i-row v-show="productAmountModel">
          <i-col span="12">
            <i-form-item label="月供金额(元)" prop="monthlySupply">
              <i-input-number v-model="productModel.monthlySupply" :formatter="$filter.moneyFormatter" :parser="$filter.moneyParser" readonly/>
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-row :gutter="24">
              <i-col span="12">
                <i-form-item label="保证金金额(元)">
                  <i-select :disabled="!currentProduct.depositCash" placeholder="请选择保证金金额比例" v-model="productRadioModel.depositCashRadio">
                    <i-option v-for="item in currentProduct.depositCashList" :key="item.value" :value="item.value" :label="item.label"></i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <i-col span="12">
                <i-form-item prop="depositCash" :label-width="50">
                  <i-input-number :disabled="!currentProduct.depositCash" v-model="productModel.depositCash" :formatter="$filter.moneyFormatter" :parser="$filter.moneyParser" readonly/>
                </i-form-item>
              </i-col>
            </i-row>
          </i-col>
          <i-col span="12">
            <i-row :gutter="24">
              <i-col span="12">
                <i-form-item label="管理费(元)" prop="manageData">
                  <i-select :disabled="!currentProduct.manageCost" placeholder="请选择管理费比例" v-model="productRadioModel.manageCostPercent">
                    <i-option v-for="item in currentProduct.manageCostList" :key="item.value" :value="item.value" :label="item.label"></i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <i-col span="12">
                <i-form-item prop="manageCost" :label-width="50">
                  <i-input-number :disabled="!currentProduct.manageCost" v-model="productModel.manageCost" :formatter="$filter.moneyFormatter" :parser="$filter.moneyParser" readonly/>
                </i-form-item>
              </i-col>
            </i-row>
          </i-col>
          <i-col span="12">
            <i-form-item label="保险费(元)" prop="insuranceExpenses">
              <i-input-number v-model="productModel.insuranceExpenses" :formatter="$filter.moneyFormatter" :parser="$filter.moneyParser" />
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item label="购置税(元)" prop="purchaseTax">
              <i-input-number v-model="productModel.purchaseTax" :formatter="$filter.moneyFormatter" :parser="$filter.moneyParser" />
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item label="上牌费(元)" prop="installLicenseFee">
              <i-input-number v-model="productModel.installLicenseFee" :formatter="$filter.moneyFormatter" :parser="$filter.moneyParser" />
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item label="GPS费(元)" prop="gpsFee">
              <i-input-number v-model="productModel.gpsFee" :formatter="$filter.moneyFormatter" :parser="$filter.moneyParser" />
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item label="其他费用(元)" prop="otherFee">
              <i-input-number v-model="productModel.otherFee" :formatter="$filter.moneyFormatter" :parser="$filter.moneyParser" />
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item label="备注" prop="remark">
              <i-input type="text" v-model="productModel.remark"></i-input>
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item label="融资总额(元)" prop="financingAmount">
              <i-input-number v-model="productModel.financingAmount" :formatter="$filter.moneyFormatter" :parser="$filter.moneyParser" readonly/>
            </i-form-item>
          </i-col>
        </i-row>
      </i-form>
      <div v-show="!currentProduct.productIssueId" class="empty-text row center-span middle-span">
        请选择对应产品
      </div>
    </i-card>
    <!--产品信息-end-->
  </section>
</template>

<script lang="tsx">
import Vue from "vue";
import Component from "vue-class-component";
import { State, Mutation, namespace } from "vuex-class";
import { ProductOrderService } from "~/services/manage-service/product-order.service";
import { Dependencies } from "~/core/decorator";
import AddCar from "~/components/purchase-manage/add-car.tsx.vue";
import SvgIcon from "~/components/common/svg-icon.vue";
import DataBox from "~/components/common/data-box.vue";
import ProductList from "~/components/purchase-manage/product-list.tsx.vue";
import { CompanyService } from "~/services/manage-service/company.service";
import { Prop, Emit, Watch } from "vue-property-decorator";
import { FilterService } from "~/utils/filter.service";
import { Input, Button, InputNumber, Form } from "iview";
import { OrderService } from "~/services/business-service/order.service";

const ModuleMutation = namespace("purchase", Mutation);

@Component({
  components: {
    AddCar,
    ProductList
  },
  filters: {
    convertRadio(value) {
      return value ? value.split(";") : [];
    }
  }
})
export default class ChooseBuyMaterials extends Vue {
  @Dependencies(CompanyService) private companyService: CompanyService;
  @Dependencies(ProductOrderService)
  private productOrderService: ProductOrderService;

  @ModuleMutation("updateProductId") updateProductId;

  private companyList: any = []; // 公司信息
  private totalPrice: number = 0;
  public carDataSet: any = [];

  // 选购信息数据
  public chooseModel: any = {
    province: "", // 省份
    city: "", // 城市
    companyId: "", // 公司ID
    orderService: [], // 订单自缴费用服务
    financingUse: "", // 融资用途
    intentionFinancingAmount: null, // 意向融资金额
    intentionPeriods: "", // 意向期限
    rentPayable: null, // 意向月供-租金支付
    intentionPaymentRatio: null //  意向首付比例
  };

  // 产品信息
  public productModel: any = {
    vehicleAmount: null, // 车辆参考总价
    finalPayment: null, // 尾付本金
    initialPayment: null, // 首付金额
    monthlySupply: null, // 月供金额
    depositCash: null, // 保证金金额
    finalCash: null, // 尾付总额
    manageCost: null, // 管理费
    insuranceExpenses: 0, // 保险费
    purchaseTax: 0, // 购置税
    installLicenseFee: 0, // 上牌税
    gpsFee: 0, // gps费用
    otherFee: 0, // 其他费用
    remark: "", // 备注
    financingAmount: null // 融资总额
  };

  // 产品金额比例
  public productRadioModel = {
    depositCashRadio: "", // 保证金
    final: "", // 尾付金额
    paymentScale: "", // 首付款
    manageCostPercent: "" // 管理费
  };

  // 当前选择产品
  public currentProduct: any = {
    productIssueId: "",
    productId: "",
    seriesId: "",
    seriesName: "", // 产品系列
    productName: "", // 产品名称
    periods: "", // 产品期数
    productRate: "", // 产品利率
    payWay: "" // 还款方式
  };

  private productAmountModel: any = null;

  // 选购数据校验
  private chooseRules: any = {
    intentionPeriods: [
      {
        type: "number",
        required: true,
        message: "请输入意向期限",
        trigger: "change"
      }
    ],
    province: [
      {
        type: "number",
        required: true,
        message: "请选择申请省份",
        trigger: "change"
      }
    ],
    city: [
      {
        type: "number",
        required: true,
        message: "请选择申请城市",
        trigger: "change"
      }
    ],
    orderService: [
      {
        required: true,
        message: "请选择自缴费用",
        trigger: "change",
        type: "array"
      }
    ],
    financingUse: [
      {
        required: true,
        message: "请输入融资租赁用途",
        trigger: "blur"
      }
    ],
    intentionPaymentRatio: [
      {
        type: "number",
        required: true,
        message: "请输入意向首付比例",
        trigger: "change"
      }
    ],
    intentionFinancingAmount: [
      {
        type: "number",
        required: true,
        message: "请输入意向融资金额",
        trigger: "change"
      }
    ]
  };

  // 产品校验规则
  private productRules: any = {
    vehicleAmount: [
      {
        type: "number",
        message: "请输入车辆参考总价",
        trigger: "blur"
      }
    ],
    initialPayment: [
      {
        validator: this.validateInitialPayment
      }
    ],
    finalCash: [
      {
        validator: this.validateFinalCash
      }
    ],
    manageCost: [
      {
        validator: this.validateManageCost
      }
    ],
    depositCash: [
      {
        validator: this.validateDepositCash
      }
    ]
  };

  // 自定义校验规则
  customRules = {
    chooseForm: [
      {
        validator: this.$validator.formValidate,
        message: "选购信息填写错误"
      }
    ],
    carListCount: [
      {
        type: "number",
        min: 1,
        message: "请添加车辆"
      }
    ],
    totalPrice: [
      {
        type: "number",
        min: 1,
        message: "请填写车辆价格"
      }
    ],
    productIssueId: [
      {
        required: true,
        message: "请选择对应产品"
      }
    ],
    productForm: [
      {
        validator: this.$validator.formValidate
      }
    ]
  };

  private carColumns = [
    {
      title: "操作",
      align: "center",
      width: 180,
      render: (h, { row, index }) => {
        return (
          <div>
            <i-button
              type="text"
              style="color:#265EA2"
              onClick={() => this.onDeleteCar(index)}
            >
              删除
            </i-button>
          </div>
        );
      }
    },
    {
      title: "车辆品牌",
      key: "brandName",
      align: "center"
    },
    {
      title: "车辆型号",
      key: "modelName",
      align: "center"
    },
    {
      title: "车身颜色",
      key: "vehicleColour",
      align: "center"
    },
    {
      title: "车辆排量",
      key: "vehicleEmissions",
      align: "center"
    },
    {
      title: "单价(元)",
      key: "carAmount",
      align: "center",
      render: (h, { row, column, index }) => {
        let amount = row.carAmount || 0;
        return (
          <i-input-number
            value={amount}
            placeholder="请先填写车辆单价"
            formatter={value => this.$filter.moneyFormat(value)}
            onOn-change={value => (amount = value)}
            parser={value => this.$filter.moneyParse(value)}
            onOn-blur={() => this.onCarAmountChange(index, amount)}
            min={0}
          />
        );
      }
    },
    {
      title: "车辆配置",
      key: "vehicleConfiguration",
      align: "center"
    },
    {
      title: "上牌地区",
      key: "registrationArea",
      align: "center"
    },
    {
      title: "车辆牌照",
      key: "vehicleLicence",
      align: "center"
    },
    {
      title: "所在门店",
      key: "store",
      align: "center"
    },
    {
      title: "状态",
      key: "status",
      align: "center",
      render: (h, { row, column, index }) => {
        return h("span", {}, this.$dict.getDictName(row.status));
      }
    }
  ];

  private validateInitialPayment(rule, value, callback) {
    if (
      this.currentProduct.initialPaymentList.length &&
      this.productModel.initialPayment === null
    ) {
      callback(new Error("请输入首付金额"));
    }
    callback();
  }

  private validateFinalCash(rule, value, callback) {
    if (
      this.currentProduct.finalCashList.length &&
      this.productModel.finalCash === null
    ) {
      callback(new Error("请输入尾付总额"));
    }
    callback();
  }

  private validateManageCost(rule, value, callback) {
    if (
      this.currentProduct.manageCostList.length &&
      this.productModel.manageCost === null
    ) {
      callback(new Error("请输入管理费"));
    }
    callback();
  }

  private validateDepositCash(rule, value, callback) {
    if (
      this.currentProduct.depositCashList.length &&
      this.productModel.depositCash === null
    ) {
      callback(new Error("请输入保证金金额"));
    }
    callback();
  }

  onInitialPaymentChange() {

  }

  /**
   * 更新车辆金额
   */
  onCarAmountChange(index, amount) {
    if (this.carDataSet.length > index) {
      let car = this.carDataSet[index];
      car.carAmount = amount;
    }
  }

  /**
   * 设置产品基础金额
   */
  onSetProductAmount() {
    // 车辆参考价（可以修改） - 首付款 - 尾付本金
    if (
      this.productModel.vehicleAmount <
      this.productModel.initialPayment + this.productModel.finalCash
    ) {
      this.$Message.error("车辆参考总价需大于首付金额+尾付本金");
      return;
    }

    // 存储基本参数模型
    this.productAmountModel = {
      vehicleAmount: this.productModel.vehicleAmount,
      initialPayment: this.productModel.initialPayment,
      finalCash: this.productModel.finalCash
    };

    // 根据基础参数计算金额
    this.getProductAllAmount();
  }

  /**
   * 获取产品全部金额
   */
  getProductAllAmount() {
    //  融资总额  = 车辆参考价 - 首付款 -尾付本金
    this.productModel.financingAmount =
      this.productModel.vehicleAmount -
      this.productModel.initialPayment -
      this.productModel.finalPayment;

    // 月供金额 = 融资总额x (1+月利率x期数)/期数
    this.productModel.monthlySupply =
      this.productModel.financingAmount *
      ((1 +
        this.currentProduct.productRate * this.currentProduct.periodNumber) /
        this.currentProduct.periodNumber);
  }

  /**
   * 检测车辆信息更新
   */
  @Watch("carDataSet", { immediate: true, deep: true })
  onCarDataSetChange(value) {
    if (this.carDataSet && this.carDataSet.length) {
      this.totalPrice = this.carDataSet
        .map(x => x.carAmount | 0)
        .reduce((a, b) => a + b);
    } else {
      this.totalPrice = 0;
    }
  }

  /**
   * 更新金额
   */
  @Watch("totalPrice")
  onTotalProce(value) {
    this.productModel.vehicleAmount = value;
  }

  @Watch("productRadioModel", { immediate: true, deep: true })
  onProductRadioModelChange() {
    // 首付款=车辆参考价x首付比例
    this.productModel.initialPayment = this.$filter.safeNumber(
      this.productModel.vehicleAmount *
        parseFloat(this.productRadioModel.paymentScale)
    );

    // 保证金金额 = 融资总额x保证金比例
    this.productModel.depositCash = this.$filter.safeNumber(
      this.productModel.financingAmount *
        parseFloat(this.productRadioModel.depositCashRadio)
    );

    // 管理费金额 = 融资总额x管理费比例
    this.productModel.manageCost = this.$filter.safeNumber(
      this.productModel.financingAmount *
        parseFloat(this.productRadioModel.manageCostPercent)
    );

    // 尾付利息=尾款本金x尾付月利率x期数
    this.productModel.finalCash = this.$filter.safeNumber(
      this.productModel.finalPayment +
        this.productModel.finalPayment *
          parseFloat(this.productRadioModel.final) *
          this.currentProduct.periodNumber
    );
  }

  /**
   * 参考总价更新
   * 1.手动更新
   * 2.更新车辆数据
   */
  onVehicleAmountChange() {
    // TODO: 参考总价改变重置金额信息
    this.productModel.initialPayment = null;
    this.productModel.finalCash = null;
    this.productModel.finalPayment = null;

    this.productRadioModel.paymentScale = null;
    this.productRadioModel.final = null;

    this.productAmountModel = null;
  }

  /**
   * 尾款本金改变重新计算金额
   */
  onFinalPaymentChange() {
    this.onProductRadioModelChange();
    this.getProductAllAmount();
  }

  /**
   * 添加车辆处理
   */
  onAddCar() {
    let dialog = this.$dialog.show({
      title: "添加车辆",
      footer: true,
      onOk: addCar => {
        let currentSelection = addCar.getCurrentSelection();

        if (currentSelection && currentSelection.length) {
          this.carDataSet.push(
            ...currentSelection.map(x => {
              x.vehicleId = x.id;
              x.vehicleColour = x.carColour;
              x.vehicleEmissions = x.carEmissions;
              return x;
            })
          );
        }
      },
      onCancel: () => {},
      render: h => {
        return h(AddCar, {});
      }
    });
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

    product.depositCashList = formatRadio(product.depositCash); // 预付金额
    product.finalCashList = formatRadio(product.finalCash); // 尾付金额
    product.initialPaymentList = formatRadio(product.initialPayment); // 首付款
    product.manageCostList = formatRadio(product.manageCost); // 管理费
    product.periodNumber = parseInt(this.$dict.getDictName(product.periods));

    return product;
  }

  /**
   * 打开产品列表
   */
  onOpenProductList() {
    let dialog = this.$dialog.show({
      title: "选择产品",
      footer: true,
      onOk: productList => {
        let currentRow = productList.getCurrentRow();

        if (currentRow) {
          // 转换数据产品信息数据格式
          this.currentProduct = this.formatProductModal(currentRow);
          this.currentProduct.productIssueId = currentRow.id;
          this.updateProductId(currentRow.productId);
          this.onVehicleAmountChange();
        } else {
          this.$Message.error("请选择对应的产品");
          return false;
        }
      },
      onCancel: () => {},
      render: h => {
        return h(ProductList, {});
      }
    });
  }

  /**
   * 获取公司名称
   */
  getCompanyList() {
    // 获取公司名称
    this.companyService.getAllCompany().subscribe(val => {
      this.companyList = val;
    });
  }

  /**
   * 验证数据
   */
  async validate() {
    let chooseForm = this.$refs["choose-form"] as Form;
    let productForm = this.$refs["product-form"] as Form;

    // 自定义验证
    return await this.$validator
      .validate(
        {
          chooseForm: this.$refs["choose-form"],
          productIssueId: this.currentProduct.productIssueId,
          carListCount: this.carDataSet.length,
          totalPrice: this.totalPrice,
          productForm: this.$refs["product-form"]
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

  // 重置数据
  public reset() {
    let chooseForm = this.$refs["choose-form"] as Form;
    let productForm = this.$refs["product-form"] as Form;

    chooseForm.resetFields();
    productForm.resetFields();
    this.carDataSet = [];
    this.$common.reset(this.currentProduct);
    this.productAmountModel = {};
    this.updateProductId();
    this.totalPrice = 0;
  }

  // 恢复数据
  public revert(data) {
    this.$common.revert(
      this.chooseModel,
      Object.assign(data, {
        intentionPeriods: Number(data.intentionPeriods),
        orderService: data.orderServices.map(x => x.service)
      })
    );

    this.$common.revert(this.carDataSet, data.orderCars);
    this.$common.revert(this.currentProduct, data, {
      productName: data.product.name,
      productSeries: data.product.name
    });
    this.$common.revert(this.productModel, data);

    // 存储基本参数模型
    this.productAmountModel = {
      vehicleAmount: this.productModel.vehicleAmount,
      initialPayment: this.productModel.initialPayment,
      finalCash: this.productModel.finalCash
    };
  }

  mounted() {
    // 获取公司列表
    this.getCompanyList();
    // 清空产品Id
    this.updateProductId();
  }
}
</script>

<style lang="less" scoped>
.component.choose-buy-materials {
  .car-container {
    .car-static {
      margin-top: 20px;
    }
  }

  .product-container {
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

    padding-bottom: 100px;
  }

  .vehicle-list {
    .vehicle-icon {
      position: relative;
      left: 26px;
      color: #265ea2;
    }
    .vehicle-button {
      margin-left: 10px;
      color: #265ea2;
    }
    .vehicle-price {
      margin-left: 115px;
      font-weight: bold;
    }
    .vehicle-title {
      margin-left: 328px;
      font-weight: bold;
    }
  }

  .hidden {
    visibility: hidden;
  }

  .product-information {
    line-height: 30px;
    margin-top: 20px;
  }
  .add-prdshow {
    .prdshow-icon {
      position: relative;
      left: 26px;
      color: #265ea2;
    }
    .prdshow-button {
      margin-left: 10px;
      color: #265ea2;
    }
  }
  .carTable {
    margin: 10px 0;
  }
}
</style>
<style lang="less">
.component.choose-buy-materials {
  .ivu-select-selection {
    width: 100% !important;
    display: inline-block;
    border-style: none;
    border-bottom-style: solid;
    border-radius: 0;
  }

  .calculate {
    .ivu-modal-footer {
      display: none !important;
    }
  }
}
</style>