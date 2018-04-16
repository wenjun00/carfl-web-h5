<!--选购材料-->
<template>
  <section class="component choose-buy-materials">
    <i-col span="24" style="line-height:30px" class="form-title">选购信息</i-col>
    <i-row>
      <i-form ref="customer-form" :rules="rules" :model="chooseBuyModel" :label-width="130" style="margin-top:20px;position:relative;left:16px;"
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
                <i-option v-if="companyObject.length===0" value="" readonly>暂无数据</i-option>
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
            <i-form-item label="意向融资金额（元）" prop="intentionFinancingAmount">
              <i-input :maxlength="14" type="text" v-model="chooseBuyModel.intentionFinancingAmount" @on-blur="intentionFinancingAmountBlur">
              </i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="12">
            <i-form-item label="意向期限（期）" prop="intentionPeriods">
            <i-select v-model="chooseBuyModel.intentionPeriods">
              <i-option v-for="{value,label} in $dict.getDictData('0435')" :key="value" :label="label" :value="value"></i-option>
            </i-select>
            </i-form-item>
          </i-col>
          <i-col span="12" pull="3">
            <i-form-item label="意向月供（元）" prop="rentPayable">
              <i-input :maxlength="14" type="text" v-model="chooseBuyModel.rentPayable" @on-blur="rentPayableBlur">
              </i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <i-col span="12">
          <i-form-item label="意向首付比例（%）" prop="intentionPaymentRatio">
            <i-input :maxlength="4" type="text" v-model="chooseBuyModel.intentionPaymentRatio">
            </i-input>
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
      <i-form ref="form" :rules="rulesdata" :model="chooseBuyModel" :label-width="130" style="margin-top:20px;">
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
          <i-form-item label="产品期数（期）" prop="periods">
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
          <i-form-item label="车辆参考总价（元）" prop="vehicleAmount">
            <i-input :maxlength="14" type="text" v-model="chooseBuyModel.vehicleAmount" @on-change="vehicleAmountChange" @on-blur="vehicleAmountBlur">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12">
          <i-form-item label="尾付本金（元）" prop="finalprincipal">
            <i-input :maxlength="14" type="text" v-model="chooseBuyModel.finalprincipal" @on-change="finalprincipalChange" :readonly="finaldisabled" @on-blur="finalprincipalBlur">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12" pull="3">
          <i-form-item label="月供金额（元）" prop="moneyPay">
            <i-input type="text" v-model="chooseBuyModel.moneyPay" readonly>
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12">
            <i-row>
          <i-form-item label="首付金额（元）" prop="Payment" style="display:inline-block">
              <i-select style="width:140px" placeholder="请选择首付金额比例" v-model="chooseBuyModel.Payment" clearable @on-change="chooseinitialPayment" :disabled="Paymentdisabled">
                <i-option v-for="item in initialPaymentData" :key="item.key" :value="item.value" :label="item.key"></i-option>
              </i-select>
          </i-form-item>
          <i-form-item prop="initialPayment" style="display:inline-block">
              <i-input style="width:180px" type="text" v-model="chooseBuyModel.initialPayment" readonly>
              </i-input>
          </i-form-item>
            </i-row>
        </i-col>
        <i-col span="12" pull="3">
            <i-row>
          <i-form-item label="保证金金额（元）" prop="deposit" style="display:inline-block">
              <i-select style="width:140px" placeholder="请选择保证金金额比例" v-model="chooseBuyModel.deposit" clearable @on-change="choosedeposit" :disabled="depositdisabled">
                <i-option v-for="item in depositCashData" :key="item.key" :value="item.value" :label="item.key"></i-option>
              </i-select>
          </i-form-item>
             <i-form-item prop="depositCash" style="display:inline-block">  
              <i-input style="width:180px" v-model="chooseBuyModel.depositCash" readonly>
              </i-input>
        </i-form-item>
            </i-row>
        </i-col>
        <i-col span="12">
            <i-row>
          <i-form-item label="尾付总额（元）" prop="final" style="display:inline-block">
              <i-select style="width:140px" placeholder="请选择尾付总额比例" v-model="chooseBuyModel.final" clearable @on-change="choosefinalCash" :disabled="finalorddisabled">
                <i-option v-for="item in finalCashData" :key="item.key" :value="item.value" :label="item.key"></i-option>
              </i-select>
          </i-form-item>
               <i-form-item  prop="finalCash" style="display:inline-block">
              <i-input style="width:180px" v-model="chooseBuyModel.finalCash" readonly>
              </i-input>
               </i-form-item>
            </i-row>
        </i-col>
        <i-col span="12" pull="3">
            <i-row>
          <i-form-item label="管理费（元）" prop="manageData" style="display:inline-block">
              <i-select style="width:140px" placeholder="请选择管理费比例" v-model="chooseBuyModel.manageData" clearable @on-change="choosemanageCost" :disabled="manageDatadisabled">
                <i-option v-for="item in manageCostData" :key="item.key" :value="item.value" :label="item.key"></i-option>
              </i-select>
          </i-form-item>
              <i-form-item prop="manageCost" style="display:inline-block">
              <i-input style="width:180px" v-model="chooseBuyModel.manageCost" readonly>
              </i-input>
              </i-form-item>
            </i-row>
        </i-col>
        <i-col span="12">
          <i-form-item label="保险费（元）" prop="insuranceMoney">
            <i-input :maxlength="14" type="text" v-model="chooseBuyModel.insuranceMoney" @on-blur="insuranceMoneyBlur">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12" pull="3">
          <i-form-item label="购置税（元）" prop="purchaseMoney">
            <i-input :maxlength="14" type="text" v-model="chooseBuyModel.purchaseMoney" @on-blur="purchaseMoneyBlur">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12">
          <i-form-item label="上牌费（元）" prop="licenseMoney">
            <i-input :maxlength="14" type="text" v-model="chooseBuyModel.licenseMoney" @on-blur="licenseMoneyBlur">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12" pull="3">
          <i-form-item label="GPS费（元）" prop="GpsMoney">
            <i-input :maxlength="14" type="text" v-model="chooseBuyModel.GpsMoney" @on-blur="GpsMoneyBlur">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12">
          <i-form-item label="其他费用（元）" prop="otherFee">
            <i-input :maxlength="14" type="text" v-model="chooseBuyModel.otherFee" @on-blur="otherFeeBlur">
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
          <i-form-item label="融资总额（元）" prop="financeTotalMoney">
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
      <i-modal :title="addOrEditFlag?'添加车辆':'编辑车辆'" width="80" v-model="editCarModal" :mask-closable="false" :trandfer="false" class="add-car">
        <add-car @complutedtotalPrice="complutedtotalPrice" ref="add-car" :addOpen="addOpen" @distributionData="distributionData" :addcarData.sync="addcarData" :rowData.sync="rowData" :index="index" @close="editCarModal=false,rowData=null"></add-car>
      </i-modal>
    </template>

    <template>
      <i-modal v-model="addProductModal" :mask-closable="false" title="添加产品" width="1000" class="add-car">
        <add-product ref="add-product" @resetProductData="resetProductData" @currentRowData="currentRowData" @close="addProductModal=false" @productPlanissue="productPlanissue"></add-product>
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
    private DataSet: any = {};
    private disabled: Boolean = false;
    private disabled1: Boolean = false;
    private depositdisabled:Boolean = false;
    private Paymentdisabled:Boolean = false;
    private finaldisabled:Boolean = false;
    private finalorddisabled:Boolean = false;
    private manageDatadisabled:Boolean = false;
    private addOpen:Boolean = false;
    private index:any='';
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
                     { pattern: /^[0-9]+([.]{1}[0-9]+){0,1}$/,message: '请输入数字', trigger: 'blur' }],
      finalprincipal:[{ required: true, message: '请输入尾付本金', trigger: 'blur' },
                      { pattern: /^[0-9]+([.]{1}[0-9]+){0,1}$/,message: '请输入数字', trigger: 'blur' }],
      financeTotalMoney: [{ required: true, message: '请输入融资总额', trigger: 'blur' }],
    //   moneyPay:[{ required: true, message: '请输入月供金额', trigger: 'blur' }],
      initialPayment:[{ required: true, message: '请输入首付金额', trigger: 'blur' }],
      depositCash:[{ required: true, message: '请输入保证金金额', trigger: 'blur' }],
      finalCash:[{ required: true, message: '请输入尾付总额', trigger: 'blur' }],
      manageCost:[{ required: true, message: '请输入管理费', trigger: 'blur' }],
      insuranceMoney:[{pattern: /^[0-9]+([.]{1}[0-9]+){0,1}$/,message: '请输入数字', trigger: 'blur' }],
      purchaseMoney:[{pattern: /^[0-9]+([.]{1}[0-9]+){0,1}$/,message: '请输入数字', trigger: 'blur' }],
      licenseMoney:[{pattern: /^[0-9]+([.]{1}[0-9]+){0,1}$/,message: '请输入数字', trigger: 'blur' }],
      GpsMoney:[{pattern: /^[0-9]+([.]{1}[0-9]+){0,1}$/,message: '请输入数字', trigger: 'blur' }],
      otherFee:[{pattern: /^[0-9]+([.]{1}[0-9]+){0,1}$/,message: '请输入数字', trigger: 'blur'}]
    };
    private rules: any = {
      intentionPeriods: [{ required: true, message: '请输入意向期限', trigger: 'change', type:'number' }],
      province: [{ required: true, message: '请选择申请省份', trigger: 'change', type: 'number' }],
      city: [{ required: true, message: '请选择申请城市', trigger: 'change', type: 'number'}],
      orderServiceList: [{ required: true, message: '请选择自缴费用', trigger: 'change', type: 'array' }],
      financingUse: [{ required: true, message: '请输入融资租赁用途', trigger: 'blur' }],
      intentionPaymentRatio: [{ required: true, message: '请输入意向首付比例', trigger: 'blur' },
                              { pattern: /^[0-9]+([.]{1}[0-9]+){0,1}$/,message: '请输入数字', trigger: 'blur' }],
      intentionFinancingAmount:[{ required: true, message: '请输入意向融资金额', trigger: 'blur' },
                                { pattern: /^[0-9]+([.]{1}[0-9]+){0,1}$/,message: '请输入数字', trigger: 'blur' }],
      rentPayable:[{pattern: /^[0-9]+([.]{1}[0-9]+){0,1}$/,message: '请输入数字', trigger: 'blur'}]
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
    resetProductData(){
        this.chooseBuyModel.prdSeriods=''
        this.chooseBuyModel.name=''
        this.chooseBuyModel.periods=''
        this.chooseBuyModel.prdInterestRate=''
        this.chooseBuyModel.payWay=''
        this.chooseBuyModel.vehicleAmount=''
        this.chooseBuyModel.finalprincipal=''
        this.chooseBuyModel.moneyPay=''
        this.chooseBuyModel.initialPayment=''
        this.chooseBuyModel.depositCash=''
        this.chooseBuyModel.finalCash=''
        this.chooseBuyModel.manageCost=''
        this.chooseBuyModel.insuranceMoney=''
        this.chooseBuyModel.purchaseMoney=''
        this.chooseBuyModel.licenseMoney=''
        this.chooseBuyModel.GpsMoney=''
        this.chooseBuyModel.otherFee=''
        this.chooseBuyModel.remark=''
        this.chooseBuyModel.financeTotalMoney=''
        this.chooseBuyModel.Payment=''
        this.chooseBuyModel.deposit=''
        this.chooseBuyModel.final=''
        this.chooseBuyModel.manageData=''
    }
    closeProductForm(){
    this.prdInfoShow=false
    this.changePrdShow=false
    this.addPrdShow=true
    this.resetProductData()
}
    /**
     * 意向月供金额（小数点保留两位）
     */
    rentPayableBlur(){
        this.chooseBuyModel.rentPayable=Number(this.chooseBuyModel.rentPayable).toFixed(2).toString()
    }
    /**
     * 意向融资金额（小数点保留两位）
     */
    intentionFinancingAmountBlur(){
        this.chooseBuyModel.intentionFinancingAmount=Number(this.chooseBuyModel.intentionFinancingAmount).toFixed(2).toString()
    }
    /**
     * 尾付本金（小数点保留两位）
     */
    finalprincipalBlur(){
        this.chooseBuyModel.finalprincipal=Number(this.chooseBuyModel.finalprincipal).toFixed(2).toString()
}
    /**
     * 保险费（小数点保留两位）
     */
    insuranceMoneyBlur(){
        this.chooseBuyModel.insuranceMoney=Number(this.chooseBuyModel.insuranceMoney).toFixed(2).toString()
    }
    /**
     * 购置税（小数点保留两位）
     */
    purchaseMoneyBlur(){
        this.chooseBuyModel.purchaseMoney=Number(this.chooseBuyModel.purchaseMoney).toFixed(2).toString()
        console.log(this.chooseBuyModel.purchaseMoney,'this.chooseBuyModel.purchaseMoney')
    }
    /**
     * 上牌费（小数点保留两位）
     */
    licenseMoneyBlur(){
        this.chooseBuyModel.licenseMoney=Number(this.chooseBuyModel.licenseMoney).toFixed(2).toString()
    }
    /**
     * GPS费（小数点保留两位）
     */
    GpsMoneyBlur(){
        this.chooseBuyModel.GpsMoney=Number(this.chooseBuyModel.GpsMoney).toFixed(2).toString()
    }
    /**
     * 其他费用(小数点保留两位)
     */
    otherFeeBlur(){
        this.chooseBuyModel.otherFee=Number(this.chooseBuyModel.otherFee).toFixed(2).toString()
    }
    /**
     * 数据反显
     */
    Reverse(data,orderStatus) {
      data.orderServiceList = data.orderServices.map(v => v.service)
      if (data.orderServiceList.find(v => v === 368)) {
          this.disabled1 = true
        }
      if (data.orderServiceList.find(v => v !== 368)) {
          this.disabled = true
        }
      data.intentionPeriods = Number(data.intentionPeriods)
      data.intentionPaymentRatio=data.intentionPaymentRatio?data.intentionPaymentRatio.toString():''
      data.intentionFinancingAmount=data.intentionFinancingAmount?data.intentionFinancingAmount.toString():''
      this.chooseBuyModel = data
      if(orderStatus===303){
          console.log(data,'666')
          this.addcarData=data.orderCars
          if(data.payWay){
              this.flag=false
              this.addPrdShow=false
              this.prdInfoShow=true
              this.changePrdShow=true
           
              this.chooseBuyModel.moneyPay=data.monthlySupply.toFixed(2).toString() // 月供金额
              this.totalPrice=data.vehicleAmount.toFixed(2).toString()
              this.chooseBuyModel.vehicleAmount=this.totalPrice
              this.chooseBuyModel.GpsMoney=data.gpsFee.toFixed(2).toString() // GPS费
              this.chooseBuyModel.insuranceMoney=data.insuranceExpenses.toFixed(2).toString() // 保险费
              this.chooseBuyModel.purchaseMoney=data.purchaseTax.toFixed(2).toString() // 购置税
              this.chooseBuyModel.licenseMoney=data.installLicenseFee.toFixed(2).toString() // 上牌费
              this.chooseBuyModel.name=data.product.name // 产品名称
              this.chooseBuyModel.prdInterestRate=data.productRate // 产品利率
              this.chooseBuyModel.financeTotalMoney=data.financingAmount.toFixed(2).toString() // 融资总额
              this.chooseBuyModel.finalprincipal=data.finalPayment.toFixed(2).toString() // 尾付本金
             
        //       this.chooseBuyModel.moneyPay = (Number(this.chooseBuyModel.financeTotalMoney) * (1 + Number(this.chooseBuyModel.prdInterestRate) * this.$dict.getDictName(this.chooseBuyModel.periods)) / Number(this.$dict.getDictName(this.DataSet.periods))).toFixed(2)
        // this.chooseBuyModel.moneyPay.toString()
   
                setTimeout(()=>{
             this.initialPaymentData.push({
              key:data.paymentScale*100+'%',
              value:data.paymentScale*100
          })
            for (let i = 0; i < this.initialPaymentData.length - 1; i++) {
            for (let j = 1; j < this.initialPaymentData.length; j++) {
                if (i != j) {
                    if (this.initialPaymentData[i].key == this.initialPaymentData[j].key) {
                        this.initialPaymentData.splice(j, 1)
                    }
                }

            }
        }
         this.chooseBuyModel.Payment=this.initialPaymentData[0].value // 首付比例
          },100)
               setTimeout(()=>{
           this.manageCostData.push({
              key:data.manageCostPercent*100+'%',
              value:data.manageCostPercent*100
          })
             for (let i = 0; i < this.manageCostData.length - 1; i++) {
            for (let j = 1; j < this.manageCostData.length; j++) {
                if (i != j) {
                    if (this.manageCostData[i].key == this.manageCostData[j].key) {
                        this.manageCostData.splice(j, 1)
                    }
                }

            }
        }
         this.chooseBuyModel.manageData=this.manageCostData[0].value // 管理费比例
          },100)
              setTimeout(()=>{
         this.depositCashData.push({
              key:data.depositPercent*100+'%',
              value:data.depositPercent*100
          })
             for (let i = 0; i < this.depositCashData.length - 1; i++) {
            for (let j = 1; j < this.depositCashData.length; j++) {
                if (i != j) {
                    if (this.depositCashData[i].key == this.depositCashData[j].key) {
                        this.depositCashData.splice(j, 1)
                    }
                }

            }
        }
         this.chooseBuyModel.deposit= this.depositCashData[0].value // 保证金比例
          },100)
          console.log(data.productId,'productId')
              this.chooseBuyModel.prdSeriods=data.productSeries.name // 产品系列
              this.DataSet.productId=data.productId // 产品id
              this.DataSet.id=data.productIssueId // 期数id
              this.chooseBuyModel.seriesId=data.seriesId // 系列id
          }
      }
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
    //   this.chooseBuyModel.deposit = ''
    //   this.chooseBuyModel.manageData = ''
    //   this.chooseBuyModel.moneyPay = ''
      //   月供金额
       if(this.flag){
          this.flag=true
        if(this.chooseBuyModel.financeTotalMoney) {
                this.chooseBuyModel.moneyPay = (Number(this.chooseBuyModel.financeTotalMoney) * (1 + Number(this.chooseBuyModel.prdInterestRate) * this.$dict.getDictName(this.chooseBuyModel.periods)) / Number(this.$dict.getDictName(this.DataSet.periods))).toFixed(2)
                this.chooseBuyModel.moneyPay.toString()
            }
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
    }
      this.chooseBuyModel = JSON.parse(JSON.stringify(this.chooseBuyModel))
    }
    /**
     * 尾付本金
     */
    finalprincipalChange() {
    //   if (Number(this.chooseBuyModel.finalprincipal)>0) {
    //   } else {
    //     this.chooseBuyModel.finalprincipal = ''
    //   }
    if(this.chooseBuyModel.finalprincipal&&this.DataSet.finalCash){
        this.finalorddisabled=false
    }
      this.getFinanceTotalMoney()
    }
    vehicleAmountChange(){
    if(this.chooseBuyModel.vehicleAmount&&this.DataSet.depositCash){
       this.depositdisabled=false // 保证金金额比例输入框
    }
    if(this.chooseBuyModel.vehicleAmount&&this.DataSet.finalCash){
      this.finaldisabled=false
    }
    if(this.chooseBuyModel.vehicleAmount&&this.DataSet.initialPayment){
       this.Paymentdisabled=false
    }
    if(this.chooseBuyModel.vehicleAmount&&this.DataSet.manageCost){
      this.manageDatadisabled=false
    }
    }
    /**
     * 车辆参考总价更改
     */
    vehicleAmountBlur() {
    this.chooseBuyModel.vehicleAmount=Number(this.chooseBuyModel.vehicleAmount).toFixed(2).toString()
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
        console.log(this.chooseBuyModel.initialPayment,'this.chooseBuyModel.initialPayment')
    }
    this.chooseBuyModel = JSON.parse(JSON.stringify(this.chooseBuyModel))
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
      }
      this.chooseBuyModel = JSON.parse(JSON.stringify(this.chooseBuyModel))
    }
    /**
     * 尾付总额
     */
    choosefinalCash() {
      // 尾付总额（尾款本金+尾付利息）
      this.chooseBuyModel.finalCash = (Number(this.chooseBuyModel.finalprincipal) * (1 + Number(this.chooseBuyModel.final) * 0.01 * this.$dict.getDictName(this.chooseBuyModel.periods))).toFixed(2)
      console.log(this.chooseBuyModel.finalprincipal,this.chooseBuyModel.final,this.chooseBuyModel.periods)
      console.log(this.chooseBuyModel.finalCash,'this.chooseBuyModel.finalCash')
      this.chooseBuyModel.finalCash.toString()
      this.chooseBuyModel = JSON.parse(JSON.stringify(this.chooseBuyModel))
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
      let addProductRefresh:any=this.$refs['add-product']
      addProductRefresh.treeList()
      addProductRefresh.resetcarData()

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
                      this.index=index
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
                          this.complutedtotalPrice()
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
              if(!this.chooseBuyModel.finalprincipal){
                  this.finalorddisabled=true
              }
             this.complutedtotalPrice()
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
    /**
     * 计算车辆总价
     */
    complutedtotalPrice(){
     let sum:any=0;
     this.addcarData.forEach(v=>{
         sum=sum+(Number(v.carAmount)||0)
         });
     this.totalPrice=sum.toFixed(2)
     this.chooseBuyModel.vehicleAmount=this.totalPrice
     this.chooseinitialPayment()
     this.choosedeposit()
     this.choosefinalCash()
     this.choosemanageCost()
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
      this.resetProductData()
      this.addProductModal = true
      this.prdInfoShow = true
      this.buttonShow = false
      this.addPrdShow = false
      this.changePrdShow = true
      let addProductRefresh:any=this.$refs['add-product']
      addProductRefresh.treeList()
      addProductRefresh.resetcarData()
    }
    /**
     * 获取添加产品信息
     */
    currentRowData(data, productDataModel) {
        this.depositCashData=[]
        this.finalCashData=[]
        this.initialPaymentData=[]
        this.manageCostData=[]
      this.DataSet = data
    if(data.depositCash){
      let deposit:any = data.depositCash ? (data.depositCash.split(';')) : ''
      deposit.forEach((v)=>{
          this.depositCashData.push({
              key:v+'%',
              value:v||0
          })
      })
        for (let i = 0; i < this.depositCashData.length - 1; i++) {
            for (let j = 1; j < this.depositCashData.length; j++) {
                if (i != j) {
                    if (this.depositCashData[i].key == this.depositCashData[j].key) {
                        this.depositCashData.splice(j, 1)
                    }
                }

            }
        }
    }
    
    if(data.finalCash){
     let rr:any = data.finalCash ? (data.finalCash.split(';')) : ''
          rr.forEach((v)=>{
          this.finalCashData.push({
              key:v+'%',
              value:v||0
          })
      })
        for (let i = 0; i < this.finalCashData.length - 1; i++) {
            for (let j = 1; j < this.finalCashData.length; j++) {
                if (i != j) {
                    if (this.finalCashData[i].key == this.finalCashData[j].key) {
                        this.finalCashData.splice(j, 1)
                    }
                }

            }
        }
      
    }
    
     if(data.initialPayment) {
     let initial:any = data.initialPayment ? (data.initialPayment.split(';')) : ''
              initial.forEach((v)=>{
          this.initialPaymentData.push({
              key:v+'%',
              value:v||0
          })
      })
        for (let i = 0; i < this.initialPaymentData.length - 1; i++) {
            for (let j = 1; j < this.initialPaymentData.length; j++) {
                if (i != j) {
                    if (this.initialPaymentData[i].key == this.initialPaymentData[j].key) {
                        this.initialPaymentData.splice(j, 1)
                    }
                }

            }
        }
     }
      if(data.manageCost){ 
      let manage:any = data.manageCost ? (data.manageCost.split(';')) : ''
         manage.forEach((v)=>{
          this.manageCostData.push({
              key:v+'%',
              value:v||0
          })
      })
        for (let i = 0; i < this.manageCostData.length - 1; i++) {
            for (let j = 1; j < this.manageCostData.length; j++) {
                if (i != j) {
                    if (this.manageCostData[i].key == this.manageCostData[j].key) {
                        this.manageCostData.splice(j, 1)
                    }
                }

            }
        }
    }
    
    //   this.depositCashData = data.depositCash ? (data.depositCash.split(';')) : ''
    //   this.finalCashData = data.finalCash ? (data.finalCash.split(';')) : ''
    //   this.initialPaymentData = data.initialPayment ? (data.initialPayment.split(';')) : ''
    //   this.manageCostData = data.manageCost ? (data.manageCost.split(';')) : ''
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
      if(this.totalPrice){
      this.chooseBuyModel.vehicleAmount = this.totalPrice.toString()
      }else{
      this.chooseBuyModel.vehicleAmount=''
    }
      console.log(data.depositCash,'data.depositCash')
      if(data.depositCash===undefined||data.depositCash===null){
         this.chooseBuyModel.depositCash= '0.00' // 保证金金额
         setTimeout(()=>{
        //  this.depositCashData=['0']
         this.depositCashData.push({
              key:0+'%',
              value:0
          })
         this.chooseBuyModel.deposit= this.depositCashData[0].value
          },100)
          this.depositdisabled=true
      }else{
        console.log(this.chooseBuyModel.vehicleAmount,'this.chooseBuyModel.vehicleAmountdfdfdfd')
        if(!this.chooseBuyModel.vehicleAmount){
          this.depositdisabled=true
        }else{
          this.depositdisabled=false
        }
      }
     if(data.initialPayment===undefined||data.initialPayment===null){
         this.chooseBuyModel.initialPayment='0.00' // 首付金额
         setTimeout(()=>{
        //  this.initialPaymentData=['0']
        this.initialPaymentData.push({
              key:0+'%',
              value:0
          })
         this.chooseBuyModel.Payment=this.initialPaymentData[0].value
          },100)
          this.Paymentdisabled=true
     }else{
          if(this.chooseBuyModel.vehicleAmount){
          this.Paymentdisabled=false
        }else{
           this.Paymentdisabled=true
        }
     }
     if(data.manageCost===undefined||data.manageCost===null){
         this.chooseBuyModel.manageCost='0.00' // 管理费
         setTimeout(()=>{
        //  this.manageCostData=['0']
           this.manageCostData.push({
              key:0+'%',
              value:0
          })
         this.chooseBuyModel.manageData=this.manageCostData[0].value
          },100)
        this.manageDatadisabled=true
     }else{
          if(this.chooseBuyModel.vehicleAmount){
          this.manageDatadisabled=false
        }else{
          this.manageDatadisabled=true
        }
     }
      if(data.finalCash===undefined||data.finalCash===null){
        this.chooseBuyModel.finalprincipal='0.00' // 尾付本金
         this.chooseBuyModel.finalCash='0.00' // 尾付总额
          setTimeout(()=>{
        //  this.finalCashData=['0']
          this.finalCashData.push({
              key:0+'%',
              value:0
          })
         this.chooseBuyModel.final=this.finalCashData[0].value
          },100)
        this.finaldisabled=true
        this.finalorddisabled=true
      }else{
        if(this.chooseBuyModel.vehicleAmount){
          this.finaldisabled=false
        }else{
          this.finaldisabled=true
          this.finalorddisabled=true
        }
      }
    // if(this.chooseBuyModel.vehicleAmount===''){
    //   this.depositdisabled=true
    //   this.Paymentdisabled=true
    //   this.manageDatadisabled=true
    // }
    // if(this.chooseBuyModel.finalprincipal===''){
    //   this.finaldisabled=true
    // }
      this.chooseBuyModel.seriesId = productDataModel.seriesId
      console.log(this.chooseBuyModel,'chooseBuyModel.vehicleAmount')
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
