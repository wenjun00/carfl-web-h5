<template>
  <div class="component work-menu text-left row middle-span">
    <div v-for="menu_lv1 in menuConfig" :key="menu_lv1.path" class="menu-level-1" @click="redirect(menu_lv1,menu_lv1)">
      <Poptip v-model="menu_lv1.popue" placement="bottom" trigger="hover">
        <div class="menu-level-1-title row middle-span center-span" style="height:100%">
          <span>{{menu_lv1.title}}</span>
        </div>
        <div v-if="menu_lv1.children" class="menu-popue row" slot="content">
          <div v-for="menu_lv2 in menu_lv1.children" :key="menu_lv2.path" class="menu-level-2 row">
            <div>
              <div style="position:relative;right:32px;">
                <div class="iconfont_container" :style="{background:menu_lv2.color}">
                  <svg-icon :iconClass="menu_lv2.icon" class="work_menu_iconfont"></svg-icon>
                </div>
                <div class="menu2" :style="{color:menu_lv2.color}">{{menu_lv2.title}}</div>
              </div>
              <div v-if="menu_lv2.children">
                <div v-for="menu_lv3 in menu_lv2.children" :key="menu_lv3.path" @click="redirect(menu_lv3,menu_lv1)" class="menu3">
                  <span>{{menu_lv3.title}}</span>
                </div>
              </div>
            </div>
            <div class="verticleLine">
            </div>
          </div>
        </div>
      </Poptip>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import {
    Prop
  } from "vue-property-decorator";
  import {
    State,
    Mutation,
    Action
  } from "vuex-class";
  import SvgIcon from '~/components/common/svg-icon.vue'
  import menuConfig from "~/config/menu.config";

  @Component({
    components: {
      SvgIcon
    }
  })
  export default class WorkMenu extends Vue {
    @State("pageList") pageList;
    @Mutation("openPage") openPage;
    private menuConfig: Array < any > = [];

    created() {
      this.menuConfig = menuConfig.map((item: any) => {
        item.popue = false;
        return item;
      });
    }

    private redirect(page, menu) {
      console.log(page)
      menu.popue = false;
      this.openPage(page);
    }
  }

</script>

<style lang="less" scoped>
  .menu-level-1 {
    height: 100%;
    .menu-level-1-title {
      padding: 0 15px;
      font-size: 16px;
      color: #feffff;

      &>* {
        padding: 0 3px;
        font-size: 14px;
      }
    }
  }

  .menu-level-2 {
    // height:410px;
    // display: inline-block; // border-right: 1px solid #DDDDDD;
    flex-wrap: nowrap;
    padding: 0 60px;
    text-align: center;
  }

  .verticleLine {
    width: 1px;
    height: 150px;
    background-color: #DDDDDD; // margin-left: 50px;
    // margin-top: 46px;
    position: relative;
    top: 46px;
    left: 60px;
  }

  .menu-level-2:last-child {
    width: 0px;
  }

</style>

<style lang="less">
  .work-menu.component {
    height: 100%;
    .ivu-poptip-body-content {
      overflow: hidden;
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
    .menu-popue {
      display: flex;
      align-items: flex-start;
      justify-content: center;
    }
    .menu2 {
      display: inline-block;
      font-size: 14px;
      font-weight: bold;
      color: #1D4F8B;
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
      color: #265EA2!important;
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
