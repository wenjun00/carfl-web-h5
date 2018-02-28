<!--收款-->
<template>
  <section class="page gathering">
    <span class="form-title">收款</span>
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
      <i-input style="display:inline-block;width:18%;margin-left:20px;" v-model="gatherModel.accountName" placeholder="请录入收款账户名查询"></i-input>
      <span style="margin-left:10px">日期：</span>
      <i-date-picker style="display:inline-block;width:10%" v-model="gatherModel.queryStartDate"></i-date-picker>~
      <i-date-picker style="display:inline-block;width:10%" v-model="gatherModel.queryEndDate"></i-date-picker>
      <i-button style="margin-left:10px" class="blueButton" @click="getGatherListByCondition">搜索</i-button>
    </i-row>
    <data-box :columns="columns1" :data="gatherList"></data-box>

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
      <i-modal v-model="confirmGatherModal" title="确认收款" width="900" class="confirmGather" :transfer="false">
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
    Dependencies
  } from "~/core/decorator";
  import {
    Layout
  } from "~/core/decorator";
  import {
    CollectMoneyHistoryService
  } from "~/services/manage-service/collect-money-history.service";
  import {
    PageService
  } from "~/utils/page.service";
  import {
    FilterService
  } from "~/utils/filter.service"
  @Layout("workspace")
  @Component({

    components: {
      DataBox,
      ConfirmGather
    }
  })
  export default class Gathering extends Page {
    @Dependencies(CollectMoneyHistoryService) private collectMoneyHistoryService: CollectMoneyHistoryService;
    @Dependencies(PageService) private pageService: PageService;
    private columns1: any;
    private gatherList: Array < Object > = [];
    private columns2: any;
    private data2: Array < Object > = [];
    private searchOptions: Boolean = false;
    private openColumnsConfig: Boolean = false;
    private confirmGatherModal: Boolean = false;
    private gatherModel: any = {
      accountName: '',
      queryStartDate: '',
      queryEndDate: '',
      timeSearch: ''
    }
    getEarlyPayList() {

    }
    getTimeSearch(val) {
      this.gatherModel.settlementChannel = ''
      this.gatherModel.paymentStatus = ''
      this.gatherModel.dynamicParam = ''
      this.gatherModel.timeSearch = val
      this.getEarlyPayList()
      this.gatherModel.timeSearch = ''
    }
    openSearch() {
      this.searchOptions = !this.searchOptions;
    }
    saveDraft() {
      this.$Message.success('保存草稿成功！')
      this.confirmGatherModal = false
    }
    created() {
      this.getGatherListByCondition()
      this.columns1 = [
        {
          title: "操作",
          width: 120,
          fixed: "left",
          align: "center",
          render: (h, {
            row,
            column,
            index
          }) => {
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
                "确认收款"
              )
            ]);
          }
        },
        {
          title: "处理状态",
          key: "collectMoneyDealStatus",
          align: "center",
          render: (h, {
            row,
            column,
            index
          }) => {
            return h("span", {}, this.$dict.getDictName(row.collectMoneyDealStatus));
          }
        },
        {
          align: "center",
          title: "处理时间",
          key: "dealTime",
          width: 180,
          render: (h, {
            row,
            column,
            index
          }) => {
            return h('span', FilterService.dateFormat(row.dealTime, 'yyyy-MM-dd hh:mm:ss'))
          }
        },
        {
          align: "center",
          title: "处理人",
          key: "dealerName"
        },
        {
          align: "center",
          title: "收款类型",
          key: "applicationType",
          render: (h, {
            row,
            column,
            index
          }) => {
            return h("span", {}, this.$dict.getDictName(row.applicationType));
          }
        },
        {
          align: "center",
          title: "收款总金额",
          key: "totalPayment"
        },
        {
          align: "center",
          title: "收款账户名",
          key: "accountName"
        },
        {
          align: "center",
          title: "申请日期",
          key: "operatorTime",
          render: (h, {
            row,
            column,
            index
          }) => {
            return h('span', FilterService.dateFormat(row.operatorTime, 'yyyy-MM-dd hh:mm:ss'))
          }
        },
        {
          align: "center",
          title: "申请人",
          key: "operatorName"
        }
      ];

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
          columnsName: "收款类型"
        },
        {
          columnsName: "收款总金额"
        },
        {
          columnsName: "收款账户名"
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
    /**
     * 获取收款列表
     */
    getGatherListByCondition() {
      this.collectMoneyHistoryService.collectMoneyHistoryList(this.gatherModel, this.pageService).subscribe(val => {
        this.gatherList = val
      })
    }
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
