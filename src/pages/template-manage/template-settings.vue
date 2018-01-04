<template>
  <section class="page template-settings">
    <data-form :model="caseTemplateModel" @onSearch="refreshData">
      <template slot="default-input">
        <el-form-item label="模板名称" prop="name">
          <el-input v-model="caseTemplateModel.name"></el-input>
        </el-form-item>
        <el-form-item label="委托方" prop="trustee">
          <el-input v-model="caseTemplateModel.trustee"></el-input>
        </el-form-item>
      </template>
      <template slot="default-button">
        <el-button @click="creatClick">新增模板</el-button>
      </template>
    </data-form>
    <data-box :data="caseTemplateDataSet" @onPageChange="refreshData" :page="pageService">
      <template slot="columns">
        <el-table-column prop="name" label="模板名称" min-width="90">
        </el-table-column>
        <el-table-column prop="trustee" label="委托方" min-width="90">
        </el-table-column>
        <el-table-column prop="operatorTime" label="创建时间" min-width="80">
        </el-table-column>
        <el-table-column label="创建人" min-width="80">
          <template slot-scope="scope">
            <span>{{scope.row.operator?scope.row.operator.username:''}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createDate" label="操作" min-width="60">
          <template slot-scope="scope">
            <el-button type="text" @click="modifyClick(scope)">修改</el-button>
            <el-button type="text" @click="deleteClick(scope)">删除</el-button>
          </template>
        </el-table-column>
      </template>
    </data-box>
    <el-dialog title="新增模板" :center="true" :visible.sync="dialog.create" width="40%" @open="$nextTick(()=>{$refs['create-template'].refreshData()})">
      <create-template ref="create-template" @close="dialog.create = false" @success="refreshData"></create-template>
    </el-dialog>
    <el-dialog title="修改模板" :center="true" :visible.sync="dialog.modify" width="40%" @open="modifyOpen">
      <modify-template ref="modify-template" @close="dialog.modify = false" @success="refreshData"></modify-template>
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
    importOrderConfigService
  } from "~/services/import-order-config.service";
  import DataForm from "~/components/common/data-form.vue";
  import DataBox from "~/components/common/data-box.vue";
  import CreateTemplate from "~/components/pages/template-manage/create-template.vue";
  import ModifyTemplate from "~/components/pages/template-manage/Modify-template.vue";
  import {
    PageService
  } from "~/utils/page.service";

  @Layout('workspace')
  @Component({
    components: {
      CreateTemplate,
      ModifyTemplate,
      DataForm,
      DataBox
    }
  })
  export default class TemplateSettings extends Vue {
    @Dependencies(importOrderConfigService) private importOrderConfigService: importOrderConfigService;
    @Dependencies(PageService) private pageService: PageService;
    // 列表数据集
    private caseTemplateDataSet: Array < any > = [];
    // 数据实体
    private caseTemplateModel: any = {
      name: ""
    };
    private modifyData: any = {};
    private dialog: any = {
      create: false,
      modify: false
    };
    /**
     * 新增
     */
    creatClick() {
      this.dialog.create = true
    }
    /**
     * 删除
     */
    deleteClick(scope) {
      this.$confirm('此操作将删除该模板, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.refreshData()
        this.importOrderConfigService.deleteImportConfig(scope.row.id).subscribe(data => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.refreshData()
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
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
        let ref: any = this.$refs['modify-template']
        ref.refresh(this.modifyData)
      })
    }
    /**
     * 获取刷新数据
     */
    refreshData() {
      this.importOrderConfigService.getAllImportConfig(this.caseTemplateModel, this.pageService).subscribe(data => {
        this.caseTemplateDataSet = data;
        console.log(data)
      });
    }
    mounted() {
      this.refreshData()
    }
  }

</script>

<style>


</style>
