<!--已结清订单查询-->
<template>
  <section class="page closed-order-query">
    <span class="form-title">已结清订单查询</span>
    <i-button type="text" @click="getTimeSearch(0)" v-auth="437">昨日</i-button>
    <i-button type="text" @click="getTimeSearch(1)" v-auth="437">今日</i-button>
    <i-button type="text" @click="getTimeSearch(2)" v-auth="437">本周</i-button>
    <i-button type="text" @click="getTimeSearch(3)" v-auth="437">本月</i-button>
    <i-button type="text" @click="getTimeSearch(4)" v-auth="437">上月</i-button>
    <i-button type="text" @click="getTimeSearch(5)" v-auth="437">最近三月</i-button>
    <i-button type="text" @click="getTimeSearch(6)" v-auth="437">本季度</i-button>
    <i-button type="text" @click="getTimeSearch(7)" v-auth="437">本年</i-button>
    <i-button @click="openSearch" style="color:#265EA2" v-auth="436">
      <span v-if="!searchOptions">展开</span>
      <span v-if="searchOptions">收起</span>
      <span>高级搜索</span>
    </i-button>
    <div class="importBtn">
      <div style="cursor:pointer;display:inline-block;margin-left:10px;color:#3367A7" v-auth="438">
        <svg-icon style="font-size:18px;" iconClass="dayin"></svg-icon>
        <span style="font-size:12px;">打印</span>
      </div>
      <div style="font-size:16px;cursor:pointer;display:inline-block;margin-left:10px;color:#3367A7" v-auth="439">
        <svg-icon iconClass="daochu"></svg-icon>
        <span style="font-size:12px;">导出</span>
      </div>
    </div>
    <i-row v-if="searchOptions" style="margin:6px;position:relative;right:16px;">
      <i-input style="display:inline-block;margin-left:20px;width:16%" placeholder="请录入客户姓名\证件号码" v-model="customerRepayModel.dynamicParam"></i-input>
      <i-select style="margin-left:10px;width:10%" placeholder="全部还款状态" v-model="customerRepayModel.paymentStatus" clearable>
        <i-option v-for="{value,label} in $dict.getDictData('0104')" :key="value" :label="label" :value="value"></i-option>        
      </i-select>
      <i-select style="margin-left:10px;width:10%" placeholder="全部结算通道" v-model="customerRepayModel.settlementChannel" clearable>
        <i-option v-for="{value,label} in $dict.getDictData('0107')" :key="value" :label="label" :value="value"></i-option>
      </i-select>
      <i-button style="margin-left:10px" class="blueButton" @click="getEarlyPayList">搜索</i-button>
    </i-row>
    <data-box :id="435" :columns="columns1" :data="data1"></data-box>

    <!--还款详情-->
    <template>
      <i-modal v-model="repayInfoModal" :transfer="false" title="还款详情" width="1200">
        <repay-info ref="repay-info"></repay-info>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
  import DataBox from "~/components/common/data-box.vue";
  import Page from "~/core/page";
  import Component from "vue-class-component";
  import ConfirmRepayment from "~/components/finance-manage/confirm-repayment.vue";
  import DeductRecord from "~/components/finance-manage/deduct-record.vue";
  import RepayInfo from "~/components/finance-manage/repay-info.vue";
  import SvgIcon from '~/components/common/svg-icon.vue';
  import {
    PayoffProductOrderService
  } from "~/services/manage-service/payoff-product-order.service";
  import {
    PageService
  } from "~/utils/page.service";
  import {
    FilterService
  } from "~/utils/filter.service"
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
      SvgIcon,
      DataBox,
      ConfirmRepayment,
      DeductRecord,
      RepayInfo
    }
  })
  export default class ClosedOrderQuery extends Page {
    @Dependencies(PayoffProductOrderService) private payoffProductOrderService: PayoffProductOrderService;
    @Dependencies(PageService) private pageService: PageService;

    private columns1: any = [];
    private data1: Array < Object > = [];
    private searchOptions: Boolean = false;
    private openColumnsConfig: Boolean = false;
    private repayInfoModal: Boolean = false;
    private customerRepayModel: any = {
      settlementChannel: '',
      paymentStatus: '',
      dynamicParam: '',
      timeSearch: ''
    }
    mounted() {
      this.getEarlyPayList();
    }
    getEarlyPayList() {
      this.payoffProductOrderService.getPayoffProductOrders(this.customerRepayModel, this.pageService).subscribe(data => {
        this.data1 = data
      }, ({
        msg
      }) => {
        this.$Message.error(msg)
      })
    }
    getTimeSearch(val) {
      this.customerRepayModel.settlementChannel = ''
      this.customerRepayModel.paymentStatus = ''
      this.customerRepayModel.dynamicParam = ''
      this.customerRepayModel.timeSearch = val
      this.getEarlyPayList()
      this.customerRepayModel.timeSearch = ''
    }
    openSearch() {
      this.searchOptions = !this.searchOptions;
    }

    created() {
      this.columns1 = [
        {
          title: "操作",
          width: 110,
          align: "center",
          fixed: "left",
          render: (h, {
            row,
            column,
            index
          }) => {
            return h('i-button', {
                props: {
                  type: 'text'
                },
                on: {
                  click: () => {
                    this.repayInfoModal = true
                    let _repay: any = this.$refs['repay-info']
                    _repay.refresh(row)
                  }
                },
                style: {
                  color: '#265EA2'
                }
              }, '还款详情')
          }
        },
        {
          align: "center",
          title: "订单号",
          width: 160,
          key: 'orderId',
          editable: true,
          render: (h, {
            row,
            column,
            index
          }) => {
            return h('i-button', {
              props: {
                type: 'text'
              },
              on: {
                click: () => {
                  // this.purchaseInfoModal = true
                }
              }
            }, row.orderId)
          }
        },
        {
          align: "center",
          title: "客户结算号",
          key: "clientNumber",
          width: 150,
          editable: true,          
          render: (h, {
            row,
            column,
            index
          }) => {
            return h('i-button', {
              props: {
                type: 'text'
              },
              on: {
                click: () => {
                  // this.customerSettleClick(row)
                }
              }
            }, row.clientNumber)
          }
        },
        {
          align: "center",
          title: "客户姓名",
          key: "customerName",
          editable: true,          
          width: 100
        },
        {
          align: "center",
          title: " 证件号",
          editable: true,          
          key: "idCard",
          width: 160
        },
        {
          align: "center",
          title: " 手机号",
          key: "mobileMain",
          editable: true,          
          width: 120
        },
        {
          align: "center",
          title: " 合同生效日",
          key: "contractDate",
          editable: true,          
          width: 160,
          render: (h, {
            row,
            column,
            index
          }) => {
            return h('span', FilterService.dateFormat(row.contractDate, 'yyyy-MM-dd'))
          }
        },
        {
          align: "center",
          title: " 结清日期",
          key: "settlementDay",
          editable: true,
          width: 160,
          render: (h, {
            row,
            column,
            index
          }) => {
            return h('span', FilterService.dateFormat(row.settlementDay, 'yyyy-MM-dd'))
          }
        },
        {
          align: "center",
          title: " 利率%/月",
          key: "productRate",
          editable: true,          
          width: 90
        },
        {
          align: "center",
          editable: true,          
          title: " 结算通道",
          key: "settlementChannel",
          width: 100,
          render: (h, {
            row,
            column,
            index
          }) => {
            return h("span", {}, this.$dict.getDictName(row.settlementChannel));
          }
        },
        {
          align: "center",
          title: " 结清状态",
          key: "settlementType",
          editable: true,        
          width: 100,
          render: (h, {
            row,
            column,
            index
          }) => {
            return h("span", {}, this.$dict.getDictName(row.settlementType));
          }
        },
        {
          align: "center",
          title: " 归属公司",
          width: 100,
          editable: true,          
          key: "companyChinaName"
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
.closed-order-query .importBtn {
	float: right;
	margin-right: 13px;
	margin-top: 10px;
}
</style>