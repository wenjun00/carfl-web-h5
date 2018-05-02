<!--新增分公司-->
<template>
  <section class="component bank-info">
    <data-box :columns="columns" :data="dataSet" :showConfigColumn="false" :height="height"></data-box>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class BankInfo extends Vue {

  @Prop({
    type: Number,
    default: 100
  })
  height


  @Prop({
    type: Array,
    default: []
  })
  dataSet

  // 列配置
  private columns: Array<Object> = []

  created() {
    this.columns = [
      {
        title: "户名",
        align: 'center',
        key: 'accountName',
        minWidth: this.$common.getColumnWidth(2)
      }, {
        title: "开户银行",
        align: 'center',
        key: 'accountBank',
        minWidth: this.$common.getColumnWidth(4)
      }, {
        title: "银行卡号",
        align: 'center',
        key: 'bankCardId',
        minWidth: this.$common.getColumnWidth(6),
        render: (h, { row }) => h('p', {}, this.$filter.formatBankCardNumber(row.bankCardId))
      }, {
        title: "支行名称",
        align: 'center',
        key: 'branchBankName',
        minWidth: this.$common.getColumnWidth(6)
      }, {
        title: "第三方客户号",
        align: 'center',
        key: 'thirdCustomerId',
        minWidth: this.$common.getColumnWidth(4)
      }
    ]
  }

}
</script>

<style lang="less">

</style>

