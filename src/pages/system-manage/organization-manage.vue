<template>
  <section class="page organization-manage">
    <data-form :model="orgModel" @onSearch="refreshData">
      <template slot="default-input">
        <el-form-item label="客户姓名:" prop="name">
          <el-input v-model="orgModel.name"></el-input>
        </el-form-item>
      </template>
      <template slot="default-button">
        <el-button @click="createOrg">添加机构</el-button>
      </template>
    </data-form>
    <data-box :data="orgDataSet">
      <template slot="columns">
        <el-table-column prop="name" label="角色名称">
        </el-table-column>
        <el-table-column prop="remark" label="角色描述">
        </el-table-column>
        <el-table-column prop="status" label="状态">
        </el-table-column>
        <el-table-column prop="date" label="更新时间">
        </el-table-column>
        <el-table-column prop="operator" label="操作人">
        </el-table-column>
        <el-table-column label="操作">
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
  import DataForm from "~/components/common/data-form.vue";
  import DataBox from "~/components/common/data-box.vue";

  @Layout('workspace')
  @Component({
    components: {
      DataForm,
      DataBox
    }
  })
  export default class OrganizationManage extends Vue {
    private orgDataSet: Array < any > = [];
    private orgModel: any = {
      name: ""
    };
    createOrg(){

    }
    refreshData(){

    }
  }

</script>

<style>


</style>
