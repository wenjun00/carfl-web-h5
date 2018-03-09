<!--划扣记录查询-->
<template>
  <section class="page deduct-record-query">
    <span class="form-title">划扣记录查询</span>
    <i-row style="margin:6px;">
      <span style="margin-left:10px">支付日期：</span>
      <i-date-picker style="display:inline-block;width:10%" v-model="model.startTime"></i-date-picker>~
      <i-date-picker style="display:inline-block;width:10%" v-model="model.endTime"></i-date-picker>
      <i-input style="display:inline-block;width:18%;margin-left:20px;" placeholder="请输入客户姓名、客户号查询" v-model="model.personalInfo"></i-input>
      <i-select style="width:120px;margin-left:10px;" placeholder="全部" v-model="model.payStatus">
        <i-option label="初始" value="西安市" key="西安市"></i-option>
        <i-option label="成功" value="宝鸡市" key="宝鸡市"></i-option>
        <i-option label="失败" value="咸阳市" key="咸阳市"></i-option>
        <i-option label="处理中" value="渭南市" key="渭南市"></i-option>
      </i-select>
      <i-button style="margin-left:10px" class="blueButton" @click="getRecord">搜索</i-button>
    </i-row>
    <data-box :columns="columns1" :data="data1" @onPageChange="getRecord" :page="pageService"></data-box>
  </section>
</template>

<script lang="ts">
  import DataBox from "~/components/common/data-box.vue";
  import Page from "~/core/page";
  import Component from "vue-class-component";
  import PurchaseInformation from "~/components/purchase-manage/purchase-information.vue";
  import { ChargeBackService } from "~/services/manage-service/charge-back.service";
  import { PageService } from "~/utils/page.service";
  import { FilterService } from "~/utils/filter.service"

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
    @Dependencies(ChargeBackService) private chargeBackService: ChargeBackService;
    @Dependencies(PageService) private pageService: PageService;
    private columns1: any;
    private data1: Array < Object > = [];
    private searchOptions: Boolean = false;
    private model: any = {
      personalInfo: '',
      startTime: '',
      endTime: '',
      payStatus: ''
    };
    /**
     * 获取划扣记录
     */
    getRecord() {
      this.chargeBackService.getChargeRecordList(this.model, this.pageService).subscribe(data => {
        this.data1 = data
      }, ({ msg }) => {
        this.$Message.error(msg)
      })
    }
    openSearch() {
      this.searchOptions = !this.searchOptions;
    }
    created() {
      this.getRecord()
      this.columns1 = [
        {
          title: "出账日期",
          align: "center",
          key: "paymentDate",
          width: 160,          
          render: (h, {
            row,
            column,
            index
          }) => {
            return h('span', FilterService.dateFormat(row.paymentDate, 'yyyy-MM-dd'))
          }
        },
        {
          title: "出账客户号",
          key: "clientNumber",
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
            }, params.row.clientNumber)
          }
        },
        {
          align: "center",
          title: "出账卡号",
          key: "cardNumber",
          width: 160
        },
        {
          align: "center",
          title: "客户姓名",
          key: "clientName",
          width: 160
        },
        {
          align: "center",
          title: "支付银行",
          key: "depositBank"
        },
        {
          align: "center",
          title: "支付金额",
          key: "paymentAmount"
        },
        {
          align: "center",
          title: "订单号",
          key: "orderNumber"
        },
        {
          key: 'tradingStatus',
          title: '交易状态',
          align: 'center',
          width: 120,
          render: (h, {
            row,
            column,
            index
          }) => {
            if (row.customerName === '王泽杰') {
              return h('div', {}, [h('span', {}, row.tradingStatus),
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
              return h('div', {}, [h('span', {}, row.tradingStatus),
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
          key: "operateName"
        }
      ];
    }
  }

</script>

<style>


</style>
