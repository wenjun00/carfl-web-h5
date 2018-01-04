<template>
  <section class="page case-tatics">
    <data-form :model="caseTaticsModel" @onSearch="refreshData">
      <template slot="default-input">
        <el-form-item label="策略名称" prop="name">
          <el-input v-model="caseTaticsModel.name"></el-input>
        </el-form-item>
      </template>
      <template slot="default-button">
        <el-button @click="creatClick">新建分案策略</el-button>
      </template>
    </data-form>
    <data-box :data="caseTaticsDataSet" @onPageChange="refreshData">
      <template slot="columns">
        <el-table-column prop="name" label="策略名称" min-width="90">
        </el-table-column>
        <el-table-column prop="priority" label="优先级" min-width="125">
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" min-width="80">
        </el-table-column>
        <el-table-column prop="overDueDays" label="创建人" min-width="80">
        </el-table-column>
        <el-table-column prop="createDate" label="操作" min-width="60">
          <template slot-scope="scope">
            <!--<el-button type="text" @click="pauseClick(scope)">暂停</el-button>-->
            <el-button type="text" @click="modifyClick(scope)">修改</el-button>
            <!--<el-button type="text" @click="deleteClick(scope)">删除</el-button>-->
          </template>
        </el-table-column>
      </template>
    </data-box>
    <!--新建策略-->
    <el-dialog title="新增分案策略" :center="true" :visible.sync="dialog.create" width="40%">
      <create-tatics ref="create-tatics" @close="dialog.create = false" @success="refreshData"></create-tatics>
    </el-dialog>
    <el-dialog title="修改分案策略" :center="true" :visible.sync="dialog.modify" width="40%" @open="modifyOpen">
      <modify-tatics ref="modify-tatics" @close="dialog.modify = false" @success="refreshData"></modify-tatics>
    </el-dialog>
  </section>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import {
    Layout
  } from "~/core/decorator";
  import {
    Dependencies
  } from "~/core/decorator";
  import {
    orderStrategyConfigService
  } from "~/services/order-strategy-config.service";
  import DataForm from "~/components/common/data-form.vue";
  import DataBox from "~/components/common/data-box.vue";
  import CreateTatics from "~/components/pages/tatics-manage/create-tatics.vue";
  import ModifyTatics from "~/components/pages/tatics-manage/Modify-tatics.vue";

  @Layout('workspace')
  @Component({
    components: {
      CreateTatics,
      ModifyTatics,
      DataForm,
      DataBox
    }
  })
  export default class CaseTatics extends Vue {
    @Dependencies(orderStrategyConfigService) private orderStrategyConfigService: orderStrategyConfigService;

    // 列表数据集
    private caseTaticsDataSet: Array < any > = [];
    // 数据实体
    private caseTaticsModel: any = {
      name: ""
    };
    private dialog: any = {
      create: false,
      modify: false
    };
    private modifyData: any = {};
    /**
     * 初始化
     */
    mounted() {
      this.refreshData()
    }
    /**
     * 新建分案策略
     */
    creatClick() {
      this.dialog.create = true
    }
    /**
     * 暂停
     */
    pauseClick() {

    }
    /**
     * 修改
     */
    modifyClick(scope) {
      this.dialog.modify = true
      this.modifyData = scope.row
    }
    modifyOpen() {
      this.$nextTick(() => {
        let ref: any = this.$refs['modify-tatics']
        ref.refresh(this.modifyData)
      })
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
      this.orderStrategyConfigService.query({
        ...this.caseTaticsModel
      }).subscribe(data => {
        this.caseTaticsDataSet = data.content;
      });
      console.log('aaa')
    }
  }

</script>

<style>


</style>
