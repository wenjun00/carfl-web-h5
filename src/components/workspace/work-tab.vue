<template>
  <div class="component work-tab">
    <el-tabs type="card" v-model="currentTab" @tab-click="changeTab">
      <el-tab-pane v-for="tab in currentTabs" :key="tab.path" :label="tab.name" :name="tab.url"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
// import { Prop } from "vue-property-decorator";
import { State, Mutation } from "vuex-class";

@Component({
  components: {}
})
export default class WorkTab extends Vue {
  @State userRescource;
  @Mutation updateTabs;

  private currentTabs = [];
  private currentTab = "";

  created() {
    this.$router.beforeResolve((to, from, next) => {
      // 更新tab
      if (this.isUpdateTabs(to.path, from.path)) {
        this.currentTabs = this.generateTabs(to.path);
      }

      this.currentTab = to.path;

      next();
    });
  }

  isUpdateTabs(toPath, fromPath) {
    if (!toPath || !fromPath) {
      return true;
    }

    let toItem = this.userRescource.find(x => x.url === toPath);
    let fromItem = this.userRescource.find(x => x.url === fromPath);

    if (!toItem || !fromItem) {
      return true;
    }

    if (toItem.parentId !== fromItem.parentId) {
      return true;
    }
  }

  generateTabs(path) {
    let target: any = this.userRescource.find((x: any) => x.url === path);

    let tabs = this.userRescource
      .filter((x: any) => x.type === "MENU")
      .filter((x: any) => x.parentId === target.parentId)
      .sort((x: any, y: any) => x.sort - y.sort);

    return tabs;
  }

  changeTab() {
    console.log(this.$route)
    if (this.$route.path !== this.currentTab) {
      this.$router.push(this.currentTab);
    }
  }
}
</script>

<style scoped>

</style>
