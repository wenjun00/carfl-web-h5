<!--销售收款申请-->
<template>
  <section class="sale-gathering-apply specialInput">
    <div class="page" style="height:822px;overflow:auto">

      <div class="header">
        <span class="form-title">销售收款申请</span>
        <div style="float:right;margin-top: 10px;margin-right:10px">
          <div style="cursor:pointer;display:inline-block;margin-left:10px;color:#3367A7">
            <svg-icon style="font-size:24px;" iconClass="dayin"></svg-icon>
            <span style="font-size:12px;">打印</span>
          </div>
        </div>
      </div>
      <i-row type="flex">
        <i-col span="18">
          <i-form ref="customer-form" :model="applyData" :rules="applyRule" :label-width="80" style="margin-top:20px;">
            <i-col span="12">
              <i-form-item label="证件号码" prop="idCard">
                <i-input type="text" v-model="applyData.idCard" placeholder="请输入证件号码" @on-change="showTab" :maxlength="18">
                </i-input>
              </i-form-item>
            </i-col>
            <i-col span="12">
              <i-form-item label="客户姓名" prop="customerName">
                <i-input type="text" v-model="applyData.customerName" placeholder="请输入客户姓名" @on-blur="getOrderInfo">
                </i-input>
              </i-form-item>
            </i-col>
            <i-col span="12">
              <i-form-item label="客户电话" prop="mobileMain">
                <i-input type="text" v-model="applyData.mobileMain" placeholder="请输入客户电话">
                </i-input>
              </i-form-item>
            </i-col>
            <i-col span="12">
              <i-form-item label="选择订单" prop="worker">
                <i-select v-model="applyData.orderId" placeholder="请选择订单" @on-change="changeOrderId">
                  <i-option v-for="item in orderNumberIdModels" :key="item.orderId" :value="item.orderId" :label="item.orderNumber"></i-option>
                </i-select>
              </i-form-item>
            </i-col>
          </i-form>
        </i-col>
        <i-button class="blueButton" style="height:40px;position:relative;top:60px;" @click="clearAll">清空</i-button>
      </i-row>
      <i-tabs v-model="materialTabs" type="card" class="sale-gather-tabs">
        <i-tab-pane name="gather-detail" label="收款明细">
          <gather-detail :checkOrderId="checkOrderId" :orderFodderInfo="orderFodderInfo" ref="gather-detail"></gather-detail>
        </i-tab-pane>
        <i-tab-pane name="upload-the-fodder" label="上传素材">
          <upload-the-fodder :checkOrderId="checkOrderId" :orderFodderInfo="orderFodderInfo" ref="upload-the-fodder"></upload-the-fodder>
        </i-tab-pane>
      </i-tabs>

      <div class="submitBar">
        <i-row type="flex" align="middle" style="padding:14px">
          <i-col :span="8" push="1">
            <span style="height:40px;display:inline-block;line-height:3">申请人：administrator</span>
          </i-col>
          <i-col :span="10" pull="4">
            <span>申请时间：2017-12-01 13:56:56</span>
          </i-col>
          <i-col :span="6" style="text-align:right;">
            <i-button class="highDefaultButton" @click="saveDraft" :disabled="saveDraftDisabled">保存草稿</i-button>
            <i-button class="highButton" @click="saveAndCommit">保存并提交</i-button>
          </i-col>
        </i-row>
      </div>
    </div>
    <div class="shade" :style="{display:disabledStatus}">
    </div>
  </section>
</template>
<script lang="ts">
import Page from "~/core/page";
import Component from "vue-class-component";
import { Dependencies } from "~/core/decorator";
import DataBox from "~/components/common/data-box.vue";
import { PageService } from "~/utils/page.service";
import SvgIcon from "~/components/common/svg-icon.vue";
import { Layout } from "~/core/decorator";
import UploadTheFodder from "~/components/purchase-manage/upload-the-fodder.vue";
import GatherDetail from "~/components/purchase-manage/gather-detail.vue";
import { WithdrawApplicationService } from "~/services/manage-service/withdraw-application.service";
@Layout("workspace")
@Component({
  components: {
    DataBox,
    SvgIcon,
    UploadTheFodder,
    GatherDetail
  }
})
export default class SaleGatheringApply extends Page {
  @Dependencies() private pageService: PageService;
  @Dependencies(WithdrawApplicationService)
  private withdrawApplicationService: WithdrawApplicationService;
  private applyData: any = {
    idCard: "",
    customerName: "",
    mobileMain: "",
    orderId: ""
  };
  applyRule: Object = {};
  private purchaseData: Object = {
    province: "",
    city: "",
    company: ""
  };

  private data2: Array<Object> = [];
  private loading: Boolean = false;
  private addCar: Boolean = false;
  private isShown: Boolean = true;
  private modifyGatherItemModal: Boolean = false;
  private materialTabs: String = "gather-detail";
  private disabledStatus: String = ""; // 子组件中输入框禁用flag
  private orderNumberIdModels: Array<any> = [];
  private personalId: Number = 0;
  private checkOrderId: Number = 0;
  private orderFodderInfo: Object = {}; // 获取订单下的素材等信息
  private saveDraftModel: any = {
    accountName: "",
    financeUploadResources: [], // 上传素材
    depositCash: 0,
    finalCash: 0,
    firstMonthlySupply: 0,
    gpsFee: 0,
    id: "",
    initialPayment: 0,
    installLicenseFee: 0,
    insuranceExpenses: 0,
    manageCost: 0,
    orderId: "",
    otherFee: 0,
    purchaseTax: 0,
    totalPayment: 0
  };
  private saveDraftDisabled: Boolean = false;

  created() {}
  /**
   * 保存草稿
   */
  saveDraft() {
    let _gatherDetail: any = this.$refs["gather-detail"];
    let itemList = _gatherDetail.getItem();
    let initialPayment = itemList.find(v => v.itemName === "initialPayment"); // 首付款
    if (initialPayment) {
      this.saveDraftModel.initialPayment = initialPayment.itemMoney;
    }
    let depositCash = itemList.find(v => v.itemName === "depositCash"); // 保证金
    if (depositCash) {
      this.saveDraftModel.depositCash = depositCash.itemMoney;
    }
    let finalCash = itemList.find(v => v.itemName === "finalCash"); // 尾付款
    if (finalCash) {
      this.saveDraftModel.finalCash = finalCash.itemMoney;
    }
    let firstMonthlySupply = itemList.find(
      // 月供金额
      v => v.itemName === "monthlySupply"
    );
    if (firstMonthlySupply) {
      this.saveDraftModel.firstMonthlySupply = firstMonthlySupply.itemMoney;
    }
    let gpsFee = itemList.find(v => v.itemName === "gpsFee"); // gps费
    if (gpsFee) {
      this.saveDraftModel.gpsFee = gpsFee.itemMoney;
    }
    let installLicenseFee = itemList.find(
      // 安装费
      v => v.itemName === "installLicenseFee"
    );
    if (installLicenseFee) {
      this.saveDraftModel.installLicenseFee = installLicenseFee.itemMoney;
    }
    let insuranceExpenses = itemList.find(
      // 保险费
      v => v.itemName === "insuranceExpenses"
    );
    if (insuranceExpenses) {
      this.saveDraftModel.insuranceExpenses = insuranceExpenses.itemMoney;
    }
    let manageCost = itemList.find(v => v.itemName === "manageCost"); // 管理费
    if (manageCost) {
      this.saveDraftModel.manageCost = manageCost.itemMoney;
    }
    let otherFee = itemList.find(v => v.itemName === "otherFee"); // 其他费用
    if (otherFee) {
      this.saveDraftModel.otherFee = otherFee.itemMoney;
    }
    let purchaseTax = itemList.find(v => v.itemName === "purchaseTax"); // 购置税
    if (purchaseTax) {
      this.saveDraftModel.purchaseTax = purchaseTax.itemMoney;
    }
    let totalPayment = itemList.find(v => v.itemName === "totalPayment"); // 合计
    if (totalPayment) {
      this.saveDraftModel.totalPayment = totalPayment.itemMoney;
    }
    if (this.applyData.orderId) {
      this.withdrawApplicationService
        .saveSaleCollectMoneyApplicationAsDraft(this.saveDraftModel)
        .subscribe(
          data => {
            this.$Message.success("保存草稿成功！");
          },
          ({ msg }) => {
            this.$Message.error(msg);
          }
        );
    } else {
      this.$Message.info("请先选择订单！");
    }
  }
  /**
   * 保存并提交
   */
  saveAndCommit() {
    if (this.applyData.orderId) {
      let saveAndCommitModel = this.saveDraftModel;
      this.withdrawApplicationService
        .saveSaleCollectMoneyApplication(saveAndCommitModel)
        .subscribe(
          data => {
            this.$Message.success("保存并提交成功！");
            this.saveDraftDisabled = true;
          },
          ({ msg }) => {
            this.$Message.error(msg);
          }
        );
    } else {
      this.$Message.info("请先选择订单！");
    }
  }
  showTab() {
    if (this.applyData.idCard.length === 18) {
      this.disabledStatus = "none";
      this.getOrderInfo();
    }
  }
  getOrderInfo() {
    this.withdrawApplicationService
      .getPersonalProductOrderInfo({
        idCard: this.applyData.idCard,
        customerName: this.applyData.customerName,
        mobileMain: this.applyData.mobileMain
      })
      .subscribe(
        data => {
          if (data[0] && data[0].orderNumberIdModels) {
            this.orderNumberIdModels = data[0].orderNumberIdModels;
            this.applyData.customerName = data[0].name;
            this.applyData.mobileMain = data[0].mobileMain;
            this.personalId = data[0].personalId;
          }
        },
        ({ msg }) => {
          this.$Message.error(msg);
        }
      );
  }
  /**
   * 通过订单id获取销售收款申请信息
   */
  changeOrderId(val) {
    if (val) {
      this.checkOrderId = val; // 将选择的订单号传给变更收款项按钮点击事件中
      this.saveDraftModel.orderId = val; // 保存草稿所需orderId
      this.withdrawApplicationService
        .getSaleCollectMoneyApplicationInfo({
          personalId: this.personalId,
          orderId: val
        })
        .subscribe(data => {
          this.orderFodderInfo = data;
          if (data.withdrawId) {
            this.saveDraftModel.id = data.withdrawId; // 获取保存草稿时需要的id
          }
          if (data.personalBank && data.personalBank.personalName) {
            this.saveDraftModel.accountName = data.personalBank.personalName; // 获取保存草稿时需要的accountName
          }
          // 给收款明细列表赋值
          let _gatherDetail: any = this.$refs["gather-detail"];
          _gatherDetail.makeList(data);
          let _uploadMaterial: any = this.$refs["upload-the-fodder"];
          _uploadMaterial.makeList(data);
        });
    }
  }
  /**
   * 清空
   */
  clearAll() {
    this.$Modal.confirm({
      title: "提示",
      content:
        "您有未保存的销售收款申请,清空会删除页面内容，是否确认清空申请内容！",
      onOk: () => {
        this.resetAll();
        // 显示遮罩
        this.disabledStatus = "block";
        // 清空orderId
        this.checkOrderId = 0;
        // 停止禁用保存草稿
        this.saveDraftDisabled = false;
      }
    });
  }
  /**
   * 页面重置
   */
  resetAll() {
    let _form: any = this.$refs["customer-form"];
    _form.resetFields();
    this.applyData.orderId = "";
    let _gatherDetail: any = this.$refs["gather-detail"];
    _gatherDetail.resetTable();
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
  padding-right: 24px;
}

.specialInput {
  .ivu-input {
    border-style: none;
    border-bottom-style: solid;
    border-radius: 0;
  }
}

.sale-gather-tabs {
  .ivu-tabs-bar {
    border-bottom: 1px solid #dddee1;
    .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab {
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

.sale-gathering-apply {
  .ivu-select-selection {
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
</style>
