<!--变更收款项-->
<template>
  <section class="component change-gather-item">
    <data-box :columns="columns1" :data="data1"></data-box>
  </section>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component'
  import {
    Prop
  } from "vue-property-decorator";
  import DataBox from "~/components/common/data-box.vue";

  @Component({
    components: {
      DataBox
    }
  })
  export default class ChangeGatherItem extends Vue {
    private columns1: any;
    private data1: Array < Object > = [];

    created() {
      this.columns1 = [{
        align: 'center',
        type: 'selection',
        width: 60
      }, {
        align: 'center',
        title: '收款项',
        key: 'gatherItem'
      }, {
        align: 'center',
        title: '金额',
        key: 'money'
      }]

      this.data1 = [{
        gatherItem: '首付金额',
        money: '78901'
      }, {
        gatherItem: '融资额',
        money: '10000'
      }, {
        gatherItem: '期供金额',
        money: '500'
      }, {
        gatherItem: '尾付款',
        money: '1800'
      }, {
        gatherItem: '保证金额',
        money: '5000'
      }, {
        gatherItem: '上牌费',
        money: '260'
      }, {
        gatherItem: '保险费',
        money: '18000'
      }, {
        gatherItem: '购置税',
        money: '5000'
      }, {
        gatherItem: 'GPS费',
        money: '1500'
      }, {
        gatherItem: '其他费用',
        money: '28000'
      }]
    }
  }

</script>
