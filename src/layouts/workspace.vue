<template>
  <div class="layout col full">
    <work-header></work-header>
    <div class="row row-span">
      <work-menu></work-menu>
      <div class="col-span col">
        <work-tab></work-tab>
        <div>
          <keep-alive :include="keepLiveList">
            <router-view class="row-span" />
          </keep-alive>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { State, namespace } from "vuex-class";
import WorkHeader from "~/components/workspace/work-header.vue";
import WorkMenu from "~/components/workspace/work-menu.vue";
import WorkTab from "~/components/workspace/work-tab.vue";

const ModuleState = namespace("workspace", State);

@Component({
  components: {
    WorkHeader,
    WorkMenu,
    WorkTab
  }
})
export default class WorkSpaceLayout extends Vue {
  @ModuleState currentTabs;

  get keepLiveList() {
    let a =  this.currentTabs.filter(x => x.url).map(x => {
      let pathList = x.url.split("/");
      let name = pathList[pathList.length - 1];
      return `-${name}`.replace(/\-(\w)/g, ($0, $1) =>
        $1.toUpperCase()
      )
    });
    console.log(a)
    return a
  }
}
</script>

<style>

</style>
