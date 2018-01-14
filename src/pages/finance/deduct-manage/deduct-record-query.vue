<!--划扣记录查询-->
<template>
  <section class="page deduct-record-query">
    <span class="form-title">划扣记录查询</span>
    <i-row style="margin:6px;">
      <span style="margin-left:10px">支付日期：</span>
      <i-date-picker style="display:inline-block;width:10%"></i-date-picker>~
      <i-date-picker style="display:inline-block;width:10%"></i-date-picker>
      <i-input style="display:inline-block;width:18%;margin-left:20px;" placeholder="请输入客户姓名、客户号查询"></i-input>
      <i-select style="width:120px;margin-left:10px;" placeholder="全部">
        <i-option label="初始" value="西安市" key="西安市"></i-option>
        <i-option label="成功" value="宝鸡市" key="宝鸡市"></i-option>
        <i-option label="失败" value="咸阳市" key="咸阳市"></i-option>
        <i-option label="处理中" value="渭南市" key="渭南市"></i-option>
      </i-select>
      <i-button style="margin-left:10px" class="blueButton">搜索</i-button>
    </i-row>
    <data-box :columns="columns1" :data="data1"></data-box>

    <!--Modal-->
    <template>
      <i-modal title="订单领取" v-model="orderModal" width="300">
        <span>确定将所选订单领取到我的审核？</span>
        <div slot="footer">
          <i-button @click="orderModal=false">取消</i-button>
          <i-button @click="orderModal=false" class="blueButton">确定</i-button>
        </div>
      </i-modal>
    </template>

    <template>
      <i-modal v-model="openColumnsConfig" title="列配置">
        <i-table :columns="columns3" :data="data3" highlightRow></i-table>
        <div slot="footer">
          <i-button>上移</i-button>
          <i-button>下移</i-button>
          <i-button>恢复默认</i-button>
          <i-button>关闭</i-button>
        </div>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
  import DataBox from "~/components/common/data-box.vue";
  import Page from "~/core/page";
  import Component from "vue-class-component";
  import PurchaseInformation from "~/components/purchase-query/purchase-information.vue";

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
      DataBox,
      PurchaseInformation
    }
  })
  export default class DeductRecordQuery extends Page {
    private columns1: any;
    private data1: Array < Object > = [];
    private columns2: any;
    private data2: Array < Object > = [];
    private columns3: any;
    private data3: Array < Object > = [];
    private orderModal: Boolean = false;
    private searchOptions: Boolean = false;
    private openColumnsConfig: Boolean = false;

    openSearch() {
      this.searchOptions = !this.searchOptions;
    }
    columnsConfig() {
      this.openColumnsConfig = true;
    }
    created() {
      this.columns3 = [{
          title: "序号",
          type: "index",
          width: 80,
          align: "center"
        },
        {
          title: "列名",
          key: "columnsName",
          align: "center"
        },
        {
          type: "selection",
          width: 80,
          align: "center"
        }
      ]
      this.data3 = [{
        columnsName: '出账日期'
      }, {
        columnsName: '出账客户号'
      }, {
        columnsName: '出账卡号'
      }, {
        columnsName: '客户姓名'
      }, {
        columnsName: '支付银行'
      }, {
        columnsName: '支付金额'
      }, {
        columnsName: '订单号'
      }, {
        columnsName: '交易状态'
      }, {
        columnsName: '失败原因'
      }, {
        columnsName: '操作人'
      }]
      this.columns1 = [{
          align: "center",
          type: "index",
          width: 60,
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
          title: "出账日期",
          align: "center",
          key: "outAccountDate",
          width: 160
        },
        {
          title: "出账客户号",
          key: "outAccountId",
          align: "center",
          render: (h, params) => {
            return h('i-button', {
              props: {
                type: 'text'
              },
              on: {
                click: () => {

                }
              }
            }, '2017101001')
          }
        },
        {
          align: "center",
          title: "出账卡号",
          key: "outAccountCardId",
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
          title: "支付银行",
          key: "payBank"
        },
        {
          align: "center",
          title: "支付金额",
          key: "payAmt"
        },
        {
          align: "center",
          title: "订单号",
          key: "orderId"
        },
        {
          key: 'step',
          title: '交易状态',
          align: 'center',
          width: 120,
          render: (h, {
            row,
            column,
            index
          }) => {
            if (row.customerName === '王泽杰') {
              return h('div', {}, [h('span', {}, '失败'),
                h('Icon', {
                  props: {
                    type: 'eye',
                    size: '20',
                    color: '#265EA2'
                  },
                  style: {
                    position: 'relative',
                    top: '2px',
                    left: '6px',
                    cursor: 'pointer'
                  }
                })
              ])
            } else if (row.customerName === '陈丽') {
              return h('div', {}, [h('span', {}, '处理中'),
                h('Icon', {
                  props: {
                    type: 'loop',
                    size: '20',
                    color: '#265EA2'
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
          title: "失败原因",
          key: "failReason"
        },
        {
          align: "center",
          title: "操作人",
          key: "operator"
        }
      ];

      this.data1 = [{
        outAccountDate: '2017-12-01 13:56:03',
        outAccountCardId: '622700417115654152',
        customerName: '王泽杰',
        payBank: '建行',
        payAmt: '5000',
        orderId: 'KB65014546455',
        failReason: '未知',
        operator: '胡开甲'
      }, {
        outAccountDate: '2017-12-01 13:56:03',
        outAccountCardId: '622700417115654152',
        customerName: '陈丽',
        payBank: '建行',
        payAmt: '5000',
        orderId: 'KB65014546455',
        failReason: '未知',
        operator: '胡开甲'
      }]

      this.columns2 = [{
        align: 'center',
        title: '处理时间',
        key: 'handleTime'
      }, {
        align: 'center',
        key: 'operator',
        title: '操作人'
      }, {
        align: 'center',
        key: 'step',
        title: '环节'
      }]

      this.data2 = [{
        handleTime: '2017-12-06 18:45:36',
        operator: '刘佳',
        step: '提交审批'
      }, {
        handleTime: '2017-12-06 18:45:36',
        operator: '李健',
        step: '面审'
      }, {
        handleTime: '2017-12-06 18:45:36',
        operator: '吴小川',
        step: '提交审批'
      }]
    }
    /**
     * 领取
     */
    getOrder(row) {
      this.orderModal = true
    }
  }

</script>

<style>


</style>
