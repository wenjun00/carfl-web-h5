<template>
  <div class="layout col full" :class="[theme]">
    <work-header></work-header>
    <div class="row-span" style="background:#EFF3F5;padding-top:0">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import WorkHeader from "~/components/workspace/work-header.vue";
  import Component from "vue-class-component";
  import {
    State
  } from "vuex-class";

  @Component({
    components: {
      WorkHeader
    }
  })
  export default class WorkSpace extends Vue {
    @State("theme") theme: String;

    get pageList() {
      return this.$store.state.pageList.map(x => {
        let pathList = x.path.split("/");
        let name = pathList[pathList.length - 1];
        let componentName = `-${name}`.replace(/\-(\w)/g, ($0, $1) =>
          $1.toUpperCase()
        );
        return componentName;
      });
    }
  }

</script>
<style lang="less" scoped>
  .layout {
    flex-wrap: nowrap; // background: #EFF3F5;
  }

  .header-area {
    grid-row-start: 1;
    grid-row-end: 2;
  }

  .content-area {
    grid-row-start: 2;
    grid-row-end: 3;
  }

</style>
