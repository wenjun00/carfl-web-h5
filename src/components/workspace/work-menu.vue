<template>
  <section class="component work-menu">
    <div class="text-left row middle-span menu-container" @mouseleave="updatePoptipState(false)">
      <!-- 一级菜单-start -->
      <div class="row middle-span  one-level">
        <div v-for="menu_lv1 in menuList" :key="menu_lv1.path" class="menu-level-1" @mouseenter="onCurrentMenuItemChange(menu_lv1)">
          <div class="menu-level-1-title row middle-span center-span one-level" @click="redirect(menu_lv1)">
            <span>{{menu_lv1.resoname}}</span>
          </div>
        </div>
      </div>
      <!-- 一级菜单-end -->
      <div v-show="showMenuPoptip" class="menu-popue row center-span" slot="content" v-if="currentMenuItem&&currentMenuItem.children">
        <!-- 二级菜单-start -->
        <div v-for="menu_lv2 in currentMenuItem.children" :key="menu_lv2.path" class="menu-level-2 row">
          <div>
            <div class="two-level">
              <div class="iconfont_container" :style="{background:menu_lv2.color}">
                <svg-icon :iconClass="menu_lv2.icon" class="work_menu_iconfont"></svg-icon>
              </div>
              <div class="menu2" :style="{color:menu_lv2.color}">{{menu_lv2.resoname}}</div>
            </div>
            <div v-if="menu_lv2.children">
              <!-- 三级菜单-start -->
              <div v-for="menu_lv3 in menu_lv2.children" :key="menu_lv3.path" @click="redirect(menu_lv3,$event)" class="menu3">
                <span>{{menu_lv3.resoname}}</span>
              </div>
              <!-- 三级菜单-end -->
            </div>
          </div>
          <div class="separate">
          </div>
        </div>
        <!-- 二级菜单-end -->
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import { State, Mutation, Action } from "vuex-class";
import SvgIcon from "~/components/common/svg-icon.vue";
import menuConfig from "~/config/menu.config";

@Component({
  components: {
    SvgIcon
  }
})
export default class WorkMenu extends Vue {
  @State("pageList") pageList;
  @Mutation("openPage") openPage;
  @State("menuResource") menuResource;

  private currentMenuItem: any = null;
  private showMenuPoptip = false;

  updatePoptipState(state) {
    this.showMenuPoptip = state;
  }

  private menuList = [];
  private enterTimer;

  onCurrentMenuItemChange(item = null) {
    if (!this.showMenuPoptip) {
      this.updatePoptipState(true);
    }

    if (this.currentMenuItem !== item) {
      this.currentMenuItem = item;
    }
  }

  @Watch("menuResource")
  onMenuResourceChange() {
    this.createMenuList();
  }

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

  /**
   * 页面跳转
   */
  private redirect(page, event) {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    // 关闭子菜单
    this.showMenuPoptip = false;

    // 打开页面
    if (page.path) {
      this.openPage(page);
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
    .one-level{
        height:100%;
    }
    .two-level{
        position:relative;
        right:32px;
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
