<template>
  <section class="component work-menu">
    <Menu theme="light" @on-select="onSelectMenuItem">
      <Submenu v-for="menu_level_1  in  menuList" :name="menu_level_1.path" :key="menu_level_1.path">
        <template slot="title">
          {{menu_level_1.resoname}}
        </template>

        <template v-for="menu_level_2  in  menu_level_1.children">
          <Submenu v-if="menu_level_2.children&&menu_level_2.children.length" :name="menu_level_2.path" :key="menu_level_2.path">
            <template slot="title">
              {{menu_level_2.resoname}}
            </template>
            <MenuItem v-for="menu_level_3  in  menu_level_2.children" :key="menu_level_3.path" :name="menu_level_3.path">{{menu_level_3.resoname}}</MenuItem>
          </Submenu>
          <MenuItem v-else :name="menu_level_2.path" :key="menu_level_2.path">{{menu_level_2.resoname}}</MenuItem>
        </template>
      </Submenu>
    </Menu>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import { State, Mutation, Action } from "vuex-class";
import SvgIcon from "~/components/common/svg-icon.vue";

@Component({
  components: {
    SvgIcon
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
    console.log(menus);
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
  &::-webkit-scrollbar {display:none}
  // .command {
  //   line-height: 40px;
  //   height: 40px;
  //   padding-right:10px;
  //   border-left: solid 1px
  // }
  .menu-container {
    height: 100%;
    display: inline-block;
    .menu-level-1 {
      height: 100%;
      min-width: 100px;

      .menu-level-1-title {
        padding: 0 15px;
        font-size: 16px;
        color: #feffff;
        padding: 0 3px;
        font-size: 14px;
      }
    }

    .menu-popue {
      z-index: 10;
      position: absolute;
      top: 60px;
      width: 100%;
      left: 0;
      background: #ffffff;
      box-shadow: 5px 5px 5px #dddddd;
      min-height: 300px;

      .menu-level-2 {
        flex-wrap: nowrap;
        padding: 0 60px;
        text-align: center;

        .separate {
          width: 1px;
          height: 150px;
          background-color: #dddddd;
          position: relative;
          top: 46px;
          left: 60px;
        }

        &:last-child {
          .separate {
            display: none;
          }
        }
      }
    }
  }
}
</style>

<style lang="less" scoped>
.work-menu.component {
  .ivu-menu {
    min-height: 100%;
  }
  .one-level {
    height: 100%;
  }
  .two-level {
    position: relative;
    right: 32px;
  }
  .ivu-poptip {
    height: 100%;
  }
  .ivu-poptip-rel {
    height: 100%;
  }
  .ivu-poptip-arrow {
    display: none;
    border-bottom-color: #1d4f8b;
  }
  .ivu-poptip-inner {
    border: solid 2px #1d4f8b;
    border-radius: 0;
  }

  .menu2 {
    display: inline-block;
    font-size: 14px;
    font-weight: bold;
    color: #1d4f8b;
    margin-bottom: 20px;
    padding-top: 30px; // text-align: left;
    padding-left: 4px;
  }
  .menu3 {
    margin: 12px 0;
    cursor: pointer;
    text-align: left;
  }
  .menu3:hover {
    color: #265ea2 !important;
  }
  .iconfont_container {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: inline-block;
    .work_menu_iconfont {
      font-size: 18px;
      text-align: center;
      color: #fff;
      position: relative;
      top: 3px;
    }
  }
}
</style>
