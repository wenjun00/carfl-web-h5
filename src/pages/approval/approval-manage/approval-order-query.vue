<!--订单查询-->
<template>
  <section class="page approval-order-query">
    <span class="form-title">订单查询</span>
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
    <div style="float:right;margin-right:10px;margin-top:10px;">
      <div style="font-size:16px;cursor:pointer;display:inline-block;margin-left:10px;color:#3367A7">
        <svg-icon iconClass="daochu"></svg-icon>
        <span style="font-size: 12px;">导出</span>
      </div>
    </div>
    <i-row v-if="searchOptions" style="margin-top:6px;position:relative;right:10px;">
      <i-input style="display:inline-block;width:18%;margin-left:20px;" placeholder="请录入客户姓名\证件号码\联系号码查询"></i-input>
      <span style="margin-left:10px">日期：</span>
      <i-date-picker style="display:inline-block;width:10%"></i-date-picker>~
      <i-date-picker style="display:inline-block;width:10%"></i-date-picker>
      <i-button style="margin-left:10px" class="blueButton">搜索</i-button>
    </i-row>
    <data-box :columns="columns1" :data="data1"></data-box>

    <template>
      <i-modal @on-visible-change="visibleChange" title="订单详情" width="1000" v-model="purchaseInfoModal" class="purchaseInformation">
        <purchase-information :scrollTopHeight="scrollTopHeight"></purchase-information>
        <div slot="footer">
          <i-button style="background:#265ea2;color:#fff" @click="purchaseInfoModal=false">返回</i-button>
        </div>
      </i-modal>
    </template>

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
  </section>
</template>

<script lang="ts">
  import DataBox from "~/components/common/data-box.vue";
  import Page from "~/core/page";
  import Component from "vue-class-component";
  import PurchaseInformation from "~/components/purchase-query/purchase-information.vue";
  import {
    Dependencies
  } from "~/core/decorator";
  import {
    Layout
  } from "~/core/decorator";
  import SvgIcon from '~/components/common/svg-icon.vue'

  @Layout("workspace")
  @Component({

    components: {
      DataBox,
      PurchaseInformation,
      SvgIcon
    }
  })
  export default class ApprovalOrderQuery extends Page {
    private columns1: any;
    private data1: Array < Object > = [];
    private columns2: any;
    private data2: Array < Object > = [];
    private orderModal: Boolean = false;
    private searchOptions: Boolean = false;
    private purchaseInfoModal: Boolean = false;
    private openColumnsConfig: Boolean = false;
    private columns3: any;
    private data3: Array < Object > = [];
    private scrollTopHeight = 0

    visibleChange() {
      console.log('订单查询modal')
      let target = document.querySelector(".purchaseInformation .ivu-modal-body")
      if (target) {
        target.addEventListener('scroll', this.monitorScorll)
      }
    }
    monitorScorll() {
      let target = document.querySelector(".purchaseInformation .ivu-modal-body")
      if (target) {
        this.scrollTopHeight = target.scrollTop
        // console.log(this.scrollTopHeight)
      }
    }
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
                      this.purchaseInfoModal = true
                    }
                  }
                },
                "查看订单"
              )
            ]);
          }
        },
        {
          title: "订单状态",
          align: "center",
          key: "orderStatus"
        },
        {
          align: "center",
          title: "订单创建时间",
          key: "orderCreateTime"
        },
        {
          align: "center",
          title: "进入资源池时间",
          key: "orderPoolTime"
        },
        {
          align: "center",
          title: "省份",
          key: "province"
        },
        {
          align: "center",
          title: "城市",
          key: "city"
        },
        {
          align: "center",
          title: "订单类型",
          key: "orderType"
        },
        {
          align: "center",
          title: "客户姓名",
          key: "customerName"
        },
        {
          align: "center",
          title: "证件号",
          key: "idCard"
        },
        {
          align: "center",
          title: "手机号",
          key: "phone"
        }
      ];

      this.data1 = [{
        orderStatus: '待面审',
        orderCreateTime: '2017-12-01 13:56:03',
        orderPoolTime: '2017-12-02 11:36:26',
        province: '陕西',
        city: '宝鸡',
        orderType: '直租',
        customerName: '刘佳',
        idCard: '610303199111142564',
        phone: '15094156575'
      }, {
        orderStatus: '待面审',
        orderCreateTime: '2017-12-01 13:56:03',
        orderPoolTime: '2017-12-02 11:36:26',
        province: '陕西',
        city: '宝鸡',
        orderType: '直租',
        customerName: '刘陇刚',
        idCard: '610303198911041564',
        phone: '13096133575'
      }, {
        orderStatus: '待终审',
        orderCreateTime: '2017-12-01 13:56:03',
        orderPoolTime: '2017-12-02 11:36:26',
        province: '陕西',
        city: '渭南',
        orderType: '直租',
        customerName: '王泽杰',
        idCard: '610303199111142564',
        phone: '15989756575'
      }, {
        orderStatus: '待复审',
        orderCreateTime: '2017-12-01 13:56:03',
        orderPoolTime: '2017-12-02 11:36:26',
        province: '陕西',
        city: '咸阳',
        orderType: '直租',
        customerName: '刘佳',
        idCard: '610303199111142564',
        phone: '15168156575'
      }, {
        orderStatus: '待终审',
        orderCreateTime: '2017-12-01 13:56:03',
        orderPoolTime: '2017-12-02 11:36:26',
        province: '陕西',
        city: '西安',
        orderType: '直租',
        customerName: '刘佳',
        idCard: '610303199111142564',
        phone: '18294156575'
      }]

      this.columns2 = [{
        align: 'center',
        title: '操作',
        render: (h, params) => {
          return h('i-button', {
            props: {
              type: 'text'
            },
            style: {
              color: '#265EA2'
            },
            on: {
              click: () => {
                this.$Modal.info({
                  width: 900,
                  closable: true,
                  render: h => h(PurchaseInformation)
                })
              }
            }
          }, '查看订单')
        }
      }, {
        align: 'center',
        title: '订单创建时间',
        key: 'createTime'
      }, {
        align: 'center',
        key: 'orderId',
        title: '订单编号'
      }, {
        align: 'center',
        key: 'orderType',
        title: '订单类型'
      }, {
        align: 'center',
        key: 'belongFirm',
        title: '订单归属公司'
      }, {
        align: 'center',
        key: 'prdName',
        title: '产品名称'
      }, {
        align: 'center',
        key: 'approvalStatus',
        title: '审批状态'
      }]

      this.data2 = [{
        createTime: '2017-12-06 18:45:36',
        orderId: 'lsx0909120',
        orderType: '直租',
        belongFirm: '指旺金科',
        prdName: '王炸',
        approvalStatus: '待面审'
      }, {
        createTime: '2017-12-06 18:45:36',
        orderId: 'lsx0909120',
        orderType: '直租',
        belongFirm: '指旺金科',
        prdName: '王炸',
        approvalStatus: '待面审'
      }, {
        createTime: '2017-12-06 18:45:36',
        orderId: 'lsx0909120',
        orderType: '直租',
        belongFirm: '指旺金科',
        prdName: '王炸',
        approvalStatus: '待面审'
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
  }

</script>

<style>


</style>
