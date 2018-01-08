<!--机构用户与管理-->
<template>
  <section class="page org-user-manage">
    <span class="form-title">机构与用户管理</span>
    <i-row>
      <i-col :span="4">
        <i-button class="blueButton" @click="addNewOrg">添加机构</i-button>
        <i-tree :data="treeData"></i-tree>
      </i-col>
      <i-col :span="20">
        <i-row style="margin-bottom:10px;margin-left:25px;">
          <span style="margin-left:20px;">用户名：</span>
          <i-input style="display:inline-block;width:10%;" placeholder="请输入用户名"></i-input>
          <span style="margin-left:20px;">姓名：</span>
          <i-input style="display:inline-block;width:10%;" placeholder="请输入用户名"></i-input>
          <span style="margin-left:10px;">状态：</span>
          <i-select style="display:inline-block;width:10%">
            <i-option label="启用" value="启用" key="启用"></i-option>
            <i-option label="停用" value="停用" key="停用"></i-option>
          </i-select>
          <i-button class="blueButton" style="margin-left:20px;" @click="addNewUser">新增用户</i-button>
          <i-button class="blueButton" style="margin-left:20px;" @click="batchAllotRole">批量分配角色</i-button>
          <i-button class="blueButton" style="margin-left:20px;" @click="batchManageDevice">批量管理设备</i-button>
        </i-row>
        <data-box :columns="columns1" :data="data1"></data-box>
      </i-col>
    </i-row>

    <template>
      <i-modal v-model="allotRoleModal" title="分配角色">
        <allot-role-modal></allot-role-modal>
      </i-modal>
    </template>

    <template>
      <i-modal v-model="modifyUserModal" title="修改用户" width="600">
        <modify-user></modify-user>
      </i-modal>
    </template>


    <template>
      <i-modal v-model="addNewUserModal" title="新增用户" width="600">
        <add-user></add-user>
      </i-modal>
    </template>

    <template>
      <i-modal v-model="deviceManageModal" title="设备管理" width="600">
        <device-manage :userName="userName"></device-manage>
      </i-modal>
    </template>

    <template>
      <i-modal v-model="addNewOrgModal" title="添加机构" width="400">
        <add-org></add-org>
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

  import {
    Dependencies
  } from "~/core/decorator";
  import {
    OrderService
  } from "~/services/business-service/order.service";
  import {
    RoleService
  } from "~/services/role-service/role.service";
  import {
    Layout
  } from "~/core/decorator";

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
      AddOrg
    }
  })
  export default class OrgUserManage extends Page {
    @Dependencies(OrderService) private orderService: OrderService;
    @Dependencies(RoleService) private roleService: RoleService;

    private columns1: any;
    private data1: Array < Object > = [];
    private columns2: any;
    private data2: Array < Object > = [];
    private treeData: Array < any > = [];
    private allotRoleModal: Boolean = false;
    private modifyUserModal: Boolean = false;
    private addNewUserModal: Boolean = false;
    private deviceManageModal: Boolean = false;
    private addNewOrgModal: Boolean = false;
    private userName: String = '';

    public databox;
    allotRole(row) {
      this.allotRoleModal = true
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
    }
    resetPwd(row) {
      this.$Modal.success({
        title: '提示',
        content: '重置成功！'
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
      this.allotRoleModal = true
    }
    /**
     * 批量管理设备
     */
    batchManageDevice() {
      this.deviceManageModal = true
    }
    created() {
      this.treeData = [{
        title: '中资联',
        expand: true,
        children: [{
          title: '指旺金科',
          expand: true,
          children: [{
            title: '指旺西安'
          }, {
            title: '指旺上海'
          }, {
            title: '指旺合肥'
          }]
        }]
      }]
      this.data1 = [{
        userName: 'dianguan',
        actualName: '胡开甲',
        belongOrg: '指旺西安',
        status: '开启',
        phone: '13565757815',
        createTime: '2017-12-01 13:56:56'
      }, {
        userName: 'zhangfeng',
        actualName: '张峰',
        belongOrg: '指旺西安',
        status: '开启',
        phone: '13589727012',
        createTime: '2017-12-01 14:26:56'
      }]
      this.columns1 = [{
          align: "center",
          type: "selection",
          width: 60
        },
        {
          title: "操作",
          width: 340,
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
          key: "userName"
        },
        {
          align: "center",
          title: "姓名",
          key: "actualName"
        },
        {
          align: "center",
          title: "所属机构",
          key: "belongOrg"
        },
        {
          align: "center",
          title: "状态",
          key: "status"
        },
        {
          align: "center",
          title: "电话",
          key: "phone",
          width: 160
        },
        {
          align: "center",
          title: "创建时间",
          key: "createTime",
          width: 180
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
      ];


    }


  }

</script>
