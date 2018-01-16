<!--审批资源池-->
<template>
  <section class="page approval-resource-pool">
    <span class="form-title">审核资源池</span>
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
      <i-input style="display:inline-block;width:18%;margin-left:20px;" placeholder="请录入客户姓名\证件号码\联系号码查询"></i-input>
      <span style="margin-left:10px">日期：</span>
      <i-date-picker style="display:inline-block;width:10%"></i-date-picker>~
      <i-date-picker style="display:inline-block;width:10%"></i-date-picker>
      <i-select style="width:80px;margin-left:10px;" placeholder="选择省">
        <i-option label="陕西省" value="陕西省" key="陕西省"></i-option>
      </i-select>
      <i-select style="width:80px;margin-left:10px;" placeholder="选择市">
        <i-option label="西安市" value="西安市" key="西安市"></i-option>
        <i-option label="宝鸡市" value="宝鸡市" key="宝鸡市"></i-option>
        <i-option label="咸阳市" value="咸阳市" key="咸阳市"></i-option>
        <i-option label="渭南市" value="渭南市" key="渭南市"></i-option>
        <i-option label="铜川市" value="铜川市" key="铜川市"></i-option>
        <i-option label="榆林市" value="榆林市" key="榆林市"></i-option>
        <i-option label="延安市" value="延安市" key="延安市"></i-option>
        <i-option label="汉中市" value="汉中市" key="汉中市"></i-option>
        <i-option label="安康市" value="安康市" key="安康市"></i-option>
        <i-option label="商洛市" value="商洛市" key="商洛市"></i-option>
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
          <i-button @click="confirmGetOrder" class="blueButton">确定</i-button>
        </div>
      </i-modal>
    </template>

    <!--Model-->
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

    <template>
      <i-modal title="订单详情" width="800" v-model="purchaseInformationModal" class="purchaseInformation">
        <purchase-information></purchase-information>
        <div slot="footer">
          <i-button style="background:#265ea2;color:#fff" @click="purchaseInfoModal=false">返回</i-button>
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
  import {
    Mutation,
  } from "vuex-class";

  @Layout("workspace")
  @Component({

    components: {
      DataBox,
      PurchaseInformation
    }
  })
  export default class ApprovalResourcePool extends Page {
    private columns1: any;
    private data1: Array < Object > = [];
    private columns2: any;
    private data2: Array < Object > = [];
    private orderModal: Boolean = false;
    private searchOptions: Boolean = false;
    private openColumnsConfig: Boolean = false;
    private columns3: any;
    private data3: Array < Object > = [];
    private purchaseInformationModal: Boolean = false;
    @Mutation("openPage") openPage;

    openSearch() {
      this.searchOptions = !this.searchOptions;
    }

    created() {
      this.columns1 = [{
          align: 'center',
          width: 90,
          type: 'index',
          fixed: 'left',
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
          width: 90,
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
                      this.getOrder(row);
                    }
                  }
                },
                "领取"
              )
            ]);
          },
          fixed: 'left'
        },

        {
          title: "订单编号",
          key: "orderId",
          align: "center",
          width: 150,
          render: (h, params) => {
            return h('i-button', {
              props: {
                type: 'text'
              },
              on: {
                click: () => {
                  this.purchaseInformationModal = true
                }
              }
            }, '2017101001')
          },
          fixed: 'left'
        },
        {
          title: "订单状态",
          align: "center",
          key: "orderStatus",
          width: 100,
          fixed: 'left'
        },
        {
          key: 'step',
          title: '环节',
          align: 'center',
          width: 186,
          render: (h, {
            row,
            columns,
            index
          }) => {
            if (row.orderStatus === '拒绝') {
              return h('Tooltip', {
                props: {
                  content: row.content
                },
              }, [h('span', {}, row.status),
                h('Icon', {
                  props: {
                    type: 'ios-information',
                    size: '20',
                    color: 'red'
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
              }, [h('span', {}, row.status),
                h('Icon', {
                  props: {
                    type: 'ios-information',
                    size: '20'
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
          title: "订单创建时间",
          key: "orderCreateTime",
          width: 260
        },
        {
          align: "center",
          title: "进入资源池时间",
          key: "orderPoolTime",
          width: 260
        },
        {
          align: "center",
          title: "省份",
          key: "province",
          width: 100
        },
        {
          align: "center",
          title: "城市",
          key: "city",
          width: 100
        },
        {
          align: "center",
          title: "订单类型",
          key: "orderType",
          width: 100
        },
        {
          align: "center",
          title: "客户姓名",
          key: "customerName",
          width: 100
        },
        {
          align: "center",
          title: "证件号",
          key: "idCard",
          width: 180
        },
        {
          align: "center",
          title: "手机号",
          key: "phone",
          width: 160
        }
      ];

      this.data1 = [{
        orderStatus: '面审通过',
        orderCreateTime: '2017-12-01 13:56:03',
        orderPoolTime: '2017-12-02 11:36:26',
        province: '陕西',
        city: '宝鸡',
        orderType: '直租',
        customerName: '刘佳',
        idCard: '610303199111142564',
        orderId: 20170805,
        phone: '15094156575',
        content: '通过',
        status: '复审'
      }, {
        orderStatus: '面审通过',
        orderCreateTime: '2017-12-01 13:56:03',
        orderPoolTime: '2017-12-02 11:36:26',
        province: '陕西',
        city: '宝鸡',
        orderType: '直租',
        customerName: '刘陇刚',
        idCard: '610303198911041564',
        orderId: 20170806,
        phone: '13096133575',
        content: '通过',
        status: '复审'
      }, {
        orderStatus: '面审通过',
        orderCreateTime: '2017-12-01 13:56:03',
        orderPoolTime: '2017-12-02 11:36:26',
        province: '陕西',
        city: '渭南',
        orderType: '直租',
        customerName: '王泽杰',
        orderId: 20170807,
        idCard: '610303199111142564',
        phone: '15989756575',
        content: '通过',
        status: '复审'
      }, {
        orderStatus: '面审通过',
        orderCreateTime: '2017-12-01 13:56:03',
        orderPoolTime: '2017-12-02 11:36:26',
        orderId: 20170806,
        province: '陕西',
        city: '宝鸡',
        orderType: '直租',
        customerName: '刘佳',
        idCard: '610303199111142564',
        prdName: '直租',
        phone: '15094156575',
        content: '通过',
        status: '复审'
      }, {
        orderStatus: '拒绝',
        orderCreateTime: '2017-12-01 13:56:03',
        orderPoolTime: '2017-12-02 11:36:26',
        province: '陕西',
        city: '宝鸡',
        orderType: '直租',
        customerName: '刘陇刚',
        orderId: 20170807,
        idCard: '610303198911041564',
        prdName: '直租',
        phone: '13096133575',
        content: '终审资料不全',
        status: '终审'
      }, {
        orderStatus: '拒绝',
        orderCreateTime: '2017-12-01 13:56:03',
        orderPoolTime: '2017-12-02 11:36:26',
        province: '陕西',
        city: '渭南',
        orderType: '直租',
        customerName: '王泽杰',
        orderId: 20170808,
        idCard: '610303199111142564',
        prdName: '直租',
        phone: '15989756575',
        content: '复审资料造假',
        status: '复审'
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
    /**
     * 列配置
     */
    columnsConfig() {
      this.openColumnsConfig = true
    }
    confirmGetOrder() {
      this.orderModal = false
    }
  }

</script>

<style>


</style>
