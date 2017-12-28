<template>
  <div id="app">
    <component :is="$store.state.layout"></component>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import DefaultLauout from "~/layouts/default.vue";
import WorkspaceLayout from "~/layouts/workspace.vue";

@Component({
  components: {
    default: DefaultLauout,
    workspace: WorkspaceLayout
  }
})
export default class App extends Vue {
  created() {}
}
</script>

<style lang="less">
@import "normalize-css/normalize.css";
@import "assets/styles/layout.less";
@import "assets/styles/common.less";
@import "assets/styles/default.less";
</style>
