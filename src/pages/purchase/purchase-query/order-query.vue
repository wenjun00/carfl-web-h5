<!--订单查询-->
<template>
  <section class="page order-query">
    <i-row>
      <span class="form-title">订单查询</span>
      <i-button @click="getOrderInfoByTime(1)" type="text">昨日</i-button>
      <i-button @click="getOrderInfoByTime(2)" type="text">今日</i-button>
      <i-button @click="getOrderInfoByTime(3)" type="text">本周</i-button>
      <i-button @click="getOrderInfoByTime(4)" type="text">本月</i-button>
      <i-button @click="getOrderInfoByTime(5)" type="text">上月</i-button>
      <i-button @click="getOrderInfoByTime(6)" type="text">最近三月</i-button>
      <i-button @click="getOrderInfoByTime(7)" type="text">本季度</i-button>
      <i-button @click="getOrderInfoByTime(8)" type="text">本年</i-button>
      <i-button @click="openSearch" style="color:#265EA2"><span v-if="!searchOptions">展开</span><span v-if="searchOptions">关闭</span>高级搜索</i-button>
    </i-row>
    <i-row v-if="searchOptions" style="margin-top:20px;margin-left:10px;">
      <i-input v-model="customName" style="display:inline-block;width:10%;" placeholder="请输入客户姓名"></i-input>
      <i-button class="blueButton">搜索</i-button>
    </i-row>
    <i-row style="margin-top:20px">
      <data-box :columns="queryColumns" :data="queryData"></data-box>
    </i-row>
    <!--列配置-->
    <template>
      <i-modal v-model="columnsManage" title="列配置">
        <i-table :columns="columns2" :data="data2" border stripe></i-table>
        <div slot="footer">
          <i-button>上移</i-button>
          <i-button>下移</i-button>
          <i-button>恢复默认</i-button>
          <i-button @click="openColumnsConfig=false">关闭</i-button>
        </div>
      </i-modal>
    </template>
    <template>
      <i-modal v-model="modal2" width="360" title="编辑订单">
        <div style="text-align:center;margin: 10px">
          融资租赁申请中有您未保存的内容，建议先保存在做编辑，是否继续编辑？
        </div>
        <div slot="footer" style="text-align:center;">
          <i-button class="blueButton" @click="confirm">确定</i-button>
          <i-button @click="cancel">取消</i-button>
        </div>
      </i-modal>
    </template>
    <!--客户chaxun-->
    <template>
      <i-modal v-model="openCustomerInformation">

        <data-grid :labelWidth="100" labelAlign="left" contentAlign="left" style="margin-top: 15px;">
          <data-grid-item label="客户姓名" :span="6">王泽杰</data-grid-item>
          <data-grid-item label="订单数" :span="6">3</data-grid-item>

          <data-grid-item label="创建时间" :span="6">2017-12-5</data-grid-item>
          <data-grid-item label="归属公司" :span="6">开呗</data-grid-item>

          <data-grid-item label="证件号码" :span="6">310****9878</data-grid-item>
          <data-grid-item label="归属部门" :span="6">西安营业部</data-grid-item>

          <data-grid-item label="联系号码" :span="6">135****9878</data-grid-item>
          <data-grid-item label="归属人" :span="6">吴丽丽</data-grid-item>
        </data-grid>
      </i-modal>
    </template>

    <!--进度查询-->
    <template>
      <i-modal v-model="orderProgressModal" title="审核进度" width="1000">
        <order-progress></order-progress>
        <div slot="footer"></div>
      </i-modal>
    </template>

    <!--订单详情-->
    <template>
      <i-modal v-model="purchaseInfoModal" title="订单详情" width="1000" class="purchaseInformation">
        <purchase-information></purchase-information>
        <div slot="footer">
          <i-button class="blueButton" @click="purchaseInfoModal=false">返回</i-button>
        </div>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
  import DataBox from "~/components/common/data-box.vue";
  import Page from "~/core/page";
  import Component from "vue-class-component";
  import OrderProgress from "~/components/purchase-query/order-progress.vue";
  import PurchaseInformation from "~/components/purchase-query/purchase-information.vue";
  import PurchaseInformationTotal from "~/components/purchase-query/purchase-information-total.vue";

  import {
    DataGrid,
    DataGridItem
  } from "vue-fintech-component";

  import {
    Dependencies
  } from "~/core/decorator";
  import {
    OrderQueryService
  } from "~/services/business-service/order-query.service";
  import {
    Layout
  } from "~/core/decorator";
  import {
    Mutation
  } from 'vuex-class'
  @Layout("workspace")
  @Component({
    components: {
      OrderProgress,
      PurchaseInformation,
      DataBox,
      DataGrid,
      DataGridItem
    }
  })
  export default class OrderQuery extends Page {
    @Dependencies(OrderQueryService) private orderQueryService: OrderQueryService;
    private queryColumns: any;
    @Mutation openPage
    private columns2: any;
    private queryData: Array < Object > = [];
    private data2: Array < Object > = [];
    private searchOptions: Boolean = false;
    private customName: String = '';
    private loading: Boolean = false;
    private openCreateCompact: Boolean = false;
    private columnsManage: Boolean = false;
    private modal2: Boolean = false;
    private openCustomerInformation: Boolean = false;
    private orderProgressModal: Boolean = false;
    private purchaseInfoModal: Boolean = false;

    confirm() {
      this.modal2 = false
      this.openPage({
        title: '融资租赁申请',
        path: 'purchase/purchase-manage/financing-lease-apply'
      })
    }
    cancel() {
      this.modal2 = false
    }
    created() {
      this.queryColumns = [{
          align: 'center',
          type: 'index',
          width: 60,
          renderHeader: (h, {
            row,
            column,
            index
          }) => {
            return h('div', {
              on: {
                click: () => {
                  this.columnsManage = true
                }
              },
              style: {
                cursor: 'pointer'
              }
            }, [
              h('Icon', {
                props: {
                  type: 'gear-b',
                  size: '20'
                }
              })
            ])
          }
        }, {
          title: '操作',
          width: 220,
          align: 'center',
          render: (h, params) => {
            if (params.row.link === '待命') {
              return h('div', [h('i-button', {
                props: {
                  type: 'text'
                },
                style: {
                  color: '#265EA2'
                },
                on: {
                  click: () => {
                    this.modal2 = true
                  }
                }
              }, '编辑订单')])
            } else {
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
                      this.$Modal.confirm({
                        title: '提示',
                        content: '确认申请收款吗？',
                        onOk: () => {
                          this.openPage({
                            title: '销售收款申请',
                            path: 'purchase/finance-account/sale-gathering-apply',
                          })
                        }
                      })
                    }
                  }
                }, '申请收款'),
                h('i-button', {
                  props: {
                    type: 'text'
                  },
                  style: {
                    color: '#265EA2'
                  },
                  on: {
                    click: () => {
                      this.orderProgressModal = true
                    }
                  }
                }, '进度查询')
              ])
            }
          }
        },
        {
          title: '销售单号',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('i-button', {
                props: {
                  type: 'text'
                },
                on: {
                  click: () => {
                    if (params.row.orderType === '全额') {
                      this.$Modal.info({
                        width: 800,
                        closable: true,
                        // scrollable:true,
                        render: h => h(PurchaseInformationTotal)
                      })
                    } else {
                      this.purchaseInfoModal = true
                    }
                  }
                }
              }, params.row.orderId)
            ])
          }
        },
        {
          align: 'center',
          title: '订单创建时间',
          key: 'orderCreateTime'
        },
        {
          align: 'center',
          title: '客户',
          render: (h, params) => {
            return h('div', [
              h('i-button', {
                props: {
                  type: 'text'
                },
                on: {
                  click: () => {
                    this.openCustomerInformation = true
                  }
                }
              }, params.row.customName)
            ])
          }
        },
        {
          align: 'center',
          title: '订单类型',
          key: 'orderType'
        },
        {
          align: 'center',
          title: '产品名称',
          key: 'prdName'
        },
        {
          align: 'center',
          title: '产品期数',
          key: 'prdPeriod'
        },
        {
          align: 'center',
          title: '利率(月)',
          key: 'prdInterest'
        },
        {
          align: 'center',
          title: '还款方式',
          key: 'repaymentMethod'
        },
        {
          align: 'center',
          title: '融资总额',
          key: 'totalFinancing'
        },
        {
          align: 'center',
          title: '环节',
          key: 'link'
        },
        {
          align: 'center',
          title: '订单状态',
          key: 'orderStatus'
        }
      ]
      /**@argument列配置 */
      this.columns2 = [{
        title: '序号',
        type: 'index',
        width: '80',
        align: 'center'
      }, {
        title: '列名',
        key: 'columnsName',
        align: 'center'
      }, {
        type: 'selection',
        width: '80',
        align: 'center'
      }]
      this.data2 = [{
        columnsName: '订单编号'
      }, {
        columnsName: '订单创建时间'
      }, {
        columnsName: '订单类型'
      }, {
        columnsName: '产品名称'
      }, {
        columnsName: '客户姓名'
      }, {
        columnsName: '证件号码'
      }, {
        columnsName: '最近合同生成日期'
      }]
      this.orderQueryService.getOrderQueryData().subscribe(({
        val
      }) => {
        this.queryData = val
      })
    }
    getOrderInfoByTime() {}
    openSearch() {
      this.searchOptions = !this.searchOptions
    }
    oneKeyToConnect() {

    }
    changeLoading() {
      this.loading = !this.loading
    }
  }

</script>

<style lang="less">
  td {
    padding: 10px;
  }

</style>
