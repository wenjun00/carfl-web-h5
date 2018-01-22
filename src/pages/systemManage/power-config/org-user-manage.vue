<!--机构与用户管理-->
<template>
  <section class="page org-user-manage">
    <span class="form-title">机构与用户管理</span>
    <i-row>
      <i-col :span="4">
        <i-button class="blueButton" @click="addNewOrg">添加机构</i-button>
        <organize-tree :dataList="dataList" @add="addDept" @change="onChange" @remove="removeDept"></organize-tree>
      </i-col>
      <i-col :span="20">
        <i-row style="margin-bottom:10px;margin-left:25px;">
          <span style="margin-left:20px;">用户名：</span>
          <i-input style="display:inline-block;width:10%;" v-model="userListModel.userName" placeholder="请输入用户名"></i-input>
          <span style="margin-left:20px;">姓名：</span>
          <i-input style="display:inline-block;width:10%;" v-model="userListModel.realName" placeholder="请输入用户名"></i-input>
          <span style="margin-left:10px;">状态：</span>
          <i-select style="display:inline-block;width:10%" v-model="userListModel.status">
            <i-option label="启用" :value="0" :key="0"></i-option>
            <i-option label="停用" :value="1" :key="1"></i-option>
          </i-select>
          <i-button class="blueButton" style="margin-left:20px;" @click="getUserListByCondition">搜索</i-button>
          <i-button class="blueButton" style="margin-left:20px;" @click="addNewUser">新增用户</i-button>
          <i-button class="blueButton" style="margin-left:20px;" @click="batchAllotRole">批量分配角色</i-button>
          <i-button class="blueButton" style="margin-left:20px;" @click="batchManageDevice">批量管理设备</i-button>
        </i-row>
        <data-box :columns="columns1" :data="userList" ref="databox"></data-box>
      </i-col>
    </i-row>

    <template>
      <i-modal v-model="allotRoleModal" :title="batchAllotFlag?'批量分配角色':'分配角色'">
        <allot-role-modal :userId="userId" :batchAllotFlag="batchAllotFlag" :userIds="userIds" ref="allot-role-modal" @close="allotRoleModal=false"></allot-role-modal>
        <div slot="footer">
          <i-button @click="allotRoleModal=false">取消</i-button>
          <i-button @click="allotRoleClick" class="blueButton">确定分配</i-button>
        </div>
      </i-modal>
    </template>

    <template>
      <i-modal v-model="modifyUserModal" title="修改用户" width="600">
        <modify-user :modifyUserModel="modifyUserModel" @close="modifyUserModal=false"></modify-user>
      </i-modal>
    </template>


    <template>
      <i-modal v-model="addNewUserModal" title="新增用户" width="600" class="addUser">
        <add-user :deptObject="deptObject" @close="closeAdd"></add-user>
      </i-modal>
    </template>

    <template>
      <i-modal v-model="deviceManageModal" title="设备管理" width="600">
        <device-manage :userName="userName"></device-manage>
      </i-modal>
    </template>

    <template>
      <i-modal v-model="addNewOrgModal" title="添加机构" width="400">
        <add-org ref="add-org" :deptLevel="deptLevel"></add-org>
        <div slot="footer">
          <i-button>取消</i-button>
          <i-button class="blueButton" @click="confirmAddOrg">确定</i-button>
        </div>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
  import Page from "~/core/page";
  import DataBox from "~/components/common/data-box.vue";
  import Component from "vue-class-component";
  import allotRoleModal from "~/components/system-manage/allot-role-modal.vue"
  import UserList from "~/components/system-manage/user-list.vue"
  import WaitHandleCase from "~/components/system-manage/wait-handle-case.vue"
  import ModulePower from "~/components/system-manage/module-power.vue"
  import ModifyUser from "~/components/system-manage/modify-user.vue"
  import AddUser from "~/components/system-manage/add-user.vue"
  import DeviceManage from '~/components/system-manage/device-manage.vue'
  import AddOrg from '~/components/system-manage/add-org.vue'
  import OrganizeTree from '~/components/common/organize-tree.vue'
  import {
    Dependencies
  } from "~/core/decorator";
  import {
    RoleService
  } from "~/services/role-service/role.service";
  import {
    ManageService
  } from "~/services/manage-service/manage.service";
  import {
    DepartmentService
  } from "~/services/manage-service/department.service";
  import {
    Layout
  } from "~/core/decorator";
  import {
    PageService
  } from "~/utils/page.service";
  import {
    FilterService
  } from "~/utils/filter.service"
  import {
    LoginService
  } from "~/services/login.service";
  import {
    Modal
  } from "iview"
  @Layout("workspace")
  @Component({
    components: {
      DataBox,
      allotRoleModal,
      UserList,
      WaitHandleCase,
      ModulePower,
      ModifyUser,
      AddUser,
      DeviceManage,
      AddOrg,
      OrganizeTree
    }
  })
  export default class OrgUserManage extends Page {
    @Dependencies(RoleService) private roleService: RoleService;
    @Dependencies(ManageService) private manageService: ManageService;
    @Dependencies(DepartmentService) private departmentService: DepartmentService;
    @Dependencies(PageService) private pageService: PageService;
    @Dependencies(LoginService) private loginService: LoginService;
    private columns1: any;
    private userList: Array < Object > = [];
    private columns2: any;
    private data2: Array < Object > = [];
    private dataList: Array < any > = [];
    private allotRoleModal: Boolean = false;
    private modifyUserModal: Boolean = false;
    private addNewUserModal: Boolean = false;
    private deviceManageModal: Boolean = false;
    private addNewOrgModal: Boolean = false;
    private userName: String = '';
    private userListModel: any;
    private deptObject: any;
    private modifyUserModel: any;
    private userId: number | null = null;
    private userIds: Array < any >= [];
    private multipleUserId: any;
    private batchAllotFlag: Boolean = false;
    private deptLevel: number;
    created() {
      this.deptObject = {
        deptName: '',
        deptId: '',
        company: ''
      }
      this.modifyUserModel = {
        userName: '',
        realName: '',
        companyName: '',
        status: '',
        phone: ''
      }
      this.manageService.getAllDepartment().subscribe(val => {
        this.deptObject = val.object[0]
        this.dataList = val.object
      })
      this.userListModel = {
        userName: '',
        realName: '',
        status: '',
        deptId: 1
      }
      this.columns1 = [{
          align: "center",
          type: "selection",
          width: 60
        },
        {
          title: "操作",
          width: 360,
          align: "center",
          render: (h, {
            row,
            column,
            index
          }) => {
            return h("div", [
              h(
                "i-button", {
                  props: {
                    type: "text"
                  },
                  style: {
                    color: "#265EA2"
                  },
                  on: {
                    click: () => {
                      this.allotRole(row);
                    }
                  }
                },
                "分配角色"
              ),
              h(
                "i-button", {
                  props: {
                    type: "text"
                  },
                  style: {
                    color: "#265EA2"
                  },
                  on: {
                    click: () => {
                      this.modifyUser(row);
                    }
                  }
                },
                "修改"
              ),
              h(
                "i-button", {
                  props: {
                    type: "text"
                  },
                  style: {
                    color: "#265EA2"
                  },
                  on: {
                    click: () => {
                      this.resetPwd(row);
                    }
                  }
                },
                "重置密码"
              ),
              h(
                "i-button", {
                  props: {
                    type: "text"
                  },
                  style: {
                    color: "#265EA2"
                  },
                  on: {
                    click: () => {
                      this.deviceManageOpen(row);
                    }
                  }
                },
                "设备管理"
              )
            ]);
          }
        },
        {
          align: "center",
          title: "用户名",
          key: "userUsername"
        },
        {
          align: "center",
          title: "姓名",
          key: "userRealname"
        },
        {
          align: "center",
          title: "所属机构",
          key: "deptName"
        },
        {
          align: "center",
          title: "状态",
          key: "status",
          render: (h, {
            row,
            columns,
            index
          }) => {
            if (row.userStatus === 0) {
              return h('span', {}, '启用')
            } else if (row.userStatus === 1) {
              return h('span', {}, '停用')
            }
          }
        },
        {
          align: "center",
          title: "电话",
          key: "userPhone",
          width: 160
        },
        {
          align: "center",
          title: "备注",
          key: "userRemark"
        }, {
          align: "center",
          title: "创建人",
          key: "operatorName"
        },
        {
          align: "center",
          title: "创建时间",
          key: "operateTime",
          width: 180,
          render: (h, {
            row,
            columns,
            index
          }) => {
            return h('span', FilterService.dateFormat(row.operateTime, 'yyyy-MM-dd hh:mm:ss'))
          }
        }
      ];
      this.columns2 = [{
          title: "序号",
          type: "index",
          width: 80,
          align: "center"
        },
        {
          title: "列名",
          key: "columnsName",
          align: "center"
        },
        {
          type: "selection",
          width: 80,
          align: "center"
        }
      ];

      this.data2 = [{
          columnsName: "订单编号"
        },
        {
          columnsName: "订单创建时间"
        },
        {
          columnsName: "订单类型"
        },
        {
          columnsName: "产品名称"
        },
        {
          columnsName: "客户姓名"
        },
        {
          columnsName: "证件号码"
        },
        {
          columnsName: "最近合同生成日期"
        }
      ]
    }
    closeAdd() {
      this.addNewUserModal = false
      this.getUserListByCondition()
    }
    allotRole(row) {
      this.allotRoleModal = true
      let _allotRole = < Modal > this.$refs['allot-role-modal']
      _allotRole.getRoleList()
      this.userId = row.id
    }
    /**
     * 添加机构
     */
    addNewOrg() {
      this.addNewOrgModal = true
    }
    /**
     * 修改用户
     */
    modifyUser(row) {
      this.modifyUserModal = true
      this.modifyUserModel = row
    }
    resetPwd(row) {
      this.loginService.resetPassword({
        userId: row.id
      }).subscribe(val => {
        this.$Message.success('重置成功')
      })

    }
    deviceManageOpen(row) {
      this.deviceManageModal = true
      this.userName = row.userName
    }
    /**
     * 新增用户
     */
    addNewUser() {
      this.addNewUserModal = true
    }
    /**
     * 批量分配角色
     */
    batchAllotRole() {
      this.multipleUserId = this.$refs['databox']
      this.multipleUserId = this.multipleUserId.getCurrentSelection()
      if (!this.multipleUserId) {
        this.$Message.info('请选择用户')
      } else {
        this.allotRoleModal = true
        let _allotRole = < Modal > this.$refs['allot-role-modal']
        _allotRole.getRoleList()
        this.allotRoleModal = true
        this.batchAllotFlag = true
        this.userIds = this.multipleUserId.map(v => v.id)
      }
    }
    /**
     * 批量管理设备
     */
    batchManageDevice() {
      this.deviceManageModal = true
    }
    getUserListByCondition() {
      this.manageService.getUsersByDeptPage(this.userListModel, this.pageService).subscribe(val => {
        this.userList = val.object.list
      })
    }
    /**
     * 树change
     */
    onChange(value) {
      this.userListModel.deptId = value.id
      this.deptObject = value
      // 获取组织机构等级
      this.deptLevel = value.deptLevel
      this.manageService.getUsersByDeptPage(this.userListModel, this.pageService).subscribe(val => {
        this.userList = val.object.list
      })
    }
    allotRoleClick() {
      let _addRole = < Modal > this.$refs['allot-role-modal']
      _addRole.allotRole()
    }
    removeDept(value) {
      this.$Modal.confirm({
        title: '提示',
        content: '确定删除此组织机构吗？',
        onOk: () => {
          this.departmentService.deleteDept({
            deptId: value.id
          }).subscribe(val => {
            this.$Message.success('删除成功！')
          })
        }
      })
    }
    /**
     * 添加机构
     */
    addDept() {
      this.addNewOrgModal = true
    }
    /**
     * 确定添加机构
     */
    confirmAddOrg() {
      let _addOrg = < Modal > this.$refs['add-org']
      _addOrg.addOrg()
    }
    mounted() {
      this.manageService.getUsersByDeptPage(this.userListModel, this.pageService).subscribe(val => {
        this.userList = val.object.list
      })
    }
  }

</script>

<style lang="less">
  .addUser {
    .ivu-modal-footer {
      display: none;
    }
  }

</style>
