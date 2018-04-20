<!--销售收款申请-->
<template>
  <section class="page sale-gathering-apply special-input">
    <page-header title="销售收款申请" hiddenExport></page-header>
    <div class="data-command">
      <i-row type="flex">
        <i-col span="18">
          <i-form ref="customer-form" :model="applyData" :rules="applyRule" :label-width="80">
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
              <i-form-item label="选择订单" prop="orderId">
                <i-select v-model="applyData.orderId" placeholder="请选择订单" @on-change="changeOrderId">
                  <i-option v-for="item in orderNumberIdModels" :key="item.orderId" :value="item.orderId" :label="item.orderNumber"></i-option>
                </i-select>
              </i-form-item>
            </i-col>
          </i-form>
        </i-col>
        <i-button class="blueButton clear-button" @click="clearAll">清空</i-button>
      </i-row>
      <i-tabs v-model="materialTabs" type="card" class="sale-gather-tabs">
        <i-tab-pane name="gather-detail" label="收款明细">
          <gather-detail :checkOrderId="checkOrderId" :orderFodderInfo="orderFodderInfo" ref="gather-detail"></gather-detail>
        </i-tab-pane>
        <i-tab-pane name="upload-the-fodder" label="上传素材">
          <upload-the-fodder :checkOrderId="checkOrderId" :orderFodderInfo="orderFodderInfo" ref="upload-the-fodder"></upload-the-fodder>
        </i-tab-pane>
      </i-tabs>

      <div class="submit-bar">
        <i-row type="flex" align="middle" class="submit-bar-item">
          <i-col :span="8" push="1">
            <span>申请人：
              <span>{{applyPerson}}</span>
            </span>
          </i-col>
          <i-col :span="12" pull="4">
            <span>申请时间：
              <span>{{applyTime}}</span>
            </span>
          </i-col>
          <i-col :span="4">
            <!--<i-button class="highDefaultButton" @click="saveDraft" :disabled="saveDraftDisabled">保存草稿</i-button>-->
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
  import {
    State,
    Mutation,
    namespace
  } from "vuex-class";
  import UploadTheFodder from "~/components/purchase-manage/upload-the-fodder.vue";
  import GatherDetail from "~/components/purchase-manage/gather-detail.vue";
  import {
    WithdrawApplicationService
  } from "~/services/manage-service/withdraw-application.service";
  const ModuleState = namespace('purchase', State)
  const ModuleMutation = namespace('purchase', Mutation)
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
    @ModuleMutation updatePaymentRecord
    @ModuleState collectiondata
    private applyData: any = {
      idCard: "",
      customerName: "",
      mobileMain: "",
      orderId: ""
    };
    private applyPerson: String = ""; // 申请人
    private applyTime: String = ""; // 申请时间
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

    private data2: Array < Object > = [];
    private loading: Boolean = false;
    private addCar: Boolean = false;
    private isShown: Boolean = true;
    private modifyGatherItemModal: Boolean = false;
    private materialTabs: String = "gather-detail";
    private disabledStatus: String = ""; // 子组件中输入框禁用flag
    private orderNumberIdModels: Array < any > = [];
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
    private msg: any = '';
    mounted() {
      if (this.$store.state.pageList.find(v => v.resoname === '销售收款申请').flag) {
        this.applyData = this.collectiondata
        this.showTab()
      }
    }

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
    getSaveModel() {
      /**
       * 获取收款明细信息start
       */
      let _gatherDetail: any = this.$refs["gather-detail"];
      let itemList = _gatherDetail.getItem();
      let initialPayment = itemList.find(v => v.itemName === "initialPayment"); // 首付款
      this.saveDraftModel.initialPayment = initialPayment ?
        initialPayment.itemMoney :
        0;

      let depositCash = itemList.find(v => v.itemName === "depositCash"); // 保证金
      this.saveDraftModel.depositCash = depositCash ? depositCash.itemMoney : 0;

      let finalCash = itemList.find(v => v.itemName === "finalCash"); // 尾付款
      this.saveDraftModel.finalCash = finalCash ? finalCash.itemMoney : 0;

      let firstMonthlySupply = itemList.find(v => v.itemName === "monthlySupply"); // 月供金额
      this.saveDraftModel.firstMonthlySupply = firstMonthlySupply ?
        firstMonthlySupply.itemMoney :
        0;

      let gpsFee = itemList.find(v => v.itemName === "gpsFee"); // gps费
      this.saveDraftModel.gpsFee = gpsFee ? gpsFee.itemMoney : 0;

      let installLicenseFee = itemList.find(
        v => v.itemName === "installLicenseFee"
      ); // 安装费
      this.saveDraftModel.installLicenseFee = installLicenseFee ?
        installLicenseFee.itemMoney :
        0;

      let insuranceExpenses = itemList.find(
        v => v.itemName === "insuranceExpenses"
      ); // 保险费
      this.saveDraftModel.insuranceExpenses = insuranceExpenses ?
        insuranceExpenses.itemMoney :
        0;

      let manageCost = itemList.find(v => v.itemName === "manageCost"); // 管理费
      this.saveDraftModel.manageCost = manageCost ? manageCost.itemMoney : 0;

      let otherFee = itemList.find(v => v.itemName === "otherFee"); // 其他费用
      this.saveDraftModel.otherFee = otherFee ? otherFee.itemMoney : 0;

      let purchaseTax = itemList.find(v => v.itemName === "purchaseTax"); // 购置税
      this.saveDraftModel.purchaseTax = purchaseTax ? purchaseTax.itemMoney : 0;

      let totalPayment = itemList.find(v => v.itemName === "totalPayment"); // 合计
      this.saveDraftModel.totalPayment = totalPayment ?
        totalPayment.itemMoney :
        0;
      /**
       * 获取收款明细信息end
       */

      /**
       * 获取上传素材信息start
       */
      let _uploadFodder: any = this.$refs['upload-the-fodder']
      this.saveDraftModel.financeUploadResources = _uploadFodder.fodderList.map(v => {
        return {
          materialUrl: v.url,
        }
      })
      /**
       * 获取上传素材信息end
       */
    }
    /**
     * 保存草稿
     */
    saveDraft() {
      this.getSaveModel();
      // let _gatherDetail: any = this.$refs["gather-detail"];
      // let itemList = _gatherDetail.getItem();
      // // console.log("itemList", itemList);
      // let initialPayment = itemList.find(v => v.itemName === "initialPayment"); // 首付款
      // this.saveDraftModel.initialPayment = initialPayment
      //   ? initialPayment.itemMoney
      //   : 0;

      // let depositCash = itemList.find(v => v.itemName === "depositCash"); // 保证金
      // this.saveDraftModel.depositCash = depositCash ? depositCash.itemMoney : 0;

      // let finalCash = itemList.find(v => v.itemName === "finalCash"); // 尾付款
      // this.saveDraftModel.finalCash = finalCash ? finalCash.itemMoney : 0;

      // let firstMonthlySupply = itemList.find(v => v.itemName === "monthlySupply"); // 月供金额
      // this.saveDraftModel.firstMonthlySupply = firstMonthlySupply
      //   ? firstMonthlySupply.itemMoney
      //   : 0;

      // let gpsFee = itemList.find(v => v.itemName === "gpsFee"); // gps费
      // this.saveDraftModel.gpsFee = gpsFee ? gpsFee.itemMoney : 0;

      // let installLicenseFee = itemList.find(
      //   v => v.itemName === "installLicenseFee"
      // ); // 安装费
      // this.saveDraftModel.installLicenseFee = installLicenseFee
      //   ? installLicenseFee.itemMoney
      //   : 0;

      // let insuranceExpenses = itemList.find(
      //   v => v.itemName === "insuranceExpenses"
      // ); // 保险费
      // this.saveDraftModel.insuranceExpenses = insuranceExpenses
      //   ? insuranceExpenses.itemMoney
      //   : 0;

      // let manageCost = itemList.find(v => v.itemName === "manageCost"); // 管理费
      // this.saveDraftModel.manageCost = manageCost ? manageCost.itemMoney : 0;

      // let otherFee = itemList.find(v => v.itemName === "otherFee"); // 其他费用
      // this.saveDraftModel.otherFee = otherFee ? otherFee.itemMoney : 0;

      // let purchaseTax = itemList.find(v => v.itemName === "purchaseTax"); // 购置税
      // this.saveDraftModel.purchaseTax = purchaseTax ? purchaseTax.itemMoney : 0;

      // let totalPayment = itemList.find(v => v.itemName === "totalPayment"); // 合计
      // this.saveDraftModel.totalPayment = totalPayment
      //   ? totalPayment.itemMoney
      //   : 0;
      console.log(777, this.saveDraftModel);
      if (this.applyData.orderId) {
        this.withdrawApplicationService
          .saveSaleCollectMoneyApplicationAsDraft(this.saveDraftModel)
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
      } else {
        this.$Message.info("请先选择订单！");
      }
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
          this.getSaveModel();
          if (this.applyData.orderId) {
            let saveAndCommitModel = this.saveDraftModel;
            // console.log("saveAndCommitModel", saveAndCommitModel);
            this.withdrawApplicationService
              .saveSaleCollectMoneyApplication(saveAndCommitModel)
              .subscribe(
                data => {
                  this.updatePaymentRecord(new Date())
                  this.$Message.success("保存并提交成功！");
                  this.saveDraftDisabled = true;
                  this.resetAll()
                  this.disabledStatus = ''
                },
                ({
                  msg
                }) => {
                  this.$Message.error(msg);
                }
              );
          } else {
            this.$Message.info("请先选择订单！");
          }
        }
      })
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
          ({
            msg
          }) => {
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
          }, ({
            msg
          }) => {
            this.$Message.error(msg);
            this.msg = msg
          });
      }
    }
    /**
     * 清空
     */
    clearAll() {
      this.$Modal.confirm({
        title: "提示",
        content: "您有未保存的销售收款申请,清空会删除页面内容，是否确认清空申请内容！",
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
      let _uploadFodder: any = this.$refs['upload-the-fodder'];
      _uploadFodder.reset()

    }
  }

</script>

<style lang="less" scope>
  .special-input {
    .ivu-input {
      border-style: none;
      border-bottom-style: solid;
      border-radius: 0;
    }
  }

  .page.sale-gathering-apply {
    .data-command {
      margin-top: 10px;
    }
    .header {
      border-bottom: 1px solid #cccccc;
      margin-bottom: 20px;
      .data-form {
        float: right;
        margin-top: 10px;
        margin-right: 10px;
        .data-form-item {
          font-size: 16px;
          cursor: pointer;
          display: inline-block;
          margin-left: 10px;
          color: #3367A7;
          span {
            font-size: 12px;
          }
        }
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
      padding-right: 24px;
      .submit-bar-item {
        padding: 10px;
      }
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

  .sale-gather-tabs {
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
