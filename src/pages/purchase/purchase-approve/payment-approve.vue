<!--付款审批-->
<template>
  <section class="page payment-approve">
    <span class="form-title">付款审批</span>
    <i-input class="data-form-item" placeholder="请录入订单编号\客户姓名\证件号码\联系号码查询" v-model="approvalModel.dynamicParams"></i-input>
    <i-select placeholder="全部申请类型" class="data-form-item" clearable>
      <i-option v-for="{value,label} in $dict.getDictData('0109')" :key="value" :label="label" :value="value"></i-option>
    </i-select>
    <i-checkbox class="command-item" v-model="status">包含已处理</i-checkbox>
    <i-button @click="openSearch" class="blueButton command-item">搜索</i-button>
    <div class="command-item-sinout">
      <svg-icon iconClass="daochu"></svg-icon>
      <span>导出</span>
    </div>
    <data-box :id="390" :columns="columns1" :data="refundApproval"></data-box>
    <!--Model-->
    <!-- <template>
      <i-modal v-model="openColumnsConfig" title="列配置">
        <i-table :columns="columns2" :data="data2"></i-table>
        <div slot="footer">
          <i-button>上移</i-button>
          <i-button>下移</i-button>
          <i-button>恢复默认</i-button>
          <i-button @click="openColumnsConfig=false">关闭</i-button>
        </div>
      </i-modal>
    </template> -->

    <!-- <template>
      <i-modal title="审批" width="500" v-model="approvalModal">
        <approval :addAttachmentShow="addAttachmentShow"></approval>
      </i-modal>
    </template> -->

    <template>
      <i-modal v-model="checkApplyModal" class="addApply" :title="type===1?'付款审批':'查看'" width="800">
        <apply-detail ref="applyDetail"></apply-detail>
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
  import PurchaseInformation from "~/components/purchase-manage/purchase-information.vue";
  import SvgIcon from "~/components/common/svg-icon.vue";
  // 添加新申请
  import ApplyDetail from "~/components/purchase-manage/apply-detail.vue";
  // import Approval from "~/components/common/approval.vue";
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
      ApplyDetail
      // Approval
    }
  })
  export default class PaymentApprove extends Page {
    @Dependencies(RefundApplicationService)
    private refundApplicationService: RefundApplicationService;
    @Dependencies(PageService) private pageService: PageService;
    private columns1: any;
    private columns2: any;
    private refundApproval: Array < Object > = [];
    private applyInformation: Array < Object > = [];
    private data2: Array < Object > = [];
    private searchOptions: Boolean = false;
    private openColumnsConfig: Boolean = false;
    // private approvalModal: Boolean = false;
    private checkApplyModal: Boolean = false;
    private addAttachmentShow: Boolean = false;
    private dynamicParams: String = "";
    private refundId: String = "";
    private type: any = "";
    private status: Boolean = false;
    private approvalModel: any = {
      dynamicParams: "",
      processStatus: ""
    };
    addNewApply() {
      this.$Modal.info({
        title: "新增申请",
        render: h => h(ApplyDetail)
      });
    }
    getApproval() {
      console.log(this.status);
      if (this.status) {
        this.approvalModel.processStatus = "";
      } else {
        this.approvalModel.processStatus = 1130;
      }
      console.log(this.approvalModel, "this.approvalModel");
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
      this.columns1 = [{
          title: "操作",
          align: "center",
          width: 100,
          render: (h, {
            row,
            columns,
            index
          }) => {
            if (row.processStatus === 1130) {
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
                            let _applyInfo: any = this.$refs["applyDetail"];
                            _applyInfo.getparent(this.applyInformation, 1);
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
                            let _applyInfo: any = this.$refs["applyDetail"];
                            _applyInfo.getparent(this.applyInformation, 0);
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
          title: "处理状态",
          editable: true,
          key: "processStatus",
          align: "center",
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
          width: 180,
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
          width: 120,
          key: "processName",
          align: "center"
        },
        {
          title: "付款类型",
          editable: true,
          key: "refundType",
          align: "center",
          render: (h, {
            row,
            column,
            index
          }) => {
            return h("span", {}, this.$dict.getDictName(row.refundType));
          }
        },
        {
          title: "付款金额",
          editable: true,
          key: "refundTotalAmount",
          align: "center"
        },
        {
          title: "客户账户名",
          editable: true,
          key: "customerName",
          align: "center"
        },
        {
          title: "开户银行",
          editable: true,
          key: "depositBank",
          align: "center"
        },
        {
          title: "银行卡号",
          editable: true,
          key: "cardNumber",
          align: "center",
          width: 180
        },
        {
          title: "申请日期",
          editable: true,
          key: "operateTime",
          align: "center",
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
          align: "center"
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

    getOrderInfoByTime() {}
    /**
     * 列配置
     */
    columnsConfig() {
      this.openColumnsConfig = true;
    }
    /**
     * 多选
     */
    multipleSelect(selection) {}
    /**
     * 确定
     */
    confirm() {}
  }

</script>

<style lang="less" scoped>
  .page.payment-approve {
    .data-form-item {
      display: inline-block;
      width: 10%;
      margin-left: 10px;
    }
    .command-item {
      margin-left: 10px;
    }
    .command-item-sinout {
      font-size: 16px;
      cursor: pointer;
      display: inline-block;
      color: #3367A7;
      float: right;
      margin-right: 10px;
      margin-top: 10px;
      span{
          font-size:12px;
      }
    }
  }
  
  .addApply {
    .ivu-modal-body {
      height: 600px;
      overflow: auto;
    }
  }

</style>
