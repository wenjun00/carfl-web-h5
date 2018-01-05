<template>
  <section class="component allocate-role">
    <!--<el-table :data="roleDataSet" ref="data-box" @selection-change="selectionChange">
      <el-table-column type="selection"></el-table-column>
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="name" label="角色名称" min-width="100">
      </el-table-column>
    </el-table>-->
    <el-row type="flex" justify="center">
      <el-select v-model="allocateModel.role">
        <el-option v-for="item in roleDataSet" :label="item.name" :value="item.id" :key="item.id"></el-option>
      </el-select>
    </el-row>
    <el-row type="flex" justify="center" style="margin-top:20px">
      <el-button @click="cancel">取消</el-button>
      <el-button @click="confirm">确定</el-button>
    </el-row>
  </section>
</template>
<script lang="ts">
  import Vue from "vue";
  import {
    Layout
  } from "~/core/decorator";
  import Component from "vue-class-component";
  import {
    Dependencies
  } from "~/core/decorator";
  import DataForm from "~/components/common/data-form.vue";
  import DataBox from "~/components/common/data-box.vue";
  import {
    PageService
  } from "~/utils/page.service";
  import {
    RoleService
  } from "~/services/role.service";
  import {
    operatorService
  } from "~/services/operator.service";
  @Component({
    components: {
      DataForm,
      DataBox
    }
  })
  export default class UserManage extends Vue {
    @Dependencies(RoleService) private RoleService: RoleService;
    @Dependencies(operatorService) private operatorService: operatorService;
    @Dependencies(PageService) private pageService: PageService;
    private allocateModel: any = {
      username: "",
      fullName: "",
      organization: "",
      password: "",
      role: "",
      id: "",
      state: ""
    }
    private roleDataSet: Array < any > = [];
    private multiSelection: Array < any > = [];
    private currentRow: Array < any > = [];
    cancel() {

    }
    confirm() {
      this.operatorService.updateOperator(this.allocateModel).subscribe(data => {
        this.$message({
          type: "success",
          message: "修改成功"
        })
      })
    }
    selectionChange(val) {
      console.log(val)
      this.multiSelection = val
    }
    refreshData(row) {
      console.log('dddd', this.operatorService)
      this.RoleService.getAllRoles().subscribe(data => {
        this.roleDataSet = data;
        this.currentRow = row;
        console.log('currentRow', this.currentRow)
        console.log('getAllRoles', data)
      });
      this.operatorService.operatorsDetail(row.id).subscribe(data => {
        this.allocateModel.username = data.username
        this.allocateModel.fullName = data.fullName
        this.allocateModel.organization = data.organization.id
        this.allocateModel.id = data.id
        this.allocateModel.state = data.state
      });
    }
  }

</script>
<style>


</style>
