<template>
  <section class="page home-page theme-default">
    <i-button>test</i-button>
    this is a home
    <svg-icon iconClass="jisuanqi"></svg-icon>
    <data-grid :labelWidth="100" labelAlign="left" contentAlign="left">
      <data-grid-item label="审批结果：" :span="6">
        <template>
          <div>1213</div>
        </template>
      </data-grid-item>
      <data-grid-item label="申请原因：" :span="6">
        1123
      </data-grid-item>
    </data-grid>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Test2 from "./test2.vue";
import SvgIcon from '~/components/common/svg-icon.vue'
import { DataGrid, DataGridItem } from "fintech-vue-component";
import { Layout } from "~/core/decorator";

@Layout("workspace")
@Component({
  components: {
    DataGrid,
    DataGridItem,
    SvgIcon
  }
})
export default class Home extends Vue {
  private a = "cccc";

}
</script>
