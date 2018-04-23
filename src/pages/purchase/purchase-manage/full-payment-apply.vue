<!--全款销售申请-->
<template>
  <section class="page full-payment-apply">

    <page-header title="全款销售申请" hiddenExport>
      <command-button label="添加新申请" @click="onReset"></command-button>
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

    <div v-show="!showApplicationTab" class="emptyText">
      请先填写证件信息
    </div>

    <!--资料填写 start-->
    <i-tabs v-show="showApplicationTab" class="fulls-pay-tabs">
      <i-tab-pane label="选购资料" name="choose-buy-materials-all">
        <choose-buy-materials-all ref='materials-all'></choose-buy-materials-all>
      </i-tab-pane>
      <i-tab-pane label="客户资料" name="customer-materials-all">
        <customer-materials-all ref="materials"></customer-materials-all>
      </i-tab-pane>
    </i-tabs>
    <!--资料填写 end -->

    <!--底部操作栏-start-->
    <div class="fixed-container">
      <!-- <i-button size="large" class="highDefaultButton" @click="draftsaveAndSubmit(true)">保存草稿</i-button> -->
      <i-button size="large" class="highButton" style="margin-left:10px;" @click="saveAndSubmit(false)">提交申请</i-button>
    </div>
    <!--底部操作栏-end-->

  </section>
</template>
<script lang="ts">
import Page from "~/core/page";
import Component from "vue-class-component";
import { Dependencies } from "~/core/decorator";
import { ApplyQueryService } from "~/services/business-service/apply-query.service";
import { PersonalService } from "~/services/manage-service/personal.service";
import { ProductOrderService } from "~/services/manage-service/product-order.service";

import DataBox from "~/components/common/data-box.vue";
import { PageService } from "~/utils/page.service";
import SvgIcon from "~/components/common/svg-icon.vue";
import { Layout } from "~/core/decorator";
import AddCar from "~/components/purchase-manage/add-car.tsx.vue";
import HistoricalRecord from "~/components/purchase-manage/historical-record.vue";

import ChooseBuyMaterialsAll from "~/components/purchase-manage/choose-buy-materials-all.tsx.vue";
import CustomerMaterialsAll from "~/components/purchase-manage/customer-materials-all.vue";
import SalesmanName from "~/components/purchase-manage/salesman-name.vue";

@Layout("workspace")
@Component({
  components: {
    DataBox,
    SvgIcon,
    AddCar,
    ChooseBuyMaterialsAll,
    CustomerMaterialsAll,
    HistoricalRecord,
    SalesmanName
  }
})
export default class FullPaymentApply extends Page {
  @Dependencies() private pageService: PageService;
  @Dependencies(ApplyQueryService) private applyQueryService: ApplyQueryService;
  @Dependencies(PersonalService) private personalService: PersonalService;
  @Dependencies(ProductOrderService)
  private productOrderService: ProductOrderService;

  private showApplicationTab = false; // 申请选项卡显示状态
  private currentIdCard: string = "";
  private customerForm: any = {};

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

  private columns1: any;
  private columns2: any;
  private data1: Array<Object> = [];
  private data2: Array<Object> = [];
  private loading: Boolean = false;
  private addCar: Boolean = false;
  private isShown: Boolean = true;
  private historicalModal: Boolean = false;
  private addOrEditFlag: Boolean = false;
  // private materials: String = 'choose-buy-materials-all'
  private disabledStatus: String = ""; // 子组件中输入框禁用flag
  private historicalDataset: any = [];
  private addcarData: any = [];
  private type: Boolean = false;
  private orderStatus: any = "";
  private spinShow: Boolean = false;
  private salesmanModal: Boolean = false;
  // private currentRowData: any = {};

  /**
   * 归属业务员
   */
  salesmanNamefocus() {
    this.salesmanModal = true;
  }
  choosecurrentData(data) {
    this.customerModel.salesmanName = data.userRealname;
    this.customerModel.salesmanId = data.id;
  }
  /**
   * 清空数据
   */
  resethistory() {
    //   选购资料请空
    let component: any = this.$refs["materials-all"];
    let _parchaseform: any = component.$refs["parchase-form"];
    component.addcarData = [];
    component.totalPrice = "";
    _parchaseform.resetFields();
    //   客户资料清空
    let materials: any = this.$refs["materials"];
    let _parchase: any = materials.$refs["parchase-form"];
    _parchase.resetFields();
  }

  /**
   * 添加新申请
   */
  onReset() {
    this.$Modal.confirm({
      title: "提示",
      content: "有未提交的申请，确定创建新申请吗？",
      onOk: () => this.resetPage,
      onCancel: () => {}
    });
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
              onOk: this.resetPage
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
   * 检测身份证信息
   */
  async checkIdCardValid() {
    if (this.customerModel.idCard.length < 18) {
      return;
    }

    // 验证身份证信息
    let result = await new Promise((reslove, reject) => {
      this.customerForm.validateField("idCard", error => reslove(!error));
    });

    // TODO: 18个1仅用于测试F
    return result || this.customerModel.idCard === "1".repeat(18);
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
        this.customerForm.resetFields();
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

  resetPage() {
    // this.transFlag = false;
    // this.orderNumberIdModels = [];
    this.customerForm.resetFields();
    // this.gatherDetail.resetTable();
    // this.uploadFodder.fodder.reset();
  }

  /**
   * 添加新申请
   */
  addNewApply() {
    this.$Modal.confirm({
      title: "提示",
      content: "有未提交的申请，确定创建新申请吗？",
      onOk: () => {
        let resetData: any = this.$refs["customer-form"];
        resetData.resetFields();
        this.resethistory();
        this.disabledStatus = "";
      },
      onCancel: () => {
        this.$Message.info("取消成功！");
      }
    });
  }
  created() {
    this.columns1 = [
      {
        title: "操作",
        align: "center",
        render: (h, { row, column, index }) => {
          return h("div", [
            h(
              "i-button",
              {
                props: {
                  type: "text"
                },
                style: {
                  color: "#265EA2"
                },
                on: {
                  click: () => {
                    this.addCar = true;
                  }
                }
              },
              "编辑"
            ),
            h(
              "i-button",
              {
                props: {
                  type: "text"
                },
                style: {
                  color: "#265EA2"
                },
                on: {
                  click: () => {
                    this.data1.forEach((x, i) => {
                      if (i === index) {
                        this.data1.splice(i, 1);
                      }
                    });
                  }
                }
              },
              "删除"
            )
          ]);
        }
      },
      {
        title: "品牌/型号",
        key: "columnsName",
        align: "center"
      },
      {
        title: "车身颜色",
        key: "color",
        align: "center"
      },
      {
        title: "单价（元）",
        key: "price",
        align: "center"
      },
      {
        title: "数量",
        key: "amount",
        align: "center"
      },
      {
        title: "车牌号码",
        key: "carNumber",
        align: "center"
      }
    ];

    this.columns2 = [
      {
        type: "selection",
        align: "center",
        width: 60
      },
      {
        title: "车辆品牌",
        key: "brand",
        align: "center",
        width: 86
      },
      {
        title: "车辆型号",
        key: "model",
        align: "center",
        width: 86
      },
      {
        title: "车身颜色",
        key: "color",
        align: "center",
        width: 86
      },
      {
        title: "车辆排量",
        key: "output",
        align: "center",
        width: 86
      },
      {
        title: "车辆配置",
        key: "configuration",
        align: "center"
      },
      {
        title: "上牌地区",
        key: "area",
        align: "center",
        width: 86
      },
      {
        title: "车辆牌照",
        key: "license",
        align: "center"
      },
      {
        title: "所在门店",
        key: "store",
        align: "center"
      },
      {
        title: "状态",
        key: "status",
        align: "center",
        width: 86
      }
    ];
  }

  mounted() {
    this.customerForm = this.$refs["customer-form"];
  }

  ReverseData() {
    let customermodel: any = this.$refs["materials"];
    customermodel.getinfo(this.customerModel);
  }
  /**
   * 根据客户三项查询历史订单
   */
  checkcustomerinfo() {
    this.customerModel.name = "";
    this.customerModel.customerPhone = "";
    this.customerModel.salesmanName = "";
    this.resethistory();
    let customermodel: any = this.$refs["materials"];
    customermodel.getinfo(this.customerModel);
    if (this.customerModel.idCard) {
      this.personalService
        .getCustomerHistoryFinanceInfo(this.customerModel)
        .subscribe(
          data => {
            this.historicalDataset = data;
            if (this.historicalDataset.length) {
              this.historicalModal = true;
            }
            // else {
            //   this.customerModel.name = ''
            //   this.customerModel.customerPhone = ''
            //   this.customerModel.salesmanName = ''
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
          ({ msg }) => {
            this.$Message.error(msg);
          }
        );
    }
  }
  /**
   * 客户信息反显
   */
  distributionData(data, orderStatus) {
    console.log(data, 80800);
    this.customerModel.name = data.personal.name;
    this.customerModel.customerPhone = data.personal.mobileMain;
    this.customerModel.salesmanName = data.salesmanName;
    //   选购信息反显
    let _materialsall: any = this.$refs["materials-all"];
    _materialsall.Reverse(data);
    //   客户资料
    let _materials: any = this.$refs["materials"];
    _materials.Reverse(data);
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
    let component: any = this.$refs["materials-all"];
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
        vehicleColour: item.vehicleColour
      });
    }
    //   客户资料
    let materials: any = this.$refs["materials"];
    let customerData: any = materials.customerData;
    console.log(customerData, 900000000000000);
    if (type) {
      this.orderStatus = 303;
    } else {
      this.orderStatus = 304;
    }
    component.addcarData.map(v => {
      (v.carSeriesId = v.seriesId),
        (v.amount = v.carAmount),
        (v.vehicleColour = v.carColour),
        (v.vehicleEmissions = v.carEmissions);
    });
    component.addcarData.forEach(v => delete v.id);
    let savesubmitDataset: any = {
      idCard: this.customerModel.idCard,
      name: this.customerModel.name,
      mobileMain: this.customerModel.customerPhone,
      salesmanName: this.customerModel.salesmanName,
      salesmanId: this.customerModel.salesmanId,
      city: choosebusyData.city,
      companyId: choosebusyData.companyId,
      province: choosebusyData.province,
      orderCars: component.addcarData, // 车辆
      personal: customerData,
      orderServiceList: customerData.orderServiceList,
      orderStatus: this.orderStatus
    };
    this.productOrderService
      .createFullPaymentOrder(savesubmitDataset)
      .subscribe(
        data => {
          this.spinShow = true;
          setTimeout(() => {
            this.$Message.success("保存成功！");
            this.spinShow = false;
          }, 1000);
        },
        ({ msg }) => {
          this.$Message.error(msg);
        }
      );
  }
  /**
   * 保存并提交
   */
  saveAndSubmit(type) {
    this.customerForm.validate(valid => {
      if (!valid) {
        return false;
      } else {
        let component: any = this.$refs["materials-all"];
        let _parchaseform: any = component.$refs["parchase-form"];
        console.log(_parchaseform, "_parchaseform");
        _parchaseform.validate(valid => {
          console.log(valid, "valid");
          if (!valid) {
            this.$Message.warning("您有未输入的选项，请先检查并输入后再提交！");
            return false;
          } else {
            let _materials: any = this.$refs["materials"];
            let _parchase: any = _materials.$refs["parchase-form"];
            _parchase.validate(valid => {
              if (!valid) {
                this.$Message.warning(
                  "您有未输入的选项，请先检查并输入后再提交！"
                );
                return false;
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
                    vehicleColour: item.vehicleColour
                  });
                }
                console.log(
                  component.addcarData.length,
                  "component.addcarData"
                );
                if (component.addcarData.length === 0) {
                  this.$Message.warning("请添加车辆信息");
                  return;
                }
                //   客户资料
                let materials: any = this.$refs["materials"];
                let customerData: any = materials.customerData;
                console.log(customerData, 900000000000000);
                if (type) {
                  this.orderStatus = 303;
                } else {
                  this.orderStatus = 304;
                }
                component.addcarData.map(v => {
                  (v.carSeriesId = v.seriesId),
                    (v.amount = v.carAmount),
                    (v.vehicleColour = v.carColour),
                    (v.vehicleEmissions = v.carEmissions);
                });
                component.addcarData.forEach(v => delete v.id);
                let savesubmitDataset: any = {
                  idCard: this.customerModel.idCard,
                  name: this.customerModel.name,
                  mobileMain: this.customerModel.customerPhone,
                  salesmanName: this.customerModel.salesmanName,
                  salesmanId: this.customerModel.salesmanId,
                  city: choosebusyData.city,
                  companyId: choosebusyData.companyId,
                  province: choosebusyData.province,
                  orderCars: component.addcarData, // 车辆
                  personal: customerData,
                  orderServiceList: customerData.orderServiceList,
                  orderStatus: this.orderStatus
                };
                console.log(savesubmitDataset, 8888);
                this.productOrderService
                  .createFullPaymentOrder(savesubmitDataset)
                  .subscribe(
                    data => {
                      this.spinShow = true;
                      setTimeout(() => {
                        this.$Message.success("保存成功！");
                        this.spinShow = false;
                      }, 1000);
                    },
                    ({ msg }) => {
                      this.$Message.error(msg);
                    }
                  );
              }
            });
          }
        });
      }
    });
  }
  showTab() {
    if (this.customerModel.idCard.length === 18) {
      this.disabledStatus = "none";
    }
  }
  confirmAndBack() {
    //   this.editCarModal = false
    this.applyQueryService.getFullQueryData().subscribe(({ val }) => {
      this.data1 = val;
    });
  }
}
</script>

<style lang="less" scoped>
.page.full-payment-apply {
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
</style>
