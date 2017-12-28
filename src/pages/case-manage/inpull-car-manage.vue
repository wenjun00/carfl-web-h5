<template>
  <div>
    <data-form :model="caseImportModel" @onSearch="refreshData">
      <!--<template slot="default">
        <el-form-item label="客户姓名:" prop="name">
          <el-input v-model="roleModel.name"></el-input>
        </el-form-item>
      </template>-->
    </data-form>
    <data-box :data="caseImportData" @onPageChange="refreshData">
      <template slot="columns">
        <el-table-column prop="name" label="姓名">
        </el-table-column>
      </template>
    </data-box>
  </div>
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
    RoleService
  } from "~/services/role.service";
  import DataForm from "~/components/common/data-form.vue";
  import DataBox from "~/components/common/data-box.vue";

  @Layout("workspace")
  @Component({
    components: {
      DataForm,
      DataBox
    }
  })
  export default class InpullCarManage extends Vue {
    @Dependencies(RoleService) private roleService: RoleService;

    // 角色列表数据集
    private caseImportData: Array < any > = [];
    // 角色数据实体
    private caseImportModel: any = {
      name: ""
    };

    /**
     * 初始化
     */
    mounted() {
      this.refreshData()
    }

    /**
     * 获取刷新数据
     */
    refreshData() {
      this.roleService.getAllRoles().subscribe(data => {
        this.caseImportData = data;
      });
    }
  }

</script>
<style>


</style>
