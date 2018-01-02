<template>
  <section class="page case-tatics">
    <data-box :data="caseTaticsDataSet" @onPageChange="refreshData">
      <template slot="columns">
        <el-table-column prop="prinName" label="委托方" min-width="90">
        </el-table-column>
        <el-table-column prop="personalName" label="策略名称" min-width="90">
        </el-table-column>
        <el-table-column prop="idCard" label="优先级" min-width="125">
        </el-table-column>
        <el-table-column prop="mobileNo" label="创建时间" min-width="80">
        </el-table-column>
        <el-table-column prop="overDueDays" label="创建人" min-width="80">
        </el-table-column>
        <el-table-column prop="createDate" label="操作" min-width="60">
          <template slot-scope="scope">
            <el-button type="text" @click="pauseClick(scope.row)">暂停</el-button>
            <el-button type="text" @click="modifyClick(scope.row)">修改</el-button>
            <el-button type="text" @click="deleteClick(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </template>
    </data-box>
  </section>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import {
    Layout
  } from "~/core/decorator";
  import DataBox from "~/components/common/data-box.vue";
  @Layout('workspace')
  @Component({
    components: {
      DataBox
    }
  })
  export default class CaseTatics extends Vue {
    // 列表数据集
    private caseTaticsDataSet: Array < any > = [];
    // 数据实体
    private caseTaticsModel: any = {
      name: ""
    };
    /**
     * 初始化
     */
    mounted() {
      this.refreshData()
    }
    /**
     * 暂停
     */
    pauseClick() {

    }
    /**
     * 修改
     */
    modifyClick() {

    }
    /**
     * 删除
     */
    deleteClick() {

    }
    /**
     * 获取刷新数据
     */
    refreshData() {
      // this.storageApplyService.getAllStorageApply().subscribe(data => {
      //   this.approvalDataSet = data.content;
      // });
      console.log('aaa')
    }
  }

</script>

<style>


</style>
