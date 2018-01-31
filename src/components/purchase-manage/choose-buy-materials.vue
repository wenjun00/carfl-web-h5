<!--选购材料-->
<template>
  <section class="component choose-buy-materials">
    <i-col span="24" style="line-height:30px" class="form-title">选购信息</i-col>
    <i-row>
      <i-form ref="customer-form" :model="chooseBuyModel" :label-width="110" style="margin-top:20px;position:relative;left:16px;"
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
              <i-checkbox-group v-model="chooseBuyModel.orderServiceList" @on-change="dsdsdsd">
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
          <i-form-item label="意向首付比例" prop="hopeProportion">
            <i-input type="text" v-model="chooseBuyModel.hopeProportion">
            </i-input>
          </i-form-item>
        </i-col>
      </i-form>
    </i-row>
    <i-table :columns="carColumns" :data="addcarData" stripe style="margin:10px;" width="1100"></i-table>
    <div>
      <Icon type="plus" style="position:relative;left:26px;color:#265ea2"></Icon>
      <i-button @click="addModalOpen" style="margin-left:10px;color:#265ea2" type="text">添加车辆</i-button>
    </div>
    <i-col span="24" style="line-height:30px;margin-top:20px;" class="form-title">
      <span>产品信息</span>
      <!--<div style="font-size:14px;cursor:pointer;display:inline-block;color:#3367A7;position:absolute;left:52%;" @click="openSimulateCalculate">
        <svg-icon iconClass="jisuanqi"></svg-icon>
        <span style="font-size:12px;">月供模拟计算器</span>
      </div>-->
    </i-col>
    <!--<div v-show="addPrdShow">-->
    <Icon type="plus" style="position:relative;left:26px;color:#265ea2;"></Icon>
    <i-button @click="addNewPrd" style="margin-left:10px;color:#265ea2" type="text">添加产品</i-button>
    <!--</div>-->
    <i-row v-show="prdInfoShow">
      <i-form ref="customer-form" :model="chooseBuyModel" :label-width="110" style="margin-top:20px;">
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
          <i-form-item label="融资总额" prop="financeTotalMoney">
            <i-input type="text" v-model="chooseBuyModel.financeTotalMoney">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12">
          <i-form-item label="月供金额" prop="moneyPay">
            <i-input type="text" v-model="chooseBuyModel.moneyPay">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12" pull="3">
          <i-form-item label="首付金额" prop="downPayMoney">
            <i-input type="text" v-model="chooseBuyModel.downPayMoney">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12">
          <i-form-item label="保证金金额" prop="depositCash">
            <i-input type="text" v-model="chooseBuyModel.depositCash">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12" pull="3">
          <i-form-item label="尾付金额" prop="finalCash">
            <i-input type="text" v-model="chooseBuyModel.finalCash">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12">
          <i-form-item label="管理费" prop="manageCost">
            <i-input type="text" v-model="chooseBuyModel.manageCost">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12" pull="3">
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
          <i-form-item label="其他费用" prop="otherMoney">
            <i-input type="text" v-model="chooseBuyModel.otherMoney">
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
    private chooseBuyModel: any = {
      province: '', // 省份
      city: '', // 城市
      companyId: '', // 所属公司
      intentionFinancingAmount: '', // 意向融资金额
      intentionPeriods: '', // 意向期限
      rentPayable: '', // 租金支付
      intentionPaymentRatio: '', // 意向首付比例
      orderServiceList: [], // 自缴费用
      financingUse: '' // 融资租赁用途
    };

    // @Emit('productData')
    // productData(productId) {}
    @Prop()
    disabledStatus: String;
    /**
     * 添加车辆信息
     */
    distributionData(data) {
      this.addcarData = data
    }
    dsdsdsd(data) {
      console.log(57567576465456356)
      console.log(this.chooseBuyModel.orderServiceList, 7878676786875875)
      console.log(data, 800)
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
        this.companyObject = val.object
      })
      // 设置表单数据
      //   this.chooseBuyModel = {
      //     usedMode: '',
      //     hopeMoney: '',
      //     hopeTime: '',
      //     rentPay: '',
      //     hopeProportion: '',
      //     prdSeriods: '',
      //     prdName: '',
      //     periods: '',
      //     prdInterestRate: '',
      //     payWay: '',
      //     financeTotalMoney: '',
      //     moneyPay: '',
      //     downPayMoney: '',
      //     depositCash: '',
      //     finalCash: '',
      //     manageCost: '',
      //     purchaseMoney: '',
      //     licenseMoney: '',
      //     GpsMoney: '',
      //     otherMoney: '',
      //     remark: ''
      //   }
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
          key: 'vehicleColour',
          align: 'center'
        }, {
          title: '车辆排量',
          key: 'vehicleEmissions',
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
          align: 'center'
        }
      ]

      this.carData = []
    }
    // editModalOpen(row) {
    //   this.editCarModal = true
    // }
    addModalOpen() {
      this.addOrEditFlag = true
      this.editCarModal = true
    }
    confirmAndBack() {
      this.editCarModal = false
      // this.applyQueryService.addCarQueryData().subscribe(({
      //   val
      // }) => {
      //   this.carData = val
      // })
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
    currentRowData(data) {
      //   this.productData(data.productId)
      this.chooseBuyModel = {
        // prdSeriods: data.prdSeriods,
        periods: data.periods,
        prdInterestRate: data.prdInterestRate,
        payWay: data.payWay,
        financeTotalMoney: data.financeTotalMoney,
        moneyPay: data.moneyPay,
        downPayMoney: data.downPayMoney,
        depositCash: data.depositCash,
        finalCash: data.finalCash,
        manageCost: data.manageCost,
        insuranceMoney: data.insuranceMoney,
        purchaseMoney: data.purchaseMoney,
        licenseMoney: data.licenseMoney,
        GpsMoney: data.GpsMoney,
        otherMoney: data.otherMoney,
        remark: data.remark
      }
    }
    productPlanissue(data) {
      this.chooseBuyModel = {
        name: data.title // 产品名称
        // prdSeriods:
      }
    }
    confirmAndBackPrd() {
      this.addProductModal = false
      this.chooseBuyModel = {
        prdSeriods: '直租',
        prdName: '群泰融租',
        periods: '12期',
        prdInterestRate: '1.25',
        payWay: '等本等息',
        financeTotalMoney: '18122',
        moneyPay: '5584',
        downPayMoney: '20252',
        depositCash: '0',
        finalCash: '0',
        manageCost: '0',
        insuranceMoney: '0',
        purchaseMoney: '0',
        licenseMoney: '0',
        GpsMoney: '0',
        otherMoney: '0',
        remark: '无'
      }
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
