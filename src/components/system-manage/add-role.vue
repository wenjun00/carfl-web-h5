<!--新增角色-->
<template>
  <section class="component add-role">
    <i-form :label-width="110" style="margin-top:20px;">
      <i-form-item label="角色名称">
        <i-input style="width:180px;"></i-input>
      </i-form-item>
      <i-form-item label="状态">
        <i-select style="width:180px;">
          <i-option label="启用" value="启用" key="启用"></i-option>
          <i-option label="停用" value="停用" key="停用"></i-option>
        </i-select>
      </i-form-item>
      <i-form-item label="描述">
        <i-input type="textarea"></i-input>
      </i-form-item>
    </i-form>
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
  export default class AddRole extends Vue {
    private columns1: any;
    private data1: Array < Object > = [];
    @Prop()
    row: Object;

    created() {
      this.columns1 = [{
        align: 'center',
        type: 'selection',
        width: 60
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
        roleName: '采购专员',
        desc: '采购计算机'
      }, {
        roleName: '门店车务',
        desc: '负责门店四'
      }, {
        roleName: '风控专员',
        desc: '负责订单风控'
      }, {
        roleName: '风控主管',
        desc: '负责风控一部'
      }]
    }
    cancel() {

    }
    addRole() {

    }
    confirm() {

    }
  }

</script>
