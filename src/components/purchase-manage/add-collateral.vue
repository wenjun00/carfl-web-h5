<template>
  <section class="component add-collateral">
    <!-- <span>选购信息</span> -->
    <i-row class="data-form">
      <div class="data-form-item"></div>
      <a name="xuangouxinxi" class="xinxi">选购信息</a>
    </i-row>
  </section>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import { Prop, Model, Emit, Watch } from "vue-property-decorator";

  @Component({
    components: {}
  })
  export default class AddCollateral extends Vue {

  }
</script>

<style lang="less" scoped>
  .component.add-collateral{
    .data-form{
      margin-top:10px;
      .data-form-item {
        width: 7px;
        height: 20px;
        background: #265ea2;
        display: inline-block;
        margin-right: 6px;
        position: relative;
        top: 4px;
      }
    }
  }

</style>

