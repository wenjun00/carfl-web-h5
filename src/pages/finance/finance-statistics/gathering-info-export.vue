<!--收款信息导出-->
<template>
  <section class="page gathering-info-export">
    <span style="font-size:18px;font-weight:bold">收款信息导出</span>
    <span style="margin-left:10px;">处理日期：</span>
    <i-input></i-input>~
    <i-input></i-input>
    <i-button class="blueButton" style="margin-left:10px;">搜索</i-button>
    <div style="font-size:16px;cursor:pointer;display:inline-block;margin-left:10px;color:#3367A7">
      <svg-icon iconClass="daochu"></svg-icon>
      <span>导出</span>
    </div>
    <i-row v-if="searchOptions" style="margin:6px;">
      <i-input style="display:inline-block;width:10%;" placeholder="请输入客户姓名"></i-input>
      <i-button class="blueButton">搜索</i-button>
    </i-row>
    <data-box :columns="columns1" :data="data1"></data-box>

    <template>
      <i-modal v-model="openColumnsConfig" title="列配置">
        <!--<i-table :columns="columns2" :data="data2" border stripe @on-select="multipleSelect"></i-table>-->
        <i-table :columns="columns2" :data="data2"></i-table>
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
  import Page from "~/core/page";
  import DataBox from "~/components/common/data-box.vue";
  import Component from "vue-class-component";
  import SvgIcon from '~/components/common/svg-icon.vue'
  import {
    Dependencies
  } from "~/core/decorator";
  import {
    OrderService
  } from "~/services/business-service/order.service";
import {
    Layout
  } from "~/core/decorator";

  @Layout("workspace")
  @Component({
   
    components: {
      DataBox,
      SvgIcon
    }
  })
  export default class GatheringInfoExport extends Page {
    @Dependencies(OrderService) private orderService: OrderService;
    private columns1: any;
    private data1: Array < Object > = [];
    private columns2: any;
    private data2: Array < Object > = [];
    private searchOptions: Boolean = false;
    private openColumnsConfig: Boolean = false;

    created() {
      this.columns1 = [{
          title: "序号",
          width: 60,
          align: 'center',
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
        },
        {
          title: "收款账户名称",
          key: "gatheringAccountName",
          align: 'center'
        }, {
          title: "收款类型",
          key: "gatheringAccountType",
          width: 160,
          align: 'center'
        },
        {
          title: "收款总金额",
          key: "gatheringAccountTotalAccount",
          width: 160,
          align: 'center'
        },
        {
          title: "收款日期",
          key: "gatheringAccountDate",
          width: 160,
          align: 'center'
        },
        {
          title: "申请人",
          key: "applyPerson",
          width: 100,
          align: 'center'
        },
        {
          title: "申请部门",
          key: "applyDept",
          width: 180,
          align: 'center'
        },
        {
          title: "处理日期",
          key: "handleDate",
          width: 100,
          align: 'center'
        },
        {
          title: "处理人",
          key: "handlePerson",
          width: 100,
          align: 'center'
        },
        {
          title: "处理部门",
          key: "handleDept",
          width: 100,
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
          columnsName: "收款类型"
        },
        {
          columnsName: "收款总金额"
        },
        {
          columnsName: "申请日期"
        },
        {
          columnsName: "申请人"
        },
        {
          columnsName: "申请部门"
        },
        {
          columnsName: "处理日期"
        },
        {
          columnsName: "处理人"
        },
        {
          columnsName: "处理部门"
        }
      ];

      this.data1 = [{
        gatheringAccountName: '上海协通众明汽车销售服务有限公司',
        gatheringAccountType: '销售收款',
        gatheringAccountTotalAccount: '50000',
        gatheringAccountDate: '2017-12-02',
        applyPerson: '胡开甲',
        applyDept: '群泰南京',
        handleDate: '2017-12-03',
        handlePerson: '李楠',
        handleDept: '群泰南京'
      }]
    }
    getOrderInfoByTime() {}
    openSearch() {
      this.searchOptions = !this.searchOptions;
    }
    exportMonthReport() {
      console.log(12314)
    }
    columnsConfig() {
      this.openColumnsConfig = true;
    }
  }
</script>