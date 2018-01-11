<!--分配角色-->
<template>
  <section class="component allot-role-modal">
    <i-form :label-width="110" style="margin-top:20px;">
      <span>角色名称：</span>
      <i-input style="display:inline-block;width:20%;"></i-input>
      <i-button class="blueButton" style="margin-left:10px;">搜索</i-button>
    </i-form>
    <data-box :columns="columns1" :data="data1"></data-box>
  </section>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component'
  import DataBox from "~/components/common/data-box.vue";
  import {
    Prop
  } from "vue-property-decorator";

  @Component({
    components: {
      DataBox
    }
  })
  export default class AllotRoleModal extends Vue {
    private columns1: any;
    private data1: Array < Object > = [];
    @Prop()
    row: Object;

    created() {
      this.columns1 = [{
        align: 'center',
        type: 'selection',
        width: '60'
      }, {
        align: 'center',
        title: '角色名称',
        key: 'roleName'
      }, {
        align: 'center',
        title: '描述',
        key: 'desc'
      }]

      this.data1 = [{
        roleName:'采购专员',
        desc:'采购计算机'
      },{
        roleName:'门店车务',
        desc:'负责门店四'
      },{
        roleName:'风控专员',
        desc:'负责订单风控'
      },{
        roleName:'风控主管',
        desc:'负责风控一部'
      }]
    }
    cancel() {

    }
    confirm() {

    }
  }
</script>