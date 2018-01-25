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
              <i-select>
                <i-option label="陕西" key="陕西" value="陕西"></i-option>
              </i-select>
            </i-form-item>
          </i-col>
          <i-col span="12" pull="3">
            <i-form-item label="申请城市" prop="city">
              <i-select>
                <i-option label="西安市" value="西安市" key="西安市"></i-option>
                <i-option label="宝鸡市" value="宝鸡市" key="宝鸡市"></i-option>
                <i-option label="咸阳市" value="咸阳市" key="咸阳市"></i-option>
                <i-option label="渭南市" value="渭南市" key="渭南市"></i-option>
                <i-option label="铜川市" value="铜川市" key="铜川市"></i-option>
                <i-option label="榆林市" value="榆林市" key="榆林市"></i-option>
                <i-option label="延安市" value="延安市" key="延安市"></i-option>
                <i-option label="汉中市" value="汉中市" key="汉中市"></i-option>
                <i-option label="安康市" value="安康市" key="安康市"></i-option>
                <i-option label="商洛市" value="商洛市" key="商洛市"></i-option>
              </i-select>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="12">
            <i-form-item label="所属公司" prop="company">
              <i-select>
                <i-option label="群泰西安" value="群泰西安" key="群泰西安"></i-option>
                <i-option label="群泰武汉" value="群泰武汉" key="群泰武汉"></i-option>
              </i-select>
            </i-form-item>
          </i-col>
          <i-col span="12" pull="3">
            <i-form-item label="自缴费用" prop="freeMoney">
              <i-checkbox-group>
                <i-checkbox label="无"></i-checkbox>
                <i-checkbox label="购置税"></i-checkbox>
                <i-checkbox label="保险费"></i-checkbox>
                <i-checkbox label="上牌费"></i-checkbox>
                <i-checkbox label="路桥费"></i-checkbox>
                <i-checkbox label="首期租金"></i-checkbox>
              </i-checkbox-group>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="12">
            <i-form-item label="融资租赁用途" prop="usedMode">
              <i-input type="text" v-model="chooseBuyModel.usedMode">
              </i-input>
            </i-form-item>
          </i-col>
          <i-col span="12" pull="3">
            <i-form-item label="意向融资金额" prop="hopeMoney">
              <i-input type="text" v-model="chooseBuyModel.hopeMoney">
              </i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="12">
            <i-form-item label="意向期限" prop="hopeTime">
              <i-select v-model="chooseBuyModel.hopeTime">
                <i-option label="1年" value="1年" key="1年"></i-option>
                <i-option label="2年" value="2年" key="2年"></i-option>
              </i-select>
            </i-form-item>
          </i-col>
          <i-col span="12" pull="3">
            <i-form-item label="租金支付" prop="rentPay">
              <i-input type="text" v-model="chooseBuyModel.rentPay">
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
    <i-table :columns="carColumns" :data="carData" stripe style="margin:10px;" width="1100"></i-table>
    <div>
      <Icon type="plus" style="position:relative;left:26px;color:#265ea2"></Icon>
      <i-button @click="addModalOpen" style="margin-left:10px;color:#265ea2" type="text">添加车辆</i-button>
    </div>
    <i-col span="24" style="line-height:30px;margin-top:20px;" class="form-title">
      <span>产品信息</span>
      <div style="font-size:14px;cursor:pointer;display:inline-block;color:#3367A7;position:absolute;left:52%;" @click="openSimulateCalculate">
        <svg-icon iconClass="jisuanqi"></svg-icon>
        <span style="font-size:12px;">月供模拟计算器</span>
      </div>
    </i-col>
    <div v-show="addPrdShow">
      <Icon type="plus" style="position:relative;left:26px;color:#265ea2;"></Icon>
      <i-button @click="addNewPrd" style="margin-left:10px;color:#265ea2" type="text">添加产品</i-button>
    </div>
    <i-row v-show="prdInfoShow">
      <i-form ref="customer-form" :model="chooseBuyModel" :label-width="110" style="margin-top:20px;">
        <i-col span="12">
          <i-form-item label="产品系列" prop="prdSeriods">
            <i-input type="text" v-model="chooseBuyModel.prdSeriods">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12" pull="3">
          <i-form-item label="产品名称" prop="prdName">
            <i-input type="text" v-model="chooseBuyModel.prdName">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12">
          <i-form-item label="产品期数" prop="prdPeriods">
            <i-input type="text" v-model="chooseBuyModel.prdPeriods">
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
          <i-form-item label="保证金金额" prop="promiseMoney">
            <i-input type="text" v-model="chooseBuyModel.promiseMoney">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12" pull="3">
          <i-form-item label="尾付金额" prop="lastPayMoney">
            <i-input type="text" v-model="chooseBuyModel.lastPayMoney">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12">
          <i-form-item label="管理费" prop="hopeProportion">
            <i-input type="text" v-model="chooseBuyModel.manageMoney">
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
      <i-modal :title="addOrEditFlag?'添加车辆':'编辑车辆'" width="80" v-model="editCarModal" :trandfer="false">
        <add-car></add-car>
        <div slot="footer">
          <i-button @click="confirmAndBack" class="blueButton">确认并返回</i-button>
        </div>
      </i-modal>
    </template>

    <template>
      <i-modal v-model="addProductModal" title="添加产品" width="1500">
        <add-product></add-product>
        <div slot="footer">
          <i-button @click="confirmAndBackPrd" class="blueButton">确认并返回</i-button>
        </div>
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
    Prop
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
    private chooseBuyModel: any;
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
    @Prop()
    disabledStatus: String;

    @Dependencies(ApplyQueryService) private applyQueryService: ApplyQueryService;

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
      // 设置表单数据
      this.chooseBuyModel = {
        usedMode: '',
        hopeMoney: '',
        hopeTime: '',
        rentPay: '',
        hopeProportion: '',
        prdSeriods: '',
        prdName: '',
        prdPeriods: '',
        prdInterestRate: '',
        payWay: '',
        financeTotalMoney: '',
        moneyPay: '',
        downPayMoney: '',
        promiseMoney: '',
        lastPayMoney: '',
        manageMoney: '',
        purchaseMoney: '',
        licenseMoney: '',
        GpsMoney: '',
        otherMoney: '',
        remark: ''
      }
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
                      this.editModalOpen(row)
                      this.addOrEditFlag = false
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
                          this.carData.forEach((x, i) => {
                            if (i === index) {
                              this.carData.splice(i, 1)
                            }
                          })
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
          key: 'brand',
          align: 'center'
        }, {
          title: '车辆型号',
          key: 'model',
          align: 'center'
        }, {
          title: '车身颜色',
          key: 'color',
          align: 'center'
        }, {
          title: '车辆排量',
          key: 'output',
          align: 'center'
        }, {
          title: '车辆配置',
          key: 'configuration',
          align: 'center'
        }, {
          title: '上牌地区',
          key: 'area',
          align: 'center'
        }, {
          title: '车辆牌照',
          key: 'license',
          align: 'center'
        }, {
          title: '所在门店',
          key: 'store',
          align: 'center'
        }, {
          title: '是否出库',
          key: 'isOutStore',
          align: 'center'
        }, {
          title: '状态',
          key: 'status',
          align: 'center'
        }
      ]

      this.carData = []
    }
    editModalOpen(row) {
      this.editCarModal = true
    }
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
    confirmAndBackPrd() {
      this.addProductModal = false
      this.chooseBuyModel = {
        prdSeriods: '直租',
        prdName: '群泰融租',
        prdPeriods: '12期',
        prdInterestRate: '1.25',
        payWay: '等本等息',
        financeTotalMoney: '18122',
        moneyPay: '5584',
        downPayMoney: '20252',
        promiseMoney: '0',
        lastPayMoney: '0',
        manageMoney: '0',
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

</style>
