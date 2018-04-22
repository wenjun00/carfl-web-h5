<!--销售收款申请-->
<template>
  <section class="page sale-gathering-apply">
    <page-header title="销售收款申请" hiddenExport>
      <command-button label="添加新申请" @click="clearAll"></command-button>
    </page-header>

    <!-- 搜索表单-start -->
    <div class="search-container">
      <i-form :label-width="90" ref="customer-form" class="search-form" :model="applyModel" label-position="right" :rules="applyRule">
        <i-row :gutter="20">
          <i-col span="10">
            <i-form-item label="证件号码" prop="idCard">
              <i-input type="text" v-model="applyModel.idCard" placeholder="请输入证件号码" :disabled="transFlag" @on-change="getUserInfo" :maxlength="18">
              </i-input>
            </i-form-item>
          </i-col>
          <i-col span="10">
            <i-form-item label="客户姓名" prop="customerName">
              <i-input type="text" v-model="applyModel.customerName" placeholder="请输入客户姓名">
              </i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row :gutter="20">
          <i-col span="10">
            <i-form-item label="客户电话" prop="mobileMain">
              <i-input type="text" v-model="applyModel.mobileMain" placeholder="请输入客户电话">
              </i-input>
            </i-form-item>
          </i-col>
          <i-col span="10">
            <i-form-item label="选择订单" prop="orderId">
              <i-input v-model="applyModel.orderNumber" :readonly="true" v-if="transFlag"></i-input>
              <i-select v-model="applyModel.orderId" placeholder="请选择订单" @on-change="changeOrderId" v-else>
                <i-option v-for="item in orderNumberIdModels" :key="item.orderId" :value="item.orderId" :label="item.orderNumber"></i-option>
              </i-select>

            </i-form-item>
          </i-col>
        </i-row>
      </i-form>
    </div>

    <i-tabs v-show="applyModel.orderId" v-model="materialTabs" class="info-container">
      <i-tab-pane name="gather-detail" label="收款明细">
        <gather-detail :checkOrderId="checkOrderId" :orderFodderInfo="orderFodderInfo" ref="gather-detail"></gather-detail>
      </i-tab-pane>
      <i-tab-pane name="upload-the-fodder" label="上传素材">
        <upload-the-fodder :checkOrderId="checkOrderId" :orderFodderInfo="orderFodderInfo" ref="upload-the-fodder"></upload-the-fodder>
      </i-tab-pane>
    </i-tabs>

    <div v-show="!applyModel.orderId" class="emptyText">
      请先填写证件信息
    </div>

    <div class="fixed-container" v-show="applyModel.orderId">
      <i-button class="highButton" @click="saveAndCommit">保存并提交</i-button>
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
import { State, Mutation, namespace } from "vuex-class";
import UploadTheFodder from "~/components/purchase-manage/upload-the-fodder.vue";
import GatherDetail from "~/components/purchase-manage/gather-detail.vue";
import { WithdrawApplicationService } from "~/services/manage-service/withdraw-application.service";
import { FilterService } from "~/utils/filter.service.ts";

const ModuleState = namespace("purchase", State);
const ModuleMutation = namespace("purchase", Mutation);
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
  @ModuleMutation updatePaymentRecord;
  @ModuleState collectiondata;

  private applyModel: any = {};
  private applyRule: any = {};

  // 各组件变量，统一初始化赋值，以供使用
  private customerForm: any = {};
  private gatherDetail: any = {};
  private uploadFodder: any = {};

  // 传值过来的页面
  private transFlag: boolean = false;
  private materialTabs: String = "gather-detail";
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
  private msg: any = "";

  created() {
    this.applyModel = {
      idCard: "",
      customerName: "",
      mobileMain: "",
      orderId: "",
      orderNumber: ""
    };

    this.applyRule = {
      idCard: [
        { required: true, message: "证件号码必填", trigger: "blur" },
        { validator: this.$validator.idCard, trigger: "blur" }
      ],
      customerName: {
        required: true,
        message: "请输入客户姓名",
        trigger: "blur"
      },
      mobileMain: [
        { required: true, message: "客户电话必填", trigger: "blur" },
        {
          required: true,
          validator: this.$validator.phoneNumber,
          trigger: "blur"
        }
      ]
    };
  }

  mounted() {
    this.customerForm = this.$refs["customer-form"];
    this.gatherDetail = this.$refs["gather-detail"];
    this.uploadFodder = this.$refs["upload-the-fodder"];
  }

  getSaveModel() {
    /**
     * 获取收款明细信息start
     */
    let itemList = this.gatherDetail.getItem();
    let initialPayment = itemList.find(v => v.itemName === "initialPayment"); // 首付款
    this.saveDraftModel.initialPayment = initialPayment
      ? initialPayment.itemMoney
      : 0;

    let depositCash = itemList.find(v => v.itemName === "depositCash"); // 保证金
    this.saveDraftModel.depositCash = depositCash ? depositCash.itemMoney : 0;

    let finalCash = itemList.find(v => v.itemName === "finalCash"); // 尾付款
    this.saveDraftModel.finalCash = finalCash ? finalCash.itemMoney : 0;

    let firstMonthlySupply = itemList.find(
      v => v.itemName === "firstMonthlySupply"
    ); // 月供金额
    this.saveDraftModel.firstMonthlySupply = firstMonthlySupply
      ? firstMonthlySupply.itemMoney
      : 0;

    let gpsFee = itemList.find(v => v.itemName === "gpsFee"); // gps费
    this.saveDraftModel.gpsFee = gpsFee ? gpsFee.itemMoney : 0;

    let installLicenseFee = itemList.find(
      v => v.itemName === "installLicenseFee"
    ); // 安装费
    this.saveDraftModel.installLicenseFee = installLicenseFee
      ? installLicenseFee.itemMoney
      : 0;

    let insuranceExpenses = itemList.find(
      v => v.itemName === "insuranceExpenses"
    ); // 保险费
    this.saveDraftModel.insuranceExpenses = insuranceExpenses
      ? insuranceExpenses.itemMoney
      : 0;

    let manageCost = itemList.find(v => v.itemName === "manageCost"); // 管理费
    this.saveDraftModel.manageCost = manageCost ? manageCost.itemMoney : 0;

    let otherFee = itemList.find(v => v.itemName === "otherFee"); // 其他费用
    this.saveDraftModel.otherFee = otherFee ? otherFee.itemMoney : 0;

    let purchaseTax = itemList.find(v => v.itemName === "purchaseTax"); // 购置税
    this.saveDraftModel.purchaseTax = purchaseTax ? purchaseTax.itemMoney : 0;

    let totalPayment = itemList.find(v => v.itemName === "totalPayment"); // 合计
    this.saveDraftModel.totalPayment = totalPayment
      ? totalPayment.itemMoney
      : 0;

    /**
     * 获取上传素材信息start
     */
    let _uploadFodder: any = this.$refs["upload-the-fodder"];
    this.saveDraftModel.financeUploadResources = _uploadFodder.fodderList;
  }

  loaded({ row }) {
    if (!row) {
      return;
    }

    this.transFlag = true;
    this.applyModel.idCard = row.idCard;
    this.applyModel.customerName = row.personalName;
    this.applyModel.mobileMain = row.mobileMain;
    this.applyModel.orderId = row.orderId;
    this.personalId = row.personalId;
    this.applyModel.orderNumber = row.orderNumber;
    this.changeOrderId(row.orderId);
  }
  /**
   * 保存并提交
   */
  saveAndCommit() {
    this.customerForm.validate(valid => {
      if (!valid) {
        return false;
      } else {
        if (this.msg === "该订单已有一个未处理的提前结清申请") {
          this.$Message.warning("请先审批未处理的申请订单！");
          return false;
        }
        this.getSaveModel();
        if (this.applyModel.orderId) {
          let saveAndCommitModel = this.saveDraftModel;
          console.log(saveAndCommitModel);
          this.withdrawApplicationService
            .saveSaleCollectMoneyApplication(saveAndCommitModel)
            .subscribe(
              data => {
                this.updatePaymentRecord(new Date());
                this.$Message.success("保存并提交成功！");
                this.resetPage();
              },
              ({ msg }) => {
                this.$Message.error(msg);
              }
            );
        } else {
          this.$Message.info("请先选择订单！");
        }
      }
    });
  }
  showTab() {
    if (this.$validator.idCard()) {
      this.getOrderInfo();
    } else {
      this.applyModel.customerName = "";
      this.applyModel.mobileMain = "";
    }
  }

  async getUserInfo() {
    if (!this.applyModel.idCard) {
      this.applyModel.orderId = "";
      return;
    }

    if (this.applyModel.idCard.length === 18) {
      // 验证身份证信息
      let result = await new Promise((reslove, reject) => {
        this.customerForm.validateField("idCard", error => reslove(!error));
      });

      if (result) {
        this.getOrderInfo();
      }
    }
  }

  getOrderInfo() {
    this.withdrawApplicationService
      .getPersonalProductOrderInfo(this.applyModel)
      .subscribe(
        data => {
          if (data[0] && data[0].orderNumberIdModels) {
            this.orderNumberIdModels = data[0].orderNumberIdModels;
            this.applyModel.customerName = data[0].name;
            this.applyModel.mobileMain = data[0].mobileMain;
            this.personalId = data[0].personalId;
          }
        },
        err => {
          this.$Message.error(err.msg);
          this.customerForm.resetFields();
        }
      );
  }

  resetPage() {
    this.transFlag = false;
    this.orderNumberIdModels = [];
    this.customerForm.resetFields();
    this.gatherDetail.resetTable();
    this.uploadFodder.fodder.reset();
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
        .subscribe(
          data => {
            this.orderFodderInfo = data;
            if (data.withdrawId) {
              this.saveDraftModel.id = data.withdrawId; // 获取保存草稿时需要的id
            }
            if (data.personalBank && data.personalBank.personalName) {
              this.saveDraftModel.accountName = data.personalBank.personalName; // 获取保存草稿时需要的accountName
            }
            // 给收款明细列表赋值
            let gatherDetail: any = this.$refs["gather-detail"];
            gatherDetail.makeList(data);
          },
          ({ msg }) => {
            this.$Message.error(msg);
            this.msg = msg;
          }
        );
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
        this.resetPage();
      }
    });
  }
}
</script>

<style lang="less" scoped>
.search-container {
  padding: 15px;
}
.info-container {
  margin-bottom: 100px;
}

.fixed-container {
  height: 65px;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #fff;
  z-index: 10;
  text-align: right;
  padding: 10px 20px;
  box-shadow: 0px -5px 10px #ccc;
}

.emptyText {
  font-size: 32px;
  color: #ccc;
  font-weight: bold;
  background: #f2f2f2;
  height: 500px;
  text-align: center;
  line-height: 500px;
  letter-spacing: 1px;
  box-shadow: 0px 0px 5px #ccc;
}
</style>
