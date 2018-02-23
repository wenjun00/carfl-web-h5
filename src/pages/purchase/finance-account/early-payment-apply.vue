<!--提前结清申请-->
<template>
  <section class="page early-payment-apply specialInput">
    <div class="header">
      <span class="form-title">提前结清申请</span>
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
                <i-option v-for="item in orderNumberIdModels" :key="item.orderId" :value="item.orderId" :label="item.orderNumber"></i-option>
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
      <i-button style="height:40px;position:relative;top:60px;" class="blueButton" @click="clearAll">清空</i-button>
    </i-row>
    <i-tabs v-model="materialTabs" type="card" class="early-pay-tabs">
      <i-tab-pane name="gather-detail-early-pay" label="收款明细">
        <gather-detail-early-pay :checkOrderId="checkOrderId" ref="gather-detail-early-pay"></gather-detail-early-pay>
      </i-tab-pane>
      <i-tab-pane name="upload-the-material" label="上传素材">
        <upload-the-material></upload-the-material>
      </i-tab-pane>
    </i-tabs>
    <div class="shade" :style="{display:disabledStatus}">
    </div>
    <div class="submitBar">
      <i-row type="flex" align="middle" style="padding:14px">
        <i-col :span="8" push="1">
          <span style="height:40px;display:inline-block;line-height:3">申请人：administrator</span>
        </i-col>
        <i-col :span="10" pull="4">
          <span>申请时间：2017-12-01 13:56:56</span>
        </i-col>
        <i-col :span="6" style="text-align:right;position:relative;bottom:6px;">
          <i-button class="highDefaultButton">保存草稿</i-button>
          <i-button class="highButton">保存并提交</i-button>
        </i-col>
      </i-row>
    </div>
    <!--编辑收款项-->
    <!-- <template>
      <i-modal v-model="modifyGatherItemModal" title="编辑收款项" width="300">
        <modify-gather-item></modify-gather-item>
      </i-modal>
    </template> -->

    <!--变更收款项-->
    <!-- <template>
      <i-modal v-model="changeGatherItemModal" title="变更收款项">
        <change-gather-item></change-gather-item>
      </i-modal>
    </template> -->
  </section>
</template>
<script lang="ts">
import Page from "~/core/page";
import Component from "vue-class-component";
import { Dependencies } from "~/core/decorator";
import { ApplyQueryService } from "~/services/business-service/apply-query.service";
import DataBox from "~/components/common/data-box.vue";
import { PageService } from "~/utils/page.service";
import SvgIcon from "~/components/common/svg-icon.vue";
import { Layout } from "~/core/decorator";
import UploadTheMaterial from "~/components/purchase-manage/upload-the-material.vue";
import ModifyGatherItem from "~/components/purchase-manage/modify-gather-item.vue";
import ChangeGatherItem from "~/components/purchase-manage/change-gather-item.vue";
import GatherDetailEarlyPay from "~/components/purchase-manage/gather-detail-early-pay.vue";
import { WithdrawApplicationService } from "~/services/manage-service/withdraw-application.service";
import { setTimeout } from "core-js/library/web/timers";

@Layout("workspace")
@Component({
  components: {
    DataBox,
    SvgIcon,
    UploadTheMaterial,
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
  applyRule: Object = {};
  private purchaseData: Object = {
    province: "",
    city: "",
    company: ""
  };
  // private columns1: any;
  private columns2: any;
  private columns3: any;
  private data1: Array<Object> = [];
  private data2: Array<Object> = [];
  private data3: Array<Object> = [];
  private orderNumberIdModels: Array<any> = [];
  private loading: Boolean = false;
  private addCar: Boolean = false;
  private personalId: Number = 0;
  private checkOrderId: Number = 0;
  private isShown: Boolean = true;
  private modifyGatherItemModal: Boolean = false;
  private changeGatherItemModal: Boolean = false;
  private materialTabs: String = "gather-detail-early-pay";
  private disabledStatus: String = ""; // 子组件中输入框禁用flag

  created() {
    // this.columns1 = [
    //   {
    //     title: "操作",
    //     width: 240,
    //     align: "center",
    //     render: (h, { row, column, index }) => {
    //       if (row.itemName !== "合计") {
    //         return h("div", [
    //           h(
    //             "i-button",
    //             {
    //               props: {
    //                 type: "text"
    //               },
    //               style: {
    //                 color: "#265EA2"
    //               },
    //               on: {
    //                 click: () => {
    //                   this.modifyGatherItem();
    //                 }
    //               }
    //             },
    //             "编辑"
    //           ),
    //           h(
    //             "i-button",
    //             {
    //               props: {
    //                 type: "text"
    //               },
    //               style: {
    //                 color: "#265EA2"
    //               },
    //               on: {
    //                 click: () => {
    //                   this.$Modal.confirm({
    //                     title: "提示",
    //                     content: "确定删除吗？",
    //                     onOk: () => {
    //                       this.data1.forEach((x, i) => {
    //                         if (i === index) {
    //                           this.data1.splice(i, 1);
    //                         }
    //                       });
    //                     }
    //                   });
    //                 }
    //               }
    //             },
    //             "删除"
    //           )
    //         ]);
    //       }
    //     }
    //   },
    //   {
    //     key: "itemName",
    //     title: "项目名称",
    //     align: "center"
    //   },
    //   {
    //     key: "itemMoney",
    //     title: "金额",
    //     align: "center"
    //   }
    // ];

    this.columns3 = [
      {
        key: "accountName",
        align: "center",
        title: "户名"
      },
      {
        key: "openAccountBank",
        align: "center",
        title: "开户银行"
      },
      {
        key: "bankCardId",
        align: "center",
        title: "银行卡号"
      },
      {
        key: "branchBankName",
        align: "center",
        title: "支行名称"
      },
      {
        key: "thirdCustomId",
        align: "center",
        title: "第三方客户号"
      }
    ];
    this.data1 = [
      {
        itemName: "首付金额",
        itemMoney: "9000"
      },
      {
        itemName: "首付月供",
        itemMoney: "9000"
      },
      {
        itemName: "合计",
        itemMoney: "18000"
      }
    ];
    this.columns2 = [
      {
        type: "selection",
        align: "center"
      },
      {
        title: "车辆品牌",
        key: "brand",
        align: "center",
        width: "86"
      },
      {
        title: "车辆型号",
        key: "model",
        align: "center",
        width: "86"
      },
      {
        title: "车身颜色",
        key: "color",
        align: "center",
        width: "86"
      },
      {
        title: "车辆排量",
        key: "output",
        align: "center",
        width: "86"
      },
      {
        title: "车辆配置",
        key: "configuration",
        align: "center",
        width: "86"
      },
      {
        title: "上牌地区",
        key: "area",
        align: "center",
        width: "86"
      },
      {
        title: "车辆牌照",
        key: "license",
        align: "center",
        width: "86"
      },
      {
        title: "所在门店",
        key: "store",
        align: "center",
        width: "86"
      },
      {
        title: "状态",
        key: "status",
        align: "center",
        width: "86"
      }
    ];
  }
  /**
   * 订单号change
   */
  changeOrderId(val) {
    if (val) {
      this.checkOrderId = val; // 将选择的订单号传给变更收款项按钮点击事件中
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
          },
          ({ msg }) => {
            this.$Message.error(msg);
          }
        );
    }
  }
  modifyGatherItem() {
    this.modifyGatherItemModal = true;
  }
  /**
   * 变更收款项
   */
  changeGatherItem() {
    this.changeGatherItemModal = true;
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
   * 清空
   */
  clearAll() {
    this.$Modal.confirm({
      title: "提示",
      content:
        "您有未保存的销售收款申请,清空会删除页面内容，是否确认清空申请内容！",
      onOk: () => {
        this.resetAll();
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
}

.specialInput {
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

.early-payment-apply {
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
    top: 315px;
    z-index: 999;
  }
}
</style>
