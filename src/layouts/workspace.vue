<template>
  <div class="layout col full">
    <work-header></work-header>
    <div class="row row-span">
      <work-menu></work-menu>
      <div class="col-span col">
        <work-tab></work-tab>
        <router-view class="row-span" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import WorkHeader from "~/components/workspace/work-header.vue";
import WorkMenu from "~/components/workspace/work-menu.vue";
import WorkTab from "~/components/workspace/work-tab.vue";
@Component({
  components: {
    WorkHeader,
    WorkMenu,
    WorkTab
  }
})
export default class WorkSpaceLayout extends Vue {
  private aaa = "111";
}
</script>

<style>

</style>
