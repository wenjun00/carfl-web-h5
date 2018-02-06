<!--付款审批-->
<template>
  <section class="page payment-approve">
    <span class="form-title">付款审批</span>
    <i-input placeholder="请录入订单编号\客户姓名\证件号码\联系号码查询" v-model="approvalModel.dynamicParams" style="display:inline-block;width:10%;margin-left:10px;"></i-input>
    <i-select placeholder="全部申请类型" style="width:10%;margin-left:10px;">
      <i-option label="销售收款申请" value="销售收款申请" key="销售收款申请"></i-option>
      <i-option label="提前结清申请" value="提前结清申请" key="提前结清申请"></i-option>
      <i-option label="销售收回申请" value="销售收回申请" key="销售收回申请"></i-option>
    </i-select>
    <i-checkbox style="margin-left:10px;">包含已处理</i-checkbox>
    <i-button style="margin-left:10px" @click="openSearch" class="blueButton">搜索</i-button>
    <div style="font-size:16px;cursor:pointer;display:inline-block;color:#3367A7;float:right;margin-right:10px;margin-top:10px;">
      <svg-icon iconClass="daochu"></svg-icon>
      <span style="font-size: 12px;">导出</span>
    </div>
    <data-box :columns="columns1" :data="refundApproval"></data-box>
    <!--Model-->
    <template>
      <i-modal v-model="openColumnsConfig" title="列配置">
        <i-table :columns="columns2" :data="data2"></i-table>
        <div slot="footer">
          <i-button>上移</i-button>
          <i-button>下移</i-button>
          <i-button>恢复默认</i-button>
          <i-button @click="openColumnsConfig=false">关闭</i-button>
        </div>
      </i-modal>
    </template>

    <template>
      <i-modal title="审批" width="500" v-model="approvalModal">
        <approval :addAttachmentShow="addAttachmentShow"></approval>
      </i-modal>
    </template>

    <template>
      <i-modal v-model="checkApplyModal" class="addApply" title="申请详情" width="800">
        <apply-detail ref="applyDetail"></apply-detail>
        <div slot="footer">
          <i-button class="highDefaultButton" style="width:80px" @click="backApply">退回</i-button>
          <i-button class="highButton" style="width:80px" @click="passApply">通过</i-button>
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
  import SvgIcon from '~/components/common/svg-icon.vue'
  // 添加新申请
  import ApplyDetail from "~/components/purchase-manage/apply-detail.vue";
  import Approval from "~/components/common/approval.vue";
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
      ApplyDetail,
      Approval
    }
  })
  export default class PaymentApprove extends Page {
    @Dependencies(RefundApplicationService) private refundApplicationService: RefundApplicationService;
    @Dependencies(PageService) private pageService: PageService;
    private columns1: any;
    private columns2: any;
    private refundApproval: Array < Object > = [];
    private applyInformation: Array < Object > = [];
    private data2: Array < Object > = [];
    private searchOptions: Boolean = false;
    private openColumnsConfig: Boolean = false
    private approvalModal: Boolean = false
    private checkApplyModal: Boolean = false;
    private addAttachmentShow: Boolean = false;
    private dynamicParams: String = '';
    private refundId: String = '';
    private approvalModel: any = {
      dynamicParams: ''
    }
    addNewApply() {
      this.$Modal.info({
        title: '新增申请',
        render: h => h(ApplyDetail)
      })
    }
    getApproval() {
      this.refundApplicationService.getApprovalRecord(this.approvalModel, this.pageService).subscribe(val => {
        this.refundApproval = val.object.list
      })
    }
    /**
     * 搜索
     */
    openSearch() {
      this.getApproval()
    }
    /**
     * 通过申请
     */
    passApply() {
      this.refundApplicationService.passRefundApplication({
        refundId: this.refundId
      }).subscribe(val => {
        this.$Message.success(val.msg);
        this.checkApplyModal = false
      })
    }
    /**
     * 退回申请
     */
    backApply() {
      this.refundApplicationService.returnRefundApplication({
        refundId: this.refundId
      }).subscribe(val => {
        this.$Message.success(val.msg);
        this.checkApplyModal = false
      })
    }
    created() {
      this.getApproval()
      this.columns2 = [{}]
      this.columns1 = [{
        align: 'center',
        width: 90,
        type: 'index',
        renderHeader: (h, {
          column,
          index
        }) => {
          return h(
            "div", {
              on: {
                click: () => {
                  this.columnsConfig();
                }
              },
              style: {
                cursor: "pointer"
              }
            }, [
              h("Icon", {
                props: {
                  type: "gear-b",
                  size: "20"
                }
              })
            ]
          );
        }
      }, {
        title: '操作',
        align: 'center',
        width: 100,
        render: (h, {
          row,
          columns,
          index
        }) => {
          if (row.processStatus === 1131) {
            return h('div', [
              h('i-button', {
                props: {
                  type: 'text'
                },
                style: {
                  color: '#265EA2'
                },
                on: {
                  click: () => {
                    this.refundId = row.refundApplicationId
                    this.checkApplyModal = true
                    this.refundApplicationService.getRefundApplicationById({
                      refundId: row.refundApplicationId
                    }).subscribe(val => {
                      this.applyInformation = val.object
                      let _applyInfo: any = this.$refs['applyDetail']
                      _applyInfo.getparent(this.applyInformation)
                    })
                  }
                }
              }, '审批')
            ])
          } else if (row.processStatus !== 1131) {
            return h('div', [
              h('i-button', {
                props: {
                  type: 'text'
                },
                style: {
                  color: '#265EA2'
                }
              }, '查看')
            ])
          }
        }
      }, {
        title: '处理状态',
        key: 'processStatus',
        align: 'center'
      }, {
        title: '处理时间',
        key: 'processTime',
        width: 180,
        align: 'center',
        render: (h, {
          row,
          column,
          index
        }) => {
          return h('span', FilterService.dateFormat(row.processTime, 'yyyy-MM-dd hh:mm:ss'))
        }
      }, {
        title: '处理人',
        width: 120,
        key: 'processName',
        align: 'center'
      }, {
        title: '付款类型',
        key: 'refundType',
        align: 'center'
      }, {
        title: '付款金额',
        key: 'refundTotalAmount',
        align: 'center'
      }, {
        title: '客户账户名',
        key: 'customerName',
        align: 'center'
      }, {
        title: '开户银行',
        key: 'depositBank',
        align: 'center'
      }, {
        title: '银行卡号',
        key: 'cardNumber',
        align: 'center',
        width: 180
      }, {
        title: '申请日期',
        key: 'operateTime',
        align: 'center',
        render: (h, {
          row,
          column,
          index
        }) => {
          return h('span', FilterService.dateFormat(row.operateTime, 'yyyy-MM-dd hh:mm:ss'))
        }
      }, {
        title: '制单人',
        key: 'operator',
        align: 'center'
      }]

      this.data2 = [{
        columnsName: '申请类型'
      }, {
        columnsName: '环节'
      }, {
        columnsName: '状态'
      }, {
        columnsName: '订单编号'
      }, {
        columnsName: '订单创建时间'
      }, {
        columnsName: '收款金额'
      }, {
        columnsName: '收款类型'
      }, {
        columnsName: '产品名称'
      }, {
        columnsName: '客户姓名'
      }, {
        columnsName: '证件号码'
      }, {
        columnsName: '联系号码'
      }]
    }

    getOrderInfoByTime() {}
    /**
     * 列配置
     */
    columnsConfig() {
      this.openColumnsConfig = true
    }
    /**
     * 多选
     */
    multipleSelect(selection) {}
    /**
     * 确定
     */
    confirm() {

    }
  }

</script>

<style lang="less">
  .addApply {
    .ivu-modal-body {
      height: 600px;
      overflow: auto;
    }
  }

</style>
