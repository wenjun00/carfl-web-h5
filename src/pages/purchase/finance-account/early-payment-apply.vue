<!--提前结清申请-->
<template>
  <section class="page early-payment-apply special-input">
    <page-header title="提前结清申请" hiddenExport></page-header>
    <i-row type="flex" class="data-form">
      <i-col span="18">
        <i-form ref="customer-form" :model="applyData" :rules="applyRule" :label-width="80">
          <i-col span="12">
            <i-form-item label="证件号码" prop="idCard">
              <i-input type="text" v-model="applyData.idCard" placeholder="请输入证件号码" @on-change="showTab"
                       :maxlength="18">
              </i-input>
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item label="客户姓名" prop="customerName">
              <i-input type="text" v-model="applyData.customerName" placeholder="请输入客户姓名">
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
            <i-form-item label="选择订单" prop="orderId">
              <i-select v-model="applyData.orderId" placeholder="请选择订单" @on-change="changeOrderId">
                <i-option v-for="item in orderNumberIdModels" :key="item.orderId" :value="item.orderId"
                          :label="item.orderNumber"></i-option>
              </i-select>
            </i-form-item>
          </i-col>
          <i-col span="24">
            <i-form-item label="备注" prop="remark">
              <i-input type="text" style="width:77%;" v-model="applyData.remark" placeholder="请输入备注">
              </i-input>
            </i-form-item>
          </i-col>
        </i-form>
      </i-col>
      <i-col span="6">
        <i-button class="blueButton clear-button" @click="clearAll">清空</i-button>
      </i-col>

    </i-row>
    <i-tabs v-model="materialTabs" type="card" class="early-pay-tabs">
      <i-tab-pane name="gather-detail-early-pay" label="收款明细">
        <gather-detail-early-pay :checkOrderId="checkOrderId" ref="gather-detail-early-pay"></gather-detail-early-pay>
      </i-tab-pane>
      <i-tab-pane name="upload-the-fodder" label="上传素材">
        <upload-the-fodder ref="upload-the-fodder"></upload-the-fodder>
      </i-tab-pane>
    </i-tabs>
    <div class="shade" :style="{display:disabledStatus}">
    </div>
    <div class="submit-bar">
      <i-row type="flex" align="middle" class="submit-bar-apply">
        <i-col :span="8" push="1">
          <span>申请人：{{applyPerson}}</span>
        </i-col>
        <i-col :span="12" pull="4">
          <span>申请时间：{{applyTime}}</span>
        </i-col>
        <i-col :span="4">
          <!--<i-button class="highDefaultButton" @click="saveDraft" :disabled="saveDraftDisabled">保存草稿</i-button>-->
          <i-button class="highButton" @click="saveAndCommit">保存并提交</i-button>
        </i-col>
      </i-row>
    </div>
  </section>
</template>
<script lang="ts">
  import Page from "~/core/page";
  import Component from "vue-class-component";
  import {
    Dependencies
  } from "~/core/decorator";
  import DataBox from "~/components/common/data-box.vue";
  import {
    PageService
  } from "~/utils/page.service";
  import SvgIcon from "~/components/common/svg-icon.vue";
  import {
    Layout
  } from "~/core/decorator";
  import UploadTheFodder from "~/components/purchase-manage/upload-the-fodder.vue";
  import ModifyGatherItem from "~/components/purchase-manage/modify-gather-item.vue";
  import ChangeGatherItem from "~/components/purchase-manage/change-gather-item.vue";
  import GatherDetailEarlyPay from "~/components/purchase-manage/gather-detail-early-pay.vue";
  import {
    WithdrawApplicationService
  } from "~/services/manage-service/withdraw-application.service";
  import {
    setTimeout
  } from "core-js/library/web/timers";

  @Layout("workspace")
  @Component({
    components: {
      DataBox,
      SvgIcon,
      UploadTheFodder,
      ModifyGatherItem,
      ChangeGatherItem,
      GatherDetailEarlyPay
    }
  })
  export default class EarlyPaymentApply extends Page {
    @Dependencies() private pageService: PageService;
    @Dependencies(WithdrawApplicationService)
    private withdrawApplicationService: WithdrawApplicationService;
    private applyData: any = {
      idCard: "",
      customerName: "",
      mobileMain: "",
      salesManName: "",
      orderId: "",
      remark: ""
    };
    applyRule: Object = {
      idCard: [{
        required: true,
        message: '请输入证件号码',
        trigger: 'blur',
      },
        {
          validator: this.$validator.idCard,
          trigger: "blur"
        }
      ],
      customerName: [{
        required: true,
        message: '请输入客户姓名',
        trigger: 'blur',
      }],
      mobileMain: [{
        required: true,
        message: '请输入客户电话',
        trigger: 'blur',
      },
        {
          validator: this.$validator.phoneNumber,
          trigger: "blur"
        }
      ],
      //   orderId: [{
      //     required: true,
      //     message: '请选择订单',
      //     trigger:'change'
      //   }],
    };
    private purchaseData: Object = {
      province: "",
      city: "",
      company: ""
    };
    private applyPerson: String = ""; // 申请人
    private applyTime: String = ""; // 申请时间
    private orderNumberIdModels: Array<any> = [];
    private loading: Boolean = false;
    private addCar: Boolean = false;
    private personalId: Number = 0;
    private checkOrderId: Number = 0;
    private isShown: Boolean = true;
    private materialTabs: String = "gather-detail-early-pay";
    private disabledStatus: String = ""; // 子组件中输入框禁用flag
    private saveDraftModel: any = {
      addFinanceUploadResources: [], // 新增上传资料列表
      delFinanceUploadResources: [], // 删除上传资料Id列表
      financeUploadResources: [], // 上传素材相关信息
      accountName: "",
      advancePayoffFee: 0, // 提前结清手续费
      id: "", // 申请id
      orderId: "", // 订单id
      otherFee: 0,
      surplusManageFee: 0, // 剩余管理费
      surplusPenalty: 0, // 剩余罚息
      surplusPenaltyFreeze: 0, // 剩余冻结罚金
      surplusPrincipal: 0, // 剩余本金
      totalPayment: 0, // 收款总额
      remark: "" // 备注
    };
    private saveDraftItem: Array = [];
    private saveDraftDisabled: Boolean = false;
    private msg: any = ''

    created() {
      this.applyPerson = this.$store.state.userData.username;
      let time = new Date();
      this.applyTime =
        time.getFullYear() +
        "-" +
        (time.getMonth() + 1) +
        "-" +
        time.getDate() +
        " " +
        time.getHours() +
        ":" +
        time.getMinutes() +
        ":" +
        time.getSeconds();
    }

    /**
     * 订单号change
     */
    changeOrderId(val) {
      if (val) {
        this.checkOrderId = val; // 将选择的订单号传给变更收款项按钮点击事件中
        this.saveDraftModel.orderId = val; // 保存草稿所需orderId
        this.withdrawApplicationService
          .getAdvancePayoffApplicationInfo({
            personalId: this.personalId,
            orderId: val
          })
          .subscribe(
            data => {
              this.applyData.remark = data.remark;
              // 获取收款项和备注信息
              let _gatherDetail: any = this.$refs["gather-detail-early-pay"];
              _gatherDetail.makeList(data);
              if (data.personalBank && data.personalBank.personalName) {
                this.saveDraftModel.accountName = data.personalBank.personalName; // 获取保存草稿时需要的accountName
              }
              if (data.withdrawId) {
                this.saveDraftModel.id = data.withdrawId; // 获取保存草稿时需要的id
              }
            },
            ({
               msg
             }) => {
              this.$Message.error(msg);
              this.msg = msg
            }
          );
      }
    }

    getModel() {
      let _gatherDetail: any = this.$refs["gather-detail-early-pay"];
      let itemList = _gatherDetail.getItem();
      this.saveDraftItem = itemList;
      this.saveDraftModel.otherFee = _gatherDetail.getOtherFee();
      this.saveDraftModel.remark = this.applyData.remark;
      let surplusManageFee = itemList.find(
        v => v.itemName === "surplusManageFee"
      );
      this.saveDraftModel.surplusManageFee = surplusManageFee ?
        surplusManageFee.itemMoney :
        0;

      let surplusPenalty = itemList.find(v => v.itemName === "surplusPenalty");
      this.saveDraftModel.surplusPenalty = surplusPenalty ?
        surplusPenalty.itemMoney :
        0;

      let surplusPenaltyFreeze = itemList.find(
        v => v.itemName === "surplusPenaltyFreeze"
      );
      this.saveDraftModel.surplusPenaltyFreeze = surplusPenaltyFreeze ?
        surplusPenaltyFreeze.itemMoney :
        0;

      let surplusPrincipal = itemList.find(
        v => v.itemName === "surplusPrincipal"
      );
      this.saveDraftModel.surplusPrincipal = surplusPrincipal ?
        surplusPrincipal.itemMoney :
        0;

      let advancePayoffFee = itemList.find(
        v => v.itemName === "advancePayoffFee"
      );
      this.saveDraftModel.advancePayoffFee = advancePayoffFee ?
        advancePayoffFee.itemMoney :
        0;

      // let otherFee = itemList.find(v => v.itemName === "otherFee");
      // this.saveDraftModel.otherFee = otherFee ? otherFee.itemMoney : 0;

      let totalPayment = itemList.find(v => v.itemName === "totalPayment");
      this.saveDraftModel.totalPayment = totalPayment ?
        totalPayment.itemMoney :
        0;

      let _uploadFodder: any = this.$refs['upload-the-fodder']
      this.saveDraftModel.financeUploadResources = _uploadFodder.fodderList.map(v => {
        return {
          materialUrl: v.url,
          // type:v.response.type,
          // name:v.name,
          // id:v.response.id
        }
      })
    }

    /**
     * 保存草稿
     */
    saveDraft() {
      this.getModel();
      this.withdrawApplicationService
        .saveAdvancePayoffApplicationAsDraft(this.saveDraftModel)
        .subscribe(
          data => {
            this.$Message.success("保存草稿成功！");
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
    saveAndCommit() {
      let customerform: any = this.$refs['customer-form']
      customerform.validate(valid => {
        if (!valid) {
          return false
        } else {
          if (this.msg === '该订单已有一个未处理的提前结清申请') {
            this.$Message.warning('请先审批未处理的申请订单！')
            return false
          }
          this.getModel();
          let saveAndCommitModel = this.saveDraftModel;
          if(this.saveDraftItem.length==0){
            this.$Message.warning('未添加收款项，请添加收款项！')
            return false
          }
          this.withdrawApplicationService
            .saveAdvancePayoffApplication(saveAndCommitModel)
            .subscribe(
              data => {
                this.$Message.success("保存并提交成功！");
                this.saveDraftDisabled = true;
                this.resetAll()
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

    /**
     * 显示tab页，去掉遮罩
     */
    showTab() {
      if (this.applyData.idCard.length === 18) {
        this.disabledStatus = "none";
        this.getOrderInfo();
      }
    }

    /**
     * 获取订单信息
     */
    getOrderInfo() {
      this.withdrawApplicationService
        .getPersonalProductOrderInfoForAdvance({
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
          ({
             msg
           }) => {
            this.$Message.error(msg);
          }
        );
    }

    /**
     * 清空
     */
    clearAll() {
      this.$Modal.confirm({
        title: "提示",
        content: "您有未保存的提前结清申请,清空会删除页面内容，是否确认清空申请内容！",
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
      let _gatherDetail: any = this.$refs["gather-detail-early-pay"];
      _gatherDetail.resetTable();
      let _uploadthefodder: any = this.$refs['upload-the-fodder']
      _uploadthefodder.reset()
    }
  }

</script>

<style lang="less" scope>
  .page.early-payment-apply {
    .data-form {
      margin-top: 10px;
    }
    .header {
      border-bottom: 1px solid #cccccc;
      margin-bottom: 20px;
    }
    .command {
      float: right;
      margin-top: 10px;
      margin-right: 10px;
      .command-item {
        cursor: pointer;
        display: inline-block;
        margin-left: 10px;
        color: #3367A7;
      }
    }
    .clear-button {
      height: 40px;
      position: relative;
      top: 60px;
    }
    .submit-bar {
      height: 70px;
      width: 100%;
      background: #fff;
      position: fixed;
      bottom: 0;
      left: 0;
      border: 1px solid #ddd;
      .submit-bar-apply {
        padding: 14px;
        span {
          height: 40px;
          display: inline-block;
          line-height: 3
        }
      }
    }
    .early-pay-tabs {
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
    .shade {
      width: 98%;
      height: 666px;
      background: rgba(250, 250, 250, 0.7);
      position: absolute;
      left: 21px;
      top: 315px;
      z-index: 999;
    }
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

  .special-input {
    .ivu-input {
      border-style: none;
      border-bottom-style: solid;
      border-radius: 0;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }
  }

  .bigSelect {
    .ivu-select-selection {
      display: inline-block;
      border-style: none;
      border-bottom-style: solid;
      border-radius: 0;
    }
  }

  .early-payment-apply {
    .ivu-select-selection {
      border-style: none;
      border-bottom-style: solid;
      border-radius: 0;
    }
  }

</style>
