<template>
  <section class="page user-manage">
    <el-row type="flex">
      <el-col :span="8" style="flex-basis:250px;border:1px solid #e4e4e4;min-height:595px">
        <el-tree align="left" :data="orgData" highlight-current default-expand-all node-key="id" ref="tree"
          @node-click="getCheckedNodes" :props="{value:'id',label:'name'}"></el-tree>
      </el-col>
      <el-col :span="16">
        <data-form :model="userModel" @onSearch="refreshData">
          <template slot="default-input">
            <el-form-item label="客户姓名:" prop="name">
              <el-input v-model="userModel.name"></el-input>
            </el-form-item>
          </template>
          <template slot="default-button">
            <el-button @click="createUserClick">新增用户</el-button>
          </template>
        </data-form>
        <data-box :data="userDataSet">
          <template slot="columns">
            <el-table-column prop="name" label="用户名">
            </el-table-column>
            <el-table-column prop="fullName" label="姓名">
            </el-table-column>
            <el-table-column prop="organization" label="所属机构">
            </el-table-column>
            <el-table-column prop="status" label="状态">
            </el-table-column>
            <el-table-column prop="operator" label="操作人">
            </el-table-column>
            <el-table-column label="操作" min-width="200">
              <template slot-scope="scope">
                <el-button type="text" @click="allocateClick(scope.row)">分配角色</el-button>
                <el-button type="text" @click="updateUserClick(scope.row)">修改</el-button>
                <el-button type="text" @click="resetCodeListClick(scope.row)">重置密码</el-button>
              </template>
            </el-table-column>
          </template>
        </data-box>
      </el-col>
    </el-row>
    <!--新增用户-->
    <el-dialog title="新增用户" :center="true" :visible.sync="dialog.createUserVisual" width="30%">
      <create-user @close="dialog.createUserVisual=false" :orgId="orgId" :roleList="roleDataList"></create-user>
    </el-dialog>
    <!--修改用户-->
    <el-dialog title="修改用户" :center="true" :visible.sync="dialog.updateUserVisual" width="30%">
      <update-user ref="update-user" :roleList="roleDataList" @close="dialog.updateUserVisual=false"></update-user>
    </el-dialog>
    <!--分配角色-->
    <el-dialog title="分配角色" :center="true" :visible.sync="dialog.allocateVisual" width="30%">
      <allocate-role ref="allocate-role"></allocate-role>
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
    organizationService
  } from "~/services/organization.service";
  import {
    operatorService
  } from "~/services/operator.service";
  import {
    RoleService
  } from "~/services/role.service";
  import {
    PageService
  } from "~/utils/page.service";
  import DataForm from "~/components/common/data-form.vue";
  import DataBox from "~/components/common/data-box.vue";
  import CreateUser from "~/components/pages/system-manage/user-manage/create-user.vue";
  import UpdateUser from "~/components/pages/system-manage/user-manage/update-user.vue";
  import AllocateRole from "~/components/pages/system-manage/user-manage/allocate-role.vue";

  @Layout('workspace')
  @Component({
    components: {
      DataForm,
      DataBox,
      CreateUser,
      UpdateUser,
      AllocateRole
    }
  })
  export default class UserManage extends Vue {
    @Dependencies(organizationService) private organizationService: organizationService;
    @Dependencies(operatorService) private operatorService: operatorService;
    @Dependencies(RoleService) private RoleService: RoleService;
    @Dependencies(PageService) private pageService: PageService;
    private userDataSet: Array < any > = [];
    private userModel: any = {
      name: ""
    };
    private orgData: any = [];
    private resetDataModel: any = {
      username: "",
      fullName: "",
      organization: "",
      password: "",
      role: "",
      id: "",
      state: ""
    }
    private dialog: any = {
      createUserVisual: false,
      updateUserVisual: false,
      allocateVisual: false
    }
    private orgId: string = "";
    private roleDataList: Array < any > = [];
    getCheckedNodes(item) {
      this.operatorService.orgSimpleListByOrg(item.id).subscribe(data => {
        this.userDataSet = data
        console.log(data)
      });
      this.orgId = item.id
      console.log('713182982016163840', item.id)
    }
    /**
     * 获取组织机构树
     */
    getAllOrgTree() {
      this.organizationService.getAllOrganizations().subscribe(data => {
        let fun: any = (id) => {
          // 递归对象子元素
          let list = data.filter(x => id ? x.parentId === id : !x.parentId).map(node => {
            // 递归构建子节点
            let children = fun(node.id)
            if (children && children.length) {
              node.children = children
            }
            return node
          })
          return list
        }
        this.orgData = fun()

        // console.log('treedata', data)
        // let arr: any = [{
        //   id: -1,
        //   label: data.length ? data[0].name : '',
        //   parentId: null,
        //   children: []
        // }]
        // let num = 0
        // data.map(v => {
        //   if (v.parentId === "-1") {
        //     arr[0].children.push({
        //       id: v.id,
        //       label: v.name,
        //       parentId: -1,
        //       children: []
        //     })
        //     let funNum = 0
        //     data.map(val => {
        //       if (val.parentId && val.parentId === v.id) {
        //         console.log('num', num)
        //         console.log('val.id', val.id)
        //         arr[0].children[num].children.push({
        //           id: parseInt(val.id),
        //           label: val.name,
        //           parentId: parseInt(val.parentId),
        //         })
        //         data.map(value => {
        //           if (value.parentId && value.parentId === val.id) {
        //             arr[0].children[num].children[funNum].function.push(value)
        //           }
        //         })
        //         funNum++
        //       }
        //     })
        //     num++
        //   }
        // })
        // this.orgData = arr
        // console.log(this.orgData, 999)
      });
    }
    /**
     * 修改角色
     */
    updateUserClick(row) {
      this.dialog.updateUserVisual = true
      this.$nextTick(() => {
        let updateUser: any = this.$refs['update-user']
        updateUser.refreshData(row)
      })
    }
    /**
     * 新增角色
     */
    createUserClick() {
      this.dialog.createUserVisual = true
    }
    /**
     * 打开分配角色
     */
    allocateClick(row) {
      this.dialog.allocateVisual = true
      this.$nextTick(() => {
        let allocateRole: any = this.$refs['allocate-role']
        allocateRole.refreshData(row)
      })
    }
    /**
     * 重置密码
     */
    resetCodeListClick(row) {
      this.operatorService.operatorsDetail(row.id).subscribe(data => {
        this.resetDataModel.username = data.username
        this.resetDataModel.fullName = data.fullName
        this.resetDataModel.organization = data.organization.id
        this.resetDataModel.id = data.id
        this.resetDataModel.state = data.state
        this.resetDataModel.role = data.role.id
        this.resetDataModel.password = '888888'
      });
      this.$confirm(`您确定要对用户${row.fullName}重置密码吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.operatorService.updateOperator(this.resetDataModel).subscribe(data => {
          this.$message({
            type: "success",
            message: "重置成功"
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消重置'
        })
      })
    }
    mounted() {
      this.getAllOrgTree()
      this.RoleService.getAllRoles().subscribe(data => {
        this.roleDataList = data;
        // this.updateRoleList(data)
      });
    }
    refreshData() {

    }
  }

</script>

<style>


</style>
