<!--划扣记录-->
<template>
  <section class="component deduct-record">
    <i-row style="margin:6px;">
      <span>支付日期：</span>
      <i-input style="display:inline-block;width:10%;" placeholder="请输入日期"></i-input>~
      <i-input style="display:inline-block;width:10%;" placeholder="请输入日期"></i-input>
      <span style="margin-left:10px;">期数：</span>
      <i-input style="display:inline-block;width:10%;" placeholder="请输入证件号码"></i-input>
      <i-select placeholder="全部交易状态" style="margin-left:10px;width:16%;">
        <i-option label="初始" value="初始" key="初始"></i-option>
        <i-option label="失败" value="失败" key="失败"></i-option>
        <i-option label="成功" value="成功" key="成功"></i-option>
        <i-option label="处理中" value="处理中" key="处理中"></i-option>
      </i-select>
      <i-button class="blueButton" style="margin-left:10px;">搜索</i-button>
      <div style="float:right;margin-right:10px;margin-top:10px;">
        <div style="font-size:16px;cursor:pointer;display:inline-block;margin-left:10px;color:#3367A7">
          <svg-icon iconClass="daochu"></svg-icon>
          <span style="font-size: 12px;">导出</span>
        </div>
      </div>
    </i-row>
    <div>
      <span style="margin-left:10px">客户姓名：陈丽</span>
      <span style="float:right;margin-right:10px;">出账客户号：2017101001</span>
    </div>
    <data-box :columns="columns1" :data="data1"></data-box>
  </section>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component'
  import DataBox from "~/components/common/data-box.vue"
  import SvgIcon from '~/components/common/svg-icon.vue'
  import {
    DataGrid,
    DataGridItem
  } from "@zct1989/vue-component";

  import {
    Prop
  } from "vue-property-decorator";

  @Component({
    components: {
      DataBox,
      DataGrid,
      DataGridItem,
      SvgIcon
    }
  })
  export default class DeductRecord extends Vue {
    private columns1: any;
    private data1: Array < Object > = [];
    @Prop()
    row: Object;

    created() {
      this.columns1 = [{
        type: 'index',
        title: '序号',
        align: 'center',
        width: 60
      }, {
        title: '期数',
        key: 'periods',
        align: 'center',
        width: 60
      }, {
        title: '支付日期',
        key: 'payDate',
        align: 'center',
        width: 120
      }, {
        title: '出账卡号',
        key: 'outAccountId',
        align: 'center',
        width: 170
      }, {
        title: '支付银行',
        key: 'payBank',
        align: 'center'
      }, {
        title: '支付金额',
        key: 'payMoney',
        align: 'center'
      }, {
        title: '汇款交易单号',
        key: 'remittanceDealId',
        align: 'center'
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
        periods: '12',
        payDate: '2017-12-01',
        outAccountId: '6227004171150038350',
        payBank: '建行',
        payMoney: '500',
        remittanceDealId: '610303201710100214',
        dealStatus: '成功',
        failReason: '',
        operator: '胡开甲'
      }]
    }
    cancel() {

    }
    confirm() {

    }
  }

</script>
