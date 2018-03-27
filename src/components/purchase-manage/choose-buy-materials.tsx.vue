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
                 <!--<i-option v-if="companyObject.length===0" value="暂无数据" readonly>暂无数据</i-option>-->
              </i-select>
            </i-form-item>
          </i-col>
          <i-col span="12" pull="3">
            <i-form-item label="自缴费用" prop="orderServiceList">
              <i-checkbox-group v-model="chooseBuyModel.orderServiceList" @on-change="disabledChange">
                <i-checkbox :value="368" :label="368" :disabled="disabled">无</i-checkbox>
                <i-checkbox :value="369" :label="369" :disabled="disabled1">购置税</i-checkbox>
                <i-checkbox :value="370" :label="370" :disabled="disabled1">保险费</i-checkbox>
                <i-checkbox :value="371" :label="371" :disabled="disabled1">上牌费</i-checkbox>
                <i-checkbox :value="372" :label="372" :disabled="disabled1">路桥费</i-checkbox>
                <i-checkbox :value="373" :label="373" :disabled="disabled1">首期租金</i-checkbox>
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
            <i-select v-model="chooseBuyModel.intentionPeriods">
              <i-option v-for="{value,label} in $dict.getDictData('0435')" :key="value" :label="label" :value="value"></i-option>
            </i-select>
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
            <span style="position:absolute;left:300px">%</span>
          </i-form-item>
        </i-col>
      </i-form>
    </i-row>
    <i-table :columns="carColumns" :data="addcarData" stripe style="margin:10px;" width="1100"></i-table>
    <div>
      <Icon type="plus" style="position:relative;left:26px;color:#265ea2"></Icon>
      <i-button @click="addModalOpen" style="margin-left:10px;color:#265ea2" type="text">添加车辆</i-button>
      <span style="margin-left:115px;font-weight:bold">总价</span><span style="margin-left:328px;font-weight:bold;">{{totalPrice}}</span>
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
            <!--<i-input type="text" v-model="chooseBuyModel.prdSeriods" disabled>
            </i-input>-->
            <span style="color:#ccc">{{chooseBuyModel.prdSeriods}}</span>
          </i-form-item>
        </i-col>
        <i-col span="12" pull="3">
          <i-form-item label="产品名称" prop="name">
            <!--<i-input type="text" v-model="chooseBuyModel.name" disabled>
            </i-input>-->
            <span style="color:#ccc">{{chooseBuyModel.name}}</span>
          </i-form-item>
        </i-col>
        <i-col span="12">
          <i-form-item label="产品期数" prop="periods">
            <!--<i-input type="text" v-model="chooseBuyModel.periods" disabled>
            </i-input>-->
            <span style="color:#ccc">{{$dict.getDictName(chooseBuyModel.periods)}}</span>
          </i-form-item>
        </i-col>
        <i-col span="12" pull="3">
          <i-form-item label="产品利率" prop="prdInterestRate">
            <!--<i-input type="text" v-model="chooseBuyModel.prdInterestRate" disabled>
            </i-input>-->
            <span style="color:#ccc">{{chooseBuyModel.prdInterestRate}}</span>
          </i-form-item>
        </i-col>
        <i-col span="12">
          <i-form-item label="还款方式" prop="payWay">
            <!--<i-select v-model="chooseBuyModel.payWay" disabled>
              <i-option v-for="{value,label} in $dict.getDictData('0408')" :key="value" :label="label" :value="value"></i-option>
            </i-select>-->
            <span style="color:#ccc">{{this.$dict.getDictName(chooseBuyModel.payWay)}}</span>
          </i-form-item>
        </i-col>
        <i-col span="12" pull="3">
          <i-form-item label="车辆参考总价" prop="vehicleAmount">
            <i-input type="text" v-model="chooseBuyModel.vehicleAmount" @on-blur="vehicleAmountChange">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12">
          <i-form-item label="尾付本金" prop="finalprincipal">
            <i-input type="text" v-model="chooseBuyModel.finalprincipal" @on-change="finalprincipalChange">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12" pull="3">
          <i-form-item label="月供金额" prop="moneyPay">
            <i-input type="text" v-model="chooseBuyModel.moneyPay" readonly>
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12">
          <i-form-item label="首付金额" prop="initialPayment">
            <i-row>
              <i-select style="width:140px" placeholder="请选择首付金额比例" v-model="chooseBuyModel.Payment" clearable @on-change="chooseinitialPayment">
                <i-option v-for="item in initialPaymentData" :key="item" :value="item" :label="item"></i-option>
              </i-select>
              <i-input style="width:180px" type="text" v-model="chooseBuyModel.initialPayment" readonly>
              </i-input>
            </i-row>
          </i-form-item>
        </i-col>
        <i-col span="12" pull="3">
          <i-form-item label="保证金金额" prop="depositCash">
            <i-row>
              <i-select style="width:140px" placeholder="请选择保证金金额比例" v-model="chooseBuyModel.deposit" clearable @on-change="choosedeposit">
                <i-option v-for="item in depositCashData" :key="item" :value="item" :label="item"></i-option>
              </i-select>
              <i-input style="width:180px" v-model="chooseBuyModel.depositCash" readonly>
              </i-input>
            </i-row>
          </i-form-item>
        </i-col>
        <i-col span="12">
          <i-form-item label="尾付总额" prop="finalCash">
            <i-row>
              <i-select style="width:140px" placeholder="请选择尾付总额比例" v-model="chooseBuyModel.final" clearable @on-change="choosefinalCash">
                <i-option v-for="item in finalCashData" :key="item" :value="item" :label="item"></i-option>
              </i-select>
              <i-input style="width:180px" v-model="chooseBuyModel.finalCash" readonly>
              </i-input>
            </i-row>
          </i-form-item>
        </i-col>
        <i-col span="12" pull="3">
          <i-form-item label="管理费" prop="manageCost">
            <i-row>
              <i-select style="width:140px" placeholder="请选择管理费比例" v-model="chooseBuyModel.manageData" clearable @on-change="choosemanageCost">
                <i-option v-for="item in manageCostData" :key="item" :value="item" :label="item"></i-option>
              </i-select>
              <i-input style="width:180px" v-model="chooseBuyModel.manageCost" readonly>
              </i-input>
            </i-row>
          </i-form-item>
        </i-col>
        <i-col span="12">
          <i-form-item label="保险费" prop="insuranceMoney">
            <i-input type="text" v-model="chooseBuyModel.insuranceMoney">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12" pull="3">
          <i-form-item label="购置税" prop="purchaseMoney">
            <i-input type="text" v-model="chooseBuyModel.purchaseMoney">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12">
          <i-form-item label="上牌费" prop="licenseMoney">
            <i-input type="text" v-model="chooseBuyModel.licenseMoney">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12" pull="3">
          <i-form-item label="GPS费" prop="GpsMoney">
            <i-input type="text" v-model="chooseBuyModel.GpsMoney">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12">
          <i-form-item label="其他费用" prop="otherFee">
            <i-input type="text" v-model="chooseBuyModel.otherFee">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12" pull="3">
          <i-form-item label="备注" prop="remark">
            <i-input type="text" v-model="chooseBuyModel.remark">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="24">
          <i-form-item label="融资总额" prop="financeTotalMoney">
            <i-input type="text" v-model="chooseBuyModel.financeTotalMoney" readonly>
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
        <add-car ref="add-car" :addOpen="addOpen" @distributionData="distributionData" :addcarData.sync="addcarData" :rowData.sync="rowData" @close="editCarModal=false,rowData=null"></add-car>
      </i-modal>
    </template>

    <template>
      <i-modal v-model="addProductModal" title="添加产品" width="1000" class="add-car">
        <add-product @currentRowData="currentRowData" @close="addProductModal=false" @productPlanissue="productPlanissue"></add-product>
      </i-modal>
    </template>
  </section>
</template>

<script lang="tsx">
  import Vue from "vue";
  import Component from "vue-class-component";
  import { State, Mutation, namespace } from "vuex-class";
  import { ApplyQueryService } from "~/services/business-service/apply-query.service";
  import { Dependencies } from "~/core/decorator";
  import AddCar from "~/components/purchase-manage/add-car.tsx.vue"
  import SvgIcon from '~/components/common/svg-icon.vue'
  import DataBox from "~/components/common/data-box.vue"
  import SimulateCalculate from "~/components/common/simulate-calculate.vue"
  import AddProduct from '~/components/purchase-manage/add-product.tsx.vue'
  import { CompanyService } from "~/services/manage-service/company.service";
  import { Prop } from "vue-property-decorator";
  import { Emit } from "vue-property-decorator";
  import {
    Input,
    Button
  } from "iview";
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
    private carData: any= [];
    private simulateCalculateModal: Boolean = false;
    private editCarModal: Boolean = false;
    private addOrEditFlag: Boolean = false;
    private prdInfoShow: Boolean = false;
    private buttonShow: Boolean = true;
    private addProductModal: Boolean = false;
    private addPrdShow: Boolean = true;
    private changePrdShow: Boolean = false;
    private companyObject: any= []; // 公司信息
    private addcarData: any = [];
    private rowData: any = null;
    private depositCashData: any = []; // 保证金
    private finalCashData: any = []; // 尾付金额
    private initialPaymentData: any = []; // 首付款
    private manageCostData: any = []; // 管理费
    private totalPrice: any = '';
    private DataSet: any = '';
    private disabled: Boolean = false;
    private disabled1: Boolean = false;
    private addOpen:Boolean = false;
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
      vehicleAmount: 0, // 车辆参考总价
      finalprincipal: '', // 尾付本金
      initialPayment: '', // 首付金额
      otherFee: 0, // 其他费用
      depositCash: '',
      manageCost: '',
      insuranceMoney: 0,
      purchaseMoney: 0,
      manageCostPercent: '',
      depositPercent: '',
      paymentScale: '',
      licenseMoney: 0,
      GpsMoney: 0
    };
    private rulesdata: any = {
      prdSeriods: [{ required: true, message: '请输入产品系列', trigger: 'blur' }],
      name:[{ required: true, message: '请输入产品名称', trigger: 'blur' }],
      periods:[{ required: true, message: '请输入产品期数', trigger: 'blur',type:'number' }],
      prdInterestRate:[{ required: true, message: '请输入产品利率', trigger: 'blur',type:'number' }],
      payWay:[{ required: true, message: '请输入还款方式', trigger: 'blur',type:'number' }],
      vehicleAmount:[{ required: true, message: '请输入车辆参考总价', trigger: 'blur' },
                     { pattern: /^\d+$/,message: '请输入数字', trigger: 'blur' }],
      finalprincipal:[{ required: true, message: '请输入尾付本金', trigger: 'blur' },
                      { pattern: /^\d+$/,message: '请输入数字', trigger: 'blur' }],
      financeTotalMoney: [{ required: true, message: '请输入融资总额', trigger: 'blur' }],
      moneyPay:[{ required: true, message: '请输入月供金额', trigger: 'blur' }],
      initialPayment:[{ required: true, message: '请输入首付金额', trigger: 'blur' }],
      depositCash:[{ required: true, message: '请输入保证金金额', trigger: 'blur' }],
      finalCash:[{ required: true, message: '请输入尾付总额', trigger: 'blur' }],
      manageCost:[{ required: true, message: '请输入管理费', trigger: 'blur' }],
    };
    private rules: any = {
      intentionPeriods: [{ required: true, message: '请输入意向期限', trigger: 'change', type:'number' }],
      province: [{ required: true, message: '请选择申请省份', trigger: 'change', type: 'number' }],
      city: [{ required: true, message: '请选择申请城市', trigger: 'change', type: 'number'}],
      orderServiceList: [{ required: true, message: '请选择自缴费用', trigger: 'change', type: 'array' }],
      financingUse: [{ required: true, message: '请输入融资租赁用途', trigger: 'blur' }],
      intentionPaymentRatio: [{ required: true, message: '请输入意向首付比例', trigger: 'blur' },
                              { pattern: /^\d+$/,message: '请输入数字', trigger: 'blur' }],
      intentionFinancingAmount:[{ required: true, message: '请输入意向融资金额', trigger: 'blur' },
                                { pattern: /^\d+$/,message: '请输入数字', trigger: 'blur' }]
    };

    @Prop()
    disabledStatus: String;
    disabledChange() {
      if (this.chooseBuyModel.orderServiceList) {
        if (this.chooseBuyModel.orderServiceList.find(v => v !== 368)) {
          this.disabled = true
        }
        if (this.chooseBuyModel.orderServiceList.find(v => v === 368)) {
          this.disabled1 = true
        }
      }
      if (this.chooseBuyModel.orderServiceList.length === 0) {
        this.disabled = false
        this.disabled1 = false
      }
    }
    /**
     * 数据反显
     */
    Reverse(data) {
      console.log('reverse')
      data.orderServiceList = data.orderServices.map(v => v.service)
      data.intentionPeriods = Number(data.intentionPeriods)
      data.intentionPaymentRatio=data.intentionPaymentRatio.toString()
      data.intentionFinancingAmount=data.intentionFinancingAmount.toString()
      this.chooseBuyModel = data
    }
    /**
     * 融资总额
     */
    getFinanceTotalMoney() {
      if(this.chooseBuyModel.vehicleAmount&&this.chooseBuyModel.finalprincipal&&this.chooseBuyModel.initialPayment){
        this.chooseBuyModel.financeTotalMoney = (Number(this.chooseBuyModel.vehicleAmount) - Number(this.chooseBuyModel.finalprincipal) - Number(this.chooseBuyModel.initialPayment)).toFixed(2)
        this.chooseBuyModel.financeTotalMoney.toString()
    } else {
        this.chooseBuyModel.financeTotalMoney = ''
      }
      this.chooseBuyModel.deposit = ''
      this.chooseBuyModel.manageData = ''
      this.chooseBuyModel.moneyPay = ''
      //   月供金额
      if(this.chooseBuyModel.financeTotalMoney) {
        this.chooseBuyModel.moneyPay = (Number(this.chooseBuyModel.financeTotalMoney) * (1 + Number(this.DataSet.productRate) * 0.01*this.$dict.getDictName(this.chooseBuyModel.periods)) / Number(this.$dict.getDictName(this.DataSet.periods))).toFixed(2)
        this.chooseBuyModel.moneyPay.toString()
    }
    }
    /**
     * 管理费
     */
    choosemanageCost() {
      // 管理费=融资总额*管理费率
      if(this.chooseBuyModel.financeTotalMoney&&this.chooseBuyModel.manageData){
        this.chooseBuyModel.manageCost = (Number(this.chooseBuyModel.financeTotalMoney) * (Number(this.chooseBuyModel.manageData) * 0.01)).toFixed(2)
        this.chooseBuyModel.manageCost.toString()
    } else {
        this.chooseBuyModel.manageCost = ''
      }
      this.chooseBuyModel = JSON.parse(JSON.stringify(this.chooseBuyModel))
    }
    /**
     * 尾付本金
     */
    finalprincipalChange() {
      if (Number(this.chooseBuyModel.finalprincipal)>0) {
      } else {
        this.chooseBuyModel.finalprincipal = ''
      }
      this.getFinanceTotalMoney()
    }
    /**
     * 车辆参考总价更改
     */
    vehicleAmountChange() {
      if (Number(this.chooseBuyModel.vehicleAmount)>0) {
      } else {
        this.chooseBuyModel.vehicleAmount = ''
      }
      this.getFinanceTotalMoney()
    }
    /**
     * 首付金额
     */
    chooseinitialPayment() {
      // 首付金额=车辆参考总价*首付比例
      if(this.chooseBuyModel.Payment !== '' && this.chooseBuyModel.vehicleAmount){
        this.chooseBuyModel.initialPayment = ((Number(this.chooseBuyModel.vehicleAmount)) * (Number(this.chooseBuyModel.Payment) * 0.01)).toFixed(2)
        this.chooseBuyModel.initialPayment.toString()
    } else {
        this.chooseBuyModel.initialPayment = ''
      }
      this.getFinanceTotalMoney()      
    }
    /**
     * 保证金金额
     */
    choosedeposit() {
      // 保证金金额=融资总额*保证金比例
      if(this.chooseBuyModel.deposit !== '' && this.chooseBuyModel.financeTotalMoney){
        this.chooseBuyModel.depositCash = (Number(this.chooseBuyModel.financeTotalMoney) * Number(this.chooseBuyModel.deposit) * 0.01).toFixed(2)
        this.chooseBuyModel.depositCash.toString()
      } else {
        this.chooseBuyModel.depositCash = ''
      }
      this.chooseBuyModel = JSON.parse(JSON.stringify(this.chooseBuyModel))      
    }
    /**
     * 尾付总额
     */
    choosefinalCash() {
      // 尾付总额（尾款本金+尾付利息）
      this.chooseBuyModel.finalCash = (Number(this.chooseBuyModel.finalprincipal) * (1 + Number(this.DataSet.finalCash) * 0.01)*this.$dict.getDictName(this.chooseBuyModel.periods)).toFixed(2)
      this.chooseBuyModel.finalCash.toString()
}
    /**
     * 添加车辆信息
     */
    distributionData(data) {
      this.addcarData = data
      let sum:any=0
      data.forEach(v=>{
        sum=sum+(Number(v.carAmount)||0)
      })
      this.totalPrice=sum
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
          console.log(val,'val')
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
                      this.addOpen=false
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
          align: 'center',
            render: (h, {
              row,
              column,
              index
            }) => {
       let removeHandle = (ss) => {
            let ssf:any=ss.target.value
              this.addcarData[index].carAmount = ssf
              let patt1:any = /[0-9]+/;
              if(!patt1.test(ssf)){
                  ss.target.value=0
                  this.addcarData[index].carAmount = ssf
              }
             let sum:any=0;
             this.addcarData.forEach(v=>{
                    sum=sum+(Number(v.carAmount)||0)
                }); 
            this.totalPrice=sum
            };
            return ( 
                <i-input style="width:80px" onOn-blur={removeHandle} value={row.carAmount}> </i-input>);
            }
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
      this.addOpen=true
      this.addOrEditFlag = true
      this.editCarModal = true
      // 清空添加车辆信息
      let addcarRefresh:any=this.$refs['add-car']
      addcarRefresh.getCarseries()
      addcarRefresh.resetcarDataModel()
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
      this.chooseBuyModel.vehicleAmount = this.totalPrice.toString()
      this.chooseBuyModel.seriesId = productDataModel.seriesId
    }
    productPlanissue(data) {
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
      width: 100%!important;
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
