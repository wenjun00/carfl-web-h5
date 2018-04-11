<!--全款销售申请-->
<template>
  <section class="page full-payment-apply specialInput">
    <div class="header">
      <span class="form-title">全款销售申请</span>
      <div style="float:right;margin-top: 10px;margin-right:10px">
        <div style="cursor:pointer;display:inline-block;margin-left:10px;color:#3367A7">
          <svg-icon style="font-size:24px;" iconClass="dayin"></svg-icon>
          <span style="font-size:12px;">打印</span>
        </div>
      </div>
    </div>
    <i-row type="flex">
      <i-col span="18">
        <i-form ref="customer-form" :model="applyData" :rules="applyRule" label-position="left" :label-width="110" style="margin-top:20px;position:relative;left:16px;">
          <i-col span="12">
            <i-form-item label="证件号码" prop="idCard">
              <i-input type="text" :maxlength="18" v-model="applyData.idCard" autofocus placeholder="请输入证件号码" @on-change="showTab" @on-blur="checkcustomerinfo">
              </i-input>
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item label="客户姓名" prop="name">
              <i-input type="text" :maxlength="13" v-model="applyData.name" placeholder="请输入客户姓名" @on-blur="ReverseData">
              </i-input>
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item label="客户电话" prop="customerPhone">
              <i-input type="text" v-model="applyData.customerPhone" placeholder="请输入客户电话" @on-blur="ReverseData">
              </i-input>
            </i-form-item>
          </i-col>
          <i-col span="12" class="belongSalers">
            <i-form-item label="归属业务员" prop="salesmanName">
              <!--<i-select>
                <i-option label="吴小川" value="吴小川" key="吴小川"></i-option>
              </i-select>-->
              <i-input type="text" v-model="applyData.salesmanName">
              </i-input>
            </i-form-item>
          </i-col>
        </i-form>
      </i-col>
      <!-- <i-col span="6" type="flex" justify="center" style="display: flex;justify-content: center;align-items: center;position:absolute;top:12%;right:18%;"
        pull="6"> -->
      <i-button class="blueButton" @click="addNewApply" style="height:40px;position:relative;top:60px;">添加新申请</i-button>
      <!-- </i-col> -->
    </i-row>
    <div class="shade" :style="{display:disabledStatus}">
    </div>
    <i-tabs type="card" class="fulls-pay-tabs">
      <i-tab-pane label="选购资料" name="choose-buy-materials-all">
        <choose-buy-materials-all ref='materials-all'></choose-buy-materials-all>
      </i-tab-pane>
      <i-tab-pane label="客户资料" name="customer-materials-all">
        <customer-materials-all ref="materials"></customer-materials-all>
      </i-tab-pane>
    </i-tabs>
    <div class="submitBar">
      <i-row type="flex" align="middle" style="padding:5px">
        <i-col :span="8" push="1">
          <span style="height:40px;display:inline-block;line-height:3">申请人：administrator</span>
        </i-col>
        <i-col :span="10" pull="4">
          <span>申请时间：2017-12-01 13:56:56</span>
        </i-col>
        <i-col :span="6" style="text-align:right;position:relative;bottom:6px;">
          <i-button size="large" class="highDefaultButton" @click="draftsaveAndSubmit(true)">保存草稿</i-button>
          <i-button class="highButton" @click="saveAndSubmit(false)">保存并提交</i-button>
        </i-col>
      </i-row>
    </div>
    <template>
      <i-modal title="历史记录" width="1200" v-model="historicalModal" :trandfer="false" class="historical">
        <historical-record @close="historicalModal=false" :historicalDataset="historicalDataset" @distributionData="distributionData"></historical-record>
      </i-modal>
    </template>
  </section>
</template>
<script lang="ts">
  import Page from '~/core/page';
  import Component from 'vue-class-component';
  import {
    Dependencies
  } from '~/core/decorator';
  import {
    ApplyQueryService
  } from '~/services/business-service/apply-query.service';
  import {
    PersonalService
  } from '~/services/manage-service/personal.service';
  import {
    ProductOrderService
  } from '~/services/manage-service/product-order.service';

  import DataBox from '~/components/common/data-box.vue';
  import {
    PageService
  } from '~/utils/page.service';
  import SvgIcon from '~/components/common/svg-icon.vue';
  import {
    Layout
  } from '~/core/decorator';
  import AddCar from '~/components/purchase-manage/add-car.tsx.vue';
  import HistoricalRecord from '~/components/purchase-manage/historical-record.vue';

  import ChooseBuyMaterialsAll from '~/components/purchase-manage/choose-buy-materials-all.tsx.vue';
  import CustomerMaterialsAll from '~/components/purchase-manage/customer-materials-all.vue';

  @Layout('workspace')
  @Component({
    components: {
      DataBox,
      SvgIcon,
      AddCar,
      ChooseBuyMaterialsAll,
      CustomerMaterialsAll,
      HistoricalRecord,
    },
  })
  export default class FullPaymentApply extends Page {
    @Dependencies() private pageService: PageService;
    @Dependencies(ApplyQueryService) private applyQueryService: ApplyQueryService;
    @Dependencies(PersonalService) private personalService: PersonalService;
    @Dependencies(ProductOrderService) private productOrderService: ProductOrderService;

    private applyData: any = {
      idCard: '',
      name: '',
      customerPhone: '',
      salesmanName: '',
    };

    private applyRule: Object = {
      idCard: [{
        required: true,
        message: '请输入证件号码',
        trigger: 'blur',
      },
      { validator: this.$validator.idCard, trigger: "blur" }],
      name: [{
        required: true,
        message: '请输入客户姓名',
        trigger: 'blur',
      }],
      customerPhone: [{
        required: true,
        message: '请输入客户电话',
        trigger: 'blur',
      },
       { validator: this.$validator.phoneNumber, trigger: "blur" }],
      salesmanName: [{
        required: true,
        message: '请输入归属业务员',
        trigger: 'blur',
      }]
    };

    private columns1: any;
    private columns2: any;
    private data1: Array < Object > = [];
    private data2: Array < Object > = [];
    private loading: Boolean = false;
    private addCar: Boolean = false;
    private isShown: Boolean = true;
    private historicalModal: Boolean = false;
    private addOrEditFlag: Boolean = false;
    // private materials: String = 'choose-buy-materials-all'
    private disabledStatus: String = ''; // 子组件中输入框禁用flag
    private historicalDataset: any = [];
    private addcarData: any = [];
    private type: Boolean = false;
    private orderStatus: any = '';
    // private currentRowData: any = {};
    /**
     * 清空数据
     */
    resethistory() {
      //   选购资料请空
      let component: any = this.$refs['materials-all'];
      let _parchaseform: any = component.$refs['parchase-form']
      component.addcarData = []
      _parchaseform.resetFields()
      //   客户资料清空
      let materials: any = this.$refs['materials'];
      let _parchase: any = materials.$refs['parchase-form']
      _parchase.resetFields()
    }
    /**
     * 添加新申请
     */
    addNewApply() {
      this.$Modal.confirm({
        title: '提示',
        content: '有未提交的申请，确定创建新申请吗？',
        onOk: () => {
          let resetData: any = this.$refs['customer-form'];
          resetData.resetFields();
          this.resethistory();
          this.disabledStatus=''
        },
        onCancel: () => {
          this.$Message.info('取消成功！');
        },
      });
    }
    created() {
      this.columns1 = [{
          title: '操作',
          align: 'center',
          render: (h, {
            row,
            column,
            index
          }) => {
            return h('div', [
              h(
                'i-button', {
                  props: {
                    type: 'text',
                  },
                  style: {
                    color: '#265EA2',
                  },
                  on: {
                    click: () => {
                      this.addCar = true;
                    },
                  },
                },
                '编辑'
              ),
              h(
                'i-button', {
                  props: {
                    type: 'text',
                  },
                  style: {
                    color: '#265EA2',
                  },
                  on: {
                    click: () => {
                      this.data1.forEach((x, i) => {
                        if (i === index) {
                          this.data1.splice(i, 1);
                        }
                      });
                    },
                  },
                },
                '删除'
              ),
            ]);
          },
        },
        {
          title: '品牌/型号',
          key: 'columnsName',
          align: 'center',
        },
        {
          title: '车身颜色',
          key: 'color',
          align: 'center',
        },
        {
          title: '单价（元）',
          key: 'price',
          align: 'center',
        },
        {
          title: '数量',
          key: 'amount',
          align: 'center',
        },
        {
          title: '车牌号码',
          key: 'carNumber',
          align: 'center',
        },
      ];

      this.columns2 = [{
          type: 'selection',
          align: 'center',
          width: 60,
        },
        {
          title: '车辆品牌',
          key: 'brand',
          align: 'center',
          width: 86,
        },
        {
          title: '车辆型号',
          key: 'model',
          align: 'center',
          width: 86,
        },
        {
          title: '车身颜色',
          key: 'color',
          align: 'center',
          width: 86,
        },
        {
          title: '车辆排量',
          key: 'output',
          align: 'center',
          width: 86,
        },
        {
          title: '车辆配置',
          key: 'configuration',
          align: 'center',
        },
        {
          title: '上牌地区',
          key: 'area',
          align: 'center',
          width: 86,
        },
        {
          title: '车辆牌照',
          key: 'license',
          align: 'center',
        },
        {
          title: '所在门店',
          key: 'store',
          align: 'center',
        },
        {
          title: '状态',
          key: 'status',
          align: 'center',
          width: 86,
        },
      ];
    }
    ReverseData() {
      let customermodel: any = this.$refs['materials']
      customermodel.getinfo(this.applyData)
    }
    /**
     * 根据客户三项查询历史订单
     */
    checkcustomerinfo() {
      this.applyData.name = ''
      this.applyData.customerPhone = ''
      this.applyData.salesmanName = ''
      this.resethistory()
      let customermodel: any = this.$refs['materials']
      customermodel.getinfo(this.applyData)
      if (this.applyData.idCard) {
        this.personalService.getCustomerHistoryFinanceInfo(this.applyData).subscribe(
          data => {
            this.historicalDataset = data;
            if (this.historicalDataset.length) {
              this.historicalModal = true;
            }
            // else {
            //   this.applyData.name = ''
            //   this.applyData.customerPhone = ''
            //   this.applyData.salesmanName = ''
            //   //   选购资料请空
            //   let component: any = this.$refs['materials-all'];
            //   let _parchaseform: any = component.$refs['parchase-form']
            //   _parchaseform.resetFields()
            //   //   客户资料清空
            //   let materials: any = this.$refs['materials'];
            //   let _parchase: any = materials.$refs['parchase-form']
            //   _parchase.resetFields()
            // }
          },
          ({
            msg
          }) => {
            this.$Message.error(msg);
          }
        );
      }
    }
    /**
     * 客户信息反显
     */
    distributionData(data) {
      console.log(data, 80800);
      this.applyData.name = data.personal.name;
      this.applyData.customerPhone = data.personal.mobileMain;
      this.applyData.salesmanName = data.salesmanName;
      //   选购信息反显
      let _materialsall: any = this.$refs['materials-all'];
      _materialsall.Reverse(data)
      //   客户资料
      let _materials: any = this.$refs['materials']
      _materials.Reverse(data)
    }
    /**
     * 多选
     */
    multipleSelect(selection) {}
    /**
    是否显示汽车分类
     */
    showCategory() {
      this.isShown = !this.isShown;
    }
    savedraft() {}
    draftsaveAndSubmit(type) {
      let component: any = this.$refs['materials-all'];
      //   选购信息
      let choosebusyData: any = component.choosebusyData;
      for (let item of component.addcarData) {
        this.addcarData.push({
          brandId: item.brandId,
          brandName: item.brandName,
          carSeriesId: item.carSeriesId,
          modelName: item.modelName,
          otherExpenses: item.otherExpenses,
          vehicleAmount: item.vehicleAmount,
          vehicleColour: item.vehicleColour,
        });
      }
      //   客户资料
      let materials: any = this.$refs['materials'];
      let customerData: any = materials.customerData;
      console.log(customerData, 900000000000000);
      if (type) {
        this.orderStatus = 303;
      } else {
        this.orderStatus = 304;
      }
      component.addcarData.map(v => {
        v.carSeriesId = v.seriesId,
        v.amount = v.carAmount,
        v.vehicleColour = v.carColour,
        v.vehicleEmissions = v.carEmissions
        })
      component.addcarData.forEach(v=>delete v.id)
      let savesubmitDataset: any = {
        idCard: this.applyData.idCard,
        name: this.applyData.name,
        mobileMain: this.applyData.customerPhone,
        salesmanName: this.applyData.salesmanName,
        city: choosebusyData.city,
        companyId: choosebusyData.companyId,
        province: choosebusyData.province,
        orderCars: component.addcarData, // 车辆
        personal: customerData,
        orderServiceList: customerData.orderServiceList,
        orderStatus: this.orderStatus,
      };
      this.productOrderService.createFullPaymentOrder(savesubmitDataset).subscribe(
        data => {
          this.$Message.success('保存成功！');
        },
        ({
          msg
        }) => {
          this.$Message.error(msg);
        }
      );
    }
    /**
     * 保存并提交
     */
    saveAndSubmit(type) {
      let _customerform: any = this.$refs['customer-form'];
      _customerform.validate(valid => {
        if (!valid) {
          return false
        } else {
          let component: any = this.$refs['materials-all'];
          let _parchaseform: any = component.$refs['parchase-form']
          console.log(_parchaseform, '_parchaseform')
          _parchaseform.validate(valid => {
            console.log(valid, 'valid')
            if (!valid) {
              this.$Message.warning('您有未输入的选项，请先检查并输入后再提交！');
              return false
            } else {
              let _materials: any = this.$refs['materials']
              let _parchase: any = _materials.$refs['parchase-form']
              _parchase.validate(valid => {
                if (!valid) {
                  this.$Message.warning('您有未输入的选项，请先检查并输入后再提交！');
                  return false
                } else {
                  //   选购信息
                  let choosebusyData: any = component.choosebusyData;
                  for (let item of component.addcarData) {
                    this.addcarData.push({
                      brandId: item.brandId,
                      brandName: item.brandName,
                      carSeriesId: item.carSeriesId,
                      modelName: item.modelName,
                      otherExpenses: item.otherExpenses,
                      vehicleAmount: item.vehicleAmount,
                      vehicleColour: item.vehicleColour,
                    });
                  }
                  console.log(component.addcarData.length, 'component.addcarData')
                  if (component.addcarData.length === 0) {
                    this.$Message.warning('请添加车辆信息');
                    return
                  }
                  //   客户资料
                  let materials: any = this.$refs['materials'];
                  let customerData: any = materials.customerData;
                  console.log(customerData, 900000000000000);
                  if (type) {
                    this.orderStatus = 303;
                  } else {
                    this.orderStatus = 304;
                  }
                  component.addcarData.map(v => {
                    v.carSeriesId = v.seriesId,
                      v.amount = v.carAmount,
                      v.vehicleColour = v.carColour,
                      v.vehicleEmissions = v.carEmissions
                  })
                  component.addcarData.forEach(v=>delete v.id)
                  let savesubmitDataset: any = {
                    idCard: this.applyData.idCard,
                    name: this.applyData.name,
                    mobileMain: this.applyData.customerPhone,
                    salesmanName: this.applyData.salesmanName,
                    city: choosebusyData.city,
                    companyId: choosebusyData.companyId,
                    province: choosebusyData.province,
                    orderCars: component.addcarData, // 车辆
                    personal: customerData,
                    orderServiceList: customerData.orderServiceList,
                    orderStatus: this.orderStatus,
                  };
                  console.log(savesubmitDataset, 8888);
                  this.productOrderService.createFullPaymentOrder(savesubmitDataset).subscribe(
                    data => {
                      this.$Message.success('保存成功！');
                    },
                    ({
                      msg
                    }) => {
                      this.$Message.error(msg);
                    }
                  );
                }
              })
            }
          })
        }
      })
    }
    showTab() {
      if (this.applyData.idCard.length === 18) {
        this.disabledStatus = 'none';
      }
    }
    confirmAndBack() {
      //   this.editCarModal = false
      this.applyQueryService.getFullQueryData().subscribe(({
        val
      }) => {
        this.data1 = val;
      });
    }
  }

</script>

<style lang="less" scope>
  .header {
    border-bottom: 1px solid #cccccc;
  }

  .open {
    max-width: auto;
    overflow: hidden;
  }

  .close {
    max-width: 0;
    min-width: 0;
    overflow: hidden;
  }

  .case-list {
    position: fixed;
    right: 0px;
    top: 0px;
    background: #fff;
    z-index: 2000;
    width: 368px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
    height: 100%;
  }

  .case-list.flag {
    right: -348px;
    box-shadow: none;
    background: none;
  }

  .arrowUp {
    transform: rotate(0deg); // transition: transform ease-in 0.2s;
  }

  .arrowDown {
    transform: rotate(180deg); // transition: transform ease-in 0.2s;
  }

  .arrowButton {
    line-height: 570px;
    height: 100%;
    background: #e4e4e4;
    text-align: center;
    width: 30px;
  }

  .submitBar {
    height: 70px;
    width: 100%;
    background: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    border: 1px solid #ddd;
    box-shadow: -3px 2px 20px #dddddd;
  }

  .specialInput {
    .ivu-input {
      border-style: none;
      border-bottom-style: solid;
      border-radius: 0; // width: 240%;
    }
  }

  .bigSelect {
    .ivu-select-selection {
      width: 240%;
      display: inline-block;
      border-style: none;
      border-bottom-style: solid;
      border-radius: 0;
    }
  }

  .proCity .ivu-select-selection {
    width: 358%;
    display: inline-block;
    border-style: none;
    border-bottom-style: solid;
    border-radius: 0;
  }

  .belongSalers {
    .ivu-select-selection {
      width: 240%;
      display: inline-block;
      border-style: none;
      border-bottom-style: solid;
      border-radius: 0;
    }
  }

  .full-payment-apply {
    .ivu-select,
    .ivu-select-single {
      width: 100px;
    }
    .shade {
      width: 98%;
      height: 666px;
      background: rgba(250, 250, 250, 0.4);
      position: absolute;
      left: 21px;
      top: 257px;
      z-index: 999;
    }
  }

  .fulls-pay-tabs {
    .ivu-tabs-bar {
      border-bottom: 1px solid #dddee1;
      .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab {
        margin: 0;
        margin-right: 4px;
        padding: 5px 16px 4px;
        border: 1px solid #dddee1;
        border-bottom: 0;
        border-radius: 4px 4px 0 0;
        transition: all 0.3s ease-in-out;
      }
    }
  }

  .customer-lease-tabs {
    .ivu-tabs-bar {
      border-bottom: 1px solid #dddee1;
      .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab {
        margin: 0;
        margin-right: 4px;
        padding: 5px 16px 4px;
        border: 1px solid #dddee1;
        border-bottom: 0;
        border-radius: 4px 4px 0 0;
        transition: all 0.3s ease-in-out;
      }
    }
  }

  .historical {
    .ivu-modal-footer {
      display: none !important;
    }
  }

</style>
