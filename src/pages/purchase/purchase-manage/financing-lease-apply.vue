<!--融资租赁申请-->
<template>
  <section class="pageContainer financing-lease-apply specialInput">
    <div class="page">
      <div class="header">
        <div class="form-title">融资租赁申请
          <div style="float:right;margin-right:20px;">
            <div style="cursor:pointer;display:inline-block;margin-left:10px;color:#3367A7">
              <svg-icon iconClass="dayin" style="font-size:24px;"></svg-icon>
              <span style="font-size:12px;" @click="print">打印</span>
            </div>
          </div>
        </div>
      </div>
      <i-row type="flex">
        <i-col span="18">
          <i-form ref="customer-form" :model="customerModel" label-position="left" :rules="customerRule" :label-width="110" style="margin-top:20px;position:relative;left:16px;">
            <i-col span="12">
              <i-form-item label="证件号码" prop="idCard">
                <i-input type="text" :maxlength="18" v-model="customerModel.idCard" autofocus @on-change="showTab" @on-blur="checkcustomerinfo">
                </i-input>
              </i-form-item>
            </i-col>
            <i-col span="12">
              <i-form-item label="客户姓名" prop="name">
                <i-input type="text" v-model="customerModel.name">
                </i-input>
              </i-form-item>
            </i-col>
            <i-col span="12">
              <i-form-item label="客户电话" prop="mobileMain">
                <i-input type="text" v-model="customerModel.mobileMain">
                </i-input>
              </i-form-item>
            </i-col>
            <i-col span="12">
              <i-form-item label="归属业务员" prop="salesmanName">
                <i-input type="text" v-model="customerModel.salesmanName">
                </i-input>
              </i-form-item>
            </i-col>
          </i-form>
        </i-col>
        <i-col span="6" style="display: flex;justify-content: center;align-items: center;position:absolute;top:12%;right:18%;" pull="6">
          <i-button class="blueButton" @click="addNewApply">添加新申请</i-button>
        </i-col>
      </i-row>
      <div class="shade" :style="{display:disabledStatus}">
      </div>
      <i-tabs type="card" v-model="materialTabs" class="finance-lease-tabs">
        <i-tab-pane label="选购资料" name="choose-buy-materials">
          <choose-buy-materials ref="choose-buy-materials"></choose-buy-materials>
        </i-tab-pane>
        <i-tab-pane label="客户资料" name="customer-materials">
          <customer-materials ref="customer-materials"></customer-materials>
        </i-tab-pane>
        <i-tab-pane label="客户职业" name="customer-job-message">
          <customer-job-message ref="customer-job-message"></customer-job-message>
        </i-tab-pane>
        <i-tab-pane label="客户联系人" name="customer-contacts">
          <customer-contacts ref="customer-contacts"></customer-contacts>
        </i-tab-pane>
        <i-tab-pane label="客户来源" name="customer-origin">
          <customer-origin ref="customer-origin"></customer-origin>
        </i-tab-pane>
        <i-tab-pane label="上传素材" name="upload-the-material">
          <upload-the-material ref="upload-the-material"></upload-the-material>
        </i-tab-pane>
      </i-tabs>
      <!--<div style="height:535px;overflow-y:auto;overflow-x:hidden;">
        <div class="shade" :style="{display:disabledStatus}">
        </div>
        <component :is="materialTabs"></component>
      </div>-->
      <div class="submitBar">
        <i-row type="flex" align="middle" style="padding:5px">
          <i-col :span="8" push="1">
            <span>申请人：administrator</span>
          </i-col>
          <i-col :span="10" pull="4">
            <span>申请时间： 2017-12-01 13:56:45</span>
          </i-col>
          <i-col :span="6" style="text-align:right;position:relative;bottom:6px;">
            <i-button size="large" class="highDefaultButton">保存草稿</i-button>
            <i-button size="large" class="highButton" style="margin-left:10px;" @click="saveAndSubmit">保存并提交</i-button>
          </i-col>
        </i-row>
      </div>
    </div>
    <template>
      <i-modal title="历史记录" width="1200" v-model="historicalModal" :trandfer="false" class="historical">
        <historical-record @close="historicalModal=false" :historicalDataset="historicalDataset" @distributionData="distributionData"></historical-record>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
  import Page from "~/core/page";
  import Component from "vue-class-component";
  import {
    Dependencies
  } from "~/core/decorator";
  import ChooseBuyMaterials from "~/components/purchase-manage/choose-buy-materials.vue";
  import CustomerMaterials from "~/components/purchase-manage/customer-materials.vue";
  import CustomerJobMessage from "~/components/purchase-manage/customer-job-message.vue";
  import UploadTheMaterial from "~/components/purchase-manage/upload-the-material.vue";
  import CustomerContacts from "~/components/purchase-manage/customer-contacts.vue";
  import CustomerOrigin from "~/components/purchase-manage/customer-origin.vue";
  import SvgIcon from '~/components/common/svg-icon.vue';
  import HistoricalRecord from "~/components/purchase-manage/historical-record.vue";
  import {
    PersonalService
  } from "~/services/manage-service/personal.service";
  import {
    ProductOrderService
  } from "~/services/manage-service/product.order.service";

  import {
    Layout
  } from "~/core/decorator";

  @Layout("workspace")
  @Component({
    components: {
      ChooseBuyMaterials,
      CustomerMaterials,
      CustomerJobMessage,
      CustomerOrigin,
      UploadTheMaterial,
      CustomerContacts,
      SvgIcon,
      HistoricalRecord
    }
  })
  export default class FinancingLeaseApply extends Page {
    @Dependencies(PersonalService) private personalService: PersonalService;
    @Dependencies(ProductOrderService) private productOrderService: ProductOrderService;


    private customerRule: Object = {};
    private customerModel: any = {
      idCard: '', // 证件号码 
      name: '', // 客户姓名
      mobileMain: '', // 客户电话
      salesmanName: '' // 归属业务员
    };
    private addCar: Boolean = false;
    private disabledStatus: String = ''; // 子组件中输入框禁用flag
    private materialTabs: String = 'choose-buy-materials';
    private historicalModal: Boolean = false;
    private historicalDataset: any = [];
    // private productId: any;
    print() {
      window.print()
    }
    /**
     * 根据客户三项查询历史订单
     */
    checkcustomerinfo() {
      if (this.customerModel.idCard) {
        this.personalService.getCustomerHistoryFinanceInfo(this.customerModel).subscribe(data => {
          this.historicalDataset = data
          if (this.historicalDataset.length) {
            this.historicalModal = true
          }
        }, ({
          msg
        }) => {
          this.$Message.error(msg);
        });
      }
    }
    distributionData(data) {
      this.customerModel.name = data.personal.name
      this.customerModel.customerPhone = data.personal.mobileMain
      this.customerModel.salesmanName = data.salesmanName
    }
    /**
     * 获取productId
     */
    // productData(productId) {
    //   this.productId = productId
    // }
    created() {}
    addNewApply() {
      this.$Modal.confirm({
        title: '提示',
        content: '有未提交的申请，确定创建新申请吗？',
        onOk: () => {
          let resetData: any = this.$refs['customer-form']
          //   let component: any = this.$refs['materials-all']
          //   let materials: any = this.$refs['materials']
          //   component.choosebusyData = {}
          //   component.addcarData = []
          //   materials.customerData = {}
          resetData.resetFields()
        },
        onCancel: () => {
          this.$Message.info('取消成功！');
        }
      })

    }
    /**
     * 保存并提交
     */
    saveAndSubmit() {
      let choosebuymaterials: any = this.$refs['choose-buy-materials']
      console.log(choosebuymaterials)
      let savesubmitDataset: any = {
        idCard: this.customerModel.idCard,
        name: this.customerModel.name,
        mobileMain: this.customerModel.customerPhone,
        salesmanName: this.customerModel.salesmanName,
        // 选购资料
        orderCars: choosebuymaterials.addcarData,
        province: choosebuymaterials.chooseBuyModel.province,
        city: choosebuymaterials.chooseBuyModel.city,
        companyId: choosebuymaterials.chooseBuyModel.companyId,
        orderService: choosebuymaterials.chooseBuyModel.orderServiceList,
        financingUse: choosebuymaterials.chooseBuyModel.financingUse,
        intentionFinancingAmount: choosebuymaterials.chooseBuyModel.intentionFinancingAmount,
        intentionPeriods: choosebuymaterials.chooseBuyModel.intentionPeriods,
        rentPayable: choosebuymaterials.chooseBuyModel.rentPayable,
        hopeProportion: choosebuymaterials.chooseBuyModel.hopeProportion,
        otherFee: choosebuymaterials.chooseBuyModel.otherFee,

      }
      //   this.productOrderService.saveFinanceApplyInfo(this.customerModel).subscribe(data => {
      //     this.historicalDataset = data.object
      //     if (this.historicalDataset.length) {
      //       this.historicalModal = true
      //     }
      //   }, ({
      //     msg
      //   }) => {
      //     this.$Message.error(msg);
      //   });
      //   this.customerModel.idCard = ''
      //   this.customerModel.userName = ''
      //   this.customerModel.userName = ''
      //   this.customerModel.mobileMain = ''
      //   this.customerModel.worker = ''
    }
    showTab() {
      if (this.customerModel.idCard.length === 18) {
        this.disabledStatus = 'none'
      }
    }
  }

</script>

<style lang="less" scope>
  .header {
    border-bottom: 1px solid #cccccc;
  }

  .submitBar {
    line-height: 70px;
    height: 70px;
    width: 100%;
    background: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    border: 1px solid #ddd;
    box-shadow: -3px 2px 20px #dddddd;
    padding-right: 24px;
  }

  .specialInput {
    .ivu-input {
      border-style: none;
      border-bottom-style: solid;
      border-radius: 0; // width: 257%;
    }
  }

  .financing-lease-apply {
    .ivu-select-selection {
      display: inline-block;
      border-style: none;
      border-bottom-style: solid;
      border-radius: 0;
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

  .finance-lease-tabs {
    .ivu-tabs-bar {
      border-bottom: 1px solid #DDDEE1;
      .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab {
        margin: 0;
        margin-right: 4px;
        padding: 5px 16px 4px;
        border: 1px solid #dddee1;
        border-bottom: 0;
        border-radius: 4px 4px 0 0;
        transition: all .3s ease-in-out;
      }
    }
  }

  .historical {
    .ivu-modal-footer {
      display: none !important;
    }
  }

</style>
