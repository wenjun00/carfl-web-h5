<template>
  <div class="component work-menu">
    <el-menu unique-opened router :default-active="$route.fullPath">
      <work-menu-item v-for="item in menuList" :data="item" :key="item.id"></work-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import WorkMenuItem from "~/components/workspace/work-menu-item.vue";
// import { Prop } from "vue-property-decorator";
import { State, Mutation } from "vuex-class";

@Component({
  components: {
    WorkMenuItem
  }
})
export default class WorkMenu extends Vue {
  @State userRescource;
  @State("menuCollapse") _menuCollapse;
  @Mutation updateMenuCollapse;

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
      let children = rescource.filter(
        item => item.parentId === x.id && item.type === "MENU"
      );
      x.children = children;
      return x;
    })
    .sort((x: any, y: any) => x.sort - y.sort)

    return menus;
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
