<!--审核记录表-->
<template>
  <section class="page approval-record-table">
    <i-row style="margin-top:10px;">
      <span style="font-size:18px;font-weight:bold">审核记录表</span>
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
    </i-row>
    <i-row v-if="searchOptions" style="margin:6px;position;relative;right:16px;">
      <i-select placeholder="全部状态" style="margin-left:20px;width:10%">
        <i-option label="拒绝" value="拒绝" key="拒绝"></i-option>
        <i-option label="退单" value="退单" key="退单"></i-option>
        <i-option label="通过" value="通过" key="通过"></i-option>
      </i-select>
      <i-select placeholder="全部拒单原因" style="margin-left:20px;width:12%">
        <i-option label="不符合进件条件" value="不符合进件条件" key="不符合进件条件"></i-option>
        <i-option label="欺诈" value="欺诈" key="欺诈"></i-option>
        <i-option label="外部风险" value="外部风险" key="外部风险"></i-option>
        <i-option label="黑名单" value="黑名单" key="黑名单"></i-option>
        <i-option label="法院执行" value="法院执行" key="法院执行"></i-option>
        <i-option label="还款能力不足" value="还款能力不足" key="还款能力不足"></i-option>
        <i-option label="其他" value="其他" key="其他"></i-option>
      </i-select>
      <i-select placeholder="全部拒单细节" style="margin-left:20px;width:15%">
        <i-option label="行业限制" value="行业限制" key="行业限制"></i-option>
        <i-option label="信用卡开户超标" value="信用卡开户超标" key="信用卡开户超标"></i-option>
        <i-option label="话单非本人名下且不满两年" value="话单非本人名下且不满两年" key="话单非本人名下且不满两年"></i-option>
        <i-option label="话单本人明下但不满半年" value="话单本人明下但不满半年" key="话单本人明下但不满半年"></i-option>
      </i-select>
      <span style="margin-left:10px;">日期：</span>
      <i-date-picker style="display:inline-block;width:10%;"></i-date-picker>~
      <i-date-picker style="display:inline-block;width:10%;"></i-date-picker>
      <i-button class="blueButton" style="margin-left:20px;">搜索</i-button>
    </i-row>
    <data-box :columns="columns1" :data="data1"></data-box>

    <template>
      <i-modal v-model="openColumnsConfig" title="列配置">
        <i-table :columns="columns3" :data="data3"></i-table>
        <div slot="footer">
          <i-button>上移</i-button>
          <i-button>下移</i-button>
          <i-button>恢复默认</i-button>
          <i-button @click="openColumnsConfig=false">关闭</i-button>
        </div>
      </i-modal>
    </template>

    <!--进度查询-->
    <template>
      <i-modal v-model="orderProgressModal" title="审核进度" width="1000">
        <order-progress></order-progress>
        <div slot="footer"></div>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
  import Page from "~/core/page";
  import DataBox from "~/components/common/data-box.vue";
  import Component from "vue-class-component";
  import OrderProgress from "~/components/purchase-query/order-progress.vue";
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
      OrderProgress
    }
  })
  export default class ApprovalRecordTable extends Page {
    @Dependencies(OrderService) private orderService: OrderService;
    private columns1: any;
    private data1: Array < Object > = [];
    private searchOptions: Boolean = false;
    private roleName: String = "";
    private openCreateCompact: Boolean = false;
    private openColumnsConfig: Boolean = false;
    private openCompact: Boolean = false;
    private columns2: any;
    private data2: Array < Object > = [];
    private data3: Array < Object > = [];
    private checkRadio: String = "融资租赁合同";
    private columns3: any;
    private orderProgressModal: Boolean = false;

    openSearch() {
      this.searchOptions = !this.searchOptions;
    }
    created() {
      this.columns3 = [{
        title: '序号',
        type: 'index',
        width: 80,
        align: 'center'
      }, {
        title: '列名',
        key: 'columnsName',
        align: 'center'
      }, {
        type: 'selection',
        width: 80,
        align: 'center'
      }]

      this.data3 = [{
        columnsName: '申请类型'
      }, {
        columnsName: '环节'
      }, {
        columnsName: '订单状态'
      }, {
        columnsName: '订单创建时间'
      }, {
        columnsName: '进入资源池时间'
      }, {
        columnsName: '省份'
      }, {
        columnsName: '城市'
      }, {
        columnsName: '订单类型'
      }, {
        columnsName: '客户姓名'
      }, {
        columnsName: '证件号'
      }, {
        columnsName: '手机号'
      }]
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
        },
        {
          title: "操作",
          width: 100,
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
                      this.orderProgressModal = true
                    }
                  }
                },
                "查看"
              )
            ]);
          }
        },
        {
          align: "center",
          title: "审核时间",
          key: "approvalTime",
          width: 180
        },
        {
          align: "center",
          title: "省份",
          key: "province",
          width: 160
        },
        {
          align: "center",
          title: "城市",
          key: "city",
          width: 160
        },
        {
          align: "center",
          title: "网点",
          key: "branchAddress",
          width: 160
        },
        {
          align: "center",
          title: "业务员",
          key: "salesman",
          width: 160
        },
        {
          align: "center",
          title: "客户姓名",
          key: "customerName",
          width: 160
        },
        {
          align: "center",
          title: "证件号",
          key: "idCard",
          width: 180
        },
        {
          align: "center",
          title: "审核状态",
          key: "approvalStatus",
          width: 160,
          render: (h, {
            row,
            columns,
            index
          }) => {
            if (row.approvalStatus === '拒绝') {
              return h('span', {
                style: {
                  color: 'red'
                }
              }, row.approvalStatus)
            } else {
              return h('span', {}, row.approvalStatus)
            }
          }
        },
        {
          align: "center",
          title: "是否提车",
          key: "isDeliveryCar",
          width: 180,
          render: (h, {
            row,
            columns,
            index
          }) => {
            if (row.approvalStatus === '拒绝') {
              return h('Tooltip', {
                props: {
                  content: row.content
                },
              }, [h('span', {}, row.isDeliveryCar),
                h('Icon', {
                  props: {
                    type: 'ios-information',
                    size: '20',
                    color: '#F9435D'
                  },
                  style: {
                    position: 'relative',
                    top: '2px',
                    left: '6px',
                    cursor: 'pointer'
                  }
                })
              ])
            } else {
              return h('Tooltip', {
                props: {
                  content: row.content
                },
              }, [h('span', {}, row.isDeliveryCar),
                h('Icon', {
                  props: {
                    type: 'ios-information',
                    size: '20',
                    color: '#666666'
                  },
                  style: {
                    position: 'relative',
                    top: '2px',
                    left: '6px',
                    cursor: 'pointer'
                  }
                })
              ])
            }
          }

        },
        {
          align: "center",
          title: "拒单原因",
          key: "refuseReason",
          width: 160
        },
        {
          align: "center",
          title: "拒单细节",
          key: "refuseDetail",
          width: 160
        },
        {
          align: "center",
          title: "备注",
          key: "remark",
          width: 160
        },
        {
          align: "center",
          title: "审核人员",
          key: "approvalMan",
          width: 160
        }
      ];
      this.data1 = [{
        approvalTime: '2017-12-01 15:36:45',
        province: '陕西',
        city: '西安',
        branchAddress: '大雁塔门店',
        salesman: '吴小川',
        customerName: '韩冰',
        idCard: '610101199006052416',
        approvalStatus: '拒绝',
        isDeliveryCar: '未提车',
        content: '提车失败',
        refuseReason: '风控不过',
        refuseDetail: '',
        remark: '未提车',
        approvalMan: '李蓓'
      }, {
        approvalTime: '2017-12-01 15:36:45',
        province: '陕西',
        city: '西安',
        branchAddress: '大雁塔门店',
        salesman: '吴小川',
        customerName: '韩冰',
        idCard: '610101199006052416',
        approvalStatus: '通过',
        content: '成功提车',
        isDeliveryCar: '已提车',
        refuseReason: '',
        refuseDetail: '',
        remark: '成功提车',
        approvalMan: '李蓓'
      }, {
        approvalTime: '2017-12-01 15:36:45',
        province: '陕西',
        city: '西安',
        branchAddress: '大雁塔门店',
        salesman: '吴小川',
        customerName: '韩冰',
        idCard: '610101199006052416',
        content: '逾期了',
        approvalStatus: '拒绝',
        isDeliveryCar: '未提车',
        refuseReason: '逾期',
        refuseDetail: '银行贷款逾期',
        remark: '',
        approvalMan: '李蓓'
      }, {
        approvalTime: '2017-12-01 15:36:45',
        province: '陕西',
        city: '西安',
        branchAddress: '大雁塔门店',
        salesman: '吴小川',
        customerName: '韩冰',
        idCard: '610101199006052416',
        content: '逾期了',
        approvalStatus: '拒绝',
        isDeliveryCar: '未提车',
        refuseReason: '逾期',
        refuseDetail: '银行贷款逾期',
        remark: '',
        approvalMan: '李蓓'
      }]

    }

    deleteRole(row) {

    }
    allotRole(row) {

    }
    dataPower(row) {

    }
    /**
     * 列配置
     */
    columnsConfig() {
      this.openColumnsConfig = true
    }

  }

</script>
