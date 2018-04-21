<template>
  <section class="component work-tab full">
    <Tabs v-model="currentPage" type="card" closable :animated="false" @on-tab-remove="closePage">
      <TabPane v-for="page in pageList" :key="page.path" :label="page.resoname" :name="page.path" :closable="page.path !== 'home'">
        <component ref="pages" :is="getComponentName(page)"></component>
      </TabPane>
    </Tabs>
    <div class="close-all-tabs" @click="closeAllTabs" title="关闭所有">
      <Icon type="close"></Icon>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";
import { State, Mutation } from "vuex-class";
import menuConfig from "~/config/menu.config";
import { CommonService } from "~/utils/common.service";
import Home from "~/pages/home.vue";

@Component({
  name: "work-tab",
  components: {
    Home
  },
  beforeCreate() {
    // 动态导入组件
    let importComponents = item => {
      if (item.children) {
        item.children.forEach(importComponents);
      }
      if (item.path) {
        let componentName = CommonService.getComponentName(item);
        let components = this.$options.components;
        if (components) {
          components[componentName] = () =>
            import("~/pages/" + item.path + ".vue");
        }
      }
    };
    menuConfig.forEach(importComponents);
  }
})
export default class WorkTab extends Vue {
  @State("currentPage") _currentPage: any; // 当前page
  @State("pageList") pageList: Array<any>;
  @Mutation("openPage") openPage: Function;
  @Mutation("closePage") closeTab: Function;
  @Mutation("closeAllPage") closeAllPage: Function;
  private getComponentName = CommonService.getComponentName;

  /**
   * 获取当前页面路径
   */
  get currentPage() {
    return this._currentPage;
  }

  /**
   * 设置当前页面路径
   */
  set currentPage(path) {
    this.openPage(path);
  }

  closeAllTabs(path) {
    this.$Modal.confirm({
      title: "提示",
      content: "确定关闭所有已打开页面吗？",
      onOk: () => {
        this.closeAllPage(path);
      }
    });
  }
  /**
   * 监听当前页面变化
   */
  @Watch("currentPage")
  onPageChanged(val: string, oldVal: string) {
    let components = <Array<Vue>>this.$refs["pages"];
    let component = components.find(
      x =>
        x.$options.name ===
        this.getComponentName({
          path: val
        })
    );

    if (
      component &&
      component.$options.activated &&
      component.$options.activated.length > 0
    ) {
      let activated = component.$options.activated[0];
      activated.call(component);
    }
  }

  /**
   * 关闭页面
   */
  closePage(path) {
    this.closeTab(path);
  }
}
</script>

<style lang="less" scoped>
.component.work-tab {
    .close-all-tabs{
        position:absolute;
        top:70px;
        right:10px;
        border-bottom-style:none;
        font-size:14px;cursor:pointer;
    }
  & > .ivu-tabs {
    height: 100%;
    @tab-bar-height: 45px;
    & > .ivu-tabs-bar {
      background: #fff;
      border-bottom: 1px solid #dedede;
      height: @tab-bar-height;
      padding: 10px 0;
      margin-bottom: 0;

      .ivu-tabs-nav-container {
        background: #fff;
        width: 95%;

        .ivu-tabs-tab {
          min-width: 100px;
          text-align: center;
        }
      }
    }
    & > .ivu-tabs-content {
      height: calc(~"100% - @{tab-bar-height}");
      padding: 10px;
      overflow: auto;
      & > .ivu-tabs-tabpane {
        height: 100%;
        min-height: 100%;
      }
    }
  }
}
</style>
