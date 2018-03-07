<!--选购材料-->
<template>
  <section class="component choose-buy-materials">
    <i-col span="24" style="line-height:30px" class="form-title">选购信息</i-col>
    <i-row>
      <i-form ref="customer-form" :rules="rules" :model="chooseBuyModel" :label-width="110" style="margin-top:20px;position:relative;left:16px;"
        label-position="left">
        <i-row>
          <i-col span="12">
            <i-form-item label="申请省份" prop="province">
              <i-select placeholder="选择省" v-model="chooseBuyModel.province" clearable>
                <i-option v-for="{value,label} in this.$city.getCityData({ level : 1 })" :key="value" :label="label" :value="value"></i-option>
              </i-select>
            </i-form-item>
          </i-col>
          <i-col span="12" pull="3">
            <i-form-item label="申请城市" prop="city">
              <i-select v-model="chooseBuyModel.city" placeholder="选择市" clearable>
                <i-option v-for="{value,label} in this.chooseBuyModel.province ? this.$city.getCityData({ level: 1, id: this.chooseBuyModel.province }) : []"
                  :key="value" :label="label" :value="value"></i-option>
              </i-select>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="12">
            <i-form-item label="所属公司" prop="companyId">
              <i-select v-model="chooseBuyModel.companyId" clearable>
                <i-option v-for="item in companyObject" :key="item.id" :value="item.id" :label="item.companyChinaname"></i-option>
              </i-select>
            </i-form-item>
          </i-col>
          <i-col span="12" pull="3">
            <i-form-item label="自缴费用" prop="orderServiceList">
              <i-checkbox-group v-model="chooseBuyModel.orderServiceList">
                <i-checkbox :value="368" :label="368">无</i-checkbox>
                <i-checkbox :value="369" :label="369">购置税</i-checkbox>
                <i-checkbox :value="370" :label="370">保险费</i-checkbox>
                <i-checkbox :value="371" :label="371">上牌费</i-checkbox>
                <i-checkbox :value="372" :label="372">路桥费</i-checkbox>
                <i-checkbox :value="373" :label="373">首期租金</i-checkbox>
              </i-checkbox-group>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="12">
            <i-form-item label="融资租赁用途" prop="financingUse">
              <i-input type="text" v-model="chooseBuyModel.financingUse">
              </i-input>
            </i-form-item>
          </i-col>
          <i-col span="12" pull="3">
            <i-form-item label="意向融资金额" prop="intentionFinancingAmount">
              <i-input type="text" v-model="chooseBuyModel.intentionFinancingAmount">
              </i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="12">
            <i-form-item label="意向期限" prop="intentionPeriods">
              <i-input type="text" v-model="chooseBuyModel.intentionPeriods">
              </i-input>
            </i-form-item>
          </i-col>
          <i-col span="12" pull="3">
            <i-form-item label="租金支付" prop="rentPayable">
              <i-input type="text" v-model="chooseBuyModel.rentPayable">
              </i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <i-col span="12">
          <i-form-item label="意向首付比例" prop="intentionPaymentRatio">
            <i-input type="text" v-model="chooseBuyModel.intentionPaymentRatio">
            </i-input>
          </i-form-item>
        </i-col>
      </i-form>
    </i-row>
    <i-table height="200" :columns="carColumns" :data="addcarData" stripe style="margin:10px;" width="1100"></i-table>
    <div>
      <Icon type="plus" style="position:relative;left:26px;color:#265ea2"></Icon>
      <i-button @click="addModalOpen" style="margin-left:10px;color:#265ea2" type="text">添加车辆</i-button>
      <span style="margin-left:115px;font-weight:bold">总价</span><span style="margin-left:340px;font-weight:bold;">{{totalPrice}}</span>
    </div>
    <i-col span="24" style="line-height:30px;margin-top:20px;" class="form-title">
      <span>产品信息</span>
      <!--<div style="font-size:14px;cursor:pointer;display:inline-block;color:#3367A7;position:absolute;left:52%;" @click="openSimulateCalculate">
        <svg-icon iconClass="jisuanqi"></svg-icon>
        <span style="font-size:12px;">月供模拟计算器</span>
      </div>-->
    </i-col>
    <div v-show="addPrdShow">
      <Icon type="plus" style="position:relative;left:26px;color:#265ea2;"></Icon>
      <i-button @click="addNewPrd" style="margin-left:10px;color:#265ea2" type="text">添加产品</i-button>
    </div>
    <i-row v-show="prdInfoShow">
      <i-form ref="form" :rules="rulesdata" :model="chooseBuyModel" :label-width="110" style="margin-top:20px;">
        <i-col span="12">
          <i-form-item label="产品系列" prop="prdSeriods">
            <i-input type="text" v-model="chooseBuyModel.prdSeriods">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12" pull="3">
          <i-form-item label="产品名称" prop="name">
            <i-input type="text" v-model="chooseBuyModel.name">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12">
          <i-form-item label="产品期数" prop="periods">
            <i-input type="text" v-model="chooseBuyModel.periods">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12" pull="3">
          <i-form-item label="产品利率" prop="prdInterestRate">
            <i-input type="text" v-model="chooseBuyModel.prdInterestRate">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12">
          <i-form-item label="还款方式" prop="payWay">
            <i-input type="text" v-model="chooseBuyModel.payWay">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12" pull="3">
          <i-form-item label="车辆参考总价" prop="vehicleAmount">
            <i-input type="text" v-model="chooseBuyModel.vehicleAmount" @on-blur="vehicleAmountChange">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12">
          <i-form-item label="融资总额" prop="financeTotalMoney">
            <i-input type="text" v-model="chooseBuyModel.financeTotalMoney" @on-focus="financeTotalRemind" @on-change="financeTotalMoneyChange">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12" pull="3">
          <i-form-item label="月供金额" prop="moneyPay">
            <i-input type="text" v-model="chooseBuyModel.moneyPay">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12">
          <i-form-item label="首付金额" prop="initialPayment">
            <i-row>
              <i-input type="text" v-model="chooseBuyModel.initialPayment" :disabled="!DataSet.initialPayment" @on-change="initialChange">
              </i-input>
            </i-row>
          </i-form-item>
        </i-col>
        <i-col span="12" pull="3">
          <i-form-item label="保证金金额" prop="depositCash">
            <i-row>
              <i-input type="text" v-model="chooseBuyModel.depositCash" :disabled="!DataSet.depositCash">
              </i-input>
            </i-row>
          </i-form-item>
        </i-col>
        <i-col span="12" offset="2">
          <i-form-item>
            <i-select placeholder="请选择首付金额比例" v-model="chooseBuyModel.Payment" clearable @on-change="chooseinitialPayment">
              <i-option v-for="item in initialPaymentData" :key="item" :value="item" :label="item"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <i-col span="10" pull="3">
          <i-row>
            <i-select placeholder="请选择保证金金额比例" v-model="chooseBuyModel.deposit" clearable @on-change="choosedeposit">
              <i-option v-for="item in depositCashData" :key="item" :value="item" :label="item"></i-option>
            </i-select>
          </i-row>
        </i-col>
        <i-col span="12">
          <i-form-item label="尾付金额" prop="finalCash">
            <i-row>
              <i-input placeholder="请输入尾付本金" type="text" v-model="chooseBuyModel.finalprincipal">
              </i-input>
            </i-row>
          </i-form-item>
        </i-col>
        <i-col span="12" pull="3">
          <i-form-item label="管理费" prop="manageCost">
            <i-row>
              <i-input placeholder="请输入管理费" type="text" v-model="chooseBuyModel.manageCost">
              </i-input>
            </i-row>
          </i-form-item>
        </i-col>
        <i-col span="12" offset="2">
          <i-form-item>
            <i-row>
              <i-input type="text" placeholder="尾付总额" v-model="chooseBuyModel.finalCash" :disabled="!DataSet.finalCash">
              </i-input>
            </i-row>
          </i-form-item>
        </i-col>
        <i-col span="10" pull="3">
          <i-form-item>
            <i-row>
              <i-select v-model="chooseBuyModel.manageData" clearable @on-change="choosemanageCost">
                <i-option v-for="item in manageCostData" :key="item" :value="item" :label="item"></i-option>
              </i-select>
            </i-row>
          </i-form-item>
        </i-col>
        <i-col span="12" offset="2">
          <i-form-item>
            <i-row>
              <i-select placeholder="请选择尾付金额比例" v-model="chooseBuyModel.final" clearable @on-change="choosefinalCash">
                <i-option v-for="item in finalCashData" :key="item" :value="item" :label="item"></i-option>
              </i-select>
            </i-row>
          </i-form-item>
        </i-col>
        <i-col span="10" pull="3">
          <i-form-item label="保险费" prop="insuranceMoney">
            <i-input type="text" v-model="chooseBuyModel.insuranceMoney">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12">
          <i-form-item label="购置费" prop="purchaseMoney">
            <i-input type="text" v-model="chooseBuyModel.purchaseMoney">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12" pull="3">
          <i-form-item label="上牌费" prop="licenseMoney">
            <i-input type="text" v-model="chooseBuyModel.licenseMoney">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12">
          <i-form-item label="GPS费" prop="GpsMoney">
            <i-input type="text" v-model="chooseBuyModel.GpsMoney">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12" pull="3">
          <i-form-item label="其他费用" prop="otherFee">
            <i-input type="text" v-model="chooseBuyModel.otherFee">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12">
          <i-form-item label="备注" prop="remark">
            <i-input type="text" v-model="chooseBuyModel.remark">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col :span="24">
          <div v-show="changePrdShow">
            <Icon type="plus" style="position:relative;left:26px;color:#265ea2;"></Icon>
            <i-button @click="changePrd" style="margin-left:10px;color:#265ea2" type="text">更改产品</i-button>
          </div>
        </i-col>
        <i-col span="24">
          <div style="height:60px;">
            <!--<input type="text" style="border:none;border-bottom-style:solid;outline:none">-->
          </div>
        </i-col>
      </i-form>
    </i-row>

    <template>
      <i-modal title="月供模拟计算器" width="900" v-model="simulateCalculateModal" class="calculate">
        <simulate-calculate :chooseBuyModel="chooseBuyModel"></simulate-calculate>
      </i-modal>
    </template>

    <template>
      <i-modal :title="addOrEditFlag?'添加车辆':'编辑车辆'" width="80" v-model="editCarModal" :trandfer="false" class="add-car">
        <add-car @distributionData="distributionData" :addcarData.sync="addcarData" :rowData.sync="rowData" @close="editCarModal=false,rowData=null"></add-car>
      </i-modal>
    </template>

    <template>
      <i-modal v-model="addProductModal" title="添加产品" width="1000" class="add-car">
        <add-product @currentRowData="currentRowData" @close="addProductModal=false" @productPlanissue="productPlanissue"></add-product>
        <!--<div slot="footer">
          <i-button @click="confirmAndBackPrd" class="blueButton">确认并返回</i-button>
        </div>-->
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import {
    State,
    Mutation,
    namespace
  } from "vuex-class";
  import {
    ApplyQueryService
  } from "~/services/business-service/apply-query.service";
  import {
    Dependencies
  } from "~/core/decorator";
  import AddCar from "~/components/purchase-manage/add-car.vue"
  import SvgIcon from '~/components/common/svg-icon.vue'
  import DataBox from "~/components/common/data-box.vue"
  import SimulateCalculate from "~/components/common/simulate-calculate.vue"
  import AddProduct from '~/components/purchase-manage/add-product.vue'
  import {
    CompanyService
  } from "~/services/manage-service/company.service";
  import {
    Prop
  } from "vue-property-decorator";
  import {
    Emit
  } from "vue-property-decorator";
  const ModuleMutation = namespace('purchase', Mutation)
  @Component({
    components: {
      SvgIcon,
      DataBox,
      SimulateCalculate,
      AddCar,
      AddProduct
    }
  })
  export default class ChooseBuyMaterials extends Vue {
    @Dependencies(ApplyQueryService) private applyQueryService: ApplyQueryService;
    @Dependencies(CompanyService) private companyService: CompanyService;
    @ModuleMutation('updateProductId') updateProductId
    private carColumns: any;
    private carData: Array < Object > = [];
    private simulateCalculateModal: Boolean = false;
    private editCarModal: Boolean = false;
    private addOrEditFlag: Boolean = false;
    private prdInfoShow: Boolean = false;
    private buttonShow: Boolean = true;
    private addProductModal: Boolean = false;
    private addPrdShow: Boolean = true;
    private changePrdShow: Boolean = false;
    private companyObject: Array < Object >= []; // 公司信息
    private addcarData: any = [];
    private rowData: any = null;
    private depositCashData: any = []; // 保证金
    private finalCashData: any = []; // 尾付金额
    private initialPaymentData: any = []; // 首付款
    private manageCostData: any = []; // 管理费
    private totalPrice: any = '';
    private DataSet: any = '';
    private chooseBuyModel: any = {
      name: '', // 产品名称
      prdSeriods: '', // 产品系列
      province: '', // 省份
      city: '', // 城市
      companyId: '', // 所属公司
      intentionFinancingAmount: '', // 意向融资金额
      intentionPeriods: '', // 意向期限
      rentPayable: '', // 租金支付
      intentionPaymentRatio: '', // 意向首付比例
      orderServiceList: [], // 自缴费用
      financingUse: '', // 融资租赁用途
      Payment: '',
      deposit: '',
      final: '',
      manageData: '',
      vehicleAmount: '', // 车辆参考总价
      finalprincipal: '', // 尾付本金
      initialPayment: '', // 首付金额
      otherFee: '', // 其他费用
    };
    private rulesdata: any = {
      //   moneyPay: [{
      //     required: true,
      //     message: '请输入月供金额',
      //     trigger: 'blur',
      //   }],
      //   vehicleAmount: [{
      //     required: true,
      //     message: '请输入车辆参考总价',
      //     trigger: 'blur',
      //   }],
      //   payWay: [{
      //     required: true,
      //     message: '请输入还款方式',
      //     trigger: 'blur',
      //   }],
      //   prdInterestRate: [{
      //     required: true,
      //     message: '请输入产品利率',
      //     trigger: 'blur',
      //   }],
      //   periods: [{
      //     required: true,
      //     message: '请输入产品期数',
      //     trigger: 'blur',
      //   }],
      //   name: [{
      //     required: true,
      //     message: '请输入产品名称',
      //     trigger: 'blur',
      //   }],
      //   prdSeriods: [{
      //     required: true,
      //     message: '请输入产品系列',
      //     trigger: 'blur',
      //   }],
      financeTotalMoney: [{
        required: true,
        message: '请输入融资总额',
        trigger: 'blur',
      }],
    };
    private rules: any = {
      intentionPaymentRatio: [{
        required: true,
        message: '请输入意向首付比例',
        trigger: 'blur',
      }],
      //   intentionFinancingAmount: [{
      //     required: true,
      //     message: '请输入意向融资金额',
      //     trigger: 'blur',
      //     type: 'number'
      //   }],
      intentionPeriods: [{
        required: true,
        message: '请输入意向期限',
        trigger: 'blur',
      }],
      //   rentPayable: [{
      //     required: true,
      //     message: '请输入租金支付',
      //     trigger: 'blur',
      //     type: 'number'
      //   }],
      province: [{
        required: true,
        message: '请选择申请省份',
        trigger: 'change',
        type: 'number',
      }],
      city: [{
        required: true,
        message: '请选择申请城市',
        trigger: 'change',
        type: 'number',
      }],
      companyId: [{
        required: true,
        message: '请选择申请公司',
        trigger: 'change',
        type: 'number',
      }],
      orderServiceList: [{
        required: true,
        message: '请选择自缴费用',
        trigger: 'change',
        type: 'array',
      }],
      financingUse: [{
        required: true,
        message: '请输入融资租赁用途',
        trigger: 'blur',
      }],
      financeTotalMoney: [{
        required: true,
        message: '请输入融资总额',
        trigger: 'blur',
      }],
    };

    // @Emit('productData')
    // productData(productId) {}
    @Prop()
    disabledStatus: String;
    /**
     * 数据反显
     */
    Reverse(data) {
      this.chooseBuyModel.province = data.province
      this.chooseBuyModel.city = data.city
      this.chooseBuyModel.companyId = data.companyId
      this.chooseBuyModel.orderServiceList = data.orderServiceList // 自缴费用
      this.chooseBuyModel.financingUse = data.financingUse
      this.chooseBuyModel.intentionFinancingAmount = data.intentionFinancingAmount
      this.chooseBuyModel.intentionPeriods = data.intentionPeriods
      this.chooseBuyModel.rentPayable = data.rentPayable
      this.chooseBuyModel.hopeProportion = data.hopeProportion
    }
    /**
     * 
     */
    financeTotalRemind() {
      this.$Message.warning(`融资总额应在${this.DataSet.financingAmount}区间内`)
    }
    /**
     * 融资总额
     */
    financeTotalMoneyChange() {
      // 尾付本金=车辆参考总价-首付金额-融资总额
      if (!this.chooseBuyModel.vehicleAmount) {
        this.chooseBuyModel.vehicleAmount = 0
      }
      if (!this.chooseBuyModel.initialPayment) {
        this.chooseBuyModel.initialPayment = 0
      }
      //   if (!this.chooseBuyModel.financeTotalMoney) {
      //     this.chooseBuyModel.financeTotalMoney = 0
      //   }
      this.chooseBuyModel.finalprincipal = (Number(this.chooseBuyModel.vehicleAmount) - Number(this.chooseBuyModel.initialPayment)) -
        Number(this.chooseBuyModel.financeTotalMoney)
      // 尾付总额
      if (this.chooseBuyModel.final) {
        this.choosefinalCash()
      }
      //   管理费
      if (this.chooseBuyModel.manageData) {
        this.choosemanageCost()
      }
    }
    /**
     * 管理费
     */
    choosemanageCost() {
      // 管理费=融资总额*管理费率
      //   if (this.chooseBuyModel.financeTotalMoney) {
      //     this.chooseBuyModel.financeTotalMoney = 0
      //   }
      this.chooseBuyModel.manageCost = Number(this.chooseBuyModel.financeTotalMoney) * (Number(this.chooseBuyModel.manageData) *
        0.01)
    }
    /**
     * 车辆参考总价更改
     */
    vehicleAmountChange() {
      this.chooseBuyModel.vehicleAmount = Number(this.chooseBuyModel.vehicleAmount)
      if (this.chooseBuyModel.initialPayment) {
        // 首付金额改变
        this.chooseinitialPayment()
      }
      if (this.chooseBuyModel.depositCash) {
        //   保证金金额改变
        this.choosedeposit()
      }
    }
    /**
     * 首付金额改变融资总额变化
     */
    initialPaymentChange() {
      // 融资总额=车辆参考总价-首付金额-尾付金额
      if (!this.chooseBuyModel.vehicleAmount) {
        this.chooseBuyModel.vehicleAmount = 0
      }
      if (!this.chooseBuyModel.initialPayment) {
        this.chooseBuyModel.initialPayment = 0
      }
      if (!this.chooseBuyModel.finalprincipal) {
        this.chooseBuyModel.finalprincipal = 0
      }
      this.chooseBuyModel.financeTotalMoney = (Number(this.chooseBuyModel.vehicleAmount) - Number(this.chooseBuyModel
        .initialPayment)) - Number(this.chooseBuyModel.finalprincipal)
    }
    initialChange() {
      console.log(Number(this.chooseBuyModel.vehicleAmount), Number(this.chooseBuyModel
        .initialPayment), Number(this.chooseBuyModel.finalprincipal))
      this.initialPaymentChange()
    }
    /**
     * 首付金额
     */
    chooseinitialPayment() {
      // 首付金额=车辆参考总价*首付比例
      this.chooseBuyModel.initialPayment = (Number(this.chooseBuyModel.vehicleAmount)) * (Number(this.chooseBuyModel
          .Payment) *
        0.01)
      // 融资总额
      this.initialPaymentChange()
      console.log(this.chooseBuyModel.financeTotalMoney)
    }
    /**
     * 保证金金额
     */
    choosedeposit() {
      // 保证金金额=车辆参考总价*保证金比例
      this.chooseBuyModel.depositCash = (Number(this.chooseBuyModel.vehicleAmount)) * (Number(this.chooseBuyModel
          .deposit) *
        0.01)
    }
    /**
     * 尾付总额
     */
    choosefinalCash() {
      // 尾付利息(尾款本金*年利率*期数)
      let finalCashinterest: any = Number(this.chooseBuyModel.finalprincipal) * (Number(this.chooseBuyModel.final) *
        0.01) * Number(this.chooseBuyModel.periods)
      // 尾付总额（尾款本金+尾付利息）
      this.chooseBuyModel.finalCash = finalCashinterest + Number(this.chooseBuyModel.finalprincipal)
    }
    /**
     * 添加车辆信息
     */
    distributionData(data) {
      this.addcarData = data
      this.totalPrice = data.map(v => v.carAmount).reduce((x, y) => {
        return x + y;
      })
      console.log(this.totalPrice, 'addcarData')
    }
    /**
     * 打开月供模拟计算器
     */
    openSimulateCalculate() {
      if (this.disabledStatus === 'none') {
        this.simulateCalculateModal = true
      }
    }
    /**
     * 更改产品
     */
    changePrd() {
      this.addProductModal = true
    }
    mounted() {}
    created() {
      // 获取公司名称
      this.companyService.getAllCompany().subscribe(val => {
        this.companyObject = val
      })
      this.carColumns = [{
          title: '操作',
          align: 'center',
          width: 180,
          render: (h, {
            row,
            column,
            index
          }) => {
            return h("div", [
              h(
                "i-button", {
                  props: {
                    type: "text"
                  },
                  style: {
                    color: "#265EA2"
                  },
                  on: {
                    click: () => {
                      this.editCarModal = true
                      this.rowData = row
                    }
                  }
                },
                "编辑"
              ),
              h(
                "i-button", {
                  props: {
                    type: "text"
                  },
                  style: {
                    color: "#265EA2"
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: '提示',
                        content: '确定删除吗？',
                        onOk: () => {
                          this.addcarData.splice(index, 1);
                        }
                      })

                    }
                  }
                },
                "删除"
              )
            ]);
          }
        },
        {
          title: '车辆品牌',
          key: 'brandName',
          align: 'center'
        }, {
          title: '车辆型号',
          key: 'modelName',
          align: 'center'
        }, {
          title: '车身颜色',
          key: 'carColour',
          align: 'center'
        }, {
          title: '车辆排量',
          key: 'carEmissions',
          align: 'center'
        }, {
          title: '单价（元）',
          key: 'carAmount',
          align: 'center'
        }, {
          title: '车辆配置',
          key: 'vehicleConfiguration',
          align: 'center'
        }, {
          title: '上牌地区',
          key: 'registrationArea',
          align: 'center'
        }, {
          title: '车辆牌照',
          key: 'vehicleLicence',
          align: 'center'
        }, {
          title: '所在门店',
          key: 'store',
          align: 'center'
        }, {
          title: '状态',
          key: 'status',
          align: 'center',
          render: (h, {
            row,
            column,
            index
          }) => {
            return h("span", {}, this.$dict.getDictName(row.status));
          }
        }
      ]

      this.carData = []
    }
    addModalOpen() {
      this.addOrEditFlag = true
      this.editCarModal = true
    }
    confirmAndBack() {
      this.editCarModal = false
    }
    addNewPrd() {
      this.addProductModal = true
      this.prdInfoShow = true
      this.buttonShow = false
      this.addPrdShow = false
      this.changePrdShow = true
    }
    /**
     * 获取添加产品信息
     */
    currentRowData(data, productDataModel) {
      console.log(data, productDataModel, 999)
      this.DataSet = data
      this.depositCashData = data.depositCash ? (data.depositCash.split(';')) : ''
      this.finalCashData = data.finalCash ? (data.finalCash.split(';')) : ''
      this.initialPaymentData = data.initialPayment ? (data.initialPayment.split(';')) : ''
      this.manageCostData = data.manageCost ? (data.manageCost.split(';')) : ''
      this.updateProductId(data.productId)
      this.chooseBuyModel.name = productDataModel.title // 产品名称
      this.chooseBuyModel.prdSeriods = productDataModel.series // 产品系列
      this.chooseBuyModel.periods = data.periods // 产品期数
      this.chooseBuyModel.prdInterestRate = data.productRate // 产品利率
      this.chooseBuyModel.payWay = data.payWay // 还款方式
      this.chooseBuyModel.moneyPay = data.moneyPay
      this.chooseBuyModel.insuranceMoney = data.insuranceMoney
      this.chooseBuyModel.purchaseMoney = data.purchaseMoney
      this.chooseBuyModel.licenseMoney = data.licenseMoney
      this.chooseBuyModel.GpsMoney = data.GpsMoney
      this.chooseBuyModel.otherFee = data.otherFee
      this.chooseBuyModel.remark = data.remark
      this.chooseBuyModel.vehicleAmount = this.totalPrice
    }
    productPlanissue(data) {
      console.log(data, 'daatgjgjg')
      //   this.chooseBuyModel = {
      //     name: data.title // 产品名称
      //     // prdSeriods:
      //   }
    }
  }

</script>

<style lang="less" scope>
  .choose-buy-materials {
    .ivu-select-selection {
      // width: 240%;
      display: inline-block;
      border-style: none;
      border-bottom-style: solid;
      border-radius: 0;
    }
  }
  
  .calculate {
    .ivu-modal-footer {
      display: none!important;
    }
  }
  
  .add-car {
    .ivu-modal-footer {
      display: none!important;
    }
  }

</style>
