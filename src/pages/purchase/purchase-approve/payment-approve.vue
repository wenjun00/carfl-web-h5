<!--放款审批-->
<template>
  <section class="page payment-approve">
    <page-header title="放款审批" hiddenPrint></page-header>
    <data-form hidden-date-search :model="approvalModel" @on-search="openSearch">
      <template slot="input">
        <!-- <i-form-item prop="dynamicParams">
          <i-input placeholder="请录入订单编号\客户姓名\证件号码\联系号码查询" v-model="approvalModel.dynamicParams"></i-input>
        </i-form-item> -->
         <i-form-item prop="orderNumber" label="订单编号：">
          <i-input v-model="approvalModel.orderNumber" placeholder="请输入订单编码"></i-input>
        </i-form-item>
         <i-form-item prop="approvalStatus" label="处理状态">
          <i-select placeholder="请选择申请类型" v-model="approvalModel.approvalStatus" clearable>
            <i-option v-for="{value,label} in $dict.getDictData('0417')" :key="value" :label="label" :value="value"></i-option>
          </i-select>
        </i-form-item>
        <i-form-item prop="dateRange" label="日期：">
          <i-date-picker v-model="approvalModel.dateRange" type="daterange" placeholder="请选择日期范围"></i-date-picker>
        </i-form-item>
      </template>
      <!-- <template slot="button">
        <i-checkbox v-model="status">包含已处理</i-checkbox>
      </template> -->
    </data-form>
    <data-box :id="390" :columns="columns1" :data="refundApproval"></data-box>

    <template>
      <i-modal v-model="checkApplyModal" class="addApply" :title="type===1?'放款审批':'查看'" :width="800" @on-visible-change="resetData">
        <apply-out ref="applyOut"></apply-out>
        <div slot="footer">
          <i-button class="highDefaultButton" style="width:80px" @click="backApply" v-if="type===1">退回</i-button>
          <i-button class="highButton" style="width:80px" @click="passApply" v-if="type===1">通过</i-button>
        </div>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
import Page from "~/core/page";
import Component from "vue-class-component";
import DataBox from "~/components/common/data-box.vue";
import SvgIcon from "~/components/common/svg-icon.vue";
// 添加新申请
import ApplyOut from "~/components/purchase-manage/apply-out.vue";
import {
  FilterService
} from "~/utils/filter.service";
import {
  RefundApplicationService
} from "~/services/manage-service/refund-application.service";
import {
  PageService
} from "~/utils/page.service";
import {
  Layout
} from "~/core/decorator";
import {
  Dependencies
} from "~/core/decorator";

@Layout("workspace")
@Component({
  components: {
    DataBox,
    SvgIcon,
    ApplyOut
  }
})
export default class PaymentApprove extends Page {
  @Dependencies(RefundApplicationService)
  private refundApplicationService: RefundApplicationService;
  @Dependencies(PageService) private pageService: PageService;
  private columns1: any;
  private columns2: any;
  private refundApproval: Array<Object> = [];
  private applyInformation: Array<Object> = [];
  private data2: Array<Object> = [];
  private searchOptions: Boolean = false;
  private openColumnsConfig: Boolean = false;
  // private approvalModal: Boolean = false;
  private checkApplyModal: Boolean = false;
  private addAttachmentShow: Boolean = false;
  private refundId: String = "";
  private type: any = "";
  // private status: Boolean = true;
  private approvalModel: any = {
    orderNumber:'',     // 订单编号
    dateRange:[],       // 时间
    startTime: '',
    endTime: '',
    approvalStatus: ""  //处理状态
  };
  addNewApply() {
    this.$Modal.info({
      title: "新增申请",
      render: h => h(ApplyOut)
    });
  }
  getApproval() {
    // if (this.status) {
    //   this.approvalModel.approvalStatus = 1130;
    // } else {
    //   this.approvalModel.approvalStatus = '';
    // }
    this.refundApplicationService
      .getApprovalRecord(this.approvalModel, this.pageService)
      .subscribe(
      data => {
        this.refundApproval = data;
      },
      ({
            msg
          }) => {
        this.$Message.error(msg);
      }
      );
  }
  activated() {
    this.openSearch()
  }
  /**
   * 搜索
   */
  openSearch() {
    this.getApproval();
  }
  /**
   * 通过申请
   */
  passApply() {
    this.refundApplicationService
      .passRefundApplication({
        refundId: this.refundId
      })
      .subscribe(
      data => {
        this.$Message.success("审批成功！");
        this.checkApplyModal = false;
        this.getApproval();
      },
      ({
            msg
          }) => {
        this.$Message.error(msg);
      }
      );
  }
  /**
   * 退回申请
   */
  backApply() {
    this.refundApplicationService
      .returnRefundApplication({
        refundId: this.refundId
      })
      .subscribe(
      data => {
        this.$Message.success("退回成功！");
        this.checkApplyModal = false;
        this.getApproval();
      },
      ({
            msg
          }) => {
        this.$Message.error(msg);
      }
      );
  }
  created() {
    this.getApproval();
    this.columns2 = [{}];
    this.columns1 = [
      {
        title: "操作",
        align: "center",
        fixed: "left",
        minWidth: this.$common.getColumnWidth(5),
        render: (h, { row}) => {
          if ([1130, 1129].includes(row.processStatus)) {
            return h("div", [
              h(
                "i-button", {
                  props: {
                    type: "text"
                  },
                  style: {
                    color: "#265EA2"
                  },
                  on: {
                    click: () => {
                      this.type = 1;
                      this.refundId = row.refundApplicationId;
                      this.checkApplyModal = true;
                      this.refundApplicationService
                        .getRefundApplicationById({
                          refundId: row.refundApplicationId
                        })
                        .subscribe(val => {
                          this.applyInformation = val;
                          let _applyInfo: any = this.$refs["applyOut"];
                          let value = Object.assign(
                            {
                              collectMoneyItemModels: val.itemList,
                              personalBank: "",
                              customerName: val.personal.name,
                              refundTotalAmount:val.refundTotalAmount
                            },
                            val.personal,
                            val.productOrder
                          )
                          value.personalBank = val.bankListk
                          _applyInfo.getparentreceipt(value, 1);
                        });
                    }
                  }
                },
                "审批"
              )
            ]);
          } else if (row.processStatus === 1131) {
            return h("div", [
              h(
                "i-button", {
                  props: {
                    type: "text"
                  },
                  style: {
                    color: "#265EA2"
                  },
                  on: {
                    click: () => {
                      this.type = 0
                      this.refundId = row.refundApplicationId;
                      this.checkApplyModal = true;
                      this.refundApplicationService
                        .getRefundApplicationById({
                          refundId: row.refundApplicationId
                        })
                        .subscribe(val => {
                          this.applyInformation = val;
                          let _applyInfo: any = this.$refs["applyOut"];
                          let value = Object.assign(
                            {
                              applicationType: val.refundType,
                              collectMoneyItemModels: val.itemList,
                              personalBank: "",
                              customerName: val.personal.name
                            },
                            val.personal,
                            val.productOrder
                          )
                          value.personalBank = val.bankListk
                          _applyInfo.getparentData(value, row, 0);
                        });
                    }
                  }
                },
                "查看"
              )
            ]);
          }
        }
      },
      {
        title: "审核状态",
        editable: true,
        key: "processStatus",
        align: "center",
        minWidth: this.$common.getColumnWidth(3),
        render: (h, {
            row,
          column,
          index
          }) => {
          return h("span", {}, this.$dict.getDictName(row.processStatus));
        }
      },
      {
        title: "处理时间",
        editable: true,
        key: "processTime",
        minWidth: this.$common.getColumnWidth(6),
        align: "center",
        render: (h, {
            row,
          column,
          index
          }) => {
          return h(
            "span",
            FilterService.dateFormat(row.processTime, "yyyy-MM-dd hh:mm:ss")
          );
        }
      },
      {
        title: "处理人",
        editable: true,
        minWidth: this.$common.getColumnWidth(3),
        key: "processName",
        align: "center"
      },
      {
        title: "付款金额",
        editable: true,
        key: "refundTotalAmount",
        align: "center",
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row }) => {
          return h(
            "div",
            {
              style: {
                textAlign: "right"
              }
            },
            this.$filter.toThousands(row.refundTotalAmount)
          );
        }


      },
      {
        title: "客户账户名",
        editable: true,
        key: "customerName",
        align: "center",
        minWidth: this.$common.getColumnWidth(4),
      },
      {
        title: "开户银行",
        editable: true,
        key: "depositBank",
        align: "center",
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row}) => {
          return h('span', {}, this.$dict.getDictName(row.depositBank))
        }
      },
      {
        title: "银行卡号",
        editable: true,
        key: "cardNumber",
        align: "center",
        minWidth: this.$common.getColumnWidth(6),
      },
      {
        title: "申请日期",
        editable: true,
        key: "operateTime",
        align: "center",
        minWidth: this.$common.getColumnWidth(6),
        render: (h, {
            row,
          column,
          index
          }) => {
          return h(
            "span",
            FilterService.dateFormat(row.operateTime, "yyyy-MM-dd hh:mm:ss")
          );
        }
      },
      {
        title: "制单人",
        editable: true,
        key: "operator",
        align: "center",
        minWidth: this.$common.getColumnWidth(3),
      }
    ];

    this.data2 = [{
      columnsName: "申请类型"
    },
    {
      columnsName: "环节"
    },
    {
      columnsName: "状态"
    },
    {
      columnsName: "订单编号"
    },
    {
      columnsName: "订单创建时间"
    },
    {
      columnsName: "收款金额"
    },
    {
      columnsName: "收款类型"
    },
    {
      columnsName: "产品名称"
    },
    {
      columnsName: "客户姓名"
    },
    {
      columnsName: "证件号码"
    },
    {
      columnsName: "联系号码"
    }
    ];
  }

  getOrderInfoByTime() { }
  /**
   * 列配置
   */
  columnsConfig() {
    this.openColumnsConfig = true;
  }
  resetData(){
    let applyInfo: any = this.$refs["applyOut"] as ApplyOut;
    applyInfo.reset();
  }
}

</script>

<style lang="less" scoped>
.page.payment-approve {
  // .data-form {
  //   margin-left: 10px;
  //   margin-top: 10px;
  //   .data-form-item {
  //     display: inline-block;
  //     width: 10%;
  //     margin-left: 10px;
  //   }
  // }
  // .command-item {
  //   margin-left: 10px;
  // }
  // .command-item-sinout {
  //   font-size: 16px;
  //   cursor: pointer;
  //   display: inline-block;
  //   color: #3367A7;
  //   float: right;
  //   margin-right: 10px;
  //   margin-top: 10px;
  //   span {
  //     font-size: 12px;
  //   }
  // }
}

.addApply {
  .ivu-modal-body {
    height: 600px;
    overflow: auto;
  }
}
</style>
