<!--划扣记录-->
<template>
  <section class="component repay-record">
    <span>支付日期：</span>
    <i-input style="width:10%;display:inline-block"></i-input>~
    <i-input style="width:10%;display:inline-block"></i-input>
    <span style="margin-left:10px;">期数：</span>
    <i-input style="width:10%;display:inline-block"></i-input>
    <i-select placeholder="全部交易状态" style="width:14%;display:inline-block;margin-left:10px;">
      <i-option label="初始" value="初始" key="初始"></i-option>
      <i-option label="处理中" value="处理中" key="处理中"></i-option>
      <i-option label="成功" value="成功" key="成功"></i-option>
      <i-option label="失败" value="失败" key="失败"></i-option>
    </i-select>
    <i-button class="blueButton">搜索</i-button>
    <!--<div style="float:right;margin-right:10px;margin-top:10px;">
      <div style="font-size:16px;cursor:pointer;display:inline-block;margin-left:10px;color:#3367A7">
        <svg-icon iconClass="daochu"></svg-icon>
        <span style="font-size: 12px;">导出</span>
      </div>
    </div>-->
    <div style="position:relative;top:10px;left:16px;"><span>客户姓名：王泽杰</span><span style="float:right;margin-right:22px">出账客户号：666600000000565656</span></div>
    <data-box :columns="columns1" :data="data1"></data-box>
  </section>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import DataBox from "~/components/common/data-box.vue";
  import SvgIcon from '~/components/common/svg-icon.vue'

  @Component({
    components: {
      DataBox,
      SvgIcon
    }
  })
  export default class RepayRecord extends Vue {
    private columns1: any;
    private data1: Array < Object >= [];

    created() {
      this.columns1 = [{
          title: '期数',
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '还款日期',
          width: 120,
          key: 'payDate',
          align: 'center'
        },
        {
          title: '还款渠道',
          width: 165,
          key: 'payChannel',
          align: 'center'
        },
        {
          title: '还款方式',
          key: 'payWay',
          align: 'center'
        },
        {
          title: '还款金额',
          key: 'payAmt',
          align: 'center'
        },
        {
          title: '汇付交易订单号',
          width: 180,
          key: 'huifuId',
          align: 'center'
        },
        // ,
        // {
        //   title: '交易状态',
        //   key: 'dealStatus',
        //   align: 'center'
        // },
        {
          title: '失败原因',
          key: 'failReason',
          align: 'center'
        },
        {
          title: '操作人',
          key: 'operator',
          align: 'center'
        }
      ]

      this.data1 = [{
        periods: '1期',
        payChannel: '汇付',
        payDate: '2017-12-01',
        outAccountId: '6227001454452014325',
        payBank: '建行',
        payAmt: '1500.00',
        huifuId: 'QC000000000000002155',
        dealStatus: '成功',
        failReason: '',
        operator: '胡开甲'
      }, {
        payChannel: '汇付',
        periods: '2期',
        payDate: '2017-12-01',
        outAccountId: '6227001454452014325',
        payBank: '建行',
        payAmt: '1500.00',
        huifuId: 'QC000000000000002155',
        dealStatus: '成功',
        failReason: '',
        operator: '胡开甲'
      }, {
        periods: '3期',
        payChannel: '汇付',
        payDate: '2017-12-01',
        outAccountId: '6227001454452014325',
        payBank: '建行',
        payAmt: '1500.00',
        huifuId: 'QC000000000000002155',
        dealStatus: '成功',
        failReason: '',
        operator: '胡开甲'
      }, {
        periods: '4期',
        payDate: '2017-12-01',
        outAccountId: '6227001454452014325',
        payBank: '建行',
        payAmt: '1500.00',
        payChannel: '支付宝',
        huifuId: '',
        dealStatus: '成功',
        failReason: '',
        operator: '胡开甲'
      }, {
        periods: '5期',
        payDate: '2017-12-01',
        outAccountId: '6227001454452014325',
        payBank: '建行',
        payChannel: '微信',
        payAmt: '1500.00',
        huifuId: '',
        dealStatus: '成功',
        failReason: '',
        operator: '胡开甲'
      }]
    }

  }

</script>

<style>


</style>
