<!--融资租赁申请-->
<template>
  <section class="page financing-lease-apply">
    <page-header title="融资租赁申请">
      <command-button label="添加新申请" @click="onReset"></command-button>
      <command-button label="业务流程图" @click="onOpenFlowModal"></command-button>
    </page-header>
    <!-- 搜索表单-start -->
    <div class="search-container">
      <i-form :label-width="90" ref="customer-form" class="search-form" :model="customerModel" label-position="right" :rules="customerRule">
        <i-row :gutter="20">
          <i-col span="10">
            <i-form-item label="证件号码" prop="idCard">
              <i-input type="text" :maxlength="18" v-model="customerModel.idCard" autofocus @on-change="onCheckHistoryOrder">
              </i-input>
            </i-form-item>
          </i-col>
          <i-col span="10">
            <i-form-item label="客户姓名" prop="name">
              <i-input type="text" :maxlength="13" v-model="customerModel.name">
              </i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row :gutter="20">
          <i-col span="10">
            <i-form-item label="客户电话" prop="mobileMain">
              <i-input type="text" v-model="customerModel.mobileMain">
              </i-input>
            </i-form-item>
          </i-col>
          <i-col span="10">
            <i-form-item label="归属业务员" prop="salesmanName">
              <i-input type="text" :maxlength="13" readonly v-model="customerModel.salesmanName" @on-focus="showSalemanList"></i-input>
            </i-form-item>
          </i-col>
        </i-row>
      </i-form>
    </div>
    <!-- 搜索表单-end -->

    <!-- 资料申请选项卡-start -->
    <i-tabs v-show="showApplicationTab" v-model="currentTab" class="application-tabs">
      <i-button size="small" type="ghost" @click="onNextStep" v-show="currentStep < 5" slot="extra">下一步</i-button>
      <i-tab-pane label="选购资料" name="choose-buy-materials">
        <choose-buy-materials ref="choose-buy-materials" v-show="currentTab==='choose-buy-materials'"></choose-buy-materials>
      </i-tab-pane>
      <i-tab-pane :disabled="currentStep < 1" label="客户资料" name="customer-materials">
        <customer-materials ref="customer-materials" v-show="currentTab==='customer-materials'"></customer-materials>
      </i-tab-pane>
      <i-tab-pane :disabled="currentStep < 2" label="客户职业" name="customer-job-message">
        <customer-job-message ref="customer-job-message" v-show="currentTab==='customer-job-message'"></customer-job-message>
      </i-tab-pane>
      <i-tab-pane :disabled="currentStep < 3" label="客户联系人" name="customer-contacts">
        <customer-contacts ref="customer-contacts" v-show="currentTab==='customer-contacts'"></customer-contacts>
      </i-tab-pane>
      <i-tab-pane :disabled="currentStep < 4" label="客户来源" name="customer-origin">
        <customer-origin ref="customer-origin" v-show="currentTab==='customer-origin'"></customer-origin>
      </i-tab-pane>
      <i-tab-pane :disabled="currentStep < 5" label="上传素材" name="upload-the-material">
        <upload-the-material ref="upload-the-material" v-show="currentTab==='upload-the-material'"></upload-the-material>
      </i-tab-pane>
    </i-tabs>

    <div v-show="!showApplicationTab" class="emptyText">
      请先填写证件信息
    </div>
    <!-- 资料选项卡-end -->

    <!--底部操作栏-start-->
    <div class="fixed-container" v-show="currentStep >= 5">
      <i-button size="large" class="highDefaultButton" @click="onSubmit(true)">保存草稿</i-button>
      <i-button size="large" class="highButton" style="margin-left:10px;" @click="onSubmit(false)">保存并提交</i-button>
    </div>
    <!--底部操作栏-end-->
  </section>
</template>

<script lang="tsx">
import Page from "~/core/page";
import Component from "vue-class-component";
import { Dependencies } from "~/core/decorator";

import { PersonalService } from "~/services/manage-service/personal.service";
import { ProductOrderService } from "~/services/manage-service/product-order.service";
import { State, Mutation, namespace } from "vuex-class";
import { Layout } from "~/core/decorator";
import { CityService } from "~/utils/city.service";
import { FilterService } from "~/utils/filter.service";
import { Form } from "iview";

import HistoricalRecord from "~/components/purchase-manage/historical-record.vue";
import SalesmanName from "~/components/purchase-manage/salesman-name.vue";
import ChooseBuyMaterials from "~/components/purchase-manage/choose-buy-materials.tsx.vue"; // 选购资料
import CustomerMaterials from "~/components/purchase-manage/customer-materials.vue"; // 客户资料
import CustomerJobMessage from "~/components/purchase-manage/customer-job-message.vue"; // 客户职业
import UploadTheMaterial from "~/components/purchase-manage/upload-the-material.vue"; // 上传素材
import CustomerContacts from "~/components/purchase-manage/customer-contacts.vue"; // 客户联系人
import CustomerOrigin from "~/components/purchase-manage/customer-origin.vue"; // 客户来源

const ModuleState = namespace("purchase", State);

@Layout("workspace")
@Component({
  components: {
    ChooseBuyMaterials,
    CustomerMaterials,
    CustomerJobMessage,
    CustomerOrigin,
    UploadTheMaterial,
    CustomerContacts,
    HistoricalRecord,
    SalesmanName
  }
})
export default class FinancingLeaseApply extends Page {
  @Dependencies(PersonalService) private personalService: PersonalService;
  @Dependencies(ProductOrderService)
  private productOrderService: ProductOrderService;
  @ModuleState collectiondata;

  private showApplicationTab = false; // 申请选项卡显示状态
  private currentIdCard = ""; // 上次查询的身份证号
  private currentStep = 0;
  private applicationTabList = [
    "choose-buy-materials",
    "customer-materials",
    "customer-job-message",
    "customer-contacts",
    "customer-origin",
    "upload-the-material"
  ];

  private addCar: Boolean = false;
  private currentTab = "choose-buy-materials";
  private historicalModal: Boolean = false;
  private historicalDataset: any = [];
  private PersonalData: any = [];
  private addcarData: any = [];
  private type: Boolean = false;
  private orderStatus: any = "";
  private salesmanModal: Boolean = false;
  private spinShow: Boolean = false;

  // 客户信息表单数据
  private customerModel: any = {
    idCard: "", // 证件号码
    name: "", // 客户姓名
    mobileMain: "", // 客户电话
    salesmanName: "" // 归属业务员
  };

  // 客户信息表单校验
  private customerRule: any = {
    idCard: [
      {
        required: true,
        message: "请输入证件号码",
        trigger: "blur"
      },
      { validator: this.$validator.idCard, trigger: "blur" }
    ],
    name: [
      {
        required: true,
        message: "请输入客户姓名",
        trigger: "blur"
      }
    ],
    mobileMain: [
      {
        required: true,
        message: "请输入客户电话",
        trigger: "blur"
      },
      { validator: this.$validator.phoneNumber, trigger: "blur" }
    ],
    salesmanName: [
      {
        required: true,
        message: "请选择归属业务员"
      }
    ]
  };

  mounted() {
    if (
      this.$store.state.pageList.find(v => v.resoname === "融资租赁申请").flag
    ) {
      this.customerModel = this.collectiondata;
      this.customerModel.name = this.collectiondata.personalName;
      // this.showTab();
    }
  }

  /**
   * 执行流程操作
   */
  async onNextStep() {
    let tab = this.$refs[this.currentTab] as any;
    console.log(tab);
    // 验证当前页面
    let result = await tab.validate();

    if (result) {
      this.currentStep++;
      this.currentTab = this.applicationTabList[this.currentStep];
    }
  }

  /**
   * 业务流程图
   */
  onOpenFlowModal() {
    this.$Modal.info({
      width: "90%",
      scrollable: true,
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
                src: "/static/images/common/yewuliucheng-bg.jpg"
              }
            })
          ]
        );
      }
    });
  }

  ReverseData() {
    let customermodel: any = this.$refs["customer-materials"];
    customermodel.getinfo(this.customerModel);
  }

  closeProduct() {
    let choose: any = this.$refs["choose-buy-materials"];
    choose.closeProductForm();
  }

  /**
   * 检测身份证信息
   */
  async checkIdCardValid() {
    if (this.customerModel.idCard.length < 18) {
      return;
    }
    // 客户表单
    let customerForm = this.$refs["customer-form"] as Form;

    // 验证身份证信息
    let result = await new Promise((reslove, reject) => {
      customerForm.validateField("idCard", error => reslove(!error));
    });

    // TODO: 18个1仅用于测试F
    return result || this.customerModel.idCard === "1".repeat(18);
  }

  /**
   * 检测历史订单
   */
  async onCheckHistoryOrder() {
    // 检测身份证
    if (!await this.checkIdCardValid()) {
      return;
    }

    // 查询历史数据
    this.personalService
      .getCustomerHistoryFinanceInfo({
        idCard: this.customerModel.idCard
      })
      .subscribe(
        data => {
          if (data.length) {
            return this.showHistoryOrder(data);
          }

          // 判断是否需要重置信息
          if (
            this.currentIdCard &&
            this.currentIdCard !== this.customerModel.idCard
          ) {
            this.$Modal.confirm({
              title: "提醒",
              content: "证件号码更新,是否要重置申请信息?",
              onOk: this.resetApplicationTab
            });
          }

          // 更新历史查询身份证号
          this.currentIdCard = this.customerModel.idCard;
          this.showApplicationTab = true;

          // TODO: 根据身份证获取性别和生日信息
        },
        ({ msg }) => {
          this.$Message.error(msg);
        }
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

        // TODO: 更新历史订单信息
      },
      onCancel: () => {
        let customerForm = this.$refs["customer-form"] as Form;
        customerForm.resetFields();
      },
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
   * 显示历史订单
   */
  showSalemanList() {
    let dialog = this.$dialog.show({
      title: "销售员列表",
      footer: true,
      onOk: salesmanName => {
        let currentRow = salesmanName.getCurrentRow();
        console.log(currentRow);
        if (!currentRow) {
          this.$Message.error("请选择对应销售员");
          return false;
        }

        // 更新销售人员信息
        this.customerModel.salesmanName = currentRow.userRealname;
        this.customerModel.salesmanId = currentRow.id;
      },
      render: h => {
        return h(SalesmanName);
      }
    });
  }

  /**
   * 重置申请选项卡数据
   */
  resetApplicationTab() {}

  /**
   * 提交申请数据
   */
  async onSubmit(validate) {
    let result = true;

    if (validate) {
      result = await this.validate();
    }

    if (!result) {
    }

    this.submitApplicationData(validate);
  }

  async validate() {
    let result = true;

    // 执行验证
    for (let key of this.applicationTabList) {
      let tab = this.$refs[key] as any;
      result = result && (await tab.validate());
      if (!result) {
        break;
      }
    }

    // 验证结果
    if (!result) {
      return result;
    }

    // TODO: 自定义验证
  }

  /**
   * 获取申请数据
   */
  getApplicationData() {
    let chooseBuyMaterials = this.$refs[
      "choose-buy-materials"
    ] as ChooseBuyMaterials;
    let customerMaterials = this.$refs[
      "customer-materials"
    ] as CustomerMaterials;
    let customerJobMessage = this.$refs[
      "customer-job-message"
    ] as CustomerJobMessage;
    let customerContacts = this.$refs["customer-contacts"] as CustomerContacts;
    let customerOrigin = this.$refs["customer-origin"] as CustomerOrigin;
    let uploadTheMaterial = this.$refs[
      "upload-the-material"
    ] as UploadTheMaterial;

    // 订单基础信息
    let CreateOrderModel = Object.assign(
      {},
      chooseBuyMaterials.chooseModel,
      chooseBuyMaterials.productModel
    );
    // 订单车辆信息
    let OrderCar = chooseBuyMaterials.carDataSet;
    let Personal = Object.assign({});

    return {
      CreateOrderModel: Object.assign(
        {},
        chooseBuyMaterials.chooseModel,
        chooseBuyMaterials.productModel
      ),
      OrderCar: chooseBuyMaterials.carDataSet,
      Personal: Object.assign({})
    };
  }

  /**
   * 提交申请数据
   */
  submitApplicationData(draft) {
    let data = this.getApplicationData();
    // 添加订单
    this.productOrderService.saveFinanceApplyInfo(data).subscribe(
      data => {
        this.$Message.success("保存成功");
      },
      ({ msg }) => {
        this.$Message.error(msg);
      }
    );
  }

  /**
   * 客户信息反显
   */
  distributionData(data, orderStatus) {
    this.customerModel.name = data.personal.name;
    this.customerModel.mobileMain = data.personal.mobileMain;
    this.customerModel.salesmanName = data.salesmanName;
    //   选购资料反显
    let _choosebuymaterials: any = this.$refs["choose-buy-materials"];
    _choosebuymaterials.Reverse(data, orderStatus);
    //   客户联系人反显
    let _customercontacts: any = this.$refs["customer-contacts"];
    _customercontacts.Reverse(data);
    //   职业信息
    let _customerjobmessage: any = this.$refs["customer-job-message"];
    _customerjobmessage.Reverse(data);
    //   客户资料
    let _customermaterials: any = this.$refs["customer-materials"];
    _customermaterials.Reverse(data);
    //   客户来源
    let _customerorigin: any = this.$refs["customer-origin"];
    _customerorigin.Reverse(data);
    //   上传资料反显
    let _uploadthematerial: any = this.$refs["upload-the-material"];
    _uploadthematerial.Reverse(data);
  }

  /**
   * 添加新申请
   */
  onReset() {
    this.$Modal.confirm({
      title: "提示",
      content: "有未提交的申请，确定创建新申请吗？",
      onOk: () => {
        // TODO: 重置表单数据
        // TODO: 重置选项卡数据
      },
      onCancel: () => {}
    });
  }
}
</script>

<style lang="less" scoped>
.page.financing-lease-apply {
  .search-container {
    padding: 15px;
  }
  .ivu-tabs {
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
}

.financing-lease-apply {
  .ivu-select-selection {
    display: inline-block;
    border-style: none;
    border-bottom-style: solid;
    border-radius: 0;
  }

  .yewuliucheng-bg {
    width: 1000px;
    height: 375px;
    background-image: url("/static/images/common/yewuliucheng-bg.jpg");
    position: absolute;
    left: -1px;
    background-repeat: no-repeat;
    background-size: 1000px 375px;
  }

  .demo-spin-icon-load {
    animation: ani-demo-spin 1s linear infinite;
  }
}
</style>

<style lang="less">
.page.finance-lease-tabs {
  .ivu-input {
    border-style: none;
    border-bottom-style: solid;
    border-radius: 0;
  }
}
</style>
