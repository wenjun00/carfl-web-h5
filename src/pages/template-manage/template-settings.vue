<template>
  <section class="page template-settings">
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
    importOrderConfigService
  } from "~/services/import-order-config.service";
  import DataForm from "~/components/common/data-form.vue";
  import DataBox from "~/components/common/data-box.vue";

  @Layout('workspace')
  @Component({
    components: {
      DataForm,
      DataBox
    }
  })
  export default class TemplateSettings extends Vue {
    @Dependencies(importOrderConfigService) private importOrderConfigService: importOrderConfigService;
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
    /**
     * 获取刷新数据
     */
    refreshData() {
      this.importOrderConfigService.getAllImportConfig().subscribe(data => {
        this.caseTaticsDataSet = data.content;
      });
    }
  }

</script>

<style>


</style>
