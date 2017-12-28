<template>
  <div class="layout col full">
    <work-header></work-header>
    <div class="row row-span">
      <work-menu></work-menu>
      <router-view class="col-span" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import WorkHeader from "~/components/workspace/work-header.vue";
import WorkMenu from "~/components/workspace/work-menu.vue";
@Component({
  components: {
    WorkHeader,
    WorkMenu
  }
})
export default class WorkSpaceLayout extends Vue {
  private aaa = "111";
}
</script>

<style>

</style>
