<!--选购材料-->
<template>
  <section class="component choose-buy-materials">
    <i-col span="24" style="line-height:30px" class="form-title">选购信息</i-col>
    <i-row>
      <i-form ref="customer-form" :model="chooseBuyModel" :label-width="100" style="margin-top:20px;">
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
              <i-input type="text" v-model="chooseBuyModel.usedMode" placeholder="请输入融资租赁用途">
              </i-input>
            </i-form-item>
          </i-col>
          <i-col span="12" pull="3">
            <i-form-item label="意向融资金额" prop="hopeMoney">
              <i-input type="text" v-model="chooseBuyModel.hopeMoney" placeholder="请输入意向融资金额">
              </i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="12">
            <i-form-item label="意向期限" prop="hopeTime">
              <i-select>
                <i-option label="1年" value="1年" key="1年"></i-option>
                <i-option label="2年" value="2年" key="2年"></i-option>
              </i-select>
            </i-form-item>
          </i-col>
          <i-col span="12" pull="3">
            <i-form-item label="租金支付" prop="moneyPay">
              <i-input type="text" v-model="chooseBuyModel.moneyPay" placeholder="请输入租金支付">
              </i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <i-col span="12">
          <i-form-item label="意向首付比例" prop="hopeProportion">
            <i-input type="text" v-model="chooseBuyModel.hopeProportion" placeholder="请输入意向首付比例">
            </i-input>
          </i-form-item>
        </i-col>
      </i-form>
    </i-row>
    <i-table :columns="carColumns" :data="carData" stripe style="margin:10px;"></i-table>
    <i-button @click="editModalOpen">添加车辆</i-button>
    <i-col span="24" style="line-height:30px;margin-top:20px;" class="form-title">
      <span>产品信息</span>
      <div style="font-size:14px;cursor:pointer;display:inline-block;color:#3367A7;position:absolute;z-index:999;left:52%;" @click="openSimulateCalculate">
        <svg-icon iconClass="jisuanqi"></svg-icon>
        <span>月供模拟计算器</span>
      </div>
    </i-col>
    <i-row>
      <i-form ref="customer-form" :model="chooseBuyModel" :label-width="100" style="margin-top:20px;">
        <i-col span="12">
          <i-form-item label="产品系列" prop="province">
            <i-input type="text" v-model="chooseBuyModel.province" placeholder="请输入申请省份">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12" pull="3">
          <i-form-item label="产品名称" prop="city">
            <i-input type="text" v-model="chooseBuyModel.city" placeholder="请输入申请城市">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12">
          <i-form-item label="产品期数" prop="company">
            <i-input type="text" v-model="chooseBuyModel.company" placeholder="请输入所属公司">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12" pull="3">
          <i-form-item label="产品利率" prop="usedMode">
            <i-input type="text" v-model="chooseBuyModel.usedMode" placeholder="请输入融资租赁用途">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12">
          <i-form-item label="还款方式" prop="hopeMoney">
            <i-input type="text" v-model="chooseBuyModel.hopeMoney" placeholder="请输入意向融资金额">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12" pull="3">
          <i-form-item label="融资总额" prop="hopeTime">
            <i-input type="text" v-model="chooseBuyModel.hopeTime" placeholder="请输入意向期限">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12">
          <i-form-item label="月供金额" prop="moneyPay">
            <i-input type="text" v-model="chooseBuyModel.moneyPay" placeholder="请输入租金支付">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12" pull="3">
          <i-form-item label="首付金额" prop="hopeProportion">
            <i-input type="text" v-model="chooseBuyModel.hopeProportion" placeholder="请输入意向首付比例">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12">
          <i-form-item label="保证金金额" prop="hopeProportion">
            <i-input type="text" v-model="chooseBuyModel.hopeProportion" placeholder="请输入意向首付比例">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12" pull="3">
          <i-form-item label="尾付金额" prop="hopeProportion">
            <i-input type="text" v-model="chooseBuyModel.hopeProportion" placeholder="请输入意向首付比例">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12">
          <i-form-item label="管理费" prop="hopeProportion">
            <i-input type="text" v-model="chooseBuyModel.hopeProportion" placeholder="请输入意向首付比例">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12" pull="3">
          <i-form-item label="保险费" prop="hopeProportion">
            <i-input type="text" v-model="chooseBuyModel.hopeProportion" placeholder="请输入意向首付比例">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12">
          <i-form-item label="购置费" prop="hopeProportion">
            <i-input type="text" v-model="chooseBuyModel.hopeProportion" placeholder="请输入意向首付比例">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12" pull="3">
          <i-form-item label="上牌费" prop="hopeProportion">
            <i-input type="text" v-model="chooseBuyModel.hopeProportion" placeholder="请输入意向首付比例">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12">
          <i-form-item label="GPS费" prop="hopeProportion">
            <i-input type="text" v-model="chooseBuyModel.hopeProportion" placeholder="请输入意向首付比例">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12" pull="3">
          <i-form-item label="其他费用" prop="hopeProportion">
            <i-input type="text" v-model="chooseBuyModel.hopeProportion" placeholder="请输入意向首付比例">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12">
          <i-form-item label="备注" prop="hopeProportion">
            <i-input type="text" v-model="chooseBuyModel.hopeProportion" placeholder="请输入意向首付比例">
            </i-input>
          </i-form-item>
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
        <simulate-calculate></simulate-calculate>
      </i-modal>
    </template>

    <template>
      <i-modal title="编辑车辆" width="1200" v-model="editCarModal" :trandfer="false">
        <add-car></add-car>
        <!--<div slot="footer">
          <i-button @click="editCarModal=false">确认并返回</i-button>
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

  @Component({
    components: {
      SvgIcon,
      DataBox,
      SimulateCalculate,
      AddCar
    }
  })
  export default class ChooseBuyMaterials extends Vue {
    private chooseBuyModel: any;
    private carColumns: any;
    private carData: Array < Object > = [];
    private simulateCalculateModal: Boolean = false;
    private editCarModal: Boolean = false;
    @Dependencies(ApplyQueryService) private applyQueryService: ApplyQueryService;

    /**
     * 打开月供模拟计算器
     */
    openSimulateCalculate() {
      this.simulateCalculateModal = true
    }
    created() {
      // 设置表单数据
      this.chooseBuyModel = {
        province: "",
        city: "",
        company: "",
        usedMode: "",
        freeMoney: "",
        hopeMoney: "",
        hopeTime: "",
        moneyPay: "",
        hopeProportion: ""
      };
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
                      this.carData.forEach((x, i) => {
                        if (i === index) {
                          this.carData.splice(i, 1)
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
          title: '状态',
          key: 'status',
          align: 'center'
        }
      ]
      this.applyQueryService.addCarQueryData().subscribe(({
        val
      }) => {
        this.carData = val
      })
    }
    editModalOpen(row) {
      this.editCarModal = true
      this.$Modal.info({
        title: '车辆选择',
        width: 1200,
        render: h => h(AddCar, {
          props: {
            value: row
          }
        })
      })
    }

  }
</script>

<style lang="less" scope>
  .choose-buy-materials {
    .ivu-select-selection {
      width: 240%;
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