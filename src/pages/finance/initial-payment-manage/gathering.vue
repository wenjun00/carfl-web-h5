<!--收款-->
<template>
  <section class="page gathering">
    <span class="form-title">收款</span>
    <i-button type="text">昨日</i-button>
    <i-button type="text">今日</i-button>
    <i-button type="text">本周</i-button>
    <i-button type="text">本月</i-button>
    <i-button type="text">上月</i-button>
    <i-button type="text">最近三月</i-button>
    <i-button type="text">本季度</i-button>
    <i-button type="text">本年</i-button>
    <i-button @click="openSearch" style="color:#265EA2">
      <span v-if="!searchOptions">展开</span>
      <span v-if="searchOptions">关闭</span>
      <span>高级搜索</span>
    </i-button>
    <i-row v-if="searchOptions" style="margin:6px;">
      <i-input style="display:inline-block;width:18%;margin-left:20px;" placeholder="请录入收款账户名查询"></i-input>
      <span style="margin-left:10px">日期：</span>
      <i-input style="display:inline-block;width:10%"></i-input>~
      <i-input style="display:inline-block;width:10%"></i-input>
      <i-button style="margin-left:10px" class="blueButton">搜索</i-button>
    </i-row>
    <data-box :columns="columns1" :data="data1"></data-box>

    <template>
      <i-modal v-model="openColumnsConfig" title="列配置" @on-ok="confirm">
        <data-box :columns="columns2" :data="data2"></data-box>
        <div slot="footer">
          <i-button>上移</i-button>
          <i-button>下移</i-button>
          <i-button>恢复默认</i-button>
          <i-button @click="openColumnsConfig=false">关闭</i-button>
        </div>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
  import DataBox from "~/components/common/data-box.vue";
  import Page from "~/core/page";
  import Component from "vue-class-component";

  import {
    Tooltip
  } from 'iview'
  import {
    Dependencies
  } from "~/core/decorator";
import {
    Layout
  } from "~/core/decorator";

  @Layout("workspace")
  @Component({
   
    components: {
      DataBox
    }
  })
  export default class Gathering extends Page {
    private columns1: any;
    private data1: Array < Object > = [];
    private columns2: any;
    private data2: Array < Object > = [];
    private searchOptions: Boolean = false;
    private openColumnsConfig: Boolean = false;

    openSearch() {
      this.searchOptions = !this.searchOptions;
    }

    created() {
      this.columns1 = [{
          align: "center",
          type: "index",
          width: "60",
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
        },
        {
          title: "操作",
          width: "120",
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
          key: "handleStatus",
          align: "center"
        },
        {
          align: "center",
          title: "处理时间",
          key: "handleTime",
          width: '160'
        },
        {
          align: "center",
          title: "处理人",
          key: "handlePerson"
        },
        {
          align: "center",
          title: "收款类型",
          key: "gatheringType"
        },
        {
          align: "center",
          title: "收款总金额",
          key: "gatheringTotalAmt"
        },
        {
          align: "center",
          title: "收款账户名",
          key: "gatheringAccountName"
        },
        {
          align: "center",
          title: "申请日期",
          key: "applyDate"
        },
        {
          align: "center",
          title: "申请人",
          key: "applyPerson"
        }
      ];

      this.data1 = [{
        handleStatus: '未处理',
        handleTime: '2017-12-01 13:56:03',
        handlePerson: '胡开甲',
        gatheringType: '销售收款',
        gatheringTotalAmt: '79450.00',
        gatheringAccountName: '泰康人寿',
        applyDate: '2017-12-03 13:56:03',
        applyPerson: '刘佳'
      }]

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
          columnsName:"申请人"
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

<style>

</style>