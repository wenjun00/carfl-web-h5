<!--确认收回-->
<template>
  <section class="component confirm-withdraw">
    <data-grid :labelWidth="90" labelAlign="left" contentAlign="left">
      <data-grid-item label="客户姓名" :span="2">
        <template>
          <div>
            王泽杰
          </div>
        </template>
      </data-grid-item>
      <data-grid-item label="身份证号" :span="3">
        <template>
          <div>
            610***2416
          </div>
        </template>
      </data-grid-item>
      <data-grid-item label="融资金额(元)" :span="3">
        <template>
          <div>
            50000
          </div>
        </template>
      </data-grid-item>
      <data-grid-item label="期数" :span="2">
        <template>
          <div>
            1
          </div>
        </template>
      </data-grid-item>
      <data-grid-item label="月供" :span="2">
        <template>
          <div>
            100
          </div>
        </template>
      </data-grid-item>
    </data-grid>
    <data-box :columns="columns3" :data="data3"></data-box>

    <div>
      <div style="width:7px;height:20px;background:#265EA2;display:inline-block;margin-right:6px;position:relative;top:4px;"></div><span>附件</span>
    </div>

    <div class="invoiceContainer">
      <div v-for="item in invoiceList" :key="item.index" class="invoices">
        <div class="invoiceItem"></div>
        <div class="invoiceName">{{item.invoiceName}}</div>
      </div>
    </div>

    <!--<div>
      <div style="width:7px;height:20px;background:#265EA2;display:inline-block;margin-right:6px;position:relative;top:4px;"></div><span>收款明细</span>
    </div>
    <data-box :columns="columns1" :data="data1"></data-box>-->

    <div>
      <div style="width:7px;height:20px;background:#265EA2;display:inline-block;margin-right:6px;position:relative;top:4px;"></div><span>收款方式</span>
    </div>
    <table border="1" width="870" style="margin-top:10px;text-align:center">
      <tr height="40">
        <td bgcolor="#F2F2F2" colspan="2">收款方式</td>
        <td bgcolor="#F2F2F2" colspan="1">金额（元）</td>
        <td bgcolor="#F2F2F2" colspan="1">状态</td>
      </tr>
      <tr height="40">
        <td>
          <i-icon type="plus" style="color:#199ED8"></i-icon>
          <i-icon type="minus" style="margin-left:10px;color:#199ED8"></i-icon>
        </td>
        <td>
          <i-select placeholder="选择收款方式" style="display:inline-block;width:90%">
            <i-option label="汇付" value="汇付" key="汇付"></i-option>
            <i-option label="支付宝" value="支付宝" key="支付宝"></i-option>
            <i-option label="现金" value="现金" key="现金"></i-option>
          </i-select>
        </td>
        <td>
          <i-input style="display:inline-block;width:30%;margin-right:10px"></i-input>
          <i-button class="blueButton">确认划扣</i-button>
        </td>
        <td><span>已处理</span>
          <i-icon type="loop" size="20" color="#199ED8" style="margin-left:6px;cursor:pointer"></i-icon>
        </td>
      </tr>
    </table>


    <div>
      <div style="width:7px;height:20px;background:#265EA2;display:inline-block;margin-right:6px;position:relative;top:4px;margin-top:10px;"></div><span>账户信息</span>
    </div>
    <data-box :columns="columns2" :data="data2"></data-box>

    <div>
      <div style="width:7px;height:20px;background:#265EA2;display:inline-block;margin-right:6px;position:relative;top:4px;margin-top:10px;"></div><span>收款凭证</span>
    </div>

    <i-row style="margin-top:10px">
      <i-col :span="12">
        <div style="height:200px;width:200px;border:1px solid #C2C2C2;cursor:pointer;text-align:center;position:relative;left:40px;"
          @click="addAttachment">
          <Icon type="plus-circled" style="display:block;margin-top:53px;" size="40"></Icon>
          <div>点击添加附件</div>
          <span style="color:gray">支持jpg/pdf/png格式建议大小不超过10M</span>
        </div>
      </i-col>
      <i-col :span="12">
        <div style="height:200px;width:200px;border:1px solid #C2C2C2;background-image:url('/static/images/common/invoice2.png');background-repeat:no-repeat;position:relative;right:140px;">
        </div>
      </i-col>
    </i-row>
  </section>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import ChangeCard from "~/components/purchase-manage/change-card.vue"
  import DataBox from "~/components/common/data-box.vue";
  import {
    DataGrid,
    DataGridItem
  } from "fintech-vue-component";
  @Component({
    components: {
      ChangeCard,
      DataBox,
      DataGrid,
      DataGridItem
    }
  })
  export default class ConfirmWithdraw extends Vue {
    private columns1: any;
    private data1: Array < Object > = [];
    private columns2: any;
    private data2: Array < Object > = [];
    private columns3: any;
    private data3: Array < Object > = [];
    private gatherModal: Object = {
      gatherType: '销售收款',
      remarks: '首付款减免8700元'
    }
    private invoiceList: Array < any > = []

    addAttachment() {}
    created() {
      this.invoiceList = [{
        index: 1,
        invoiceName: '发票-1'
      }, {
        index: 2,
        invoiceName: '发票-2'
      }, {
        index: 3,
        invoiceName: '发票-3'
      }]

      this.columns1 = [{
        align: 'center',
        width: 60,
        renderHeader: (h, {
          column,
          index
        }) => {
          return h(
            "div", {
              on: {
                click: () => {
                  // this.columnsConfig();
                }
              },
              style: {
                cursor: "pointer"
              }
            }, [
              h("Icon", {
                props: {
                  type: "plus",
                  size: "20"
                }
              })
            ]
          );
        },
        render: (h, {
          row,
          columns,
          index
        }) => {
          if (row.projectName !== '合计') {
            return h('Icon', {
              props: {
                type: 'trash-b',
                size: "20"
              }
            })
          }
        }
      }, {
        title: '项目名称',
        key: 'projectName',
        align: 'center'
      }, {
        title: '金额',
        key: 'money',
        align: 'center'
      }]

      this.data1 = [{
        projectName: '首付金额',
        money: '80000'
      }, {
        projectName: '首付月供',
        money: '10000'
      }, {
        projectName: '保证金',
        money: '8000'
      }, {
        projectName: '路桥费',
        money: '0'
      }, {
        projectName: '合计',
        money: '98000'
      }]

      this.columns2 = [{
        title: "户名",
        align: 'center',
        key: 'accountName'
      }, {
        title: "开户银行",
        align: 'center',
        key: 'accountBank'
      }, {
        title: "银行卡号",
        align: 'center',
        key: 'bankCardId'
      }, {
        title: "支行名称",
        align: 'center',
        key: 'branchBankName'
      }, {
        title: "第三方客户号",
        align: 'center',
        key: 'thirdCustomerId'
      }]
      this.data2 = [{
        accountName: '胡开甲',
        accountBank: '中国建设银行',
        bankCardId: '6227004171150135894',
        branchBankName: '大雁塔分行',
        thirdCustomerId: '853654689213'
      }]

      this.columns3 = [{
        key: 'project',
        title: '项目',
        align: 'center'
      }, {
        key: 'money',
        title: '金额',
        align: 'center'
      }]

      this.data3 = [{
        project: '违约费',
        money: '800'
      }, {
        project: '手续费',
        money: '1000'
      }, {
        project: '合计',
        money: '1800'
      }]
    }
    changeBankCard() {

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
