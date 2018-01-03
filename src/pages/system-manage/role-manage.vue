<template>
  <section class="page role-manage">
    <data-form :model="roleModel" @onSearch="refreshData">
      <template slot="default">
        <el-form-item label="客户姓名:" prop="name">
          <el-input v-model="roleModel.name"></el-input>
        </el-form-item>
      </template>
      <template slot="collapse-button">
        <el-button @click="createRole">新增角色</el-button>
      </template>
    </data-form>
    <data-box :data="roleDataSet" @onPageChange="refreshData">
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
            <el-button type="text">模块权限</el-button>
            <el-button type="text" @click="checkUserList(scope.row)">用户列表</el-button>
            <el-button type="text" @click="deleteRole(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </template>
    </data-box>
    <!--新增角色弹框-->
    <el-dialog title="新增角色" :center="true" :visible.sync="dialog.createRoleVisual" width="30%">
      <el-form :model="addParams" ref="add-form" label-width="90px">
        <el-row type="flex" justify="center">
          <el-form-item label="角色名称" prop="name" align="left" :rules="[{ required: true, message: '请输入角色姓名', trigger: 'blur' }]">
            <el-input v-model="addParams.name" :maxlength="20" style="width:178px"></el-input>
          </el-form-item>
        </el-row>
        <el-form-item label-width="0px">
          <el-row type="flex" justify="center">
            <el-button @click="cancelCommit">取消</el-button>
            <el-button @click="addCommit">确定</el-button>
          </el-row>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--更新角色弹框-->
    <el-dialog title="更新角色" :center="true" :visible.sync="dialog.updateRoleVisual" width="30%">
      <el-form :model="updateParams" ref="update-form" label-width="90px">
        <el-row type="flex" justify="center">
          <el-form-item label="角色名称" prop="name" align="left" :rules="[{ required: true, message: '请输入角色姓名', trigger: 'blur' }]">
            <el-input v-model="updateParams.name" :maxlength="20" style="width:178px"></el-input>
          </el-form-item>
        </el-row>
        <el-row type="flex" justify="center">
          <el-form-item label="状态" prop="status" align="left" :rules="[{ required: true, message: '请选择状态', trigger: 'change' }]">
            <el-select v-model="updateParams.status">
              <el-option label="启用" value="0"></el-option>
              <el-option label="停用" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-row>
        <el-form-item label-width="0px">
          <el-row type="flex" justify="center">
            <el-button @click="cancelUpdate">取消</el-button>
            <el-button @click="updateCommit">确定</el-button>
          </el-row>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--用户列表弹框-->
    <el-dialog title="用户列表" :center="true" :visible.sync="dialog.userListVisual" width="40%">
      <user-list ref="user-list"></user-list>
    </el-dialog>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Layout } from "~/core/decorator";
import { Dependencies } from "~/core/decorator";
import { RoleService } from "~/services/role.service";
import DataForm from "~/components/common/data-form.vue";
import DataBox from "~/components/common/data-box.vue";
import UserList from "~/components/pages/system-manage/user-list.vue";

@Layout("workspace")
@Component({
  components: {
    DataForm,
    DataBox,
    UserList
  }
})
export default class RoleManage extends Vue {
  @Dependencies(RoleService) private roleService: RoleService;

  // 角色列表数据集
  private roleDataSet: Array<any> = [];
  // 角色数据实体
  private roleModel: any = {
    name: ""
  };
  private dialog: any = {
    createRoleVisual: false,
    updateRoleVisual: false,
    userListVisual: false
  };
  private addParams: any = {
    name: ""
  };
  private updateParams: any = {
    name: "",
    status: "",
    id: "",
    resources: []
  };
  /**
     * 初始化
     */
  mounted() {
    this.refreshData();
  }
  /**
     * 新建角色
     */
  createRole() {
    this.dialog.createRoleVisual = true;
  }
  /**
     * 确定新增角色
     */
  addCommit() {
    let addForm: any = this.$refs["add-form"];
    addForm.validate(success => {
      if (!success) {
        return;
      }
      this.roleService.createRole(this.addParams.name).subscribe(data => {
        this.$message({
          type: "success",
          message: "新增角色成功"
        });
        this.dialog.createRoleVisual = false;
      });
    });
  }
  /**
     * 取消新增角色
     */
  cancelCommit() {
    this.dialog.createRoleVisual = false;
  }
  /**
     * 打开更新角色弹框
     */
  updateRoleClick(row) {
    this.dialog.updateRoleVisual = true;
    this.updateParams.id = row.id;
    this.updateParams.resources = row.resources;
  }
  /**
     * 确定更新角色
     */
  updateCommit() {
    console.log(this.updateParams);
    this.roleService.updateRole(this.updateParams).subscribe(data => {
      this.$message({
        type: "success",
        message: "更新成功"
      });
      this.dialog.updateRoleVisual = false;
    });
  }
  /**
     * 取消更新角色
     */
  cancelUpdate() {
    this.dialog.updateRoleVisual = false;
  }
  /**
     * 删除角色
     */
  deleteRole(row) {
    this.$confirm("您确认要删除吗?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        this.roleService.deleteRole(row.id).subscribe(data => {
          this.$message({
            type: "success",
            message: "删除成功"
          });
        });
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除"
        });
      });
  }
/**
   * 查看用户列表
   */
  checkUserList(row) {
    this.dialog.userListVisual = true
    this.$nextTick(() => {
      let userList: any = this.$refs["user-list"];
      userList.refreshData(row.id)
    })
  }
  /**
     * 获取刷新数据
     */
  refreshData() {
    this.roleService.getAllRoles().subscribe(data => {
      this.roleDataSet = data;
    });
  }
}
</script>

<style>

</style>
