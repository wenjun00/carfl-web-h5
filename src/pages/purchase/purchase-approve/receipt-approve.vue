<!--收款审批-->
<template>
  <section class="page receipt-approve">
    <page-header title="收款审批" hiddenPrint></page-header>
    <data-form hidden-date-search :model="receipt" :page="pageService" @on-search="searchReceiptapprove">
      <template slot="input">
        <i-form-item prop="dynamicCondition">
          <i-input placeholder="请录入订单编号\客户姓名\证件号码\联系号码查询" v-model="receipt.dynamicCondition"></i-input>
        </i-form-item>
        <i-form-item prop="applicationType" label="申请类型">
          <i-select placeholder="请选择申请类型" v-model="receipt.applicationType" clearable>
            <i-option v-for="{value,label} in $dict.getDictData('0109')" :key="value" :label="label" :value="value"></i-option>
          </i-select>
        </i-form-item>
      </template>
      <template slot="button">
        <i-checkbox v-model="receipt.isIncludeDealt">包含已处理</i-checkbox>
      </template>
    </data-form>
    <data-box :id="381" :columns="columns1" :data="data1" :page="pageService"></data-box>
    <!--Model-->

    <template>
      <i-modal title="审批" width="500" v-model="approvalModal">
      </i-modal>
    </template>

    <template>
      <i-modal v-model="checkApplyModal" class="addApply" :title="type===1?'收款审批':'查看'" width="800" :transfer="false">
        <!--<add-apply></add-apply>-->
        <apply-detail ref="applyDetail"></apply-detail>
        <div slot="footer">
          <i-button class="highDefaultButton" style="width:80px" @click="rebackClick" v-if="type===1">退回</i-button>
          <i-button class="highButton" style="width:80px" @click="passClick" v-if="type===1">通过</i-button>
        </div>
      </i-modal>
    </template>
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
    State,
    Mutation,
    namespace
  } from "vuex-class";
  import PurchaseInformation from "~/components/purchase-manage/purchase-information.vue";
  import SvgIcon from "~/components/common/svg-icon.vue";
  import {
    Watch
  } from "vue-property-decorator";
  // 添加新申请
  import AddApply from "~/components/purchase-manage/add-apply.vue";
  // import Approval from "~/components/common/approval.vue";
  import {
    FinanceApprovalHistoryService
  } from "~/services/manage-service/finance-approval-history.service";
  import {
    PageService
  } from "~/utils/page.service";
  import {
    Layout
  } from "~/core/decorator";
  import {
    FilterService
  } from "~/utils/filter.service"; // 添加新申请
  import ApplyDetail from "~/components/purchase-manage/apply-detail.vue";
  const ModuleMutation = namespace('purchase', Mutation)

  @Layout("workspace")
  @Component({
    components: {
      DataBox,
      SvgIcon,
      AddApply,
      // Approval,
      ApplyDetail
    }
  })
  export default class ReceiptApprove extends Page {
    @Dependencies(FinanceApprovalHistoryService)
    private financeApprovalHistoryService: FinanceApprovalHistoryService;
    @Dependencies(PageService) private pageService: PageService;
    @ModuleMutation paymentRecordFlag;
    private columns1: any;
    private data1: Array < Object > = [];
    private searchOptions: Boolean = false;
    private approvalModal: Boolean = false;
    private checkApplyModal: Boolean = false;
    private addAttachmentShow: Boolean = false;
    private applyInformation: Array < Object > = [];
    private withdrawId: any = "";
    private type: any = "";
    private receipt: any = {
      applicationType: "", // 全部申请类型
      isIncludeDealt: "", // 包含已处理
      dynamicCondition: ""
    };

    @Watch("paymentRecordFlag")
    flagChang() {
      this.searchReceiptapprove();
    }
    addNewApply() {
      this.$Modal.info({
        title: "新增申请",
        render: h => h(AddApply)
      });
    }
    activated() {
      this.searchReceiptapprove();
    }
    created() {
      this.searchReceiptapprove();
      this.columns1 = [{
          title: "操作",
          align: "center",
        minWidth: this.$common.getColumnWidth(5),
          fixed: "left",
          render: (h, {
            row,
            columns,
            index
          }) => {
            if (row.approvalDealStatus === 125) {
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
                        this.checkApplyModal = true;
                        this.withdrawId = row.applicationId;
                        this.financeApprovalHistoryService
                          .withdrawApplicationDetail({
                            withdrawId: row.applicationId
                          })
                          .subscribe(val => {
                            console.log(val, "val");
                            this.applyInformation = val;
                            let _applyInfo: any = this.$refs["applyDetail"];
                            _applyInfo.getparentData(this.applyInformation, row, 1);
                          });
                      }
                    }
                  },
                  "审批"
                )
              ]);
            } else if (row.approvalDealStatus === 126) {
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
                        this.checkApplyModal = true;
                        this.financeApprovalHistoryService
                          .withdrawApplicationDetail({
                            withdrawId: row.applicationId
                          })
                          .subscribe(val => {
                            this.applyInformation = val;
                            let _applyInfo: any = this.$refs["applyDetail"];
                            _applyInfo.getparentData(this.applyInformation, row, 0);
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
          key: "approvalDealStatus",
          align: "center",
          minWidth: this.$common.getColumnWidth(4),
          render: (h, {
            row,
            columns,
            index
          }) => {
            return h("span", {}, this.$dict.getDictName(row.approvalDealStatus));
          }
        },
        {
          title: "处理时间",
          editable: true,
          key: "dealDate",
          align: "center",
          minWidth: this.$common.getColumnWidth(6),
          render: (h, {
            row,
            columns,
            index
          }) => {
            return h(
              "span",
              FilterService.dateFormat(row.operatorTime, "yyyy-MM-dd hh:mm:ss")
            );
          }
        },
        {
          title: "处理人",
          editable: true,
          key: "dealerName",
          align: "center",
          minWidth: this.$common.getColumnWidth(3),

        },
        {
          title: "收款类型",
          editable: true,
          key: "applicationType",
          align: "center",
          minWidth: this.$common.getColumnWidth(3),
          render: (h, {
            row,
            columns,
            index
          }) => {
            return h("span", {}, this.$dict.getDictName(row.applicationType));
          }
        },
        {
          title: "收款金额",
          editable: true,
          key: "totalPayment",
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
              this.$filter.toThousands(row.totalPayment)
            );
          }
        },
        {
          title: "收款账户名",
          editable: true,
          key: "accountName",
          align: "center",
          minWidth: this.$common.getColumnWidth(4),
        },
        {
          title: "申请日期",
          editable: true,
          key: "operatorTime",
          align: "center",
          minWidth: this.$common.getColumnWidth(6),
          render: (h, {
            row,
            columns,
            index
          }) => {
            return h(
              "span",
              FilterService.dateFormat(row.operatorTime, "yyyy-MM-dd hh:mm:ss")
            );
          }
        },
        {
          title: "申请人",
          editable: true,
          key: "operatorName",
          align: "center",
          minWidth: this.$common.getColumnWidth(3),
        }
      ];
    }

    getOrderInfoByTime() {}
    openSearch() {
      this.searchOptions = !this.searchOptions;
    }
    /**
     * 搜索
     */
    searchReceiptapprove() {
      if (this.receipt.isIncludeDealt) {
        this.receipt.isIncludeDealt = 1;
      } else {
        this.receipt.isIncludeDealt = 0;
      }
      this.financeApprovalHistoryService
        .getWithdrawApprovalList(this.receipt, this.pageService)
        .subscribe(
          data => {
            this.data1 = data;
          },
          ({
            msg
          }) => {
            this.$Message.error(msg);
          }
        );
    }
    /**
     * 审批通过
     */
    passClick() {
      let passData: any = {
        isPass: 1,
        withdrawId: this.withdrawId
      };
      this.financeApprovalHistoryService
        .withdrawApplicationApprovalPass(passData)
        .subscribe(
          data => {
            this.$Message.success("审批成功！");
            this.checkApplyModal = false;
            this.searchReceiptapprove();
          },
          ({
            msg
          }) => {
            this.$Message.error(msg);
          }
        );
    }
    /**
     * 退回
     */
    rebackClick() {
      let passData: any = {
        isPass: 0,
        withdrawId: this.withdrawId
      };
      this.financeApprovalHistoryService
        .withdrawApplicationApprovalRefuse(passData)
        .subscribe(
          data => {
            this.$Message.success("退回成功！");
            this.checkApplyModal = false;
            this.searchReceiptapprove();
          },
          ({
            msg
          }) => {
            this.$Message.error(msg);
          }
        );
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
  .page.receipt-approve {
    .data-form {
      margin-top: 10px;
      margin-left: 10px;
      .data-form-item {
        display: inline-block;
        width: 10%;
        margin-left: 10px;
      }
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
      span {
        font-size: 12px;
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
