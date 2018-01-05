<template>
  <div class="component work-menu-item">
    <el-submenu :index="data.url" class="sub-menu">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span slot="title" class="title">{{data.name}}</span>
      </template>
      <template v-if="data.children">
        <el-menu-item class="sub-menu-item" v-for="item in data.children" :key="item.id" :index="item.url">{{item.name}}</el-menu-item>
      </template>
    </el-submenu>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { State } from "vuex-class";

@Component({
  components: {}
})
export default class WorkMenu extends Vue {
  @Prop() data: any;

  @State userResource;
}
</script>

<style scoped>
.work-menu {
  flex-basis: 60px;
  min-width: 60px;
  height: 100%;
  max-height: 100%;
}
</style>
