<template> 
  <section class="page personal-mortgage-application">
    <page-header title="个人抵押贷款申请" hiddenExport>
      <command-button type="text" label="业务流程图" @click="onShowBusinessFlow"></command-button>
    </page-header>
    <i-form ref="basis-form" :model="basisModel" :rules="basisRules" :label-width="120">
      <i-row :gutter="16">
        <i-col :span="12">
          <i-form-item label="证件号码" prop="cardNumber">
            <i-input v-model="basisModel.cardNumber" :maxlength="18" autofocus @on-change="onCheckHistoryOrder" :disabled="transFlag"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="客户名称" prop="customterName">
            <i-input v-model="basisModel.customterName"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="手机号码" prop="phoneNumber">
            <i-input v-model="basisModel.phoneNumber" :maxlength="11"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="归属业务员" prop="salesmanName">
            <i-input v-model="basisModel.salesmanName" @on-focus="onShowSalerList" readyonly></i-input>
          </i-form-item>
        </i-col>
      </i-row>
    </i-form>

    <i-tabs v-model="currentTab" @on-click="onClickCurrentTab">
      <div slot="extra">
        <i-button type="text" v-show="currentStep<applicationTabs.length" @click="onNextStep">下一步</i-button>
      </div>
      <i-tab-pane name="mortgage-application" label="申请资料" :disabled="currentStep<0">
        <mortgage-application @on-product-change="product=>currentProduct=product" ref="mortgage-application" :cardNumber="basisModel.cardNumber"></mortgage-application>
      </i-tab-pane>
      <i-tab-pane name="personal-customer-info" label="客户资料" :disabled="currentStep<1">
        <personal-customer-info ref="personal-customer-info" @on-RefBaseData="onRefBaseData"></personal-customer-info>
      </i-tab-pane>
      <i-tab-pane name="customer-job" label="客户职业" :disabled="currentStep<2">
        <customer-job ref="customer-job"></customer-job>
      </i-tab-pane>
      <i-tab-pane name="personal-customer-contact" label="客户联系人" :disabled="currentStep<3">
        <personal-customer-contact ref="personal-customer-contact"></personal-customer-contact>
      </i-tab-pane>
      <i-tab-pane name="customer-origin" label="客户来源" :disabled="currentStep<4">
        <customer-origin ref="customer-origin"></customer-origin>
      </i-tab-pane>
      <i-tab-pane name="upload-the-material" label="上传素材" :disabled="currentStep<5">
        <upload-the-material :currentProduct="currentProduct" ref="upload-the-material"></upload-the-material>
      </i-tab-pane>
    </i-tabs>

    <div class="fixed-container" v-show="currentStep > 5">
      <!-- <i-button v-show="!orderStatus" size="large" class="highDefaultButton" @click="onSubmit(true)">保存草稿</i-button> -->
      <i-button size="large" @click="onSubmit(false)">保存并提交</i-button>
    </div>
  </section>
</template>

<script lang="ts">
import Page from "~/core/page";
import Component from "vue-class-component";
import { Layout, Dependencies } from "~/core/decorator";
import SalesmanName from "~/components/purchase-manage/salesman-name.vue";
import MortgageApplication from "~/components/purchase-manage/mortgage/mortgage-application.vue";
import PersonalCustomerInfo from "~/components/customer/personal/personal-customer-info.vue";
import CustomerJob from "~/components/customer/personal/customer-job.vue";
import PersonalCustomerContact from "~/components/customer/personal/personal-customer-contact.vue";
import CustomerOrigin from "~/components/customer/customer-origin.vue";
import UploadTheMaterial from "~/components/purchase-manage/upload-the-material.tsx.vue";
import { Form } from "iview";
import { Mutation } from "vuex-class";
import MortgageCarList from "~/components/purchase-manage/mortgage/mortgage-car-list.vue";
import { ProductOrderService } from "~/services/manage-service/product-order.service";
import HistoricalRecord from "~/components/purchase-manage/historical-record.vue";
import { PersonalService } from "~/services/manage-service/personal.service";

@Layout("workspace")
@Component({
  components: {
    MortgageApplication,
    PersonalCustomerInfo,
    CustomerJob,
    PersonalCustomerContact,
    CustomerOrigin,
    UploadTheMaterial
  }
})
export default class PersonalMortgageApplication extends Page {
  @Dependencies(ProductOrderService) productOrderService: ProductOrderService;
  @Dependencies(PersonalService) private personalService: PersonalService;
  @Mutation closePage;

  // 是否跳转过来的页面
  private transFlag: boolean = false;
  private currentStep = 0;
  private currentTab = "mortgage-application";
  private currentProduct = "";
  private orderStatus = null;
  private currentCardNumber = "";
  // 基础数据表单
  private basisModel: any = {
    id: -1, // 新增表示 -1
    cardNumber: "", // 证件号码
    customterName: "", // 客户姓名
    phoneNumber: "", // 手机号码
    saler: {}, // 销售员
    salesmanName: "",
    salesmanId: 0,
    seriesId: ""
  };

  // 基础数据验证
  private basisRules = {
    cardNumber: [
      { required: true, message: "请输入证件号码", trigger: "blur" },
      { validator: this.$validator.idCard, trigger: "blur" }],
    customterName: [
      { required: true, message: "请输入客户姓名", trigger: "change" }],
    phoneNumber: [
      { required: true, message: "请输入客户电话", trigger: "change" },
      { validator: this.$validator.phoneNumber, trigger: "blur" }],
    salesmanName: [
      { required: true, message: "请选择归属业务员", trigger: "change" }]
  };

  // 业务选项卡列表
  private applicationTabs = [
    {
      name: "mortgage-application",
      label: "申请资料"
    },
    {
      name: "personal-customer-info",
      label: "客户资料"
    },
    {
      name: "customer-job",
      label: "客户职业"
    },
    {
      name: "personal-customer-contact",
      label: "客户联系人"
    },
    {
      name: "customer-origin",
      label: "客户来源"
    },
    {
      name: "upload-the-material",
      label: "上传素材"
    }
  ];

  /**
   * 查看业务流程图
   */
  private onShowBusinessFlow() {
    this.$dialog.show({
      width: "90%",
      render: h => {
        return h(
          "div",
          {
            style: {
              overflow: "auto"
            }
          },
          [
            h("img", {
              attrs: {
                src: "/static/images/common/liuchengtu.png"
              }
            })
          ]
        );
      }
    });
  }

  /**
   * 显示销售员列表
   */
  onShowSalerList() {
    let dialog = this.$dialog.show({
      title: "销售员列表",
      footer: true,
      onOk: salesmanName => {
        let currentRow = salesmanName.getCurrentRow();
        if (!currentRow) {
          this.$Message.error("请选择对应销售员");
          return false;
        }
        // 更新销售人员信息
        this.basisModel.saler = currentRow;
        this.basisModel.salesmanName = currentRow.userRealname;
        this.basisModel.salesmanId = currentRow.id;
        let basisForm = this.$refs["basis-form"] as Form;
        basisForm.validateField("salesmanName");
      },
      render: h => {
        return h(SalesmanName);
      }
    });
  }

  private onClickCurrentTab(name) {
    let index = this.applicationTabs.findIndex(v => v.name === name);
    if (index > -1) {
      this.currentStep = index
    }
  }

  /**
   * 步骤流程处理
   */
  async onNextStep() {
    let tab = this.$refs[this.currentTab] as any;
    // 验证当前页面
    let result = await tab.validate();
    if (!result) {
      return;
    }

    this.currentStep += 1;

    this.$nextTick(() => {
      if (this.applicationTabs.length > this.currentStep) {
        this.currentTab = this.applicationTabs[this.currentStep].name;
      }
    });
  }

  /**
   * 检测身份证信息
   */
  async checkIdCardValid() {
    if (this.basisModel.cardNumber.length < 18) {
      return;
    }
    // 客户表单
    let basisForm = this.$refs["basis-form"] as Form;

    // 验证身份证信息
    let result = await new Promise((reslove, reject) => {
      basisForm.validateField("cardNumber", error => reslove(!error));
    });

    return result
  }

  /**
   * 检测历史订单
   */
  async onCheckHistoryOrder() {

    // 如果是跳转过来的页面就不触发
    if (this.transFlag) return
    // 检测身份证
    if (!await this.checkIdCardValid()) {
      return;
    }



    // 判断是否需要重置信息
    if (this.currentCardNumber && this.currentCardNumber !== this.basisModel.cardNumber) {
      await new Promise((resolve) => {
        this.$Modal.confirm({
          title: "提醒",
          content: "证件号码更新,是否要重置申请信息?",
          onCancel: () => { return resolve() },
          onOk: () => {
            this.currentCardNumber = this.basisModel.cardNumber;
            this.resetApplicationTab()
            return resolve()
          }
        });
      })
    }
    this.currentCardNumber = this.basisModel.cardNumber;
    this.findOrderInfo()
  }

  private findOrderInfo() {
    // 查询历史数据
    this.personalService
      .getCustomerHistoryFinanceInfo({
        idCard: this.basisModel.cardNumber
      })
      .subscribe(
        (data) => {
          if (data.length) {
            if (data.some(x => x.personalType === 114)) {
              this.$Message.info("黑名单用户禁止创建申请");
            } else {
              this.showHistoryOrder(data);
            }
          }
        }, err => this.$Message.error(err.msg)
      );
  }

  /**
   * 显示历史订单
   */
  showHistoryOrder(data) {
    let dialog = this.$dialog.show({
      title: "历史订单",
      footer: true,
      onOk: historyRecord => {
        let currentRow = historyRecord.getCurrentRow();

        if (!currentRow) {
          this.$Message.error("请选择对应的订单");
          return false;
        }

        this.getOrderData(currentRow.orderNumber);
      },
      onCancel: () => { },
      render: h => {
        return h(HistoricalRecord, {
          props: {
            data
          }
        });
      }
    });
  }

  /**
   * 获取订单数据
   */
  getOrderData(orderNumber) {
    this.productOrderService
      .findOrderInfoByOrderNumber({ orderNumber })
      .subscribe(data => {
        this.revert(data);
      });
  }

  /**
   * 更新数据
   */
  revert({ orderStatus, ...data }) {
    this.currentCardNumber = data.personal.idCard;
    this.orderStatus = orderStatus;

    this.basisModel.cardNumber = data.personal.idCard;
    this.basisModel.phoneNumber = data.personal.mobileMain;
    this.basisModel.customterName = data.personal.name;
    this.basisModel.salesmanName = data.salesmanName;
    this.basisModel.salesmanId = data.salesmanId;
    // this.basisModel.phoneNumbe
    this.applicationTabs.forEach(async ({ name }) => {
      // 当前tab
      let tab: any = this.$refs[name];
      // 退件与草稿恢复产品信息
      switch (orderStatus) {
        case 303: {
          tab.revert(data);
          this.currentStep = 6;
          break;
        }
        case 311: {
          tab.revert(data);
          break;
        }
        default: {
          if (!["mortgage-application", "upload-the-material"].includes(name)) {
            tab.revert(data);
          }
        }
      }
    });

    if ([303, 311].includes(orderStatus)) {
      this.basisModel.id = data.id;
    } else {
      this.orderStatus = null;
    }
  }

  /**
   * 加载页面数据
   */
  loaded({ row }) {
    if (!row) {
      return
    }

    this.transFlag = true
    this.getOrderData(row.orderNumber)
  }

  /**
   * 将当前页面的基础数据实体传递给子页面
  */
  private onRefBaseData() {
    let customer: any = this.$refs['personal-customer-info']
    customer.setBaseData(this.basisModel)
  }

  /**
   * 重置页面数据
   */
  reset() {
    this.orderStatus = "";
    let basisForm = this.$refs["basis-form"] as Form;

    basisForm.resetFields();
    this.currentStep = 0;

    this.basisModel.cardNumber = this.currentCardNumber
  }

  /**
   * 重置申请选项卡数据
   */
  resetApplicationTab() {
    this.reset()
    this.applicationTabs.forEach(({ name }) => {
      let tab: any = this.$refs[name];
      tab.reset();
    });
  }

  async validate() {
    let result = true;

    // 执行验证
    for (let { name } of this.applicationTabs) {
      let tab = this.$refs[name] as any;
      result = result && !!await tab.validate();
      if (!result) {
        break;
      }
    }

    // 验证结果
    return result;
  }

  /**
   * 提交申请数据
   */
  async onSubmit(validate) {
    let result = true;
    let basisForm = this.$refs["basis-form"] as Form;

    // 基础表单验证
    if (!await basisForm.validate().then(x => x)) {
      return;
    }

    // 数据验证
    if (validate) {
      result = await this.validate();
    }

    this.submitApplicationData(validate);
  }

  submitApplicationData(draft) {
    let data = this.getApplicationData();
    // 添加订单
    this.productOrderService
      .saveFinanceApplyInfo(
        Object.assign(data, {
          orderStatus: this.orderStatus || (draft ? 303 : 304)
        })
      )
      .subscribe(
        data => {
          this.$Message.success("保存成功");
          setTimeout(() => {
            this.closePage("purchase/mortgage/personal-mortgage-application");
          }, 1000);
        },
        ({ msg }) => {
          this.$Message.error(msg);
        }
      );
  }

  /**
   * 获取申请数据
   */
  getApplicationData() {

    let mortgageApplication = this.$refs["mortgage-application"] as MortgageApplication;
    let personalCustomerInfo = this.$refs["personal-customer-info"] as PersonalCustomerInfo;
    let customerJob = this.$refs["customer-job"] as CustomerJob;
    let personalCustomerContact = this.$refs["personal-customer-contact"] as PersonalCustomerContact;
    let customerOrigin = this.$refs["customer-origin"] as CustomerOrigin;
    let uploadTheMaterial = this.$refs["upload-the-material"] as UploadTheMaterial;

    // 订单基础信息
    let CreateOrderModel = Object.assign(
      // 客户信息
      this.basisModel,
      {
        salesmanName: this.basisModel.saler.userRealname,
        seriesId: this.basisModel.saler.id
      },
      // 抵押申请信息
      {
        // 申请信息
        province: mortgageApplication.applicationModel.province,
        city: mortgageApplication.applicationModel.city,
        companyId: mortgageApplication.applicationModel.company,
        financingUse: mortgageApplication.applicationModel.mortgageUse,
        intentionFinancingAmount: mortgageApplication.applicationModel.intentionAmount,
        intentionPeriods: mortgageApplication.applicationModel.intentionPeriods,
        intentionMethod: mortgageApplication.applicationModel.intentionMethod,
        // 产品信息
        financingAmount: mortgageApplication.productModel.loadAmount, // 估价金额
        gpsFee: mortgageApplication.productModel.gpsAmount,
        manageCostPercent: mortgageApplication.productModel.manageRatio,
        manageCost: mortgageApplication.productModel.manageAmount,
        otherFee: mortgageApplication.productModel.otherAmount,
        remark: mortgageApplication.productModel.remark,
        productId: mortgageApplication.currentProduct.productId,
        seriesId: mortgageApplication.currentProduct.seriesId,
        productIssueId: mortgageApplication.currentProduct.id,
        productRate: mortgageApplication.currentProduct.productRate,
        payWay: mortgageApplication.currentProduct.payWay,
        monthlySupply: mortgageApplication.productModel.monthlySupply,
        // 押品信息
        orderCars: mortgageApplication.carDataSet
      },
      // 客户资料
      {
        personal: personalCustomerInfo.customerModel
      },
      // 客户职业
      {
        personalJob: customerJob.jobModel
      },
      // 客户联系人
      {
        personalContacts: [
          ...personalCustomerContact.familyDataSet,
          ...personalCustomerContact.friendDataSet
        ]
      },
      // 客户来源
      {
        personalResourceIntroduce: customerOrigin.originType === 2 ? customerOrigin.introduceModel : null,
        personalResourcePublicity: customerOrigin.originType === 1 ? customerOrigin.getPublicityModel() : null,
      },
      // 客户素材
      {
        personalDatas: uploadTheMaterial.uploadDataSet
      }
    );

    return CreateOrderModel;
  }
}
</script>
<style lang="less" scoped>
.page.personal-mortgage-application {
  & > * {
    margin-bottom: 10px;
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
}
</style>
