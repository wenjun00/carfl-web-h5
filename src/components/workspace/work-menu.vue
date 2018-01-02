<template>
  <div class="component work-menu">
    <el-menu unique-opened :default-active="$route.fullPath" @select="selectMenuItem">
      <work-menu-item v-for="item in menuList" :data="item" :key="item.id"></work-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import WorkMenuItem from "~/components/workspace/work-menu-item.vue";
// import { Prop } from "vue-property-decorator";
import { State, Mutation, Action, namespace } from "vuex-class";
const ModuleAction = namespace("workspace", Action);
@Component({
  components: {
    WorkMenuItem
  }
})
export default class WorkMenu extends Vue {
  @State userRescource;
  @State("menuCollapse") _menuCollapse;
  @Mutation updateMenuCollapse;
  @ModuleAction updateTabs;

  get menuCollapse() {
    return this._menuCollapse;
  }

  set menuCollapse(value) {
    this.updateMenuCollapse(value);
  }

  /**
   * 菜单列表
   */
  get menuList() {
    let rescource = this.userRescource.filter(x =>
      ["MENU", "DIRECTORY"].includes(x.type)
    );

    let menus = rescource
      .filter(x => x.type === "DIRECTORY")
      .map(x => {
        let children = rescource
        .filter(item => item.parentId === x.id && item.type === "MENU")
        .sort((x: any, y: any) => x.sort - y.sort)

        x.children = children;
        return x;
      })
      .sort((x: any, y: any) => x.sort - y.sort);

    return menus;
  }

  /**
   * 选择菜单项
   * 生成缓存项
   */
  selectMenuItem(path, pathArray) {
    // 防止重复点击
    if (this.$route.path === path) {
      return;
    }

    // 路径长度验证
    if (pathArray.length !== 2) {
      return;
    }

    // 获取一级,二级路径
    let [path1, path2] = pathArray;

    // 非统计菜单需要更新tabs
    if (!this.$route.path.startsWith(path1)) {
      let target = this.userRescource.find(x => x.url === path1);
      target && this.updateTabs(target.id);
      this.updateTabs(target.id);
    }

    this.$nextTick(() => {
      this.$router.push(path);
    });
  }
}
</script>

<style scoped>
.work-menu {
  flex-basis: 200px;
  width: 200px;
  height: 100%;
  max-height: 100%;
}
</style>
