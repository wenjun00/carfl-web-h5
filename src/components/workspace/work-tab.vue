<template>
  <div class="component work-tab">
    <el-tabs>
      <el-tab-pane label="用户管理" name="first"></el-tab-pane>
      <el-tab-pane label="配置管理" name="second"></el-tab-pane>
      <el-tab-pane label="角色管理" name="third"></el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth"></el-tab-pane>
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
export default class WorkTab extends Vue {}
</script>

<style scoped>

</style>
