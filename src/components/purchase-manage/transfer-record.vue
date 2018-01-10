<!--转交记录-->
<template>
  <section class="component transfer-record">
    <div>
      <span style="margin-left:10px;">客户姓名：</span><span>{{customerName}}</span>
      <div style="float:right;display:inline-block;margin-right:10px;">
        <span >订单编号：</span><span>{{orderId}}</span>
      </div>
    </div>
    <data-box :columns="columns1" :data="data1"></data-box>
  </section>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import {
    Dependencies
  } from "~/core/decorator";
  import SvgIcon from '~/components/common/svg-icon.vue'
  import DataBox from "~/components/common/data-box.vue"
  import SimulateCalculate from "~/components/common/simulate-calculate.vue"
  import {
    Prop
  } from "vue-property-decorator";
  @Component({
    components: {
      SvgIcon,
      DataBox
    }
  })
  export default class TransferRecord extends Vue {
    private columns1: any;
    private data1: Array < Object >= [];
    private transferModel: Object = {
      customerName: '',
      orderId: ''
    }

    @Prop()
    customerName: String

    @Prop()
    orderId: String

    created() {
      this.transferModel = {
        customerName: this.customerName,
        orderId: this.orderId
      }

      this.columns1 = [{
        title: '序号',
        type: 'index',
        align: 'center',
        width: 60
      }, {
        title: '转交日期',
        key: 'transferDate',
        align: 'center'
      }, {
        title: '制单人',
        key: 'makePerson',
        align: 'center'
      }, {
        title: '转交人',
        key: 'transferPerson',
        align: 'center'
      }]

      this.data1 = [{
        transferDate: '2017-07-24 15:12:35',
        makePerson: '胡开甲',
        transferPerson: '朱晨通'
      }, {
        transferDate: '2017-07-24 15:12:35',
        makePerson: '胡开甲',
        transferPerson: '李楠'
      }]
    }

  }

</script>

<style lang="less" scope>
  .choose-buy-materials {
    .ivu-select-selection {
      width: 240%;
      display: inline-block;
      border-style: none;
      border-bottom-style: solid;
      border-radius: 0;
    }
  }

  .calculate {
    .ivu-modal-footer {
      display: none!important;
    }
  }

</style>
