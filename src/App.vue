<template>
  <div id="app">
    <component :is="layout"></component>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { State } from "vuex-class";
import DefaultLauout from "~/layouts/default.vue";
import WorkspaceLayout from "~/layouts/workspace.vue";

@Component({
  components: {
    default: DefaultLauout,
    workspace: WorkspaceLayout
  }
})
export default class App extends Vue {
  @State layout: string;
  created() {}
}
</script>
<style lang="less">
@import "//at.alicdn.com/t/font_689890_sno689qmewxw29.css";


</style>
