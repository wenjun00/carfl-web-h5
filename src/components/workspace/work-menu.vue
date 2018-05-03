<template>
  <section class="component work-menu">
    <i-menu theme="light" @on-select="onSelectMenuItem">
      <work-menu-item :level="1" v-for="node  in  menuList" :key="node.id" :data="node"></work-menu-item>
    </i-menu>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import { State, Mutation, Action } from "vuex-class";
import WorkMenuItem from "~/components/workspace/work-menu-item.vue";

@Component({
  components: {
    WorkMenuItem
  }
})
export default class WorkMenu extends Vue {
  @State("pageList") pageList;
  @Mutation("openPage") openPage;
  @State("menuResource") menuResource;
  @State("currentPage") currentPage;
  private currentMenuItem: any = null;
  private showMenuPoptip = false;

  updatePoptipState(state) {
    this.showMenuPoptip = state;
  }

  private menuList = [];

  @Watch("menuResource")
  onMenuResourceChange() {
    this.createMenuList();
  }

  @Watch("currentPage")
  onCurrentPageChange(value) {}

  createMenuList() {
    // 生成菜单项
    let createMenus = item => {
      let children = this.menuResource
        .filter(x => x.pid === item.id)
        .map(x => {
          return createMenus(Object.assign({}, x));
        })
        .sort((x: any, y: any) => x.sort - y.sort);

      if (children && children.length) {
        item.children = children;
      }
      return item;
    };

    // 过滤菜单项
    let menus = this.menuResource
      .filter(x => x.filetype === 429)
      .sort((x: any, y: any) => x.sort - y.sort)
      .map(createMenus);
    this.menuList = menus;
  }

  onSelectMenuItem(path) {
    if (this.currentPage === path) {
      return;
    }

    // 打开页面
    if (path) {
      this.openPage(path);
    }
  }

  mounted() {
    this.createMenuList();
  }
}
</script>

<style lang="less" scoped>
.work-menu.component {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
  .menu-container {
    height: 100%;
    display: inline-block;
  }
}
</style>

<style lang="less">
.work-menu.component {
  .ivu-menu {
    min-height: 110%;
  }
}
</style>
