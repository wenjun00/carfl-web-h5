<!--付款-->
<template>
  <section class="page payment">
    <span class="form-title">付款</span>
    <i-button type="text" @click="getTimeSearch(0)">昨日</i-button>
    <i-button type="text" @click="getTimeSearch(1)">今日</i-button>
    <i-button type="text" @click="getTimeSearch(2)">本周</i-button>
    <i-button type="text" @click="getTimeSearch(3)">本月</i-button>
    <i-button type="text" @click="getTimeSearch(4)">上月</i-button>
    <i-button type="text" @click="getTimeSearch(5)">最近三月</i-button>
    <i-button type="text" @click="getTimeSearch(6)">本季度</i-button>
    <i-button type="text" @click="getTimeSearch(7)">本年</i-button>
    <i-button @click="openSearch" style="color:#265EA2">
      <span v-if="!searchOptions">展开</span>
      <span v-if="searchOptions">收起</span>
      <span>高级搜索</span>
    </i-button>
    <i-row v-if="searchOptions" style="margin:6px;position:relative;right:16px;">
      <i-input style="display:inline-block;width:18%;margin-left:20px;" v-model="approvalModel.refundName" placeholder="请录入付款账户名查询"></i-input>
      <span style="margin-left:10px">日期：</span>
      <i-date-picker type="date" style="display:inline-block;width:10%" v-model="approvalModel.startTime"></i-date-picker>~
      <i-date-picker type="date" style="display:inline-block;width:10%" v-model="approvalModel.endTime"></i-date-picker>
      <i-button style="margin-left:10px" @click="getOrderQuery" class="blueButton">搜索</i-button>
    </i-row>
    <data-box :columns="columns1" :data="paymentData"></data-box>

    <template>
      <i-modal v-model="openColumnsConfig" title="列配置" @on-ok="confirm">
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
      <i-modal v-model="confirmGatherModal" title="确认付款" width="900" class="confirmGather" :transfer="false">
        <confirm-gather></confirm-gather>
        <div slot="footer">
          <i-button class="highDefaultButton" @click="saveDraft">保存草稿</i-button>
          <i-button class="highButton" @click="confirmGatherModal=false">退回</i-button>
          <i-button class="highButton" @click="confirmGatherModal=false">确认</i-button>
        </div>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
  import DataBox from "~/components/common/data-box.vue";
  import Page from "~/core/page";
  import Component from "vue-class-component";
  import ConfirmGather from "~/components/finance-manage/confirm-gather.vue"
  import {
    Tooltip
  } from 'iview'
  import {
    FilterService
  } from "~/utils/filter.service";
  import {
    Dependencies
  } from "~/core/decorator";
  import {
    RefundApplicationService
  } from "~/services/manage-service/refund-application.service";
  import {
    PageService
  } from "~/utils/page.service";
  import {
    Layout
  } from "~/core/decorator";

  @Layout("workspace")
  @Component({

    components: {
      DataBox,
      ConfirmGather
    }
  })
  export default class Payment extends Page {
    @Dependencies(RefundApplicationService) private refundApplicationService: RefundApplicationService;
    @Dependencies(PageService) private pageService: PageService;
    private columns1: any;
    private paymentData: Array < Object > = [];
    private columns2: any;
    private data2: Array < Object > = [];
    private searchOptions: Boolean = false;
    private refundName: String = '';
    private openColumnsConfig: Boolean = false;
    private confirmGatherModal: Boolean = false;
    private startTime: any;
    private endTime: any;
    private approvalModel: any = {
      refundName: '',
      timeSearch: '',
      startTime: '',
      endTime: ''
    }
    openSearch() {
      this.searchOptions = !this.searchOptions;
    }
    saveDraft() {
      this.$Message.success('保存草稿成功！')
      this.confirmGatherModal = false
    }
    getOrderQuery() {
      this.refundApplicationService.getApprovalRecord(this.approvalModel, this.pageService).subscribe(val => {
        this.paymentData = val
      })
    }
    getTimeSearch(val) {
      this.approvalModel.startTime = "";
      this.approvalModel.endTime = "";
      this.approvalModel.timeSearch = val;
      this.getOrderQuery();
      this.approvalModel.timeSearch = "";
    }
    getApproval() {
      this.refundApplicationService.getApprovalRecord(this.approvalModel, this.pageService).subscribe(val => {
        this.paymentData = val
      })
    }
    created() {
      this.getApproval()
      this.columns1 = [
        {
          title: "操作",
          width: 120,
          align: "center",
          fixed: "left",
          render: (h, {
            row,
            column,
            index
          }) => {
            if (row.handleStatus === '未处理') {
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
                        this.confirmGatherModal = true
                      }
                    }
                  },
                  "确认付款"
                )
              ]);
            } else if (row.handleStatus === '已处理') {
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
                        this.confirmGatherModal = true
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
          title: '处理状态',
          key: 'processStatus',
          align: 'center',
          render: (h, {
            row,
            column,
            index
          }) => {
            return h("span", {}, this.$dict.getDictName(row.processStatus));
          }
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
          title: '付款总金额',
          key: 'refundTotalAmount',
          align: 'center'
        }, {
          title: '付款账户名',
          key: 'customerName',
          align: 'center'
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
        }
      ]

      this.columns2 = [{
          title: "序号",
          type: "index",
          width: "80",
          align: "center"
        },
        {
          title: "列名",
          key: "columnsName",
          align: "center"
        },
        {
          type: "selection",
          width: "80",
          align: "center"
        }
      ];
      this.data2 = [{
          columnsName: "处理状态"
        },
        {
          columnsName: "处理时间"
        },
        {
          columnsName: "处理人"
        },
        {
          columnsName: "付款类型"
        },
        {
          columnsName: "付款总金额"
        },
        {
          columnsName: "付款账户名"
        },
        {
          columnsName: "申请日期"
        },
        {
          columnsName: "申请人"
        }
      ];
    }
    columnsConfig() {
      this.openColumnsConfig = true;
    }
    /**
     * 确定
     */
    confirm() {}
  }

</script>

<style lang="less">
  .confirmGather {
    .ivu-modal-body {
      height: 600px;
      overflow: auto;
    }
  }

</style>
