<!--划扣-->
<template>
  <section class="component deduct">
    <data-grid :labelWidth="90" labelAlign="left" contentAlign="left">
      <data-grid-item label="出账客户号" :span="6">
        <template>
          <div>
            {{ rowObj.clientNumber }}
          </div>
        </template>
      </data-grid-item>
      <data-grid-item label="出账卡号" :span="6">
        <template>
          <div>
            {{ rowObj.cardNumber }}
          </div>
        </template>
      </data-grid-item>
      <data-grid-item label="客户姓名" :span="6">
        <template>
          <div>
            {{ rowObj.name }}
          </div>
        </template>
      </data-grid-item>
      <data-grid-item label="支付银行" :span="6">
        <template>
          <div>
            {{ rowObj.depositBank }}
          </div>
        </template>
      </data-grid-item>
    </data-grid>
    <table border="1" width="900" class="modal-item-table">
      <tr height="40">
        <td class="td-bg" colspan="2">收款方式</td>
        <td class="td-bg" colspan="1">金额（元）</td>
        <td class="td-bg" colspan="1">状态</td>
      </tr>
      <tr height="40">
        <td colspan="2">汇付</td>
        <td colspan="1">
          <i-input class="modal-item-querenhuakou"></i-input>
          <i-button class="blueButton">确认划扣</i-button>
        </td>
        <td colspan="1"><span>已处理</span>
          <i-icon type="loop" size="20" class="modal-item-chuli"></i-icon>
        </td>
      </tr>
    </table>

    <div class="modal-item-huakou">
      <div class="modal-item-huakoujilu"></div>
      <span>划扣记录</span>
    </div>
    <data-box :columns="columns1" :data="data1" width="900" class="modal-item-databox"
              @onPageChange="getRecord" :page="pageService" :noDefaultRow="true"></data-box>
  </section>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import ChangeCard from "~/components/purchase-manage/change-card.vue"
  import DataBox from "~/components/common/data-box.vue";
  import {ChargeBackService} from "~/services/manage-service/charge-back.service";
  import {PageService} from "~/utils/page.service";
  import {Dependencies} from "~/core/decorator";
  import {
    DataGrid,
    DataGridItem
  } from "@zct1989/vue-component";

  @Component({
    components: {
      ChangeCard,
      DataBox,
      DataGrid,
      DataGridItem
    }
  })
  export default class Deduct extends Vue {
    @Dependencies(ChargeBackService) private chargeBackService: ChargeBackService;
    @Dependencies(PageService) private pageService: PageService;
    private columns1: any;
    private data1: Array<Object> = [];
    private rowObj: any = {};

    refresh(row) {
      this.rowObj = row
      this.pageService.reset()
      this.getRecord()
    }

    /**
     * 获取划扣记录
     */
    getRecord() {
      this.chargeBackService.getChargeRecordList({personalId: this.rowObj.personalId}, this.pageService).subscribe(data => {
        this.data1 = data
      }, ({msg}) => {
        this.$Message.error(msg)
      })
    }

    created() {

      this.columns1 = [{
        align: 'center',
        width: 60,
        title: '序号',
        type: 'index'
      }, {
        title: '支付日期',
        key: 'payDate',
        align: 'center',
        width: 180
      }, {
        title: '支付金额',
        key: 'paymentAmount',
        align: 'center'
      }, {
        title: '订单号',
        key: 'orderId',
        align: 'center',
        width: 180
      }, {
        title: '交易状态',
        key: 'dealStatus',
        align: 'center'
      }, {
        title: '失败原因',
        key: 'failReason',
        align: 'center'
      }, {
        title: '操作人',
        key: 'operator',
        align: 'center'
      }]

      this.data1 = [{
        payDate: '2017-12-01 13:56:46',
        payMoney: '80000',
        orderId: 'QC000000000000002155',
        dealStatus: '成功',
        failReason: '',
        operator: '张三疯'
      }, {
        payDate: '2017-12-01 13:56:60',
        payMoney: '80000',
        orderId: 'QC000000000000002155',
        dealStatus: '成功',
        failReason: '',
        operator: '张三疯'
      }, {
        payDate: '2017-12-01 13:59:46',
        payMoney: '80000',
        orderId: 'QC000000000000002155',
        dealStatus: '失败',
        failReason: '银行卡余额不足',
        operator: '张三疯'
      }]

    }
  }

</script>

<style lang="less">
  .invoiceContainer {
    display: flex;
    justify-content: flex-start;
    .invoices {
      margin-top: 10px;
    }
    .invoiceItem {
      margin-left: 10px;
      width: 140px;
      height: 100px;
      border: 1px solid #dddddd;
      background-image: url('/static/images/common/invoice.png')
    }
    .invoiceName {
      text-align: center;
    }
  }

</style>
<style lang="less" scoped>
  .component.deduct {
    .modal-item-table {
      margin-top: 10px;
      text-align: center;
      border: 1px solid #DDDEE1;
      .td-bg{
          background-color:#F2F2F2; 
      }
    }
    .modal-item-querenhuakou {
      display: inline-block;
      width: 30%;
      margin-right: 10px
    }
    .modal-item-chuli {
      margin-left: 6px;
      cursor: pointer;
      color: #199ED8;
    }
    .modal-item-huakou {
      margin: 5px 0px;
      .modal-item-huakoujilu {
        width: 7px;
        height: 20px;
        background: #265EA2;
        display: inline-block;
        margin-right: 6px;
        position: relative;
        top: 4px;
      }
    }

    .modal-item-databox{
      position:relative;right:10px;
    }

  }
</style>
