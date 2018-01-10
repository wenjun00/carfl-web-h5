<!--转交记录-->
<template>
  <section class="component transfer-record">
    
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

  @Component({
    components: {
      SvgIcon,
      DataBox,
    }
  })
  export default class TransferRecord extends Vue {

    created() {
     
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
