<template>
  <section class="page case-tatics">
    <data-form :model="caseTaticsModel" @onSearch="refreshData">
      <!--<template slot="default">
        <el-form-item label="客户姓名:" prop="name">
          <el-input v-model="roleModel.name"></el-input>
        </el-form-item>
      </template>-->
      <template slot="default-button">
        <el-button @click="creatClick">新建分案策略</el-button>
      </template>
    </data-form>
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
    <!--新建策略-->
    <el-dialog title="新增分案策略" :center="true" :visible.sync="dialog.create" width="40%">
      <create-tatics ref="create-tatics" @close="dialog.create = false"></create-tatics>
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

  @Layout('workspace')
  @Component({
    components: {
      CreateTatics,
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
      create: false
    };
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
      this.orderStrategyConfigService.query().subscribe(data => {
        this.caseTaticsDataSet = data.content;
      });
      console.log('aaa')
    }
  }

</script>

<style>


</style>
