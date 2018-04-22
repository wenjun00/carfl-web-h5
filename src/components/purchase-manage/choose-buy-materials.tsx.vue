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
                <i-checkbox :label="368" :disabled="!chooseModel.orderService.includes(368)">无</i-checkbox>
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
        <i-button icon="plus" @click="onOpenProductList" type="text">{{productModel.productIssueId?"更改产品":"选择产品"}}</i-button>
      </div>
      <i-form v-show="productModel.productIssueId" ref="form" :rules="productRules" :model="productModel" :label-width="150">
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
          <i-col span="12">
            <i-form-item label="车辆参考总价(元)" prop="vehicleAmount">
              <i-input-number :disabled="!carDataSet.length||!totalPrice" v-model="productModel.vehicleAmount" :formatter="$filter.moneyFormatter" :parser="$filter.moneyParser" @on-change="onVehicleAmountChange" />
              <!-- <i-input :maxlength="14" type="text" v-model="productModel.vehicleAmount" @on-change="vehicleAmountChange" @on-blur="vehicleAmountBlur">
              </i-input> -->
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item label="尾付本金(元)" prop="finalPayment">
              <i-input-number :disabled="!productModel.vehicleAmount" v-model="productModel.finalPayment" :formatter="$filter.moneyFormatter" :parser="$filter.moneyParser" />
              <!-- <i-input  :maxlength="14" type="text" v-model="productModel.finalPayment" @on-change="finalprincipalChange" :readonly="finaldisabled" @on-blur="finalprincipalBlur">
              </i-input> -->
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-row :gutter="24">
              <i-col span="12">
                <i-form-item label="首付金额(元)" prop="Payment">
                  <i-select :disabled="!currentProduct.initialPayment" class="payment-amount-select" placeholder="请选择首付金额比例" v-model="productModel.Payment" clearable @on-change="onInitialPaymentChange">
                    <i-option v-for="item in initialPaymentData" :key="item.key" :value="item.value" :label="item.key"></i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <i-col span="12">
                <i-form-item prop="initialPayment" :label-width="50">
                  <i-input-number :disabled="!productModel.initialPayment" v-model="productModel.initialPayment" :formatter="$filter.moneyFormatter" :parser="$filter.moneyParser" readonly/>
                </i-form-item>
              </i-col>
            </i-row>
          </i-col>
          <i-col span="12">
            <i-form-item label="月供金额(元)" prop="monthlySupply">
              <i-input-number v-model="productModel.monthlySupply" :formatter="$filter.moneyFormatter" :parser="$filter.moneyParser" readonly/>

            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-row :gutter="24">
              <i-col span="12">
                <i-form-item label="保证金金额(元)" prop="deposit">
                  <i-select :disabled="!productModel.depositCash" placeholder="请选择保证金金额比例" v-model="productModel.deposit" clearable>
                    <i-option v-for="item in depositCashData" :key="item.key" :value="item.value" :label="item.key"></i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <i-col span="12">
                <i-form-item prop="depositCash" :label-width="50">
                  <i-input-number :disabled="!productModel.depositCash" v-model="productModel.finalPayment" :formatter="$filter.moneyFormatter" :parser="$filter.moneyParser" readonly/>
                </i-form-item>
              </i-col>
            </i-row>
          </i-col>
          <i-col span="12">
            <i-row :gutter="24">
              <i-col span="12">
                <i-form-item label="尾付总额(元)" prop="final">
                  <i-select :disabled="!productModel.finalCash" placeholder="请选择尾付总额比例" v-model="productModel.final" clearable >
                    <i-option v-for="item in finalCashData" :key="item.key" :value="item.value" :label="item.key"></i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <i-col span="12">
                <i-form-item prop="finalCash" :label-width="50">
                  <i-input-number :disabled="!productModel.finalCash" v-model="productModel.finalPayment" :formatter="$filter.moneyFormatter" :parser="$filter.moneyParser" readonly/>
                </i-form-item>
              </i-col>
            </i-row>
          </i-col>
          <i-col span="12">
            <i-row :gutter="24">
              <i-col span="12">
                <i-form-item label="管理费(元)" prop="manageData">
                  <i-select :disabled="!productModel.manageCost" placeholder="请选择管理费比例" v-model="productModel.manageData" clearable>
                    <i-option v-for="item in manageCostData" :key="item.key" :value="item.value" :label="item.key"></i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <i-col span="12">
                <i-form-item prop="manageCost" :label-width="50">
                  <i-input-number :disabled="!productModel.manageCost" v-model="productModel.manageCost" :formatter="$filter.moneyFormatter" :parser="$filter.moneyParser" readonly/>
                </i-form-item>
              </i-col>
            </i-row>
          </i-col>
          <i-col span="12">
            <i-form-item label="保险费(元)" prop="insuranceExpenses">
              <i-input-number v-model="productModel.insuranceExpenses" :formatter="$filter.moneyFormatter" :parser="$filter.moneyParser" />
              <!-- <i-input :maxlength="14" type="text" v-model.number="productModel.insuranceExpenses" @on-blur="insuranceMoneyBlur">
              </i-input> -->
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item label="购置税(元)" prop="purchaseTax">
              <i-input-number v-model="productModel.purchaseTax" :formatter="$filter.moneyFormatter" :parser="$filter.moneyParser" />
              <!--               
              <i-input :maxlength="14" type="text" v-model.number="productModel.purchaseTax" @on-blur="purchaseMoneyBlur">
              </i-input> -->
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item label="上牌费(元)" prop="installLicenseFee">
              <i-input-number v-model="productModel.installLicenseFee" :formatter="$filter.moneyFormatter" :parser="$filter.moneyParser" />
              <!-- <i-input :maxlength="14" type="text" v-model.number="productModel.installLicenseFee" @on-blur="licenseMoneyBlur">
              </i-input> -->
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item label="GPS费(元)" prop="gpsFee">
              <i-input-number v-model="productModel.gpsFee" :formatter="$filter.moneyFormatter" :parser="$filter.moneyParser" />
              <!-- <i-input :maxlength="14" type="text" v-model.number="productModel.gpsFee" @on-blur="GpsMoneyBlur">
              </i-input> -->
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item label="其他费用(元)" prop="otherFee">
              <i-input-number v-model="productModel.otherFee" :formatter="$filter.moneyFormatter" :parser="$filter.moneyParser" />
              <!-- <i-input :maxlength="14" type="text" v-model.number="productModel.otherFee" @on-blur="otherFeeBlur">
              </i-input> -->
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
              <!-- <i-input-number v-model="productModel.financingAmount" :formatter="$filter.moneyFormatter" :parser="$filter.moneyParser" readonly/> -->
            </i-form-item>
          </i-col>
        </i-row>
      </i-form>
      <div v-show="!productModel.productIssueId" class="empty-text row center-span middle-span">
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
import { ApplyQueryService } from "~/services/business-service/apply-query.service";
import { Dependencies } from "~/core/decorator";
import AddCar from "~/components/purchase-manage/add-car.tsx.vue";
import SvgIcon from "~/components/common/svg-icon.vue";
import DataBox from "~/components/common/data-box.vue";
import ProductList from "~/components/purchase-manage/product-list.tsx.vue";
import { CompanyService } from "~/services/manage-service/company.service";
import { Prop, Emit, Watch } from "vue-property-decorator";
import { FilterService } from "~/utils/filter.service";
import { Input, Button, InputNumber, Form } from "iview";
const ModuleMutation = namespace("purchase", Mutation);
@Component({
  components: {
    AddCar,
    ProductList
  }
})
export default class ChooseBuyMaterials extends Vue {
  @Dependencies(ApplyQueryService) private applyQueryService: ApplyQueryService;
  @Dependencies(CompanyService) private companyService: CompanyService;
  @ModuleMutation("updateProductId") updateProductId;

  private carData: any = [];
  private editCarModal: Boolean = false;
  private addOrEditFlag: Boolean = false;
  private prdInfoShow: Boolean = false;
  private buttonShow: Boolean = true;
  private addProductModal: Boolean = false;
  private addPrdShow: Boolean = true;
  private changePrdShow: Boolean = false;
  private companyList: any = []; // 公司信息

  private rowData: any = null;
  private depositCashData: any = []; // 保证金
  private finalCashData: any = []; // 尾付金额
  private initialPaymentData: any = []; // 首付款
  private manageCostData: any = []; // 管理费
  private totalPrice: number = 0;
  private DataSet: any = {};
  private depositdisabled: Boolean = false;
  private Paymentdisabled: Boolean = false;
  private finaldisabled: Boolean = false;
  private finalorddisabled: Boolean = false;
  private manageDatadisabled: Boolean = false;
  private addOpen: Boolean = false;
  private flag: Boolean = true;
  private index: any = "";
  public carDataSet: any = [];
  // 选购信息数据
  public chooseModel: any = {
    province: "", // 省份
    city: "", // 城市
    companyId: "", // 公司ID
    orderService: [], // 订单自缴费用服务
    financingUse: "", // 融资用途
    intentionFinancingAmount: 0, // 意向融资金额
    intentionPeriods: 0, // 意向期限
    rentPayable: 0, // 意向月供-租金支付
    intentionPaymentRatio: 0 //  意向首付比例
  };

  // 产品信息
  public productModel: any = {
    vehicleAmount: 0, // 车辆参考总价
    finalPayment: 0, // 尾付本金
    initialPayment: 0, // 首付金额
    monthlySupply: 0, // 月供金额
    depositCash: 0, // 保证金金额
    finalCash: 0, // 尾付总额
    manageCost: 0, // 管理费
    insuranceExpenses: 0, // 保险费
    purchaseTax: 0, // 购置税
    installLicenseFee: 0, // 上牌税
    gpsFee: 0, // gps费用
    otherFee: 0, // 其他费用
    remark: "", // 备注
    financingAmount: 0 // 融资总额
  };

  private currentProduct = {
    seriesName: "", // 产品系列
    productNanme: "", // 产品名称
    periods: "", // 产品期数
    productRate: "", // 产品利率
    payWay: "" // 还款方式
  };

  // 选购数据校验
  private chooseRules: any = {
    intentionPeriods: [
      {
        required: true,
        message: "请输入意向期限",
        trigger: "change",
        type: "number"
      }
    ],
    province: [
      {
        required: true,
        message: "请选择申请省份",
        trigger: "change",
        type: "number"
      }
    ],
    city: [
      {
        required: true,
        message: "请选择申请城市",
        trigger: "change",
        type: "number"
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
        trigger: "blur"
      },
      {
        type: "number",
        message: "请输入数字",
        trigger: "blur"
      }
    ],
    intentionFinancingAmount: [
      {
        type: "number",
        required: true,
        message: "请输入意向融资金额",
        trigger: "blur"
      },
      {
        type: "number",
        message: "请输入数字",
        trigger: "blur"
      }
    ],
    rentPayable: [
      {
        type: "number",
        message: "请输入数字",
        trigger: "blur"
      }
    ]
  };

  // 产品校验规则
  private productRules: any = {
    prdSeriods: [
      {
        required: true,
        message: "请输入产品系列",
        trigger: "blur"
      }
    ],
    name: [
      {
        required: true,
        message: "请输入产品名称",
        trigger: "blur"
      }
    ],
    periods: [
      {
        required: true,
        message: "请输入产品期数",
        trigger: "blur",
        type: "number"
      }
    ],
    productRate: [
      {
        required: true,
        message: "请输入产品利率",
        trigger: "blur",
        type: "number"
      }
    ],
    payWay: [
      {
        required: true,
        message: "请输入还款方式",
        trigger: "blur",
        type: "number"
      }
    ],
    vehicleAmount: [
      {
        required: true,
        message: "请输入车辆参考总价",
        trigger: "blur"
      },
      {
        type: "number",
        message: "请输入数字",
        trigger: "blur"
      }
    ],
    finalPayment: [
      {
        required: true,
        message: "请输入尾付本金",
        trigger: "blur"
      },
      {
        type: "number",
        message: "请输入数字",
        trigger: "blur"
      }
    ],
    financingAmount: [
      {
        required: true,
        message: "请输入融资总额",
        trigger: "blur"
      }
    ],
    initialPayment: [
      {
        required: true,
        message: "请输入首付金额",
        trigger: "blur"
      }
    ],
    depositCash: [
      {
        required: true,
        message: "请输入保证金金额",
        trigger: "blur"
      }
    ],
    finalCash: [
      {
        required: true,
        message: "请输入尾付总额",
        trigger: "blur"
      }
    ],
    manageCost: [
      {
        required: true,
        message: "请输入管理费",
        trigger: "blur"
      }
    ],
    insuranceExpenses: [
      {
        type: "number",
        message: "请输入数字",
        trigger: "blur"
      }
    ],
    purchaseTax: [
      {
        type: "number",
        message: "请输入数字",
        trigger: "blur"
      }
    ],
    monthlySupply: [
      {
        type: "number",
        message: "请输入数字",
        trigger: "blur"
      }
    ],
    installLicenseFee: [
      {
        type: "number",
        message: "请输入数字",
        trigger: "blur"
      }
    ],
    gpsFee: [
      {
        type: "number",
        message: "请输入数字",
        trigger: "blur"
      }
    ],
    otherFee: [
      {
        type: "number",
        message: "请输入数字",
        trigger: "blur"
      }
    ]
  };

  /**
   * 自定义校验规则
   */
  customRules = {};

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
      key: "carColour",
      align: "center"
    },
    {
      title: "车辆排量",
      key: "carEmissions",
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
            formatter={value =>
              `${value}`.replace(/\d{1,3}(?=(\d{3})+$)/g, s => s + ",")
            }
            onOn-change={value => (amount = value)}
            parser={value => value.replace(/,*/g, "")}
            onOn-blur={() => this.onCarAmountChange(index, amount)}
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

  // /**
  //  * 尾付本金(小数点保留两位)
  //  */
  // finalprincipalBlur() {
  //   this.chooseBuyModel.finalprincipal = Number(
  //     this.chooseBuyModel.finalprincipal
  //   )
  //     .toFixed(2)
  //     .toString();
  //   if (
  //     Number(this.chooseBuyModel.finalprincipal) >=
  //     Number(this.chooseBuyModel.vehicleAmount)
  //   ) {
  //     this.$Message.warning("尾付本金应小于车辆参考总价！");
  //     this.chooseBuyModel.finalprincipal = "";
  //   }
  // }

  // /**
  //  * 保险费(小数点保留两位)
  //  */
  // insuranceMoneyBlur() {
  //   this.chooseBuyModel.insuranceMoney = Number(
  //     this.chooseBuyModel.insuranceMoney
  //   )
  //     .toFixed(2)
  //     .toString();
  // }
  // /**
  //  * 购置税(小数点保留两位)
  //  */
  // purchaseMoneyBlur() {
  //   this.chooseBuyModel.purchaseMoney = Number(
  //     this.chooseBuyModel.purchaseMoney
  //   )
  //     .toFixed(2)
  //     .toString();
  //   console.log(
  //     this.chooseBuyModel.purchaseMoney,
  //     "this.chooseBuyModel.purchaseMoney"
  //   );
  // }
  // /**
  //  * 上牌费(小数点保留两位)
  //  */
  // licenseMoneyBlur() {
  //   this.chooseBuyModel.licenseMoney = Number(this.chooseBuyModel.licenseMoney)
  //     .toFixed(2)
  //     .toString();
  // }
  // /**
  //  * GPS费(小数点保留两位)
  //  */
  // GpsMoneyBlur() {
  //   this.chooseBuyModel.GpsMoney = Number(this.chooseBuyModel.GpsMoney)
  //     .toFixed(2)
  //     .toString();
  // }
  // /**
  //  * 其他费用(小数点保留两位)
  //  */
  // otherFeeBlur() {
  //   this.chooseBuyModel.otherFee = Number(this.chooseBuyModel.otherFee)
  //     .toFixed(2)
  //     .toString();
  // }

  // /**
  //  * 数据反显
  //  */
  // Reverse(data, orderStatus) {
  //   data.orderServiceList = data.orderServices.map(v => v.service);
  //   data.intentionPeriods = Number(data.intentionPeriods);
  //   data.intentionPaymentRatio = data.intentionPaymentRatio
  //     ? data.intentionPaymentRatio.toString()
  //     : "";
  //   data.intentionFinancingAmount = data.intentionFinancingAmount
  //     ? data.intentionFinancingAmount.toString()
  //     : "";
  //   this.chooseBuyModel = data;
  //   if (orderStatus === 303) {
  //     this.carDataSet = data.orderCars;
  //     if (data.payWay) {
  //       this.flag = false;
  //       this.addPrdShow = false;
  //       this.prdInfoShow = true;
  //       this.changePrdShow = true;

  //       this.chooseBuyModel.moneyPay = data.monthlySupply.toFixed(2).toString(); // 月供金额
  //       this.totalPrice = data.vehicleAmount.toFixed(2).toString();
  //       this.chooseBuyModel.vehicleAmount = this.totalPrice;
  //       this.chooseBuyModel.GpsMoney = data.gpsFee.toFixed(2).toString(); // GPS费
  //       this.chooseBuyModel.insuranceMoney = data.insuranceExpenses
  //         .toFixed(2)
  //         .toString(); // 保险费
  //       this.chooseBuyModel.purchaseMoney = data.purchaseTax
  //         .toFixed(2)
  //         .toString(); // 购置税
  //       this.chooseBuyModel.licenseMoney = data.installLicenseFee
  //         .toFixed(2)
  //         .toString(); // 上牌费
  //       this.chooseBuyModel.name = data.product.name; // 产品名称
  //       this.chooseBuyModel.prdInterestRate = data.productRate; // 产品利率
  //       this.chooseBuyModel.financeTotalMoney = data.financingAmount
  //         .toFixed(2)
  //         .toString(); // 融资总额
  //       this.chooseBuyModel.finalprincipal = data.finalPayment
  //         .toFixed(2)
  //         .toString(); // 尾付本金

  //       //       this.chooseBuyModel.moneyPay = (Number(this.chooseBuyModel.financeTotalMoney) * (1 + Number(this.chooseBuyModel.prdInterestRate) * this.$dict.getDictName(this.chooseBuyModel.periods)) / Number(this.$dict.getDictName(this.DataSet.periods))).toFixed(2)
  //       // this.chooseBuyModel.moneyPay.toString()

  //       setTimeout(() => {
  //         this.initialPaymentData.push({
  //           key: data.paymentScale * 100 + "%",
  //           value: data.paymentScale * 100
  //         });
  //         for (let i = 0; i < this.initialPaymentData.length - 1; i++) {
  //           for (let j = 1; j < this.initialPaymentData.length; j++) {
  //             if (i != j) {
  //               if (
  //                 this.initialPaymentData[i].key ==
  //                 this.initialPaymentData[j].key
  //               ) {
  //                 this.initialPaymentData.splice(j, 1);
  //               }
  //             }
  //           }
  //         }
  //         this.chooseBuyModel.Payment = this.initialPaymentData[0].value; // 首付比例
  //       }, 100);
  //       setTimeout(() => {
  //         this.manageCostData.push({
  //           key: data.manageCostPercent * 100 + "%",
  //           value: data.manageCostPercent * 100
  //         });
  //         for (let i = 0; i < this.manageCostData.length - 1; i++) {
  //           for (let j = 1; j < this.manageCostData.length; j++) {
  //             if (i != j) {
  //               if (this.manageCostData[i].key == this.manageCostData[j].key) {
  //                 this.manageCostData.splice(j, 1);
  //               }
  //             }
  //           }
  //         }
  //         this.chooseBuyModel.manageData = this.manageCostData[0].value; // 管理费比例
  //       }, 100);
  //       setTimeout(() => {
  //         this.depositCashData.push({
  //           key: data.depositPercent * 100 + "%",
  //           value: data.depositPercent * 100
  //         });
  //         for (let i = 0; i < this.depositCashData.length - 1; i++) {
  //           for (let j = 1; j < this.depositCashData.length; j++) {
  //             if (i != j) {
  //               if (
  //                 this.depositCashData[i].key == this.depositCashData[j].key
  //               ) {
  //                 this.depositCashData.splice(j, 1);
  //               }
  //             }
  //           }
  //         }
  //         this.chooseBuyModel.deposit = this.depositCashData[0].value; // 保证金比例
  //       }, 100);
  //       this.chooseBuyModel.prdSeriods = data.productSeries.name; // 产品系列
  //       this.DataSet.productId = data.productId; // 产品id
  //       this.DataSet.id = data.productIssueId; // 期数id
  //       this.chooseBuyModel.seriesId = data.seriesId; // 系列id
  //       this.chooseBuyModel.finalCash = this.chooseBuyModel.finalCash.toString();
  //     }
  //   }
  // }

  // /**
  //  * 融资总额
  //  */
  // getFinanceTotalMoney() {
  //   if (
  //     this.chooseBuyModel.vehicleAmount &&
  //     this.chooseBuyModel.finalprincipal &&
  //     this.chooseBuyModel.initialPayment
  //   ) {
  //     this.chooseBuyModel.financeTotalMoney = (
  //       Number(this.chooseBuyModel.vehicleAmount) -
  //       Number(this.chooseBuyModel.finalprincipal) -
  //       Number(this.chooseBuyModel.initialPayment)
  //     ).toFixed(2);
  //     this.chooseBuyModel.financeTotalMoney.toString();
  //   } else {
  //     this.chooseBuyModel.financeTotalMoney = "";
  //   }
  //   //   this.chooseBuyModel.deposit = ''
  //   //   this.chooseBuyModel.manageData = ''
  //   //   this.chooseBuyModel.moneyPay = ''
  //   //   月供金额
  //   if (this.flag) {
  //     this.flag = true;
  //     if (this.chooseBuyModel.financeTotalMoney) {
  //       this.chooseBuyModel.moneyPay = (
  //         Number(this.chooseBuyModel.financeTotalMoney) *
  //         (1 +
  //           Number(this.chooseBuyModel.prdInterestRate) *
  //             this.$dict.getDictName(this.chooseBuyModel.periods)) /
  //         Number(this.$dict.getDictName(this.DataSet.periods))
  //       ).toFixed(2);
  //       this.chooseBuyModel.moneyPay.toString();
  //     }
  //   }
  // }
  // /**
  //  * 管理费
  //  */
  // choosemanageCost() {
  //   // 管理费=融资总额*管理费率
  //   if (
  //     this.chooseBuyModel.financeTotalMoney &&
  //     this.chooseBuyModel.manageData
  //   ) {
  //     this.chooseBuyModel.manageCost = (
  //       Number(this.chooseBuyModel.financeTotalMoney) *
  //       (Number(this.chooseBuyModel.manageData) * 0.01)
  //     ).toFixed(2);
  //     this.chooseBuyModel.manageCost.toString();
  //   }
  //   this.chooseBuyModel = JSON.parse(JSON.stringify(this.chooseBuyModel));
  // }
  // /**
  //  * 尾付本金
  //  */
  // finalprincipalChange() {
  //   //   if (Number(this.chooseBuyModel.finalprincipal)>0) {
  //   //   } else {
  //   //     this.chooseBuyModel.finalprincipal = ''
  //   //   }
  //   if (this.chooseBuyModel.finalprincipal && this.DataSet.finalCash) {
  //     this.finalorddisabled = false;
  //   }
  //   this.getFinanceTotalMoney();
  // }
  // vehicleAmountChange() {
  //   if (this.chooseBuyModel.vehicleAmount && this.DataSet.depositCash) {
  //     this.depositdisabled = false; // 保证金金额比例输入框
  //   }
  //   if (this.chooseBuyModel.vehicleAmount && this.DataSet.finalCash) {
  //     this.finaldisabled = false;
  //   }
  //   if (this.chooseBuyModel.vehicleAmount && this.DataSet.initialPayment) {
  //     this.Paymentdisabled = false;
  //   }
  //   if (this.chooseBuyModel.vehicleAmount && this.DataSet.manageCost) {
  //     this.manageDatadisabled = false;
  //   }
  // }
  // /**
  //  * 车辆参考总价更改
  //  */
  // vehicleAmountBlur() {
  //   this.chooseBuyModel.vehicleAmount = Number(
  //     this.chooseBuyModel.vehicleAmount
  //   )
  //     .toFixed(2)
  //     .toString();
  //   this.getFinanceTotalMoney();
  // }
  // /**
  //  * 首付金额
  //  */
  // chooseinitialPayment() {
  //   // 首付金额=车辆参考总价*首付比例
  //   if (
  //     this.chooseBuyModel.Payment !== "" &&
  //     this.chooseBuyModel.vehicleAmount
  //   ) {
  //     this.chooseBuyModel.initialPayment = (
  //       Number(this.chooseBuyModel.vehicleAmount) *
  //       (Number(this.chooseBuyModel.Payment) * 0.01)
  //     ).toFixed(2);
  //     this.chooseBuyModel.initialPayment.toString();
  //     console.log(
  //       this.chooseBuyModel.initialPayment,
  //       "this.chooseBuyModel.initialPayment"
  //     );
  //   }
  //   this.chooseBuyModel = JSON.parse(JSON.stringify(this.chooseBuyModel));
  //   this.getFinanceTotalMoney();
  // }
  // /**
  //  * 保证金金额
  //  */
  // choosedeposit() {
  //   // 保证金金额=融资总额*保证金比例
  //   if (
  //     this.chooseBuyModel.deposit !== "" &&
  //     this.chooseBuyModel.financeTotalMoney
  //   ) {
  //     this.chooseBuyModel.depositCash = (
  //       Number(this.chooseBuyModel.financeTotalMoney) *
  //       Number(this.chooseBuyModel.deposit) *
  //       0.01
  //     ).toFixed(2);
  //     this.chooseBuyModel.depositCash.toString();
  //   }
  //   this.chooseBuyModel = JSON.parse(JSON.stringify(this.chooseBuyModel));
  // }

  // /**
  //  * 尾付总额
  //  */
  // choosefinalCash() {
  //   // 尾付总额(尾款本金+尾付利息)
  //   this.chooseBuyModel.finalCash = (
  //     Number(this.chooseBuyModel.finalprincipal) *
  //     (1 +
  //       Number(this.chooseBuyModel.final) *
  //         0.01 *
  //         this.$dict.getDictName(this.chooseBuyModel.periods))
  //   ).toFixed(2);
  //   this.chooseBuyModel.finalCash.toString();
  //   this.chooseBuyModel = JSON.parse(JSON.stringify(this.chooseBuyModel));
  // }

  // private a = 0;
  // /**
  //  * 添加车辆信息
  //  */
  // distributionData(data) {
  //   this.carDataSet = data;
  //   let sum: any = 0;
  //   data.forEach(v => {
  //     sum = sum + (Number(v.carAmount) || 0);
  //   });
  //   this.totalPrice = sum;
  // }

  // /**
  //  * 更改产品
  //  */
  // changePrd() {
  //   this.addProductModal = true;
  //   let addProductRefresh: any = this.$refs["add-product"];
  //   addProductRefresh.treeList();
  //   addProductRefresh.resetcarData();
  // }

  onInitialPaymentChange(){

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
   * 更新
   */
  @Watch("totalPrice")
  onTotalProce(value) {
    this.productModel.vehicleAmount = value;
  }

  /**
   * 参考总价更新
   * 1.手动更新
   * 2.更新车辆数据
   */
  onVehicleAmountChange() {
    // TODO: 参考总价改变重置金额信息
    this.productModel.finalCash = 0;
    this.productModel.initialPayment = 0;
  }

  // /**
  //  * 计算车辆总价
  //  */
  // complutedtotalPrice() {
  //   let sum: any = 0;
  //   this.carDataSet.forEach(v => {
  //     sum = sum + (Number(v.carAmount) || 0);
  //   });
  //   this.totalPrice = sum.toFixed(2);
  //   this.chooseBuyModel.vehicleAmount = this.totalPrice;
  //   this.chooseinitialPayment();
  //   this.choosedeposit();
  //   this.choosefinalCash();
  //   this.choosemanageCost();
  // }

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
          this.carDataSet.push(...currentSelection);
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
          this.productModel.productIssueId = currentRow.id;
          console.log(this.currentProduct);
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
   * 获取添加产品信息
   */
  // currentRowData(data, productDataModel) {
  //   this.depositCashData = [];
  //   this.finalCashData = [];
  //   this.initialPaymentData = [];
  //   this.manageCostData = [];
  //   this.DataSet = data;
  //   if (data.depositCash) {
  //     let deposit: any = data.depositCash ? data.depositCash.split(";") : "";
  //     deposit.forEach(v => {
  //       this.depositCashData.push({
  //         key: v + "%",
  //         value: v || 0
  //       });
  //     });
  //     for (let i = 0; i < this.depositCashData.length - 1; i++) {
  //       for (let j = 1; j < this.depositCashData.length; j++) {
  //         if (i != j) {
  //           if (this.depositCashData[i].key == this.depositCashData[j].key) {
  //             this.depositCashData.splice(j, 1);
  //           }
  //         }
  //       }
  //     }
  //   }

  //   if (data.finalCash) {
  //     let rr: any = data.finalCash ? data.finalCash.split(";") : "";
  //     rr.forEach(v => {
  //       this.finalCashData.push({
  //         key: v + "%",
  //         value: v || 0
  //       });
  //     });
  //     for (let i = 0; i < this.finalCashData.length - 1; i++) {
  //       for (let j = 1; j < this.finalCashData.length; j++) {
  //         if (i != j) {
  //           if (this.finalCashData[i].key == this.finalCashData[j].key) {
  //             this.finalCashData.splice(j, 1);
  //           }
  //         }
  //       }
  //     }
  //   }

  //   if (data.initialPayment) {
  //     let initial: any = data.initialPayment
  //       ? data.initialPayment.split(";")
  //       : "";
  //     initial.forEach(v => {
  //       this.initialPaymentData.push({
  //         key: v + "%",
  //         value: v || 0
  //       });
  //     });
  //     for (let i = 0; i < this.initialPaymentData.length - 1; i++) {
  //       for (let j = 1; j < this.initialPaymentData.length; j++) {
  //         if (i != j) {
  //           if (
  //             this.initialPaymentData[i].key == this.initialPaymentData[j].key
  //           ) {
  //             this.initialPaymentData.splice(j, 1);
  //           }
  //         }
  //       }
  //     }
  //   }
  //   if (data.manageCost) {
  //     let manage: any = data.manageCost ? data.manageCost.split(";") : "";
  //     manage.forEach(v => {
  //       this.manageCostData.push({
  //         key: v + "%",
  //         value: v || 0
  //       });
  //     });
  //     for (let i = 0; i < this.manageCostData.length - 1; i++) {
  //       for (let j = 1; j < this.manageCostData.length; j++) {
  //         if (i != j) {
  //           if (this.manageCostData[i].key == this.manageCostData[j].key) {
  //             this.manageCostData.splice(j, 1);
  //           }
  //         }
  //       }
  //     }
  //   }

  //   this.updateProductId(data.productId);
  //   this.chooseBuyModel.name = productDataModel.title; // 产品名称
  //   this.chooseBuyModel.prdSeriods = productDataModel.series; // 产品系列
  //   this.chooseBuyModel.periods = data.periods; // 产品期数
  //   this.chooseBuyModel.prdInterestRate = data.productRate; // 产品利率
  //   this.chooseBuyModel.payWay = data.payWay; // 还款方式
  //   this.chooseBuyModel.moneyPay = data.moneyPay;
  //   this.chooseBuyModel.insuranceMoney = data.insuranceMoney;
  //   this.chooseBuyModel.purchaseMoney = data.purchaseMoney;
  //   this.chooseBuyModel.licenseMoney = data.licenseMoney;
  //   this.chooseBuyModel.GpsMoney = data.GpsMoney;
  //   this.chooseBuyModel.otherFee = data.otherFee;
  //   this.chooseBuyModel.remark = data.remark;
  //   if (this.totalPrice) {
  //     this.chooseBuyModel.vehicleAmount = this.totalPrice.toString();
  //   } else {
  //     this.chooseBuyModel.vehicleAmount = "";
  //   }
  //   if (data.depositCash === undefined || data.depositCash === null) {
  //     this.chooseBuyModel.depositCash = "0.00"; // 保证金金额
  //     setTimeout(() => {
  //       this.depositCashData.push({
  //         key: 0 + "%",
  //         value: 0
  //       });
  //       this.chooseBuyModel.deposit = this.depositCashData[0].value;
  //     }, 100);
  //     this.depositdisabled = true;
  //   } else {
  //     console.log(
  //       this.chooseBuyModel.vehicleAmount,
  //       "this.chooseBuyModel.vehicleAmountdfdfdfd"
  //     );
  //     if (!this.chooseBuyModel.vehicleAmount) {
  //       this.depositdisabled = true;
  //     } else {
  //       this.depositdisabled = false;
  //     }
  //   }
  //   if (data.initialPayment === undefined || data.initialPayment === null) {
  //     this.chooseBuyModel.initialPayment = "0.00"; // 首付金额
  //     setTimeout(() => {
  //       this.initialPaymentData.push({
  //         key: 0 + "%",
  //         value: 0
  //       });
  //       this.chooseBuyModel.Payment = this.initialPaymentData[0].value;
  //     }, 100);
  //     this.Paymentdisabled = true;
  //   } else {
  //     if (this.chooseBuyModel.vehicleAmount) {
  //       this.Paymentdisabled = false;
  //     } else {
  //       this.Paymentdisabled = true;
  //     }
  //   }
  //   if (data.manageCost === undefined || data.manageCost === null) {
  //     this.chooseBuyModel.manageCost = "0.00"; // 管理费
  //     setTimeout(() => {
  //       this.manageCostData.push({
  //         key: 0 + "%",
  //         value: 0
  //       });
  //       this.chooseBuyModel.manageData = this.manageCostData[0].value;
  //     }, 100);
  //     this.manageDatadisabled = true;
  //   } else {
  //     if (this.chooseBuyModel.vehicleAmount) {
  //       this.manageDatadisabled = false;
  //     } else {
  //       this.manageDatadisabled = true;
  //     }
  //   }
  //   if (data.finalCash === undefined || data.finalCash === null) {
  //     this.chooseBuyModel.finalprincipal = "0.00"; // 尾付本金
  //     this.chooseBuyModel.finalCash = "0.00"; // 尾付总额
  //     setTimeout(() => {
  //       this.finalCashData.push({
  //         key: 0 + "%",
  //         value: 0
  //       });
  //       this.chooseBuyModel.final = this.finalCashData[0].value;
  //     }, 100);
  //     this.finaldisabled = true;
  //     this.finalorddisabled = true;
  //   } else {
  //     if (this.chooseBuyModel.vehicleAmount) {
  //       this.finaldisabled = false;
  //     } else {
  //       this.finaldisabled = true;
  //       this.finalorddisabled = true;
  //     }
  //   }
  //   this.chooseBuyModel.seriesId = productDataModel.seriesId;
  // }

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

    // 验证表单
    if (await Promise.all([chooseForm.validate(), productForm.validate()])) {
      return false;
    }

    // 自定义验证
    let result = await this.$validator.validate({}, this.customRules).then(error => {
      if (error) {
        // 验证自定义错误
      }

      return true
    });

    return result
  }

  mounted() {
    this.getCompanyList();
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