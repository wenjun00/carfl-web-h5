<template>
  <section class="page user-manage">
    <el-row type="flex">
      <el-col :span="8" style="flex-basis:250px;border:1px solid #e4e4e4;min-height:595px">
        <el-tree></el-tree>
      </el-col>
      <el-col :span="16">
        <data-box :data="userDataSet">
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
            <el-table-column label="操作" min-width="150">
              <template slot-scope="scope">
                <el-button type="text" @click="updateRoleClick(scope.row)">修改</el-button>
                <el-button type="text" @click="permissionClick(scope.row)">模块权限</el-button>
                <el-button type="text" @click="checkUserList(scope.row)">用户列表</el-button>
                <el-button type="text" @click="deleteRole(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </template>
        </data-box>
      </el-col>
    </el-row>
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
  export default class UserManage extends Vue {
    private userDataSet: Array<any> = [];
  }

</script>

<style>


</style>
