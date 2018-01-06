<template>
  <section class="main-container">
    asd
    <work-tab></work-tab>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import WorkTab from "~/components/workspace/work-tab.vue";
import { Layout } from "~/core/decorator";

@Layout("workspace")
@Component({
  components: {
    WorkTab
  }
})
export default class extends Vue {}
</script>

<style lang="less">
.full-height() {
  height: 100%;
}

.main-container {
  .full-height();
  & > * {
    .full-height();
    & > .ivu-tabs {
      .full-height();
      & > .ivu-tabs-content {
        min-height: 100%;
      }
    }
  }
}
</style>
